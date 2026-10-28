import drishtiPhoto from "../assets/fleet/project-1.jpg";
import rakshakPhoto from "../assets/fleet/project-2.jpg";
import sagarPhoto from "../assets/fleet/project-3.jpg";

export const FLEET = [
    {
        id: "drishti",
        name: "Drishti",
        callsign: "Drishti",
        role: "Surveillance & Reconnaissance",
        configuration: "Quadcopter Platform",
        photo: drishtiPhoto,
        stats: [
            { label: "Endurance", value: "28 Mins" },
            { label: "Range", value: "6.5 km" },
            { label: "Max Speed", value: "65 km/h" },
            { label: "MTOW", value: "3.2 kg" },
        ],
        headline:
            "High-Endurance Surveillance Quadcopter fitted with 3-Axis Stabilized Gimbal Camera",
        description:
            "Drishti is Team VAYU's frontline autonomous reconnaissance quadcopter, purpose-engineered for persistent aerial surveillance, perimeter inspection, and target tracking. Equipped with an onboard neural vision accelerator and a 3-axis stabilized optical sensor.",
        capabilities: [
            "Autonomous Waypoint Navigation & Geofence Patrol",
            "Real-Time Object Detection & Deep Learning Target Tracking",
            "Encrypted 1080p 60fps Low-Latency Video Transmission",
            "Sub-Second Target Lock with Auto Gimbal Horizon Stabilization",
            "Automated Fail-Safe Return-to-Launch (RTL) on Radio Loss",
            "Precision Optical Flow Hovering in GPS-Degraded Environments",
        ],
        components: [
            {
                label: "Airframe",
                value: "Custom 450mm 3K Twill Carbon Fiber Quad Frame with CNC Billet Clamps",
            },
            {
                label: "Flight Controller",
                value: "Cube Orange+ with Triple Redundant IMUs & ADS-B Receiver",
            },
            {
                label: "Propulsion",
                value: "4× 2216 880KV High-Efficiency Brushless Motors with Carbon Propellers",
            },
            {
                label: "Electronic Speed Controls",
                value: "4× 40A BLHeli_32 DShot600 Micro ESCs with Active Freewheeling",
            },
            {
                label: "Camera & Gimbal",
                value: "SIYI A8 Mini 4K 8MP 6X Zoom Sensor with 3-Axis Brushless Gimbal",
            },
            {
                label: "Telemetry & GCS",
                value: "Herelink HD 2.4GHz Integrated Transmission & Dual Antenna System",
            },
            {
                label: "Power System",
                value: "4S 6200mAh 75C High-Density Lithium Polymer Battery Pack",
            },
        ],
    },
    {
        id: "rakshak",
        name: "Rakshak",
        callsign: "Rakshak",
        role: "Heavy Lift & Aid Delivery",
        configuration: "Hexacopter Platform",
        photo: rakshakPhoto,
        stats: [
            { label: "Payload", value: "2.0 kg " },
            { label: "Endurance", value: "22 Mins" },
            { label: "Range", value: "8.0 km" },
            { label: "MTOW", value: "8.4 kg" },
        ],
        headline:
            "Heavy-Lift Autonomous Payload Delivery Hexacopter with 2.0 kg Cargo Capacity",
        description:
            "Rakshak is designed for emergency relief, disaster aid, and autonomous medical supply delivery. Powered by a heavy-lift six-rotor propulsion configuration, it features an automated servo release latch that delivers payloads precisely to targeted coordinate zones.",
        capabilities: [
            "2.0 kg Active Cargo Capacity with Centered Gravity Alignment",
            "High-Precision Servo-Actuated Automated Drop Bay",
            "Hexacopter Rotor-Loss Fail-Safe (Controlled Landing on 5 Motors)",
            "LiDAR-Based Real-Time Ground Proximity & Terrain Following",
            "Dual RTK-GPS Centimeter-Accuracy Landing Guidance",
            "Wind-Resistant Operation in Gusts Exceeding 25 Knots",
        ],
        components: [
            {
                label: "Airframe",
                value: "850mm Heavy-Duty Carbon Fiber Hexa Frame with Folding Arm Locks",
            },
            {
                label: "Flight Controller",
                value: "Pixhawk 6C Autopilot paired with Dual F9P High-Precision RTK GPS",
            },
            {
                label: "Propulsion",
                value: "6x T-Motor U5 400KV Heavy-Lift Brushless Motors with 16-inch Carbon Props",
            },
            {
                label: "Electronic Speed Controls",
                value: "6× 60A T-Motor Flame High-Voltage ESCs (IP55 Weatherproof)",
            },
            {
                label: "Drop Mechanism",
                value: "Custom Aircraft-Grade Aluminum CNC Quick-Release Latch Mechanism",
            },
            {
                label: "Altimetry Sensor",
                value: "Benewake TFmini-S Micro Solid-State LiDAR Rangefinder (12m)",
            },
            {
                label: "Power System",
                value: "6S 16000mAh Solid-State High-Capacity LiPo Battery with Smart BMS",
            },
        ],
    },
    {
        id: "sagar",
        name: "Sagar",
        callsign: "Sagar",
        role: "Maritime & Water Rescue",
        configuration: "Sealed Marine Quadcopter",
        photo: sagarPhoto,
        stats: [
            { label: "Protection", value: "IP66" },
            { label: "Endurance", value: "25 Mins" },
            { label: "Capacity", value: "Buoy" },
            { label: "MTOW", value: "3.8 kg" },
        ],
        headline:
            "All-Weather Water Rescue Drone with Life-Buoy Deployment & Marine Telemetry",
        description:
            "Sagar is Team VAYU's dedicated maritime rescue platform. Equipped with water-resistant composite seals, floatation landing skids, and an emergency pneumatic life-buoy deployer, Sagar is built to locate stranded swimmers or flood victims and drop lifesaving equipment.",
        capabilities: [
            "Water-Resistant Sealed Monocoque Fuselage with Floatable Skid Struts",
            "Pneumatic Emergency Self-Inflatable Life-Buoy Drop System",
            "Ultra-High Output 2000-Lumen Marine Searchlight for Night Missions",
            "Starlight Low-Light Night-Vision FPV Sensor for Zero-Light Water Rescue",
            "Automated Marine Distress RF Beacon Deployment",
            "Anti-Corrosion Marine-Grade Hardware and Coated Electronics",
        ],
        components: [
            {
                label: "Airframe",
                value: "Hydrophobic Coated Carbon Fiber Monocoque with Gasket-Sealed Canopy",
            },
            {
                label: "Flight Controller",
                value: "Conformal-Coated Pixhawk 6C Autopilot with Pressure-Sealed Baro Chamber",
            },
            {
                label: "Propulsion",
                value: "4x IP67 Waterproof Brushless Motors with Salt-Resistant Ceramic Bearings",
            },
            {
                label: "Electronic Speed Controls",
                value: "4× 50A Waterproof ESCs with Internal Thermal Cutoff Sensors",
            },
            {
                label: "Rescue Payload",
                value: "Pneumatically Deployed Water-Activated Self-Inflating Life Buoy Module",
            },
            {
                label: "Search Optics",
                value: "RunCam Night Eagle Starlight Camera with 2000-Lumen High-CRI Spot LED",
            },
            {
                label: "Power System",
                value: "4S 8000mAh Marine-Sealed High-Capacity LiPo Battery",
            },
        ],
    },
];
