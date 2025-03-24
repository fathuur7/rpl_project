// pages/index.js
'use client';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/heroSection';
import Navbar from '@/components/layouts/navbar/com';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const trendingSearches = [
    'landing page', 'e-commerce', 'mobile app', 'logo design', 'dashboard', 'icons'
  ];
  
  const categories = [
    'Discover', 'Animation', 'Branding', 'Illustration', 'Mobile', 
    'Print', 'Product Design', 'Typography', 'Web Design'
  ];
  
  const portfolioItems = [
    {
    "title": "S mark brand design brand identity branding brandmark custom letter custom logo custom logo design geometric logo graphic design identity identity designer logo logo design logo designer logo mark mark negative space logo s s logo tech logo",
    "name_img_from": "s-mark-brand-design-brand-identity-branding-brandm_1.jpg",
    "designer": "developer",
    "category": "general",
    "image_url": "https://cdn.dribbble.com/userupload/42585719/file/original-5ef5c58fb948d138810fa7245abfdbb3.jpg?crop=134x101-1462x1099&format=webp&resize=1200x900&vertical=center"
    },
    {
      id: 2,
      title: 'Replay Logo Design',
      image: '/images/replay-logo.jpg',
      category: 'Branding'
    },
    {
      id: 3,
      title: 'Deer Logo Design',
      image: '/images/deer-logo.jpg',
      category: 'Logo Design'
    },
    {
      id: 4,
      title: 'Yeifer Agency Branding',
      image: '/images/yeifer-branding.jpg',
      category: 'Branding'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <Navbar />
      </header>
      
      <main>
        <section className="w-full overflow-hidden bg-white py-16 md:py-24">
          <HeroSection />
        </section>
        
        <section className="container mx-auto px-4 pb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                Following <span className="ml-1">▼</span>
              </button>
              
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50
                    ${index === 0 ? 'font-medium' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <button className="hidden md:flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioItems.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden bg-gray-100 group">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    [Preview Image: {item.title}]
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}