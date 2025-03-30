import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"

export default function HireLayout({ children }) {
  return (
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {/* Accessibility Skip Link */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-white focus:text-black focus:ring-2 focus:ring-primary"
            >
              Skip to main content
            </a>

            {/* Authentication Background Pattern */}
            <div 
              className="absolute inset-0 -z-10 
              dark:bg-dot-white/[0.1] 
              bg-dot-black/[0.1] 
              pointer-events-none"
            ></div>

            {/* Main content area with centered layout */}
            <main 
              id="main-content" 
              className="text-gray-900"
            >
             
                {children}
       
            </main>

            {/* Footer */}
            <footer 
              className="py-4 text-center text-xs text-gray-500 
              dark:text-gray-400 absolute bottom-0 w-full"
            >
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
          </div>

          {/* Toaster for notifications */}
          <Toaster />
        </ThemeProvider>
  );
}


