// components/navbar/Logo.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div 
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="flex items-center space-x-3">
        <motion.div 
          whileHover={{ 
            rotate: 10, 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
          className="rounded-full overflow-hidden shadow-md"
        >
          <Image 
            src="/favicon.ico" 
            alt="TIFDesign Logo"
            width={45} 
            height={45} 
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TIFDesign
          </h1>
          <p className="text-xs text-gray-500 tracking-wider">
            Creative Digital Solutions
          </p>
        </div>
      </Link>
    </motion.div>
  );
}