'use client'

import React, { useState, useEffect } from 'react';

export default function ProfileLayout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Mouse follower */}
      <div 
        className="pointer-events-none fixed h-6 w-6 rounded-full bg-blue-400 opacity-70 blur-sm"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <header className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">Welcome to your personal profile page</p>
          {/* back */}
            <button onClick={() => window.history.back()} className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-md">
                Go back
            </button>
        </header>
        
        {/* Main content wrapper with improved styling */}
        <main className="rounded-xl bg-white p-6 shadow-md">
          <div className="">
            {children}
          </div>
        </main>
        
        {/* Added footer */}
        <footer className="mt-8 rounded-xl bg-white p-4 text-center text-gray-600 shadow-md">
          <p>© {new Date().getFullYear()} Your Profile. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}