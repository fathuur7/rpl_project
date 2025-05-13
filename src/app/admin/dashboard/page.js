"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layouts/sidebar/Sidebar";
import Header from "@/components/layouts/header/Header";
import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/dashboard/UserTable";
import CategoriesPage from "@/components/category/crud";
import { format } from "date-fns";
import { getAllUsers } from "@/hooks/getAlluser";
import useCurrentUser from "@/hooks/useCurrentUser";

const DashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const { user, userLoading } = useCurrentUser();

  console.log("Current User:", user);
    
  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setUserData(response);
      console.log("User data fetched:", response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: userData.length.toString(),  // Dynamic total based on actual user count
      isPositive: true,
      description: "Compared to previous month"
    },
    {
      title: "Active Users",
      value: userData.filter(u => u.isVerified === "Active").length.toString(),
      isPositive: true,
      description: "Active users"
    },
    {
      title: "New Users",
      value: "" + userData.filter(u => u.createdAt && new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length.toString(),
      description: "Last 30 days"
    }
  ];

  // Show loading state if user data is still loading
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header title="User Management" user={user} />
          
          <main className="p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  isPositive={stat.isPositive}
                  description={stat.description}
                />
              ))}
            </div>

            {/* User Table */}
            <UserTable userData={userData} />
            

          

          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;