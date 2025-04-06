import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Memastikan Button diimpor
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Memastikan Tabs diimpor

// Animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animasi untuk item individual
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const PortfolioItem = ({
  image,
  title,
  category,
}) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      variants={itemVariants}
      whileHover="hover"
    >
      <motion.div 
        className="h-64 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={image}
          alt={title}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-transform duration-700"
          priority
        />
      </motion.div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl font-bold text-white mb-1"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-indigo-300"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {category}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="rounded-button mt-4 text-white border-white hover:bg-white/20 cursor-pointer whitespace-nowrap"
          >
            View Project
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <motion.section 
      id="portfolio" 
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore our recent projects and see how we&apos;ve helped clients
            achieve their design goals.
          </motion.p>
        </motion.div>
        
        <Tabs defaultValue="all" className="w-full mb-12">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TabsList className="mb-8">
                <TabsTrigger
                  value="all"
                  className="rounded-button cursor-pointer whitespace-nowrap"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="graphic"
                  className="rounded-button cursor-pointer whitespace-nowrap"
                >
                  Graphic Design
                </TabsTrigger>
                <TabsTrigger
                  value="product"
                  className="rounded-button cursor-pointer whitespace-nowrap"
                >
                  Product Design
                </TabsTrigger>
                <TabsTrigger
                  value="uiux"
                  className="rounded-button cursor-pointer whitespace-nowrap"
                >
                  UI/UX Design
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>
          
          <TabsContent value="all">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Portfolio Items */}
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/d0e6fb821e3c5341815d280f208e3b2d.jpg"
                title="Tech Company Rebrand"
                category="Graphic Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/b1c059443594d367695d8f9fadb3c71d.jpg"
                title="Luxury Cosmetics Packaging"
                category="Product Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/fa0386cca2174f2f89a779e2d00055d9.jpg"
                title="E-commerce Website"
                category="UI/UX Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/37e9a40e3b03468513708d821537b07a.jpg"
                title="Music Festival Campaign"
                category="Graphic Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/901900ff1caf2ddad022400710f44bdf.jpg"
                title="Sports Team Merchandise"
                category="Product Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/2b4c7d3e921fa81fb7e05d176a8902b4.jpg"
                title="Banking App Interface"
                category="UI/UX Design"
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="graphic">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/e98ffcbf50c2eb7b487ddd495edda17c.jpg"
                title="Tech Company Rebrand"
                category="Graphic Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/c637a2d9bdb8940f4bff11daed5ec687.jpg"
                title="Music Festival Campaign"
                category="Graphic Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/69c734059e672e73dd4f6f3f1acf0a88.jpg"
                title="Annual Report Design"
                category="Graphic Design"
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="product">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/745a1e8af5c30843ddb8070f02215b4c.jpg"
                title="Luxury Cosmetics Packaging"
                category="Product Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/fd4ab9a62256ecbe9a229d5bacb2ddaa.jpg"
                title="Sports Team Merchandise"
                category="Product Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/569703b9b1df42783e0c4f550b1a627b.jpg"
                title="Organic Food Packaging"
                category="Product Design"
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="uiux">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/8521e81a78332b6612c87e8181b83498.jpg"
                title="E-commerce Website"
                category="UI/UX Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/a2cf5dde10892d193a979f204de8dcaa.jpg"
                title="Banking App Interface"
                category="UI/UX Design"
              />
              <PortfolioItem
                image="https://public.readdy.ai/ai/img_res/e3f5f3d33e8985f953578918d2816166.jpg"
                title="E-Learning Platform"
                category="UI/UX Design"
              />
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button className="rounded-button bg-indigo-600 hover:bg-indigo-700 cursor-pointer whitespace-nowrap">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;