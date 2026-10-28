import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Drone from './Drone'

export const DRONE_SCALE = 1.1
// Flip to -1 if the drone should turn the opposite way to the photo arch
const SYNC_DIRECTION = 1
// Bottom of the landing skids in drone units (skid tube centre -0.375, radius 0.017)
const SKID_BOTTOM = -0.392
export const PAD_TOP = SKID_BOTTOM * DRONE_SCALE

// Minimal landing pad drawn on a canvas: dark disc, one thin ring and a thin "H"
const usePadTexture = () =>
  useMemo(() => {
    const size = 1024
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const c = size / 2

    ctx.fillStyle = '#0b1220'
    ctx.beginPath()
    ctx.arc(c, c, c, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = 'rgba(226,232,240,0.55)'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(c, c, c * 0.78, 0, Math.PI * 2)
    ctx.stroke()

    // Thin "H" made of three strokes
    const w = c * 0.26
    const h = c * 0.36
    ctx.lineWidth = 12
    ctx.lineCap = 'square'
    ctx.beginPath()
    ctx.moveTo(c - w, c - h)
    ctx.lineTo(c - w, c + h)
    ctx.moveTo(c + w, c - h)
    ctx.lineTo(c + w, c + h)
    ctx.moveTo(c - w, c)
    ctx.lineTo(c + w, c)
    ctx.stroke()

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    return texture
  }, [])

export const LandingPad = () => {
  const map = usePadTexture()

  return (
    <group position={[0, PAD_TOP, 0]}>
      {/* Pad slab */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[1.55, 1.6, 0.08, 64]} />
        <meshStandardMaterial color="#111827" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Markings on top */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial map={map} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Faint edge glow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 0]}>
        <torusGeometry args={[1.58, 0.008, 12, 96]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      {/* Soft shadow under the drone */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.003, 0]}>
        <circleGeometry args={[0.75, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} depthWrite={false} />
      </mesh>
    </group>
  )
}

// Lighting + studio reflections shared by the pad scenes (Fleet gallery and Sponsor Us)
export const PadSceneLights = () => (
  <>
    <hemisphereLight args={['#93c5fd', '#0b1020', 0.9]} />
    <directionalLight position={[4, 6, 5]} intensity={3} />
    <directionalLight position={[-3, 2, -5]} intensity={1.6} color="#7dd3fc" />
    <pointLight position={[-3, 0.5, 3]} intensity={18} color="#38bdf8" />

    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={2} color="#7dd3fc" position={[-5, 1, -1]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
      <Lightformer form="rect" intensity={1.5} position={[5, 1, 1]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
    </Environment>
  </>
)

const DRAG_DEGREES_PER_PX = 0.4

// Drone + pad turn to the same angle as the photo arch (read from syncRef every frame)
const SyncedRig = ({ syncRef, children }) => {
  const group = useRef()
  useFrame(() => {
    group.current.rotation.y = THREE.MathUtils.degToRad(SYNC_DIRECTION * (syncRef?.angle ?? 0))
  })
  return (
    <group ref={group} position={[0, 0.15, 0]}>
      {children}
    </group>
  )
}

// Drone parked on a landing pad, props stopped. It is fully synced with the photo arch:
// the arch's steps turn the drone, and dragging the drone turns the arch.
const DroneViewer = ({ syncRef }) => {
  const propSpeed = useRef(0)
  const drag = useRef(null)

  const onPointerDown = (event) => {
    drag.current = { x: event.clientX }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (!drag.current || !syncRef) return
    const dx = event.clientX - drag.current.x
    drag.current.x = event.clientX
    syncRef.current = (syncRef.current ?? 0) + dx * DRAG_DEGREES_PER_PX * SYNC_DIRECTION
    syncRef.wake?.()
  }
  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <div className="size-full touch-pan-y" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <Canvas camera={{ position: [0, 1.7, 4.8], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }} onCreated={({ camera }) => camera.lookAt(0, 0.05, 0)}>
        <PadSceneLights />

        <SyncedRig syncRef={syncRef}>
          <group scale={DRONE_SCALE}>
            <Drone speedRef={propSpeed} />
          </group>
          <LandingPad />
        </SyncedRig>
      </Canvas>
    </div>
  )
}

export default DroneViewer
