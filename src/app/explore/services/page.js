"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import services from '@/components/explore/services/category';
import ServiceDetailModal from '@/components/explore/services/ServiceDetailModal';
import EnhancedNavbar from '@/components/layouts/navbar/com';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Navbar Positioning */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <EnhancedNavbar />
      </div>

      {/* Main Content with Top Padding */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section with Enhanced Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Our Creative Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elevating digital experiences through innovative design, strategic thinking, and meticulous craftsmanship.
          </p>
        </motion.div>

        {/* Services Grid with Enhanced Styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 group"
              onClick={() => setSelectedService(service)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4 opacity-80 group-hover:text-indigo-600 transition-colors">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div className="h-0.5 w-1/2 bg-indigo-100 group-hover:bg-indigo-300 transition-all"></div>
                  <span className="text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with Enhanced Styling */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold 
            hover:from-indigo-700 hover:to-purple-700 
            transition-all duration-300 
            transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl">
            Start Your Project
          </button>
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