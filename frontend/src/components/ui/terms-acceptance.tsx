import { useState } from 'react'
import Link from 'next/link'
import { Checkbox } from './checkbox'

interface TermsAcceptanceProps {
  onAccept: (accepted: boolean) => void
  required?: boolean
  className?: string
}

export function TermsAcceptance({ onAccept, required = true, className = '' }: TermsAcceptanceProps) {
  const [accepted, setAccepted] = useState(false)

  const handleAcceptanceChange = (checked: boolean) => {
    setAccepted(checked)
    onAccept(checked)
  }

  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <Checkbox
        id="terms-acceptance"
        checked={accepted}
        onCheckedChange={handleAcceptanceChange}
        required={required}
        className="mt-1"
      />
      <label htmlFor="terms-acceptance" className="text-sm text-gray-700 leading-relaxed">
        I have read and agree to the{' '}
        <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
          Privacy Policy
        </Link>
        {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  )
} 