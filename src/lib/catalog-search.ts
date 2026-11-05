/** Search keys only: do not modify the displayed company/catalog text. */
export function normalizeSearch(value: string): string {
 return value.normalize('NFKC').toLowerCase().replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/\s+/g,'');
}
export function matchesEquipment(query: string, item: {name:string;englishName:string;searchAliases?:string[]}): boolean {
 const key=normalizeSearch(query);
 return !key || normalizeSearch(item.name).includes(key) || normalizeSearch(item.englishName).includes(key) || Boolean(item.searchAliases?.some(alias=>normalizeSearch(alias).includes(key)));
}
