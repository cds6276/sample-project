"use client";
import Image from "next/image";

export default function HomeCTA() {
  return (
    <>
      <div className="px-[22px] mx-auto  custom-container my-[60px] sm:my-[80px] lg:my-[100px]">
        <div className="bg-[#EDF3FF] rounded-[16px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-end md:gap-[40px] xl:gap-[60px] relative">
            <div className="p-[20px] sm:p-[40px] lg:p-0 lg:ps-[40px] xl:ps-[70px] 2xl:ps-[100px] lg:py-[40px] xl:py-[60px] 2xl:py-[80px]">
              <Image
                className="logo z-50 w-[70px] max-h-[44px] md:w-[75px] mb-[8px]"
                src="/images/logo-dark.webp"
                width={75}
                height={44}
                alt="logo image"
              />
              <h5 className="text-[28px] sm:text-[32px] font-medium leading-[130%] mb-[16px]   text-[#24262b]">
                Boost your workflow <br /> like never before
              </h5>
              <p className=" md:text-[18px] text-[16px] text-[#405261] leading-[150%] ">
                Empower your team to work smarter—organize tasks, co-create
                docs, track progress, and stay connected with AI-driven support.
              </p>

              <div className="flex gap-[18px] justify-start items-center flex-wrap mt-[30px] xl:mt-[40px]">
                <button type="button">
                  <a
                    className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                    href="add-me-to-the-waiting-list"
                  >
                    Get Started. it&apos;s FREE
                    <svg
                      className="w-[12px] h-[12px] fill-[#fff]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </a>
                </button>
              </div>
            </div>

            <div className="pl-[40px] lg:pl-0 flex justify-end">
              <div className=" absolute right-0 bottom-0 z-0 w-[500px] xl:w-[700px] h-[400px] rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#2196F3] opacity-15"></div>
              <Image
                src="/images/new-banners/cta/cta-banner.png"
                alt="cta-banner"
                className=" relative z-11 w-[680px]"
                width={680}
                 height={0}
                style={{height:"auto"}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
