import fs from 'node:fs/promises';
import sharp from 'sharp';

const mark = await fs.readFile('assets/brand/lattices-symbol.svg');
const symbol = `data:image/svg+xml;base64,${mark.toString('base64')}`;
const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#101113"/>
<image href="${symbol}" x="60" y="45" width="64" height="64"/>
<g font-family="Arial, sans-serif">
<text x="142" y="89" font-size="21" fill="#b5a997">Engineering applications</text>
<text x="60" y="302" font-size="146" fill="#e9edf0">LATTICES</text>
<path d="M66 354H1134" stroke="#242529"/>
<text x="66" y="439" font-size="36" fill="#a6a6a6">Built around real engineering work.</text>
<text x="66" y="568" font-size="20" fill="#aaa4af">latticesbygene.com</text>
</g></svg>`;
await sharp(Buffer.from(artwork)).png().toFile('assets/social-preview.png');
console.log('Rendered the Lattices social preview from vector artwork.');
