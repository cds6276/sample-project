"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AiAgent() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const topScrollRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(true);
  const tabContentRef = useRef(null);

  const [visibleImages, setVisibleImages] = useState([]);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const tabButtonRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const videoRefs = useRef({});
  [1, 2, 3].forEach((tabIndex) => {
    if (!videoRefs.current[tabIndex]) {
      videoRefs.current[tabIndex] = React.createRef();
    }
  });

  useEffect(() => {
    const newVideo = videoRefs.current[activeTab]?.current;
    if (newVideo) {
      try {
        newVideo.currentTime = 0;
        const playPromise = newVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch (e) {
        console.error("Failed to play video:", e);
      }
    }
  }, [activeTab]);

  // Handle mobile resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for section visibility
 useEffect(() => {
  const sectionElement = sectionRef.current; // ✅ Cache ref once
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsSectionVisible(entry.isIntersecting);
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    }
  );

  if (sectionElement) {
    observer.observe(sectionElement);
  }

  return () => {
    if (sectionElement) {
      observer.unobserve(sectionElement); // ✅ Cleanup with cached value
    }
  };
}, []);


  const handleTabClick = (tabIndex) => {
    if (activeTab === tabIndex || !gsapLoaded) return;

    tabButtonRefs[tabIndex]?.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    // Scroll to just below sticky buttons
    topScrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const currentVideo = videoRefs.current[activeTab]?.current;
    if (currentVideo && !currentVideo.paused) currentVideo.pause();

    gsap.to(tabContentRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(tabIndex);
        requestAnimationFrame(() => {
          setTimeout(() => {
            const newVideo = videoRefs.current[tabIndex]?.current;
            if (newVideo) {
              try {
                newVideo.currentTime = 0;
                const playPromise = newVideo.play();
                if (playPromise !== undefined) {
                  playPromise.catch((err) =>
                    console.warn("Video play interrupted:", err)
                  );
                }
              } catch (e) {
                console.error("Failed to play video:", e);
              }
            }
          }, 100);
        });
      },
    });
  };

  // Auto-play videos when section becomes visible
  useEffect(() => {
    if (isSectionVisible) {
      Object.values(videoRefs).forEach((videoRef) => {
        if (videoRef.current) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) =>
              console.warn("Video play interrupted:", err)
            );
          }
        }
      });
    } else {
      Object.values(videoRefs).forEach((videoRef) => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }
  }, [isSectionVisible]);

  // Video component with optimizations
  const VideoPlayer = ({ videoRef, poster, videoSrc }) => (
    <>
      <video
        ref={videoRef}
        className="!block w-full h-auto rounded-none"
        loop
        muted
        playsInline
        preload="none"
        poster={poster}
        disablePictureInPicture
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute -top-[6px] -right-[9px] p-[4px] rounded-bl-[0px] rounded-full bg-[#5358FC]">
        <Image
          className="w-[70px]"
          width="70"
          height="70"
          src="/images/new-banners/ai-agent/tab1/animationdot.gif"
          alt="banner"
        />
      </div>
    </>
  );

  // Individual content layouts
  const AgentCard = ({
    videoRef,
    title,
    subtitle,
    videoPoster,
    videoSrc,
    bullets = [],
    icon,
    layoutType = "layout-1",
  }) => {
    const isLayout1 = layoutType === "layout-1";
    const isLayout2 = layoutType === "layout-2";
    const isLayout3 = layoutType === "layout-3";
    const isLayout4 = layoutType === "layout-4";

    const [animatedImages, setAnimatedImages] = useState([]);

    useEffect(() => {
      if (isLayout2) {
        setAnimatedImages([]); // reset before animate

        const delays = [0, 600, 1200];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setAnimatedImages((prev) => [...prev, index]);
          }, delay);
        });
      } else {
        setAnimatedImages([]); // reset if not layout2
      }
    }, [isLayout2]);

    useEffect(() => {
      if (isLayout3) {
        setAnimatedImages([]); // reset before animate

        const delays = [0, 600, 1200, 1800];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setAnimatedImages((prev) => [...prev, index]);
          }, delay);
        });
      } else {
        setAnimatedImages([]); // reset if not layout2
      }
    }, [isLayout3]);

    useEffect(() => {
      if (isLayout4) {
        setAnimatedImages([]); // reset before animate

        const delays = [0, 600, 1200, 1800, 2400];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setAnimatedImages((prev) => [...prev, index]);
          }, delay);
        });
      } else {
        setAnimatedImages([]); // reset if not layout2
      }
    }, [isLayout4]);

    return (
      <div className=" ">
        <div
          className={`relative  flex flex-col items-center md:items-end md:flex-row gap-[20px] md:gap-0 animate-fade-up
        ${
          isLayout2 || isLayout3 || isLayout4
            ? "bg-[#FEFBFD]  rounded-[30px]"
            : ""
        }
        `}
        >
          {/* Video & Details Block */}
          <div className="w-fit sm:w-[365px] max-w-[365px] sm:h-[422px] sm:max-w-full flex-shrink-0 flex flex-col p-[22px] bg-[#FEFBFD] rounded-[30px]">
            <div className="bg-[#fff] p-[10px] pb-0 flex flex-col justify-end border-8 border-[#EDF2FF] rounded-[16px] relative">
              <VideoPlayer
                videoRef={videoRef}
                poster={videoPoster}
                videoSrc={videoSrc}
              />
            </div>
            <div className="mt-[16px] flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-[#000] rounded-[8px] flex items-center justify-center">
                {icon}
              </div>
              <div>
                <p className="text-[#1B1C1F] text-[18px] font-semibold">
                  {title}
                </p>
                <p className="text-[#1B1C1F] text-[16px] font-medium">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Bullet/Text or Image Layout Block */}
          <div
            className={`${
              isLayout2 || isLayout3 || isLayout4
                ? "w-full flex flex-col"
                : "md:w-[50%] lg:w-[280px] lg:absolute xl:static sm:-right-[20px] lg:right-0 bottom-0 md:-bottom-[20px] justify-end md:-ml-[20px]"
            }`}
          >
            {isLayout1 && (
              <div className="xl:w-[330px] 2xl:w-[420px] h-fit bg-[#122259] px-[20px] sm:px-[40px] xl:px-[50px] py-[20px] sm:py-[30px] xl:py-[40px] rounded-[30px]">
                <ul className="list-disc pl-[20px] md:pl-0">
                  {Array.isArray(bullets) &&
                    bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="text-[#fff] text-[16px] mb-[12px] last:mb-0"
                      >
                        {bullet}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {isLayout2 && (
              <div className="w-full py-[20px] pr-[20px] pl-[20px] lg:pl-0 2xl:pl-[20px] flex flex-col ">
                <div className="animate-img-wrapper flex flex-col relative">
                  {[
                    { img: "1.png", cls: "mr-auto" },
                    { img: "2.png", cls: "mr-auto" },
                    { img: "3.png", cls: "mr-auto" },
                  ].map((img, i) => (
                    <Image
                      key={i}
                      src={`/images/new-banners/ai-agent/tab1/${img.img}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "auto" }}
                      alt={`Agent tab image ${i + 1}`}
                      className={`mb-4 w-fit transition-all duration-500 ease-out transform  ${
                        img.cls
                      }
                    ${
                      animatedImages.includes(i)
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95"
                    }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {isLayout3 && (
              <>
                <div className="w-full py-[20px] pr-[20px] pl-[20px] lg:pl-0 2xl:pl-[20px] flex flex-col">
                  <div className="animate-img-wrapper flex flex-col relative">
                    {[
                      { img: "1.png", cls: "ml-auto" },
                      { img: "2.png", cls: "mr-auto" },
                      { img: "3.png", cls: "ml-auto" },
                      { img: "4.png", cls: "mr-auto" },
                    ].map((img, i) => (
                      <Image
                        key={i}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        src={`/images/new-banners/ai-agent/tab2/${img.img}`}
                        alt={`Agent tab image ${i + 1}`}
                        className={`mb-4 w-fit transition-all duration-500  ease-out transform ${
                          img.cls
                        }
                    ${
                      animatedImages.includes(i)
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95"
                    }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {isLayout4 && (
              <>
                <div className="w-full py-[20px] pr-[20px] pl-[20px] lg:pl-0 2xl:pl-[20px] flex flex-col">
                  <div className="animate-img-wrapper flex flex-col relative">
                    {[
                      { img: "1.png", cls: "mr-auto" },
                      { img: "2.png", cls: "ml-auto" },
                      { img: "3.png", cls: "mr-auto" },
                      { img: "4.png", cls: "ml-auto" },
                      { img: "5.png", cls: "mr-auto" },
                    ].map((img, i) => (
                      <Image
                        key={i}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        src={`/images/new-banners/ai-agent/tab3/${img.img}`}
                        alt={`Agent tab image ${i + 1}`}
                        className={`mb-2 w-fit transition-all duration-500  ease-out transform ${
                          img.cls
                        }
                    ${
                      animatedImages.includes(i)
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95"
                    }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AgentIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 29 29"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.0352 4.90477C10.8763 2.44316 14.2774 2.36861 15.2747 4.68112L15.3591 4.90618L16.4942 8.22584C16.7543 8.98716 17.1747 9.68384 17.7269 10.2689C18.2792 10.8539 18.9504 11.3137 19.6955 11.6172L20.0007 11.7312L23.3202 12.8649C25.7817 13.7061 25.8562 17.1074 23.5452 18.1047L23.3202 18.1891L20.0007 19.3242C19.2392 19.5842 18.5423 20.0045 17.957 20.5568C17.3717 21.1091 16.9118 21.7805 16.6081 22.5257L16.4942 22.8296L15.3605 26.1506C14.5193 28.6122 11.1183 28.6868 10.1224 26.3757L10.0352 26.1506L8.90153 22.831C8.64157 22.0694 8.22128 21.3724 7.66902 20.7871C7.11676 20.2018 6.44538 19.7418 5.7002 19.4381L5.39638 19.3242L2.07689 18.1905C-0.385999 17.3493 -0.460546 13.948 1.85184 12.9521L2.07689 12.8649L5.39638 11.7312C6.15766 11.471 6.85429 11.0506 7.4393 10.4984C8.02431 9.94608 8.48408 9.27476 8.7876 8.52968L8.90153 8.22584L10.0352 4.90477ZM23.9503 0.0546878C24.2135 0.0546872 24.4713 0.128505 24.6946 0.267753C24.9179 0.407001 25.0976 0.606093 25.2134 0.842405L25.2809 1.00698L25.7732 2.45019L27.2178 2.94251C27.4815 3.03211 27.7127 3.19798 27.882 3.4191C28.0513 3.64023 28.1512 3.90665 28.169 4.1846C28.1868 4.46256 28.1216 4.73954 27.9819 4.98043C27.8421 5.22133 27.6339 5.4153 27.3838 5.53776L27.2178 5.60528L25.7746 6.0976L25.2824 7.54222C25.1926 7.80586 25.0266 8.03693 24.8054 8.20614C24.5842 8.37535 24.3178 8.47509 24.0399 8.49271C23.7619 8.51034 23.485 8.44506 23.2442 8.30515C23.0034 8.16524 22.8096 7.95699 22.6872 7.70679L22.6197 7.54222L22.1274 6.09901L20.6829 5.60669C20.4192 5.51709 20.188 5.35122 20.0187 5.1301C19.8493 4.90897 19.7494 4.64255 19.7317 4.3646C19.7139 4.08664 19.779 3.80966 19.9188 3.56877C20.0586 3.32787 20.2668 3.1339 20.5169 3.01144L20.6829 2.94392L22.126 2.4516L22.6183 1.00698C22.7132 0.729065 22.8926 0.487803 23.1315 0.317024C23.3704 0.146244 23.6567 0.0545113 23.9503 0.0546878Z" />
    </svg>
  );
  return (
    <>
      <div
        className="bg-[#ECF3FF] py-[60px] sm:py-[80px] lg:py-[100px] "
        ref={sectionRef}
      >
        <div className="px-[22px] xxl:px-0 mx-auto custom-container">
          <div className="max-w-[850px] mx-auto mb-[20px] text-center">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              Jugl AI Agents Suite
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%]">
              The Smarter Way to Manage Tasks, Teams, and Workflows — Built Into
              Jugl.
            </p>
          </div>

          <div className="mx-auto md:p-4 mt-[40px] 2xl-mt-0">
            <div className="flex flex-col lg:flex-row gap-[10px] sm:gap-[40px] items-center lg:items-start justify-center lg:justify-between 2xl:p-[60px] !pb-0">
              <div className="md:w-[90%] lg:w-[40%] text-center lg:text-start">
                <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                  Your Smart Companion for{" "}
                  <br className="hidden sm:block lg:hidden" /> Work and Clarity
                </h2>
                <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px] pr-[20px]">
                  Jugl PA (Work Assistant Agent) is your intelligent companion
                  that processes all your work alerts, notifications, and
                  updates — then serves you exactly what matters. It helps you:
                </p>

                <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px]">
                  {/* <button type="button">
                  <a
                    className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                    href="add-me-to-the-waiting-list"
                  >
                    Add Me to the Waiting List
                    <svg
                      className="w-[12px] h-[12px] fill-[#fff]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </a>
                </button> */}
                  <button type="button" className="mt-0">
                    <a
                      className="skey flex gap-3 items-center relative text-[#359cf0] hover:text-[#0077D5] group"
                      href="add-me-to-the-waiting-list"
                    >
                      <span className="rounded-[10px] text-[18px] font-medium hover:text-[#0077D5]">
                        Add Me to the Waiting List
                      </span>
                      <svg
                        className="w-[14px] fill-[#359cf0] group-hover:fill-[#0077D5]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                      </svg>
                    </a>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[90%] lg:w-[55%] relative">
                <div className="bg-[#ecf3ff] rounded-[12px] sticky lg:static top-0 pt-1 sm:pt-0 z-[99] flex justify-center">
                  <div className="mb-[20px] sm:mb-0 overflow-x-auto lg:overflow-x-visible hide-scrollbar w-full sm:w-fit flex justify-start space-x-1 sm:space-x-2 xl:space-x-4 relative overflow-x-auto hide-scrollbar scroll-smooth sm:py-2 lg:pb-3 sm:px-1">
                    {[1, 2, 3].map((tabIndex) => (
                      <button
                        key={tabIndex}
                        ref={tabButtonRefs[tabIndex]}
                        className={`aiAgent-tab-button text-center sm:text-left w-full sm:min-w-auto px-[8px] sm:px-[16px] py-[10px] rounded-[16px] border border-[#000] flex flex-col md:flex-row gap-2 items-center sm:items-start md:items-center text-[12px] sm:text-[14px] lg:text-[16px] font-medium group focus:outline-none transition-colors duration-300 ${
                          activeTab === tabIndex
                            ? "bg-[#000000] text-white border-[#000000] shadow-[0px_8px_8px_rgba(151,71,255,0.12)]"
                            : "text-[#000] hover:text-[#9747FF] hover:shadow-[0px_8px_8px_rgba(151,71,255,0.12)] hover:border-[#9747FF]"
                        }`}
                        id={`aiAgenttab${tabIndex}`}
                        onClick={() => handleTabClick(tabIndex)}
                      >
                        <svg
                          className={`w-[14px] sm:w-[28px] sm:h-[28px] transition-colors duration-300 ${
                            activeTab === tabIndex
                              ? "!fill-white"
                              : "fill-[#000] group-hover:fill-[#9747FF]"
                          }`}
                          viewBox="0 0 29 29"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.0352 4.90477C10.8763 2.44316 14.2774 2.36861 15.2747 4.68112L15.3591 4.90618L16.4942 8.22584C16.7543 8.98716 17.1747 9.68384 17.7269 10.2689C18.2792 10.8539 18.9504 11.3137 19.6955 11.6172L20.0007 11.7312L23.3202 12.8649C25.7817 13.7061 25.8562 17.1074 23.5452 18.1047L23.3202 18.1891L20.0007 19.3242C19.2392 19.5842 18.5423 20.0045 17.957 20.5568C17.3717 21.1091 16.9118 21.7805 16.6081 22.5257L16.4942 22.8296L15.3605 26.1506C14.5193 28.6122 11.1183 28.6868 10.1224 26.3757L10.0352 26.1506L8.90153 22.831C8.64157 22.0694 8.22128 21.3724 7.66902 20.7871C7.11676 20.2018 6.44538 19.7418 5.7002 19.4381L5.39638 19.3242L2.07689 18.1905C-0.385999 17.3493 -0.460546 13.948 1.85184 12.9521L2.07689 12.8649L5.39638 11.7312C6.15766 11.471 6.85429 11.0506 7.4393 10.4984C8.02431 9.94608 8.48408 9.27476 8.7876 8.52968L8.90153 8.22584L10.0352 4.90477ZM23.9503 0.0546878C24.2135 0.0546872 24.4713 0.128505 24.6946 0.267753C24.9179 0.407001 25.0976 0.606093 25.2134 0.842405L25.2809 1.00698L25.7732 2.45019L27.2178 2.94251C27.4815 3.03211 27.7127 3.19798 27.882 3.4191C28.0513 3.64023 28.1512 3.90665 28.169 4.1846C28.1868 4.46256 28.1216 4.73954 27.9819 4.98043C27.8421 5.22133 27.6339 5.4153 27.3838 5.53776L27.2178 5.60528L25.7746 6.0976L25.2824 7.54222C25.1926 7.80586 25.0266 8.03693 24.8054 8.20614C24.5842 8.37535 24.3178 8.47509 24.0399 8.49271C23.7619 8.51034 23.485 8.44506 23.2442 8.30515C23.0034 8.16524 22.8096 7.95699 22.6872 7.70679L22.6197 7.54222L22.1274 6.09901L20.6829 5.60669C20.4192 5.51709 20.188 5.35122 20.0187 5.1301C19.8493 4.90897 19.7494 4.64255 19.7317 4.3646C19.7139 4.08664 19.779 3.80966 19.9188 3.56877C20.0586 3.32787 20.2668 3.1339 20.5169 3.01144L20.6829 2.94392L22.126 2.4516L22.6183 1.00698C22.7132 0.729065 22.8926 0.487803 23.1315 0.317024C23.3704 0.146244 23.6567 0.0545113 23.9503 0.0546878Z" />
                        </svg>
                        {tabIndex === 1 && (
                          <span>
                            Work <br className="block min-[575px]:hidden" />{" "}
                            Assistant{" "}
                            <br className="block min-[575px]:hidden" /> Agent
                          </span>
                        )}
                        {tabIndex === 2 && (
                          <span>
                            Work <br className="block min-[575px]:hidden" />{" "}
                            Manager <br className="block min-[575px]:hidden" />{" "}
                            Agent
                          </span>
                        )}
                        {tabIndex === 3 && (
                          <span>
                            Workflow <br className="block min-[575px]:hidden" />{" "}
                            Agent
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Static Agent Cards */}
                <div className="sm:pt-[30px]">
                  {/* Work Assistant Agent - ARIVU */}
                  {activeTab === 1 && (
                    <AgentCard
                      videoRef={videoRefs[1]}
                      title="ARIVU"
                      subtitle="Your Work Assistant Agent"
                      videoPoster="/images/new-banners/ai-agent/agent1.png"
                      videoSrc="/images/new-banners/ai-agent/agent1.mp4"
                      icon={
                        <AgentIcon className="w-[20px] h-[20px] fill-white" />
                      }
                      bullets={[
                        "Get clean, daily summaries of all your team and task activity",
                        "Draft structured tasks, with detailed steps and procedures",
                        "Understand the real-time status of work — who's doing what, what's overdue, and what needs your attention",
                      ]}
                      layoutType="layout-2"
                    />
                  )}

                  {/* Work Manager Agent - ABILI */}
                  {activeTab === 2 && (
                    <AgentCard
                      videoRef={videoRefs[2]}
                      title="ABILI"
                      subtitle="Your Work Manager Agent"
                      videoPoster="/images/new-banners/ai-agent/agent2.png"
                      videoSrc="/images/new-banners/ai-agent/agent2.mp4"
                      icon={
                        <AgentIcon className="w-[20px] h-[20px] fill-white" />
                      }
                      bullets={[
                        "Performance insights across individuals and departments",
                        "Smart suggestions to improve task allocation and timelines",
                        "A clear picture of who needs support — and who deserves a high five",
                      ]}
                      layoutType="layout-3"
                    />
                  )}

                  {/* Workflow Agent - VERA */}
                  {activeTab === 3 && (
                    <AgentCard
                      videoRef={videoRefs[3]}
                      title="VERA"
                      subtitle="Your Workflow Agent"
                      videoPoster="/images/new-banners/ai-agent/agent3.png"
                      videoSrc="/images/new-banners/ai-agent/agent3.mp4"
                      icon={
                        <AgentIcon className="w-[20px] h-[20px] fill-white" />
                      }
                      bullets={[
                        "Assign it to handle specific tasks in your workflow (like alerts, transitions, or follow-ups)",
                        "Automate routine touchpoints within a larger, human-managed flow",
                        "Improve consistency and reduce dropped steps across departments",
                      ]}
                      layoutType="layout-4"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
