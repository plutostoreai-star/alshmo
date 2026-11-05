import { QuoteSection } from '@/components/home/quote-section';
import { FloatingWhatsapp } from '@/components/layout/floating-whatsapp';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServiceAreas } from '@/components/home/service-areas';
import { Hero } from '@/components/home/hero';
import { EquipmentSection, ContactSection } from '@/components/home/sections';
export default function Home() { return <><Header/><main id="main"><Hero/><EquipmentSection/><ServiceAreas/><QuoteSection/><ContactSection/></main><Footer/><FloatingWhatsapp/></>; }



