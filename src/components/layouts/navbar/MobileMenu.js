// components/navbar/MobileMenu.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "./constants";

export default function MobileMenu({ user, onClose, onNavClick }) {
  const pathname = usePathname();
  const [loadingLink, setLoadingLink] = useState(null);
  
  const handleNavigation = (href, event) => {
    if (onNavClick) {
      event.preventDefault();
      setLoadingLink(href);
      onNavClick(href);
      // Close menu after navigation starts
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white h-screen w-3/4 max-w-sm p-6 shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* User info if logged in */}
        {user && (
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.profilePhoto} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 font-medium">{user.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Links */}
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <div key={link.href || link.label}>
              {link.dropdownItems ? (
                <>
                  <div className="py-2 mb-1 font-medium text-gray-800 flex items-center">
                    {link.icon && <span className="mr-3">{link.icon}</span>}
                    <span>{link.label}</span>
                  </div>
                  <div className="pl-5 mb-2 space-y-1">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block p-2 rounded-md ${
                          pathname === item.href
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={(e) => handleNavigation(item.href, e)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item.label}</span>
                          {loadingLink === item.href ? (
                            <span className="h-4 w-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
                          ) : null}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={(e) => handleNavigation(link.href, e)}
                >
                  <div className="flex items-center">
                    {link.icon && <span className="mr-3">{link.icon}</span>}
                    <span>{link.label}</span>
                  </div>
                  {loadingLink === link.href ? (
                    <span className="h-4 w-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
                  ) : null}
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        {/* Footer actions */}
        {user ? (
          <div className="mt-6 pt-4 border-t">
            <button 
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
              onClick={() => {
                // Handle logout
                onClose();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t space-y-2">
            <Link
              href="/login"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-center transition-colors"
              onClick={(e) => handleNavigation('/login', e)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-center transition-colors"
              onClick={(e) => handleNavigation('/register', e)}
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}