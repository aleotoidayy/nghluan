(function () {
  "use strict";

  var TOKYO_CONFIG = {
    latitude: 35.6895,
    longitude: 139.6917,
    horizontalAccuracy: 39,
    verticalAccuracy: 1000,
    altitude: 40,
    motionActivityType: 63,
    motionActivityConfidence: 467
  };

  var APPLE_WLOC_PREFIX = new Uint8Array([0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]);
  var APPLE_WLOC_MARKER = new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00]);
  var ROOT_DROP_FIELDS = { 3: true, 4: true, 33: true };
  var CELL_RESPONSE_FIELDS = { 22: true, 24: true };
  var LOCATION_REPLACED_FIELDS = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 11: true, 12: true };

  function concatBytes(parts) {
    var total = 0;
    for (var i = 0; i < parts.length; i++) total += parts[i].length;
    var out = new Uint8Array(total);
    var offset = 0;
    for (var i = 0; i < parts.length; i++) {
      out.set(parts[i], offset);
      offset += parts[i].length;
    }
    return out;
  }

  function findBytes(bytes, marker) {
    for (var i = 0; i <= bytes.length - marker.length; i++) {
      var ok = true;
      for (var j = 0; j < marker.length; j++) {
        if (bytes[i + j] !== marker[j]) { ok = false; break; }
      }
      if (ok) return i;
    }
    return -1;
  }

  function readUInt16BE(bytes, offset) {
    return (bytes[offset] << 8) | bytes[offset + 1];
  }

  function readUInt32BE(bytes, offset) {
    return ((bytes[offset] * 0x1000000) + ((bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3])) >>> 0;
  }

  function writeUInt16BE(value) {
    return new Uint8Array([(value >> 8) & 0xff, value & 0xff]);
  }

  function writeUInt32BE(value) {
    return new Uint8Array([(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);
  }

  function asciiBytes(value) {
    var out = new Uint8Array(value.length);
    for (var i = 0; i < value.length; i++) out[i] = value.charCodeAt(i) & 0x7f;
    return out;
  }

  function encodeVarintUnsigned(value) {
    var v = typeof value === "bigint" ? value : BigInt(value);
    if (v < 0n) throw new Error("negative unsigned varint");
    var out = [];
    while (v >= 0x80n) {
      out.push(Number((v & 0x7fn) | 0x80n));
      v >>= 7n;
    }
    out.push(Number(v));
    return new Uint8Array(out);
  }

  function encodeVarintSignedInt64(value) {
    var v = typeof value === "bigint" ? value : BigInt(Math.trunc(value));
    if (v < 0n) v = BigInt.asUintN(64, v);
    return encodeVarintUnsigned(v);
  }

  function decodeVarint(bytes, offset) {
    var result = 0n;
    var shift = 0n;
    var current = offset;
    while (current < bytes.length) {
      var b = bytes[current++];
      result |= BigInt(b & 0x7f) << shift;
      if ((b & 0x80) === 0) return { value: result, offset: current };
      shift += 7n;
      if (shift > 70n) throw new Error("varint too long");
    }
    throw new Error("unterminated varint");
  }

  function makeKey(fieldNumber, wireType) {
    return encodeVarintUnsigned((BigInt(fieldNumber) << 3n) | BigInt(wireType));
  }

  function makeVarintField(fieldNumber, value) {
    return concatBytes([makeKey(fieldNumber, 0), encodeVarintSignedInt64(value)]);
  }

  function makeLengthDelimitedField(fieldNumber, payload) {
    return concatBytes([makeKey(fieldNumber, 2), encodeVarintUnsigned(payload.length), payload]);
  }

  function parseFields(bytes) {
    var fields = [];
    var offset = 0;
    while (offset < bytes.length) {
      var keyStart = offset;
      var key = decodeVarint(bytes, offset);
      offset = key.offset;
      var fieldNumber = Number(key.value >> 3n);
      var wireType = Number(key.value & 0x7n);
      if (fieldNumber === 0) throw new Error("protobuf field number 0");
      var valueStart = offset;
      var valueEnd;
      if (wireType === 0) {
        valueEnd = decodeVarint(bytes, offset).offset;
      } else if (wireType === 1) {
        valueEnd = offset + 8;
      } else if (wireType === 2) {
        var lengthInfo = decodeVarint(bytes, offset);
        var length = Number(lengthInfo.value);
        valueStart = lengthInfo.offset;
        valueEnd = valueStart + length;
      } else if (wireType === 5) {
        valueEnd = offset + 4;
      } else {
        throw new Error("unsupported protobuf wire type: " + wireType);
      }
      if (valueEnd > bytes.length) throw new Error("protobuf field exceeds buffer");
      fields.push({
        fieldNumber: fieldNumber,
        wireType: wireType,
        keyStart: keyStart,
        valueStart: valueStart,
        valueEnd: valueEnd,
        end: valueEnd,
        raw: bytes.slice(keyStart, valueEnd),
        valueBytes: bytes.slice(valueStart, valueEnd)
      });
      offset = valueEnd;
    }
    return fields;
  }

  function tryParseFields(bytes) {
    try {
      if (!bytes || bytes.length === 0) return null;
      var fields = parseFields(bytes);
      return fields.length > 0 ? fields : null;
    } catch (e) {
      return null;
    }
  }

  function isCellResponseField(fieldNumber) {
    return CELL_RESPONSE_FIELDS[fieldNumber] === true;
  }

  function coordToInt(value) {
    return Math.trunc(Number(value) * 100000000);
  }

  function patchLocation(locationPayload, config) {
    var parts = [];
    var fields = locationPayload.length ? parseFields(locationPayload) : [];
    for (var i = 0; i < fields.length; i++) {
      if (!LOCATION_REPLACED_FIELDS[fields[i].fieldNumber]) {
        parts.push(fields[i].raw);
      }
    }
    parts.push(makeVarintField(1, coordToInt(config.latitude)));
    parts.push(makeVarintField(2, coordToInt(config.longitude)));
    parts.push(makeVarintField(3, config.horizontalAccuracy));
    parts.push(makeVarintField(4, 3));
    parts.push(makeVarintField(5, config.altitude));
    parts.push(makeVarintField(6, config.verticalAccuracy));
    parts.push(makeVarintField(11, config.motionActivityType));
    parts.push(makeVarintField(12, config.motionActivityConfidence));
    return concatBytes(parts);
  }

  function patchWifiDevice(wifiPayload, config) {
    var fields = parseFields(wifiPayload);
    var parts = [];
    var patchedLocation = false;
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (field.fieldNumber === 2 && field.wireType === 2) {
        parts.push(makeLengthDelimitedField(2, patchLocation(field.valueBytes, config)));
        patchedLocation = true;
      } else {
        parts.push(field.raw);
      }
    }
    if (!patchedLocation) {
      parts.push(makeLengthDelimitedField(2, patchLocation(new Uint8Array(0), config)));
    }
    return concatBytes(parts);
  }

  function patchCellTower(cellPayload, config) {
    var fields = parseFields(cellPayload);
    var parts = [];
    var patchedLocation = false;
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (field.fieldNumber === 5 && field.wireType === 2) {
        parts.push(makeLengthDelimitedField(5, patchLocation(field.valueBytes, config)));
        patchedLocation = true;
      } else {
        parts.push(field.raw);
      }
    }
    if (!patchedLocation) {
      parts.push(makeLengthDelimitedField(5, patchLocation(new Uint8Array(0), config)));
    }
    return concatBytes(parts);
  }

  function patchAppleWLocPayload(payload, config) {
    var fields = parseFields(payload);
    var parts = [];
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (field.fieldNumber === 2 && field.wireType === 2) {
        parts.push(makeLengthDelimitedField(2, patchWifiDevice(field.valueBytes, config)));
      } else if (isCellResponseField(field.fieldNumber) && field.wireType === 2) {
        parts.push(makeLengthDelimitedField(field.fieldNumber, patchCellTower(field.valueBytes, config)));
      } else if (!ROOT_DROP_FIELDS[field.fieldNumber]) {
        parts.push(field.raw);
      }
    }
    return concatBytes(parts);
  }

  function readPascalString(bytes, state) {
    var length = readUInt16BE(bytes, state.offset);
    state.offset += 2;
    if (state.offset + length > bytes.length) throw new Error("ARPC pascal string exceeds buffer");
    var chars = [];
    for (var i = 0; i < length; i++) chars.push(String.fromCharCode(bytes[state.offset + i]));
    state.offset += length;
    return chars.join("");
  }

  function writePascalString(value) {
    var bytes = asciiBytes(value);
    return concatBytes([writeUInt16BE(bytes.length), bytes]);
  }

  function parseArpc(bytes) {
    var state = { offset: 0 };
    var version = readUInt16BE(bytes, state.offset);
    state.offset += 2;
    var locale = readPascalString(bytes, state);
    var appIdentifier = readPascalString(bytes, state);
    var osVersion = readPascalString(bytes, state);
    var functionId = readUInt32BE(bytes, state.offset);
    state.offset += 4;
    var payloadLength = readUInt32BE(bytes, state.offset);
    state.offset += 4;
    if (state.offset + payloadLength > bytes.length) throw new Error("ARPC payload exceeds buffer");
    return {
      version: version,
      locale: locale,
      appIdentifier: appIdentifier,
      osVersion: osVersion,
      functionId: functionId,
      payload: bytes.slice(state.offset, state.offset + payloadLength)
    };
  }

  function serializeArpc(arpc) {
    return concatBytes([
      writeUInt16BE(arpc.version),
      writePascalString(arpc.locale),
      writePascalString(arpc.appIdentifier),
      writePascalString(arpc.osVersion),
      writeUInt32BE(arpc.functionId),
      writeUInt32BE(arpc.payload.length),
      arpc.payload
    ]);
  }

  function buildAppleWLocResponse(payload, prefix) {
    return concatBytes([prefix || APPLE_WLOC_PREFIX, writeUInt16BE(payload.length), payload]);
  }

  function extractPrefixedAppleWLocPayload(responseBytes) {
    if (!responseBytes || responseBytes.length < 10) return null;
    if (responseBytes[0] !== 0x00 || responseBytes[1] !== 0x01) return null;
    if (responseBytes[6] !== 0x00 || responseBytes[7] !== 0x00) return null;
    var payloadLength = readUInt16BE(responseBytes, 8);
    var payloadOffset = 10;
    if (payloadLength <= 0 || payloadOffset + payloadLength > responseBytes.length) return null;
    var payload = responseBytes.slice(payloadOffset, payloadOffset + payloadLength);
    if (tryParseFields(payload) === null) return null;
    return {
      kind: "synthetic",
      payload: payload,
      prefix: responseBytes.slice(0, 8),
      suffix: responseBytes.slice(payloadOffset + payloadLength)
    };
  }

  function extractAppleWLocPayload(responseBytes) {
    if (!responseBytes || responseBytes.length < 2) throw new Error("Apple WLoc response too short");
    var prefixed = extractPrefixedAppleWLocPayload(responseBytes);
    if (prefixed) return prefixed;
    try {
      var arpc = parseArpc(responseBytes);
      if (arpc.payload.length > 0 && tryParseFields(arpc.payload) !== null) {
        return { kind: "arpc", payload: arpc.payload, arpc: arpc };
      }
    } catch (e) {}
    var markerIdx = findBytes(responseBytes, APPLE_WLOC_MARKER);
    if (markerIdx >= 0) {
      var lenOffset = markerIdx + APPLE_WLOC_MARKER.length;
      if (lenOffset + 2 <= responseBytes.length) {
        var realLen = readUInt16BE(responseBytes, lenOffset);
        var realPayloadOffset = lenOffset + 2;
        if (realLen > 0 && realPayloadOffset + realLen <= responseBytes.length) {
          var candidatePayload = responseBytes.slice(realPayloadOffset, realPayloadOffset + realLen);
          if (tryParseFields(candidatePayload) !== null) {
            return {
              kind: "marker",
              payload: candidatePayload,
              prefix: responseBytes.slice(0, markerIdx),
              markerAndLen: responseBytes.slice(markerIdx, realPayloadOffset),
              suffix: responseBytes.slice(realPayloadOffset + realLen)
            };
          }
        }
      }
    }
    if (responseBytes[0] !== undefined && (responseBytes[0] >> 3) > 0 && ((responseBytes[0] & 0x7) === 0 || (responseBytes[0] & 0x7) === 2)) {
      return { kind: "bare", payload: responseBytes };
    }
    throw new Error("missing Apple WLoc response prefix");
  }

  function spoofAppleResponse(responseBytes, config) {
    var extraction = extractAppleWLocPayload(responseBytes);
    var patchedPayload = patchAppleWLocPayload(extraction.payload, config);
    var response;
    if (extraction.kind === "arpc") {
      var arpcOut = {
        version: extraction.arpc.version,
        locale: extraction.arpc.locale,
        appIdentifier: extraction.arpc.appIdentifier,
        osVersion: extraction.arpc.osVersion,
        functionId: extraction.arpc.functionId,
        payload: patchedPayload
      };
      response = serializeArpc(arpcOut);
    } else if (extraction.kind === "marker") {
      var newLenBytes = writeUInt16BE(patchedPayload.length);
      response = concatBytes([
        extraction.prefix,
        extraction.markerAndLen.slice(0, APPLE_WLOC_MARKER.length),
        newLenBytes,
        patchedPayload,
        extraction.suffix
      ]);
    } else {
      response = buildAppleWLocResponse(patchedPayload, extraction.prefix);
    }
    return response;
  }

  function bodyToBytes(body) {
    if (body == null) return null;
    if (body instanceof Uint8Array) return body;
    if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) return new Uint8Array(body);
    if (typeof body === "string") {
      var out = new Uint8Array(body.length);
      for (var i = 0; i < body.length; i++) out[i] = body.charCodeAt(i) & 0xff;
      return out;
    }
    if (typeof body === "object" && typeof body.length === "number") return new Uint8Array(body);
    if (typeof body === "object" && body.bytes && typeof body.bytes.length === "number") return new Uint8Array(body.bytes);
    if (typeof body === "object" && body.data && typeof body.data.length === "number") return new Uint8Array(body.data);
    return null;
  }

  function headersWithBinaryBody(sourceHeaders, length) {
    var headers = {};
    sourceHeaders = sourceHeaders || {};
    var skip = { "content-length": true, "content-encoding": true, "transfer-encoding": true };
    for (var key in sourceHeaders) {
      if (Object.prototype.hasOwnProperty.call(sourceHeaders, key) && !skip[key.toLowerCase()]) {
        headers[key] = sourceHeaders[key];
      }
    }
    headers["Content-Type"] = "application/octet-stream";
    headers["Content-Length"] = String(length);
    return headers;
  }

  function hexPreview(bytes, limit) {
    if (!bytes) return "<none>";
    var out = [];
    var max = Math.min(bytes.length, limit || 16);
    for (var i = 0; i < max; i++) out.push(("0" + bytes[i].toString(16)).slice(-2));
    return out.join("");
  }

  var hasRequest = typeof $request !== "undefined" && $request != null;
  var hasResponse = typeof $response !== "undefined" && $response != null;

  if (hasResponse) {
    try {
      var rawBody = $response.bodyBytes || $response.body || $response.rawBody || $response.binaryBody;
      var responseBytes = bodyToBytes(rawBody);
      if (!responseBytes || responseBytes.length < 10) {
        $done({});
      } else {
        var newResponseBytes = spoofAppleResponse(responseBytes, TOKYO_CONFIG);
        var headers = headersWithBinaryBody($response.headers, newResponseBytes.length);
        headers["X-Location-Spoofer"] = "tokyo";
        if (typeof $response.status !== "undefined") {
          $done({ status: $response.status, headers: headers, body: newResponseBytes });
        } else {
          $done({ headers: headers, body: newResponseBytes });
        }
      }
    } catch (e) {
      $done({});
    }
  } else if (hasRequest) {
    $done({});
  } else {
    $done({});
  }
})();
