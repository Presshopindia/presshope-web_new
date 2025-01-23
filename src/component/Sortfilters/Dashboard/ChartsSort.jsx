import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

const ChartsSort = ({
  rangeTimeValues,
  closeSortComponent,
  active,
  setActive,
  setChartName,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortParam = queryParams.get("sort");

  const navigate = useNavigate();
  const [values, setValues] = useState(sortParam || "");

  const handleClose = (values) => {
    closeSortComponent(values);
  };

  const handleClear = () => {
    setChartName({
      category: "",
      type: "",
      location: "",
      task: "",
    });
    setActive("");
    navigate(`?sort=`);
    closeSortComponent(values);
  };

  const handleApply = () => {
    setActive(values);
    navigate(`?sort=${values}`);
    closeSortComponent(values);
  };

  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => handleClose(false)}
          />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp" onClick={() => handleClear()}>
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
            className={`sort_item ${values === "daily" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setValues("daily")}
          >
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div
            className={`sort_item ${values === "weekly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setValues("weekly")}
          >
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div
            className={`sort_item ${values === "monthly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setValues("monthly")}
          >
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div
            className={`sort_item ${values === "yearly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setValues("yearly")}
          >
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <div className="sort_list">
            <div className="sort_item">
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
            </div>
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={handleApply}>
          Apply
        </button>
      </div>
    </>
  );
};

export default ChartsSort;
