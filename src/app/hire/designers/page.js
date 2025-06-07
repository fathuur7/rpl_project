// src/app/hire/designers/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {CardFooter, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { fetchCategories } from '@/services/categories';
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from '@/components/layouts/navbar/com'

const HireDesignerPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: null,
    attachments: [],
  });

  const [fileNames, setFileNames] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories. Please refresh the page and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // For each file, convert to base64 string
    const newFiles = [...formData.attachments];
    const newFileNames = [...fileNames];
    
    files.forEach(file => {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5MB limit`,
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newFiles.push(e.target.result);
        newFileNames.push(file.name);
        setFileNames([...newFileNames]);
        setFormData(prev => ({...prev, attachments: [...newFiles]}));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.title || !formData.category || !formData.description || !formData.budget || !formData.deadline) {
        throw new Error('Please fill all required fields');
      }

      // Prepare the service request data
      const serviceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        budget: Number(formData.budget),
        deadline: formData.deadline,
        attachments: formData.attachments, // Base64 encoded files
      };
      
      const response = await fetch('http://localhost:5000/api/v1/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
        credentials: 'include', // Include cookies for auth
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create service request');
      }
      
      const result = await response.json();
      
      toast.success('Service request created successfully');
      // Redirect to the service request page
      router.push(`/hire/designers/service/${result._id}`);
          
    } catch (error) {
      console.error('Error submitting request:', error);
      setError(error.message || "Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Page Header Component (inline)
  const PageHeader = () => (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Hire a Designer
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Connect with talented designers who can bring your vision to life. Fill out the form below to describe your project and find the perfect match for your needs.
      </p>
    </div>
  );

  return (
    <main className="flex flex-col px-8 py-8">
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <PageHeader />
        
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Design Service Request</CardTitle>
            <CardDescription>
              Fill out the form below to describe your design project and find the perfect designer.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col justify-center items-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <span className="text-gray-600">Loading form...</span>
              </div>
            ) : (
              <>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Title */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="E.g., Modern Logo Design for Tech Startup" 
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    {/* Design Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Design Category</Label>
                      <Select 
                        onValueChange={handleCategoryChange} 
                        value={formData.category}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select design category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Budget */}
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (USD)</Label>
                      <Input 
                        id="budget" 
                        name="budget" 
                        type="number" 
                        placeholder="Your budget for this project"
                        min="1"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Project Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Describe your project in detail. Include your requirements, preferences, and any specific details designers should know."
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="resize-y"
                    />
                  </div>
                  
                  {/* Deadline */}
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="deadline"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.deadline ? format(formData.deadline, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.deadline}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* File Attachments */}
                  <div className="space-y-2">
                    <Label htmlFor="attachments" className="flex items-center">
                      Reference Materials
                      <span className="text-sm text-gray-500 ml-2">(Optional, Max 5MB per file)</span>
                    </Label>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload').click()}
                        className="flex items-center"
                        disabled={isSubmitting}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                      </Button>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        multiple 
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                      />
                      <div className="text-sm text-gray-500">
                        {fileNames.length > 0 ? `${fileNames.length} file(s) selected` : "No files selected"}
                      </div>
                    </div>
                    
                    {/* Display uploaded file names */}
                    {fileNames.length > 0 && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Uploaded files:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {fileNames.map((name, index) => (
                            <li key={index} className="text-gray-700">{name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Max Revisions */}
                  <div className="space-y-2">
                    <Label htmlFor="attachments" className="flex items-center">
                      Max Revisions
                    </Label>
                    <span className="text-sm text-gray-500 ml-1">Maximum of 4 revisions allowed</span>
                  </div>
                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Design Request'
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button onClick={() => router.push("/home")} className="mr-2">
              Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </main>
  );
};

export default HireDesignerPage;