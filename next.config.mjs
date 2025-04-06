/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "cdn.dribbble.com",
          "public.readdy.ai",
          'lh3.googleusercontent.com'
        ], // Tambahkan domain yang diizinkan

      }
};

export default nextConfig;
