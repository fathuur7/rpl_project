import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui'; // Assuming these components exist in your project

const ServicesSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "#4338ca", // Indigo-700
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Design Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive design solutions tailored to meet your
            specific needs and goals.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Graphic Design */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="overflow-hidden shadow-lg transition-shadow duration-300 h-full">
              <motion.div 
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/api/placeholder/400/320"
                  alt="Graphic Design"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Graphic Design
                </h3>
                <motion.ul 
                  className="text-gray-600 mb-4 space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                >
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Logo & Brand Identity
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Marketing Materials
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Posters & Brochures
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Social Media Graphics
                  </motion.li>
                </motion.ul>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button className="rounded-lg w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          {/* Product Design */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="overflow-hidden shadow-lg transition-shadow duration-300 h-full">
              <motion.div 
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/api/placeholder/400/320"
                  alt="Product Design"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Product Design
                </h3>
                <motion.ul 
                  className="text-gray-600 mb-4 space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                >
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Packaging Design
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    T-shirt & Merchandise
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Stickers & Labels
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Interior Design Elements
                  </motion.li>
                </motion.ul>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button className="rounded-lg w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          {/* UI/UX Design */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="overflow-hidden shadow-lg transition-shadow duration-300 h-full">
              <motion.div 
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/api/placeholder/400/320"
                  alt="UI/UX Design"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  UI/UX Design
                </h3>
                <motion.ul 
                  className="text-gray-600 mb-4 space-y-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                >
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Website Design
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Mobile App Interfaces
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    User Experience Optimization
                  </motion.li>
                  <motion.li variants={listItemVariants} className="flex items-center">
                    <i className="fas fa-check text-indigo-600 mr-2"></i>
                    Interactive Prototypes
                  </motion.li>
                </motion.ul>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button className="rounded-lg w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;