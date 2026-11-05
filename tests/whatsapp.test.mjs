import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
async function source(path) { const {outputText}=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}); return import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64')); }
const {openWhatsappDraft}=await source('src/lib/open-whatsapp.ts');
const {whatsappInquiryUrl}=await source('src/lib/whatsapp.ts');
const message='طلب عرض سعر لتأجير المعدات\nالاسم: اختبار\nرقم الجوال: +12025550100\nنوع المعدة: كرينات\nالمدينة: الرياض\nمدة الإيجار: أسبوع\nتفاصيل الطلب: اختبار & ? #';
const href=whatsappInquiryUrl('+966569647944',message);
assert.equal(href,'https://wa.me/966569647944?text='+encodeURIComponent(message));
assert.equal(new URL(href).searchParams.get('text'),message);
let target; const popup={opener:{},location:{replace(value){target=value;}},close(){}};
globalThis.window={navigator:{userAgent:"Chrome Windows",platform:"Win32"},open(url,name){assert.equal(url,'about:blank');assert.equal(name,'_blank');return popup;}};
assert.equal(openWhatsappDraft(href),true); assert.equal(target,href); assert.equal(popup.opener,null);
globalThis.window={navigator:{userAgent:"Chrome Windows",platform:"Win32"},open(){return null;}}; assert.equal(openWhatsappDraft(href),false);
globalThis.window={navigator:{userAgent:"Chrome Windows",platform:"Win32"},open(){throw new Error('blocked');}};assert.equal(openWhatsappDraft(href),false);
let closed=false;globalThis.window={navigator:{userAgent:"Chrome Windows",platform:"Win32"},open(){return {opener:null,location:{replace(){throw new Error('navigation blocked');}},close(){closed=true;}};}};assert.equal(openWhatsappDraft(href),false);assert.equal(closed,true);
console.log('Passed: complete Arabic encoding, exact recipient, successful popup handoff, null popup, thrown popup, navigation failure cleanup.');

for (const navigator of [
 {userAgent:'Mozilla/5.0 (Linux; Android 14) Chrome/130.0 Mobile Safari/537.36'},
 {userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Version/18.0 Mobile Safari/604.1'},
 {userAgent:'Mozilla/5.0 Macintosh Safari',platform:'MacIntel',maxTouchPoints:5},
]) {
 let navigated; globalThis.window={navigator,location:{assign(value){navigated=value;}},open(){throw new Error('Mobile must not open a popup');}};
 assert.equal(openWhatsappDraft(href),true); assert.equal(navigated,href);
}
globalThis.window={navigator:{userAgent:'Android'},location:{assign(){throw new Error('navigation denied');}}};assert.equal(openWhatsappDraft(href),false);
console.log('Passed: Android Chrome, iPhone Safari, iPadOS direct-navigation branches and navigation failure (simulated browser objects).');
