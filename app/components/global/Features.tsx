import React from 'react'
import ContentHeader from './web-default/ContentHeader'
import Card from './web-default/Card'
import { CiLock, CiDatabase } from "react-icons/ci";
import { FaGlobe } from 'react-icons/fa6';
import { BsCashCoin, BsGift } from "react-icons/bs"
import { MdOutlinePayments } from "react-icons/md";
import CustomIcon, { colorsList } from './web-default/CustomIcon';
import H2 from './web-default/H2';
import Text from './web-default/Text';


function Features() {
  return (
    <section className='min-h-screen py-20'>
      <div className='container-width'>
        <ContentHeader text='View All global smart exchange features that makes us reliable and awesome' title='Global Smart Exchange Features' caption='Smart Features' />
        <div className='grid grid-rows-subgrid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 '>
          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={7} icon={<BsCashCoin size={40} />} />
                <span style={{ backgroundColor: colorsList[7] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Early Bonus Cash
                </H2>
                <Text className='!text-[15px]' >
                  We offer you with a good amount of withdrawable bonus just after your registration.
                </Text>
              </div>
            </div>
          </Card>
          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={2} icon={<MdOutlinePayments size={40} />} />
                <span style={{ backgroundColor: colorsList[2] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Secured Payment
                </H2>
                <Text className='!text-[15px]' >
                  We provide a secured and reliable means of payment, making sure our customers are protected.
                </Text>
              </div>
            </div>
          </Card>
          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={3} icon={<FaGlobe size={40} />} />
                <span style={{ backgroundColor: colorsList[3] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Universal Access
                </H2>
                <Text className='!text-[15px]' >
                  Our platform can easily be accessed from any part of the world, so you don't have to worry about your current location.
                </Text>
              </div>
            </div>
          </Card>

          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={4} icon={<BsGift size={40} />} />
                <span style={{ backgroundColor: colorsList[4] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Low Cost
                </H2>
                <Text className='!text-[15px]' >
                  It basically cost nothing to join our platform. So you don't have to worry about any hidden fees.
                </Text>
              </div>
            </div>
          </Card>

          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={5} icon={<CiLock size={40} />} />
                <span style={{ backgroundColor: colorsList[5] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Safe And Secured
                </H2>
                <Text className='!text-[15px]' >
                  We provide a safe and secured trading and investment environment with our team always there to guide you.
                </Text>
              </div>
            </div>
          </Card>

          <Card className='group !w-auto'>
            <div>
              <div className='flex flex-col items-center justify-center gap-3 '>
                <CustomIcon className={`!w-[80px] !h-[80px] group-hover:shadow-3xl group-hover:shadow-main-color`} color={1} icon={<CiDatabase size={40} />} />
                <span style={{ backgroundColor: colorsList[1] }} className={`!bg-gradient-to-b !from-inherit !to-black  w-[2px] h-7 inline-block text-center`}></span>
              </div>
              <div className='text-center flex flex-col gap-3 mt-2'>
                <H2 className='!text-2xl'>
                  Fast Data Processing
                </H2>
                <Text className='!text-[15px]' >
                  All client informations, transactions, trading and investment are processed so fast with our special gateway.
                </Text>
              </div>
            </div>
          </Card>


        </div>
      </div>


    </section>
  )
}

export default Features