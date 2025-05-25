/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'creviartdesign.com',
        port: '',
        pathname: '/assets/images/**',
      },
      { // Tambahkan konfigurasi ini untuk public.readdy.ai
        protocol: 'https',
        hostname: 'public.readdy.ai',
        port: '',
        pathname: '/ai/img_res/**', // Atau sesuaikan path jika ada pattern lain
      },
    ],
  },
};

module.exports = nextConfig;