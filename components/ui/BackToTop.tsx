"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

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
    </>
  );
};

export default BackToTop;
