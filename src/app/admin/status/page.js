
'use client'
import React from 'react'
import Services from '@/components/explore/services/service'
import Sidebar from '@/components/layouts/sidebar/Sidebar'
import Header from '@/components/layouts/header/Header'
import useCurrentUser from '@/hooks/useCurrentUser'

const page = () => {
  const { user, userLoading } = useCurrentUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
      
      <div className="flex-1">
        <Header title="Services Management" user={user} />
        <Services />
      </div>
    </div>
  </div>
  )
}

export default page
