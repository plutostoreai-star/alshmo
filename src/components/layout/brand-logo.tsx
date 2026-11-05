import Image from 'next/image';
import { company, brand } from '@/config/company';
export function BrandLogo() {
 return <span className="brand-lockup"><Image className="brand-emblem" src={brand.logo} alt="شعار الشموخ: رمز أزرق على شكل A مع رافعة ذهبية مدمجة" width={brand.width} height={brand.height} sizes="(max-width: 767px) 58px, 76px"/><span className="brand-name">{company.name}</span></span>;
}

