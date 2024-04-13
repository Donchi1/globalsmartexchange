import React from 'react'
import H2 from './web-default/H2'
import Breadcrumb from './web-default/Breadcrumb'

function Hero({title}:{title: string}) {
  return (
    <section className='bg-center bg-no-repeat bg-cover min-h-[50vh] w-full hero_bg relative' >
      <div className='h-[50vh] flex justify-center items-center '>
        <H2 className='!uppercase'>{title}</H2>
        <Breadcrumb notFound={title.toLowerCase() == "not found" ?"not found": "" } />
      </div>
    </section>
  )
}

export default Hero