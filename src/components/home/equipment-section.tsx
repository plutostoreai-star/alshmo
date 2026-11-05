import { SpecificationInquiry } from './specification-inquiry';
import { equipmentSpecifications } from '@/config/company';
import type { SpecificationConfig } from '@/lib/equipment-specifications';
import { CatalogDisplay } from './catalog-display';
import { MessageCircle, ArrowUpLeft } from 'lucide-react';
import { company, catalog, quoteForm } from '@/config/company';
import { whatsappInquiryUrl } from '@/lib/whatsapp';
export function EquipmentSection() {
 const enabled = quoteForm.whatsappConfirmed && Boolean(whatsappInquiryUrl(company.phone, ''));
 return <section id="equipment" className="equipment-section" aria-labelledby="catalog-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow">{catalog.eyebrow}</p><h2 id="catalog-title" className="section-title whitespace-pre-line">{catalog.title}</h2></div><p className="section-intro">{catalog.introduction}</p></div><CatalogDisplay items={company.categories}>{company.categories.map((category,index) => {
 const specs = (equipmentSpecifications as Record<string,SpecificationConfig>)[category.id];
 const href = enabled ? whatsappInquiryUrl(company.phone, catalog.message(category.name)) : null;
 return <article id={`equipment-${category.id}`} tabIndex={-1} key={category.id} className="equipment-card"><div className="card-image"><span className="card-number">{String(index+1).padStart(2,'0')}</span><div className={`machine-image ${category.image?'standalone-machine-image':''}`} role="img" aria-label={category.imageAlt ?? `صورة توضيحية: ${category.name}`} style={{backgroundImage:`url(${category.image ?? company.equipmentImage})`,backgroundPosition:category.imagePosition}}/></div><div className="catalog-card-content"><p className="category-english" lang="en" dir="ltr">{category.englishName}</p><h3>{category.name}</h3>{category.specificationLabel&&<p className="mt-2 text-xs font-bold text-navy">{category.specificationLabel}</p>}<p className="category-description">{category.description}</p>{category.imageCredit&&<p className="text-[9px] text-slate-500 mt-2">صورة توضيحية: <a href={category.imageCredit.source} target="_blank" rel="noopener noreferrer">{category.imageCredit.author}</a> · <a href={category.imageCredit.license} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></p>}{specs ? <SpecificationInquiry equipment={category.id} label={specs.inquiryLabel}/> : href ? <a className="catalog-inquiry" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${catalog.inquiryLabel}: ${category.name}`}><MessageCircle size={18}/>{catalog.inquiryLabel}<ArrowUpLeft size={16}/></a> : <button className="catalog-inquiry" disabled aria-describedby="catalog-unavailable"><MessageCircle size={18}/>{catalog.unavailableLabel}</button>}</div></article>;
 })}</CatalogDisplay><div className="catalog-notes"><p className="catalog-note">{catalog.imageNote}</p>{!enabled && <p id="catalog-unavailable" className="catalog-note">{catalog.unavailableNote}</p>}</div></div></section>;
}



