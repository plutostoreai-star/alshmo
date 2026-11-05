# Al Shomoukh Equipment Rental

Local Next.js / TypeScript foundation with Tailwind CSS, Arabic RTL, and locally packaged Cairo fonts.

## Commands
- `npm run dev`: local development
- `npm run typecheck`: TypeScript validation
- `npm run build`: production build

## Content
Edit `src/config/company.ts` for verified business details and equipment categories. Null contact fields and empty categories do not generate invented contact details or inventory. Replace the clearly labeled hero image placeholder only with an approved asset. The initial letter brand mark is provisional, pending an approved logo.

## Structure
- `src/app`: route, metadata, global styles
- `src/components/layout`: header and footer
- `src/components/home`: homepage sections
- `src/config`: business content
- `src/types`: shared content contracts
- `public/images`: approved imagery

## Design status
No approved mobile/desktop references were supplied. This is a responsive foundation, not a claim of reference matching. Supply approved references, logo, imagery, company spelling, contact details, and equipment content before final visual implementation. No deployment or contact form backend is configured in this setup phase.

## Visual update
Premium industrial styling uses #0B3974 and #D71920. Seven user-requested equipment categories and the illustration path are configured in `src/config/company.ts`. No availability, specification, or company capability claims are made.

Image: `public/images/equipment-catalog.png`, generated with the built-in image generation tool. Prompt: photorealistic 4-by-2 equipment catalog, forklift, scissor lift, telescopic lift, skid steer, backhoe, mobile crane, boom truck and wheel loader; neutral concrete studio, no logos or text. These are illustrative visuals, not company fleet photos.

Validation: production build passes; browser checks at 320, 390, 768 and 1440px show no horizontal overflow. Cairo and RTL verified; equipment links reach the contact section. Real contact details and approved logo remain pending.

## Brand assets
Original supplied reference is preserved unchanged at `public/images/brand/logo-reference-original.png`. Transparent emblem at `logo-transparent.png` was isolated using the built-in image editing tool; prompt: isolate the original blue A emblem and integrated gold crane, remove background and surrounding lettering without redesign. It is a raster derivative, not an official vector master. Header and footer share BrandLogo with proportional contain rendering. Favicon and Apple icon are sized derivatives. Company spelling remains the existing configurable value pending verification; no reference lettering has been adopted.

## Service areas
Edit `serviceAreas` in `src/config/company.ts` for the five supplied cities, approximate map coordinates, copy and `nationwide.enabled` (false by default). Nationwide text invites an inquiry subject to location, requirements and availability. No branch or office claims are included.
Map boundary source: https://github.com/datasets/geo-countries (Natural Earth-derived country geometry), stored locally in `src/data/saudi-boundary.json`. SVG uses the same projection for boundary and city markers and requires no external map service.

## Quote form
Edit `quoteForm` in `src/config/company.ts` for labels, placeholders, validation messages and submission copy. Options use the existing categories and serviceAreas.cities. Set a verified international `company.phone` and explicitly set `quoteForm.whatsappConfirmed` to true only after confirmation. Until both are set, submission is disabled and the submit handler also prevents outbound navigation. No server submission, persistence or external form service is configured. The WhatsApp draft contains all entered fields and selected category/city names; it does not auto-send a message.
Validation was checked in browser: required name, malformed mobile, corrections, seven equipment options, five cities and disabled submission with valid inputs. Desktop 1440px and mobile 390px layouts checked without horizontal overflow.

## QA and SEO preparation — 4 November 2026
- Production build, TypeScript and local browser QA completed. Widths: 320, 390, 768, 1440px; no document/header horizontal overflow. Five homepage sections, seven cards, all anchor targets and field labels checked. RTL, Cairo, loaded logos, city markers and heading hierarchy retained.
- Form checked with five empty required fields, invalid mobile, corrected values, all seven category options, all five city options, duration and optional details. Valid form remains disabled. No data submitted externally. Mobile menu opens and closes after link selection; desktop navigation targets checked. Browser console error log empty.
- Fixed catalog WhatsApp confirmation guard and mobile-menu close behavior. Reduced catalog atlas from 2,638,242 bytes PNG to 230,770 bytes WebP. Original retained. Logos have descriptive Arabic alt text and responsive image sizes.
- Unique Arabic title/description, English supplemental description, Open Graph/Twitter, index/follow robots and Organization JSON-LD added. No tax/registration/contact/address data emitted. LocalBusiness deferred pending verified address. These checks are not a formal WCAG certification or measured Core Web Vitals audit.
- Set SITE_URL to the confirmed HTTPS production origin in deployment environment, then rebuild. Canonical, Organization URL/logo and sitemap URL derive from it. Until configured, no invented canonical is emitted, sitemap contains no URLs, and robots allows crawling without advertising an invented sitemap host.
- Remaining launch tasks: confirm production domain, official company spelling, company contact number and explicit WhatsApp confirmation; replace illustrative generated equipment visuals with approved fleet photographs if required; deploy, verify live status/canonical/robots/sitemap, run Google Rich Results Test and Search Console URL Inspection, then submit sitemap. Google indexing and ranking have not been verified.

## Senior review update — verified company details
The user confirmed the official Arabic/English names, +966569647944, unified/registration identifier and VAT number. These values are centralized in company.ts. WhatsApp confirmation now derives from company.whatsappConfirmed; equipment links, quote form, floating action and footer service links use the central number. Registration and VAT are displayed in footer only and excluded from JSON-LD. No address/email/social account was invented. Logo assets unchanged.
Fixed missing footer legal/service/copyright elements and missing floating action; adapted official-name wrapping; fixed equipment anchor display overriding flex inquiry-button alignment. Organization markup includes verified names/telephone. Production domain remains unset; LocalBusiness remains deferred pending verified address. Generated equipment illustrations remain identified as illustrative.
Checks: all nine WhatsApp anchor targets/messages inspected; quote empty/invalid/corrected values tested without outbound transmission; 320/390/768/1440 widths show no horizontal overflow and no missing anchor targets. Production build and explicit TypeScript check passed before final button-alignment/English metadata correction; final build re-run follows. External WhatsApp app handoff, live domain SEO and Google indexing are not verified.
