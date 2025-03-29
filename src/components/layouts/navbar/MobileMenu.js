// components/navbar/MobileMenu.js
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "./constants";

export default function MobileMenu({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 py-2 border-b"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}