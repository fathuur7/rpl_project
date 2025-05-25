'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import Sidebar from '@/components/layouts/sidebar/Sidebar'
import Header from '@/components/layouts/header/Header'
import useCurrentUser from '@/hooks/useCurrentUser'

const DeliverableCreatePage = () => {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id;
  console.log('Order ID:', orderId)
  const { user, userLoading } = useCurrentUser()
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  
  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true)
        console.log('Fetching order details...')
        const response = await fetch(`http://localhost:5000/api/v1/orders/${orderId}`, {
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }
        
        const data = await response.json()
        setOrder(data)
        
        // Check if user is the designer for this order
        // if (user && data.designer && data.designer._id !== user._id) {
        //   setError('You are not authorized to submit deliverables for this order')
        // }
        
        // // Check if order status allows deliverable submission
        // if (!['in_progress', 'revision'].includes(data.status)) {
        //   setError('This order is not currently accepting deliverables')
        // }
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Failed to load order details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    if (orderId && user) {
      fetchOrderDetails()
    }
  }, [orderId, user])
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      // Create a preview URL for the file if it's an image
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setFilePreview(event.target.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setFilePreview(null)
      }
    }
  }
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a file to upload')
      return
    }
    
    setSubmitting(true)
    setError(null)
    
    try {
      // Create FormData object for file upload
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('orderId', orderId)
      formDataToSubmit.append('title', formData.title)
      formDataToSubmit.append('description', formData.description)
      formDataToSubmit.append('file', file)
      
      const response = await fetch('http://localhost:5000/api/v1/deliverables', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSubmit,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit deliverable')
      }
      
      const data = await response.json()
      setSuccess(true)
      
      // Reset form
      setFormData({
        title: '',
        description: ''
      })
      setFile(null)
      setFilePreview(null)
      
      // Redirect after successful submission
      setTimeout(() => {
        router.push(`/orders/${orderId}`)
      }, 2000)
    } catch (err) {
      console.error('Error submitting deliverable:', err)
      setError(err.message || 'Failed to submit deliverable. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  
  // Get file size in human-readable format
  const getFileSize = (size) => {
    if (size < 1024) return `${size} bytes`
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header title="Submit Deliverable" user={user} />
          
          <main className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => router.push(`/orders/${orderId}`)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Return to Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                {success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h2 className="mt-3 text-lg font-medium text-green-800">Deliverable submitted successfully!</h2>
                    <p className="mt-2 text-sm text-green-600">
                      Your deliverable has been submitted and is now pending review.
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      Redirecting to order page...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Order information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">Order Information</h2>
                      {order && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Order ID</p>
                            <p className="font-medium">{order._id}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Service</p>
                            <p className="font-medium">{order.service?.title || 'Unknown Service'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Client</p>
                            <p className="font-medium">{order.client?.name || 'Unknown Client'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-medium capitalize">{order.status?.replace('_', ' ')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Deliverable form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-6">Submit Deliverable</h2>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., Final Logo Design, Website Mockup, Revision 1"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Describe what you're delivering and any specific notes for the client..."
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload File *
                          </label>
                          
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              {filePreview ? (
                                <div className="flex flex-col items-center">
                                  <img 
                                    src={filePreview} 
                                    alt="File preview" 
                                    className="max-h-40 mb-3"
                                  />
                                  <p className="text-sm text-gray-500">
                                    {file.name} ({getFileSize(file.size)})
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                      <span>Upload a file</span>
                                      <input 
                                        id="file-upload" 
                                        name="file-upload" 
                                        type="file" 
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        required
                                      />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    Any file up to 10MB
                                  </p>
                                </>
                              )}
                              
                              {file && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFile(null)
                                    setFilePreview(null)
                                  }}
                                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remove file
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => router.push(`/orders/${orderId}`)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitting || !file}
                            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                              (submitting || !file) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {submitting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" stroke="currentColor"></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              'Submit Deliverable'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DeliverableCreatePage