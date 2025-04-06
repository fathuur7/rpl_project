import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const TestimonialCard = ({ quote, author, company, avatar, achievements }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start mb-4">
        <Quote className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={24} />
        <p className="text-gray-700 italic">{quote}</p>
      </div>
      
      <div className="flex items-center mt-4">
        {avatar && (
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image src={avatar} alt={`${author} avatar`}
              width={48} height={48} layout="responsive" objectFit="cover"
              className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        
        <div>
          <h4 className="font-bold text-gray-900">{author}</h4>
          <p className="text-gray-600">{company}</p>
          
          {achievements && achievements.length > 0 && (
            <div className="flex items-center mt-2">
              <CheckCircle size={14} className="text-green-500 mr-1" />
              <span className="text-sm text-gray-500">
                {achievements.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Working with TIF Design transformed our brand completely. The team understood our vision perfectly.",
      author: "Sarah Johnson",
      company: "Acme Corp",
      avatar: "/images/testimonials/sarah.jpg",
      achievements: ["10x ROI", "Award-winning design"]
    },
    {
      quote: "The attention to detail and creative solutions provided by TIF Design exceeded our expectations.",
      author: "Michael Chen",
      company: "TechStart Inc.",
      avatar: "/images/testimonials/michael.jpg",
      achievements: ["Increased conversions by 45%"]
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with TIF Design.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;