import React from "react";
import { useState } from "react";
import * as Icons from "react-icons/fa";
import ContentHeader from "./web-default/ContentHeader";

function Faq() {
  const [open, setOpen] = useState({
    accord1: false,
    accord2: false,
    accord3: false,
    accord4: false,
    accord5: false,
    accord6: false,
  });
  return (
    <section className='min-h-screen w-full py-20 '  >
         <div className='container-width'>
      <ContentHeader  text='We answer some of your Frequently Asked Questions regarding our platform. If you have a other Questions not answered here, Please let us know.' title="We've Got Answers For You" caption='ANY QUESTIONS' />

        <div className="flex flex-col gap-8">
          <div
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4  "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer   lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: !open.accord1,
                  accord2: false,
                  accord3: false,
                  accord4: false,
                  accord5: false,
                  accord6: false,
                })
              }
            >
              <button className="text-lg  lg:text-xl text-bold font-ubuntu text-left flex items-center justify-start   border-none outline-none">
                When can I deposite to my Investment account?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord1 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord1 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord1 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                Deposite are available at any time. Be sure, that your funds are
                not used in any ongoing trade before the withdrawal. The
                available amount is shown in your dashboard on the main page of
                Investing platform.
              </p>
            </div>
          </div>
          <div
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4 "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer  lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: false,
                  accord2: !open.accord2,
                  accord3: false,
                  accord4: false,
                  accord5: false,
                  accord6: false,
                })
              }
            >
              <button className="text-lg lg:text-xl text-bold font-ubuntu text-left flex  items-center justify-start   border-none outline-none">
                When can I withdraw from my Investment account?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord2 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord2 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord2 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                Withdrawal are available after 5 days of complete trading. Our
                account manager puts everything in order for your successful and
                easy fund withdrawal.
              </p>
            </div>
          </div>
          <div
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4 "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer  lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: false,
                  accord2: false,
                  accord3: !open.accord3,
                  accord4: false,
                  accord5: false,
                  accord6: false,
                })
              }
            >
              <button className="text-lg lg:text-xl text-bold font-ubuntu text-left flex items-center justify-start   border-none outline-none">
                How do I check my account balance?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord3 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord3 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord3 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                Our platform is built with high information accessiblity in mind.
                 Your account balance is always visible on your dashboard.
              </p>
            </div>
          </div>
          <div
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4 "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer  lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: false,
                  accord2: false,
                  accord3: false,
                  accord4: !open.accord4,
                  accord5: false,
                  accord6: false,
                })
              }
            >
              <button className="text-lg lg:text-xl text-bold font-ubuntu text-left flex items-center justify-start   border-none outline-none">
                forgot my password, what should I do?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord4 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord4 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord4 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                Visit the password reset page, type in your email address and
                click the `Reset` button a password reset email will be sent to
                you.Be sure you put your valid and account registered email
              </p>
            </div>
          </div>
          <div
            
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4 "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer  lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: false,
                  accord2: false,
                  accord3: false,
                  accord4: false,
                  accord5: !open.accord5,
                  accord6: false,
                })
              }
            >
              <button className="text-lg lg:text-xl text-bold font-ubuntu text-left flex items-center justify-start   border-none outline-none">
                How will I know that the withdrawal has been successful?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord5 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord5 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord5 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                An automatic notification will be sent to you once we send the
                funds and you can always check your transaction history or
                account balance. Our payment system dictates how long it will
                take for the funds to reach you.
              </p>
            </div>
          </div>
          <div
            className="bg-sec-bg rounded-lg text-white px-4 sm:pb-0 pb-4 transition-all ease-linear duration-500 "
          >
            <div
              className="relative h-[50px] pt-3 cursor-pointer  lg:mb-0"
              onClick={() =>
                setOpen({
                  ...open,
                  accord1: false,
                  accord2: false,
                  accord3: false,
                  accord4: false,
                  accord5: false,
                  accord6: !open.accord6,
                })
              }
            >
              <button className="text-lg lg:text-xl text-bold font-ubuntu text-left flex items-center justify-start   border-none outline-none">
                How much can I withdraw?
              </button>
              <span className="absolute right-0 text-sm font-[300] top-6">
                <Icons.FaChevronDown
                  className={`${
                    open.accord6 ? "rotate-[180deg]" : "rotate-[0deg]"
                  } transition-all ease-linear duration-500`}
                />
              </span>
            </div>
            <div
              className={`${
                open.accord6 ? "h-auto mt-10" : "h-0"
              } pb-4 transition-all ease-linear duration-500 `}
            >
              <p className={`${!open.accord6 ? "hidden" : "block"} leading-2`}>
                <span className="block border-b border-main-color mb-2"></span>
                You can withdraw the full amount of your account balance minus
                the funds that are used currently for supporting opened
                positions.You can withdraw all your fund with ease provided you
                have one in your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
