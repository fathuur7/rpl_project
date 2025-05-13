"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Layers, PieChart, Users, Activity, Calendar, Upload, ListOrdered } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: <PieChart className="mr-2 h-4 w-4" />, label: "Dashboard", href: "/admin/dashboard" },
    { icon: <Users className="mr-2 h-4 w-4" />, label: "Status", href: "/admin/status" },
    { icon: <Activity className="mr-2 h-4 w-4" />, label: "Category", href: "/admin/category" },
    { icon: <ListOrdered className="mr-2 h-4 w-4" />, label: "Orders", href: "/admin/orders" }
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <div className="flex items-center mb-8 mt-2">
        <Layers className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold ml-2">AdminPanel</h1>
      </div>

      <nav className="space-y-1">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link key={index} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive ? "text-white font-semibold" : "text-gray-400"
                } hover:bg-slate-800 hover:text-white`}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
