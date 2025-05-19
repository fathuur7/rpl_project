'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { User, ChevronLeft, ChevronRight } from 'lucide-react'

const ExplorePage = () => {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })

  const fetchPortfolios = async (page = 1, limit = 9) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/v1/portfolios/public?page=${page}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch portfolios: ${response.status}`)
      }
      
      const result = await response.json()
      setPortfolios(result.data || [])
      setPagination({
        currentPage: result.currentPage || 1,
        totalPages: result.totalPages || 1,
        count: result.count || 0
      })
    } catch (error) {
      console.error('Error fetching portfolios:', error)
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    fetchPortfolios(newPage)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-medium">Loading portfolios...</div>
      </div>
    )
  }

  if (error) {
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

  if (!portfolios.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-medium mb-2">No portfolios found</h2>
          <p className="text-gray-600">There are no public portfolios available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Portfolios</h1>
          <div className="text-gray-600">
            Showing <span className="font-medium">{pagination.count}</span> portfolios
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map(portfolio => (
            <Link 
              href={`/explore/portfolio/${portfolio._id}`}
              key={portfolio._id}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Portfolio Thumbnail */}
              <div className="h-48 bg-gray-200 relative">
                {portfolio.thumbnailUrl ? (
                  <img 
                    src={portfolio.thumbnailUrl} 
                    alt={portfolio.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <span className="text-white text-lg font-medium">{portfolio.title?.charAt(0) || 'P'}</span>
                  </div>
                )}
                
                {/* Category Tag */}
                {portfolio.deliverable?.orderId?.category && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {portfolio.deliverable.orderId.category}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2 line-clamp-1">{portfolio.title}</h2>
                
                {portfolio.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{portfolio.description}</p>
                )}
                
                {/* Project info if available */}
                {portfolio.deliverable?.orderId?.title && (
                  <div className="mb-4 text-sm bg-blue-50 p-2 rounded">
                    <span className="text-blue-700">Project: </span>
                    <span className="text-gray-700">{portfolio.deliverable.orderId.title}</span>
                  </div>
                )}
                
                {/* User info */}
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <div className="h-6 w-6 bg-gray-200 rounded-full overflow-hidden mr-2">
                    {portfolio.user?.profilePicture ? (
                      <img 
                        src={portfolio.user.profilePicture} 
                        alt={portfolio.user.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-300">
                        <User className="h-3 w-3 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <span>By {portfolio.user?.name || 'Unknown Designer'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`p-2 rounded-full ${
                  pagination.currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show current page, first, last, and pages around current
                  return (
                    page === 1 ||
                    page === pagination.totalPages ||
                    Math.abs(page - pagination.currentPage) <= 1
                  )
                })
                .map((page, index, array) => {
                  // Add ellipsis
                  const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1
                  const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1
                  
                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsisBefore && (
                        <span className="px-3 py-1 text-gray-500">...</span>
                      )}
                      
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          pagination.currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                      
                      {showEllipsisAfter && (
                        <span className="px-3 py-1 text-gray-500">...</span>
                      )}
                    </div>
                  )
                })}
              
              <button 
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`p-2 rounded-full ${
                  pagination.currentPage === pagination.totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage