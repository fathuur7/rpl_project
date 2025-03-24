"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Navigation links
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="w-full border-b border-gray-100 bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo with animation */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} className="rounded" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              TIFDesign
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation with animations */}
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
                className={`relative text-sm font-medium ${
                  pathname === link.href 
                    ? "text-gray-900" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gray-900"
                    layoutId="activeDesktopIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="rounded-md bg-[#1a1f36] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a2f46]">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button with animation */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Navigation with animation */}
      {isMenuOpen && (
        <motion.div 
          className="container mx-auto px-4 py-4 md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium ${
                    pathname === link.href 
                      ? "text-gray-900 font-semibold" 
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-gray-900"
                      layoutId="activeMobileIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button
                className="w-full rounded-md bg-[#1a1f36] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a2f46]"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}