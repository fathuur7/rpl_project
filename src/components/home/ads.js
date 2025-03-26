import React from 'react';
import { Star, Layers, Triangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.12)"
    }}
    transition={{ 
      type: "spring", 
      stiffness: 300,
      damping: 10
    }}
    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-start space-y-5 transform transition-all duration-300 hover:border-blue-200"
  >
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
      {React.cloneElement(icon, { 
        className: `${icon.props.className} transform transition-transform duration-300 group-hover:rotate-12`
      })}
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors group-hover:text-blue-600">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
    <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
      <span className="text-sm font-semibold mr-2">Learn More</span>
      <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

export default function CreativePotentialSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#F5F7FF] to-[#E6E9F4] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
          >
            Unlock Your <span className="text-blue-600">Creative Potential</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Transform Your Ideas into Stunning Visual Experiences with Our Expert Design Solutions
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<Triangle className="w-10 h-10 text-orange-500" />}
              title="Elevate Your Brand"
              description="Craft a unique visual identity that sets you apart in the competitive market landscape."
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<Star className="w-10 h-10 text-blue-500" />}
              title="Connect Meaningfully"
              description="Create emotional connections through design that resonates with your target audience."
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<Layers className="w-10 h-10 text-purple-500" />}
              title="Innovate Boldly"
              description="Push creative boundaries and transform your digital presence with cutting-edge design."
            />
          </motion.div>
        </motion.div>

        <div className="text-center mt-16">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(30,40,117,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1E2875] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-[#2C3E91] transition-all duration-300 flex items-center justify-center mx-auto group"
          >
            Get Started
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}