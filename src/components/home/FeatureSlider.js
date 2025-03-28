"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { register } from "swiper/element/bundle";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Register Swiper web components
register();

const FeatureSlider = ({ slides = [] }) => {
  const swiperRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure the ref is available and slides exist
    if (swiperRef.current && slides.length > 0) {
      // Object with parameters
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: false,
        pagination: {
          clickable: true,
          el: '.swiper-custom-pagination'
        },
        breakpoints: {
          1024: {
            slidesPerView: 1,
            spaceBetween: 24,
          }
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 800,
      };

      // Assign all parameters to Swiper element
      Object.assign(swiperRef.current, swiperParams);

      // Initialize Swiper
      swiperRef.current.initialize();
      setIsInitialized(true);
    }
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  // Group slides into sets of 3
  const groupedSlides = slides.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/3)
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, []);

  return (
    <div className="w-full relative">
      <swiper-container
        ref={swiperRef}
        init="false"
        className="w-full"
      >
        {groupedSlides.map((slideGroup, groupIndex) => (
          <swiper-slide key={groupIndex} className="p-1">
            <div className="grid grid-cols-3 gap-4 w-full">
              {slideGroup.map((slide, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title || `Project ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      unoptimized={!slide.image}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium tracking-wide">View Details</span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-base text-gray-900 mb-1 truncate">
                      {slide.title || `Project ${index + 1}`}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {slide.description || "No description available"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
      
      {/* Custom pagination */}
      <div className="swiper-custom-pagination flex justify-center gap-1.5 mt-4"></div>
      
      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-custom-pagination .swiper-pagination-bullet-active {
          background: #4f46e5;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default FeatureSlider;