
'use client'
import React from 'react'

import Sidebar from '@/components/layouts/sidebar/Sidebar'
import Header from '@/components/layouts/header/Header'
import useCurrentUser from '@/hooks/useCurrentUser'
import CategoriesPage from '@/components/category/crud'

const page = () => {
  const { user, userLoading } = useCurrentUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
      
      <div className="flex-1">
        <Header title="Category Management" user={user} />
        <CategoriesPage />
      </div>
    </div>
  </div>
  )
}

export default page
