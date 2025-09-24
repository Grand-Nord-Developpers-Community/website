import React from "react";
import "./style.css";
function Podium() {
  return (
    <div className="podium-container">
      <div className="podium">
        <div className="podium__front podium__left">
          <div className="">2</div>
          <div className="podium__image">
            <img src="https://source.unsplash.com/random/100x100" alt="" />
          </div>
        </div>
        <div className="podium__front podium__center">
          <div className="">1</div>
          <div className="podium__image">
            <img src="https://source.unsplash.com/random/100x100" alt="" />
          </div>
        </div>
        <div className="podium__front podium__right">
          <div className="">3</div>
          <div className="podium__image">
            <img src="https://source.unsplash.com/random/100x100" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podium;
