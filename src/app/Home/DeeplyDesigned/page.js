"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import AccordionSection2 from "@/app/Common/Accordian2/page";

export default function DeeplyDesigned() {
  const [activeTab, setActiveTab] = useState(1);

  const tabButtonRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
  };

  const TOTAL_TABS = 8;

  const handleActiveTab = (tabIndex) => {
    const wrappedIndex = ((tabIndex - 1 + TOTAL_TABS) % TOTAL_TABS) + 1;
    setActiveTab(wrappedIndex);

    tabButtonRefs[wrappedIndex]?.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <>
      {/* <!-- Deeply Designed Solutions section starts    - 7th section --> */}
      <div className="px-[22px] xxl:px-0 mx-auto custom-container py-[20px] md:py-[40px] lg:py-[60px]">
        <div className="max-w-[850px] mx-auto mb-[20px] text-center">
          <h3 className="font-medium text-[24px] sm:text-[28px] md:text-[36px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
            Deeply Designed Solutions <br />
            That Go Beyond the Surface
          </h3>
          <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] block">
            Each solution in Jugl is{" "}
            <span className="text-[#24262B] font-semibold">
              carefully crafted for a specific business function.
            </span>{" "}
            These solutions are{" "}
            <span className="text-[#24262B] font-semibold">
              deeply integrated with your workflows,
            </span>{" "}
            so teams can act, track, and collaborate without switching systems.
            Everything works together to support real work, in real time.
          </p>
        </div>

        {/* <!-- Second section tab --> */}
        <div className="mx-auto lg:p-4 hidden md:block">
          <div className="sticky lg:static top-0 z-[99]">
            <div className="overflow-x-auto hide-scrollbar p-2 sm:p-4 xl:p-0 bg-[#fff] lg:bg-transparent rounded-[12px]  md:py-2 flex justify-start md:justify-center">
              {/* <!-- Tab buttons --> */}
              <div className="flex justify-center space-x-5 lg:space-x-10 2xl:space-x-4">
                <button
                  ref={tabButtonRefs[1]}
                  className={`sixth-tab-button min-w-[56px] 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 1 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab1"
                  onClick={() => handleActiveTab(1)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 1
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 30 27"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24.5133 13.0831C24.5133 12.5818 24.2319 12.1218 23.7839 11.8938C22.6373 11.3098 21.4093 10.7725 20.0333 10.2498C17.7586 9.3778 16.1013 7.69513 15.2399 5.3898C14.7239 3.99113 14.1933 2.7458 13.6186 1.58313C13.3933 1.1298 12.9293 0.841797 12.4239 0.841797C11.9186 0.841797 11.4519 1.1298 11.2293 1.58446C10.6559 2.74313 10.1266 3.98846 9.6106 5.38446C8.74927 7.6938 7.0906 9.37646 4.81994 10.2471C3.43594 10.7738 2.2066 11.3111 1.06394 11.8938C0.617271 12.1205 0.335938 12.5805 0.335938 13.0818C0.335938 13.5831 0.617271 14.0431 1.06527 14.2711C2.2146 14.8551 3.4426 15.3938 4.81594 15.9138C7.0906 16.7858 8.74794 18.4685 9.60927 20.7751C10.1279 22.1791 10.6573 23.4218 11.2293 24.5805C11.4546 25.0351 11.9173 25.3231 12.4239 25.3231C12.9306 25.3231 13.3946 25.0351 13.6186 24.5805C14.1933 23.4218 14.7226 22.1765 15.2373 20.7791C16.0999 18.4698 17.7599 16.7871 20.0279 15.9165C21.4066 15.3938 22.6346 14.8565 23.7839 14.2725C24.2319 14.0445 24.5133 13.5858 24.5133 13.0831Z" />
                    <path d="M21.7971 6.38035C22.1371 6.55368 22.4717 6.69635 22.8011 6.82168C23.0771 6.92835 23.2704 7.12568 23.3744 7.40168C23.4971 7.73901 23.6371 8.07501 23.8064 8.41901C24.0291 8.87501 24.4931 9.16568 25.0011 9.16568H25.0037C25.5104 9.16568 25.9744 8.87768 26.1984 8.42301C26.3677 8.08035 26.5064 7.74301 26.6304 7.40835C26.7371 7.12568 26.9304 6.92835 27.2011 6.82435C27.5357 6.69768 27.8691 6.55501 28.2091 6.38168C28.6571 6.15501 28.9384 5.69368 28.9384 5.19235C28.9384 4.69101 28.6557 4.23101 28.2077 4.00435C27.8691 3.83368 27.5357 3.69101 27.2051 3.56435C26.9304 3.45901 26.7371 3.26168 26.6317 2.98168C26.5064 2.64435 26.3677 2.30701 26.1971 1.96301C25.9731 1.50968 25.5091 1.22168 25.0024 1.22168H24.9997C24.4917 1.22168 24.0291 1.51101 23.8051 1.96701C23.6371 2.30968 23.4971 2.64701 23.3757 2.97768C23.2691 3.26035 23.0757 3.45768 22.8051 3.56168C22.4691 3.68968 22.1357 3.83101 21.7957 4.00435C21.3477 4.23101 21.0664 4.69101 21.0664 5.19235C21.0664 5.69368 21.3477 6.15368 21.7957 6.38035H21.7971Z" />
                    <path d="M28.9398 20.5712C28.5172 20.3566 28.0998 20.1779 27.6892 20.0232C27.2372 19.8499 26.9078 19.5139 26.7385 19.0579C26.5825 18.6366 26.4078 18.2152 26.1972 17.7886C25.9718 17.3339 25.5078 17.0459 25.0025 17.0459C24.4945 17.0459 24.0305 17.3352 23.8078 17.7912C23.5985 18.2179 23.4238 18.6379 23.2718 19.0512C23.0985 19.5139 22.7692 19.8499 22.3238 20.0206C21.9078 20.1779 21.4892 20.3566 21.0678 20.5726C20.6212 20.8006 20.3398 21.2592 20.3398 21.7606C20.3398 22.2619 20.6212 22.7206 21.0678 22.9486C21.4892 23.1632 21.9052 23.3406 22.3198 23.4992C22.7692 23.6712 23.0985 24.0059 23.2692 24.4632C23.4238 24.8832 23.5985 25.3046 23.8092 25.7299C24.0332 26.1846 24.4958 26.4726 25.0038 26.4739C25.5105 26.4739 25.9732 26.1872 26.1985 25.7326C26.4105 25.3059 26.5852 24.8846 26.7398 24.4672C26.9105 24.0059 27.2398 23.6712 27.6892 23.4992C28.1052 23.3406 28.5198 23.1646 28.9412 22.9499C29.3892 22.7219 29.6705 22.2619 29.6705 21.7606C29.6705 21.2592 29.3892 20.7992 28.9412 20.5712H28.9398Z" />
                  </svg>
                  Jugl AI
                </button>

                <button
                  ref={tabButtonRefs[2]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 2 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab2"
                  onClick={() => handleActiveTab(2)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 2
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 15 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.8333 0.908203C11.4215 1.10985 11.9567 1.44139 12.3992 1.8782L13.7792 3.25987C14.2165 3.70178 14.5484 4.23676 14.75 4.82487H10.8333V0.908203ZM9.16667 10.6582H5.83333C5.61232 10.6582 5.40036 10.746 5.24408 10.9023C5.0878 11.0586 5 11.2705 5 11.4915C5 11.7126 5.0878 11.9245 5.24408 12.0808C5.40036 12.2371 5.61232 12.3249 5.83333 12.3249H9.16667C9.38768 12.3249 9.59964 12.2371 9.75592 12.0808C9.9122 11.9245 10 11.7126 10 11.4915C10 11.2705 9.9122 11.0586 9.75592 10.9023C9.59964 10.746 9.38768 10.6582 9.16667 10.6582ZM10.8333 6.49154C10.3913 6.49154 9.96738 6.31594 9.65482 6.00338C9.34226 5.69082 9.16667 5.2669 9.16667 4.82487V0.658203H4.16667C3.062 0.659526 2.00296 1.09894 1.22185 1.88005C0.440735 2.66117 0.00132321 3.72021 0 4.82487V16.4915C0.00132321 17.5962 0.440735 18.6552 1.22185 19.4364C2.00296 20.2175 3.062 20.6569 4.16667 20.6582H10.8333C11.938 20.6569 12.997 20.2175 13.7782 19.4364C14.5593 18.6552 14.9987 17.5962 15 16.4915V6.49154H10.8333ZM10.8333 17.3249H4.16667C3.94565 17.3249 3.73369 17.2371 3.57741 17.0808C3.42113 16.9245 3.33333 16.7125 3.33333 16.4915C3.33333 16.2705 3.42113 16.0586 3.57741 15.9023C3.73369 15.746 3.94565 15.6582 4.16667 15.6582H10.8333C11.0543 15.6582 11.2663 15.746 11.4226 15.9023C11.5789 16.0586 11.6667 16.2705 11.6667 16.4915C11.6667 16.7125 11.5789 16.9245 11.4226 17.0808C11.2663 17.2371 11.0543 17.3249 10.8333 17.3249ZM9.16667 13.9915H5.83333C5.17029 13.9915 4.53441 13.7281 4.06557 13.2593C3.59673 12.7905 3.33333 12.1546 3.33333 11.4915C3.33333 10.8285 3.59673 10.1926 4.06557 9.72377C4.53441 9.25493 5.17029 8.99154 5.83333 8.99154H9.16667C9.82971 8.99154 10.4656 9.25493 10.9344 9.72377C11.4033 10.1926 11.6667 10.8285 11.6667 11.4915C11.6667 12.1546 11.4033 12.7905 10.9344 13.2593C10.4656 13.7281 9.82971 13.9915 9.16667 13.9915Z" />
                  </svg>
                  Forms
                </button>

                <button
                  ref={tabButtonRefs[3]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 3 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab3"
                  onClick={() => handleActiveTab(3)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 3
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.25 6.49154H5.565C5.20583 7.0282 5 7.6657 5 8.3407V16.9082C5 18.979 6.67917 20.6582 8.75 20.6582H16.25C18.3208 20.6582 20 18.979 20 16.9082V10.2415C20 8.1707 18.3208 6.49154 16.25 6.49154ZM10.8333 17.3249C10.8333 17.7849 10.46 18.1582 10 18.1582H8.33333C7.87333 18.1582 7.5 17.7849 7.5 17.3249V15.6582C7.5 15.1982 7.87333 14.8249 8.33333 14.8249H10C10.46 14.8249 10.8333 15.1982 10.8333 15.6582V17.3249ZM10.8333 11.4915C10.8333 11.9515 10.46 12.3249 10 12.3249H8.33333C7.87333 12.3249 7.5 11.9515 7.5 11.4915V9.82487C7.5 9.36487 7.87333 8.99154 8.33333 8.99154H10C10.46 8.99154 10.8333 9.36487 10.8333 9.82487V11.4915ZM16.6667 17.3249H13.3333C12.8733 17.3249 12.5 16.9515 12.5 16.4915C12.5 16.0315 12.8733 15.6582 13.3333 15.6582H16.6667C17.1267 15.6582 17.5 16.0315 17.5 16.4915C17.5 16.9515 17.1267 17.3249 16.6667 17.3249ZM16.6667 11.4915H13.3333C12.8733 11.4915 12.5 11.1182 12.5 10.6582C12.5 10.1982 12.8733 9.82487 13.3333 9.82487H16.6667C17.1267 9.82487 17.5 10.1982 17.5 10.6582C17.5 11.1182 17.1267 11.4915 16.6667 11.4915ZM15.8333 4.82487H7.89333L14.925 1.2457C15.475 1.70404 15.8333 2.38654 15.8333 3.1582V4.82487ZM12.4033 0.658203L6.065 3.88487C4.38917 4.7382 3.33333 6.45987 3.33333 8.3407V15.574C1.43167 15.1882 0 13.5074 0 11.4915V4.82487C0 2.52404 1.86583 0.658203 4.16667 0.658203H12.4033Z" />
                  </svg>
                  Catalogue
                </button>

                <button
                  ref={tabButtonRefs[4]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 4 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab4"
                  onClick={() => handleActiveTab(4)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 4
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 15 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.16667 0.658203C3.062 0.659526 2.00296 1.09893 1.22185 1.88004C0.440735 2.66115 0.00132321 3.72018 0 4.82483V19.8247C0.000117405 19.9762 0.041572 20.1249 0.119901 20.2547C0.198231 20.3844 0.310468 20.4904 0.444531 20.5611C0.578595 20.6318 0.729407 20.6646 0.880733 20.656C1.03206 20.6474 1.17817 20.5976 1.30333 20.5122L3.05833 19.313L4.81333 20.5122C4.95199 20.6071 5.11612 20.6579 5.28417 20.6579C5.45222 20.6579 5.61634 20.6071 5.755 20.5122L7.505 19.313L9.255 20.5122C9.39374 20.6073 9.55803 20.6582 9.72625 20.6582C9.89447 20.6582 10.0588 20.6073 10.1975 20.5122L11.9475 19.3138L13.6975 20.5113C13.8226 20.5965 13.9685 20.6461 14.1197 20.6546C14.2708 20.6632 14.4214 20.6304 14.5553 20.5598C14.6892 20.4892 14.8013 20.3835 14.8797 20.254C14.958 20.1244 14.9996 19.976 15 19.8247V4.82483C14.9987 3.72018 14.5593 2.66115 13.7782 1.88004C12.997 1.09893 11.938 0.659526 10.8333 0.658203L4.16667 0.658203ZM9.16667 12.3247H4.16667C3.94565 12.3247 3.73369 12.237 3.57741 12.0807C3.42113 11.9244 3.33333 11.7124 3.33333 11.4914C3.33333 11.2704 3.42113 11.0585 3.57741 10.9022C3.73369 10.7459 3.94565 10.6581 4.16667 10.6581H9.16667C9.38768 10.6581 9.59964 10.7459 9.75592 10.9022C9.9122 11.0585 10 11.2704 10 11.4914C10 11.7124 9.9122 11.9244 9.75592 12.0807C9.59964 12.237 9.38768 12.3247 9.16667 12.3247ZM11.6667 8.15812C11.6667 8.37914 11.5789 8.5911 11.4226 8.74737C11.2663 8.90365 11.0543 8.99145 10.8333 8.99145H4.16667C3.94565 8.99145 3.73369 8.90365 3.57741 8.74737C3.42113 8.5911 3.33333 8.37914 3.33333 8.15812C3.33333 7.93711 3.42113 7.72515 3.57741 7.56888C3.73369 7.4126 3.94565 7.3248 4.16667 7.3248H10.8333C11.0543 7.3248 11.2663 7.4126 11.4226 7.56888C11.5789 7.72515 11.6667 7.93711 11.6667 8.15812Z" />
                  </svg>
                  Invoice
                </button>

                <button
                  ref={tabButtonRefs[5]}
                  className={`sixth-tab-button min-w-[82px] 2xl:px-[24px]  flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 5 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab5"
                  onClick={() => handleActiveTab(5)}
                >
                  <svg
                    className={`icon-svg   w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 5
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1841_724)">
                      <path d="M14.1242 2.36654C13.0233 1.26487 11.5583 0.658203 10 0.658203C8.44168 0.658203 6.97668 1.26487 5.87501 2.36654C3.60085 4.6407 3.60085 8.34154 5.88168 10.6224L7.96085 12.6557C8.52335 13.2057 9.26168 13.4807 10 13.4807C10.7383 13.4807 11.4767 13.2057 12.0392 12.6557L14.1242 10.6157C15.2258 9.51404 15.8333 8.04904 15.8333 6.4907C15.8333 4.93237 15.2258 3.46904 14.1242 2.36654ZM10 8.9832C8.61918 8.9832 7.50001 7.86404 7.50001 6.4832C7.50001 5.10237 8.61918 3.9832 10 3.9832C11.3808 3.9832 12.5 5.10237 12.5 6.4832C12.5 7.86404 11.3808 8.9832 10 8.9832ZM20 14.6265C20.0017 14.9215 19.8475 15.1949 19.5958 15.3457L11.3783 20.2765C10.9533 20.5315 10.4767 20.659 10.0008 20.659C9.52501 20.659 9.04751 20.5315 8.62335 20.2765L0.40418 15.3457C0.15168 15.194 -0.00165322 14.9207 1.34495e-05 14.6265C0.00168012 14.3324 0.158347 14.0607 0.412513 13.9124L4.45835 11.544C4.54168 11.6357 4.62751 11.7265 4.71585 11.8149L6.79501 13.8474C7.65168 14.6857 8.79085 15.1482 10 15.1482C11.2092 15.1482 12.3475 14.6857 13.205 13.8474L15.3033 11.7949C15.385 11.7132 15.465 11.629 15.5425 11.544L19.5875 13.9115C19.8417 14.0607 19.9983 14.3332 20 14.6265Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1841_724">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.658203)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Travel Log
                </button>

                <button
                  ref={tabButtonRefs[6]}
                  className={`sixth-tab-button min-w-[66px] 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 6 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab6"
                  onClick={() => handleActiveTab(6)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 6
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.4167 20.609C18.2392 20.609 18.0617 20.5415 17.9258 20.4057L17.3508 19.8307C16.695 19.1749 16.3333 18.3032 16.3333 17.3749V2.74154C16.3333 1.59237 17.2675 0.658203 18.4167 0.658203C19.5658 0.658203 20.5 1.59237 20.5 2.74154V17.374C20.5 18.3015 20.1383 19.174 19.4825 19.8299L18.9075 20.4049C18.7717 20.5407 18.5942 20.609 18.4167 20.609ZM11.3333 2.32487H10.7742C10.43 1.35487 9.50333 0.658203 8.41667 0.658203H6.75C5.66333 0.658203 4.73667 1.35487 4.3925 2.32487H3.83333C1.995 2.32487 0.5 3.81987 0.5 5.6582V16.4915C0.5 18.789 2.36917 20.6582 4.66667 20.6582H10.5C12.7975 20.6582 14.6667 18.789 14.6667 16.4915V5.6582C14.6667 3.81987 13.1717 2.32487 11.3333 2.32487ZM8.60583 12.4974L6.79 14.3132C6.44917 14.654 6.00167 14.824 5.55417 14.824C5.10667 14.824 4.65917 14.654 4.31833 14.3132L3.245 13.239C2.91917 12.9132 2.91917 12.3857 3.245 12.0607C3.57083 11.7349 4.0975 11.7349 4.42333 12.0607L5.49667 13.1349C5.52417 13.1624 5.58417 13.1624 5.6125 13.1349L7.42833 11.319C7.75417 10.9932 8.28083 10.9932 8.60667 11.319C8.9325 11.6449 8.93167 12.1715 8.60583 12.4974ZM8.60583 7.49737L6.79 9.3132C6.44917 9.65404 6.00167 9.82404 5.55417 9.82404C5.10667 9.82404 4.65917 9.65404 4.31833 9.3132L3.245 8.23904C2.91917 7.9132 2.91917 7.3857 3.245 7.0607C3.57083 6.73487 4.0975 6.73487 4.42333 7.0607L5.49667 8.13487C5.52417 8.16237 5.58417 8.16237 5.6125 8.13487L7.42833 6.31904C7.75417 5.9932 8.28083 5.9932 8.60667 6.31904C8.9325 6.64487 8.93167 7.17154 8.60583 7.49737Z" />
                  </svg>
                  My Task
                </button>

                <button
                  ref={tabButtonRefs[7]}
                  className={`sixth-tab-button min-w-[88px] 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 7 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab7"
                  onClick={() => handleActiveTab(7)}
                >
                  <svg
                    className={`icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 7
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 7.32487C13.1617 7.32487 11.6667 5.82987 11.6667 3.99154C11.6667 2.1532 13.1617 0.658203 15 0.658203C16.8383 0.658203 18.3333 2.1532 18.3333 3.99154C18.3333 5.82987 16.8383 7.32487 15 7.32487ZM10 13.1582C8.16167 13.1582 6.66667 11.6632 6.66667 9.82487C6.66667 7.98654 8.16167 6.49154 10 6.49154C11.8383 6.49154 13.3333 7.98654 13.3333 9.82487C13.3333 11.6632 11.8383 13.1582 10 13.1582ZM5 7.32487C3.16167 7.32487 1.66667 5.82987 1.66667 3.99154C1.66667 2.1532 3.16167 0.658203 5 0.658203C6.83833 0.658203 8.33333 2.1532 8.33333 3.99154C8.33333 5.82987 6.83833 7.32487 5 7.32487ZM19.1667 18.9915H15C15 16.234 12.7575 13.9915 10 13.9915C7.2425 13.9915 5 16.234 5 18.9915H0.833333C0.3725 18.9915 0 19.364 0 19.8249C0 20.2857 0.3725 20.6582 0.833333 20.6582H19.1667C19.6275 20.6582 20 20.2857 20 19.8249C20 19.364 19.6275 18.9915 19.1667 18.9915ZM0.833333 14.8249H4.80333C5.26833 14.2457 5.82833 13.7482 6.45833 13.3507C5.5575 12.4457 5 11.1999 5 9.82487C5 9.54154 5.02917 9.2657 5.075 8.9957C5.05 8.9957 5.02583 8.99154 5 8.99154C2.2425 8.99154 0 11.234 0 13.9915C0 14.4524 0.3725 14.8249 0.833333 14.8249ZM20 13.9915C20 11.234 17.7575 8.99154 15 8.99154C14.975 8.99154 14.9508 8.99487 14.925 8.9957C14.9708 9.26654 15 9.54237 15 9.82487C15 11.1999 14.4425 12.4457 13.5417 13.3507C14.1717 13.7482 14.7317 14.2457 15.1967 14.8249H19.1667C19.6275 14.8249 20 14.4524 20 13.9915Z" />
                  </svg>
                  Team Task
                </button>

                <button
                  ref={tabButtonRefs[8]}
                  className={`sixth-tab-button min-w-[56px] 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 8 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab8"
                  onClick={() => handleActiveTab(8)}
                >
                  <svg
                    className={` icon-svg w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 8
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.2627 19.1533C20.9413 20.0629 19.664 20.8154 18.6453 21.0355C17.948 21.1835 17.0386 21.3006 13.9746 20.0309C10.5333 18.6052 5.75464 13.5265 5.75464 10.1468C5.75464 8.42629 6.74664 6.42285 8.4813 6.42285C9.31597 6.42285 9.49997 6.43913 9.77464 7.09798C10.096 7.87422 10.88 9.78669 10.9733 9.98275C11.3586 10.787 10.5813 11.2578 10.0173 11.958C9.83729 12.1687 9.63331 12.3966 9.86131 12.7887C10.088 13.1729 10.872 14.4506 12.024 15.4762C13.512 16.802 14.7186 17.2252 15.1506 17.4053C15.472 17.5386 15.856 17.5076 16.0906 17.2568C16.388 16.9354 16.7573 16.4021 17.1333 15.8766C17.3986 15.5005 17.736 15.4535 18.0893 15.5869C18.328 15.6696 21.3613 17.0783 21.4893 17.3037C21.584 17.4678 21.584 18.2437 21.2627 19.1533ZM13.504 0.325195H13.4973C6.14663 0.325195 0.167969 6.30566 0.167969 13.6585C0.167969 16.5741 1.10798 19.279 2.70664 21.473L1.04531 26.4274L6.16931 24.79C8.27731 26.1851 10.7933 26.9919 13.504 26.9919C20.8546 26.9919 26.8346 21.0114 26.8346 13.6585C26.8346 6.30566 20.8546 0.325195 13.504 0.325195Z"
                    />
                  </svg>
                  WhatsApp Inbox
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Tab Content --> */}
          <div className="lg:mt-4 text-center lg:text-start">
            {/* <!-- tab-1 --> */}
            {activeTab === 1 && (
              <div
                id="sixthcontent1"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-gradient-to-br from-[rgba(33,150,243,0.4)] via-[rgba(159,31,244,0.2)] to-[rgba(176,33,243,0.4)] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct1-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct1-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[8%] top-[14%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Smarter Workflows <br /> with AI{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      {" "}
                      Get contextual suggestions and task insights, right when
                      you need them. Automate repetitive steps and boost
                      decision-making speed. Let AI enhance every layer of your
                      workflow.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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
              <div
                id="sixthcontent2"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(215,98,184,0.4),rgba(228,141,189,0.2),rgba(255,209,240,0.4))] rounded-[18px] bg-opacity-[50%]]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct2-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] -bottom-[2%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct2-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[8%] top-[16%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct2-cd3.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[280px] xl:w-fit -right-[8%] -bottom-[2%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct2-cd4.png"
                        alt="card overview"
                        className="absolute z-20 left-[30%] bottom-[1%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Collect and Act <br /> on Data{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      {" "}
                      Design custom forms for internal or field data capture.{" "}
                      <br /> Automatically trigger tasks or approvals from
                      submissions. <br />
                      Turn inputs into immediate, trackable action.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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
              <div
                id="sixthcontent3"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(13,114,192,0.4),rgba(100,146,241,0.2),rgba(211,233,255,0.4))] rounded-[18px] bg-opacity-[50%] ">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct5.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct5-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct5-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[220px] xl:w-fit -right-[8%] -bottom-[2%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct5-cd3.png"
                        alt="card overview"
                        className="absolute z-10 -right-[1%] top-[2%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Your Offerings, Always Accessible{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      {" "}
                      Organize products or services in a centralized, searchable
                      catalog. <br /> Attach relevant items to orders, tasks, or
                      customer requests. <br />
                      Ensure your team always works with accurate, up-to-date
                      info.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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
              <div
                id="sixthcontent4"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(238,215,107,0.4),rgba(249,235,169,0.2),rgba(255,248,215,0.4))] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct4-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct4-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[250px] xl:w-fit -right-[8%] -bottom-[1%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct4-cd3.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[30%] bottom-[2%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Frictionless Billing <br /> Built-In{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      {" "}
                      Create and manage invoices directly within your workflow.{" "}
                      <br /> Track payment status and connect billing to
                      assigned tasks. <br />
                      Speed up invoicing without leaving the platform.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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
              <div
                id="sixthcontent5"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(225,252,255,0.4),rgba(100,224,241,0.2),rgba(43,192,13,0.4))] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct6.png"
                        alt="banner"
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct6-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct6-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[220px] xl:w-fit -right-[6%] -bottom-[3%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct6-cd3.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit right-[6%] bottom-[33%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Track Work <br /> on the Move{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      {" "}
                      Log field visits, check-ins, and on-site work from any
                      device. <br /> Capture time, location, and activity
                      instantly. <br />
                      Keep your field team’s efforts visible and accountable.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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

            {/* <!-- tab-6 --> */}
            {activeTab === 6 && (
              <div
                id="sixthcontent6"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(39,152,167,0.4),rgba(163,214,215,0.2),rgba(163,214,215,0.4))] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct3-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct3-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[6%] -bottom-[3%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct3-cd3.png"
                        alt="card overview"
                        className="absolute z-20 -right-[6%] bottom-[35%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Your Work, <br /> Fully Organized{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      View all your tasks across every project in one place.{" "}
                      <br /> Prioritize, plan, and execute without distractions.{" "}
                      <br /> Stay clear, focused, and always on track.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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

            {/* <!-- tab-7 --> */}
            {activeTab === 7 && (
              <div
                id="sixthcontent7"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(35,52,175,0.4),rgba(39,50,167,0.2),rgba(175,163,215,0.4))] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct7.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct7-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[220px] xl:w-fit -left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct7-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[8%] top-[10%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct7-cd3.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[6%] -bottom-[3%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Your Team, <br /> at a Glance{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      See what your team is working on in real time. <br />{" "}
                      Track progress, balance workloads, and unblock
                      bottlenecks. <br /> Lead with clarity and support every
                      team member.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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

            {/* <!-- tab-8 --> */}
            {activeTab === 8 && (
              <div
                id="sixthcontent8"
                className="sixth-tab-content duration-300"
              >
                <div className="flex flex-col lg:flex-row sm:gap-[10px] lg:gap-[60px] items-center justify-center lg:justify-between pt-[40px] lg:pt-[60px] 2xl:p-[60px] !pb-0">
                  <div className="md:w-[90%] lg:w-[50%] order-2 lg:order-1 flex flex-col items-center justify-center">
                    <div className="relative p-3 pb-0 animate-fade-up h-auto xl:h-[420px]  w-full bg-[linear-gradient(to_bottom_right,rgba(163,95,38,0.4),rgba(228,166,114,0.2),rgba(246,198,158,0.4))] rounded-[18px] bg-opacity-[50%]">
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct8.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="sixth-tab-image relative z-10 max-w-full animate-fade-up "
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct8-cd1.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -left-[1%] bottom-0 animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct8-cd2.png"
                        alt="card overview"
                        className="absolute z-20 lg:w-[180px] xl:w-fit -right-[8%] -bottom-[1%] animate-fade-up-12s"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/images/new-banners/seventh-section/rw-ct8-cd3.png"
                        alt="card overview"
                        className="absolute z-10 lg:w-[180px] xl:w-fit left-[30%] bottom-[3%] animate-fade-up-delayed"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
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
                      Customer Chats <br /> Made Actionable{" "}
                    </h2>
                    <p className="text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Connect WhatsApp messages directly to your Jugl workflows.{" "}
                      <br /> Respond, assign, and track communication without
                      losing context. <br /> Every message becomes part of the
                      bigger picture.
                    </p>

                    <div className="hidden lg:flex gap-[18px] justify-center lg:justify-start items-center flex-wrap mt-[40px]">
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
        <div className="block md:hidden">
          <AccordionSection2 />
        </div>
      </div>
      {/* <!-- Deeply Designed Solutions section ends --> */}
    </>
  );
}
