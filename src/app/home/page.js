'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EnhancedNavbar from "@/components/layouts/navbar/com";
import Footer from "@/components/layouts/footer/com";
import ServicesSection from "@/components/home/ServicesSection";
import Portfolio from "@/components/home/portofolio";
import ContactSection from "@/components/home/ContactSection";
import TestimonialsSection from "@/components/home/testimonial";
import TargetAudienceSection from "@/components/home/targetAudieceSection";
import AboutSection from "@/components/home/aboutSection";
import HeroSectionLeft from "@/components/home/heroSectionLeft";
import HeroSection from "@/components/home/heroSection";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  // State to prevent hydration issues
  const [isClient, setIsClient] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Progress bar animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    
    // Add smooth scroll behavior to HTML
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Handle scroll for back to top button
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowBackToTop(scrolled > windowHeight * 0.2);
    };

    // Create intersection observer for sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      observer.observe(section);
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "";
      sections.forEach(section => {
        observer.unobserve(section); // Fixed: was observer.unobserver
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Back to top handler
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Progress indicator - only render on client */}
      {isClient && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50 origin-left"
          style={{ scaleX }}
        />
      )}
      
      {/* Back to top button - only render on client */}
      {isClient && (
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg z-40 hover:bg-indigo-700 transition-all duration-300"
          onClick={handleBackToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showBackToTop ? 1 : 0, 
            y: showBackToTop ? 0 : 20 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: showBackToTop ? 'flex' : 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.button>
      )}
      
      {/* Header */}
      <EnhancedNavbar />
      
      {/* Main Content */}
      <main className="scroll-container">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Hero Section Left */}
        <HeroSectionLeft />
        
        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <ServicesSection />
        </motion.div>
        
        {/* Target Audience Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <TargetAudienceSection />
        </motion.div>
        
        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <Portfolio />
        </motion.div>
        
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <AboutSection />
        </motion.div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global Styles - only render on client */}
      {isClient && (
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .section-wrapper {
            opacity: 0.4;
            transition: opacity 0.8s ease-out;
          }

          .section-visible {
            opacity: 1;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .scroll-container section {
            position: relative;
          }

          .scroll-container section::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 10%;
            right: 10%;
            height: 1px;
            background: linear-gradient(
              to right,
              transparent,
              rgba(107, 114, 128, 0.2),
              transparent
            );
          }
        `}
        </style>
      )}
    </div>
  );
};

export default Home;