"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation links with icons
  const navLinks = [
    { href: "/home", label: "Home", icon: "🏠" },
    { href: "/about", label: "About", icon: "ℹ️" },
    { href: "/products", label: "Products", icon: "🛍️" },
    { href: "/contact", label: "Contact", icon: "✉️" },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md py-2" 
          : "bg-white py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-3 text-lg font-bold text-gray-900">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.2 }} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative overflow-hidden rounded-lg"
            >
              <Image 
                src="/favicon.ico" 
                alt="Logo" 
                width={38} 
                height={38} 
                className="rounded-lg shadow-sm"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-blue-500/20" 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <motion.div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                TIFDesign
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xs font-medium text-gray-500"
              >
                Creative Solutions
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <motion.div 
              key={link.href} 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className={`relative group flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span className="hidden lg:inline-block opacity-70">{link.icon}</span>
                {link.label}
                
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                    pathname === link.href ? "w-full" : ""
                  }`}
                  layoutId="activeDesktopIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </Link>
            </motion.div>
          ))}

          {/* Authentication UI */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4">
                <Link href="./auth/login">Login</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 shadow-sm shadow-blue-200">
                <Link href="./auth/signup">
                  <span>Sign Up</span>
                  <motion.div 
                    className="inline-block ml-1"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    →
                  </motion.div>
                </Link>
              </Button>
            </div>
          ) : (
            /* User Menu */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.5, duration: 0.5 }} 
              className="ml-2"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer group">
                    <Avatar className="h-9 w-9 border-2 border-gray-100 transition-all group-hover:border-blue-200 group-hover:shadow-sm">
                      <AvatarImage src="/avatar-placeholder.png" alt="User" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900">User Name</p>
                      <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-blue-600 group-data-[state=open]:rotate-180" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 animate-in fade-in-50 slide-in-from-top-5">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">User Name</p>
                      <p className="text-xs font-normal text-gray-500">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <UserCircle className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-700">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Authentication buttons for mobile */}
          {!isLoggedIn ? (
            <>
              <Button asChild variant="ghost" className="text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-1">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="text-xs bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            /* User menu for mobile */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer border-2 border-gray-100 transition-all hover:border-blue-200">
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <motion.button 
            onClick={toggleMenu} 
            className="text-gray-700 hover:text-blue-600 p-1 rounded-md focus:outline-none" 
            aria-label="Toggle menu" 
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="container mx-auto px-4 py-4 border-t border-gray-100 bg-white md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link 
                    href={link.href} 
                    className={`flex items-center gap-3 py-2 text-sm font-medium ${
                      pathname === link.href ? "text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                    {pathname === link.href && (
                      <motion.div 
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"
                        layoutId="activeMobileIndicator"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}