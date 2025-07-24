"use client";
import React, { useRef, useState, useEffect, useMemo, createRef, useCallback } from "react";
import Image from "next/image";

const TOTAL_TABS = 5;

export default function AnyCollaboration() {
 /* ──────────────────────── state ──────────────────────── */
  const [activeTab, setActiveTab] = useState(1);
  const [autoSwitchPaused, setAutoSwitchPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* ─────────────────────── stable refs ─────────────────── */
  // one ref per button that *never* changes
  const tabButtonRefs = useMemo(() => {
    const refs = {};
    for (let i = 1; i <= TOTAL_TABS; i++) refs[i] = createRef();
    return refs;
  }, []);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  /* ───────────────────── tab helpers ───────────────────── */
  const handleActiveTab = useCallback(
    (tabIndex) => {
      // wrap 0 ↦ 5 and 6 ↦ 1
      const wrapped = ((tabIndex - 1 + TOTAL_TABS) % TOTAL_TABS) + 1;
      setActiveTab(wrapped);

      // centre the tab button in the strip
      tabButtonRefs[wrapped]?.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      // scroll content into view on mobile
      if (isMobile && contentRef.current) {
        const contentTop =
          contentRef.current.getBoundingClientRect().top + window.scrollY;
        if (Math.abs(contentTop - window.scrollY) > 30) {
          window.scrollTo({ top: contentTop - 120, behavior: "smooth" });
        }
      }
    },
    [isMobile, tabButtonRefs]
  );

  const handleNextTab = useCallback(() => {
    setActiveTab((prev) => (prev === TOTAL_TABS ? 1 : prev + 1));
  }, []);

  const handlePrevTab = useCallback(() => {
    setActiveTab((prev) => (prev === 1 ? 1 : prev - 1));
  }, []);

  /* ─────────────────────── effects ─────────────────────── */

  // Auto‑rotate tabs (only when visible, mobile, and not paused)
  useEffect(() => {
    if (!isMobile || autoSwitchPaused || !isVisible) return;

    // restart the tiny progress bar animation
    document
      .querySelectorAll(".fiveth-tab-button .progress-bar")
      .forEach((el) => el.classList.remove("progress-animate"));

    const currentProgress =
      tabButtonRefs[activeTab]?.current?.querySelector(".progress-bar");
    currentProgress?.classList.add("progress-animate");

    const id = setTimeout(handleNextTab, 3000);

    return () => {
      clearTimeout(id);
      currentProgress?.classList.remove("progress-animate");
    };
  }, [
    activeTab,
    isMobile,
    autoSwitchPaused,
    isVisible,
    handleNextTab,
    tabButtonRefs,
  ]);

  // Resume auto‑switch 10 s after user interaction
  useEffect(() => {
    if (!autoSwitchPaused) return;
    const id = setTimeout(() => setAutoSwitchPaused(false), 10_000);
    return () => clearTimeout(id);
  }, [autoSwitchPaused]);

  // Detect viewport width (run once on mount + on resize)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track whether the tab section is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  /* ─────────────────────── render ──────────────────────── */

  return (
    <>
      {/* <!-- Any Chat. Any Collaboration. Any Team.  section starts   - 6th section --> */}
      <div className="py-[60px] sm:py-[80px] lg:py-[100px]" ref={sectionRef}>
        <div className="px-[22px] xxl:px-0 mx-auto custom-container">
          <div className="max-w-[850px] mx-auto mb-[24px] text-center">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              Collaboration That <br /> Feels Effortless
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] block">
              Collaborate where the work actually happens — in the same place
              you manage it. With one-on-one chat, group chat, vendor chat, and
              announcements built-in, Jugl keeps every conversation in context.
              No switching apps, no lost messages — just seamless teamwork
              across mobile and web.
            </p>
          </div>
        </div>

        {/* <!-- sixth section tab --> */}
        <div className="bg-gradient-to-b from-[#ECF3FF] to-[#FFFFFF] rounded-tl-[80px] md:rounded-tl-[100px] lg:rounded-tl-[200px] xl:rounded-tl-[300px] 2xl:rounded-tl-[500px] rounded-tr-[80px] md:rounded-tr-[100px] lg:rounded-tr-[200px] xl:rounded-tr-[300px] 2xl:rounded-tr-[500px]">
          <div className="px-[22px] mx-auto custom-container">
            <div className="mx-auto sm:px-4 md:px-0 lg:p-4 !pt-[40px] h-auto xl:h-[650px] ">
              <div className="p-2 xl:p-0 bg-[#edf3ff] lg:bg-transparent rounded-[12px] sticky lg:static top-0 z-[99] md:py-2 flex justify-start md:justify-center">
                <div className="relative overflow-x-auto hide-scrollbar w-[80%] min-[575px]:w-[85%] md:w-auto mx-auto">
                  {/* <!-- Tab buttons --> */}
                  <div className="flex justify-center gap-[2px] lg:gap-[16px] min-w-max">
                    <button
                      ref={tabButtonRefs[1]}
                      className={`fiveth-tab-button  md:ml-4 md:ml-0 py-[8px] xl:py-[12px] px-[12px] xl:px-[24px] text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-[#24262B] rounded-[10px] lg:hover:text-[#2196F3] lg:hover:bg-[#ffffff] focus:outline-none transition-colors relative overflow-hidden duration-300 
                    ${activeTab === 1 ? "bg-[#2196F3] text-[#ffffff]" : ""}
                    `}
                      id="fivethtab1"
                      onClick={() => handleActiveTab(1)}
                    >
                      Team Chat
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" />
                      </div>
                    </button>
                    <button
                      ref={tabButtonRefs[2]}
                      className={`fiveth-tab-button py-[8px] xl:py-[12px] px-[12px] xl:px-[24px] text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-[#24262B] rounded-[10px] lg:hover:text-[#2196F3] lg:hover:bg-[#ffffff] focus:outline-none transition-colors relative overflow-hidden duration-300
                     ${activeTab === 2 ? "bg-[#2196F3] text-[#ffffff]" : ""}
                    `}
                      id="fivethtab2"
                      onClick={() => handleActiveTab(2)}
                    >
                      One-on-One Chat
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" />
                      </div>
                    </button>
                    <button
                      ref={tabButtonRefs[3]}
                      className={`fiveth-tab-button py-[8px] xl:py-[12px] px-[12px] xl:px-[24px] text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-[#24262B] rounded-[10px] lg:hover:text-[#2196F3] lg:hover:bg-[#ffffff] focus:outline-none transition-colors relative overflow-hidden duration-300
                     ${activeTab === 3 ? "bg-[#2196F3] text-[#ffffff]" : ""}
                    `}
                      id="fivethtab3"
                      onClick={() => handleActiveTab(3)}
                    >
                      Announcements{" "}
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" />
                      </div>
                    </button>
                    <button
                      ref={tabButtonRefs[4]}
                      className={`fiveth-tab-button py-[8px] xl:py-[12px] px-[12px] xl:px-[24px] text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-[#24262B] rounded-[10px] lg:hover:text-[#2196F3] lg:hover:bg-[#ffffff] focus:outline-none transition-colors relative overflow-hidden duration-300
                     ${activeTab === 4 ? "bg-[#2196F3] text-[#ffffff]" : ""}
                    `}
                      id="fivethtab4"
                      onClick={() => handleActiveTab(4)}
                    >
                      Vendor Chat
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" />
                      </div>
                    </button>
                    <button
                      ref={tabButtonRefs[5]}
                      className={`fiveth-tab-button  md:mr-4 md:mr-0 py-[8px] xl:py-[12px] px-[12px] xl:px-[24px] text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-[#24262B] rounded-[10px] lg:hover:text-[#2196F3] lg:hover:bg-[#ffffff] focus:outline-none transition-colors relative overflow-hidden duration-300
                     ${activeTab === 5 ? "bg-[#2196F3] text-[#ffffff]" : ""}
                    `}
                      id="fivethtab5"
                      onClick={() => handleActiveTab(5)}
                    >
                      Mobile Native Chat App{" "}
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" />
                      </div>
                    </button>
                  </div>
                </div>
                <button
                  className="tab-nav-button absolute left-[2px] top-[12px] sm:top-[8px] p-[8px] sm:p-[12px] bg-[#359cf0] rounded-[8px]  z-11 block md:hidden z-[222]"
                  onClick={handlePrevTab}
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
                  className="tab-nav-button absolute right-[2px] top-[12px] sm:top-[8px]  p-[8px] sm:p-[12px] bg-[#359cf0] rounded-[8px] block md:hidden z-[222]"
                  onClick={handleNextTab}
                  disabled={activeTab === 5}
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

              {/* <!-- Tab Content --> */}
              <div
                className="xl:mt-4 text-center lg:text-start"
                ref={contentRef}
              >
                {/* <!-- tab-1 --> */}
                {activeTab === 1 && (
                  <div id="fivethtcontent1" className="fiveth-tab-content">
                    <div className="flex flex-col lg:flex-row sm:gap-[30px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[30px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                      <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center animate-fade-up">
                        <div className="relative">
                          <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#2196F3] opacity-15"></div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct1-res.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 block min-[575px]:hidden"
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct1.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 max-w-full  hidden min-[575px]:block"
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct1-cd1.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className=" hidden min-[575px]:block z-10 max-w-full w-[100px] sm:w-fit absolute -bottom-[1%] left-0 sm:-left-[8%] animate-fade-up-12s "
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct1-cd2.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className=" hidden min-[575px]:block z-10 max-w-full w-[130px] sm:w-fit absolute -top-[5%] right-0 sm:-right-[7%] animate-fade-up-12s"
                          />
                        </div>

                        {/* responsive btn */}
                        <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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

                      <div className="md:w-[90%] lg:w-[46%] order-1 lg:order-2 animate-fade-up">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                          Team Chat for <br /> Seamless Collaboration
                        </h2>
                        <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                          {" "}
                          Bring your entire team into one conversation.{" "}
                          <br className="hidden sm:block" /> Share updates,
                          files, and ideas without switching tools.{" "}
                          <br className="hidden sm:block" /> Keep project
                          discussions organized and in one place.
                        </p>

                        <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] lg:mt-[40px]">
                          <button type="button">
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
                          </button>
                          <button type="button">
                            <a
                              className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
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
                )}

                {/* <!-- tab 2 --> */}
                {activeTab === 2 && (
                  <div id="fivethtcontent2" className="fiveth-tab-content">
                    <div className="flex flex-col lg:flex-row sm:gap-[30px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[30px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                      <div className="relative md:w-[90%] lg:w-[50%] order-2 lg:order-1 relative flex flex-col items-center justify-center animate-fade-up">
                        <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#2196F3] opacity-15"></div>
                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2-res.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className="fiveth-tab-image relative z-10 block min-[575px]:hidden"
                        />

                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className="fiveth-tab-image relative z-10 max-w-full w-[250px] md:w-[317px]  hidden min-[575px]:block"
                        />

                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2-cd3.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className=" hidden min-[575px]:block z-10 max-w-full w-[200px] sm:w-fit absolute top-[6%]  -right-[1%] sm:right-[16%] lg:right-[6%] animate-fade-up-12s "
                        />
                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2-cd1.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className=" hidden min-[575px]:block z-10 max-w-full w-[150px] min-[400px]:w-[200px] sm:w-fit absolute bottom-[20%] min-[575px]:bottom-[13%] lg:-bottom-[3%] -left-[10%] md:left-[4%] lg:-left-[10%] xl:left-[-5%] 2xl:left-0 animate-fade-up-12s "
                        />
                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2-cd2.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className=" hidden min-[575px]:block z-10 max-w-full w-[150px] min-[400px]:w-[200px] sm:w-fit absolute  bottom-[20%] min-[575px]:bottom-[13%] lg:-bottom-[3%] -right-[2%] md:right-[5%] lg:-right-[15%] xl:-right-[2%] animate-fade-up-12s"
                        />
                        <Image
                          src="/images/new-banners/sixth-section/tb-ct2-cd4.png"
                          alt="banner"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "auto" }}
                          className=" hidden min-[575px]:block z-1 max-w-full w-[450px] xl:w-fit absolute top-[10%] xl:top-[8%] md:right-[20%] lg:right-0  animate-fade-up-12s hidden sm:block"
                        />

                        {/* responsive btn */}
                        <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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

                      <div className="md:w-[90%] lg:w-[46%] order-1 lg:order-2 animate-fade-up">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                          One-on-One Chat for Focused Communication
                        </h2>
                        <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                          Have private, direct conversations with teammates.{" "}
                          <br className="hidden sm:block" />
                          Perfect for quick check-ins, approvals, or
                          clarifications. <br className="hidden sm:block" />
                          Stay connected without cluttering group spaces.
                        </p>

                        <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] lg:mt-[40px]">
                          <button type="button">
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
                          </button>
                          <button type="button">
                            <a
                              className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
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
                )}

                {/* <!-- tab-3 --> */}
                {activeTab === 3 && (
                  <div id="fivethtcontent3" className="fiveth-tab-content">
                    <div className="flex flex-col lg:flex-row sm:gap-[30px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[30px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                      <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 relative flex flex-col items-center sm:items-end md:items-center lg:items-end justify-center animate-fade-up">
                        <div className="relative min-[575px]:w-[300px] sm:w-[400px] md:w-[478px] lg:w-[400px] xl:w-[478px]">
                          <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#2196F3] opacity-50"></div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct3-res.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 block min-[575px]:hidden"
                          />
                          <div className="min-[575px]:flex gap-[10px] md:gap-[20px]  hidden ">
                            <div className="flex flex-col gap-[10px] md:gap-[20px]">
                              <Image
                                src="/images/new-banners/sixth-section/tb-ct3-cd1.png"
                                alt="banner"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "auto", height: "auto" }}
                                className="z-10 max-w-full  animate-fade-up-12s"
                              />
                              <Image
                                src="/images/new-banners/sixth-section/tb-ct3-cd3.png"
                                alt="banner"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "auto", height: "auto" }}
                                className="z-10 max-w-full animate-fade-up-12s"
                              />
                              <Image
                                src="/images/new-banners/sixth-section/tb-ct3-cd4.png"
                                alt="banner"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "auto", height: "auto" }}
                                className="z-10 max-w-full animate-fade-up-12s"
                              />
                            </div>
                            <div className="flex flex-col gap-[10px] md:gap-[20px]">
                              <Image
                                src="/images/new-banners/sixth-section/tb-ct3-cd2.png"
                                alt="banner"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "auto", height: "auto" }}
                                className="z-10 max-w-full animate-fade-up-12s"
                              />
                              <Image
                                src="/images/new-banners/sixth-section/tb-ct3-cd5.png"
                                alt="banner"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "auto", height: "auto" }}
                                className="z-10 max-w-full  animate-fade-up-12s"
                              />
                            </div>
                          </div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct3.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className=" hidden min-[575px]:block fiveth-tab-image absolute bottom-0 -left-[25%] lg:-left-[20%] xl:-left-[30%] z-10 max-w-full w-[120px] sm:w-[170px] xl:w-[224px]"
                          />
                        </div>

                        {/* responsive btn */}
                        <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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
                      <div className="md:w-[90%] lg:w-[46%] order-1 lg:order-2 animate-fade-up">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                          Announcements to Keep{" "}
                          <br className="hidden sm:block lg:hidden" /> Everyone
                          Informed
                        </h2>
                        <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                          Share important updates with all team members at once.{" "}
                          <br className="hidden sm:block" /> Ensure nothing is
                          missed with high-visibility messages.{" "}
                          <br className="hidden sm:block" />
                          Ideal for company-wide news, alerts, or instructions.
                        </p>

                        <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] lg:mt-[40px]">
                          <button type="button">
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
                          </button>
                          <button type="button">
                            <a
                              className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
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
                )}

                {/* <!-- tab-4 --> */}
                {activeTab === 4 && (
                  <div id="fivethtcontent4" className="fiveth-tab-content">
                    <div className="flex flex-col lg:flex-row sm:gap-[30px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[30px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                      <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 relative flex flex-col items-center justify-center animate-fade-up">
                        <div className="relative">
                          <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#1FF4A6] opacity-55"></div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct4-res.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 block min-[575px]:hidden"
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct4.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 max-w-full  hidden min-[575px]:block"
                          />
                          <div className="min-[575px]:flex flex-col gap-[16px] absolute top-[16%] -right-[40%] sm:-right-[58%] lg:-right-[48%] xl:-right-[58%] w-[150px] sm:w-full hidden">
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd1.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] animate-fade-up-12s max-w-[167px]"
                            />
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd2.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] animate-fade-up-12s max-w-[190px]"
                            />
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd3.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] max-w-full animate-fade-up-12s"
                            />
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd4.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] max-w-full animate-fade-up-12s"
                            />
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd5.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] animate-fade-up-12s max-w-[120px]"
                            />
                            <Image
                              src="/images/new-banners/sixth-section/tb-ct4-cd6.png"
                              alt="banner"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "auto", height: "auto" }}
                              className=" z-10 shadow-lg rounded-[20px] animate-fade-up-12s max-w-[222px]"
                            />
                          </div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct4-cd7.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className=" hidden min-[575px]:block z-10 max-w-full w-[200px] sm:w-fit absolute bottom-[0%] -left-[50%] md:-left-[70%] lg:-left-[52%] xl:-left-[72%] animate-fade-up-12s "
                          />
                        </div>

                        {/* responsive btn */}
                        <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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
                      <div className="md:w-[90%] lg:w-[46%] order-1 lg:order-2 animate-fade-up">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                          Vendor Chat for <br className="block lg:hidden" />{" "}
                          External Collaboration
                        </h2>
                        <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                          Communicate with vendors just like your internal team.{" "}
                          <br className="hidden sm:block" /> Track updates,
                          share files, and streamline coordination.{" "}
                          <br className="hidden sm:block" /> All vendor
                          interactions stay organized within Jugl.
                        </p>

                        <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] lg:mt-[40px]">
                          <button type="button">
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
                          </button>
                          <button type="button">
                            <a
                              className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
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
                )}

                {/* <!-- tab-5 --> */}
                {activeTab === 5 && (
                  <div id="fivethtcontent5" className="fiveth-tab-content">
                    <div className="flex flex-col lg:flex-row sm:gap-[30px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[30px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                      <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 relative flex flex-col items-center justify-center animate-fade-up">
                        <div className="relative">
                          <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#9F1FF4] to-[#1FF4A6] opacity-35"></div>
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct5-res.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 block min-[575px]:hidden"
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct5-cd1.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className="fiveth-tab-image relative z-10 max-w-full w-[480px] md:w-[580px] lg:w-fit hidden min-[575px]:block"
                          />
                          <Image
                            src="/images/new-banners/sixth-section/tb-ct5.png"
                            alt="banner"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            className=" hidden min-[575px]:block z-10 max-w-full w-[250px] min-[1400px]:w-fit absolute top-[20%] md:top-[35%] lg:top-[25%] 2xl:top-[20%] left-[25%] md:left-[30%]  lg:left-[22%] xl:left-[27%]   animate-fade-up-12s "
                          />
                        </div>

                        {/* responsive btn */}
                        <div className="flex lg:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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
                      <div className="md:w-[90%] lg:w-[46%] order-1 lg:order-2 animate-fade-up">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                          Mobile Native Chat App
                        </h2>
                        <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                          {" "}
                          Chat from anywhere using iOS or Android devices.{" "}
                          <br className="hidden sm:block" /> Get real-time
                          alerts, reply instantly, and stay in sync.{" "}
                          <br className="hidden sm:block" />
                          Work and communicate seamlessly, even on the go.
                        </p>

                        <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[30px] lg:mt-[40px]">
                          <button type="button">
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
                          </button>
                          <button type="button">
                            <a
                              className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[8px] rounded-[8px] w-[254px] xl:w-auto font-medium hover:bg-[#fff] text-[16px] text-[#3A86FF] hover:text-[#0077D5] border-2 border-[#3A86FF] hover:border-[#0077D5]"
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Any Chat. Any Collaboration. Any Team. section ends --> */}
      <style jsx>
        {`
          .tab-nav-button:disabled {
            opacity: 0.2;
            cursor: not-allowed;
          }

          .progress-bar {
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 2px;
            width: 0%;
            background-color: #ffffff;
          }

          .progress-animate {
            animation: progressGrow 3s linear forwards;
          }

          @keyframes progressGrow {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
