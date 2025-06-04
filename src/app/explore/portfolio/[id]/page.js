'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, FileText, Clock, CheckCircle, Star, MessageCircle, ThumbsUp } from 'lucide-react'
import useCurrentUser from '@/hooks/useCurrentUser'

const PortfolioDetailPage = () => {
  const params = useParams()
  const portfolioId = params.id
  
  const { user } = useCurrentUser()
  console.log('Current User:', user)
  const [portfolio, setPortfolio] = useState(null)
  const [similarPortfolios, setSimilarPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ratings, setRatings] = useState([])
  const [ratingStats, setRatingStats] = useState({
    averageRating: 0,
    totalRatings: 0,
    ratingDistribution: []
  })
  
  // Rating form state
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [ratingForm, setRatingForm] = useState({
    rating: 0,
    comment: ''
  })
  const [submittingRating, setSubmittingRating] = useState(false)
  const [ratingError, setRatingError] = useState('')

  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/v1/portfolios/public/${portfolioId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Portfolio Detail:', result)
        
        if (result.data) {
          setPortfolio(result.data.portfolio)
          setSimilarPortfolios(result.data.similarPortfolios || [])
          
          // Set rating stats
          setRatingStats({
            averageRating: result.data.portfolio.averageRating || 0,
            totalRatings: result.data.portfolio.totalRatings || 0,
            ratingDistribution: result.data.portfolio.ratingDistribution || []
          })
          
          // Set ratings
          setRatings(result.data.portfolio.ratings || [])
        }
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

  // Check if current user can rate this portfolio
  const canRate = () => {
    if (!user || !portfolio) return false
    
    // User cannot rate their own portfolio  
    if (portfolio.user && portfolio.user._id === user._id) {
      return false
    }
    
    return true
  }

  // Check if user has already rated this portfolio
  const hasUserRated = () => {
    if (!user || !ratings) return false
    return ratings.some(rating => rating.user && rating.user._id === user._id)
  }

  const validateRatingForm = () => {
    setRatingError('')
    
    // Validate rating
    if (!ratingForm.rating || ratingForm.rating < 1 || ratingForm.rating > 5) {
      setRatingError('Please select a rating between 1 and 5 stars')
      return false
    }
    
    // Validate comment
    if (!ratingForm.comment || ratingForm.comment.trim().length === 0) {
      setRatingError('Please add a comment')
      return false
    }
    
    // Additional validation: comment length
    if (ratingForm.comment.trim().length < 10) {
      setRatingError('Comment must be at least 10 characters long')
      return false
    }
    
    if (ratingForm.comment.trim().length > 500) {
      setRatingError('Comment must be less than 500 characters')
      return false
    }
    
    return true
  }
  console.log('portfolio', portfolio)

  const handleRatingSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateRatingForm()) {
      return
    }
    
    // Check if user is logged in
    if (!user) {
      setRatingError('You must be logged in to rate a portfolio')
      return
    }
    
    // Check if user can rate
    if (!canRate()) {
      setRatingError('You cannot rate your own portfolio')
      return
    }

    try {
      setSubmittingRating(true)
      setRatingError('')
      
      const response = await fetch(`http://localhost:5000/api/v1/portfolios/${portfolioId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for auth
        body: JSON.stringify({
          rating: ratingForm.rating,
          comment: ratingForm.comment.trim()
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Update ratings and stats
        setRatings(result.data.portfolio.ratings || [])
        setRatingStats(prev => ({
          ...prev,
          averageRating: result.data.averageRating,
          totalRatings: result.data.totalRatings
        }))
        
        // Reset form
        setRatingForm({ rating: 0, comment: '' })
        setShowRatingForm(false)
        
        // Show success message
        alert(result.message || 'Rating submitted successfully!')
      } else {
        // Handle error from server
        setRatingError(result.message || 'Failed to submit rating')
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
      setRatingError('Network error. Please try again.')
    } finally {
      setSubmittingRating(false)
    }
  }

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    )
  }

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
            href="/home"
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
            href="/home"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Portfolios
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/home" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
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
                
                {portfolio.deliverable?.orderId?.category && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{portfolio.deliverable.orderId.category}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Rating Summary */}
            <div className="mt-4 lg:mt-0 lg:text-right">
              <div className="flex items-center justify-start lg:justify-end mb-2">
                {renderStars(Math.round(ratingStats.averageRating))}
                <span className="ml-2 text-lg font-semibold">
                  {ratingStats.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {ratingStats.totalRatings} {ratingStats.totalRatings === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
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
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
                {user && canRate() && !hasUserRated() && (
                  <button
                    onClick={() => setShowRatingForm(!showRatingForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Write a Review
                  </button>
                )}
                {user && canRate() && hasUserRated() && (
                  <button
                    onClick={() => setShowRatingForm(!showRatingForm)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Update Review
                  </button>
                )}
                {!user && (
                  <div className="text-gray-500 text-sm">
                    <Link href="/login" className="text-blue-600 hover:underline">
                      Login
                    </Link> to write a review
                  </div>
                )}
                {user && !canRate() && portfolio.user && portfolio.user._id === user._id && (
                  <div className="text-gray-500 text-sm">
                    You cannot rate your own portfolio
                  </div>
                )}
              </div>

              {/* Rating Form */}
              {showRatingForm && canRate() && (
                <form onSubmit={handleRatingSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  {ratingError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{ratingError}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating <span className="text-red-500">*</span>
                    </label>
                    {renderStars(ratingForm.rating, true, (star) => 
                      setRatingForm(prev => ({ ...prev, rating: star }))
                    )}
                    <p className="text-xs text-gray-500 mt-1">Click on stars to rate (1-5)</p>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Comment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={ratingForm.comment}
                      onChange={(e) => setRatingForm(prev => ({ ...prev, comment: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Share your thoughts about this portfolio... (minimum 10 characters)"
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {ratingForm.comment.length}/500 characters
                      {ratingForm.comment.length < 10 && ratingForm.comment.length > 0 && (
                        <span className="text-red-500 ml-2">
                          (minimum 10 characters required)
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={submittingRating}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingRating ? 'Submitting...' : hasUserRated() ? 'Update Review' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRatingForm(false)
                        setRatingForm({ rating: 0, comment: '' })
                        setRatingError('')
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              {ratings.length > 0 ? (
                <div className="space-y-4">
                  {ratings.slice(0, 5).map((rating, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
                          {rating.user?.profilePicture ? (
                            <img 
                              src={rating.user.profilePicture} 
                              alt={rating.user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {rating.user?.name || 'Anonymous'}
                                {user && rating.user && rating.user._id === user._id && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                    Your review
                                  </span>
                                )}
                              </h4>
                              {renderStars(rating.rating)}
                            </div>
                            <div className="text-right">
                              <span className="text-gray-500 text-sm">
                                {new Date(rating.createdAt).toLocaleDateString()}
                              </span>
                              {rating.updatedAt && rating.createdAt !== rating.updatedAt && (
                                <p className="text-xs text-gray-400">
                                  Updated: {new Date(rating.updatedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-700">{rating.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {ratings.length > 5 && (
                    <button className="w-full py-2 text-blue-600 hover:text-blue-800">
                      View all {ratings.length} reviews
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Be the first to review this portfolio!
                </p>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Designer Info */}
            {portfolio.user && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About the Designer</h2>
                <div className="flex items-center mb-4">
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
                  </div>
                </div>
                {portfolio.user.bio && (
                  <p className="text-gray-600">{portfolio.user.bio}</p>
                )}
              </div>
            )}

            {/* Similar Portfolios */}
            {similarPortfolios.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Similar Portfolios</h2>
                <div className="space-y-4">
                  {similarPortfolios.map((similar) => (
                    <Link 
                      key={similar._id}
                      href={`/explore/portfolio/${similar._id}`}
                      className="block hover:bg-gray-50 rounded-lg p-2 -m-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gray-200 rounded overflow-hidden">
                          {similar.thumbnailUrl ? (
                            <img 
                              src={similar.thumbnailUrl} 
                              alt={similar.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                              <span className="text-white text-xs font-medium">
                                {similar.title?.charAt(0) || 'P'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {similar.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            By {similar.user?.name}
                          </p>
                          <div className="flex items-center mt-1">
                            {renderStars(Math.round(similar.averageRating || 0))}
                            <span className="ml-1 text-xs text-gray-500">
                              ({similar.totalRatings || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
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