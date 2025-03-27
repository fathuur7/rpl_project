'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

// Components
import Navbar from '@/components/layouts/navbar/com';
import HeroSection from '@/components/home/heroSection';
import FeatureSlider from '@/components/home/FeatureSlider';
import CreativePotentialSection from '@/components/home/ads';
import DesignHeroSection from '@/components/home/heroSectionLeft';
import Footer from '@/components/layouts/footer/com';
import TestimonialSection from '@/components/home/testimonial';
import SmoothScrollContainer from '@/components/barProgres';
import LoadingPlaceholder from '@/components/LoadingPlaceholder';

// Hooks
import useCurrentUser from '@/hooks/useCurrentUser';
import usePortfolioData from '@/hooks/usePortfolioData';

// Utils
import { debugLog } from '@/utils/debugLogger';

export default function Home() {
  // Custom hooks for data fetching
  const { user, userLoading } = useCurrentUser();
  const { 
    portfolioItems, 
    featuredSlides, 
    isLoading, 
    isInitialRender 
  } = usePortfolioData();

  // Performance optimization: Memoized animation variants
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);
  
  // Debug logging for user and portfolio data
  useEffect(() => {
    debugLog('Current User:', user);
    debugLog('Portfolio Items:', portfolioItems);
  }, [user, portfolioItems]);

  // Smooth scroll setup
  useEffect(() => {
    const smoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };
    smoothScroll();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Loading placeholder component
  

  // If it's initial render or loading, show loading placeholder
  if (isInitialRender || isLoading || userLoading) {
    return <LoadingPlaceholder />;
  }
  
  return (
    <SmoothScrollContainer>
      <div className="min-h-screen bg-white overflow-hidden">      
        {/* Navbar */}
        <header className="border-b border-gray-100">
          <Navbar />
        </header>
        
        <main className="space-y-16 md:space-y-24">
          {/* Hero Section */}
          <section className="relative py-20 md:py-28">
            <div className="container mx-auto px-4">
              <HeroSection />
            </div>
          </section>
          
          {/* Featured Projects Slider Section */}
          <section className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="inline-block px-3 py-1 mb-4 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                Our Latest Work
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                ✨ Crafting Innovative Designs ✨
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                We transform <span className="text-indigo-600 font-semibold">visions</span> into captivating experiences.  
                By blending <span className="text-indigo-500 font-medium">creativity</span> with <span className="text-indigo-500 font-medium">technical excellence</span>,  
                we deliver designs that <span className="text-indigo-600 font-semibold">inspire</span> and <span className="text-indigo-600 font-semibold">engage</span>.
              </p>
            </motion.div>
            <FeatureSlider slides={featuredSlides} />
          </section>
          
          {/* Creative Potential Section */}
          <section>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <CreativePotentialSection/>
            </motion.div>
          </section>

          {/* Design Hero Section */}
          <section className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <DesignHeroSection/>
            </motion.div>
          </section>
          
          {/* Testimonial Section */}
          <section className="py-20 md:py-24 bg-gray-50 overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <TestimonialSection/>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <div>
          <Footer/>
        </div>
      </div>
    </SmoothScrollContainer>
  );
}