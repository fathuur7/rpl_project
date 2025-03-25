"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "10 Design Trends Shaping Digital Experiences in 2024",
    excerpt: "Explore the cutting-edge design trends that are revolutionizing digital interfaces and user experiences.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    tags: ["Design", "UX", "Trends"],
    imageUrl: "/api/placeholder/800/450",
    category: "Design"
  },
  {
    id: 2,
    title: "The Future of AI in Creative Design",
    excerpt: "How artificial intelligence is transforming the creative process and opening new possibilities for designers.",
    author: "Michael Chen",
    date: "February 28, 2024",
    readTime: "7 min read",
    tags: ["AI", "Technology", "Innovation"],
    imageUrl: "/api/placeholder/800/450",
    category: "Technology"
  },
  {
    id: 3,
    title: "Sustainable Design: Creating for a Better Tomorrow",
    excerpt: "Insights into how design can contribute to environmental sustainability and social responsibility.",
    author: "Emma Rodriguez",
    date: "January 20, 2024",
    readTime: "6 min read",
    tags: ["Sustainability", "Design Ethics"],
    imageUrl: "/api/placeholder/800/450",
    category: "Sustainability"
  }
];

// Featured post (could be the most recent or editorially selected)
const featuredPost = blogPosts[0];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            TIFDesign Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, trends, and stories from the world of design and creativity
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input 
              type="text" 
              placeholder="Search articles by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-96">
              <Image 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{featuredPost.date}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <Link 
                href={`/blog/${featuredPost.id}`} 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read More 
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-white border rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(prev => 
              prev < Math.ceil(filteredPosts.length / postsPerPage) ? prev + 1 : prev
            )}
            disabled={currentPage >= Math.ceil(filteredPosts.length / postsPerPage)}
            className="flex items-center px-4 py-2 bg-white border rounded-md disabled:opacity-50"
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}