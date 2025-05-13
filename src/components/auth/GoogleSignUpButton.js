"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // Ganti dengan URL backend Anda

export default function GoogleSignUpButton() {
  const handleGoogleSignUp = async () => {
    try {
      // Redirect to backend OAuth endpoint
      window.location.href = `{base_url}/api/v1/auth/google`;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  
  return (
    <button
      onClick={handleGoogleSignUp}
      className="w-full flex items-center justify-center bg-white dark:bg-gray-700 
                 border border-gray-300 dark:border-gray-600 
                 rounded-lg shadow-md px-6 py-3 
                 text-sm font-medium text-gray-800 dark:text-white
                 hover:bg-gray-50 dark:hover:bg-gray-600
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FcGoogle className="mr-2 text-2xl" />
      Continue with Google
    </button>
  );
}