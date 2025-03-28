'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Pen, HardDrive, Home, LogIn, Loader2 } from 'lucide-react';

export default function App() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (path) => {
    setIsLoading(true);
    // Simulate a loading delay
    setTimeout(() => {
      router.push(path);
    }, 500); // Adjust delay as needed
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Loading animation variants
  const loadingVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300
      }
    }
  };

  // If loading, show a full-screen loader
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <motion.div
          variants={loadingVariants}
          initial="initial"
          animate="animate"
        >
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100"
    >
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        {/* Animated Logo */}
        <motion.div 
          variants={itemVariants}
          className="mb-6"
        >
          <Image 
            priority
            src="/favicon.ico" 
            alt="TIF Design Logo" 
            width={96} 
            height={96} 
            className="shadow-xl rounded-full ring-4 ring-white/50"
          />
        </motion.div>

        {/* Animated Title with Floating Effect */}
        <motion.h1 
          variants={textVariants}
          whileHover="hover"
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-4"
        >
          TIF Design Services
        </motion.h1>

        {/* Subtitle with Subtle Movement */}
        <motion.p 
          variants={textVariants}
          whileHover="hover"
          className="text-xl text-gray-600 max-w-xl mb-8"
        >
          Transforming Ideas into Breathtaking Visual Experiences
        </motion.p>

        {/* Service Icons */}
        <AnimatePresence>
          {isMounted && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center space-x-8 mb-8"
            >
              {[
                { icon: Palette, color: 'blue', label: 'Graphic Design' },
                { icon: Pen, color: 'green', label: 'UI/UX Design' },
                { icon: HardDrive, color: 'purple', label: 'Product Design' }
              ].map((service) => (
                <motion.div 
                  key={service.label}
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    variants={textVariants}
                    className={`p-4 rounded-full bg-${service.color}-100 shadow-lg`}
                  >
                    <service.icon className={`w-16 h-16 text-${service.color}-600`} />
                  </motion.div>
                  <motion.span 
                    variants={textVariants}
                    className="mt-3 text-md font-medium text-gray-700"
                  >
                    {service.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-4"
        >
          <motion.button
            variants={textVariants}
            whileHover="hover"
            className="flex items-center bg-white/30 backdrop-blur-md px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all"
            onClick={() => handleNavigation('/home')}
          >
            <Home className="mr-2 w-6 h-6 text-blue-600" />
            <span className="font-semibold text-gray-800">GET STARTED</span>
          </motion.button>

          <motion.button
            variants={textVariants}
            whileHover="hover"
            className="flex items-center bg-white/30 backdrop-blur-md px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all"
            onClick={() => handleNavigation('./auth/login')}
          >
            <LogIn className="mr-2 w-6 h-6 text-purple-600" />
            <span className="font-semibold text-gray-800">LOGIN</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.main>
  );
}