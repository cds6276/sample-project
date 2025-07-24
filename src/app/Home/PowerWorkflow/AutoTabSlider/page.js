"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const tabData = [
  {
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-1.png",
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
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-2.png",
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
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-3.png",
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
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-4.png",
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
      "/images/new-banners/startfinish-section/tb1/tb-cta1-cd8.png",
    messageImage:
      "/images/new-banners/startfinish-section/tb1/tb-cta-msg4.png",
    gradientStart: "#1FCC2C",
    gradientEnd: "#4D7829",
  },
  {
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-5.png",
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
    bgimg: "/images/new-banners/startfinish-section/tb1/tb-cta-6.png",
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

export default function AutoTabSlider() {
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
            className={`absolute w-[300px] h-[300px] -right-[10%] lg:-right-[20%] top-[15%] z-0 rounded-xl blur-3xl bg-gradient-to-t from-[${tabData[activeIndex].gradientStart}] to-[${tabData[activeIndex].gradientEnd}] opacity-55`}
          ></div>

          {/* Show active background image only */}
          <Image
            src={tabData[activeIndex].bgimg}
            alt="banner"
            width={677}
            height={677}
            className="third-tab-image relative z-10 w-[677px]"
          />

          <div className="image-wrapper absolute top-[110px] min-w-[768px]:top-[120px] min-[1280px]:top-[90px] min-[1600px]:top-[95px] min-[1700px]:top-[100px] left-[60px] xl:left-[50px] min-[1600px]:left-[75px] z-50 animate-fade-up-08s">
            <div className="content-wrapper flex flex-col xl:flex-row gap-1 2xl:gap-[33px]">
              <div className="tab-img-wrapper flex flex-row xl:flex-col items-center justify-center gap-[12px]">
                {tabData.map((tab, index) => (
                  <div
                    key={index}
                    className="tab-img cursor-pointer"
                    onClick={() => handleTabClick(index)}
                  >
                    <Image
                      src={tab.inactiveImg}
                      alt="inactive"
                      height={33}
                      width={33}
                      className={`relative z-10 w-[33px] ${
                        activeIndex === index ? "hidden" : ""
                      }`}
                    />
                    <Image
                      src={tab.activeImg}
                      alt="active"
                      height={50}
                      width={50}
                      className={`relative z-10 w-[50px] ${
                        activeIndex === index ? "" : "hidden"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="tab-img-content-wrapper flex items-center justify-center">
                <div className="tab-img-content relative">
                  <div className="content-box h-[200px] w-[200px] sm:w-[367px] p-[24px] bg-[#EFEFEF] rounded-[10px] relative flex items-center justify-center">
                    <p className="text-[16px] xl:text-[20px] text-center animate-fade-in-out">
                      {tabData[activeIndex].content}
                    </p>
                  </div>
                  <div className="support-img absolute -right-[120px] md:-right-[180px] lg:-right-[220px] xl:right-[-105px] 2xl:right-[-145px] -bottom-[60px] md:-bottom-[85px] lg:-bottom-[90px] xl:bottom-[-115px]">
                    <Image
                      src={tabData[activeIndex].supportImg}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "auto"}}
                      className={`w-[110px] sm:w-[180px] md:w-[200px] lg:w-[240px] xl:w-[180px] 2xl:w-fit block ${
                        animate ? "animate-fade-up" : ""
                      }`}
                      alt="Automations"
                    />
                  </div>
                  <div className="message-box absolute -right-[200px] md:-right-[250px] lg:-right-[320px] xl:-right-[220px] 2xl:-right-[310px] -top-[20px] lg:-top-[50px] xl:top-[30px] 2xl:top-[10px]">
                    <Image
                      src={tabData[activeIndex].messageImage}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "auto" }}
                      className={`w-[110px] sm:w-[150px] lg:w-[200px] lg:w-[180px] xl:w-[200px] 2xl:w-fit block ${
                        animate ? "animate-fade-up" : ""
                      }`}
                      alt="Automations"
                    />
                  </div>
                  <div className="common-arrow absolute -right-[330px] -bottom-[115px] hidden 2xl:block ">
                    <Image
                      src="/images/new-banners/startfinish-section/tb1/common-arrow.png"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "auto" }}
                      className={`w-[110px] md:w-[240px] 2xl:w-fit block ${
                        animate ? "animate-fade-up" : ""
                      }`}
                      alt="Automations"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
