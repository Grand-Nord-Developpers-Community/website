"use client"
import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const trackScrollProgress = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", trackScrollProgress);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", trackScrollProgress);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {isVisible && (
          <button
            type="button"
            onClick={scrollToTop}
            className="bg-secondary p-3 rounded-full shadow-lg text-white hover:bg-opacity-90 transition duration-300"
            aria-label="Scroll to Top"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-200">
        <div
          className="h-1 bg-secondary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </>
  );
};

export default BackToTop;
