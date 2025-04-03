"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, DollarSign, Tag, Paperclip, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DetailPage = () => {
  const { id } = useParams();
  const { user, userLoading, refetchUser } = useCurrentUser();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/hire/designers/service/edit/${id}`);
  } 
  
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        toast.success("Service deleted successfully");
        // Navigate back to services list after successful deletion
        setTimeout(() => router.push("/hire/designers"), 1000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete service");
      }
    }
    catch (error) {
      console.error("Delete service error:", error);
      toast.error("An error occurred while deleting the service");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`, {
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? "Service not found" 
              : "Failed to fetch service"
          );
        }
        
        const data = await response.json();
        setService(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch service:", error);
        setError(error.message || "Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "in progress":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
      case "canceled":
        return "bg-red-200 text-red-800";
      case "open":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  if (userLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You must be logged in to view this page</p>
            <Button 
              onClick={() => router.push("/login")}
              className="px-6"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Check if service is an array and access the first element
  const serviceData = Array.isArray(service) ? service[0] : service;
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => router.back()}
      >
        &larr; Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Service Details</h1>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      
      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ) : serviceData ? (
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="pb-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{serviceData.title}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Tag className="h-4 w-4 mr-2" />
                  {serviceData.category?.name || "Uncategorized"}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(serviceData.status)}>
                {serviceData.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Budget</h3>
                    <p className="text-xl font-semibold">
                      ${typeof serviceData.budget === 'number' ? serviceData.budget.toLocaleString() : serviceData.budget}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-700">Deadline</h3>
                    <p>{formatDate(serviceData.deadline)}</p>
                  </div>
                </div>
                
                {serviceData.client && (
                  <div className="flex items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Client</h3>
                      <p>{serviceData.client.name}</p>
                    </div>
                  </div>
                )}
                
                {serviceData.maxRevisions && (
                  <div className="flex items-start">
                    <div>
                      <h3 className="font-medium text-gray-700">Max Revisions</h3>
                      <p>{serviceData.maxRevisions}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{serviceData.description || "No description provided"}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Paperclip className="h-5 w-5 mr-2 text-gray-500" />
                Attachments
              </h3>
              
              {serviceData.attachments && serviceData.attachments.length > 0 ? (
                <div className="grid gap-2 md:grid-cols-2">
                  {serviceData.attachments.map((attachment, index) => (
                    <a 
                      key={index}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="truncate">{attachment.name}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No attachments</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 flex flex-wrap justify-end gap-3 p-4">
            <Button variant="outline">Contact Client</Button>
            <Button>Request Service</Button>
            {user._id === (serviceData.client?._id || serviceData.userId) && (
              <>
                <Button onClick={handleEdit} variant="secondary">Edit</Button>
                <Button 
                  onClick={() => setShowDeleteDialog(true)} 
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="p-8 text-center text-gray-500">
          <p>No service details found</p>
        </Card>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailPage;