import { company } from '@/config/company';
import { whatsappInquiryUrl } from '@/lib/whatsapp';
import { Phone } from 'lucide-react';
function WhatsappIcon() {
 return <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01C18.63 23.83 24 18.48 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.38a9.85 9.85 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.46 9.91-9.96 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.47.71.3 1.26.48 1.69.61.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>;
}
export function FloatingWhatsapp() {
 const url=company.whatsappConfirmed?whatsappInquiryUrl(company.phone,''):null;
 if(!company.phone) return null;
 return <nav className="floating-contacts" aria-label="التواصل السريع">{url && <a className="floating-contact contact-whatsapp" href={url.split('?')[0]} aria-label="تواصل عبر واتساب"><WhatsappIcon/></a>}<a className="floating-contact contact-phone" href={`tel:${company.phone}`} aria-label="اتصل بنا"><Phone size={26} aria-hidden="true"/></a></nav>;
}
