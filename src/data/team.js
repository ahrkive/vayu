import iman from "../assets/team/photos/iman.jpg";
import swarnavo from "../assets/team/photos/swarnavo.jpg";
import arkadeep from "../assets/team/photos/arkadeep.jpg";
import archit from "../assets/team/photos/archit.jpg";
import tejas from "../assets/team/photos/tejas.jpg";
import hricha from "../assets/team/photos/hricha.jpg";
import shubhranil from "../assets/team/photos/shubhranil.jpg";
import vineet from "../assets/team/photos/vineet.jpg";
import pathikrit from "../assets/team/photos/pathikrit.jpg";
import deborpita from "../assets/team/photos/deborpita.jpg";
import ashmit from "../assets/team/photos/ashmit.jpg";
import sutavra from "../assets/team/photos/sutavra.jpg";
import joy from "../assets/team/photos/joy.jpg";
import paridhi from "../assets/team/photos/paridhi.jpg";
import sangita from "../assets/team/photos/sangita.jpg";
import sarvani from "../assets/team/photos/sarvani.jpg";
import rishin from "../assets/team/photos/rishin.jpg";

// Photos live in assets/team/photos (square crops). People without a photo show their initials.
// Swarnavo and Sutavra are still cropped from screenshots; Sutavra's original is a .HEIC file.
const PHOTOS = {
    iman,
    swarnavo,
    arkadeep,
    archit,
    tejas,
    hricha,
    shubhranil,
    vineet,
    pathikrit,
    deborpita,
    ashmit,
    sutavra,
    joy,
    paridhi,
    sangita,
    rishin,
    sarvani,
};

// Profile links per person; a missing link means that icon only animates on hover and isn't clickable
const SOCIALS = {
    iman: {
        linkedin: "https://www.linkedin.com/in/iman-das-590553270",
        github: "https://github.com/bytesforger",
    },
    arkadeep: {
        linkedin: "https://www.linkedin.com/in/arkadeeproy27",
        github: "https://github.com/ahrkive",
    },
    swarnavo: {
        linkedin: "https://www.linkedin.com/in/swarnavo-de-b5519a285/",
        github: "https://github.com/Voltamon",
    },
    archit: {
        linkedin: "https://www.linkedin.com/in/archit-chakraborty-909372378/",
        github: "https://github.com/ArChIt690",
    },
    ashmit: {
        linkedin: "https://www.linkedin.com/in/ashmit-bhadra-020044383",
        github: "https://github.com/bhadraashmit171877",
    },
    deborpita: {
        linkedin: "https://www.linkedin.com/in/deborpita-dhang-b84a92389",
    },
    hricha: { linkedin: "https://www.linkedin.com/in/hricha-25hr" },
    paridhi: {
        linkedin: "https://www.linkedin.com/in/paridhi-khandelwal-b8889721a/",
        github: "https://github.com/PamK7",
    },
    pathikrit: {
        linkedin: "https://www.linkedin.com/in/pathikrit-pal-948515380",
        github: "https://github.com/pathikrick522-web",
    },
    sangita: {
        linkedin: "https://www.linkedin.com/in/sangita-kanta-1647392b1",
        github: "https://github.com/sangitakanta386-png",
    },
    shubhranil: {
        linkedin: "https://www.linkedin.com/in/shubhranil-ghosh-05572624a",
        github: "https://github.com/shubhranil605",
    },
    sutavra: {
        linkedin: "https://www.linkedin.com/in/sutavrariomitra6/",
        github: "https://github.com/sutavrario",
    },
    vineet: { github: "https://github.com/vinbyte-code" },
    sarvani: {
        linkedin: "https://in.linkedin.com/in/sarvani-saha-198811318",
    },
    rishin: {
        linkedin: "https://www.linkedin.com/in/rishin-mukherjee-641397328",
        github: "https://github.com/AlloyTUBER",
    },
};

const person = (id, name, extra) => ({
    id,
    name,
    photo: PHOTOS[id],
    socials: SOCIALS[id] ?? {},
    ...extra,
});

export const CAPTAIN = person("iman", "Iman", {
    role: "Team Captain",
    callsign: "VAYU-CMD-01",
    expertise: "System Architecture & Flight Strategy",
    contributions:
        "Overall team leadership, UAV structural conceptualization, flight operations and mission coordinator.",
});

export const LEADS = [
    person("swarnavo", "Swarnavo", {
        role: "Software Lead",
        callsign: "VAYU-SW-01",
        expertise: "Autonomous Flight Stack & Perception",
        contributions:
            "Autonomous autopilot architecture, SITL simulation pipelines, and computer vision neural stack.",
    }),
    person("arkadeep", "Arkadeep", {
        role: "Hardware Lead",
        callsign: "VAYU-HW-01",
        expertise: "Composite Structures & Propulsion",
        contributions:
            "Carbon fiber airframe manufacturing, propulsion characterization, and hardware system integration.",
    }),
];

// In each domain the first member is the domain lead
export const DOMAINS = [
    {
        code: "Software // CV-01",
        name: "Computer Vision",
        members: [
            person("rishin", "Rishin", {
                initials: "RM",
                callsign: "VAYU-CV-01",
                expertise: "Deep Learning Perception & Object Tracking",
                contributions:
                    "YOLO target acquisition pipeline and real-time edge AI inference.",
            }),
            person("swarnavo", "Swarnavo", {
                callsign: "VAYU-CV-MEM",
                expertise: "Optical Flow & Edge Computing",
                contributions: "Jetson Nano embedded hardware acceleration.",
            }),
            person("sangita", "Sangita", {
                initials: "SG",
                callsign: "VAYU-CV-MEM",
                expertise: "Aerial Imagery Processing",
                contributions:
                    "Target classification datasets and neural network training.",
            }),
        ],
    },
    {
        code: "Software // SIM-02",
        name: "Simulation",
        members: [
            person("joy", "Joy", {
                initials: "BS",
                callsign: "VAYU-SIM-01",
                expertise: "Flight Dynamics Modeling & HITL Simulation",
                contributions:
                    "Gazebo/SITL simulator architecture and flight telemetry physics modeling.",
            }),
            person("iman", "Iman", {
                callsign: "VAYU-SIM-MEM",
                expertise: "Aerodynamic Simulation",
                contributions:
                    "Airfoil polar curves and rigid-body 6-DOF dynamics.",
            }),
            person("rishin", "Rishin", {
                initials: "RM",
                callsign: "VAYU-SIM-MEM",
                expertise: "Sensor Simulation",
                contributions:
                    "Virtual camera and IMU synthetic telemetry feeds.",
            }),
        ],
    },
    {
        code: "Avionics // GCS-03",
        name: "GCS and Communication",
        members: [
            person("archit", "Archit", {
                initials: "AC",
                callsign: "VAYU-GCS-01",
                expertise: "Ground Control Station & RF Telemetry",
                contributions:
                    "Long-range bidirectional telemetry protocols and custom ground station HUD.",
            }),
            person("swarnavo", "Swarnavo", {
                callsign: "VAYU-GCS-MEM",
                expertise: "Network Protocols & Encryption",
                contributions:
                    "MAVLink telemetry communication pipeline and fail-safe link monitoring.",
            }),
            person("sutavra", "Sutavra", {
                callsign: "VAYU-GCS-MEM",
                expertise: "RF Hardware & Antenna Tuning",
                contributions:
                    "High-gain directional tracking antenna arrays and diversity receivers.",
            }),
        ],
    },
    {
        code: "Software // NAV-04",
        name: "Autonomous Navigation",
        members: [
            person("swarnavo", "Swarnavo", {
                callsign: "VAYU-NAV-01",
                expertise: "GPS-Denied Navigation & Path Planning",
                contributions:
                    "Visual Inertial Odometry (VIO) and minimum-jerk spline path planning.",
            }),
            person("rishin", "Rishin", {
                initials: "RM",
                callsign: "VAYU-NAV-MEM",
                expertise: "3D Obstacle Mapping",
                contributions:
                    "OctoMap 3D voxel representation and collision boundary calculation.",
            }),
            person("joy", "Joy", {
                initials: "BS",
                callsign: "VAYU-NAV-MEM",
                expertise: "Kinodynamic Planning",
                contributions:
                    "Dynamic waypoint re-routing and energy-optimal trajectories.",
            }),
        ],
    },
    {
        code: "Hardware // AERO-05",
        name: "Airframe and Avionics",
        members: [
            person("tejas", "Tejas", {
                callsign: "VAYU-AERO-01",
                expertise: "Fuselage Aerodynamics & Avionics Harnessing",
                contributions:
                    "Airframe structural loads, vibration damping, and power bus routing.",
            }),
            person("hricha", "Hricha", {
                callsign: "VAYU-AERO-MEM",
                expertise: "Power Distribution & EMI Shielding",
                contributions:
                    "Power distribution layout and sensor noise isolation.",
            }),
            person("shubhranil", "Shubhranil", {
                callsign: "VAYU-AERO-MEM",
                expertise: "Structural Finite Element Analysis",
                contributions:
                    "Carbon spar FEA stress simulations under high-G maneuvers.",
            }),
            person("arkadeep", "Arkadeep", {
                callsign: "VAYU-AERO-MEM",
                expertise: "Aeroelasticity & Control Mechanics",
                contributions:
                    "Servo linkages, aileron balance, and surface deflections.",
            }),
        ],
    },
    {
        code: "Hardware // MFG-06",
        name: "Manufacturing",
        members: [
            person("hricha", "Hricha", {
                callsign: "VAYU-MFG-01",
                expertise: "Composite Fabrication & Tooling",
                contributions:
                    "Vacuum-assisted resin infusion and carbon fiber prepreg layups.",
            }),
            person("tejas", "Tejas", {
                callsign: "VAYU-MFG-MEM",
                expertise: "Precision Mold Making",
                contributions:
                    "High-density tooling foam CNC machining and surface finishing.",
            }),
            person("iman", "Iman", {
                callsign: "VAYU-MFG-MEM",
                expertise: "Airframe Alignment & Assembly",
                contributions:
                    "Fuselage jig assembly, bonding adhesives, and tolerance inspection.",
            }),
            person("vineet", "Vineet", {
                callsign: "VAYU-MFG-MEM",
                expertise: "FDM/SLA Additive Manufacturing",
                contributions:
                    "Lightweight structural brackets and custom mounting clips.",
            }),
        ],
    },
    {
        code: "Hardware // PROP-07",
        name: "Propulsion System",
        members: [
            person("arkadeep", "Arkadeep", {
                callsign: "VAYU-PROP-01",
                expertise: "Brushless Motor Aerodynamics & Dyno Testing",
                contributions:
                    "Thrust-to-weight optimization, propeller pitch analysis, and power efficiency curves.",
            }),
            person("deborpita", "Deborpita", {
                callsign: "VAYU-PROP-MEM",
                expertise: "Power Electronics Thermals",
                contributions:
                    "ESC thermal dissipation testing and motor timing optimization.",
            }),
            person("ashmit", "Ashmit", {
                callsign: "VAYU-PROP-MEM",
                expertise: "Battery Management & Power Profiling",
                contributions:
                    "In-flight current draw profiling and high-C discharge characterization.",
            }),
        ],
    },
    {
        code: "Mechanical // PDS-08",
        name: "Payload Delivery System",
        members: [
            person("vineet", "Vineet", {
                callsign: "VAYU-PDS-01",
                expertise: "Servo Actuation & Mechanical Release Bays",
                contributions:
                    "Design and testing of automated payload release latch mechanism for Rakshak.",
            }),
            person("pathikrit", "Pathikrit", {
                callsign: "VAYU-PDS-MEM",
                expertise: "Aerodynamic Packaging & Release",
                contributions:
                    "Payload container aerodynamic fairing design and drop trajectory stability.",
            }),
            person("satyam", "Satyam", {
                initials: "SY",
                callsign: "VAYU-PDS-MEM",
                expertise: "Mechanical Isolation Systems",
                contributions:
                    "Vibration isolation dampeners for fragile relief payload packages.",
            }),
        ],
    },
    {
        code: "Management // MGT-11",
        name: "Documentation and Sponsorship",
        members: [
            person("paridhi", "Paridhi", {
                initials: "PK",
                callsign: "VAYU-MGT-01",
                expertise: "Rulebook Compliance & Industrial Outreach",
                contributions:
                    "Comprehensive technical design reports, rule compliance, and sponsor acquisition.",
            }),
            person("shubhranil", "Shubhranil", {
                badge: "Co-Lead",
                callsign: "VAYU-MGT-02",
                expertise: "Sponsorship Strategy & Technical Dossiers",
                contributions:
                    "Sponsorship prospectus formulation and technical design report synthesis.",
            }),
            person("tejas", "Tejas", {
                callsign: "VAYU-MGT-MEM",
                expertise: "Technical Diagrams & Schematics",
                contributions:
                    "Airframe mechanical drawings and electrical block schematics.",
            }),
            person("sarvani", "Sarvani", {
                initials: "SV",
                callsign: "VAYU-MGT-MEM",
                expertise: "Corporate Relations & Sponsorship",
                contributions:
                    "Industry outreach campaigns and sponsor engagement pipelines.",
            }),
        ],
    },
];
