import administrativeAreas from '@/data/saudi-administrative-areas.json';
import type { CompanyConfig } from '@/types/company';
// Use an international number including country code. Leave null until verified.
// Images are illustrative and do not represent the company's actual fleet.
export const company: CompanyConfig = {
 name: 'مؤسسة رافعات الشموخ المتقدمة', englishName: 'ADVANCED AL-SHUMOUKH CRANES EST.', registrationNumber: '7038674425', vatNumber: '312133755600003', whatsappConfirmed: true, phone: '+966569647944', email: null, address: null,
 googleMapsUrl: 'https://maps.app.goo.gl/RUjmrfTVafM6oU9s9',
 equipmentImage: '/images/equipment-catalog.webp',
 categories: [
 { id: 'man-lift', name: 'مان لفت ديزل', englishName: 'Man Lift', description: 'استفسر عن مان لفت ديزل لأعمال الوصول المرتفعة، وحدد ارتفاع العمل المناسب لمتطلبات مشروعك.', imagePosition: 'center', image: '/images/equipment/man-lift.webp', searchAliases: ['Man Lift','Manlift','Boom Lift','مان لفت','مانلفت'], imageCredit: {author:'Chris Woodrich',source:'https://commons.wikimedia.org/wiki/File:JLG_Articulated_Boom_Lift,_London,_Ontario,_2026-08-01.jpg',license:'https://creativecommons.org/licenses/by-sa/4.0/'} },
 { id: 'forklifts', name: 'رافعات شوكية', englishName: 'Forklifts', description: 'استفسر عن الرافعات الشوكية لأعمال مناولة المواد داخل موقعك.', imagePosition: '0% 0%' },
 { id: 'scissor', name: 'رافعات مقصية', englishName: 'Scissor lifts', description: 'ناقش احتياجات الوصول الرأسي وأعمال الصيانة في مشروعك.', imagePosition: '33.333% 0%' },
 { id: 'telescopic', name: 'رافعات تلسكوبية', englishName: 'Telehandler', description: 'رافعة تلسكوبية لرفع ونقل المواد إلى مناطق العمل المرتفعة. استفسر عن ملاءمتها لمتطلبات مشروعك والتوفر.', imagePosition: 'center', image: '/images/equipment/jcb-telehandler-17m.webp', imageAlt: 'صورة مقدمة من العميل لرافعة تلسكوبية JCB بارتفاع عمل 17 متراً', specificationLabel: 'JCB – ارتفاع 17 متر', searchAliases: ['رافعة تلسكوبية','تلسكوبية','Telehandler','JCB','17m','17 متر'] },
 { id: 'bobcat', name: 'بوبكات', englishName: 'Bobcat', description: 'استفسر عن معدات التحميل المدمجة لأعمال الموقع.', imagePosition: '100% 0%' },
 { id: 'jcb', name: 'جي سي بي', englishName: 'JCB', description: 'ناقش متطلبات الحفر والتحميل وتجهيز موقع المشروع.', imagePosition: '0% 100%' },
 { id: 'cranes', name: 'كرينات', englishName: 'Cranes', description: 'شارك تفاصيل أعمال الرفع للاستفسار عن المعدة المناسبة.', imagePosition: '33.333% 100%' },
 { id: 'boom-trucks', name: 'بوم ترك', englishName: 'Boom trucks', description: 'استفسر عن الشاحنات المزودة برافعة لاحتياجات موقعك.', imagePosition: '66.667% 100%' },
 ],
};
export const catalog = {
 eyebrow: 'فئات المعدات / EQUIPMENT', title: 'المعدة المناسبة.\nتبدأ من هنا.',
 introduction: `${company.categories.length} فئات لاستكشاف احتياجات مشروعك. اختر الفئة وأرسل استفسارك لمناقشة المتطلبات والتوفر.`,
 inquiryLabel: 'استفسر عبر واتساب', unavailableLabel: 'واتساب غير مفعّل حالياً',
 unavailableNote: 'ستُفعّل أزرار الاستفسار بعد إضافة رقم الشركة المعتمد.',
 imageNote: 'يتضمن الكتالوج صوراً توضيحية وصورة رافعة JCB المقدمة من العميل. يُرجى التواصل للتحقق من التوفر والمواصفات.',
 message: (name: string) => `مرحباً، أود الاستفسار عن تأجير ${name}. يرجى إفادتي بالتوفر والتفاصيل المناسبة لمشروعي.`,
};
export const navigation = [{ label: 'الرئيسية', href: '#home' }, { label: 'المعدات', href: '#equipment' }, { label: 'نطاق الخدمة', href: '#service-areas' }, { label: 'طلب عرض سعر', href: '#request-quote' }, { label: 'تواصل معنا', href: '#contact' }];
export const brand = { logo: '/images/brand/logo-transparent.png', width: 160, height: 160 };
export const serviceAreas = {
 eyebrow: 'نطاق الخدمة / AREAS WE SERVE', title: 'أينما يبدأ مشروعك،\nلنتحدث عن احتياجاته.',
 description: 'استفسر عن خدمات تأجير المعدات في المدن التالية. يُحدّد التوفر وإمكانية تقديم الخدمة بحسب موقع المشروع ومتطلباته.',
 cities: [
 { id: 'dammam', name: 'الدمام', englishName: 'Dammam', longitude: 50.1, latitude: 26.42, labelX: 20, labelY: -12 },
 { id: 'riyadh', name: 'الرياض', englishName: 'Riyadh', longitude: 46.72, latitude: 24.71, labelX: 18, labelY: 27 },
 { id: 'jeddah', name: 'جدة', englishName: 'Jeddah', longitude: 39.17, latitude: 21.54, labelX: -24, labelY: -14 },
 { id: 'makkah', name: 'مكة المكرمة', englishName: 'Makkah', longitude: 39.86, latitude: 21.39, labelX: 27, labelY: 28 },
 { id: 'jazan', name: 'جيزان', englishName: 'Jazan', longitude: 42.55, latitude: 16.89, labelX: 23, labelY: 15 },
 ],
 nationwide: { enabled: false, title: 'مشروعك في مدينة أخرى؟', description: 'يمكنك الاستفسار عن إمكانية تقديم الخدمة في أنحاء المملكة العربية السعودية، بحسب الموقع ومتطلبات المشروع والتوفر.' },
 inquiryLabel: 'استفسر عن موقع مشروعك', mapNote: 'مواقع المدن تقريبية، ولا تشير إلى عناوين مكاتب أو فروع.',
};


export const quoteForm = {
 otherCityLabel: 'مدينة أخرى', manualCityLabel: 'اكتب اسم المدينة', manualCityPlaceholder: 'أدخل اسم المدينة التي يقع فيها مشروعك',
 title: 'اطلب عرض سعر لمشروعك', eyebrow: 'طلب عرض سعر / REQUEST A QUOTE',
 introduction: 'شارك متطلباتك لتجهيز استفسار واضح عن المعدات المطلوبة.',
 labels: { name: 'الاسم', mobile: 'رقم الجوال', equipment: 'نوع المعدة', region: 'المنطقة الإدارية', governorate: 'المحافظة / مقر الإمارة', city: 'المدينة', duration: 'مدة الإيجار', details: 'تفاصيل الطلب' },
 placeholders: { name: 'الاسم الكامل', mobile: 'رقم الجوال مع رمز الدولة', equipment: 'اختر نوع المعدة', region: 'اختر المنطقة الإدارية', governorate: 'اختر المحافظة أو مقر الإمارة', city: 'اكتب اسم المدينة', duration: 'مثال: أسبوع أو شهر', details: 'أضف ما يساعدنا على فهم احتياجات مشروعك' },
 errors: { required: 'يرجى إكمال هذا الحقل.', mobile: 'أدخل رقم جوال صحيحاً من 7 إلى 15 رقماً، ويمكن إضافة رمز الدولة.', summary: 'يرجى مراجعة الحقول الموضحة أدناه.' },
 optional: 'اختياري', requiredNote: 'الحقول المعلّمة بـ * مطلوبة.',
 submit: 'إرسال الطلب عبر واتساب', disabled: 'الإرسال غير مفعّل حالياً',
 disabledNote: 'سيُفعّل الإرسال بعد اعتماد رقم واتساب الشركة. لا تُرسل بياناتك حالياً.',
 privacyNote: 'عند الإرسال، سيفتح واتساب برسالة تتضمن بيانات الطلب لتراجعها قبل إرسالها.',
 whatsappConfirmed: company.whatsappConfirmed,
 messageTitle: 'طلب عرض سعر لتأجير المعدات',
 openedLabel: 'تم فتح نافذة واتساب',
 openedNote: 'فُتحت نافذة المتابعة. إذا لم يظهر واتساب، استخدم الرابط التالي. لم يتم إرسال رسالة تلقائياً.',
 openError: 'تعذّر فتح نافذة واتساب. قد يكون المتصفح قد حظرها. اسمح بالنوافذ المنبثقة أو استخدم الرابط التالي:',
 fallbackLabel: 'فتح واتساب بالطلب المجهّز',
};



export const customerService = { label: 'خدمة العملاء عبر واتساب', message: 'مرحباً، أود التواصل مع خدمة العملاء في مؤسسة رافعات الشموخ المتقدمة للاستفسار عن تأجير المعدات.' };


// Requested specifications are inquiry options, not a statement of inventory.
export const equipmentSpecifications = {
 telescopic: {
  note:'بيانات الطلب تخص رافعة تلسكوبية JCB بارتفاع 17 متراً. التوفر وملاءمة المعدة للمشروع يتطلبان تأكيد الشركة.',
  inquiryLabel:'اطلب عرض سعر – JCB 17 متر',
  fields:[
   {id:'brand',label:'العلامة التجارية',fixed:{value:'jcb',label:'JCB'}},
   {id:'height',label:'ارتفاع العمل المطلوب',fixed:{value:'17',label:'17 متر'}}
  ]
 },
 'man-lift': {
  note:'الارتفاعات خيارات للاستفسار فقط. المواصفات النهائية والتوفر تتطلب تأكيد الشركة.',
  inquiryLabel:'حدد المواصفات واطلب عرض سعر',
  fields:[
   {id:'power',label:'نوع الوقود',fixed:{value:'diesel',label:'ديزل'}},
   {id:'height',label:'ارتفاع العمل المطلوب',options:[12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,43].map(n=>({value:String(n),label:`${n} متر`}))}
  ]
 },
 scissor: {
  note: 'الارتفاعات خيارات للاستفسار فقط. المواصفات النهائية والتوفر تتطلب تأكيد الشركة.',
  inquiryLabel: 'حدد المواصفات واطلب عرض سعر',
  fields: [
   { id: 'power', label: 'نوع الطاقة', options: [{value:'electric',label:'رافعة مقصية كهربائية'},{value:'diesel',label:'رافعة مقصية ديزل'}] },
   { id: 'height', label: 'ارتفاع العمل المطلوب', dependsOn: 'power', optionsByValue: {
    electric: [6,8,10,12,14,16].map(n=>({value:String(n),label:`${n} متر`})),
    diesel: Array.from({length:45},(_,index)=>index+12).map(n=>({value:String(n),label:`${n} متر`}))
   }, custom: { label:'مقاس آخر', inputLabel:'ارتفاع العمل المطلوب بالمتر', placeholder:'أدخل الارتفاع بالمتر', error:'أدخل ارتفاعاً صحيحاً أكبر من صفر بالمتر.' } }
  ]
 }
} satisfies Record<string, import('@/lib/equipment-specifications').SpecificationConfig>;

export const administrativeLocations = { ...administrativeAreas, sourceUrl: 'https://gis.taadeen.sa/server/rest/services/Common/BaseMaps/MapServer/2', note: 'اختر موقع المشروع للاستفسار فقط. إمكانية الخدمة والتوفر تتطلب تأكيد الشركة. تشمل القائمة المحافظات ومقار الإمارات بحسب المصدر الجغرافي.', regionLabel: 'المنطقة الإدارية', governorateLabel: 'المحافظة / مقر الإمارة', regionPlaceholder: 'اختر المنطقة الإدارية', governoratePlaceholder: 'اختر المحافظة أو مقر الإمارة' };
