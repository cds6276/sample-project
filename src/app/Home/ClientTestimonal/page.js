"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";

import TestimonalsCard from "@/app/Common/TestimonalsCard/page";

export default function ClientTestimonal() {
    const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const testimonials = [
    
    {
      img: "/images/new-banners/testimonial/t-6.png",
      logo: "/images/new-banners/testimonial/logo-2.png",
      text: "Jugl simplifies team tasks, chats, and file sharing in one easy-to-use platform.",
      author: "Patrica Cantu",
      company: "N4 Montessori",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo6.mp4",
    },{
      img: "/images/new-banners/testimonial/t-8.jpg",
      logo: "/images/new-banners/testimonial/logo-6-2.png",
      text: "Jugl makes task management easy for non-technical teams with a simple mobile app and built-in chat.",
      author: "Mr. Daniel",
      company: "InvestNJoy Capital CO",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo8.mp4",
    },
    {
      img: "/images/new-banners/testimonial/t-7.jpg",
      logo: "/images/new-banners/testimonial/logo-2.png",
      text: "Jugl unifies messaging, tasks, and file storage—making team collaboration simple, fast, and highly efficient.",
      author: "Mollie Rios",
      company: "N4 Montessori",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo7.mp4",
    },
     {
      img: "/images/new-banners/testimonial/t-11.jpg",
      logo: "/images/new-banners/testimonial/logo-2.png",
      text: "Jugl helps us keep all communication and daily tasks organized in one platform.",
      author: "Radhi Mani",
      company: "N4 Montessori",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo3.mp4",
    },
    {
      img: "/images/new-banners/testimonial/t-3.jpg",
      logo: "/images/new-banners/testimonial/logo-3.png",
      text: "Jugl revolutionized our manufacturing by improving productivity and ensuring timely tasks with its user-friendly design.",
      author: "Shankara Pandian",
      company: "CEO and Founder",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo2.mp4",
    },
    {
      img: "/images/new-banners/testimonial/t-4.jpg",
      logo: "/images/new-banners/testimonial/logo-0.png",
      text: "Jugl makes it easy to track cases, assign tasks, and stay organized across our legal team and offices.",
      author: "Mr. A.R. Rangasamy",
      company: "Advocate",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo4.mp4",
    },
    {
      img: "/images/new-banners/testimonial/t-5.jpg",
      logo: "/images/new-banners/testimonial/logo-5.png",
      text: "Jugl helped us manage our IT and Telecom teams better across South India, making our work faster and more organized.",
      author: "Mr. Hari",
      company: "Spextrum Group of Companies",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo5.mp4",
    },
    {
      img: "/images/new-banners/testimonial/t-2.jpg",
      logo: "/images/new-banners/testimonial/logo-1.png",
      text: "Integrating the Jugl app into our operations was a smart move—it's been incredibly beneficial.",
      author: "Revathi",
      company: "Alpine Tape, CEO",
      video: "/images/new-banners/testimonial/videoclips/tmnlsvideo1.mp4",
    },
  ];

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
    return (

        <>
          <section className="testimonials px-[22px] 2xl:mx-auto max-w-[1920px] py-[60px] sm:py-[80px] lg:py-[100px]">
      <div className="max-w-[850px] mx-auto mb-[20px] text-center">
        <h3 className="font-medium text-[24px] sm:text-[28px] md:text-[36px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
          What Our Clients Say
        </h3>
        <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] block">
          Real stories from teams using Jugl to simplify workflows, save time,
          and stay connected. Their success is the best proof of what Jugl can
          do.
        </p>
      </div>
      <div className="relative mt-[40px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 5 },
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <TestimonalsCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className={`swiper-button-prev absolute top-1/2 left-0 z-30 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md transition-opacity ${
            isBeginning ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
          disabled={isBeginning}
        >
          <svg
            className="w-[24px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
        <button
          ref={nextRef}
          disabled={isEnd}
          className={`swiper-button-next absolute top-1/2 right-0 z-30 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md transition-opacity ${
            isEnd ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            className="w-[24px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </div>
    </section>
        </>
    )
}