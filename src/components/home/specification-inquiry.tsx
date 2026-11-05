"use client";
import { ArrowUpLeft, SlidersHorizontal } from 'lucide-react';
export function SpecificationInquiry({equipment,label}:{equipment:string;label:string}) {
 return <a className="catalog-inquiry" href="#request-quote" onClick={()=>window.dispatchEvent(new CustomEvent('equipment-inquiry',{detail:equipment}))}><SlidersHorizontal size={18}/>{label}<ArrowUpLeft size={16}/></a>;
}
