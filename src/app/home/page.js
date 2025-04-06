'use client'

import React, { useEffect } from "react";
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
  // Progress bar animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Smooth scroll behavior
  useEffect(() => {
    // Add smooth scroll behavior to HTML
    document.documentElement.style.scrollBehavior = "smooth";
    
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
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "";
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg z-40 hover:bg-indigo-700 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, y: scrollYProgress.get() > 0.2 ? 0 : 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </motion.button>
      
      {/* Header */}
      <EnhancedNavbar />
      
      {/* Main Content */}
      <main className="scroll-container">
        {/* hero section  */}
        
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
        
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <TestimonialsSection />
        </motion.div>
        
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-wrapper"
        >
          <ContactSection />
        </motion.div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global Styles */}
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
          background: linear-gradient(to right, transparent, rgba(107, 114, 128, 0.2), transparent);
        }
      `}</style>
    </div>
  );
};

export default Home;