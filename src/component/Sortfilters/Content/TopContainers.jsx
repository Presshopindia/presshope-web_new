import React, { useEffect } from "react";
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
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";

import Form from "react-bootstrap/Form";
import { BsEye } from "react-icons/bs";

const TopContainers = () => {
  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" />
          <p className="hdng">Sort</p>
          <div className="notf_icn_wrp">
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className="sort_item">
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className="sort_item">
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className="sort_item">
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className="sort_item">
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <div className="sort_item">
            <div className="d-flex align-items-center gap-3 w-100">
              <div className="fltr_lft">
                {/* <img src={BsEye} className="icn" alt="Scans" /> */}
                <BsEye className="icn" />
                {/* <p className="sort_txt">Price</p> */}
              </div>
              <div className="fltr_rt d-flex gap-2">
                <Form.Group>
                  <Form.Select>
                    <option selected>From</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select>
                    <option selected>To</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopContainers;
