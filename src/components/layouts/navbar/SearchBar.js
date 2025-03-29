// components/navbar/SearchBar.js
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
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
  );
}