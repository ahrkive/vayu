import LogoLoop from "../../components/reactbits/LogoLoop";
import { SPONSORS } from "../../data/sponsors";

// White logo by default; the original colours fade in on hover
const LOGOS = SPONSORS.map((sponsor) => ({
    title: sponsor.name,
    ariaLabel: sponsor.name,
    node: (
        <span className="relative block">
            <img
                src={sponsor.logoWhite}
                alt=""
                draggable={false}
                className="block h-[var(--logoloop-logoHeight)] w-auto transition-opacity duration-300 group-hover/item:opacity-0"
            />
            <img
                src={sponsor.logo}
                alt=""
                draggable={false}
                className="absolute inset-0 block h-full w-auto opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
            />
        </span>
    ),
}));

const SponsorBelt = () => {
  return (
    <div className="relative py-12">
      <p className="mx-auto mb-6 flex max-w-7xl items-center gap-4 px-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase sm:px-8">
        <span className="h-px w-10 bg-linear-to-r from-transparent to-sky-400" aria-hidden="true" />
        Our Sponsors
      </p>
      <div className="border-y border-white/10 bg-night-950/40 py-8 backdrop-blur-sm">
        <LogoLoop logos={LOGOS} speed={60} logoHeight={48} gap={120} pauseOnHover={false} fadeOut ariaLabel="Our sponsors" />
      </div>
    </div>
  )
}

export default SponsorBelt;
