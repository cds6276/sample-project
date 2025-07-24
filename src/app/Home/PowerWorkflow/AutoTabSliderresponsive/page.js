"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const tabData = [
  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-1.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd1.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd1-1.png",
    content: (
      <>
        When <span className="font-bold">Invoice is approved</span>
        <br /> send <span className="font-bold">email to Finance</span>{" "}
        department
      </>
    ),
    supportImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd11.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg1.png",
    gradientStart: "#2196F3",
    gradientEnd: "#34A853",
  },
  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-2.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd2.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd2-1.png",
    content: (
      <>
        When Service <span className="font-bold">Ticket status changed</span> to
        Dispatch, send <span className="font-bold">text to client</span>
      </>
    ),
    supportImg: "/images/new-banners/startfinish-section/tb1/tb-cta1-cd7.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg2.png",
    gradientStart: "#F3216B",
    gradientEnd: "#F41F8D",
  },

  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-3.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd3.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd3-1.png",
    content: (
      <>
        When <span className="font-bold">Month is completed</span>, <br />
        create <span className="font-bold">Task summary</span> based on the
        completed month
      </>
    ),
    supportImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta-cd6-1.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg3.png",
    gradientStart: "#2196F3",
    gradientEnd: "#F321BB",
  },
  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-4.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd4.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd4-1.png",
    content: (
      <>
        When <span className="font-bold">New Order Received</span>, <br />
        send <span className="font-bold">Order Acknowledgment</span> to client
      </>
    ),
    supportImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd8.png ",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg4.png",
    gradientStart: "#1FCC2C",
    gradientEnd: "#4D7829",
  },
  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-5.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd5.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd5-1.png",
    content: (
      <>
        When <span className="font-bold">Custom Order Received</span>, <br />
        send <span className="font-bold">Approval Request</span> to Management
      </>
    ),
    supportImg: "/images/new-banners/startfinish-section/tb1/tb-cta1-cd9.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg5.png",
    gradientStart: "#007CC5",
    gradientEnd: "#21D3F3",
  },
  {
    bgimg:
      "/images/new-banners/startfinish-section/responsive/icon-switch-6.png",
    inactiveImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd6.png",
    activeImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd6-1.png",
    content: (
      <>
        When <span className="font-bold">Invoice is finalized</span>
        <br /> send <span className="font-bold">summary report</span> to team
      </>
    ),
    supportImg:
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd10.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg6.png",
    gradientStart: "#00D639",
    gradientEnd: "#65FF8F",
  },
];

export default function AutoTabSliderresponsive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 800);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabData.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTabClick = (index) => {
    stopAutoSlide();
    setActiveIndex(index);
    startAutoSlide();
  };
  return (
    <>
      <div className="tab-box-bg ">
        <div className={`relative ml-0 md:-ml-[50px]`}>
          <div
            className={`absolute w-[150px] h-[150px] right-0 lg:-right-[25%] top-[35%] z-0 rounded-xl blur-3xl bg-gradient-to-t from-[${tabData[activeIndex].gradientStart}] to-[${tabData[activeIndex].gradientEnd}] opacity-55`}
          ></div>

          <div className="tab-img-wrapper flex flex-row xl:flex-col items-center justify-center gap-[12px]">
            {tabData.map((tab, index) => (
              <div
                key={index}
                className="tab-img cursor-pointer "
                onClick={() => handleTabClick(index)}
              >
                <Image
                  src={tab.inactiveImg}
                  alt="inactive"
                  className={`relative z-10 w-[33px] ${
                    activeIndex === index ? "hidden" : ""
                  }`}
                  width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src={tab.activeImg}
                  alt="active"
                  className={`relative z-10 w-[50px] ${
                    activeIndex === index ? "" : "hidden"
                  }`}
                  width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                />
              </div>
            ))}
          </div>

          {/* Show active background image only */}
          <div className="my-4">
            <Image
              src={tabData[activeIndex].bgimg}
              alt="banner"
              className="third-tab-image relative z-10 w-[677px]  "
              width={677}
              height={677}
            />
          </div>
        </div>
      </div>
    </>
  );
}
