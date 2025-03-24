"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 text-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="text-9xl font-extrabold text-gray-200"
            >
              404
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            >
              <AlertTriangle size={80} className="text-amber-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl"
        >
          Halaman Tidak Ditemukan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 text-gray-600"
        >
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            <Home size={18} className="transition-transform group-hover:-translate-y-1 text-gray-500" />
            <span className="text-gray-500">Kembali ke Beranda</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Jika Anda yakin alamat ini benar, silakan hubungi tim dukungan kami.</p>
        </motion.div>
      </div>
    </div>
  )
}

