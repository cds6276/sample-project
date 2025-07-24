"use client";
import { useState, useEffect, useRef } from "react";
export default function HomeVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  //   // Use the reusable hook for instant play/pause detection
  //   useVideoPlayPause(videoRef, ({ isPlaying, event, video }) => {
  //     console.log(`Video ${event}: ${isPlaying ? 'Playing' : 'Paused'}`);
  //     setIsPlaying(isPlaying);

  //     // // You can add additional logic here based on the event type
  //     // if (event === 'ended') {
  //     //   setCurrentTime(0);
  //     // }
  //   });

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (video) {
      setIsPlaying(false);
      video.load();
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    if (video) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls when playing
  useEffect(() => {
    let timeout;
    if (isPlaying && !isHovered) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPlaying, isHovered]);
  return (
    <>
      <div className="relative py-[60px] sm:py-[80px] lg:py-[100px]">
        <div className="mx-auto max-w-[1320px]">
          <div className="hvideo-wrapper flex flex-wrap gap-[20px] items-center justify-center lg:justify-between px-[22px]">
            <div className="hvideo-left w-full lg:w-[47%] text-center lg:text-left">
              <h2 className="max-w-[750px] mx-auto font-medium text-[28px] sm:text-[34px] md:text-[42px] leading-[130%] mb-[22px] text-[#24262b]">
                What Is Work Management, and Why Does Your Business Need It?
              </h2>
              <p className="max-w-[600px] mx-auto text-[16px] sm:text-[18px] leading-[160%] text-[#6e7178] mb-[30px] font-regular">
                Boost clarity, efficiency, and collaboration with structured
                work management solutions.
              </p>
              <button type="button">
                <a
                  className="skey flex gap-3 items-center inline-block z-10 relative transition-all duration-300 group px-[14px] py-[10px] rounded-[8px] bg-[#3A86FF] hover:bg-[#0077D5] text-[#fff] text-[16px] font-normal hover:bg-[#1863B5] hover:text-white"
                  href="demo"
                >
                  Start your free trial
                  <svg
                    className="w-[12px] h-[12px] fill-[#fff]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </a>
              </button>
            </div>

            <div className="hvideo-right w-full md:w-[90%] lg:w-[50%] relative mt-[24px] lg:mt-0">
              <div
                ref={containerRef}
                className={`banner-three-thumb justify-center relative group cursor-pointer rounded-[16px] md:rounded-[20px] overflow-hidden ${
                  isFullscreen ? "bg-black" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  id="homevideo"
                  ref={videoRef}
                  onClick={togglePlay}
                  onEnded={handleVideoEnd}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className={`!block w-full h-full transition-all duration-300 ${
                    isFullscreen ? "h-screen object-contain" : ""
                  }`}
                  poster="/images/home-video-thumbnail.jpg"
                >
                  <source src="/images/home-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Center Play/Pause Button - Only show when paused or on hover */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    !isPlaying || (isPlaying && (showControls || isHovered))
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <button
                    onClick={togglePlay}
                    className="bg-white hover:bg-white text-white rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-6 h-6 fill-black"
                      >
                        <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-6 h-6 fill-black ml-1"
                      >
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Modern Video Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0  p-4 transition-all duration-300 ${
                    isPlaying && showControls && isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`} //bg-gradient-to-t from-black/80 via-black/40 to-transparent
                >
                  {/* Progress Bar */}
                  <div
                    className="!block w-full bg-white/30 h-1 rounded-full mb-3 cursor-pointer hover:h-2 transition-all duration-200"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="bg-[#359cf0] h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${
                          duration ? (currentTime / duration) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        className="hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                      >
                        {isPlaying ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
                          </svg>
                        )}
                      </button>

                      {/* Time Display */}
                      <span className="text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2">
                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                        title={
                          isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                        }
                      >
                        {isFullscreen ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64c0-17.7-14.3-32-32-32zM320 320c0-17.7-14.3-32-32-32l-96 0c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z" />
                          </svg>
                        )}
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
