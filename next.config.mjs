/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "cdn.dribbble.com",
          "public.readdy.ai",
          'lh3.googleusercontent.com',
          'https://res.cloudinary.com',
          "res.cloudinary.com"
        ], // Tambahkan domain yang diizinkan

      }
};

export default nextConfig;
