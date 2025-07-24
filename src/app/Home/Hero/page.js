'use client';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

export default function HomeHero() {
// Create a ref to track the images
  const slideImages = useRef([]);

  // Initialize Swiper after component mounts
  useEffect(() => {
    const swiperInstance = document.querySelector(".swiper").swiper;

    // When the slide changes, trigger the animation on the image
    swiperInstance.on("slideChange", () => {
      // Remove the animation class from all images
      slideImages.current.forEach((img) => {
        img.classList.remove("animate-fade-up-delayed");
      });

      // Add the animation class to the image of the current slide
      const currentSlide = swiperInstance.slides[swiperInstance.activeIndex];
      const img = currentSlide.querySelector("img.slide-img");
      if (img) {
        img.classList.add("animate-fade-up-delayed");
      }
    });

    // Trigger the animation on the first slide on mount
    const firstSlide = swiperInstance.slides[0];
    const firstImg = firstSlide.querySelector("img.slide-img");
    if (firstImg) {
      firstImg.classList.add("animate-fade-up-delayed");
    }
  }, []);

    return(
        <>
          {/* <!-- banner starts  - 1st section--> */}
      <div
        id="hero-banner"
        className="banner-hero px-[22px] mx-auto custom-container mt-0"
      >
        <div className="bg-[#fff] pt-[35px] pb-[50px] sm:py-[50px] lg:py-[65px] overflow-hidden relative">
          <div className="relative">
            <div className="lg:flex gap-[30px] justify-between items-center">
              <div className="lg:w-[55%] xl:w-[60%] text-center lg:text-start animated-section">
                <span className="font-medium text-[24px] md:text-[32px] xl:text-[34px] 2xl:text-[42px] leading-[140%] text-[#24262B] tracking-0 lg:-tracking-[1.4px] ">The AI Platform to <br className="block sm:hidden " /> Get Work Done</span> <br />
                <h1 className="font-medium text-[38px] sm:text-[44px] md:text-[52px] xl:text-[64px] leading-[120%] lg:leading-[110%] mb-[24px] md:mb-[24px] text-[#24262B] tracking-0 lg:-tracking-[1.4px] ">
                  Smarter, Faster, Together
                </h1>

                <div className="mb-[30px] lg:mb-[44px]">
                  <p className="text-[16px] md:text-[18px] font-normal text-[#6E7178] leading-[160%] sm:max-w-[700px]  ml-auto lg:ml-0 mr-auto  mb-2">
                    Jugl is a Communication and Workflow Management Platform
                    that streamlines business operations.
                  </p>
                </div>
                <div className="hidden sm:flex gap-2 justify-center lg:justify-start items-center flex-wrap lg:flex-nowrap">
                  <button type="button">
                    <Link className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[24px] py-[18px] leading-[100%] w-[282px] lg:w-auto rounded-[8px] bg-[#3A86FF] text-[#fff] text-[16px] font-medium hover:bg-[#0077D5] hover:text-white"
                      href="add-me-to-the-waiting-list">Add Me to the Waiting List
                      <div className="">
                        <svg className="w-[12px] h-[12px] fill-[#fff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </div>
                    </Link>
                  </button>
                  <button type="button">
                    <a className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-200 border-2 border-[#3A86FF] hover:border-[#0077D5] group px-[22px] py-[16px] leading-[100%] w-[278px] lg:w-auto font-medium hover:bg-[#fff] rounded-[8px] text-[16px] text-[#3A86FF] hover:text-[#0077D5]"
                      href="demo"> Schedule a Demo
                      <div className="">
                        <svg className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </div>
                    </a>
                  </button>
                </div>

                {/* responsive btn */}
                <div className="flex sm:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap ">
                  <button type="button">
                    <Link className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                      href="add-me-to-the-waiting-list">Add Me to the Waiting List
                      <svg className="w-[12px] h-[12px] fill-[#fff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                      </svg>
                    </Link>
                  </button>
                  <button type="button">
                    <a className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] xl:w-auto font-medium  text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                      href="demo"> Schedule a Demo
                      <div className="">
                        <svg className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </div>
                    </a>
                  </button>
                </div>

                <div className="w-[500px] ml-auto lg:ml-0  hidden sm:flex gap-[12px] justify-end items-center rounded-[12px] p-[16px] mt-[28px] lg:mt-[42px]">
                  <div className="w-[40%]">
                    <div className="flex">
                      <Image
                        src="/images/avatar-5.png"
                        alt="profile"
                        className="rounded-full w-[32px] h-[32px] border-2 border-[#fff]"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="/images/avatar-6.png"
                        alt="profile"
                        className="rounded-full w-[32px] h-[32px] border-2 border-[#fff] -ml-[14px]"
                          width={32}
                        height={32}
                      />
                      <Image
                        src="/images/avatar-7.png"
                        alt="profile"
                        className="rounded-full w-[32px] h-[32px] border-2 border-[#fff] -ml-[14px]"
                          width={32}
                        height={32}
                      />
                      <Image
                        src="/images/avatar-8.jpg"
                        alt="profile"
                        className="rounded-full w-[32px] h-[32px] border-2 border-[#fff] -ml-[14px]"
                          width={32}
                        height={32}
                      />
                      <div className="rounded-full w-[32px] h-[32px] border-2 border-[#fff] -ml-[14px] relative">
                        <Image
                          src="/images/avatar-9.png"
                          alt="profile"
                          className="rounded-full max-w-[100%]"
                            width={32}
                        height={32}
                        />
                        <div className="absolute rounded-full w-[30px] h-[30px] bg-[#00000063] top-0 -left-[1px] flex flex-col item-center justify-center">
                          <span className="text-[12px] text-white text-center">
                            1k+
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-0 text-[12px] text-[#24262B] font-medium">
                      1,000+ Happy Customers
                    </p>
                  </div>
                  <div className="w-[60%] flex justify-end gap-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.jugl&pcampaignid=web_share"
                      target="_blank"
                      className="p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                    >
                      <Image
                        src="/images/android.svg"
                        alt="google-store"
                        className="w-[103px] h-[24px]"
                          width={32}
                        height={32}
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/id/app/jugl/id1571640105"
                      target="_blank"
                      className="p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                    >
                      <Image
                        src="/images/app-store.svg"
                        alt="google-store"
                        className="w-[103px] h-[24px]"
                          width={32}
                        height={32}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- hero right --> */}
              <div className="lg:w-[45%] xl:w-[40%] hero-slider mt-[30px] sm:mt-[50px] lg:mt-0 animated-section">
                <Swiper
                  id="mySwiper1"
                  className="max-w-[550px] rounded-[18px] lg:mr-0"
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                    type: "bullets",
                  }}
                  modules={[Pagination, Autoplay]}
                  autoplay={{
                    delay: 3000, // Auto-change slide every 3 seconds
                    disableOnInteraction: false, // Autoplay continues after interaction
                    pauseOnMouseEnter: true, // Pause autoplay when mouse enters
                  }}
                  loop={true} // Enable looping of slides
                >
                  {/* Slide 1 */}
                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide.jpg"
                          alt="banner"
                          className=""
                          width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#FBE4FF] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="16"
                              height="12"
                              viewBox="0 0 16 12"
                              fill="#D11FF4"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.2687 2.3593C14.818 2.13397 14.2867 2.1813 13.884 2.48464C13.858 2.50397 13.8333 2.52597 13.8107 2.54864L12.6393 3.73064C12.4987 2.02064 11.0787 0.667969 9.33333 0.667969H3.33333C1.49533 0.667302 0 2.16264 0 4.00064V8.00064C0 9.83864 1.49533 11.334 3.33333 11.334H9.33333C11.086 11.334 12.512 9.9693 12.6413 8.2493L13.812 9.41864C13.8347 9.44064 13.858 9.46064 13.8833 9.47997C14.118 9.65597 14.3953 9.7453 14.6753 9.7453C14.8773 9.7453 15.0793 9.6993 15.2687 9.60464C15.72 9.3793 16 8.9253 16 8.42197V3.5433C16 3.03864 15.72 2.58464 15.2687 2.3593ZM9.33333 10.0006H3.33333C2.23067 10.0006 1.33333 9.1033 1.33333 8.00064V4.00064C1.33333 2.89797 2.23067 2.00064 3.33333 2.00064H9.33333C10.436 2.00064 11.3333 2.89797 11.3333 4.00064V8.00064C11.3333 9.1033 10.436 10.0006 9.33333 10.0006ZM12.6667 6.3893V5.59664L14.6667 3.57797L14.6833 8.4033L12.6667 6.38864V6.3893Z"
                                fill="#D11FF4"
                              />
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            Real-time Business Communication
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup1.png"
                          alt="pop-up-img"
                          className="slide-img w-[130px] sm:w-[196px] absolute bottom-[30%] left-[10%]"
                          width={130}
                          height={130}
                          ref={(el) => (slideImages.current[0] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 2 */}
                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide-1.jpg"
                          alt="banner"
                          className=""
                            width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#D7FFDB] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#00B916"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_604_12403)">
                                <path
                                  d="M15.9998 7.49801C15.9034 5.93802 15.3525 4.44035 14.4152 3.18963C13.4779 1.9389 12.1951 0.989805 10.7249 0.45934C9.25473 -0.0711256 7.66144 -0.159768 6.14148 0.20434C4.62152 0.568448 3.24134 1.36939 2.17108 2.50842C1.10082 3.64745 0.38727 5.07478 0.118404 6.61445C-0.150462 8.15411 0.0371069 9.7388 0.657987 11.1732C1.27887 12.6075 2.30591 13.8288 3.61251 14.6865C4.91911 15.5442 6.44815 16.0008 8.01111 16H12.6664C13.5502 15.9991 14.3976 15.6477 15.0225 15.0227C15.6474 14.3978 15.9989 13.5505 15.9998 12.6667V7.49801ZM14.6664 12.6667C14.6664 13.1971 14.4557 13.7058 14.0807 14.0809C13.7056 14.456 13.1969 14.6667 12.6664 14.6667H8.01111C7.0704 14.6663 6.14034 14.4676 5.28157 14.0835C4.42281 13.6995 3.65463 13.1388 3.02711 12.438C2.39656 11.7375 1.92306 10.9103 1.63837 10.0119C1.35368 9.11341 1.26437 8.16447 1.37644 7.22868C1.5534 5.75264 2.21657 4.37747 3.2614 3.31996C4.30624 2.26245 5.67331 1.58275 7.14711 1.38801C7.4346 1.35198 7.72404 1.33372 8.01378 1.33334C9.56743 1.32911 11.073 1.87194 12.2664 2.86668C12.9635 3.44597 13.5356 4.16078 13.9481 4.96776C14.3607 5.77475 14.6051 6.6571 14.6664 7.56134V12.6667Z"
                                  fill="#00B916"
                                />
                                <path
                                  d="M5.33317 6.00002H7.99984C8.17665 6.00002 8.34622 5.92978 8.47124 5.80476C8.59627 5.67973 8.6665 5.51016 8.6665 5.33335C8.6665 5.15654 8.59627 4.98697 8.47124 4.86195C8.34622 4.73693 8.17665 4.66669 7.99984 4.66669H5.33317C5.15636 4.66669 4.98679 4.73693 4.86177 4.86195C4.73674 4.98697 4.6665 5.15654 4.6665 5.33335C4.6665 5.51016 4.73674 5.67973 4.86177 5.80476C4.98679 5.92978 5.15636 6.00002 5.33317 6.00002Z"
                                  fill="#00B916"
                                />
                                <path
                                  d="M10.6665 7.33331H5.33317C5.15636 7.33331 4.98679 7.40355 4.86177 7.52858C4.73674 7.6536 4.6665 7.82317 4.6665 7.99998C4.6665 8.17679 4.73674 8.34636 4.86177 8.47138C4.98679 8.59641 5.15636 8.66665 5.33317 8.66665H10.6665C10.8433 8.66665 11.0129 8.59641 11.1379 8.47138C11.2629 8.34636 11.3332 8.17679 11.3332 7.99998C11.3332 7.82317 11.2629 7.6536 11.1379 7.52858C11.0129 7.40355 10.8433 7.33331 10.6665 7.33331Z"
                                  fill="#00B916"
                                />
                                <path
                                  d="M10.6665 10H5.33317C5.15636 10 4.98679 10.0702 4.86177 10.1953C4.73674 10.3203 4.6665 10.4899 4.6665 10.6667C4.6665 10.8435 4.73674 11.013 4.86177 11.1381C4.98679 11.2631 5.15636 11.3333 5.33317 11.3333H10.6665C10.8433 11.3333 11.0129 11.2631 11.1379 11.1381C11.2629 11.013 11.3332 10.8435 11.3332 10.6667C11.3332 10.4899 11.2629 10.3203 11.1379 10.1953C11.0129 10.0702 10.8433 10 10.6665 10Z"
                                  fill="#00B916"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_604_12403">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            Client Messaging via WhatsApp
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup2.png"
                          alt="pop-up-img"
                          className="slide-img w-[130px] sm:w-[196px] absolute bottom-[30%] left-[10%]"
                           width={130}
                          height={130}
                          ref={(el) => (slideImages.current[1] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 3 */}
                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide-3.jpg"
                          alt="banner"
                          className=""
                            width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#F5E7FF] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="12"
                              height="16"
                              viewBox="0 0 12 16"
                              fill="#9F1FF4"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66667 6.66668C4.13623 6.66668 3.62753 6.87739 3.25245 7.25246C2.87738 7.62754 2.66667 8.13624 2.66667 8.66668C2.66667 9.19711 2.87738 9.70582 3.25245 10.0809C3.62753 10.456 4.13623 10.6667 4.66667 10.6667H7.33333C7.86377 10.6667 8.37247 10.456 8.74755 10.0809C9.12262 9.70582 9.33333 9.19711 9.33333 8.66668C9.33333 8.13624 9.12262 7.62754 8.74755 7.25246C8.37247 6.87739 7.86377 6.66668 7.33333 6.66668H4.66667ZM8 8.66668C8 8.84349 7.92976 9.01306 7.80474 9.13808C7.67971 9.26311 7.51014 9.33334 7.33333 9.33334H4.66667C4.48986 9.33334 4.32029 9.26311 4.19526 9.13808C4.07024 9.01306 4 8.84349 4 8.66668C4 8.48987 4.07024 8.3203 4.19526 8.19527C4.32029 8.07025 4.48986 8.00001 4.66667 8.00001H7.33333C7.51014 8.00001 7.67971 8.07025 7.80474 8.19527C7.92976 8.3203 8 8.48987 8 8.66668ZM9.33333 12.6667C9.33333 12.8435 9.2631 13.0131 9.13807 13.1381C9.01305 13.2631 8.84348 13.3333 8.66667 13.3333H3.33333C3.15652 13.3333 2.98695 13.2631 2.86193 13.1381C2.7369 13.0131 2.66667 12.8435 2.66667 12.6667C2.66667 12.4899 2.7369 12.3203 2.86193 12.1953C2.98695 12.0702 3.15652 12 3.33333 12H8.66667C8.84348 12 9.01305 12.0702 9.13807 12.1953C9.2631 12.3203 9.33333 12.4899 9.33333 12.6667ZM11.024 2.08068L9.91867 0.976677C9.60991 0.666178 9.24266 0.419985 8.83814 0.252342C8.43362 0.0846994 7.99988 -0.00106532 7.562 9.98748e-06H3.33333C2.4496 0.00106856 1.60237 0.352598 0.97748 0.97749C0.352588 1.60238 0.00105857 2.44961 0 3.33334V12.6667C0.00105857 13.5504 0.352588 14.3976 0.97748 15.0225C1.60237 15.6474 2.4496 15.999 3.33333 16H8.66667C9.5504 15.999 10.3976 15.6474 11.0225 15.0225C11.6474 14.3976 11.9989 13.5504 12 12.6667V4.43801C12.0013 4.00007 11.9156 3.56622 11.7481 3.16159C11.5806 2.75696 11.3345 2.38956 11.024 2.08068ZM10.0813 3.02334C10.1751 3.1183 10.2595 3.22211 10.3333 3.33334H8.66667V1.66668C8.77807 1.7397 8.88172 1.82391 8.976 1.91801L10.0813 3.02334ZM10.6667 12.6667C10.6667 13.1971 10.456 13.7058 10.0809 14.0809C9.70581 14.456 9.1971 14.6667 8.66667 14.6667H3.33333C2.8029 14.6667 2.29419 14.456 1.91912 14.0809C1.54405 13.7058 1.33333 13.1971 1.33333 12.6667V3.33334C1.33333 2.80291 1.54405 2.2942 1.91912 1.91913C2.29419 1.54406 2.8029 1.33334 3.33333 1.33334H7.33333V3.33334C7.33333 3.68697 7.47381 4.0261 7.72386 4.27615C7.97391 4.5262 8.31304 4.66668 8.66667 4.66668H10.6667V12.6667Z"
                                fill="#9F1FF4"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            Forms and Invoicing Built-In
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup4.png"
                          alt="pop-up-img"
                          className="slide-img w-[130px] sm:w-[235px] absolute top-[10%] right-[5%]"
                           width={130}
                          height={130}
                          ref={(el) => (slideImages.current[2] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 4 */}
                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide-2.jpg"
                          alt="banner"
                          className=""
                            width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#FFDEDE] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#F41F1F"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_604_12208)">
                                <path
                                  d="M8.00016 4C7.47275 4 6.95718 4.1564 6.51864 4.44941C6.08011 4.74243 5.73832 5.15891 5.53649 5.64618C5.33465 6.13345 5.28184 6.66962 5.38474 7.18691C5.48763 7.70419 5.74161 8.17935 6.11455 8.55229C6.48749 8.92523 6.96264 9.1792 7.47992 9.28209C7.99721 9.38499 8.53338 9.33218 9.02065 9.13035C9.50792 8.92851 9.9244 8.58672 10.2174 8.14819C10.5104 7.70966 10.6668 7.19408 10.6668 6.66667C10.6668 5.95942 10.3859 5.28115 9.88578 4.78105C9.38569 4.28095 8.70741 4 8.00016 4ZM8.00016 8C7.73646 8 7.47867 7.9218 7.2594 7.77529C7.04014 7.62878 6.86924 7.42055 6.76832 7.17691C6.66741 6.93328 6.641 6.66519 6.69245 6.40655C6.7439 6.14791 6.87089 5.91033 7.05736 5.72386C7.24383 5.53739 7.4814 5.4104 7.74004 5.35895C7.99869 5.30751 8.26677 5.33391 8.51041 5.43483C8.75404 5.53574 8.96228 5.70664 9.10879 5.92591C9.2553 6.14517 9.3335 6.40296 9.3335 6.66667C9.3335 7.02029 9.19302 7.35943 8.94297 7.60948C8.69292 7.85952 8.35379 8 8.00016 8Z"
                                  fill="#F41F1F"
                                ></path>
                                <path
                                  d="M8.00021 16C7.43884 16.0029 6.88495 15.8712 6.38492 15.616C5.88489 15.3609 5.45327 14.9896 5.12621 14.5333C2.58554 11.0287 1.29688 8.39401 1.29688 6.70201C1.29688 4.92417 2.00312 3.21915 3.26024 1.96203C4.51735 0.704915 6.22237 -0.00132751 8.00021 -0.00132751C9.77804 -0.00132751 11.4831 0.704915 12.7402 1.96203C13.9973 3.21915 14.7035 4.92417 14.7035 6.70201C14.7035 8.39401 13.4149 11.0287 10.8742 14.5333C10.5471 14.9896 10.1155 15.3609 9.6155 15.616C9.11547 15.8712 8.56158 16.0029 8.00021 16ZM8.00021 1.45401C6.60849 1.45559 5.27422 2.00916 4.29012 2.99325C3.30603 3.97735 2.75246 5.31162 2.75087 6.70334C2.75087 8.04334 4.01287 10.5213 6.30354 13.6807C6.498 13.9485 6.75312 14.1665 7.04802 14.3169C7.34291 14.4672 7.66921 14.5455 8.00021 14.5455C8.33121 14.5455 8.6575 14.4672 8.9524 14.3169C9.2473 14.1665 9.50241 13.9485 9.69688 13.6807C11.9875 10.5213 13.2495 8.04334 13.2495 6.70334C13.248 5.31162 12.6944 3.97735 11.7103 2.99325C10.7262 2.00916 9.39193 1.45559 8.00021 1.45401Z"
                                  fill="#F41F1F"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_604_12208">
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            Location Logging for Field and Remote Teams
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup3.png"
                          alt="pop-up-img"
                          className="slide-img w-[130px] sm:w-[230px] absolute bottom-[30%] sm:bottom-[40%] left-[5%]"
                           width={130}
                          height={130}
                          ref={(el) => (slideImages.current[3] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide-4.jpg"
                          alt="banner"
                          className=""
                            width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#DAF3FF] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#2196F3"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6667 0H3.33333C1.49533 0 0 1.49533 0 3.33333V12.6667C0 14.5047 1.49533 16 3.33333 16H11.0973C11.9553 16 12.762 15.666 13.3687 15.0593L15.0593 13.3687C15.6573 12.7713 16 11.9427 16 11.0973V3.33333C16 1.49533 14.5047 0 12.6667 0ZM1.33333 12.6667V3.33333C1.33333 2.23067 2.23067 1.33333 3.33333 1.33333H12.6667C13.7693 1.33333 14.6667 2.23067 14.6667 3.33333V10H12C10.8973 10 10 10.8973 10 12V14.6667H3.33333C2.23067 14.6667 1.33333 13.7693 1.33333 12.6667ZM12.426 14.1167C12.1273 14.4153 11.746 14.6 11.3333 14.6513V12C11.3333 11.632 11.6327 11.3333 12 11.3333H14.6507C14.598 11.7433 14.41 12.132 14.116 12.426L12.426 14.1167ZM3.33333 4.33333C3.33333 3.78133 3.78133 3.33333 4.33333 3.33333C4.88533 3.33333 5.33333 3.78133 5.33333 4.33333C5.33333 4.88533 4.88533 5.33333 4.33333 5.33333C3.78133 5.33333 3.33333 4.88533 3.33333 4.33333ZM5.33333 8C5.33333 8.552 4.88533 9 4.33333 9C3.78133 9 3.33333 8.552 3.33333 8C3.33333 7.448 3.78133 7 4.33333 7C4.88533 7 5.33333 7.448 5.33333 8ZM5.33333 11.6667C5.33333 12.2187 4.88533 12.6667 4.33333 12.6667C3.78133 12.6667 3.33333 12.2187 3.33333 11.6667C3.33333 11.1147 3.78133 10.6667 4.33333 10.6667C4.88533 10.6667 5.33333 11.1147 5.33333 11.6667Z"
                                fill="#2196F3"
                              />
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            Automated Workflows and Approvals
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup5.png"
                          alt="pop-up-img"
                          className="slide-img animate-fade-up-delayed w-[130px] sm:w-[225px] absolute bottom-[30%] sm:bottom-[25%] left-[5%]"
                           width={130}
                          height={130}
                          ref={(el) => (slideImages.current[4] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 6 */}
                  <SwiperSlide>
                    <div className="flex justify-center lg:justify-end">
                      <div className="w-[550px] relative">
                        <Image
                          src="/images/hero/tab-banner/slier-hide-5.jpg"
                          alt="banner"
                          className=""
                            width={550}
                          height={550}
                        />
                        <div className="flex gap-3 items-center absolute bottom-[35px] left-[20px] sm:left-[30px] w-[90%]">
                          <div className="w-[40px] h-[40px] bg-[#FEF2D6] rounded-full shrink-0 flex flex-col items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#E57511"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.66667 9.33333C4.66667 9.51014 4.59643 9.67971 4.4714 9.80474C4.34638 9.92976 4.17681 10 4 10H3.33333C3.15652 10 2.98695 9.92976 2.86193 9.80474C2.7369 9.67971 2.66667 9.51014 2.66667 9.33333C2.66667 9.15652 2.7369 8.98695 2.86193 8.86193C2.98695 8.7369 3.15652 8.66667 3.33333 8.66667H4C4.17681 8.66667 4.34638 8.7369 4.4714 8.86193C4.59643 8.98695 4.66667 9.15652 4.66667 9.33333ZM7.33333 8.66667H6.66667C6.48986 8.66667 6.32029 8.7369 6.19526 8.86193C6.07024 8.98695 6 9.15652 6 9.33333C6 9.51014 6.07024 9.67971 6.19526 9.80474C6.32029 9.92976 6.48986 10 6.66667 10H7.33333C7.51014 10 7.67971 9.92976 7.80474 9.80474C7.92976 9.67971 8 9.51014 8 9.33333C8 9.15652 7.92976 8.98695 7.80474 8.86193C7.67971 8.7369 7.51014 8.66667 7.33333 8.66667ZM4 11.3333H3.33333C3.15652 11.3333 2.98695 11.4036 2.86193 11.5286C2.7369 11.6536 2.66667 11.8232 2.66667 12C2.66667 12.1768 2.7369 12.3464 2.86193 12.4714C2.98695 12.5964 3.15652 12.6667 3.33333 12.6667H4C4.17681 12.6667 4.34638 12.5964 4.4714 12.4714C4.59643 12.3464 4.66667 12.1768 4.66667 12C4.66667 11.8232 4.59643 11.6536 4.4714 11.5286C4.34638 11.4036 4.17681 11.3333 4 11.3333ZM7.33333 11.3333H6.66667C6.48986 11.3333 6.32029 11.4036 6.19526 11.5286C6.07024 11.6536 6 11.8232 6 12C6 12.1768 6.07024 12.3464 6.19526 12.4714C6.32029 12.5964 6.48986 12.6667 6.66667 12.6667H7.33333C7.51014 12.6667 7.67971 12.5964 7.80474 12.4714C7.92976 12.3464 8 12.1768 8 12C8 11.8232 7.92976 11.6536 7.80474 11.5286C7.67971 11.4036 7.51014 11.3333 7.33333 11.3333ZM4 3.33333H3.33333C3.15652 3.33333 2.98695 3.40357 2.86193 3.5286C2.7369 3.65362 2.66667 3.82319 2.66667 4C2.66667 4.17681 2.7369 4.34638 2.86193 4.4714C2.98695 4.59643 3.15652 4.66667 3.33333 4.66667H4C4.17681 4.66667 4.34638 4.59643 4.4714 4.4714C4.59643 4.34638 4.66667 4.17681 4.66667 4C4.66667 3.82319 4.59643 3.65362 4.4714 3.5286C4.34638 3.40357 4.17681 3.33333 4 3.33333ZM7.33333 3.33333H6.66667C6.48986 3.33333 6.32029 3.40357 6.19526 3.5286C6.07024 3.65362 6 3.82319 6 4C6 4.17681 6.07024 4.34638 6.19526 4.4714C6.32029 4.59643 6.48986 4.66667 6.66667 4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333ZM4 6H3.33333C3.15652 6 2.98695 6.07024 2.86193 6.19526C2.7369 6.32029 2.66667 6.48986 2.66667 6.66667C2.66667 6.84348 2.7369 7.01305 2.86193 7.13807C2.98695 7.2631 3.15652 7.33333 3.33333 7.33333H4C4.17681 7.33333 4.34638 7.2631 4.4714 7.13807C4.59643 7.01305 4.66667 6.84348 4.66667 6.66667C4.66667 6.48986 4.59643 6.32029 4.4714 6.19526C4.34638 6.07024 4.17681 6 4 6ZM7.33333 6H6.66667C6.48986 6 6.32029 6.07024 6.19526 6.19526C6.07024 6.32029 6 6.48986 6 6.66667C6 6.84348 6.07024 7.01305 6.19526 7.13807C6.32029 7.2631 6.48986 7.33333 6.66667 7.33333H7.33333C7.51014 7.33333 7.67971 7.2631 7.80474 7.13807C7.92976 7.01305 8 6.84348 8 6.66667C8 6.48986 7.92976 6.32029 7.80474 6.19526C7.67971 6.07024 7.51014 6 7.33333 6ZM16 6.66667V12.6667C15.9989 13.5504 15.6474 14.3976 15.0225 15.0225C14.3976 15.6474 13.5504 15.9989 12.6667 16H3.33333C2.4496 15.9989 1.60237 15.6474 0.97748 15.0225C0.352588 14.3976 0.00105857 13.5504 0 12.6667L0 3.33333C0.00105857 2.4496 0.352588 1.60237 0.97748 0.97748C1.60237 0.352588 2.4496 0.00105857 3.33333 0L7.33333 0C8.21706 0.00105857 9.0643 0.352588 9.68919 0.97748C10.3141 1.60237 10.6656 2.4496 10.6667 3.33333H12.6667C13.5504 3.33439 14.3976 3.68592 15.0225 4.31081C15.6474 4.93571 15.9989 5.78294 16 6.66667ZM3.33333 14.6667H9.33333V3.33333C9.33333 2.8029 9.12262 2.29419 8.74755 1.91912C8.37247 1.54405 7.86377 1.33333 7.33333 1.33333H3.33333C2.8029 1.33333 2.29419 1.54405 1.91912 1.91912C1.54405 2.29419 1.33333 2.8029 1.33333 3.33333V12.6667C1.33333 13.1971 1.54405 13.7058 1.91912 14.0809C2.29419 14.456 2.8029 14.6667 3.33333 14.6667ZM14.6667 6.66667C14.6667 6.13623 14.456 5.62753 14.0809 5.25245C13.7058 4.87738 13.1971 4.66667 12.6667 4.66667H10.6667V14.6667H12.6667C13.1971 14.6667 13.7058 14.456 14.0809 14.0809C14.456 13.7058 14.6667 13.1971 14.6667 12.6667V6.66667ZM12.6667 8.66667C12.5348 8.66667 12.4059 8.70577 12.2963 8.77902C12.1867 8.85227 12.1012 8.95639 12.0507 9.07821C12.0003 9.20003 11.9871 9.33407 12.0128 9.46339C12.0385 9.59271 12.102 9.7115 12.1953 9.80474C12.2885 9.89797 12.4073 9.96147 12.5366 9.98719C12.6659 10.0129 12.8 9.99971 12.9218 9.94925C13.0436 9.89879 13.1477 9.81335 13.221 9.70371C13.2942 9.59408 13.3333 9.46519 13.3333 9.33333C13.3333 9.15652 13.2631 8.98695 13.1381 8.86193C13.013 8.7369 12.8435 8.66667 12.6667 8.66667ZM12.6667 11.3333C12.5348 11.3333 12.4059 11.3724 12.2963 11.4457C12.1867 11.5189 12.1012 11.6231 12.0507 11.7449C12.0003 11.8667 11.9871 12.0007 12.0128 12.1301C12.0385 12.2594 12.102 12.3782 12.1953 12.4714C12.2885 12.5646 12.4073 12.6281 12.5366 12.6539C12.6659 12.6796 12.8 12.6664 12.9218 12.6159C13.0436 12.5655 13.1477 12.48 13.221 12.3704C13.2942 12.2607 13.3333 12.1319 13.3333 12C13.3333 11.8232 13.2631 11.6536 13.1381 11.5286C13.013 11.4036 12.8435 11.3333 12.6667 11.3333ZM12.6667 6C12.5348 6 12.4059 6.0391 12.2963 6.11235C12.1867 6.18561 12.1012 6.28973 12.0507 6.41154C12.0003 6.53336 11.9871 6.66741 12.0128 6.79673C12.0385 6.92605 12.102 7.04484 12.1953 7.13807C12.2885 7.23131 12.4073 7.2948 12.5366 7.32052C12.6659 7.34625 12.8 7.33304 12.9218 7.28259C13.0436 7.23213 13.1477 7.14668 13.221 7.03705C13.2942 6.92741 13.3333 6.79852 13.3333 6.66667C13.3333 6.48986 13.2631 6.32029 13.1381 6.19526C13.013 6.07024 12.8435 6 12.6667 6Z"
                                fill="#E57511"
                              />
                            </svg>
                          </div>
                          <p className="text-[16px] md:text-[18px] text-white font-normal mb-0">
                            ERP Plug-ins for SAP, Oracle, and More
                          </p>
                        </div>
                        <Image
                          src="/images/hero/tab-banner/popup6.png"
                          alt="pop-up-img"
                          className="slide-img animate-fade-up-delayed w-[80px] sm:w-[130px] absolute top-[11%] left-[14%]"
                           width={130}
                          height={130}
                          ref={(el) => (slideImages.current[5] = el)} // Store image reference
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Custom pagination container */}
                  <div className="swiper-pagination rotate-90 !left-[45%] sm:!left-[40%] lg:!left-[45%] !top-auto !bottom-[35%] sm:!bottom-[25%]"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- banner ends --> */}
        </>
    )
}