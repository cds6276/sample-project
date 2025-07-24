"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Tooltip from "@/app/hooks/page";

export default function Header() {
  const [ismenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const location = usePathname();

  const currentPath = location.split("/").filter(Boolean).pop();
  const baseClasses = "";

  const getLinkClasses = (href) => {
    const isActive = href === currentPath;

    if (isActive) {
      switch (href) {
        case "team-collaboration":
          return `text-[#2193F3]`;
        case "integrations":
          return `text-[#2193F3]`;
        case "trust-and-security":
          return `text-[#2193F3]`;
        case "users-and-permissions":
          return `text-[#2193F3]`;
        case "workflow-automation":
          return `text-[#2193F3]`;
        case "why-we-built-jugl":
          return `text-[#2193F3]`;
        case "project-management":
          return `text-[#2193F3]`;

        default:
          return `text-[#24262B]`;
      }
    }

    return baseClasses;
  };

  const platformRoutes = [
    "team-collaboration",
    "integrations",
    "trust-and-security",
    "users-and-permissions",
    "workflow-automation",
    "why-we-built-jugl",
  ].includes(currentPath);

  const platformRoutesStateClass = platformRoutes
    ? "text-[#2193F3] fill-[#2193F3]"
    : "text-[#24262B]";

  const solutionRoutes = [
    "sales-crm",
    "field-work-management",
    "asset-management",
    "project-management",
    "order-management",
    "product-management",
    "human-resources-recruiting",
    "governance-risk-compliance",
    "customer-success",
    "construction",
    "colleges-universities",
    "student-project-management",
    "real-estate",
    "business-strategy",
    "okr",
    "business-operations",
    "legal-operations",
    "banks-credit-unions",
    "venture-capital",
    "personal-productivity",
    "professional-service",
    "security-operations",
  ].includes(currentPath);

  const solutionRoutesStateClass = solutionRoutes
    ? "text-[#2193F3] fill-[#2193F3]"
    : "text-[#24262B]";

  const featuresRoutes = [
    "activity-history",
    "available-status",
    "calendar-view",
    "card-view",
    "chart-view",
  ];

  const resourcesRoutes = ["blog", "news", "getting-started"];

  const resourcesRoutesStateClass = resourcesRoutes.includes(currentPath)
    ? "text-[#2193F3] fill-[#2193F3]"
    : "text-[#24262B]";

  const companyRoutes = ["about", "careers"];

  const companyRoutesStateClass = companyRoutes.includes(currentPath)
    ? "text-[#2193F3] fill-[#2193F3]"
    : "text-[#24262B]";

  // Toggle the visibility of the menu
  const toggleMenu = (menuIndex) => {
    setOpenMenu(openMenu === menuIndex ? null : menuIndex); // Toggle visibility
    // paste scroll
  };

  // Responsive Area==================================================
  const toggleMobileMenu = useCallback((menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  }, []);

  const handleNavigate = (path) => {
    navigate.push(path);
    setActiveMenu(null);
    handleMenuClose?.();
  };

  // Responsive Area Ends==================================================

  // Close the menu when clicking outside of it
  const handleClickOutside = (e) => {
    if (!e.target.closest(".menu-link")) {
      setOpenMenu(null); // Close all menus if clicked outside
    }
  };

  // Add event listener for clicks outside the menu
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > 230 && currentScrollY < lastScrollY) {
        // Scrolling up
        header.classList.add("sticky-header");
      } else {
        // Scrolling down or above 230
        header.classList.remove("sticky-header");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const adMenuHandles = document.querySelectorAll("#ad-menu-handle");

    adMenuHandles.forEach((handle) => {
      // handle.style.top = "117px";

      handle.addEventListener("mouseenter", () => {
        document.documentElement.style.scrollbarGutter = "stable"; // ← Reserve space
        document.body.style.overflow = "hidden";
      });

      handle.addEventListener("mouseleave", () => {
        document.body.style.overflow = "auto";
        document.documentElement.style.scrollbarGutter = "auto"; // ← Reset
      });
    });
  }, []);
  return (
    <div className="relative">
      <header className="h-auto w-full relative py-[15px] first-letter:lg:py-[26px] !border-b !border-[#E8E8E8] ">
        {ismenuOpen && (
          <div className="mob-menu">
            <div className="overlay"></div>
            <nav className="fixed top-0 right-0 bg-white flex flex-col h-screen nav-shadow overflow-y-auto nav-mobile transition-all duration-200 w-full z-[99999]">
              <div className="px-[22px] py-[15px] h-full w-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <Link className="flex" href="">
                    <Image
                      className="logo z-50 w-[60px] max-h-[42px] md:w-[88px]"
                      width={88}
                      height={42}
                      src="/images/logo-dark.webp"
                      alt="logo"
                    />
                  </Link>
                  <button onClick={handleMenuClose} className="flex z-99">
                    <svg
                      className="w-[18px] h-[18px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </button>
                </div>
                <ul className=" font-medium text-[16px] leading-[16px] mt-5 menu-mobile-home">
                  <li
                    className="group menu-mobile-item py-[20px] duration-200 "
                    onClick={() => toggleMobileMenu("platform")}
                  >
                    <div className="flex gap-2 cursor-pointer items-center justify-between transition-all duration-200 group-hover:text-[#359cf0] ">
                      <p
                        className={`menu-mobile-active-1 ${platformRoutesStateClass}`}
                      >
                        Platform
                      </p>

                      <span>
                        {activeMenu === "platform" ? (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] rotate-0 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] -rotate-90 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    {activeMenu === "platform" && (
                      <ul className="menu-child bg-white z-50 transition-all duration-200  ">
                        <div className="mx-auto max-w-[1440px] xl:max-w-[1632px]">
                          <div className="lg:grid grid-cols-3 relative mt-[24px] border-t border-[#ddd]">
                            <div className="lg:col-span-2 sm:pr-[12px] md:pr-[26px]  pb-0 pt-[24px]  ">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                                    stroke="#484848"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <h6 className="text-[14px]">
                                  PLATFORM OVERVIEW
                                </h6>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2  gap-[8px] max-h-[370px] sm:max-h-[auto] overflow-y-auto">
                                {/* <!-- 1 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("why-we-built-jugl")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/1.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("why-we-built-jugl")}
                                      `}
                                      >
                                        Why We Built Jugl
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Inspired by 1,000+ business owners to
                                        simplify <br /> modern work management.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 2 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("users-and-permissions")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/2.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                        ${getLinkClasses(
                                          "users-and-permissions"
                                        )}
                                      `}
                                      >
                                        Users and Permissions
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Ensure the right people have the right{" "}
                                        <br />
                                        access
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 3 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() => handleNavigate("integrations")}
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/3.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("integrations")}
                                      `}
                                      >
                                        Integrations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Bring together everything your team
                                        needs to communicate, collaborate, and
                                        coordinate
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 4 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("trust-and-security")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/4.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("trust-and-security")}
                                      `}
                                      >
                                        Trust and Security
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        A security by design approach to
                                        protecting <br />
                                        your data
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 5 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("team-collaboration")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/5.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("team-collaboration")}
                                      `}
                                      >
                                        Team Collaboration
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Build a company culture through
                                        authentic digital connections between
                                        employees and{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 6 --> */}
                                <div
                                  className="relative overflow-hidden group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("workflow-automation")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="shrink-0">
                                      <Image
                                        height={64}
                                        width={102}
                                        className="w-[102px] h-[64px]"
                                        src="/images/megamenu/6.png"
                                        alt="icon"
                                      />
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("workflow-automation")}
                                      `}
                                      >
                                        Workflow Automation
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Extend the power of our workflows of{" "}
                                        <br />
                                        automations
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="hidden lg:block bg-[#F8F9FA] pr-[16px] pb-[16px] pl-[16px] pt-[24px]">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                                    fill="#484848"
                                  />
                                </svg>
                                <h6 className="text-[14px]">Whats New</h6>
                              </div>

                              <div className="p-[12px]">
                                <Image
                                  src="/images/megamenu/banner.jpg"
                                  alt="banner"
                                  height={0}
                                  width={350}
                                  style={{ height: "auto" }}
                                  className="max-w-[100%] w-[350px] rounded-[20px] border border-[#E5E7EB]"
                                />
                                <h6 className="text-[16px] font-medium mt-[20px]">
                                  Overview of latest features!
                                </h6>
                                <a
                                  className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-[10px]"
                                  href="#"
                                >
                                  {" "}
                                  Start Free Trail
                                  <svg
                                    className="w-[12px] fill-[#359cf0]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    )}
                  </li>
                  <li
                    className="group menu-mobile-item py-[20px] "
                    onClick={() => toggleMobileMenu("solutions")}
                  >
                    <div className="flex gap-2 cursor-pointer items-center justify-between transition-all duration-200 group-hover:text-[#359cf0] ">
                      <p
                        className={`menu-mobile-active-1 ${solutionRoutesStateClass}`}
                      >
                        Solutions
                      </p>
                      <span>
                        {activeMenu === "solutions" ? (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] rotate-0 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] -rotate-90 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    {activeMenu === "solutions" && (
                      <ul className="menu-child bg-white z-50 transition-all duration-200  ">
                        <div className="mx-auto max-w-[1440px] xl:max-w-[1632px]">
                          <div className="lg:grid md:grid-cols-3 relative mt-[24px] border-t border-[#ddd]">
                            <div className="lg:col-span-2 sm:pr-[12px] md:pr-[26px]  pb-0 pt-[24px]   min-h-[380px]">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                                    stroke="#484848"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <h6 className="text-[14px] uppercase">
                                  Explore by category
                                </h6>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] max-h-[370px] pr-[10px] sm:px-[10px] pb-[14px] overflow-y-auto">
                                {/* <!-- 3 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("field-work-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#9e97ee]
        rounded-full shrink-0 duration-300 ${
          currentPath === "field-work-management"
            ? "bg-[#9e97ee]"
            : "bg-[#7156DC2E]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "field-work-management"
              ? "fill-[#fff]"
              : "fill-[#9e97ee]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_3567_128794)">
                                          <path d="M17.9792 13.0244C16.8602 11.9084 15.1662 11.7064 13.8392 12.4174L9.00722 7.5854V4.4994C9.00722 3.4864 8.46222 2.5434 7.58522 2.0374L4.60422 0.3184C3.67322 -0.2196 2.49222 -0.0626001 1.73022 0.6974L0.705223 1.7244C-0.0557774 2.4834 -0.210777 3.6654 0.326223 4.5964L2.04522 7.5774C2.55122 8.4554 3.49522 9.0004 4.50722 9.0004H7.59322L12.4192 13.8264C12.1412 14.3344 11.9932 14.9054 11.9932 15.5004C11.9932 16.4364 12.3582 17.3144 13.0212 17.9764L18.0352 22.9764C18.6932 23.6324 19.5892 24.0004 20.5152 24.0004C21.5002 24.0004 22.6032 23.4794 23.2332 22.7114C24.3592 21.3394 24.2092 19.2364 22.8922 17.9244L17.9792 13.0244ZM3.77722 6.5794L2.05822 3.5974C1.97222 3.4494 1.99722 3.2604 2.11922 3.1384L3.14422 2.1124C3.26622 1.9914 3.45522 1.9654 3.60422 2.0514L6.58422 3.7714C6.84422 3.9214 7.00622 4.2014 7.00622 4.5004V7.0004H4.50622C4.20622 7.0004 3.92722 6.8394 3.77722 6.5794ZM21.6872 21.4424C21.4112 21.7794 21.0212 21.9764 20.5902 21.9984C20.1692 22.0184 19.7492 21.8594 19.4482 21.5604L14.4342 16.5604C14.1502 16.2774 13.9942 15.9014 13.9942 15.5004C13.9942 15.0994 14.1512 14.7244 14.4342 14.4404C14.7282 14.1474 15.1152 14.0004 15.5012 14.0004C15.8872 14.0004 16.2732 14.1474 16.5672 14.4404L21.4812 19.3394C22.0772 19.9344 22.1672 20.8574 21.6872 21.4424ZM10.4372 17.0994C10.8272 17.4914 10.8262 18.1234 10.4352 18.5134L5.95822 22.9754C5.30022 23.6314 4.40522 23.9994 3.47822 23.9994C2.59722 23.9994 1.39022 23.4784 0.760223 22.7094C-0.364777 21.3384 -0.215777 19.2354 1.10222 17.9234L6.77022 12.2684C7.16022 11.8784 7.79422 11.8784 8.18422 12.2704C8.57422 12.6614 8.57322 13.2944 8.18222 13.6844L2.51322 19.3394C1.91722 19.9344 1.82522 20.8574 2.30522 21.4414C2.58222 21.7794 2.97222 21.9764 3.40322 21.9984C3.82922 22.0174 4.24422 21.8594 4.54522 21.5604L9.02322 17.0984C9.41422 16.7084 10.0462 16.7084 10.4382 17.1004L10.4372 17.0994ZM9.89322 4.6344C10.8132 2.2914 12.9172 0.5604 15.3842 0.1174C16.2472 -0.0366001 17.1142 -0.0396001 17.9632 0.1114C18.6292 0.2294 19.1662 0.6994 19.3652 1.3354C19.5942 2.0644 19.3652 2.8664 18.7532 3.4804L16.4182 5.7224C15.9332 6.2074 15.8542 6.9834 16.2532 7.4714C16.4832 7.7524 16.8062 7.9164 17.1642 7.9354C17.5132 7.9524 17.8582 7.8234 18.1112 7.5704L20.7252 5.0494C21.2112 4.5634 21.9382 4.3824 22.6182 4.5994C23.2822 4.8084 23.7692 5.3614 23.8902 6.0404C24.0402 6.8884 24.0382 7.7574 23.8842 8.6214C23.6032 10.1934 22.7842 11.6574 21.5782 12.7444C21.3872 12.9164 21.1472 13.0014 20.9092 13.0014C20.6362 13.0014 20.3632 12.8904 20.1662 12.6714C19.7962 12.2614 19.8292 11.6284 20.2392 11.2584C21.1162 10.4684 21.7112 9.4064 21.9152 8.2704C22.0132 7.7224 22.0272 7.1754 21.9582 6.6384L19.5132 8.9974C18.8782 9.6344 17.9832 9.9814 17.0652 9.9334C16.1492 9.8874 15.2892 9.4524 14.7052 8.7384C13.6632 7.4644 13.8012 5.5124 15.0192 4.2954L17.3532 2.0534L17.3622 2.0444C16.8272 1.9764 16.2812 1.9904 15.7372 2.0884C13.9492 2.4084 12.4242 3.6654 11.7552 5.3674C11.5542 5.8814 10.9732 6.1344 10.4592 5.9324C9.94522 5.7304 9.69122 5.1504 9.89422 4.6364L9.89322 4.6344Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_3567_128794">
                                            <rect width="24" height="24" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#9e97ee] duration-300
          ${
            currentPath === "field-work-management"
              ? "text-[#9e97ee]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Field Work Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Empower field teams with Jugl’s mobile
                                        tools to track trips, access work, and
                                        stay connected.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 14 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("business-operations")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#ba7a91]
        rounded-full shrink-0 duration-300 ${
          currentPath === "business-operations"
            ? "bg-[#ba7a91]"
            : "bg-[#C78EA430]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "business-operations"
              ? "fill-[#fff]"
              : "fill-[#ba7a91]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M10.5 7C10.5 6.172 11.172 5.5 12 5.5C12.828 5.5 13.5 6.172 13.5 7C13.5 7.828 12.828 8.5 12 8.5C11.172 8.5 10.5 7.828 10.5 7ZM6.302 9.128L6.82 8.83C6.617 8.257 6.5 7.642 6.5 7C6.5 6.358 6.616 5.743 6.82 5.17L6.302 4.872C5.823 4.596 5.659 3.985 5.934 3.506C6.211 3.027 6.822 2.864 7.3 3.138L7.818 3.437C8.621 2.496 9.735 1.829 11 1.596V1C11 0.448 11.448 0 12 0C12.552 0 13 0.448 13 1V1.596C14.268 1.83 15.384 2.499 16.188 3.444L16.718 3.139C17.196 2.865 17.808 3.028 18.084 3.507C18.359 3.986 18.195 4.597 17.716 4.873L17.183 5.18C17.384 5.751 17.5 6.362 17.5 7.001C17.5 7.64 17.385 8.251 17.183 8.822L17.716 9.129C18.195 9.405 18.359 10.016 18.084 10.495C17.899 10.816 17.563 10.996 17.216 10.996C17.047 10.996 16.875 10.953 16.718 10.863L16.188 10.558C15.386 11.5 14.275 12.168 13.011 12.404L13.018 12.989C13.024 13.541 12.582 13.994 12.03 14.001H12.017C11.471 14.001 11.024 13.561 11.017 13.013L11.01 12.407C9.741 12.175 8.623 11.508 7.817 10.564L7.299 10.863C7.142 10.953 6.97 10.996 6.801 10.996C6.455 10.996 6.119 10.816 5.933 10.495C5.658 10.016 5.822 9.405 6.301 9.129L6.302 9.128ZM8.5 7C8.5 8.93 10.07 10.5 12 10.5C13.93 10.5 15.5 8.93 15.5 7C15.5 5.07 13.93 3.5 12 3.5C10.07 3.5 8.5 5.07 8.5 7ZM24 20C24 22.206 22.206 24 20 24H4C1.794 24 0 22.206 0 20C0 17.794 1.794 16 4 16H20C22.206 16 24 17.794 24 20ZM4 22H14V18H4C2.897 18 2 18.897 2 20C2 21.103 2.897 22 4 22ZM22 20C22 18.897 21.103 18 20 18H16V22H20C21.103 22 22 21.103 22 20Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a45e73]
          duration-300 ${
            currentPath === "business-operations"
              ? "text-[#a45e73]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Business Operations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl powers operations with repeatable
                                        processes, clear ownership, and
                                        real-time tracking — all in one place.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 4 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("asset-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#b381a2]
        rounded-full shrink-0 duration-300 ${
          currentPath === "asset-management" ? "bg-[#b381a2]" : "bg-[#9C64862E]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "asset-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#b381a2]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_3567_128792)">
                                          <path d="M23.632 14.256C23.357 13.777 22.744 13.612 22.266 13.889L21.289 14.452C20.684 13.8 19.896 13.326 19 13.121V12C19 11.447 18.552 11 18 11C17.448 11 17 11.447 17 12V13.121C16.104 13.326 15.315 13.799 14.711 14.452L13.734 13.889C13.257 13.614 12.644 13.778 12.368 14.256C12.093 14.735 12.257 15.346 12.736 15.621L13.719 16.187C13.59 16.605 13.501 17.04 13.501 17.5C13.501 17.96 13.59 18.395 13.719 18.813L12.736 19.379C12.257 19.654 12.093 20.266 12.368 20.744C12.553 21.065 12.889 21.245 13.236 21.245C13.405 21.245 13.577 21.202 13.734 21.111L14.711 20.548C15.316 21.2 16.104 21.674 17 21.879V23C17 23.553 17.448 24 18 24C18.552 24 19 23.553 19 23V21.879C19.896 21.674 20.685 21.201 21.289 20.548L22.266 21.111C22.423 21.202 22.595 21.245 22.764 21.245C23.11 21.245 23.447 21.065 23.632 20.744C23.907 20.265 23.743 19.654 23.264 19.379L22.281 18.813C22.41 18.395 22.499 17.96 22.499 17.5C22.499 17.04 22.41 16.605 22.281 16.187L23.264 15.621C23.743 15.346 23.907 14.734 23.632 14.256ZM18 20C16.622 20 15.5 18.879 15.5 17.5C15.5 16.121 16.622 15 18 15C19.378 15 20.5 16.121 20.5 17.5C20.5 18.879 19.378 20 18 20ZM5 7.00002H7.528C7.682 7.00002 7.838 7.03602 7.975 7.10502L11.131 8.68302C11.546 8.89002 12.009 8.99902 12.472 8.99902H19C20.37 8.99902 21.565 9.92402 21.906 11.248C22.043 11.782 22.585 12.104 23.123 11.968C23.658 11.83 23.98 11.285 23.842 10.75C23.274 8.54102 21.283 6.99902 19 6.99902V4.82702C19 4.02602 18.688 3.27202 18.121 2.70602L16.293 0.878023C15.727 0.312023 14.973 -0.000976562 14.171 -0.000976562H9C6.794 -0.000976562 5 1.79302 5 3.99902V4.99902C2.243 5.00002 0 7.24302 0 10V19C0 21.757 2.243 24 5 24H10C10.552 24 11 23.553 11 23C11 22.447 10.552 22 10 22H5C3.346 22 2 20.654 2 19V13H10C10.552 13 11 12.553 11 12C11 11.447 10.552 11 10 11H2V10C2 8.34602 3.346 7.00002 5 7.00002ZM7 4.00002C7 2.89702 7.897 2.00002 9 2.00002H14V4.00002C14 4.55202 14.448 5.00002 15 5.00002H17V7.00002H12.472C12.318 7.00002 12.162 6.96402 12.025 6.89502L8.869 5.31702C8.454 5.11002 7.991 5.00102 7.528 5.00102H7V4.00002Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_3567_128792">
                                            <rect width="24" height="24" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#b381a2] duration-300
          ${
            currentPath === "asset-management"
              ? "text-[#b381a2]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Asset Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Track and manage all assets—know what
                                        you own, where it is, and who’s
                                        responsible with Jugl.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* order managemnet */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("order-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#33845a]
        rounded-full shrink-0 duration-300 ${
          currentPath === "order-management" ? "bg-[#33845a]" : "bg-[#dbf0e1]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "order-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#33845a]"
                                        } `}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_3811_109408)">
                                          <path d="M22 14C22 14.553 21.552 15 21 15H6.737C7.153 16.174 8.265 17 9.557 17H19C19.552 17 20 17.447 20 18C20 18.553 19.552 19 19 19H9.557C7.022 19 4.887 17.102 4.591 14.585L3.215 2.884C3.156 2.38 2.729 2 2.222 2H1C0.448 2 0 1.553 0 1C0 0.447 0.448 0 1 0H2.222C3.743 0 5.024 1.139 5.201 2.649L5.242 3H9C9.552 3 10 3.447 10 4C10 4.553 9.552 5 9 5H5.478L6.419 13H21C21.552 13 22 13.447 22 14ZM7 20C5.895 20 5 20.895 5 22C5 23.105 5.895 24 7 24C8.105 24 9 23.105 9 22C9 20.895 8.105 20 7 20ZM17 20C15.895 20 15 20.895 15 22C15 23.105 15.895 24 17 24C18.105 24 19 23.105 19 22C19 20.895 18.105 20 17 20ZM19 5.586V4C19 3.447 18.552 3 18 3C17.448 3 17 3.447 17 4V6C17 6.266 17.105 6.52 17.293 6.707L18.293 7.707C18.488 7.902 18.744 8 19 8C19.256 8 19.512 7.902 19.707 7.707C20.098 7.316 20.098 6.684 19.707 6.293L19 5.586ZM24 6C24 9.309 21.309 12 18 12C14.691 12 12 9.309 12 6C12 2.691 14.691 0 18 0C21.309 0 24 2.691 24 6ZM22 6C22 3.794 20.206 2 18 2C15.794 2 14 3.794 14 6C14 8.206 15.794 10 18 10C20.206 10 22 8.206 22 6Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_3811_109408">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#33845a] duration-300
          ${
            currentPath === "order-management"
              ? "text-[#33845a]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Order Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Simplify order management with Jugl from
                                        request to fulfillment, invoicing, and
                                        follow-ups, all-in-one.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 5 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("product-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#f8853f]
        rounded-full shrink-0 duration-300 ${
          currentPath === "product-management"
            ? "bg-[#f8853f]"
            : "bg-[#FBB57E30]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "product-management"
              ? "fill-[#fff]"
              : "fill-[#f8853f]"
          } `}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300
          ${
            currentPath === "product-management"
              ? "text-[#f8853f]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Product Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl’s Product Light manages up to 250
                                        items with inventory updates, images,
                                        and custom fields — effortlessly.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 7 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("human-resources-recruiting")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#a2745e]
        rounded-full shrink-0 duration-300 ${
          currentPath === "human-resources-recruiting"
            ? "bg-[#a2745e]"
            : "bg-[#B18D7433]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "human-resources-recruiting"
              ? "fill-[#fff]"
              : "fill-[#a2745e]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.5 2.5C9.5 1.119 10.619 0 12 0C13.381 0 14.5 1.119 14.5 2.5C14.5 3.881 13.381 5 12 5C10.619 5 9.5 3.881 9.5 2.5ZM21 3C19.346 3 18 4.346 18 6V11.184C17.734 11.09 17.458 11.02 17.168 11.004C16.375 10.962 15.601 11.23 14.995 11.773L11.986 14.542C11.903 14.458 11.826 14.37 11.739 14.289L8.995 11.764C8.398 11.23 7.621 10.963 6.832 11.004C6.542 11.02 6.266 11.09 6 11.184V6C6 4.346 4.654 3 3 3C1.346 3 0 4.346 0 6V16.101C0 18.238 0.832 20.247 2.343 21.758L4.293 23.708C4.488 23.903 4.744 24.001 5 24.001C5.256 24.001 5.512 23.903 5.707 23.708C6.098 23.317 6.098 22.684 5.707 22.294L3.757 20.344C2.624 19.211 2 17.704 2 16.101V6C2 5.449 2.448 5 3 5C3.552 5 4 5.449 4 6C4 6 3.995 14.076 4 14.116C4.03 14.771 4.285 15.425 4.746 15.973L7.362 18.694C7.744 19.092 8.377 19.105 8.776 18.721C9.173 18.338 9.186 17.705 8.803 17.307L6.232 14.637C5.916 14.26 5.925 13.699 6.254 13.332C6.431 13.134 6.675 13.017 6.941 13.002C7.204 12.984 7.462 13.077 7.651 13.246L10.384 15.762C11.41 16.706 11.999 18.048 11.999 19.442V23.001C11.999 23.553 12.446 24.001 12.999 24.001C13.552 24.001 13.999 23.553 13.999 23.001V19.442C13.999 18.29 13.705 17.167 13.175 16.166L16.338 13.255C16.536 13.077 16.793 12.984 17.058 13.002C17.324 13.017 17.568 13.134 17.745 13.332C17.905 13.51 18.186 14.212 17.812 14.586L15.279 17.22C14.896 17.618 14.909 18.251 15.306 18.634C15.5 18.821 15.749 18.913 15.999 18.913C16.262 18.913 16.523 18.81 16.72 18.606L19.298 15.921C19.748 15.385 19.984 14.726 19.999 14.064C20.001 14.041 19.999 5.999 19.999 5.999C19.999 5.448 20.447 4.999 20.999 4.999C21.551 4.999 21.999 5.448 21.999 5.999V16.1C21.999 17.703 21.375 19.209 20.242 20.343L18.292 22.293C17.901 22.683 17.901 23.316 18.292 23.707C18.487 23.902 18.743 24 18.999 24C19.255 24 19.511 23.902 19.706 23.707L21.656 21.757C23.167 20.246 23.999 18.237 23.999 16.1V6C23.999 4.346 22.654 3 21 3ZM10.329 10.274L11.193 11.069C11.649 11.489 12.351 11.489 12.807 11.069L13.641 10.302C14.31 9.703 15.124 9.315 15.979 9.132C15.984 9.124 15.987 9.12 15.992 9.112C15.579 7.33 13.949 6 12.001 6C10.053 6 8.424 7.329 8.01 9.11C8.015 9.118 8.017 9.122 8.022 9.129C8.853 9.302 9.653 9.668 10.33 10.273L10.329 10.274Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300
          ${
            currentPath === "human-resources-recruiting"
              ? "text-[#a2745e]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Human Resources & Recruiting
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl streamlines hiring, onboarding, and
                                        training keeping HR organized and
                                        employees supported every step.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 1 --> */}
                                <div
                                  className="relative rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("project-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#ed79ae]
        rounded-full shrink-0 duration-300 ${
          currentPath === "project-management"
            ? "bg-[#ed79ae]"
            : "bg-[#E2498A33]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "project-management"
              ? "fill-[#fff]"
              : "fill-[#ed79ae]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M19 0H5C2.243 0 0 2.243 0 5V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM22 19C22 20.654 20.654 22 19 22H5C3.346 22 2 20.654 2 19V5C2 4.648 2.072 4.314 2.184 4H21.816C21.928 4.314 22 4.648 22 5V19ZM4 8C4 7.448 4.447 7 5 7H8C8.553 7 9 7.448 9 8C9 8.552 8.553 9 8 9H5C4.447 9 4 8.552 4 8ZM14 13C14 13.553 13.553 14 13 14H7C6.447 14 6 13.553 6 13C6 12.447 6.447 12 7 12H13C13.553 12 14 12.448 14 13ZM14 18C14 18.553 13.553 19 13 19H5C4.447 19 4 18.553 4 18C4 17.447 4.447 17 5 17H13C13.553 17 14 17.447 14 18ZM20 18C20 19.105 19.105 20 18 20C16.895 20 16 19.105 16 18C16 17.262 16.405 16.624 17 16.277V10C17 9.449 16.552 9 16 9H14.723C14.377 9.595 13.739 10 13 10C11.895 10 11 9.105 11 8C11 6.895 11.895 6 13 6C13.738 6 14.376 6.405 14.723 7H16C17.654 7 19 8.346 19 10V16.277C19.595 16.623 20 17.261 20 18Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#ff66ae] duration-300
          ${
            currentPath === "project-management"
              ? "text-[#ff66ae]"
              : "text-[#24262B]"
          }`}
                                      >
                                        Project Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl keeps projects moving, teams
                                        aligned, and steps clear—from launches
                                        to onboarding and initiatives.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 27 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M1.33263 7.23768C0.483631 5.52168 -1.20037 1.26868 1.19963 0.149678C1.55645 0.00114058 1.94938 -0.0379524 2.32847 0.0373672C2.70756 0.112687 3.0557 0.299018 3.32863 0.572677L8.28863 5.87268C8.38233 5.96473 8.45698 6.07434 8.50832 6.19525C8.55965 6.31616 8.58667 6.44599 8.58783 6.57734C8.58899 6.70869 8.56427 6.83898 8.51508 6.96077C8.46589 7.08257 8.39319 7.19348 8.30113 7.28718C8.20907 7.38088 8.09946 7.45552 7.97856 7.50686C7.85765 7.5582 7.72782 7.58522 7.59647 7.58638C7.46512 7.58754 7.33483 7.56282 7.21304 7.51363C7.09124 7.46443 6.98033 7.39173 6.88663 7.29968L1.99963 2.07968C2.11863 5.85668 4.34263 8.67968 6.84063 11.5187C7.03238 11.703 7.14306 11.956 7.14831 12.2219C7.15356 12.4878 7.05296 12.7449 6.86863 12.9367C6.68431 13.1284 6.43136 13.2391 6.16543 13.2444C5.8995 13.2496 5.64238 13.149 5.45063 12.9647C3.80914 11.2641 2.42213 9.33516 1.33263 7.23768ZM18.0046 16.1997C17.8684 16.0504 17.6982 15.9361 17.5085 15.8665C17.3188 15.7969 17.1151 15.774 16.9146 15.7997C15.7546 15.9554 14.5745 15.8564 13.4566 15.5097C13.2854 15.4592 13.1037 15.4561 12.931 15.5008C12.7582 15.5456 12.6008 15.6364 12.4756 15.7637C10.9816 18.0197 15.7496 17.8767 16.7876 17.8437L22.2706 23.6827C22.3607 23.7784 22.4686 23.8555 22.5885 23.9095C22.7083 23.9635 22.8375 23.9933 22.9689 23.9974C23.1002 24.0014 23.2311 23.9795 23.354 23.933C23.4769 23.8865 23.5894 23.8162 23.6851 23.7262C23.7809 23.6362 23.8579 23.5282 23.9119 23.4084C23.9659 23.2886 23.9958 23.1593 23.9998 23.0279C24.0039 22.8966 23.982 22.7657 23.9355 22.6428C23.8889 22.5199 23.8187 22.4074 23.7286 22.3117L18.0046 16.1997ZM14.9996 13.9997C15.6562 14.0006 16.3066 13.8719 16.9133 13.6211C17.5201 13.3702 18.0714 13.002 18.5356 12.5377L23.7066 7.36568C23.7996 7.27283 23.8734 7.16258 23.9238 7.04123C23.9741 6.91987 24.0001 6.78978 24.0002 6.65838C24.0003 6.52699 23.9745 6.39686 23.9243 6.27543C23.8741 6.15401 23.8005 6.04365 23.7076 5.95068C23.6148 5.8577 23.5045 5.78392 23.3832 5.73355C23.2618 5.68319 23.1317 5.65721 23.0003 5.65712C22.8689 5.65703 22.7388 5.68282 22.6174 5.73301C22.496 5.78321 22.3856 5.85683 22.2926 5.94968L17.1216 11.1217C16.6825 11.557 16.1195 11.846 15.5099 11.9491C14.9002 12.0522 14.2735 11.9644 13.7156 11.6977L20.7066 4.70668C20.8021 4.61443 20.8783 4.50409 20.9307 4.38208C20.9831 4.26008 21.0107 4.12886 21.0119 3.99608C21.013 3.8633 20.9877 3.73162 20.9375 3.60872C20.8872 3.48583 20.8129 3.37418 20.719 3.28028C20.6251 3.18639 20.5135 3.11214 20.3906 3.06186C20.2677 3.01157 20.136 2.98627 20.0032 2.98743C19.8705 2.98858 19.7392 3.01617 19.6172 3.06858C19.4952 3.12099 19.3849 3.19717 19.2926 3.29268L12.2996 10.2837C12.0329 9.72581 11.9451 9.09915 12.0482 8.48946C12.1513 7.87976 12.4403 7.31683 12.8756 6.87768L18.0496 1.70668C18.2318 1.51808 18.3326 1.26547 18.3303 1.00328C18.328 0.74108 18.2229 0.490267 18.0375 0.304859C17.852 0.119451 17.6012 0.0142819 17.339 0.0120035C17.0768 0.00972505 16.8242 0.110519 16.6356 0.292678L11.4636 5.46368C10.6504 6.27969 10.1432 7.35106 10.0275 8.4973C9.91187 9.64355 10.1948 10.7946 10.8286 11.7567L0.292631 22.2927C0.110473 22.4813 0.00967892 22.7339 0.0119573 22.9961C0.0142358 23.2583 0.119405 23.5091 0.304813 23.6945C0.490221 23.8799 0.741033 23.9851 1.00323 23.9874C1.26543 23.9896 1.51803 23.8888 1.70663 23.7067L12.2426 13.1707C13.0605 13.7113 14.0192 13.9996 14.9996 13.9997Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                        Restaurants & Food Service
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Go beyond POS, accounting and payroll
                                        systems and get all the ingredients for
                                        a thriving enterprise — including event
                                        coordination, menu development,
                                        marketing and more.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 2 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() => handleNavigate("sales-crm")}
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#48daff]
        rounded-full shrink-0 duration-300 ${
          currentPath === "sales-crm" ? "bg-[#48daff]" : "bg-[#48daff33]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "sales-crm"
                                            ? "fill-[#fff]"
                                            : "fill-[#48daff]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M2 2C2 0.895 2.895 0 4 0C5.105 0 6 0.895 6 2C6 3.105 5.105 4 4 4C2.895 4 2 3.105 2 2ZM6 9H12V7.5C12 6.672 11.328 6 10.5 6H7.5C6.672 6 6 6.672 6 7.5V9ZM9 5C10.105 5 11 4.105 11 3C11 1.895 10.105 1 9 1C7.895 1 7 1.895 7 3C7 4.105 7.895 5 9 5ZM14 4C15.105 4 16 3.105 16 2C16 0.895 15.105 0 14 0C12.895 0 12 0.895 12 2C12 3.105 12.895 4 14 4ZM4 7.5C4 6.52 4.407 5.636 5.058 5H2.5C1.672 5 1 5.672 1 6.5V8H4V7.5ZM12.942 5C13.593 5.636 14 6.52 14 7.5V8H17V6.5C17 5.672 16.328 5 15.5 5H12.942ZM23.236 13.015L13.449 24H3C1.346 24 0 22.654 0 21V14C0 12.346 1.346 11 3 11H12.857C13.996 11 14.996 11.609 15.546 12.519L18.763 8.985C19.303 8.39 20.044 8.041 20.848 8.004C21.66 7.965 22.422 8.244 23.017 8.786C24.231 9.893 24.329 11.791 23.235 13.016L23.236 13.015ZM21.671 10.263C21.472 10.082 21.215 9.994 20.943 10.001C20.673 10.014 20.424 10.13 20.244 10.33L15.817 15.194C15.432 16.265 14.478 17.085 13.303 17.253L8.142 17.99L7.859 16.011L13.02 15.274C13.579 15.194 14 14.708 14 14.143C14 13.513 13.487 13.001 12.857 13.001H3C2.448 13.001 2 13.45 2 14.001V21.001C2 21.552 2.448 22.001 3 22.001H12.552L21.742 11.685C22.11 11.273 22.077 10.636 21.67 10.264L21.671 10.263Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#48daff] duration-300
          ${currentPath === "sales-crm" ? "text-[#48daff]" : "text-[#24262B]"}`}
                                      >
                                        Sales CRM
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Manage prospects and clients easily with
                                        Jugl’s fast, simple CRM—built for
                                        relationships, not complexity.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 9 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("customer-success")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#af59f3]
        rounded-full shrink-0 duration-300 ${
          currentPath === "customer-success" ? "bg-[#af59f3]" : "bg-[#9B38E533]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "customer-success"
                                            ? "fill-[#fff]"
                                            : "fill-[#af59f3]"
                                        } `}
                                        viewBox="0 0 20 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M6.50027 9.49991C6.50027 10.0509 6.62827 10.5729 6.85627 11.0369C6.36627 11.6649 6.06127 12.4439 6.02027 13.2929C5.07927 12.3049 4.50027 10.9689 4.50027 9.50091C4.50027 6.08991 7.62227 3.39391 11.1593 4.11991C13.2413 4.54791 14.9283 6.22491 15.3723 8.30391C15.5063 8.93191 15.5313 9.54691 15.4633 10.1349C15.4053 10.6329 14.9683 11.0009 14.4663 11.0009H14.4213C13.8293 11.0009 13.4133 10.4739 13.4783 9.88591C13.5223 9.49091 13.4993 9.07591 13.3983 8.65291C13.1003 7.39991 12.0783 6.38491 10.8233 6.09591C8.53727 5.57091 6.49927 7.30291 6.49927 9.50091L6.50027 9.49991ZM2.61027 8.20491C2.88427 6.61191 3.66327 5.15991 4.87127 4.02691C6.40027 2.59391 8.40227 1.88591 10.5013 2.01591C14.4543 2.27191 17.5453 5.73491 17.4993 9.88091C17.4803 11.6169 16.0263 12.9989 14.2913 12.9989H11.8853C11.6413 12.1699 10.8833 11.5599 9.97527 11.5599C8.87027 11.5599 7.97527 12.4549 7.97527 13.5599C7.97527 14.6649 8.87027 15.5599 9.97527 15.5599C10.5133 15.5599 11.0003 15.3449 11.3593 14.9989H14.2913C17.1103 14.9989 19.4593 12.7539 19.4993 9.93591C19.5733 4.71491 15.6513 0.34491 10.6303 0.0209097C7.96627 -0.15209 5.43927 0.75291 3.50427 2.56891C2.00527 3.97391 1.00827 5.83391 0.64927 7.83491C0.54027 8.44291 1.02127 9.00091 1.63827 9.00091C2.11027 9.00091 2.53127 8.67191 2.61027 8.20591V8.20491ZM10.0003 16.9999C6.30527 16.9999 3.10827 19.2919 2.04527 22.7019C1.88027 23.2289 2.17527 23.7899 2.70227 23.9549C3.22827 24.1139 3.78927 23.8239 3.95427 23.2979C4.74327 20.7679 7.22827 18.9999 9.99927 18.9999C12.7703 18.9999 15.2563 20.7679 16.0443 23.2979C16.1783 23.7259 16.5723 23.9999 16.9993 23.9999C17.0983 23.9999 17.1973 23.9849 17.2973 23.9549C17.8243 23.7899 18.1183 23.2289 17.9543 22.7019C16.8913 19.2919 13.6943 16.9999 9.99927 16.9999H10.0003Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300
          ${
            currentPath === "customer-success"
              ? "text-[#af59f3]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Customer Success
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl helps track and grow customers with
                                        timely, personal tools that build trust
                                        and long-term value.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 8 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("governance-risk-compliance")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#7e81ad]
        rounded-full shrink-0 duration-300 ${
          currentPath === "governance-risk-compliance"
            ? "bg-[#7e81ad]"
            : "bg-[#8990B82E]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "governance-risk-compliance"
              ? "fill-[#fff]"
              : "fill-[#7e81ad]"
          } `}
                                        viewBox="0 0 22 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M21 22H20V13.999C21.104 13.995 22 13.097 22 11.992C22 11.256 21.598 10.58 20.953 10.23L12.349 5.537C12.237 5.476 12.116 5.444 11.999 5.4V4.38L14.634 2.745C15.129 2.415 15.118 1.685 14.614 1.37L12.152 0.215C11.927 0.074 11.667 0 11.401 0C10.619 0 9.984 0.634 9.984 1.417V5H9.999V5.4C9.882 5.445 9.761 5.476 9.649 5.537L1.047 10.23C0.401 10.581 0 11.255 0 11.992C0 13.097 0.897 13.995 2 13.999V22H1C0.448 22 0 22.447 0 23C0 23.553 0.448 24 1 24H21C21.553 24 22 23.553 22 23C22 22.447 21.553 22 21 22ZM10 14V22H8V14H10ZM12 14H14V22H12V14ZM16 14H18V22H16V14ZM2.004 11.986L10.608 7.293C10.853 7.158 11.146 7.158 11.391 7.293L19.992 12L2.002 11.987H2.004V11.986ZM4 13.999H6V21.999H4V13.999Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300
          ${
            currentPath === "governance-risk-compliance"
              ? "text-[#7e81ad]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Governance, Risk & Compliance
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl helps manage policies, audits,
                                        access, and compliance all where your
                                        team already works.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 22 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e7e7e7] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM16 14C16 15.654 14.654 17 13 17V18C13 18.553 12.553 19 12 19C11.447 19 11 18.553 11 18V17H10.732C9.665 17 8.669 16.426 8.134 15.501C7.857 15.022 8.021 14.411 8.498 14.135C8.977 13.856 9.589 14.022 9.864 14.499C10.043 14.809 10.375 15 10.731 15H12.999C13.551 15 13.999 14.552 13.999 14C13.999 13.622 13.728 13.302 13.355 13.24L10.314 12.733C8.972 12.51 7.999 11.36 7.999 10C7.999 8.346 9.345 7 10.999 7V6C10.999 5.448 11.446 5 11.999 5C12.552 5 12.999 5.448 12.999 6V7H13.267C14.334 7 15.33 7.575 15.865 8.5C16.142 8.978 15.978 9.589 15.501 9.866C15.021 10.143 14.41 9.979 14.135 9.501C13.956 9.192 13.624 9.001 13.268 9.001H11C10.448 9.001 10 9.45 10 10.001C10 10.379 10.271 10.699 10.644 10.761L13.685 11.268C15.027 11.491 16 12.641 16 14.001V14Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#4f4f4f] duration-300">
                                        Finance & Accounting
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Change the way you control and power
                                        your vital financial and accounting
                                        processes. Don&apos;t just crunch numbers —
                                        get a powerful, all-in-one platform for
                                        all of your financial process .
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 13 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("business-strategy")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#5b67f9]
        rounded-full shrink-0 duration-300 ${
          currentPath === "business-strategy"
            ? "bg-[#5b67f9]"
            : "bg-[#687FFF30]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "business-strategy"
                                            ? "fill-[#fff]"
                                            : "fill-[#5b67f9]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M19 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM11 2H13C13.6183 2.00256 14.2206 2.19608 14.7247 2.55409C15.2288 2.91209 15.6099 3.41709 15.816 4H8.184C8.39008 3.41709 8.77123 2.91209 9.2753 2.55409C9.77937 2.19608 10.3817 2.00256 11 2ZM5 6H19C19.7956 6 20.5587 6.31607 21.1213 6.87868C21.6839 7.44129 22 8.20435 22 9V12H2V9C2 8.20435 2.31607 7.44129 2.87868 6.87868C3.44129 6.31607 4.20435 6 5 6ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V14H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V14H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#5b67f9]
          duration-300 ${
            currentPath === "business-strategy"
              ? "text-[#5b67f9]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Business Strategy
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl turns plans into action with clear
                                        priorities, ownership, and visibility
                                        all in one workspace.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 10 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() => handleNavigate("construction")}
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#6d6d6d]
        rounded-full shrink-0 duration-300 ${
          currentPath === "construction" ? "bg-[#6d6d6d]" : "bg-[#8A8A8A30]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "construction"
                                            ? "fill-[#fff]"
                                            : "fill-[#6d6d6d]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.89293 17.047C9.60193 17.016 9.30493 17 8.99993 17C5.26593 17 2.44993 19.461 1.99193 23.124C1.92893 23.63 1.49793 24 1.00093 24C0.958929 24 0.917929 23.997 0.875929 23.992C0.327929 23.924 -0.0610708 23.424 0.00792916 22.876C0.587929 18.238 4.28493 15 8.99993 15C9.37793 15 9.74793 15.02 10.1069 15.059C10.6559 15.119 11.0529 15.612 10.9939 16.161C10.9349 16.711 10.4349 17.1 9.89193 17.048L9.89293 17.047ZM1.49993 7C1.49993 6.447 1.94793 6 2.49993 6H2.99993V5.5C2.99993 2.468 5.46693 0 8.49993 0H9.49993C12.5329 0 14.9999 2.468 14.9999 5.5V6H15.4999C16.0529 6 16.4999 6.447 16.4999 7C16.4999 7.553 16.0529 8 15.4999 8H14.9999C14.9999 11.309 12.3089 14 8.99993 14C5.69093 14 2.99993 11.309 2.99993 8H2.49993C1.94793 8 1.49993 7.553 1.49993 7ZM12.9999 8H4.99993C4.99993 10.206 6.79393 12 8.99993 12C11.2059 12 12.9999 10.206 12.9999 8ZM4.99993 6H12.9999V5.5C12.9999 3.742 11.6919 2.296 9.99993 2.051V4C9.99993 4.553 9.55193 5 8.99993 5C8.44793 5 7.99993 4.553 7.99993 4V2.051C6.30793 2.296 4.99993 3.742 4.99993 5.5V6ZM22.4999 21H19.4999C18.6719 21 17.9999 21.672 17.9999 22.5C17.9999 23.328 18.6719 24 19.4999 24H22.4999C23.3279 24 23.9999 23.328 23.9999 22.5C23.9999 21.672 23.3279 21 22.4999 21ZM19.4999 14H22.4999C23.3279 14 23.9999 13.328 23.9999 12.5C23.9999 11.672 23.3279 11 22.4999 11H19.4999C18.6719 11 17.9999 11.672 17.9999 12.5C17.9999 13.328 18.6719 14 19.4999 14ZM14.4999 21H11.4999C10.6709 21 9.99993 21.672 9.99993 22.5C9.99993 23.328 10.6709 24 11.4999 24H14.4999C15.3279 24 15.9999 23.328 15.9999 22.5C15.9999 21.672 15.3279 21 14.4999 21ZM16.4999 16H14.4999C13.6719 16 12.9999 16.672 12.9999 17.5C12.9999 18.328 13.6719 19 14.4999 19H16.4999C17.3279 19 17.9999 18.328 17.9999 17.5C17.9999 16.672 17.3279 16 16.4999 16ZM22.4999 16H21.4999C20.6719 16 19.9999 16.672 19.9999 17.5C19.9999 18.328 20.6719 19 21.4999 19H22.4999C23.3279 19 23.9999 18.328 23.9999 17.5C23.9999 16.672 23.3279 16 22.4999 16Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300
          ${
            currentPath === "construction" ? "text-[#6d6d6d]" : "text-[#24262B]"
          } `}
                                      >
                                        Construction
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl keeps construction projects, teams,
                                        and materials on track all in one
                                        connected platform.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 11 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("colleges-universities")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#35ccae]
        rounded-full shrink-0 duration-300 ${
          currentPath === "colleges-universities"
            ? "bg-[#35ccae]"
            : "bg-[#1FC6A830]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "colleges-universities"
              ? "fill-[#fff]"
              : "fill-[#35ccae]"
          } `}
                                        viewBox="0 0 24 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M22.0565 5.22998L14.6825 1.71698C13.0594 0.747414 11.039 0.730211 9.39954 1.67198L1.94257 5.22998C1.91459 5.24399 1.88557 5.25899 1.85857 5.27498C0.088949 6.28682 -0.525395 8.54165 0.486449 10.3113C0.829433 10.9112 1.33395 11.4027 1.94257 11.73L3.99959 12.71V17.61C4.00081 19.8011 5.42651 21.7368 7.51859 22.388C8.97448 22.8092 10.4841 23.0154 11.9996 23C13.5149 23.017 15.0245 22.8125 16.4806 22.393C18.5727 21.7419 19.9984 19.8061 19.9996 17.615V12.708L21.9996 11.752V20C21.9996 20.5522 22.4473 20.9999 22.9996 20.9999C23.5519 20.9999 23.9996 20.5522 23.9996 20V7.99996C24.0063 6.8257 23.0791 5.74091 22.0565 5.22998ZM17.9996 17.615C18.0001 18.9256 17.1498 20.0849 15.8996 20.478C14.6318 20.8402 13.318 21.0161 11.9996 21C10.6811 21.0161 9.36734 20.8402 8.09956 20.478C6.84936 20.0848 5.99904 18.9256 5.99956 17.615V13.663L9.31657 15.243C10.135 15.729 11.0697 15.9844 12.0216 15.982C12.9276 15.9884 13.8184 15.7486 14.5986 15.288L17.9996 13.663V17.615ZM21.1996 9.92498L13.6576 13.525C12.606 14.1373 11.3025 14.12 10.2676 13.48L2.88856 9.96998C2.06604 9.52645 1.75882 8.50012 2.20236 7.67765C2.35236 7.39949 2.57726 7.16891 2.85157 7.01198L10.3466 3.43199C11.3985 2.82102 12.7012 2.83832 13.7366 3.47699L21.1106 6.98999C21.6529 7.29112 21.9921 7.85976 21.9995 8.48001C22.0005 9.06754 21.698 9.61391 21.1996 9.92498Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#35ccae] duration-300
          ${
            currentPath === "colleges-universities"
              ? "text-[#35ccae]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Colleges & Universities
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl helps higher education teams
                                        coordinate admissions, academics, and
                                        operations all in one platform.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("student-project-management")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#e84b4b]
        rounded-full shrink-0 duration-300 ${
          currentPath === "student-project-management"
            ? "bg-[#e84b4b]"
            : "bg-[#fde3e3]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "student-project-management"
              ? "fill-[#fff]"
              : "fill-[#e84b4b]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_4129_117666)">
                                          <path d="M21.9426 4.49952L13.7216 0.389524C12.6736 -0.131476 11.3216 -0.131476 10.2756 0.391524L2.05664 4.49952L5.99964 6.47052V8.99952C5.99964 12.3085 8.69064 14.9995 11.9996 14.9995C15.3086 14.9995 17.9996 12.3085 17.9996 8.99952V6.47052L19.9996 5.47052V11.9995H21.9996V4.49952H21.9426ZM11.1696 2.18052C11.6506 1.94152 12.3496 1.94052 12.8296 2.18052L17.4706 4.50052L12.8286 6.81952C12.3496 7.05952 11.6516 7.05952 11.1706 6.81952L6.52964 4.50052L11.1686 2.18152L11.1696 2.18052ZM16.0006 8.99952C16.0006 11.2055 14.2066 12.9995 12.0006 12.9995C9.79464 12.9995 8.00064 11.2055 8.00064 8.99952V7.47052L10.2766 8.60852C10.8006 8.87052 11.4016 9.00152 12.0016 9.00152C12.6016 9.00152 13.2016 8.87052 13.7246 8.60852L16.0006 7.47052V8.99952ZM20.0006 20.4995V23.9995H18.0006V20.4995C18.0006 19.2235 17.0396 18.1665 15.8016 18.0185L12.0146 22.5615L8.22464 18.0145C6.97464 18.1525 5.99964 19.2145 5.99964 20.4995V23.9995H3.99964V20.4995C3.99964 18.0185 6.01864 15.9995 8.49964 15.9995H9.14764L12.0136 19.4375L14.8786 15.9995H15.4986C17.9796 15.9995 19.9986 18.0185 19.9986 20.4995H20.0006Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_4129_117666">
                                            <rect width="24" height="24" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b] duration-300
          ${
            currentPath === "student-project-management"
              ? "text-[#e84b4b]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Student Project Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl helps students manage academic
                                        projects with structure, teamwork, and
                                        clear communication all in one place.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 12 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() => handleNavigate("real-estate")}
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#6dd348]
        rounded-full shrink-0 duration-300 ${
          currentPath === "real-estate" ? "bg-[#6dd348]" : "bg-[#dcf7d0]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "real-estate"
                                            ? "fill-[#fff]"
                                            : "fill-[#6dd348]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M7 14C7 14.2652 6.89464 14.5196 6.70711 14.7071C6.51957 14.8946 6.26522 15 6 15H5C4.73478 15 4.48043 14.8946 4.29289 14.7071C4.10536 14.5196 4 14.2652 4 14C4 13.7348 4.10536 13.4804 4.29289 13.2929C4.48043 13.1054 4.73478 13 5 13H6C6.26522 13 6.51957 13.1054 6.70711 13.2929C6.89464 13.4804 7 13.7348 7 14ZM11 13H10C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13ZM6 17H5C4.73478 17 4.48043 17.1054 4.29289 17.2929C4.10536 17.4804 4 17.7348 4 18C4 18.2652 4.10536 18.5196 4.29289 18.7071C4.48043 18.8946 4.73478 19 5 19H6C6.26522 19 6.51957 18.8946 6.70711 18.7071C6.89464 18.5196 7 18.2652 7 18C7 17.7348 6.89464 17.4804 6.70711 17.2929C6.51957 17.1054 6.26522 17 6 17ZM11 17H10C9.73478 17 9.48043 17.1054 9.29289 17.2929C9.10536 17.4804 9 17.7348 9 18C9 18.2652 9.10536 18.5196 9.29289 18.7071C9.48043 18.8946 9.73478 19 10 19H11C11.2652 19 11.5196 18.8946 11.7071 18.7071C11.8946 18.5196 12 18.2652 12 18C12 17.7348 11.8946 17.4804 11.7071 17.2929C11.5196 17.1054 11.2652 17 11 17ZM6 5H5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6C4 6.26522 4.10536 6.51957 4.29289 6.70711C4.48043 6.89464 4.73478 7 5 7H6C6.26522 7 6.51957 6.89464 6.70711 6.70711C6.89464 6.51957 7 6.26522 7 6C7 5.73478 6.89464 5.48043 6.70711 5.29289C6.51957 5.10536 6.26522 5 6 5ZM11 5H10C9.73478 5 9.48043 5.10536 9.29289 5.29289C9.10536 5.48043 9 5.73478 9 6C9 6.26522 9.10536 6.51957 9.29289 6.70711C9.48043 6.89464 9.73478 7 10 7H11C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6 9H5C4.73478 9 4.48043 9.10536 4.29289 9.29289C4.10536 9.48043 4 9.73478 4 10C4 10.2652 4.10536 10.5196 4.29289 10.7071C4.48043 10.8946 4.73478 11 5 11H6C6.26522 11 6.51957 10.8946 6.70711 10.7071C6.89464 10.5196 7 10.2652 7 10C7 9.73478 6.89464 9.48043 6.70711 9.29289C6.51957 9.10536 6.26522 9 6 9ZM11 9H10C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11H11C11.2652 11 11.5196 10.8946 11.7071 10.7071C11.8946 10.5196 12 10.2652 12 10C12 9.73478 11.8946 9.48043 11.7071 9.29289C11.5196 9.10536 11.2652 9 11 9ZM24 10V19C23.9984 20.3256 23.4711 21.5964 22.5338 22.5338C21.5964 23.4711 20.3256 23.9984 19 24H5C3.67441 23.9984 2.40356 23.4711 1.46622 22.5338C0.528882 21.5964 0.00158786 20.3256 0 19L0 5C0.00158786 3.67441 0.528882 2.40356 1.46622 1.46622C2.40356 0.528882 3.67441 0.00158786 5 0L11 0C12.3256 0.00158786 13.5964 0.528882 14.5338 1.46622C15.4711 2.40356 15.9984 3.67441 16 5H19C20.3256 5.00159 21.5964 5.52888 22.5338 6.46622C23.4711 7.40356 23.9984 8.67441 24 10ZM5 22H14V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22ZM22 10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7956 7 19 7H16V22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V10ZM19 13C18.8022 13 18.6089 13.0586 18.4444 13.1685C18.28 13.2784 18.1518 13.4346 18.0761 13.6173C18.0004 13.8 17.9806 14.0011 18.0192 14.1951C18.0578 14.3891 18.153 14.5673 18.2929 14.7071C18.4327 14.847 18.6109 14.9422 18.8049 14.9808C18.9989 15.0194 19.2 14.9996 19.3827 14.9239C19.5654 14.8482 19.7216 14.72 19.8315 14.5556C19.9414 14.3911 20 14.1978 20 14C20 13.7348 19.8946 13.4804 19.7071 13.2929C19.5196 13.1054 19.2652 13 19 13ZM19 17C18.8022 17 18.6089 17.0586 18.4444 17.1685C18.28 17.2784 18.1518 17.4346 18.0761 17.6173C18.0004 17.8 17.9806 18.0011 18.0192 18.1951C18.0578 18.3891 18.153 18.5673 18.2929 18.7071C18.4327 18.847 18.6109 18.9422 18.8049 18.9808C18.9989 19.0194 19.2 18.9996 19.3827 18.9239C19.5654 18.8482 19.7216 18.72 19.8315 18.5556C19.9414 18.3911 20 18.1978 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17ZM19 9C18.8022 9 18.6089 9.05865 18.4444 9.16853C18.28 9.27841 18.1518 9.43459 18.0761 9.61732C18.0004 9.80004 17.9806 10.0011 18.0192 10.1951C18.0578 10.3891 18.153 10.5673 18.2929 10.7071C18.4327 10.847 18.6109 10.9422 18.8049 10.9808C18.9989 11.0194 19.2 10.9996 19.3827 10.9239C19.5654 10.8482 19.7216 10.72 19.8315 10.5556C19.9414 10.3911 20 10.1978 20 10C20 9.73478 19.8946 9.48043 19.7071 9.29289C19.5196 9.10536 19.2652 9 19 9Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6dd348]
          duration-300 ${
            currentPath === "real-estate" ? "text-[#6dd348]" : "text-[#24262B]"
          } `}
                                      >
                                        Real Estate
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl streamlines real estate operations
                                        from listings to closings keeping teams
                                        organized, fast, and connected.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() => handleNavigate("okr")}
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#21adb9]
        rounded-full shrink-0 duration-300 ${
          currentPath === "okr" ? "bg-[#21adb9]" : "bg-[#2DC0CA33]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "okr"
                                            ? "fill-[#fff]"
                                            : "fill-[#21adb9]"
                                        } `}
                                        id="Layer_1"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-name="Layer 1"
                                      >
                                        <path d="m7 11c0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.448-1 1-1s1 .448 1 1c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c.552 0 1 .448 1 1s-.448 1-1 1c-2.757 0-5 2.243-5 5zm5 1c-.552 0-1-.448-1-1 0-.276.112-.526.293-.707l1.982-1.982c-1.112-.501-2.51-.319-3.397.568s0 0 0 0c-.566.566-.878 1.32-.878 2.121s.312 1.555.878 2.121 1.32.879 2.122.879 1.555-.312 2.121-.878.879-1.32.879-2.122c0-.454-.11-.888-.3-1.286l-1.992 1.992c-.181.181-.431.293-.707.293zm1.275-3.69c.309.139.6.322.846.568s.433.531.578.835l1.714-1.714h2.586c.265 0 .52-.105.707-.293l2-2c.286-.286.372-.716.217-1.09s-.52-.617-.924-.617h-2v-1.999c0-.404-.244-.769-.617-.924-.375-.155-.804-.07-1.09.217l-2 2c-.188.188-.293.442-.293.707v2.586l-1.725 1.725zm6.02 10.9c2.267-2.016 3.705-4.945 3.705-8.21 0-.371-.018-.737-.054-1.099-.055-.549-.542-.951-1.094-.896-.549.055-.951.544-.896 1.094.029.296.044.597.044.901 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c.304 0 .604.015.901.044.556.056 1.04-.347 1.094-.896.055-.55-.347-1.04-.896-1.094-.362-.036-.729-.054-1.099-.054-6.065 0-11 4.935-11 11 0 3.265 1.438 6.194 3.705 8.21l-2.051 3.257c-.294.467-.154 1.084.313 1.379.46.292 1.083.158 1.379-.313l1.972-3.132c1.661 1.008 3.601 1.599 5.682 1.599s4.021-.591 5.682-1.599l1.972 3.132c.296.471.919.605 1.379.313.467-.294.608-.912.313-1.379z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9]
          duration-300 ${
            currentPath === "okr" ? "text-[#21adb9]" : "text-[#24262B]"
          } `}
                                      >
                                        OKR
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Set bold OKRs and track real results
                                        with Jugl where goals stay connected to
                                        daily work.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 15 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("legal-operations")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#f8853f]
        rounded-full shrink-0 duration-300 ${
          currentPath === "legal-operations" ? "bg-[#f8853f]" : "bg-[#FBB57E30]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "legal-operations"
                                            ? "fill-[#fff]"
                                            : "fill-[#f8853f]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M23.944 12.669L20.913 4.009C20.493 2.807 19.354 1.999 18.081 1.999H13V1C13 0.448 12.553 0 12 0C11.447 0 11 0.448 11 1V2H5.919C4.646 2 3.507 2.808 3.087 4.009L0.056 12.669C0.019 12.775 0 13.301 0 13.301C0 15.807 1.871 17.868 4.26 17.993C5.501 18.062 6.694 17.622 7.598 16.764C8.49 15.918 9 14.728 9 13.5C9 13.5 8.979 12.768 8.939 12.658L5.794 4.008C5.835 4.003 5.877 4 5.919 4H11V22H5C4.447 22 4 22.448 4 23C4 23.552 4.447 24 5 24H19C19.553 24 20 23.552 20 23C20 22.448 19.553 22 19 22H13V4H18.081C18.123 4 18.165 4.002 18.206 4.008L15.06 12.658C15.02 12.767 14.999 13.5 14.999 13.5C14.999 14.729 15.51 15.918 16.401 16.764C17.246 17.566 18.229 17.993 19.74 17.993C22.131 17.993 23.999 15.807 23.999 13.301C23.999 13.301 23.981 12.775 23.944 12.669ZM4.364 15.997C3.283 15.94 2.378 15.095 2.098 14H6.95C6.85 14.499 6.6 14.954 6.221 15.313C5.719 15.79 5.057 16.032 4.365 15.996L4.364 15.997ZM6.572 12H2.409L4.451 6.167L6.572 12ZM19.549 6.167L21.591 12H17.428L19.549 6.167ZM19.637 15.997C18.949 16.033 18.283 15.791 17.78 15.314C17.401 14.954 17.151 14.499 17.051 14.001H21.903C21.623 15.095 20.719 15.941 19.638 15.998L19.637 15.997Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f]
          duration-300 ${
            currentPath === "legal-operations"
              ? "text-[#f8853f]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Legal Operations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl gives legal teams a structured
                                        workspace to manage contracts,
                                        compliance, and requests — with full
                                        visibility.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 17 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("venture-capital")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#e84b4b]
        rounded-full shrink-0 duration-300 ${
          currentPath === "venture-capital" ? "bg-[#e84b4b]" : "bg-[#fde3e3]"
        } `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300 ${
                                          currentPath === "venture-capital"
                                            ? "fill-[#fff]"
                                            : "fill-[#e84b4b]"
                                        } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M23.2611 8.6C22.7711 8.152 22.1151 7.94 21.4601 8.015C15.8041 8.669 13.2041 12.45 12.0121 15.584C10.8201 12.45 8.22012 8.668 2.56512 8.015C1.91012 7.937 1.25312 8.152 0.762115 8.601C0.276115 9.046 0.00811504 9.674 0.024115 10.323C0.111115 13.593 1.18012 16.19 3.20312 18.043C5.81012 20.432 9.28612 20.906 11.0121 20.986V23C11.0121 23.553 11.4591 24 12.0121 24C12.5651 24 13.0121 23.553 13.0121 23V20.986C14.7391 20.906 18.2141 20.432 20.8221 18.043C22.8441 16.19 23.9141 13.593 24.0011 10.323C24.0181 9.673 23.7471 9.045 23.2611 8.6ZM4.55411 16.568C2.94711 15.095 2.09612 12.977 2.02512 10.27C2.02212 10.174 2.07912 10.107 2.11312 10.076C2.14612 10.046 2.21212 9.999 2.30312 9.999C2.31312 9.999 2.32412 9.999 2.33412 10C8.90112 10.759 10.5071 16.542 10.8941 18.974C9.39212 18.878 6.59612 18.438 4.55411 16.567V16.568ZM19.4801 16.559C17.4491 18.427 14.6401 18.873 13.1311 18.972C13.5181 16.538 15.1261 10.76 21.6911 10.001C21.7021 10.001 21.7121 10 21.7221 10C21.8131 10 21.8781 10.046 21.9111 10.076C21.9451 10.108 22.0031 10.175 22.0001 10.271C21.9291 12.972 21.0811 15.087 19.4791 16.56L19.4801 16.559ZM7.78211 4.696C7.39711 4.3 7.40711 3.667 7.80311 3.282L10.5971 0.575C10.9801 0.191 11.4891 0 11.9991 0C11.9991 0 11.9991 0 12.0001 0C12.5111 0.001 13.0231 0.196 13.4141 0.586L16.1961 3.282C16.5921 3.667 16.6021 4.3 16.2171 4.696C16.0211 4.899 15.7601 5 15.4991 5C15.2481 5 14.9971 4.906 14.8031 4.718L12.9991 2.97V9C12.9991 9.552 12.5521 10 11.9991 10C11.4461 10 10.9991 9.552 10.9991 9V2.983L9.19512 4.718C8.79912 5.101 8.16811 5.093 7.78211 4.696Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b]
          duration-300 ${
            currentPath === "venture-capital"
              ? "text-[#e84b4b]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Venture Capital
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Solutions designed to manage the back
                                        office of any Venture Capital firm.
                                        Track limited partner investors,
                                        document fund strategies, review and vet
                                        potential deals, standardize due
                                        diligence processes and track portfolio
                                        company performance.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 18 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("personal-productivity")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#05b2f2]
        rounded-full shrink-0 duration-300 ${
          currentPath === "personal-productivity"
            ? "bg-[#05b2f2]"
            : "bg-[#dff3ff]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "personal-productivity"
              ? "fill-[#fff]"
              : "fill-[#05b2f2]"
          }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M2.5 2.5C2.5 1.119 3.619 0 5 0C6.381 0 7.5 1.119 7.5 2.5C7.5 3.881 6.381 5 5 5C3.619 5 2.5 3.881 2.5 2.5ZM8 16.463V23C8 23.553 7.553 24 7 24C6.447 24 6 23.553 6 23V17H4V23C4 23.553 3.553 24 3 24C2.447 24 2 23.553 2 23V16.463C0.805 15.77 0 14.478 0 13V10C0 7.794 1.794 6 4 6H6C8.206 6 10 7.794 10 10V13C10 14.478 9.195 15.771 8 16.463ZM8 10C8 8.897 7.103 8 6 8H4C2.897 8 2 8.897 2 10V13C2 14.103 2.897 15 4 15H6C7.103 15 8 14.103 8 13V10ZM24 17C24 20.859 20.859 24 17 24C13.141 24 10 20.859 10 17C10 13.141 13.141 10 17 10C20.859 10 24 13.141 24 17ZM22 17C22 14.243 19.757 12 17 12C14.243 12 12 14.243 12 17C12 19.757 14.243 22 17 22C19.757 22 22 19.757 22 17ZM18.808 15.759L16.585 17.893C16.441 18.033 16.206 18.037 16.063 17.895L14.932 16.787C14.536 16.399 13.904 16.406 13.518 16.801C13.131 17.196 13.137 17.828 13.532 18.215L14.664 19.324C15.124 19.773 15.726 19.998 16.327 19.998C16.928 19.998 17.528 19.773 17.98 19.327L20.193 17.203C20.591 16.82 20.604 16.187 20.222 15.789C19.839 15.39 19.205 15.378 18.808 15.76V15.759Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#05b2f2] duration-300
          ${
            currentPath === "personal-productivity"
              ? "text-[#05b2f2]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Personal Productivity
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Discover curated solutions to help
                                        teammates stay organized, find a
                                        productive flow and implement healthy
                                        patterns to find a balance.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 16 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("banks-credit-unions")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#a6aa38]
        rounded-full shrink-0 duration-300 ${
          currentPath === "banks-credit-unions"
            ? "bg-[#a6aa38]"
            : "bg-[#BCBE4433]"
        }
        `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
          ${
            currentPath === "banks-credit-unions"
              ? "fill-[#fff]"
              : "fill-[#a6aa38]"
          } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M12 14H13C13.553 14 14 13.553 14 13C14 12.447 13.553 12 13 12H2.3C2.134 12 2 11.865 2 11.7C2 11.591 2.06 11.49 2.156 11.437L10.607 6.828C10.728 6.763 10.864 6.727 11 6.727C11.136 6.727 11.272 6.762 11.392 6.827L17.522 10.171C17.673 10.254 17.837 10.293 18 10.293C18.354 10.293 18.697 10.105 18.879 9.772C19.144 9.288 18.965 8.68 18.48 8.416L12.35 5.071C12.24 5.011 12.119 4.979 12.002 4.935V4.198L14.506 2.51C14.933 2.222 14.869 1.575 14.393 1.377L11.262 0.0709998C10.662 -0.179 10 0.262 10 0.912V4.934C9.883 4.979 9.761 5.011 9.65 5.071L1.199 9.682C0.46 10.085 0 10.859 0 11.701C0 12.867 0.875 13.822 2 13.97V22H1C0.448 22 0 22.447 0 23C0 23.553 0.448 24 1 24H10C10.552 24 11 23.553 11 23C11 22.447 10.552 22 10 22H8V14H10V15C10 15.553 10.448 16 11 16C11.552 16 12 15.553 12 15V14ZM6 22H4V14H6V22ZM19.642 14.308C19.916 14.011 20.178 13.683 20.383 13.334C20.729 12.744 20.268 12.001 19.584 12.001H16.417C15.733 12.001 15.273 12.744 15.618 13.334C15.822 13.683 16.084 14.011 16.359 14.308C13.983 15.187 12.001 17.828 12.001 20.512C12.001 22.436 13.571 24 15.501 24H20.501C22.431 24 24.001 22.436 24.001 20.512C24.001 17.828 22.018 15.187 19.642 14.308ZM20.5 22H15.5C14.673 22 14 21.332 14 20.512C14 18.32 16.056 16 18 16C19.944 16 22 18.319 22 20.512C22 21.332 21.327 22 20.5 22Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a6aa38]
          duration-300 ${
            currentPath === "banks-credit-unions"
              ? "text-[#a6aa38]"
              : "text-[#24262B]"
          } `}
                                      >
                                        Banks / Credit Unions
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Elevate GRC Excellence: Discover the
                                        ultimate enterprise solution tailored
                                        for Banks and Credit Unions. From
                                        beginners to experts, enjoy
                                        user-friendly features and seamless
                                        cross-team collaboration across GRC
                                        practice areas.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 19 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("professional-service")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#c268cd]
                                            rounded-full shrink-0 duration-300 ${
                                              currentPath ===
                                              "professional-service"
                                                ? "bg-[#c268cd]"
                                                : "bg-[#f7edfa]"
                                            }`}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                              ${
                                                currentPath ===
                                                "professional-service"
                                                  ? "fill-[#fff]"
                                                  : "fill-[#c268cd]"
                                              } `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 2C11.206 2 13 3.794 13 6C13 8.206 11.206 10 9 10C6.794 10 5 8.206 5 6C5 3.794 6.794 2 9 2ZM10 15C10 15.552 9.552 16 9 16C5.14 16 2 19.14 2 23C2 23.552 1.552 24 1 24C0.448 24 0 23.552 0 23C0 18.038 4.038 14 9 14C9.552 14 10 14.448 10 15ZM21 14.051V14C21 12.897 20.103 12 19 12H17C15.897 12 15 12.897 15 14V14.051C13.308 14.296 12 15.742 12 17.5V20.5C12 22.43 13.57 24 15.5 24H20.5C22.43 24 24 22.43 24 20.5V17.5C24 15.742 22.692 14.296 21 14.051ZM15.5 16H20.5C21.327 16 22 16.673 22 17.5V18H14V17.5C14 16.673 14.673 16 15.5 16ZM20.5 22H15.5C14.673 22 14 21.327 14 20.5V20H17C17 20.552 17.448 21 18 21C18.552 21 19 20.552 19 20H22V20.5C22 21.327 21.327 22 20.5 22Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#c268cd] duration-300
                                                ${
                                                  currentPath ===
                                                  "professional-service"
                                                    ? "text-[#c268cd]"
                                                    : "text-[#24262B]"
                                                } `}
                                      >
                                        Professional Services
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Give your human capital a performance
                                        boost to complete work orders, deliver
                                        engagements and manage projects faster
                                        and smarter than ever before.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 20 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("security-operations")
                                  }
                                >
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#c87847]  rounded-full shrink-0 duration-300
                                          ${
                                            currentPath ===
                                            "security-operations"
                                              ? "bg-[#c87847]"
                                              : "bg-[#f6ebde]"
                                          }
                                          `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                               ${
                                                 currentPath ===
                                                 "security-operations"
                                                   ? "fill-[#fff]"
                                                   : "fill-[#c87847]"
                                               } 
                                          `}
                                        viewBox="0 0 20 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M16.581 2.14024L10.316 0.0512408C10.1109 -0.0170803 9.88913 -0.0170803 9.684 0.0512408L3.419 2.14024C2.42291 2.47112 1.55642 3.1075 0.942645 3.95895C0.328874 4.8104 -0.000961674 5.83363 2.10612e-06 6.88324V12.0002C2.10612e-06 19.5632 9.2 23.7402 9.594 23.9142C9.72182 23.971 9.86014 24.0004 10 24.0004C10.1399 24.0004 10.2782 23.971 10.406 23.9142C10.8 23.7402 20 19.5632 20 12.0002V6.88324C20.001 5.83363 19.6711 4.8104 19.0574 3.95895C18.4436 3.1075 17.5771 2.47112 16.581 2.14024ZM18 12.0002C18 17.4552 11.681 21.0332 10 21.8892C8.317 21.0362 2 17.4692 2 12.0002V6.88324C2.00006 6.25352 2.19828 5.63978 2.56657 5.12898C2.93486 4.61819 3.45455 4.23623 4.052 4.03724L10 2.05424L15.948 4.03724C16.5455 4.23623 17.0651 4.61819 17.4334 5.12898C17.8017 5.63978 17.9999 6.25352 18 6.88324V12.0002Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#c87847] duration-300
                                               ${
                                                 currentPath ===
                                                 "security-operations"
                                                   ? "text-[#c87847]"
                                                   : "text-[#24262B]"
                                               }
                                              `}
                                      >
                                        Security Operations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Optimize security operations by
                                        consolidating processes, organizing and
                                        prioritizing tasks and coordinating
                                        staff to achieve your security mission.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 28 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M14 12V5C14 3.346 12.654 2 11 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H11C11.552 22 12 22.447 12 23C12 23.553 11.552 24 11 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H11C13.757 0 16 2.243 16 5V12C16 12.553 15.553 13 15 13C14.447 13 14 12.553 14 12ZM6 13H5C4.448 13 4 13.447 4 14C4 14.553 4.448 15 5 15H6C6.552 15 7 14.553 7 14C7 13.447 6.552 13 6 13ZM11 13H10C9.448 13 9 13.447 9 14C9 14.553 9.448 15 10 15H11C11.552 15 12 14.553 12 14C12 13.447 11.552 13 11 13ZM6 17H5C4.448 17 4 17.447 4 18C4 18.553 4.448 19 5 19H6C6.552 19 7 18.553 7 18C7 17.447 6.552 17 6 17ZM11 17H10C9.448 17 9 17.447 9 18C9 18.553 9.448 19 10 19H11C11.552 19 12 18.553 12 18C12 17.447 11.552 17 11 17ZM6 5H5C4.448 5 4 5.447 4 6C4 6.553 4.448 7 5 7H6C6.552 7 7 6.553 7 6C7 5.447 6.552 5 6 5ZM11 5H10C9.448 5 9 5.447 9 6C9 6.553 9.448 7 10 7H11C11.552 7 12 6.553 12 6C12 5.447 11.552 5 11 5ZM6 9H5C4.448 9 4 9.447 4 10C4 10.553 4.448 11 5 11H6C6.552 11 7 10.553 7 10C7 9.447 6.552 9 6 9ZM11 9H10C9.448 9 9 9.447 9 10C9 10.553 9.448 11 10 11H11C11.552 11 12 10.553 12 10C12 9.447 11.552 9 11 9ZM23.968 22.75C23.408 20.576 21.319 19 19 19C16.681 19 14.591 20.577 14.032 22.75C13.894 23.284 14.217 23.83 14.752 23.968C15.279 24.106 15.832 23.783 15.97 23.248C16.3 21.966 17.603 20.999 19.001 20.999C20.399 20.999 21.702 21.966 22.032 23.248C22.168 23.787 22.729 24.105 23.25 23.968C23.785 23.83 24.107 23.284 23.97 22.75H23.968ZM19 18C20.379 18 21.5 16.879 21.5 15.5C21.5 14.121 20.379 13 19 13C17.621 13 16.5 14.121 16.5 15.5C16.5 16.879 17.621 18 19 18Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                        Facility Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Simplify the complex, keep track of your
                                        everything, react to issues as they
                                        occur and be proactive about how you
                                        manage your facilities.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- 21 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e0e7ff] group-hover/menu:bg-[#6468f0]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6468f0] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M24 9.99995V16C24 18.757 21.757 21 19 21H13V22H16C16.553 22 17 22.447 17 23C17 23.553 16.553 24 16 24H8C7.447 24 7 23.553 7 23C7 22.447 7.447 22 8 22H11V21H5C2.243 21 0 18.757 0 16V9.99995C0 7.71695 1.542 5.72595 3.751 5.15795C4.282 5.02395 4.831 5.34195 4.969 5.87695C5.107 6.41195 4.784 6.95695 4.249 7.09395C2.925 7.43495 2 8.62995 2 9.99995V16C2 17.654 3.346 19 5 19H19C20.654 19 22 17.654 22 16V9.99995C22 8.62995 21.075 7.43495 19.751 7.09395C19.216 6.95695 18.894 6.41095 19.031 5.87695C19.169 5.34195 19.72 5.02295 20.249 5.15795C22.458 5.72595 24 7.71695 24 9.99995ZM6.304 9.13395L7.257 8.58395C7.09 8.08595 7 7.55395 7 7.00095C7 6.44795 7.091 5.91495 7.257 5.41795L6.304 4.86795C5.825 4.59195 5.661 3.97995 5.938 3.50195C6.214 3.02295 6.826 2.85895 7.304 3.13595L8.26 3.68795C8.966 2.89295 9.92 2.32295 11 2.10295V1.00195C11 0.449953 11.447 0.00195312 12 0.00195312C12.553 0.00195312 13 0.449953 13 1.00195V2.10295C14.08 2.32295 15.035 2.89295 15.74 3.68795L16.696 3.13595C17.172 2.85895 17.785 3.02295 18.062 3.50195C18.338 3.98095 18.174 4.59195 17.696 4.86795L16.743 5.41795C16.91 5.91595 17 6.44795 17 7.00095C17 7.55395 16.909 8.08695 16.743 8.58395L17.696 9.13395C18.175 9.40995 18.339 10.022 18.062 10.5C17.876 10.821 17.541 11 17.195 11C17.025 11 16.853 10.957 16.696 10.866L15.74 10.314C15.034 11.109 14.08 11.679 13 11.899V13C13 13.553 12.553 14 12 14C11.447 14 11 13.553 11 13V11.899C9.92 11.679 8.965 11.109 8.26 10.314L7.304 10.866C7.147 10.957 6.975 11 6.805 11C6.459 11 6.123 10.821 5.938 10.5C5.662 10.021 5.826 9.40995 6.304 9.13395ZM9 6.99995C9 8.65395 10.346 9.99995 12 9.99995C13.654 9.99995 15 8.65395 15 6.99995C15 5.34595 13.654 3.99995 12 3.99995C10.346 3.99995 9 5.34595 9 6.99995Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6468f0] duration-300">
                                        IT Service Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Raise the bar with solutions designed to
                                        streamline critical IT processes,
                                        organize projects and remove traditional
                                        obstacles on the road of an
                                        ever-changing technology landscape.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 35 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8A8A8A30] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_4129_117720)">
                                          <path d="M22 18.184V17C22 16.448 21.553 16 21 16C20.447 16 20 16.448 20 17V18H15.5C15.234 18 14.98 18.105 14.793 18.293L14.086 19H9.914L9.207 18.293C9.019 18.105 8.766 18 8.5 18H4V11C4 9.346 5.346 8 7 8H13C13.553 8 14 7.552 14 7C14 6.448 13.553 6 13 6H7C4.243 6 2 8.243 2 11V18.184C0.839 18.598 0 19.698 0 21C0 22.654 1.346 24 3 24H21C22.654 24 24 22.654 24 21C24 19.698 23.161 18.598 22 18.184ZM21 22H3C2.448 22 2 21.551 2 21C2 20.449 2.448 20 3 20H8.086L8.793 20.707C8.981 20.895 9.234 21 9.5 21H14.5C14.766 21 15.02 20.895 15.207 20.707L15.914 20H21C21.552 20 22 20.449 22 21C22 21.551 21.552 22 21 22ZM16 5C16 3.346 17.346 2 19 2V1C19 0.448 19.447 0 20 0C20.553 0 21 0.448 21 1V2.003H21.271C22.334 2.003 23.328 2.576 23.864 3.498C24.142 3.975 23.98 4.587 23.503 4.865C23.024 5.142 22.413 4.981 22.136 4.503C21.953 4.191 21.631 4.003 21.27 4.003L18.999 4C18.448 4 18 4.449 18 5C18 5.378 18.271 5.698 18.644 5.76L21.685 6.267C23.027 6.49 24 7.64 24 9C24 10.654 22.654 12 21 12V13C21 13.552 20.553 14 20 14C19.447 14 19 13.552 19 13V11.998H18.73C17.664 11.998 16.669 11.424 16.134 10.502C15.857 10.024 16.02 9.412 16.498 9.135C16.975 8.859 17.588 9.021 17.864 9.499C18.043 9.807 18.374 9.998 18.73 9.998L21 10C21.551 10 21.999 9.551 21.999 9C21.999 8.622 21.728 8.302 21.355 8.24L18.314 7.733C16.972 7.51 15.999 6.36 15.999 5H16Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_4129_117720">
                                            <rect width="24" height="24" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300">
                                        Freelance Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl brings everything you need to
                                        manage freelancers— from onboarding and
                                        task tracking to contracts and payments—
                                        into one smart platform. Trusted by
                                        teams working across borders and time
                                        zones, it keeps your freelance
                                        operations smooth, scalable, and
                                        stress-free.{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 34 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7eff6] group-hover/menu:bg-[#2a8ab0]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#2a8ab0] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M22.961 16.726C22.81 16.195 22.257 15.887 21.726 16.038C21.693 16.048 18.293 17 14 17C10.621 17 7.19502 16.412 5.83202 16.148C5.56302 14.903 5.00002 11.936 5.00002 9.00005C5.00002 5.13905 5.48102 2.19305 5.48602 2.16405C5.53402 1.87405 5.45302 1.57805 5.26202 1.35305C5.07302 1.12905 4.79302 0.999047 4.49902 0.999047H1.99902C1.44602 0.999047 0.999023 1.44705 0.999023 1.99905C0.999023 2.55105 1.44602 2.99905 1.99902 2.99905H3.35302C3.20202 4.25105 2.99902 6.41305 2.99902 8.99905C2.99902 13.075 3.98702 17.073 4.02902 17.242C4.12102 17.609 4.41202 17.893 4.78202 17.975C4.83802 17.988 5.28502 18.085 5.99902 18.215V19.999C5.99902 21.653 7.34502 22.999 8.99902 22.999C10.653 22.999 11.999 21.653 11.999 19.999V18.939C12.655 18.976 13.325 18.999 13.999 18.999C14.694 18.999 15.36 18.974 15.999 18.935V19.999C15.999 21.653 17.345 22.999 18.999 22.999C20.653 22.999 21.999 21.653 21.999 19.999V18.034C22.153 17.994 22.252 17.967 22.273 17.961C22.804 17.81 23.111 17.256 22.96 16.726H22.961ZM10 20C10 20.551 9.55202 21 9.00002 21C8.44802 21 8.00002 20.551 8.00002 20V18.538C8.61202 18.625 9.28402 18.709 10 18.782V20ZM20 20C20 20.551 19.552 21 19 21C18.448 21 18 20.551 18 20V18.758C18.749 18.669 19.42 18.565 20 18.461V20ZM8.09202 14.744C8.18902 14.754 10.487 15 14 15C17.513 15 19.812 14.754 19.908 14.744C20.35 14.696 20.708 14.361 20.785 13.923C20.794 13.873 21 12.685 21 11.5C21 10.315 20.794 9.12705 20.785 9.07705C20.708 8.63905 20.35 8.30405 19.908 8.25605C19.811 8.24605 17.513 8.00005 14 8.00005C10.487 8.00005 8.18802 8.24605 8.09202 8.25605C7.65002 8.30405 7.29202 8.63905 7.21502 9.07705C7.20602 9.12705 7.00002 10.315 7.00002 11.5C7.00002 12.685 7.20602 13.873 7.21502 13.923C7.29202 14.361 7.65002 14.696 8.09202 14.744ZM9.08202 10.176C10.024 10.104 11.77 10 14 10C16.23 10 17.977 10.104 18.919 10.176C18.961 10.555 19 11.032 19 11.5C19 11.968 18.961 12.444 18.918 12.824C17.976 12.896 16.23 13 14 13C11.77 13 10.023 12.896 9.08102 12.824C9.03902 12.445 9.00002 11.968 9.00002 11.5C9.00002 11.032 9.03902 10.556 9.08202 10.176ZM15.985 6.77605C16.027 6.78505 17.013 7.00005 18 7.00005C18.987 7.00005 19.973 6.78605 20.015 6.77605C20.396 6.69305 20.693 6.39505 20.777 6.01405C20.786 5.97205 21.001 4.98505 21.001 3.99905C21.001 3.01305 20.786 2.02605 20.777 1.98405C20.693 1.60305 20.396 1.30605 20.015 1.22205C19.973 1.21305 18.987 0.998047 18 0.998047C17.013 0.998047 16.027 1.21205 15.985 1.22205C15.604 1.30505 15.307 1.60305 15.223 1.98405C15.214 2.02605 14.999 3.01305 14.999 3.99905C14.999 4.98505 15.214 5.97205 15.223 6.01405C15.307 6.39505 15.604 6.69205 15.985 6.77605ZM17.067 3.06805C17.622 2.99505 18.378 2.99505 18.932 3.06805C18.968 3.34405 18.999 3.67705 18.999 4.00005C18.999 4.32305 18.968 4.65605 18.932 4.93205C18.377 5.00505 17.621 5.00505 17.067 4.93205C17.031 4.65605 17 4.32305 17 4.00005C17 3.67705 17.031 3.34405 17.067 3.06805ZM8.07702 6.78505C8.12702 6.79405 9.31502 7.00005 10.5 7.00005C11.685 7.00005 12.873 6.79305 12.923 6.78505C13.304 6.71805 13.612 6.43805 13.715 6.06505C13.726 6.02305 14 5.01205 14 4.00105C14 2.99005 13.726 1.97905 13.715 1.93705C13.612 1.56405 13.304 1.28405 12.923 1.21705C12.873 1.20805 11.685 1.00205 10.5 1.00205C9.31502 1.00205 8.12702 1.20905 8.07702 1.21705C7.69602 1.28405 7.38802 1.56405 7.28502 1.93705C7.27402 1.97905 7.00002 2.99005 7.00002 4.00105C7.00002 5.01205 7.27402 6.02305 7.28502 6.06505C7.38802 6.43805 7.69602 6.71805 8.07702 6.78505ZM9.08302 3.09205C9.86402 3.00005 11.13 3.00005 11.917 3.09205C11.961 3.36205 12 3.68605 12 4.00005C12 4.31405 11.961 4.63905 11.917 4.90805C11.136 5.00005 9.87002 5.00005 9.08302 4.90805C9.03902 4.63805 9.00002 4.31405 9.00002 4.00005C9.00002 3.68605 9.03902 3.36105 9.08302 3.09205Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#2a8ab0] leading-[130%] mb-[4px] group-hover/menu:text-[#2a8ab0] duration-300">
                                        Logistics
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Streamline the inventory, shipping and
                                        distribution processes that are crucial
                                        to your success. Manage all of the
                                        materials needed to produce your
                                        products — and the systems you need to
                                        get them into customers’ hands.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 24 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f8ebf2] group-hover/menu:bg-[#b74b7b]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#b74b7b] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M23.7103 10.069C23.5153 10.266 23.2573 10.365 23.0003 10.365C22.7453 10.365 22.4913 10.268 22.2963 10.075L20.0003 7.798V18C20.0003 21.309 17.3093 24 14.0003 24H7.00026C6.44726 24 6.00026 23.553 6.00026 23C6.00026 22.447 6.44726 22 7.00026 22H14.0003C16.2063 22 18.0003 20.206 18.0003 18V7.798L15.7043 10.075C15.3113 10.462 14.6793 10.462 14.2903 10.069C13.9013 9.677 13.9033 9.044 14.2963 8.655L17.2543 5.721C18.1843 4.792 19.8153 4.79 20.7483 5.723L23.7043 8.654C24.0973 9.043 24.0993 9.676 23.7103 10.068V10.069ZM9.70426 15.344C10.0973 14.955 10.0993 14.322 9.71026 13.93C9.31926 13.536 8.68826 13.535 8.29626 13.924L6.00026 16.201V6C6.00026 3.794 7.79426 2 10.0003 2H17.0003C17.5533 2 18.0003 1.552 18.0003 1C18.0003 0.448 17.5533 0 17.0003 0H10.0003C6.69126 0 4.00026 2.691 4.00026 6V16.202L1.70426 13.925C1.31226 13.537 0.680258 13.538 0.290258 13.931C-0.0987423 14.323 -0.0967423 14.956 0.296258 15.345L3.25126 18.276C3.71826 18.744 4.33926 19.001 5.00026 19.001C5.66126 19.001 6.28226 18.744 6.74626 18.279L9.70426 15.345V15.344Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b74b7b] duration-300">
                                        Business Continuity Planning
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Don’t let a sudden crisis disrupt your
                                        business. Weather any storm with Jugl to
                                        facilitate business continuity and
                                        disaster recovery planning.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 32 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M21.941 12.493L13 5.991V4H14C14.552 4 15 3.552 15 3C15 2.448 14.552 2 14 2H13V1C13 0.448 12.552 0 12 0C11.448 0 11 0.448 11 1V2H10C9.448 2 9 2.448 9 3C9 3.552 9.448 4 10 4H11V5.991L2.059 12.493C0.77 13.431 0 14.943 0 16.537V20C0 22.206 1.794 24 4 24H20C22.206 24 24 22.206 24 20V16.537C24 14.943 23.23 13.431 21.941 12.493ZM12 15C10.346 15 9 16.346 9 18V22H7V11.373L12 7.737L17 11.373V22H15V18C15 16.346 13.654 15 12 15ZM2 20V16.537C2 15.58 2.462 14.673 3.236 14.11L5 12.827V22H4C2.897 22 2 21.103 2 20ZM11 22V18C11 17.449 11.449 17 12 17C12.551 17 13 17.449 13 18V22H11ZM22 20C22 21.103 21.103 22 20 22H19V12.827L20.764 14.11C21.538 14.673 22 15.58 22 16.537V20Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                        Churches
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        From small churches to multi-location
                                        religious groups, Jugl solutions
                                        designed to fit the unique needs of
                                        every organization. From church
                                        operations, to member tracking, event
                                        planning, giving and more.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 26 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#feecd6] group-hover/menu:bg-[#f36f1c]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#f36f1c] group-hover/menu:fill-[#fff] duration-300"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M19 2H18V1C18 0.448 17.552 0 17 0C16.448 0 16 0.448 16 1V2H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V2H5C2.243 2 0 4.243 0 7V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V7C24 4.243 21.757 2 19 2ZM5 4H19C20.654 4 22 5.346 22 7V8H2V7C2 5.346 3.346 4 5 4ZM19 22H5C3.346 22 2 20.654 2 19V10H22V19C22 20.654 20.654 22 19 22ZM13.892 11.885C13.137 11.885 12.448 12.19 11.923 12.692C11.399 12.191 10.709 11.885 9.954 11.885C8.317 11.885 6.985 13.321 6.985 15.085C6.985 16.663 8.193 18.415 10.68 20.443C11.04 20.736 11.481 20.883 11.922 20.882C12.363 20.882 12.805 20.736 13.165 20.442C15.651 18.414 16.859 16.661 16.859 15.085C16.859 13.321 15.527 11.885 13.89 11.885H13.892ZM11.945 18.892C9.275 16.714 8.986 15.504 8.986 15.084C8.986 14.422 9.421 13.884 9.955 13.884C10.489 13.884 10.924 14.422 10.924 15.084C10.924 15.636 11.372 16.084 11.924 16.084C12.476 16.084 12.924 15.636 12.924 15.084C12.924 14.422 13.359 13.884 13.893 13.884C14.427 13.884 14.862 14.422 14.862 15.084C14.862 15.503 14.574 16.713 11.946 18.892H11.945Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f36f1c] duration-300">
                                        Event Planning
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        From small meetings to massive
                                        conferences, one-time epics to recurring
                                        live programs, coordinate every dynamic
                                        and elevate your events with Jugl.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 30 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f0f3ce] group-hover/menu:bg-[#bfb333]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#bfb333] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M7 14C9.206 14 11 12.206 11 10C11 7.794 9.206 6 7 6C4.794 6 3 7.794 3 10C3 12.206 4.794 14 7 14ZM7 8C8.103 8 9 8.897 9 10C9 11.103 8.103 12 7 12C5.897 12 5 11.103 5 10C5 8.897 5.897 8 7 8ZM14 23C14 23.553 13.552 24 13 24C12.448 24 12 23.553 12 23C12 20.243 9.757 18 7 18C4.243 18 2 20.243 2 23C2 23.553 1.552 24 1 24C0.448 24 0 23.553 0 23C0 19.141 3.14 16 7 16C10.86 16 14 19.141 14 23ZM24 5V13C24 15.757 21.757 18 19 18H15C14.448 18 14 17.553 14 17V15C14 14.447 14.448 14 15 14H18C18.552 14 19 14.447 19 15V16C20.654 16 22 14.654 22 13V5C22 3.346 20.654 2 19 2H9.465C8.397 2 7.401 2.575 6.866 3.501C6.589 3.979 5.978 4.144 5.5 3.865C5.021 3.589 4.858 2.977 5.135 2.499C6.027 0.958 7.686 0 9.466 0H19.001C21.758 0 24 2.243 24 5Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#bfb333] duration-300">
                                        Teachers
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Simplify and unify all educational
                                        materials and operations to shift the
                                        focus to students.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- 25 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f9fcc5] group-hover/menu:bg-[#e4cc0e]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#e4cc0e] group-hover/menu:fill-[#fff] duration-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M8.965 24H4C2.93913 24 1.92172 23.5786 1.17157 22.8284C0.421427 22.0783 0 21.0609 0 20V15C0 13.9391 0.421427 12.9217 1.17157 12.1716C1.92172 11.4214 2.93913 11 4 11H12.857C13.3982 11.0003 13.9302 11.1402 14.4014 11.4063C14.8727 11.6724 15.2673 12.0557 15.547 12.519L18.764 8.984C19.0301 8.69139 19.3512 8.45409 19.7091 8.28566C20.0669 8.11723 20.4545 8.02098 20.8496 8.00241C21.2446 7.98383 21.6395 8.0433 22.0116 8.17741C22.3836 8.31152 22.7256 8.51765 23.018 8.784C23.6014 9.31993 23.951 10.0635 23.9916 10.8546C24.0321 11.6458 23.7605 12.4212 23.235 13.014L16.435 20.651C15.4961 21.704 14.3453 22.5467 13.0579 23.1239C11.7706 23.701 10.3758 23.9996 8.965 24ZM4 13C3.46957 13 2.96086 13.2107 2.58579 13.5858C2.21071 13.9609 2 14.4696 2 15V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H8.965C10.0929 21.9995 11.208 21.7607 12.2372 21.2992C13.2664 20.8377 14.1864 20.1639 14.937 19.322L21.742 11.684C21.9187 11.485 22.0101 11.2246 21.9967 10.9588C21.9832 10.693 21.8659 10.4431 21.67 10.263C21.4708 10.0839 21.2096 9.98958 20.942 10C20.8093 10.0056 20.6791 10.0376 20.5589 10.0941C20.4387 10.1506 20.331 10.2304 20.242 10.329L15.816 15.2C15.6217 15.7378 15.285 16.2127 14.8419 16.5741C14.3988 16.9355 13.8659 17.1698 13.3 17.252L8.139 17.99C7.87644 18.0277 7.60966 17.9595 7.39737 17.8004C7.18508 17.6414 7.04466 17.4046 7.007 17.142C6.96934 16.8794 7.03752 16.6127 7.19656 16.4004C7.35559 16.1881 7.59244 16.0477 7.855 16.01L13.017 15.273C13.3035 15.2329 13.5642 15.0856 13.7463 14.8608C13.9284 14.636 14.0184 14.3504 13.9981 14.0618C13.9778 13.7732 13.8487 13.5031 13.6368 13.306C13.425 13.1089 13.1463 12.9995 12.857 13H4ZM11 9.074C10.5468 9.07522 10.1067 8.92137 9.753 8.638C8.041 7.264 6 5.2 6 3.2C5.97545 2.37837 6.27728 1.58044 6.83948 0.980764C7.40168 0.381083 8.17849 0.0284522 9 0C9.74734 0.00291082 10.4644 0.295818 11 0.817C11.5356 0.295818 12.2527 0.00291082 13 0C13.8215 0.0284522 14.5983 0.381083 15.1605 0.980764C15.7227 1.58044 16.0246 2.37837 16 3.2C16 5.2 13.959 7.264 12.246 8.639C11.8924 8.92179 11.4528 9.07527 11 9.074ZM9 2C8.70935 2.02916 8.44175 2.17122 8.25475 2.39562C8.06775 2.62003 7.97627 2.90886 8 3.2C8 4.1 9.151 5.59 11.006 7.079C12.849 5.59 14 4.1 14 3.2C14.0237 2.90886 13.9323 2.62003 13.7453 2.39562C13.5582 2.17122 13.2906 2.02916 13 2C12.7094 2.02916 12.4418 2.17122 12.2547 2.39562C12.0677 2.62003 11.9763 2.90886 12 3.2C12 3.46522 11.8946 3.71957 11.7071 3.90711C11.5196 4.09464 11.2652 4.2 11 4.2C10.7348 4.2 10.4804 4.09464 10.2929 3.90711C10.1054 3.71957 10 3.46522 10 3.2C10.0237 2.90886 9.93225 2.62003 9.74525 2.39562C9.55825 2.17122 9.29065 2.02916 9 2Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e4cc0e] duration-300">
                                        Nonprofit
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        We&apos;re committed to supporting the
                                        important work of non-profits. We&apos;re
                                        here to help you make an impact with
                                        ready-to-go solutions aimed at helping
                                        you move your cause forward.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 31 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#B18D7433] group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#a2745e] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M19 3H5C2.243 3 0 5.243 0 8V16C0 18.757 2.243 21 5 21H19C21.757 21 24 18.757 24 16V8C24 5.243 21.757 3 19 3ZM22 16C22 17.654 20.654 19 19 19H5C3.346 19 2 17.654 2 16V8C2 6.346 3.346 5 5 5H19C20.654 5 22 6.346 22 8V16ZM20 8C20 8.553 19.552 9 19 9H15C14.448 9 14 8.553 14 8C14 7.447 14.448 7 15 7H19C19.552 7 20 7.447 20 8ZM20 12C20 12.553 19.552 13 19 13H15C14.448 13 14 12.553 14 12C14 11.447 14.448 11 15 11H19C19.552 11 20 11.447 20 12ZM18 16C18 16.553 17.552 17 17 17H15C14.448 17 14 16.553 14 16C14 15.447 14.448 15 15 15H17C17.552 15 18 15.447 18 16ZM12.455 10.983C12.563 11.279 12.474 11.611 12.233 11.814L10.459 13.259L11.193 15.494C11.293 15.796 11.192 16.129 10.939 16.324C10.686 16.518 10.338 16.532 10.072 16.358L8.007 15.013L5.976 16.372C5.85 16.457 5.704 16.499 5.559 16.499C5.4 16.499 5.242 16.449 5.109 16.349C4.854 16.158 4.748 15.827 4.843 15.524L5.549 13.262L3.766 11.811C3.526 11.607 3.439 11.276 3.547 10.981C3.655 10.686 3.936 10.49 4.251 10.49H6.502L7.299 8.255C7.408 7.962 7.689 7.767 8.002 7.767C8.315 7.767 8.596 7.962 8.705 8.255L9.502 10.49H11.753C12.068 10.49 12.35 10.687 12.458 10.983H12.455Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300">
                                        Clubs & Associations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        From board members to volunteers, from
                                        special evens to marketing materials,
                                        manage everything your club does from a
                                        single, affordable platform.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 33 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9B38E533] group-hover/menu:bg-[#af59f3]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#af59f3] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M22.9918 2.294C22.9298 2.8 22.4978 3.17 22.0008 3.17C21.9978 3.17 21.9958 3.17 21.9928 3.17C21.9958 4.303 21.9998 5.716 21.9998 5.823C21.9998 7.206 21.5368 7.932 20.9408 7.998C20.3068 8.068 19.4988 6.847 19.4988 6.847C19.4988 6.847 18.6898 8.07 18.0568 7.998C17.4758 7.933 16.9998 7.215 16.9998 5.821C16.9998 5.714 17.0038 4.29 17.0068 3.155C16.5048 3.157 16.0698 2.803 16.0078 2.295C15.9398 1.747 16.3278 1.248 16.8758 1.179C18.7718 0.943 20.2278 0.943 22.1238 1.179C22.6718 1.247 23.0608 1.747 22.9918 2.295V2.294ZM4.99977 5.5C4.99977 2.43 6.42977 1 9.49977 1C12.5698 1 13.9998 2.43 13.9998 5.5C13.9998 8.57 12.5698 10 9.49977 10C6.42977 10 4.99977 8.57 4.99977 5.5ZM6.99977 5.5C6.99977 7.439 7.56077 8 9.49977 8C11.4388 8 11.9998 7.439 11.9998 5.5C11.9998 3.561 11.4388 3 9.49977 3C7.56077 3 6.99977 3.561 6.99977 5.5ZM17.9908 19.63C17.9188 20.177 17.4288 20.563 16.8688 20.491C16.8578 20.49 16.5328 20.448 15.9998 20.389V21.999C15.9998 22.551 15.5528 22.999 14.9998 22.999C14.4468 22.999 13.9998 22.551 13.9998 21.999V20.199C12.6898 20.093 11.0808 19.999 9.49977 19.999C7.91877 19.999 6.30877 20.093 4.99977 20.199V21.999C4.99977 22.551 4.55277 22.999 3.99977 22.999C3.44677 22.999 2.99977 22.551 2.99977 21.999V20.389C2.46677 20.447 2.14177 20.489 2.13077 20.491C1.59377 20.565 1.07877 20.18 1.00877 19.63C0.929766 19.025 1.39477 18.514 1.99977 18.492C2.00177 13.311 4.31577 11 9.49977 11C14.6838 11 16.9968 13.311 16.9998 18.492C17.6048 18.515 18.0708 19.026 17.9908 19.63ZM11.4828 13.148C11.2078 13.657 10.9058 14.077 10.5398 14.428C10.8978 15.405 11.1758 16.531 11.4278 18.04C12.7608 18.092 14.0068 18.186 14.9958 18.278C14.9538 15.074 14.0108 13.588 11.4828 13.148ZM4.00477 18.278C4.99377 18.187 6.23977 18.092 7.57277 18.04C7.82377 16.53 8.10177 15.405 8.46077 14.428C8.09477 14.077 7.79277 13.657 7.51777 13.148C4.98977 13.588 4.04777 15.074 4.00477 18.278Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300">
                                        Political Campaigns
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Fuel your people-powered movement by
                                        centralizing the way you organize and
                                        scale. From fundraising to event
                                        management, get solutions that adapt to
                                        your campaign&apos;s needs.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7f4e3] group-hover/menu:bg-[#289f71]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#289f71] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M23.94 6.59L23.06 10.98C22.59 13.31 20.53 15 18.16 15H6.73C7.15 16.18 8.26 17 9.56 17H19C19.55 17 20 17.45 20 18C20 18.55 19.55 19 19 19H9.56C7.03 19 4.89 17.1 4.59 14.58L3.21 2.88C3.15 2.38 2.72 2 2.22 2H1C0.45 2 0 1.55 0 1C0 0.45 0.45 0 1 0H2.22C3.74 0 5.02 1.14 5.2 2.65L5.24 3H9C9.55 3 10 3.45 10 4C10 4.55 9.55 5 9 5H5.48L6.42 13H18.16C19.58 13 20.82 11.99 21.1 10.59L21.98 6.2C22.04 5.91 21.96 5.6 21.77 5.37C21.58 5.14 21.3 5 21 5H17C16.45 5 16 4.55 16 4C16 3.45 16.45 3 17 3H21C21.9 3 22.75 3.4 23.32 4.1C23.89 4.8 24.12 5.71 23.94 6.59ZM7 20C5.9 20 5 20.9 5 22C5 23.1 5.9 24 7 24C8.1 24 9 23.1 9 22C9 20.9 8.1 20 7 20ZM17 20C15.9 20 15 20.9 15 22C15 23.1 15.9 24 17 24C18.1 24 19 23.1 19 22C19 20.9 18.1 20 17 20ZM9.27 7.25C8.89 7.65 8.92 8.29 9.32 8.66L10.88 10.12C11.47 10.71 12.24 11 13.01 11C13.78 11 14.53 10.71 15.1 10.14L16.69 8.66C17.09 8.28 17.11 7.65 16.74 7.25C16.36 6.85 15.73 6.82 15.33 7.2L14.01 8.43V1C14.01 0.45 13.56 0 13.01 0C12.46 0 12.01 0.45 12.01 1V8.43L10.69 7.2C10.29 6.82 9.65 6.85 9.28 7.25H9.27Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#289f71] duration-300">
                                        Procurement
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        {`Understand your organization’s spend and
                                        ensure it's properly aligned with
                                        business goals. Say "goodbye" to
                                        spreadsheets, forms and lost approvals.
                                        Get everything you need to tackle
                                        purchasing workflows, analyze budgets,
                                        manage vendors and handle the approval
                                        process.`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="hidden lg:block bg-[#F8F9FA] pr-[16px] pb-[16px] pl-[16px] pt-[24px]">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                                    fill="#484848"
                                  />
                                </svg>
                                <h6 className="text-[14px]">Whats New</h6>
                              </div>

                              <div className="p-[12px]">
                                <Image
                                  src="/images/megamenu/banner-1.jpg"
                                  alt="banner"
                                  height={0}
                                  width={0}
                                  style={{ height: "auto", width: "auto" }}
                                  className="max-w-[100%] rounded-[20px] border border-[#E5E7EB]"
                                />
                                <h6 className="text-[16px] font-medium mt-[20px]">
                                  Overview of latest features!
                                </h6>
                                <a
                                  className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-2"
                                  href="#"
                                >
                                  {" "}
                                  Start Free Trail
                                  <svg
                                    className="w-[12px] fill-[#359cf0]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    )}
                  </li>

                  <li
                    className="group menu-mobile-item py-[20px] hidden"
                    onClick={() => toggleMobileMenu("features")}
                  >
                    <div className="flex gap-2 cursor-pointer items-center justify-between transition-all duration-200 group-hover:text-[#359cf0] ">
                      <p className="menu-mobile-active-1">Features</p>
                      {activeMenu === "features" ? (
                        <svg
                          className="w-[12px] group-hover:fill-[#359cf0] rotate-0 duration-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-[12px] group-hover:fill-[#359cf0] -rotate-90 duration-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      )}
                    </div>
                    {activeMenu === "features" && (
                      <ul className="menu-child bg-white z-50 transition-all duration-200  ">
                        <div className="mx-auto max-w-[1440px] xl:max-w-[1632px]">
                          <div className="lg:grid md:grid-cols-3 relative mt-[24px] border-t border-[#ddd]">
                            <div className="lg:col-span-2 sm:pr-[12px] md:pr-[26px] pb-0 pt-[24px]   min-h-[380px]">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                                    stroke="#484848"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <h6 className="text-[14px] uppercase">
                                  Explore features
                                </h6>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] max-h-[370px] pr-[10px] sm:px-[10px] pb-[14px] overflow-y-auto">
                                {/* <!-- 1 --> */}
                                <div className="relative rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#E2498A33] group-hover/menu:bg-[#ed79ae]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#ed79ae] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2736_33486)">
                                          <path d="M15.999 15.5C15.811 15.5 15.62 15.447 15.451 15.336L11.451 12.708C11.17 12.522 11 12.209 11 11.872V7C11 6.447 11.447 6 12 6C12.553 6 13 6.447 13 7V11.333L16.549 13.664C17.011 13.968 17.139 14.588 16.836 15.049C16.644 15.342 16.324 15.5 15.999 15.5ZM12.714 21.975C12.478 21.992 12.24 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C15.151 2 18.112 3.512 19.988 6H17C16.447 6 16 6.447 16 7C16 7.553 16.447 8 17 8H21C22.103 8 23 7.103 23 6V2C23 1.447 22.553 1 22 1C21.447 1 21 1.447 21 2V4.104C18.743 1.543 15.473 0 12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C12.288 24 12.573 23.989 12.856 23.969C13.407 23.93 13.822 23.451 13.782 22.901C13.743 22.351 13.27 21.926 12.714 21.975ZM23 11C22.447 11 22 11.447 22 12C22 12.455 21.969 12.913 21.908 13.36C21.834 13.908 22.218 14.412 22.764 14.486C22.81 14.492 22.855 14.495 22.9 14.495C23.393 14.495 23.822 14.131 23.89 13.63C23.962 13.094 23.999 12.545 23.999 12C23.999 11.447 23.553 11 23 11ZM22.137 16.396C21.653 16.128 21.044 16.308 20.78 16.792C20.563 17.188 20.316 17.574 20.045 17.94C19.717 18.384 19.812 19.01 20.255 19.339C20.435 19.471 20.643 19.534 20.849 19.534C21.156 19.534 21.458 19.393 21.655 19.129C21.978 18.69 22.275 18.227 22.535 17.752C22.801 17.268 22.623 16.66 22.139 16.395L22.137 16.396ZM17.406 20.416C17.023 20.662 16.623 20.883 16.215 21.072C15.714 21.305 15.496 21.899 15.729 22.4C15.899 22.765 16.259 22.979 16.637 22.979C16.778 22.979 16.921 22.95 17.057 22.886C17.548 22.657 18.03 22.393 18.489 22.097C18.954 21.798 19.088 21.18 18.789 20.715C18.49 20.252 17.871 20.118 17.407 20.415L17.406 20.416Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2736_33486">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#ff66ae] duration-300">
                                        Activity History
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Activity History automatically tracks
                                        every action in Jugl. Know what your
                                        teammates are working on and what
                                        changes they’ve made, in real-time.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 2 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#48daff33] group-hover/menu:bg-[#48daff] rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#48daff] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2747_33576)">
                                          <path d="M21.0825 11.4854C20.6822 11.4854 20.3577 11.8099 20.3577 12.2102V16.2691C20.3577 17.4594 19.3897 18.4275 18.1994 18.4275H11.7888C11.6262 18.4275 11.4683 18.4822 11.3411 18.5821L7.31112 21.7608V19.1515C7.31112 18.7512 6.98657 18.4266 6.58631 18.4266H3.78372C2.59342 18.4266 1.6254 17.4586 1.6254 16.2683V7.22513C1.6254 6.03483 2.59342 5.06681 3.78372 5.06681H13.2223C13.6226 5.06681 13.9472 4.74225 13.9472 4.342C13.9472 3.94174 13.6226 3.61719 13.2223 3.61719H3.78372C1.79452 3.61719 0.175781 5.23593 0.175781 7.22513V16.2691C0.175781 18.2583 1.79452 19.8771 3.78372 19.8771H5.8615V21.7616C5.8615 22.3156 6.17237 22.8125 6.67168 23.0566C6.87543 23.1564 7.09287 23.2056 7.30951 23.2056C7.62601 23.2056 7.93848 23.1009 8.20103 22.8955L12.0393 19.8771H18.1986C20.1878 19.8771 21.8065 18.2583 21.8065 16.2691V12.2102C21.8073 11.8091 21.4827 11.4854 21.0825 11.4854Z" />
                                          <path d="M11.7891 18.4277L11.668 18.4375C11.549 18.4576 11.4362 18.5072 11.3408 18.582L7.31152 21.7607V19.1514C7.31148 18.8012 7.06263 18.509 6.73242 18.4414L6.58594 18.4268V18.1768C7.12424 18.1768 7.56148 18.6131 7.56152 19.1514V21.2441L11.1865 18.3857L11.3223 18.2959C11.4644 18.2186 11.6251 18.1777 11.7891 18.1777V18.4277ZM18.1992 18.1777V18.4277H11.7891V18.1777H18.1992ZM20.1074 16.2695V12.21C20.1076 11.6719 20.544 11.2356 21.082 11.2354C21.6198 11.2354 22.0573 11.6705 22.0566 12.21V16.2695C22.0564 18.3966 20.3254 20.127 18.1982 20.127H12.125L8.35547 23.0918V23.0928C8.04893 23.3326 7.68183 23.4551 7.30957 23.4551C7.11854 23.4551 6.92728 23.4229 6.74316 23.3574L6.56152 23.2812C5.97694 22.9954 5.61138 22.4115 5.61133 21.7617V20.127H3.78418C1.65704 20.127 -0.0740009 18.3966 -0.0742188 16.2695V7.22559C-0.0742188 5.09832 1.65691 3.36719 3.78418 3.36719V3.61719C1.79498 3.61719 0.175781 5.23639 0.175781 7.22559V16.2695L0.180664 16.4541C0.274188 18.2964 1.75636 19.7785 3.59863 19.8721L3.78418 19.877H5.86133V21.7617L5.87598 21.9658C5.94218 22.4356 6.23484 22.8431 6.67188 23.0566C6.82474 23.1315 6.98531 23.1778 7.14746 23.1963L7.30957 23.2051C7.58656 23.2051 7.86054 23.1255 8.10059 22.9678L8.20117 22.8955L12.0391 19.877H18.1982L18.3838 19.8721C20.226 19.7784 21.7082 18.2963 21.8018 16.4541L21.8066 16.2695V12.21C21.8072 11.8591 21.5587 11.5674 21.2285 11.5L21.082 11.4854C20.6821 11.4856 20.3576 11.81 20.3574 12.21V16.2695L20.3467 16.4893C20.2435 17.504 19.4346 18.3126 18.4199 18.416L18.1992 18.4277V18.1777C19.2513 18.1777 20.1072 17.3216 20.1074 16.2695ZM6.58594 18.1768V18.4268H3.78418V18.1768H6.58594ZM1.625 16.2686V7.22559C1.625 6.10964 2.47629 5.18877 3.56348 5.07812L3.78418 5.06641H13.2227L13.3682 5.05176C13.6513 4.99389 13.8746 4.77133 13.9326 4.48828L13.9473 4.3418C13.9472 3.99158 13.6985 3.69932 13.3682 3.63184L13.2227 3.61719V3.36719C13.7608 3.36736 14.1972 3.80367 14.1973 4.3418C14.1973 4.88002 13.7608 5.31624 13.2227 5.31641H3.78418C2.73195 5.31641 1.875 6.17336 1.875 7.22559V16.2686C1.87512 17.3207 2.73203 18.1768 3.78418 18.1768V18.4268L3.56348 18.415C2.54864 18.3117 1.73987 17.5032 1.63672 16.4883L1.625 16.2686ZM13.2227 3.36719V3.61719H3.78418V3.36719H13.2227Z" />
                                          <path
                                            d="M14.8086 9.37109C15.2777 9.37119 15.6581 9.75157 15.6582 10.2207C15.6582 10.6899 15.2778 11.0702 14.8086 11.0703H5.87695C5.40775 11.0702 5.02734 10.6899 5.02734 10.2207C5.02745 9.75157 5.40782 9.3712 5.87695 9.37109H14.8086Z"
                                            stroke-width="0.25"
                                          />
                                          <path
                                            d="M9.4707 12.4219C9.93974 12.4221 10.3202 12.8024 10.3203 13.2715C10.3203 13.7406 9.93981 14.1209 9.4707 14.1211H5.87988C5.41068 14.121 5.03027 13.7407 5.03027 13.2715C5.03038 12.8024 5.41075 12.422 5.87988 12.4219H9.4707Z"
                                            stroke-width="0.25"
                                          />
                                          <path d="M19.665 1.24512C17.1781 1.24512 15.1543 3.26814 15.1543 5.75584C15.1543 8.24355 17.1773 10.2666 19.665 10.2666C22.1527 10.2666 24.1758 8.24274 24.1758 5.75504C24.1758 3.26733 22.1527 1.24512 19.665 1.24512ZM19.665 8.81615C17.977 8.81615 16.6039 7.44304 16.6039 5.75504C16.6039 4.06704 17.977 2.69393 19.665 2.69393C21.353 2.69393 22.7261 4.06784 22.7261 5.75504C22.7261 7.44223 21.353 8.81615 19.665 8.81615Z" />
                                          <path d="M20.4967 4.54658L19.221 5.575L18.948 5.22709C18.7008 4.9122 18.2449 4.85744 17.9301 5.10388C17.6152 5.35112 17.5596 5.80694 17.8068 6.12183L18.5333 7.04797C18.6533 7.20018 18.8288 7.29924 19.0213 7.32099C19.0487 7.32421 19.0761 7.32582 19.1034 7.32582C19.2685 7.32582 19.4288 7.26944 19.5585 7.16556L21.4059 5.67648C21.7176 5.42521 21.7667 4.96938 21.5154 4.65691C21.265 4.34524 20.8084 4.29612 20.4967 4.54658Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2747_33576">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#48daff] duration-300">
                                        Availability Status
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Let other team members know what you’re
                                        working on, if you’re available, or if
                                        you’re busy with Availability Status.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 3 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#7156DC2E] group-hover/menu:bg-[#9e97ee]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#9e97ee] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2744_33486)">
                                          <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                          <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" />
                                          <path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" />
                                          <path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2744_33486">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#9e97ee] duration-300">
                                        Calendar View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        View records in a calendar format of
                                        your choosing, sorted by a date or date
                                        range.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 4 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9C64862E] group-hover/menu:bg-[#b381a2]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#b381a2] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2746_33491)">
                                          <path d="M11 11H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0L11 0V11ZM2 9H9V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V9Z" />
                                          <path d="M24 11H13V0H21C21.7956 0 22.5587 0.31607 23.1213 0.87868C23.6839 1.44129 24 2.20435 24 3V11ZM15 9H22V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2H15V9Z" />
                                          <path d="M11 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.31607 22.5587 0 21.7956 0 21L0 13H11V24ZM2 15V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H9V15H2Z" />
                                          <path d="M21 24H13V13H24V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24ZM15 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V15H15V22Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2746_33491">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b381a2] duration-300">
                                        Card View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        View your data as visual cards that can
                                        include logos, images, PDFs, documents,
                                        spreadsheets, and other rich content.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 5 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#FBB57E30] group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#f8853f] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2746_33503)">
                                          <path d="M23 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H23C23.2652 24 23.5196 23.8946 23.7071 23.7071C23.8946 23.5196 24 23.2652 24 23C24 22.7348 23.8946 22.4804 23.7071 22.2929C23.5196 22.1054 23.2652 22 23 22Z" />
                                          <path d="M6 20C6.26522 20 6.51957 19.8946 6.70711 19.7071C6.89464 19.5196 7 19.2652 7 19V12C7 11.7348 6.89464 11.4804 6.70711 11.2929C6.51957 11.1054 6.26522 11 6 11C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12V19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20Z" />
                                          <path d="M10 10V19C10 19.2652 10.1054 19.5196 10.2929 19.7071C10.4804 19.8946 10.7348 20 11 20C11.2652 20 11.5196 19.8946 11.7071 19.7071C11.8946 19.5196 12 19.2652 12 19V10C12 9.73478 11.8946 9.48043 11.7071 9.29289C11.5196 9.10536 11.2652 9 11 9C10.7348 9 10.4804 9.10536 10.2929 9.29289C10.1054 9.48043 10 9.73478 10 10Z" />
                                          <path d="M15 13V19C15 19.2652 15.1054 19.5196 15.2929 19.7071C15.4804 19.8946 15.7348 20 16 20C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V13C17 12.7348 16.8946 12.4804 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12C15.7348 12 15.4804 12.1054 15.2929 12.2929C15.1054 12.4804 15 12.7348 15 13Z" />
                                          <path d="M20 9V19C20 19.2652 20.1054 19.5196 20.2929 19.7071C20.4804 19.8946 20.7348 20 21 20C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V9C22 8.73478 21.8946 8.48043 21.7071 8.29289C21.5196 8.10536 21.2652 8 21 8C20.7348 8 20.4804 8.10536 20.2929 8.29289C20.1054 8.48043 20 8.73478 20 9Z" />
                                          <path d="M5.99979 9.00041C6.26498 9.00035 6.51929 8.89496 6.70679 8.70741L10.2928 5.12141C10.4834 4.93983 10.7365 4.83855 10.9998 4.83855C11.263 4.83855 11.5162 4.93983 11.7068 5.12141L13.8788 7.29341C14.4414 7.85582 15.2043 8.17177 15.9998 8.17177C16.7953 8.17177 17.5582 7.85582 18.1208 7.29341L23.7068 1.70741C23.8889 1.5188 23.9897 1.2662 23.9875 1.00401C23.9852 0.741809 23.88 0.490997 23.6946 0.305589C23.5092 0.12018 23.2584 0.0150115 22.9962 0.0127331C22.734 0.0104547 22.4814 0.111249 22.2928 0.293407L16.7068 5.87841C16.5193 6.06588 16.265 6.17119 15.9998 6.17119C15.7346 6.17119 15.4803 6.06588 15.2928 5.87841L13.1208 3.70741C12.5582 3.14499 11.7953 2.82905 10.9998 2.82905C10.2043 2.82905 9.44137 3.14499 8.87879 3.70741L5.29279 7.29341C5.15298 7.43326 5.05777 7.61142 5.0192 7.80538C4.98064 7.99933 5.00044 8.20036 5.07611 8.38306C5.15178 8.56576 5.27992 8.72192 5.44433 8.83181C5.60874 8.94169 5.80204 9.00037 5.99979 9.00041Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2746_33503">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300">
                                        Chart View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Visualize your data with multiple chart
                                        types, from bar and line charts to
                                        bubble, heat map, scatter, donut and
                                        more.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 6 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2746_33510)">
                                          <path d="M24 15.9998V20.9998C24 22.6568 22.657 23.9998 21 23.9998H16C13.045 23.9998 10.465 22.3848 9.08 19.9958C9.849 19.9898 10.598 19.9048 11.322 19.7478C12.423 21.1188 14.109 21.9998 16 21.9998H21C21.552 21.9998 22 21.5518 22 20.9998V15.9998C22 14.1088 21.119 12.4228 19.748 11.3218C19.904 10.5978 19.99 9.84878 19.996 9.07978C22.385 10.4648 24 13.0448 24 15.9998ZM8.138 17.9998H3.661C1.642 17.9998 0 16.3548 0 14.3338V9.29578C0 4.58878 3.823 0.34278 8.349 0.0227797C13.664 -0.48222 18.475 4.33778 17.977 9.65078C17.646 14.3328 13.325 17.9998 8.138 17.9998ZM15.982 9.51078C16.349 5.56078 12.945 1.91378 8.988 1.99978C5.253 1.96178 2.001 5.42278 2 9.29578V14.3338C2 15.2528 2.745 15.9998 3.661 15.9998H8.138C12.211 15.9998 15.73 13.0888 15.982 9.51078ZM9 7.49978C8.172 7.49978 7.5 8.17178 7.5 8.99978C7.5 9.82778 8.172 10.4998 9 10.4998C9.828 10.4998 10.5 9.82778 10.5 8.99978C10.5 8.17178 9.828 7.49978 9 7.49978ZM5 7.49978C4.172 7.49978 3.5 8.17178 3.5 8.99978C3.5 9.82778 4.172 10.4998 5 10.4998C5.828 10.4998 6.5 9.82778 6.5 8.99978C6.5 8.17178 5.828 7.49978 5 7.49978ZM13 7.49978C12.172 7.49978 11.5 8.17178 11.5 8.99978C11.5 9.82778 12.172 10.4998 13 10.4998C13.828 10.4998 14.5 9.82778 14.5 8.99978C14.5 8.17178 13.828 7.49978 13 7.49978Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2746_33510">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                        Communication Center
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Communicate with your team right where
                                        your work is being performed.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 7 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#B18D7433] group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#a2745e] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2753_33593)">
                                          <path d="M23.121 0.879C21.951 -0.291 20.049 -0.291 18.879 0.879L12.172 7.586C11.416 8.341 11 9.346 11 10.414V12C11 12.552 11.447 13 12 13H13.586C14.654 13 15.659 12.583 16.414 11.828L23.121 5.121C24.285 4.004 24.285 1.996 23.121 0.879ZM21.707 3.707L15 10.414C14.622 10.792 14.12 11 13.586 11H13V10.414C13 9.888 13.214 9.372 13.586 9L20.293 2.293C20.684 1.903 21.316 1.903 21.707 2.293C22.095 2.665 22.095 3.335 21.707 3.707ZM12 18C11.447 18 11 17.553 11 17C11 16.447 11.447 16 12 16H15C15.553 16 16 16.447 16 17C16 17.553 15.553 18 15 18H12ZM20 14V19C20 21.757 17.757 24 15 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H14C14.553 0 15 0.448 15 1C15 1.552 14.553 2 14 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H15C16.654 22 18 20.654 18 19V14C18 13.447 18.447 13 19 13C19.553 13 20 13.447 20 14ZM9.167 11.667L7.48 13.354C7.049 13.785 6.485 14.002 5.919 14.002C5.386 14.002 4.853 13.809 4.428 13.42L3.759 12.841C3.342 12.479 3.297 11.847 3.658 11.43C4.021 11.011 4.652 10.969 5.069 11.329L5.758 11.927C5.861 12.02 5.986 12.019 6.065 11.94L7.752 10.253C8.143 9.862 8.775 9.862 9.166 10.253C9.557 10.644 9.558 11.276 9.167 11.667ZM9.167 6.707L7.48 8.394C7.049 8.825 6.485 9.042 5.919 9.042C5.386 9.042 4.853 8.849 4.428 8.46L3.759 7.881C3.342 7.519 3.297 6.887 3.658 6.47C4.021 6.052 4.652 6.009 5.069 6.369L5.758 6.967C5.861 7.061 5.986 7.059 6.065 6.98L7.752 5.293C8.143 4.902 8.775 4.902 9.166 5.293C9.557 5.684 9.558 6.316 9.167 6.707ZM9.167 15.253C9.558 15.644 9.558 16.276 9.167 16.667L7.48 18.354C7.049 18.785 6.485 19.002 5.919 19.002C5.386 19.002 4.853 18.809 4.428 18.42L3.759 17.841C3.342 17.479 3.297 16.848 3.658 16.43C4.021 16.013 4.652 15.968 5.069 16.329L5.758 16.927C5.861 17.02 5.986 17.019 6.065 16.94L7.752 15.253C8.143 14.862 8.776 14.862 9.167 15.253Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2753_33593">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300">
                                        Create New Workflows
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        In Jugl, Solutions drive projects to
                                        completion and keep work flowing through
                                        processes. Get a jumpstart with one of
                                        our templates, or create entirely new
                                        solutions to support your unique needs.
                                        Simply work the way you want.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 8 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M14 10C14 11.019 13.692 11.964 13.168 12.754L10.293 9.879C10.105 9.691 10 9.437 10 9.172V5.101C12.282 5.564 14 7.581 14 10ZM8 9.586V5.101C5.45 5.619 3.604 8.077 4.073 10.868C4.398 12.802 5.893 14.411 7.802 14.86C9.272 15.205 10.662 14.893 11.754 14.169L8.585 11C8.21 10.625 8 10.116 8 9.586ZM19 5H17C16.447 5 16 5.448 16 6C16 6.552 16.447 7 17 7H19C19.553 7 20 6.552 20 6C20 5.448 19.553 5 19 5ZM19 9H17C16.447 9 16 9.448 16 10C16 10.552 16.447 11 17 11H19C19.553 11 20 10.552 20 10C20 9.448 19.553 9 19 9ZM19 13H17C16.447 13 16 13.448 16 14C16 14.552 16.447 15 17 15H19C19.553 15 20 14.552 20 14C20 13.448 19.553 13 19 13ZM24 6V14C24 16.757 21.757 19 19 19H13V21H17C17.553 21 18 21.448 18 22C18 22.552 17.553 23 17 23H7C6.447 23 6 22.552 6 22C6 21.448 6.447 21 7 21H11V19H5C2.243 19 0 16.757 0 14V6C0 3.243 2.243 1 5 1H19C21.757 1 24 3.243 24 6ZM22 6C22 4.346 20.654 3 19 3H5C3.346 3 2 4.346 2 6V14C2 15.654 3.346 17 5 17H19C20.654 17 22 15.654 22 14V6Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                        Dashboards
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Build powerful, visually thrilling views
                                        into your information. Gain visual
                                        insight into the performance of any
                                        team, process or project, and make
                                        smarter business decisions.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 9 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9B38E533] group-hover/menu:bg-[#af59f3]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#af59f3] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M19.949 5.536L16.465 2.05C15.142 0.728 13.384 0 11.515 0H7C4.243 0 2 2.243 2 5V11C2 11.552 2.447 12 3 12C3.553 12 4 11.552 4 11V5C4 3.346 5.346 2 7 2H11.515C11.678 2 11.84 2.008 12 2.023V7C12 8.654 13.346 10 15 10H19.977C19.992 10.16 20 10.322 20 10.485V19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19C4 18.448 3.553 18 3 18C2.447 18 2 18.448 2 19C2 21.757 4.243 24 7 24H17C19.757 24 22 21.757 22 19V10.485C22 8.614 21.271 6.858 19.949 5.536ZM15 8C14.448 8 14 7.551 14 7V2.659C14.38 2.877 14.733 3.146 15.051 3.464L18.535 6.95C18.853 7.267 19.122 7.62 19.34 8H14.999H15ZM10.398 16H1C0.447 16 0 15.552 0 15C0 14.448 0.447 14 1 14H10.398L9.105 12.707C8.714 12.316 8.714 11.683 9.105 11.293C9.496 10.902 10.128 10.902 10.519 11.293L12.132 12.907C13.286 14.061 13.286 15.939 12.132 17.094L10.519 18.708C10.324 18.903 10.068 19.001 9.812 19.001C9.556 19.001 9.3 18.903 9.105 18.708C8.714 18.318 8.714 17.685 9.105 17.294L10.398 16Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300">
                                        Data Import
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Quickly import your data into Jugl from
                                        spreadsheets, contacts, calendars, and
                                        more.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 10 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8A8A8A30] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33599)">
                                          <path d="M9.28804 13.0668C6.97104 13.5128 5.82304 16.0928 5.32504 17.7008C5.27808 17.8507 5.26708 18.0095 5.29294 18.1644C5.31881 18.3194 5.3808 18.466 5.4739 18.5925C5.567 18.719 5.68859 18.8218 5.82882 18.8926C5.96905 18.9633 6.12398 19.0001 6.28104 18.9998H10C10.4172 18.9999 10.8297 18.9129 11.2113 18.7446C11.593 18.5763 11.9353 18.3302 12.2165 18.0221C12.4977 17.714 12.7115 17.3507 12.8444 16.9553C12.9772 16.5599 13.0261 16.1411 12.988 15.7258C12.9349 15.3014 12.7947 14.8925 12.5762 14.5248C12.3577 14.1571 12.0657 13.8384 11.7183 13.5888C11.371 13.3392 10.9758 13.164 10.5577 13.0742C10.1395 12.9843 9.70725 12.9818 9.28804 13.0668Z" />
                                          <path d="M23 8.979C22.7348 8.979 22.4804 9.08436 22.2929 9.27189C22.1054 9.45943 22 9.71378 22 9.979V15H18C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18V22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H16.042C16.3072 2 16.5616 1.89464 16.7491 1.70711C16.9366 1.51957 17.042 1.26522 17.042 1C17.042 0.734784 16.9366 0.48043 16.7491 0.292893C16.5616 0.105357 16.3072 0 16.042 0L5 0C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H16.343C16.9998 24.0019 17.6504 23.8734 18.2572 23.6221C18.8639 23.3708 19.4149 23.0017 19.878 22.536L22.536 19.878C23.0017 19.4149 23.3708 18.8639 23.6221 18.2572C23.8734 17.6504 24.0019 16.9998 24 16.343V9.979C24 9.71378 23.8946 9.45943 23.7071 9.27189C23.5196 9.08436 23.2652 8.979 23 8.979ZM18.464 21.122C18.0607 21.5208 17.5534 21.798 17 21.922V18C17 17.7348 17.1054 17.4804 17.2929 17.2929C17.4804 17.1054 17.7348 17 18 17H21.925C21.801 17.5534 21.5238 18.0607 21.125 18.464L18.464 21.122Z" />
                                          <path d="M14.5661 14.1697C14.3684 14.1697 14.1751 14.111 14.0107 14.0011C13.8462 13.8912 13.7181 13.7351 13.6424 13.5524C13.5668 13.3697 13.547 13.1686 13.5855 12.9747C13.6241 12.7807 13.7193 12.6026 13.8591 12.4627L21.7121 4.60971C21.7999 4.52212 21.8695 4.41807 21.917 4.30354C21.9646 4.189 21.989 4.06621 21.989 3.94221C21.989 3.81821 21.9646 3.69542 21.917 3.58088C21.8695 3.46634 21.7999 3.3623 21.7121 3.27471C21.6228 3.18189 21.5147 3.1093 21.395 3.06186C21.2752 3.01442 21.1467 2.99323 21.0181 2.99971C20.8896 3.0025 20.763 3.03184 20.6463 3.08587C20.5296 3.13991 20.4254 3.21748 20.3401 3.31371L12.7401 11.7207C12.5623 11.9175 12.3136 12.0356 12.0487 12.049C11.7838 12.0624 11.5244 11.97 11.3276 11.7922C11.1308 11.6144 11.0127 11.3657 10.9993 11.1008C10.9859 10.8359 11.0783 10.5765 11.2561 10.3797L18.8561 1.97971C19.1226 1.68217 19.4468 1.44189 19.809 1.27343C20.1712 1.10497 20.5638 1.01184 20.9631 0.999709C21.363 0.991139 21.7606 1.06303 22.1321 1.21111C22.5037 1.35919 22.8417 1.58044 23.1261 1.86171C23.6774 2.41419 23.9869 3.16276 23.9869 3.94321C23.9869 4.72365 23.6774 5.47223 23.1261 6.02471L15.2731 13.8777C15.1804 13.9707 15.0702 14.0444 14.9489 14.0945C14.8275 14.1446 14.6974 14.1702 14.5661 14.1697Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33599">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300">
                                        Document Designer
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Seamlessly create professional and
                                        visually stunning documents, such as
                                        invoices, contracts, business cards,
                                        product sheets, brochures, HR policies
                                        and more - right from your Jugl records.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 11 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#1FC6A830] group-hover/menu:bg-[#35ccae]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#35ccae] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M22 14C22 14.552 21.553 15 21 15H9C8.448 15 8 14.552 8 14C8 13.448 8.448 13 9 13H21C21.553 13 22 13.448 22 14ZM5 12H3C2.448 12 2 12.448 2 13V15C2 15.552 2.448 16 3 16H5C5.552 16 6 15.552 6 15V13C6 12.448 5.552 12 5 12ZM21 19H9C8.448 19 8 19.448 8 20C8 20.552 8.448 21 9 21H21C21.553 21 22 20.552 22 20C22 19.448 21.553 19 21 19ZM5 18H3C2.448 18 2 18.448 2 19V21C2 21.552 2.448 22 3 22H5C5.552 22 6 21.552 6 21V19C6 18.448 5.552 18 5 18ZM24 4V6C24 8.206 22.206 10 20 10H4C1.794 10 0 8.206 0 6V4C0 1.794 1.794 0 4 0H20C22.206 0 24 1.794 24 4ZM22 4C22 2.897 21.103 2 20 2H4C2.897 2 2 2.897 2 4V6C2 7.103 2.897 8 4 8H20C21.103 8 22 7.103 22 6V4ZM19.114 3.5H14.857C14.16 3.5 13.814 4.346 14.311 4.834L16.169 6.659C16.624 7.114 17.346 7.114 17.801 6.659L19.659 4.834C20.157 4.345 19.812 3.5 19.114 3.5Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#35ccae] duration-300">
                                        Field Types
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        With more than 40 different field types,
                                        we’re the most versatile of any
                                        platform. Jugl supports everything from
                                        text and numbers to sophisticated
                                        formulas and links to other records.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 12 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dcf7d0] group-hover/menu:bg-[#6dd348]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6dd348] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33605)">
                                          <path d="M22.7 14.139L21.29 14.952C20.685 14.3 19.897 13.826 19.001 13.621V12H17.001V13.621C16.105 13.826 15.316 14.299 14.712 14.952L13.302 14.139L12.303 15.871L13.72 16.687C13.591 17.105 13.502 17.54 13.502 17.999C13.502 18.458 13.591 18.894 13.72 19.311L12.303 20.127L13.302 21.859L14.712 21.046C15.317 21.698 16.105 22.172 17.001 22.377V23.998H19.001V22.377C19.897 22.172 20.686 21.699 21.29 21.046L22.7 21.859L23.699 20.127L22.282 19.311C22.411 18.893 22.5 18.458 22.5 17.999C22.5 17.54 22.411 17.104 22.282 16.687L23.699 15.871L22.7 14.139ZM18 20.5C16.622 20.5 15.5 19.379 15.5 18C15.5 16.621 16.622 15.5 18 15.5C19.378 15.5 20.5 16.621 20.5 18C20.5 19.379 19.378 20.5 18 20.5ZM21 7H19V3.486L15.515 0H8C6.346 0 5 1.346 5 3V5H3C1.346 5 0 6.346 0 8V24H12.721C12.072 23.429 11.524 22.751 11.087 22H2V13H11.76C12.411 12.189 13.214 11.507 14.13 11H2V8C2 7.448 2.449 7 3 7H7.764L11.764 9H21C21.551 9 22 9.448 22 10V11.087C22.751 11.524 23.429 12.072 24 12.721V10C24 8.346 22.654 7 21 7ZM8.236 5H7V3C7 2.448 7.449 2 8 2H14V5H17V7H12.236L8.236 5Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33605">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6dd348] duration-300">
                                        File Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        With Jugl’s File Management system,
                                        manage files directly in your workflows.
                                        Free yourself of desktop folders, more
                                        folders in your work management tool,
                                        then more folders in your cloud storage.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 13 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#687FFF30] group-hover/menu:bg-[#5b67f9]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#5b67f9] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33607)">
                                          <path d="M10 10C9.20435 10 8.44129 10.3161 7.87868 10.8787C7.31607 11.4413 7 12.2044 7 13C7 13.7957 7.31607 14.5587 7.87868 15.1213C8.44129 15.6839 9.20435 16 10 16H14C14.7956 16 15.5587 15.6839 16.1213 15.1213C16.6839 14.5587 17 13.7957 17 13C17 12.2044 16.6839 11.4413 16.1213 10.8787C15.5587 10.3161 14.7956 10 14 10H10ZM15 13C15 13.2652 14.8946 13.5196 14.7071 13.7071C14.5196 13.8947 14.2652 14 14 14H10C9.73478 14 9.48043 13.8947 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13C9 12.7348 9.10536 12.4804 9.29289 12.2929C9.48043 12.1054 9.73478 12 10 12H14C14.2652 12 14.5196 12.1054 14.7071 12.2929C14.8946 12.4804 15 12.7348 15 13ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8947 16.2652 20 16 20H8C7.73478 20 7.48043 19.8947 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19C7 18.7348 7.10536 18.4804 7.29289 18.2929C7.48043 18.1054 7.73478 18 8 18H16C16.2652 18 16.5196 18.1054 16.7071 18.2929C16.8946 18.4804 17 18.7348 17 19ZM19.536 3.12102L17.878 1.46502C17.4149 0.999267 16.864 0.629977 16.2572 0.378513C15.6504 0.127049 14.9998 -0.00159798 14.343 1.49812e-05H8C6.67441 0.00160284 5.40356 0.528897 4.46622 1.46624C3.52888 2.40357 3.00159 3.67442 3 5.00002V19C3.00159 20.3256 3.52888 21.5965 4.46622 22.5338C5.40356 23.4711 6.67441 23.9984 8 24H16C17.3256 23.9984 18.5964 23.4711 19.5338 22.5338C20.4711 21.5965 20.9984 20.3256 21 19V6.65702C21.0019 6.0001 20.8735 5.34934 20.6222 4.74238C20.3709 4.13543 20.0017 3.58435 19.536 3.12102ZM18.122 4.53502C18.2627 4.67744 18.3893 4.83317 18.5 5.00002H16V2.50002C16.1671 2.60954 16.3226 2.73587 16.464 2.87702L18.122 4.53502ZM19 19C19 19.7957 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7957 5 19V5.00002C5 4.20437 5.31607 3.4413 5.87868 2.8787C6.44129 2.31609 7.20435 2.00002 8 2.00002H14V5.00002C14 5.53045 14.2107 6.03916 14.5858 6.41423C14.9609 6.7893 15.4696 7.00002 16 7.00002H19V19Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33607">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#5b67f9] duration-300">
                                        Forms
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Collect data from external users with
                                        Jugl Forms. You can share a link to a
                                        responsive form view or embed it in your
                                        existing Website to make it easy to
                                        onboard customers, accept applications,
                                        collect feedback and more.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 14 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#C78EA430] group-hover/menu:bg-[#ba7a91]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#ba7a91] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33609)">
                                          <path d="M19 0H5C2.243 0 0 2.243 0 5V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM22 19C22 20.654 20.654 22 19 22H5C3.346 22 2 20.654 2 19V5C2 3.346 3.346 2 5 2H19C20.654 2 22 3.346 22 5V19ZM9 8V11H10C10.552 11 11 11.447 11 12C11 12.553 10.552 13 10 13H9V18C9 18.553 8.552 19 8 19C7.448 19 7 18.553 7 18V13H6C5.448 13 5 12.553 5 12C5 11.447 5.448 11 6 11H7V8C7 6.346 8.346 5 10 5C10.552 5 11 5.447 11 6C11 6.553 10.552 7 10 7C9.448 7 9 7.448 9 8ZM18.832 12.555L17.202 15L18.832 17.445C19.138 17.905 19.014 18.525 18.555 18.832C18.385 18.945 18.192 19 18.001 19C17.678 19 17.361 18.844 17.168 18.555L16 16.803L14.832 18.555C14.639 18.844 14.322 19 13.999 19C13.809 19 13.616 18.945 13.445 18.832C12.986 18.525 12.862 17.905 13.168 17.445L14.798 15L13.168 12.555C12.862 12.095 12.986 11.475 13.445 11.168C13.904 10.861 14.525 10.986 14.832 11.445L16 13.197L17.168 11.445C17.474 10.986 18.094 10.861 18.555 11.168C19.014 11.475 19.138 12.095 18.832 12.555Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33609">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a45e73] duration-300">
                                        Formulas
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Your spreadsheets, just a bit smarter.
                                        Calculate values based on other fields
                                        using simple functions or advanced
                                        logic.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 15 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#FBB57E30] group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#f8853f] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33611)">
                                          <path d="M24 22.5C24 23.33 23.33 24 22.5 24H5.5C2.47 24 0 21.53 0 18.5V1.5C0 0.67 0.67 0 1.5 0C2.33 0 3 0.67 3 1.5V18.5C3 19.88 4.12 21 5.5 21H22.5C23.33 21 24 21.67 24 22.5ZM16 16.5C16 17.33 16.67 18 17.5 18H22.5C23.33 18 24 17.33 24 16.5C24 15.67 23.33 15 22.5 15H17.5C16.67 15 16 15.67 16 16.5ZM9 10.5C9 11.33 9.67 12 10.5 12H18.5C19.33 12 20 11.33 20 10.5C20 9.67 19.33 9 18.5 9H10.5C9.67 9 9 9.67 9 10.5ZM6.5 6H11.5C12.33 6 13 5.33 13 4.5C13 3.67 12.33 3 11.5 3H6.5C5.67 3 5 3.67 5 4.5C5 5.33 5.67 6 6.5 6Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33611">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300">
                                        Gantt Charts
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Jugl’s Gantt chart feature lets you
                                        oversee, adjust, and communicate project
                                        details, tasks, and timelines.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 16 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#BCBE4433] group-hover/menu:bg-[#a6aa38]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#a6aa38] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33613)">
                                          <path d="M4.5 19.5V22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21V19.5H4.5ZM6.5 17.5H0V21C0 21.7956 0.31607 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H6.5V17.5Z" />
                                          <path d="M22 19.5V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H19.5V19.5H22ZM24 17.5H17.5V24H21C21.7956 24 22.5587 23.6839 23.1213 23.1213C23.6839 22.5587 24 21.7956 24 21V17.5Z" />
                                          <path d="M4.5 10.75V13.25H2V10.75H4.5ZM6.5 8.75H0V15.25H6.5V8.75Z" />
                                          <path d="M22 10.75V13.25H19.5V10.75H22ZM24 8.75H17.5V15.25H24V8.75Z" />
                                          <path d="M4.5 2V4.5H2V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H4.5ZM6.5 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3L0 6.5H6.5V0Z" />
                                          <path d="M13.25 19.5V22H10.75V19.5H13.25ZM15.25 17.5H8.75V24H15.25V17.5Z" />
                                          <path d="M13.25 10.75V13.25H10.75V10.75H13.25ZM15.25 8.75H8.75V15.25H15.25V8.75Z" />
                                          <path d="M13.25 2V4.5H10.75V2H13.25ZM15.25 0H8.75V6.5H15.25V0Z" />
                                          <path d="M21 2C21.2652 2 21.5196 2.10536 21.7071 2.29289C21.8946 2.48043 22 2.73478 22 3V4.5H19.5V2H21ZM21 0H17.5V6.5H24V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.31607 21.7956 0 21 0Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33613">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a6aa38] duration-300">
                                        Grid View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        View projects and processes in a better
                                        than spreadsheet grid format with
                                        powerful sort, filter, group, and inline
                                        edit capabilities. Build what you want,
                                        from basic to extravagant.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 17 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#fde3e3] group-hover/menu:bg-[#e84b4b]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#e84b4b] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33624)">
                                          <path d="M0.00690435 8.822C0.00290435 8.881 0.00590435 8.762 0.00690435 8.822V8.822ZM23.6319 20.744C23.4469 21.065 23.1109 21.245 22.7639 21.245C22.5949 21.245 22.4229 21.202 22.2659 21.111L21.2889 20.548C20.6839 21.2 19.8959 21.674 18.9999 21.879V23C18.9999 23.553 18.5519 24 17.9999 24C17.4479 24 16.9999 23.553 16.9999 23V21.879C16.1039 21.674 15.3149 21.201 14.7109 20.548L13.7339 21.111C13.5769 21.202 13.4049 21.245 13.2359 21.245C12.8899 21.245 12.5529 21.065 12.3679 20.744C12.0929 20.265 12.2569 19.654 12.7359 19.379L13.7189 18.813C13.5899 18.395 13.5009 17.96 13.5009 17.5C13.5009 17.04 13.5899 16.605 13.7189 16.187L12.7359 15.621C12.2569 15.346 12.0929 14.734 12.3679 14.256C12.6439 13.777 13.2559 13.613 13.7339 13.889L14.7109 14.452C15.3159 13.8 16.1039 13.326 16.9999 13.121V12C16.9999 11.447 17.4479 11 17.9999 11C18.5519 11 18.9999 11.447 18.9999 12V13.121C19.8959 13.326 20.6849 13.799 21.2889 14.452L22.2659 13.889C22.7449 13.614 23.3559 13.778 23.6319 14.256C23.9069 14.735 23.7429 15.346 23.2639 15.621L22.2809 16.187C22.4099 16.605 22.4989 17.04 22.4989 17.5C22.4989 17.96 22.4099 18.395 22.2809 18.813L23.2639 19.379C23.7429 19.654 23.9069 20.266 23.6319 20.744ZM20.4999 17.5C20.4999 16.121 19.3779 15 17.9999 15C16.6219 15 15.4999 16.121 15.4999 17.5C15.4999 18.879 16.6219 20 17.9999 20C19.3779 20 20.4999 18.879 20.4999 17.5ZM6.9999 5H11.9999C13.1049 5 13.9999 5.895 13.9999 7V10C13.9999 10.552 14.4479 11 14.9999 11C15.5519 11 15.9999 10.552 15.9999 10V7C15.9999 4.791 14.2089 3 11.9999 3H11.3389C11.4199 2.481 11.5009 1.949 11.4999 1.917C11.4789 0.834 10.7039 0.042 9.3219 0C8.2419 0.077 7.4279 1.015 7.5049 2.096C7.5209 2.28 7.5799 2.641 7.6429 3H6.9999C4.7909 3 2.9999 4.791 2.9999 7V7.659C2.4859 7.579 1.9629 7.499 1.9319 7.5C0.848904 7.521 -0.0110957 8.417 0.00990435 9.5C-0.0280957 10.772 1.0299 11.572 2.1099 11.495C2.2919 11.48 2.6449 11.422 2.9999 11.36V12.001C2.9999 14.21 4.7909 16.001 6.9999 16.001H8.4879C9.1389 16.001 9.7069 15.575 9.9009 14.953C10.1559 14.138 10.5289 13.376 11.0019 12.687C11.2479 12.329 11.2709 11.833 10.9629 11.526C10.6459 11.21 10.1719 11.001 9.4989 11.001C8.1909 11.001 7.4989 12.001 7.5039 13.111C7.5039 13.293 7.5769 13.646 7.6389 14.001H6.9989C5.8939 14.001 4.9989 13.106 4.9989 12.001V7.001C4.9989 5.896 5.8939 5.001 6.9989 5.001L6.9999 5Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33624">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b] duration-300">
                                        Integrations
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        You’ve got the tools - we’ve got the
                                        integrations. Connect them all to
                                        centralize your data and workflows in
                                        one place, and prioritize the work that
                                        matters.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 18 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dff3ff] group-hover/menu:bg-[#05b2f2]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#05b2f2] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33628)">
                                          <path d="M19 0H5C2.24 0 0 2.24 0 5V19C0 21.76 2.24 24 5 24H19C21.76 24 24 21.76 24 19V5C24 2.24 21.76 0 19 0ZM22 19C22 20.65 20.65 22 19 22H5C3.35 22 2 20.65 2 19V5C2 3.35 3.35 2 5 2H19C20.65 2 22 3.35 22 5V19ZM11 6V11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6ZM7 6V14C7 14.55 6.55 15 6 15C5.45 15 5 14.55 5 14V6C5 5.45 5.45 5 6 5C6.55 5 7 5.45 7 6ZM15 6V18C15 18.55 14.55 19 14 19C13.45 19 13 18.55 13 18V6C13 5.45 13.45 5 14 5C14.55 5 15 5.45 15 6ZM19 6V9C19 9.55 18.55 10 18 10C17.45 10 17 9.55 17 9V6C17 5.45 17.45 5 18 5C18.55 5 19 5.45 19 6Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33628">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#05b2f2] duration-300">
                                        Kanban View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Kanban View is perfect for visualizing a
                                        workflow through the different stages,
                                        tracking progress, and assigning tasks
                                        in a manner that removes bottlenecks.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 19 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f7edfa] group-hover/menu:bg-[#c268cd]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#c268cd] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33632)">
                                          <path d="M20.68 1.16743L20.659 1.16043L17.944 0.260433C17.0062 -0.0509116 15.9974 -0.0783941 15.044 0.181433L9.468 1.80043C8.78525 1.98137 8.06072 1.91769 7.42 1.62043L6.92 1.38843C6.16059 1.07261 5.335 0.94899 4.51639 1.02854C3.69779 1.10809 2.91144 1.38835 2.22705 1.84448C1.54266 2.30061 0.981356 2.91852 0.592883 3.64346C0.204411 4.3684 0.000767286 5.17797 0 6.00043L0 18.0754C0.0021016 19.1568 0.353792 20.2084 1.00259 21.0735C1.65139 21.9386 2.56251 22.5706 3.6 22.8754L6.469 23.7754C6.95302 23.9259 7.45713 24.0018 7.964 24.0004C8.41581 24.0062 8.866 23.9452 9.3 23.8194L15.1 22.2194C15.63 22.0757 16.1893 22.0802 16.717 22.2324L19.06 22.9084C19.6482 23.0506 20.261 23.0575 20.8523 22.9286C21.4436 22.7996 21.9979 22.5382 22.4735 22.164C22.9491 21.7898 23.3336 21.3125 23.598 20.7682C23.8624 20.2238 23.9999 19.6266 24 19.0214V5.87643C23.9985 4.84527 23.6788 3.83969 23.0847 2.99693C22.4905 2.15416 21.6507 1.51527 20.68 1.16743ZM4.176 20.9594C3.55031 20.7785 3.00009 20.3997 2.6078 19.8798C2.2155 19.3598 2.00225 18.7268 2 18.0754V6.00043C1.99514 5.50511 2.11496 5.01653 2.34842 4.57965C2.58189 4.14278 2.9215 3.77165 3.336 3.50043C3.8292 3.17328 4.40816 2.99931 5 3.00043C5.38166 3.00054 5.75955 3.07598 6.112 3.22243C6.112 3.22243 6.857 3.54143 6.999 3.59243V21.8424L4.176 20.9594ZM9 21.8274V3.87943C9.33966 3.86141 9.67667 3.80948 10.006 3.72443L15 2.27343V20.2004L9 21.8274ZM22 19.0214C22.0002 19.321 21.9331 19.6167 21.8037 19.8869C21.6743 20.157 21.4859 20.3947 21.2524 20.5822C21.0188 20.7698 20.7461 20.9025 20.4544 20.9706C20.1627 21.0386 19.8594 21.0403 19.567 20.9754L17 20.2524V2.07543L20.018 3.05443C20.598 3.26459 21.0993 3.64811 21.4539 4.15296C21.8085 4.6578 21.9991 5.25951 22 5.87643V19.0214Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33632">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#c268cd] duration-300">
                                        Map View
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        View any of your location data in a
                                        fully interactive map format that
                                        includes powerful display features. Jugl
                                        is your digital playground for physical
                                        locations.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 20 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f6ebde] group-hover/menu:bg-[#c87847]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#c87847] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33634)">
                                          <path d="M21 11H16C14.346 11 13 12.346 13 14V21C13 22.654 14.346 24 16 24H21C22.654 24 24 22.654 24 21V14C24 12.346 22.654 11 21 11ZM22 21C22 21.551 21.552 22 21 22H16C15.448 22 15 21.551 15 21V14C15 13.449 15.448 13 16 13H21C21.552 13 22 13.449 22 14V21ZM21 15.997C21 16.549 20.553 16.997 20 16.997H17C16.447 16.997 16 16.549 16 15.997C16 15.445 16.447 14.997 17 14.997H20C20.553 14.997 21 15.445 21 15.997ZM21 19C21 19.552 20.553 20 20 20H17C16.447 20 16 19.552 16 19C16 18.448 16.447 18 17 18H20C20.553 18 21 18.448 21 19ZM9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 2C11.206 2 13 3.794 13 6C13 8.206 11.206 10 9 10C6.794 10 5 8.206 5 6C5 3.794 6.794 2 9 2ZM11 15C11 15.552 10.553 16 10 16H9C5.141 16 2 19.14 2 23C2 23.552 1.553 24 1 24C0.447 24 0 23.552 0 23C0 18.038 4.037 14 9 14H10C10.553 14 11 14.448 11 15Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33634">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#c87847] duration-300">
                                        Member Directory
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Easily find, connect and collaborate
                                        with team members anywhere in the world.
                                        Check out who’s available and get to
                                        know other team members through their
                                        profiles.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 21 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e0e7ff] group-hover/menu:bg-[#6468f0]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6468f0] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33636)">
                                          <path d="M19 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM11 2H13C13.6183 2.00256 14.2206 2.19608 14.7247 2.55409C15.2288 2.91209 15.6099 3.41709 15.816 4H8.184C8.39008 3.41709 8.77123 2.91209 9.2753 2.55409C9.77937 2.19608 10.3817 2.00256 11 2ZM5 6H19C19.7956 6 20.5587 6.31607 21.1213 6.87868C21.6839 7.44129 22 8.20435 22 9V12H2V9C2 8.20435 2.31607 7.44129 2.87868 6.87868C3.44129 6.31607 4.20435 6 5 6ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V14H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V14H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33636">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6468f0] duration-300">
                                        My Work
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        A single place to view your assigned
                                        work across all processes and projects.
                                        View tasks by priority and due date,
                                        then get to work.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 22 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e7e7e7] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33638)">
                                          <path d="M19.9996 8C22.2056 8 23.9996 6.206 23.9996 4C23.9996 1.794 22.2056 0 19.9996 0C17.7936 0 15.9996 1.794 15.9996 4C15.9996 6.206 17.7936 8 19.9996 8ZM19.9996 2C21.1026 2 21.9996 2.897 21.9996 4C21.9996 5.103 21.1026 6 19.9996 6C18.8966 6 17.9996 5.103 17.9996 4C17.9996 2.897 18.8966 2 19.9996 2ZM23.2716 16.247L23.2666 16.228V16.227L21.6936 9.754C21.1556 9.912 20.5886 10.001 19.9996 10.001C19.8956 10.001 19.7946 9.991 19.6916 9.985L21.3286 16.72C21.3306 16.727 21.3356 16.732 21.3366 16.74H21.3326C21.4146 17.048 21.3536 17.355 21.1636 17.606C20.9716 17.861 20.6876 18.001 20.3676 18.001H3.49259C3.18759 18.001 2.90359 17.864 2.71459 17.63C2.52259 17.39 2.45059 17.082 2.50759 16.818L4.85959 7.701C5.60559 4.345 8.54159 2.001 11.9996 2.001C12.7726 2.001 13.5226 2.133 14.2316 2.362C14.4196 1.701 14.7156 1.087 15.1036 0.541C14.1246 0.193 13.0786 0.002 11.9996 0.002C7.59759 0 3.85859 2.988 2.91559 7.233L0.563591 16.352C0.366591 17.242 0.581591 18.163 1.15459 18.88C1.72759 19.592 2.58059 20 3.49259 20H7.10059C7.56559 22.279 9.58459 24 11.9996 24C14.4146 24 16.4336 22.279 16.8986 20H20.3686C21.3156 20 22.1856 19.567 22.7586 18.814C23.3146 18.081 23.4976 17.154 23.2726 16.264C23.2716 16.258 23.2726 16.253 23.2726 16.247H23.2716ZM11.9996 22C10.6976 22 9.59759 21.161 9.18359 20H14.8146C14.4006 21.161 13.3006 22 11.9986 22H11.9996Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33638">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#4f4f4f] duration-300">
                                        Notification Center
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Receive real-time notifications in Jugl
                                        to stay informed about actions relevant
                                        to you.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 23 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dbf0e1] group-hover/menu:bg-[#33845a]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#33845a] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path d="M3 5.5C3 4.672 3.672 4 4.5 4C5.328 4 6 4.672 6 5.5C6 6.328 5.328 7 4.5 7C3.672 7 3 6.328 3 5.5ZM8.5 7C9.328 7 10 6.328 10 5.5C10 4.672 9.328 4 8.5 4C7.672 4 7 4.672 7 5.5C7 6.328 7.672 7 8.5 7ZM24 6V18C24 20.757 21.757 23 19 23H5C2.243 23 0 20.757 0 18V6C0 3.243 2.243 1 5 1H19C21.757 1 24 3.243 24 6ZM2 6V8H22V6C22 4.346 20.654 3 19 3H5C3.346 3 2 4.346 2 6ZM14 10H2V14.5H14V10ZM5 21H14V16.5H2V18C2 19.654 3.346 21 5 21ZM22 18V10H16V21H19C20.654 21 22 19.654 22 18Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#33845a] duration-300">
                                        Page Designer
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Display your info how you want it, to
                                        meet the needs of every audience.
                                        Quickly build gorgeous, functional, and
                                        responsive pages with an intuitive
                                        interface that lets you customize the
                                        overall layout, style, and design of
                                        your projects and processes.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 24 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f8ebf2] group-hover/menu:bg-[#b74b7b]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#b74b7b] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33642)">
                                          <path d="M23.707 23.707C23.512 23.902 23.256 24 23 24C22.744 24 22.488 23.902 22.293 23.707L16.324 17.738C14.599 19.15 12.397 20 10 20C4.486 20 0 15.514 0 9.99996C0 4.48596 4.486 -4.34527e-05 10 -4.34527e-05C11.758 -4.34527e-05 13.487 0.462957 15.001 1.33796C15.479 1.61496 15.643 2.22696 15.365 2.70496C15.18 3.02496 14.844 3.20396 14.499 3.20396C14.329 3.20396 14.157 3.16096 13.999 3.06996C12.79 2.36996 11.407 1.99996 10 1.99996C5.589 1.99996 2 5.58896 2 9.99996C2 11.167 2.257 12.274 2.709 13.274L6.508 8.71496C6.87 8.27896 7.404 8.01496 7.97 7.98896C8.532 7.96396 9.092 8.17696 9.494 8.57996L11.422 10.508L20.237 0.339957C20.599 -0.0790434 21.231 -0.122043 21.647 0.236957C22.065 0.597957 22.112 1.22996 21.751 1.64796L12.971 11.814C12.605 12.238 12.074 12.493 11.513 12.514C10.956 12.528 10.405 12.319 10.008 11.922L8.08 9.99396L3.817 15.069C5.285 16.857 7.512 17.999 10 17.999C14.411 17.999 18 14.41 18 9.99896C18 9.84896 17.995 9.69996 17.987 9.55196C17.958 8.99996 18.382 8.52996 18.933 8.49996C19.48 8.45996 19.955 8.89396 19.985 9.44496C19.995 9.62796 20 9.81296 20 9.99796C20 12.396 19.15 14.598 17.738 16.322L23.707 22.291C24.098 22.682 24.098 23.314 23.707 23.705V23.707Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33642">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b74b7b] duration-300">
                                        Power Search
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Easily search for anything across every
                                        part of Jugl.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 25 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f9fcc5] group-hover/menu:bg-[#e4cc0e]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#e4cc0e] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33644)">
                                          <path d="M19 6V4C19 2.93913 18.5786 1.92172 17.8284 1.17157C17.0783 0.421427 16.0609 0 15 0L9 0C7.93913 0 6.92172 0.421427 6.17157 1.17157C5.42143 1.92172 5 2.93913 5 4V6C3.67441 6.00159 2.40356 6.52888 1.46622 7.46622C0.528882 8.40356 0.00158786 9.67441 0 11L0 16C0.00158786 17.3256 0.528882 18.5964 1.46622 19.5338C2.40356 20.4711 3.67441 20.9984 5 21C5 21.7956 5.31607 22.5587 5.87868 23.1213C6.44129 23.6839 7.20435 24 8 24H16C16.7956 24 17.5587 23.6839 18.1213 23.1213C18.6839 22.5587 19 21.7956 19 21C20.3256 20.9984 21.5964 20.4711 22.5338 19.5338C23.4711 18.5964 23.9984 17.3256 24 16V11C23.9984 9.67441 23.4711 8.40356 22.5338 7.46622C21.5964 6.52888 20.3256 6.00159 19 6ZM7 4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V6H7V4ZM17 21C17 21.2652 16.8946 21.5196 16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22H8C7.73478 22 7.48043 21.8946 7.29289 21.7071C7.10536 21.5196 7 21.2652 7 21V17C7 16.7348 7.10536 16.4804 7.29289 16.2929C7.48043 16.1054 7.73478 16 8 16H16C16.2652 16 16.5196 16.1054 16.7071 16.2929C16.8946 16.4804 17 16.7348 17 17V21ZM22 16C22 16.7956 21.6839 17.5587 21.1213 18.1213C20.5587 18.6839 19.7956 19 19 19V17C19 16.2044 18.6839 15.4413 18.1213 14.8787C17.5587 14.3161 16.7956 14 16 14H8C7.20435 14 6.44129 14.3161 5.87868 14.8787C5.31607 15.4413 5 16.2044 5 17V19C4.20435 19 3.44129 18.6839 2.87868 18.1213C2.31607 17.5587 2 16.7956 2 16V11C2 10.2044 2.31607 9.44129 2.87868 8.87868C3.44129 8.31607 4.20435 8 5 8H19C19.7956 8 20.5587 8.31607 21.1213 8.87868C21.6839 9.44129 22 10.2044 22 11V16Z" />
                                          <path d="M18 10H16C15.7348 10 15.4804 10.1054 15.2929 10.2929C15.1054 10.4804 15 10.7348 15 11C15 11.2652 15.1054 11.5196 15.2929 11.7071C15.4804 11.8946 15.7348 12 16 12H18C18.2652 12 18.5196 11.8946 18.7071 11.7071C18.8946 11.5196 19 11.2652 19 11C19 10.7348 18.8946 10.4804 18.7071 10.2929C18.5196 10.1054 18.2652 10 18 10Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33644">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e4cc0e] duration-300">
                                        Print / Export
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Print or export your work in multiple
                                        business and user-friendly formats.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 26 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#feecd6] group-hover/menu:bg-[#f36f1c]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#f36f1c] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33647)">
                                          <path d="M9 24H1C0.734784 24 0.48043 23.8946 0.292893 23.7071C0.105357 23.5196 0 23.2652 0 23C0 22.7348 0.105357 22.4804 0.292893 22.2929C0.48043 22.1054 0.734784 22 1 22H9C9.26522 22 9.51957 22.1054 9.70711 22.2929C9.89464 22.4804 10 22.7348 10 23C10 23.2652 9.89464 23.5196 9.70711 23.7071C9.51957 23.8946 9.26522 24 9 24Z" />
                                          <path d="M7 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19C0 18.7348 0.105357 18.4804 0.292893 18.2929C0.48043 18.1054 0.734784 18 1 18H7C7.26522 18 7.51957 18.1054 7.70711 18.2929C7.89464 18.4804 8 18.7348 8 19C8 19.2652 7.89464 19.5196 7.70711 19.7071C7.51957 19.8946 7.26522 20 7 20Z" />
                                          <path d="M5 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H5C5.26522 14 5.51957 14.1054 5.70711 14.2929C5.89464 14.4804 6 14.7348 6 15C6 15.2652 5.89464 15.5196 5.70711 15.7071C5.51957 15.8946 5.26522 16 5 16Z" />
                                          <path d="M13 23.9549C12.7348 23.9667 12.4757 23.8726 12.2798 23.6934C12.084 23.5143 11.9673 23.2646 11.9555 22.9994C11.9437 22.7342 12.0377 22.4751 12.2169 22.2792C12.3961 22.0833 12.6458 21.9667 12.911 21.9549C14.8034 21.7817 16.6074 21.0729 18.1115 19.9115C19.6157 18.75 20.7577 17.184 21.4039 15.3969C22.0501 13.6098 22.1737 11.6755 21.7602 9.82068C21.3468 7.96584 20.4133 6.26722 19.0692 4.92377C17.7252 3.58032 16.0261 2.64767 14.1711 2.23504C12.3161 1.82241 10.3819 1.9469 8.59505 2.59393C6.80823 3.24096 5.24276 4.38373 4.08201 5.8884C2.92125 7.39307 2.21327 9.19733 2.04098 11.0899C2.01711 11.354 1.88929 11.5979 1.68562 11.7678C1.48196 11.9377 1.21914 12.0197 0.954983 11.9959C0.690827 11.972 0.446973 11.8442 0.277065 11.6405C0.107157 11.4368 0.0251132 11.174 0.0489827 10.9099C0.327872 7.83318 1.78259 4.98257 4.11031 2.95144C6.43804 0.920301 9.45942 -0.134865 12.5455 0.00558262C15.6316 0.14603 18.5447 1.47127 20.6783 3.70544C22.8119 5.93961 24.0017 8.91056 24 11.9999C24.0153 14.9982 22.9014 17.8925 20.8799 20.1069C18.8583 22.3213 16.0773 23.6936 13.09 23.9509C13.06 23.9539 13.029 23.9549 13 23.9549Z" />
                                          <path d="M12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33647">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f36f1c] duration-300">
                                        Real Time Updates
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Instantly see when anything and
                                        everything is updated. Who, what, when -
                                        it’s all available in real-time, down to
                                        the second. There’s no refresh button,
                                        you’re always working on the current
                                        version.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 27 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33653)">
                                          <path d="M16.5 23C16.5 23.553 16.052 24 15.5 24H13.613C12.654 24 11.802 23.5 11.334 22.663C10.866 21.825 10.887 20.838 11.39 20.02L12.23 18.658C12.521 18.188 13.137 18.042 13.606 18.331C14.076 18.621 14.222 19.237 13.932 19.707L13.092 21.069C12.923 21.344 13.027 21.593 13.079 21.687C13.131 21.781 13.288 21.999 13.612 21.999H15.499C16.051 21.999 16.499 22.446 16.499 22.999L16.5 23ZM9 23C9 23.553 8.552 24 8 24C5.446 24 3.409 22.099 3.157 19.479L1.86 6H1C0.448 6 0 5.553 0 5C0 4.447 0.448 4 1 4H5.101C5.566 1.721 7.586 0 10 0H12C14.414 0 16.434 1.721 16.899 4H21C21.552 4 22 4.447 22 5C22 5.553 21.552 6 21 6H20.115L19.768 9.661C19.719 10.179 19.188 10.561 18.678 10.561C18.128 10.509 17.724 10.021 17.777 9.471L18.106 5.999H3.87L5.148 19.286C5.299 20.858 6.499 21.999 8 21.999C8.552 21.999 9 22.447 9 23ZM7.184 4H14.815C14.401 2.839 13.301 2 11.999 2H9.999C8.697 2 7.598 2.839 7.184 4ZM19.77 16.785C19.952 16.785 20.136 16.735 20.301 16.632C20.769 16.338 20.91 15.721 20.616 15.253L19.674 13.753C19.193 12.986 18.368 12.53 17.464 12.53H17.453C16.544 12.534 15.718 12.998 15.241 13.771L14.35 15.216C14.06 15.686 14.207 16.302 14.677 16.592C15.147 16.881 15.763 16.735 16.053 16.265L16.943 14.82C17.104 14.559 17.359 14.53 17.461 14.53C17.588 14.538 17.817 14.556 17.98 14.816L18.923 16.317C19.113 16.619 19.437 16.785 19.77 16.785ZM23.597 20.001L22.846 18.806C22.552 18.339 21.936 18.199 21.467 18.492C21 18.786 20.859 19.403 21.153 19.871L21.904 21.066C22.076 21.34 21.973 21.59 21.921 21.685C21.868 21.78 21.712 22 21.387 22H19.5C18.948 22 18.5 22.447 18.5 23C18.5 23.553 18.948 24 19.5 24H21.387C22.351 24 23.205 23.496 23.671 22.652C24.138 21.808 24.11 20.817 23.597 20.001Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33653">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                        Recycle Bin
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Never worry about losing data! Anything
                                        you delete can be restored in a couple
                                        of clicks.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 28 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2755_33655)">
                                          <path d="M19 0H10C7.243 0 5 2.243 5 5V6H4.5C2.019 6 0 8.019 0 10.5V20.5C0 22.429 1.569 23.999 3.499 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM5 20.5C5 21.327 4.327 22 3.5 22C2.673 22 2 21.327 2 20.5V10.5C2 9.122 3.122 8 4.5 8H5V20.5ZM22 19C22 20.654 20.654 22 19 22H6.662C6.878 21.545 7 21.037 7 20.5V5C7 3.346 8.346 2 10 2H19C20.654 2 22 3.346 22 5V19ZM20 7C20 7.552 19.552 8 19 8H16C15.448 8 15 7.552 15 7C15 6.448 15.448 6 16 6H19C19.552 6 20 6.448 20 7ZM20 11C20 11.552 19.552 12 19 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H19C19.552 10 20 10.448 20 11ZM20 15C20 15.552 19.552 16 19 16H10C9.448 16 9 15.552 9 15C9 14.448 9.448 14 10 14H19C19.552 14 20 14.448 20 15ZM20 19C20 19.552 19.552 20 19 20H10C9.448 20 9 19.552 9 19C9 18.448 9.448 18 10 18H19C19.552 18 20 18.448 20 19ZM9 7V5C9 4.448 9.448 4 10 4H12C12.552 4 13 4.448 13 5V7C13 7.552 12.552 8 12 8H10C9.448 8 9 7.552 9 7Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2755_33655">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                        Robust Reporting
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Robust reporting capabilities keep teams
                                        organized to deliver projects, run their
                                        core processes, and glean insights to
                                        inform productive business decisions.
                                        Create powerful reports in a matter of
                                        minutes.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 29 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9C64862E] group-hover/menu:bg-[#85516f]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#85516f] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2758_33657)">
                                          <path d="M17 14C17 14.2652 16.8946 14.5196 16.7071 14.7071C16.5196 14.8947 16.2652 15 16 15H8C7.73478 15 7.48043 14.8947 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14C7 13.7348 7.10536 13.4805 7.29289 13.2929C7.48043 13.1054 7.73478 13 8 13H16C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4805 17 13.7348 17 14ZM13 17H8C7.73478 17 7.48043 17.1054 7.29289 17.2929C7.10536 17.4805 7 17.7348 7 18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8947 7.73478 19 8 19H13C13.2652 19 13.5196 18.8947 13.7071 18.7071C13.8946 18.5196 14 18.2652 14 18C14 17.7348 13.8946 17.4805 13.7071 17.2929C13.5196 17.1054 13.2652 17 13 17ZM22 10.485V19C21.9984 20.3256 21.4711 21.5965 20.5338 22.5338C19.5964 23.4711 18.3256 23.9984 17 24H7C5.67441 23.9984 4.40356 23.4711 3.46622 22.5338C2.52888 21.5965 2.00159 20.3256 2 19V5.00002C2.00159 3.67443 2.52888 2.40358 3.46622 1.46624C4.40356 0.528905 5.67441 0.00161091 7 2.30487e-05H11.515C12.4346 -0.00234388 13.3456 0.177611 14.1952 0.529482C15.0449 0.881354 15.8163 1.39816 16.465 2.05002L19.949 5.53602C20.6012 6.18426 21.1184 6.95548 21.4704 7.805C21.8225 8.65451 22.0025 9.56545 22 10.485ZM15.051 3.46402C14.7363 3.15918 14.3829 2.89695 14 2.68402V7.00002C14 7.26524 14.1054 7.51959 14.2929 7.70713C14.4804 7.89467 14.7348 8.00002 15 8.00002H19.316C19.103 7.61721 18.8404 7.26417 18.535 6.95002L15.051 3.46402ZM20 10.485C20 10.32 19.968 10.162 19.953 10H15C14.2044 10 13.4413 9.68395 12.8787 9.12134C12.3161 8.55873 12 7.79567 12 7.00002V2.04702C11.838 2.03202 11.679 2.00002 11.515 2.00002H7C6.20435 2.00002 5.44129 2.31609 4.87868 2.8787C4.31607 3.44131 4 4.20437 4 5.00002V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.684 6.20435 22 7 22H17C17.7956 22 18.5587 21.684 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V10.485Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2758_33657">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#85516f] duration-300">
                                        JuglDocs
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        We’re revolutionizing what you expect
                                        out of an online document - try it once
                                        and you’ll never go back. If you’ve ever
                                        wished for the ability to do something
                                        in your docs, we’re your work genie.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 30 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7f4e3] group-hover/menu:bg-[#289f71]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#289f71] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2758_33659)">
                                          <path d="M19.0264 12V18C19.0264 18.552 18.5784 19 18.0264 19C17.4744 19 17.0264 18.552 17.0264 18V12C17.0264 11.448 17.4744 11 18.0264 11C18.5784 11 19.0264 11.448 19.0264 12ZM11.6064 6.717L14.6774 17.746C14.8524 18.376 14.3794 19 13.7244 19C13.2814 19 12.8934 18.706 12.7724 18.28L12.1294 16H6.92337L6.28037 18.28C6.16037 18.706 5.77137 19 5.32837 19C4.67437 19 4.20037 18.376 4.37537 17.746L7.46637 6.638C7.60737 6.03 8.00737 5.518 8.56437 5.233C9.13237 4.941 9.78437 4.923 10.4034 5.183C10.9904 5.429 11.4404 6 11.6074 6.718L11.6064 6.717ZM11.5654 14L9.63637 7.165C9.60737 7.051 9.44537 7.051 9.41737 7.165L7.48837 14H11.5654ZM23.0274 10C22.4754 10 22.0274 10.448 22.0274 11V19C22.0274 20.654 20.6814 22 19.0274 22H5.02637C3.37237 22 2.02637 20.654 2.02637 19V5C2.02637 3.346 3.37237 2 5.02637 2H13.0264C13.5784 2 14.0264 1.552 14.0264 1C14.0264 0.448 13.5784 0 13.0264 0H5.02637C2.26937 0 0.0263672 2.243 0.0263672 5V19C0.0263672 21.757 2.26937 24 5.02637 24H19.0264C21.7834 24 24.0264 21.757 24.0264 19V11C24.0264 10.448 23.5784 10 23.0264 10H23.0274ZM16.1774 5.18L18.0454 5.967L18.7904 7.832C18.9514 8.236 19.3424 8.5 19.7774 8.5C20.2124 8.5 20.6024 8.235 20.7644 7.832L21.5054 5.978L23.3594 5.237C23.7634 5.076 24.0274 4.685 24.0274 4.25C24.0274 3.815 23.7624 3.425 23.3594 3.263L21.5054 2.522L20.7644 0.668C20.6014 0.265 20.2104 0 19.7764 0C19.3424 0 18.9514 0.265 18.7894 0.668L18.0524 2.511L16.2124 3.208C15.8064 3.362 15.5344 3.748 15.5264 4.182C15.5184 4.617 15.7764 5.012 16.1764 5.181L16.1774 5.18Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2758_33659">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#289f71] duration-300">
                                        Jugl AI
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Streamline your work processes with Jugl
                                        AI. From drafting blogs and categorizing
                                        feedback to enhancing clarity and
                                        simplifying language, let AI do the
                                        heavy lifting. Personalize your
                                        experience with custom prompts and
                                        unlock the future of efficient workflow.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 31 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f0f3ce] group-hover/menu:bg-[#bfb333]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#bfb333] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2758_33661)">
                                          <path d="M9.02 17.35C8.83 17.35 8.63 17.29 8.47 17.17C8.16 16.94 8.03 16.53 8.15 16.16L9.01 13.4L6.83 11.63C6.54 11.38 6.43 10.98 6.56 10.62C6.69 10.26 7.04 10.02 7.42 10.02H10.17L11.14 7.41C11.27 7.05 11.62 6.81 12 6.81C12.38 6.81 12.73 7.05 12.86 7.41L13.83 10.02H16.58C16.96 10.02 17.31 10.26 17.44 10.62C17.57 10.98 17.46 11.39 17.17 11.64L15 13.41L15.9 16.14C16.02 16.51 15.9 16.92 15.59 17.15C15.28 17.39 14.86 17.4 14.53 17.19L12.01 15.55L9.53 17.21C9.38 17.31 9.2 17.36 9.02 17.36V17.35ZM19 24H5C2.24 24 0 21.76 0 19V5C0 2.24 2.24 0 5 0H19C21.76 0 24 2.24 24 5V19C24 21.76 21.76 24 19 24ZM5 2C3.35 2 2 3.35 2 5V19C2 20.65 3.35 22 5 22H19C20.65 22 22 20.65 22 19V5C22 3.35 20.65 2 19 2H5Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2758_33661">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#bfb333] duration-300">
                                        Starred Items
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Quickly pin important items for easy
                                        access.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 32 --> */}
                                <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer">
                                  <div className="flex items-center gap-[16px] p-[12px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7eff6] group-hover/menu:bg-[#2a8ab0]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#2a8ab0] group-hover/menu:fill-[#fff] duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <g clip-path="url(#clip0_2758_33665)">
                                          <path d="M23.121 0.879C21.951 -0.291 20.049 -0.291 18.879 0.879L12.172 7.586C11.416 8.341 11 9.346 11 10.414V12C11 12.552 11.447 13 12 13H13.586C14.654 13 15.659 12.583 16.414 11.828L23.121 5.121C24.285 4.004 24.285 1.996 23.121 0.879ZM21.707 3.707L15 10.414C14.622 10.792 14.12 11 13.586 11H13V10.414C13 9.888 13.214 9.372 13.586 9L20.293 2.293C20.684 1.903 21.316 1.903 21.707 2.293C22.095 2.665 22.095 3.335 21.707 3.707ZM12 18C11.447 18 11 17.553 11 17C11 16.447 11.447 16 12 16H15C15.553 16 16 16.447 16 17C16 17.553 15.553 18 15 18H12ZM20 14V19C20 21.757 17.757 24 15 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H14C14.553 0 15 0.448 15 1C15 1.552 14.553 2 14 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H15C16.654 22 18 20.654 18 19V14C18 13.447 18.447 13 19 13C19.553 13 20 13.447 20 14ZM9.167 11.667L7.48 13.354C7.049 13.785 6.485 14.002 5.919 14.002C5.386 14.002 4.853 13.809 4.428 13.42L3.759 12.841C3.342 12.479 3.297 11.847 3.658 11.43C4.021 11.011 4.652 10.969 5.069 11.329L5.758 11.927C5.861 12.02 5.986 12.019 6.065 11.94L7.752 10.253C8.143 9.862 8.775 9.862 9.166 10.253C9.557 10.644 9.558 11.276 9.167 11.667ZM9.167 6.707L7.48 8.394C7.049 8.825 6.485 9.042 5.919 9.042C5.386 9.042 4.853 8.849 4.428 8.46L3.759 7.881C3.342 7.519 3.297 6.887 3.658 6.47C4.021 6.052 4.652 6.009 5.069 6.369L5.758 6.967C5.861 7.061 5.986 7.059 6.065 6.98L7.752 5.293C8.143 4.902 8.775 4.902 9.166 5.293C9.557 5.684 9.558 6.316 9.167 6.707ZM9.167 15.253C9.558 15.644 9.558 16.276 9.167 16.667L7.48 18.354C7.049 18.785 6.485 19.002 5.919 19.002C5.386 19.002 4.853 18.809 4.428 18.42L3.759 17.841C3.342 17.479 3.297 16.848 3.658 16.43C4.021 16.013 4.652 15.968 5.069 16.329L5.758 16.927C5.861 17.02 5.986 17.019 6.065 16.94L7.752 15.253C8.143 14.862 8.776 14.862 9.167 15.253Z" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_2758_33665">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[16px] text-[#2a8ab0] leading-[130%] mb-[4px] group-hover/menu:text-[#2a8ab0] duration-300">
                                        Task Management
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        At the core of any work management
                                        platform is good project management
                                        software. Ours is great. Deliver
                                        everything from simple projects to
                                        complex programs and general business
                                        processes, on time and on budget.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="hidden lg:block bg-[#F8F9FA] pr-[16px] pb-[16px] pl-[16px] pt-[24px]">
                              <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                                    fill="#484848"
                                  />
                                </svg>
                                <h6 className="text-[14px]">Whats New</h6>
                              </div>

                              <div className="p-[12px]">
                                <Image
                                  src="/images/megamenu/banner-2.jpg"
                                  alt="banner"
                                  height={0}
                                  width={0}
                                  style={{ height: "auto", width: "auto" }}
                                  className="max-w-[100%] rounded-[20px] border border-[#E5E7EB]"
                                />
                                <h6 className="text-[16px] font-medium mt-[20px]">
                                  Overview of latest features!
                                </h6>
                                <a
                                  className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-2"
                                  href="#"
                                >
                                  {" "}
                                  Start Free Trail
                                  <svg
                                    className="w-[12px] fill-[#359cf0]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    )}
                  </li>

                  <li
                    className="group menu-mobile-item py-[20px] "
                    onClick={() => toggleMobileMenu("resources")}
                  >
                    <div className="flex gap-2 cursor-pointer items-center justify-between transition-all duration-200 group-hover:text-[#359cf0] ">
                      <p
                        className={`menu-mobile-active-1 ${resourcesRoutesStateClass}`}
                      >
                        Resources
                      </p>
                      <span>
                        {activeMenu === "resources" ? (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] rotate-0 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] -rotate-90 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    {activeMenu === "resources" && (
                      <ul className="menu-child  bg-white z-50 transition-all duration-200  ">
                        <div className="mx-auto max-w-[1440px] xl:max-w-[1632px]">
                          <div className="lg:grid md:grid-cols-1 relative mt-[24px] border-t border-[#ddd]">
                            <div className="sm:pr-[12px] md:pr-[26px] pb-0 pt-[24px]">
                              <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-[20px] lg:gap-[40px] pr-[10px] sm:px-[10px] pb-[14px] overflow-y-auto">
                                {/* 1 */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu cursor-pointer"
                                  onClick={() =>
                                    handleNavigate("getting-started")
                                  }
                                >
                                  <div className="flex items-center gap-[16px]">
                                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#FBB57E30] group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300">
                                      <svg
                                        className="w-[24px] h-[24px] fill-[#f8853f] group-hover/menu:fill-[#fff] duration-300"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300
                                            ${
                                              currentPath === "getting-started"
                                                ? "text-[#f8853f]"
                                                : "text-[#24262B]"
                                            }
                                            `}
                                      >
                                        Getting Started
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Discover the latest Jugl product and
                                        company news
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 2 --> */}

                                <div className="relative overflow-hidden rounded-[12px] group/menu cursor-pointer">
                                  <div className="flex items-center gap-[16px] ">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300
                                        ${
                                          currentPath === "blog"
                                            ? "bg-[#21adb9]"
                                            : " bg-[#2DC0CA33]"
                                        }
                                    `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "blog"
                                            ? "fill-[#fff]"
                                            : "fill-[#21adb9]"
                                        }
                                        `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M0.912172 6.03087C0.252172 5.26987 -0.0588278 4.33587 0.00917217 3.36987C0.0781722 2.40287 0.518172 1.52287 1.24917 0.889873C1.98117 0.255873 2.90917 -0.0521274 3.88117 0.0148726C4.84617 0.0838726 5.72717 0.523873 6.36017 1.25487L10.2032 5.82887L8.78417 7.24787L4.83917 2.55187C4.56617 2.23687 4.17217 2.03987 3.73917 2.00987C3.30117 1.98187 2.88617 2.11687 2.56017 2.39987C2.23217 2.68387 2.03517 3.07887 2.00417 3.51087C1.97317 3.94487 2.11217 4.36287 2.39517 4.68887L6.73317 9.29787L5.31917 10.7119L0.912172 6.03087ZM24.0472 23.9999H17.6952C15.5272 23.9999 13.0072 22.0339 13.0072 19.4999C13.0072 17.1449 15.1522 14.9999 17.5072 14.9999C21.7832 14.9999 23.1502 20.4349 23.7342 22.7559L24.0472 23.9999ZM21.4602 21.9999C20.6942 19.3629 19.5792 16.9999 17.5072 16.9999C16.3752 16.9999 15.0072 18.1149 15.0072 19.4999C15.0072 20.8229 16.5102 21.9999 17.6952 21.9999H21.4602ZM22.9472 6.18387L5.13017 23.9999H0.00717217V18.8759L17.8232 1.05987C19.1902 -0.307127 21.5812 -0.306128 22.9462 1.05987H22.9472C23.6302 1.74487 24.0062 2.65387 24.0062 3.62187C24.0062 4.58987 23.6302 5.50087 22.9452 6.18387H22.9472ZM17.5452 8.75687L15.2492 6.46087L2.00717 19.7049V21.9999H4.30217L17.5442 8.75787L17.5452 8.75687ZM22.0072 3.62187C22.0072 3.18787 21.8392 2.77987 21.5332 2.47387C20.9212 1.86287 19.8492 1.86287 19.2382 2.47387L16.6642 5.04787L18.9602 7.34387L21.5342 4.76987C21.8402 4.46387 22.0082 4.05687 22.0082 3.62287L22.0072 3.62187Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300 ${
                                          currentPath === "blog"
                                            ? "text-[#21adb9]"
                                            : "text-[#24262B]"
                                        }`}
                                      >
                                        Blog
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Discover the latest Jugl product and
                                        company news
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- 3 --> */}
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu cursor-pointer"
                                  onClick={() => handleNavigate("news")}
                                >
                                  <div className="flex items-center gap-[16px]">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "news"
                                        ? "bg-[#a2745e]"
                                        : "bg-[#B18D7433]"
                                    }
                                    `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "news"
                                            ? "fill-[#fff]"
                                            : "fill-[#a2745e]"
                                        }
                                        `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.5 2.5C9.5 1.119 10.619 0 12 0C13.381 0 14.5 1.119 14.5 2.5C14.5 3.881 13.381 5 12 5C10.619 5 9.5 3.881 9.5 2.5ZM21 3C19.346 3 18 4.346 18 6V11.184C17.734 11.09 17.458 11.02 17.168 11.004C16.375 10.962 15.601 11.23 14.995 11.773L11.986 14.542C11.903 14.458 11.826 14.37 11.739 14.289L8.995 11.764C8.398 11.23 7.621 10.963 6.832 11.004C6.542 11.02 6.266 11.09 6 11.184V6C6 4.346 4.654 3 3 3C1.346 3 0 4.346 0 6V16.101C0 18.238 0.832 20.247 2.343 21.758L4.293 23.708C4.488 23.903 4.744 24.001 5 24.001C5.256 24.001 5.512 23.903 5.707 23.708C6.098 23.317 6.098 22.684 5.707 22.294L3.757 20.344C2.624 19.211 2 17.704 2 16.101V6C2 5.449 2.448 5 3 5C3.552 5 4 5.449 4 6C4 6 3.995 14.076 4 14.116C4.03 14.771 4.285 15.425 4.746 15.973L7.362 18.694C7.744 19.092 8.377 19.105 8.776 18.721C9.173 18.338 9.186 17.705 8.803 17.307L6.232 14.637C5.916 14.26 5.925 13.699 6.254 13.332C6.431 13.134 6.675 13.017 6.941 13.002C7.204 12.984 7.462 13.077 7.651 13.246L10.384 15.762C11.41 16.706 11.999 18.048 11.999 19.442V23.001C11.999 23.553 12.446 24.001 12.999 24.001C13.552 24.001 13.999 23.553 13.999 23.001V19.442C13.999 18.29 13.705 17.167 13.175 16.166L16.338 13.255C16.536 13.077 16.793 12.984 17.058 13.002C17.324 13.017 17.568 13.134 17.745 13.332C17.905 13.51 18.186 14.212 17.812 14.586L15.279 17.22C14.896 17.618 14.909 18.251 15.306 18.634C15.5 18.821 15.749 18.913 15.999 18.913C16.262 18.913 16.523 18.81 16.72 18.606L19.298 15.921C19.748 15.385 19.984 14.726 19.999 14.064C20.001 14.041 19.999 5.999 19.999 5.999C19.999 5.448 20.447 4.999 20.999 4.999C21.551 4.999 21.999 5.448 21.999 5.999V16.1C21.999 17.703 21.375 19.209 20.242 20.343L18.292 22.293C17.901 22.683 17.901 23.316 18.292 23.707C18.487 23.902 18.743 24 18.999 24C19.255 24 19.511 23.902 19.706 23.707L21.656 21.757C23.167 20.246 23.999 18.237 23.999 16.1V6C23.999 4.346 22.654 3 21 3ZM10.329 10.274L11.193 11.069C11.649 11.489 12.351 11.489 12.807 11.069L13.641 10.302C14.31 9.703 15.124 9.315 15.979 9.132C15.984 9.124 15.987 9.12 15.992 9.112C15.579 7.33 13.949 6 12.001 6C10.053 6 8.424 7.329 8.01 9.11C8.015 9.118 8.017 9.122 8.022 9.129C8.853 9.302 9.653 9.668 10.33 10.273L10.329 10.274Z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#633f3d] duration-300
                                      ${
                                        currentPath === "news"
                                          ? "text-[#633f3d]"
                                          : "text-[#24262B]"
                                      }`}
                                      >
                                        News
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Insights on No-Code, AI, GRC, Product,
                                        Engineering and more
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    )}
                  </li>

                  <li
                    className="menu-mobile-item cursor-pointer py-[20px]"
                    onClick={() => handleNavigate("pricing")}
                  >
                    <p
                      className={`flex items-center justify-between transition-all hover:text-[#359cf0] menu-mobile-active-4 ${
                        currentPath === "pricing" ? "text-[#359cf0]" : ""
                      }`}
                    >
                      Pricing
                    </p>
                  </li>
                  <li
                    className="group menu-mobile-item py-[20px] "
                    onClick={() => toggleMobileMenu("about")}
                  >
                    <div className="flex gap-2 cursor-pointer items-center justify-between transition-all duration-200 group-hover:text-[#359cf0] ">
                      <p className="menu-mobile-active-1">Company</p>
                      <span>
                        {activeMenu === "about" ? (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] rotate-0 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-[12px] group-hover:fill-[#359cf0] -rotate-90 duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    {activeMenu === "about" && (
                      <ul className="menu-child  bg-white z-50 transition-all duration-200  ">
                        <div className="mx-auto max-w-[1440px] xl:max-w-[1632px]">
                          <div className="lg:grid md:grid-cols-1 relative mt-[24px] border-t border-[#ddd]">
                            <div className="sm:pr-[12px] md:pr-[26px] pb-0 pt-[24px]">
                              <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-[20px] lg:gap-[40px] pr-[10px] sm:px-[10px] pb-[14px] overflow-y-auto">
                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu cursor-pointer"
                                  onClick={() => handleNavigate("about")}
                                >
                                  <div className="flex items-center gap-[16px] ">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "about"
                                        ? "bg-[#21adb9]"
                                        : "bg-[#2DC0CA33]"
                                    }
                                    `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "about"
                                            ? "fill-[#fff]"
                                            : "fill-[#21adb9]"
                                        }
                                        `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M0.912172 6.03087C0.252172 5.26987 -0.0588278 4.33587 0.00917217 3.36987C0.0781722 2.40287 0.518172 1.52287 1.24917 0.889873C1.98117 0.255873 2.90917 -0.0521274 3.88117 0.0148726C4.84617 0.0838726 5.72717 0.523873 6.36017 1.25487L10.2032 5.82887L8.78417 7.24787L4.83917 2.55187C4.56617 2.23687 4.17217 2.03987 3.73917 2.00987C3.30117 1.98187 2.88617 2.11687 2.56017 2.39987C2.23217 2.68387 2.03517 3.07887 2.00417 3.51087C1.97317 3.94487 2.11217 4.36287 2.39517 4.68887L6.73317 9.29787L5.31917 10.7119L0.912172 6.03087ZM24.0472 23.9999H17.6952C15.5272 23.9999 13.0072 22.0339 13.0072 19.4999C13.0072 17.1449 15.1522 14.9999 17.5072 14.9999C21.7832 14.9999 23.1502 20.4349 23.7342 22.7559L24.0472 23.9999ZM21.4602 21.9999C20.6942 19.3629 19.5792 16.9999 17.5072 16.9999C16.3752 16.9999 15.0072 18.1149 15.0072 19.4999C15.0072 20.8229 16.5102 21.9999 17.6952 21.9999H21.4602ZM22.9472 6.18387L5.13017 23.9999H0.00717217V18.8759L17.8232 1.05987C19.1902 -0.307127 21.5812 -0.306128 22.9462 1.05987H22.9472C23.6302 1.74487 24.0062 2.65387 24.0062 3.62187C24.0062 4.58987 23.6302 5.50087 22.9452 6.18387H22.9472ZM17.5452 8.75687L15.2492 6.46087L2.00717 19.7049V21.9999H4.30217L17.5442 8.75787L17.5452 8.75687ZM22.0072 3.62187C22.0072 3.18787 21.8392 2.77987 21.5332 2.47387C20.9212 1.86287 19.8492 1.86287 19.2382 2.47387L16.6642 5.04787L18.9602 7.34387L21.5342 4.76987C21.8402 4.46387 22.0082 4.05687 22.0082 3.62287L22.0072 3.62187Z"></path>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300
                                        ${
                                          currentPath === "about"
                                            ? "text-[#21adb9]"
                                            : "text-[#24262B]"
                                        }
                                        `}
                                      >
                                        About us
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Learn about our story and why we created
                                        Jugl
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="relative overflow-hidden rounded-[12px] group/menu cursor-pointer"
                                  onClick={() => handleNavigate("careers")}
                                >
                                  <div className="flex items-center gap-[16px] ">
                                    <div
                                      className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#5b67f9]  rounded-full shrink-0 duration-300
                                          ${
                                            currentPath === "careers"
                                              ? "bg-[#5b67f9]"
                                              : "bg-[#687FFF30]"
                                          }
                                          `}
                                    >
                                      <svg
                                        className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                            ${
                                              currentPath === "careers"
                                                ? "fill-[#fff]"
                                                : "fill-[#5b67f9]"
                                            }
                                            `}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z"></path>
                                      </svg>
                                    </div>
                                    <div>
                                      <h3
                                        className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#3330d2] duration-300
                                          ${
                                            currentPath === "business-strategy"
                                              ? "text-[#3330d2]"
                                              : "text-[#24262B]"
                                          }

                                          `}
                                      >
                                        Careers
                                      </h3>
                                      <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                        Explore exciting career opportunities
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    )}
                  </li>
                </ul>
                <div className="flex flex-col sm:hidden gap-[8px] mt-[80px]">
                  <button type="button ">
                    <a
                      className="flex items-center inline-block z-10 leading-none justify-center relative transition-all duration-200 px-[0px] py-[12px] text-[#24262B] font-regular flex"
                      href="https://web.jugl.com/login"
                    >
                      <svg
                        className="w-[14px] fill-[#24262B] me-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                      </svg>{" "}
                      Sign in{" "}
                    </a>
                  </button>
                  <button type="button">
                    <a
                      className="flex items-center gap-3 skey inline-block z-10 relative transition-all duration-200 justify-center  group px-[16px] py-[8px] rounded-[4px] text-[14px] bg-[#2196F3] text-[#fff] hover:bg-[#1863B5] font-medium hover:text-white flex"
                      href="https://web.jugl.com/login"
                    >
                      {" "}
                      Get Started
                    </a>{" "}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}

        <div className="custom-container mx-auto  px-[22px] mt-[70px] xxl:px-0 flex items-center mx-auto relative !mt-0 custom-container items-center ">
          <Link href={"/"} className="flex me-5 xl:me-10 outline-0">
            <Image
              height={44}
              width={70}
              className="logo z-50 w-[70px] max-h-[44px] md:w-[90px]"
              src="/images/logo-dark.webp"
              alt="logo image"
            />{" "}
          </Link>
          <nav className="z-[9999] nav-menus duration-300">
            <ul className="navbar flex flex-col justify-center gap-[16px] 2xl:gap-[24px] lg:flex-row duration-300">
              <li
                className="flex items-center group cursor-pointer"
                onClick={() => setOpenMenu(0)}
                onMouseEnter={() => setOpenMenu(0)} // Show on hover
                onMouseLeave={() => setOpenMenu(null)} // Hide on hover out
              >
                <p
                  className={` cursor-pointer font-medium menu-link flex items-center gap-1 active-navitem-1 ${platformRoutesStateClass}`}
                  onClick={() => toggleMenu(0)} // Toggle submenu when clicked
                >
                  Platform
                  <svg
                    className={`w-[12px]  ${platformRoutesStateClass}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </p>
                <ul
                  id="ad-menu-handle"
                  className={`menu-child fixed w-screen bg-white z-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 left-0 top-[75px] 
                      ${
                        openMenu === 0 || openMenu === 1
                          ? "group-hover:pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                      before:content-[''] before:block before:absolute before:w-full before:h-12 before:top-[-35px] before:left-0`}
                >
                  <div className="mx-auto px-[22px] lg:px-[16px] custom-container">
                    <div className="flex  relative">
                      <div className="flex-1 w-[68%] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                              stroke="#484848"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h6 className="text-[14px]">PLATFORM OVERVIEW</h6>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px]">
                          {/* <!-- 1 --> */}
                          <div
                            className="relative  group/menu"
                            onClick={() => navigate.push("why-we-built-jugl")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/1.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("why-we-built-jugl")}
                                      `}
                                >
                                  Why We Built Jugl
                                </h3>
                                <Tooltip
                                  content="Inspired by 1,000+ business owners to
                                      simplify modern work management."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Inspired by 1,000+ business owners to
                                    simplify <br /> modern work management.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 2 --> */}
                          <div
                            className="relative group/menu"
                            onClick={() => navigate("users-and-permissions")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/2.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                        ${getLinkClasses(
                                          "users-and-permissions"
                                        )}
                                      `}
                                >
                                  Users and Permissions
                                </h3>
                                <Tooltip
                                  content="Ensure the right people have the right access. Jugl lets you control visibility and actions with secure role-based permissions."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Ensure the right people have the right{" "}
                                    <br />
                                    access
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 3 --> */}
                          <div
                            className="relative group/menu"
                            onClick={() => navigate("integrations")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/3.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("integrations")}
                                      `}
                                >
                                  Integrations
                                </h3>
                                <Tooltip
                                  content="Bring together everything your team needs. Jugl integrates with 200+ platforms for seamless communication, collaboration, and workflows."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Bring together everything your team needs to
                                    communicate, collaborate, and coordinate
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 4 --> */}
                          <div
                            className="relative  group/menu"
                            onClick={() => navigate("trust-and-security")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/4.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("trust-and-security")}
                                      `}
                                >
                                  Trust and Security
                                </h3>
                                <Tooltip
                                  content="A security-by-design approach. Jugl ensures enterprise-grade protection, keeping your data secure, private, and reliable at every level."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    A security by design approach to protecting{" "}
                                    <br />
                                    your data
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 5 --> */}
                          <div
                            className="relative  group/menu"
                            onClick={() => navigate("team-collaboration")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/5.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("team-collaboration")}
                                      `}
                                >
                                  Team Collaboration
                                </h3>
                                <Tooltip
                                  content="Build company culture through real connections. Jugl’s built-in, role-aware chat keeps collaboration seamlessly inside your workflow."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Build a company culture through authentic
                                    digital connections between employees and{" "}
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 6 --> */}
                          <div
                            className="relative  group/menu"
                            onClick={() => navigate("workflow-automation")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="shrink-0">
                                <Image
                                  height={64}
                                  width={102}
                                  className="w-[102px] h-[64px]"
                                  src="/images/megamenu/6.png"
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#2196f3] duration-300
                                      ${getLinkClasses("workflow-automation")}
                                      `}
                                >
                                  Workflow Automation
                                </h3>
                                <Tooltip
                                  content="Extend workflow power with automation. Jugl eliminates repetitive tasks and streamlines processes—no code needed, just smarter, faster operations."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Extend the power of our workflows of <br />
                                    automations
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[32%] bg-[#F8F9FA] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                              fill="#484848"
                            />
                          </svg>
                          <h6 className="text-[14px]">Whats New</h6>
                        </div>

                        <div className="p-[12px]">
                          <Image
                            src="/images/megamenu/banner.jpg"
                            alt="banner"
                            height={0}
                            width={0}
                            style={{ height: "auto", width: "auto" }}
                            className="max-w-[100%] rounded-[20px] border border-[#E5E7EB]"
                          />
                          <h6 className="text-[16px] font-medium mt-[20px]">
                            Overview of latest features!
                          </h6>
                          <a
                            className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-2"
                            href="#"
                          >
                            {" "}
                            Start Free Trail
                            <svg
                              className="w-[12px] fill-[#359cf0]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>

              <li
                className="flex items-center group cursor-pointer relative"
                onClick={() => setOpenMenu(1)}
                onMouseEnter={() => setOpenMenu(1)} // Show on hover
                onMouseLeave={() => setOpenMenu(null)} // Hide on hover out
              >
                <p
                  className={`cursor-pointer font-medium menu-link flex items-center gap-1 active-navitem-2 ${solutionRoutesStateClass}`}
                  onClick={() => toggleMenu(0)}
                >
                  Solutions
                  <svg
                    className="w-[12px]  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </p>

                <ul
                  id="ad-menu-handle"
                  className={`menu-child fixed w-screen bg-white z-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 left-0 top-[75px] 
                      ${
                        openMenu === 1 || openMenu === 2
                          ? "group-hover:pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                      before:content-[''] before:block before:absolute before:w-full before:h-12 before:top-[-35px] before:left-0`}
                >
                  <div className="mx-auto px-[22px] custom-container">
                    <div className="flex relative">
                      <div className="flex-1 w-[68%] w-[full] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                              stroke="#484848"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h6 className="text-[14px] uppercase">
                            Explore by category
                          </h6>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] max-h-[330px] px-[10px] pb-[14px] overflow-y-auto">
                          {/* <!-- 3 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("field-work-management")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#9e97ee]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "field-work-management"
                                          ? "bg-[#9e97ee]"
                                          : "bg-[#7156DC2E]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath ===
                                          "field-work-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#9e97ee]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_3567_128794)">
                                    <path d="M17.9792 13.0244C16.8602 11.9084 15.1662 11.7064 13.8392 12.4174L9.00722 7.5854V4.4994C9.00722 3.4864 8.46222 2.5434 7.58522 2.0374L4.60422 0.3184C3.67322 -0.2196 2.49222 -0.0626001 1.73022 0.6974L0.705223 1.7244C-0.0557774 2.4834 -0.210777 3.6654 0.326223 4.5964L2.04522 7.5774C2.55122 8.4554 3.49522 9.0004 4.50722 9.0004H7.59322L12.4192 13.8264C12.1412 14.3344 11.9932 14.9054 11.9932 15.5004C11.9932 16.4364 12.3582 17.3144 13.0212 17.9764L18.0352 22.9764C18.6932 23.6324 19.5892 24.0004 20.5152 24.0004C21.5002 24.0004 22.6032 23.4794 23.2332 22.7114C24.3592 21.3394 24.2092 19.2364 22.8922 17.9244L17.9792 13.0244ZM3.77722 6.5794L2.05822 3.5974C1.97222 3.4494 1.99722 3.2604 2.11922 3.1384L3.14422 2.1124C3.26622 1.9914 3.45522 1.9654 3.60422 2.0514L6.58422 3.7714C6.84422 3.9214 7.00622 4.2014 7.00622 4.5004V7.0004H4.50622C4.20622 7.0004 3.92722 6.8394 3.77722 6.5794ZM21.6872 21.4424C21.4112 21.7794 21.0212 21.9764 20.5902 21.9984C20.1692 22.0184 19.7492 21.8594 19.4482 21.5604L14.4342 16.5604C14.1502 16.2774 13.9942 15.9014 13.9942 15.5004C13.9942 15.0994 14.1512 14.7244 14.4342 14.4404C14.7282 14.1474 15.1152 14.0004 15.5012 14.0004C15.8872 14.0004 16.2732 14.1474 16.5672 14.4404L21.4812 19.3394C22.0772 19.9344 22.1672 20.8574 21.6872 21.4424ZM10.4372 17.0994C10.8272 17.4914 10.8262 18.1234 10.4352 18.5134L5.95822 22.9754C5.30022 23.6314 4.40522 23.9994 3.47822 23.9994C2.59722 23.9994 1.39022 23.4784 0.760223 22.7094C-0.364777 21.3384 -0.215777 19.2354 1.10222 17.9234L6.77022 12.2684C7.16022 11.8784 7.79422 11.8784 8.18422 12.2704C8.57422 12.6614 8.57322 13.2944 8.18222 13.6844L2.51322 19.3394C1.91722 19.9344 1.82522 20.8574 2.30522 21.4414C2.58222 21.7794 2.97222 21.9764 3.40322 21.9984C3.82922 22.0174 4.24422 21.8594 4.54522 21.5604L9.02322 17.0984C9.41422 16.7084 10.0462 16.7084 10.4382 17.1004L10.4372 17.0994ZM9.89322 4.6344C10.8132 2.2914 12.9172 0.5604 15.3842 0.1174C16.2472 -0.0366001 17.1142 -0.0396001 17.9632 0.1114C18.6292 0.2294 19.1662 0.6994 19.3652 1.3354C19.5942 2.0644 19.3652 2.8664 18.7532 3.4804L16.4182 5.7224C15.9332 6.2074 15.8542 6.9834 16.2532 7.4714C16.4832 7.7524 16.8062 7.9164 17.1642 7.9354C17.5132 7.9524 17.8582 7.8234 18.1112 7.5704L20.7252 5.0494C21.2112 4.5634 21.9382 4.3824 22.6182 4.5994C23.2822 4.8084 23.7692 5.3614 23.8902 6.0404C24.0402 6.8884 24.0382 7.7574 23.8842 8.6214C23.6032 10.1934 22.7842 11.6574 21.5782 12.7444C21.3872 12.9164 21.1472 13.0014 20.9092 13.0014C20.6362 13.0014 20.3632 12.8904 20.1662 12.6714C19.7962 12.2614 19.8292 11.6284 20.2392 11.2584C21.1162 10.4684 21.7112 9.4064 21.9152 8.2704C22.0132 7.7224 22.0272 7.1754 21.9582 6.6384L19.5132 8.9974C18.8782 9.6344 17.9832 9.9814 17.0652 9.9334C16.1492 9.8874 15.2892 9.4524 14.7052 8.7384C13.6632 7.4644 13.8012 5.5124 15.0192 4.2954L17.3532 2.0534L17.3622 2.0444C16.8272 1.9764 16.2812 1.9904 15.7372 2.0884C13.9492 2.4084 12.4242 3.6654 11.7552 5.3674C11.5542 5.8814 10.9732 6.1344 10.4592 5.9324C9.94522 5.7304 9.69122 5.1504 9.89422 4.6364L9.89322 4.6344Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3567_128794">
                                      <rect width="24" height="24" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#9e97ee] duration-300
                                      ${
                                        currentPath === "field-work-management"
                                          ? "text-[#9e97ee]"
                                          : "text-[#24262B]"
                                      }
                                      `}
                                >
                                  Field Work Management
                                </h3>
                                <Tooltip
                                  content=" Empower field teams with Jugl’s mobile
                                      tools to track trips, access work, and
                                      stay connected."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Empower field teams with Jugl’s mobile tools
                                    to track trips, access work, and stay
                                    connected.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 14 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() =>
                              handleNavigate("business-operations")
                            }
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#ba7a91]  rounded-full shrink-0 duration-300
                                        ${
                                          currentPath === "business-operations"
                                            ? "bg-[#ba7a91]"
                                            : "bg-[#C78EA430]"
                                        }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "business-operations"
                                            ? "fill-[#fff]"
                                            : "fill-[#ba7a91]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.5 7C10.5 6.172 11.172 5.5 12 5.5C12.828 5.5 13.5 6.172 13.5 7C13.5 7.828 12.828 8.5 12 8.5C11.172 8.5 10.5 7.828 10.5 7ZM6.302 9.128L6.82 8.83C6.617 8.257 6.5 7.642 6.5 7C6.5 6.358 6.616 5.743 6.82 5.17L6.302 4.872C5.823 4.596 5.659 3.985 5.934 3.506C6.211 3.027 6.822 2.864 7.3 3.138L7.818 3.437C8.621 2.496 9.735 1.829 11 1.596V1C11 0.448 11.448 0 12 0C12.552 0 13 0.448 13 1V1.596C14.268 1.83 15.384 2.499 16.188 3.444L16.718 3.139C17.196 2.865 17.808 3.028 18.084 3.507C18.359 3.986 18.195 4.597 17.716 4.873L17.183 5.18C17.384 5.751 17.5 6.362 17.5 7.001C17.5 7.64 17.385 8.251 17.183 8.822L17.716 9.129C18.195 9.405 18.359 10.016 18.084 10.495C17.899 10.816 17.563 10.996 17.216 10.996C17.047 10.996 16.875 10.953 16.718 10.863L16.188 10.558C15.386 11.5 14.275 12.168 13.011 12.404L13.018 12.989C13.024 13.541 12.582 13.994 12.03 14.001H12.017C11.471 14.001 11.024 13.561 11.017 13.013L11.01 12.407C9.741 12.175 8.623 11.508 7.817 10.564L7.299 10.863C7.142 10.953 6.97 10.996 6.801 10.996C6.455 10.996 6.119 10.816 5.933 10.495C5.658 10.016 5.822 9.405 6.301 9.129L6.302 9.128ZM8.5 7C8.5 8.93 10.07 10.5 12 10.5C13.93 10.5 15.5 8.93 15.5 7C15.5 5.07 13.93 3.5 12 3.5C10.07 3.5 8.5 5.07 8.5 7ZM24 20C24 22.206 22.206 24 20 24H4C1.794 24 0 22.206 0 20C0 17.794 1.794 16 4 16H20C22.206 16 24 17.794 24 20ZM4 22H14V18H4C2.897 18 2 18.897 2 20C2 21.103 2.897 22 4 22ZM22 20C22 18.897 21.103 18 20 18H16V22H20C21.103 22 22 21.103 22 20Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a45e73] duration-300
                                      ${
                                        currentPath === "business-operations"
                                          ? "text-[#a45e73]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Business Operations
                                </h3>
                                <Tooltip
                                  content="Jugl powers operations with repeatable
                                      processes, clear ownership, and real-time
                                      tracking — all in one place."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl powers operations with repeatable
                                    processes, clear ownership, and real-time
                                    tracking — all in one place.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 4 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("asset-management")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#b381a2]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "asset-management"
                                          ? "bg-[#b381a2]"
                                          : "bg-[#9C64862E]"
                                      }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                      
                                      ${
                                        currentPath === "asset-management"
                                          ? "fill-[#fff]"
                                          : "fill-[#b381a2]"
                                      }
                                      `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_3567_128792)">
                                    <path d="M23.632 14.256C23.357 13.777 22.744 13.612 22.266 13.889L21.289 14.452C20.684 13.8 19.896 13.326 19 13.121V12C19 11.447 18.552 11 18 11C17.448 11 17 11.447 17 12V13.121C16.104 13.326 15.315 13.799 14.711 14.452L13.734 13.889C13.257 13.614 12.644 13.778 12.368 14.256C12.093 14.735 12.257 15.346 12.736 15.621L13.719 16.187C13.59 16.605 13.501 17.04 13.501 17.5C13.501 17.96 13.59 18.395 13.719 18.813L12.736 19.379C12.257 19.654 12.093 20.266 12.368 20.744C12.553 21.065 12.889 21.245 13.236 21.245C13.405 21.245 13.577 21.202 13.734 21.111L14.711 20.548C15.316 21.2 16.104 21.674 17 21.879V23C17 23.553 17.448 24 18 24C18.552 24 19 23.553 19 23V21.879C19.896 21.674 20.685 21.201 21.289 20.548L22.266 21.111C22.423 21.202 22.595 21.245 22.764 21.245C23.11 21.245 23.447 21.065 23.632 20.744C23.907 20.265 23.743 19.654 23.264 19.379L22.281 18.813C22.41 18.395 22.499 17.96 22.499 17.5C22.499 17.04 22.41 16.605 22.281 16.187L23.264 15.621C23.743 15.346 23.907 14.734 23.632 14.256ZM18 20C16.622 20 15.5 18.879 15.5 17.5C15.5 16.121 16.622 15 18 15C19.378 15 20.5 16.121 20.5 17.5C20.5 18.879 19.378 20 18 20ZM5 7.00002H7.528C7.682 7.00002 7.838 7.03602 7.975 7.10502L11.131 8.68302C11.546 8.89002 12.009 8.99902 12.472 8.99902H19C20.37 8.99902 21.565 9.92402 21.906 11.248C22.043 11.782 22.585 12.104 23.123 11.968C23.658 11.83 23.98 11.285 23.842 10.75C23.274 8.54102 21.283 6.99902 19 6.99902V4.82702C19 4.02602 18.688 3.27202 18.121 2.70602L16.293 0.878023C15.727 0.312023 14.973 -0.000976562 14.171 -0.000976562H9C6.794 -0.000976562 5 1.79302 5 3.99902V4.99902C2.243 5.00002 0 7.24302 0 10V19C0 21.757 2.243 24 5 24H10C10.552 24 11 23.553 11 23C11 22.447 10.552 22 10 22H5C3.346 22 2 20.654 2 19V13H10C10.552 13 11 12.553 11 12C11 11.447 10.552 11 10 11H2V10C2 8.34602 3.346 7.00002 5 7.00002ZM7 4.00002C7 2.89702 7.897 2.00002 9 2.00002H14V4.00002C14 4.55202 14.448 5.00002 15 5.00002H17V7.00002H12.472C12.318 7.00002 12.162 6.96402 12.025 6.89502L8.869 5.31702C8.454 5.11002 7.991 5.00102 7.528 5.00102H7V4.00002Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3567_128792">
                                      <rect width="24" height="24" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#b381a2] duration-300
                                      ${
                                        currentPath === "asset-management"
                                          ? "text-[#b381a2]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Asset Management
                                </h3>
                                <Tooltip
                                  content="Track and manage all assets—know what you
                                      own, where it is, and who’s responsible
                                      with Jugl."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Track and manage all assets—know what you
                                    own, where it is, and who’s responsible with
                                    Jugl.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* order managemnet */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("order-management")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#33845a]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "order-management"
                                          ? "bg-[#33845a]"
                                          : "bg-[#dbf0e1]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "order-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#33845a]"
                                        }
                                        `}
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_3811_109408)">
                                    <path d="M22 14C22 14.553 21.552 15 21 15H6.737C7.153 16.174 8.265 17 9.557 17H19C19.552 17 20 17.447 20 18C20 18.553 19.552 19 19 19H9.557C7.022 19 4.887 17.102 4.591 14.585L3.215 2.884C3.156 2.38 2.729 2 2.222 2H1C0.448 2 0 1.553 0 1C0 0.447 0.448 0 1 0H2.222C3.743 0 5.024 1.139 5.201 2.649L5.242 3H9C9.552 3 10 3.447 10 4C10 4.553 9.552 5 9 5H5.478L6.419 13H21C21.552 13 22 13.447 22 14ZM7 20C5.895 20 5 20.895 5 22C5 23.105 5.895 24 7 24C8.105 24 9 23.105 9 22C9 20.895 8.105 20 7 20ZM17 20C15.895 20 15 20.895 15 22C15 23.105 15.895 24 17 24C18.105 24 19 23.105 19 22C19 20.895 18.105 20 17 20ZM19 5.586V4C19 3.447 18.552 3 18 3C17.448 3 17 3.447 17 4V6C17 6.266 17.105 6.52 17.293 6.707L18.293 7.707C18.488 7.902 18.744 8 19 8C19.256 8 19.512 7.902 19.707 7.707C20.098 7.316 20.098 6.684 19.707 6.293L19 5.586ZM24 6C24 9.309 21.309 12 18 12C14.691 12 12 9.309 12 6C12 2.691 14.691 0 18 0C21.309 0 24 2.691 24 6ZM22 6C22 3.794 20.206 2 18 2C15.794 2 14 3.794 14 6C14 8.206 15.794 10 18 10C20.206 10 22 8.206 22 6Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3811_109408">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#33845a] duration-300
                                      ${
                                        currentPath === "order-management"
                                          ? "text-[#33845a]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Order Management
                                </h3>
                                <Tooltip
                                  content=" Simplify order management with Jugl from
                                      request to fulfillment, invoicing, and
                                      follow-ups, all-in-one."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Simplify order management with Jugl from
                                    request to fulfillment, invoicing, and
                                    follow-ups, all-in-one.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 5 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("product-management")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "product-management"
                                          ? "bg-[#f8853f]"
                                          : "bg-[#FBB57E30]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "product-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#f8853f]"
                                        }
                                        `}
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300
                                      ${
                                        currentPath === "product-management"
                                          ? "text-[#f8853f]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Product Management
                                </h3>
                                <Tooltip
                                  content=" Jugl’s Product Light manages up to 250
                                      items with inventory updates, images, and
                                      custom fields — effortlessly."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl’s Product Light manages up to 250 items
                                    with inventory updates, images, and custom
                                    fields — effortlessly.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 7 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() =>
                              navigate("human-resources-recruiting")
                            }
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath ===
                                        "human-resources-recruiting"
                                          ? "bg-[#a2745e]"
                                          : "bg-[#B18D7433]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath ===
                                          "human-resources-recruiting"
                                            ? "fill-[#fff]"
                                            : "fill-[#a2745e]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.5 2.5C9.5 1.119 10.619 0 12 0C13.381 0 14.5 1.119 14.5 2.5C14.5 3.881 13.381 5 12 5C10.619 5 9.5 3.881 9.5 2.5ZM21 3C19.346 3 18 4.346 18 6V11.184C17.734 11.09 17.458 11.02 17.168 11.004C16.375 10.962 15.601 11.23 14.995 11.773L11.986 14.542C11.903 14.458 11.826 14.37 11.739 14.289L8.995 11.764C8.398 11.23 7.621 10.963 6.832 11.004C6.542 11.02 6.266 11.09 6 11.184V6C6 4.346 4.654 3 3 3C1.346 3 0 4.346 0 6V16.101C0 18.238 0.832 20.247 2.343 21.758L4.293 23.708C4.488 23.903 4.744 24.001 5 24.001C5.256 24.001 5.512 23.903 5.707 23.708C6.098 23.317 6.098 22.684 5.707 22.294L3.757 20.344C2.624 19.211 2 17.704 2 16.101V6C2 5.449 2.448 5 3 5C3.552 5 4 5.449 4 6C4 6 3.995 14.076 4 14.116C4.03 14.771 4.285 15.425 4.746 15.973L7.362 18.694C7.744 19.092 8.377 19.105 8.776 18.721C9.173 18.338 9.186 17.705 8.803 17.307L6.232 14.637C5.916 14.26 5.925 13.699 6.254 13.332C6.431 13.134 6.675 13.017 6.941 13.002C7.204 12.984 7.462 13.077 7.651 13.246L10.384 15.762C11.41 16.706 11.999 18.048 11.999 19.442V23.001C11.999 23.553 12.446 24.001 12.999 24.001C13.552 24.001 13.999 23.553 13.999 23.001V19.442C13.999 18.29 13.705 17.167 13.175 16.166L16.338 13.255C16.536 13.077 16.793 12.984 17.058 13.002C17.324 13.017 17.568 13.134 17.745 13.332C17.905 13.51 18.186 14.212 17.812 14.586L15.279 17.22C14.896 17.618 14.909 18.251 15.306 18.634C15.5 18.821 15.749 18.913 15.999 18.913C16.262 18.913 16.523 18.81 16.72 18.606L19.298 15.921C19.748 15.385 19.984 14.726 19.999 14.064C20.001 14.041 19.999 5.999 19.999 5.999C19.999 5.448 20.447 4.999 20.999 4.999C21.551 4.999 21.999 5.448 21.999 5.999V16.1C21.999 17.703 21.375 19.209 20.242 20.343L18.292 22.293C17.901 22.683 17.901 23.316 18.292 23.707C18.487 23.902 18.743 24 18.999 24C19.255 24 19.511 23.902 19.706 23.707L21.656 21.757C23.167 20.246 23.999 18.237 23.999 16.1V6C23.999 4.346 22.654 3 21 3ZM10.329 10.274L11.193 11.069C11.649 11.489 12.351 11.489 12.807 11.069L13.641 10.302C14.31 9.703 15.124 9.315 15.979 9.132C15.984 9.124 15.987 9.12 15.992 9.112C15.579 7.33 13.949 6 12.001 6C10.053 6 8.424 7.329 8.01 9.11C8.015 9.118 8.017 9.122 8.022 9.129C8.853 9.302 9.653 9.668 10.33 10.273L10.329 10.274Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300
                                      ${
                                        currentPath ===
                                        "human-resources-recruiting"
                                          ? "text-[#a2745e]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Human Resources & Recruiting
                                </h3>
                                <Tooltip
                                  content="Jugl streamlines hiring, onboarding, and
                                      training keeping HR organized and
                                      employees supported every step."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl streamlines hiring, onboarding, and
                                    training keeping HR organized and employees
                                    supported every step.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 1 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("project-management")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#ed79ae]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "project-management"
                                          ? "bg-[#ed79ae]"
                                          : "bg-[#E2498A33]"
                                      }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "project-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#ed79ae]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M19 0H5C2.243 0 0 2.243 0 5V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM22 19C22 20.654 20.654 22 19 22H5C3.346 22 2 20.654 2 19V5C2 4.648 2.072 4.314 2.184 4H21.816C21.928 4.314 22 4.648 22 5V19ZM4 8C4 7.448 4.447 7 5 7H8C8.553 7 9 7.448 9 8C9 8.552 8.553 9 8 9H5C4.447 9 4 8.552 4 8ZM14 13C14 13.553 13.553 14 13 14H7C6.447 14 6 13.553 6 13C6 12.447 6.447 12 7 12H13C13.553 12 14 12.448 14 13ZM14 18C14 18.553 13.553 19 13 19H5C4.447 19 4 18.553 4 18C4 17.447 4.447 17 5 17H13C13.553 17 14 17.447 14 18ZM20 18C20 19.105 19.105 20 18 20C16.895 20 16 19.105 16 18C16 17.262 16.405 16.624 17 16.277V10C17 9.449 16.552 9 16 9H14.723C14.377 9.595 13.739 10 13 10C11.895 10 11 9.105 11 8C11 6.895 11.895 6 13 6C13.738 6 14.376 6.405 14.723 7H16C17.654 7 19 8.346 19 10V16.277C19.595 16.623 20 17.261 20 18Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#ff66ae] duration-300 ${
                                    currentPath === "project-management"
                                      ? "text-[#ff66ae]"
                                      : "text-[#24262B]"
                                  }`}
                                >
                                  Project Management
                                </h3>
                                <Tooltip
                                  content="Jugl keeps projects moving, teams aligned,
                                      and steps clear—from launches to
                                      onboarding and initiatives."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl keeps projects moving, teams aligned,
                                    and steps clear—from launches to onboarding
                                    and initiatives.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 27 --> */}
                          <div className="relative rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M1.33263 7.23768C0.483631 5.52168 -1.20037 1.26868 1.19963 0.149678C1.55645 0.00114058 1.94938 -0.0379524 2.32847 0.0373672C2.70756 0.112687 3.0557 0.299018 3.32863 0.572677L8.28863 5.87268C8.38233 5.96473 8.45698 6.07434 8.50832 6.19525C8.55965 6.31616 8.58667 6.44599 8.58783 6.57734C8.58899 6.70869 8.56427 6.83898 8.51508 6.96077C8.46589 7.08257 8.39319 7.19348 8.30113 7.28718C8.20907 7.38088 8.09946 7.45552 7.97856 7.50686C7.85765 7.5582 7.72782 7.58522 7.59647 7.58638C7.46512 7.58754 7.33483 7.56282 7.21304 7.51363C7.09124 7.46443 6.98033 7.39173 6.88663 7.29968L1.99963 2.07968C2.11863 5.85668 4.34263 8.67968 6.84063 11.5187C7.03238 11.703 7.14306 11.956 7.14831 12.2219C7.15356 12.4878 7.05296 12.7449 6.86863 12.9367C6.68431 13.1284 6.43136 13.2391 6.16543 13.2444C5.8995 13.2496 5.64238 13.149 5.45063 12.9647C3.80914 11.2641 2.42213 9.33516 1.33263 7.23768ZM18.0046 16.1997C17.8684 16.0504 17.6982 15.9361 17.5085 15.8665C17.3188 15.7969 17.1151 15.774 16.9146 15.7997C15.7546 15.9554 14.5745 15.8564 13.4566 15.5097C13.2854 15.4592 13.1037 15.4561 12.931 15.5008C12.7582 15.5456 12.6008 15.6364 12.4756 15.7637C10.9816 18.0197 15.7496 17.8767 16.7876 17.8437L22.2706 23.6827C22.3607 23.7784 22.4686 23.8555 22.5885 23.9095C22.7083 23.9635 22.8375 23.9933 22.9689 23.9974C23.1002 24.0014 23.2311 23.9795 23.354 23.933C23.4769 23.8865 23.5894 23.8162 23.6851 23.7262C23.7809 23.6362 23.8579 23.5282 23.9119 23.4084C23.9659 23.2886 23.9958 23.1593 23.9998 23.0279C24.0039 22.8966 23.982 22.7657 23.9355 22.6428C23.8889 22.5199 23.8187 22.4074 23.7286 22.3117L18.0046 16.1997ZM14.9996 13.9997C15.6562 14.0006 16.3066 13.8719 16.9133 13.6211C17.5201 13.3702 18.0714 13.002 18.5356 12.5377L23.7066 7.36568C23.7996 7.27283 23.8734 7.16258 23.9238 7.04123C23.9741 6.91987 24.0001 6.78978 24.0002 6.65838C24.0003 6.52699 23.9745 6.39686 23.9243 6.27543C23.8741 6.15401 23.8005 6.04365 23.7076 5.95068C23.6148 5.8577 23.5045 5.78392 23.3832 5.73355C23.2618 5.68319 23.1317 5.65721 23.0003 5.65712C22.8689 5.65703 22.7388 5.68282 22.6174 5.73301C22.496 5.78321 22.3856 5.85683 22.2926 5.94968L17.1216 11.1217C16.6825 11.557 16.1195 11.846 15.5099 11.9491C14.9002 12.0522 14.2735 11.9644 13.7156 11.6977L20.7066 4.70668C20.8021 4.61443 20.8783 4.50409 20.9307 4.38208C20.9831 4.26008 21.0107 4.12886 21.0119 3.99608C21.013 3.8633 20.9877 3.73162 20.9375 3.60872C20.8872 3.48583 20.8129 3.37418 20.719 3.28028C20.6251 3.18639 20.5135 3.11214 20.3906 3.06186C20.2677 3.01157 20.136 2.98627 20.0032 2.98743C19.8705 2.98858 19.7392 3.01617 19.6172 3.06858C19.4952 3.12099 19.3849 3.19717 19.2926 3.29268L12.2996 10.2837C12.0329 9.72581 11.9451 9.09915 12.0482 8.48946C12.1513 7.87976 12.4403 7.31683 12.8756 6.87768L18.0496 1.70668C18.2318 1.51808 18.3326 1.26547 18.3303 1.00328C18.328 0.74108 18.2229 0.490267 18.0375 0.304859C17.852 0.119451 17.6012 0.0142819 17.339 0.0120035C17.0768 0.00972505 16.8242 0.110519 16.6356 0.292678L11.4636 5.46368C10.6504 6.27969 10.1432 7.35106 10.0275 8.4973C9.91187 9.64355 10.1948 10.7946 10.8286 11.7567L0.292631 22.2927C0.110473 22.4813 0.00967892 22.7339 0.0119573 22.9961C0.0142358 23.2583 0.119405 23.5091 0.304813 23.6945C0.490221 23.8799 0.741033 23.9851 1.00323 23.9874C1.26543 23.9896 1.51803 23.8888 1.70663 23.7067L12.2426 13.1707C13.0605 13.7113 14.0192 13.9996 14.9996 13.9997Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                  Restaurants & Food Service
                                </h3>
                                <Tooltip
                                  content="Go beyond POS, accounting and payroll
                                      systems and get all the ingredients for a
                                      thriving enterprise — including event
                                      coordination, menu development, marketing
                                      and more."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Go beyond POS, accounting and payroll
                                    systems and get all the ingredients for a
                                    thriving enterprise — including event
                                    coordination, menu development, marketing
                                    and more.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 2 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("sales-crm")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#48daff] rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "sales-crm"
                                          ? "bg-[#48daff]"
                                          : "bg-[#48daff33]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "sales-crm"
                                            ? "fill-[#fff]"
                                            : "fill-[#48daff]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M2 2C2 0.895 2.895 0 4 0C5.105 0 6 0.895 6 2C6 3.105 5.105 4 4 4C2.895 4 2 3.105 2 2ZM6 9H12V7.5C12 6.672 11.328 6 10.5 6H7.5C6.672 6 6 6.672 6 7.5V9ZM9 5C10.105 5 11 4.105 11 3C11 1.895 10.105 1 9 1C7.895 1 7 1.895 7 3C7 4.105 7.895 5 9 5ZM14 4C15.105 4 16 3.105 16 2C16 0.895 15.105 0 14 0C12.895 0 12 0.895 12 2C12 3.105 12.895 4 14 4ZM4 7.5C4 6.52 4.407 5.636 5.058 5H2.5C1.672 5 1 5.672 1 6.5V8H4V7.5ZM12.942 5C13.593 5.636 14 6.52 14 7.5V8H17V6.5C17 5.672 16.328 5 15.5 5H12.942ZM23.236 13.015L13.449 24H3C1.346 24 0 22.654 0 21V14C0 12.346 1.346 11 3 11H12.857C13.996 11 14.996 11.609 15.546 12.519L18.763 8.985C19.303 8.39 20.044 8.041 20.848 8.004C21.66 7.965 22.422 8.244 23.017 8.786C24.231 9.893 24.329 11.791 23.235 13.016L23.236 13.015ZM21.671 10.263C21.472 10.082 21.215 9.994 20.943 10.001C20.673 10.014 20.424 10.13 20.244 10.33L15.817 15.194C15.432 16.265 14.478 17.085 13.303 17.253L8.142 17.99L7.859 16.011L13.02 15.274C13.579 15.194 14 14.708 14 14.143C14 13.513 13.487 13.001 12.857 13.001H3C2.448 13.001 2 13.45 2 14.001V21.001C2 21.552 2.448 22.001 3 22.001H12.552L21.742 11.685C22.11 11.273 22.077 10.636 21.67 10.264L21.671 10.263Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#48daff] duration-300 ${
                                    currentPath === "sales-crm"
                                      ? "text-[#48daff]"
                                      : "text-[#24262B]"
                                  }`}
                                >
                                  Sales CRM
                                </h3>
                                <Tooltip
                                  content="Manage prospects and clients easily with
                                      Jugl’s fast, simple CRM—built for
                                      relationships, not complexity."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Manage prospects and clients easily with
                                    Jugl’s fast, simple CRM—built for
                                    relationships, not complexity.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 9 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("customer-success")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#af59f3]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "customer-success"
                                          ? "bg-[#af59f3]"
                                          : "bg-[#9B38E533]"
                                      }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "customer-success"
                                            ? "fill-[#fff]"
                                            : "fill-[#af59f3]"
                                        }
                                        `}
                                  viewBox="0 0 20 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6.50027 9.49991C6.50027 10.0509 6.62827 10.5729 6.85627 11.0369C6.36627 11.6649 6.06127 12.4439 6.02027 13.2929C5.07927 12.3049 4.50027 10.9689 4.50027 9.50091C4.50027 6.08991 7.62227 3.39391 11.1593 4.11991C13.2413 4.54791 14.9283 6.22491 15.3723 8.30391C15.5063 8.93191 15.5313 9.54691 15.4633 10.1349C15.4053 10.6329 14.9683 11.0009 14.4663 11.0009H14.4213C13.8293 11.0009 13.4133 10.4739 13.4783 9.88591C13.5223 9.49091 13.4993 9.07591 13.3983 8.65291C13.1003 7.39991 12.0783 6.38491 10.8233 6.09591C8.53727 5.57091 6.49927 7.30291 6.49927 9.50091L6.50027 9.49991ZM2.61027 8.20491C2.88427 6.61191 3.66327 5.15991 4.87127 4.02691C6.40027 2.59391 8.40227 1.88591 10.5013 2.01591C14.4543 2.27191 17.5453 5.73491 17.4993 9.88091C17.4803 11.6169 16.0263 12.9989 14.2913 12.9989H11.8853C11.6413 12.1699 10.8833 11.5599 9.97527 11.5599C8.87027 11.5599 7.97527 12.4549 7.97527 13.5599C7.97527 14.6649 8.87027 15.5599 9.97527 15.5599C10.5133 15.5599 11.0003 15.3449 11.3593 14.9989H14.2913C17.1103 14.9989 19.4593 12.7539 19.4993 9.93591C19.5733 4.71491 15.6513 0.34491 10.6303 0.0209097C7.96627 -0.15209 5.43927 0.75291 3.50427 2.56891C2.00527 3.97391 1.00827 5.83391 0.64927 7.83491C0.54027 8.44291 1.02127 9.00091 1.63827 9.00091C2.11027 9.00091 2.53127 8.67191 2.61027 8.20591V8.20491ZM10.0003 16.9999C6.30527 16.9999 3.10827 19.2919 2.04527 22.7019C1.88027 23.2289 2.17527 23.7899 2.70227 23.9549C3.22827 24.1139 3.78927 23.8239 3.95427 23.2979C4.74327 20.7679 7.22827 18.9999 9.99927 18.9999C12.7703 18.9999 15.2563 20.7679 16.0443 23.2979C16.1783 23.7259 16.5723 23.9999 16.9993 23.9999C17.0983 23.9999 17.1973 23.9849 17.2973 23.9549C17.8243 23.7899 18.1183 23.2289 17.9543 22.7019C16.8913 19.2919 13.6943 16.9999 9.99927 16.9999H10.0003Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300
                                      ${
                                        currentPath === "customer-success"
                                          ? "text-[#af59f3]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Customer Success
                                </h3>
                                <Tooltip
                                  content="Jugl helps track and grow customers with
                                      timely, personal tools that build trust
                                      and long-term value."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl helps track and grow customers with
                                    timely, personal tools that build trust and
                                    long-term value.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 8 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() =>
                              navigate("governance-risk-compliance")
                            }
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath ===
                                        "governance-risk-compliance"
                                          ? "bg-[#7e81ad]"
                                          : "bg-[#8990B82E]"
                                      }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath ===
                                          "governance-risk-compliance"
                                            ? "fill-[#fff]"
                                            : "fill-[#7e81ad]"
                                        }
                                        `}
                                  viewBox="0 0 22 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M21 22H20V13.999C21.104 13.995 22 13.097 22 11.992C22 11.256 21.598 10.58 20.953 10.23L12.349 5.537C12.237 5.476 12.116 5.444 11.999 5.4V4.38L14.634 2.745C15.129 2.415 15.118 1.685 14.614 1.37L12.152 0.215C11.927 0.074 11.667 0 11.401 0C10.619 0 9.984 0.634 9.984 1.417V5H9.999V5.4C9.882 5.445 9.761 5.476 9.649 5.537L1.047 10.23C0.401 10.581 0 11.255 0 11.992C0 13.097 0.897 13.995 2 13.999V22H1C0.448 22 0 22.447 0 23C0 23.553 0.448 24 1 24H21C21.553 24 22 23.553 22 23C22 22.447 21.553 22 21 22ZM10 14V22H8V14H10ZM12 14H14V22H12V14ZM16 14H18V22H16V14ZM2.004 11.986L10.608 7.293C10.853 7.158 11.146 7.158 11.391 7.293L19.992 12L2.002 11.987H2.004V11.986ZM4 13.999H6V21.999H4V13.999Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300
                                      ${
                                        currentPath ===
                                        "governance-risk-compliance"
                                          ? "text-[#7e81ad]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Governance, Risk & Compliance
                                </h3>
                                <Tooltip
                                  content="Jugl helps manage policies, audits,
                                      access, and compliance all where your team
                                      already works."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl helps manage policies, audits, access,
                                    and compliance all where your team already
                                    works.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 22 --> */}
                          <div className="relative rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e7e7e7] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM16 14C16 15.654 14.654 17 13 17V18C13 18.553 12.553 19 12 19C11.447 19 11 18.553 11 18V17H10.732C9.665 17 8.669 16.426 8.134 15.501C7.857 15.022 8.021 14.411 8.498 14.135C8.977 13.856 9.589 14.022 9.864 14.499C10.043 14.809 10.375 15 10.731 15H12.999C13.551 15 13.999 14.552 13.999 14C13.999 13.622 13.728 13.302 13.355 13.24L10.314 12.733C8.972 12.51 7.999 11.36 7.999 10C7.999 8.346 9.345 7 10.999 7V6C10.999 5.448 11.446 5 11.999 5C12.552 5 12.999 5.448 12.999 6V7H13.267C14.334 7 15.33 7.575 15.865 8.5C16.142 8.978 15.978 9.589 15.501 9.866C15.021 10.143 14.41 9.979 14.135 9.501C13.956 9.192 13.624 9.001 13.268 9.001H11C10.448 9.001 10 9.45 10 10.001C10 10.379 10.271 10.699 10.644 10.761L13.685 11.268C15.027 11.491 16 12.641 16 14.001V14Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#4f4f4f] duration-300">
                                  Finance & Accounting
                                </h3>
                                <Tooltip
                                  content="Change the way you control and power your
                                      vital financial and accounting processes.
                                      Don&apos;t just crunch numbers — get a
                                      powerful, all-in-one platform for all of
                                      your financial process."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Change the way you control and power your
                                    vital financial and accounting processes.
                                    Don&apos;t just crunch numbers — get a powerful,
                                    all-in-one platform for all of your
                                    financial process.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 13 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => handleNavigate("business-strategy")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#5b67f9]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "business-strategy"
                                          ? "bg-[#5b67f9]"
                                          : "bg-[#687FFF30]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "business-strategy"
                                            ? "fill-[#fff]"
                                            : "fill-[#5b67f9]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M19 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM11 2H13C13.6183 2.00256 14.2206 2.19608 14.7247 2.55409C15.2288 2.91209 15.6099 3.41709 15.816 4H8.184C8.39008 3.41709 8.77123 2.91209 9.2753 2.55409C9.77937 2.19608 10.3817 2.00256 11 2ZM5 6H19C19.7956 6 20.5587 6.31607 21.1213 6.87868C21.6839 7.44129 22 8.20435 22 9V12H2V9C2 8.20435 2.31607 7.44129 2.87868 6.87868C3.44129 6.31607 4.20435 6 5 6ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V14H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V14H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#5b67f9] duration-300
                                      ${
                                        currentPath === "business-strategy"
                                          ? "text-[#5b67f9]"
                                          : "text-[#24262B]"
                                      }

                                      `}
                                >
                                  Business Strategy
                                </h3>
                                <Tooltip
                                  content="Jugl turns plans into action with clear
                                      priorities, ownership, and visibility all
                                      in one workspace."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl turns plans into action with clear
                                    priorities, ownership, and visibility all in
                                    one workspace.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 10 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("construction")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "construction"
                                          ? "bg-[#6d6d6d]"
                                          : "bg-[#8A8A8A30]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "construction"
                                            ? "fill-[#fff]"
                                            : "fill-[#6d6d6d]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.89293 17.047C9.60193 17.016 9.30493 17 8.99993 17C5.26593 17 2.44993 19.461 1.99193 23.124C1.92893 23.63 1.49793 24 1.00093 24C0.958929 24 0.917929 23.997 0.875929 23.992C0.327929 23.924 -0.0610708 23.424 0.00792916 22.876C0.587929 18.238 4.28493 15 8.99993 15C9.37793 15 9.74793 15.02 10.1069 15.059C10.6559 15.119 11.0529 15.612 10.9939 16.161C10.9349 16.711 10.4349 17.1 9.89193 17.048L9.89293 17.047ZM1.49993 7C1.49993 6.447 1.94793 6 2.49993 6H2.99993V5.5C2.99993 2.468 5.46693 0 8.49993 0H9.49993C12.5329 0 14.9999 2.468 14.9999 5.5V6H15.4999C16.0529 6 16.4999 6.447 16.4999 7C16.4999 7.553 16.0529 8 15.4999 8H14.9999C14.9999 11.309 12.3089 14 8.99993 14C5.69093 14 2.99993 11.309 2.99993 8H2.49993C1.94793 8 1.49993 7.553 1.49993 7ZM12.9999 8H4.99993C4.99993 10.206 6.79393 12 8.99993 12C11.2059 12 12.9999 10.206 12.9999 8ZM4.99993 6H12.9999V5.5C12.9999 3.742 11.6919 2.296 9.99993 2.051V4C9.99993 4.553 9.55193 5 8.99993 5C8.44793 5 7.99993 4.553 7.99993 4V2.051C6.30793 2.296 4.99993 3.742 4.99993 5.5V6ZM22.4999 21H19.4999C18.6719 21 17.9999 21.672 17.9999 22.5C17.9999 23.328 18.6719 24 19.4999 24H22.4999C23.3279 24 23.9999 23.328 23.9999 22.5C23.9999 21.672 23.3279 21 22.4999 21ZM19.4999 14H22.4999C23.3279 14 23.9999 13.328 23.9999 12.5C23.9999 11.672 23.3279 11 22.4999 11H19.4999C18.6719 11 17.9999 11.672 17.9999 12.5C17.9999 13.328 18.6719 14 19.4999 14ZM14.4999 21H11.4999C10.6709 21 9.99993 21.672 9.99993 22.5C9.99993 23.328 10.6709 24 11.4999 24H14.4999C15.3279 24 15.9999 23.328 15.9999 22.5C15.9999 21.672 15.3279 21 14.4999 21ZM16.4999 16H14.4999C13.6719 16 12.9999 16.672 12.9999 17.5C12.9999 18.328 13.6719 19 14.4999 19H16.4999C17.3279 19 17.9999 18.328 17.9999 17.5C17.9999 16.672 17.3279 16 16.4999 16ZM22.4999 16H21.4999C20.6719 16 19.9999 16.672 19.9999 17.5C19.9999 18.328 20.6719 19 21.4999 19H22.4999C23.3279 19 23.9999 18.328 23.9999 17.5C23.9999 16.672 23.3279 16 22.4999 16Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300
                                      ${
                                        currentPath === "construction"
                                          ? "text-[#6d6d6d]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Construction
                                </h3>
                                <Tooltip
                                  content="Jugl keeps construction projects, teams,
                                      and materials on track all in one
                                      connected platform."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl keeps construction projects, teams, and
                                    materials on track all in one connected
                                    platform.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 11 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("colleges-universities")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#35ccae]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "colleges-universities"
                                          ? "bg-[#35ccae]"
                                          : "bg-[#1FC6A830]"
                                      }

                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath ===
                                          "colleges-universities"
                                            ? "fill-[#fff]"
                                            : "fill-[#35ccae]"
                                        }
                                        `}
                                  viewBox="0 0 24 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M22.0565 5.22998L14.6825 1.71698C13.0594 0.747414 11.039 0.730211 9.39954 1.67198L1.94257 5.22998C1.91459 5.24399 1.88557 5.25899 1.85857 5.27498C0.088949 6.28682 -0.525395 8.54165 0.486449 10.3113C0.829433 10.9112 1.33395 11.4027 1.94257 11.73L3.99959 12.71V17.61C4.00081 19.8011 5.42651 21.7368 7.51859 22.388C8.97448 22.8092 10.4841 23.0154 11.9996 23C13.5149 23.017 15.0245 22.8125 16.4806 22.393C18.5727 21.7419 19.9984 19.8061 19.9996 17.615V12.708L21.9996 11.752V20C21.9996 20.5522 22.4473 20.9999 22.9996 20.9999C23.5519 20.9999 23.9996 20.5522 23.9996 20V7.99996C24.0063 6.8257 23.0791 5.74091 22.0565 5.22998ZM17.9996 17.615C18.0001 18.9256 17.1498 20.0849 15.8996 20.478C14.6318 20.8402 13.318 21.0161 11.9996 21C10.6811 21.0161 9.36734 20.8402 8.09956 20.478C6.84936 20.0848 5.99904 18.9256 5.99956 17.615V13.663L9.31657 15.243C10.135 15.729 11.0697 15.9844 12.0216 15.982C12.9276 15.9884 13.8184 15.7486 14.5986 15.288L17.9996 13.663V17.615ZM21.1996 9.92498L13.6576 13.525C12.606 14.1373 11.3025 14.12 10.2676 13.48L2.88856 9.96998C2.06604 9.52645 1.75882 8.50012 2.20236 7.67765C2.35236 7.39949 2.57726 7.16891 2.85157 7.01198L10.3466 3.43199C11.3985 2.82102 12.7012 2.83832 13.7366 3.47699L21.1106 6.98999C21.6529 7.29112 21.9921 7.85976 21.9995 8.48001C22.0005 9.06754 21.698 9.61391 21.1996 9.92498Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#35ccae] duration-300
                                      ${
                                        currentPath === "colleges-universities"
                                          ? "text-[#35ccae]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Colleges & Universities
                                </h3>
                                <Tooltip
                                  content="Jugl helps higher education teams
                                      coordinate admissions, academics, and
                                      operations all in one platform."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl helps higher education teams coordinate
                                    admissions, academics, and operations all in
                                    one platform.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                            onClick={() =>
                              navigate("student-project-management")
                            }
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#e84b4b]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath ===
                                        "student-project-management"
                                          ? "bg-[#e84b4b]"
                                          : "bg-[#fde3e3]"
                                      }


                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath ===
                                          "student-project-management"
                                            ? "fill-[#fff]"
                                            : "fill-[#e84b4b]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_4129_117666)">
                                    <path d="M21.9426 4.49952L13.7216 0.389524C12.6736 -0.131476 11.3216 -0.131476 10.2756 0.391524L2.05664 4.49952L5.99964 6.47052V8.99952C5.99964 12.3085 8.69064 14.9995 11.9996 14.9995C15.3086 14.9995 17.9996 12.3085 17.9996 8.99952V6.47052L19.9996 5.47052V11.9995H21.9996V4.49952H21.9426ZM11.1696 2.18052C11.6506 1.94152 12.3496 1.94052 12.8296 2.18052L17.4706 4.50052L12.8286 6.81952C12.3496 7.05952 11.6516 7.05952 11.1706 6.81952L6.52964 4.50052L11.1686 2.18152L11.1696 2.18052ZM16.0006 8.99952C16.0006 11.2055 14.2066 12.9995 12.0006 12.9995C9.79464 12.9995 8.00064 11.2055 8.00064 8.99952V7.47052L10.2766 8.60852C10.8006 8.87052 11.4016 9.00152 12.0016 9.00152C12.6016 9.00152 13.2016 8.87052 13.7246 8.60852L16.0006 7.47052V8.99952ZM20.0006 20.4995V23.9995H18.0006V20.4995C18.0006 19.2235 17.0396 18.1665 15.8016 18.0185L12.0146 22.5615L8.22464 18.0145C6.97464 18.1525 5.99964 19.2145 5.99964 20.4995V23.9995H3.99964V20.4995C3.99964 18.0185 6.01864 15.9995 8.49964 15.9995H9.14764L12.0136 19.4375L14.8786 15.9995H15.4986C17.9796 15.9995 19.9986 18.0185 19.9986 20.4995H20.0006Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4129_117666">
                                      <rect width="24" height="24" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b] duration-300
                                      ${
                                        currentPath ===
                                        "student-project-management"
                                          ? "text-[#e84b4b]"
                                          : "text-[#24262B]"
                                      }

                                      `}
                                >
                                  Student Project Management
                                </h3>
                                <Tooltip
                                  content="Jugl helps students manage academic
                                      projects with structure, teamwork, and
                                      clear communication all in one place."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl helps students manage academic projects
                                    with structure, teamwork, and clear
                                    communication all in one place.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 12 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => handleNavigate("real-estate")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#6dd348]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "real-estate"
                                        ? "bg-[#6dd348]"
                                        : "bg-[#dcf7d0]"
                                    }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                         ${
                                           currentPath === "real-estate"
                                             ? "fill-[#fff]"
                                             : "fill-[#6dd348]"
                                         }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 14C7 14.2652 6.89464 14.5196 6.70711 14.7071C6.51957 14.8946 6.26522 15 6 15H5C4.73478 15 4.48043 14.8946 4.29289 14.7071C4.10536 14.5196 4 14.2652 4 14C4 13.7348 4.10536 13.4804 4.29289 13.2929C4.48043 13.1054 4.73478 13 5 13H6C6.26522 13 6.51957 13.1054 6.70711 13.2929C6.89464 13.4804 7 13.7348 7 14ZM11 13H10C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13ZM6 17H5C4.73478 17 4.48043 17.1054 4.29289 17.2929C4.10536 17.4804 4 17.7348 4 18C4 18.2652 4.10536 18.5196 4.29289 18.7071C4.48043 18.8946 4.73478 19 5 19H6C6.26522 19 6.51957 18.8946 6.70711 18.7071C6.89464 18.5196 7 18.2652 7 18C7 17.7348 6.89464 17.4804 6.70711 17.2929C6.51957 17.1054 6.26522 17 6 17ZM11 17H10C9.73478 17 9.48043 17.1054 9.29289 17.2929C9.10536 17.4804 9 17.7348 9 18C9 18.2652 9.10536 18.5196 9.29289 18.7071C9.48043 18.8946 9.73478 19 10 19H11C11.2652 19 11.5196 18.8946 11.7071 18.7071C11.8946 18.5196 12 18.2652 12 18C12 17.7348 11.8946 17.4804 11.7071 17.2929C11.5196 17.1054 11.2652 17 11 17ZM6 5H5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6C4 6.26522 4.10536 6.51957 4.29289 6.70711C4.48043 6.89464 4.73478 7 5 7H6C6.26522 7 6.51957 6.89464 6.70711 6.70711C6.89464 6.51957 7 6.26522 7 6C7 5.73478 6.89464 5.48043 6.70711 5.29289C6.51957 5.10536 6.26522 5 6 5ZM11 5H10C9.73478 5 9.48043 5.10536 9.29289 5.29289C9.10536 5.48043 9 5.73478 9 6C9 6.26522 9.10536 6.51957 9.29289 6.70711C9.48043 6.89464 9.73478 7 10 7H11C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6 9H5C4.73478 9 4.48043 9.10536 4.29289 9.29289C4.10536 9.48043 4 9.73478 4 10C4 10.2652 4.10536 10.5196 4.29289 10.7071C4.48043 10.8946 4.73478 11 5 11H6C6.26522 11 6.51957 10.8946 6.70711 10.7071C6.89464 10.5196 7 10.2652 7 10C7 9.73478 6.89464 9.48043 6.70711 9.29289C6.51957 9.10536 6.26522 9 6 9ZM11 9H10C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11H11C11.2652 11 11.5196 10.8946 11.7071 10.7071C11.8946 10.5196 12 10.2652 12 10C12 9.73478 11.8946 9.48043 11.7071 9.29289C11.5196 9.10536 11.2652 9 11 9ZM24 10V19C23.9984 20.3256 23.4711 21.5964 22.5338 22.5338C21.5964 23.4711 20.3256 23.9984 19 24H5C3.67441 23.9984 2.40356 23.4711 1.46622 22.5338C0.528882 21.5964 0.00158786 20.3256 0 19L0 5C0.00158786 3.67441 0.528882 2.40356 1.46622 1.46622C2.40356 0.528882 3.67441 0.00158786 5 0L11 0C12.3256 0.00158786 13.5964 0.528882 14.5338 1.46622C15.4711 2.40356 15.9984 3.67441 16 5H19C20.3256 5.00159 21.5964 5.52888 22.5338 6.46622C23.4711 7.40356 23.9984 8.67441 24 10ZM5 22H14V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22ZM22 10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7956 7 19 7H16V22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V10ZM19 13C18.8022 13 18.6089 13.0586 18.4444 13.1685C18.28 13.2784 18.1518 13.4346 18.0761 13.6173C18.0004 13.8 17.9806 14.0011 18.0192 14.1951C18.0578 14.3891 18.153 14.5673 18.2929 14.7071C18.4327 14.847 18.6109 14.9422 18.8049 14.9808C18.9989 15.0194 19.2 14.9996 19.3827 14.9239C19.5654 14.8482 19.7216 14.72 19.8315 14.5556C19.9414 14.3911 20 14.1978 20 14C20 13.7348 19.8946 13.4804 19.7071 13.2929C19.5196 13.1054 19.2652 13 19 13ZM19 17C18.8022 17 18.6089 17.0586 18.4444 17.1685C18.28 17.2784 18.1518 17.4346 18.0761 17.6173C18.0004 17.8 17.9806 18.0011 18.0192 18.1951C18.0578 18.3891 18.153 18.5673 18.2929 18.7071C18.4327 18.847 18.6109 18.9422 18.8049 18.9808C18.9989 19.0194 19.2 18.9996 19.3827 18.9239C19.5654 18.8482 19.7216 18.72 19.8315 18.5556C19.9414 18.3911 20 18.1978 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17ZM19 9C18.8022 9 18.6089 9.05865 18.4444 9.16853C18.28 9.27841 18.1518 9.43459 18.0761 9.61732C18.0004 9.80004 17.9806 10.0011 18.0192 10.1951C18.0578 10.3891 18.153 10.5673 18.2929 10.7071C18.4327 10.847 18.6109 10.9422 18.8049 10.9808C18.9989 11.0194 19.2 10.9996 19.3827 10.9239C19.5654 10.8482 19.7216 10.72 19.8315 10.5556C19.9414 10.3911 20 10.1978 20 10C20 9.73478 19.8946 9.48043 19.7071 9.29289C19.5196 9.10536 19.2652 9 19 9Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6dd348] duration-300
                                      ${
                                        currentPath === "real-estate"
                                          ? "text-[#6dd348]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Real Estate
                                </h3>
                                <Tooltip
                                  content=" Jugl streamlines real estate operations
                                      from listings to closings keeping teams
                                      organized, fast, and connected."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl streamlines real estate operations from
                                    listings to closings keeping teams
                                    organized, fast, and connected.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => handleNavigate("okr")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300
                                     ${
                                       currentPath === "okr"
                                         ? "bg-[#21adb9]"
                                         : "bg-[#2DC0CA33]"
                                     }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                      ${
                                        currentPath === "okr"
                                          ? "fill-[#fff]"
                                          : "fill-[#21adb9]"
                                      }
                                        `}
                                  id="Layer_1"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-name="Layer 1"
                                >
                                  <path d="m7 11c0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.448-1 1-1s1 .448 1 1c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c.552 0 1 .448 1 1s-.448 1-1 1c-2.757 0-5 2.243-5 5zm5 1c-.552 0-1-.448-1-1 0-.276.112-.526.293-.707l1.982-1.982c-1.112-.501-2.51-.319-3.397.568s0 0 0 0c-.566.566-.878 1.32-.878 2.121s.312 1.555.878 2.121 1.32.879 2.122.879 1.555-.312 2.121-.878.879-1.32.879-2.122c0-.454-.11-.888-.3-1.286l-1.992 1.992c-.181.181-.431.293-.707.293zm1.275-3.69c.309.139.6.322.846.568s.433.531.578.835l1.714-1.714h2.586c.265 0 .52-.105.707-.293l2-2c.286-.286.372-.716.217-1.09s-.52-.617-.924-.617h-2v-1.999c0-.404-.244-.769-.617-.924-.375-.155-.804-.07-1.09.217l-2 2c-.188.188-.293.442-.293.707v2.586l-1.725 1.725zm6.02 10.9c2.267-2.016 3.705-4.945 3.705-8.21 0-.371-.018-.737-.054-1.099-.055-.549-.542-.951-1.094-.896-.549.055-.951.544-.896 1.094.029.296.044.597.044.901 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c.304 0 .604.015.901.044.556.056 1.04-.347 1.094-.896.055-.55-.347-1.04-.896-1.094-.362-.036-.729-.054-1.099-.054-6.065 0-11 4.935-11 11 0 3.265 1.438 6.194 3.705 8.21l-2.051 3.257c-.294.467-.154 1.084.313 1.379.46.292 1.083.158 1.379-.313l1.972-3.132c1.661 1.008 3.601 1.599 5.682 1.599s4.021-.591 5.682-1.599l1.972 3.132c.296.471.919.605 1.379.313.467-.294.608-.912.313-1.379z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300
                                      ${
                                        currentPath === "okr"
                                          ? "text-[#21adb9]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  OKR
                                </h3>
                                <Tooltip
                                  content=" Set bold OKRs and track real results with
                                      Jugl where goals stay connected to daily
                                      work."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Set bold OKRs and track real results with
                                    Jugl where goals stay connected to daily
                                    work.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 15 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => handleNavigate("legal-operations")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300
                                      ${
                                        currentPath === "legal-operations"
                                          ? "bg-[#f8853f]"
                                          : "bg-[#FBB57E30]"
                                      }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "legal-operations"
                                            ? "fill-[#fff]"
                                            : "fill-[#f8853f]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.944 12.669L20.913 4.009C20.493 2.807 19.354 1.999 18.081 1.999H13V1C13 0.448 12.553 0 12 0C11.447 0 11 0.448 11 1V2H5.919C4.646 2 3.507 2.808 3.087 4.009L0.056 12.669C0.019 12.775 0 13.301 0 13.301C0 15.807 1.871 17.868 4.26 17.993C5.501 18.062 6.694 17.622 7.598 16.764C8.49 15.918 9 14.728 9 13.5C9 13.5 8.979 12.768 8.939 12.658L5.794 4.008C5.835 4.003 5.877 4 5.919 4H11V22H5C4.447 22 4 22.448 4 23C4 23.552 4.447 24 5 24H19C19.553 24 20 23.552 20 23C20 22.448 19.553 22 19 22H13V4H18.081C18.123 4 18.165 4.002 18.206 4.008L15.06 12.658C15.02 12.767 14.999 13.5 14.999 13.5C14.999 14.729 15.51 15.918 16.401 16.764C17.246 17.566 18.229 17.993 19.74 17.993C22.131 17.993 23.999 15.807 23.999 13.301C23.999 13.301 23.981 12.775 23.944 12.669ZM4.364 15.997C3.283 15.94 2.378 15.095 2.098 14H6.95C6.85 14.499 6.6 14.954 6.221 15.313C5.719 15.79 5.057 16.032 4.365 15.996L4.364 15.997ZM6.572 12H2.409L4.451 6.167L6.572 12ZM19.549 6.167L21.591 12H17.428L19.549 6.167ZM19.637 15.997C18.949 16.033 18.283 15.791 17.78 15.314C17.401 14.954 17.151 14.499 17.051 14.001H21.903C21.623 15.095 20.719 15.941 19.638 15.998L19.637 15.997Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300
                                      ${
                                        currentPath === "legal-operations"
                                          ? "text-[#f8853f]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Legal Operations
                                </h3>
                                <Tooltip
                                  content=" Jugl gives legal teams a structured
                                      workspace to manage contracts, compliance,
                                      and requests — with full visibility."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl gives legal teams a structured
                                    workspace to manage contracts, compliance,
                                    and requests — with full visibility.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 17 --> */}
                          <div
                            className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("venture-capital")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#e84b4b]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "venture-capital"
                                        ? "bg-[#e84b4b]"
                                        : "bg-[#fde3e3]"
                                    }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "venture-capital"
                                            ? "fill-[#fff]"
                                            : "fill-[#e84b4b]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.2611 8.6C22.7711 8.152 22.1151 7.94 21.4601 8.015C15.8041 8.669 13.2041 12.45 12.0121 15.584C10.8201 12.45 8.22012 8.668 2.56512 8.015C1.91012 7.937 1.25312 8.152 0.762115 8.601C0.276115 9.046 0.00811504 9.674 0.024115 10.323C0.111115 13.593 1.18012 16.19 3.20312 18.043C5.81012 20.432 9.28612 20.906 11.0121 20.986V23C11.0121 23.553 11.4591 24 12.0121 24C12.5651 24 13.0121 23.553 13.0121 23V20.986C14.7391 20.906 18.2141 20.432 20.8221 18.043C22.8441 16.19 23.9141 13.593 24.0011 10.323C24.0181 9.673 23.7471 9.045 23.2611 8.6ZM4.55411 16.568C2.94711 15.095 2.09612 12.977 2.02512 10.27C2.02212 10.174 2.07912 10.107 2.11312 10.076C2.14612 10.046 2.21212 9.999 2.30312 9.999C2.31312 9.999 2.32412 9.999 2.33412 10C8.90112 10.759 10.5071 16.542 10.8941 18.974C9.39212 18.878 6.59612 18.438 4.55411 16.567V16.568ZM19.4801 16.559C17.4491 18.427 14.6401 18.873 13.1311 18.972C13.5181 16.538 15.1261 10.76 21.6911 10.001C21.7021 10.001 21.7121 10 21.7221 10C21.8131 10 21.8781 10.046 21.9111 10.076C21.9451 10.108 22.0031 10.175 22.0001 10.271C21.9291 12.972 21.0811 15.087 19.4791 16.56L19.4801 16.559ZM7.78211 4.696C7.39711 4.3 7.40711 3.667 7.80311 3.282L10.5971 0.575C10.9801 0.191 11.4891 0 11.9991 0C11.9991 0 11.9991 0 12.0001 0C12.5111 0.001 13.0231 0.196 13.4141 0.586L16.1961 3.282C16.5921 3.667 16.6021 4.3 16.2171 4.696C16.0211 4.899 15.7601 5 15.4991 5C15.2481 5 14.9971 4.906 14.8031 4.718L12.9991 2.97V9C12.9991 9.552 12.5521 10 11.9991 10C11.4461 10 10.9991 9.552 10.9991 9V2.983L9.19512 4.718C8.79912 5.101 8.16811 5.093 7.78211 4.696Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b] duration-300
                                      ${
                                        currentPath === "venture-capital"
                                          ? "text-[#e84b4b]"
                                          : "text-[#24262B]"
                                      }
                                      `}
                                >
                                  Venture Capital
                                </h3>
                                <Tooltip
                                  content="Solutions designed to manage the back
                                      office of any Venture Capital firm. Track
                                      limited partner investors, document fund
                                      strategies, review and vet potential
                                      deals, standardize due diligence processes
                                      and track portfolio company performance."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Solutions designed to manage the back office
                                    of any Venture Capital firm. Track limited
                                    partner investors, document fund strategies,
                                    review and vet potential deals, standardize
                                    due diligence processes and track portfolio
                                    company performance.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 18 --> */}
                          <div
                            className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("personal-productivity")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#05b2f2]  rounded-full shrink-0 duration-300
                                           ${
                                             currentPath ===
                                             "personal-productivity"
                                               ? "bg-[#05b2f2]"
                                               : "bg-[#dff3ff]"
                                           }
                                          `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                              ${
                                                currentPath ===
                                                "personal-productivity"
                                                  ? "fill-[#fff]"
                                                  : "fill-[#05b2f2]"
                                              }`}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M2.5 2.5C2.5 1.119 3.619 0 5 0C6.381 0 7.5 1.119 7.5 2.5C7.5 3.881 6.381 5 5 5C3.619 5 2.5 3.881 2.5 2.5ZM8 16.463V23C8 23.553 7.553 24 7 24C6.447 24 6 23.553 6 23V17H4V23C4 23.553 3.553 24 3 24C2.447 24 2 23.553 2 23V16.463C0.805 15.77 0 14.478 0 13V10C0 7.794 1.794 6 4 6H6C8.206 6 10 7.794 10 10V13C10 14.478 9.195 15.771 8 16.463ZM8 10C8 8.897 7.103 8 6 8H4C2.897 8 2 8.897 2 10V13C2 14.103 2.897 15 4 15H6C7.103 15 8 14.103 8 13V10ZM24 17C24 20.859 20.859 24 17 24C13.141 24 10 20.859 10 17C10 13.141 13.141 10 17 10C20.859 10 24 13.141 24 17ZM22 17C22 14.243 19.757 12 17 12C14.243 12 12 14.243 12 17C12 19.757 14.243 22 17 22C19.757 22 22 19.757 22 17ZM18.808 15.759L16.585 17.893C16.441 18.033 16.206 18.037 16.063 17.895L14.932 16.787C14.536 16.399 13.904 16.406 13.518 16.801C13.131 17.196 13.137 17.828 13.532 18.215L14.664 19.324C15.124 19.773 15.726 19.998 16.327 19.998C16.928 19.998 17.528 19.773 17.98 19.327L20.193 17.203C20.591 16.82 20.604 16.187 20.222 15.789C19.839 15.39 19.205 15.378 18.808 15.76V15.759Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#05b2f2] duration-300
                                            ${
                                              currentPath ===
                                              "personal-productivity"
                                                ? "text-[#05b2f2]"
                                                : "text-[#24262B]"
                                            }
                                            `}
                                >
                                  Personal Productivity
                                </h3>
                                <Tooltip
                                  content=" Discover curated solutions to help
                                      teammates stay organized, find a
                                      productive flow and implement healthy
                                      patterns to find a balance."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Discover curated solutions to help teammates
                                    stay organized, find a productive flow and
                                    implement healthy patterns to find a
                                    balance.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 16 --> */}
                          <div
                            className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("banks-credit-unions")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#a6aa38]  rounded-full shrink-0 duration-300
                                     ${
                                       currentPath === "banks-credit-unions"
                                         ? "bg-[#a6aa38]"
                                         : "bg-[#BCBE4433]"
                                     }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "banks-credit-unions"
                                            ? "fill-[#fff]"
                                            : "fill-[#a6aa38]"
                                        }
                                        
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 14H13C13.553 14 14 13.553 14 13C14 12.447 13.553 12 13 12H2.3C2.134 12 2 11.865 2 11.7C2 11.591 2.06 11.49 2.156 11.437L10.607 6.828C10.728 6.763 10.864 6.727 11 6.727C11.136 6.727 11.272 6.762 11.392 6.827L17.522 10.171C17.673 10.254 17.837 10.293 18 10.293C18.354 10.293 18.697 10.105 18.879 9.772C19.144 9.288 18.965 8.68 18.48 8.416L12.35 5.071C12.24 5.011 12.119 4.979 12.002 4.935V4.198L14.506 2.51C14.933 2.222 14.869 1.575 14.393 1.377L11.262 0.0709998C10.662 -0.179 10 0.262 10 0.912V4.934C9.883 4.979 9.761 5.011 9.65 5.071L1.199 9.682C0.46 10.085 0 10.859 0 11.701C0 12.867 0.875 13.822 2 13.97V22H1C0.448 22 0 22.447 0 23C0 23.553 0.448 24 1 24H10C10.552 24 11 23.553 11 23C11 22.447 10.552 22 10 22H8V14H10V15C10 15.553 10.448 16 11 16C11.552 16 12 15.553 12 15V14ZM6 22H4V14H6V22ZM19.642 14.308C19.916 14.011 20.178 13.683 20.383 13.334C20.729 12.744 20.268 12.001 19.584 12.001H16.417C15.733 12.001 15.273 12.744 15.618 13.334C15.822 13.683 16.084 14.011 16.359 14.308C13.983 15.187 12.001 17.828 12.001 20.512C12.001 22.436 13.571 24 15.501 24H20.501C22.431 24 24.001 22.436 24.001 20.512C24.001 17.828 22.018 15.187 19.642 14.308ZM20.5 22H15.5C14.673 22 14 21.332 14 20.512C14 18.32 16.056 16 18 16C19.944 16 22 18.319 22 20.512C22 21.332 21.327 22 20.5 22Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a6aa38] duration-300
                                      ${
                                        currentPath === "banks-credit-unions"
                                          ? "text-[#a6aa38]"
                                          : "text-[#24262B]"
                                      }
                                      
                                      `}
                                >
                                  Banks / Credit Unions
                                </h3>
                                <Tooltip
                                  content=" Elevate GRC Excellence: Discover the
                                      ultimate enterprise solution tailored for
                                      Banks and Credit Unions. From beginners to
                                      experts, enjoy user-friendly features and
                                      seamless cross-team collaboration across
                                      GRC practice areas."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Elevate GRC Excellence: Discover the
                                    ultimate enterprise solution tailored for
                                    Banks and Credit Unions. From beginners to
                                    experts, enjoy user-friendly features and
                                    seamless cross-team collaboration across GRC
                                    practice areas.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 19 --> */}
                          <div
                            className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300"
                            onClick={() => navigate("professional-service")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#c268cd]  rounded-full shrink-0 duration-300

                                     ${
                                       currentPath === "professional-service"
                                         ? "bg-[#c268cd]"
                                         : "bg-[#f7edfa]"
                                     }`}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                         ${
                                           currentPath ===
                                           "professional-service"
                                             ? "fill-[#fff]"
                                             : "fill-[#c268cd]"
                                         }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 2C11.206 2 13 3.794 13 6C13 8.206 11.206 10 9 10C6.794 10 5 8.206 5 6C5 3.794 6.794 2 9 2ZM10 15C10 15.552 9.552 16 9 16C5.14 16 2 19.14 2 23C2 23.552 1.552 24 1 24C0.448 24 0 23.552 0 23C0 18.038 4.038 14 9 14C9.552 14 10 14.448 10 15ZM21 14.051V14C21 12.897 20.103 12 19 12H17C15.897 12 15 12.897 15 14V14.051C13.308 14.296 12 15.742 12 17.5V20.5C12 22.43 13.57 24 15.5 24H20.5C22.43 24 24 22.43 24 20.5V17.5C24 15.742 22.692 14.296 21 14.051ZM15.5 16H20.5C21.327 16 22 16.673 22 17.5V18H14V17.5C14 16.673 14.673 16 15.5 16ZM20.5 22H15.5C14.673 22 14 21.327 14 20.5V20H17C17 20.552 17.448 21 18 21C18.552 21 19 20.552 19 20H22V20.5C22 21.327 21.327 22 20.5 22Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#c268cd] duration-300
                                       ${
                                         currentPath === "professional-service"
                                           ? "text-[#c268cd]"
                                           : "text-[#24262B]"
                                       }
                                      `}
                                >
                                  Professional Services
                                </h3>
                                <Tooltip
                                  content="Give your human capital a performance
                                      boost to complete work orders, deliver
                                      engagements and manage projects faster and
                                      smarter than ever before."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Give your human capital a performance boost
                                    to complete work orders, deliver engagements
                                    and manage projects faster and smarter than
                                    ever before.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 20 --> */}
                          <div
                            className="relative rounded-[12px] group/menu hover:shadow-lg duration-300 cursor-pointer"
                            onClick={() => navigate("security-operations")}
                          >
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#c87847]  rounded-full shrink-0 duration-300
                                          ${
                                            currentPath ===
                                            "security-operations"
                                              ? "bg-[#c87847]"
                                              : "bg-[#f6ebde]"
                                          }
                                          `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                               ${
                                                 currentPath ===
                                                 "security-operations"
                                                   ? "fill-[#fff]"
                                                   : "fill-[#c87847]"
                                               } 
                                          `}
                                  viewBox="0 0 20 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M16.581 2.14024L10.316 0.0512408C10.1109 -0.0170803 9.88913 -0.0170803 9.684 0.0512408L3.419 2.14024C2.42291 2.47112 1.55642 3.1075 0.942645 3.95895C0.328874 4.8104 -0.000961674 5.83363 2.10612e-06 6.88324V12.0002C2.10612e-06 19.5632 9.2 23.7402 9.594 23.9142C9.72182 23.971 9.86014 24.0004 10 24.0004C10.1399 24.0004 10.2782 23.971 10.406 23.9142C10.8 23.7402 20 19.5632 20 12.0002V6.88324C20.001 5.83363 19.6711 4.8104 19.0574 3.95895C18.4436 3.1075 17.5771 2.47112 16.581 2.14024ZM18 12.0002C18 17.4552 11.681 21.0332 10 21.8892C8.317 21.0362 2 17.4692 2 12.0002V6.88324C2.00006 6.25352 2.19828 5.63978 2.56657 5.12898C2.93486 4.61819 3.45455 4.23623 4.052 4.03724L10 2.05424L15.948 4.03724C16.5455 4.23623 17.0651 4.61819 17.4334 5.12898C17.8017 5.63978 17.9999 6.25352 18 6.88324V12.0002Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#c87847] duration-300
                                               ${
                                                 currentPath ===
                                                 "security-operations"
                                                   ? "text-[#c87847]"
                                                   : "text-[#24262B]"
                                               }
                                              `}
                                >
                                  Security Operations
                                </h3>
                                <Tooltip
                                  content=" Optimize security operations by
                                      consolidating processes, organizing and
                                      prioritizing tasks and coordinating staff
                                      to achieve your security mission."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Optimize security operations by
                                    consolidating processes, organizing and
                                    prioritizing tasks and coordinating staff to
                                    achieve your security mission.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 28 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M14 12V5C14 3.346 12.654 2 11 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H11C11.552 22 12 22.447 12 23C12 23.553 11.552 24 11 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H11C13.757 0 16 2.243 16 5V12C16 12.553 15.553 13 15 13C14.447 13 14 12.553 14 12ZM6 13H5C4.448 13 4 13.447 4 14C4 14.553 4.448 15 5 15H6C6.552 15 7 14.553 7 14C7 13.447 6.552 13 6 13ZM11 13H10C9.448 13 9 13.447 9 14C9 14.553 9.448 15 10 15H11C11.552 15 12 14.553 12 14C12 13.447 11.552 13 11 13ZM6 17H5C4.448 17 4 17.447 4 18C4 18.553 4.448 19 5 19H6C6.552 19 7 18.553 7 18C7 17.447 6.552 17 6 17ZM11 17H10C9.448 17 9 17.447 9 18C9 18.553 9.448 19 10 19H11C11.552 19 12 18.553 12 18C12 17.447 11.552 17 11 17ZM6 5H5C4.448 5 4 5.447 4 6C4 6.553 4.448 7 5 7H6C6.552 7 7 6.553 7 6C7 5.447 6.552 5 6 5ZM11 5H10C9.448 5 9 5.447 9 6C9 6.553 9.448 7 10 7H11C11.552 7 12 6.553 12 6C12 5.447 11.552 5 11 5ZM6 9H5C4.448 9 4 9.447 4 10C4 10.553 4.448 11 5 11H6C6.552 11 7 10.553 7 10C7 9.447 6.552 9 6 9ZM11 9H10C9.448 9 9 9.447 9 10C9 10.553 9.448 11 10 11H11C11.552 11 12 10.553 12 10C12 9.447 11.552 9 11 9ZM23.968 22.75C23.408 20.576 21.319 19 19 19C16.681 19 14.591 20.577 14.032 22.75C13.894 23.284 14.217 23.83 14.752 23.968C15.279 24.106 15.832 23.783 15.97 23.248C16.3 21.966 17.603 20.999 19.001 20.999C20.399 20.999 21.702 21.966 22.032 23.248C22.168 23.787 22.729 24.105 23.25 23.968C23.785 23.83 24.107 23.284 23.97 22.75H23.968ZM19 18C20.379 18 21.5 16.879 21.5 15.5C21.5 14.121 20.379 13 19 13C17.621 13 16.5 14.121 16.5 15.5C16.5 16.879 17.621 18 19 18Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                  Facility Management
                                </h3>
                                <Tooltip
                                  content=" Simplify the complex, keep track of your
                                      everything, react to issues as they occur
                                      and be proactive about how you manage your
                                      facilities. "
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Simplify the complex, keep track of your
                                    everything, react to issues as they occur
                                    and be proactive about how you manage your
                                    facilities.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                          {/* <!-- 21 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e0e7ff] group-hover/menu:bg-[#6468f0]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6468f0] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M24 9.99995V16C24 18.757 21.757 21 19 21H13V22H16C16.553 22 17 22.447 17 23C17 23.553 16.553 24 16 24H8C7.447 24 7 23.553 7 23C7 22.447 7.447 22 8 22H11V21H5C2.243 21 0 18.757 0 16V9.99995C0 7.71695 1.542 5.72595 3.751 5.15795C4.282 5.02395 4.831 5.34195 4.969 5.87695C5.107 6.41195 4.784 6.95695 4.249 7.09395C2.925 7.43495 2 8.62995 2 9.99995V16C2 17.654 3.346 19 5 19H19C20.654 19 22 17.654 22 16V9.99995C22 8.62995 21.075 7.43495 19.751 7.09395C19.216 6.95695 18.894 6.41095 19.031 5.87695C19.169 5.34195 19.72 5.02295 20.249 5.15795C22.458 5.72595 24 7.71695 24 9.99995ZM6.304 9.13395L7.257 8.58395C7.09 8.08595 7 7.55395 7 7.00095C7 6.44795 7.091 5.91495 7.257 5.41795L6.304 4.86795C5.825 4.59195 5.661 3.97995 5.938 3.50195C6.214 3.02295 6.826 2.85895 7.304 3.13595L8.26 3.68795C8.966 2.89295 9.92 2.32295 11 2.10295V1.00195C11 0.449953 11.447 0.00195312 12 0.00195312C12.553 0.00195312 13 0.449953 13 1.00195V2.10295C14.08 2.32295 15.035 2.89295 15.74 3.68795L16.696 3.13595C17.172 2.85895 17.785 3.02295 18.062 3.50195C18.338 3.98095 18.174 4.59195 17.696 4.86795L16.743 5.41795C16.91 5.91595 17 6.44795 17 7.00095C17 7.55395 16.909 8.08695 16.743 8.58395L17.696 9.13395C18.175 9.40995 18.339 10.022 18.062 10.5C17.876 10.821 17.541 11 17.195 11C17.025 11 16.853 10.957 16.696 10.866L15.74 10.314C15.034 11.109 14.08 11.679 13 11.899V13C13 13.553 12.553 14 12 14C11.447 14 11 13.553 11 13V11.899C9.92 11.679 8.965 11.109 8.26 10.314L7.304 10.866C7.147 10.957 6.975 11 6.805 11C6.459 11 6.123 10.821 5.938 10.5C5.662 10.021 5.826 9.40995 6.304 9.13395ZM9 6.99995C9 8.65395 10.346 9.99995 12 9.99995C13.654 9.99995 15 8.65395 15 6.99995C15 5.34595 13.654 3.99995 12 3.99995C10.346 3.99995 9 5.34595 9 6.99995Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6468f0] duration-300">
                                  IT Service Management
                                </h3>
                                <Tooltip
                                  content="Raise the bar with solutions designed to
                                      streamline critical IT processes, organize
                                      projects and remove traditional obstacles
                                      on the road of an ever-changing technology
                                      landscape."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Raise the bar with solutions designed to
                                    streamline critical IT processes, organize
                                    projects and remove traditional obstacles on
                                    the road of an ever-changing technology
                                    landscape.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 35 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8A8A8A30] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_4129_117720)">
                                    <path d="M22 18.184V17C22 16.448 21.553 16 21 16C20.447 16 20 16.448 20 17V18H15.5C15.234 18 14.98 18.105 14.793 18.293L14.086 19H9.914L9.207 18.293C9.019 18.105 8.766 18 8.5 18H4V11C4 9.346 5.346 8 7 8H13C13.553 8 14 7.552 14 7C14 6.448 13.553 6 13 6H7C4.243 6 2 8.243 2 11V18.184C0.839 18.598 0 19.698 0 21C0 22.654 1.346 24 3 24H21C22.654 24 24 22.654 24 21C24 19.698 23.161 18.598 22 18.184ZM21 22H3C2.448 22 2 21.551 2 21C2 20.449 2.448 20 3 20H8.086L8.793 20.707C8.981 20.895 9.234 21 9.5 21H14.5C14.766 21 15.02 20.895 15.207 20.707L15.914 20H21C21.552 20 22 20.449 22 21C22 21.551 21.552 22 21 22ZM16 5C16 3.346 17.346 2 19 2V1C19 0.448 19.447 0 20 0C20.553 0 21 0.448 21 1V2.003H21.271C22.334 2.003 23.328 2.576 23.864 3.498C24.142 3.975 23.98 4.587 23.503 4.865C23.024 5.142 22.413 4.981 22.136 4.503C21.953 4.191 21.631 4.003 21.27 4.003L18.999 4C18.448 4 18 4.449 18 5C18 5.378 18.271 5.698 18.644 5.76L21.685 6.267C23.027 6.49 24 7.64 24 9C24 10.654 22.654 12 21 12V13C21 13.552 20.553 14 20 14C19.447 14 19 13.552 19 13V11.998H18.73C17.664 11.998 16.669 11.424 16.134 10.502C15.857 10.024 16.02 9.412 16.498 9.135C16.975 8.859 17.588 9.021 17.864 9.499C18.043 9.807 18.374 9.998 18.73 9.998L21 10C21.551 10 21.999 9.551 21.999 9C21.999 8.622 21.728 8.302 21.355 8.24L18.314 7.733C16.972 7.51 15.999 6.36 15.999 5H16Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4129_117720">
                                      <rect width="24" height="24" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300">
                                  Freelance Management
                                </h3>
                                <Tooltip
                                  content="Jugl brings everything you need to manage
                                      freelancers— from onboarding and task
                                      tracking to contracts and payments— into
                                      one smart platform. Trusted by teams
                                      working across borders and time zones, it
                                      keeps your freelance operations smooth,
                                      scalable, and stress-free."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Jugl brings everything you need to manage
                                    freelancers— from onboarding and task
                                    tracking to contracts and payments— into one
                                    smart platform. Trusted by teams working
                                    across borders and time zones, it keeps your
                                    freelance operations smooth, scalable, and
                                    stress-free.{" "}
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 34 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7eff6] group-hover/menu:bg-[#2a8ab0]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#2a8ab0] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M22.961 16.726C22.81 16.195 22.257 15.887 21.726 16.038C21.693 16.048 18.293 17 14 17C10.621 17 7.19502 16.412 5.83202 16.148C5.56302 14.903 5.00002 11.936 5.00002 9.00005C5.00002 5.13905 5.48102 2.19305 5.48602 2.16405C5.53402 1.87405 5.45302 1.57805 5.26202 1.35305C5.07302 1.12905 4.79302 0.999047 4.49902 0.999047H1.99902C1.44602 0.999047 0.999023 1.44705 0.999023 1.99905C0.999023 2.55105 1.44602 2.99905 1.99902 2.99905H3.35302C3.20202 4.25105 2.99902 6.41305 2.99902 8.99905C2.99902 13.075 3.98702 17.073 4.02902 17.242C4.12102 17.609 4.41202 17.893 4.78202 17.975C4.83802 17.988 5.28502 18.085 5.99902 18.215V19.999C5.99902 21.653 7.34502 22.999 8.99902 22.999C10.653 22.999 11.999 21.653 11.999 19.999V18.939C12.655 18.976 13.325 18.999 13.999 18.999C14.694 18.999 15.36 18.974 15.999 18.935V19.999C15.999 21.653 17.345 22.999 18.999 22.999C20.653 22.999 21.999 21.653 21.999 19.999V18.034C22.153 17.994 22.252 17.967 22.273 17.961C22.804 17.81 23.111 17.256 22.96 16.726H22.961ZM10 20C10 20.551 9.55202 21 9.00002 21C8.44802 21 8.00002 20.551 8.00002 20V18.538C8.61202 18.625 9.28402 18.709 10 18.782V20ZM20 20C20 20.551 19.552 21 19 21C18.448 21 18 20.551 18 20V18.758C18.749 18.669 19.42 18.565 20 18.461V20ZM8.09202 14.744C8.18902 14.754 10.487 15 14 15C17.513 15 19.812 14.754 19.908 14.744C20.35 14.696 20.708 14.361 20.785 13.923C20.794 13.873 21 12.685 21 11.5C21 10.315 20.794 9.12705 20.785 9.07705C20.708 8.63905 20.35 8.30405 19.908 8.25605C19.811 8.24605 17.513 8.00005 14 8.00005C10.487 8.00005 8.18802 8.24605 8.09202 8.25605C7.65002 8.30405 7.29202 8.63905 7.21502 9.07705C7.20602 9.12705 7.00002 10.315 7.00002 11.5C7.00002 12.685 7.20602 13.873 7.21502 13.923C7.29202 14.361 7.65002 14.696 8.09202 14.744ZM9.08202 10.176C10.024 10.104 11.77 10 14 10C16.23 10 17.977 10.104 18.919 10.176C18.961 10.555 19 11.032 19 11.5C19 11.968 18.961 12.444 18.918 12.824C17.976 12.896 16.23 13 14 13C11.77 13 10.023 12.896 9.08102 12.824C9.03902 12.445 9.00002 11.968 9.00002 11.5C9.00002 11.032 9.03902 10.556 9.08202 10.176ZM15.985 6.77605C16.027 6.78505 17.013 7.00005 18 7.00005C18.987 7.00005 19.973 6.78605 20.015 6.77605C20.396 6.69305 20.693 6.39505 20.777 6.01405C20.786 5.97205 21.001 4.98505 21.001 3.99905C21.001 3.01305 20.786 2.02605 20.777 1.98405C20.693 1.60305 20.396 1.30605 20.015 1.22205C19.973 1.21305 18.987 0.998047 18 0.998047C17.013 0.998047 16.027 1.21205 15.985 1.22205C15.604 1.30505 15.307 1.60305 15.223 1.98405C15.214 2.02605 14.999 3.01305 14.999 3.99905C14.999 4.98505 15.214 5.97205 15.223 6.01405C15.307 6.39505 15.604 6.69205 15.985 6.77605ZM17.067 3.06805C17.622 2.99505 18.378 2.99505 18.932 3.06805C18.968 3.34405 18.999 3.67705 18.999 4.00005C18.999 4.32305 18.968 4.65605 18.932 4.93205C18.377 5.00505 17.621 5.00505 17.067 4.93205C17.031 4.65605 17 4.32305 17 4.00005C17 3.67705 17.031 3.34405 17.067 3.06805ZM8.07702 6.78505C8.12702 6.79405 9.31502 7.00005 10.5 7.00005C11.685 7.00005 12.873 6.79305 12.923 6.78505C13.304 6.71805 13.612 6.43805 13.715 6.06505C13.726 6.02305 14 5.01205 14 4.00105C14 2.99005 13.726 1.97905 13.715 1.93705C13.612 1.56405 13.304 1.28405 12.923 1.21705C12.873 1.20805 11.685 1.00205 10.5 1.00205C9.31502 1.00205 8.12702 1.20905 8.07702 1.21705C7.69602 1.28405 7.38802 1.56405 7.28502 1.93705C7.27402 1.97905 7.00002 2.99005 7.00002 4.00105C7.00002 5.01205 7.27402 6.02305 7.28502 6.06505C7.38802 6.43805 7.69602 6.71805 8.07702 6.78505ZM9.08302 3.09205C9.86402 3.00005 11.13 3.00005 11.917 3.09205C11.961 3.36205 12 3.68605 12 4.00005C12 4.31405 11.961 4.63905 11.917 4.90805C11.136 5.00005 9.87002 5.00005 9.08302 4.90805C9.03902 4.63805 9.00002 4.31405 9.00002 4.00005C9.00002 3.68605 9.03902 3.36105 9.08302 3.09205Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#2a8ab0] leading-[130%] mb-[4px] group-hover/menu:text-[#2a8ab0] duration-300">
                                  Logistics
                                </h3>
                                <Tooltip
                                  content="Streamline the inventory, shipping and
                                      distribution processes that are crucial to
                                      your success. Manage all of the materials
                                      needed to produce your products — and the
                                      systems you need to get them into
                                      customers’ hands."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Streamline the inventory, shipping and
                                    distribution processes that are crucial to
                                    your success. Manage all of the materials
                                    needed to produce your products — and the
                                    systems you need to get them into customers’
                                    hands.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 24 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f8ebf2] group-hover/menu:bg-[#b74b7b]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#b74b7b] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.7103 10.069C23.5153 10.266 23.2573 10.365 23.0003 10.365C22.7453 10.365 22.4913 10.268 22.2963 10.075L20.0003 7.798V18C20.0003 21.309 17.3093 24 14.0003 24H7.00026C6.44726 24 6.00026 23.553 6.00026 23C6.00026 22.447 6.44726 22 7.00026 22H14.0003C16.2063 22 18.0003 20.206 18.0003 18V7.798L15.7043 10.075C15.3113 10.462 14.6793 10.462 14.2903 10.069C13.9013 9.677 13.9033 9.044 14.2963 8.655L17.2543 5.721C18.1843 4.792 19.8153 4.79 20.7483 5.723L23.7043 8.654C24.0973 9.043 24.0993 9.676 23.7103 10.068V10.069ZM9.70426 15.344C10.0973 14.955 10.0993 14.322 9.71026 13.93C9.31926 13.536 8.68826 13.535 8.29626 13.924L6.00026 16.201V6C6.00026 3.794 7.79426 2 10.0003 2H17.0003C17.5533 2 18.0003 1.552 18.0003 1C18.0003 0.448 17.5533 0 17.0003 0H10.0003C6.69126 0 4.00026 2.691 4.00026 6V16.202L1.70426 13.925C1.31226 13.537 0.680258 13.538 0.290258 13.931C-0.0987423 14.323 -0.0967423 14.956 0.296258 15.345L3.25126 18.276C3.71826 18.744 4.33926 19.001 5.00026 19.001C5.66126 19.001 6.28226 18.744 6.74626 18.279L9.70426 15.345V15.344Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b74b7b] duration-300">
                                  Business Continuity Planning
                                </h3>
                                <Tooltip
                                  content="Don’t let a sudden crisis disrupt your
                                      business. Weather any storm with Jugl to
                                      facilitate business continuity and
                                      disaster recovery planning."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Don’t let a sudden crisis disrupt your
                                    business. Weather any storm with Jugl to
                                    facilitate business continuity and disaster
                                    recovery planning.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 32 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M21.941 12.493L13 5.991V4H14C14.552 4 15 3.552 15 3C15 2.448 14.552 2 14 2H13V1C13 0.448 12.552 0 12 0C11.448 0 11 0.448 11 1V2H10C9.448 2 9 2.448 9 3C9 3.552 9.448 4 10 4H11V5.991L2.059 12.493C0.77 13.431 0 14.943 0 16.537V20C0 22.206 1.794 24 4 24H20C22.206 24 24 22.206 24 20V16.537C24 14.943 23.23 13.431 21.941 12.493ZM12 15C10.346 15 9 16.346 9 18V22H7V11.373L12 7.737L17 11.373V22H15V18C15 16.346 13.654 15 12 15ZM2 20V16.537C2 15.58 2.462 14.673 3.236 14.11L5 12.827V22H4C2.897 22 2 21.103 2 20ZM11 22V18C11 17.449 11.449 17 12 17C12.551 17 13 17.449 13 18V22H11ZM22 20C22 21.103 21.103 22 20 22H19V12.827L20.764 14.11C21.538 14.673 22 15.58 22 16.537V20Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                  Churches
                                </h3>
                                <Tooltip
                                  content=" From small churches to multi-location
                                      religious groups, Jugl solutions designed
                                      to fit the unique needs of every
                                      organization. From church operations, to
                                      member tracking, event planning, giving
                                      and more."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    From small churches to multi-location
                                    religious groups, Jugl solutions designed to
                                    fit the unique needs of every organization.
                                    From church operations, to member tracking,
                                    event planning, giving and more.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 26 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#feecd6] group-hover/menu:bg-[#f36f1c]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#f36f1c] group-hover/menu:fill-[#fff] duration-300"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M19 2H18V1C18 0.448 17.552 0 17 0C16.448 0 16 0.448 16 1V2H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V2H5C2.243 2 0 4.243 0 7V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V7C24 4.243 21.757 2 19 2ZM5 4H19C20.654 4 22 5.346 22 7V8H2V7C2 5.346 3.346 4 5 4ZM19 22H5C3.346 22 2 20.654 2 19V10H22V19C22 20.654 20.654 22 19 22ZM13.892 11.885C13.137 11.885 12.448 12.19 11.923 12.692C11.399 12.191 10.709 11.885 9.954 11.885C8.317 11.885 6.985 13.321 6.985 15.085C6.985 16.663 8.193 18.415 10.68 20.443C11.04 20.736 11.481 20.883 11.922 20.882C12.363 20.882 12.805 20.736 13.165 20.442C15.651 18.414 16.859 16.661 16.859 15.085C16.859 13.321 15.527 11.885 13.89 11.885H13.892ZM11.945 18.892C9.275 16.714 8.986 15.504 8.986 15.084C8.986 14.422 9.421 13.884 9.955 13.884C10.489 13.884 10.924 14.422 10.924 15.084C10.924 15.636 11.372 16.084 11.924 16.084C12.476 16.084 12.924 15.636 12.924 15.084C12.924 14.422 13.359 13.884 13.893 13.884C14.427 13.884 14.862 14.422 14.862 15.084C14.862 15.503 14.574 16.713 11.946 18.892H11.945Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f36f1c] duration-300">
                                  Event Planning
                                </h3>
                                <Tooltip
                                  content="From small meetings to massive
                                      conferences, one-time epics to recurring
                                      live programs, coordinate every dynamic
                                      and elevate your events with Jugl."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    From small meetings to massive conferences,
                                    one-time epics to recurring live programs,
                                    coordinate every dynamic and elevate your
                                    events with Jugl.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 30 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f0f3ce] group-hover/menu:bg-[#bfb333]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#bfb333] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M7 14C9.206 14 11 12.206 11 10C11 7.794 9.206 6 7 6C4.794 6 3 7.794 3 10C3 12.206 4.794 14 7 14ZM7 8C8.103 8 9 8.897 9 10C9 11.103 8.103 12 7 12C5.897 12 5 11.103 5 10C5 8.897 5.897 8 7 8ZM14 23C14 23.553 13.552 24 13 24C12.448 24 12 23.553 12 23C12 20.243 9.757 18 7 18C4.243 18 2 20.243 2 23C2 23.553 1.552 24 1 24C0.448 24 0 23.553 0 23C0 19.141 3.14 16 7 16C10.86 16 14 19.141 14 23ZM24 5V13C24 15.757 21.757 18 19 18H15C14.448 18 14 17.553 14 17V15C14 14.447 14.448 14 15 14H18C18.552 14 19 14.447 19 15V16C20.654 16 22 14.654 22 13V5C22 3.346 20.654 2 19 2H9.465C8.397 2 7.401 2.575 6.866 3.501C6.589 3.979 5.978 4.144 5.5 3.865C5.021 3.589 4.858 2.977 5.135 2.499C6.027 0.958 7.686 0 9.466 0H19.001C21.758 0 24 2.243 24 5Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#bfb333] duration-300">
                                  Teachers
                                </h3>
                                <Tooltip
                                  content="Simplify and unify all educational
                                      materials and operations to shift the
                                      focus to students."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Simplify and unify all educational materials
                                    and operations to shift the focus to
                                    students.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                          {/* <!-- 25 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f9fcc5] group-hover/menu:bg-[#e4cc0e]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#e4cc0e] group-hover/menu:fill-[#fff] duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8.965 24H4C2.93913 24 1.92172 23.5786 1.17157 22.8284C0.421427 22.0783 0 21.0609 0 20V15C0 13.9391 0.421427 12.9217 1.17157 12.1716C1.92172 11.4214 2.93913 11 4 11H12.857C13.3982 11.0003 13.9302 11.1402 14.4014 11.4063C14.8727 11.6724 15.2673 12.0557 15.547 12.519L18.764 8.984C19.0301 8.69139 19.3512 8.45409 19.7091 8.28566C20.0669 8.11723 20.4545 8.02098 20.8496 8.00241C21.2446 7.98383 21.6395 8.0433 22.0116 8.17741C22.3836 8.31152 22.7256 8.51765 23.018 8.784C23.6014 9.31993 23.951 10.0635 23.9916 10.8546C24.0321 11.6458 23.7605 12.4212 23.235 13.014L16.435 20.651C15.4961 21.704 14.3453 22.5467 13.0579 23.1239C11.7706 23.701 10.3758 23.9996 8.965 24ZM4 13C3.46957 13 2.96086 13.2107 2.58579 13.5858C2.21071 13.9609 2 14.4696 2 15V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H8.965C10.0929 21.9995 11.208 21.7607 12.2372 21.2992C13.2664 20.8377 14.1864 20.1639 14.937 19.322L21.742 11.684C21.9187 11.485 22.0101 11.2246 21.9967 10.9588C21.9832 10.693 21.8659 10.4431 21.67 10.263C21.4708 10.0839 21.2096 9.98958 20.942 10C20.8093 10.0056 20.6791 10.0376 20.5589 10.0941C20.4387 10.1506 20.331 10.2304 20.242 10.329L15.816 15.2C15.6217 15.7378 15.285 16.2127 14.8419 16.5741C14.3988 16.9355 13.8659 17.1698 13.3 17.252L8.139 17.99C7.87644 18.0277 7.60966 17.9595 7.39737 17.8004C7.18508 17.6414 7.04466 17.4046 7.007 17.142C6.96934 16.8794 7.03752 16.6127 7.19656 16.4004C7.35559 16.1881 7.59244 16.0477 7.855 16.01L13.017 15.273C13.3035 15.2329 13.5642 15.0856 13.7463 14.8608C13.9284 14.636 14.0184 14.3504 13.9981 14.0618C13.9778 13.7732 13.8487 13.5031 13.6368 13.306C13.425 13.1089 13.1463 12.9995 12.857 13H4ZM11 9.074C10.5468 9.07522 10.1067 8.92137 9.753 8.638C8.041 7.264 6 5.2 6 3.2C5.97545 2.37837 6.27728 1.58044 6.83948 0.980764C7.40168 0.381083 8.17849 0.0284522 9 0C9.74734 0.00291082 10.4644 0.295818 11 0.817C11.5356 0.295818 12.2527 0.00291082 13 0C13.8215 0.0284522 14.5983 0.381083 15.1605 0.980764C15.7227 1.58044 16.0246 2.37837 16 3.2C16 5.2 13.959 7.264 12.246 8.639C11.8924 8.92179 11.4528 9.07527 11 9.074ZM9 2C8.70935 2.02916 8.44175 2.17122 8.25475 2.39562C8.06775 2.62003 7.97627 2.90886 8 3.2C8 4.1 9.151 5.59 11.006 7.079C12.849 5.59 14 4.1 14 3.2C14.0237 2.90886 13.9323 2.62003 13.7453 2.39562C13.5582 2.17122 13.2906 2.02916 13 2C12.7094 2.02916 12.4418 2.17122 12.2547 2.39562C12.0677 2.62003 11.9763 2.90886 12 3.2C12 3.46522 11.8946 3.71957 11.7071 3.90711C11.5196 4.09464 11.2652 4.2 11 4.2C10.7348 4.2 10.4804 4.09464 10.2929 3.90711C10.1054 3.71957 10 3.46522 10 3.2C10.0237 2.90886 9.93225 2.62003 9.74525 2.39562C9.55825 2.17122 9.29065 2.02916 9 2Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e4cc0e] duration-300">
                                  Nonprofit
                                </h3>
                                <Tooltip
                                  content="We&apos;re committed to supporting the
                                      important work of non-profits. We&apos;re here
                                      to help you make an impact with
                                      ready-to-go solutions aimed at helping you
                                      move your cause forward."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="bottom"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    We&apos;re committed to supporting the important
                                    work of non-profits. We&apos;re here to help you
                                    make an impact with ready-to-go solutions
                                    aimed at helping you move your cause
                                    forward.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 31 --> */}
                          <div className="relative  rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#B18D7433] group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#a2745e] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M19 3H5C2.243 3 0 5.243 0 8V16C0 18.757 2.243 21 5 21H19C21.757 21 24 18.757 24 16V8C24 5.243 21.757 3 19 3ZM22 16C22 17.654 20.654 19 19 19H5C3.346 19 2 17.654 2 16V8C2 6.346 3.346 5 5 5H19C20.654 5 22 6.346 22 8V16ZM20 8C20 8.553 19.552 9 19 9H15C14.448 9 14 8.553 14 8C14 7.447 14.448 7 15 7H19C19.552 7 20 7.447 20 8ZM20 12C20 12.553 19.552 13 19 13H15C14.448 13 14 12.553 14 12C14 11.447 14.448 11 15 11H19C19.552 11 20 11.447 20 12ZM18 16C18 16.553 17.552 17 17 17H15C14.448 17 14 16.553 14 16C14 15.447 14.448 15 15 15H17C17.552 15 18 15.447 18 16ZM12.455 10.983C12.563 11.279 12.474 11.611 12.233 11.814L10.459 13.259L11.193 15.494C11.293 15.796 11.192 16.129 10.939 16.324C10.686 16.518 10.338 16.532 10.072 16.358L8.007 15.013L5.976 16.372C5.85 16.457 5.704 16.499 5.559 16.499C5.4 16.499 5.242 16.449 5.109 16.349C4.854 16.158 4.748 15.827 4.843 15.524L5.549 13.262L3.766 11.811C3.526 11.607 3.439 11.276 3.547 10.981C3.655 10.686 3.936 10.49 4.251 10.49H6.502L7.299 8.255C7.408 7.962 7.689 7.767 8.002 7.767C8.315 7.767 8.596 7.962 8.705 8.255L9.502 10.49H11.753C12.068 10.49 12.35 10.687 12.458 10.983H12.455Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300">
                                  Clubs & Associations
                                </h3>
                                <Tooltip
                                  content="From board members to volunteers, from
                                      special evens to marketing materials,
                                      manage everything your club does from a
                                      single, affordable platform."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="top"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    From board members to volunteers, from
                                    special evens to marketing materials, manage
                                    everything your club does from a single,
                                    affordable platform.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 33 --> */}
                          <div className="relative rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9B38E533] group-hover/menu:bg-[#af59f3]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#af59f3] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M22.9918 2.294C22.9298 2.8 22.4978 3.17 22.0008 3.17C21.9978 3.17 21.9958 3.17 21.9928 3.17C21.9958 4.303 21.9998 5.716 21.9998 5.823C21.9998 7.206 21.5368 7.932 20.9408 7.998C20.3068 8.068 19.4988 6.847 19.4988 6.847C19.4988 6.847 18.6898 8.07 18.0568 7.998C17.4758 7.933 16.9998 7.215 16.9998 5.821C16.9998 5.714 17.0038 4.29 17.0068 3.155C16.5048 3.157 16.0698 2.803 16.0078 2.295C15.9398 1.747 16.3278 1.248 16.8758 1.179C18.7718 0.943 20.2278 0.943 22.1238 1.179C22.6718 1.247 23.0608 1.747 22.9918 2.295V2.294ZM4.99977 5.5C4.99977 2.43 6.42977 1 9.49977 1C12.5698 1 13.9998 2.43 13.9998 5.5C13.9998 8.57 12.5698 10 9.49977 10C6.42977 10 4.99977 8.57 4.99977 5.5ZM6.99977 5.5C6.99977 7.439 7.56077 8 9.49977 8C11.4388 8 11.9998 7.439 11.9998 5.5C11.9998 3.561 11.4388 3 9.49977 3C7.56077 3 6.99977 3.561 6.99977 5.5ZM17.9908 19.63C17.9188 20.177 17.4288 20.563 16.8688 20.491C16.8578 20.49 16.5328 20.448 15.9998 20.389V21.999C15.9998 22.551 15.5528 22.999 14.9998 22.999C14.4468 22.999 13.9998 22.551 13.9998 21.999V20.199C12.6898 20.093 11.0808 19.999 9.49977 19.999C7.91877 19.999 6.30877 20.093 4.99977 20.199V21.999C4.99977 22.551 4.55277 22.999 3.99977 22.999C3.44677 22.999 2.99977 22.551 2.99977 21.999V20.389C2.46677 20.447 2.14177 20.489 2.13077 20.491C1.59377 20.565 1.07877 20.18 1.00877 19.63C0.929766 19.025 1.39477 18.514 1.99977 18.492C2.00177 13.311 4.31577 11 9.49977 11C14.6838 11 16.9968 13.311 16.9998 18.492C17.6048 18.515 18.0708 19.026 17.9908 19.63ZM11.4828 13.148C11.2078 13.657 10.9058 14.077 10.5398 14.428C10.8978 15.405 11.1758 16.531 11.4278 18.04C12.7608 18.092 14.0068 18.186 14.9958 18.278C14.9538 15.074 14.0108 13.588 11.4828 13.148ZM4.00477 18.278C4.99377 18.187 6.23977 18.092 7.57277 18.04C7.82377 16.53 8.10177 15.405 8.46077 14.428C8.09477 14.077 7.79277 13.657 7.51777 13.148C4.98977 13.588 4.04777 15.074 4.00477 18.278Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300">
                                  Political Campaigns
                                </h3>
                                <Tooltip
                                  content="Fuel your people-powered movement by
                                      centralizing the way you organize and
                                      scale. From fundraising to event
                                      management, get solutions that adapt to
                                      your campaign's needs."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="top"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                    Fuel your people-powered movement by
                                    centralizing the way you organize and scale.
                                    From fundraising to event management, get
                                    solutions that adapt to your campaign&apos;s
                                    needs.
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          <div className="relative rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7f4e3] group-hover/menu:bg-[#289f71]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#289f71] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M23.94 6.59L23.06 10.98C22.59 13.31 20.53 15 18.16 15H6.73C7.15 16.18 8.26 17 9.56 17H19C19.55 17 20 17.45 20 18C20 18.55 19.55 19 19 19H9.56C7.03 19 4.89 17.1 4.59 14.58L3.21 2.88C3.15 2.38 2.72 2 2.22 2H1C0.45 2 0 1.55 0 1C0 0.45 0.45 0 1 0H2.22C3.74 0 5.02 1.14 5.2 2.65L5.24 3H9C9.55 3 10 3.45 10 4C10 4.55 9.55 5 9 5H5.48L6.42 13H18.16C19.58 13 20.82 11.99 21.1 10.59L21.98 6.2C22.04 5.91 21.96 5.6 21.77 5.37C21.58 5.14 21.3 5 21 5H17C16.45 5 16 4.55 16 4C16 3.45 16.45 3 17 3H21C21.9 3 22.75 3.4 23.32 4.1C23.89 4.8 24.12 5.71 23.94 6.59ZM7 20C5.9 20 5 20.9 5 22C5 23.1 5.9 24 7 24C8.1 24 9 23.1 9 22C9 20.9 8.1 20 7 20ZM17 20C15.9 20 15 20.9 15 22C15 23.1 15.9 24 17 24C18.1 24 19 23.1 19 22C19 20.9 18.1 20 17 20ZM9.27 7.25C8.89 7.65 8.92 8.29 9.32 8.66L10.88 10.12C11.47 10.71 12.24 11 13.01 11C13.78 11 14.53 10.71 15.1 10.14L16.69 8.66C17.09 8.28 17.11 7.65 16.74 7.25C16.36 6.85 15.73 6.82 15.33 7.2L14.01 8.43V1C14.01 0.45 13.56 0 13.01 0C12.46 0 12.01 0.45 12.01 1V8.43L10.69 7.2C10.29 6.82 9.65 6.85 9.28 7.25H9.27Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#289f71] duration-300">
                                  Procurement
                                </h3>
                                <Tooltip
                                  content="Understand your organization’s spend and
                                      ensure it's properly aligned with business
                                      goals. Say 'goodbye' to spreadsheets,
                                      forms and lost approvals. Get everything
                                      you need to tackle purchasing workflows,
                                      analyze budgets, manage vendors and handle
                                      the approval process."
                                  maxWidth="300px"
                                  fontSize="12px"
                                  position="top"
                                >
                                  <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                   {` Understand your organization’s spend and
                                    ensure it's properly aligned with business
                                    goals. Say "goodbye" to spreadsheets, forms
                                    and lost approvals. Get everything you need
                                    to tackle purchasing workflows, analyze
                                    budgets, manage vendors and handle the
                                    approval process.`}
                                  </p>{" "}
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[32%] bg-[#F8F9FA] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                              fill="#484848"
                            />
                          </svg>
                          <h6 className="text-[14px]">Whats New</h6>
                        </div>

                        <div className="p-[12px]">
                          <Image
                            src="/images/megamenu/banner-1.jpg"
                            alt="banner"
                            height={0}
                            width={0}
                            style={{ height: "auto", width: "auto" }}
                            className="max-w-[100%] rounded-[20px] border border-[#E5E7EB]"
                          />
                          <h6 className="text-[16px] font-medium mt-[20px]">
                            Overview of latest features!
                          </h6>
                          <a
                            className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-2"
                            href="#"
                          >
                            {" "}
                            Start Free Trail
                            <svg
                              className="w-[12px] fill-[#359cf0]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>

              <li
                className="flex items-center group cursor-pointer relative hidden"
                onClick={() => setOpenMenu(2)}
                onMouseEnter={() => setOpenMenu(2)} // Show on hover
                onMouseLeave={() => setOpenMenu(null)} // Hide on hover out
              >
                <p
                  className="text-[#24262B] cursor-pointer font-medium menu-link flex items-center gap-1 active-navitem-3"
                  onClick={() => toggleMenu(2)}
                >
                  Features
                  <svg
                    className="w-[12px]  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </p>

                <ul
                  id="ad-menu-handle"
                  className={`menu-child fixed w-screen bg-white z-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 left-0 top-[75px] 
                      ${
                        openMenu === 2 || openMenu === 3
                          ? "group-hover:pointer-events-auto opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                      before:content-[''] before:block before:absolute before:w-full before:h-12 before:top-[-35px] before:left-0`}
                >
                  <div className="mx-auto px-[22px] lg:px-[16px] custom-container">
                    <div className="flex relative">
                      <div className="flex-1 w-[68%] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mb-3">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4991 1.33398V6.66732M14.1657 4.00065H8.83239M1.16573 4.00065C1.16573 2.97398 1.16573 2.46065 1.39706 2.08332C1.52639 1.87198 1.70373 1.69465 1.91506 1.56532C2.29173 1.33398 2.80573 1.33398 3.83239 1.33398C4.85906 1.33398 5.37239 1.33398 5.74973 1.56532C5.96106 1.69465 6.13839 1.87198 6.26773 2.08332C6.49906 2.45998 6.49906 2.97398 6.49906 4.00065C6.49906 5.02732 6.49906 5.54065 6.26773 5.91798C6.13839 6.12932 5.96106 6.30665 5.74973 6.43598C5.37306 6.66732 4.85906 6.66732 3.83239 6.66732C2.80573 6.66732 2.29239 6.66732 1.91506 6.43598C1.70388 6.30668 1.52636 6.12916 1.39706 5.91798C1.16573 5.54132 1.16573 5.02732 1.16573 4.00065ZM2.02039 9.85532C2.71839 9.15732 3.06706 8.80865 3.48039 8.70865C3.71177 8.65306 3.95302 8.65306 4.18439 8.70865C4.59773 8.80865 4.94639 9.15732 5.64439 9.85532C6.34239 10.5533 6.69106 10.902 6.79106 11.3153C6.84566 11.5468 6.84566 11.7878 6.79106 12.0193C6.69106 12.4327 6.34239 12.782 5.64439 13.4793C4.94639 14.1767 4.59773 14.526 4.18439 14.626C3.95302 14.6816 3.71177 14.6816 3.48039 14.626C3.06706 14.526 2.71839 14.1773 2.02039 13.4793C1.32239 12.7813 0.973727 12.4327 0.873727 12.0193C0.818133 11.7879 0.818133 11.5467 0.873727 11.3153C0.973727 10.902 1.32239 10.5527 2.02039 9.85532ZM8.83239 12.0007C8.83239 10.974 8.83239 10.4607 9.06373 10.0833C9.19306 9.87198 9.37039 9.69465 9.58173 9.56532C9.95839 9.33398 10.4724 9.33398 11.4991 9.33398C12.5257 9.33398 13.0391 9.33398 13.4171 9.56532C13.6277 9.69465 13.8051 9.87198 13.9344 10.0833C14.1657 10.46 14.1657 10.974 14.1657 12.0007C14.1657 13.0273 14.1657 13.5407 13.9344 13.9187C13.805 14.1294 13.6278 14.3066 13.4171 14.436C13.0391 14.6673 12.5257 14.6673 11.4991 14.6673C10.4724 14.6673 9.95906 14.6673 9.58173 14.436C9.37063 14.3069 9.19311 14.1296 9.06373 13.9187C8.83239 13.5407 8.83239 13.0273 8.83239 12.0007Z"
                              stroke="#484848"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h6 className="text-[14px] uppercase">
                            Explore features
                          </h6>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] max-h-[330px] px-[10px] pb-[14px] overflow-y-auto">
                          {/* <!-- 1 --> */}
                          <div className="relative   rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#E2498A33] group-hover/menu:bg-[#ed79ae]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#ed79ae] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2736_33486)">
                                    <path d="M15.999 15.5C15.811 15.5 15.62 15.447 15.451 15.336L11.451 12.708C11.17 12.522 11 12.209 11 11.872V7C11 6.447 11.447 6 12 6C12.553 6 13 6.447 13 7V11.333L16.549 13.664C17.011 13.968 17.139 14.588 16.836 15.049C16.644 15.342 16.324 15.5 15.999 15.5ZM12.714 21.975C12.478 21.992 12.24 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C15.151 2 18.112 3.512 19.988 6H17C16.447 6 16 6.447 16 7C16 7.553 16.447 8 17 8H21C22.103 8 23 7.103 23 6V2C23 1.447 22.553 1 22 1C21.447 1 21 1.447 21 2V4.104C18.743 1.543 15.473 0 12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C12.288 24 12.573 23.989 12.856 23.969C13.407 23.93 13.822 23.451 13.782 22.901C13.743 22.351 13.27 21.926 12.714 21.975ZM23 11C22.447 11 22 11.447 22 12C22 12.455 21.969 12.913 21.908 13.36C21.834 13.908 22.218 14.412 22.764 14.486C22.81 14.492 22.855 14.495 22.9 14.495C23.393 14.495 23.822 14.131 23.89 13.63C23.962 13.094 23.999 12.545 23.999 12C23.999 11.447 23.553 11 23 11ZM22.137 16.396C21.653 16.128 21.044 16.308 20.78 16.792C20.563 17.188 20.316 17.574 20.045 17.94C19.717 18.384 19.812 19.01 20.255 19.339C20.435 19.471 20.643 19.534 20.849 19.534C21.156 19.534 21.458 19.393 21.655 19.129C21.978 18.69 22.275 18.227 22.535 17.752C22.801 17.268 22.623 16.66 22.139 16.395L22.137 16.396ZM17.406 20.416C17.023 20.662 16.623 20.883 16.215 21.072C15.714 21.305 15.496 21.899 15.729 22.4C15.899 22.765 16.259 22.979 16.637 22.979C16.778 22.979 16.921 22.95 17.057 22.886C17.548 22.657 18.03 22.393 18.489 22.097C18.954 21.798 19.088 21.18 18.789 20.715C18.49 20.252 17.871 20.118 17.407 20.415L17.406 20.416Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2736_33486">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#ff66ae] duration-300">
                                  Activity History
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Activity History automatically tracks every
                                  action in Jugl. Know what your teammates are
                                  working on and what changes they’ve made, in
                                  real-time.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 2 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#48daff33] group-hover/menu:bg-[#48daff] rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#48daff] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2747_33576)">
                                    <path d="M21.0825 11.4854C20.6822 11.4854 20.3577 11.8099 20.3577 12.2102V16.2691C20.3577 17.4594 19.3897 18.4275 18.1994 18.4275H11.7888C11.6262 18.4275 11.4683 18.4822 11.3411 18.5821L7.31112 21.7608V19.1515C7.31112 18.7512 6.98657 18.4266 6.58631 18.4266H3.78372C2.59342 18.4266 1.6254 17.4586 1.6254 16.2683V7.22513C1.6254 6.03483 2.59342 5.06681 3.78372 5.06681H13.2223C13.6226 5.06681 13.9472 4.74225 13.9472 4.342C13.9472 3.94174 13.6226 3.61719 13.2223 3.61719H3.78372C1.79452 3.61719 0.175781 5.23593 0.175781 7.22513V16.2691C0.175781 18.2583 1.79452 19.8771 3.78372 19.8771H5.8615V21.7616C5.8615 22.3156 6.17237 22.8125 6.67168 23.0566C6.87543 23.1564 7.09287 23.2056 7.30951 23.2056C7.62601 23.2056 7.93848 23.1009 8.20103 22.8955L12.0393 19.8771H18.1986C20.1878 19.8771 21.8065 18.2583 21.8065 16.2691V12.2102C21.8073 11.8091 21.4827 11.4854 21.0825 11.4854Z" />
                                    <path d="M11.7891 18.4277L11.668 18.4375C11.549 18.4576 11.4362 18.5072 11.3408 18.582L7.31152 21.7607V19.1514C7.31148 18.8012 7.06263 18.509 6.73242 18.4414L6.58594 18.4268V18.1768C7.12424 18.1768 7.56148 18.6131 7.56152 19.1514V21.2441L11.1865 18.3857L11.3223 18.2959C11.4644 18.2186 11.6251 18.1777 11.7891 18.1777V18.4277ZM18.1992 18.1777V18.4277H11.7891V18.1777H18.1992ZM20.1074 16.2695V12.21C20.1076 11.6719 20.544 11.2356 21.082 11.2354C21.6198 11.2354 22.0573 11.6705 22.0566 12.21V16.2695C22.0564 18.3966 20.3254 20.127 18.1982 20.127H12.125L8.35547 23.0918V23.0928C8.04893 23.3326 7.68183 23.4551 7.30957 23.4551C7.11854 23.4551 6.92728 23.4229 6.74316 23.3574L6.56152 23.2812C5.97694 22.9954 5.61138 22.4115 5.61133 21.7617V20.127H3.78418C1.65704 20.127 -0.0740009 18.3966 -0.0742188 16.2695V7.22559C-0.0742188 5.09832 1.65691 3.36719 3.78418 3.36719V3.61719C1.79498 3.61719 0.175781 5.23639 0.175781 7.22559V16.2695L0.180664 16.4541C0.274188 18.2964 1.75636 19.7785 3.59863 19.8721L3.78418 19.877H5.86133V21.7617L5.87598 21.9658C5.94218 22.4356 6.23484 22.8431 6.67188 23.0566C6.82474 23.1315 6.98531 23.1778 7.14746 23.1963L7.30957 23.2051C7.58656 23.2051 7.86054 23.1255 8.10059 22.9678L8.20117 22.8955L12.0391 19.877H18.1982L18.3838 19.8721C20.226 19.7784 21.7082 18.2963 21.8018 16.4541L21.8066 16.2695V12.21C21.8072 11.8591 21.5587 11.5674 21.2285 11.5L21.082 11.4854C20.6821 11.4856 20.3576 11.81 20.3574 12.21V16.2695L20.3467 16.4893C20.2435 17.504 19.4346 18.3126 18.4199 18.416L18.1992 18.4277V18.1777C19.2513 18.1777 20.1072 17.3216 20.1074 16.2695ZM6.58594 18.1768V18.4268H3.78418V18.1768H6.58594ZM1.625 16.2686V7.22559C1.625 6.10964 2.47629 5.18877 3.56348 5.07812L3.78418 5.06641H13.2227L13.3682 5.05176C13.6513 4.99389 13.8746 4.77133 13.9326 4.48828L13.9473 4.3418C13.9472 3.99158 13.6985 3.69932 13.3682 3.63184L13.2227 3.61719V3.36719C13.7608 3.36736 14.1972 3.80367 14.1973 4.3418C14.1973 4.88002 13.7608 5.31624 13.2227 5.31641H3.78418C2.73195 5.31641 1.875 6.17336 1.875 7.22559V16.2686C1.87512 17.3207 2.73203 18.1768 3.78418 18.1768V18.4268L3.56348 18.415C2.54864 18.3117 1.73987 17.5032 1.63672 16.4883L1.625 16.2686ZM13.2227 3.36719V3.61719H3.78418V3.36719H13.2227Z" />
                                    <path
                                      d="M14.8086 9.37109C15.2777 9.37119 15.6581 9.75157 15.6582 10.2207C15.6582 10.6899 15.2778 11.0702 14.8086 11.0703H5.87695C5.40775 11.0702 5.02734 10.6899 5.02734 10.2207C5.02745 9.75157 5.40782 9.3712 5.87695 9.37109H14.8086Z"
                                      strokeWidth="0.25"
                                    />
                                    <path
                                      d="M9.4707 12.4219C9.93974 12.4221 10.3202 12.8024 10.3203 13.2715C10.3203 13.7406 9.93981 14.1209 9.4707 14.1211H5.87988C5.41068 14.121 5.03027 13.7407 5.03027 13.2715C5.03038 12.8024 5.41075 12.422 5.87988 12.4219H9.4707Z"
                                      strokeWidth="0.25"
                                    />
                                    <path d="M19.665 1.24512C17.1781 1.24512 15.1543 3.26814 15.1543 5.75584C15.1543 8.24355 17.1773 10.2666 19.665 10.2666C22.1527 10.2666 24.1758 8.24274 24.1758 5.75504C24.1758 3.26733 22.1527 1.24512 19.665 1.24512ZM19.665 8.81615C17.977 8.81615 16.6039 7.44304 16.6039 5.75504C16.6039 4.06704 17.977 2.69393 19.665 2.69393C21.353 2.69393 22.7261 4.06784 22.7261 5.75504C22.7261 7.44223 21.353 8.81615 19.665 8.81615Z" />
                                    <path d="M20.4967 4.54658L19.221 5.575L18.948 5.22709C18.7008 4.9122 18.2449 4.85744 17.9301 5.10388C17.6152 5.35112 17.5596 5.80694 17.8068 6.12183L18.5333 7.04797C18.6533 7.20018 18.8288 7.29924 19.0213 7.32099C19.0487 7.32421 19.0761 7.32582 19.1034 7.32582C19.2685 7.32582 19.4288 7.26944 19.5585 7.16556L21.4059 5.67648C21.7176 5.42521 21.7667 4.96938 21.5154 4.65691C21.265 4.34524 20.8084 4.29612 20.4967 4.54658Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2747_33576">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#48daff] duration-300">
                                  Availability Status
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Let other team members know what you’re
                                  working on, if you’re available, or if you’re
                                  busy with Availability Status.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 3 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#7156DC2E] group-hover/menu:bg-[#9e97ee]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#9e97ee] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2744_33486)">
                                    <path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                    <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" />
                                    <path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" />
                                    <path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2744_33486">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#9e97ee] duration-300">
                                  Calendar View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  View records in a calendar format of your
                                  choosing, sorted by a date or date range.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 4 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9C64862E] group-hover/menu:bg-[#b381a2]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#b381a2] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2746_33491)">
                                    <path d="M11 11H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0L11 0V11ZM2 9H9V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V9Z" />
                                    <path d="M24 11H13V0H21C21.7956 0 22.5587 0.31607 23.1213 0.87868C23.6839 1.44129 24 2.20435 24 3V11ZM15 9H22V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2H15V9Z" />
                                    <path d="M11 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.31607 22.5587 0 21.7956 0 21L0 13H11V24ZM2 15V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H9V15H2Z" />
                                    <path d="M21 24H13V13H24V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24ZM15 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V15H15V22Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2746_33491">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b381a2] duration-300">
                                  Card View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  View your data as visual cards that can
                                  include logos, images, PDFs, documents,
                                  spreadsheets, and other rich content.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 5 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#FBB57E30] group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#f8853f] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2746_33503)">
                                    <path d="M23 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H23C23.2652 24 23.5196 23.8946 23.7071 23.7071C23.8946 23.5196 24 23.2652 24 23C24 22.7348 23.8946 22.4804 23.7071 22.2929C23.5196 22.1054 23.2652 22 23 22Z" />
                                    <path d="M6 20C6.26522 20 6.51957 19.8946 6.70711 19.7071C6.89464 19.5196 7 19.2652 7 19V12C7 11.7348 6.89464 11.4804 6.70711 11.2929C6.51957 11.1054 6.26522 11 6 11C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12V19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20Z" />
                                    <path d="M10 10V19C10 19.2652 10.1054 19.5196 10.2929 19.7071C10.4804 19.8946 10.7348 20 11 20C11.2652 20 11.5196 19.8946 11.7071 19.7071C11.8946 19.5196 12 19.2652 12 19V10C12 9.73478 11.8946 9.48043 11.7071 9.29289C11.5196 9.10536 11.2652 9 11 9C10.7348 9 10.4804 9.10536 10.2929 9.29289C10.1054 9.48043 10 9.73478 10 10Z" />
                                    <path d="M15 13V19C15 19.2652 15.1054 19.5196 15.2929 19.7071C15.4804 19.8946 15.7348 20 16 20C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V13C17 12.7348 16.8946 12.4804 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12C15.7348 12 15.4804 12.1054 15.2929 12.2929C15.1054 12.4804 15 12.7348 15 13Z" />
                                    <path d="M20 9V19C20 19.2652 20.1054 19.5196 20.2929 19.7071C20.4804 19.8946 20.7348 20 21 20C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V9C22 8.73478 21.8946 8.48043 21.7071 8.29289C21.5196 8.10536 21.2652 8 21 8C20.7348 8 20.4804 8.10536 20.2929 8.29289C20.1054 8.48043 20 8.73478 20 9Z" />
                                    <path d="M5.99979 9.00041C6.26498 9.00035 6.51929 8.89496 6.70679 8.70741L10.2928 5.12141C10.4834 4.93983 10.7365 4.83855 10.9998 4.83855C11.263 4.83855 11.5162 4.93983 11.7068 5.12141L13.8788 7.29341C14.4414 7.85582 15.2043 8.17177 15.9998 8.17177C16.7953 8.17177 17.5582 7.85582 18.1208 7.29341L23.7068 1.70741C23.8889 1.5188 23.9897 1.2662 23.9875 1.00401C23.9852 0.741809 23.88 0.490997 23.6946 0.305589C23.5092 0.12018 23.2584 0.0150115 22.9962 0.0127331C22.734 0.0104547 22.4814 0.111249 22.2928 0.293407L16.7068 5.87841C16.5193 6.06588 16.265 6.17119 15.9998 6.17119C15.7346 6.17119 15.4803 6.06588 15.2928 5.87841L13.1208 3.70741C12.5582 3.14499 11.7953 2.82905 10.9998 2.82905C10.2043 2.82905 9.44137 3.14499 8.87879 3.70741L5.29279 7.29341C5.15298 7.43326 5.05777 7.61142 5.0192 7.80538C4.98064 7.99933 5.00044 8.20036 5.07611 8.38306C5.15178 8.56576 5.27992 8.72192 5.44433 8.83181C5.60874 8.94169 5.80204 9.00037 5.99979 9.00041Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2746_33503">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300">
                                  Chart View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Visualize your data with multiple chart types,
                                  from bar and line charts to bubble, heat map,
                                  scatter, donut and more.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 6 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2746_33510)">
                                    <path d="M24 15.9998V20.9998C24 22.6568 22.657 23.9998 21 23.9998H16C13.045 23.9998 10.465 22.3848 9.08 19.9958C9.849 19.9898 10.598 19.9048 11.322 19.7478C12.423 21.1188 14.109 21.9998 16 21.9998H21C21.552 21.9998 22 21.5518 22 20.9998V15.9998C22 14.1088 21.119 12.4228 19.748 11.3218C19.904 10.5978 19.99 9.84878 19.996 9.07978C22.385 10.4648 24 13.0448 24 15.9998ZM8.138 17.9998H3.661C1.642 17.9998 0 16.3548 0 14.3338V9.29578C0 4.58878 3.823 0.34278 8.349 0.0227797C13.664 -0.48222 18.475 4.33778 17.977 9.65078C17.646 14.3328 13.325 17.9998 8.138 17.9998ZM15.982 9.51078C16.349 5.56078 12.945 1.91378 8.988 1.99978C5.253 1.96178 2.001 5.42278 2 9.29578V14.3338C2 15.2528 2.745 15.9998 3.661 15.9998H8.138C12.211 15.9998 15.73 13.0888 15.982 9.51078ZM9 7.49978C8.172 7.49978 7.5 8.17178 7.5 8.99978C7.5 9.82778 8.172 10.4998 9 10.4998C9.828 10.4998 10.5 9.82778 10.5 8.99978C10.5 8.17178 9.828 7.49978 9 7.49978ZM5 7.49978C4.172 7.49978 3.5 8.17178 3.5 8.99978C3.5 9.82778 4.172 10.4998 5 10.4998C5.828 10.4998 6.5 9.82778 6.5 8.99978C6.5 8.17178 5.828 7.49978 5 7.49978ZM13 7.49978C12.172 7.49978 11.5 8.17178 11.5 8.99978C11.5 9.82778 12.172 10.4998 13 10.4998C13.828 10.4998 14.5 9.82778 14.5 8.99978C14.5 8.17178 13.828 7.49978 13 7.49978Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2746_33510">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                  Communication Center
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Communicate with your team right where your
                                  work is being performed.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 7 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#B18D7433] group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#a2745e] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2753_33593)">
                                    <path d="M23.121 0.879C21.951 -0.291 20.049 -0.291 18.879 0.879L12.172 7.586C11.416 8.341 11 9.346 11 10.414V12C11 12.552 11.447 13 12 13H13.586C14.654 13 15.659 12.583 16.414 11.828L23.121 5.121C24.285 4.004 24.285 1.996 23.121 0.879ZM21.707 3.707L15 10.414C14.622 10.792 14.12 11 13.586 11H13V10.414C13 9.888 13.214 9.372 13.586 9L20.293 2.293C20.684 1.903 21.316 1.903 21.707 2.293C22.095 2.665 22.095 3.335 21.707 3.707ZM12 18C11.447 18 11 17.553 11 17C11 16.447 11.447 16 12 16H15C15.553 16 16 16.447 16 17C16 17.553 15.553 18 15 18H12ZM20 14V19C20 21.757 17.757 24 15 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H14C14.553 0 15 0.448 15 1C15 1.552 14.553 2 14 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H15C16.654 22 18 20.654 18 19V14C18 13.447 18.447 13 19 13C19.553 13 20 13.447 20 14ZM9.167 11.667L7.48 13.354C7.049 13.785 6.485 14.002 5.919 14.002C5.386 14.002 4.853 13.809 4.428 13.42L3.759 12.841C3.342 12.479 3.297 11.847 3.658 11.43C4.021 11.011 4.652 10.969 5.069 11.329L5.758 11.927C5.861 12.02 5.986 12.019 6.065 11.94L7.752 10.253C8.143 9.862 8.775 9.862 9.166 10.253C9.557 10.644 9.558 11.276 9.167 11.667ZM9.167 6.707L7.48 8.394C7.049 8.825 6.485 9.042 5.919 9.042C5.386 9.042 4.853 8.849 4.428 8.46L3.759 7.881C3.342 7.519 3.297 6.887 3.658 6.47C4.021 6.052 4.652 6.009 5.069 6.369L5.758 6.967C5.861 7.061 5.986 7.059 6.065 6.98L7.752 5.293C8.143 4.902 8.775 4.902 9.166 5.293C9.557 5.684 9.558 6.316 9.167 6.707ZM9.167 15.253C9.558 15.644 9.558 16.276 9.167 16.667L7.48 18.354C7.049 18.785 6.485 19.002 5.919 19.002C5.386 19.002 4.853 18.809 4.428 18.42L3.759 17.841C3.342 17.479 3.297 16.848 3.658 16.43C4.021 16.013 4.652 15.968 5.069 16.329L5.758 16.927C5.861 17.02 5.986 17.019 6.065 16.94L7.752 15.253C8.143 14.862 8.776 14.862 9.167 15.253Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2753_33593">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a2745e] duration-300">
                                  Create New Workflows
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  In Jugl, Solutions drive projects to
                                  completion and keep work flowing through
                                  processes. Get a jumpstart with one of our
                                  templates, or create entirely new solutions to
                                  support your unique needs. Simply work the way
                                  you want.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 8 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M14 10C14 11.019 13.692 11.964 13.168 12.754L10.293 9.879C10.105 9.691 10 9.437 10 9.172V5.101C12.282 5.564 14 7.581 14 10ZM8 9.586V5.101C5.45 5.619 3.604 8.077 4.073 10.868C4.398 12.802 5.893 14.411 7.802 14.86C9.272 15.205 10.662 14.893 11.754 14.169L8.585 11C8.21 10.625 8 10.116 8 9.586ZM19 5H17C16.447 5 16 5.448 16 6C16 6.552 16.447 7 17 7H19C19.553 7 20 6.552 20 6C20 5.448 19.553 5 19 5ZM19 9H17C16.447 9 16 9.448 16 10C16 10.552 16.447 11 17 11H19C19.553 11 20 10.552 20 10C20 9.448 19.553 9 19 9ZM19 13H17C16.447 13 16 13.448 16 14C16 14.552 16.447 15 17 15H19C19.553 15 20 14.552 20 14C20 13.448 19.553 13 19 13ZM24 6V14C24 16.757 21.757 19 19 19H13V21H17C17.553 21 18 21.448 18 22C18 22.552 17.553 23 17 23H7C6.447 23 6 22.552 6 22C6 21.448 6.447 21 7 21H11V19H5C2.243 19 0 16.757 0 14V6C0 3.243 2.243 1 5 1H19C21.757 1 24 3.243 24 6ZM22 6C22 4.346 20.654 3 19 3H5C3.346 3 2 4.346 2 6V14C2 15.654 3.346 17 5 17H19C20.654 17 22 15.654 22 14V6Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                  Dashboards
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Build powerful, visually thrilling views into
                                  your information. Gain visual insight into the
                                  performance of any team, process or project,
                                  and make smarter business decisions.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 9 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9B38E533] group-hover/menu:bg-[#af59f3]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#af59f3] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M19.949 5.536L16.465 2.05C15.142 0.728 13.384 0 11.515 0H7C4.243 0 2 2.243 2 5V11C2 11.552 2.447 12 3 12C3.553 12 4 11.552 4 11V5C4 3.346 5.346 2 7 2H11.515C11.678 2 11.84 2.008 12 2.023V7C12 8.654 13.346 10 15 10H19.977C19.992 10.16 20 10.322 20 10.485V19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19C4 18.448 3.553 18 3 18C2.447 18 2 18.448 2 19C2 21.757 4.243 24 7 24H17C19.757 24 22 21.757 22 19V10.485C22 8.614 21.271 6.858 19.949 5.536ZM15 8C14.448 8 14 7.551 14 7V2.659C14.38 2.877 14.733 3.146 15.051 3.464L18.535 6.95C18.853 7.267 19.122 7.62 19.34 8H14.999H15ZM10.398 16H1C0.447 16 0 15.552 0 15C0 14.448 0.447 14 1 14H10.398L9.105 12.707C8.714 12.316 8.714 11.683 9.105 11.293C9.496 10.902 10.128 10.902 10.519 11.293L12.132 12.907C13.286 14.061 13.286 15.939 12.132 17.094L10.519 18.708C10.324 18.903 10.068 19.001 9.812 19.001C9.556 19.001 9.3 18.903 9.105 18.708C8.714 18.318 8.714 17.685 9.105 17.294L10.398 16Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#af59f3] duration-300">
                                  Data Import
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Quickly import your data into Jugl from
                                  spreadsheets, contacts, calendars, and more.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 10 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8A8A8A30] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33599)">
                                    <path d="M9.28804 13.0668C6.97104 13.5128 5.82304 16.0928 5.32504 17.7008C5.27808 17.8507 5.26708 18.0095 5.29294 18.1644C5.31881 18.3194 5.3808 18.466 5.4739 18.5925C5.567 18.719 5.68859 18.8218 5.82882 18.8926C5.96905 18.9633 6.12398 19.0001 6.28104 18.9998H10C10.4172 18.9999 10.8297 18.9129 11.2113 18.7446C11.593 18.5763 11.9353 18.3302 12.2165 18.0221C12.4977 17.714 12.7115 17.3507 12.8444 16.9553C12.9772 16.5599 13.0261 16.1411 12.988 15.7258C12.9349 15.3014 12.7947 14.8925 12.5762 14.5248C12.3577 14.1571 12.0657 13.8384 11.7183 13.5888C11.371 13.3392 10.9758 13.164 10.5577 13.0742C10.1395 12.9843 9.70725 12.9818 9.28804 13.0668Z" />
                                    <path d="M23 8.979C22.7348 8.979 22.4804 9.08436 22.2929 9.27189C22.1054 9.45943 22 9.71378 22 9.979V15H18C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18V22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H16.042C16.3072 2 16.5616 1.89464 16.7491 1.70711C16.9366 1.51957 17.042 1.26522 17.042 1C17.042 0.734784 16.9366 0.48043 16.7491 0.292893C16.5616 0.105357 16.3072 0 16.042 0L5 0C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H16.343C16.9998 24.0019 17.6504 23.8734 18.2572 23.6221C18.8639 23.3708 19.4149 23.0017 19.878 22.536L22.536 19.878C23.0017 19.4149 23.3708 18.8639 23.6221 18.2572C23.8734 17.6504 24.0019 16.9998 24 16.343V9.979C24 9.71378 23.8946 9.45943 23.7071 9.27189C23.5196 9.08436 23.2652 8.979 23 8.979ZM18.464 21.122C18.0607 21.5208 17.5534 21.798 17 21.922V18C17 17.7348 17.1054 17.4804 17.2929 17.2929C17.4804 17.1054 17.7348 17 18 17H21.925C21.801 17.5534 21.5238 18.0607 21.125 18.464L18.464 21.122Z" />
                                    <path d="M14.5661 14.1697C14.3684 14.1697 14.1751 14.111 14.0107 14.0011C13.8462 13.8912 13.7181 13.7351 13.6424 13.5524C13.5668 13.3697 13.547 13.1686 13.5855 12.9747C13.6241 12.7807 13.7193 12.6026 13.8591 12.4627L21.7121 4.60971C21.7999 4.52212 21.8695 4.41807 21.917 4.30354C21.9646 4.189 21.989 4.06621 21.989 3.94221C21.989 3.81821 21.9646 3.69542 21.917 3.58088C21.8695 3.46634 21.7999 3.3623 21.7121 3.27471C21.6228 3.18189 21.5147 3.1093 21.395 3.06186C21.2752 3.01442 21.1467 2.99323 21.0181 2.99971C20.8896 3.0025 20.763 3.03184 20.6463 3.08587C20.5296 3.13991 20.4254 3.21748 20.3401 3.31371L12.7401 11.7207C12.5623 11.9175 12.3136 12.0356 12.0487 12.049C11.7838 12.0624 11.5244 11.97 11.3276 11.7922C11.1308 11.6144 11.0127 11.3657 10.9993 11.1008C10.9859 10.8359 11.0783 10.5765 11.2561 10.3797L18.8561 1.97971C19.1226 1.68217 19.4468 1.44189 19.809 1.27343C20.1712 1.10497 20.5638 1.01184 20.9631 0.999709C21.363 0.991139 21.7606 1.06303 22.1321 1.21111C22.5037 1.35919 22.8417 1.58044 23.1261 1.86171C23.6774 2.41419 23.9869 3.16276 23.9869 3.94321C23.9869 4.72365 23.6774 5.47223 23.1261 6.02471L15.2731 13.8777C15.1804 13.9707 15.0702 14.0444 14.9489 14.0945C14.8275 14.1446 14.6974 14.1702 14.5661 14.1697Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33599">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6d6d6d] duration-300">
                                  Document Designer
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Seamlessly create professional and visually
                                  stunning documents, such as invoices,
                                  contracts, business cards, product sheets,
                                  brochures, HR policies and more - right from
                                  your Jugl records.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 11 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#1FC6A830] group-hover/menu:bg-[#35ccae]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#35ccae] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M22 14C22 14.552 21.553 15 21 15H9C8.448 15 8 14.552 8 14C8 13.448 8.448 13 9 13H21C21.553 13 22 13.448 22 14ZM5 12H3C2.448 12 2 12.448 2 13V15C2 15.552 2.448 16 3 16H5C5.552 16 6 15.552 6 15V13C6 12.448 5.552 12 5 12ZM21 19H9C8.448 19 8 19.448 8 20C8 20.552 8.448 21 9 21H21C21.553 21 22 20.552 22 20C22 19.448 21.553 19 21 19ZM5 18H3C2.448 18 2 18.448 2 19V21C2 21.552 2.448 22 3 22H5C5.552 22 6 21.552 6 21V19C6 18.448 5.552 18 5 18ZM24 4V6C24 8.206 22.206 10 20 10H4C1.794 10 0 8.206 0 6V4C0 1.794 1.794 0 4 0H20C22.206 0 24 1.794 24 4ZM22 4C22 2.897 21.103 2 20 2H4C2.897 2 2 2.897 2 4V6C2 7.103 2.897 8 4 8H20C21.103 8 22 7.103 22 6V4ZM19.114 3.5H14.857C14.16 3.5 13.814 4.346 14.311 4.834L16.169 6.659C16.624 7.114 17.346 7.114 17.801 6.659L19.659 4.834C20.157 4.345 19.812 3.5 19.114 3.5Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#35ccae] duration-300">
                                  Field Types
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  With more than 40 different field types, we’re
                                  the most versatile of any platform. Jugl
                                  supports everything from text and numbers to
                                  sophisticated formulas and links to other
                                  records.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 12 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dcf7d0] group-hover/menu:bg-[#6dd348]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6dd348] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33605)">
                                    <path d="M22.7 14.139L21.29 14.952C20.685 14.3 19.897 13.826 19.001 13.621V12H17.001V13.621C16.105 13.826 15.316 14.299 14.712 14.952L13.302 14.139L12.303 15.871L13.72 16.687C13.591 17.105 13.502 17.54 13.502 17.999C13.502 18.458 13.591 18.894 13.72 19.311L12.303 20.127L13.302 21.859L14.712 21.046C15.317 21.698 16.105 22.172 17.001 22.377V23.998H19.001V22.377C19.897 22.172 20.686 21.699 21.29 21.046L22.7 21.859L23.699 20.127L22.282 19.311C22.411 18.893 22.5 18.458 22.5 17.999C22.5 17.54 22.411 17.104 22.282 16.687L23.699 15.871L22.7 14.139ZM18 20.5C16.622 20.5 15.5 19.379 15.5 18C15.5 16.621 16.622 15.5 18 15.5C19.378 15.5 20.5 16.621 20.5 18C20.5 19.379 19.378 20.5 18 20.5ZM21 7H19V3.486L15.515 0H8C6.346 0 5 1.346 5 3V5H3C1.346 5 0 6.346 0 8V24H12.721C12.072 23.429 11.524 22.751 11.087 22H2V13H11.76C12.411 12.189 13.214 11.507 14.13 11H2V8C2 7.448 2.449 7 3 7H7.764L11.764 9H21C21.551 9 22 9.448 22 10V11.087C22.751 11.524 23.429 12.072 24 12.721V10C24 8.346 22.654 7 21 7ZM8.236 5H7V3C7 2.448 7.449 2 8 2H14V5H17V7H12.236L8.236 5Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33605">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6dd348] duration-300">
                                  File Management
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  With Jugl’s File Management system, manage
                                  files directly in your workflows. Free
                                  yourself of desktop folders, more folders in
                                  your work management tool, then more folders
                                  in your cloud storage.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 13 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#687FFF30] group-hover/menu:bg-[#5b67f9]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#5b67f9] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33607)">
                                    <path d="M10 10C9.20435 10 8.44129 10.3161 7.87868 10.8787C7.31607 11.4413 7 12.2044 7 13C7 13.7957 7.31607 14.5587 7.87868 15.1213C8.44129 15.6839 9.20435 16 10 16H14C14.7956 16 15.5587 15.6839 16.1213 15.1213C16.6839 14.5587 17 13.7957 17 13C17 12.2044 16.6839 11.4413 16.1213 10.8787C15.5587 10.3161 14.7956 10 14 10H10ZM15 13C15 13.2652 14.8946 13.5196 14.7071 13.7071C14.5196 13.8947 14.2652 14 14 14H10C9.73478 14 9.48043 13.8947 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13C9 12.7348 9.10536 12.4804 9.29289 12.2929C9.48043 12.1054 9.73478 12 10 12H14C14.2652 12 14.5196 12.1054 14.7071 12.2929C14.8946 12.4804 15 12.7348 15 13ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8947 16.2652 20 16 20H8C7.73478 20 7.48043 19.8947 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19C7 18.7348 7.10536 18.4804 7.29289 18.2929C7.48043 18.1054 7.73478 18 8 18H16C16.2652 18 16.5196 18.1054 16.7071 18.2929C16.8946 18.4804 17 18.7348 17 19ZM19.536 3.12102L17.878 1.46502C17.4149 0.999267 16.864 0.629977 16.2572 0.378513C15.6504 0.127049 14.9998 -0.00159798 14.343 1.49812e-05H8C6.67441 0.00160284 5.40356 0.528897 4.46622 1.46624C3.52888 2.40357 3.00159 3.67442 3 5.00002V19C3.00159 20.3256 3.52888 21.5965 4.46622 22.5338C5.40356 23.4711 6.67441 23.9984 8 24H16C17.3256 23.9984 18.5964 23.4711 19.5338 22.5338C20.4711 21.5965 20.9984 20.3256 21 19V6.65702C21.0019 6.0001 20.8735 5.34934 20.6222 4.74238C20.3709 4.13543 20.0017 3.58435 19.536 3.12102ZM18.122 4.53502C18.2627 4.67744 18.3893 4.83317 18.5 5.00002H16V2.50002C16.1671 2.60954 16.3226 2.73587 16.464 2.87702L18.122 4.53502ZM19 19C19 19.7957 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7957 5 19V5.00002C5 4.20437 5.31607 3.4413 5.87868 2.8787C6.44129 2.31609 7.20435 2.00002 8 2.00002H14V5.00002C14 5.53045 14.2107 6.03916 14.5858 6.41423C14.9609 6.7893 15.4696 7.00002 16 7.00002H19V19Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33607">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#5b67f9] duration-300">
                                  Forms
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Collect data from external users with Jugl
                                  Forms. You can share a link to a responsive
                                  form view or embed it in your existing Website
                                  to make it easy to onboard customers, accept
                                  applications, collect feedback and more.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 14 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#C78EA430] group-hover/menu:bg-[#ba7a91]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#ba7a91] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33609)">
                                    <path d="M19 0H5C2.243 0 0 2.243 0 5V19C0 21.757 2.243 24 5 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM22 19C22 20.654 20.654 22 19 22H5C3.346 22 2 20.654 2 19V5C2 3.346 3.346 2 5 2H19C20.654 2 22 3.346 22 5V19ZM9 8V11H10C10.552 11 11 11.447 11 12C11 12.553 10.552 13 10 13H9V18C9 18.553 8.552 19 8 19C7.448 19 7 18.553 7 18V13H6C5.448 13 5 12.553 5 12C5 11.447 5.448 11 6 11H7V8C7 6.346 8.346 5 10 5C10.552 5 11 5.447 11 6C11 6.553 10.552 7 10 7C9.448 7 9 7.448 9 8ZM18.832 12.555L17.202 15L18.832 17.445C19.138 17.905 19.014 18.525 18.555 18.832C18.385 18.945 18.192 19 18.001 19C17.678 19 17.361 18.844 17.168 18.555L16 16.803L14.832 18.555C14.639 18.844 14.322 19 13.999 19C13.809 19 13.616 18.945 13.445 18.832C12.986 18.525 12.862 17.905 13.168 17.445L14.798 15L13.168 12.555C12.862 12.095 12.986 11.475 13.445 11.168C13.904 10.861 14.525 10.986 14.832 11.445L16 13.197L17.168 11.445C17.474 10.986 18.094 10.861 18.555 11.168C19.014 11.475 19.138 12.095 18.832 12.555Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33609">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a45e73] duration-300">
                                  Formulas
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Your spreadsheets, just a bit smarter.
                                  Calculate values based on other fields using
                                  simple functions or advanced logic.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 15 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#FBB57E30] group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#f8853f] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33611)">
                                    <path d="M24 22.5C24 23.33 23.33 24 22.5 24H5.5C2.47 24 0 21.53 0 18.5V1.5C0 0.67 0.67 0 1.5 0C2.33 0 3 0.67 3 1.5V18.5C3 19.88 4.12 21 5.5 21H22.5C23.33 21 24 21.67 24 22.5ZM16 16.5C16 17.33 16.67 18 17.5 18H22.5C23.33 18 24 17.33 24 16.5C24 15.67 23.33 15 22.5 15H17.5C16.67 15 16 15.67 16 16.5ZM9 10.5C9 11.33 9.67 12 10.5 12H18.5C19.33 12 20 11.33 20 10.5C20 9.67 19.33 9 18.5 9H10.5C9.67 9 9 9.67 9 10.5ZM6.5 6H11.5C12.33 6 13 5.33 13 4.5C13 3.67 12.33 3 11.5 3H6.5C5.67 3 5 3.67 5 4.5C5 5.33 5.67 6 6.5 6Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33611">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300">
                                  Gantt Charts
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Jugl’s Gantt chart feature lets you oversee,
                                  adjust, and communicate project details,
                                  tasks, and timelines.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 16 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#BCBE4433] group-hover/menu:bg-[#a6aa38]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#a6aa38] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33613)">
                                    <path d="M4.5 19.5V22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21V19.5H4.5ZM6.5 17.5H0V21C0 21.7956 0.31607 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H6.5V17.5Z" />
                                    <path d="M22 19.5V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H19.5V19.5H22ZM24 17.5H17.5V24H21C21.7956 24 22.5587 23.6839 23.1213 23.1213C23.6839 22.5587 24 21.7956 24 21V17.5Z" />
                                    <path d="M4.5 10.75V13.25H2V10.75H4.5ZM6.5 8.75H0V15.25H6.5V8.75Z" />
                                    <path d="M22 10.75V13.25H19.5V10.75H22ZM24 8.75H17.5V15.25H24V8.75Z" />
                                    <path d="M4.5 2V4.5H2V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H4.5ZM6.5 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3L0 6.5H6.5V0Z" />
                                    <path d="M13.25 19.5V22H10.75V19.5H13.25ZM15.25 17.5H8.75V24H15.25V17.5Z" />
                                    <path d="M13.25 10.75V13.25H10.75V10.75H13.25ZM15.25 8.75H8.75V15.25H15.25V8.75Z" />
                                    <path d="M13.25 2V4.5H10.75V2H13.25ZM15.25 0H8.75V6.5H15.25V0Z" />
                                    <path d="M21 2C21.2652 2 21.5196 2.10536 21.7071 2.29289C21.8946 2.48043 22 2.73478 22 3V4.5H19.5V2H21ZM21 0H17.5V6.5H24V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.31607 21.7956 0 21 0Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33613">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#a6aa38] duration-300">
                                  Grid View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  View projects and processes in a better than
                                  spreadsheet grid format with powerful sort,
                                  filter, group, and inline edit capabilities.
                                  Build what you want, from basic to
                                  extravagant.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 17 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#fde3e3] group-hover/menu:bg-[#e84b4b]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#e84b4b] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33624)">
                                    <path d="M0.00690435 8.822C0.00290435 8.881 0.00590435 8.762 0.00690435 8.822V8.822ZM23.6319 20.744C23.4469 21.065 23.1109 21.245 22.7639 21.245C22.5949 21.245 22.4229 21.202 22.2659 21.111L21.2889 20.548C20.6839 21.2 19.8959 21.674 18.9999 21.879V23C18.9999 23.553 18.5519 24 17.9999 24C17.4479 24 16.9999 23.553 16.9999 23V21.879C16.1039 21.674 15.3149 21.201 14.7109 20.548L13.7339 21.111C13.5769 21.202 13.4049 21.245 13.2359 21.245C12.8899 21.245 12.5529 21.065 12.3679 20.744C12.0929 20.265 12.2569 19.654 12.7359 19.379L13.7189 18.813C13.5899 18.395 13.5009 17.96 13.5009 17.5C13.5009 17.04 13.5899 16.605 13.7189 16.187L12.7359 15.621C12.2569 15.346 12.0929 14.734 12.3679 14.256C12.6439 13.777 13.2559 13.613 13.7339 13.889L14.7109 14.452C15.3159 13.8 16.1039 13.326 16.9999 13.121V12C16.9999 11.447 17.4479 11 17.9999 11C18.5519 11 18.9999 11.447 18.9999 12V13.121C19.8959 13.326 20.6849 13.799 21.2889 14.452L22.2659 13.889C22.7449 13.614 23.3559 13.778 23.6319 14.256C23.9069 14.735 23.7429 15.346 23.2639 15.621L22.2809 16.187C22.4099 16.605 22.4989 17.04 22.4989 17.5C22.4989 17.96 22.4099 18.395 22.2809 18.813L23.2639 19.379C23.7429 19.654 23.9069 20.266 23.6319 20.744ZM20.4999 17.5C20.4999 16.121 19.3779 15 17.9999 15C16.6219 15 15.4999 16.121 15.4999 17.5C15.4999 18.879 16.6219 20 17.9999 20C19.3779 20 20.4999 18.879 20.4999 17.5ZM6.9999 5H11.9999C13.1049 5 13.9999 5.895 13.9999 7V10C13.9999 10.552 14.4479 11 14.9999 11C15.5519 11 15.9999 10.552 15.9999 10V7C15.9999 4.791 14.2089 3 11.9999 3H11.3389C11.4199 2.481 11.5009 1.949 11.4999 1.917C11.4789 0.834 10.7039 0.042 9.3219 0C8.2419 0.077 7.4279 1.015 7.5049 2.096C7.5209 2.28 7.5799 2.641 7.6429 3H6.9999C4.7909 3 2.9999 4.791 2.9999 7V7.659C2.4859 7.579 1.9629 7.499 1.9319 7.5C0.848904 7.521 -0.0110957 8.417 0.00990435 9.5C-0.0280957 10.772 1.0299 11.572 2.1099 11.495C2.2919 11.48 2.6449 11.422 2.9999 11.36V12.001C2.9999 14.21 4.7909 16.001 6.9999 16.001H8.4879C9.1389 16.001 9.7069 15.575 9.9009 14.953C10.1559 14.138 10.5289 13.376 11.0019 12.687C11.2479 12.329 11.2709 11.833 10.9629 11.526C10.6459 11.21 10.1719 11.001 9.4989 11.001C8.1909 11.001 7.4989 12.001 7.5039 13.111C7.5039 13.293 7.5769 13.646 7.6389 14.001H6.9989C5.8939 14.001 4.9989 13.106 4.9989 12.001V7.001C4.9989 5.896 5.8939 5.001 6.9989 5.001L6.9999 5Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33624">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e84b4b] duration-300">
                                  Integrations
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  You’ve got the tools - we’ve got the
                                  integrations. Connect them all to centralize
                                  your data and workflows in one place, and
                                  prioritize the work that matters.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 18 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dff3ff] group-hover/menu:bg-[#05b2f2]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#05b2f2] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33628)">
                                    <path d="M19 0H5C2.24 0 0 2.24 0 5V19C0 21.76 2.24 24 5 24H19C21.76 24 24 21.76 24 19V5C24 2.24 21.76 0 19 0ZM22 19C22 20.65 20.65 22 19 22H5C3.35 22 2 20.65 2 19V5C2 3.35 3.35 2 5 2H19C20.65 2 22 3.35 22 5V19ZM11 6V11C11 11.55 10.55 12 10 12C9.45 12 9 11.55 9 11V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6ZM7 6V14C7 14.55 6.55 15 6 15C5.45 15 5 14.55 5 14V6C5 5.45 5.45 5 6 5C6.55 5 7 5.45 7 6ZM15 6V18C15 18.55 14.55 19 14 19C13.45 19 13 18.55 13 18V6C13 5.45 13.45 5 14 5C14.55 5 15 5.45 15 6ZM19 6V9C19 9.55 18.55 10 18 10C17.45 10 17 9.55 17 9V6C17 5.45 17.45 5 18 5C18.55 5 19 5.45 19 6Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33628">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#05b2f2] duration-300">
                                  Kanban View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Kanban View is perfect for visualizing a
                                  workflow through the different stages,
                                  tracking progress, and assigning tasks in a
                                  manner that removes bottlenecks.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 19 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f7edfa] group-hover/menu:bg-[#c268cd]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#c268cd] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33632)">
                                    <path d="M20.68 1.16743L20.659 1.16043L17.944 0.260433C17.0062 -0.0509116 15.9974 -0.0783941 15.044 0.181433L9.468 1.80043C8.78525 1.98137 8.06072 1.91769 7.42 1.62043L6.92 1.38843C6.16059 1.07261 5.335 0.94899 4.51639 1.02854C3.69779 1.10809 2.91144 1.38835 2.22705 1.84448C1.54266 2.30061 0.981356 2.91852 0.592883 3.64346C0.204411 4.3684 0.000767286 5.17797 0 6.00043L0 18.0754C0.0021016 19.1568 0.353792 20.2084 1.00259 21.0735C1.65139 21.9386 2.56251 22.5706 3.6 22.8754L6.469 23.7754C6.95302 23.9259 7.45713 24.0018 7.964 24.0004C8.41581 24.0062 8.866 23.9452 9.3 23.8194L15.1 22.2194C15.63 22.0757 16.1893 22.0802 16.717 22.2324L19.06 22.9084C19.6482 23.0506 20.261 23.0575 20.8523 22.9286C21.4436 22.7996 21.9979 22.5382 22.4735 22.164C22.9491 21.7898 23.3336 21.3125 23.598 20.7682C23.8624 20.2238 23.9999 19.6266 24 19.0214V5.87643C23.9985 4.84527 23.6788 3.83969 23.0847 2.99693C22.4905 2.15416 21.6507 1.51527 20.68 1.16743ZM4.176 20.9594C3.55031 20.7785 3.00009 20.3997 2.6078 19.8798C2.2155 19.3598 2.00225 18.7268 2 18.0754V6.00043C1.99514 5.50511 2.11496 5.01653 2.34842 4.57965C2.58189 4.14278 2.9215 3.77165 3.336 3.50043C3.8292 3.17328 4.40816 2.99931 5 3.00043C5.38166 3.00054 5.75955 3.07598 6.112 3.22243C6.112 3.22243 6.857 3.54143 6.999 3.59243V21.8424L4.176 20.9594ZM9 21.8274V3.87943C9.33966 3.86141 9.67667 3.80948 10.006 3.72443L15 2.27343V20.2004L9 21.8274ZM22 19.0214C22.0002 19.321 21.9331 19.6167 21.8037 19.8869C21.6743 20.157 21.4859 20.3947 21.2524 20.5822C21.0188 20.7698 20.7461 20.9025 20.4544 20.9706C20.1627 21.0386 19.8594 21.0403 19.567 20.9754L17 20.2524V2.07543L20.018 3.05443C20.598 3.26459 21.0993 3.64811 21.4539 4.15296C21.8085 4.6578 21.9991 5.25951 22 5.87643V19.0214Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33632">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#c268cd] duration-300">
                                  Map View
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  View any of your location data in a fully
                                  interactive map format that includes powerful
                                  display features. Jugl is your digital
                                  playground for physical locations.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 20 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f6ebde] group-hover/menu:bg-[#c87847]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#c87847] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33634)">
                                    <path d="M21 11H16C14.346 11 13 12.346 13 14V21C13 22.654 14.346 24 16 24H21C22.654 24 24 22.654 24 21V14C24 12.346 22.654 11 21 11ZM22 21C22 21.551 21.552 22 21 22H16C15.448 22 15 21.551 15 21V14C15 13.449 15.448 13 16 13H21C21.552 13 22 13.449 22 14V21ZM21 15.997C21 16.549 20.553 16.997 20 16.997H17C16.447 16.997 16 16.549 16 15.997C16 15.445 16.447 14.997 17 14.997H20C20.553 14.997 21 15.445 21 15.997ZM21 19C21 19.552 20.553 20 20 20H17C16.447 20 16 19.552 16 19C16 18.448 16.447 18 17 18H20C20.553 18 21 18.448 21 19ZM9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 2C11.206 2 13 3.794 13 6C13 8.206 11.206 10 9 10C6.794 10 5 8.206 5 6C5 3.794 6.794 2 9 2ZM11 15C11 15.552 10.553 16 10 16H9C5.141 16 2 19.14 2 23C2 23.552 1.553 24 1 24C0.447 24 0 23.552 0 23C0 18.038 4.037 14 9 14H10C10.553 14 11 14.448 11 15Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33634">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#c87847] duration-300">
                                  Member Directory
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Easily find, connect and collaborate with team
                                  members anywhere in the world. Check out who’s
                                  available and get to know other team members
                                  through their profiles.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 21 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e0e7ff] group-hover/menu:bg-[#6468f0]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6468f0] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33636)">
                                    <path d="M19 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H5C3.67441 4.00159 2.40356 4.52888 1.46622 5.46622C0.528882 6.40356 0.00158786 7.67441 0 9L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V9C23.9984 7.67441 23.4711 6.40356 22.5338 5.46622C21.5964 4.52888 20.3256 4.00159 19 4ZM11 2H13C13.6183 2.00256 14.2206 2.19608 14.7247 2.55409C15.2288 2.91209 15.6099 3.41709 15.816 4H8.184C8.39008 3.41709 8.77123 2.91209 9.2753 2.55409C9.77937 2.19608 10.3817 2.00256 11 2ZM5 6H19C19.7956 6 20.5587 6.31607 21.1213 6.87868C21.6839 7.44129 22 8.20435 22 9V12H2V9C2 8.20435 2.31607 7.44129 2.87868 6.87868C3.44129 6.31607 4.20435 6 5 6ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V14H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V14H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33636">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#6468f0] duration-300">
                                  My Work
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  A single place to view your assigned work
                                  across all processes and projects. View tasks
                                  by priority and due date, then get to work.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 22 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#e7e7e7] group-hover/menu:bg-[#6d6d6d]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#6d6d6d] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33638)">
                                    <path d="M19.9996 8C22.2056 8 23.9996 6.206 23.9996 4C23.9996 1.794 22.2056 0 19.9996 0C17.7936 0 15.9996 1.794 15.9996 4C15.9996 6.206 17.7936 8 19.9996 8ZM19.9996 2C21.1026 2 21.9996 2.897 21.9996 4C21.9996 5.103 21.1026 6 19.9996 6C18.8966 6 17.9996 5.103 17.9996 4C17.9996 2.897 18.8966 2 19.9996 2ZM23.2716 16.247L23.2666 16.228V16.227L21.6936 9.754C21.1556 9.912 20.5886 10.001 19.9996 10.001C19.8956 10.001 19.7946 9.991 19.6916 9.985L21.3286 16.72C21.3306 16.727 21.3356 16.732 21.3366 16.74H21.3326C21.4146 17.048 21.3536 17.355 21.1636 17.606C20.9716 17.861 20.6876 18.001 20.3676 18.001H3.49259C3.18759 18.001 2.90359 17.864 2.71459 17.63C2.52259 17.39 2.45059 17.082 2.50759 16.818L4.85959 7.701C5.60559 4.345 8.54159 2.001 11.9996 2.001C12.7726 2.001 13.5226 2.133 14.2316 2.362C14.4196 1.701 14.7156 1.087 15.1036 0.541C14.1246 0.193 13.0786 0.002 11.9996 0.002C7.59759 0 3.85859 2.988 2.91559 7.233L0.563591 16.352C0.366591 17.242 0.581591 18.163 1.15459 18.88C1.72759 19.592 2.58059 20 3.49259 20H7.10059C7.56559 22.279 9.58459 24 11.9996 24C14.4146 24 16.4336 22.279 16.8986 20H20.3686C21.3156 20 22.1856 19.567 22.7586 18.814C23.3146 18.081 23.4976 17.154 23.2726 16.264C23.2716 16.258 23.2726 16.253 23.2726 16.247H23.2716ZM11.9996 22C10.6976 22 9.59759 21.161 9.18359 20H14.8146C14.4006 21.161 13.3006 22 11.9986 22H11.9996Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33638">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#4f4f4f] duration-300">
                                  Notification Center
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Receive real-time notifications in Jugl to
                                  stay informed about actions relevant to you.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 23 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#dbf0e1] group-hover/menu:bg-[#33845a]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#33845a] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M3 5.5C3 4.672 3.672 4 4.5 4C5.328 4 6 4.672 6 5.5C6 6.328 5.328 7 4.5 7C3.672 7 3 6.328 3 5.5ZM8.5 7C9.328 7 10 6.328 10 5.5C10 4.672 9.328 4 8.5 4C7.672 4 7 4.672 7 5.5C7 6.328 7.672 7 8.5 7ZM24 6V18C24 20.757 21.757 23 19 23H5C2.243 23 0 20.757 0 18V6C0 3.243 2.243 1 5 1H19C21.757 1 24 3.243 24 6ZM2 6V8H22V6C22 4.346 20.654 3 19 3H5C3.346 3 2 4.346 2 6ZM14 10H2V14.5H14V10ZM5 21H14V16.5H2V18C2 19.654 3.346 21 5 21ZM22 18V10H16V21H19C20.654 21 22 19.654 22 18Z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#33845a] duration-300">
                                  Page Designer
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Display your info how you want it, to meet the
                                  needs of every audience. Quickly build
                                  gorgeous, functional, and responsive pages
                                  with an intuitive interface that lets you
                                  customize the overall layout, style, and
                                  design of your projects and processes.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 24 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f8ebf2] group-hover/menu:bg-[#b74b7b]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#b74b7b] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33642)">
                                    <path d="M23.707 23.707C23.512 23.902 23.256 24 23 24C22.744 24 22.488 23.902 22.293 23.707L16.324 17.738C14.599 19.15 12.397 20 10 20C4.486 20 0 15.514 0 9.99996C0 4.48596 4.486 -4.34527e-05 10 -4.34527e-05C11.758 -4.34527e-05 13.487 0.462957 15.001 1.33796C15.479 1.61496 15.643 2.22696 15.365 2.70496C15.18 3.02496 14.844 3.20396 14.499 3.20396C14.329 3.20396 14.157 3.16096 13.999 3.06996C12.79 2.36996 11.407 1.99996 10 1.99996C5.589 1.99996 2 5.58896 2 9.99996C2 11.167 2.257 12.274 2.709 13.274L6.508 8.71496C6.87 8.27896 7.404 8.01496 7.97 7.98896C8.532 7.96396 9.092 8.17696 9.494 8.57996L11.422 10.508L20.237 0.339957C20.599 -0.0790434 21.231 -0.122043 21.647 0.236957C22.065 0.597957 22.112 1.22996 21.751 1.64796L12.971 11.814C12.605 12.238 12.074 12.493 11.513 12.514C10.956 12.528 10.405 12.319 10.008 11.922L8.08 9.99396L3.817 15.069C5.285 16.857 7.512 17.999 10 17.999C14.411 17.999 18 14.41 18 9.99896C18 9.84896 17.995 9.69996 17.987 9.55196C17.958 8.99996 18.382 8.52996 18.933 8.49996C19.48 8.45996 19.955 8.89396 19.985 9.44496C19.995 9.62796 20 9.81296 20 9.99796C20 12.396 19.15 14.598 17.738 16.322L23.707 22.291C24.098 22.682 24.098 23.314 23.707 23.705V23.707Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33642">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#b74b7b] duration-300">
                                  Power Search
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Easily search for anything across every part
                                  of Jugl.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 25 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f9fcc5] group-hover/menu:bg-[#e4cc0e]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#e4cc0e] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33644)">
                                    <path d="M19 6V4C19 2.93913 18.5786 1.92172 17.8284 1.17157C17.0783 0.421427 16.0609 0 15 0L9 0C7.93913 0 6.92172 0.421427 6.17157 1.17157C5.42143 1.92172 5 2.93913 5 4V6C3.67441 6.00159 2.40356 6.52888 1.46622 7.46622C0.528882 8.40356 0.00158786 9.67441 0 11L0 16C0.00158786 17.3256 0.528882 18.5964 1.46622 19.5338C2.40356 20.4711 3.67441 20.9984 5 21C5 21.7956 5.31607 22.5587 5.87868 23.1213C6.44129 23.6839 7.20435 24 8 24H16C16.7956 24 17.5587 23.6839 18.1213 23.1213C18.6839 22.5587 19 21.7956 19 21C20.3256 20.9984 21.5964 20.4711 22.5338 19.5338C23.4711 18.5964 23.9984 17.3256 24 16V11C23.9984 9.67441 23.4711 8.40356 22.5338 7.46622C21.5964 6.52888 20.3256 6.00159 19 6ZM7 4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V6H7V4ZM17 21C17 21.2652 16.8946 21.5196 16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22H8C7.73478 22 7.48043 21.8946 7.29289 21.7071C7.10536 21.5196 7 21.2652 7 21V17C7 16.7348 7.10536 16.4804 7.29289 16.2929C7.48043 16.1054 7.73478 16 8 16H16C16.2652 16 16.5196 16.1054 16.7071 16.2929C16.8946 16.4804 17 16.7348 17 17V21ZM22 16C22 16.7956 21.6839 17.5587 21.1213 18.1213C20.5587 18.6839 19.7956 19 19 19V17C19 16.2044 18.6839 15.4413 18.1213 14.8787C17.5587 14.3161 16.7956 14 16 14H8C7.20435 14 6.44129 14.3161 5.87868 14.8787C5.31607 15.4413 5 16.2044 5 17V19C4.20435 19 3.44129 18.6839 2.87868 18.1213C2.31607 17.5587 2 16.7956 2 16V11C2 10.2044 2.31607 9.44129 2.87868 8.87868C3.44129 8.31607 4.20435 8 5 8H19C19.7956 8 20.5587 8.31607 21.1213 8.87868C21.6839 9.44129 22 10.2044 22 11V16Z" />
                                    <path d="M18 10H16C15.7348 10 15.4804 10.1054 15.2929 10.2929C15.1054 10.4804 15 10.7348 15 11C15 11.2652 15.1054 11.5196 15.2929 11.7071C15.4804 11.8946 15.7348 12 16 12H18C18.2652 12 18.5196 11.8946 18.7071 11.7071C18.8946 11.5196 19 11.2652 19 11C19 10.7348 18.8946 10.4804 18.7071 10.2929C18.5196 10.1054 18.2652 10 18 10Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33644">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#e4cc0e] duration-300">
                                  Print / Export
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Print or export your work in multiple business
                                  and user-friendly formats.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 26 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#feecd6] group-hover/menu:bg-[#f36f1c]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#f36f1c] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33647)">
                                    <path d="M9 24H1C0.734784 24 0.48043 23.8946 0.292893 23.7071C0.105357 23.5196 0 23.2652 0 23C0 22.7348 0.105357 22.4804 0.292893 22.2929C0.48043 22.1054 0.734784 22 1 22H9C9.26522 22 9.51957 22.1054 9.70711 22.2929C9.89464 22.4804 10 22.7348 10 23C10 23.2652 9.89464 23.5196 9.70711 23.7071C9.51957 23.8946 9.26522 24 9 24Z" />
                                    <path d="M7 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19C0 18.7348 0.105357 18.4804 0.292893 18.2929C0.48043 18.1054 0.734784 18 1 18H7C7.26522 18 7.51957 18.1054 7.70711 18.2929C7.89464 18.4804 8 18.7348 8 19C8 19.2652 7.89464 19.5196 7.70711 19.7071C7.51957 19.8946 7.26522 20 7 20Z" />
                                    <path d="M5 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H5C5.26522 14 5.51957 14.1054 5.70711 14.2929C5.89464 14.4804 6 14.7348 6 15C6 15.2652 5.89464 15.5196 5.70711 15.7071C5.51957 15.8946 5.26522 16 5 16Z" />
                                    <path d="M13 23.9549C12.7348 23.9667 12.4757 23.8726 12.2798 23.6934C12.084 23.5143 11.9673 23.2646 11.9555 22.9994C11.9437 22.7342 12.0377 22.4751 12.2169 22.2792C12.3961 22.0833 12.6458 21.9667 12.911 21.9549C14.8034 21.7817 16.6074 21.0729 18.1115 19.9115C19.6157 18.75 20.7577 17.184 21.4039 15.3969C22.0501 13.6098 22.1737 11.6755 21.7602 9.82068C21.3468 7.96584 20.4133 6.26722 19.0692 4.92377C17.7252 3.58032 16.0261 2.64767 14.1711 2.23504C12.3161 1.82241 10.3819 1.9469 8.59505 2.59393C6.80823 3.24096 5.24276 4.38373 4.08201 5.8884C2.92125 7.39307 2.21327 9.19733 2.04098 11.0899C2.01711 11.354 1.88929 11.5979 1.68562 11.7678C1.48196 11.9377 1.21914 12.0197 0.954983 11.9959C0.690827 11.972 0.446973 11.8442 0.277065 11.6405C0.107157 11.4368 0.0251132 11.174 0.0489827 10.9099C0.327872 7.83318 1.78259 4.98257 4.11031 2.95144C6.43804 0.920301 9.45942 -0.134865 12.5455 0.00558262C15.6316 0.14603 18.5447 1.47127 20.6783 3.70544C22.8119 5.93961 24.0017 8.91056 24 11.9999C24.0153 14.9982 22.9014 17.8925 20.8799 20.1069C18.8583 22.3213 16.0773 23.6936 13.09 23.9509C13.06 23.9539 13.029 23.9549 13 23.9549Z" />
                                    <path d="M12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33647">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#f36f1c] duration-300">
                                  Real Time Updates
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Instantly see when anything and everything is
                                  updated. Who, what, when - it’s all available
                                  in real-time, down to the second. There’s no
                                  refresh button, you’re always working on the
                                  current version.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 27 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#2DC0CA33] group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33653)">
                                    <path d="M16.5 23C16.5 23.553 16.052 24 15.5 24H13.613C12.654 24 11.802 23.5 11.334 22.663C10.866 21.825 10.887 20.838 11.39 20.02L12.23 18.658C12.521 18.188 13.137 18.042 13.606 18.331C14.076 18.621 14.222 19.237 13.932 19.707L13.092 21.069C12.923 21.344 13.027 21.593 13.079 21.687C13.131 21.781 13.288 21.999 13.612 21.999H15.499C16.051 21.999 16.499 22.446 16.499 22.999L16.5 23ZM9 23C9 23.553 8.552 24 8 24C5.446 24 3.409 22.099 3.157 19.479L1.86 6H1C0.448 6 0 5.553 0 5C0 4.447 0.448 4 1 4H5.101C5.566 1.721 7.586 0 10 0H12C14.414 0 16.434 1.721 16.899 4H21C21.552 4 22 4.447 22 5C22 5.553 21.552 6 21 6H20.115L19.768 9.661C19.719 10.179 19.188 10.561 18.678 10.561C18.128 10.509 17.724 10.021 17.777 9.471L18.106 5.999H3.87L5.148 19.286C5.299 20.858 6.499 21.999 8 21.999C8.552 21.999 9 22.447 9 23ZM7.184 4H14.815C14.401 2.839 13.301 2 11.999 2H9.999C8.697 2 7.598 2.839 7.184 4ZM19.77 16.785C19.952 16.785 20.136 16.735 20.301 16.632C20.769 16.338 20.91 15.721 20.616 15.253L19.674 13.753C19.193 12.986 18.368 12.53 17.464 12.53H17.453C16.544 12.534 15.718 12.998 15.241 13.771L14.35 15.216C14.06 15.686 14.207 16.302 14.677 16.592C15.147 16.881 15.763 16.735 16.053 16.265L16.943 14.82C17.104 14.559 17.359 14.53 17.461 14.53C17.588 14.538 17.817 14.556 17.98 14.816L18.923 16.317C19.113 16.619 19.437 16.785 19.77 16.785ZM23.597 20.001L22.846 18.806C22.552 18.339 21.936 18.199 21.467 18.492C21 18.786 20.859 19.403 21.153 19.871L21.904 21.066C22.076 21.34 21.973 21.59 21.921 21.685C21.868 21.78 21.712 22 21.387 22H19.5C18.948 22 18.5 22.447 18.5 23C18.5 23.553 18.948 24 19.5 24H21.387C22.351 24 23.205 23.496 23.671 22.652C24.138 21.808 24.11 20.817 23.597 20.001Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33653">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300">
                                  Recycle Bin
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Never worry about losing data! Anything you
                                  delete can be restored in a couple of clicks.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 28 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#8990B82E] group-hover/menu:bg-[#7e81ad]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#7e81ad] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2755_33655)">
                                    <path d="M19 0H10C7.243 0 5 2.243 5 5V6H4.5C2.019 6 0 8.019 0 10.5V20.5C0 22.429 1.569 23.999 3.499 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM5 20.5C5 21.327 4.327 22 3.5 22C2.673 22 2 21.327 2 20.5V10.5C2 9.122 3.122 8 4.5 8H5V20.5ZM22 19C22 20.654 20.654 22 19 22H6.662C6.878 21.545 7 21.037 7 20.5V5C7 3.346 8.346 2 10 2H19C20.654 2 22 3.346 22 5V19ZM20 7C20 7.552 19.552 8 19 8H16C15.448 8 15 7.552 15 7C15 6.448 15.448 6 16 6H19C19.552 6 20 6.448 20 7ZM20 11C20 11.552 19.552 12 19 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H19C19.552 10 20 10.448 20 11ZM20 15C20 15.552 19.552 16 19 16H10C9.448 16 9 15.552 9 15C9 14.448 9.448 14 10 14H19C19.552 14 20 14.448 20 15ZM20 19C20 19.552 19.552 20 19 20H10C9.448 20 9 19.552 9 19C9 18.448 9.448 18 10 18H19C19.552 18 20 18.448 20 19ZM9 7V5C9 4.448 9.448 4 10 4H12C12.552 4 13 4.448 13 5V7C13 7.552 12.552 8 12 8H10C9.448 8 9 7.552 9 7Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2755_33655">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#7e81ad] duration-300">
                                  Robust Reporting
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Robust reporting capabilities keep teams
                                  organized to deliver projects, run their core
                                  processes, and glean insights to inform
                                  productive business decisions. Create powerful
                                  reports in a matter of minutes.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 29 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#9C64862E] group-hover/menu:bg-[#85516f]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#85516f] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2758_33657)">
                                    <path d="M17 14C17 14.2652 16.8946 14.5196 16.7071 14.7071C16.5196 14.8947 16.2652 15 16 15H8C7.73478 15 7.48043 14.8947 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14C7 13.7348 7.10536 13.4805 7.29289 13.2929C7.48043 13.1054 7.73478 13 8 13H16C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4805 17 13.7348 17 14ZM13 17H8C7.73478 17 7.48043 17.1054 7.29289 17.2929C7.10536 17.4805 7 17.7348 7 18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8947 7.73478 19 8 19H13C13.2652 19 13.5196 18.8947 13.7071 18.7071C13.8946 18.5196 14 18.2652 14 18C14 17.7348 13.8946 17.4805 13.7071 17.2929C13.5196 17.1054 13.2652 17 13 17ZM22 10.485V19C21.9984 20.3256 21.4711 21.5965 20.5338 22.5338C19.5964 23.4711 18.3256 23.9984 17 24H7C5.67441 23.9984 4.40356 23.4711 3.46622 22.5338C2.52888 21.5965 2.00159 20.3256 2 19V5.00002C2.00159 3.67443 2.52888 2.40358 3.46622 1.46624C4.40356 0.528905 5.67441 0.00161091 7 2.30487e-05H11.515C12.4346 -0.00234388 13.3456 0.177611 14.1952 0.529482C15.0449 0.881354 15.8163 1.39816 16.465 2.05002L19.949 5.53602C20.6012 6.18426 21.1184 6.95548 21.4704 7.805C21.8225 8.65451 22.0025 9.56545 22 10.485ZM15.051 3.46402C14.7363 3.15918 14.3829 2.89695 14 2.68402V7.00002C14 7.26524 14.1054 7.51959 14.2929 7.70713C14.4804 7.89467 14.7348 8.00002 15 8.00002H19.316C19.103 7.61721 18.8404 7.26417 18.535 6.95002L15.051 3.46402ZM20 10.485C20 10.32 19.968 10.162 19.953 10H15C14.2044 10 13.4413 9.68395 12.8787 9.12134C12.3161 8.55873 12 7.79567 12 7.00002V2.04702C11.838 2.03202 11.679 2.00002 11.515 2.00002H7C6.20435 2.00002 5.44129 2.31609 4.87868 2.8787C4.31607 3.44131 4 4.20437 4 5.00002V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.684 6.20435 22 7 22H17C17.7956 22 18.5587 21.684 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V10.485Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2758_33657">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#85516f] duration-300">
                                  JuglDocs
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  We’re revolutionizing what you expect out of
                                  an online document - try it once and you’ll
                                  never go back. If you’ve ever wished for the
                                  ability to do something in your docs, we’re
                                  your work genie.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 30 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7f4e3] group-hover/menu:bg-[#289f71]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#289f71] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2758_33659)">
                                    <path d="M19.0264 12V18C19.0264 18.552 18.5784 19 18.0264 19C17.4744 19 17.0264 18.552 17.0264 18V12C17.0264 11.448 17.4744 11 18.0264 11C18.5784 11 19.0264 11.448 19.0264 12ZM11.6064 6.717L14.6774 17.746C14.8524 18.376 14.3794 19 13.7244 19C13.2814 19 12.8934 18.706 12.7724 18.28L12.1294 16H6.92337L6.28037 18.28C6.16037 18.706 5.77137 19 5.32837 19C4.67437 19 4.20037 18.376 4.37537 17.746L7.46637 6.638C7.60737 6.03 8.00737 5.518 8.56437 5.233C9.13237 4.941 9.78437 4.923 10.4034 5.183C10.9904 5.429 11.4404 6 11.6074 6.718L11.6064 6.717ZM11.5654 14L9.63637 7.165C9.60737 7.051 9.44537 7.051 9.41737 7.165L7.48837 14H11.5654ZM23.0274 10C22.4754 10 22.0274 10.448 22.0274 11V19C22.0274 20.654 20.6814 22 19.0274 22H5.02637C3.37237 22 2.02637 20.654 2.02637 19V5C2.02637 3.346 3.37237 2 5.02637 2H13.0264C13.5784 2 14.0264 1.552 14.0264 1C14.0264 0.448 13.5784 0 13.0264 0H5.02637C2.26937 0 0.0263672 2.243 0.0263672 5V19C0.0263672 21.757 2.26937 24 5.02637 24H19.0264C21.7834 24 24.0264 21.757 24.0264 19V11C24.0264 10.448 23.5784 10 23.0264 10H23.0274ZM16.1774 5.18L18.0454 5.967L18.7904 7.832C18.9514 8.236 19.3424 8.5 19.7774 8.5C20.2124 8.5 20.6024 8.235 20.7644 7.832L21.5054 5.978L23.3594 5.237C23.7634 5.076 24.0274 4.685 24.0274 4.25C24.0274 3.815 23.7624 3.425 23.3594 3.263L21.5054 2.522L20.7644 0.668C20.6014 0.265 20.2104 0 19.7764 0C19.3424 0 18.9514 0.265 18.7894 0.668L18.0524 2.511L16.2124 3.208C15.8064 3.362 15.5344 3.748 15.5264 4.182C15.5184 4.617 15.7764 5.012 16.1764 5.181L16.1774 5.18Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2758_33659">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#289f71] duration-300">
                                  Jugl AI
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Streamline your work processes with Jugl AI.
                                  From drafting blogs and categorizing feedback
                                  to enhancing clarity and simplifying language,
                                  let AI do the heavy lifting. Personalize your
                                  experience with custom prompts and unlock the
                                  future of efficient workflow.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 31 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#f0f3ce] group-hover/menu:bg-[#bfb333]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#bfb333] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2758_33661)">
                                    <path d="M9.02 17.35C8.83 17.35 8.63 17.29 8.47 17.17C8.16 16.94 8.03 16.53 8.15 16.16L9.01 13.4L6.83 11.63C6.54 11.38 6.43 10.98 6.56 10.62C6.69 10.26 7.04 10.02 7.42 10.02H10.17L11.14 7.41C11.27 7.05 11.62 6.81 12 6.81C12.38 6.81 12.73 7.05 12.86 7.41L13.83 10.02H16.58C16.96 10.02 17.31 10.26 17.44 10.62C17.57 10.98 17.46 11.39 17.17 11.64L15 13.41L15.9 16.14C16.02 16.51 15.9 16.92 15.59 17.15C15.28 17.39 14.86 17.4 14.53 17.19L12.01 15.55L9.53 17.21C9.38 17.31 9.2 17.36 9.02 17.36V17.35ZM19 24H5C2.24 24 0 21.76 0 19V5C0 2.24 2.24 0 5 0H19C21.76 0 24 2.24 24 5V19C24 21.76 21.76 24 19 24ZM5 2C3.35 2 2 3.35 2 5V19C2 20.65 3.35 22 5 22H19C20.65 22 22 20.65 22 19V5C22 3.35 20.65 2 19 2H5Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2758_33661">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#bfb333] duration-300">
                                  Starred Items
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Quickly pin important items for easy access.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 32 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu hover:shadow-lg duration-300">
                            <div className="flex items-center gap-[16px] p-[12px]">
                              <div className="w-[48px] h-[48px] flex flex-col justify-center items-center bg-[#d7eff6] group-hover/menu:bg-[#2a8ab0]  rounded-full shrink-0 duration-300">
                                <svg
                                  className="w-[24px] h-[24px] fill-[#2a8ab0] group-hover/menu:fill-[#fff] duration-300"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_2758_33665)">
                                    <path d="M23.121 0.879C21.951 -0.291 20.049 -0.291 18.879 0.879L12.172 7.586C11.416 8.341 11 9.346 11 10.414V12C11 12.552 11.447 13 12 13H13.586C14.654 13 15.659 12.583 16.414 11.828L23.121 5.121C24.285 4.004 24.285 1.996 23.121 0.879ZM21.707 3.707L15 10.414C14.622 10.792 14.12 11 13.586 11H13V10.414C13 9.888 13.214 9.372 13.586 9L20.293 2.293C20.684 1.903 21.316 1.903 21.707 2.293C22.095 2.665 22.095 3.335 21.707 3.707ZM12 18C11.447 18 11 17.553 11 17C11 16.447 11.447 16 12 16H15C15.553 16 16 16.447 16 17C16 17.553 15.553 18 15 18H12ZM20 14V19C20 21.757 17.757 24 15 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H14C14.553 0 15 0.448 15 1C15 1.552 14.553 2 14 2H5C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H15C16.654 22 18 20.654 18 19V14C18 13.447 18.447 13 19 13C19.553 13 20 13.447 20 14ZM9.167 11.667L7.48 13.354C7.049 13.785 6.485 14.002 5.919 14.002C5.386 14.002 4.853 13.809 4.428 13.42L3.759 12.841C3.342 12.479 3.297 11.847 3.658 11.43C4.021 11.011 4.652 10.969 5.069 11.329L5.758 11.927C5.861 12.02 5.986 12.019 6.065 11.94L7.752 10.253C8.143 9.862 8.775 9.862 9.166 10.253C9.557 10.644 9.558 11.276 9.167 11.667ZM9.167 6.707L7.48 8.394C7.049 8.825 6.485 9.042 5.919 9.042C5.386 9.042 4.853 8.849 4.428 8.46L3.759 7.881C3.342 7.519 3.297 6.887 3.658 6.47C4.021 6.052 4.652 6.009 5.069 6.369L5.758 6.967C5.861 7.061 5.986 7.059 6.065 6.98L7.752 5.293C8.143 4.902 8.775 4.902 9.166 5.293C9.557 5.684 9.558 6.316 9.167 6.707ZM9.167 15.253C9.558 15.644 9.558 16.276 9.167 16.667L7.48 18.354C7.049 18.785 6.485 19.002 5.919 19.002C5.386 19.002 4.853 18.809 4.428 18.42L3.759 17.841C3.342 17.479 3.297 16.848 3.658 16.43C4.021 16.013 4.652 15.968 5.069 16.329L5.758 16.927C5.861 17.02 5.986 17.019 6.065 16.94L7.752 15.253C8.143 14.862 8.776 14.862 9.167 15.253Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2758_33665">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-[16px] text-[#2a8ab0] leading-[130%] mb-[4px] group-hover/menu:text-[#2a8ab0] duration-300">
                                  Task Management
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  At the core of any work management platform is
                                  good project management software. Ours is
                                  great. Deliver everything from simple projects
                                  to complex programs and general business
                                  processes, on time and on budget.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[32%] bg-[#F8F9FA] pr-[36px] pt-[12px]  p-[24px] min-h-[380px]">
                        <div className="flex gap-[8px] items-center p-[12px] border-b border-[#E0E0E0] mt-1 mb-3">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.2353 11.3235C8.2353 11.469 8.19217 11.6111 8.11138 11.732C8.03058 11.853 7.91574 11.9472 7.78139 12.0028C7.64703 12.0585 7.49919 12.0731 7.35655 12.0447C7.21392 12.0163 7.0829 11.9463 6.98007 11.8435C6.87724 11.7406 6.80721 11.6096 6.77884 11.467C6.75046 11.3243 6.76503 11.1765 6.82068 11.0421C6.87633 10.9078 6.97058 10.7929 7.09149 10.7122C7.21241 10.6314 7.35457 10.5882 7.5 10.5882C7.69501 10.5882 7.88204 10.6657 8.01993 10.8036C8.15783 10.9415 8.2353 11.1285 8.2353 11.3235ZM7.5 3.52941C5.95588 3.52941 4.70588 4.65073 4.70588 6.02941V6.32353C4.70588 6.44054 4.75237 6.55275 4.8351 6.63549C4.91784 6.71822 5.03005 6.7647 5.14706 6.7647C5.26407 6.7647 5.37628 6.71822 5.45902 6.63549C5.54176 6.55275 5.58824 6.44054 5.58824 6.32353V6.02941C5.58824 5.1375 6.44559 4.41176 7.5 4.41176C8.55441 4.41176 9.41177 5.1375 9.41177 6.02941C9.41177 6.92132 8.55441 7.64706 7.5 7.64706C7.38299 7.64706 7.27078 7.69354 7.18804 7.77627C7.10531 7.85901 7.05883 7.97123 7.05883 8.08823V8.67647C7.05883 8.79348 7.10531 8.90569 7.18804 8.98843C7.27078 9.07116 7.38299 9.11764 7.5 9.11764C7.61701 9.11764 7.72922 9.07116 7.81196 8.98843C7.8947 8.90569 7.94118 8.79348 7.94118 8.67647V8.49853C9.27279 8.30882 10.2941 7.27353 10.2941 6.02941C10.2941 4.65073 9.04412 3.52941 7.5 3.52941ZM15 7.5C15 8.98336 14.5601 10.4334 13.736 11.6668C12.9119 12.9001 11.7406 13.8614 10.3701 14.4291C8.99968 14.9967 7.49168 15.1453 6.03682 14.8559C4.58197 14.5665 3.2456 13.8522 2.1967 12.8033C1.14781 11.7544 0.433503 10.418 0.144114 8.96317C-0.145275 7.50832 0.0032495 6.00032 0.570907 4.62987C1.13856 3.25943 2.09986 2.08809 3.33323 1.26398C4.56659 0.439867 6.01664 0 7.5 0C9.48841 0.00233518 11.3947 0.793261 12.8007 2.19928C14.2067 3.60529 14.9977 5.51159 15 7.5ZM14.1176 7.5C14.1176 6.19115 13.7295 4.9117 13.0024 3.82343C12.2752 2.73517 11.2417 1.88696 10.0325 1.38609C8.82325 0.885217 7.49266 0.754166 6.20896 1.00951C4.92527 1.26485 3.74611 1.89512 2.82062 2.82062C1.89513 3.74611 1.26486 4.92526 1.00951 6.20896C0.754169 7.49266 0.88522 8.82325 1.38609 10.0325C1.88697 11.2417 2.73517 12.2752 3.82343 13.0024C4.9117 13.7295 6.19115 14.1176 7.5 14.1176C9.25451 14.1157 10.9366 13.4179 12.1772 12.1772C13.4179 10.9366 14.1157 9.25451 14.1176 7.5Z"
                              fill="#484848"
                            />
                          </svg>
                          <h6 className="text-[14px]">Whats New</h6>
                        </div>

                        <div className="p-[12px]">
                          <Image
                            src="/images/megamenu/banner-2.jpg"
                            alt="banner"
                            height={0}
                            width={0}
                            style={{ height: "auto", width: "auto" }}
                            className="max-w-[100%] rounded-[20px] border border-[#E5E7EB]"
                          />
                          <h6 className="text-[16px] font-medium mt-[20px]">
                            Overview of latest features!
                          </h6>
                          <a
                            className="flex gap-2 whitespace-nowrap items-center inline-block z-10 relative text-[#2196F3] font-medium skey mt-2"
                            href="#"
                          >
                            {" "}
                            Start Free Trail
                            <svg
                              className="w-[12px] fill-[#359cf0]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>

              <li
                className="flex items-center group cursor-pointer relative"
                onClick={() => setOpenMenu(4)}
                onMouseEnter={() => setOpenMenu(4)} // Show on hover
                onMouseLeave={() => setOpenMenu(null)} // Hide on hover out
              >
                <p
                  className={`cursor-pointer font-medium menu-link flex items-center gap-1 active-navitem-4 ${resourcesRoutesStateClass}`}
                  onClick={() => toggleMenu(4)}
                >
                  Resources
                  <svg
                    className="w-[12px]  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </p>

                <ul
                  id="ad-menu-handle"
                  className={`menu-child small-menu absolute w-[352px] rounded-[12px] bg-white z-50 shadow-[0_10px_60px_7px_rgb(0,0,0,9%)] transition-all duration-200 
                          ${
                            openMenu === 3 || openMenu === 4
                              ? "group-hover:pointer-events-auto opacity-100"
                              : "pointer-events-none opacity-0"
                          }
                        before:content-[''] before:block before:absolute before:w-full before:h-12 before:top-[-35px] before:left-0 left-0 top-[50px]
                     `}
                >
                  <div className="">
                    <div className="relative">
                      <div className=" ">
                        <div className="flex flex-col gap-[24px] px-[16px] py-[30px]">
                          {/* 1 */}
                          <div
                            className="relative overflow-hidden rounded-[12px] group/menu"
                            onClick={() => navigate("getting-started")}
                          >
                            <div className="flex items-center gap-[16px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#f8853f]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "getting-started"
                                        ? "bg-[#f8853f]"
                                        : "bg-[#FBB57E30]"
                                    }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "getting-started"
                                            ? "fill-[#fff]"
                                            : "fill-[#f8853f]"
                                        }
                                        `}
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#f8853f] duration-300 
                                    ${
                                      currentPath === "getting-started"
                                        ? "text-[#f8853f]"
                                        : "text-[#24262B]"
                                    }
                                    `}
                                >
                                  Getting Started
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Discover the latest Jugl product and company
                                  news
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* <!-- 2 --> */}
                          <div className="relative overflow-hidden rounded-[12px] group/menu">
                            <Link
                              href="/blog"
                              className="flex items-center gap-[16px] "
                            >
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300
                                        ${
                                          currentPath === "blog"
                                            ? "bg-[#21adb9]"
                                            : " bg-[#2DC0CA33]"
                                        }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "blog"
                                            ? "fill-[#fff]"
                                            : "fill-[#21adb9]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0.912172 6.03087C0.252172 5.26987 -0.0588278 4.33587 0.00917217 3.36987C0.0781722 2.40287 0.518172 1.52287 1.24917 0.889873C1.98117 0.255873 2.90917 -0.0521274 3.88117 0.0148726C4.84617 0.0838726 5.72717 0.523873 6.36017 1.25487L10.2032 5.82887L8.78417 7.24787L4.83917 2.55187C4.56617 2.23687 4.17217 2.03987 3.73917 2.00987C3.30117 1.98187 2.88617 2.11687 2.56017 2.39987C2.23217 2.68387 2.03517 3.07887 2.00417 3.51087C1.97317 3.94487 2.11217 4.36287 2.39517 4.68887L6.73317 9.29787L5.31917 10.7119L0.912172 6.03087ZM24.0472 23.9999H17.6952C15.5272 23.9999 13.0072 22.0339 13.0072 19.4999C13.0072 17.1449 15.1522 14.9999 17.5072 14.9999C21.7832 14.9999 23.1502 20.4349 23.7342 22.7559L24.0472 23.9999ZM21.4602 21.9999C20.6942 19.3629 19.5792 16.9999 17.5072 16.9999C16.3752 16.9999 15.0072 18.1149 15.0072 19.4999C15.0072 20.8229 16.5102 21.9999 17.6952 21.9999H21.4602ZM22.9472 6.18387L5.13017 23.9999H0.00717217V18.8759L17.8232 1.05987C19.1902 -0.307127 21.5812 -0.306128 22.9462 1.05987H22.9472C23.6302 1.74487 24.0062 2.65387 24.0062 3.62187C24.0062 4.58987 23.6302 5.50087 22.9452 6.18387H22.9472ZM17.5452 8.75687L15.2492 6.46087L2.00717 19.7049V21.9999H4.30217L17.5442 8.75787L17.5452 8.75687ZM22.0072 3.62187C22.0072 3.18787 21.8392 2.77987 21.5332 2.47387C20.9212 1.86287 19.8492 1.86287 19.2382 2.47387L16.6642 5.04787L18.9602 7.34387L21.5342 4.76987C21.8402 4.46387 22.0082 4.05687 22.0082 3.62287L22.0072 3.62187Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300 ${
                                    currentPath === "blog"
                                      ? "text-[#21adb9]"
                                      : "text-[#24262B]"
                                  }`}
                                >
                                  Blog
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Discover the latest Jugl product and company
                                  news
                                </p>
                              </div>
                            </Link>
                          </div>

                          {/* <!-- 3 --> */}
                          <div
                            className="relative overflow-hidden rounded-[12px] group/menu"
                            onClick={() => navigate("news")}
                          >
                            <div className="flex items-center gap-[16px]">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#a2745e]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "news"
                                        ? "bg-[#a2745e]"
                                        : "bg-[#B18D7433]"
                                    }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px]  group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "news"
                                            ? "fill-[#fff]"
                                            : "fill-[#a2745e]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.5 2.5C9.5 1.119 10.619 0 12 0C13.381 0 14.5 1.119 14.5 2.5C14.5 3.881 13.381 5 12 5C10.619 5 9.5 3.881 9.5 2.5ZM21 3C19.346 3 18 4.346 18 6V11.184C17.734 11.09 17.458 11.02 17.168 11.004C16.375 10.962 15.601 11.23 14.995 11.773L11.986 14.542C11.903 14.458 11.826 14.37 11.739 14.289L8.995 11.764C8.398 11.23 7.621 10.963 6.832 11.004C6.542 11.02 6.266 11.09 6 11.184V6C6 4.346 4.654 3 3 3C1.346 3 0 4.346 0 6V16.101C0 18.238 0.832 20.247 2.343 21.758L4.293 23.708C4.488 23.903 4.744 24.001 5 24.001C5.256 24.001 5.512 23.903 5.707 23.708C6.098 23.317 6.098 22.684 5.707 22.294L3.757 20.344C2.624 19.211 2 17.704 2 16.101V6C2 5.449 2.448 5 3 5C3.552 5 4 5.449 4 6C4 6 3.995 14.076 4 14.116C4.03 14.771 4.285 15.425 4.746 15.973L7.362 18.694C7.744 19.092 8.377 19.105 8.776 18.721C9.173 18.338 9.186 17.705 8.803 17.307L6.232 14.637C5.916 14.26 5.925 13.699 6.254 13.332C6.431 13.134 6.675 13.017 6.941 13.002C7.204 12.984 7.462 13.077 7.651 13.246L10.384 15.762C11.41 16.706 11.999 18.048 11.999 19.442V23.001C11.999 23.553 12.446 24.001 12.999 24.001C13.552 24.001 13.999 23.553 13.999 23.001V19.442C13.999 18.29 13.705 17.167 13.175 16.166L16.338 13.255C16.536 13.077 16.793 12.984 17.058 13.002C17.324 13.017 17.568 13.134 17.745 13.332C17.905 13.51 18.186 14.212 17.812 14.586L15.279 17.22C14.896 17.618 14.909 18.251 15.306 18.634C15.5 18.821 15.749 18.913 15.999 18.913C16.262 18.913 16.523 18.81 16.72 18.606L19.298 15.921C19.748 15.385 19.984 14.726 19.999 14.064C20.001 14.041 19.999 5.999 19.999 5.999C19.999 5.448 20.447 4.999 20.999 4.999C21.551 4.999 21.999 5.448 21.999 5.999V16.1C21.999 17.703 21.375 19.209 20.242 20.343L18.292 22.293C17.901 22.683 17.901 23.316 18.292 23.707C18.487 23.902 18.743 24 18.999 24C19.255 24 19.511 23.902 19.706 23.707L21.656 21.757C23.167 20.246 23.999 18.237 23.999 16.1V6C23.999 4.346 22.654 3 21 3ZM10.329 10.274L11.193 11.069C11.649 11.489 12.351 11.489 12.807 11.069L13.641 10.302C14.31 9.703 15.124 9.315 15.979 9.132C15.984 9.124 15.987 9.12 15.992 9.112C15.579 7.33 13.949 6 12.001 6C10.053 6 8.424 7.329 8.01 9.11C8.015 9.118 8.017 9.122 8.022 9.129C8.853 9.302 9.653 9.668 10.33 10.273L10.329 10.274Z" />
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#633f3d] duration-300
                                      ${
                                        currentPath === "news"
                                          ? "text-[#633f3d]"
                                          : "text-[#24262B]"
                                      }`}
                                >
                                  News
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Insights on No-Code, AI, GRC, Product,
                                  Engineering and more
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>

              <li className="flex items-center group cursor-pointer">
                <Link
                  className={` cursor-pointer font-medium menu-link mr-[7px] active-navitem-54 ${
                    currentPath === "pricing"
                      ? "text-[#2193F3]"
                      : "text-[#24262B]"
                  }`}
                  href="pricing"
                >
                  Pricing
                </Link>
              </li>

              {/* <li className="flex items-center group cursor-pointer">
                    <Link
                      className="text-[#24262B] cursor-pointer font-medium menu-link mr-[7px] active-navitem-4"
                      href="contact"
                    >
                      Contact
                    </Link>
                  </li> */}

              <li
                className="flex items-center group cursor-pointer relative"
                onClick={() => setOpenMenu(5)}
                onMouseEnter={() => setOpenMenu(5)} // Show on hover
                onMouseLeave={() => setOpenMenu(null)} // Hide on hover out
              >
                <p
                  className={` cursor-pointer font-medium menu-link flex items-center gap-1 active-navitem-6 ${companyRoutesStateClass}`}
                  onClick={() => toggleMenu(5)}
                >
                  Company
                  <svg
                    className="w-[12px]  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </p>
                <ul
                  id="ad-menu-handle"
                  className={`menu-child small-menu absolute w-[352px] rounded-[12px] bg-white z-50 shadow-[0_10px_60px_7px_rgb(0,0,0,9%)] transition-all duration-200 
                          ${
                            openMenu === 5 || openMenu === 6
                              ? "group-hover:pointer-events-auto opacity-100"
                              : "pointer-events-none opacity-0"
                          }
                        before:content-[''] before:block before:absolute before:w-full before:h-12 before:top-[-35px] before:left-0 left-0 top-[50px]
                     `}
                >
                  <div className="">
                    <div className="relative">
                      <div className=" ">
                        <div className="flex flex-col gap-[26px] px-[16px] py-[30px]">
                          <div
                            className="relative overflow-hidden rounded-[12px] group/menu"
                            onClick={() => handleNavigate("about")}
                          >
                            <div className="flex items-center gap-[16px] ">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center  group-hover/menu:bg-[#21adb9]  rounded-full shrink-0 duration-300
                                    ${
                                      currentPath === "about"
                                        ? "bg-[#21adb9]"
                                        : "bg-[#2DC0CA33]"
                                    }
                                    `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] fill-[#21adb9] group-hover/menu:fill-[#fff] duration-300
                                        ${
                                          currentPath === "about"
                                            ? "fill-[#fff]"
                                            : "fill-[#21adb9]"
                                        }
                                        `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0.912172 6.03087C0.252172 5.26987 -0.0588278 4.33587 0.00917217 3.36987C0.0781722 2.40287 0.518172 1.52287 1.24917 0.889873C1.98117 0.255873 2.90917 -0.0521274 3.88117 0.0148726C4.84617 0.0838726 5.72717 0.523873 6.36017 1.25487L10.2032 5.82887L8.78417 7.24787L4.83917 2.55187C4.56617 2.23687 4.17217 2.03987 3.73917 2.00987C3.30117 1.98187 2.88617 2.11687 2.56017 2.39987C2.23217 2.68387 2.03517 3.07887 2.00417 3.51087C1.97317 3.94487 2.11217 4.36287 2.39517 4.68887L6.73317 9.29787L5.31917 10.7119L0.912172 6.03087ZM24.0472 23.9999H17.6952C15.5272 23.9999 13.0072 22.0339 13.0072 19.4999C13.0072 17.1449 15.1522 14.9999 17.5072 14.9999C21.7832 14.9999 23.1502 20.4349 23.7342 22.7559L24.0472 23.9999ZM21.4602 21.9999C20.6942 19.3629 19.5792 16.9999 17.5072 16.9999C16.3752 16.9999 15.0072 18.1149 15.0072 19.4999C15.0072 20.8229 16.5102 21.9999 17.6952 21.9999H21.4602ZM22.9472 6.18387L5.13017 23.9999H0.00717217V18.8759L17.8232 1.05987C19.1902 -0.307127 21.5812 -0.306128 22.9462 1.05987H22.9472C23.6302 1.74487 24.0062 2.65387 24.0062 3.62187C24.0062 4.58987 23.6302 5.50087 22.9452 6.18387H22.9472ZM17.5452 8.75687L15.2492 6.46087L2.00717 19.7049V21.9999H4.30217L17.5442 8.75787L17.5452 8.75687ZM22.0072 3.62187C22.0072 3.18787 21.8392 2.77987 21.5332 2.47387C20.9212 1.86287 19.8492 1.86287 19.2382 2.47387L16.6642 5.04787L18.9602 7.34387L21.5342 4.76987C21.8402 4.46387 22.0082 4.05687 22.0082 3.62287L22.0072 3.62187Z"></path>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px]  leading-[130%] mb-[4px] group-hover/menu:text-[#21adb9] duration-300
                                        ${
                                          currentPath === "about"
                                            ? "text-[#21adb9]"
                                            : "text-[#24262B]"
                                        }
                                        `}
                                >
                                  About us
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Learn about our story and why we created Jugl
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="relative overflow-hidden rounded-[12px] group/menu"
                            onClick={() => handleNavigate("careers")}
                          >
                            <div className="flex items-center gap-[16px] ">
                              <div
                                className={`w-[48px] h-[48px] flex flex-col justify-center items-center group-hover/menu:bg-[#5b67f9]  rounded-full shrink-0 duration-300
                                          ${
                                            currentPath === "careers"
                                              ? "bg-[#5b67f9]"
                                              : "bg-[#687FFF30]"
                                          }
                                          `}
                              >
                                <svg
                                  className={`w-[24px] h-[24px] group-hover/menu:fill-[#fff] duration-300
                                            ${
                                              currentPath === "careers"
                                                ? "fill-[#fff]"
                                                : "fill-[#5b67f9]"
                                            }
                                            `}
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M14.5002 12.5003C14.5002 13.8813 13.3812 15.0003 12.0002 15.0003C10.6192 15.0003 9.50019 13.8813 9.50019 12.5003C9.50019 11.1193 10.6192 10.0003 12.0002 10.0003C13.3812 10.0003 14.5002 11.1193 14.5002 12.5003ZM21.6812 11.4273L19.0772 15.1483C18.7032 15.6823 18.0912 16.0013 17.4392 16.0013H6.56219C5.91019 16.0013 5.29719 15.6833 4.92419 15.1483L2.32019 11.4273C2.00419 10.9753 1.38019 10.8653 0.927194 11.1813C0.474194 11.4973 0.365194 12.1213 0.681194 12.5743L3.28519 16.2953C4.03319 17.3633 5.25819 18.0013 6.56219 18.0013H8.00019V23.0013C8.00019 23.5543 8.44819 24.0013 9.00019 24.0013C9.55219 24.0013 10.0002 23.5543 10.0002 23.0013V18.0013H14.0002V23.0013C14.0002 23.5543 14.4482 24.0013 15.0002 24.0013C15.5522 24.0013 16.0002 23.5543 16.0002 23.0013V18.0013H17.4382C18.7422 18.0013 19.9672 17.3633 20.7152 16.2953L23.3192 12.5743C23.6352 12.1223 23.5262 11.4983 23.0732 11.1813C22.6212 10.8663 21.9992 10.9753 21.6812 11.4273ZM9.00019 5.00033H11.0002V5.94933C11.0002 6.46532 11.6232 6.72332 11.9882 6.35833L13.7552 4.59133C14.0822 4.26433 14.0822 3.73532 13.7552 3.40832L11.9882 1.64133C11.6232 1.27633 11.0002 1.53532 11.0002 2.05032V2.99933H9.00019C8.44819 2.99933 8.00019 3.44633 8.00019 3.99933C8.00019 4.55233 8.44819 5.00033 9.00019 5.00033ZM0.0911936 2.68932C0.375194 1.42732 1.41219 0.385325 2.66919 0.0953251C3.76119 -0.153675 4.82919 0.084325 5.67919 0.761325C6.51819 1.43132 6.99919 2.42933 6.99919 3.50032C6.99919 4.54033 6.53619 5.52033 5.72819 6.18633C5.26519 6.56833 4.99919 7.08833 4.99919 7.61633V8.00133C4.99919 8.55433 4.55119 9.00133 3.99919 9.00133H2.99919C2.44719 9.00133 1.99919 8.55433 1.99919 8.00133V7.61532C1.99919 7.08733 1.73519 6.56833 1.27619 6.19133C0.233194 5.33232 -0.208806 4.02332 0.0911936 2.68932ZM2.54619 4.64433C2.93919 4.96633 3.26119 5.34732 3.50119 5.76632C3.74119 5.34832 4.06319 4.96633 4.45619 4.64233C4.80219 4.35733 5.00019 3.94132 5.00019 3.49933C5.00019 3.04033 4.79319 2.61132 4.43319 2.32432C4.16219 2.10832 3.84719 1.99833 3.50419 1.99833C3.37819 1.99833 3.24819 2.01432 3.11619 2.04432C2.60219 2.16232 2.16019 2.60833 2.04319 3.12832C1.91019 3.71933 2.09319 4.27133 2.54619 4.64433ZM23.3772 6.78333C23.1912 7.10033 22.8572 7.27633 22.5142 7.27633C22.3422 7.27633 22.1672 7.23233 22.0082 7.13833L21.8712 7.05733C21.4842 7.41633 21.0172 7.68033 20.4992 7.83633V7.99932C20.4992 8.55232 20.0512 8.99932 19.4992 8.99932C18.9472 8.99932 18.4992 8.55232 18.4992 7.99932V7.83633C17.9822 7.68033 17.5142 7.41633 17.1272 7.05733L16.9902 7.13833C16.8312 7.23233 16.6572 7.27633 16.4842 7.27633C16.1412 7.27633 15.8072 7.10033 15.6212 6.78333C15.3412 6.30733 15.5002 5.69433 15.9762 5.41433L16.1102 5.33533C16.0442 5.06633 15.9982 4.78933 15.9982 4.50033C15.9982 4.21133 16.0432 3.93432 16.1102 3.66532L15.9762 3.58632C15.5002 3.30632 15.3412 2.69232 15.6212 2.21732C15.9012 1.73933 16.5142 1.58133 16.9902 1.86233L17.1272 1.94333C17.5142 1.58433 17.9812 1.32033 18.4992 1.16433V1.00133C18.4992 0.448325 18.9472 0.00132505 19.4992 0.00132505C20.0512 0.00132505 20.4992 0.448325 20.4992 1.00133V1.16433C21.0162 1.32033 21.4842 1.58433 21.8712 1.94333L22.0082 1.86233C22.4842 1.58333 23.0972 1.74032 23.3772 2.21732C23.6572 2.69333 23.4982 3.30632 23.0222 3.58632L22.8882 3.66532C22.9542 3.93432 23.0002 4.21133 23.0002 4.50033C23.0002 4.78933 22.9552 5.06633 22.8882 5.33533L23.0222 5.41433C23.4982 5.69433 23.6572 6.30833 23.3772 6.78333ZM21.0002 4.50033C21.0002 3.67333 20.3272 3.00032 19.5002 3.00032C18.6732 3.00032 18.0002 3.67333 18.0002 4.50033C18.0002 5.32733 18.6732 6.00033 19.5002 6.00033C20.3272 6.00033 21.0002 5.32733 21.0002 4.50033Z"></path>
                                </svg>
                              </div>
                              <div>
                                <h3
                                  className={`font-medium text-[16px] text-[#24262B] leading-[130%] mb-[4px] group-hover/menu:text-[#3330d2] duration-300
                                          ${
                                            currentPath === "careers"
                                              ? "text-[#3330d2]"
                                              : "text-[#24262B]"
                                          }

                                          `}
                                >
                                  Careers
                                </h3>
                                <p className="text-gray-500 font-normal text-[13px] line-clamp-2 duration-300">
                                  Explore exciting career opportunities
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="nav-menu-buttons md:flex gap-[8px] ms-auto">
            <button type="button">
              <a
                className="flex items-center inline-block z-10 leading-none relative transition-all duration-200 px-[8px] py-[12px] text-[#24262B] font-regular flex"
                href="https://web.jugl.com/login"
              >
                <svg
                  className="w-[14px] fill-[#24262B] me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                </svg>{" "}
                Sign in{" "}
              </a>
            </button>
            <button type="button">
              <Link
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
              </Link>
            </button>
          </div>
        </div>

        <div
          id="openIcon"
          onClick={handleMenuOpen}
          className="burger-icon burger-icon-white menu__icon  z-99 "
        >
          <svg
            className="fill-[#192f52]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </header>
    </div>
  );
}
