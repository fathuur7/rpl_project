"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send 
} from 'lucide-react'
import ChatBot from '@/components/chatbot';
export default function Footer() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Services", href: "/explore/services" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "FAQ", href: "/faq" }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://facebook.com/designtify",
      color: "#1877F2"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/designtify",
      color: "#1DA1F2"
    },
    { 
      icon: Instagram, 
      href: "https://instagram.com/designtify",
      color: "#E1306C"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/company/designtify",
      color: "#0A66C2"
    }
  ];
  
  return (
    <footer className="bg-gradient-to-br from-[#1a1f36] to-[#2c3347] text-white py-16 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Column */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#292c2d] rounded-full flex items-center justify-center mr-2">
                {/* ✅ Fixed: Use absolute path for Next.js public assets */}
                <Image 
                    src="/image/icon.png" 
                    alt="DesignTify" 
                    width={64} 
                    height={64} 
                    className="w-12 h-12 rounded-2xl" 
                    unoptimized 
                />
                </div>
                <h2 className="text-3xl font-bold">DesignTify</h2>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
                Transforming digital landscapes through innovative design, strategic development, and creative solutions that elevate brands and drive success.
            </p>
            
            <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: social.color, color: "white" }}
                    whileTap={{ scale: 0.9 }}
                >
                    <social.icon size={20} />
                </motion.a>
                ))}
            </div>
            </div>

          {/* Quick Links Columns */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-[#4BB4DE] transition-colors group flex items-center"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info and Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-[#4BB4DE]" />
              <span className="text-gray-300">contact@designtify.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-[#4BB4DE]" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-[#4BB4DE]" />
              <span className="text-gray-300">123 Design Street, Creative City</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-white/10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4BB4DE]"
              />
              <button 
                className="bg-[#4BB4DE] px-4 py-2 rounded-r-md hover:bg-[#3aa0c7] transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DesignTify. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-[#4BB4DE]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#4BB4DE]">Terms of Service</Link>
          </div>
        </div>
      </div>
      <ChatBot />
    </footer>
  )
}