import { useEffect, useRef, useState } from "react";

/**
 * Custom Paperplane Flight Cursor for Team VAYU.
 * - Origami paperplane with fixed aerodynamic orientation (-35deg pointer stance).
 * - Instantaneous 1:1 hardware coordinate tracking directly at the nose tip (hotspot).
 * - No particle trails, no rotation/banking.
 * - Avionics target-lock ring & afterburner flare on interactive elements.
 * - Tactile click compression.
 * - Automatically bypassed on touch devices.
 */
const CustomCursor = () => {
    const [enabled] = useState(() => {
        if (typeof window === "undefined") return false;
        return !window.matchMedia("(pointer: coarse)").matches;
    });

    const planeWrapperRef = useRef(null);
    const planeInnerRef = useRef(null);
    const hudRingRef = useRef(null);

    const isHovering = useRef(false);
    const isMouseDown = useRef(false);
    const isVisible = useRef(false);

    useEffect(() => {
        if (!enabled) return;

        const wrapper = planeWrapperRef.current;
        const inner = planeInnerRef.current;
        const hud = hudRingRef.current;

        const updateVisuals = () => {
            if (!inner) return;
            const hover = isHovering.current;
            const down = isMouseDown.current;
            const scale = down ? 0.85 : hover ? 1.2 : 1.0;

            inner.style.transform = `rotate(-35deg) scale(${scale})`;

            if (hover) {
                inner.style.filter =
                    "drop-shadow(0 2px 6px rgba(14, 165, 233, 0.5)) drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))";
            } else {
                inner.style.filter =
                    "drop-shadow(0 2px 6px rgba(14, 165, 233, 0.45))";
            }

            if (hud) {
                hud.style.transform = `translate3d(var(--x, -100px), var(--y, -100px), 0) scale(${hover ? 1 : 0.4})`;
                hud.style.opacity = hover ? (down ? "0.9" : "0.65") : "0";
            }
        };

        const onMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (!isVisible.current) {
                isVisible.current = true;
                if (wrapper) wrapper.style.opacity = "1";
            }

            // Direct 1:1 hardware coordinates tracking with zero delay
            // Nose is at local (14px, 2px), placing the tip exactly at (x, y)
            if (wrapper) {
                wrapper.style.transform = `translate3d(${x - 14}px, ${y - 2}px, 0)`;
            }

            if (hud) {
                hud.style.setProperty("--x", `${x}px`);
                hud.style.setProperty("--y", `${y}px`);
                hud.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isHovering.current ? 1 : 0.4})`;
            }
        };

        const onMouseDown = () => {
            isMouseDown.current = true;
            updateVisuals();
        };

        const onMouseUp = () => {
            isMouseDown.current = false;
            updateVisuals();
        };

        const onMouseLeave = () => {
            isVisible.current = false;
            if (wrapper) wrapper.style.opacity = "0";
            if (hud) hud.style.opacity = "0";
        };

        const onMouseEnter = () => {
            isVisible.current = true;
            if (wrapper) wrapper.style.opacity = "1";
        };

        // Detect hover over interactive elements
        const onMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            const interactive = Boolean(
                target.closest(
                    'a, button, input, select, textarea, [role="button"], [role="tab"], [data-cursor="pointer"]',
                ),
            );
            if (interactive !== isHovering.current) {
                isHovering.current = interactive;
                updateVisuals();
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mouseup", onMouseUp, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        document.documentElement.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mouseover", onMouseOver);
            document.documentElement.removeEventListener(
                "mouseleave",
                onMouseLeave,
            );
            document.documentElement.removeEventListener(
                "mouseenter",
                onMouseEnter,
            );
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* Target-Lock Avionics Ring (centered on nose hotspot when hovering interactive elements) */}
            <div
                ref={hudRingRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "38px",
                    height: "38px",
                    marginTop: "-19px",
                    marginLeft: "-19px",
                    borderRadius: "9999px",
                    willChange: "transform, opacity",
                    opacity: 0,
                    transition:
                        "opacity 180ms ease, transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div className="absolute inset-0 rounded-full border border-sky-400/70 border-dashed animate-[spin_6s_linear_infinite]" />
                <div className="absolute inset-[3px] rounded-full border border-sky-300/30 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />
            </div>

            {/* Paperplane Origami Glider (Fixed orientation, zero-latency position tracking) */}
            <div
                ref={planeWrapperRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "28px",
                    height: "28px",
                    willChange: "transform, opacity",
                    opacity: 0,
                    transition: "opacity 140ms ease",
                }}
            >
                <div
                    ref={planeInnerRef}
                    style={{
                        width: "28px",
                        height: "28px",
                        transformOrigin: "14px 2px", // Nose is the pivot and exact click point
                        transform: "rotate(-35deg) scale(1)",
                        willChange: "transform, filter",
                        transition:
                            "transform 140ms cubic-bezier(0.16, 1, 0.3, 1), filter 140ms ease",
                    }}
                >
                    <svg
                        viewBox="0 0 28 28"
                        width="28"
                        height="28"
                        className="overflow-visible"
                    >
                        <defs>
                            {/* Shading gradients for origami facets */}
                            <linearGradient
                                id="vayuLeftWing"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#bae6fd" />
                                <stop offset="60%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#0284c7" />
                            </linearGradient>

                            <linearGradient
                                id="vayuRightWing"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#f0f9ff" />
                                <stop offset="50%" stopColor="#7dd3fc" />
                                <stop offset="100%" stopColor="#38bdf8" />
                            </linearGradient>

                            <linearGradient
                                id="vayuLeftKeel"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#0369a1" />
                                <stop offset="100%" stopColor="#075985" />
                            </linearGradient>

                            <linearGradient
                                id="vayuRightKeel"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="#0284c7" />
                                <stop offset="100%" stopColor="#0369a1" />
                            </linearGradient>

                            {/* Thruster afterburner glow */}
                            <radialGradient
                                id="vayuAfterburner"
                                cx="50%"
                                cy="50%"
                                r="50%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#ffffff"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="40%"
                                    stopColor="#38bdf8"
                                    stopOpacity="0.8"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#0284c7"
                                    stopOpacity="0"
                                />
                            </radialGradient>
                        </defs>

                        {/* Afterburner Thruster Plume */}
                        <ellipse
                            cx="14"
                            cy="22"
                            rx="3"
                            ry="4.5"
                            fill="url(#vayuAfterburner)"
                            className="animate-pulse"
                        />

                        {/* Left Outer Wing */}
                        <polygon
                            points="14,2 3,22 11,17"
                            fill="url(#vayuLeftWing)"
                        />

                        {/* Left Inner Valley / Keel */}
                        <polygon
                            points="14,2 11,17 14,21"
                            fill="url(#vayuLeftKeel)"
                        />

                        {/* Right Inner Valley / Keel */}
                        <polygon
                            points="14,2 14,21 17,17"
                            fill="url(#vayuRightKeel)"
                        />

                        {/* Right Outer Wing */}
                        <polygon
                            points="14,2 17,17 25,22"
                            fill="url(#vayuRightWing)"
                        />

                        {/* Origami Center Crease / Spine */}
                        <line
                            x1="14"
                            y1="2"
                            x2="14"
                            y2="21"
                            stroke="#ffffff"
                            strokeWidth="0.85"
                            strokeOpacity="0.95"
                        />

                        {/* Left Wing Crease Accent */}
                        <line
                            x1="14"
                            y1="2"
                            x2="11"
                            y2="17"
                            stroke="#7dd3fc"
                            strokeWidth="0.5"
                            strokeOpacity="0.75"
                        />

                        {/* Right Wing Crease Accent */}
                        <line
                            x1="14"
                            y1="2"
                            x2="17"
                            y2="17"
                            stroke="#e0f2fe"
                            strokeWidth="0.5"
                            strokeOpacity="0.85"
                        />

                        {/* Sharp Pointer Reticle Dot at the very Nose (Hotspot) */}
                        <circle
                            cx="14"
                            cy="2"
                            r="1.4"
                            fill="#ffffff"
                            className="drop-shadow-[0_0_3px_#38bdf8]"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CustomCursor;
