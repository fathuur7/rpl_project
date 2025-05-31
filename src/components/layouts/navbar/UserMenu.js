"use client";

import { useState, useCallback, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  User, ChevronDown, LogOut, Settings, AlertTriangle, 
  UserX, Bell, Loader2, Shield, Crown 
} from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner"
import logOut from "@/utils/logOut";

export default function UserMenu({ user, onNavigate }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = Toaster();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Optimized navigation handlers
  const handleLogin = useCallback(() => {
    if (onNavigate) {
      onNavigate("/auth/login");
    } else {
      startTransition(() => router.push("/auth/login"));
    }
  }, [onNavigate, router]);

  const handleSignUp = useCallback(() => {
    if (onNavigate) {
      onNavigate("/auth/signup");
    } else {
      startTransition(() => router.push("/auth/signup"));
    }
  }, [onNavigate, router]);

  const handleDashboard = useCallback(() => {
    if (onNavigate) {
      onNavigate("/admin/dashboard");
    } else {
      startTransition(() => router.push("/admin/dashboard"));
    }
  }, [onNavigate, router]);

  const handleProfile = useCallback(() => {
    if (onNavigate) {
      onNavigate("/profile");
    } else {
      startTransition(() => router.push("/profile"));
    }
  }, [onNavigate, router]);

  // Enhanced logout with loading state
  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      if (onNavigate) {
        onNavigate("/auth/login");
      } else {
        startTransition(() => router.push("/auth/login"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  }, [onNavigate, router, toast]);

  // Enhanced delete account with better error handling
  const handleDeleteAccount = useCallback(async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User ID not found. Please try logging out and back in.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/v1/api/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted.",
        });
        
        setShowDeleteConfirm(false);
        setIsSettingsOpen(false);
        await logOut();
        
        if (onNavigate) {
          onNavigate("/auth/login");
        } else {
          startTransition(() => router.push("/auth/login"));
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  }, [user?.id, onNavigate, router, toast]);

  // Toggle notifications setting
  const handleNotificationToggle = useCallback((checked) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: `You will ${checked ? 'now' : 'no longer'} receive email notifications.`,
    });
  }, [toast]);

  // Memoized user initials for performance
  const userInitials = useMemo(() => {
    if (!user?.name) return 'UN';
    return user.name.substring(0, 2).toUpperCase();
  }, [user?.name]);

  // Memoized avatar image with fallback
  const avatarSrc = useMemo(() => {
    return user?.profilePhoto || "/avatar-placeholder.png";
  }, [user?.profilePhoto]);

  // Check if current path is active
  const isActivePath = useCallback((path) => {
    return pathname === path;
  }, [pathname]);

  // Loading spinner component
  const LoadingSpinner = ({ size = 16 }) => (
    <Loader2 className={`w-${size/4} h-${size/4} animate-spin`} />
  );

  // Guest user UI
  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          onClick={handleLogin}
          disabled={isPending}
          className="rounded-full px-4 border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105"
        >
          {isPending ? <LoadingSpinner /> : "Login"}
        </Button>
        <Button 
          onClick={handleSignUp}
          disabled={isPending}
          className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {isPending ? <LoadingSpinner /> : "Sign Up"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Enhanced Avatar */}
        <Avatar className="w-10 h-10 border-2 border-blue-100 transition-all duration-200 hover:border-blue-300 hover:scale-110">
          <AvatarImage 
            src={avatarSrc} 
            alt={`${user.name || 'User'} Avatar`} 
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        {/* Enhanced Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="rounded-full flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
              disabled={isPending || isLoggingOut}
            >
              <span className="max-w-24 truncate">{user.name || 'User'}</span>
              <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-200 ${isPending ? 'animate-spin' : ''}`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 animate-in slide-in-from-top-2 duration-200">
            <DropdownMenuLabel className="flex items-center space-x-2">
              <span>My Account</span>
              {user.role === "designer" && (
                <Crown className="h-4 w-4 text-yellow-500" />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className={`transition-colors duration-200 ${isActivePath('/profile') ? 'bg-blue-50 text-blue-700' : ''}`}
              disabled={isPending}
            >
              <button onClick={handleProfile} className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                {isPending && <LoadingSpinner size={12} />}
              </button>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setIsSettingsOpen(true)}
              className="transition-colors duration-200"
              disabled={isPending}
            >
              <div className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors duration-200"
              disabled={isLoggingOut || isPending}
            >
              <div className="flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
                {isLoggingOut && <LoadingSpinner size={12} />}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Enhanced Dashboard Button for Designers */}
        {user.role === "designer" && (
          <Button 
            onClick={handleDashboard}
            disabled={isPending}
            className={`
              rounded-full px-6 transition-all duration-200 
              bg-gradient-to-r from-blue-500 to-cyan-500 
              hover:from-blue-600 hover:to-cyan-600 
              hover:scale-105 active:scale-95
              ${isActivePath('/admin/dashboard') ? 'ring-2 ring-blue-300' : ''}
              ${isPending ? 'opacity-75 cursor-wait' : ''}
            `}
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Dashboard</span>
              {isPending && <LoadingSpinner size={12} />}
            </div>
          </Button>
        )}
      </div>

      {/* Enhanced Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px] animate-in zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Account Settings</span>
            </DialogTitle>
            <DialogDescription>
              Manage your account preferences and settings
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="general" className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="general" className="transition-all duration-200">
                General
              </TabsTrigger>
              <TabsTrigger value="danger" className="transition-all duration-200">
                Danger Zone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-4">    
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive important updates via email
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <Switch 
                      id="notifications" 
                      checked={notifications}
                      onCheckedChange={handleNotificationToggle}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="danger" className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-4 border p-4 rounded-lg border-red-200 bg-red-50">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-600">Danger Zone</h4>
                    <p className="text-sm text-gray-600">
                      These actions are irreversible and will permanently delete your account
                    </p>
                  </div>
                </div>
                
                {!showDeleteConfirm ? (
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                  >
                    <UserX className="h-4 w-4" />
                    <span>Delete Account</span>
                  </Button>
                ) : (
                  <div className="space-y-3 border p-3 rounded-lg border-red-300 bg-red-100 animate-in zoom-in-95 duration-200">
                    <p className="text-sm font-medium text-red-800">
                      ⚠️ Are you absolutely sure you want to delete your account? 
                      This action cannot be undone and will permanently remove all your data.
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1 transition-all duration-200"
                      >
                        {isDeleting ? (
                          <div className="flex items-center space-x-2">
                            <LoadingSpinner />
                            <span>Deleting...</span>
                          </div>
                        ) : (
                          "Yes, Delete My Account"
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeleting}
                        className="flex-1 transition-all duration-200"
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
            <Button 
              variant="outline" 
              onClick={() => setIsSettingsOpen(false)}
              disabled={isDeleting}
              className="transition-all duration-200 hover:scale-105"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}