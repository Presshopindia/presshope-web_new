import React, { useState } from "react";
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
import priceic from "../../../assets/images/sortIcons/payment.svg";
import task from "../../../assets/images/task.svg";
import content from "../../../assets/images/sortIcons/content.svg";
import money from "../../../assets/images/sortIcons/money.svg";
import pending from "../../../assets/images/sortIcons/pending.svg";
import eye from "../../../assets/images/sortIcons/custom.svg";
import Form from "react-bootstrap/Form";
import { initStateOfSortFilterAccount } from "../../staticData";
import { useNavigate } from "react-router-dom";

const AccountsFilter = ({ setAccountSortFilter, accountSortFilter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("sort", accountSortFilter.sort);
    queryParams.set("task", accountSortFilter.task);
    queryParams.set("content", accountSortFilter.content);
    queryParams.set("payment_made", accountSortFilter.payment_made);
    queryParams.set("payment_pending", accountSortFilter.payment_pending);
    queryParams.set("type", accountSortFilter.type);

    navigate(`/accounts?${queryParams.toString()}`);

    setAccountSortFilter({...accountSortFilter, active: accountSortFilter.active == "false" ? "true" : "false", type: ""})
  }

  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => setAccountSortFilter({ ...accountSortFilter, type: "" })}
          />
          <p className="hdng">Sort and Filter</p>
          <div onClick={() => {
            setAccountSortFilter({...initStateOfSortFilterAccount, active: initStateOfSortFilterAccount.active == "true" ? "false" : "true"})
            navigate(`/accounts`);
          }} className="notf_icn_wrp">
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
            className={`sort_item ${accountSortFilter.sort === "daily" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setAccountSortFilter({...accountSortFilter, sort: "daily"})}
          >
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div
            className={`sort_item ${accountSortFilter.sort === "weekly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setAccountSortFilter({...accountSortFilter, sort: "weekly"})}
          >
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div
            className={`sort_item ${accountSortFilter.sort === "monthly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setAccountSortFilter({...accountSortFilter, sort: "monthly"})}
          >
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div
            className={`sort_item ${accountSortFilter.sort === "yearly" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => setAccountSortFilter({...accountSortFilter, sort: "yearly"})}
          >
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={priceic} className="icn" alt="Scans" />
                <p className="sort_txt">Price</p>
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
        <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div>
        <div className="sort_list">
          <div
            className={`sort_item ${accountSortFilter.task == "true" ? "active" : null}`}
            onClick={() => setAccountSortFilter({...accountSortFilter, task: accountSortFilter.task == "false" ? "true" : "false"})}
          >
            <img src={task} alt="" />
            <span className="sort_txt">View tasks</span>
          </div>
          <div
            className={`sort_item ${accountSortFilter.content == "true" ? "active" : null}`}
            onClick={() => setAccountSortFilter({...accountSortFilter, content: accountSortFilter.content == "false" ? "true" : "false"})}
          >
            <img src={content} alt="" />
            <span className="sort_txt">View content</span>
          </div>
          <div
            className={`sort_item ${accountSortFilter.payment_made == "true" ? "active" : null}`}
            onClick={() => setAccountSortFilter({...accountSortFilter, payment_made: accountSortFilter.payment_made == "false" ? "true" : "false"})}
          >
            <img src={money} alt="" />
            <span className="sort_txt">View payments made</span>
          </div>
          {/* <div
            className={`sort_item ${accountSortFilter.payment_pending == "true" ? "active" : null}`}
            onClick={() => setAccountSortFilter({...accountSortFilter, payment_pending: accountSortFilter.payment_pending == "false" ? "true" : "false"})}
          >
            <img src={pending} alt="" />
            <span className="sort_txt">View payments pending</span>
          </div> */}
          <button className="fltr_btn mt-3" onClick={()=> handleClick()}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountsFilter;
