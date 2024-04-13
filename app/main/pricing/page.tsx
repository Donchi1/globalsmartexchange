
"use client"

import AboutTop from '@/app/components/global/AboutTop'
import ExpertTeam from '@/app/components/global/ExpertTeam'
import Faq from '@/app/components/global/FAQ'
import Features from '@/app/components/global/Features'
import Footer from '@/app/components/global/Footer'
import GetStarted from '@/app/components/global/GetStarted'
import Hero from '@/app/components/global/Hero'
import Navbar from '@/app/components/global/Navbar'
import Plans from '@/app/components/global/Plans'
import SinglePlan from '@/app/components/global/web-default/SinglePlan'
import React from 'react'

function page() {
  return (
    <>
     <Navbar />
    <main className="min-h-screen font-mono overflow-x-hidden bg-center bg-no-repeat bg-cover " >
      <Hero title='Investment Plans' />
      <Plans />
      <div
          className="flex justify-center container-width flex-col lg:flex-row items-center gap-8"
        >
          <SinglePlan price="$3000 - $11000" total="11000" title="Advanced" />
          <SinglePlan price="$6000 -$18555" total="18555" title="Special" />
          <SinglePlan price="$10000 -$30000" total="30000" title="Professional" />
        </div>
      <Faq />
      <Footer />
    </main>
    </>
   
  )
}

export default page