"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ 
  label, 
  registerKey, 
  register, 
  error 
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label 
        htmlFor={registerKey} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={registerKey}
        {...register(registerKey)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:bg-gray-700 dark:text-white pr-10"
        placeholder={`${label.toLowerCase()}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}