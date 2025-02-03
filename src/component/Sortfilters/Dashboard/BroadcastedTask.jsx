import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import { FiSearch } from "react-icons/fi";
import livetasksic from "../../../assets/images/sortIcons/livetasks.png";
import completedtaskic from "../../../assets/images/sortIcons/completedtask.svg";
import taskintimeic from "../../../assets/images/sortIcons/taskintime.svg";
import delayedtaskic from "../../../assets/images/sortIcons/delayedtask.svg";
import calendaric from "../../../assets/images/calendar.svg";
import locationic from "../../../assets/images/location.svg";
import latestic from "../../../assets/images/sortIcons/latest.svg";
import celebrityic from "../../../assets/images/sortIcons/celebrity.svg";
import crimeic from "../../../assets/images/sortIcons/crime.svg";
import politicalic from "../../../assets/images/sortIcons/political.svg";
import businessic from "../../../assets/images/sortIcons/business.svg";
import fashionic from "../../../assets/images/Fashion.svg";
import srchic from "../../../assets/images/sortIcons/Search.svg";

import Form from "react-bootstrap/Form";

const BroadcastedTask = ({ closeBroadcastTask, rangeTimeBroadcastValue }) => {

  const [active, setActive] = useState("")

  const [filterSort, setFilterSort] = useState({ field: "", values: "", type: "braodcast" })

  const handleClose = (values) => {
    closeBroadcastTask(values)
  }

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "braodcast" })
    setActive(values)
  }

  const handleFilter = () => {
    rangeTimeBroadcastValue(filterSort)
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
        <div className="sort_list" onClick={(e) => handleClickTime("type", "live")}>
          <div className={`sort_item ${active === "live" ? "active" : null}`} style={{ cursor: "pointer" }}>
            <img src={livetasksic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Live tasks</p>
          </div>
          {/* <div className="sort_item">
            <img src={completedtaskic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Completed tasks</p>
          </div>
          <div className="sort_item">
            <img src={taskintimeic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Tasks completed in time</p>
          </div>
          <div className="sort_item">
            <img src={delayedtaskic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Delayed tasks</p>
          </div> */}
          {/* <div className="sort_item" onClick={(e) => handleClickTime ("type", "live")}>
            <img src={calendaric} className="icn" alt="Live tasks" />
            <p className="sort_txt">Deadline ending soon</p>
          </div> */}
          {/* <div className="sort_item">
            <img src={locationic} className="icn" alt="Live tasks" />
            <div className="d-flex flex-column gap-2">
              <p className="sort_txt">Range (miles)</p>
              <Form.Range />
            </div>
          </div> */}
        </div>
        {/* <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div> */}
        {/* <div className="sort_list">
          <div className="sort_item">
            <img src={latestic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Latest content</p>
          </div>
          <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Category
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={celebrityic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Celebrity content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={politicalic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Political content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={crimeic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Crime content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={businessic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Business content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Fashion content</p>
            </div>
          </div>
        </div> */}
        <button className="fltr_btn mt-3" onClick={() => { handleFilter(); handleClose() }}>Apply</button>
      </div>
    </>
  );
};

export default BroadcastedTask;
