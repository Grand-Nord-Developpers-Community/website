"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";
import clsx from "clsx";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const trackScrollProgress = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Create a single handler function
    const handleScroll = () => {
      toggleVisibility();
      trackScrollProgress();
    };

    // Add the listener
    window.addEventListener("scroll", handleScroll);

    // Remove the SAME listener in cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array is fine here

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[10]">
        <button
          type="button"
          onClick={scrollToTop}
          className={clsx(
            "bg-secondary p-3 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all duration-300 pointer-events-none opacity-0",
            {
              " opacity-100 pointer-events-auto":
                isVisible && scrollProgress < 97,
            },
            {
              hidden: scrollProgress > 98,
            }
          )}
          aria-label="Scroll to Top"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default BackToTop;
