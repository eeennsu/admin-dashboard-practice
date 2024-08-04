import type { BusinessType, CompanySize, Contact, Industry } from '@/graphql/schema.types'

export const COMPANY_SIZE_OPTIONS: Record<string, CompanySize> = {
    enterprise: 'ENTERPRISE',
    large: 'LARGE',
    medium: 'MEDIUM',
    small: 'SMALL',
}

export const COMPANY_INDUSTRY_OPTIONS: Record<string, Industry> = {
    aerospace: 'AEROSPACE',
    agriculture: 'AGRICULTURE',
    automotive: 'AUTOMOTIVE',
    chemicals: 'CHEMICALS',
    construction: 'CONSTRUCTION',
    defense: 'DEFENSE',
    education: 'EDUCATION',
    energy: 'ENERGY',
    financial_services: 'FINANCIAL_SERVICES',
    food_and_beverage: 'FOOD_AND_BEVERAGE',
    government: 'GOVERNMENT',
    healthcare: 'HEALTHCARE',
    hospitality: 'HOSPITALITY',
    industrial_manufacturing: 'INDUSTRIAL_MANUFACTURING',
    insurance: 'INSURANCE',
    life_sciences: 'LIFE_SCIENCES',
    logistics: 'LOGISTICS',
    media: 'MEDIA',
    mining: 'MINING',
    nonprofit: 'NONPROFIT',
    other: 'OTHER',
    pharmaceuticals: 'PHARMACEUTICALS',
    professional_services: 'PROFESSIONAL_SERVICES',
    real_estate: 'REAL_ESTATE',
    retail: 'RETAIL',
    technology: 'TECHNOLOGY',
    telecommunications: 'TELECOMMUNICATIONS',
    transportation: 'TRANSPORTATION',
    utilities: 'UTILITIES',
}

export const COMPANY_BUSINESS_TYPE_OPTIONS: Record<string, BusinessType> = {
    B2B: 'B2B',
    B2C: 'B2C',
    B2G: 'B2G',
}

export const CONTACT_STATUS_OPTIONS: Record<string, Contact['status']> = {
    new: 'NEW',
    qualified: 'QUALIFIED',
    unqualified: 'UNQUALIFIED',
    won: 'WON',
    negotiation: 'NEGOTIATION',
    lost: 'LOST',
    interested: 'INTERESTED',
    contacted: 'CONTACTED',
    churned: 'CHURNED',
}
