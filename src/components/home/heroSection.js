"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import ModelViewer from "../models/ModelViewer"
import dynamic from "next/dynamic"

// Dynamically import the ModelViewer with no SSR to prevent hydration issues
// const ModelViewer = dynamic(() => import("./models/ModelViewer"), { ssr: false })

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const modelRef = useRef(null)

  // Initialize window size safely for Next.js
  useEffect(() => {
    // Set initial window size after component mounts
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Set up resize listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate rotation based on mouse position (after window size is known)
  const rotateY = useTransform(mouseX, [0, windowSize.width || 1], [2, -2])
  const rotateX = useTransform(mouseY, [0, windowSize.height || 1], [-1, 1])

  // Add spring physics for smoother transitions
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })

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

  // Variants for staggered animations
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    }),
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
      <motion.div className="container mx-auto px-4" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:min-h-[600px]">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center rounded-2xl bg-white p-6 shadow-sm"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl font-bold leading-tight text-[#1a1f36] md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Introducing TIF <br />
              Design: Elevate
            </motion.h1>

            <motion.p className="mt-4 text-gray-600" variants={itemVariants}>
              At TIF Design, we are passionate about crafting exceptional user experiences.
            </motion.p>

            <motion.div className="relative mt-8 inline-block" variants={itemVariants}>
              <Button
                className="relative rounded-full bg-[#1a1f36] px-8 py-6 text-base font-medium text-white transition-transform duration-300 hover:bg-[#2a2f46]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10">Explore Our Services</span>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#4BB4DE]"
                      initial={{ opacity: 0.3, scale: 0.8 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <div className="mt-16 space-y-8">
              {[
                {
                  title: "Unparalleled Expertise",
                  description: "Empowering Brands to Thrive",
                  iconBg: "#4BB4DE",
                },
                {
                  title: "Innovative Solutions",
                  description: "Delivering Excellence",
                  iconBg: "#1a1f36",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
                  custom={index}
                  variants={featureVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300"
                    style={{ backgroundColor: feature.iconBg }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="sr-only">{feature.title} icon</span>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1f36]">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right 3D Model */}
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
              <ModelViewer />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

