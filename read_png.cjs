const fs = require('fs');
const zlib = require('zlib');

const buffer = fs.readFileSync('C:/Users/PC/.gemini/antigravity/brain/c2b7ae26-228e-44f5-ab29-d8c828d0e88a/.user_uploaded/media_1791029398212.png');
// parse width/height
const width = buffer.readUInt32BE(16);
const height = buffer.readUInt32BE(20);
const bitDepth = buffer.readUInt8(24);
const colorType = buffer.readUInt8(25);
console.log('width', width, 'height', height, 'bitDepth', bitDepth, 'colorType', colorType);

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

// each row has 1 byte filter + width * 4 bytes (if RGBA 8-bit)
const stride = 1 + width * 4;
console.log('stride', stride);

// read row 100
const row100Offset = stride * 100;
const filter = uncompressed[row100Offset];
console.log('row 100 filter', filter);

// Wait, un-filtering in JS is annoying to write from scratch for all filters.
// But if it's a solid color, all pixels are the same.
// Let's just dump the first 10 bytes of row 100, 200, 300
console.log('row 100', uncompressed.slice(row100Offset, row100Offset + 10));
console.log('row 200', uncompressed.slice(stride * 200, stride * 200 + 10));
console.log('row 300', uncompressed.slice(stride * 300, stride * 300 + 10));
