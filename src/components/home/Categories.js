import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  { id: "web", name: "Web-Design", icon: "🌐" },
  { id: "logo", name: "Logo Design", icon: "✒️" },
  { id: "design", name: "UI/UX Design", icon: "🎨" },
  { id: "general", name: "General", icon: "📋" },
  { id: "mobile", name: "Mobile Apps", icon: "📱" },
  { id: "branding", name: "Branding", icon: "🏷️" },
  { id: "marketing", name: "Marketing", icon: "📈" },
  { id: "illustration", name: "Illustrations", icon: "🖼️" }
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Project Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={cn(
                "flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 shadow-md",
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white hover:bg-blue-100"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardContent className="flex flex-col items-center">
                <span className="text-4xl mb-2">{category.icon}</span>
                <span className="font-medium text-lg">{category.name}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
