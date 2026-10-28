import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Drone from './Drone'
import { INTRO_DELAY, INTRO_DURATION } from './timing'
import { droneLook } from './lookTarget'

/*
  The drone lives in one fixed, full-screen canvas behind the page.
  Any section can give it a resting spot with an element like:

    <div data-drone-anchor="about" data-drone-yaw="0.6" data-drone-pitch="0.3" />

  The drone sits centred in that box (sized to fit it), and while scrolling
  between two sections it flies from one anchor's spot to the next.

  Optional extras:
    data-drone-drift  drone drifts slowly down the screen while its (tall) section scrolls past
    data-drone-away   drone flies off-screen to the left for this section
    data-drone-follow drone sits at the anchor's actual on-screen spot (for the last section,
                      which can never scroll all the way to the top)
  Hidden anchors (display: none, e.g. `hidden lg:block`) are ignored.
*/

const DRONE_SPAN = 2.5 // rough width of the model in world units
const POSE_KEYS = ['x', 'y', 's', 'yaw', 'pitch']
const { clamp, damp, lerp, smoothstep } = THREE.MathUtils
const easeOutCubic = (t) => 1 - (1 - t) ** 3

// Screen-space anchor boxes -> world-space resting poses
const readAnchors = (viewport) => {
  const vw = window.innerWidth
  const vh = window.innerHeight

  const anchors = [...document.querySelectorAll('[data-drone-anchor]')].filter((el) => el.getClientRects().length > 0)

  return anchors.map((el) => {
    const a = el.getBoundingClientRect()
    const section = (el.closest('section') ?? el).getBoundingClientRect()
    const cx = a.left + a.width / 2
    let cy
    if (el.dataset.droneDrift !== undefined) {
      // 0 when the section's top reaches the top of the screen, 1 when its bottom reaches the bottom
      const progress = clamp(-section.top / Math.max(section.height - vh, 1), 0, 1)
      cy = vh * lerp(0.3, 0.7, progress)
    } else if (el.dataset.droneFollow !== undefined) {
      cy = clamp(a.top + a.height / 2, vh * 0.15, vh * 0.85)
    } else {
      // Where the anchor sits inside its section, as if that section were scrolled to the top
      cy = clamp(a.top - section.top + a.height / 2, vh * 0.15, vh * 0.85)
    }
    const size = Math.min(a.width, a.height) / vh
    const away = el.dataset.droneAway !== undefined

    return {
      x: away ? -viewport.width : (cx / vw - 0.5) * viewport.width,
      y: -(cy / vh - 0.5) * viewport.height,
      s: (size * viewport.height * 0.9) / DRONE_SPAN,
      yaw: parseFloat(el.dataset.droneYaw ?? '-0.5'),
      pitch: parseFloat(el.dataset.dronePitch ?? '0.3'),
      // Section's top edge, as a fraction of screen height
      top: section.top / vh,
    }
  })
}

// The drone belongs to whichever section covers the middle of the screen, however tall it is.
// It only flies to the next spot while that section's top edge crosses from 75% to 25% of the screen.
const blendAnchors = (anchors) => {
  if (!anchors.length) return null
  return anchors.slice(1).reduce((pose, next) => {
    const t = smoothstep(0.75 - next.top, 0, 0.5)
    return Object.fromEntries(POSE_KEYS.map((k) => [k, lerp(pose[k], next[k], t)]))
  }, anchors[0])
}

const FlightRig = () => {
  const group = useRef()
  const speed = useRef(34)
  const pose = useRef(null)
  const lastX = useRef(0)
  const velocityX = useRef(0)
  const startedAt = useRef(null)
  const look = useRef({ yaw: 0, pitch: 0, weight: 0 })
  const reduceMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useFrame((state, rawDelta) => {
    const target = blendAnchors(readAnchors(state.viewport))
    if (!target) return

    const delta = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime
    if (startedAt.current === null) startedAt.current = t

    // Smoothly chase the scroll-driven target pose
    if (!pose.current) pose.current = { ...target }
    const p = pose.current
    POSE_KEYS.forEach((k) => {
      p[k] = damp(p[k], target[k], 3.2, delta)
    })

    velocityX.current = damp(velocityX.current, (p.x - lastX.current) / delta, 6, delta)
    lastX.current = p.x

    // Intro: fly in from far away, top-right, banked
    const intro = reduceMotion ? 1 : clamp((t - startedAt.current - INTRO_DELAY) / INTRO_DURATION, 0, 1)
    const away = 1 - easeOutCubic(intro)

    // Turn the nose (+z) toward a hovered element: further left = more negative yaw, lower = nose down
    const looking = !!droneLook.target && !reduceMotion
    let lookYaw = 0
    let lookPitch = 0
    if (looking) {
      const tx = (droneLook.target.x / window.innerWidth - 0.5) * state.viewport.width
      const ty = -(droneLook.target.y / window.innerHeight - 0.5) * state.viewport.height
      lookYaw = clamp((tx - p.x) * 0.15, -0.6, 0.6)
      lookPitch = clamp((p.y - ty) * 0.12, -0.25, 0.3)
    }
    look.current.yaw = damp(look.current.yaw, lookYaw, 4, delta)
    look.current.pitch = damp(look.current.pitch, lookPitch, 4, delta)
    look.current.weight = damp(look.current.weight, looking ? 1 : 0, 4, delta)

    // Mouse-follow fades out while looking at something, so the two turns don't add up
    const mouseInfluence = reduceMotion ? 0 : 1 - look.current.weight
    const mouseX = state.pointer.x * mouseInfluence
    const mouseY = state.pointer.y * mouseInfluence
    const hover = reduceMotion ? 0 : Math.sin(t * 1.6) * 0.06 * p.s

    group.current.position.set(
      p.x + away * state.viewport.width * 0.9 + mouseX * 0.1,
      p.y + away * state.viewport.height * 0.9 + hover + mouseY * 0.06,
      away * -6,
    )
    group.current.rotation.set(
      p.pitch - mouseY * 0.18 + away * 0.35 + look.current.pitch,
      p.yaw + mouseX * 0.35 + away * 0.9 + look.current.yaw,
      clamp(-velocityX.current * 0.12, -0.5, 0.5) + Math.sin(t * 1.3) * 0.025 - away * 0.5,
    )
    group.current.scale.setScalar(p.s)

    speed.current = 34 + away * 20
  })

  return (
    <group ref={group} rotation-order="YXZ">
      <Drone speedRef={speed} />
    </group>
  )
}

const DroneScene = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        // Track the mouse across the whole page even though the canvas ignores clicks
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <hemisphereLight args={['#93c5fd', '#0b1020', 0.9]} />
        <directionalLight position={[4, 6, 5]} intensity={3} />
        <directionalLight position={[-3, 2, -5]} intensity={1.6} color="#7dd3fc" />
        <pointLight position={[-3, 0.5, 3]} intensity={18} color="#38bdf8" />
        <pointLight position={[3, 0.5, -3]} intensity={18} color="#38bdf8" />

        {/* Studio reflections for the glossy carbon and metal (generated locally, no HDR download) */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={2} color="#7dd3fc" position={[-5, 1, -1]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.5} position={[5, 1, 1]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1} position={[0, 2, 6]} scale={2} />
        </Environment>

        <FlightRig />
      </Canvas>
    </div>
  )
}

export default DroneScene
