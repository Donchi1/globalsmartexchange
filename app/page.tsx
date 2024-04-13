"use client"
import Image from "next/image";
import Navbar from "./components/global/Navbar";
import CustomIcon from "./components/global/web-default/CustomIcon";
import { IconButton } from "./components/global/web-default/Buttons";
import H2 from "./components/global/web-default/H2";
import H1 from "./components/global/web-default/H1";
import Text from "./components/global/web-default/Text";
import AboutTop from "./components/global/AboutTop";
import Features from "./components/global/Features";
import Plans from "./components/global/Plans";
import GetStarted from "./components/global/GetStarted";
import TopInvestors from "./components/global/TopInvestors";
import ExpertTeam from "./components/global/ExpertTeam";
import Testimonial from "./components/global/Testimonials";
import Faq from "./components/global/FAQ";
import Contact from "./components/global/Contact";
import Footer from "./components/global/Footer";



export default function Home() {
  return (
    <>
     <Navbar />
     <main className="min-h-screen font-mono overflow-x-hidden bg-center bg-no-repeat bg-cover " >
     <section className="w-full min-h-screen bg-cover bg-center bg-no-repeat pb-10 pt-6" style={{backgroundImage: "url(/imgs/home_bg1.jpg)"}}>
       <div className="flex justify-center items-center h-screen">
        <div className="container-width flex justify-between items-center relative">

        <div className="pl-6 border-2 border-l-main-color/60 border-r-0 border-y-0 ">
        <div className="flex flex-col gap-10 ">
          <div className="flex items-center gap-2 bg-emerald-700/30 rounded-full pr-3 pl-1 max-w-fit">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center bg-main-color items-center">       
            <CustomIcon className="w-[30px] h-[30px]" color={6}  icon={<span className="text-g-ancent-text">0</span>} />
            </div>
          <Text className="!text-lg !text-white !font-mono !font-bold" >No Trading commission</Text>
          </div>
          
            <div className="space-y-6">
            <H2 >Next generation</H2>
            <H1 >Crypto Platform!</H1>
            </div> 
            <Text>Global Smart Exchange the best platform for crypto investment</Text>
            <IconButton className="" title="Get Started Now" onClick={() => {}}  />
          </div>
        </div>
       
        <div className="lg:block hidden ">
          <div className="">
          <Image className="w-[280px] h-auto object-center object-cover" alt="hero" src="/imgs/2012.png" width={600} height={1000} />
           <Image className="absolute anim  object-cover left-[58%] h-[180px]  top-10 w-[300px]" src="/imgs/floatimg-l.png" width={400} height={400} alt="float-img" />
           <Image className="absolute object-cover anim float1  w-[300px] h-[350px] top-10 -right-44" src="/imgs/floatimg-r.png" width={400} height={400} alt="float-img" />
           <Image className="absolute anim float2 object-cover w-[300px] h-[180px] right-[20%] top-[60%]" src="/imgs/floatimg-b.png" width={400} height={400} alt="float-img" />
          </div>
        </div>
       </div>
       </div>
     </section>
     <AboutTop />
      <Features />
      <Plans />
      <GetStarted />
      <TopInvestors />
      <ExpertTeam />
      <Testimonial />
      <Faq />
      <Contact />
      <Footer />
    </main>
    </>
   
  );
}
