// components/navbar/UserMenu.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ChevronDown, LogOut, Settings, AlertTriangle, UserX, Shield, Bell, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import logOut from "@/utils/logOut";

export default function UserMenu({ user }) {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleLogin = () => router.push("/auth/login");
  const handleSignUp = () => router.push("/auth/signup");
  const handleDashboard = () => router.push("/admin/dashboard");
  
  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };
  
  // Modified handleDeleteAccount function for UserMenu.js
    const handleDeleteAccount = async () => {
    try {
      // Get the user ID from your user object
      const userId = user.id;
      console.log("User ID:", userId);
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
        console.log("Account deleted");
        setShowDeleteConfirm(false);
        setIsSettingsOpen(false);
        await logOut();
        router.push("/");
      } else {
        const error = await response.json();
        console.error("Failed to delete account:", error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  
  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          onClick={handleLogin}
          className="rounded-full px-4 border-gray-200 hover:border-blue-300"
        >
          Login
        </Button>
        <Button 
          onClick={handleSignUp}
          className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Sign Up
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10 border-2 border-blue-100">
          <AvatarImage 
            src={user.profilePhoto || "/avatar-placeholder.png"} 
            alt={user.name || "User Avatar"} 
            className="w-full h-full object-cover"
          />
          <AvatarFallback>
            {user.name ? user.name.substring(0, 2).toUpperCase() : 'UN'}
          </AvatarFallback>
        </Avatar>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="rounded-full flex items-center space-x-2"
            >
              <span>{user.name || 'User'}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="text-red-600 focus:bg-red-50 focus:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user.role === "designer" && (
          <Button 
            onClick={handleDashboard}
            className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            Dashboard
          </Button>
        )}
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogDescription>
              Manage your account preferences and settings
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="general" className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-4">    
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email notifications</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <Switch id="notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="danger" className="space-y-4">
              <div className="space-y-4 border p-4 rounded-md border-red-200 bg-red-50">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-600">Danger Zone</h4>
                    <p className="text-sm text-gray-600">These actions are irreversible</p>
                  </div>
                </div>
                
                {!showDeleteConfirm ? (
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <UserX className="h-4 w-4" />
                    <span>Delete Account</span>
                  </Button>
                ) : (
                  <div className="space-y-3 border p-3 rounded-md border-red-300 bg-red-100">
                    <p className="text-sm font-medium text-red-800">
                      Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        className="flex-1"
                      >
                        Yes, Delete My Account
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}