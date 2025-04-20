// LottieAnimation.js
import React from "react";
import Lottie from "lottie-react";
import animationData from "./animation.json";

const LottieAnimation = () => {
  return (
    <div style={{ width: 80, height: 80, marginLeft: "3rem" }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
