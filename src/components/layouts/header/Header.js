import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import logOut from "@/utils/logOut";
import { Bell, ChevronDown } from "lucide-react";

const Header = ({ title = "Dashboard", user }) => {
  const router = useRouter();

  // Get initials for the avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };


 const handleLogout = async () => {
    await logOut();
    router.push("/auth/login");
  };
   
  

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage 
                    src={user?.profilePhoto || "/api/placeholder/32/32"} 
                    alt={user?.name || "User"} 
                  />
                  <AvatarFallback>{user ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                <span>{user?.name || "terasbas anying"}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="text-red-600" onClick={() => handleLogout()}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;