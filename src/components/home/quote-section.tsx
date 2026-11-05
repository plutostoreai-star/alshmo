'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpLeft, FileText, LockKeyhole } from 'lucide-react';
import { company, administrativeLocations, equipmentSpecifications, quoteForm as copy } from '@/config/company';
import { whatsappInquiryUrl } from '@/lib/whatsapp';
import { openWhatsappDraft } from '@/lib/open-whatsapp';
import { specificationOptions, specificationMessage, validateSpecifications, type SpecificationConfig } from '@/lib/equipment-specifications';
type Field = keyof typeof copy.labels;
const required: Field[] = ['name','mobile','equipment','region','governorate','duration'];
export function QuoteSection() {
 const formRef = useRef<HTMLFormElement>(null);
 const opening = useRef(false);
 const [handoff,setHandoff] = useState<{href:string; opened:boolean}|null>(null);
 const [regionId,setRegionId]=useState('');
 const [governorateId,setGovernorateId]=useState('');
 const [cityText,setCityText]=useState('');
 const [equipmentId,setEquipmentId] = useState('');
 const [specValues,setSpecValues] = useState<Record<string,string>>({});
 const specs=(equipmentSpecifications as Record<string,SpecificationConfig>)[equipmentId];
 const [errors,setErrors] = useState<Record<string,string|undefined>>({});
 function changeEquipment(id:string) { setEquipmentId(id);setSpecValues({});setErrors({});opening.current=false;setHandoff(null); }
 useEffect(()=>{const select=(event:Event)=>{const id=(event as CustomEvent<string>).detail;if(company.categories.some(c=>c.id===id))changeEquipment(id);};window.addEventListener('equipment-inquiry',select);return()=>window.removeEventListener('equipment-inquiry',select);},[]);
 useEffect(()=>{const select=(event:Event)=>{const value=(event as CustomEvent<{regionId:string;governorateId:string}>).detail;if(!value||!administrativeLocations.governorates.some(g=>g.id===value.governorateId&&g.regionId===value.regionId))return;setRegionId(value.regionId);setGovernorateId(value.governorateId);setCityText('');setErrors(previous=>({...previous,region:undefined,governorate:undefined}));opening.current=false;setHandoff(null);};window.addEventListener('location-inquiry',select);return()=>window.removeEventListener('location-inquiry',select);},[]);
 const configured = copy.whatsappConfirmed && Boolean(whatsappInquiryUrl(company.phone,''));
 function validate(form: HTMLFormElement, blurred?: Field) {
  const data = new FormData(form); const next: Record<string,string> = {};
  required.forEach(key=>{if(!String(data.get(key)||'').trim()) next[key]=copy.errors.required;});
  const mobile = String(data.get('mobile')||'').trim();
  if(mobile && (!/^\+?[\d\s()-]+$/.test(mobile) || mobile.replace(/\D/g,'').length<7 || mobile.replace(/\D/g,'').length>15)) next.mobile=copy.errors.mobile;
  if(data.get('equipment') && !company.categories.some(c=>c.id===data.get('equipment'))) next.equipment=copy.errors.required;

  if(!administrativeLocations.regions.some(r=>r.id===data.get('region')))next.region=copy.errors.required;
  if(!administrativeLocations.governorates.some(g=>g.id===data.get('governorate')&&g.regionId===data.get('region')))next.governorate=copy.errors.required;
  Object.assign(next,validateSpecifications(specs,specValues,copy.errors.required));
  setErrors(previous => blurred ? {...previous, [blurred]: next[blurred]} : next); return {data,next};
 }
 function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); if(opening.current) return; const {data,next}=validate(event.currentTarget);
  const first=Object.keys(next)[0];
  if(first){(event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();return;}
  if(!configured) return;
  const equipment=company.categories.find(c=>c.id===data.get('equipment'))!.name;
  const region=administrativeLocations.regions.find(r=>r.id===data.get('region'))!.name;
  const governorate=administrativeLocations.governorates.find(g=>g.id===data.get('governorate'))!.name;
  const city=String(data.get('city')||'').trim().replace(/\s+/g,' ');
  data.set('city',city);
  const message=[copy.messageTitle,...(Object.keys(copy.labels) as Field[]).map(key=>`${copy.labels[key]}: ${key==='equipment'?equipment:key==='region'?region:key==='governorate'?governorate:key==='city'?city:String(data.get(key)||'').trim()}`).filter(line=>!line.endsWith(': ')),...specificationMessage(specs,specValues),...(specs?[specs.note]:[])].join('\n');
  const href=whatsappInquiryUrl(company.phone,message); if(!href) return; opening.current=true; const opened=openWhatsappDraft(href); setHandoff({href,opened}); if(!opened) opening.current=false;
 }
 function field(key: Field) {
  const props={id:`quote-${key}`,name:key,required:required.includes(key),'aria-invalid':Boolean(errors[key]),'aria-describedby':errors[key]?`quote-${key}-error`:undefined,onBlur:()=>{if(formRef.current) validate(formRef.current,key);}};
  return <div className={`quote-field ${key==='details'?'quote-field-wide':''}`} key={key}><label htmlFor={props.id}>{copy.labels[key]} {props.required?<span aria-hidden="true">*</span>:<small>({copy.optional})</small>}</label>{key==='region'||key==='governorate'?<select {...props} value={key==='region'?regionId:governorateId} disabled={key==='governorate'&&!regionId} onChange={event=>{if(key==='region'){setRegionId(event.target.value);setGovernorateId('');}else setGovernorateId(event.target.value);setCityText('');setErrors(previous=>({...previous,region:undefined,governorate:undefined}));}}><option value="" disabled>{copy.placeholders[key]}</option>{(key==='region'?administrativeLocations.regions:administrativeLocations.governorates.filter(g=>g.regionId===regionId)).map(option=><option key={option.id} value={option.id}>{option.name}</option>)}</select>:key==='equipment'?<select {...props} value={equipmentId} onChange={event=>changeEquipment(event.target.value)}><option value="" disabled>{copy.placeholders[key]}</option>{company.categories.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}</select>:key==='details'?<textarea {...props} rows={4} maxLength={2000} placeholder={copy.placeholders[key]}/>:<input {...props} value={key==='city'?cityText:undefined} onChange={key==='city'?event=>setCityText(event.target.value):undefined} type={key==='mobile'?'tel':'text'} dir={key==='mobile'?'ltr':undefined} autoComplete={key==='name'?'name':key==='mobile'?'tel':undefined} maxLength={key==='mobile'?24:120} placeholder={copy.placeholders[key]}/>} {errors[key]&&<p id={`quote-${key}-error`} className="quote-error">{errors[key]}</p>}</div>;
 }
 function specificationFields() {
  if(!specs)return null;
  return <fieldset className="quote-field-wide quote-specifications"><legend className="font-bold">مواصفات المعدة المطلوبة</legend><p className="quote-submit-note" id="specification-note">{specs.note}</p><div className="quote-fields">{specs.fields.map(spec=>{
   if(spec.fixed)return <div className="quote-field" key={spec.id}><label htmlFor={`quote-${spec.id}`}>{spec.label}</label><input id={`quote-${spec.id}`} name={spec.id} value={spec.fixed.label} readOnly aria-describedby="specification-note"/></div>;
   const options=specificationOptions(spec,specValues);
   const customKey=`${spec.id}Custom`;
   return <div className="quote-field" key={spec.id}><label htmlFor={`quote-${spec.id}`}>{spec.label} <span aria-hidden="true">*</span></label><select id={`quote-${spec.id}`} name={spec.id} value={specValues[spec.id] ?? ''} required disabled={Boolean(spec.dependsOn&&!specValues[spec.dependsOn])} aria-invalid={Boolean(errors[spec.id])} aria-describedby={errors[spec.id]?`quote-${spec.id}-error`:'specification-note'} onChange={event=>{const value=event.target.value;setSpecValues(previous=>{const next={...previous,[spec.id]:value};delete next[customKey];for(const dependent of specs.fields.filter(item=>item.dependsOn===spec.id)){delete next[dependent.id];delete next[`${dependent.id}Custom`];}return next;});setErrors(previous=>{const next={...previous};for(const field of specs.fields){delete next[field.id];delete next[`${field.id}Custom`];}return next;});}}><option value="" disabled>اختر {spec.label}</option>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}{spec.custom&&<option value="other">{spec.custom.label}</option>}</select>{errors[spec.id]&&<p className="quote-error" id={`quote-${spec.id}-error`}>{errors[spec.id]}</p>}{spec.custom&&specValues[spec.id]==='other'&&<div className="mt-4"><label htmlFor={`quote-${customKey}`}>{spec.custom.inputLabel} <span aria-hidden="true">*</span></label><input id={`quote-${customKey}`} name={customKey} required inputMode="decimal" maxLength={12} value={specValues[customKey]??''} placeholder={spec.custom.placeholder} aria-invalid={Boolean(errors[customKey])} aria-describedby={errors[customKey]?`quote-${customKey}-error`:'specification-note'} onChange={event=>setSpecValues(previous=>({...previous,[customKey]:event.target.value}))}/>{errors[customKey]&&<p className="quote-error" id={`quote-${customKey}-error`}>{errors[customKey]}</p>}</div>}</div>;
  })}</div></fieldset>;
 }
 return <section id="request-quote" className="quote-section" aria-labelledby="quote-title"><div className="shell quote-layout"><div className="quote-intro"><span className="quote-symbol"><FileText size={30}/></span><p className="eyebrow">{copy.eyebrow}</p><h2 id="quote-title" className="section-title">{copy.title}</h2><p>{copy.introduction}</p><div className="quote-assurance"><LockKeyhole size={20}/><p>{configured?copy.privacyNote:copy.disabledNote}</p></div></div><form ref={formRef} className="quote-form" onSubmit={submit} onChange={()=>{opening.current=false;setHandoff(null);}} noValidate><p className="quote-required-note">{copy.requiredNote}</p><div role="alert" aria-live="polite">{Object.values(errors).some(Boolean)&&<p className="quote-error-summary">{copy.errors.summary}</p>}</div><div className="quote-fields">{(Object.keys(copy.labels) as Field[]).map(key=><div className={key==='details'?'quote-field-wide':''} key={key}>{field(key)}{key==='equipment'&&specificationFields()}</div>)}</div><button className="button button-red quote-submit" type="submit" disabled={!configured || Boolean(handoff?.opened)}>{handoff?.opened?copy.openedLabel:configured?copy.submit:copy.disabled}<ArrowUpLeft size={20}/></button><div role="status" aria-live="polite">{handoff && <p className={handoff.opened?"quote-submit-note":"quote-error-summary"}>{handoff.opened?copy.openedNote:copy.openError} <a className="underline" href={handoff.href} target="_blank" rel="noopener noreferrer">{copy.fallbackLabel}</a></p>}</div><p className="quote-submit-note">{configured?copy.privacyNote:copy.disabledNote}</p></form></div></section>;
}


