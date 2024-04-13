import Image from 'next/image'
import React from 'react'
import Text from './web-default/Text'
import H2 from './web-default/H2'
import { IconButton } from './web-default/Buttons'

function WhitePaper() {
  return (
    <section>
        <div className='flex justify-between flex-col lg:flex-row container-width'>
        <div className='basis-[50%] space-y-6 mb-6 lg:mb-0'>
            <Image className='rounded-md' src="/imgs/whitepaper.jpg" alt='White paper' width={500} height={500} />
            <div className='space-y-6'>
                <H2 className='!text-[18px]'>Download Our WhitePaper</H2>
                <a className='block' href='/imgs/whitepaper.jpg' download>
                <IconButton className="" title="Download Paper" onClick={() => {}} />
                </a>
                
            </div>
        </div>
        <div className='space-y-4 basis-[50%]'>
            <Text className='!text-[15px]'>
            <b className='text-main-color'>Advanced Security Measures:</b>{" "}
            We understand the importance of security in the crypto space. That's why we employ cutting-edge security protocols, including multi-factor authentication, cold storage solutions, and encryption techniques, to ensure that your assets are protected against any potential threats or breaches.
            </Text>
            <Text className='!text-[15px]'>
            <b className='text-main-color'>User-Friendly Interface:</b>{" "}
            Our platform is built with user experience in mind. Whether you're a seasoned trader or a complete beginner, you'll find our interface intuitive and easy to navigate. From account setup to executing trades, we strive to make every step of your journey seamless and hassle-free.
            </Text>
            {/* <Text className='!text-[15px]'>
            <b className='text-main-color'>Extensive Asset Selection:</b>
            At Global Smart Exchange, we believe in offering our users access to a wide range of digital assets. From well-established cryptocurrencies like Bitcoin and Ethereum to up-and-coming altcoins, our platform enables you to explore and invest in a diverse array of assets, empowering you to build a portfolio that aligns with your investment goals.
            </Text> */}
            <Text className='!text-[15px]'>
            <b className='text-main-color'>Innovative Trading Tools:</b> {" "}
            Stay ahead of the curve with our innovative trading tools and analytics. Whether you're interested in technical analysis, market sentiment, or fundamental research, our platform provides you with the tools and insights you need to make informed trading decisions. From customizable charts to real-time market data, we've got you covered.
            </Text>
            <Text className='!text-[15px]'>
            <b className='text-main-color'>Educational Resources:</b>{" "}
            We believe that education is key to fostering widespread adoption of cryptocurrency and blockchain technology. That's why we offer a wealth of educational resources, including articles, tutorials, and webinars, to help you deepen your understanding of the crypto market and hone your trading skills.
            </Text>
            {/* <Text className='!text-[15px]'>
            <b className='text-main-color'>Responsive Customer Support:</b>
            Need assistance? Our dedicated customer support team is available 24/7 to address any questions or concerns you may have. Whether you're experiencing technical difficulties or simply need guidance on using our platform, we're here to help.
            </Text> */}
        </div>
        </div>      
    </section>
  )
}

export default WhitePaper