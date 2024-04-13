import React from 'react'
import ContentHeader from './web-default/ContentHeader'
import Image from 'next/image'
import Card from './web-default/Card'
import H2 from './web-default/H2'
import Text from './web-default/Text'
import * as Icons from "react-icons/fa6"

function ExpertTeam() {
  return (
    <section className='min-h-screen py-20 w-full '  >
      <div className='container-width'>
      <ContentHeader  text='Our smart and expert teams ready to assist you at any time' title='Our Awesome Team Members' caption='Expert Teams' />
       <div className='grid grid-rows-subgrid  lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4'>
        <Card className='!px-0 !py-0 !pb-4 !translate-y-0 !w-full lg:w-auto '>
          <div>
            <div className='-mb-20 bg-center bg-cover rounded-t-lg h-[150px] bg-no-repeat' style={{backgroundImage: "url(/imgs/team-bg-top.png)"}}>
            </div>
            <div className='flex justify-center items-center'>
            <Image className='size-[150px] rounded-full border-b-gray-800 border-4 border-main-color' src="/imgs/account_manager.jpg" width={400} height={400} alt='Team' />
            </div>
            <div className='text-center space-y-8 pt-4 pb-6'>
              
              <div className='space-y-2 mb-4'>
              <H2 className='!text-[18px] mt-2'>Frederick G Zixin</H2>
              <Text className='!text-main-color !font-bold'>
                Account Manager
              </Text>
              <span className='mx-auto h-6 my w-[2px] block bg-gradient-to-b from-main-color to-gray-800'></span>
              </div>
              <div className='flex justify-center *:transition-colors *:ease-linear *:duration-500 items-center gap-5 text-white *:cursor-pointer '>
                <Icons.FaFacebookF className='hover:text-main-color'  />
                <Icons.FaTwitter className='hover:text-main-color'  />
                <Icons.FaInstagram className='hover:text-main-color'  />
                <Icons.FaLinkedinIn className='hover:text-main-color'  />
              </div>
            </div>
          </div>
        </Card>
        <Card className='!px-0 !py-0 !pb-4 !translate-y-0 !w-full lg:w-auto'>
          <div>
            <div className='-mb-20 bg-center bg-cover rounded-t-lg h-[150px] bg-no-repeat' style={{backgroundImage: "url(/imgs/team-bg-top1.png)"}}>
            </div>
            <div className='flex justify-center items-center'>
            <Image className='size-[150px] rounded-full border-b-gray-800 border-4 border-[#eea56a]' src="/imgs/accountant.jpg" width={400} height={400} alt='Team' />
            </div>
            <div className='text-center space-y-8 pt-4 pb-6'>
              
              <div className='space-y-2 mb-4'>
              <H2 className='!text-[18px] mt-2'>Josephine M Monah</H2>
              <Text className='!text-main-color !font-bold'>
                Accountant
              </Text>
              <span className='mx-auto h-6 my w-[2px] block bg-gradient-to-b from-main-color to-gray-800'></span>
              </div>
              <div className='flex justify-center *:transition-colors *:ease-linear *:duration-500 items-center gap-5 text-white *:cursor-pointer '>
                <Icons.FaFacebookF className='hover:text-main-color'  />
                <Icons.FaTwitter className='hover:text-main-color'  />
                <Icons.FaInstagram className='hover:text-main-color'  />
                <Icons.FaLinkedinIn className='hover:text-main-color'  />
              </div>
            </div>
          </div>
        </Card>
        <Card className='!px-0 !py-0 !pb-4 !translate-y-0 !w-full lg:w-auto'>
          <div>
            <div className='-mb-20 bg-center bg-cover rounded-t-lg h-[150px] bg-no-repeat' style={{backgroundImage: "url(/imgs/team-bg-top2.png)"}}>
            </div>
            <div className='flex justify-center items-center'>
            <Image className='size-[150px] rounded-full border-b-gray-800 border-4 border-[#17a2b8]' src="/imgs/project_manager.jpg" width={400} height={400} alt='Team' />
            </div>
            <div className='text-center space-y-8 pt-4 pb-6'>
              
              <div className='space-y-2 mb-4'>
              <H2 className='!text-[18px] mt-2'>Julia K Smith</H2>
              <Text className='!text-main-color !font-bold'>
                Project Manager 
              </Text>
              <span className='mx-auto h-6 my w-[2px] block bg-gradient-to-b from-main-color to-gray-800'></span>
              </div>
              <div className='flex justify-center *:transition-colors *:ease-linear *:duration-500 items-center gap-5 text-white *:cursor-pointer '>
                <Icons.FaFacebookF className='hover:text-main-color'  />
                <Icons.FaTwitter className='hover:text-main-color'  />
                <Icons.FaInstagram className='hover:text-main-color'  />
                <Icons.FaLinkedinIn className='hover:text-main-color'  />
              </div>
            </div>
          </div>
        </Card>
        <Card className='!px-0 !py-0 !pb-4 !translate-y-0 !w-full lg:w-auto'>
          <div>
            <div className='-mb-20 bg-center bg-cover rounded-t-lg h-[150px] bg-no-repeat' style={{backgroundImage: "url(/imgs/team-bg-top3.png)"}}>
            </div>
            <div className='flex justify-center items-center'>
            <Image className='size-[150px] rounded-full border-b-gray-800 border-4 border-[#b56ad3]' src="/imgs/blockchain_developer.jpg" width={400} height={400} alt='Team' />
            </div>
            <div className='text-center space-y-8 pt-4 pb-6'>
              
              <div className='space-y-2 mb-4'>
              <H2 className='!text-[18px] mt-2'>Alex P Connor</H2>
              <Text className='!text-main-color !font-bold'>
                Blockchain Developer
              </Text>
              <span className='mx-auto h-6 my w-[2px] block bg-gradient-to-b from-main-color to-gray-800'></span>
              </div>
              <div className='flex justify-center *:transition-colors *:ease-linear *:duration-500 items-center gap-5 text-white *:cursor-pointer '>
                <Icons.FaFacebookF className='hover:text-main-color'  />
                <Icons.FaTwitter className='hover:text-main-color'  />
                <Icons.FaInstagram className='hover:text-main-color'  />
                <Icons.FaLinkedinIn className='hover:text-main-color'  />
              </div>
            </div>
          </div>
        </Card>
       </div>
      </div>
    </section>
  )
}

export default ExpertTeam