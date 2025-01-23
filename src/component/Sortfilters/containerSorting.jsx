import closeic from "../../assets/images/sortIcons/close.svg";
import calendaric from "../../assets/images/calendar.svg";
import dailyic from "../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../assets/images/sortIcons/monthly.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

// CommonSort.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ContainerSorting = ({ width, setSortContainer, sortContainer,  }) => {
    const navigate = useNavigate();

    const handleClick = (type) => {
        if(type == "click"){
            setSortContainer((prev) => {
                return {...prev, change: !prev.change}
            })
            navigate(`/rating-and-review?sort=${sortContainer.value}&type=${sortContainer.type}`)
        }
        else if (type == "close"){
            setSortContainer({...sortContainer, type: ""})
            navigate(`/rating-and-review`)
        }
        else{
            setSortContainer({...sortContainer, type: "", value: "", change: false})
            navigate(`/rating-and-review`)
        }
    }

    return (
        <>
            <div className={`filter_wrap ${width ? "fltrMaxWidth" : ""}`}>
                <div className="srt_fltr_hdr">
                    <img
                        src={closeic}
                        height="17px"
                        className="icn close"
                        alt="Close"
                        onClick={() => handleClick("close")}
                    />
                    <p className="hdng">Sort</p>
                    <div className="notf_icn_wrp" onClick={() => handleClick(null)}>
                        <a className="link">Clear all</a>
                    </div>
                </div>
                <div className="srt_sub_hdng">
                    <p className="sort_hdng" alt="">
                        Sort
                    </p>
                </div>
                <div className="sort_list">
                    <div
                        className={`sort_item ${sortContainer.value === "daily" ? "active" : ""}`}
                        onClick={() => setSortContainer({...sortContainer, value: "daily" })}
                    >
                        <img src={dailyic} className="icn" alt="Daily" />
                        <p className="sort_txt">View daily</p>
                    </div>
                    <div
                        className={`sort_item ${sortContainer.value === "weekly" ? "active" : ""}`}
                        onClick={() => setSortContainer({...sortContainer, value: "weekly" })}
                    >
                        <img src={weeklyic} className="icn" alt="Weekly" />
                        <p className="sort_txt">View weekly</p>
                    </div>
                    <div
                        className={`sort_item ${sortContainer.value === "monthly" ? "active" : ""}`}
                        onClick={() => setSortContainer({...sortContainer, value: "monthly" })}
                    >
                        <img src={monthlyic} className="icn" alt="Monthly" />
                        <p className="sort_txt">View monthly</p>
                    </div>
                    <div
                        className={`sort_item ${sortContainer.value === "yearly" ? "active" : ""}`}
                        onClick={() => setSortContainer({...sortContainer, value: "yearly" })}
                    >
                        <img src={calendaric} className="icn" alt="yearly" />
                        <p className="sort_txt">View yearly</p>
                    </div>
                    <button className="fltr_btn mt-3" onClick={() => handleClick("click")}>
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
};
export default ContainerSorting;
