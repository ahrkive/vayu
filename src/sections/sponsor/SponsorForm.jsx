import { useState } from 'react'

// Web3Forms delivers submissions to the inbox the access key was created for (drone.vayu@iem.edu.in).
// The key is meant to be public; set it in .env as VITE_WEB3FORMS_KEY (see .env.example).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const CONTACT_EMAIL = 'drone.vayu@iem.edu.in'

const EMPTY = { name: '', email: '', phone: '', message: '' }

// Optional; if filled: digits, spaces, + - ( ) only, with 7 to 15 digits
const isValidPhone = (value) => {
  if (!value.trim()) return true
  if (!/^[\d\s+\-()]+$/.test(value)) return false
  const digits = value.replace(/\D/g, '').length
  return digits >= 7 && digits <= 15
}

const inputClass =
  'mt-2 w-full rounded-sm border border-white/10 bg-night-950/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 disabled:opacity-60'
const labelClass = 'font-mono text-[11px] font-bold tracking-[0.2em] text-slate-200 uppercase'

const SponsorForm = ({ onSent }) => {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const update = (field) => (event) => setValues((v) => ({ ...v, [field]: event.target.value }))

  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending' || status === 'sent') return
    if (!isValidPhone(values.phone)) {
      setPhoneError('Enter a valid phone number (7 to 15 digits).')
      return
    }
    setPhoneError('')

    if (!ACCESS_KEY) {
      setStatus('error')
      setError(`The form isn't connected yet. Please email us at ${CONTACT_EMAIL}.`)
      return
    }

    setStatus('sending')
    setError('')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Sponsorship enquiry from ${values.name}`,
          from_name: 'Team VAYU website',
          name: values.name,
          email: values.email,
          phone: values.phone || 'Not provided',
          message: values.message || 'No message',
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.success === false) throw new Error(result.message || 'Request failed')
      setStatus('sent')
      onSent?.()
    } catch {
      setStatus('error')
      setError(`Couldn't send. Please try again, or email us at ${CONTACT_EMAIL}.`)
    }
  }

  const sent = status === 'sent'
  const sending = status === 'sending'

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="rounded-sm border border-white/10 bg-night-900/60 p-6 backdrop-blur-md sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="sponsor-name" className={labelClass}>
            Name <span className="text-sky-300">*</span>
          </label>
          <input id="sponsor-name" name="name" type="text" required autoComplete="name" value={values.name} onChange={update('name')} disabled={sent} className={inputClass} placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="sponsor-email" className={labelClass}>
            Email <span className="text-sky-300">*</span>
          </label>
          <input id="sponsor-email" name="email" type="email" required autoComplete="email" value={values.email} onChange={update('email')} disabled={sent} className={inputClass} placeholder="you@company.com" />
        </div>

        <div>
          <label htmlFor="sponsor-phone" className={labelClass}>
            Mobile No.
          </label>
          <input
            id="sponsor-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => {
              update('phone')(event)
              setPhoneError('')
            }}
            disabled={sent}
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? 'sponsor-phone-error' : undefined}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
          {phoneError && (
            <p id="sponsor-phone-error" className="mt-2 text-sm text-rose-400">
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sponsor-message" className={labelClass}>
            Leave a Message
          </label>
          <textarea id="sponsor-message" name="message" rows={5} value={values.message} onChange={update('message')} disabled={sent} className={`${inputClass} resize-y`} placeholder="Tell us how you'd like to partner with Team VAYU" />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending || sent}
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-mono text-sm font-medium transition ${
          sent ? 'cursor-default bg-emerald-400 text-night-950' : 'bg-sky-400 text-night-950 hover:bg-sky-300 disabled:opacity-70'
        }`}
      >
        {sent ? '✓ Thank you for contacting us' : sending ? 'Sending…' : 'Send Message'}
      </button>

      <p className="mt-3 text-xs text-slate-500">
        <span className="text-sky-300">*</span> Required
      </p>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-sm border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}
    </form>
  )
}

export default SponsorForm
