export interface SpecificationOption { value: string; label: string }
export interface SpecificationField { id: string; label: string; fixed?: SpecificationOption; options?: SpecificationOption[]; dependsOn?: string; optionsByValue?: Record<string, SpecificationOption[]>; custom?: {label:string; inputLabel:string; placeholder:string; error:string} }
export interface SpecificationConfig { note:string; inquiryLabel:string; fields:SpecificationField[] }
export function specificationOptions(field:SpecificationField, values:Record<string,string>) { return field.options ?? field.optionsByValue?.[values[field.dependsOn ?? '']] ?? []; }
export const normalizeHeight=(value:string)=>value.trim().replace(/[٠-٩]/g,char=>String(char.charCodeAt(0)-1632)).replace(/[۰-۹]/g,char=>String(char.charCodeAt(0)-1776)).replace(/[٫,]/g,'.');
export function validateSpecifications(config:SpecificationConfig|undefined, values:Record<string,string>, required:string) {
 const errors:Record<string,string>={};
 for(const field of config?.fields ?? []) {
  if(field.fixed)continue;
  if(values[field.id]==='other' && field.custom) {
   const value=normalizeHeight(values[`${field.id}Custom`] ?? '');
   if(!/^(?:[0-9]+(?:[.,][0-9]+)?)$/.test(value) || Number(value.replace(',','.'))<=0 || !Number.isFinite(Number(value.replace(',','.')))) errors[`${field.id}Custom`]=field.custom.error;
  } else if(!specificationOptions(field,values).some(option=>option.value===values[field.id])) errors[field.id]=required;
 }
 return errors;
}
export function specificationMessage(config:SpecificationConfig|undefined,values:Record<string,string>) {
 return (config?.fields ?? []).map(field=>`${field.label}: ${field.fixed ? field.fixed.label : values[field.id]==='other' && field.custom ? `${normalizeHeight(values[`${field.id}Custom`] ?? '').replace(',','.')} متر` : specificationOptions(field,values).find(option=>option.value===values[field.id])?.label ?? ''}`);
}
