import React from "react";
import "@/styles/dashboard-loading-style.css";
function LoadingPage() {
  return (
    <div className="banter-loader">
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <span className="text-center text-lg text-gray-300">Chargement</span>
    </div>
  );
}

export default LoadingPage;
