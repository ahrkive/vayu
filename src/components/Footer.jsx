import { Link } from 'react-router-dom'
import logoMark from '../assets/Home/logo-mark.png'

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/teamvayu.iemk/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/teamvayu',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3V9.75zm7 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.85h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75z" />
      </svg>
    ),
  },
]

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-night-950/80 backdrop-blur-md">
      {/* Full width; extra right padding on bigger screens keeps content clear of the altitude gauge */}
      <div className="flex w-full flex-col gap-10 px-4 py-14 sm:px-8 md:flex-row md:items-start md:justify-between md:pr-28 lg:pl-12">

        {/* Brand */}
        <div className="max-w-md">
          <Link to="/" className="flex items-center gap-3" aria-label="Team VAYU home">
            <img src={logoMark} alt="" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold tracking-wide text-white">TEAM VAYU</span>
          </Link>
          <p className="mt-4 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-sky-400" aria-hidden="true" />
            Engineering the future of flight
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            A student-led aerospace and autonomous UAV engineering team from IEM (Institute of Engineering &amp;
            Management), Kolkata.
          </p>
        </div>

        {/* Sponsor call-out + socials */}
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          {/* DRAFT copy: to be reviewed by the team */}
          <div>
            <p className="font-display text-sm font-bold tracking-wide text-white uppercase">Help us fly higher</p>
            <p className="mt-2 text-sm text-slate-400">Partner with Team VAYU and power the next generation of UAVs.</p>
            <Link
              to="/sponsor"
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-sky-400 px-4 py-2.5 font-mono text-sm font-medium text-night-950 transition hover:bg-sky-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
              </svg>
              Sponsor Us
            </Link>
          </div>

          <ul className="flex gap-3">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Team VAYU on ${social.name}`}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-slate-300 transition duration-300 hover:border-sky-400/60 hover:text-sky-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
