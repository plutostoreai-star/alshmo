import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('src/data/saudi-administrative-areas.json','utf8'));
assert.equal(data.regions.length,13);assert.equal(data.governorates.length,149);
assert.equal(new Set(data.governorates.map(g=>g.id)).size,149);
for(const g of data.governorates){assert.ok(data.regions.some(r=>r.id===g.regionId));assert.ok(g.name.trim());assert.ok(['Polygon','MultiPolygon'].includes(g.geometry.type));const positions=g.geometry.coordinates.flat(g.geometry.type==='Polygon'?1:2);for(const [lon,lat]of positions){assert.ok(lon>34&&lon<57);assert.ok(lat>15&&lat<34);}}
assert.equal(data.governorates.filter(g=>g.isRegionalSeat).length,13);
console.log('Passed: 13 regions, 149 unique administrative areas (including 13 regional seats), region relationships and all simplified geometry coordinates.');
