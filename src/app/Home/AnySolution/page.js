"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnySolution() {
  const [activeTab, setActiveTab] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef(Array(9).fill(null));
  const tabButtons = useRef([]);
  const topScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Update your existing handleTimeUpdate function
  const handleTimeUpdate = useCallback((event) => {
    const video = event.target;
    if (video) setCurrentTime(video.currentTime);
  }, []);

  // Update your existing handleLoadedMetadata function
  const handleLoadedMetadata = useCallback((event) => {
    const video = event.target;
    if (video) setDuration(video.duration);
  }, []);

  const handleProgressClick = (event) => {
    event.stopPropagation();
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate click position relative to center
    const clickX = event.clientX - centerX;
    const clickY = event.clientY - centerY;

    // Calculate angle from top (accounting for -90deg rotation)
    let angle = Math.atan2(clickX, -clickY) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // Convert angle to progress percentage (0-100)
    const progressPercentage = (angle / 360) * 100;

    // Set video time based on clicked position
    const video = videoRefs.current[activeTab - 1];
    if (video && duration > 0) {
      const newTime = (progressPercentage / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const addVideoEventListeners = useCallback(
    (video) => {
      if (video) {
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
      }
    },
    [handleTimeUpdate, handleLoadedMetadata]
  );

  const removeVideoEventListeners = useCallback(
    (video) => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    },
    [handleTimeUpdate, handleLoadedMetadata]
  );

  const updateCurrentVideoProgress = useCallback(() => {
    const video = videoRefs.current[activeTab - 1];
    if (video) {
      setCurrentTime(video.currentTime || 0);
      setDuration(video.duration || 0);
    }
  }, [activeTab]);

  // Add this helper function to calculate progress
  const getVideoProgress = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  useEffect(() => {
    // Initial setup
    gsap.set(".second-tab-image, .tab-text-content", {
      opacity: 0,
      y: 40,
    });

    updateTabButtons(1);
    setupFirstTabAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNextTab = () => {
    const nextTab = activeTab === 9 ? 9 : activeTab + 1; // Adjust based on your tab count
    if (nextTab !== activeTab) {
      handleTabSwitch(nextTab);
    }
  };

  const handlePrevTab = () => {
    const prevTab = activeTab === 1 ? 1 : activeTab - 1;
    if (prevTab !== activeTab) {
      handleTabSwitch(prevTab);
    }
  };

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
    /** 1️⃣  Capture the element that exists *right now* */
    const elem = sectionRef.current;
    if (!elem) return;

    /** 2️⃣  Create the observer */
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    observer.observe(elem);

    /** 3️⃣  Clean up using *the same* elem reference */
    return () => {
      observer.unobserve(elem); // or simply observer.disconnect()
    };
  }, []);

  // Handle tab switch and play/pause video
  const handleTabSwitch = useCallback(
    (newTab, isAuto = false) => {
      if (activeTab === newTab) return;

      const currentVideo = videoRefs.current[activeTab - 1];
      removeVideoEventListeners(currentVideo);

      if (isPlaying && currentVideo) {
        currentVideo.load();
        setIsPlaying(false);
      }

      const oldTab = activeTab;
      const newTabEl = document.getElementById(`secondTabContent${newTab}`);
      const oldTabEl = document.getElementById(`secondTabContent${oldTab}`);

      gsap.to(
        [
          `#secondTabContent${oldTab} .second-tab-image`,
          `#secondTabContent${oldTab} .tab-text-content`,
        ],
        {
          opacity: 0,
          y: -40,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            oldTabEl?.classList.add("hidden");
            newTabEl?.classList.remove("hidden");

            gsap.set(`#secondTabContent${newTab} .second-tab-image`, {
              opacity: 0,
              y: 40,
            });
            gsap.set(`#secondTabContent${newTab} .tab-text-content`, {
              opacity: 0,
              y: 40,
            });

            animateTabContent(newTab);
            setActiveTab(newTab);
            updateTabButtons(newTab);

            const newVideo = videoRefs.current[newTab - 1];
            if (newVideo) {
              addVideoEventListeners(newVideo);
              updateCurrentVideoProgress();
            } else {
              setCurrentTime(0);
              setDuration(0);
            }
          },
        }
      );

      const clickedTabBtn = tabButtons.current[newTab - 1];
      clickedTabBtn?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      if (!isAuto) {
        const tabButtonContainer = document.querySelector(".sol-stick-tab");
        const isSticky = tabButtonContainer?.classList.contains("sticky");

        if (topScrollRef.current && window.innerWidth < 600 && isSticky) {
          window.scrollTo({
            top: topScrollRef.current.offsetTop - 120,
            behavior: "smooth",
          });
        }
      }
    },
    [
      activeTab,
      isPlaying,
      setIsPlaying,
      setActiveTab,
      setCurrentTime,
      setDuration,
      addVideoEventListeners,
      removeVideoEventListeners,
      updateCurrentVideoProgress,
    ]
  );

  // Play/pause video on button click
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[activeTab - 1];
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.pause();
    } else {
      currentVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Auto tab change functionality for mobile when section is visible
  useEffect(() => {
    if (!isMobile || !isSectionVisible || isPlaying) return;

    const interval = setInterval(() => {
      const nextTab = activeTab === 9 ? 1 : activeTab + 1;
      handleTabSwitch(nextTab, true);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab, isMobile, isSectionVisible, isPlaying, handleTabSwitch]); // ✅ added handleTabSwitch

  // Animation for tab content
  const animateTabContent = (tabNumber) => {
    gsap.to(`#secondTabContent${tabNumber} .tab-text-content`, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.2)",
    });

    gsap.to(`#secondTabContent${tabNumber} .second-tab-image`, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.2)",
      stagger: 0.15,
    });
  };

  const setupFirstTabAnimations = () => {
    const container = document.getElementById("secondTabContent1");
    container?.classList.remove("hidden");

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.to("#secondTabContent1 .tab-text-content", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "back.out(1.2)",
    });

    document
      .querySelectorAll("#secondTabContent1 .second-tab-image")
      .forEach((img, index) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            delay: index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: img.closest(".second-tab-content"),
              start: "top 70%",
              end: "bottom center",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
  };

  const updateTabButtons = (tabNumber) => {
    tabButtons.current.forEach((btn, index) => {
      const isActive = index + 1 === tabNumber;
      gsap.to(btn, {
        color: isActive ? "#2196F3" : "#24262B",
        backgroundColor: isActive ? "#EEFAFF" : "transparent",
        duration: 0.1,
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[activeTab - 1];
    if (currentVideo) {
      addVideoEventListeners(currentVideo);
      updateCurrentVideoProgress();
    }

    const videoRefsSnapshot = videoRefs.current; // ✅ take snapshot here

    return () => {
      videoRefsSnapshot.forEach((video) => {
        removeVideoEventListeners(video);
      });
    };
  }, [
    activeTab,
    addVideoEventListeners,
    removeVideoEventListeners,
    updateCurrentVideoProgress,
  ]);

  return (
    <>
      {/* <!-- solution section starts    - 3rd section --> */}
      <div className="bg-[#EEFAFF] " ref={sectionRef}>
        <div className="px-[22px] mx-auto custom-container py-[60px] sm:py-[80px] lg:py-[100px]">
          <div className="max-w-[850px] mx-auto mb-[20px] text-center">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              The Simplicity Teams Deserve
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] ">
              Jugl brings just what each team needs - no clutter, no overwhelm.
              It’s the way work should always feel: focused, flexible, and built
              around you.
            </p>
          </div>

          {/* <!-- Second section tab --> */}
          <div className=" mx-auto sm:px-4 sm:pt-4 xl:border-b-[6px] border-[#2196F3] ">
            <div className="block lg:hidden" ref={topScrollRef}></div>

            {/* <!-- Tab buttons --> */}
            <div className=" sol-stick-tab relative py-3 sm:p-4 lg:p-0 bg-[#EEFAFF] lg:bg-transparent rounded-[12px] sticky lg:relative top-0  z-[99]">
              <div className=" overflow-x-auto hide-scrollbar w-[75%] min-[500px]:w-[80%] sm:w-[85%] lg:w-[90%] lg:w-auto mx-auto">
                <div
                  className="flex justify-center space-x-0 xl:space-x-2 2xl:space-x-4  min-w-max   mx-auto"
                  id="secondTabButtons"
                >
                  <button
                    ref={(el) => (tabButtons.current[0] = el)}
                    id="secondTab1"
                    className={`second-tab-button py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 1
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%] "
                    }`}
                    onClick={() => handleTabSwitch(1)}
                  >
                    Customer Support
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 1 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[1] = el)}
                    id="secondTab2"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 2
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(2)}
                  >
                    Production
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 2 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[2] = el)}
                    id="secondTab3"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 3
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(3)}
                  >
                    Sales
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 3 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[3] = el)}
                    id="secondTab4"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 4
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] sm:before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(4)}
                  >
                    Procurement
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 4 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[4] = el)}
                    id="secondTab5"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 5
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(5)}
                  >
                    Media
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 5 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[5] = el)}
                    id="secondTab6"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 6
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(6)}
                  >
                    HR
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 6 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                  <button
                    ref={(el) => (tabButtons.current[6] = el)}
                    id="secondTab7"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 7
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(7)}
                  >
                    Finance
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 7 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>

                  <button
                    ref={(el) => (tabButtons.current[7] = el)}
                    id="secondTab8"
                    className={`second-tab-button  py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 8
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(8)}
                  >
                    Field Work
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 8 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>

                  <button
                    ref={(el) => (tabButtons.current[8] = el)}
                    id="secondTab9"
                    className={`second-tab-button py-2 px-2 md:px-4 whitespace-nowrap text-[13px] min-[575px]:text-[14px] md:text-[16px] font-medium text-[#24262B] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[10%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 overflow-hidden
                    ${
                      activeTab === 9
                        ? "text-[#2196F3] bg-[#EEFAFF] before:scale-x-[0%] lg:before:scale-x-[90%]"
                        : "text-[#24262B] bg-transparent hover:before:scale-x-[0%] lg:hover:before:scale-x-[90%]  "
                    }`}
                    onClick={() => handleTabSwitch(9)}
                  >
                    Marketing
                    <div
                      className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                        activeTab === 9 ? "animate-progressBar" : "w-0"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* <!-- Prev - Next button --> */}
              <button
                className="tab-nav-button absolute left-0 top-[16px] p-[8px] sm:p-[12px] bg-[#359cf0] rounded-[8px]  z-11 block lg:hidden z-[22]"
                onClick={() => handlePrevTab()}
                disabled={activeTab === 1}
              >
                <svg
                  className="w-[12px] md:w-[18px] h-[12px] md:h-[18px] fill-[#fff]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
              <button
                className="tab-nav-button absolute right-0  top-[14px] sm:top-[16px] p-[8px] sm:p-[12px] bg-[#359cf0] rounded-[8px] block lg:hidden z-[22]"
                onClick={handleNextTab}
                disabled={activeTab === 9}
              >
                <svg
                  className="w-[12px] md:w-[18px] h-[12px] md:h-[18px] fill-[#fff]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
            </div>

            {/* 
            <!-- Tab Content --> */}
            <div className="mt-[10px] sm:mt-[30px] lg:mt-[50px] 2xl:mt-4">
              {/* tab 1 */}
              <div id="secondTabContent1" className="second-tab-content">
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className=" relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[0] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[0];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct1.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct1.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Customer Support That{" "}
                      <br className="hidden sm:block lg:hidden" /> Stays
                      Organized
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Log customer issues, assign support tickets, track
                      follow-ups, and update status - all from one place. Jugl
                      helps your support team move faster and stay accountable.
                    </p>

                    {/* responsive btn */}
                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 2 */}
              <div
                id="secondTabContent2"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2  sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className=" relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[1] = el)}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[1];
                          if (video) video.load();
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo"
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct2.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct2.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Streamlined Production <br className=" block lg:hidden" />{" "}
                      Task Handling
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Manage production steps, assign responsibilities, upload
                      quality checks, and track progress in real time. Jugl
                      keeps the floor and back office in sync.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium  text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 3 */}
              <div
                id="secondTabContent3"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className="relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[2] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[2];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct3.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct3.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Sales That Never <br /> Miss a Beat
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Track prospects, set reminders, attach proposals, and
                      follow through on every lead. Jugl simplifies your sales
                      workflow - from pitch to payment.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 4 */}
              <div
                id="secondTabContent4"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className="relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[3] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[3];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct4.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct4.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Procurement with <br className="block lg:hidden" /> Clear
                      Accountability
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Track purchase requests, manage vendor communication, log
                      invoices, and monitor order status. Jugl gives full
                      visibility across your procurement cycle.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 5 */}
              <div
                id="secondTabContent5"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className="relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[4] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[4];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct5.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct5.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Plan Media Like a Pro
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Organize campaign ideas, assign creative tasks, manage
                      approvals, and track deadlines - all in one workspace.
                      Jugl brings calm to chaotic media planning.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 6 */}
              <div
                id="secondTabContent6"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between">
                  <div className="relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[5] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[5];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct6.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct6.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      HR That Works <br /> for People
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Manage hiring pipelines, onboarding checklists, team
                      training, and policy updates. Jugl helps HR teams support
                      people without drowning in admin.
                    </p>
                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium  text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 7 */}
              <div
                id="secondTabContent7"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between xl:overflow-hidden">
                  <div className=" relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[6] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[6];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct7.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct7.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Finance That’s <br /> Fully Aligned
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Attach invoices, track payments, automate approval
                      workflows, and keep stakeholders informed. With Jugl,
                      finance teams move faster with fewer emails.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 8 */}
              <div
                id="secondTabContent8"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between xl:overflow-hidden">
                  <div className=" relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[7] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[7];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct8.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct8.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Field Work <br /> You Can Follow
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Log travel, access work orders, upload proof of
                      completion, and chat with the team. Jugl keeps your mobile
                      workforce connected and productive.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab 9 */}
              <div
                id="secondTabContent9"
                className="second-tab-content text-gray-700 text-base hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[30px] lg:gap-[60px] items-center lg:items-end justify-center lg:justify-between xl:overflow-hidden">
                  <div className=" relative flex flex-col items-center justify-center xl:justify-end order-2 lg:order-1 2xl:pl-[60px] 2xl:pt-[60px] ">
                    <div
                      id="videoContainer"
                      className="relative w-[558px] max-w-full group outline-0"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={(el) => (videoRefs.current[8] = el)} // Video reference
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                          const video = videoRefs.current[8];
                          if (video) {
                            video.load(); // Reset the video
                          }
                          setIsPlaying(false);
                          setDuration(0);
                          setCurrentTime(0);
                        }}
                        className="!block w-full h-auto rounded-none second-tab-image border-b-[6px] border-[#2196F3] xl:border-0 customVideo "
                        playsInline
                        poster="/images/new-banners/third-section/tb-ct9.png"
                      >
                        <source
                          src="/images/new-banners/third-section/tb-ct9.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Only show when hovered */}
                      <button
                        id="toggleButton"
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 outline-0 hover:scale-100"
                        onClick={togglePlayPause}
                      >
                        <div className="relative">
                          {/* Show progress ring + pause icon ONLY on hover + playing */}
                          {isHovered && isPlaying && (
                            <svg
                              className="w-16 h-16 min-[575px]:w-20 min-[575px]:h-20 transform -rotate-90 cursor-pointer"
                              viewBox="0 0 80 80"
                              onClick={handleProgressClick}
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="4"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 30}`}
                                strokeDashoffset={`${
                                  2 *
                                  Math.PI *
                                  30 *
                                  (1 - getVideoProgress() / 100)
                                }`}
                                className="transition-all duration-200 ease-out"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="38"
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </svg>
                          )}

                          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                            {/* Always show play icon when not playing */}
                            {!isPlaying && (
                              <div
                                id="playIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full relative shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <div className="absolute inset-0 bg-[#359cf0] rounded-full animate-ping opacity-20"></div>
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white relative z-10 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}

                            {/* Show pause icon ONLY when playing AND hovered */}
                            {isPlaying && isHovered && (
                              <div
                                id="pauseIcon"
                                className="bg-[#359cf0] p-2 min-[575px]:p-3 rounded-full shadow-lg pointer-events-auto"
                                onClick={togglePlayPause}
                              >
                                <svg
                                  className="w-6 min-[575px]:w-8 h-6 min-[575px]:h-8 text-white "
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className=" order-1 lg:order-2 text-center lg:text-start 2xl:pr-[60px] xl:pb-[50px] 2xl:py-[60px] tab-text-content">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Marketing Campaigns, <br className="" /> Clearly Tracked
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Plan content, assign deadlines, log assets, and automate
                      campaign tasks. Jugl ensures your marketing team never
                      loses sight of the plan.
                    </p>

                    <div className="hidden lg:flex gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] md:mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                          href="demo"
                        >
                          Add Me to the Waiting list
                          <svg
                            className="w-[12px] h-[12px] fill-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </a>
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div className="">
                            <svg
                              className="w-[12px] h-[12px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                            </svg>
                          </div>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- solution  section ends --> */}
      <style jsx>
        {`
          .tab-nav-button:disabled {
            opacity: 0.2;
            cursor: not-allowed;
          }
        `}
      </style>
    </>
  );
}
