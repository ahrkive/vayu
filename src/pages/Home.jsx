import { lazy, Suspense } from "react";
import Hero from "../sections/home/Hero";
import AboutUs from "../sections/home/AboutUs";
import SponsorBelt from "../sections/home/SponsorBelt";
import WhatWeDo from "../sections/home/WhatWeDo";
import CallingCard from "../sections/home/CallingCard";

const DroneScene = lazy(() => import("../components/drone/DroneScene"));

const Home = () => {
    return (
        <>
            <Suspense fallback={null}>
                <DroneScene />
            </Suspense>
            <main className="relative z-10">
                <Hero />
                <AboutUs />
                <SponsorBelt />
                <WhatWeDo />
                <CallingCard />
            </main>
        </>
    );
};

export default Home;
