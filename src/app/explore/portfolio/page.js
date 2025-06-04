'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { User, ChevronLeft, ChevronRight, Star, Search, Filter, Grid, List } from 'lucide-react'

const ExplorePage = () => {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [featuredPortfolios, setFeaturedPortfolios] = useState([])
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    count: 0,
    totalPortfolios: 0
  })

  // Filter and search state
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sortBy: 'newest'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const fetchPortfolios = async (page = 1, limit = 9, currentFilters = filters) => {
    try {
      setLoading(true)
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy: currentFilters.sortBy
      })
      
      if (currentFilters.category && currentFilters.category !== 'all') {
        params.append('category', currentFilters.category)
      }
      
      if (currentFilters.search.trim()) {
        params.append('search', currentFilters.search.trim())
      }
      
      const response = await fetch(`http://localhost:5000/api/v1/portfolios/public?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch portfolios: ${response.status}`)
      }
      
      const result = await response.json()
      setPortfolios(result.data || [])
      setPagination({
        currentPage: result.currentPage || 1,
        totalPages: result.totalPages || 1,
        count: result.count || 0,
        totalPortfolios: result.totalPortfolios || 0
      })
    } catch (error) {
      console.error('Error fetching portfolios:', error)
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/portfolios/categories')
      if (response.ok) {
        const result = await response.json()
        setCategories(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchFeaturedPortfolios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/portfolios/featured?limit=3')
      if (response.ok) {
        const result = await response.json()
        setFeaturedPortfolios(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching featured portfolios:', error)
    }
  }

  useEffect(() => {
    fetchPortfolios()
    fetchCategories()
    fetchFeaturedPortfolios()
  }, [])

  useEffect(() => {
    fetchPortfolios(1, 9, filters)
  }, [filters])

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    fetchPortfolios(newPage, 9, filters)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchPortfolios(1, 9, filters)
  }

  const renderStars = (rating, showCount = false, count = 0) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        {showCount && (
          <span className="text-sm text-gray-500">({count})</span>
        )}
      </div>
    )
  }
  
  console.log('Portfolios:', portfolios)

  if (loading && portfolios.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-medium">Loading portfolios...</div>
      </div>
    )
  }

  if (error && portfolios.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 text-lg font-medium mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => fetchPortfolios(1)}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Design Portfolios
          </h1>
          <p className="text-gray-600">
            Discover amazing design works from talented designers
          </p>
        </div>

        {/* Featured Portfolios Section */}
        {featuredPortfolios.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPortfolios.map((portfolio) => (
                <Link key={portfolio._id} href={`/explore/portfolio/${portfolio._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-200 relative">
                      {portfolio.thumbnailUrl ? (
                        <img
                          src={portfolio.thumbnailUrl}
                          alt={portfolio.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <span>No Preview</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            {portfolio.user?.profilePicture ? (
                              <img
                                src={portfolio.user.profilePicture}
                                alt={portfolio.user.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-3 w-3 text-gray-500" />
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            {portfolio.user?.name}
                          </span>
                        </div>
                        {portfolio.category && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {portfolio.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        {renderStars(portfolio.averageRating, true, portfolio.totalRatings)}
                        <span className="text-sm text-gray-500">
                          {new Date(portfolio.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search portfolios..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="flex items-center space-x-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>

                {/* Results Info */}
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    Showing {pagination.count} of {pagination.totalPortfolios} portfolios
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State for Filter Changes */}
        {loading && portfolios.length > 0 && (
          <div className="text-center py-4">
            <div className="text-gray-600">Updating results...</div>
          </div>
        )}

        {/* Portfolios Grid/List */}
        {portfolios.length > 0 ? (
          <div className={`mb-8 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
          }`}>
            {portfolios.map((portfolio) => (
              <Link key={portfolio._id} href={`/explore/portfolio/${portfolio._id}`}>
                <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`bg-gray-200 relative ${
                    viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-video'
                  }`}>
                    {portfolio.thumbnailUrl ? (
                      <img
                        src={portfolio.thumbnailUrl}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span>No Preview</span>
                      </div>
                    )}
                    {portfolio.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {portfolio.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {portfolio.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          {portfolio.user?.profilePicture ? (
                            <img
                              src={portfolio.user.profilePicture}
                              alt={portfolio.user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-3 w-3 text-gray-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">
                          {portfolio.user?.name}
                        </span>
                      </div>
                      {portfolio.deliverable?.orderId?.category && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {portfolio.deliverable.orderId.category}
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {portfolio.tags && portfolio.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {portfolio.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                        {portfolio.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{portfolio.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {renderStars(portfolio.averageRating, true, portfolio.totalRatings)}
                      <span className="text-sm text-gray-500">
                        {new Date(portfolio.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No portfolios found</div>
              <p className="text-gray-400">
                Try adjusting your filters or search terms
              </p>
            </div>
          )
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i
                } else {
                  pageNum = pagination.currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 border rounded-lg ${
                      pageNum === pagination.currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage