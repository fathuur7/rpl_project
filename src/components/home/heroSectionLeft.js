"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ModelViewer from "../models/ModelViewer";

export default function HeroSectionLeft() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const modelRef = useRef(null)
  
  // Window resize and mouse tracking logic
  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    
    // Resize listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 3D Rotation Calculations
  const rotateY = useTransform(mouseX, [0, windowSize.width || 1], [2, -2])
  const rotateX = useTransform(mouseY, [0, windowSize.height || 1], [-1, 1])

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })

  // Mouse move tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const modelContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  }

  return (
    <section className="w-full overflow-hidden bg-white py-16 md:py-24">
      <motion.div 
        className="container mx-auto px-4" 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:min-h-[600px]">
          {/* Left Side: 3D Model */}
          <motion.div
            className="flex items-center justify-center rounded-2xl bg-gray-50 p-6 shadow-md"
            variants={modelContainerVariants}
          >
            <motion.div
              className="relative h-[500px] w-full"
              ref={modelRef}
              style={{
                transformStyle: "preserve-3d",
                perspectiveOrigin: "center center",
                perspective: 1000,
                transform: `rotateX(${springRotateX}deg) rotateY(${springRotateY}deg)`,
              }}
            >
              <ModelViewer path="./models/home.glb" />
            </motion.div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex items-center justify-center p-6 md:p-12 lg:p-16">
            <motion.div 
              className="text-center md:text-left max-w-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                className="text-sm md:text-base text-blue-600 mb-4 uppercase tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Innovative Design Solutions
              </motion.p>

              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transform Your Digital 
                <br />
                <span className="text-blue-700">Experience</span>
              </motion.h1>

              <motion.p 
                className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We craft cutting-edge digital experiences that blend creativity, 
                technology, and user-centric design to elevate your brand&apos;s digital presence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 focus:outline-none">
                  Get in touch
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}