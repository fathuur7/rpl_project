"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Separate components
import RegistrationForm from "../../../components/auth/RegistrationForm";
import GoogleSignUpButton from "../../../components/auth/GoogleSignUpButton";

export default function Register() {
  return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Create Account
          </h2>

          <RegistrationForm />

          <div className="flex items-center justify-center my-6">
            <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
              or
            </span>
            <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
          </div>

          <GoogleSignUpButton />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link 
                href="./login" 
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
  );
}