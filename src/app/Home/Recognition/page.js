"use client";
import Image from "next/image";

export default function Recognition() {
  return (
    <>
      {/* Industry’s  section starts  - 2nd section  */}
      <div className="px-[22px] mx-auto custom-container py-[30px] sm:py-[40px] lg:py-[50px]">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[30px] md:gap-[60px] lg:px-0 2xl:mx-[100px]">
          <div className="w-full text-center md:text-start md:w-[90%] lg:w-[48%]">
            <h3 className="font-medium text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] leading-[130%] mb-[16px] lg:mb-[20px] text-[#24262b]">
              Recognized by the Industry&apos;s{" "}
              <br className="hidden sm:block lg:hidden" /> Leading Analysts
            </h3>
            <p className="lg:max-w-[600px] md:text-[18px] text-[16px] text-[#6e7178] leading-[150%] block">
              Jugl has earned the attention and recognition of top industry
              analysts for its innovative approach to workflow automation, team
              collaboration, and business process management. Our platform’s
              flexibility, deep feature set, and commitment to solving
              real-world business challenges have positioned Jugl as a trusted
              solution for organizations of all sizes.
            </p>
          </div>
          <div className="w-full md:w-[70%] lg:w-[50%] xl:w-[40%] grid  grid-cols-2 gap-[16px]">
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-1.png"
                alt="logo"
                className="w-[170px]"
                width={170}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-2.png"
                alt="logo"
                className="w-[140px]"
                width={140}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-3.png"
                alt="logo"
                className="w-[180px]"
                width={180}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-4.png"
                alt="logo"
                className="w-[140px]"
                width={140}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-5.png"
                alt="logo"
                className="w-[170px]"
                width={170}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-[#F2F7FF] px-[14px] sm:px-[36px] py-[16px] sm:py-[26px] rounded-[10px]">
              <Image
                src="/images/new-banners/industries/industry-6.png"
                alt="logo"
                className="w-[80px] sm:w-[100px]"
                width={80}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Industry’s  section ends   */}
    </>
  );
}
