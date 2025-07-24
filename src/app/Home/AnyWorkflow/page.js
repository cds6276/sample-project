"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnyWorkflow() {
    /* ─── State & Refs ─────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState(1);
  const tabButtons = useRef([]);
  const tabContainerRef = useRef(null);
  const [fadingOut, setIsFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [autoSwitchPaused, setAutoSwitchPaused] = useState(false);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [scrollBuffer, setScrollBuffer] = useState(false);
  const bufferTimerRef = useRef(null);
  const topScrollRef = useRef(null);

  /* ─── 1. Intersection Observer  (warning #1) ───────────────────── */
  useEffect(() => {
    const sectionEl = sectionRef.current;      // ✅ cache ref value once
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        setIsSectionVisible(nowVisible);

        if (!nowVisible) {
          setScrollBuffer(true);
          if (bufferTimerRef.current) clearTimeout(bufferTimerRef.current);
        } else {
          bufferTimerRef.current = setTimeout(
            () => setScrollBuffer(false),
            1000
          );
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.unobserve(sectionEl);            // ✅ always the same element
      if (bufferTimerRef.current) clearTimeout(bufferTimerRef.current);
    };
  }, []);

  /* ─── 2. Screen‑size watcher ──────────────────────────────────── */
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 640);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  /* ─── 3. Tab‑switch handler (memoised for warning #2) ─────────── */
  const handleTabSwitch = useCallback(
    (newTab, isAutoSwitch = false) => {
      if (fadingOut || activeTab === newTab) return;
      setIsFadingOut(true);

      // Scroll top (manual mobile taps only)
      if (!isAutoSwitch && topScrollRef.current && window.innerWidth < 600) {
        window.scrollTo({
          top: topScrollRef.current.offsetTop - 110,
          behavior: "smooth",
        });
      }

      const oldTab = activeTab;
      const oldTabEl = document.getElementById(`ftcontent${oldTab}`);
      const newTabEl = document.getElementById(`ftcontent${newTab}`);

      if (!oldTabEl || !newTabEl) {
        setActiveTab(newTab);
        setIsFadingOut(false);
        return;
      }

      // Button bounce
      const activeBtn = document.getElementById(`firsttab${newTab}`);
      gsap.fromTo(
        activeBtn,
        { scale: 0.95 },
        { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );

      // Fade old out ➜ fade new in
      gsap.to(
        [`#ftcontent${oldTab} .first-tab-image`, `#ftcontent${oldTab} .tab-text-content`],
        {
          opacity: 0,
          y: -40,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            oldTabEl.classList.add("hidden");
            newTabEl.classList.remove("hidden");

            gsap.set(
              [`#ftcontent${newTab} .first-tab-image`, `#ftcontent${newTab} .tab-text-content`],
              { opacity: 0, y: 40 }
            );

            animateTabContent(newTab);
            updateTabButtons(newTab);

            setTimeout(() => {
              setActiveTab(newTab);
              setIsFadingOut(false);
            }, 200);
          },
        }
      );
    },
    [activeTab, fadingOut]
  );

  /* ─── 4. Auto‑switch timer (warning #2 solved) ─────────────────── */
  useEffect(() => {
    if (!(isMobile && !autoSwitchPaused && isSectionVisible && !scrollBuffer)) return;

    const intervalId = setInterval(() => {
      const nextTab = activeTab === 4 ? 1 : activeTab + 1;
      handleTabSwitch(nextTab, true);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [
    activeTab,
    isMobile,
    autoSwitchPaused,
    isSectionVisible,
    scrollBuffer,
    handleTabSwitch,          // ✅ added per ESLint
  ]);

  /* ─── 5. Initial GSAP setup ───────────────────────────────────── */
  useEffect(() => {
    gsap.set([".first-tab-image", ".tab-text-content"], { opacity: 0, y: 40 });

    updateTabButtons(1);
    setupFirstTabAnimations();

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* ─── Helper animation fns (unchanged) ────────────────────────── */
  const animateTabContent = (tabNumber) => {
    gsap.to(`#ftcontent${tabNumber} .tab-text-content`, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.2)",
    });

    gsap.to(`#ftcontent${tabNumber} .first-tab-image`, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.2)",
      stagger: 0.15,
    });
  };

  const setupFirstTabAnimations = () => {
    const container = document.getElementById("ftcontent1");
    container?.classList.remove("hidden");

    ScrollTrigger.getAll().forEach((t) => t.kill());

    gsap.to("#ftcontent1 .tab-text-content", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "back.out(1.2)",
    });

    document.querySelectorAll("#ftcontent1 .first-tab-image").forEach((img, i) => {
      gsap.fromTo(
        img,
        { opacity: 1, y: 0 },
        {
          y: 0,
          duration: 0.2,
          delay: i * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: img.closest("#ftcontent1"),
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
        color: isActive ? "#2196F3" : "#000",
        backgroundColor: isActive ? "#EEFAFF" : "#f5f5f5",
        duration: 0.1,
        ease: "power2.out",
      });
    });
  };

  return (
    <>
      <div ref={sectionRef}>
        {/* <!-- Built for Every Workflow  section starts  - 2nd section --> */}
        <div className="px-[22px] xxl:px-0 mx-auto custom-container py-[60px] sm:py-[80px] lg:py-[100px]">
          <div className="max-w-[600px] lg:max-w-[850px] mx-auto mb-[20px] text-center ">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              The Way Work Should Feel.{" "}
              <br className="hidden sm:block md:hidden" />
              You’ll Feel the Difference.
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%]">
              Because every team, task, and process deserves a system that just
              fits.
            </p>
          </div>

          {/* <!-- Second section tab  --> */}
          <div className="mx-auto md:p-4">
            <div className="block lg:hidden" ref={topScrollRef}></div>

            {/* <!-- Tab buttons --> */}
            <div className="sm:p-4 lg:p-0 bg-[#fff] rounded-[12px] sticky lg:static top-0 z-[99] flex justify-center">
              <div
                className="overflow-x-auto hide-scrollbar w-fit flex sm:justify-center space-x-1 min-[575px]:space-x-2 md:space-x-4 relative tab-buttons w-full sm:w-fit"
                ref={tabContainerRef}
                onTouchStart={() => setAutoSwitchPaused(true)}
                onTouchEnd={() => setAutoSwitchPaused(false)}
                onMouseEnter={() => setAutoSwitchPaused(true)}
                onMouseLeave={() => setAutoSwitchPaused(false)}
              >
                <button
                  ref={(el) => (tabButtons.current[0] = el)}
                  className={`first-tab-button overflow-hidden py-[12px] px-[6px] sm:px-[14px] md:px-[20px] w-full sm:min-w-[135px] md:min-w-fit  text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#24262B] rounded-[10px] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[15%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-[0%] md:hover:before:scale-x-[80%]
                    ${
                      activeTab === 1
                        ? "text-[#2196f3] bg-[#eefaff]"
                        : "bg-[#f5f5f5] text-[#24262B]"
                    }
                    `}
                  id="firsttab1"
                  onClick={() => handleTabSwitch(1)}
                >
                  Any <br className="block min-[575px]:hidden" /> Workflow
                  <div
                    className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                      activeTab === 1 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>
                <button
                  ref={(el) => (tabButtons.current[1] = el)}
                  className={`first-tab-button overflow-hidden py-[12px] px-[8px] sm:px-[14px] md:px-[20px] w-full sm:min-w-[135px] md:min-w-fit  text-[12px] sm:text-[14px] md:text-[16px] font-medium text-[#24262B] rounded-[10px] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[15%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-[0%] md:hover:before:scale-x-[80%]
                    ${
                      activeTab === 2
                        ? "text-[#2196f3] bg-[#eefaff]"
                        : "bg-[#f5f5f5] text-[#24262B]"
                    }`}
                  id="firsttab2"
                  onClick={() => handleTabSwitch(2)}
                >
                  Any
                  <br className="block min-[575px]:hidden" /> Process
                  <div
                    className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block md:hidden ${
                      activeTab === 2 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>
                <button
                  ref={(el) => (tabButtons.current[2] = el)}
                  className={`first-tab-button overflow-hidden py-[12px] px-[8px] sm:px-[14px] md:px-[20px] w-full sm:min-w-[135px] md:min-w-fit  text-[12px] sm:text-[14px] md:text-[16px] font-medium  text-[#24262B] rounded-[10px] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[15%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-[0%] md:hover:before:scale-x-[80%]
                    ${
                      activeTab === 3
                        ? "text-[#2196f3] bg-[#eefaff]"
                        : "bg-[#f5f5f5] text-[#24262B]"
                    }
                    `}
                  id="firsttab3"
                  onClick={() => handleTabSwitch(3)}
                >
                  Any
                  <br className="block min-[575px]:hidden" /> Project
                  <div
                    className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block md:hidden ${
                      activeTab === 3 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>
                <button
                  ref={(el) => (tabButtons.current[3] = el)}
                  className={`first-tab-button overflow-hidden py-[12px] px-[8px] sm:px-[14px] md:px-[20px] w-full sm:min-w-[135px] md:min-w-fit text-[12px] sm:text-[14px] md:text-[16px] font-medium  text-[#24262B] rounded-[10px] hover:text-[#2196F3] hover:bg-[#EEFAFF] focus:outline-none transition-colors relative before:content-[''] before:absolute before:left-[15%] before:bottom-0 before:h-0.5 before:w-[85%] before:bg-[#2196F3] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-[0%] md:hover:before:scale-x-[80%]
                        ${
                          activeTab === 4
                            ? "text-[#2196f3] bg-[#eefaff]"
                            : "bg-[#f5f5f5] text-[#24262B]"
                        }
                    `}
                  id="firsttab4"
                  onClick={() => handleTabSwitch(4)}
                >
                  Any
                  <br className="block min-[575px]:hidden" /> Task
                  <div
                    className={`absolute bottom-[1px] left-0 h-0.5 bg-[#2196F3] block md:hidden ${
                      activeTab === 4 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* <!-- Tab Content --> */}
            <div className="mt-4">
              {/* <!-- tab-1 --> */}
              <div id="ftcontent1" className="first-tab-content">
                <div className="flex flex-col lg:flex-row sm:gap-3 items-center justify-center lg:justify-between mt-[20px] sm:mt-[40px] 2xl:mt-0 2xl:p-[60px] !pb-0">
                  <div className="w-full md:w-[90%] lg:w-[46%] tab-text-content text-center lg:text-left">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Map your workflows
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      No matter how simple or complex, Jugl can map and manage
                      your workflows from start to finish. Whether it&apos;s an{" "}
                      <span className="text-[#24262B] font-semibold">
                        Order Workflow, Service Workflow, Approval Workflow,
                        Client Update Workflow,
                      </span>{" "}
                      or any other custom process, Jugl lets you define steps,
                      set triggers, and automate actions.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

                  <div className="md:w-[90%] lg:w-[50%]  flex flex-col items-center justify-center mt-0">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#DBDBF9]  fourth-tab-image w-full ">
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  md:-ml-[40px] 2xl:-ml-[50px] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-res.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  block sm:hidden"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[230px] 2xl:w-fit absolute top-[17%] right-[8%] lg:-right-[6%] 2xl:right-[8%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[220px] 2xl:w-fit absolute -bottom-[2%] right-[9%] lg:-right-[5%] 2xl:right-[9%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[100px] 2xl:w-fit absolute top-[6%] right-[9%] lg:-right-[5%] 2xl:right-[9%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full  lg:w-[60px] xl:w-fit absolute -bottom-[6%] right-[35%] lg:right-[15%] 2xl:right-[38%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct1-cd5.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full w-fit absolute top-[40%] right-[9%] lg:-right-[5%] 2xl:right-[9%] hidden sm:block"
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[80px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

              {/* <!-- tab 2 --> */}
              <div id="ftcontent2" className="first-tab-content hidden">
                <div className="flex flex-col lg:flex-row sm:gap-3 items-center justify-center lg:justify-between mt-[20px] sm:mt-[40px] 2xl:mt-0 2xl:p-[60px] !pb-0">
                  <div className="w-full md:w-[90%] lg:w-[46%] tab-text-content text-center lg:text-left">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Visibility on every step
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Every business has unique processes. Jugl gives you the{" "}
                      <span className="text-[#24262B] font-semibold">
                        flexibility to customize, automate, and monitor any
                        process
                      </span>{" "}
                      — whether it&apos;s customer{" "}
                      <span className="text-[#24262B] font-semibold">
                        onboarding, order fulfillment, employee scheduling, or
                        compliance checks
                      </span>
                      . Stay organized and in control at every step.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

                  <div className="md:w-[90%] lg:w-[50%]  flex flex-col items-center justify-center mt-0">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#CBE7E9]  fourth-tab-image w-full ">
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  md:-ml-[40px] 2xl:-ml-[50px] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2-res.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  block sm:hidden"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[230px] 2xl:w-fit absolute top-[22%] right-[2%] lg:-right-[6%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[220px] 2xl:w-fit absolute -bottom-[2%] right-[2%] lg:-right-[5%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[60px] xl:w-fit absolute -bottom-[1%] right-[34%] lg:right-[24%] 2xl:right-[34%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct2-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full  lg:w-[100px] 2xl:w-fit absolute top-[8%] right-[1%] lg:-right-[1%] 2xl:right-[9%] hidden sm:block"
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[80px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

              {/* <!-- tab-3 --> */}
              <div id="ftcontent3" className="first-tab-content hidden">
                <div className="flex flex-col lg:flex-row sm:gap-3 items-center justify-center lg:justify-between mt-[20px] sm:mt-[40px] 2xl:mt-0 2xl:p-[60px] !pb-0">
                  <div className="w-full md:w-[90%] lg:w-[46%] tab-text-content text-center lg:text-left">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Keep your team aligned <br className="block lg:hidden" />{" "}
                      and productive
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      From small team initiatives to large-scale projects, it&apos;s
                      customer{" "}
                      <span className="text-[#24262B] font-semibold">
                        Jugl provides the tools to plan, assign, and track every
                        element.
                      </span>{" "}
                      Break projects into manageable actions, set priorities,
                      monitor timelines, and collaborate easily — keeping your
                      team aligned and productive.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

                  <div className="md:w-[90%] lg:w-[50%]  flex flex-col items-center justify-center mt-0">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#FFDBEF]  fourth-tab-image w-full ">
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  md:-ml-[40px] 2xl:-ml-[50px] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-res.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  block sm:hidden"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-20 max-w-full lg:w-[180px] 2xl:w-fit absolute top-[16%] right-[2%] lg:-right-[6%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[250px] 2xl:w-fit absolute -bottom-[2%] right-[2%] lg:right-[1%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[60px] xl:w-fit absolute -bottom-[1%] right-[34%] lg:right-[34%] 2xl:right-[44%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full  lg:w-[100px] 2xl:w-fit absolute top-[18%] right-[22%] lg:right-[25%] 2xl:right-[28%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct3-cd5.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-20 max-w-full  lg:w-[100px] 2xl:w-fit absolute top-[4%] right-[1%] lg:right-[1%] 2xl:right-[6%] hidden sm:block"
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[80px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

              {/* <!-- tab-4 --> */}
              <div id="ftcontent4" className="first-tab-content hidden">
                <div className="flex flex-col lg:flex-row sm:gap-3 items-center justify-center lg:justify-between mt-[20px] sm:mt-[40px] 2xl:mt-0 2xl:p-[60px] !pb-0">
                  <div className="w-full md:w-[90%] lg:w-[46%] tab-text-content text-center lg:text-left">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Ensure Nothing Slips
                    </h2>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Whether it&apos;s a one-off job or a recurring responsibility,
                      Jugl makes task management effortless.{" "}
                      <span className="text-[#24262B] font-semibold">
                        Create, assign, and track tasks
                      </span>{" "}
                      with clarity,{" "}
                      <span className="text-[#24262B] font-semibold">
                        automate reminders,
                      </span>{" "}
                      and ensure nothing slips through the cracks, no matter how
                      big or small.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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

                  <div className="md:w-[90%] lg:w-[50%]  flex flex-col items-center justify-center mt-0">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#DBF1F9]  fourth-tab-image w-full ">
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  md:-ml-[40px] 2xl:-ml-[50px] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-res.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain relative z-10 max-w-full  block sm:hidden"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-20 max-w-full sm:w-[200px] lg:w-[180px] 2xl:w-fit absolute top-[16%]   right-[4%] lg:right-[6%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[180px] xl:w-fit absolute bottom-0 right-[4%] lg:right-[1%] 2xl:right-[4%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full lg:w-[80px] xl:w-fit absolute -bottom-[1%] right-[34%] lg:right-[28%] 2xl:right-[27%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-10 max-w-full  w-[80px] 2xl:w-fit absolute top-[10%] right-[25%] lg:right-[32%] 2xl:right-[38%] hidden sm:block"
                      />
                      <Image
                        src="/images/new-banners/workflow-section/rw-ct4-cd5.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="first-tab-image object-contain  z-20 max-w-full  lg:w-[100px] 2xl:w-fit absolute bottom-[16%] right-[31%] lg:right-[31%] 2xl:right-[31%] hidden sm:block"
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[80px]">
                      <button type="button">
                        <a
                          className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[14px] sm:text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
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
                      </button>
                      <button type="button">
                        <a
                          className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[230px] sm:w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
                          href="demo"
                        >
                          {" "}
                          Schedule a Demo
                          <div>
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
    </>
  );
}
