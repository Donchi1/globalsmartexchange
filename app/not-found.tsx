"use client"
import React from "react"
import H2 from "./components/global/web-default/H2"
import Navbar from "./components/global/Navbar"
import Hero from "./components/global/Hero"
import Text from "./components/global/web-default/Text"
import H1 from "./components/global/web-default/H1"
import Footer from "./components/global/Footer"



export default function Custom404() {
    return (
      <>
      <Navbar />
    <section>
    <Hero title='Not Found' />
        <div className="container-width bg-sec-bg flex justify-center rounded-lg items-center py-10 my-20">
          <div className="space-y-4 *:!text-center">
          <H1>404</H1>
          <H2 className="!text-red-500">Page not found!</H2>
          <Text>We could not find the page you are trying to access.</Text>
          </div>
          
        </div>
        <Footer />
    </section>
    </>
    )
  }