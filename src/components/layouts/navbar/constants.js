// components/navbar/constants.js
import { Home, UserCircle, AlignJustify, Edit2 } from "lucide-react";

export const navLinks = [
  { 
    href: "/home", 
    label: "Home", 
    icon: <Home className="h-5 w-5" />,
    description: "Explore our latest offerings"
  },
  { 
    href: "/hire/designers", 
    label: "Hire", 
    icon: <UserCircle className="h-5 w-5" />,
    description: "Find top talent",
    dropdownItems: [
      { 
        href: "/hire/designers", 
        label: "Designers", 
        description: "Hire creative professionals"
      },
      { 
        href: "/hire/status", 
        label: "Status", 
        description: "Track your projects"
      }
    ]
  },
  { 
    href: "/explore", 
    label: "Explore", 
    icon: <AlignJustify className="h-5 w-5" />,
    description: "Discover new possibilities",
    dropdownItems: [
      { 
        href: "/explore/portfolio", 
        label: "Portfolio", 
        description: "Inspiring design works"
      },
      { 
        href: "/explore/services", 
        label: "Services", 
        description: "Our comprehensive solutions"
      }
    ]
  },
  { 
    href: "/blog", 
    label: "Blog", 
    icon: <Edit2 className="h-5 w-5" />,
    description: "Insights and inspiration"
  }
  // Other navigation items...
];
