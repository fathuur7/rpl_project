import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const TestimonialCard = ({ name, role, quote, avatar, achievements }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.05, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
    }}
    className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-50 transition-all duration-300 hover:border-blue-100 group"
  >
    <div className="flex items-start mb-5">
      <Quote className="text-blue-500 mr-4 w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity" />
      <p className="text-gray-700 italic text-lg flex-grow leading-relaxed">{quote}</p>
    </div>
    <div className="flex items-center border-t border-gray-100 pt-4">
      <Image 
        src={avatar} 
        alt={name} 
        className="w-14 h-14 rounded-full mr-5 object-cover border-2 border-blue-100 transition-transform group-hover:rotate-6"
        width={56}
        height={56}
      />
      <div className="flex-grow">
        <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
        <p className="text-sm text-gray-500 mb-2">{role}</p>
        <div className="flex items-center">
          <div className="flex text-yellow-400 mr-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          {achievements && (
            <div className="flex items-center text-green-500 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>{achievements}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations",
      quote: "Their design transformed our brand identity completely. Absolutely incredible work that exceeded all our expectations!",
      avatar: "/avatars/sarah.jpg",
      achievements: "40% Growth"
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      quote: "Exceptional creativity and professionalism. They truly understand design's power and how it can drive business success.",
      avatar: "/avatars/michael.jpg",
      achievements: "Award Winner"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      quote: "Our website's new design has increased user engagement dramatically. A game-changing partnership that delivers results!",
      avatar: "/avatars/emily.jpg",
      achievements: "Top Performer"
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            className="inline-block px-4 py-2 mb-6 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide uppercase"
          >
            Client Success Stories
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight leading-tight">
            Testimonials That <span className="text-blue-600">Speak Volumes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our innovative design solutions have empowered businesses to break through barriers and achieve remarkable success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}