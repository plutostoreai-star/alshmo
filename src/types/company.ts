export interface EquipmentCategory { id: string; name: string; englishName: string; description: string; imagePosition: string; image?: string; searchAliases?: string[]; imageCredit?: {author:string; source:string; license:string}; }
export interface CompanyConfig { name: string; englishName: string; registrationNumber: string; vatNumber: string; whatsappConfirmed: boolean; phone: string | null; email: string | null; address: string | null; googleMapsUrl: string | null; equipmentImage: string; categories: EquipmentCategory[]; }

