"use client";

import { useState } from "react";

export default function Error({ error, reset }) {
  const [copied, setCopied] = useState(false);
  
  // Log the error to an error reporting service
  console.error(error);
  
  const errorMessage = error?.message || "Unknown error occurred";
  
  const copyError = () => {
    navigator.clipboard.writeText(errorMessage)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy error:", err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 relative">
          <pre className="text-sm overflow-auto whitespace-pre-wrap break-words text-gray-800">
            {errorMessage}
          </pre>
          
          <button 
            onClick={copyError}
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded text-sm"
            aria-label="Copy error message"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => reset()} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Try again
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}