let body = $response.body;
const MAX = 666;

function readVarint(buffer, offset) {
    let result = 0;
    let shift = 0;
    let pos = offset;

    while (true) {
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

console.log(`HomeNoAd`);
for (let i = 0; i < MAX; i++) {
    if (body[i] === 0xAA && body[i + 1] === 0x01) {
        body[i] = 0xF7;
        body[i + 1] = 0x07;
        console.log(`成功在偏移量 ${i} 处更改tag值`);
        $done({ body });
        return;
    }
}
console.log(`HomeNoAd: 未检测到广告`);

console.log(`ScrollNoAd`);
for (let i = 0; i < MAX; i++) {
    if (body[i] === 0xF2 && body[i + 1] === 0x01) {
        body[i] = 0xF7;
        body[i + 1] = 0x07;
        console.log(`成功在偏移量 ${i} 处更改tag值`);
        $done({ body });
        return;
    }
}
console.log(`ScrollNoAd: 未检测到广告`);

console.log(`ParseField6`);
for (let i = 0; i < MAX; i++) {
    if (body[i] === 0x32) {
        const { value, length } = readVarint(body, i + 1);
        console.log(`找到 field 6: 位置=${i}, 长度=${value}, varint字节数=${length}`);
        if (value > 12000) {
            body[i] = 0x7A;
            console.log(`更改tag值以去除广告`);
        }
    }
}

$done({ body });
