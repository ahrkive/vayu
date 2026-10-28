import DroneShowcase from "../sections/fleet/DroneShowcase";
import Gallery from "../sections/fleet/Gallery";
import { FLEET } from "../data/fleet";

const Fleet = () => {
    return (
        <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-8 lg:pt-40">
            <header className="max-w-3xl">
                <p className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
                    <span
                        className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                        aria-hidden="true"
                    />
                    02 — Airborne Systems
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                    The VAYU Fleet
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">
                    Three purpose-built unmanned aerial platforms engineered for
                    surveillance, heavy-lift delivery, and maritime rescue.
                </p>
            </header>

            <div
                className="mt-10 mb-14 h-px w-full bg-white/10"
                aria-hidden="true"
            />

            <div className="relative">
                <DroneShowcase fleet={FLEET} />
            </div>

            <Gallery />
        </main>
    );
};

export default Fleet;
