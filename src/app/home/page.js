'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layouts/navbar/com';
import HeroSection from '@/components/home/heroSection';
import FeatureSlider from '@/components/home/FeatureSlider';
import CreativePotentialSection from '@/components/home/ads';
import DesignHeroSection from '@/components/home/heroSectionLeft';
import Footer from '@/components/layouts/footer/com';
import TestimonialSection from '@/components/home/testimonial';
import SmoothScrollContainer from '@/components/barProgres';

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [featuredSlides, setFeaturedSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Memoized fetch function to prevent recreating on every render
  const fetchPortfolioData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/data/data.json');
      const data = await response.json();

      if (Array.isArray(data)) {
        const updatedData = data.map((item, index) => ({ id: index + 1, ...item }));
        setPortfolioItems(updatedData);
        
        // Create featured slides from the first 15 items
        if (updatedData.length > 0) {
          const featured = updatedData.slice(0, 15).map(item => ({
            title: item.title || 'Untitled',
            description: item.category || '',
            image: item.image_url || '/placeholder-image.jpg'
          }));
          setFeaturedSlides(featured);
        }
      }
      setIsLoading(false);
      setIsInitialRender(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setPortfolioItems([]);
      setFeaturedSlides([]);
      setIsLoading(false);
      setIsInitialRender(false);
    }
  }, []);

  // Optimized useEffect with cleanup
  useEffect(() => {
    fetchPortfolioData();

    // Smooth scroll polyfill
    const smoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };
    smoothScroll();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [fetchPortfolioData]);

  // Performance optimization: Memoized animation variants
  const fadeInUp = React.useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }), []);
  
  // Placeholder component for initial render
  const LoadingPlaceholder = () => (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 w-64 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 w-96 mx-auto mb-2"></div>
          <div className="h-6 bg-gray-200 w-80 mx-auto"></div>
        </div>
      </div>
    </div>
  );

  // If it's initial render or loading, show loading placeholder
  if (isInitialRender) {
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