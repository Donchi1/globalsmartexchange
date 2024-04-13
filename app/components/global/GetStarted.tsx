import Image from 'next/image'
import React from 'react'
import Text from './web-default/Text'
import H2 from './web-default/H2'
import H1 from './web-default/H1'
import { IconButton } from './web-default/Buttons'
import CustomIcon from './web-default/CustomIcon'
import { BsPersonPlus } from 'react-icons/bs'
import { MdLogin, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6"

function GetStarted() {
    return (
        <section className="w-full min-h-screen  pb-10 pt-6" >
            <div className='container-width flex justify-between gap-16 items-baseline lg:items-center flex-col lg:flex-row '>
                <div className='flex-1 w-full lg:w-[50%'>
                    <Image className='w-full h-full' src="/imgs/getstarted.png" width={400} height={500} alt='about' />
                </div>
                <div className=' space-y-6 flex-1 w-full lg:w-[50%]' >
                    <div className='flex gap-2 items-center'>
                        <Text className='!text-main-color !font-[600]' >Easy Steps</Text>
                        <span className='h-px w-[100px] inline-block bg-gradient-to-tr from-main-color to-sec-bg '></span>
                    </div>
                    <div className='space-y-4'>
                        <H2 className='!text-3xl' >You can easily catch up</H2>
                        <H1 className='!text-5xl whitespace-pre-line'  >Just Few Steps</H1>
                    </div>
                    <Text className='' >Follow these few steps to get started in our platform with ease. </Text>
                    <div className='flex flex-col lg:flex-row lg:items-center items-baseline gap-6'>
                        <div className='space-y-4' >
                            <div className='flex items-center gap-4'>
                                <CustomIcon color={9} className='!bg-main-color !w-12 h-12 ' icon={<BsPersonPlus size={30} />} />
                                <H2 className='!text-[20px]'> Register a new account </H2>
                            </div>
                            <div className='flex items-center gap-4'>
                                <CustomIcon color={7} className=' !w-12 h-12 ' icon={<MdLogin size={30} />} />
                                <H2 className='!text-[20px]'  >Login Your account </H2>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-center gap-4'>
                                <CustomIcon color={5} className=' !w-12 h-12 ' icon={<MdOutlineAccountBalanceWallet size={30} />} />
                                <H2 className='!text-[20px]'  >Link Your wallet</H2>
                            </div>
                            <div className='flex items-center gap-4'>
                                <CustomIcon color={2} className=' !w-12 h-12 ' icon={<FaHandHoldingDollar size={30} />} />
                                <H2 className='!text-[20px]' >Start Earning </H2>
                            </div>
                        </div>
                    </div>
                    <div className='!mt-10'>
                        <IconButton className="" title="Get Started Now" onClick={() => location.assign("/auth/login")} />
                    </div>

                </div>
            </div>

        </section>
    )
}

export default GetStarted