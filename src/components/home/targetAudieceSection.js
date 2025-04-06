import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, UserCircle, Palette, Laptop, Building, Megaphone, Globe } from 'lucide-react';

const TargetAudienceSection = () => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="clients" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our design solutions are tailored for both individuals and
            businesses, each with unique needs and goals.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Individual Clients */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src="https://public.readdy.ai/ai/img_res/6a849140c004533eb1135e81550150ec.jpg"
                alt="Individual Clients"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For Individuals
              </h3>
              <p className="text-gray-600 mb-6">
                We help entrepreneurs, freelancers, and individuals establish
                a strong personal brand through custom design solutions that
                reflect your unique identity and goals.
              </p>
              <ul className="text-gray-600 mb-6 space-y-3">
                <li className="flex items-center">
                  <UserCircle className="text-indigo-600 mr-3" size={20} />
                  <span>Personal branding packages</span>
                </li>
                <li className="flex items-center">
                  <Palette className="text-indigo-600 mr-3" size={20} />
                  <span>Custom design solutions</span>
                </li>
                <li className="flex items-center">
                  <Laptop className="text-indigo-600 mr-3" size={20} />
                  <span>Portfolio websites</span>
                </li>
              </ul>
              <motion.button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Individual Solutions
              </motion.button>
            </div>
          </motion.div>

          {/* Business Clients */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src="https://public.readdy.ai/ai/img_res/02edea738684d189aca55f5b0ed1d6fb.jpg"
                alt="Business Clients"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For Businesses
              </h3>
              <p className="text-gray-600 mb-6">
                We partner with companies of all sizes to develop
                comprehensive brand identities, marketing materials, and
                digital experiences that drive business growth.
              </p>
              <ul className="text-gray-600 mb-6 space-y-3">
                <li className="flex items-center">
                  <Building className="text-indigo-600 mr-3" size={20} />
                  <span>Corporate identity systems</span>
                </li>
                <li className="flex items-center">
                  <Megaphone className="text-indigo-600 mr-3" size={20} />
                  <span>Marketing campaign materials</span>
                </li>
                <li className="flex items-center">
                  <Globe className="text-indigo-600 mr-3" size={20} />
                  <span>Website & app design</span>
                </li>
              </ul>
              <motion.button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Business Solutions
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;