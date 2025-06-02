import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export default function PaymentLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col relative">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-lg focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          
          {/* Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Subtle Mesh Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-lg">Payment</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure Connection</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main
          id="main-content"
          className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          <div className="w-full max-w-4xl relative">
            {/* Content Container with Glass Effect */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl blur-xl opacity-50" />
              
              {/* Main Content */}
              <div className="relative bg-background/80 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-xl">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background/50 backdrop-blur-sm">
          <div className="container px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} Your Company. All rights reserved.</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </ThemeProvider>
  );
}