'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  PaletteIcon, 
  LayoutGridIcon, 
  BookOpen, 
  CheckCircle2Icon,
  SparklesIcon,
  StarIcon,
  TrendingUpIcon
} from 'lucide-react';
import Navbar from '@/components/layouts/navbar/com';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const router = useRouter();

  const services = [
    {
      category: 'Graphic Design',
      description: 'Transforming brand identities through innovative visual storytelling and strategic design solutions.',
      items: [
        'Professional Logo Design',
        'Corporate Branding',
        'Marketing Collateral',
        'Social Media Graphics',
        'Print Design',
        'Visual Identity Systems'
      ],
      icon: <PaletteIcon className="w-12 h-12 text-blue-600" />,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      category: 'Product Design',
      description: 'Crafting compelling product experiences that elevate brand perception and market competitiveness.',
      items: [
        'Packaging Design',
        'Product Visualization',
        'Merchandise Design',
        'Branded Merchandise',
        'Conceptual Prototyping',
        'Industrial Design Consulting'
      ],
      icon: <LayoutGridIcon className="w-12 h-12 text-green-600" />,
      color: 'green',
      gradient: 'from-green-500 to-green-700'
    },
    {
      category: 'UI/UX Design',
      description: 'Creating intuitive, user-centered digital experiences that engage and delight your audience.',
      items: [
        'Website Design',
        'Mobile App Interface',
        'User Experience Research',
        'Interactive Prototyping',
        'Usability Testing',
        'Design System Development'
      ],
      icon: <BookOpen className="w-12 h-12 text-purple-600" />,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-700'
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const keyStrengths = [
    { 
      title: 'Creative Excellence', 
      description: 'Pushing boundaries with innovative design approaches.',
      icon: <SparklesIcon className="w-10 h-10 text-yellow-500" />
    },
    { 
      title: 'Client-Centric Approach', 
      description: 'Tailoring solutions to meet unique client needs.',
      icon: <StarIcon className="w-10 h-10 text-orange-500" />
    },
    { 
      title: 'Cutting-Edge Techniques', 
      description: 'Leveraging latest design trends and technologies.',
      icon: <TrendingUpIcon className="w-10 h-10 text-green-500" />
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
            >
              TIF Design Studio
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Empowering brands through innovative design solutions that transform vision into visual excellence.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
                }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg border-l-4 border-${service.color}-500`}
              >
                <div className={`p-6 bg-gradient-to-r ${service.gradient} text-white`}>
                  <div className="flex items-center space-x-4">
                    {service.icon}
                    <h2 className="text-2xl font-bold">{service.category}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 h-20">{service.description}</p>
                  <ul className="space-y-2 text-gray-700">
                    {service.items.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center"
                      >
                        <CheckCircle2Icon className={`w-4 h-4 mr-2 text-${service.color}-500`} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Strengths */}
          <motion.div 
            variants={itemVariants}
            className="bg-white shadow-2xl rounded-2xl p-12 mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Key Strengths
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {keyStrengths.map((strength, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2
                  }}
                  className="bg-gray-50 p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex justify-center mb-6">
                    {strength.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-gray-600">
                    {strength.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-16 rounded-2xl shadow-2xl"
          >
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-4xl font-bold mb-6"
            >
              Ready to Elevate Your Brand?
            </motion.h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate and bring your creative vision to life through innovative design solutions.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => router.push('/contact')}
                className="px-10 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default AboutUs;