// components/navbar/NavLinks.js
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import { navLinks } from "./constants";
import { useState, useEffect, useCallback, useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavLinks({ onNavClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingLink, setLoadingLink] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Reset loading state when pathname changes
  useEffect(() => {
    setLoadingLink(null);
  }, [pathname]);

  // Optimized navigation handler with better UX
  const handleNavigation = useCallback((href, event) => {
    // Don't show loading for current page
    if (href === pathname) {
      return;
    }

    event.preventDefault();
    setLoadingLink(href);

    if (onNavClick) {
      // Custom navigation handler with loading animation
      onNavClick(href);
    } else {
      // Default Next.js navigation with transition
      startTransition(() => {
        router.push(href);
      });
    }

    // Fallback cleanup - reduced timeout for better UX
    const cleanup = setTimeout(() => {
      setLoadingLink(null);
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [pathname, onNavClick, router]);

  // Preload links on hover for better performance
  const handleLinkHover = useCallback((href) => {
    router.prefetch(href);
  }, [router]);

  // Check if link is currently loading
  const isLinkLoading = useCallback((href) => {
    return loadingLink === href || (isPending && loadingLink === href);
  }, [loadingLink, isPending]);

  // Check if link is active
  const isActiveLink = useCallback((href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  }, [pathname]);

  const LoadingSpinner = () => (
    <Loader2 className="h-4 w-4 animate-spin ml-2" />
  );

  return (
    <div className="flex items-center space-x-1">
      {navLinks.map((link) => (
        <div key={link.href || link.label} className="relative">
          {link.dropdownItems ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`
                    flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                    transition-all duration-200 ease-in-out
                    hover:bg-gray-100 dark:hover:bg-gray-800 text-black
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${link.dropdownItems.some(item => isActiveLink(item.href)) 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                  disabled={isPending}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPending ? 'animate-pulse' : ''}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {link.dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavigation(item.href, e)}
                      onMouseEnter={() => handleLinkHover(item.href)}
                      className={`
                        flex items-center justify-between w-full px-2 py-2
                        transition-all duration-200 ease-in-out
                        hover:bg-gray-50 dark:hover:bg-gray-800
                        ${isActiveLink(item.href) 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-700 dark:text-gray-300'
                        }
                        ${isLinkLoading(item.href) ? 'opacity-75 cursor-wait' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center ml-2">
                        {isLinkLoading(item.href) ? (
                          <LoadingSpinner />
                        ) : (
                          <ArrowRight className="h-4 w-4 opacity-50" />
                        )}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={link.href}
              onClick={(e) => handleNavigation(link.href, e)}
              onMouseEnter={() => handleLinkHover(link.href)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                transition-all duration-200 ease-in-out
                hover:bg-gray-100 dark:hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${isActiveLink(link.href)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
                }
                ${isLinkLoading(link.href) ? 'opacity-75 cursor-wait' : 'cursor-pointer'}
              `}
            >
              <span className={`transition-transform duration-200 ${isLinkLoading(link.href) ? 'scale-95' : 'scale-100'}`}>
                {link.icon}
              </span>
              <span>{link.label}</span>
              
              {/* Optimized loading spinner */}
              {isLinkLoading(link.href) && <LoadingSpinner />}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}