import type { MetadataRoute } from 'next';
import { productionUrl } from '@/config/seo';
export default function robots(): MetadataRoute.Robots { return {rules:{userAgent:'*',allow:'/'},...(productionUrl?{sitemap:new URL('/sitemap.xml',productionUrl).href}: {})}; }
