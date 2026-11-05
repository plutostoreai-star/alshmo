import { company, brand } from './company';
const domain = process.env.SITE_URL?.trim();
export const productionUrl = domain ? new URL(domain) : null;
if (productionUrl && (productionUrl.protocol !== 'https:' || productionUrl.pathname !== '/' || productionUrl.search || productionUrl.hash || productionUrl.username || productionUrl.password)) throw new Error('SITE_URL must be an HTTPS origin without a path or credentials.');
export const seo = {
 title: `${company.name} | تأجير المعدات وطلب عرض سعر`,
 description: 'استكشف فئات معدات الشموخ: رافعات شوكية ومقصية وتلسكوبية، بوبكات، جي سي بي، كرينات وبوم ترك. تعرّف على نطاق الخدمة وجهّز طلب عرض سعر لمشروعك.',
 englishDescription: company.englishName + ' — Equipment rental categories, service areas and quote requests.',
};
export function organizationSchema() { return { '@context':'https://schema.org', '@type':'Organization', name:company.name, alternateName:company.englishName, telephone:company.phone, ...(productionUrl ? {url:productionUrl.href,logo:new URL(brand.logo,productionUrl).href}: {}) }; }


