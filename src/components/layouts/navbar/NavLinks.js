// components/navbar/NavLinks.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navLinks } from "./constants";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavLinks({ onNavClick }) {
  const pathname = usePathname();
  const [loadingLink, setLoadingLink] = useState(null);
  
  const handleNavigation = (href, event) => {
    if (onNavClick) {
      // If onNavClick prop exists (for loading animations)
      event.preventDefault();
      setLoadingLink(href);
      onNavClick(href);
      // Reset loading state after navigation (backup in case parent doesn't reset)
      setTimeout(() => setLoadingLink(null), 1500);
    }
  };
  
  return (
    <div className="flex items-center space-x-4">
      {navLinks.map((link) => (
        <div 
          key={link.href}
          className="relative"
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
                    className="flex flex-col items-start p-2 hover:bg-gray-50 rounded-md relative"
                    disabled={loadingLink === item.href}
                  >
                    <Link 
                      href={item.href} 
                      className="w-full"
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{item.label}</span>
                        {loadingLink === item.href ? (
                          <span className="h-4 w-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        )}
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
              onClick={(e) => handleNavigation(link.href, e)}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
              
              {/* Loading spinner for regular links */}
              {loadingLink === link.href && (
                <span className="ml-2 h-4 w-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
              )}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}