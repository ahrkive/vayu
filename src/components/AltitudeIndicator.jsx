import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";

// Scroll position shown as an altitude gauge: top of the page = 0 ft, bottom = MAX_ALTITUDE
const MAX_ALTITUDE = 300;
const TICK_STEP = 25;
const LABEL_STEP = 100;
const TICKS = Array.from(
    { length: MAX_ALTITUDE / TICK_STEP + 1 },
    (_, i) => i * TICK_STEP,
);

const AltitudeIndicator = () => {
    const { pathname } = useLocation();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 220,
        damping: 32,
        restDelta: 0.0005,
    });
    const [scrollable, setScrollable] = useState(false);

    // Hide on pages too short to scroll
    useEffect(() => {
        const check = () =>
            setScrollable(
                document.documentElement.scrollHeight > window.innerHeight + 8,
            );
        const observer = new ResizeObserver(check);
        observer.observe(document.body);
        window.addEventListener("resize", check);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", check);
        };
    }, [pathname]);

    return (
        <div
            id="altitude-indicator"
            className={`pointer-events-none fixed top-1/2 right-2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 font-gauge transition-opacity duration-500 md:flex sm:right-5 ${
                scrollable ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
        >
            <span className="hidden text-[10px] font-bold tracking-[0.2em] text-sky-300 sm:block">
                ALT
            </span>

            <div className="relative h-[32vh] sm:h-[40vh]">
                {/* Tick marks, 0 at the bottom; numbers only on bigger screens */}
                {TICKS.map((ft) => {
                    const major = ft % LABEL_STEP === 0;
                    return (
                        <div
                            key={ft}
                            className={`absolute right-full flex translate-y-1/2 items-center gap-1.5 pr-1.5 ${major ? "" : "max-sm:hidden"}`}
                            style={{ bottom: `${(ft / MAX_ALTITUDE) * 100}%` }}
                        >
                            {major && (
                                <span className="hidden text-[10px] text-slate-500 tabular-nums sm:block">
                                    {ft}
                                </span>
                            )}
                            <span
                                className={`h-px ${major ? "w-3 bg-slate-400" : "w-1.5 bg-slate-600"}`}
                            />
                        </div>
                    );
                })}

                {/* Gauge bar filling from the bottom */}
                <div className="relative h-full w-1 overflow-hidden rounded-full bg-white/10 sm:w-1.5">
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-linear-to-t from-sky-500 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                        style={{ scaleY: progress }}
                    />
                </div>
            </div>

            <span className="hidden text-[10px] font-bold tracking-[0.2em] text-slate-500 sm:block">
                FT
            </span>
        </div>
    );
};

export default AltitudeIndicator;
