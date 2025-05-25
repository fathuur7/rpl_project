"use client";

import { useState } from "react";
import EnhancedNavbar from "@/components/layouts/navbar/com";
import Image from "next/image";
import Link from "next/link";


// import { Calendar, Clock, User, Tag, Search, ChevronRight, ChevronLeft } from "lucide-react";

const blogPosts = [
  {
    "title": "Memulai Bisnis Dengan Branding Yang Baik",
    "imageUrl": "/blog-images/01-Memulai-bisnis-dengan-branding-yang-baik.jpg",
    "link": "https://creviartdesign.com/blog&news/01-Memulai-bisnis-dengan-branding-yang-baik"
  },
  {
    "title": "Tips Bisnis Online Tanpa Modal",
    "imageUrl": "/blog-images/02-Tips-bisnis-online-tanpa-modal.jpg",
    "link": "https://creviartdesign.com/blog&news/02-Tips-bisnis-online-tanpa-modal"
  },
  {
    "title": "Pentingnya Logo, Seo, Dan Branding",
    "imageUrl": "/blog-images/03-Pentingnya-logo-SEO-dan-branding.jpg",
    "link": "https://creviartdesign.com/blog&news/03-Pentingnya-logo-SEO-dan-branding"
  },
  {
    "title": "Jasa desain logo profesional jakarta",
    "imageUrl": "/blog-images/04-Jasa-desain-logo-profesional-jakarta.jpg",
    "link": "https://creviartdesign.com/blog&news/04-Jasa-desain-logo-profesional-jakarta"
  },
  {
    "title": "Jasa desaingrafis dan company profile",
    "imageUrl": "/blog-images/05-Jasa-desaingrafis-dan-company-profile.jpg",
    "link": "https://creviartdesign.com/blog&news/05-Jasa-desaingrafis-dan-company-profile"
  },
  {
    "title": "Jasa desain kemasan & packaging",
    "imageUrl": "/blog-images/06-Jasa-desain-kemasan-atau-packaging-creviart-design.jpg",
    "link": "https://creviartdesign.com/blog&news/06-Jasa-desain-kemasan-atau-packaging-creviart-design"
  },
  {
    "title": "Harga jasa desain logo profesional",
    "imageUrl": "/blog-images/07-Harga-jasa-desain-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/07-Harga-jasa-desain-logo-profesional"
  },
  {
    "title": "Cara membuat logo profesional?",
    "imageUrl": "/blog-images/08-Bagaimana-cara-membuat-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/08-Bagaimana-cara-membuat-logo-profesional"
  },
  {
    "title": "Cara meningkatkan seo website",
    "imageUrl": "/blog-images/09-Cara-meningkatkan-seo-website.jpg",
    "link": "https://creviartdesign.com/blog&news/09-Cara-meningkatkan-seo-website"
  },
  {
    "title": "Tutorial membuat desain logo",
    "imageUrl": "/blog-images/10-Tutorial-membuat-desain-logo.jpg",
    "link": "https://creviartdesign.com/blog&news/10-Tutorial-membuat-desain-logo"
  },
  {
    "title": "Perbedaan desainer profesional vs autodidak",
    "imageUrl": "/blog-images/11-Perbedaan-desainer-profesional-vs-desainer-autodidak.jpg",
    "link": "https://creviartdesign.com/blog&news/11-Perbedaan-desainer-profesional-vs-desainer-autodidak"
  },
  {
    "title": "Apakah brand identity itu?",
    "imageUrl": "/blog-images/12-Apakah-brand-identity-itu.jpg",
    "link": "https://creviartdesign.com/blog&news/12-Apakah-brand-identity-itu"
  },
  {
    "title": "Biaya pembuatan desain kemasan profesional",
    "imageUrl": "/blog-images/13-Biaya-pembuatan-desain-kemasan-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/13-Biaya-pembuatan-desain-kemasan-profesional"
  },
  {
    "title": "5 fungsi logo & brand identity",
    "imageUrl": "/blog-images/14-5-fungsi-logo-dan-brand-identity.jpg",
    "link": "https://creviartdesign.com/blog&news/14-5-fungsi-logo-dan-brand-identity"
  },
  {
    "title": "Jenis jenis logo",
    "imageUrl": "/blog-images/15-Jenis-jenis-logo.jpg",
    "link": "https://creviartdesign.com/blog&news/15-Jenis-jenis-logo"
  },
  {
    "title": "Bisnis yang bagus sekarang ini",
    "imageUrl": "/blog-images/16-Bisnis-yang-bagus-sekarang-ini.jpg",
    "link": "https://creviartdesign.com/blog&news/16-Bisnis-yang-bagus-sekarang-ini"
  },
  {
    "title": "Bagaimana cara meningkatkan penjualan",
    "imageUrl": "/blog-images/17-Bagaimana-cara-meningkatkan-penjualan-produk.jpg",
    "link": "https://creviartdesign.com/blog&news/17-Bagaimana-cara-meningkatkan-penjualan-produk"
  },
  {
    "title": "Tips meningkatkan brand/produk",
    "imageUrl": "/blog-images/18-Tips-meningkatkan-brandproduk.jpg",
    "link": "https://creviartdesign.com/blog&news/18-Tips-meningkatkan-brandproduk"
  },
  {
    "title": "Desain logo simple elegan profesional",
    "imageUrl": "/blog-images/19-Desain-logo-simple-elegan-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/19-Desain-logo-simple-elegan-profesional"
  },
  {
    "title": "Trend logo & desain grafis sekarang",
    "imageUrl": "/blog-images/20-Trend-logo-dan-desain-grafis-sekarang.jpg",
    "link": "https://creviartdesign.com/blog&news/20-Trend-logo-dan-desain-grafis-sekarang"
  },
  {
    "title": "Apakah logo & desain itu penting?",
    "imageUrl": "/blog-images/21-Apakah-logo-dan-desain-itu-penting.jpg",
    "link": "https://creviartdesign.com/blog&news/21-Apakah-logo-dan-desain-itu-penting"
  },
  {
    "title": "Desainer grafis profesional mahal??",
    "imageUrl": "/blog-images/22-Desainer-grafis-profesional-harga-nya-mahal.jpg",
    "link": "https://creviartdesign.com/blog&news/22-Desainer-grafis-profesional-harga-nya-mahal"
  },
  {
    "title": "Jasa desain skincare & kosmetik",
    "imageUrl": "/blog-images/23-Jasa-desain-skincare-dan-kosmetik.jpg",
    "link": "https://creviartdesign.com/blog&news/23-Jasa-desain-skincare-dan-kosmetik"
  },
  {
    "title": "Berapakah harga jasa desain grafis di jakarta",
    "imageUrl": "/blog-images/24-Berapakah-harga-jasa-desain-grafis-di-jakarta.jpg",
    "link": "https://creviartdesign.com/blog&news/24-Berapakah-harga-jasa-desain-grafis-di-jakarta"
  },
  {
    "title": "Cara membangun bisnis bagi pemula",
    "imageUrl": "/blog-images/25-Cara-membangun-bisnis-bagi-pemula.jpg",
    "link": "https://creviartdesign.com/blog&news/25-Cara-membangun-bisnis-bagi-pemula"
  },
  {
    "title": "Desain grafis adalah",
    "imageUrl": "/blog-images/26-Desain-grafis-adalah.jpg",
    "link": "https://creviartdesign.com/blog&news/26-Desain-grafis-adalah"
  },
  {
    "title": "Software desain grafis profesional",
    "imageUrl": "/blog-images/27-Software-desain-grafis-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/27-Software-desain-grafis-profesional"
  },
  {
    "title": "Link download logo social media gratis",
    "imageUrl": "/blog-images/28-Link-download-logo-social-media-instagram-whatsapp-facebook-gratis.jpg",
    "link": "https://creviartdesign.com/blog&news/28-Link-download-logo-social-media-instagram-whatsapp-facebook-gratis"
  },
  {
    "title": "Inspirasi logo terkenal & filosofinya",
    "imageUrl": "/blog-images/29-Inspirasi-logo-logo-terkenal-dunia-dan-filosofinya.jpg",
    "link": "https://creviartdesign.com/blog&news/29-Inspirasi-logo-logo-terkenal-dunia-dan-filosofinya"
  },
  {
    "title": "Manfaat social media untuk bisnis",
    "imageUrl": "/blog-images/30-Apa-manfaat-social-media-untuk-bisnis.jpg",
    "link": "https://creviartdesign.com/blog&news/30-Apa-manfaat-social-media-untuk-bisnis"
  },
  {
    "title": "Membangun bisnis dari 0 tanpa modal",
    "imageUrl": "/blog-images/31-Bagaimana-cara-membangun-bisnis-dari-0-tanpa-modal.jpg",
    "link": "https://creviartdesign.com/blog&news/31-Bagaimana-cara-membangun-bisnis-dari-0-tanpa-modal"
  },
  {
    "title": "Mengenal apa itu crypto & metaverse",
    "imageUrl": "/blog-images/32-Mengenal-apa-itu-crypto-dan-metaverse.jpg",
    "link": "https://creviartdesign.com/blog&news/32-Mengenal-apa-itu-crypto-dan-metaverse"
  },
  {
    "title": "Sejarah & awal desain grafis di dunia",
    "imageUrl": "/blog-images/33-Sejarah-dan-awal-desain-grafis-di-dunia.jpg",
    "link": "https://creviartdesign.com/blog&news/33-Sejarah-dan-awal-desain-grafis-di-dunia"
  },
  {
    "title": "Brand skincare/kosmetik lokal yang terbaik",
    "imageUrl": "/blog-images/34-Brand-skincarekosmetik-lokal-yang-terbaik.jpg",
    "link": "https://creviartdesign.com/blog&news/34-Brand-skincarekosmetik-lokal-yang-terbaik"
  },
  {
    "title": "Fungsi brand guideline book",
    "imageUrl": "/blog-images/35-Fungsi-brand-guide-line-book-dalam-branding.jpg",
    "link": "https://creviartdesign.com/blog&news/35-Fungsi-brand-guide-line-book-dalam-branding.jpg"
  },
  {
    "title": "Komposisi, elemen, hirarki dalam dunia desain",
    "imageUrl": "/blog-images/36-Komposisi,-elemen,-hirarki-dalam-dunia-desain.jpg",
    "link": "https://creviartdesign.com/blog&news/36-Komposisi,-elemen,-hirarki-dalam-dunia-desain.jpg"
  },
  {
    "title": "Rekomendasi film terbaik sepanjang masa",
    "imageUrl": "/blog-images/37-Rekomendasi-film-terbaik-sepanjang-masa.jpg",
    "link": "https://creviartdesign.com/blog&news/37-Rekomendasi-film-terbaik-sepanjang-masa"
  },
  {
    "title": "Membangun bisnis dari instagram, facebook, tiktok & whatsapp",
    "imageUrl": "/blog-images/38-Membangun-bisnis-dengan-social-media-instagram,-facebook,-tiktok-dan-whatsapp.jpg",
    "link": "https://creviartdesign.com/blog&news/38-Membangun-bisnis-dengan-social-media-instagram,-facebook,-tiktok-dan-whatsapp.jpg"
  },
  {
    "title": "Brand lokal indonesia yang dikira internasional",
    "imageUrl": "/blog-images/39-Brand-lokal-indonesia-yang-dikira-internasional.jpg",
    "link": "https://creviartdesign.com/blog&news/39-Brand-lokal-indonesia-yang-dikira-internasional"
  },
  {
    "title": "Perbedaan brand agency, design studio, freelancer dan drafter",
    "imageUrl": "/blog-images/40-Perbedaan-brand-agency,-design-studio,-freelance-desainer-dan-drafter-desainer.jpg",
    "link": "https://creviartdesign.com/blog&news/40-Perbedaan-brand-agency,-design-studio,-freelance-desainer-dan-drafter-desainer.jpg"
  },
  {
    "title": "Perkembangan AI chatgpt microsoft vs AI bard google",
    "imageUrl": "/blog-images/41-Perkembangan-AI-chatgpt-microsoft-vs-AI-bard-google.jpg",
    "link": "https://creviartdesign.com/blog&news/41-Perkembangan-AI-chatgpt-microsoft-vs-AI-bard-google.jpg"
  },
  {
    "title": "Trend desain grafis di tahun 2023",
    "imageUrl": "/blog-images/42-Trend-desain-grafis-di-tahun-2023.jpg",
    "link": "https://creviartdesign.com/blog&news/42-Trend-desain-grafis-di-tahun-2023.jpg"
  },
  {
    "title": "Perbedaan desain interior, grafis, produk, arsitektur",
    "imageUrl": "/blog-images/43-Perbedaan-dan-persamaan-desain.jpg",
    "link": "https://creviartdesign.com/blog&news/43-Perbedaan-dan-persamaan-desain-interior,-desain-grafis,-desain-produk-dan-desain-arsitektur.jpg"
  },
  {
    "title": "Pentingnya SEO, backlink, landing page, sosmed.",
    "imageUrl": "/blog-images/44-Pentingnya-seo,-backlink,-landing-page,-sosmed-dalam-menaikkan-traffic-website.jpg",
    "link": "https://creviartdesign.com/blog&news/44-Pentingnya-seo,-backlink,-landing-page,-sosmed-dalam-menaikkan-traffic-website.jpg"
  },
  {
    "title": "10 alasan kita harus melakukan rebranding bisnis",
    "imageUrl": "/blog-images/45-10-alasan-kita-harus-melakukan-rebranding-bisnis-dan-produk-kita.jpg",
    "link": "https://creviartdesign.com/blog&news/45-10-alasan-kita-harus-melakukan-rebranding-bisnis-dan-produk-kita.jpg"
  },
  {
    "title": "Bagaimana proses pembuatan logo profesional",
    "imageUrl": "/blog-images/46-Bagaimana-proses-pembuatan-logo-profesional.jpg",
    "link": "https://creviartdesign.com/blog&news/46-Bagaimana-proses-pembuatan-logo-profesional.jpg"
  },
  {
    "title": "Aplikasi design online gratis untuk pemula",
    "imageUrl": "/blog-images/47-Aplikasi-design-online-gratis-yang-mudah-digunakan-untuk-pemula.jpg",
    "link": "https://creviartdesign.com/blog&news/47-Aplikasi-design-online-gratis-yang-mudah-digunakan-untuk-pemula.jpg"
  },
  {
    "title": "Cara membuat CV dan presentasi yang baik agar mudah diterima",
    "imageUrl": "/blog-images/48-Cara-membuat-cv-dan-presentasi-yang-baik-agar-mudah-diterima.jpg",
    "link": "https://creviartdesign.com/blog&news/48-Cara-membuat-cv-dan-presentasi-yang-baik-agar-mudah-diterima.jpg"
  }
];


export default function BlogPage() {

  return (

    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <EnhancedNavbar/>
      <div className="max-w-7xl mx-auto">
        {/* Header Blog & News, meniru .title-area */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            <Link href="https://creviartdesign.com/blog" className="no-underline text-gray-900 hover:text-gray-700">
              Blog &amp; News
            </Link>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creviart design menyajikan berbagai berita &amp; informasi terupdate tentang dunia desain, bisnis, tutorial dan berita lainnya.
          </p>
          <span className="block w-20 h-1 bg-blue-500 mx-auto mt-4"></span> {/* Garis tittle-line */}
          <br />
        </div>

        {/* Blog Posts Grid - meniru from-blog-content dan row */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index} // Menggunakan index sebagai key karena tidak ada ID unik dalam data asli
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <figure className="relative h-48 w-full">
                  <Link href={post.link}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </figure>
                <div className="p-4"> {/* Padding lebih kecil untuk meniru blog-title */}
                  <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight"> {/* text-lg, font-bold untuk h4, leading-tight untuk meniru gaya asli */}
                    <Link
                      href={post.link}
                      className="text-gray-600 hover:text-blue-800 no-underline" // Warna link biru untuk meniru gaya default HTML a tag
                    >
                      {post.title}
                    </Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
