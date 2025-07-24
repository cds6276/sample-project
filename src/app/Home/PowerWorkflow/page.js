"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AutoTabSlider from "./AutoTabSlider/page";
import AutoTabSliderresponsive from "./AutoTabSliderresponsive/page";

export default function PowerWorkflow() {
  const [currentThirdTab, setCurrentThirdTab] = useState(1);
  const totalThirdTabs = 3;
  const topScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // New state: track if user manually changed tab, to pause auto change temporarily
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);

  // Scroll function unchanged
  const scrollToTabContent = () => {
    if (topScrollRef.current && window.innerWidth < 600) {
      window.scrollTo({
        top: topScrollRef.current.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  const showThirdTab = (thirdTabNumber) => {
    setCurrentThirdTab(thirdTabNumber);

    // Mark user interaction, pause auto tab change temporarily
    setIsUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 300);

    // Hide all contents
    document.querySelectorAll(".third-tab-content").forEach((content) => {
      content.classList.add("hidden");
      const img = content.querySelector(".third-tab-image");
      if (img) img.classList.remove("animate-fade-up");
    });

    // Show selected content
    const activeContent = document.getElementById(
      `thirdcontent${thirdTabNumber}`
    );
    if (activeContent) {
      activeContent.classList.remove("hidden");

      const activeImg = activeContent.querySelector(".third-tab-image");
      if (activeImg) {
        void activeImg.offsetWidth; // reflow
        activeImg.classList.add("animate-fade-up");
      }
    }

    // Reset buttons and SVGs
    document.querySelectorAll(".third-tab-button").forEach((button) => {
      button.classList.remove("text-[#2196F3]");
      button.classList.add("text-[#24262B]");
      const svg = button.querySelector(".icon-svg");
      if (svg) {
        svg.classList.remove("fill-[#2196F3]");
        svg.classList.add("fill-[#6E7178]");
      }
    });

    // Set active button styles
    const activeTab = document.getElementById(`thirdtab${thirdTabNumber}`);
    if (activeTab) {
      activeTab.classList.remove("text-[#24262B]");
      activeTab.classList.add("text-[#2196F3]");
      const activeSvg = activeTab.querySelector(".icon-svg");
      if (activeSvg) {
        activeSvg.classList.remove("fill-[#6E7178]");
        activeSvg.classList.add("fill-[#2196F3]");
      }
    }

    // Scroll active tab into view
    activeTab.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    // scrollToTabContent();
  };

  // Intersection observer with faster detection and margin
 useEffect(() => {
  const target = sectionRef.current;          // ← cache once

  if (!target) return;                        // guard for safety

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsSectionVisible(
        entry.isIntersecting && entry.intersectionRatio >= 0.5
      );
    },
    {
      threshold: [0, 0.5, 1],
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(target);

  return () => {
    observer.unobserve(target);               // ← same node every time
  };
}, []);


  // Auto tab change effect
  // useEffect(() => {
  //   // Run only if section is visible AND on mobile (< 640px)
  //   if (!isSectionVisible || window.innerWidth >= 640) return;

  //   // Immediately update tab on visibility (keeps current tab)
  //   setCurrentThirdTab((prev) => prev);

  //   const interval = setInterval(() => {
  //     setCurrentThirdTab((prev) => {
  //       // Pause auto change if user interacted recently
  //       if (isUserInteracting) return prev;
  //       return prev < totalThirdTabs ? prev + 1 : 1;
  //     });
  //   }, 3000);

  //   // Reset user interaction pause after 8 seconds
  //   const userInteractionTimeout = setTimeout(() => {
  //     setIsUserInteracting(false);
  //   }, 8000);

  //   return () => {
  //     clearInterval(interval);
  //     clearTimeout(userInteractionTimeout);
  //   };
  // }, [isSectionVisible, isUserInteracting]);

  // Optional: Show tab content when currentThirdTab changes (to sync UI)
  // useEffect(() => {
  //   showThirdTab(currentThirdTab);
  // }, [currentThirdTab]);
  return (
    <>
      <div className="lg:overflow-hidden">
        <div
          className="px-[22px] mx-auto custom-container py-[60px] sm:py-[80px] lg:py-[100px]"
          ref={sectionRef}
        >
          <div className="max-w-[850px] mx-auto mb-[20px] text-center">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              Work That Moves <br className="block sm:hidden" /> on Its Own
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] ">
              Smart automations and seamless integrations that keep everything
              flowing - so you can spend more time leading and less time
              chasing.{" "}
            </p>
          </div>

          {/* <!-- Second section tab --> */}
          <div className="mx-auto md:p-4" ref={topScrollRef}>
            {/* <!-- Tab buttons --> */}
            <div className="relative p-1 sm:p-4 xl:p-0 bg-[#fff] rounded-[12px] sticky lg:static top-0 z-[99] py-2 flex justify-center">
              <div
                className="flex justify-evenly md:justify-center w-full md:w-fit items-center space-x-4 py-4 md:py-0 overflow-x-auto hide-scrollbar scroll-smooth"
                id="thirdTabContainer"
              >
                <button
                  className={`third-tab-button sm:px-[24px]  sm:min-w-auto flex flex-col min-[575px]:flex-row gap-2 items-center text-[12px] min-[575px]:text-[14px] md:text-[16px] font-medium group focus:outline-none transition-colors duration-300 ${
                    currentThirdTab === 1
                      ? "text-[#2196F3]"
                      : "text-[#24262B] hover:text-[#2196F3]"
                  } focus:outline-none transition-colors duration-300 relative`}
                  id="thirdtab1"
                  onClick={() => showThirdTab(1)}
                >
                  <svg
                    className={`icon-svg w-[18px] h-[18px] group-hover:fill-[#2196F3] ${
                      currentThirdTab === 1
                        ? "fill-[#2196F3]"
                        : "fill-[#6E7178] hover:fill-[#2196F3]"
                    } transition-colors duration-300`}
                    viewBox="0 0 21 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.9167 0.234375H5.08333C2.55583 0.234375 0.5 2.29021 0.5 4.81771V9.81771C0.5 10.5085 1.06 11.0677 1.75 11.0677C2.44 11.0677 3 10.5085 3 9.81771V6.06771H18V9.81771C18 10.5085 18.56 11.0677 19.25 11.0677C19.94 11.0677 20.5 10.5085 20.5 9.81771V4.81771C20.5 2.29021 18.4433 0.234375 15.9167 0.234375ZM4.25 4.40104C3.56 4.40104 3 3.84104 3 3.15104C3 2.46104 3.56 1.90104 4.25 1.90104C4.94 1.90104 5.5 2.46104 5.5 3.15104C5.5 3.84104 4.94 4.40104 4.25 4.40104ZM8.41667 4.40104C7.72667 4.40104 7.16667 3.84104 7.16667 3.15104C7.16667 2.46104 7.72667 1.90104 8.41667 1.90104C9.10667 1.90104 9.66667 2.46104 9.66667 3.15104C9.66667 3.84104 9.10667 4.40104 8.41667 4.40104ZM9.0825 13.3452C8.7375 12.746 7.97167 12.5419 7.375 12.8877L7.1225 13.0335C6.88167 12.8452 6.62083 12.6819 6.33333 12.5652V12.3177C6.33333 11.6277 5.77333 11.0677 5.08333 11.0677C4.39333 11.0677 3.83333 11.6277 3.83333 12.3177V12.5652C3.54583 12.6819 3.285 12.8452 3.04333 13.0335L2.815 12.9019C2.21667 12.556 1.45167 12.7602 1.1075 13.3594C0.7625 13.9577 0.9675 14.7219 1.565 15.0669L1.795 15.2002C1.77417 15.3494 1.74917 15.4969 1.74917 15.6519C1.74917 15.8069 1.77417 15.9544 1.795 16.1035L1.54083 16.2502C0.9425 16.5952 0.738333 17.3594 1.08333 17.9577C1.31417 18.3585 1.735 18.5827 2.16667 18.5827C2.37917 18.5827 2.59417 18.5294 2.79083 18.4152L3.04333 18.2694C3.28417 18.4577 3.545 18.621 3.8325 18.7377V18.9852C3.8325 19.6752 4.3925 20.2352 5.0825 20.2352C5.7725 20.2352 6.3325 19.6752 6.3325 18.9852V18.7377C6.62 18.621 6.88083 18.4577 7.12167 18.2694L7.37417 18.4152C7.57083 18.5294 7.78583 18.5827 7.99833 18.5827C8.43 18.5827 8.85 18.3585 9.08167 17.9577C9.42667 17.3594 9.2225 16.5952 8.62417 16.2502L8.37 16.1035C8.39083 15.9544 8.41583 15.8069 8.41583 15.6519C8.41583 15.4969 8.39083 15.3494 8.37 15.2002L8.62417 15.0535C9.2225 14.7085 9.42667 13.9444 9.08167 13.346L9.0825 13.3452ZM5.08333 16.901C4.39333 16.901 3.83333 16.341 3.83333 15.651C3.83333 14.961 4.39333 14.401 5.08333 14.401C5.77333 14.401 6.33333 14.961 6.33333 15.651C6.33333 16.341 5.77333 16.901 5.08333 16.901ZM20.1342 18.1002C20.6225 18.5885 20.6225 19.3794 20.1342 19.8677C19.6458 20.356 18.855 20.356 18.3667 19.8677L16.365 17.866L15.4117 19.7727C15.27 20.0552 14.9808 20.2335 14.6658 20.2335H14.65C14.3283 20.2277 14.0392 20.0377 13.9067 19.7452L10.62 12.516C10.3817 11.8352 10.5342 11.1769 10.9883 10.7235C11.4417 10.2694 12.1 10.1194 12.7067 10.3244C12.7325 10.3327 20.0108 13.641 20.0108 13.641C20.3033 13.7744 20.4933 14.0627 20.4992 14.3844C20.505 14.706 20.3258 15.0019 20.04 15.1452L18.1333 16.0985L20.1342 18.1002Z" />
                  </svg>
                  Automations
                  <div
                    className={`absolute -bottom-[10px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                      currentThirdTab === 1 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>

                <button
                  className={`third-tab-button sm:px-[24px]  sm:min-w-auto  flex flex-col min-[575px]:flex-row gap-2 items-center text-[12px] min-[575px]:text-[14px] md:text-[16px] font-medium group focus:outline-none transition-colors duration-300 ${
                    currentThirdTab === 2
                      ? "text-[#2196F3]"
                      : "text-[#24262B] hover:text-[#2196F3]"
                  } focus:outline-none transition-colors duration-300 relative`}
                  id="thirdtab2"
                  onClick={() => showThirdTab(2)}
                >
                  <svg
                    className={`icon-svg group-hover:fill-[#2196F3] ${
                      currentThirdTab === 2
                        ? "fill-[#2196F3]"
                        : "fill-[#6E7178] hover:fill-[#2196F3]"
                    } transition-colors duration-300`}
                    width="18"
                    height="18"
                    viewBox="0 0 21 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.33333 0.234866H3.83333C1.99167 0.234866 0.5 1.72653 0.5 3.5682V6.0682C0.5 7.90987 1.99167 9.40153 3.83333 9.40153H6.33333C8.175 9.40153 9.66667 7.90987 9.66667 6.0682V3.5682C9.66667 1.72653 8.175 0.234866 6.33333 0.234866ZM17.1667 11.0682H14.6667C12.825 11.0682 11.3333 12.5599 11.3333 14.4015V16.9015C11.3333 18.7432 12.825 20.2349 14.6667 20.2349H17.1667C19.0083 20.2349 20.5 18.7432 20.5 16.9015V14.4015C20.5 12.5599 19.0083 11.0682 17.1667 11.0682ZM11.3333 4.40153C11.3333 3.5182 11.7 2.6932 12.375 2.08487L14.1 0.459866C14.4333 0.143199 14.9583 0.159866 15.275 0.493199C15.5917 0.826532 15.575 1.35987 15.2417 1.6682L13.5083 3.2932C13.4167 3.37653 13.3417 3.4682 13.275 3.55987H16.3333C18.175 3.55987 19.6667 5.05153 19.6667 6.8932V8.55987C19.6667 9.0182 19.2917 9.3932 18.8333 9.3932C18.375 9.3932 18 9.0182 18 8.55987V6.8932C18 5.97653 17.25 5.22653 16.3333 5.22653H13.275C13.3417 5.3182 13.4167 5.40153 13.5 5.48487L15.2417 7.1182C15.575 7.43487 15.5917 7.95987 15.275 8.2932C15.1083 8.4682 14.8917 8.55153 14.6667 8.55153C14.4583 8.55153 14.2583 8.47653 14.0917 8.32653L12.3583 6.70153C11.7 6.0932 11.325 5.2682 11.325 4.3932L11.3333 4.40153ZM9.66667 16.0682C9.66667 16.9515 9.3 17.7682 8.625 18.3849L6.9 20.0099C6.74167 20.1599 6.53333 20.2349 6.325 20.2349C6.1 20.2349 5.88333 20.1432 5.71667 19.9765C5.4 19.6432 5.41667 19.1099 5.75 18.8015L7.48333 17.1765C7.575 17.0932 7.65 17.0015 7.71667 16.9099H4.65833C2.81667 16.9099 1.325 15.4182 1.325 13.5765V11.9099C1.325 11.4515 1.7 11.0765 2.15833 11.0765C2.61667 11.0765 2.99167 11.4515 2.99167 11.9099V13.5765C2.99167 14.4932 3.74167 15.2432 4.65833 15.2432H7.71667C7.65 15.1515 7.575 15.0682 7.49167 14.9849L5.75 13.3515C5.41667 13.0349 5.4 12.5099 5.71667 12.1765C6.03333 11.8432 6.55833 11.8265 6.89167 12.1432L8.625 13.7682C9.28333 14.3765 9.65833 15.2015 9.65833 16.0765L9.66667 16.0682Z" />
                  </svg>
                  Integrations
                  <div
                    className={`absolute -bottom-[10px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                      currentThirdTab === 2 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>

                <button
                  className={`third-tab-button sm:px-[24px]  group sm:min-w-auto flex flex-col min-[575px]:flex-row gap-2 items-center text-[12px] min-[575px]:text-[14px] md:text-[16px] font-medium group focus:outline-none transition-colors duration-300 ${
                    currentThirdTab === 3
                      ? "text-[#2196F3] "
                      : "text-[#24262B] hover:text-[#2196F3]"
                  } focus:outline-none transition-colors duration-300 relative`}
                  id="thirdtab3"
                  onClick={() => showThirdTab(3)}
                >
                  <svg
                    className={`icon-svg  group-hover:fill-[#2196F3] ${
                      currentThirdTab === 3
                        ? "fill-[#2196F3] "
                        : "fill-[#6E7178] hover:fill-[#2196F3]"
                    } transition-colors duration-300`}
                    width="18"
                    height="18"
                    viewBox="0 0 21 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.4333 18.9934L19.775 17.6517C20.2583 17.1684 20.5 16.535 20.5 15.91C20.5 15.285 20.2583 14.6434 19.775 14.1684L18.4333 12.8267C18.1083 12.5017 17.5833 12.5017 17.2583 12.8267C16.9333 13.1517 16.9333 13.6767 17.2583 14.0017L18.3333 15.0767H12.1667C11.7083 15.0767 11.3333 15.4517 11.3333 15.91C11.3333 16.3684 11.7083 16.7434 12.1667 16.7434H18.3333L17.2583 17.8184C16.9333 18.1434 16.9333 18.6684 17.2583 18.9934C17.5833 19.3184 18.1083 19.3184 18.4333 18.9934ZM12.1667 18.4017H4.6667C2.3667 18.4017 0.5 16.535 0.5 14.235V6.73503H20.5V12.5184L19.6167 11.635C18.6417 10.66 17.0583 10.66 16.0833 11.635C15.6083 12.11 15.35 12.735 15.35 13.4017H12.175C10.8 13.4017 9.675 14.5267 9.675 15.9017C9.675 17.2767 10.8 18.4017 12.175 18.4017H12.1667ZM20.4167 5.06836H0.5V4.23503C0.5 1.93503 2.3667 0.0683594 4.6667 0.0683594H6.775C7.15833 0.0683594 7.55 0.160026 7.89167 0.335026L10.525 1.65169C10.6417 1.71003 10.7667 1.74336 10.9 1.74336H16.3417C18.35 1.74336 20.0333 3.17669 20.425 5.07669L20.4167 5.06836Z" />
                  </svg>{" "}
                  Data Import
                  <div
                    className={`absolute -bottom-[10px] left-0 h-0.5 bg-[#2196F3] block sm:hidden ${
                      currentThirdTab === 3 ? "animate-progressBar" : "w-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* <!-- Tab Content --> */}
            <div className="lg:mt-4">
              {/* <!-- tab-1 --> */}
              <div
                id="thirdcontent1"
                className={`third-tab-content ${
                  currentThirdTab === 1 ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col xl:flex-row sm:gap-[30px] xl:gap-[60px] items-center justify-center lg:justify-between pt-[30px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] xl:w-[46%] text-center xl:text-start animate-fade-up">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Automate Any Workflow
                    </h2>
                    <p className="max-w-[770px] mx-auto xl:mx-0 text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Automate repetitive tasks, multi-step processes, and team
                      workflows with ease. From reminders to task triggers, Jugl
                      helps you save time and reduce manual effort. Build smart
                      automations that keep your work moving — no coding needed.
                    </p>
                    <div className="hidden xl:flex gap-[18px] justify-center xl:justify-start items-center flex-wrap mt-[40px]">
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

                  <div className="md:w-[90%] xl:w-[50%] flex flex-col items-center justify-center animate-fade-up">
                    <div className=" hidden md:block">
                      <AutoTabSlider />
                    </div>
                    <div className="block md:hidden">
                      <AutoTabSliderresponsive />
                    </div>

                    {/* responsive btn */}
                    <div className="flex xl:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[0px] md:mt-[30px]">
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
              <div
                id="thirdcontent2"
                className={`third-tab-content ${
                  currentThirdTab === 2 ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col xl:flex-row sm:gap-[10px] xl:gap-[60px] items-center justify-center lg:justify-between pt-[30px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] xl:w-[46%] text-center xl:text-start animate-fade-up">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Integrate Any App. <br className="block xl:hidden" /> Any
                      System. Any Process
                    </h2>
                    <p className="max-w-[770px] mx-auto xl:mx-0 text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Connect Jugl with your favorite tools and systems through
                      seamless, two-way integrations. Whether it’s CRM,
                      communication apps, or custom software, your data stays in
                      sync. Break down silos and streamline work across
                      platforms without disruption.{" "}
                    </p>

                    <div className="hidden xl:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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

                  <div className="md:w-[90%] xl:w-[50%] flex flex-col items-center justify-center animate-fade-up">
                    <div className="relative">
                      <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#2196F3] to-[#9F1FF4] opacity-15"></div>
                      <Image
                        src="/images/new-banners/startfinish-section/tb2/tb-cta2.png"
                        alt="banner"
                        className="third-tab-image relative z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb2/tb-cta2-res.png"
                        alt="banner"
                        className="third-tab-image relative z-10 block sm:hidden"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb2/tb-cta2-cd1.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-12s sm:w-[250px] xl:w-[300px] absolute right-[100px] xl:right-[20px] bottom-[36px]  xl:bottom-[-10px]  z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb2/tb-cta2-cd2.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-08s w-[180px] absolute -right-[45px] xl:-right-[60px]  bottom-[150px] z-20 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb2/tb-cta2-cd3.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-08s w-[100px] absolute right-[80px] top-0 xl:-top-[10px] xl:right-0 xl:w-[135px] z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex xl:hidden gap-[12px] md:gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[10px] sm:mt-[30px]">
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
              <div
                id="thirdcontent3"
                className={`third-tab-content ${
                  currentThirdTab === 3 ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col xl:flex-row sm:gap-[10px] xl:gap-[60px] items-center justify-center xl:justify-between pt-[30px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] xl:w-[46%] text-center xl:text-start animate-fade-up">
                    <h2 className="text-[26px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Import Any Data
                    </h2>
                    <p className="max-w-[770px] mx-auto xl:mx-0 text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Easily bring in your existing data from spreadsheets,
                      CRMs, or other platforms. Whether you&apos;re starting fresh or
                      switching systems, Jugl ensures a smooth transition.
                      Export your data anytime — full control, full flexibility.
                    </p>

                    <div className="hidden xl:flex gap-[18px] justify-center xl:justify-start items-center flex-wrap mt-[40px]">
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

                  <div className="md:w-[90%] xl:w-[50%] flex flex-col items-center justify-center animate-fade-up">
                    {/* <div className="tab-box bg-[#f0faff] absolute -right-[15%] top-[15%] h-[75%] w-[65%] rounded-[30px] z-100"></div> */}
                    <div className="relative">
                      <div className="absolute inset-0 z-0 rounded-xl blur-3xl bg-gradient-to-r from-[#2196F3]  to-[#9F1FF4] opacity-15"></div>
                      <Image
                        src="/images/new-banners/startfinish-section/tb3/tb-cta3.png"
                        alt="banner"
                        className="third-tab-image relative z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb3/tb-cta3-res.png"
                        alt="banner"
                        className="third-tab-image relative z-10 block sm:hidden"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb3/tb-cta3-cd1.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-12s w-[200px] lg:w-[250px] absolute right-[13%] lg:right-[5%] bottom-[6%] lg:bottom-0 z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb3/tb-cta3-cd2.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-08s w-[130px] sm:w-fit absolute -right-[2%] md:-right-[5%] lg:-right-[15%] top-0 z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/startfinish-section/tb3/tb-cta3-cd3.png"
                        alt="banner"
                        className="third-tab-image animate-fade-up-08s w-[70px] lg:w-[110px] absolute right-[5%] lg:-right-[9%] bottom-[15%] lg:bottom-[15px] z-10 hidden sm:block"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>

                    {/* responsive btn */}

                    <div className="flex xl:hidden gap-[12px] md:gap-[18px] justify-center xl:justify-start items-center flex-wrap mt-[30px] sm:mt-[40px]">
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
