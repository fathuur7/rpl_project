// pages/profile.js or app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Shield, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/me", {
          credentials: "include",
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.push("/auth/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }
        
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [router]);
  
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };
  
  if (loading) {
    return <ProfileSkeleton />;
  }
  
  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-10 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">Unable to load profile information.</p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container flex justify-center py-18 px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="relative pb-0 border-b">
          {isEditing ? (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500 flex items-center gap-1">
                  {user.role === "admin" && <Shield className="h-4 w-4" />}
                  {user.role === "designer" && <BookOpen className="h-4 w-4" />}
                  {user.role === "user" && <User className="h-4 w-4" />}
                  {user.role}
                </p>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-6">
          {isEditing ? (
            <ProfileEditForm 
              user={user}
              onUpdate={handleProfileUpdate}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 w-full justify-center">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="flex flex-col items-center">
                  {/* Profile Photo */}
                  <Avatar className="w-32 h-32 mb-4 border-4 border-blue-100 shadow-md">
                    <AvatarImage 
                      src={user.profilePhoto || "/avatar-placeholder.png"} 
                      alt={user.name || "User Avatar"} 
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'UN'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* User Info */}
                  <div className="text-center space-y-1 w-full mb-6">
                    <h3 className="font-medium text-xl">{user.name}</h3>
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-gray-800 text-white rounded-full text-sm">
                      {user.role}
                    </div>
                    <p className="text-sm text-gray-800 mt-2">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* User Details */}
                  <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 border border-gray-100">
                    <h3 className="font-semibold text-lg border-b pb-2 mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      {user.email && (
                        <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded border border-gray-800">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Mail className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">Activity history coming soon</h3>
                  <p className="text-gray-500 mt-2">We&apos;re working on this feature.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container flex justify-center min-h-screen py-10 px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="pb-0 border-b">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4 mt-2 mb-4" />
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-24 mt-4" />
            <Skeleton className="h-4 w-20 mt-2 mb-6" />
            
            <div className="w-full max-w-md space-y-4">
              <Skeleton className="h-6 w-full" />
              
              <div className="space-y-3">
                <Skeleton className="h-14 w-full rounded" />
                <Skeleton className="h-14 w-full rounded" />
                <Skeleton className="h-14 w-full rounded" />
              </div>
              
              <Skeleton className="h-6 w-full mt-4" />
              <Skeleton className="h-32 w-full rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}