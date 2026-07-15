let body = $response.body;
let url = $request.url;

function readVarint(buffer, offset) {
  let result = 0;
  let shift = 0;
  let pos = offset;
  while (true) {
    if (pos >= buffer.length) break;
    const byte = buffer[pos];
    result |= (byte & 0x7F) << shift;
    pos++;
    if ((byte & 0x80) === 0) break;
    shift += 7;
  }
  return { value: result, length: pos - offset };
}

function parseField6(buffer) {
  const MAX = buffer.length;
  for (let i = 0; i < MAX; i++) {
    if (buffer[i] === 0x32) {
      const { value } = readVarint(buffer, i + 1);
      if (value > 12000) {
        buffer[i] = 0x7A;
        console.log(`[Duyệt] Đã sửa field6 tại vị trí: ${i}, độ dài: ${value}`);
        return true;
      }
    }
  }
  return false;
}

function scanAndReplace(buffer, max, t1, t2, r1, r2, label) {
  for (let i = 0; i < max && i < buffer.length - 1; i++) {
    if (buffer[i] === t1 && buffer[i + 1] === t2) {
      buffer[i] = r1;
      buffer[i + 1] = r2;
      console.log(`[${label}] Đã xóa quảng cáo tại vị trí ${i}`);
      return true;
    }
  }
  console.log(`[${label}] Không tìm thấy quảng cáo`);
  return false;
}

let bodyBytes;
if (body instanceof Uint8Array) {
  bodyBytes = body;
} else if ($buffer && $buffer.from) {
  bodyBytes = new Uint8Array($buffer.from(body, 'binary'));
} else {
  bodyBytes = new Uint8Array(body);
}

if (url.includes('/browsita/')) {
  parseField6(bodyBytes);
} else if (url.includes('/casita/')) {
  scanAndReplace(bodyBytes, 666, 0xAA, 0x01, 0xF7, 0x07, 'TrangChu');
} else if (url.includes('/scrollsita/')) {
  scanAndReplace(bodyBytes, 666, 0xF2, 0x01, 0xF7, 0x07, 'CuonTrang');
}

$done({ body: bodyBytes.buffer.slice(bodyBytes.byteOffset, bodyBytes.byteOffset + bodyBytes.byteLength) });
