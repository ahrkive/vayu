import { motion } from "motion/react";
import { HERO_STATS } from "../../data/hero";
import { HERO_TEXT_DELAY } from "../../components/drone/timing";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: HERO_TEXT_DELAY },
    },
};

const item = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative flex min-h-svh items-center pt-24 pb-16 lg:pt-28"
        >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="z-10"
                >
                    <motion.p
                        variants={item}
                        className="font-mono text-[11px] tracking-[0.25em] text-slate-400 uppercase"
                    >
                        IEM Kolkata · Institute of Engineering &amp; Management
                    </motion.p>

                    <motion.h1
                        variants={item}
                        className="mt-6 font-display text-6xl leading-[0.9] font-bold tracking-tight sm:text-7xl xl:text-8xl"
                    >
                        <span className="group relative inline-block cursor-default transition-[filter] duration-500 hover:drop-shadow-[0_0_28px_rgba(125,211,252,0.55)]">
                            <span className="text-white">TEAM</span>{" "}
                            <span className="bg-linear-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                                VAYU
                            </span>
                            {/* Shine sweep on hover: snaps back instantly so it replays on every hover */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_42%,rgba(255,255,255,0.95)_50%,transparent_58%)] bg-size-[250%_100%] bg-clip-text bg-position-[130%_0] bg-no-repeat text-transparent transition-[background-position] duration-0 select-none group-hover:bg-position-[-30%_0] group-hover:duration-1000 group-hover:ease-out"
                            >
                                TEAM VAYU
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mt-6 flex items-center gap-4 font-mono text-xs font-medium tracking-[0.2em] text-slate-200 uppercase sm:text-sm sm:tracking-[0.35em]"
                    >
                        <span
                            className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                            aria-hidden="true"
                        />
                        Engineering the future of flight
                    </motion.p>

                    <motion.p
                        variants={item}
                        className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg"
                    >
                        The premier student aerospace and autonomous UAV
                        engineering team from IEM, Kolkata. Designing,
                        fabricating, and flight-testing mission-critical
                        autonomous aerial robotics.
                    </motion.p>

                    <motion.dl
                        variants={item}
                        className="mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-4"
                    >
                        {HERO_STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col-reverse gap-1 bg-night-900/80 px-4 py-4 backdrop-blur"
                            >
                                <dt className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                                    {stat.label}
                                </dt>
                                <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>

                {/* The 3D drone hovers inside this box (see DroneScene) */}
                <div
                    data-drone-anchor="hero"
                    data-drone-yaw="-0.55"
                    className="order-first h-[34vh] lg:order-last lg:h-[70vh]"
                    aria-hidden="true"
                />
            </div>
        </section>
    );
};

export default Hero;
