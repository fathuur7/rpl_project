"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  UserCircle, 
  AlignJustify,
  Search,
  Bell,
  Home,
  Edit2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the custom user hook
import useCurrentUser from "@/hooks/useCurrentUser";
import logOut from "@/utils/logOut";

export default function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();
  
  // Use the custom user hook
  const { user, userLoading } = useCurrentUser();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    await logOut();
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  // Enhanced navigation links with icons and dropdowns
  const navLinks = [
    { 
      href: "/home", 
      label: "Home", 
      icon: <Home className="h-5 w-5" />,
      description: "Explore our latest offerings"
    },
    { 
      href: "/hire", 
      label: "Hire", 
      icon: <UserCircle className="h-5 w-5" />,
      description: "Find top talent",
      dropdownItems: [
        { 
          href: "/hire/designers", 
          label: "Designers", 
          description: "Hire creative professionals"
        }
      ]
    },
    { 
      href: "/explore", 
      label: "Explore", 
      icon: <AlignJustify className="h-5 w-5" />,
      description: "Discover new possibilities",
      dropdownItems: [
        { 
          href: "/explore/portfolio", 
          label: "Portfolio", 
          description: "Inspiring design works"
        },
        { 
          href: "/explore/services", 
          label: "Services", 
          description: "Our comprehensive solutions"
        }
      ]
    },
    { 
      href: "/blog", 
      label: "Blog", 
      icon: <Edit2 className="h-5 w-5" />,
      description: "Insights and inspiration"
    }
  ];

  // Loading state
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
        {/* Logo and Brand */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <motion.div 
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.dropdownItems ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-2">
                      {link.dropdownItems.map((item) => (
                        <DropdownMenuItem 
                          key={item.href} 
                          className="flex flex-col items-start p-2 hover:bg-gray-50 rounded-md"
                        >
                          <Link href={item.href} className="w-full">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">{item.label}</span>
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link 
                    href={link.href} 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                      pathname === link.href 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Search and Notification Icons */}
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-48 pl-10 pr-3 py-2 rounded-full border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </motion.div>
          </div>
          
          {/* Authentication Buttons */}
          {!user ? (
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleLogin}
                className="rounded-full px-4 border-gray-200 hover:border-blue-300"
              >
                Login
              </Button>
              <Button 
                onClick={handleSignUp}
                className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            // User logged in section
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-blue-100">
                <AvatarImage 
                  src={user.profilePhoto || "/avatar-placeholder.png"} 
                  alt={user.name || "User Avatar"} 
                />
                <AvatarFallback>
                  {user.name ? user.name.substring(0, 2).toUpperCase() : 'UN'}
                </AvatarFallback>
              </Avatar>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="rounded-full flex items-center space-x-2"
                  >
                    <span>{user.name || 'User'}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-600 focus:bg-red-50 focus:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Navigation (simplified) */}
      <AnimatePresence>
        {isMenuOpen && (
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
    </motion.nav>
  );
}