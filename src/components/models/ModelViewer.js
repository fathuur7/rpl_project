"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"

function Model({ path }) {
  const { scene } = useGLTF(path) // ✅ Path sekarang diteruskan dengan benar

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, 0, 0]}
      frustumCulled={false}
    />
  )
}

export default function ModelViewer({ path }) { // ✅ Perbaikan destructuring props
  return (
    <div className="w-full h-full">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }}
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
          
          <Center>
            {/* Mengirimkan path dengan benar ke Model */}
            <Model path={path} />
          </Center>

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.05}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
