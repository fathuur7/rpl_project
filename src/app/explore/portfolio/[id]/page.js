'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, FileText, Clock, CheckCircle } from 'lucide-react'

const PortfolioDetailPage = () => {
  const params = useParams()
  const portfolioId = params.id
  
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/v1/portfolios/public/${portfolioId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.status}`)
        }
        
        const result = await response.json()
        setPortfolio(result.data)
      } catch (error) {
        console.error('Error fetching portfolio details:', error)
        setError(error.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    if (portfolioId) {
      fetchPortfolioDetail()
    }
  }, [portfolioId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-medium">Loading portfolio details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 text-lg font-medium mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link 
            href="/explore"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-medium mb-2">Portfolio not found</h2>
          <p className="text-gray-600">The portfolio you are looking for does not exist or has been removed.</p>
          <Link 
            href="/explore"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Portfolios
          </Link>
        </div>
      </div>
    )
  }

  // Get order details if available from deliverable -> orderId
  const orderDetails = portfolio.deliverable?.orderId || null

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/explore" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to explore
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">{portfolio.title}</h1>
          
          <div className="flex flex-wrap items-center mt-3 gap-4 text-gray-500">
            {portfolio.user && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>By {portfolio.user.name || 'Unknown Designer'}</span>
              </div>
            )}
            
            {portfolio.createdAt && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(portfolio.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            
            {orderDetails?.category && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{orderDetails.category}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Portfolio Image */}
          {portfolio.thumbnailUrl ? (
            <div className="h-96 bg-gray-200 relative">
              <img 
                src={portfolio.thumbnailUrl} 
                alt={portfolio.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No cover image available</span>
            </div>
          )}
          
          {/* Portfolio Details */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {portfolio.description || orderDetails?.description || 'No description provided.'}
              </p>
            </div>
            
            {/* Project Information */}
            {orderDetails && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-blue-700 font-medium">Project Title</h3>
                    <p className="text-gray-800">{orderDetails.title || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-blue-700 font-medium">Category</h3>
                    <p className="text-gray-800">{orderDetails.category || 'Not specified'}</p>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-blue-700 font-medium">Project Description</h3>
                    <p className="text-gray-800">{orderDetails.description || 'No description available'}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Deliverable Information */}
            {portfolio.deliverable && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Deliverable</h2>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Title</h3>
                      <p>{portfolio.deliverable.title || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Status</h3>
                      <div className="flex items-center">
                        <CheckCircle 
                          className={`h-4 w-4 mr-1 ${
                            portfolio.deliverable.status === 'completed' 
                              ? 'text-green-500' 
                              : portfolio.deliverable.status === 'in-progress'
                                ? 'text-yellow-500'
                                : 'text-gray-500'
                          }`} 
                        />
                        <span className="capitalize">{portfolio.deliverable.status || 'Not specified'}</span>
                      </div>
                    </div>
                    
                    {portfolio.deliverable.submittedAt && (
                      <div>
                        <h3 className="font-medium text-gray-700">Submitted</h3>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{new Date(portfolio.deliverable.submittedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    
                    {portfolio.deliverable.description && (
                      <div className="col-span-1 md:col-span-2">
                        <h3 className="font-medium text-gray-700">Description</h3>
                        <p className="text-gray-600">{portfolio.deliverable.description}</p>
                      </div>
                    )}
                    
                    {portfolio.deliverable.feedback && (
                      <div className="col-span-1 md:col-span-2">
                        <h3 className="font-medium text-gray-700">Feedback</h3>
                        <div className="mt-2 bg-yellow-50 border border-yellow-100 p-3 rounded">
                          <p className="italic text-gray-700">{portfolio.deliverable.feedback}</p>
                        </div>
                      </div>
                    )}
                    
                    {portfolio.deliverable.fileUrl && (
                      <div className="col-span-1 md:col-span-2">
                        <h3 className="font-medium text-gray-700 mb-2">File</h3>
                        <a 
                          href={portfolio.deliverable.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View or Download File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Designer Info */}
            {portfolio.user && (
              <div>
                <h2 className="text-xl font-semibold mb-4">About the Designer</h2>
                <div className="flex items-center p-4 border rounded-lg bg-gray-50">
                  <div className="h-16 w-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                    {portfolio.user.profilePicture ? (
                      <img 
                        src={portfolio.user.profilePicture}
                        alt={portfolio.user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-300">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{portfolio.user.name}</h3>
                    <p className="text-gray-600">{portfolio.user.email}</p>
                    {portfolio.user.bio && (
                      <p className="text-gray-600 mt-1">{portfolio.user.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailPage