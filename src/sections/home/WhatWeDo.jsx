import { useEffect } from 'react'
import { WHAT_WE_DO } from '../../data/whatWeDo'
import { droneLook } from '../../components/drone/lookTarget'

// Point the drone at the hovered row (a bit left of centre, where the title is)
const lookAtRow = (event) => {
  const r = event.currentTarget.getBoundingClientRect()
  droneLook.target = { x: r.left + r.width * 0.35, y: r.top + r.height / 2 }
}
const stopLooking = () => {
  droneLook.target = null
}

const WhatWeDo = () => {
  useEffect(() => stopLooking, [])

  return (
    <section id="what-we-do" className="relative py-24 lg:py-32">
      {/* Phones: no drone in this section, it flies off to the left */}
      <div data-drone-anchor="what-we-do-away" data-drone-away className="pointer-events-none absolute inset-x-0 top-0 h-[30vh] lg:hidden" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <header>
            <p className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
              02
              <span className="h-px w-10 bg-linear-to-r from-transparent to-sky-400" aria-hidden="true" />
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-white uppercase sm:text-4xl">
              What We Do
            </h2>
          </header>

          <ul className="mt-10 border-t border-white/10">
            {WHAT_WE_DO.map((item) => (
              <li
                key={item.number}
                onMouseEnter={lookAtRow}
                onMouseLeave={stopLooking}
                className="group relative isolate grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-white/10 py-7 sm:gap-x-6"
              >
                {/* Soft sky glow behind the row */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left,rgba(56,189,248,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {/* Bottom line fills with sky blue from the left */}
                <span
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-sky-400 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <span className="font-mono text-sm text-slate-400">{item.number}</span>
                <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-sky-300">
                  {item.title}
                </h3>
                {/* Arrow spins round and nudges outwards */}
                <span
                  className="text-xl text-slate-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-405 group-hover:text-sky-300 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  ↗
                </span>
                <p className="col-start-2 leading-relaxed text-slate-300">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: the drone hovers in the right half */}
        <div
          data-drone-anchor="what-we-do"
          data-drone-yaw="-0.55"
          data-drone-follow
          className="hidden h-[50vh] lg:block"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

export default WhatWeDo
