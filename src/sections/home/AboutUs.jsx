import { ABOUT_FEATURES, INSTAGRAM_URL } from "../../data/about";

const card =
    "rounded-sm border border-white/10 bg-night-900/60 backdrop-blur-md";

const AboutUs = () => {
    return (
        <section id="about" className="relative py-24 lg:py-32">
            {/* Phones: no drone in this section, it flies off to the left */}
            <div
                data-drone-anchor="about-away"
                data-drone-away
                className="pointer-events-none absolute inset-x-0 top-0 h-[30vh] lg:hidden"
                aria-hidden="true"
            />

            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-2">
                {/* Desktop: the drone hovers on the left and drifts down as the content scrolls by */}
                <div
                    data-drone-anchor="about"
                    data-drone-yaw="0.6"
                    data-drone-drift
                    className="hidden h-[50vh] lg:block"
                    aria-hidden="true"
                />

                <div className="space-y-6">
                    <header>
                        <p className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
                            <span
                                className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                                aria-hidden="true"
                            />
                            01.1 — Squadron Identity
                        </p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            WHO WE ARE
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                            Pioneering autonomous aerial systems through
                            rigorous computational aerodynamics, composite
                            manufacturing, and autonomous flight testing.
                        </p>
                    </header>

                    <article className={`${card} p-6 sm:p-8`}>
                        <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase">
                            Born at IEM Kolkata
                        </h3>
                        <p className="mt-4 leading-relaxed text-slate-300">
                            Founded at the Institute of Engineering &amp;
                            Management (IEM), Kolkata, Team VAYU brings together
                            visionary student roboticists, composite
                            technicians, and avionics algorithm engineers. We
                            bridge theoretical aerospace research with
                            flight-tested reality.
                        </p>
                        <p className="mt-4 leading-relaxed text-slate-300">
                            From persistent surveillance quadcopters to
                            heavy-lift payload relief hexacopters and
                            all-weather marine rescue drones, our mission is to
                            build robust airborne platforms capable of operating
                            in mission-critical environments.
                        </p>
                    </article>

                    <ul className="space-y-3">
                        {ABOUT_FEATURES.map((feature) => (
                            <li
                                key={feature.number}
                                className={`${card} flex gap-5 p-5 sm:p-6`}
                            >
                                <span className="font-mono text-sm text-sky-300">
                                    {feature.number}
                                </span>
                                <div>
                                    <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                        {feature.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <article className={`${card} p-6 sm:p-8`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs tracking-[0.2em] uppercase">
                            <span className="text-sky-300">
                                Academic Affiliation
                            </span>
                            <span className="text-slate-500">
                                Kolkata, India
                            </span>
                        </div>
                        <h3 className="mt-4 font-display text-lg font-bold tracking-wide text-white uppercase">
                            Institute of Engineering &amp; Management
                        </h3>
                        <p className="mt-4 leading-relaxed text-slate-300">
                            Providing state-of-the-art laboratory facilities,
                            composite fabrication bays, and testing support for
                            Team VAYU&apos;s flight research initiatives.
                        </p>
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-6 inline-flex items-center gap-2 rounded-sm bg-sky-400 px-3 py-2.5 font-mono text-sm font-medium whitespace-nowrap text-night-950 transition hover:bg-sky-300 sm:px-4"
                        >
                            Follow @teamvayu.iemk
                            <span
                                className="transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
