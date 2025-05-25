import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Image Column */}
          <motion.div variants={fadeIn} className="relative">
            <motion.div 
              className="absolute -top-4 -left-4 w-24 h-24 border-2 border-indigo-500 rounded z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            
            <motion.div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="https://public.readdy.ai/ai/img_res/da90644c88564f07cab9a9ae92590622.jpg"
                alt="Our Creative Studio"
                width={600}
                height={400}
                layout="responsive"
                objectFit="cover"
                className="transform transition-transform duration-700 hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-indigo-500 rounded z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </motion.div>

          {/* Content Column */}
          <motion.div variants={fadeIn}>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-indigo-600">Crafting Brilliance</span> at DesignTify
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 mb-6 leading-relaxed"
              variants={fadeIn}
            >
              Established in 2020, DesignTify has emerged as a sanctuary of creativity where imagination meets strategic precision. Our atelier is dedicated to cultivating exceptional design narratives that elevate our clients&apos; presence in an increasingly discerning marketplace.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              variants={fadeIn}
            >
              Our collective of visionary artisans and strategic thinkers collaborates to orchestrate designs that transcend mere aesthetics—each creation meticulously crafted to articulate your brand&apos;s essence while driving meaningful engagement and measurable outcomes.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-8 mb-10"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-xl font-bold text-indigo-600 mb-3 flex items-center">
                  <span className="w-8 h-1 bg-indigo-600 mr-3"></span>
                  Our Ethos
                </h3>
                <p className="text-gray-700">
                  To illuminate possibilities through design that resonates, inspires, and catalyzes transformation—empowering our clients to articulate their authentic voice in a world of visual noise.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <h3 className="text-xl font-bold text-indigo-600 mb-3 flex items-center">
                  <span className="w-8 h-1 bg-indigo-600 mr-3"></span>
                  Our Aspiration
                </h3>
                <p className="text-gray-700">
                  To be recognized as the quintessential design atelier where unparalleled creativity converges with client-focused excellence, setting new standards in the visual communication landscape.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.button
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full flex items-center transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Meet Our Visionaries
              <ChevronRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;