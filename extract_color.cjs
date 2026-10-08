const fs = require('fs');
const zlib = require('zlib');

const buffer = fs.readFileSync('C:/Users/PC/.gemini/antigravity/brain/c2b7ae26-228e-44f5-ab29-d8c828d0e88a/.user_uploaded/media_1791029398212.png');

let offset = 8;
const idatChunks = [];
while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') {
        idatChunks.push(buffer.slice(offset + 8, offset + 8 + length));
    }
    offset += 12 + length;
}

const idatData = Buffer.concat(idatChunks);
const uncompressed = zlib.unzipSync(idatData);
console.log("Uncompressed bytes:", uncompressed.slice(0, 10));
