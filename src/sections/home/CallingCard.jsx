import { Link } from "react-router-dom";

const CallingCard = () => {
    return (
        <section id="calling-card" className="relative py-16 sm:py-24">
            {/* Drone anchor: flies away off-screen so the calling card gets full focus */}
            <div
                data-drone-anchor="calling-card-away"
                data-drone-away
                className="pointer-events-none absolute inset-x-0 top-0 h-[30vh]"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-8">
                {/* Main Card Frame using rounded-sm corners */}
                <div className="relative isolate overflow-hidden rounded-sm border border-white/10 bg-night-900/60 p-6 text-center backdrop-blur-md sm:p-10 lg:p-12">
                    {/* Subtle blue ambient backlights */}
                    <div
                        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-full max-w-xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_70%)]"
                        aria-hidden="true"
                    />

                    {/* Heading: Proportional to the rest of the home page */}
                    <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
                        NEED DRONE SOLUTIONS?
                    </h2>

                    {/* Description: Proportional body text */}
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        Need a workshop for your school or college? Planning a
                        technical session? Need guidance on student UAV
                        projects? Or looking to collaborate with our engineering
                        team? We are ready to assist.
                    </p>

                    {/* Action Buttons: Exact styling of Navbar Sponsor Us button */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        {/* Contact Us Primary Button */}
                        <Link
                            to="/sponsor"
                            className="inline-flex items-center gap-2 rounded-sm bg-sky-400 px-4 py-2.5 font-mono text-sm font-medium text-night-950 transition hover:bg-sky-300 sm:px-5"
                        >
                            <span>Contact Us</span>
                            <span aria-hidden="true">→</span>
                        </Link>

                        {/* Request a Workshop Secondary Button */}
                        <a
                            href="mailto:drone.vayu@iem.edu.in?subject=Workshop%20Request%20-%20Team%20VAYU"
                            className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-night-950/40 px-4 py-2.5 font-mono text-sm font-medium text-white transition hover:border-sky-400/50 hover:bg-white/5 hover:text-sky-300 sm:px-5"
                        >
                            <span>Request a Workshop</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>

                    {/* Thin Divider Line with subtle sky glow */}
                    <div
                        className="relative mx-auto mt-10 mb-6 max-w-3xl border-t border-white/10"
                        aria-hidden="true"
                    >
                        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
                    </div>

                    {/* Bottom Contact Information Row: Proportional monospace telemetry */}
                    <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-300 sm:gap-8 sm:text-sm">
                        {/* Email */}
                        <a
                            href="mailto:drone.vayu@iem.edu.in"
                            className="flex items-center gap-2 transition-colors hover:text-sky-300"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="size-4 shrink-0 text-sky-400"
                                aria-hidden="true"
                            >
                                <rect
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="16"
                                    rx="2"
                                />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span>drone.vayu@iem.edu.in</span>
                        </a>

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="size-4 shrink-0 text-sky-400"
                                aria-hidden="true"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>
                                <a
                                    href="tel:+919477008746"
                                    className="transition-colors hover:text-sky-300"
                                >
                                    +91 94770 08746
                                </a>
                                {" / "}
                                <a
                                    href="tel:+918100339923"
                                    className="transition-colors hover:text-sky-300"
                                >
                                    +91 81003 39923
                                </a>
                            </span>
                        </div>

                        {/* Institution / Location */}
                        <div className="flex items-center gap-2">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="size-4 shrink-0 text-sky-400"
                                aria-hidden="true"
                            >
                                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10v2M9 15v2M15 10v2M15 15v2" />
                            </svg>
                            <span>IEM Kolkata, India</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallingCard;
