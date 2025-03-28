"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Validation
import { registerSchema } from "@/validation/auth-schema";

// Hooks
import { useRegistration } from "@/hooks/use-registration";

// Components
import PasswordInput from "./PasswordInput";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitted Data:", data); // Log submitted data

      const registrationResult = await registerUser(data);
      
      console.log("Registration Result:", registrationResult); // Log full result

      if (registrationResult.success) {
        toast.success("Registration successful", {
          description: "Please check your email to verify your account",
          duration: 5000
        });
      } else {
        console.error("Registration Failed:", registrationResult.message);
        toast.error("Registration failed", {
          description: registrationResult.message || "Unknown error occurred"
        });
      }
    } catch (error) {
      console.error("Unexpected Registration Error:", error);
      toast.error("An unexpected error occurred", {
        description: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Log form errors if they exist
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn("Form Validation Errors:", errors);
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Input */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:text-white"
          placeholder="Choose name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:text-white"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Inputs with custom component */}
      <PasswordInput
        label="Password"
        registerKey="password"
        register={register}
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        registerKey="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-green-600 text-white rounded-lg 
                   hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                   transition-colors duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}