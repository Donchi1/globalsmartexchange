import React, { useRef } from "react";
import Slider from "react-slick";
import * as Icons from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "@/utils/dommyData";
import avater from "/avatar.png";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import ContentHeader from "./web-default/ContentHeader";

interface ControllerInterface {
    onClick?:React.MouseEventHandler<HTMLButtonElement>
   dont?:boolean
 }
 

const Next = ({ onClick,  dont }:ControllerInterface) => {
  return (
    <div
      className={`${
        dont && "hidden"
      } absolute -right-14 top-[10%]  text-white text-lg  `}
    >
      <button
        onClick={onClick}
        className="border-main-color border px-3 py-2 rounded-sm hover:bg-transparent hover:border hover:border-main-color/70 transition-color ease-linear duration-500"
      >
        <Icons.FaChevronRight />
      </button>
    </div>
  );
};
const Prev = ({ onClick, dont }: ControllerInterface) => (
  <div className={`${dont && "hidden"} absolute -left-14 text-white text-lg `}>
    <button
      onClick={onClick}
      className="border-main-color  border px-3 py-2 rounded-sm hover:bg-transparent hover:border hover:border-main-color/70 transition-color ease-linear duration-500"
    >
      <Icons.FaChevronLeft />
    </button>
  </div>
);

function Testimonial() {
  const slide1Ref = useRef<Slider | undefined>();
  const slide2Ref = useRef<Slider | undefined>();
  const [navs, setNavs] = useState({
    nav1: undefined,
    nav2: undefined,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setNavs({ ...navs, nav1: slide1Ref?.current as any, nav2: slide2Ref?.current as any });
  }, []);
  return (
    <section className="w-full min-h-screen pt-10">
      <div className="container-width">
       
        <ContentHeader caption="Testimonial"  title="What Users Say About Us" text="We are doing really good at this market and here are the words we
             got from few of our users." />

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={3}
          infinite
          nextArrow={<Next />}
          prevArrow={<Prev />}
          initialSlide={0}
          speed={2500}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          ref={slide2Ref as any}
          easing="linear"
          asNavFor={navs.nav1}
          afterChange={(i) => setCurrentSlide(i)}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,

                arrows: false,
              },
            },
          ]}
          className="lg:w-[60%] w-[100%] mx-auto my-14 lg:my-32  pb-24"
        >
          {data.map((each, index) => (
            <div className="testimonial-item" key={index}>
              <div
                className={`${
                  currentSlide + 1 === index &&
                  "rounded-full w-[90px] text-center h-[40px] border-[1px] border-dashed border-main-color  flex items-center justify-center"
                }`}
              >
                <h6 className=" text-white font-bold font-xl">
                  {" "}
                  {each.country}
                </h6>
              </div>
            </div>
          ))}
        </Slider>

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={1}
          infinite
          arrows={false}
          initialSlide={0}
          speed={2500}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          ref={slide1Ref as any}
          asNavFor={navs.nav2}
          easing="linear"
          className="lg:w-[60%] mx-auto w-[100%]   "
        >
          {data.map((each, index) => (
            <div
              className=" bg-sec-bg p-6 relativ lg:mb-20 mb-8 "
              key={index}
            >
              <div className="absolute hidden bottom-40 z-[1000]  right-[50%] w-0 h-0 border-l-[50px] border-r-[50px] border-l-transparent border-r-transparent  border-b-[90px] border-red-500"></div>
              <div className="flex gap-8">
                <div className="rounded-full border-[4px] w-[100px] h-[100px] border-primary ">
                  <Image width={300} height={300} src="/imgs/avater.png" alt="..." className=" w-full" />
                </div>

                <div className="text-white flex-1">
                  <h6 className="h6 mb-5 text-main-color font-bold text-2xl uppercase">
                    {" "}
                    {each.name}
                  </h6>

                  <p>{each.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
       
      </div>
    </section>
  );
}

export default Testimonial;
