"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerificationPage() {
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "Verifying your email...",
  });

  const params = useParams(); // Ambil token dari URL dengan useParams
  const router = useRouter();
  const token = params.token; // Pastikan token diambil dengan benar

  useEffect(() => {
    if (!token) {
      setStatus({ loading: false, success: false, message: "Invalid verification link." });
      return;
    }

    async function verifyEmail() {
      try {
        console.log("Verification Token:", token);

        const response = await fetch("http://localhost:5000/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        console.log("Verification Response:", { status: response.status, ok: response.ok, data });

        if (response.ok) {
          setStatus({ loading: false, success: true, message: data.message || "Email verified successfully!" });

          // Redirect ke login setelah 2 detik
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        } else {
          setStatus({ loading: false, success: false, message: data.message || "Verification failed." });
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setStatus({ loading: false, success: false, message: "Network error occurred." });
      }
    }

    verifyEmail();
  }, [token, router]); // Dependensi harus mencakup `token` dan `router`

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-semibold">{status.message}</h2>
      {status.success && <p className="text-green-500 mt-4">Redirecting to login...</p>}
      {!status.success && !status.loading && <p className="text-red-500 mt-4">Please try again.</p>}
    </div>
  );
}
