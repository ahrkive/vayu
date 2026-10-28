import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import GradientASCII from "./components/reactbits/GradientASCII";
import AltitudeIndicator from "./components/AltitudeIndicator";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Fleet = lazy(() => import("./pages/Fleet"));
const Team = lazy(() => import("./pages/Team"));
const SponsorUs = lazy(() => import("./pages/SponsorUs"));

const App = () => {
    return (
        <MotionConfig reducedMotion="user">
            <ScrollToTop />
            <CustomCursor />
            {/* Persistent static background across all routes */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                aria-hidden="true"
            >
                <GradientASCII
                    colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
                    shape="horizon"
                    characters=" "
                    cellSize={18}
                    density={0}
                    glyphOpacity={0}
                    glow={0}
                    depthOfField={0}
                    flicker={0}
                    softness={0.6}
                    scale={1}
                    flow={0.25}
                    speed={0.6}
                    gradientOpacity={0.35}
                    grain={0.03}
                    variation={0}
                    mouseInteraction={false}
                    scrambleRadius={0}
                    clickEffect="none"
                    intro={false}
                    lightMode={false}
                />
            </div>
            <Navbar />
            <AltitudeIndicator />
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/sponsor" element={<SponsorUs />} />
                </Routes>
            </Suspense>
            <Footer />
        </MotionConfig>
    );
};

export default App;
