'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  User, 
  MessageCircle 
} from 'lucide-react';
import Navbar from '@/components/layouts/navbar/com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
        <Navbar/>
    
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2"
      >

        {/* Contact Information Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <MapPin className="w-6 h-6" />
              <span>Jl. Design Creative No. 17, Jakarta, Indonesia</span>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <Phone className="w-6 h-6" />
              <span>+62 812-3456-7890</span>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <Mail className="w-6 h-6" />
              <span>contact@tifdesign.com</span>
            </motion.div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Our Social Media</h3>
            <div className="flex space-x-4">
              {['Instagram', 'Behance', 'LinkedIn'].map((platform, index) => (
                <motion.a
                  key={platform}
                  href="#"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div 
          variants={itemVariants}
          className="p-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <label className="block mb-2 text-gray-700">Full Name</label>
              <div className="flex items-center border rounded-lg">
                <User className="ml-3 text-gray-400" />
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <label className="block mb-2 text-gray-700">Email Address</label>
              <div className="flex items-center border rounded-lg">
                <Mail className="ml-3 text-gray-400" />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <label className="block mb-2 text-gray-700">Phone Number</label>
              <div className="flex items-center border rounded-lg">
                <Phone className="ml-3 text-gray-400" />
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 ..."
                  className="w-full p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <label className="block mb-2 text-gray-700">Your Message</label>
              <div className="flex items-start border rounded-lg">
                <MessageCircle className="ml-3 mt-3 text-gray-400" />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={4}
                  className="w-full p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white p-3 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;