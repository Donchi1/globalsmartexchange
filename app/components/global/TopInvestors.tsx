"use client"
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Icons from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { results } from "@/utils/dommyData";
import formatCurrency from "@/utils/converter";
import ContentHeader from "./web-default/ContentHeader";
import Image from "next/image";
import axios from "axios";


interface ControllerInterface {
   onClick?:React.MouseEventHandler<HTMLButtonElement>
  dont?:boolean
}

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
        <Icons.FaChevronRight />
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
      <Icons.FaChevronLeft />
    </button>
  </div>
);

function TopInvestors() {

  return (
    <section className="w-full py-28 min-h-screen  " >
      <div className="container-width">
        
        <ContentHeader title="Top Investors" caption="Investors" text="We have a numerious number of investors including developers, managers, designers,Traders and low salary earners." />

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={4}
          infinite
          initialSlide={0}
          speed={1500}
          nextArrow={<Next  />}
          prevArrow={<Prev />}
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
                slidesToShow: 3,
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
          {results.map((each, index) => (
            <div
              className="bg-sec-bg ring-2 ring-main-color transition-all ease-linear duration-500  rounded-lg px-4 w-full lg:!w-[95%] "
              key={index}
            >
              <div className="mt-4 ">
                <div className="w-[100px] h-[100px] mx-auto ring-4 ring-main-color rounded-full">
                <Image
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                  src={each.picture.large}
                  alt="Image Missing"
                  width={400}
                  height={400}
                />
                </div>
               
              </div>

              <p className="text-center mt-4 text-white text-xl font-[500]">
                {each.name.first} {each.name.last}
              </p>
              <hr className=" my-8 " />
              <p className="text-main-color uppercase mb-10 text-center">
                Invest amount : {formatCurrency(each.dob.age * 80)}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TopInvestors;
