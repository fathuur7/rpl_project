import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { getAllUsers } from '@/hooks/getAlluser';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HeroSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Optimized user fetching with error handling and loading state
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = await getAllUsers();
        
        if (isMounted) {
          setUsers(userData || []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        if (isMounted) {
          setError(err);
          setUsers([]); // Fallback to empty array
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize first 3 users to prevent unnecessary re-renders
  const displayUsers = useMemo(() => {
    return users.slice(0, 3);
  }, [users]);

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative overflow-hidden flex items-center py-16 md:py-24 min-h-[80vh]">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://public.readdy.ai/ai/img_res/d5c77385025fdf9445e8440af65bb749.jpg"
          alt="Design Studio Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent md:to-white/20" />
      </div>

      {/* Simplified decorative elements with better performance */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-indigo-500/10 z-1 hidden sm:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-16 h-16 md:w-32 md:h-32 rounded-full bg-pink-500/10 z-1 hidden sm:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-xl lg:max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-4 md:mb-6 bg-indigo-100 text-indigo-600 px-3 py-1 md:px-4 rounded-full font-medium text-xs md:text-sm"
          >
            Creative Design Studio
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
          >
            Bringing Your <span className="text-indigo-600">Vision</span> to Life Through Creative Design
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-10 leading-relaxed"
          >
            DesignTify specializes in creating stunning visual solutions for
            businesses and individuals. From branding to UI/UX, we transform
            ideas into impactful designs that captivate and convert.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
          >
            <motion.button
              className="px-6 py-3 md:px-8 md:py-4 bg-indigo-600 text-white font-medium rounded-full flex items-center justify-center transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg shadow-md group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore Our Work
              <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={18} />
            </motion.button>
            
            <motion.button
              className="px-6 py-3 md:px-8 md:py-4 border-2 border-indigo-600 text-indigo-600 font-medium rounded-full flex items-center justify-center transition-all duration-300 hover:bg-indigo-50 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Play size={18} className="mr-2" />
              Watch Showreel
            </motion.button>
          </motion.div>
          
          {/* Optimized user avatars section */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 md:mt-12 flex flex-wrap items-center"
          >
            <div className="flex -space-x-2 md:-space-x-3">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 md:w-12 md:h-12 border-2 border-white rounded-full bg-gray-200 animate-pulse"
                  />
                ))
              ) : (
                displayUsers.map((user) => (
                  <Avatar key={user._id || user.id} className="w-10 h-10 md:w-12 md:h-12 border-2 border-white">
                    <AvatarImage
                      src={user.profilePhoto || "/avatar-placeholder.png"}
                      alt={`Client ${user.name || 'User'}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'UN'}
                    </AvatarFallback>
                  </Avatar>
                ))
              )}
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm text-gray-600">
                Trusted by <span className="font-bold text-indigo-600">200+</span> clients worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Optimized bottom curve decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-1">
        <svg 
          className="w-full h-8 sm:h-12 md:h-16 text-gray-50 fill-current" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;