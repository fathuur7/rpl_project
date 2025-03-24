import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

// Configure Poppins font with all weights
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["system-ui", "arial"],
});

// Metadata configuration
export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Art Cooperation | Your Perfect Company",
    template: "%s | Art Cooperation",
  },
  description: "Your Perfect Company. Find your perfect companion for any occasion. Safe, reliable, and professional companionship services.",
  keywords: [
    "your perfect company",
    "perfect companion",
    "art cooperation",
    "companion services",
    "safe companionship",
    "reliable companionship",
    "professional companionship",
  ],
  authors: [{ name: "Art Cooperation" }],
  creator: "Art Cooperation",
  publisher: "Art Cooperation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192" },
      { url: "/icon-512.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Loading component for Suspense
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full"></div>
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${poppins.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased selection:bg-blue-200 selection:text-blue-900"
      >
        <div className="flex min-h-screen flex-col">
          {/* Accessibility skip link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-white focus:text-black focus:border focus:border-blue-500 focus:rounded"
          >
            Skip to main content
          </a>

          {/* Main content area with loading fallback */}
          <main 
            id="main-content" 
            className="flex-grow"
          >
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
        </div>

        {/* Theme script with improved error handling */}
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme script error:', e);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}