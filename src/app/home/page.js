'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layouts/navbar/com';
import HeroSection from '@/components/home/heroSection';
import FeatureSlider from '@/components/home/FeatureSlider';
// import { ArrowRight, Star, BadgeCheck, TrendingUp } from 'lucide-react';
// import Categories from '@/components/home/Categories';

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [featuredSlides, setFeaturedSlides] = useState([]);
  // const [activeCategory, setActiveCategory] = useState('Discover');
  const [isLoading, setIsLoading] = useState(true);
  const statsRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    // Fetch portfolio data
    setIsLoading(true);
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => {
        console.error('Error fetching portfolio data:', error);
        // Set empty arrays on error
        setPortfolioItems([]);
        setFeaturedSlides([]);
        setIsLoading(false);
      });
  }, []);

  const categories = [
    'Discover', 'Animation', 'Branding', 'Illustration', 'Mobile', 
    'Print', 'Product Design', 'Typography', 'Web Design'
  ];

  return (
    <div className="min-h-screen bg-white">      
      <header className="border-b border-gray-100">
        <Navbar />
      </header>
      
      <main>
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
        
        {/* component categories */}
        <section>
          {/* <Categories/> */}
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="">
   
      </footer>

      {/* Custom style for counter animation */}
      <style jsx global>{`
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in .animate-counter {
          animation: countUp 0.8s forwards;
        }
        .animate-in > div:nth-child(1) .animate-counter { animation-delay: 0.1s; }
        .animate-in > div:nth-child(2) .animate-counter { animation-delay: 0.3s; }
        .animate-in > div:nth-child(3) .animate-counter { animation-delay: 0.5s; }
        .animate-in > div:nth-child(4) .animate-counter { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}