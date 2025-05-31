"use client";

import { useState, useEffect, useCallback, useTransition, useMemo } from "react";
import { Menu, Bell, Loader2 } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter, usePathname } from "next/navigation";

// Import components
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function EnhancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loadingPath, setLoadingPath] = useState(null);
  const [isPending, startTransition] = useTransition();
  
  const { user, userLoading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 20;
    if (shouldBeScrolled !== scrolled) {
      setScrolled(shouldBeScrolled);
    }
  }, [scrolled]);

  // Optimized scroll listener with throttling
  useEffect(() => {
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, [handleScroll]);

  // Reset loading state when pathname changes
  useEffect(() => {
    setLoadingPath(null);
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Optimized CSS injection with cleanup
  useEffect(() => {
    const styleId = 'navbar-loading-styles';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes slide-loading {
        0% { width: 0; margin-left: 0; }
        50% { width: 70%; margin-left: 20%; }
        100% { width: 100%; margin-left: 0; }
      }
      
      .animate-slide-loading {
        animation: slide-loading 1s ease-in-out infinite;
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Optimized navigation handler
  const handleNavigation = useCallback((path) => {
    // Don't navigate if already on the same path
    if (path === pathname) return;
    
    setLoadingPath(path);
    
    startTransition(() => {
      router.push(path);
    });
    
    // Fallback cleanup
    const cleanup = setTimeout(() => {
      setLoadingPath(null);
    }, 3000);
    
    return () => clearTimeout(cleanup);
  }, [pathname, router]);

  // Check if a specific path is loading
  const isPathLoading = useCallback((path) => {
    return loadingPath === path || (isPending && loadingPath === path);
  }, [loadingPath, isPending]);

  // Memoized navbar classes for performance
  const navbarClasses = useMemo(() => {
    return `fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white shadow-md py-2 backdrop-blur-sm" 
        : "bg-white/80 backdrop-blur-sm py-4"
    }`;
  }, [scrolled]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="fixed top-0 w-full bg-white shadow-sm z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-16 rounded-md bg-gray-200 animate-pulse" />
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );

  // Show loading skeleton while user data is loading
  if (userLoading) {
    return <LoadingSkeleton />;
  }

  const isNotificationLoading = isPathLoading('/notif');
  const isGeneralLoading = loadingPath && !isNotificationLoading;

  return (
    <>
      {/* Enhanced loading bar with better animation */}
      {(isGeneralLoading || isPending) && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-slide-loading"></div>
        </div>
      )}
      
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo - Enhanced with loading state */}
            <div className="flex items-center">
              <div className={`transition-all duration-200 ${isGeneralLoading ? 'opacity-75 scale-95' : 'opacity-100 scale-100'}`}>
                <Logo />
              </div>
            </div>
            
            {/* Center section with nav links - hidden on mobile */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              <NavLinks onNavClick={handleNavigation} />
            </div>
        
            {/* Enhanced notification bell */}
            <div className="flex items-center mx-4">
              <button 
                onClick={() => handleNavigation('/notif')} 
                className={`
                  relative p-2 rounded-full transition-all duration-200
                  hover:bg-gray-100 hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isNotificationLoading ? 'animate-pulse-glow cursor-wait' : 'cursor-pointer'}
                  ${pathname === '/notif' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                `}
                aria-label="Notifications"
                aria-haspopup="true"
                disabled={isPending || isNotificationLoading}
              >
                <Bell 
                  size={20} 
                  className={`transition-transform duration-200 ${
                    isNotificationLoading ? 'scale-110' : 'scale-100'
                  }`} 
                />
                
                {/* Enhanced loading indicator */}
                {isNotificationLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  </div>
                )}
                
                {/* Notification badge (optional) */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </button>
            </div>
            
            {/* Enhanced user menu section */}
            <div className="flex items-center">
              <div className="hidden md:block">
                <UserMenu user={user} onNavigate={handleNavigation} />
              </div>
              
              {/* Enhanced mobile menu button */}
              <button 
                onClick={toggleMenu}
                className={`
                  relative p-2 ml-2 md:hidden rounded-full transition-all duration-200
                  hover:bg-gray-100 hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isMenuOpen ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}
                  ${isPending ? 'cursor-wait opacity-75' : 'cursor-pointer'}
                `}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                disabled={isPending}
              >
                <Menu 
                  size={24} 
                  className={`transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-90' : 'rotate-0'
                  }`} 
                />
                
                {/* Loading indicator for mobile menu */}
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced mobile menu with animation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-200">
            <MobileMenu 
              user={user} 
              onClose={toggleMenu} 
              onNavClick={handleNavigation}
              isLoading={isPending}
            />
          </div>
        )}
      </nav>
    </>
  );
}