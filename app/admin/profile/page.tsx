"use client"
import SettingsForm from '@/app/components/global/SettingsForm'
import ProfileCard from '@/app/components/global/ProfileCard'
import AdminNavbar from '@/app/components/user/UserNavbar'
import Layout from '@/app/components/global/Layout'
import FooterAdmin from '@/app/components/admin/FooterAdmin'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import AdminHero from '@/app/components/admin/AdminHero'
import { useAuthStore } from '@/app/store/authStore'



export default function page() {

  const {currentUser} = useAuthStore()


  return (
    <>

      <AdminNavbar/>
     
    <div className='flex gap-8'>
    <AdminSidebar/>
    <div className='w-full'>
      <Layout>
      <AdminHero title='Profile' />

        <div className="c">
          <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
            <div className="xl:col-start-1 xl:col-end-5  mb-16 lg:mt-0 mt-8">
              <SettingsForm user={currentUser} />
            </div>
            <div className="xl:col-start-5 xl:col-end-7  mb-16 lg:mt-0 mt-8">
              <ProfileCard  user={currentUser} />
            </div>
          </div>
        </div>
      </Layout>
      <FooterAdmin/>
        </div>
        </div>
      
     
    </>
  )
}

