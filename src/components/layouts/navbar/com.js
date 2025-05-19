"use client";

import { useState, useEffect } from "react";
import { Menu, Bell } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

// Import components
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

// Import for global styles
// import { useEffect } from "react";

export default function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userLoading } = useCurrentUser();
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Add the CSS to the document head for the loading animation
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes slide-loading {
        0% {
          width: 0;
          margin-left: 0;
        }
        50% {
          width: 70%;
          margin-left: 20%;
        }
        100% {
          width: 100%;
          margin-left: 0;
        }
      }
      
      .animate-slide-loading {
        animation: slide-loading 1s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to handle navigation with loading effect
  const handleNavigation = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
    }, 1000); // Simulate loading time
  };

  if (userLoading) {
    return (
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Laravel-style loading bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <div className="h-1 bg-blue-600 animate-slide-loading"></div>
        </div>
      )}
      
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo - visible at all screen sizes */}
            <div className="flex items-center">
              <Logo />
            </div>
            
            {/* Center section with nav links - hidden on mobile */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              <NavLinks onNavClick={handleNavigation} />
            </div>
        
            {/* Notification bell */}
            <div className="flex items-center mx-4">
              <button 
                onClick={() => handleNavigation('/notif')} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors pointer-events-auto relative"
                aria-label="Notifications"
                aria-haspopup="true"
                disabled={isLoading}
              >
                <Bell size={20} />
                {isLoading && <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></span>
                </span>}
              </button>
            </div>
            
            {/* User menu section */}
            <div className="flex items-center">
              <div className="hidden md:block">
                <UserMenu user={user} />
              </div>
              
              {/* Mobile menu button - only visible on smaller screens */}
              <button 
                onClick={toggleMenu}
                className="p-2 ml-2 md:hidden rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation menu"
                disabled={isLoading}
              >
                <Menu size={24} />
                {isLoading && <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></span>
                </span>}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="md:hidden">
            <MobileMenu user={user} onClose={toggleMenu} onNavClick={handleNavigation} />
          </div>
        )}
      </nav>
    </>
  );
}