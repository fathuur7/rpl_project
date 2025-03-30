// pages/hire/status.js

'use client';
import { useState, useEffect } from 'react';
import { CardAction,Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function StatusPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services from your API
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services',{
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        console.log("Fetched data:", data); // Debug log
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to determine badge color based on status
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-500';
    
    const statusText = typeof status === 'object' && status.name 
      ? status.name.toLowerCase() 
      : String(status).toLowerCase();
    
    switch (statusText) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Function to format deadline to readable date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return String(dateString);
    }
  };

  // Function to safely get text value from potentially nested objects
  const getTextValue = (value) => {
    if (!value) return 'Not specified';
    if (typeof value === 'object' && value.name) return value.name;
    return String(value);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Project Status</h1>
        <p className="text-gray-500 mt-2">Track all your ongoing and completed projects</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="ml-2">Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          <p>Error: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={service._id || index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>
                      Category: {getTextValue(service.category)}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {getTextValue(service.status || 'New')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-sm">{service.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Budget</p>
                      <p className="text-sm">${service.budget || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Deadline</p>
                      <p className="text-sm">{formatDate(service.deadline)}</p>
                    </div>
                  </div>
                  
                  {service.progress !== undefined && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Progress</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${service.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1">{service.progress || 0}%</p>
                    </div>
                  )}
                  
                  {service.attachments && service.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Attachments</p>
                      <p className="text-sm">{service.attachments.length} file(s) attached</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <CardAction>
                  <Button asChild>
                    <Link href={`/hire/designers/service/${service._id}`}>View</Link>
                  </Button>
                </CardAction>
              </CardFooter>
            </Card>
          ))}
          
          {services.length === 0 && (
            <div className="col-span-full p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">No projects found. Start a new project to see it here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}