import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Detailed surveillance quadcopter built from primitives. Front of the drone is +z, so +x is its left side.
const ARM_REACH = 1.0 // centre -> motor
const ARM_START = 0.26
const PROP_LENGTH = 0.42

// Angle is measured from +z; diagonal motor pairs spin the same way
const ARMS = [
  { angle: Math.PI / 4, spin: 1, light: 'red' }, // front-left
  { angle: -Math.PI / 4, spin: -1, light: 'green' }, // front-right
  { angle: (3 * Math.PI) / 4, spin: -1, light: 'strobe' },
  { angle: (-3 * Math.PI) / 4, spin: 1, light: 'strobe' },
]

const canvasTexture = (size, draw) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  draw(canvas.getContext('2d'), size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Woven carbon-fibre pattern
const makeCarbonTexture = () => {
  const texture = canvasTexture(128, (ctx, size) => {
    const cell = 16
    ctx.fillStyle = '#08090c'
    ctx.fillRect(0, 0, size, size)
    for (let y = 0; y < size; y += cell) {
      for (let x = 0; x < size; x += cell) {
        const across = (x / cell + y / cell) % 2 === 0
        const g = across ? ctx.createLinearGradient(x, y, x, y + cell) : ctx.createLinearGradient(x, y, x + cell, y)
        g.addColorStop(0, '#15181e')
        g.addColorStop(0.5, '#3b414c')
        g.addColorStop(1, '#15181e')
        ctx.fillStyle = g
        ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2)
      }
    }
  })
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.anisotropy = 8
  return texture
}

// Soft round glow used for the nav light halos
const makeGlowTexture = () =>
  canvasTexture(64, (ctx, size) => {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,255,255,0.45)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  })

const roundedRect = (w, h, r) => {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

// Tapered blade outline along +x, extruded thin
const makeBladeGeometry = () => {
  const L = PROP_LENGTH
  const s = new THREE.Shape()
  s.moveTo(0, -0.02)
  s.bezierCurveTo(L * 0.2, -0.045, L * 0.6, -0.036, L * 0.93, -0.016)
  s.quadraticCurveTo(L, -0.008, L, 0.004)
  s.quadraticCurveTo(L * 0.99, 0.016, L * 0.92, 0.02)
  s.bezierCurveTo(L * 0.6, 0.034, L * 0.25, 0.05, 0, 0.022)
  s.closePath()
  const geometry = new THREE.ExtrudeGeometry(s, {
    depth: 0.006,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
    curveSegments: 16,
  })
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

const makeGearGeometry = (side, z) => {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(side * 0.12, -0.02, z),
    new THREE.Vector3(side * 0.22, -0.1, z * 1.05),
    new THREE.Vector3(side * 0.3, -0.27, z * 1.1),
    new THREE.Vector3(side * 0.32, -0.37, z * 1.1),
  ])
  return new THREE.TubeGeometry(curve, 24, 0.015, 10, false)
}

const useDroneAssets = () =>
  useMemo(() => {
    const carbonMap = makeCarbonTexture()
    return {
      carbon: new THREE.MeshPhysicalMaterial({
        map: carbonMap,
        roughness: 0.38,
        metalness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      }),
      shell: new THREE.MeshPhysicalMaterial({
        color: '#1c2431',
        roughness: 0.28,
        metalness: 0.45,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
      plastic: new THREE.MeshStandardMaterial({ color: '#1a1d23', roughness: 0.72, metalness: 0.05 }),
      rubber: new THREE.MeshStandardMaterial({ color: '#0b0c0e', roughness: 0.95 }),
      gunmetal: new THREE.MeshStandardMaterial({ color: '#2b313b', roughness: 0.3, metalness: 0.9 }),
      aluminium: new THREE.MeshStandardMaterial({ color: '#c3cbd6', roughness: 0.22, metalness: 1 }),
      copper: new THREE.MeshStandardMaterial({ color: '#b87333', roughness: 0.35, metalness: 1 }),
      blade: new THREE.MeshPhysicalMaterial({ color: '#16191f', roughness: 0.35, metalness: 0.1, clearcoat: 0.6 }),
      glass: new THREE.MeshPhysicalMaterial({ color: '#020306', roughness: 0.02, metalness: 0.9, clearcoat: 1 }),
      label: new THREE.MeshStandardMaterial({ color: '#d8dee8', roughness: 0.6 }),
      yellow: new THREE.MeshStandardMaterial({ color: '#e8b422', roughness: 0.5 }),
      wireRed: new THREE.MeshStandardMaterial({ color: '#b3202c', roughness: 0.5 }),
      cyan: new THREE.MeshBasicMaterial({ color: '#38bdf8', toneMapped: false }),
      lens: new THREE.MeshBasicMaterial({ color: '#1d4ed8', toneMapped: false }),
      lights: {
        red: new THREE.MeshBasicMaterial({ color: '#ff2a3d', toneMapped: false }),
        green: new THREE.MeshBasicMaterial({ color: '#22ff88', toneMapped: false }),
        strobe: new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }),
      },
      glow: makeGlowTexture(),
      blur: new THREE.MeshBasicMaterial({
        color: '#c7dcf2',
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      blade3d: makeBladeGeometry(),
      gear: [-1, 1].flatMap((side) => [makeGearGeometry(side, 0.2), makeGearGeometry(side, -0.2)]),
    }
  }, [])

const GLOW_COLORS = { red: '#ff3347', green: '#2bff8f', strobe: '#ffffff' }

const NavLight = ({ type, a, strobeRef }) => (
  <group ref={type === 'strobe' ? strobeRef : undefined} position={[0, -0.03, 0.02]}>
    <mesh material={a.lights[type]}>
      <sphereGeometry args={[0.018, 12, 12]} />
    </mesh>
    <sprite scale={0.2}>
      <spriteMaterial
        map={a.glow}
        color={GLOW_COLORS[type]}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  </group>
)

const Motor = ({ a }) => (
  <group>
    {/* Mount plate + stator base */}
    <RoundedBox args={[0.17, 0.02, 0.17]} radius={0.008} smoothness={2} material={a.carbon} />
    <mesh material={a.plastic} position={[0, 0.035, 0]}>
      <cylinderGeometry args={[0.072, 0.075, 0.05, 32]} />
    </mesh>
    {/* Copper windings peeking through the gap */}
    <mesh material={a.copper} position={[0, 0.064, 0]}>
      <cylinderGeometry args={[0.066, 0.066, 0.012, 32]} />
    </mesh>
    {/* Bell with cooling vents */}
    <mesh material={a.gunmetal} position={[0, 0.098, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 0.056, 32]} />
    </mesh>
    {Array.from({ length: 8 }, (_, i) => (
      <mesh key={i} material={a.rubber} position={[0, 0.098, 0]} rotation-y={(i / 8) * Math.PI * 2}>
        <boxGeometry args={[0.012, 0.03, 0.162]} />
      </mesh>
    ))}
    <mesh material={a.aluminium} position={[0, 0.131, 0]}>
      <cylinderGeometry args={[0.062, 0.07, 0.012, 32]} />
    </mesh>
    {Array.from({ length: 4 }, (_, i) => {
      const t = (i / 4) * Math.PI * 2 + Math.PI / 4
      return (
        <mesh key={i} material={a.gunmetal} position={[Math.cos(t) * 0.038, 0.138, Math.sin(t) * 0.038]}>
          <cylinderGeometry args={[0.007, 0.007, 0.006, 8]} />
        </mesh>
      )
    })}
    <mesh material={a.aluminium} position={[0, 0.152, 0]}>
      <cylinderGeometry args={[0.011, 0.011, 0.03, 12]} />
    </mesh>
  </group>
)

const Propeller = ({ a, spin, speedRef }) => {
  const ref = useRef()
  const blur = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.y += spin * speedRef.current * delta
    // Motion-blur disc only while the props are actually spinning
    blur.current.visible = Math.abs(speedRef.current) > 1
  })

  return (
    <group ref={ref} position={[0, 0.172, 0]}>
      <mesh material={a.blade}>
        <cylinderGeometry args={[0.028, 0.032, 0.026, 20]} />
      </mesh>
      <mesh material={a.aluminium} position={[0, 0.016, 0]}>
        <sphereGeometry args={[0.016, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {[0, Math.PI].map((turn) => (
        <group key={turn} rotation-y={turn}>
          {/* Blade pitch */}
          <mesh geometry={a.blade3d} material={a.blade} rotation-x={spin * 0.2} />
        </group>
      ))}
      <mesh ref={blur} material={a.blur} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.05, PROP_LENGTH, 48]} />
      </mesh>
    </group>
  )
}

const Arm = ({ angle, spin, light, a, speedRef, strobeRef }) => {
  const length = ARM_REACH - ARM_START

  return (
    <group rotation-y={angle}>
      {/* Folding hinge at the body */}
      <RoundedBox args={[0.1, 0.07, 0.12]} radius={0.015} smoothness={2} position={[0, 0.055, ARM_START + 0.02]} material={a.plastic} />
      <mesh material={a.aluminium} position={[0, 0.055, ARM_START + 0.02]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 10]} />
      </mesh>

      {/* Carbon tube + motor wires underneath */}
      <mesh material={a.carbon} position={[0, 0.055, ARM_START + length / 2]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.032, 0.032, length, 20]} />
      </mesh>
      <mesh material={a.rubber} position={[0, 0.02, ARM_START + length / 2]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.009, 0.009, length * 0.9, 8]} />
      </mesh>

      <group position={[0, 0.055, ARM_REACH]}>
        {/* Clamp where the tube meets the motor mount */}
        <mesh material={a.plastic} position={[0, 0, -0.1]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.042, 0.042, 0.05, 20]} />
        </mesh>
        <Motor a={a} />
        <Propeller a={a} spin={spin} speedRef={speedRef} />
        <NavLight type={light} a={a} strobeRef={strobeRef} />
      </group>
    </group>
  )
}

const Frame = ({ a }) => {
  const plate = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(0.44, 0.74, 0.08), { depth: 0.022, bevelEnabled: false })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  return (
    <group>
      <mesh geometry={plate} material={a.carbon} position={[0, 0, 0]} />
      <mesh geometry={plate} material={a.carbon} position={[0, 0.1, 0]} />
      {/* Standoffs between the plates */}
      {[
        [-0.17, -0.3],
        [0.17, -0.3],
        [-0.17, 0.3],
        [0.17, 0.3],
        [-0.19, 0],
        [0.19, 0],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} material={a.aluminium} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.011, 0.011, 0.08, 10]} />
        </mesh>
      ))}
      {/* Flight controller stack, visible between the plates */}
      <RoundedBox args={[0.2, 0.05, 0.2]} radius={0.006} smoothness={2} position={[0, 0.058, 0]} material={a.plastic} />
      <mesh material={a.cyan} position={[0.101, 0.06, 0.05]}>
        <boxGeometry args={[0.004, 0.008, 0.008]} />
      </mesh>
    </group>
  )
}

const Canopy = ({ a }) => (
  <group position={[0, 0.125, 0]}>
    {/* Aerodynamic shell */}
    <mesh material={a.shell} scale={[0.25, 0.1, 0.42]}>
      <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
    </mesh>
    {/* Accent light strip along the spine */}
    <mesh material={a.cyan} position={[0, 0.1, 0.02]} scale={[1, 1, 1]}>
      <boxGeometry args={[0.02, 0.004, 0.36]} />
    </mesh>
    {/* Side intake vents */}
    {[-1, 1].map((side) => (
      <group key={side}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} material={a.rubber} position={[side * 0.215, 0.03, -0.1 + i * 0.05]} rotation-z={side * 0.6}>
            <boxGeometry args={[0.004, 0.035, 0.03]} />
          </mesh>
        ))}
      </group>
    ))}
    {/* Front obstacle-avoidance stereo sensors */}
    {[-1, 1].map((side) => (
      <group key={side} position={[side * 0.07, 0.035, 0.405]} rotation-x={Math.PI / 2 - 0.35}>
        <mesh material={a.gunmetal}>
          <cylinderGeometry args={[0.022, 0.022, 0.012, 20]} />
        </mesh>
        <mesh material={a.glass} position={[0, 0.007, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.004, 20]} />
        </mesh>
      </group>
    ))}
  </group>
)

const Battery = ({ a }) => (
  <group position={[0, -0.07, -0.08]}>
    <RoundedBox args={[0.24, 0.1, 0.44]} radius={0.02} smoothness={3} material={a.plastic} />
    {/* Label */}
    {[-1, 1].map((side) => (
      <mesh key={side} material={a.label} position={[side * 0.121, 0, 0]}>
        <boxGeometry args={[0.002, 0.05, 0.26]} />
      </mesh>
    ))}
    {/* Straps */}
    {[0.12, -0.12].map((z) => (
      <mesh key={z} material={a.rubber} position={[0, 0.005, z]}>
        <boxGeometry args={[0.25, 0.112, 0.03]} />
      </mesh>
    ))}
    {/* Power lead + XT60 connector */}
    <mesh material={a.yellow} position={[0.04, 0.02, -0.25]}>
      <boxGeometry args={[0.04, 0.025, 0.05]} />
    </mesh>
    <mesh material={a.wireRed} position={[0.03, 0.02, -0.226]} rotation-x={Math.PI / 2}>
      <cylinderGeometry args={[0.006, 0.006, 0.03, 8]} />
    </mesh>
  </group>
)

const Gimbal = ({ a }) => (
  <group position={[0, -0.02, 0.33]}>
    {/* Vibration damper plates + rubber balls */}
    <mesh material={a.carbon}>
      <boxGeometry args={[0.15, 0.01, 0.1]} />
    </mesh>
    {[
      [-0.055, -0.035],
      [0.055, -0.035],
      [-0.055, 0.035],
      [0.055, 0.035],
    ].map(([x, z]) => (
      <mesh key={`${x}${z}`} material={a.rubber} position={[x, -0.016, z]}>
        <sphereGeometry args={[0.013, 12, 12]} />
      </mesh>
    ))}
    <mesh material={a.carbon} position={[0, -0.032, 0]}>
      <boxGeometry args={[0.13, 0.008, 0.08]} />
    </mesh>

    {/* Yaw motor and L-shaped arm */}
    <mesh material={a.gunmetal} position={[0, -0.055, 0]}>
      <cylinderGeometry args={[0.028, 0.028, 0.035, 24]} />
    </mesh>
    <mesh material={a.shell} position={[0.04, -0.078, 0]}>
      <boxGeometry args={[0.09, 0.014, 0.03]} />
    </mesh>
    <mesh material={a.shell} position={[0.082, -0.125, 0]}>
      <boxGeometry args={[0.014, 0.1, 0.03]} />
    </mesh>
    {/* Pitch motor */}
    <mesh material={a.gunmetal} position={[0.07, -0.17, 0]} rotation-z={Math.PI / 2}>
      <cylinderGeometry args={[0.028, 0.028, 0.022, 24]} />
    </mesh>

    {/* Camera */}
    <group position={[0, -0.17, 0]} rotation-x={0.25}>
      <RoundedBox args={[0.11, 0.085, 0.1]} radius={0.018} smoothness={3} material={a.shell} />
      <mesh material={a.gunmetal} position={[0, 0, 0.065]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.038, 0.04, 0.035, 32]} />
      </mesh>
      <mesh material={a.aluminium} position={[0, 0, 0.084]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.035, 0.005, 10, 40]} />
      </mesh>
      <mesh material={a.glass} position={[0, 0, 0.083]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.031, 0.031, 0.004, 32]} />
      </mesh>
      {/* Coated-lens reflection */}
      <mesh material={a.lens} position={[0, 0, 0.0855]}>
        <ringGeometry args={[0.012, 0.016, 32]} />
      </mesh>
      <mesh material={a.lights.red} position={[0.04, 0.03, 0.051]}>
        <sphereGeometry args={[0.004, 8, 8]} />
      </mesh>
    </group>
  </group>
)

const GpsMast = ({ a }) => (
  <group position={[0, 0.2, -0.26]}>
    <mesh material={a.carbon} position={[0, 0.06, 0]}>
      <cylinderGeometry args={[0.009, 0.009, 0.12, 10]} />
    </mesh>
    <mesh material={a.plastic} position={[0, 0.13, 0]}>
      <cylinderGeometry args={[0.06, 0.064, 0.022, 32]} />
    </mesh>
    <mesh material={a.shell} position={[0, 0.141, 0]} scale={[1, 0.3, 1]}>
      <sphereGeometry args={[0.058, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
    </mesh>
    {/* Arrow pointing forward */}
    <mesh material={a.label} position={[0, 0.16, 0.01]} rotation-x={Math.PI / 2} scale={[1, 1, 0.15]}>
      <coneGeometry args={[0.015, 0.03, 3]} />
    </mesh>
  </group>
)

const Antennas = ({ a }) =>
  [-1, 1].map((side) => (
    <group key={side} position={[side * 0.15, 0.03, -0.37]} rotation={[-0.9, 0, side * 0.5]}>
      <mesh material={a.rubber} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.006, 0.008, 0.2, 8]} />
      </mesh>
      <mesh material={a.label} position={[0, 0.215, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.03, 8]} />
      </mesh>
    </group>
  ))

const LandingGear = ({ a }) => (
  <group>
    {a.gear.map((geometry, i) => (
      <mesh key={i} geometry={geometry} material={a.carbon} />
    ))}
    {[-1, 1].map((side) => (
      <group key={side} position={[side * 0.32, -0.375, 0]}>
        <mesh material={a.carbon} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.017, 0.017, 0.62, 12]} />
        </mesh>
        {[-0.31, 0.31].map((z) => (
          <mesh key={z} material={a.rubber} position={[0, 0, z]}>
            <sphereGeometry args={[0.022, 12, 12]} />
          </mesh>
        ))}
      </group>
    ))}
  </group>
)

const Drone = ({ speedRef }) => {
  const a = useDroneAssets()
  const strobes = useRef([])

  // Double-flash strobe on the rear lights, like a real aircraft
  useFrame((state) => {
    const t = state.clock.elapsedTime % 1.4
    const on = t < 0.06 || (t > 0.16 && t < 0.22)
    strobes.current.forEach((s) => s && (s.visible = on))
  })

  let strobeIndex = 0
  return (
    <group>
      <Frame a={a} />
      <Canopy a={a} />
      <Battery a={a} />
      <GpsMast a={a} />
      <Antennas a={a} />
      {ARMS.map((arm) => {
        const index = arm.light === 'strobe' ? strobeIndex++ : -1
        return (
          <Arm
            key={arm.angle}
            {...arm}
            a={a}
            speedRef={speedRef}
            strobeRef={index >= 0 ? (el) => (strobes.current[index] = el) : undefined}
          />
        )
      })}
      <LandingGear a={a} />
      <Gimbal a={a} />
    </group>
  )
}

export default Drone
