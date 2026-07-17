export type TotalProcessed =
  | 'under_10k'
  | 'under_25k'
  | '25k_50k'
  | '50k_100k'
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
  totalProcessed: 'under_25k',
  instantPayouts: 'yes',
  legalEntity: 'uk_ltd',
}

export const TOTAL_STEPS = 5

export const volumeOptions: { value: TotalProcessed; label: string }[] = [
  { value: 'under_25k', label: 'Under 25,000' },
  { value: '25k_50k', label: '25,000 - 50,000' },
  { value: '50k_100k', label: '50,000 - 100,000' },
  { value: '100k_plus', label: '100,000+' },
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
