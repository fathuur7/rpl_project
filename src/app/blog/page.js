"use client";

import { useState } from "react";
import EnhancedNavbar from "@/components/layouts/navbar/com";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, Grid, List } from "lucide-react";

const blogPosts = [
  {
    "title": "Memulai Bisnis Dengan Branding Yang Baik",
    "imageUrl": "/blog-images/01-Memulai-bisnis-dengan-branding-yang-baik.jpg",
    "link": "https://creviartdesign.com/blog&news/01-Memulai-bisnis-dengan-branding-yang-baik",
    "category": "Branding",
    "readTime": "5 min",
    "date": "2024-01-15"
  },
  {
    "title": "Tips Bisnis Online Tanpa Modal",
    "imageUrl": "/blog-images/02-Tips-bisnis-online-tanpa-modal.jpg",
    "link": "https://creviartdesign.com/blog&news/02-Tips-bisnis-online-tanpa-modal",
    "category": "Bisnis",
    "readTime": "7 min",
    "date": "2024-01-12"
  },
  {
    "title": "Pentingnya Logo, Seo, Dan Branding",
    "imageUrl": "/blog-images/03-Pentingnya-logo-SEO-dan-branding.jpg",
    "link": "https://creviartdesign.com/blog&news/03-Pentingnya-logo-SEO-dan-branding",
    "category": "Branding",
    "readTime": "6 min",
    "date": "2024-01-10"
  },
  {
    "title": "Jasa desain logo profesional jakarta",
    "imageUrl": "/blog-images/04-Jasa-desain-logo-profesional-jakarta.jpg",
    "link": "https://creviartdesign.com/blog&news/04-Jasa-desain-logo-profesional-jakarta",
    "category": "Desain",
    "readTime": "4 min",
    "date": "2024-01-08"
  },
  {
    "title": "Jasa desaingrafis dan company profile",
    "imageUrl": "/blog-images/05-Jasa-desaingrafis-dan-company-profile.jpg",
    "link": "https://creviartdesign.com/blog&news/05-Jasa-desaingrafis-dan-company-profile",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2024-01-05"
  },
  {
    "title": "Jasa desain kemasan & packaging",
    "imageUrl": "/blog-images/06-Jasa-desain-kemasan-atau-packaging-creviart-design.jpg",
    "link": "https://creviartdesign.com/blog&news/06-Jasa-desain-kemasan-atau-packaging-creviart-design",
    "category": "Packaging",
    "readTime": "6 min",
    "date": "2024-01-03"
  },
  {
    "title": "Harga jasa desain logo profesional",
    "imageUrl": "/blog-images/07-Harga-jasa-desain-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/07-Harga-jasa-desain-logo-profesional",
    "category": "Pricing",
    "readTime": "5 min",
    "date": "2024-01-01"
  },
  {
    "title": "Cara membuat logo profesional?",
    "imageUrl": "/blog-images/08-Bagaimana-cara-membuat-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/08-Bagaimana-cara-membuat-logo-profesional",
    "category": "Tutorial",
    "readTime": "10 min",
    "date": "2023-12-28"
  },
  {
    "title": "Cara meningkatkan seo website",
    "imageUrl": "/blog-images/09-Cara-meningkatkan-seo-website.jpg",
    "link": "https://creviartdesign.com/blog&news/09-Cara-meningkatkan-seo-website",
    "category": "SEO",
    "readTime": "12 min",
    "date": "2023-12-25"
  },
  {
    "title": "Tutorial membuat desain logo",
    "imageUrl": "/blog-images/10-Tutorial-membuat-desain-logo.jpg",
    "link": "https://creviartdesign.com/blog&news/10-Tutorial-membuat-desain-logo",
    "category": "Tutorial",
    "readTime": "15 min",
    "date": "2023-12-22"
  },
  {
    "title": "Perbedaan desainer profesional vs autodidak",
    "imageUrl": "/blog-images/11-Perbedaan-desainer-profesional-vs-desainer-autodidak.jpg",
    "link": "https://creviartdesign.com/blog&news/11-Perbedaan-desainer-profesional-vs-desainer-autodidak",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2023-12-20"
  },
  {
    "title": "Apakah brand identity itu?",
    "imageUrl": "/blog-images/12-Apakah-brand-identity-itu.jpg",
    "link": "https://creviartdesign.com/blog&news/12-Apakah-brand-identity-itu",
    "category": "Branding",
    "readTime": "6 min",
    "date": "2023-12-18"
  },
  {
    "title": "Biaya pembuatan desain kemasan profesional",
    "imageUrl": "/blog-images/13-Biaya-pembuatan-desain-kemasan-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/13-Biaya-pembuatan-desain-kemasan-profesional",
    "category": "Desain",
    "readTime": "7 min",
    "date": "2023-12-18"
  },
  {
    "title": "5 fungsi logo & brand identity",
    "imageUrl": "/blog-images/14-5-fungsi-logo-dan-brand-identity.jpg",
    "link": "https://creviartdesign.com/blog&news/14-5-fungsi-logo-dan-brand-identity",
    "category": "Branding",
    "readTime": "7 min",
    "date": "2023-12-17"
  },
  {
    "title": "Jenis jenis logo",
    "imageUrl": "/blog-images/15-Jenis-jenis-logo.jpg",
    "link": "https://creviartdesign.com/blog&news/15-Jenis-jenis-logo",
    "category": "Desain",
    "readTime": "6 min",
    "date": "2023-12-16"
  },
  {
    "title": "Bisnis yang bagus sekarang ini",
    "imageUrl": "/blog-images/16-Bisnis-yang-bagus-sekarang-ini.jpg",
    "link": "https://creviartdesign.com/blog&news/16-Bisnis-yang-bagus-sekarang-ini",
    "category": "Bisnis",
    "readTime": "8 min",
    "date": "2023-12-15"
  },
  {
    "title": "Bagaimana cara meningkatkan penjualan",
    "imageUrl": "/blog-images/17-Bagaimana-cara-meningkatkan-penjualan-produk.jpg",
    "link": "https://creviartdesign.com/blog&news/17-Bagaimana-cara-meningkatkan-penjualan-produk",
    "category": "Bisnis",
    "readTime": "7 min",
    "date": "2023-12-14"
  },
  {
    "title": "Tips meningkatkan brand/produk",
    "imageUrl": "/blog-images/18-Tips-meningkatkan-brandproduk.jpg",
    "link": "https://creviartdesign.com/blog&news/18-Tips-meningkatkan-brandproduk",
    "category": "Branding",
    "readTime": "5 min",
    "date": "2023-12-13"
  },
  {
    "title": "Desain logo simple elegan profesional",
    "imageUrl": "/blog-images/19-Desain-logo-simple-elegan-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/19-Desain-logo-simple-elegan-profesional",
    "category": "Desain",
    "readTime": "6 min",
    "date": "2023-12-12"
  },
  {
    "title": "Trend logo & desain grafis sekarang",
    "imageUrl": "/blog-images/20-Trend-logo-dan-desain-grafis-sekarang.jpg",
    "link": "https://creviartdesign.com/blog&news/20-Trend-logo-dan-desain-grafis-sekarang",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2023-12-11"
  },
  {
    "title": "Apakah logo & desain itu penting?",
    "imageUrl": "/blog-images/21-Apakah-logo-dan-desain-itu-penting.jpg",
    "link": "https://creviartdesign.com/blog&news/21-Apakah-logo-dan-desain-itu-penting",
    "category": "Desain",
    "readTime": "7 min",
    "date": "2023-12-10"
  },
  {
    "title": "Desainer grafis profesional mahal??",
    "imageUrl": "/blog-images/22-Desainer-grafis-profesional-harga-nya-mahal.jpg",
    "link": "https://creviartdesign.com/blog&news/22-Desainer-grafis-profesional-harga-nya-mahal",
    "category": "Pricing",
    "readTime": "6 min",
    "date": "2023-12-09"
  },
  {
    "title": "Jasa desain skincare & kosmetik",
    "imageUrl": "/blog-images/23-Jasa-desain-skincare-dan-kosmetik.jpg",
    "link": "https://creviartdesign.com/blog&news/23-Jasa-desain-skincare-dan-kosmetik",
    "category": "Desain",
    "readTime": "7 min",
    "date": "2023-12-08"
  },
  {
    "title": "Berapakah harga jasa desain grafis di jakarta",
    "imageUrl": "/blog-images/24-Berapakah-harga-jasa-desain-grafis-di-jakarta.jpg",
    "link": "https://creviartdesign.com/blog&news/24-Berapakah-harga-jasa-desain-grafis-di-jakarta",
    "category": "Pricing",
    "readTime": "8 min",
    "date": "2023-12-07"
  },
  {
    "title": "Cara membangun bisnis bagi pemula",
    "imageUrl": "/blog-images/25-Cara-membangun-bisnis-bagi-pemula.jpg",
    "link": "https://creviartdesign.com/blog&news/25-Cara-membangun-bisnis-bagi-pemula",
    "category": "Bisnis",
    "readTime": "9 min",
    "date": "2023-12-06"
  },
  {
    "title": "Desain grafis adalah",
    "imageUrl": "/blog-images/26-Desain-grafis-adalah.jpg",
    "link": "https://creviartdesign.com/blog&news/26-Desain-grafis-adalah",
    "category": "Desain",
    "readTime": "5 min",
    "date": "2023-12-05"
  },
  {
    "title": "Software desain grafis profesional",
    "imageUrl": "/blog-images/27-Software-desain-grafis-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/27-Software-desain-grafis-profesional",
    "category": "Desain",
    "readTime": "7 min",
    "date": "2023-12-04"
  },
  {
    "title": "Link download logo social media gratis",
    "imageUrl": "/blog-images/28-Link-download-logo-social-media-instagram-whatsapp-facebook-gratis.jpg",
    "link": "https://creviartdesign.com/blog&news/28-Link-download-logo-social-media-instagram-whatsapp-facebook-gratis",
    "category": "Tutorial",
    "readTime": "6 min",
    "date": "2023-12-03"
  },
  {
    "title": "Inspirasi logo terkenal & filosofinya",
    "imageUrl": "/blog-images/29-Inspirasi-logo-logo-terkenal-dunia-dan-filosofinya.jpg",
    "link": "https://creviartdesign.com/blog&news/29-Inspirasi-logo-logo-terkenal-dunia-dan-filosofinya",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2023-12-02"
  },
  {
    "title": "Manfaat social media untuk bisnis",
    "imageUrl": "/blog-images/30-Apa-manfaat-social-media-untuk-bisnis.jpg",
    "link": "https://creviartdesign.com/blog&news/30-Apa-manfaat-social-media-untuk-bisnis",
    "category": "Bisnis",
    "readTime": "7 min",
    "date": "2023-12-01"
  },
  {
    "title": "Membangun bisnis dari 0 tanpa modal",
    "imageUrl": "/blog-images/31-Bagaimana-cara-membangun-bisnis-dari-0-tanpa-modal.jpg",
    "link": "https://creviartdesign.com/blog&news/31-Bagaimana-cara-membangun-bisnis-dari-0-tanpa-modal",
    "category": "Bisnis",
    "readTime": "10 min",
    "date": "2023-11-30"
  },
  {
    "title": "Mengenal apa itu crypto & metaverse",
    "imageUrl": "/blog-images/32-Mengenal-apa-itu-crypto-dan-metaverse.jpg",
    "link": "https://creviartdesign.com/blog&news/32-Mengenal-apa-itu-crypto-dan-metaverse",
    "category": "Teknologi",
    "readTime": "9 min",
    "date": "2023-11-29"
  },
  {
    "title": "Sejarah & awal desain grafis di dunia",
    "imageUrl": "/blog-images/33-Sejarah-dan-awal-desain-grafis-di-dunia.jpg",
    "link": "https://creviartdesign.com/blog&news/33-Sejarah-dan-awal-desain-grafis-di-dunia",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2023-11-28"
  },
  {
    "title": "Brand skincare/kosmetik lokal yang terbaik",
    "imageUrl": "/blog-images/34-Brand-skincarekosmetik-lokal-yang-terbaik.jpg",
    "link": "https://creviartdesign.com/blog&news/34-Brand-skincarekosmetik-lokal-yang-terbaik",
    "category": "Branding",
    "readTime": "7 min",
    "date": "2023-11-27"
  },
  {
    "title": "Fungsi brand guideline book",
    "imageUrl": "/blog-images/35-Fungsi-brand-guide-line-book-dalam-branding.jpg",
    "link": "https://creviartdesign.com/blog&news/35-Fungsi-brand-guide-line-book-dalam-branding",
    "category": "Branding",
    "readTime": "6 min",
    "date": "2023-11-26"
  },
  {
    "title": "Komposisi, elemen, hirarki dalam dunia desain",
    "imageUrl": "/blog-images/36-Komposisi,-elemen,-hirarki-dalam-dunia-desain.jpg",
    "link": "https://creviartdesign.com/blog&news/36-Komposisi,-elemen,-hirarki-dalam-dunia-desain",
    "category": "Desain",
    "readTime": "9 min",
    "date": "2023-11-25"
  },
  {
    "title": "Rekomendasi film terbaik sepanjang masa",
    "imageUrl": "/blog-images/37-Rekomendasi-film-terbaik-sepanjang-masa.jpg",
    "link": "https://creviartdesign.com/blog&news/37-Rekomendasi-film-terbaik-sepanjang-masa",
    "category": "Hiburan",
    "readTime": "5 min",
    "date": "2023-11-24"
  },
  {
    "title": "Membangun bisnis dari instagram, facebook, tiktok & whatsapp",
    "imageUrl": "/blog-images/38-Membangun-bisnis-dengan-social-media-instagram,-facebook,-tiktok-dan-whatsapp.jpg",
    "link": "https://creviartdesign.com/blog&news/38-Membangun-bisnis-dengan-social-media-instagram,-facebook,-tiktok-dan-whatsapp",
    "category": "Bisnis",
    "readTime": "11 min",
    "date": "2023-11-23"
  },
  {
    "title": "Brand lokal indonesia yang dikira internasional",
    "imageUrl": "/blog-images/39-Brand-lokal-indonesia-yang-dikira-internasional.jpg",
    "link": "https://creviartdesign.com/blog&news/39-Brand-lokal-indonesia-yang-dikira-internasional",
    "category": "Branding",
    "readTime": "7 min",
    "date": "2023-11-22"
  },
  {
    "title": "Perbedaan brand agency, design studio, freelancer dan drafter",
    "imageUrl": "/blog-images/40-Perbedaan-brand-agency,-design-studio,-freelance-desainer-dan-drafter-desainer.jpg",
    "link": "https://creviartdesign.com/blog&news/40-Perbedaan-brand-agency,-design-studio,-freelance-desainer-dan-drafter-desainer",
    "category": "Desain",
    "readTime": "10 min",
    "date": "2023-11-21"
  },
  {
    "title": "Perkembangan AI chatgpt microsoft vs AI bard google",
    "imageUrl": "/blog-images/41-Perkembangan-AI-chatgpt-microsoft-vs-AI-bard-google.jpg",
    "link": "https://creviartdesign.com/blog&news/41-Perkembangan-AI-chatgpt-microsoft-vs-AI-bard-google",
    "category": "Teknologi",
    "readTime": "12 min",
    "date": "2023-11-20"
  },
  {
    "title": "Trend desain grafis di tahun 2023",
    "imageUrl": "/blog-images/42-Trend-desain-grafis-di-tahun-2023.jpg",
    "link": "https://creviartdesign.com/blog&news/42-Trend-desain-grafis-di-tahun-2023",
    "category": "Desain",
    "readTime": "8 min",
    "date": "2023-11-19"
  },
  {
    "title": "Perbedaan desain interior, grafis, produk, arsitektur",
    "imageUrl": "/blog-images/43-Perbedaan-dan-persamaan-desain.jpg",
    "link": "https://creviartdesign.com/blog&news/43-Perbedaan-dan-persamaan-desain-interior,-desain-grafis,-desain-produk-dan-desain-arsitektur",
    "category": "Desain",
    "readTime": "9 min",
    "date": "2023-11-18"
  },
  {
    "title": "Pentingnya SEO, backlink, landing page, sosmed.",
    "imageUrl": "/blog-images/44-Pentingnya-seo,-backlink,-landing-page,-sosmed-dalam-menaikkan-traffic-website.jpg",
    "link": "https://creviartdesign.com/blog&news/44-Pentingnya-seo,-backlink,-landing-page,-sosmed-dalam-menaikkan-traffic-website",
    "category": "SEO",
    "readTime": "10 min",
    "date": "2023-11-17"
  },
  {
    "title": "10 alasan kita harus melakukan rebranding bisnis",
    "imageUrl": "/blog-images/45-10-alasan-kita-harus-melakukan-rebranding-bisnis-dan-produk-kita.jpg",
    "link": "https://creviartdesign.com/blog&news/45-10-alasan-kita-harus-melakukan-rebranding-bisnis-dan-produk-kita",
    "category": "Branding",
    "readTime": "8 min",
    "date": "2023-11-16"
  },
  {
    "title": "Bagaimana proses pembuatan logo profesional",
    "imageUrl": "/blog-images/46-Bagaimana-proses-pembuatan-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/46-Bagaimana-proses-pembuatan-logo-profesional",
    "category": "Tutorial",
    "readTime": "7 min",
    "date": "2023-11-15"
  },
  {
    "title": "Aplikasi design online gratis untuk pemula",
    "imageUrl": "/blog-images/47-Aplikasi-design-online-gratis-yang-mudah-digunakan-untuk-pemula.jpg",
    "link": "https://creviartdesign.com/blog&news/47-Aplikasi-design-online-gratis-yang-mudah-digunakan-untuk-pemula",
    "category": "Desain",
    "readTime": "6 min",
    "date": "2023-11-14"
  },
  {
    "title": "Cara membuat CV dan presentasi yang baik agar mudah diterima",
    "imageUrl": "/blog-images/48-Cara-membuat-cv-dan-presentasi-yang-baik-agar-mudah-diterima.jpg",
    "link": "https://creviartdesign.com/blog&news/48-Cara-membuat-cv-dan-presentasi-yang-baik-agar-mudah-diterima",
    "category": "Tutorial",
    "readTime": "9 min",
    "date": "2023-11-13"
  }

];

const categories = ["All", "Branding", "Bisnis", "Desain", "Tutorial", "SEO", "Packaging", "Pricing"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <EnhancedNavbar/>
      
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/blog-images/bannerpageblog.jpg')" }} // Updated line
      >
        <div className="absolute inset-0 bg-black opacity-80"></div> {/* Increased opacity for better text readability */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">News</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Creviart design menyajikan berbagai berita & informasi terupdate tentang dunia desain, bisnis, tutorial dan berita lainnya.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Decorative elements - You might want to remove or adjust these based on the image */}
        {/*
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-white shadow-md text-blue-600" : "text-gray-500"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list" ? "bg-white shadow-md text-blue-600" : "text-gray-500"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Menampilkan <span className="font-semibold text-gray-900">{filteredPosts.length}</span> artikel
            {selectedCategory !== "All" && (
              <span> dalam kategori <span className="font-semibold text-blue-600">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "space-y-6"
        }`}>
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-2 ${
                viewMode === "list" ? "flex flex-col sm:flex-row" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${
                viewMode === "list" ? "sm:w-80 h-48 sm:h-auto" : "h-48"
              }`}>
                <Link href={post.link}>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 flex-1 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                <div>
                  <h3 className={`font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 ${
                    viewMode === "list" ? "text-xl mb-4" : "text-lg"
                  }`}>
                    <Link
                      href={post.link}
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  href={post.link}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 group/link"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tidak ada artikel ditemukan</h3>
            <p className="text-gray-600 mb-6">Coba ubah kata kunci pencarian atau kategori yang dipilih.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 border border-gray-300">
              Muat Lebih Banyak Artikel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}