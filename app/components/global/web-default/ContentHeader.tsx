import React from 'react'
import Text from './Text'
import H2 from './H2'


interface ContentHeaderInterface {
    caption: string
    title: string
    text: string
}

function ContentHeader({ caption, title, text }: ContentHeaderInterface) {
    return (
        <div className='lg:w-[60%] w-full mx-auto  text-center space-y-4 mb-20 '>
            <div className='flex gap-2 items-center justify-center'>
                <span className='h-px w-[100px] inline-block bg-gradient-to-tl from-main-color to-sec-bg '></span>
                <Text className='!text-main-color !font-[600]' >{caption}</Text>
                <span className='h-px w-[100px] inline-block bg-gradient-to-tr from-main-color to-sec-bg '></span>
            </div>
            <H2 className='!text-3xl' >{title}</H2>
            <Text className='text-pretty' >{text}</Text>
        </div>
    )
}

export default ContentHeader