let body = $response.body;

function readVarint(buffer, offset) {
  let result = 0;
  let shift = 0;
  let pos = offset;

  while (true) {
    if (pos >= buffer.length) break;
    
    const byte = buffer[pos];
    const value = byte & 0x7F;
    result |= value << shift;
    pos++;

    if ((byte & 0x80) === 0) break;
    shift += 7;
  }

  return {
    value: result,
    length: pos - offset
  };
}

function parseField6(buffer) {
  const MAX = buffer.length;
  
  for (let i = 0; i < MAX; i++) {
    if (buffer[i] === 0x32) {
      const { value, length } = readVarint(buffer, i + 1);
      
      console.log(`找到 field 6 - 位置: ${i}, 长度: ${value}, varint字节: ${length}`);
      
      if (value > 12000) {
        buffer[i] = 0x7A;
        console.log("已更改tag值以去除广告");
        return {
          offset: i,
          dataLength: value,
          varintLength: length,
          totalLength: 1 + length + value
        };
      }
    }
  }
  return null;
}

let bodyBytes = $buffer.from(body, 'binary');
parseField6(bodyBytes);
$done({ body: $buffer.toString(bodyBytes, 'binary') });
