import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
async function source(path){return import('data:text/javascript;base64,'+Buffer.from(ts.transpileModule(fs.readFileSync(path,'utf8').replace("import administrativeAreas from '@/data/saudi-administrative-areas.json';",'const administrativeAreas = '+fs.readFileSync('src/data/saudi-administrative-areas.json','utf8')+';'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText).toString('base64'));}
const {company,administrativeLocations,quoteForm:copy}=await source('src/config/company.ts');
const {whatsappInquiryUrl}=await source('src/lib/whatsapp.ts');
const {validateSpecifications,specificationMessage}=await source('src/lib/equipment-specifications.ts');
const ast=ts.createSourceFile('quote.tsx',fs.readFileSync('src/components/home/quote-section.tsx','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const component=ast.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name.text==='QuoteSection');
const handlers=component.body.statements.filter(n=>ts.isFunctionDeclaration(n)&&['validate','submit'].includes(n.name.text)).map(n=>n.getText(ast)).join('\n');
const compiled=ts.transpileModule(handlers,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
let latest;
const opening={current:false};
const run=new Function('company','copy','administrativeLocations','whatsappInquiryUrl','validateSpecifications','specificationMessage','opening','setHandoff','openWhatsappDraft',`const required=['name','mobile','equipment','region','governorate','duration'];const specs=undefined,specValues={},configured=true;function setErrors(){};${compiled};return submit;`)(company,copy,administrativeLocations,whatsappInquiryUrl,validateSpecifications,specificationMessage,opening,x=>latest=x,()=>true);
const Native=globalThis.FormData;
try{
 for(const [input,expected] of [['  الخبر  ','المدينة: الخبر'],['',null],['   ',null]]){
  opening.current=false;latest=null;
  const data=new Native();for(const [k,v]of Object.entries({name:'اختبار',mobile:'+12025550100',equipment:'cranes',region:administrativeLocations.regions[0].id,governorate:administrativeLocations.governorates.find(g=>g.regionId===administrativeLocations.regions[0].id).id,city:input,duration:'أسبوع'}))data.set(k,v);
  globalThis.FormData=class{constructor(){return data;}};
  run({preventDefault(){},currentTarget:{elements:{namedItem(){throw new Error('Valid form must not be rejected');}}}});
  assert.ok(latest?.opened);const message=new URL(latest.href).searchParams.get('text');
  assert.ok(message.includes('المنطقة الإدارية:'));assert.ok(message.includes('المحافظة / مقر الإمارة:'));
  if(expected)assert.ok(message.includes(expected));else assert.ok(!message.includes('المدينة:'));
  assert.equal(data.get('city'),input.trim());
 }
 for(const invalid of [
  {region:'',governorate:''},
  {region:administrativeLocations.regions[0].id,governorate:administrativeLocations.governorates.find(g=>g.regionId!==administrativeLocations.regions[0].id).id}
 ]){
  opening.current=false;latest=null;let focused;
  const data=new Native();for(const [k,v]of Object.entries({name:'اختبار',mobile:'+12025550100',equipment:'cranes',duration:'أسبوع',...invalid}))data.set(k,v);
  globalThis.FormData=class{constructor(){return data;}};
  run({preventDefault(){},currentTarget:{elements:{namedItem(key){return {focus(){focused=key;}};}}}});
  assert.equal(latest,null);assert.ok(['region','governorate'].includes(focused));
 }
 for(const g of administrativeLocations.governorates){
  opening.current=false;latest=null;
  const data=new Native();for(const [k,v]of Object.entries({name:'اختبار',mobile:'+12025550100',equipment:'cranes',duration:'أسبوع',region:g.regionId,governorate:g.id}))data.set(k,v);
  globalThis.FormData=class{constructor(){return data;}};
  run({preventDefault(){},currentTarget:{elements:{namedItem(){throw new Error('Valid location rejected');}}}});
  assert.ok(new URL(latest.href).searchParams.get('text').includes(`المحافظة / مقر الإمارة: ${g.name}`));
 }
}finally{globalThis.FormData=Native;}
console.log('Passed actual form handlers: supplied city, blank city, whitespace-only city, trimmed request data and exact WhatsApp message.');
