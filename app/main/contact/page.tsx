
"use client"

import Contact from '@/app/components/global/Contact'
import Footer from '@/app/components/global/Footer'
import Hero from '@/app/components/global/Hero'
import Navbar from '@/app/components/global/Navbar'
import CustomIcon from '@/app/components/global/web-default/CustomIcon'
import H2 from '@/app/components/global/web-default/H2'
import React from 'react'
import { TfiLocationPin } from "react-icons/tfi";


function page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen font-mono overflow-x-hidden bg-center bg-no-repeat bg-cover " >
        <Hero title='Contact Us' />

        <Contact />
        <div className="overflow-hidden container-width resize-none rounde-lg h-[500px]">
          <div className="h-full w-full max-w-full">
            <iframe className="h-full w-full border-0 rounded-lg"
              src="https://www.google.com/maps/embed/v1/place?q=359+E+Corona+Rd,+Tucson,+AZ+85756,+United+States&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
          </div>

        </div>

        <Footer />
      </main>
    </>

  )
}

export default page