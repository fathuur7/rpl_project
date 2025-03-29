"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import services from '@/components/explore/services/category';
import ServiceDetailModal from '@/components/explore/services/ServiceDetailModal';
import EnhancedNavbar from '@/components/layouts/navbar/com';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 overflow-hidden">
      {/* Navbar Positioning */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <EnhancedNavbar />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
      </div>

      {/* Main Content with Top Padding */}
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        {/* Hero Section with Enhanced Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 mb-6 leading-tight">
            Our Creative Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elevating digital experiences through innovative design, strategic thinking, and meticulous craftsmanship.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-8"
          ></motion.div>
        </motion.div>

        {/* Services Grid with Enhanced Styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.3 + index * 0.1, 
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mt-16 -mr-16 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="flex items-start mb-5">
                  <div className="text-4xl mr-4 opacity-80 text-indigo-500 group-hover:text-indigo-600 transition-colors">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div className="h-0.5 w-1/2 bg-indigo-100 group-hover:bg-indigo-300 transition-all duration-500"></div>
                  <span className="text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    Learn More 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with Enhanced Styling */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16 relative"
        >
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-indigo-100 opacity-50 blur-xl"></div>
          </div>
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to transform your digital presence?</h3>
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold 
              hover:from-indigo-700 hover:to-purple-700 
              transition-all duration-300 
              transform hover:-translate-y-1 
              shadow-lg hover:shadow-xl">
              Start Your Project
              <span className="ml-2">→</span>
            </button>
          </div>
        </motion.div>

        {/* Modal Rendering */}
        <AnimatePresence>
          {selectedService && (
            <ServiceDetailModal 
              service={selectedService} 
              onClose={() => setSelectedService(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesPage;