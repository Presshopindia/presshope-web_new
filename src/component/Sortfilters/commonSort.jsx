import closeic from "../../assets/images/sortIcons/close.svg";
import calendaric from "../../assets/images/calendar.svg";
import dailyic from "../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../assets/images/sortIcons/monthly.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

// CommonSort.jsx
import React from "react";

const CommonSort = ({
  sort,
  setSort,
  dashboardSort,
  setDashboardSort,
  setSortState,
}) => {
  const handleSortClick = (sortOption) => {
    setSort(sortOption);
  };

  const handleApplyClick = () => {
    setSortState(sort);
    setDashboardSort((prev) => ({ ...prev, time: sort }));
  };
  const handleClearSort = () => {
    setSortState("");
    setDashboardSort((prev) => ({ ...prev, time: "" }));
  };
  return (
    <>
      <div
        className={`filter_wrap ${
          dashboardSort.type === "content_purchased_online"
            ? "fltrMaxWidth"
            : ""
        }`}
      >
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => {
              setDashboardSort({ type: "" });
              setSortState("");
            }}
          />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp" onClick={handleClearSort}>
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
            className={`sort_item ${sort === "daily" ? "active" : ""}`}
            onClick={() => handleSortClick("daily")}
          >
            {/* <img src={dailyic} className="icn" alt="Daily" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9145 18.7515H2.48591C1.7762 18.7515 1.2002 18.1755 1.2002 17.4658V3.75153C1.2002 3.04182 1.7762 2.46582 2.48591 2.46582H17.9145C18.6242 2.46582 19.2002 3.04182 19.2002 3.75153V14.4658"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.91441 5.03781C6.1511 5.03781 6.34298 4.84593 6.34298 4.60924C6.34298 4.37254 6.1511 4.18066 5.91441 4.18066C5.67772 4.18066 5.48584 4.37254 5.48584 4.60924C5.48584 4.84593 5.67772 5.03781 5.91441 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4857 5.03781C14.7224 5.03781 14.9143 4.84593 14.9143 4.60924C14.9143 4.37254 14.7224 4.18066 14.4857 4.18066C14.249 4.18066 14.0571 4.37254 14.0571 4.60924C14.0571 4.84593 14.249 5.03781 14.4857 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.34326 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.9146 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.2002 6.75195H19.2002"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.82891 17.1807V11.1907L8.18891 12.1107L7.85891 11.4507L9.97891 10.2807H10.6489V17.1807H9.82891Z"
                fill="black"
              />
              <path
                d="M19.2003 14.4658H16.2003C15.4906 14.4658 14.9146 15.0418 14.9146 15.7515V18.7515L19.2003 14.4658Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="sort_txt">View daily</p>
          </div>
          <div
            className={`sort_item ${sort === "weekly" ? "active" : ""}`}
            onClick={() => handleSortClick("weekly")}
          >
            {/* <img src={weeklyic} className="icn" alt="Weekly" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9145 18.7515H2.48591C1.7762 18.7515 1.2002 18.1755 1.2002 17.4658V3.75153C1.2002 3.04182 1.7762 2.46582 2.48591 2.46582H17.9145C18.6242 2.46582 19.2002 3.04182 19.2002 3.75153V14.4658"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.91441 5.03781C6.1511 5.03781 6.34298 4.84593 6.34298 4.60924C6.34298 4.37254 6.1511 4.18066 5.91441 4.18066C5.67772 4.18066 5.48584 4.37254 5.48584 4.60924C5.48584 4.84593 5.67772 5.03781 5.91441 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4857 5.03781C14.7224 5.03781 14.9143 4.84593 14.9143 4.60924C14.9143 4.37254 14.7224 4.18066 14.4857 4.18066C14.249 4.18066 14.0571 4.37254 14.0571 4.60924C14.0571 4.84593 14.249 5.03781 14.4857 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.34326 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.9146 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.2002 6.75195H19.2002"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.03891 17.1807L11.7189 11.0507H8.00891V10.2807H12.6089V10.9507L9.93891 17.1807H9.03891Z"
                fill="black"
              />
              <path
                d="M19.2003 14.4658H16.2003C15.4906 14.4658 14.9146 15.0418 14.9146 15.7515V18.7515L19.2003 14.4658Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="sort_txt">View weekly</p>
          </div>
          <div
            className={`sort_item ${sort === "monthly" ? "active" : ""}`}
            onClick={() => handleSortClick("monthly")}
          >
            {/* <img src={monthlyic} className="icn" alt="Monthly" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9145 18.7515H2.48591C1.7762 18.7515 1.2002 18.1755 1.2002 17.4658V3.75153C1.2002 3.04182 1.7762 2.46582 2.48591 2.46582H17.9145C18.6242 2.46582 19.2002 3.04182 19.2002 3.75153V14.4658"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.91441 5.03781C6.1511 5.03781 6.34298 4.84593 6.34298 4.60924C6.34298 4.37254 6.1511 4.18066 5.91441 4.18066C5.67772 4.18066 5.48584 4.37254 5.48584 4.60924C5.48584 4.84593 5.67772 5.03781 5.91441 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4857 5.03781C14.7224 5.03781 14.9143 4.84593 14.9143 4.60924C14.9143 4.37254 14.7224 4.18066 14.4857 4.18066C14.249 4.18066 14.0571 4.37254 14.0571 4.60924C14.0571 4.84593 14.249 5.03781 14.4857 5.03781Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.34326 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.9146 4.6091V0.751953"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.2002 6.75195H19.2002"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.34513 13.9087L5.96113 13.7647C6.18513 14.3887 6.61446 14.7007 7.24913 14.7007C7.58513 14.7007 7.87313 14.6073 8.11313 14.4207C8.35846 14.2287 8.48113 13.97 8.48113 13.6447C8.48113 13.3033 8.36113 13.0447 8.12113 12.8687C7.88113 12.6927 7.5798 12.6047 7.21713 12.6047H6.61713V12.0047H7.19313C7.51846 12.0047 7.79313 11.9247 8.01713 11.7647C8.24646 11.5993 8.36113 11.3567 8.36113 11.0367C8.36113 10.754 8.25446 10.5353 8.04113 10.3807C7.83313 10.2207 7.5798 10.1407 7.28113 10.1407C6.9878 10.1407 6.73446 10.2207 6.52113 10.3807C6.31313 10.5353 6.1638 10.754 6.07313 11.0367L5.46513 10.8927C5.57713 10.466 5.79846 10.1353 6.12913 9.90066C6.46513 9.66066 6.8598 9.54066 7.31313 9.54066C7.77713 9.54066 8.1798 9.67133 8.52113 9.93266C8.86246 10.1887 9.03313 10.546 9.03313 11.0047C9.03313 11.298 8.95846 11.554 8.80913 11.7727C8.66513 11.9913 8.4598 12.1593 8.19313 12.2767C8.49713 12.3833 8.7318 12.5593 8.89713 12.8047C9.0678 13.05 9.15313 13.3327 9.15313 13.6527C9.15313 14.138 8.9638 14.5353 8.58513 14.8447C8.20646 15.1487 7.76646 15.3007 7.26513 15.3007C6.7958 15.3007 6.39046 15.1807 6.04913 14.9407C5.71313 14.7007 5.47846 14.3567 5.34513 13.9087ZM11.9729 15.3007C11.6796 15.3007 11.4129 15.242 11.1729 15.1247C10.9383 15.0073 10.7463 14.8553 10.5969 14.6687C10.4476 14.4767 10.3223 14.2527 10.2209 13.9967C10.1249 13.7353 10.0556 13.4767 10.0129 13.2207C9.97561 12.9593 9.95694 12.6927 9.95694 12.4207C9.95694 12.1487 9.97561 11.8847 10.0129 11.6287C10.0556 11.3673 10.1249 11.1087 10.2209 10.8527C10.3223 10.5967 10.4476 10.3727 10.5969 10.1807C10.7463 9.98866 10.9383 9.834 11.1729 9.71666C11.4129 9.59933 11.6849 9.54066 11.9889 9.54066C12.3569 9.54066 12.6769 9.62866 12.9489 9.80466C13.2263 9.97533 13.4369 10.2073 13.5809 10.5007C13.7303 10.7887 13.8369 11.0927 13.9009 11.4127C13.9703 11.7327 14.0049 12.0687 14.0049 12.4207C14.0049 12.7673 13.9703 13.1007 13.9009 13.4207C13.8316 13.7353 13.7223 14.0393 13.5729 14.3327C13.4289 14.626 13.2183 14.8607 12.9409 15.0367C12.6689 15.2127 12.3463 15.3007 11.9729 15.3007ZM10.6289 12.4207C10.6289 12.6713 10.6476 12.9167 10.6849 13.1567C10.7223 13.3913 10.7863 13.634 10.8769 13.8847C10.9676 14.13 11.1063 14.3273 11.2929 14.4767C11.4849 14.626 11.7143 14.7007 11.9809 14.7007C12.2529 14.7007 12.4823 14.626 12.6689 14.4767C12.8609 14.3273 12.9996 14.13 13.0849 13.8847C13.1756 13.6393 13.2396 13.3993 13.2769 13.1647C13.3143 12.9247 13.3329 12.6767 13.3329 12.4207C13.3329 12.1593 13.3143 11.914 13.2769 11.6847C13.2449 11.45 13.1836 11.21 13.0929 10.9647C13.0023 10.714 12.8609 10.514 12.6689 10.3647C12.4823 10.2153 12.2529 10.1407 11.9809 10.1407C11.7143 10.1407 11.4849 10.2153 11.2929 10.3647C11.1063 10.514 10.9676 10.7113 10.8769 10.9567C10.7863 11.202 10.7223 11.4447 10.6849 11.6847C10.6476 11.9193 10.6289 12.1647 10.6289 12.4207Z"
                fill="black"
              />
              <path
                d="M19.2003 14.4658H16.2003C15.4906 14.4658 14.9146 15.0418 14.9146 15.7515V18.7515L19.2003 14.4658Z"
                stroke="#303C42"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="sort_txt">View monthly</p>
          </div>

          <div
            className={`sort_item ${sort === "yearly" ? "active" : ""}`}
            onClick={() => handleSortClick("yearly")}
          >
            {/* <img src={calendaric} className="icn" alt="yearly" /> */}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.45062 2.14751H3.12138V1.24016C3.12138 0.970481 3.35951 0.751953 3.6528 0.751953H6.34173C6.63528 0.751953 6.87315 0.970481 6.87315 1.24016V2.14751H12.2859V1.24016C12.2859 0.970481 12.5238 0.751953 12.8173 0.751953H15.5062C15.7995 0.751953 16.0377 0.970481 16.0377 1.24016V2.14751H16.7084C18.0279 2.14751 19.1053 3.13737 19.1053 4.34952V18.0599C19.1053 19.2721 18.0279 20.262 16.7084 20.262H2.45062C1.13118 20.262 0.0537109 19.2721 0.0537109 18.0599V4.34952C0.0537109 3.13737 1.13118 2.14751 2.45062 2.14751ZM4.18422 3.27268H5.8103V1.72837H4.18422V3.27268ZM13.3487 3.27268H14.9748V1.72837H13.3487V3.27268ZM4.83265 8.41927H6.83568V10.2594H4.83265V8.41927ZM4.83265 13.8641H6.83568V15.7042H4.83265V13.8641ZM12.3234 13.8641H14.3264V15.7042H12.3234V13.8641ZM8.57801 13.8641H10.581V15.7042H8.57801V13.8641ZM4.83265 11.1418H6.83568V12.9819H4.83265V11.1418ZM12.3234 11.1418H14.3264V12.9819H12.3234V11.1418ZM8.57801 11.1418H10.581V12.9819H8.57801V11.1418ZM12.3234 8.41927H14.3264V10.2594H12.3234V8.41927ZM8.57801 8.41927H10.581V10.2594H8.57801V8.41927ZM3.01694 5.98695H16.1421C16.4354 5.98695 16.6735 6.20547 16.6735 6.47516V17.6486C16.6735 17.918 16.4354 18.1368 16.1421 18.1368H3.01694C2.72365 18.1368 2.48552 17.918 2.48552 17.6486V6.47516C2.48552 6.20547 2.72365 5.98695 3.01694 5.98695ZM15.6107 6.96337H3.54836V17.1604H15.6107V6.96337ZM3.12138 3.12393H2.45062C1.71803 3.12393 1.11655 3.6765 1.11655 4.34952V18.0599C1.11655 18.733 1.71803 19.2855 2.45062 19.2855H16.7084C17.441 19.2855 18.0425 18.733 18.0425 18.0599V4.34952C18.0425 3.6765 17.441 3.12393 16.7084 3.12393H16.0377V3.76089C16.0377 4.03057 15.7995 4.2491 15.5062 4.2491H12.8173C12.5238 4.2491 12.2859 4.03057 12.2859 3.76089V3.12393H6.87315V3.76089C6.87315 4.03057 6.63528 4.2491 6.34173 4.2491H3.6528C3.35951 4.2491 3.12138 4.03057 3.12138 3.76089V3.12393Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">View yearly</p>
          </div>
          <button className="fltr_btn mt-3" onClick={handleApplyClick}>
            Apply
          </button>

          {/* <div className="sort_item">
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1093 7.31483C18.4577 10.6355 14.3207 13.8145 10.6546 13.8145C6.98828 13.8145 2.85139 10.6355 1.2002 7.31445"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1093 7.31455C18.4577 3.99382 14.3214 0.814453 10.6552 0.814453C6.98893 0.814453 2.85139 3.99304 1.2002 7.31417"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.4911 7.314C13.4911 8.85252 12.2212 10.0997 10.6547 10.0997C9.0882 10.0997 7.81836 8.85252 7.81836 7.314C7.81836 5.77547 9.0882 4.52832 10.6547 4.52832C12.2212 4.52832 13.4911 5.77547 13.4911 7.314Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="d-flex gap-3 align-items-center">
              <div className="from_to_div">
                <select name="" id="" className="form-select">
                  <option value="" selected>
                    From
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select>
              </div>
              <div className="from_to_div">
                <select name="" id="" className="form-select">
                  <option value="" selected>
                    To
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default CommonSort;
