import { lazy, Suspense, useState } from 'react'
import SponsorForm from '../sections/sponsor/SponsorForm'

// three.js is large, so the drone scene loads separately
const DroneLaunch = lazy(() => import('../components/drone/DroneLaunch'))

const SponsorUs = () => {
  const [launched, setLaunched] = useState(false)

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-8 lg:pt-40">
      <header className="max-w-3xl">
        <p className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
          <span className="h-px w-10 bg-linear-to-r from-transparent to-sky-400" aria-hidden="true" />
          04 — Partner With Us
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
          Sponsor Team VAYU
        </h1>
        {/* DRAFT copy: to be reviewed by the team */}
        <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">
          Help power student-built autonomous UAVs. Leave your details and our team will get back to you.
        </p>
      </header>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Phones: form first, drone below. Desktop: drone left, form right */}
        <div className="order-last h-[380px] sm:h-[460px] lg:order-first lg:h-[560px]" aria-hidden="true">
          <Suspense fallback={null}>
            <DroneLaunch launched={launched} />
          </Suspense>
        </div>

        <SponsorForm onSent={() => setLaunched(true)} />
      </div>
    </main>
  )
}

export default SponsorUs
