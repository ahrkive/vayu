import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Drone from './Drone'
import { DRONE_SCALE, LandingPad, PadSceneLights } from './DroneViewer'

const { damp } = THREE.MathUtils
const HOVER_HEIGHT = 1.65 // above the pad, in scene units
const CRUISE_PROP_SPEED = 34
const LIFT_AT_PROP_SPEED = 22 // props must spin up this far before the drone leaves the pad
const DRAG_RADIANS_PER_PX = 0.01

// Parked on the pad until `launched` turns true, then: props spin up, lift off, hover
const LaunchRig = ({ launched }) => {
  const group = useRef()
  const propSpeed = useRef(0)
  const height = useRef(0)
  const reduceMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime

    propSpeed.current = damp(propSpeed.current, launched ? CRUISE_PROP_SPEED : 0, 1.8, delta)
    const airborne = launched && (reduceMotion || propSpeed.current > LIFT_AT_PROP_SPEED)
    height.current = damp(height.current, airborne ? HOVER_HEIGHT : 0, 1.6, delta)

    // Gentle bob and drift only once it's up
    const up = height.current / HOVER_HEIGHT
    const bob = reduceMotion ? 0 : Math.sin(t * 1.6) * 0.05 * up
    group.current.position.y = height.current + bob
    group.current.rotation.z = reduceMotion ? 0 : Math.sin(t * 1.3) * 0.03 * up
    group.current.rotation.x = reduceMotion ? 0 : Math.sin(t * 0.9) * 0.02 * up
  })

  return (
    <group ref={group}>
      <group scale={DRONE_SCALE}>
        <Drone speedRef={propSpeed} />
      </group>
    </group>
  )
}

// Drone and helipad turn together, left/right only (set by dragging)
const YawGroup = ({ yawRef, children }) => {
  const group = useRef()
  useFrame(() => {
    group.current.rotation.y = yawRef.current
  })
  return <group ref={group}>{children}</group>
}

// Drag left/right to turn the drone and helipad together, parked or hovering
const DroneLaunch = ({ launched }) => {
  const yawRef = useRef(0)
  const drag = useRef(null)

  const onPointerDown = (event) => {
    drag.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (drag.current === null) return
    yawRef.current += (event.clientX - drag.current) * DRAG_RADIANS_PER_PX
    drag.current = event.clientX
  }
  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <div className="size-full touch-pan-y" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <Canvas
        camera={{ position: [0, 2.2, 6.2], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0.7, 0)}
      >
        <PadSceneLights />
        {/* Turned slightly so the drone doesn't face the camera head-on */}
        <group rotation-y={-0.5}>
          <YawGroup yawRef={yawRef}>
            <LaunchRig launched={launched} />
            <LandingPad />
          </YawGroup>
        </group>
      </Canvas>
    </div>
  )
}

export default DroneLaunch
