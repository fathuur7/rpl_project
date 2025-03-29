// components/navbar/NavLinks.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "./constants";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <div className="flex items-center space-x-4">
      {navLinks.map((link) => (
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
  );
}