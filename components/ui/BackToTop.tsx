"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";
import clsx from "clsx";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[10]">
        <button
          type="button"
          onClick={scrollToTop}
          className={clsx(
            "bg-secondary p-3 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all duration-300 pointer-events-none opacity-0",
            { "opacity-100 pointer-events-auto": isVisible }
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
