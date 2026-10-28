const DroneCard = ({ drone, reverse }) => {
    return (
        <div className="relative">
            {/* Timeline node dot on the line */}
            <div
                className="absolute left-3 sm:left-4 md:left-1/2 top-1/2 size-3.5 sm:size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night-950 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] z-10"
                aria-hidden="true"
            />

            {/* Rotated callsign on desktop */}
            <div
                className={`absolute ${
                    reverse
                        ? "left-0 lg:left-[-40px]"
                        : "right-0 lg:right-[-40px]"
                } top-1/2 -translate-y-1/2 rotate-90 font-mono text-2xl lg:text-3xl font-bold tracking-widest text-sky-400/70 select-none hidden md:block`}
                aria-hidden="true"
            >
                {drone.callsign}
            </div>

            {/* Alternating row layout */}
            <div
                className={`md:flex ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-6 md:gap-8 ml-6 sm:ml-8 md:ml-0`}
            >
                <div
                    className={`w-full md:w-1/2 ${
                        reverse
                            ? "md:pl-12 lg:md:pl-14"
                            : "md:pr-12 lg:md:pr-14"
                    }`}
                >
                    <article
                        id={drone.id}
                        className="group/card relative overflow-hidden rounded-sm border border-white/10 bg-night-900/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-sky-400/40 hover:shadow-[0_8px_32px_rgba(56,189,248,0.18)] scroll-mt-28"
                    >
                        {/* Image banner with hover zoom */}
                        <div className="relative overflow-hidden group">
                            <img
                                src={drone.photo}
                                alt={`${drone.name}, Team VAYU ${drone.configuration.toLowerCase()}`}
                                loading="lazy"
                                className="w-full h-52 xs:h-64 sm:h-80 md:h-96 object-cover transition-all duration-700 will-change-transform transform-gpu group-hover:scale-105"
                            />
                            {/* Mobile callsign badge */}
                            <div className="md:hidden absolute top-3 right-3 bg-night-950/85 backdrop-blur-sm border border-sky-400/40 rounded-full px-2.5 py-0.5">
                                <span className="text-sky-300 font-mono text-xs font-bold tracking-widest">
                                    {drone.callsign}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 sm:p-6 md:p-8">
                            <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl font-bold text-white uppercase mb-2">
                                {drone.name}
                            </h2>
                            <p className="font-semibold text-white/90 text-sm sm:text-base mb-3 leading-snug">
                                {drone.headline}
                            </p>
                            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                                {drone.description}
                            </p>

                            <div className="h-px bg-white/10 mb-4 sm:mb-5" />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                                {drone.stats.map((stat) => (
                                    <div key={stat.label} className="min-w-0">
                                        <p className="text-sky-400 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-[0.18em] uppercase mb-1 truncate">
                                            {stat.label}
                                        </p>
                                        <p className="text-white font-display text-sm sm:text-base md:text-lg font-semibold truncate">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

const DroneShowcase = ({ fleet }) => (
    <div className="relative pb-8">
        {/* Desktop central vertical timeline line */}
        <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-sky-400/20 via-sky-400 to-sky-400/20 -translate-x-1/2"
            aria-hidden="true"
        />

        {/* Mobile left-aligned vertical line */}
        <div
            className="md:hidden absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-sky-400/60 -translate-x-1/2"
            aria-hidden="true"
        />

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {fleet.map((drone, index) => (
                <DroneCard
                    key={drone.id}
                    drone={drone}
                    reverse={index % 2 === 1}
                />
            ))}
        </div>
    </div>
);

export default DroneShowcase;
