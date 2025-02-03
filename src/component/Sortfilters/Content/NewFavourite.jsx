import React, { useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";

import Form from "react-bootstrap/Form";

const NewFavourite = ({ closeFav, favouriteSortValues,active,setActive }) => {

  const handleClose = (values) => {
    if (values === false) {
      favouriteSortValues({ field: "", values: "", type: "favourite" });
      setActive("")
    }
    closeFav(values)
  }

  // const [active, setActive] = useState("")

  const [filterSort, setFilterSort] = useState({ field: "", values: "", type: "favourite" })

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "favourite" })
    setActive(values)
  }

  const handleFilter = () => {
    favouriteSortValues(filterSort)
  }


  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() => handleClose(false)} />
          <p className="hdng">Sort and filter</p>
          <div className="notf_icn_wrp" onClick={() => handleClose(false)}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${active === "daily" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("favtype", "daily")}>
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className={`sort_item ${active === "weekly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("favtype", "weekly")}>
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className={`sort_item ${active === "monthly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("favtype", "monthly")}>
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className={`sort_item ${active === "yearly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("favtype", "yearly")}>
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={() => { handleFilter(); handleClose() }}>Apply</button>
      </div>
    </>
  );
};

export default NewFavourite;
