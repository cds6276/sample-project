"use client";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <footer className="relative overflow-hidden">
        <div className="px-[22px] mx-auto custom-container pb-[40px] z-[9] relative">
          <div className="">
            <div>
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-5 lg:gap-7">
                <Link href={"/"} className="outline-0">
                  <Image
                    className="h-full w-full object-cover max-w-[75px] md:max-w-[90px]"
                    width={90}
                    height={0}
                    style={{ height: "auto" }}
                    src="/images/logo-dark.webp"
                    alt="logo"
                  />
                </Link>

                <div className="flex gap-2 justify-center lg:justify-start items-center flex-wrap lg:flex-nowrap">
                  <button type="button">
                    <Link
                      className="skey group flex gap-2 whitespace-nowrap items-center justify-center inline-block z-10 relative transition-all duration-200 border-2 border-[#3A86FF] hover:border-[#0077D5] group px-[16px] sm:px-[22px] py-[16px] leading-[100%] w-[230px] lg:w-auto font-medium hover:bg-[#fff] rounded-[8px] text-[14px] sm:text-[16px] text-[#3A86FF] hover:text-[#0077D5]"
                      href="demo"
                    >
                      {" "}
                      Schedule a Demo
                      <div className="">
                        <svg
                          className="w-[8px] fill-[#3A86FF] group-hover:fill-[#0077D5]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                        </svg>
                      </div>
                    </Link>
                  </button>
                  <button type="button">
                    <Link
                      className="skey flex gap-3 items-center justify-center inline-block z-10 relative transition-all duration-300 group px-[16px] sm:px-[22px] py-[18px] leading-[100%] w-[230px] lg:w-auto rounded-[8px] bg-[#3A86FF] text-[#fff] text-[14px] sm:text-[16px] font-medium hover:bg-[#0077D5] hover:text-white"
                      href="https://web.jugl.com/login"
                    >
                      Get Started
                      <div className="">
                        <svg
                          className="w-[12px] h-[12px] fill-[#fff]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </div>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-[1px] my-[30px]"></div>
          <div className="">
            {/* non responsive menu */}
            <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[20px]">
              <div className="">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[15px]">
                  Platform
                </h5>
                <ul>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="/why-we-built-jugl"
                    >
                      Why We Built Jugl
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="/integrations"
                    >
                      Integrations
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="/team-collaboration"
                    >
                      Team Collaboration
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="users-and-permissions"
                    >
                      Users and Permissions
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="trust-and-security"
                    >
                      Trust and Security
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="workflow-automation"
                    >
                      Workflow Automation
                    </Link>{" "}
                  </li>
                </ul>
                <br />
              </div>

              <div className="">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Supported Workflows
                </h5>
                <ul>
                  {/* <!-- <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="index">Industries</Link> </li> --> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="project-management"
                    >
                      Project Management
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="sales-crm"
                    >
                      Sales CRM
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="field-work-management"
                    >
                      Field Work Management
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="asset-management"
                    >
                      Asset Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="order-management"
                    >
                      Order Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="product-management"
                    >
                      Product Management
                    </Link>{" "}
                  </li> */}

                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="human-resources-recruiting"
                    >
                      Human Resources & Recruiting
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="governance-risk-compliance"
                    >
                      Governance, Risk & Compliance
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="customer-success"
                    >
                      Customer Success
                    </Link>{" "}
                  </li> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="construction"
                    >
                      Construction
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="okr"
                    >
                      OKR
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="colleges-universities"
                    >
                      Colleges & Universities
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="student-project-management"
                    >
                      Student Project Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="real-estate"
                    >
                      Real Estate
                    </Link>{" "}
                  </li> */}
                </ul>
              </div>

              <div className="ps-0 lg:ps-[30px]">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  <br />
                </h5>

                <ul>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="business-strategy"
                    >
                      Business Strategy
                    </Link>{" "}
                  </li> */}

                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="business-operations"
                    >
                      Business Operations
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="legal-operations"
                    >
                      Legal Operation
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="banks-credit-unions"
                    >
                      Banks / Credit Unions
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="venture-capital"
                    >
                      Venture Capital
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="personal-productivity"
                    >
                      Personal Productivity
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="professional-service"
                    >
                      Professional Services
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="security-operations"
                    >
                      Security Operations
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="it-service-management"
                    >
                      IT Service Management
                    </Link>{" "}
                  </li> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Finance & Accounting
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Procurement
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Business Continuity Planning
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Nonprofit
                    </Link>{" "}
                  </li> */}
                </ul>
              </div>

              {/* Quick Links Desktop */}
              <div className="hidden sm:block ps-0 lg:ps-[30px]">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[15px]">
                  Quick links
                </h5>
                <ul>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="pricing"
                    >
                      Pricing
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="demo"
                    >
                      Schedule a demo
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      App store
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Support
                    </Link>{" "}
                  </li>
                  {/* <!-- <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="smart-whatsApp-integration">Smart WhatsApp Integration</Link> </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="#"
                      >
                        AI-Powered Intelligent Automation
                      </Link>{" "}
                    </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="jugl-api-integration">Jugl API Integration</Link> </li> --> */}
                </ul>
              </div>

              {/* <div className="">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  <br />
                </h5>
                <ul>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Event Planning
                    </Link>{" "}
                  </li>

                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Restaurants & Food Service
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Facility Management
                    </Link>{" "}
                  </li>

                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Teachers
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Clubs & Associations
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Churches
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Political Campaigns
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Logistics
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Freelance Management
                    </Link>{" "}
                  </li>
                </ul>
              </div> */}

              <div className="ps-0 lg:ps-[30px]">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Company
                </h5>
                <ul>
                  {/* <!-- <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="index">Industries</Link> </li> --> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="about"
                    >
                      About Us
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="blog"
                    >
                      Blog
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="news"
                    >
                      News
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="careers"
                    >
                      Careers
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="contact"
                    >
                      Contact
                    </Link>{" "}
                  </li>
                </ul>
                <br />
              </div>

              <div className="hidden lg:block">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Download Now
                </h5>
                <div className="flex lg:flex-wrap xl:flex-nowrap gap-2">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.jugl&pcampaignid=web_share"
                    target="_blank"
                    className="p-[12px] 2xl:p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                  >
                    <Image
                      src="/images/android.svg"
                      alt="google-store"
                      width={103}
                      height={24}
                      className="w-[103px] h-[24px]"
                    />
                  </Link>
                  <Link
                    href="https://apps.apple.com/id/app/jugl/id1571640105"
                    target="_blank"
                    className="p-[12px] 2xl:p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                  >
                    <Image
                      src="/images/app-store.svg"
                      alt="google-store"
                      className="w-[103px] h-[24px]"
                      width={103}
                      height={24}
                    />
                  </Link>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  {/* <!-- <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">Certifications</h5> --> */}
                  <div className="flex  flex-wrap justify-center shrink-0 items-center gap-[18px] mt-[30px] 2xl:mt-[40px] max-w-[190px]">
                    <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                      <Image
                        loading="lazy"
                        src="/images/certifications/AICPA.png"
                        className="w-[85px]"
                        width={85}
                        height={0}
                        style={{ height: "auto" }}
                        alt="banner"
                      />
                    </div>
                    <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                      <Image
                        loading="lazy"
                        src="/images/certifications/SOC2-2.png"
                        className="h-[85px]"
                        width={0}
                        height={85}
                        style={{ width: "auto" }}
                        alt="banner"
                      />
                    </div>
                    <div>
                      <Image
                        loading="lazy"
                        src="/images/certifications/Met-Business-Partners.png"
                        alt="Ceritificate"
                        className="w-[150px]"
                        width={150}
                        height={0}
                        style={{ height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Download Now */}
              <div className="block lg:hidden">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Download Now
                </h5>
                <div className="flex flex-wrap sm:flex-nowrap gap-2">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.jugl&pcampaignid=web_share"
                    target="_blank"
                    className="p-[12px] xl:p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                  >
                    <Image
                      src="/images/android.svg"
                      alt="google-store"
                      className="w-[103px] h-[24px]"
                      width={103}
                      height={24}
                    />
                  </Link>
                  <Link
                    href="https://apps.apple.com/id/app/jugl/id1571640105"
                    target="_blank"
                    className="p-[12px] xl:p-[16px] rounded-[16px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                  >
                    <Image
                      src="/images/app-store.svg"
                      alt="google-store"
                      className="w-[103px] h-[24px]"
                      width={103}
                      height={24}
                    />
                  </Link>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  {/* <!-- <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">Certifications</h5> --> */}
                  <div className="flex  flex-wrap  justify-center shrink-0 items-center gap-[20px] mt-[30px] max-w-[190px]">
                    <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                      <Image
                        loading="lazy"
                        src="/images/certifications/AICPA.png"
                        className="w-[85px]"
                        width={85}
                        height={0}
                        style={{ height: "auto" }}
                        alt="banner"
                      />
                    </div>
                    <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                      <Image
                        loading="lazy"
                        src="/images/certifications/SOC2-2.png"
                        className="h-[85px]"
                        width={0}
                        height={85}
                        style={{ width: "auto" }}
                        alt="banner"
                      />
                    </div>
                    <div>
                      <Image
                        loading="lazy"
                        src="/images/certifications/Met-Business-Partners.png"
                        alt="Ceritificate"
                        width={150}
                        height={0}
                        style={{ height: "auto" }}
                        className="w-[150px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================responsive menu============== */}
            <div className="grid sm:hidden min-[400px]:grid-cols-2 min-[400px]:gap-[20px]">
              {/* platform */}
              <div className="">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[15px]">
                  Platform
                </h5>
                <ul>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="/why-we-built-jugl"
                    >
                      Why We Built Jugl
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Integrations
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Team Collaboration
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="business-operation-management"
                    >
                      Users and Permissions
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="support-ticket-management"
                    >
                      Trust and Security
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="internal-collaboration-management"
                    >
                      Workflow Automation
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              {/* quick links */}
              <div className="block sm:hidden">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[15px]">
                  Quick links
                </h5>
                <ul>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Pricing
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="demo"
                    >
                      Schedule a demo
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      App store
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Support
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      AI-Powered Intelligent Automation
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              {/* solutions menu */}
              <div className="">
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Supported Workflows
                </h5>
                <ul>
                  {/* <!-- <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="index">Industries</Link> </li> --> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="project-management"
                    >
                      Project Management
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="sales-crm"
                    >
                      Sales CRM
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="field-work-management"
                    >
                      Field Work Management
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="asset-management"
                    >
                      Asset Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="order-management"
                    >
                      Order Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="product-management"
                    >
                      Product Management
                    </Link>{" "}
                  </li> */}

                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="human-resources-recruiting"
                    >
                      Human Resources & Recruiting
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="governance-risk-compliance"
                    >
                      Governance, Risk & Compliance
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="customer-success"
                    >
                      Customer Success
                    </Link>{" "}
                  </li> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="construction"
                    >
                      Construction
                    </Link>{" "}
                  </li>
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="colleges-universities"
                    >
                      Colleges & Universities
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="student-project-management"
                    >
                      Student Project Management
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="real-estate"
                    >
                      Real Estate
                    </Link>{" "}
                  </li> */}
                  {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="business-strategy"
                    >
                      Business Strategy
                    </Link>{" "}
                  </li> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="okr"
                    >
                      OKR
                    </Link>{" "}
                  </li>
                </ul>
                <div className="">
                  <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px] hidden min-[400px]:block">
                    <br />
                  </h5>
                  <ul>
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="business-operations"
                      >
                        Business Operations
                      </Link>{" "}
                    </li>
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="legal-operations"
                      >
                        Legal Operation
                      </Link>{" "}
                    </li>
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="banks-credit-unions"
                      >
                        Banks / Credit Unions
                      </Link>{" "}
                    </li>
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="venture-capital"
                      >
                        Venture Capital
                      </Link>{" "}
                    </li>
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="personal-productivity"
                    >
                      Personal Productivity
                    </Link>{" "}
                  </li> */}
                    {/* <li className="min-[400px]:mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="professional-service"
                    >
                      Professional Services
                    </Link>{" "}
                  </li> */}

                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="security-operations"
                    >
                      Security Operations
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="it-service-management"
                    >
                      IT Service Management
                    </Link>{" "}
                  </li> */}
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="#"
                      >
                        Finance & Accounting
                      </Link>{" "}
                    </li>
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Business Continuity Planning
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Nonprofit
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Event Planning
                    </Link>{" "}
                  </li> */}
                  </ul>

                  <ul className="block sm:hidden">
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Restaurants & Food Service
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Facility Management
                    </Link>{" "}
                  </li> */}
                    <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                      {" "}
                      <Link
                        className="transition-all duration-200 hover:text-[#2c99f2]"
                        href="#"
                      >
                        Procurement
                      </Link>{" "}
                    </li>
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Teachers
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Clubs & Associations
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Churches
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Political Campaigns
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Logistics
                    </Link>{" "}
                  </li> */}
                    {/* <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="#"
                    >
                      Freelance Management
                    </Link>{" "}
                  </li> */}
                  </ul>
                </div>
              </div>

              {/* company */}
              <div>
                <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                  Company
                </h5>
                <ul>
                  {/* <!-- <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]"> <Link className="transition-all duration-200 hover:text-[#2c99f2]" href="index">Industries</Link> </li> --> */}
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="about"
                    >
                      About Us
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="blog"
                    >
                      Blog
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="news"
                    >
                      News
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="careers"
                    >
                      Careers
                    </Link>{" "}
                  </li>
                  <li className="mb-[22px] font-regular text-gray-500 leading-[135%] text-[14px]">
                    {" "}
                    <Link
                      className="transition-all duration-200 hover:text-[#2c99f2]"
                      href="contact"
                    >
                      Contact
                    </Link>{" "}
                  </li>
                </ul>
                {/* download sec  */}
                <div className=" ">
                  <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]"></h5>
                  <br className="block min-[200px]:hidden" />
                  <br className="block min-[200px]:hidden" />
                  <div>
                    <h5 className="text-heading-5 font-semibold text-[#0b3858] mb-5 text-[16px]">
                      Download Now
                    </h5>
                    <div className="flex flex-wrap items-center sm:justify-center gap-2">
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.jugl&pcampaignid=web_share"
                        target="_blank"
                        className="p-[10px] rounded-[12px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                      >
                        <Image
                          src="/images/android.svg"
                          alt="google-store"
                          className="w-[103px] h-[24px]"
                          width={103}
                          height={24}
                        />
                      </Link>
                      <Link
                        href="https://apps.apple.com/id/app/jugl/id1571640105"
                        target="_blank"
                        className="p-[10px] rounded-[12px] border-2 border-[#E5E7EB] hover:bg-[#F3F4F6] duration-300"
                      >
                        <Image
                          src="/images/app-store.svg"
                          alt="google-store"
                          className="w-[103px] h-[24px]"
                          width={103}
                          height={24}
                        />
                      </Link>
                    </div>
                    <div className=" col-span-2 md:col-span-2 lg:col-span-1">
                      <div className="flex  flex-wrap justify-center  shrink-0 items-center gap-[12px] mt-[30px] max-w-[190px]">
                        <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                          <Image
                            loading="lazy"
                            src="/images/certifications/AICPA.png"
                            className="w-[85px]"
                            alt="banner"
                            width={85}
                            height={0}
                            style={{ height: "auto" }}
                          />
                        </div>
                        <div className="mb-2 md:mb-0 lg:mb-0 xl:mb-0">
                          <Image
                            loading="lazy"
                            src="/images/certifications/SOC2-2.png"
                            className="h-[85px]"
                            width={0}
                            height={85}
                            style={{ width: "auto" }}
                            alt="banner"
                          />
                        </div>
                        <div>
                          <Image
                            loading="lazy"
                            src="/images/certifications/Met-Business-Partners.png"
                            alt="Ceritificate"
                            className="w-[150px]"
                            width={150}
                            height={0}
                            style={{ height: "auto" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#EEFAFF]">
          <div className="px-[22px] md:px-[16px] py-[20px] xxl:px-0 mx-auto  custom-container">
            <div className="flex  flex-row flex-wrap sm:flex-nowrap gap-5 items-center justify-center sm:justify-between">
              <ul className="flex   flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
                <li className="font-regular text-gray-500 leading-[135%] text-[14px]">
                  {" "}
                  <Link
                    className="transition-all duration-200 text-[#1D2B36] hover:text-[#2c99f2]"
                    href="terms-of-service"
                  >
                    Terms of Service
                  </Link>{" "}
                </li>
                <li>
                  <div className="h-[18px] w-[1px] bg-[#1D1D1D]"></div>
                </li>
                <li className="font-regular text-gray-500 leading-[135%] text-[14px]">
                  {" "}
                  <Link
                    className="transition-all duration-200 text-[#1D2B36] hover:text-[#2c99f2]"
                    href="privacy-policy"
                  >
                    Privacy Policy
                  </Link>{" "}
                </li>
              </ul>
              <div className="flex  flex-row flex-wrap sm:flex-nowrap  justify-center items-center gap-5 sm:gap-5">
                <p className="font-regular text-gray-500 text-[14px] text-[#1D2B36]">
                  {" "}
                  ©2025 Jugl, All Rights Reserved{" "}
                </p>
                <div className="flex  flex-row  items-center gap-5 sm:gap-5">
                  <Link href="">
                    <svg
                      className="fill-#405261] w-[18px]"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1905 0.301758H16.9047L10.9749 7.07916L17.9509 16.3018H12.4887L8.2106 10.7084L3.31541 16.3018H0.59954L6.94208 9.05256L0.25 0.301758H5.85079L9.7179 5.41438L14.1905 0.301758ZM13.2379 14.6772H14.7419L5.03356 1.84104H3.41961L13.2379 14.6772Z"
                        fill="#405261"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="https://www.linkedin.com/company/juglapp/"
                    target="_blank"
                  >
                    <svg
                      className="fill-#405261] w-[18px]"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.44141 0.301758H16.4414C17.546 0.30  1758 18.4414 1.19719 18.4414 2.30176V16.3018C18.4414 17.4064 17.546 18.3018 16.4414 18.3018H2.44141C1.33684 18.3018 0.441406 17.4064 0.441406 16.3018V2.30176C0.441406 1.19719 1.33684 0.301758 2.44141 0.301758ZM5.44141 15.3018C5.71755 15.3018 5.94141 15.0779 5.94141 14.8018V7.80176C5.94141 7.52566 5.71755 7.30176 5.44141 7.30176H3.94141C3.66527 7.30176 3.44141 7.52566 3.44141 7.80176V14.8018C3.44141 15.0779 3.66527 15.3018 3.94141 15.3018H5.44141ZM4.69141 6.30176C3.86298 6.30176 3.19141 5.63019 3.19141 4.80176C3.19141 3.97333 3.86298 3.30176 4.69141 3.30176C5.51984 3.30176 6.19141 3.97333 6.19141 4.80176C6.19141 5.63019 5.51984 6.30176 4.69141 6.30176ZM14.9414 15.3018C15.2175 15.3018 15.4414 15.0779 15.4414 14.8018V10.2018C15.4739 8.61256 14.299 7.25628 12.7214 7.06176C11.6184 6.96101 10.5497 7.47616 9.94141 8.40176V7.80176C9.94141 7.52566 9.71751 7.30176 9.44141 7.30176H7.94141C7.66531 7.30176 7.44141 7.52566 7.44141 7.80176V14.8018C7.44141 15.0779 7.66531 15.3018 7.94141 15.3018H9.44141C9.71751 15.3018 9.94141 15.0779 9.94141 14.8018V11.0518C9.94141 10.2234 10.613 9.55176 11.4414 9.55176C12.2698 9.55176 12.9414 10.2234 12.9414 11.0518V14.8018C12.9414 15.0779 13.1653 15.3018 13.4414 15.3018H14.9414Z"
                        fill="#405261"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="https://www.instagram.com/jugl.life.app/"
                    target="_blank"
                  >
                    <svg
                      className="fill-#405261] w-[18px]"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.628906 5.55213C0.628906 2.65188 2.97903 0.301758 5.87928 0.301758H13.3785C16.2788 0.301758 18.6289 2.65188 18.6289 5.55213V13.0514C18.6289 15.9517 16.2788 18.3018 13.3785 18.3018H5.87928C2.97903 18.3018 0.628906 15.9517 0.628906 13.0514V5.55213ZM13.3785 4.05139C13.3662 4.59589 13.6497 5.10326 14.1188 5.37888C14.5879 5.65451 15.1684 5.65451 15.6375 5.37888C16.1066 5.10438 16.3902 4.59589 16.3778 4.05251C16.3598 3.23689 15.6938 2.58551 14.8793 2.58551C14.0636 2.58551 13.3977 3.23689 13.3785 4.05139ZM5.87928 9.30176C5.87928 11.3729 7.55891 13.0526 9.63001 13.0514C11.7012 13.0514 13.3796 11.3718 13.3796 9.30066C13.3796 7.22951 11.7 5.55101 9.62891 5.55101C7.55778 5.55101 5.87816 7.23063 5.87928 9.30176Z"
                        fill="#405261"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="https://www.facebook.com/JuglApp/"
                    target="_blank"
                  >
                    <svg
                      className="fill-#405261] w-[12px]"
                      viewBox="0 0 10 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.52624 3.54211H6.64624C6.11603 3.54211 5.68624 3.97192 5.68624 4.50211V7.38211H9.52624C9.63539 7.37969 9.73898 7.43049 9.80387 7.51833C9.86877 7.60617 9.88701 7.72003 9.85264 7.82371L9.14224 9.93571C9.07677 10.1295 8.89562 10.2606 8.69104 10.2621H5.68624V17.4621C5.68624 17.7272 5.4713 17.9421 5.20624 17.9421H2.80624C2.54118 17.9421 2.32625 17.7272 2.32625 17.4621V10.2621H0.88625C0.621156 10.2621 0.40625 10.0472 0.40625 9.78211V7.86211C0.40625 7.59705 0.621156 7.38211 0.88625 7.38211H2.32625V4.50211C2.32625 2.38133 4.0455 0.662109 6.16624 0.662109H9.52624C9.7913 0.662109 10.0062 0.877015 10.0062 1.14211V3.06211C10.0062 3.3272 9.7913 3.54211 9.52624 3.54211Z"
                        fill="#405261"
                      />
                    </svg>
                  </Link>

                  <Link href="https://www.youtube.com/@juglapp" target="_blank">
                    <svg
                      className="fill-#405261] w-[18px]"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5527 3.26207C20.3614 2.20644 19.4502 1.43769 18.3927 1.19769C16.8102 0.862071 13.8814 0.62207 10.7127 0.62207C7.54579 0.62207 4.57016 0.862071 2.98579 1.19769C1.93016 1.43769 1.01704 2.15769 0.825786 3.26207C0.632656 4.46207 0.441406 6.14207 0.441406 8.3021C0.441406 10.4621 0.632656 12.1421 0.872656 13.3421C1.06579 14.3977 1.97704 15.1664 3.03266 15.4064C4.71266 15.7421 7.59266 15.9821 10.7614 15.9821C13.9302 15.9821 16.8102 15.7421 18.4902 15.4064C19.5458 15.1664 20.457 14.4464 20.6502 13.3421C20.8414 12.1421 21.0814 10.4133 21.1302 8.3021C21.0327 6.14207 20.7927 4.46207 20.5527 3.26207ZM8.12141 11.6621V4.94207L13.977 8.3021L8.12141 11.6621Z"
                        fill="#405261"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
