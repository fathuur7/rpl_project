'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download } from 'lucide-react';

const DownloadPage = () => {
  const { id } = useParams();
  const [downloadStatus, setDownloadStatus] = useState('pending'); // 'pending', 'downloading', 'completed', 'failed'
  const [errorMessage, setErrorMessage] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    // Auto-download when component mounts
    if (id) {
      handleDownloadFile(id);
    }
  }, [id]);

  const trackDownload = async (fileId) => {
    try {
      // Send a tracking request to the backend
      await fetch(`http://localhost:5000/api/v1/deliverables/${fileId}/track`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Download tracked successfully');
    } catch (error) {
      console.error('Error tracking download:', error);
      // Non-critical error, don't affect the download flow
    }
  };

  const handleDownloadFile = async (fileId) => {
    try {
      setDownloadStatus('downloading');
      
      // Get the file information first to get the fileUrl if needed
      const fileInfoResponse = await fetch(`http://localhost:5000/api/v1/deliverables/${fileId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!fileInfoResponse.ok) {
        throw new Error(`Failed to fetch file information: ${fileInfoResponse.status}`);
      }
      
      const fileInfoData = await fileInfoResponse.json();
      const fileData = fileInfoData.data;
      setFileInfo(fileData);
      
      // Track the download
      await trackDownload(fileId);
      
      // Fixing the typo in the URL: "donwload" -> "download"
      const response = await fetch(`http://localhost:5000/api/v1/deliverables/${fileId}/download`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
      }
      
      // Extract filename from the headers or use the one from fileInfo
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : null;
      }
      
      if (!filename && fileData.fileName) {
        // Use the fileName from the fileInfo
        filename = fileData.fileName;
      } else if (!filename && fileData.fileUrl) {
        // Extract filename from the URL as fallback
        const urlParts = fileData.fileUrl.split('/');
        filename = urlParts[urlParts.length - 1].split('?')[0]; // Remove query parameters
        // Decode URL-encoded characters
        filename = decodeURIComponent(filename);
      }
      
      if (!filename) {
        // Fix typo in "tilte" -> "title" and provide a default extension
        filename = `deliverable-${fileData.title || fileId}.file`;
      }
      
      // Convert the response to blob
      const blob = await response.blob();
      
      // Get the correct MIME type from response or use a default
      const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
      const blobWithType = new Blob([blob], { type: contentType });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blobWithType);
      
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setDownloadStatus('completed');
      
    } catch (error) {
      console.error('Error downloading file:', error);
      setErrorMessage(error.message || 'Failed to download file');
      setDownloadStatus('failed');
    }
  };

  const getStatusMessage = () => {
    switch (downloadStatus) {
      case 'pending':
        return 'Preparing to download...';
      case 'downloading':
        return 'Downloading file...';
      case 'completed':
        return `Download completed! ${fileInfo?.title || 'Your file'} has been downloaded.`;
      case 'failed':
        return `Download failed: ${errorMessage}`;
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">File Download</h1>
        
        <div className="flex items-center justify-center mb-4">
          {downloadStatus === 'downloading' ? (
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          ) : downloadStatus === 'completed' ? (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
          ) : downloadStatus === 'failed' ? (
            <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white">✗</div>
          ) : (
            <Download className="h-8 w-8 text-blue-500" />
          )}
        </div>
        
        <p className="text-center text-gray-700 mb-6">{getStatusMessage()}</p>
        
        {downloadStatus === 'failed' && (
          <button 
            onClick={() => handleDownloadFile(id)}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
        
        {downloadStatus === 'completed' && (
          <div className="space-y-2">
            <button 
              onClick={() => handleDownloadFile(id)}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Again
            </button>
            
            <button 
              onClick={() => window.close()}
              className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;