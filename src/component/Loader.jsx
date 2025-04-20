import React from 'react';
import Lottie from "lottie-react";
import animationData from "./loaderAnimation.json";

const Loader = () => {
    return (
        <div className='ldr_ldr'>
            {/* <span className="loader"></span> */}
            <div style={{ width: 150, height: 150}}>
                <Lottie animationData={animationData} loop={true} />
            </div>
        </div>
    );
};

export default Loader;
