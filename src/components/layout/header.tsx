'use client';
import { company, navigation } from '@/config/company';
import { BrandLogo } from './brand-logo';
import { Menu, ArrowUpLeft } from 'lucide-react';
export function Header() {
  return <header className="border-b border-slate-200 bg-white"><div className="shell flex min-h-24 items-center justify-between gap-6"><a href="#home" className="flex items-center gap-3" aria-label={company.name}><BrandLogo/></a><nav aria-label="القائمة الرئيسية" className="hidden items-center gap-9 md:flex">{navigation.map(item => <a className="nav-link" key={item.href} href={item.href}>{item.label}</a>)}</nav><a className="button button-red hidden lg:inline-flex" href="#contact">استفسر عن المعدات <ArrowUpLeft size={18}/></a><details className="relative md:hidden"><summary className="cursor-pointer list-none p-3" aria-label="فتح القائمة"><Menu/></summary><nav aria-label="قائمة الهاتف" className="absolute left-0 z-20 mt-4 w-60 rounded-lg border border-slate-200 bg-white p-4 shadow-lg">{navigation.map(item => <a className="block rounded p-3 hover:bg-slate-50" key={item.href} href={item.href} onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>{item.label}</a>)}</nav></details></div></header>;
}


