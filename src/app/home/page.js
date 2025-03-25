'use client';
import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/layouts/navbar/com';
import HeroSection from '@/components/home/heroSection';
import FeatureSlider from '@/components/home/FeatureSlider';
import CreativePotentialSection from '@/components/home/ads'
import DesignHeroSection from '@/components/home/heroSectionLeft'

// Memoized component to prevent unnecessary re-renders
const SmoothScrollContainer = memo(({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {children}
      <motion.div 
        className="progress-bar" 
        style={{ 
          scaleX,
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(to right, #4A90E2, #7B68EE)', 
          transformOrigin: '0%',
          zIndex: 1000 
        }} 
      />
    </>
  );
});

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [featuredSlides, setFeaturedSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const statsRef = useRef(null);

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
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setPortfolioItems([]);
      setFeaturedSlides([]);
      setIsLoading(false);
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

  return (
    <SmoothScrollContainer>
      <div className="min-h-screen bg-white will-change-transform ">      
        <header className="border-b border-gray-100">
          <Navbar />
        </header>
        
        <main className="overflow-hidden">
          {/* Hero Section */}
          <section className="w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
            <HeroSection />
          </section>
          
          {/* Featured Projects Slider Section */}
          <section className="container mx-auto py-12">
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
          
          {/* Sections */}
          <section className="h-screen py-auto">
            <CreativePotentialSection/>
          </section>

          <section className="h-screen">
            <DesignHeroSection/>
          </section>
        </main>

        {/* Footer Placeholder */}
        <footer className=""></footer>
      </div>
    </SmoothScrollContainer>
  );
}