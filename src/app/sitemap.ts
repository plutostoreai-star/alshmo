import type { MetadataRoute } from 'next';
import { productionUrl } from '@/config/seo';
export default function sitemap(): MetadataRoute.Sitemap { return productionUrl ? [{url:productionUrl.href}] : []; }
