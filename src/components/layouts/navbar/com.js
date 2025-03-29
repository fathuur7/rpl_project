
// components/navbar/index.js
"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import useCurrentUser from "@/hooks/useCurrentUser";

// Import components
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userLoading } = useCurrentUser();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (userLoading) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-white/90 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-md" 
          : "bg-white/90"
      } border-b border-gray-100`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
          <div className="flex items-center space-x-3">
            <SearchBar />
          </div>
          <UserMenu user={user} />
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            className="text-gray-700 hover:text-blue-600"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
    </motion.nav>
  );
}