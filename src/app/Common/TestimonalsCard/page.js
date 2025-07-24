"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { gsap } from "gsap";

export default function TestimonalsCard({
  img,
  logo,
  text,
  author,
  company,
  video,
}) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuteHovered, setIsMuteHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoClick = () => {
    if (isMobile && videoRef.current) {
      if (videoRef.current.paused) {
        // Reset video to start before playing
        videoRef.current.currentTime = 0;
        setIsLoading(true);
        videoRef.current
          .play()
          .then(() => {
            setIsVideoPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsVideoPlaying(false);
            setIsLoading(false);
          });
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };
useEffect(() => {
  const videoElement = videoRef.current; // ✅ Cache the ref value
  const cardElement = cardRef.current;

  if (inView && cardElement) {
    gsap.fromTo(
      cardElement,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }

  return () => {
    if (videoElement && !videoElement.paused) {
      videoElement.pause(); // ✅ Use cached version
    }
  };
}, [inView]);


  // Add video event listeners to sync state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsVideoPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsVideoPlaying(false);
    const handleEnded = () => {
      setIsVideoPlaying(false);
      // Reset video to start and mute it
      video.currentTime = 0;
      video.muted = true;
      setIsMuted(true);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [inView, video]);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current && !isMuteHovered) {
      setIsLoading(true);
      // Reset video to start before playing
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsLoading(false);
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current && !isMuteHovered) {
      videoRef.current.pause();
      // Reset video to start and mute it
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsMuted(true);
      setIsLoading(false);
    }
    setIsHovered(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteStatus = !videoRef.current.muted;
      videoRef.current.muted = newMuteStatus;
      setIsMuted(newMuteStatus);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="client-main-wrapper px-0 min-[575px]:px-3"
        style={{ flex: "0 0 auto", width: "100%" }}
      >
        <div ref={cardRef} className="slide" key={author}>
          <div
            className="relative h-[600px] md:h-[450px] lg:h-[550px] 2xl:h-[500px] w-full shadow-md overflow-hidden group cursor-pointer transition-transform"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Image */}
            <Image
              src={img}
              alt="Testimonial"
              className={`object-cover absolute inset-0 transition-opacity duration-300 ${
                isHovered && video && !isMobile ? "opacity-0 z-0" : "opacity-100 z-1"
              }`}
              onError={(e) => (e.target.style.display = "none")}
              width="450" height="550"
            />

            {/* Fallback Text Info */}
            <div
              className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-4 z-10 transition-opacity duration-300 ${
                isHovered && video && !isMobile ? "opacity-0" : "opacity-100"
              }`}
            >
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  className="mb-3 max-h-8"
                  onError={(e) => (e.target.style.display = "none")}
                    height={8}
                    width={0}
                    style={{width:"auto", height:"auto"}}
                />
              )}
              <p className="text-md mb-4 italic">&quot;{text}&quot;</p>
              <p className="text-sm font-semibold">{author}</p>
              <p className="text-sm font-light">{company}</p>
            </div>

            {/* Video Layer */}
            {inView && video && (
              <video
                ref={videoRef}
                muted={isMuted}
                preload="auto"
                poster={img}
                playsInline
                className="!block absolute top-0 left-0 w-full h-full object-cover z-0 testivideo rounded-[0px]"
              >
                <source src={video} type="video/mp4" />
                <source
                  src={video.replace(".mp4", ".webm")}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-15 bg-black/20">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}

            {/* Mobile Play/Pause Button */}
            {isMobile && !isLoading && (
              <div
                className="absolute inset-0 flex items-center justify-center z-10"
                onClick={handleVideoClick}
              >
                {!isVideoPlaying ? (
                  <svg
                    className="w-14 h-14 text-white bg-black/60 p-3 rounded-full pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39C45.5 22.5 0 41.1 0 80V432c0 38.9 45.5 57.5 73 41L361 297c30.3-17.5 30.3-62.5 0-80L73 39z" />
                  </svg>
                ) : (
                  <svg
                    className="w-14 h-14 text-white bg-black/60 p-3 rounded-full pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48s48-21.5 48-48V112c0-26.5-21.5-48-48-48zm224 0c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48s48-21.5 48-48V112c0-26.5-21.5-48-48-48z" />
                  </svg>
                )}
              </div>
            )}

            {/* Mute Toggle */}
            {inView && (
              <button
                onClick={toggleMute}
                onMouseEnter={() => setIsMuteHovered(true)}
                onMouseLeave={() => setIsMuteHovered(false)}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute top-3 right-3 bg-[#5d5a5ab3] p-2 rounded-full text-white z-20 hover:bg-black/90"
              >
                {isMuted ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
