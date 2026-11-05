/** Keep the working desktop popup; mobile OS app handoff needs same-tab navigation. */
export function openWhatsappDraft(href: string): boolean {
 try {
  const { userAgent = '', platform = '', maxTouchPoints = 0 } = window.navigator;
  // iPadOS may identify itself as a Mac; do not classify touch-enabled Windows laptops as mobile.
  const mobile = /Android|iPhone|iPad|iPod/i.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1);
  if (mobile) {
   window.location.assign(href);
   return true;
  }
  const popup = window.open('about:blank', '_blank');
  if (!popup) return false;
  try { popup.opener = null; popup.location.replace(href); return true; }
  catch { popup.close(); return false; }
 } catch { return false; }
}
