/** Only accept an explicit international number; never infer a country code. */
export function whatsappInquiryUrl(phone: string | null, message: string): string | null {
 if (!phone || !/^\+?[1-9][\d\s()-]{6,20}$/.test(phone.trim())) return null;
 const digits = phone.replace(/\D/g, '');
 if (digits.length < 7 || digits.length > 15) return null;
 return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
