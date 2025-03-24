"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { register } from "swiper/element/bundle";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Register Swiper web components
register();

const FeatureSlider = ({ slides = [] }) => {
  const swiperRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Ensure the ref is available and slides exist
    if (swiperRef.current && slides.length > 0) {
      // Object with parameters
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
          clickable: true,
          el: '.swiper-custom-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 800,
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        on: {
          slideChange: (swiper) => {
            setActiveIndex(swiper.realIndex);
          }
        }
      };

      // Assign all parameters to Swiper element
      Object.assign(swiperRef.current, swiperParams);

      // Initialize Swiper
      swiperRef.current.initialize();
      setIsInitialized(true);
    }
  }, [slides]); // Reinitialize when slides change

  if (!slides || slides.length === 0) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  const handlePrev = () => {
    if (swiperRef.current && isInitialized) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && isInitialized) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full relative">
      {/* Custom navigation buttons */}     
      <swiper-container
        ref={swiperRef}
        init="false"
        class="w-full"
      >
        {slides.map((slide, index) => (
          <swiper-slide key={index}>
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col mb-8 mx-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title || `Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium tracking-wide">View Details</span>
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{slide.title || `Project ${index + 1}`}</h3>
                <p className="text-gray-600 text-sm">{slide.description || "No description available"}</p>
              </div>
            </motion.div>
          </swiper-slide>
        ))}
      </swiper-container>
      
      {/* Custom pagination */}
      <div className="swiper-custom-pagination flex justify-center gap-1.5 mt-2"></div>
      
      {/* Add custom styles for pagination */}
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
        
        .swiper-container-horizontal > .swiper-pagination-bullets,
        .swiper-pagination-custom,
        .swiper-pagination-fraction {
          bottom: 0px;
        }
      `}</style>
    </div>
  );
};

export default FeatureSlider;