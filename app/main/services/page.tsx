
"use client"

import AboutTop from '@/app/components/global/AboutTop'
import ExpertTeam from '@/app/components/global/ExpertTeam'
import Faq from '@/app/components/global/FAQ'
import Features from '@/app/components/global/Features'
import Footer from '@/app/components/global/Footer'
import GetStarted from '@/app/components/global/GetStarted'
import Hero from '@/app/components/global/Hero'
import Navbar from '@/app/components/global/Navbar'
import React from 'react'

function page() {
  return (
    <>
     <Navbar />
    <main className="min-h-screen font-mono overflow-x-hidden bg-center bg-no-repeat bg-cover " >
      <Hero title='Services' />
      <Features />
      <GetStarted />
      <ExpertTeam/>
      <Faq />
      <Footer />
    </main>
    </>
   
  )
}

export default page