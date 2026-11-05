import type { Metadata } from 'next';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@fontsource/cairo/800.css';
import './globals.css';
import { company } from '@/config/company';
import { seo, productionUrl, organizationSchema } from '@/config/seo';
export const metadata: Metadata = {
 title: seo.title, description: seo.description,
 ...(productionUrl ? {metadataBase:productionUrl,alternates:{canonical:productionUrl.href}} : {}),
 robots:{index:true,follow:true},
 openGraph:{title:seo.title,description:seo.description,locale:'ar_SA',type:'website',siteName:company.name,...(productionUrl?{url:productionUrl.href,images:[{url:'/images/brand/logo-transparent.png',alt:'شعار الشموخ: رمز أزرق تتداخل معه رافعة ذهبية'}]}:{})},
 twitter:{card:'summary',title:seo.title,description:seo.description},
 other:{'description:en':seo.englishDescription},
 icons:{icon:[{url:'/images/brand/favicon.png',type:'image/png'}],apple:'/images/brand/apple-touch-icon.png'},
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema()).replace(/</g, "\\u003c")}}/><a href="#main" className="skip-link">انتقل إلى المحتوى</a>{children}</body></html>;
}



