import PhoneInputLib from 'react-phone-number-input'
import type { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type PhoneInputProps = {
  value: string
  country: Country
  onPhoneChange: (phone: string) => void
  onCountryChange: (country: Country) => void
  error?: string
}

export function PhoneInput({
  value,
  country,
  onPhoneChange,
  onCountryChange,
  error,
}: PhoneInputProps) {
  return (
    <div>
      <PhoneInputLib
        international
        countryCallingCodeEditable={false}
        country={country}
        value={value || undefined}
        onChange={(next) => onPhoneChange(next ?? '')}
        onCountryChange={(next) => {
          if (next) onCountryChange(next)
        }}
        className={`pp-phone-input ${error ? 'pp-phone-input--error' : ''}`}
        numberInputProps={{
          'aria-invalid': error ? true : undefined,
        }}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-accent">{error}</p>}
    </div>
  )
}