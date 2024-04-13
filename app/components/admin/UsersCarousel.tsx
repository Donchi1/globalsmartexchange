"use client"
import React,{useEffect, useState} from 'react'

import { DocumentData } from 'firebase/firestore'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';



interface ControllerInterface {
  onClick?:React.MouseEventHandler<HTMLButtonElement>
 dont?:boolean
}

function UsersCarousel({users}: {users: DocumentData[]}) {


    const Next = ({ onClick, dont }:ControllerInterface) => {
      return (
        <div
          className={`${
            dont && "hidden"
          } absolute right-0 top-[20rem]  text-white text-lg  `}
        >
          <button
            onClick={onClick}
            className="border-main-color border px-3 py-2 rounded-sm hover:bg-transparent  hover:border-main-color/70 transition-color ease-linear duration-500"
          >
            <FaChevronRight />
          </button>
        </div>
      );
    };
    const Prev = ({ onClick, dont }:ControllerInterface) => (
      <div
        className={`${
          dont && "hidden"
        } absolute top-[20rem] right-14 text-white text-lg `}
      >
        <button
          onClick={onClick}
          className="border-main-color  border px-3 py-2 rounded-sm hover:bg-transparent  hover:border-main-color/70 transition-color ease-linear duration-500"
        >
          <FaChevronLeft />
        </button>
      </div>
    );
  

  return (

    <Slider
    autoplay
    slidesToScroll={1}
    slidesToShow={4}
    infinite
    initialSlide={0}
    speed={1500}
    nextArrow={<Next dont  />}
    prevArrow={<Prev dont />}
    pauseOnHover={false}
    pauseOnFocus
    pauseOnDotsHover={false}
    className="mb-20 lg:mb-0 pb-28 lg:pb-0"
    responsive={[
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ]}
  >
    {users.map((each, index) => (
      <div
        className="bg-sec-bg ring-2  ring-main-color transition-all ease-linear duration-500  rounded-lg px-4 w-full lg:!w-[95%] "
        key={index}
      >
        <div className="mt-4 ">
          <div className="w-[100px] h-[100px] mx-auto ring-4 ring-main-color rounded-full">
          <Image
            className="w-[100px] h-[100px] rounded-full mx-auto"
            src={each?.photo}
            alt="Image Missing"
            width={400}
            height={400}
          />
          </div>
         
        </div>

        <p className="text-center mt-4 text-white text-xl font-[500]">
          {each?.firstname} {each?.lastname}
        </p>
        <hr className=" my-4 " />
        <p className="text-main-color uppercase mb-10 text-center">
          Invest amount : {each?.initialDeposit}
        </p>
      </div>
    ))}
  </Slider>
        
       
      
  )
}

export default UsersCarousel