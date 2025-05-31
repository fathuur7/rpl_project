import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, UserCircle, Palette, Laptop, Building, Megaphone, Globe } from 'lucide-react';

const TargetAudienceSection = () => {
  // Memoize animation variants to prevent recreation on each render
  const animationVariants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    header: {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }
  }), []);

  // Memoize card data to prevent recreation
  const cardData = useMemo(() => [
    {
      id: 'individuals',
      title: 'For Individuals',
      description: 'We help entrepreneurs, freelancers, and individuals establish a strong personal brand through custom design solutions that reflect your unique identity and goals.',
      image: 'https://public.readdy.ai/ai/img_res/6a849140c004533eb1135e81550150ec.jpg',
      alt: 'Individual clients working on creative projects',
      features: [
        { icon: UserCircle, text: 'Personal branding packages' },
        { icon: Palette, text: 'Custom design solutions' },
        { icon: Laptop, text: 'Portfolio websites' }
      ],
      buttonText: 'See Individual Solutions'
    },
    {
      id: 'businesses',
      title: 'For Businesses',
      description: 'We partner with companies of all sizes to develop comprehensive brand identities, marketing materials, and digital experiences that drive business growth.',
      image: 'https://public.readdy.ai/ai/img_res/02edea738684d189aca55f5b0ed1d6fb.jpg',
      alt: 'Business team collaborating on design projects',
      features: [
        { icon: Building, text: 'Corporate identity systems' },
        { icon: Megaphone, text: 'Marketing campaign materials' },
        { icon: Globe, text: 'Website & app design' }
      ],
      buttonText: 'See Business Solutions'
    }
  ], []);

  // Optimized blur data URL (smaller size)
  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+";

  return (
    <section id="clients" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={animationVariants.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our design solutions are tailored for both individuals and
            businesses, each with unique needs and goals.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          variants={animationVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cardData.map((card) => (
            <motion.article 
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              variants={animationVariants.item}
            >
              <div className="h-48 md:h-64 relative overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <ul className="text-gray-600 mb-6 space-y-3" role="list">
                  {card.features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <li key={index} className="flex items-center">
                        <IconComponent 
                          className="text-indigo-600 mr-3 flex-shrink-0" 
                          size={20} 
                          aria-hidden="true" 
                        />
                        <span>{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
                
                <motion.button
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label={`Learn more about ${card.title.toLowerCase()}`}
                >
                  {card.buttonText}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;