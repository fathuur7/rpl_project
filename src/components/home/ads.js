import React from 'react';
import { Star, Layers, Triangle } from 'lucide-react';
import { motion } from 'framer-motion';


const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start space-y-4"
  >
    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
);

export default function CreativePotentialSection (){
  return (
    <section className="py-16 bg-gradient-to-br from-[#FFE4E1] to-[#FFF0F5] flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Unlock Your Creative Potential
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover the Power of Exceptional Design
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Triangle className="w-8 h-8 text-orange-500" />}
            title="Elevate Your Brand"
            description="Crafting Innovative Solutions for Your Digital"
          />
          <FeatureCard 
            icon={<Star className="w-8 h-8 text-blue-500" />}
            title="Connect with Us"
            description="Explore Our Design Services and Elevate Your"
          />
          <FeatureCard 
            icon={<Layers className="w-8 h-8 text-purple-500" />}
            title="Reach New Heights with"
            description="Unlock the Full Potential of Your Digital Presence"
          />
        </div>
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1E2875] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#2C3E91] transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
};
