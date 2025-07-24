"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import lottie from "lottie-web";
import AccordionSection from "@/app/Common/Accordian/page";

export default function SeeYourWork() {
  const [activeTab, setActiveTab] = useState(1);
  const sectionRef = useRef(null);
  const animationInstance = useRef(null);
  const [showStaticImage, setShowStaticImage] = useState(false);

  const tabButtonsRef = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
    7: useRef(null),
  };

  const TOTAL_TABS = 7;

  const handleActiveTab = (tabIndex) => {
    const wrappedIndex = ((tabIndex - 1 + TOTAL_TABS) % TOTAL_TABS) + 1;
    setActiveTab(wrappedIndex);

    tabButtonsRef[wrappedIndex]?.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements =
              entry.target.querySelectorAll(".animate-on-scroll");
            animatedElements.forEach((el) => {
              el.classList.add("animate-fade-up-04s");
            });
            observer.unobserve(entry.target); // Only once
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 1) return;

    const container = document.getElementById("animate-tabImg1");
    const path = "/images/lottie/data.json";

    if (container) {
      // Reset image state
      setShowStaticImage(false);

      if (animationInstance.current) {
        animationInstance.current.destroy();
      }

      // Load Lottie animation
      animationInstance.current = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path,
      });

      // After 3s, destroy animation and show static image
      const timer = setTimeout(() => {
        if (animationInstance.current) {
          animationInstance.current.destroy();
          animationInstance.current = null;
          setShowStaticImage(true);
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
        if (animationInstance.current) {
          animationInstance.current.destroy();
          animationInstance.current = null;
        }
      };
    }
  }, [activeTab]);

  return (
    <>
      <div className="">
        <div className=" px-[22px] mx-auto custom-container  py-[20px] md:py-[40px] lg:py-[60px]">
          <div className="max-w-[850px] mx-auto mb-[20px] text-center">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              Any View to See Any Data
            </h3>
            <p className="md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] block">
              Jugl gives you the flexibility to work in views you’re already
              comfortable with.
            </p>
          </div>

          {/* <!-- Second section tab --> */}
          <div
            className="mx-auto w-
          full xl:w-[80%] 2xl:w-fit lg:p-4  sticky lg:static top-0 z-[99] hidden md:block bg-[#fff] py-1"
          >
            <div className="relative">
              {/* <!-- Tab buttons --> */}
              <div className="flex justify-between lg:justify-center space-x-5 lg:space-x-10 2xl:space-x-4 px-[30px] lg:px-0">
                <button
                  ref={tabButtonsRef[1]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
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
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.56293 4.07405C5.26662 3.95257 5.92291 3.85183 6.57771 3.85183C7.23252 3.85183 7.88732 3.95257 8.5925 4.07405C8.87398 4.12293 9.09027 4.36293 9.11101 4.63996L9.12583 4.84144C9.21471 6.00587 9.3036 7.17474 9.3036 8.36732C9.3036 9.56286 9.21471 10.7302 9.12583 11.8962L9.11101 12.0962C9.09912 12.2346 9.04185 12.3653 8.9481 12.4679C8.85434 12.5705 8.72934 12.6393 8.5925 12.6636C7.88732 12.7836 7.23252 12.8858 6.57771 12.8858C5.92291 12.8858 5.26662 12.7836 4.56293 12.6636C4.42581 12.6396 4.30048 12.5709 4.20643 12.4683C4.11238 12.3657 4.0549 12.2348 4.04293 12.0962L4.02812 11.8962C3.93923 10.7302 3.85183 9.56286 3.85183 8.3688C3.85183 7.17474 3.94071 6.00587 4.02812 4.84144L4.04293 4.63996C4.05514 4.50176 4.11254 4.37142 4.20627 4.26912C4.3 4.16682 4.42483 4.09826 4.56145 4.07405M6.57771 2C5.7481 2 4.95255 2.12741 4.24886 2.24889C3.70503 2.34267 3.20794 2.61496 2.83611 3.02274C2.46428 3.43052 2.23889 3.95055 2.19555 4.50071L2.18074 4.71848C2.09037 5.86958 2 7.10215 2 8.3688C2 9.63545 2.09333 10.868 2.17926 12.0191L2.19555 12.2354C2.23889 12.7856 2.46428 13.3056 2.83611 13.7134C3.20794 14.1212 3.70503 14.3934 4.24886 14.4872C4.95255 14.6087 5.7481 14.7376 6.57771 14.7376C7.40733 14.7376 8.20139 14.6087 8.90361 14.4887C9.44794 14.3952 9.94554 14.1228 10.3177 13.7147C10.6898 13.3066 10.9153 12.786 10.9584 12.2354L10.9732 12.0191C11.0621 10.868 11.1539 9.63397 11.1539 8.3688C11.1539 7.10215 11.0606 5.86958 10.9747 4.71848L10.9584 4.50219C10.9153 3.95156 10.6898 3.43102 10.3177 3.02292C9.94554 2.61481 9.44794 2.34244 8.90361 2.24889C8.20139 2.12741 7.40585 2 6.57771 2ZM15.4072 11.3362C16.1124 11.2162 16.7672 11.1139 17.422 11.1139C18.0768 11.1139 18.7331 11.2162 19.4368 11.3362C19.5735 11.3611 19.6983 11.43 19.7922 11.5325C19.886 11.6349 19.9439 11.7652 19.9568 11.9036L19.9716 12.1036C20.0605 13.2695 20.1479 14.4369 20.1479 15.6309C20.1479 16.825 20.059 17.9939 19.9716 19.1583L19.9568 19.3598C19.9446 19.498 19.8872 19.6283 19.7934 19.7306C19.6997 19.8329 19.5749 19.9015 19.4383 19.9257C18.7331 20.0472 18.0768 20.1479 17.4235 20.1479C16.7672 20.1479 16.1124 20.0472 15.4087 19.9257C15.2718 19.9018 15.1466 19.8333 15.0526 19.731C14.9586 19.6287 14.901 19.4982 14.8887 19.3598L14.8739 19.1583C14.785 17.9939 14.6961 16.825 14.6961 15.6324C14.6961 14.4369 14.785 13.2695 14.8739 12.1036L14.8887 11.9036C14.9006 11.7651 14.9579 11.6344 15.0516 11.5318C15.1454 11.4292 15.2704 11.3605 15.4072 11.3362ZM17.422 9.26212C16.5924 9.26212 15.7983 9.39101 15.0961 9.51101C14.5518 9.60456 14.0542 9.87693 13.682 10.285C13.3099 10.6931 13.0844 11.2137 13.0413 11.7643L13.0265 11.9806C12.9376 13.1317 12.8458 14.3658 12.8458 15.6309C12.8458 16.8976 12.9376 18.1301 13.025 19.2812L13.0413 19.4975C13.0844 20.0479 13.3096 20.5683 13.6815 20.9764C14.0533 21.3845 14.5506 21.657 15.0946 21.7508C15.7983 21.8708 16.5939 21.9997 17.422 21.9997C18.2516 21.9997 19.0472 21.8708 19.7509 21.7508C20.2947 21.6571 20.7918 21.3848 21.1636 20.977C21.5354 20.5692 21.7608 20.0492 21.8042 19.499L21.819 19.2812C21.9079 18.1301 21.9997 16.8976 21.9997 15.6309C21.9997 14.3643 21.9064 13.1317 21.8205 11.9806L21.8042 11.7643C21.7608 11.2142 21.5354 10.6941 21.1636 10.2863C20.7918 9.87856 20.2947 9.60627 19.7509 9.51249C19.0472 9.39101 18.2516 9.26212 17.422 9.26212ZM15.1806 2.08592C15.8887 2.04444 16.6442 2 17.422 2C18.1998 2 18.9568 2.04296 19.6649 2.08592C20.742 2.15111 21.7612 2.93925 21.939 4.10664C21.9745 4.33775 21.9997 4.58959 21.9997 4.85478C21.9997 5.11848 21.9745 5.37032 21.939 5.60143C21.7612 6.76882 20.742 7.55696 19.6649 7.62214C18.9568 7.66659 18.2013 7.70807 17.422 7.70807C16.6742 7.70206 15.9267 7.67341 15.1806 7.62214C14.1035 7.55696 13.0828 6.76882 12.9065 5.60143C12.8678 5.3544 12.8475 5.10482 12.8458 4.85478C12.8458 4.58811 12.871 4.33626 12.905 4.10664C13.0828 2.93925 14.1035 2.15111 15.1806 2.08592ZM6.57771 16.2917C5.79847 16.2917 5.04292 16.3346 4.33478 16.3776C3.25776 16.4428 2.23852 17.2294 2.06074 18.3983C2.02199 18.6453 2.00169 18.8949 2 19.1449C2 19.4116 2.02518 19.662 2.06074 19.8931C2.23852 21.0605 3.25776 21.8486 4.33478 21.9138C5.04292 21.9568 5.79847 21.9997 6.57771 21.9997C7.35548 21.9997 8.11103 21.9553 8.81916 21.9138C9.89619 21.8471 10.9169 21.0605 11.0932 19.8931C11.132 19.6456 11.1523 19.3955 11.1539 19.1449C11.1528 18.8949 11.1329 18.6454 11.0947 18.3983C10.9169 17.2294 9.89619 16.4428 8.81916 16.3776C8.0731 16.3254 7.32558 16.2967 6.57771 16.2917Z"
                    />
                  </svg>
                  Dashboards
                </button>

                <button
                  ref={tabButtonsRef[2]}
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
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.39535 9.81863C4.3459 10.5411 4.3202 11.2684 4.31826 12.0005C4.31826 12.5436 4.3328 13.0837 4.3619 13.621H8.65589V9.81863H4.39535ZM10.4756 9.81863V13.621H20.6389C20.668 13.0828 20.6826 12.5426 20.6826 12.0005C20.6806 11.2684 20.6549 10.5411 20.6055 9.81863H10.4756ZM10.4756 15.4392H20.5051C20.4663 15.8465 20.4256 16.2528 20.3829 16.6582C20.2886 17.4751 19.9214 18.2362 19.3406 18.8183C18.7598 19.4004 17.9995 19.7695 17.1828 19.8656C15.6336 20.0387 14.0772 20.1827 12.5004 20.1827C11.8244 20.1814 11.1486 20.1576 10.4742 20.1114L10.4756 15.4392ZM4.49717 15.4392H8.65735V19.9558C8.37709 19.9267 8.09781 19.8966 7.8195 19.8656C7.00283 19.7695 6.24252 19.4004 5.66173 18.8183C5.08093 18.2362 4.71364 17.4751 4.61936 16.6582C4.57475 16.2528 4.53354 15.8465 4.49572 15.4392M9.47047 21.8584C8.85149 21.8049 8.23323 21.7433 7.61585 21.6737C6.38741 21.5318 5.24331 20.9778 4.37021 20.102C3.49712 19.2263 2.94656 18.0805 2.80838 16.8517C2.64401 15.2952 2.5 13.669 2.5 12.0005C2.5 10.3321 2.64401 8.7044 2.80983 7.14943C2.94802 5.92056 3.49857 4.77479 4.37166 3.89905C5.24476 3.02332 6.38886 2.46931 7.6173 2.32741C9.18101 2.15286 10.8203 2.00012 12.5004 2.00012C14.1805 2.00012 15.8198 2.15431 17.3835 2.32741C18.612 2.46931 19.7561 3.02332 20.6292 3.89905C21.5023 4.77479 22.0528 5.92056 22.191 7.14943C22.3568 8.70586 22.5008 10.3321 22.5008 12.0005C22.5008 13.669 22.3568 15.2967 22.191 16.8517C22.0528 18.0805 21.5023 19.2263 20.6292 20.102C19.7561 20.9778 18.612 21.5318 17.3835 21.6737C15.8198 21.8482 14.1805 22.001 12.5004 22.001C11.4893 21.9973 10.4789 21.9498 9.47193 21.8584"
                    />
                  </svg>
                  Tables
                </button>

                <button
                  ref={tabButtonsRef[3]}
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
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.5 3C10.7652 3 11.0196 3.10536 11.2071 3.29289C11.3946 3.48043 11.5 3.73478 11.5 4C11.5 4.26522 11.3946 4.51957 11.2071 4.70711C11.0196 4.89464 10.7652 5 10.5 5H4.5C4.23478 5 3.98043 4.89464 3.79289 4.70711C3.60536 4.51957 3.5 4.26522 3.5 4C3.5 3.73478 3.60536 3.48043 3.79289 3.29289C3.98043 3.10536 4.23478 3 4.5 3H10.5ZM20.5 3C20.7652 3 21.0196 3.10536 21.2071 3.29289C21.3946 3.48043 21.5 3.73478 21.5 4C21.5 4.26522 21.3946 4.51957 21.2071 4.70711C21.0196 4.89464 20.7652 5 20.5 5H14.5C14.2348 5 13.9804 4.89464 13.7929 4.70711C13.6054 4.51957 13.5 4.26522 13.5 4C13.5 3.73478 13.6054 3.48043 13.7929 3.29289C13.9804 3.10536 14.2348 3 14.5 3H20.5ZM8.5 7C9.29565 7 10.0587 7.31607 10.6213 7.87868C11.1839 8.44129 11.5 9.20435 11.5 10V18C11.5 18.7956 11.1839 19.5587 10.6213 20.1213C10.0587 20.6839 9.29565 21 8.5 21H6.5C5.70435 21 4.94129 20.6839 4.37868 20.1213C3.81607 19.5587 3.5 18.7956 3.5 18V10C3.5 9.20435 3.81607 8.44129 4.37868 7.87868C4.94129 7.31607 5.70435 7 6.5 7H8.5ZM18.5 7C19.2956 7 20.0587 7.31607 20.6213 7.87868C21.1839 8.44129 21.5 9.20435 21.5 10V12C21.5 12.7956 21.1839 13.5587 20.6213 14.1213C20.0587 14.6839 19.2956 15 18.5 15H16.5C15.7044 15 14.9413 14.6839 14.3787 14.1213C13.8161 13.5587 13.5 12.7956 13.5 12V10C13.5 9.20435 13.8161 8.44129 14.3787 7.87868C14.9413 7.31607 15.7044 7 16.5 7H18.5Z" />
                  </svg>
                  Kanban
                </button>

                <button
                  ref={tabButtonsRef[4]}
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
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.83989 20.8765C6.3452 20.9515 5.89937 20.8355 5.50241 20.5285C5.10546 20.2214 4.8767 19.8203 4.81614 19.325L3.62437 9.49852C3.5644 9.00382 3.68433 8.56159 3.98415 8.17183C4.28396 7.78207 4.68122 7.55721 5.17591 7.49724L6.21028 7.36233V14.6928C6.21028 15.6822 6.56257 16.5292 7.26713 17.2338C7.9717 17.9383 8.81868 18.2906 9.80808 18.2906H18.1729C18.083 18.6504 17.9031 18.9616 17.6333 19.2243C17.3634 19.4869 17.0336 19.6404 16.6439 19.6848L6.83989 20.8765ZM9.80808 16.4917C9.31338 16.4917 8.89004 16.3157 8.53805 15.9638C8.18607 15.6118 8.00978 15.1881 8.00918 14.6928V4.7989C8.00918 4.3042 8.18547 3.88086 8.53805 3.52888C8.89064 3.17689 9.31398 3.0006 9.80808 3H19.702C20.1967 3 20.6203 3.17629 20.9729 3.52888C21.3255 3.88146 21.5015 4.3048 21.5009 4.7989V14.6928C21.5009 15.1875 21.3249 15.6112 20.9729 15.9638C20.6209 16.3163 20.1973 16.4923 19.702 16.4917H9.80808ZM13.1585 12.1744L14.755 11.2075L16.3516 12.1744C16.4415 12.2343 16.5279 12.2343 16.6106 12.1744C16.6934 12.1144 16.7194 12.032 16.6889 11.927L16.2616 10.1056L17.6558 8.89139C17.7307 8.81644 17.7568 8.73758 17.734 8.65483C17.7112 8.57208 17.6477 8.52351 17.5433 8.50912L15.6995 8.35172L14.9574 6.64277C14.9274 6.55282 14.86 6.50785 14.755 6.50785C14.6501 6.50785 14.5826 6.55282 14.5527 6.64277L13.8106 8.35172L11.9668 8.50912C11.8618 8.52411 11.7983 8.57298 11.7761 8.65573C11.7539 8.73848 11.78 8.81703 11.8543 8.89139L13.2485 10.1056L12.8212 11.927C12.7912 12.032 12.8176 12.1144 12.9004 12.1744C12.9831 12.2343 13.0692 12.2343 13.1585 12.1744Z" />
                  </svg>
                  Cards
                </button>

                <button
                  ref={tabButtonsRef[5]}
                  className={`sixth-tab-button  2xl:px-[24px]  flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
                ${activeTab === 5 ? "text-[#2196F3]" : "text-[#5d5d5d]"}
                `}
                  id="sixthtab5"
                  onClick={() => handleActiveTab(5)}
                >
                  <svg
                    className={`icon-svg fill-[#5D5D5D] w-[45px] xl:w-[55px] h-[42px] xl:h-[52px] p-[10px] xl:p-[13px] group-hover:bg-[#effaff] rounded-[12px] group-hover:fill-[#2196F3] transition-colors duration-300
                    ${
                      activeTab === 5
                        ? "fill-[#2196F3] bg-[#effaff]"
                        : "fill-[#5D5D5D] bg-[#F5F5F5]"
                    }
                  `}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.563 5.9322C3.5 6.2634 3.5 6.6612 3.5 7.455V13.8C3.5 17.1939 3.5 18.8913 4.5548 19.9452C5.6096 20.9991 7.3061 21 10.7 21H14.3C17.6939 21 19.3913 21 20.4452 19.9452C21.4991 18.8904 21.5 17.1939 21.5 13.8V11.8182C21.5 9.4494 21.5 8.2641 20.807 7.4946C20.7434 7.42359 20.6761 7.35599 20.6054 7.2921C19.8359 6.6 18.6506 6.6 16.2818 6.6H15.9452C14.9075 6.6 14.3882 6.6 13.904 6.4623C13.6383 6.38634 13.3822 6.28004 13.1408 6.1455C12.7016 5.9016 12.3344 5.5335 11.6 4.8L11.105 4.305C10.8584 4.0584 10.736 3.936 10.6064 3.828C10.049 3.36598 9.36524 3.08275 8.6444 3.0153C8.477 3 8.3024 3 7.955 3C7.1603 3 6.7634 3 6.4322 3.063C5.72106 3.1973 5.0669 3.54282 4.55508 4.05449C4.04325 4.56615 3.69752 5.2211 3.563 5.9322ZM16.3547 3.9C16.6832 3.9 16.8479 3.9 16.9865 3.918C17.9027 4.044 18.6317 4.7667 18.7991 5.7C18.662 5.66924 18.5236 5.64491 18.3842 5.6271C17.8082 5.5515 17.081 5.5515 16.1792 5.5515H15.8786C15.0308 5.5515 14.7086 5.547 14.4161 5.4606C14.2458 5.4102 14.0821 5.33981 13.9283 5.2509C13.6619 5.0979 13.4315 4.8657 12.8321 4.2447L12.5 3.9H16.3547ZM13.4 9.525C13.221 9.525 13.0493 9.59612 12.9227 9.7227C12.7961 9.84929 12.725 10.021 12.725 10.2C12.725 10.379 12.7961 10.5507 12.9227 10.6773C13.0493 10.8039 13.221 10.875 13.4 10.875H17.9C18.079 10.875 18.2507 10.8039 18.3773 10.6773C18.5039 10.5507 18.575 10.379 18.575 10.2C18.575 10.021 18.5039 9.84929 18.3773 9.7227C18.2507 9.59612 18.079 9.525 17.9 9.525H13.4Z"
                    />
                  </svg>
                  Records
                </button>

                <button
                  ref={tabButtonsRef[6]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
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
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5001 3C16.7427 3 18.8641 3 20.1817 4.31761C20.6353 4.77122 20.9332 5.32023 21.1285 6.01773L6.51773 20.6285C5.82023 20.4332 5.27122 20.1353 4.81761 19.6817C3.5 18.365 3.5 16.2427 3.5 12.0001C3.5 7.75745 3.5 5.63613 4.81761 4.31761C6.13703 3 8.25745 3 12.5001 3ZM6.65003 9.08137C6.65003 10.6879 7.65534 12.5626 9.22406 13.2331C9.58946 13.3888 10.0107 13.3888 10.3761 13.2331C11.9448 12.5626 12.9501 10.6879 12.9501 9.08137C12.9501 7.46225 11.5398 6.15003 9.80007 6.15003C8.06035 6.15003 6.65003 7.46225 6.65003 9.08137Z"
                    />
                    <path d="M11.1492 9.29923C11.1492 9.65728 11.007 10.0007 10.7538 10.2538C10.5007 10.507 10.1573 10.6492 9.79923 10.6492C9.44119 10.6492 9.09781 10.507 8.84463 10.2538C8.59145 10.0007 8.44922 9.65728 8.44922 9.29923C8.44922 8.94119 8.59145 8.59781 8.84463 8.34463C9.09781 8.09145 9.44119 7.94922 9.79923 7.94922C10.1573 7.94922 10.5007 8.09145 10.7538 8.34463C11.007 8.59781 11.1492 8.94119 11.1492 9.29923Z" />
                    <path
                      opacity="0.5"
                      d="M21.3996 7.65625C21.4986 8.79116 21.4986 10.2069 21.4986 12.0015C21.4986 15.7221 21.4986 17.8111 20.6103 19.1575L15.2525 13.8015L21.3996 7.65625ZM19.6554 20.1124L14.2994 14.7564L8.15234 20.9017C9.28816 21.0016 10.7039 21.0016 12.4994 21.0016C16.22 21.0016 18.309 21.0016 19.6554 20.1124Z"
                    />
                  </svg>
                  Travel Logs
                </button>

                <button
                  ref={tabButtonsRef[7]}
                  className={`sixth-tab-button 2xl:px-[24px] flex flex-col gap-2 items-center text-[14px] lg:text-[16px] font-medium group hover:text-[#2196F3] focus:outline-none transition-colors duration-300
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
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.0003 9.17981V4.37503C20.001 4.14531 19.9563 3.91771 19.8689 3.70529C19.7814 3.49287 19.6528 3.29981 19.4905 3.13721C19.3283 2.97461 19.1355 2.84566 18.9232 2.75776C18.711 2.66986 18.4835 2.62474 18.2537 2.625H13.4517C13.1368 2.62565 12.8349 2.75043 12.6115 2.97227L3.01128 12.5697C2.68386 12.8982 2.5 13.3431 2.5 13.8068C2.5 14.2706 2.68386 14.7155 3.01128 15.044L7.58167 19.6144C7.91003 19.9419 8.35486 20.1258 8.81861 20.1258C9.28237 20.1258 9.72719 19.9419 10.0555 19.6144L19.653 10.0201C19.8749 9.79665 19.9997 9.4947 20.0003 9.17981ZM16.2502 7.62509C16.003 7.62509 15.7613 7.55178 15.5557 7.41443C15.3502 7.27707 15.1899 7.08185 15.0953 6.85343C15.0007 6.62502 14.976 6.37368 15.0242 6.1312C15.0724 5.88872 15.1915 5.66599 15.3663 5.49117C15.5411 5.31635 15.7638 5.1973 16.0063 5.14907C16.2488 5.10083 16.5001 5.12559 16.7286 5.2202C16.957 5.31481 17.1522 5.47503 17.2896 5.6806C17.4269 5.88616 17.5002 6.12784 17.5002 6.37507C17.5002 6.7066 17.3685 7.02455 17.1341 7.25897C16.8997 7.49339 16.5817 7.62509 16.2502 7.62509Z" />
                    <path d="M21.8748 4.5C21.709 4.5 21.5501 4.56585 21.4328 4.68306C21.3156 4.80027 21.2498 4.95925 21.2498 5.12501V10.1005L11.0422 20.3085C10.9817 20.366 10.9333 20.4349 10.8999 20.5114C10.8665 20.5878 10.8488 20.6702 10.8477 20.7536C10.8466 20.837 10.8623 20.9198 10.8937 20.9971C10.9251 21.0744 10.9717 21.1446 11.0307 21.2036C11.0897 21.2626 11.1599 21.3091 11.2372 21.3406C11.3145 21.372 11.3973 21.3876 11.4807 21.3866C11.5641 21.3855 11.6464 21.3677 11.7229 21.3343C11.7993 21.3009 11.8683 21.2526 11.9258 21.1921L22.1604 10.9575C22.2692 10.8482 22.3553 10.7183 22.4136 10.5754C22.4718 10.4325 22.5011 10.2794 22.4998 10.1251V5.12501C22.4998 4.95925 22.434 4.80027 22.3167 4.68306C22.1995 4.56585 22.0406 4.5 21.8748 4.5Z" />
                  </svg>
                  Product Catalogs
                </button>
              </div>

              {/* <!-- Prev - Next button --> */}
              {/* <button
                className="absolute -left-[50px] top-[15px] p-[14px] bg-[#f5f5f5] rounded-full  z-11 block 2xl:hidden"
                onClick={() => handleActiveTab(activeTab - 1)}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
              <button
                className="absolute -right-[50px] top-[15px]  p-[14px] bg-[#f5f5f5] rounded-full block 2xl:hidden"
                onClick={() => handleActiveTab(activeTab + 1)}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button> */}
            </div>
          </div>

          {/* <!-- Tab Content --> */}
          <div className="mt-[30px] hidden md:block">
            {/* <!-- 1 --> */}

            {activeTab === 1 && (
              <div
                id="fourthTabContent1"
                ref={sectionRef}
                className="fourth-tab-content"
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-on-scroll animate-fade-up ">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Dashboards That Give{" "}
                      <br className="block lg:hidden min-[1600px]:block " /> You
                      Clarity
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Get a real-time overview of your key metrics. <br />
                      Track progress, spot trends, and make decisions faster.{" "}
                      <br /> Customize your dashboard to match your workflow.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up ">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#DBDBF9]  fourth-tab-image w-full h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up "
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct1-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full w-[320px] xl:w-fit -bottom-[5%] lg:-bottom-[15%] right-[2%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct1-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-0 right-[9%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct1-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[36%] right-[15%] animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 2 --> */}
            {activeTab === 2 && (
              <div
                id="fourthTabContent2"
                className="fourth-tab-content text-gray-700 text-base"
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Tables for <br /> Structured Work
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Organize your data in a familiar spreadsheet-style view.{" "}
                      <br />
                      Sort, filter, and manage information with precision.{" "}
                      <br />
                      Perfect for teams who love structure and detail.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#FFD1EA]  fourth-tab-image w-[100%] h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct2-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full w-[220px] xl:w-fit -bottom-[6%] lg:-bottom-[13%] right-[16%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct2-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[1%] right-[1%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct2-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-20 max-w-full w-[150px] xl:w-fit bottom-[20%] lg:bottom-[14%] right-[4%] animate-fade-up-12s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct2-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full -bottom-[1%] lg:-bottom-[6%] right-[9%] animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 3 --> */}
            {activeTab === 3 && (
              <div
                id="fourthTabContent3"
                className="fourth-tab-content text-gray-700 text-base"
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Kanban for <br /> Visual Progress
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Move tasks through stages with drag-and-drop ease. <br />{" "}
                      Ideal for workflows, pipelines, or creative processes.{" "}
                      <br /> See what’s moving, what’s stuck, and what’s next.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#E4F8D5]  fourth-tab-image w-[100%] h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct3-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full bottom-[12%] lg:bottom-[8%] right-[7%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct3-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[1%] right-[4%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct3-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full bottom-[15%] lg:-bottom-[1%] right-[10%] animate-fade-up-12s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct3-cd4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full lg:w-[150px] xl:w-fit -bottom-[5%] lg:-bottom-[18%] right-[35%] animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 4 --> */}
            {activeTab === 4 && (
              <div
                id="fourthTabContent4"
                className="fourth-tab-content text-gray-700 text-base"
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Cards for <br />
                      Quick Context
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      View tasks, files, and updates in a compact card format.{" "}
                      <br />
                      See everything at a glance without digging through
                      details. <br /> Great for flexible, fast-paced work
                      environments.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#FFF8D7]  fourth-tab-image w-full h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct4.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct4-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full  lg:w-[150px] 2xl:w-fit top-[20%] lg:top-[28%] right-[15%] lg:right-[5%] lg:right-[9%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct4-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[4%] right-[31%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct4-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full lg:w-[250px] xl:w-[300px] 2xl:w-fit -bottom-[8%] lg:-bottom-[12%] right-[8%]  animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 5 --> */}
            {activeTab === 5 && (
              <div
                id="fourthTabContent5"
                className="fourth-tab-content text-gray-700 text-base "
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Records That <br /> Stay Organized
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Maintain clean, detailed entries for anything — clients,
                      orders, or tasks.
                      <br />
                      Track history, status, and key information in one place.{" "}
                      <br /> Search and access any record instantly.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#CBE3EA]  fourth-tab-image w-[100%] h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct5.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct5-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full  lg:w-[250px] 2xl:w-fit -bottom-[5%] lg:-bottom-[15%] right-[8%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct5-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[6%] lg:top-[15%] right-[4%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct5-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full left-[30%] lg:left-[20%] bottom-[30%] animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 6 --> */}
            {activeTab === 6 && (
              <div
                id="fourthTabContent6"
                className="fourth-tab-content text-gray-700 text-base "
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between  mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Travel Log for <br /> Field Teams
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Track employee movements and client visits in real time.{" "}
                      <br /> Log locations, check-ins, and task updates on the
                      go. <br /> Perfect for sales, support, and service teams
                      in the field.
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#FFE6D1]  fourth-tab-image w-[100%] h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct6.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct6-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full lg:w-[150px] 2xl:w-fit -bottom-[5%] lg:-bottom-[12%] right-[7%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct6-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full -bottom-[5%] lg:-bottom-[17%] right-[35%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct6-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[20%] right-[10%] animate-fade-up-12s"
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
                </div>
              </div>
            )}

            {/* <!-- 7 --> */}
            {activeTab === 7 && (
              <div
                id="fourthTabContent7"
                className="fourth-tab-content text-gray-700 text-base "
              >
                <div className="flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between mt-[40px] 2xl:mt-0 px-[16px] 2xl:px-[76px] sm:pb-[20px]">
                  <div className="w-[90%] lg:w-[45%] text-center lg:text-left animate-fade-up">
                    <h2 className="text-[24px] sm:text-[32px] md:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[#24262B] leading-[120%] font-medium mb-[20px]">
                      Product Catalogs <br /> Made Simple
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#6e7178] mb-[24px]">
                      Display and manage your products or services in one place.
                      <br />
                      Add specs, pricing, images, and categories with ease.{" "}
                      <br /> Empower your team to work with accurate, up-to-date
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

                  <div className="w-[90%] lg:w-[50%] relative flex flex-col lg:fles-row items-center justify-center animate-on-scroll animate-fade-up">
                    <div className="relative pb-[10px] pt-[20px] rounded-[18px] bg-[#D1E0FF]  fourth-tab-image w-[100%] h-auto 2xl:h-[455px]">
                      <Image
                        src="/images/new-banners/anyview-section/rw-ct7.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="relative z-10 max-w-full -ml-[40px] 2xl:-ml-[70px] animate-fade-up"
                      />

                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct7-cd1.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full lg:w-[250px] 2xl:w-fit -bottom-[5%] lg:-bottom-[15%] -right-[1%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct7-cd2.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full top-[2%] right-[1%] lg:right-[6%] animate-fade-up-08s"
                      />
                      <Image
                        loading="lazy"
                        src="/images/new-banners/anyview-section/rw-ct7-cd3.png"
                        alt="banner"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        className="absolute z-10 max-w-full right-[30%] bottom-[5%] lg:-bottom-[6%] animate-fade-up-12s"
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
                </div>
              </div>
            )}
          </div>

          {/* <!-- responsive --> */}
          <div className="block md:hidden">
            <AccordionSection />
          </div>
        </div>
      </div>
    </>
  );
}
