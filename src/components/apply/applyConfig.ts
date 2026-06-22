export type TotalProcessed =
  | 'brand_new'
  | 'under_10k'
  | '10k_50k'
  | '10k_100k'
  | '100k_plus'
export type InstantPayouts = 'yes' | 'no' | 'not_sure'
export type LegalEntity = 'uk_ltd' | 'us_llc' | 'international' | 'individual'

export type ApplyFormData = {
  fullName: string
  phoneNumber: string
  phoneCountry: string
  emailAddress: string
  telegramUsername: string
  totalProcessed: TotalProcessed
  instantPayouts: InstantPayouts
  legalEntity: LegalEntity
}

export const initialApplyData: ApplyFormData = {
  fullName: '',
  phoneNumber: '',
  phoneCountry: 'GB',
  emailAddress: '',
  telegramUsername: '',
  totalProcessed: 'brand_new',
  instantPayouts: 'yes',
  legalEntity: 'uk_ltd',
}

export const TOTAL_STEPS = 5

export const volumeOptions: { value: TotalProcessed; label: string }[] = [
  { value: 'brand_new', label: '$0 (Brand New)' },
  { value: 'under_10k', label: 'Under $10,000' },
  { value: '10k_50k', label: '$10,000 - $50,000' },
  { value: '10k_100k', label: '$50,000 - $100,000' },
  { value: '100k_plus', label: '$100,000+' },
]

export const instantPayoutOptions: { value: InstantPayouts; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: "I'm not sure" },
]

export const legalEntityOptions: { value: LegalEntity; label: string }[] = [
  { value: 'uk_ltd', label: 'UK Limited Company (LTD)' },
  { value: 'us_llc', label: 'US LLC' },
  { value: 'international', label: 'Other International Entity' },
  { value: 'individual', label: 'Individual / Sole Proprietorship' },
]
