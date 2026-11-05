import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
async function source(path) {const {outputText}=ts.transpileModule(readFileSync(path,'utf8').replace("import administrativeAreas from '@/data/saudi-administrative-areas.json';",'const administrativeAreas = '+readFileSync('src/data/saudi-administrative-areas.json','utf8')+';'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}});return import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64'));}
const {equipmentSpecifications}=await source('src/config/company.ts');
const {specificationOptions,validateSpecifications,specificationMessage}=await source('src/lib/equipment-specifications.ts');
const {whatsappInquiryUrl}=await source('src/lib/whatsapp.ts');
const config=equipmentSpecifications.scissor;
for(const [power,heights] of Object.entries({electric:[6,8,10,12,14,16],diesel:Array.from({length:45},(_,index)=>index+12)})) {
 assert.deepEqual(specificationOptions(config.fields[1],{power}).map(o=>Number(o.value)),heights);
 for(const height of heights){const values={power,height:String(height)};assert.deepEqual(validateSpecifications(config,values,'required'),{});const message=specificationMessage(config,values).join('\n');assert.match(message,new RegExp(`${height} متر`));assert.ok(message.includes(power==='electric'?'كهربائية':'ديزل'));assert.equal(new URL(whatsappInquiryUrl('+966569647944',message)).searchParams.get('text'),message);}
 for(const invalid of ['', ' ', '0','-2','abc','Infinity','12m','1e2'])assert.ok(validateSpecifications(config,{power,height:'other',heightCustom:invalid},'required').heightCustom);
 for(const valid of [' 20.5 ', '20,5','٢٠٫٥']){const values={power,height:'other',heightCustom:valid};assert.deepEqual(validateSpecifications(config,values,'required'),{});assert.ok(specificationMessage(config,values).join('\n').includes('20.5 متر'));}
}
for(const height of ['6','10','11','57'])assert.ok(validateSpecifications(config,{power:'diesel',height},'required').height);
assert.ok(validateSpecifications(config,{power:'unknown',height:'10'},'required').power);
assert.deepEqual(validateSpecifications(undefined,{},'required'),{});
assert.deepEqual(specificationMessage(undefined,{}),[]);
console.log('Passed: all 51 configured heights, both power types, invalid and custom heights, Arabic digits, encoded WhatsApp messages and non-scissor requests.');

const man=equipmentSpecifications['man-lift'];
const heights=[12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,43];
assert.deepEqual(specificationOptions(man.fields[1],{}).map(o=>Number(o.value)),heights);
for(const height of heights){const values={height:String(height),power:'electric'};assert.deepEqual(validateSpecifications(man,values,'required'),{});const message=specificationMessage(man,values).join('\n');assert.ok(message.includes('نوع الوقود: ديزل'));assert.ok(message.includes(`${height} متر`));assert.equal(new URL(whatsappInquiryUrl('+966569647944',message)).searchParams.get('text'),message);}
assert.ok(validateSpecifications(man,{},'required').height);
assert.ok(validateSpecifications(man,{height:'56'},'required').height);
const {company}=await source('src/config/company.ts');
const {matchesEquipment}=await source('src/lib/catalog-search.ts');
const item=company.categories.find(c=>c.id==='man-lift');
for(const query of ['Man Lift','Manlift','Boom Lift','مان لفت','مانلفت','BOOM','انلف'])assert.ok(matchesEquipment(query,item),query);
assert.equal(company.categories.length,8);
console.log('Passed: all 16 Man Lift heights, fixed diesel even with tampered state, missing/invalid height, aliases, dynamic count and Arabic WhatsApp encoding.');

const tele=equipmentSpecifications.telescopic;
assert.deepEqual(validateSpecifications(tele,{},'required'),{});
const teleMessage=specificationMessage(tele,{brand:'other',height:'99'}).join('\n');
assert.ok(teleMessage.includes('العلامة التجارية: JCB'));
assert.ok(teleMessage.includes('ارتفاع العمل المطلوب: 17 متر'));
assert.equal(new URL(whatsappInquiryUrl('+966569647944',teleMessage)).searchParams.get('text'),teleMessage);
const teleItem=company.categories.find(c=>c.id==='telescopic');
for(const query of ['رافعة تلسكوبية','تلسكوبية','Telehandler','JCB','17m'])assert.ok(matchesEquipment(query,teleItem),query);
console.log('Passed: Telehandler fixed JCB/17m specifications, Arabic draft encoding and all configured search terms.');
