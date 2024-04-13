"use client"
import Layout from '@/app/components/global/Layout'
import ProfileCard from '@/app/components/global/ProfileCard'
import SettingsForm from '@/app/components/global/SettingsForm'
import FooterUser from '@/app/components/user/FooterUser'
import Sidebar from '@/app/components/user/Sidebar'
import UserHero from '@/app/components/user/UserHero'
import AdminNavbar from '@/app/components/user/UserNavbar'
import { useAuthStore } from '@/app/store/authStore'
import React from 'react'

function page() {
  const { currentUser } = useAuthStore()

  return (
    <>
      <AdminNavbar />

      <div className='flex'>

        <Sidebar />
        <Layout>
          <UserHero title='Profile' />
          <div className=" w-full">

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 ">
              <div className="xl:col-start-1 xl:col-end-4  mb-16 mb-lg-4 lg:mt-0 mt-8">
                <SettingsForm user={currentUser} />
              </div>
              <div className="xl:col-start-4 xl:col-end-6  mb-16 lg:mt-0 mt-8 ml-auto">
                <ProfileCard user={currentUser} />
              </div>

            </div>
          </div>
        </Layout>

      </div>

      <FooterUser />
    </>

  )
}

export default page