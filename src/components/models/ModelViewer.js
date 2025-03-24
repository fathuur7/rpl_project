"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, PresentationControls, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"

function Model() {
  const { scene } = useGLTF("/models/model.glb") // Model ada di public/models/

  return (
    <Center>
      <primitive
        object={scene}
        scale={2.5}
        position={[0, 0, 0]}
        frustumCulled={false} // Mencegah model hilang saat di luar kamera
      />
    </Center>
  )
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }} // Adjusted camera position
        shadows
      >
        <Suspense fallback={null}>
          {/* Improved lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={0.5} intensity={1} castShadow />

          {/* Environment for better lighting and reflections */}
          <Environment preset="city" />

          {/* Presentation Controls with adjusted settings */}
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 2, Math.PI / 2]} // Expanded range
            azimuth={[-Math.PI, Math.PI]} // Full 360 rotation
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Model />
          </PresentationControls>

          {/* Orbit Controls with adjusted settings */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minPolarAngle={0} // Allow full rotation
            maxPolarAngle={Math.PI} // Allow full rotation
            dampingFactor={0.05}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

