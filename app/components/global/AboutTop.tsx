import Image from 'next/image'
import React from 'react'
import Text from './web-default/Text'
import H2 from './web-default/H2'
import H1 from './web-default/H1'
import { IconButton } from './web-default/Buttons'

function AboutTop() {
    return (
        <section className='min-h-screen w-full py-20 ' >
            <div className='container-width flex justify-between items-baseline lg:items-center flex-col lg:flex-row '>
                <div className='flex-1 w-full lg:w-[50%'>
                    <Image className='w-full h-full' src="/imgs/Home-about.png" width={400} height={500} alt='about' />
                </div>
                <div className='flex-1 w-full lg:w-[50%] space-y-8 ' >
                    <div className='flex gap-2 items-center'>
                        <Text className='!text-main-color !font-[600]' > What is Global Smart Exchange</Text>
                        <span className='h-px w-[100px] inline-block bg-gradient-to-tr from-main-color to-sec-bg '></span>
                    </div>
                    <div className='space-y-4'>
                        <H2 className='!text-3xl'> We built a global platform</H2>
                        <H1 className='!text-5xl whitespace-pre-line' >For crypto investment</H1>
                    </div>
                    <Text className='' >At Global Smart Exchange, we're pioneering a new era of digital asset management and trading. With a mission to democratize access to cryptocurrency and blockchain technology, we provide a secure, transparent, and user-friendly platform for individuals and institutions alike.</Text>
                    <Text  >Global Smart Exchange is not just another crypto exchange; it's a comprehensive ecosystem designed to cater to the diverse needs of both novice and experienced cryptocurrency enthusiasts. Here's a deeper dive into what sets us apart</Text>
                    <IconButton className="" title="Read More" onClick={() => location.assign("about")} />
                </div>
            </div>

        </section>
    )
}

export default AboutTop