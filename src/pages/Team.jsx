import TeamCard from "../sections/team/TeamCard";
import { CAPTAIN, DOMAINS, LEADS } from "../data/team";

// Small tag above a card in the row (shown on the lead and on the first member only)
const Slot = ({ label, children }) => (
    <div className="flex h-full flex-col">
        <p
            className={`mb-3 flex h-4 items-center gap-2 font-mono text-[10px] font-bold tracking-[0.25em] text-sky-300 uppercase ${label ? "" : "invisible"}`}
        >
            <span className="h-px w-4 bg-sky-400" aria-hidden="true" />
            {label ?? "Members"}
        </p>
        <div className="flex flex-1">{children}</div>
    </div>
);

// Lead first, then members, all in one row
const CardRow = ({ children }) => (
    <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {children}
    </div>
);

const SectionHeader = ({ id, number, name, count }) => (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-baseline gap-4">
            <span className="font-mono text-sm text-sky-300">{number}</span>
            <span className="text-slate-600" aria-hidden="true">
                /
            </span>
            <h2
                id={id}
                className="font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl"
            >
                {name}
            </h2>
        </div>
        <span className="font-mono text-xs tracking-[0.2em] text-slate-400 uppercase">
            {count} Members
        </span>
    </div>
);

const Team = () => {
    return (
        <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-8 lg:pt-40">
            <header className="max-w-3xl">
                <p className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-slate-300 uppercase">
                    <span
                        className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                        aria-hidden="true"
                    />
                    03 — Squadron Command
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                    The People Behind the Flight
                </h1>
            </header>

            {/* Command, laid out like the domains: captain, then leads, in one row */}
            <section className="mt-20" aria-labelledby="domain-command">
                <SectionHeader
                    id="domain-command"
                    number="00"
                    name="Squadron Command"
                    count={1 + LEADS.length}
                />

                <CardRow>
                    <Slot label="Captain">
                        <TeamCard
                            person={CAPTAIN}
                            tier="captain"
                            badge="Team Captain"
                        />
                    </Slot>
                    {LEADS.map((lead, i) => (
                        <Slot
                            key={lead.id}
                            label={i === 0 ? "Leads" : undefined}
                        >
                            <TeamCard
                                person={lead}
                                tier="lead"
                                badge={lead.role}
                            />
                        </Slot>
                    ))}
                </CardRow>
            </section>

            {/* Domains, Team Maverick style: numbered section, domain lead, then the team */}
            <div className="mt-24 space-y-24">
                {DOMAINS.map((domain, index) => {
                    const [lead, ...members] = domain.members;
                    return (
                        <section
                            key={domain.code ?? domain.name}
                            aria-labelledby={`domain-${index}`}
                        >
                            <SectionHeader
                                id={`domain-${index}`}
                                number={String(index + 1).padStart(2, "0")}
                                name={domain.name}
                                count={domain.members.length}
                            />

                            <CardRow>
                                <Slot label="Lead">
                                    <TeamCard
                                        person={lead}
                                        tier="domainLead"
                                        badge="Domain Lead"
                                    />
                                </Slot>
                                {members.map((member, i) => (
                                    <Slot
                                        key={member.id}
                                        label={i === 0 ? "Members" : undefined}
                                    >
                                        <TeamCard
                                            person={member}
                                            tier="member"
                                            badge={member.badge ?? "Member"}
                                        />
                                    </Slot>
                                ))}
                            </CardRow>
                        </section>
                    );
                })}
            </div>
        </main>
    );
};

export default Team;
