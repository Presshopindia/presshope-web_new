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
import lowestprcdic from "../../../assets/images/sortIcons/Lowest-rated.svg";
import highestprcdic from "../../../assets/images/sortIcons/highest-rated.svg";
import cameraic from "../../../assets/images/sortIcons/camera.svg";
import videoic from "../../../assets/images/sortIcons/video.svg";
import recic from "../../../assets/images/sortIcons/recording.svg";
import scanic from "../../../assets/images/sortIcons/scan.svg";
import priceic from "../../../assets/images/sortIcons/payment.svg";
import exclusiveic from "../../../assets/images/exclusive.svg";
import sharedic from "../../../assets/images/shared.svg";
import relevanceic from "../../../assets/images/sortIcons/relevance.svg";
import mostviewdedic from "../../../assets/images/sortIcons/mostviewed.svg";
import favouritic from "../../../assets/images/sortIcons/fav.svg";
import paymentic from "../../../assets/images/sortIcons/payment.svg";
import contentic from "../../../assets/images/sortIcons/content.svg";

import Form from "react-bootstrap/Form";
import { Get } from "../../../services/user.services";
import { initStateOfUnderOffer } from "../../staticData";

const FeedFilter = ({ setPublishedContent, publishedContent }) => {

  // Handle click
  const handleClick = (type, value) => {
    if (type === "submit") {
      setPublishedContent(prev => ({
        ...prev,
        filter: {
          ...prev.filter,
          active: prev.filter.active === "true" ? "false" : "true",
          filter: "false"
        }
      }));
    } else if (type === "type") {
      setPublishedContent(prev => ({
        ...prev,
        filter: {
          ...prev.filter,
          type: prev.filter.type.includes(value)
            ? prev.filter.type.filter(el => el !== value)
            : [...prev.filter.type, value]
        }
      }));
    } else if (type === "category") {
      setPublishedContent(prev => ({
        ...prev,
        filter: {
          ...prev.filter,
          category: prev.filter.category.includes(value)
            ? prev.filter.category.filter(el => el !== value)
            : [...prev.filter.category, value]
        }
      }));
    } else {
      setPublishedContent(prev => ({
        ...prev,
        filter: {
          ...prev.filter,
          [type]: value
        }
      }));
    }
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
            onClick={() =>
              setPublishedContent(prev => ({
                ...prev,
                filter: {
                  ...prev.filter,
                  filter: "false"
                }
              }))
            }
          />
          <p className="hdng">Filter</p>
          <div className="notf_icn_wrp" onClick={() => setPublishedContent(
            {
              ...publishedContent,
              filter: {
                favContent: "",
                content: "latest",
                type: ["shared", "exclusive"],
                category: ["64f09d79db646e4f7791761b", "64f09d1fdb646e4f779174a1"],
                active: publishedContent?.filter?.actve == "false" ? "true" : "false",
                filter: "false"
              }
            })}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${publishedContent.filter.isDiscount === true ? "active" : ""}`} onClick={() => handleClick("isDiscount", publishedContent.filter.isDiscount === true ? false : true)}>
            <img src={latestic} className="icn" alt="Latest" />
            <p className="sort_txt">
              {/* Discounted content */}
              Special offers
              </p>
          </div>
          <div className={`sort_item ${publishedContent.filter.content === "latest" ? "active" : ""}`} onClick={() => handleClick("content", publishedContent.filter.content === "latest" ? "" : "latest")}>
            <img src={latestic} className="icn" alt="Latest" />
            <p className="sort_txt">Latest content</p>
          </div>
          <div className={`sort_item ${publishedContent.filter.favContent === "true" ? "active" : ""}`} onClick={() => handleClick("favContent", publishedContent.filter.favContent === "true" ? "false" : "true")}>
            <img src={favouritic} className="icn" alt="favourited" />
            <p className="sort_txt">Favourited content</p>
          </div>
          <div className={`sort_item ${publishedContent.filter?.type?.includes("exclusive") ? "active" : ""}`} onClick={() => handleClick("type", "exclusive")}>
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div className={`sort_item ${publishedContent.filter?.type?.includes("shared") ? "active" : ""}`} onClick={() => handleClick("type", "shared")}>
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div>
          <div className="d-flex flex-column gap-2">
            {publishedContent?.categoryData?.map((curr, index) => (
              <div className={`sort_item ${publishedContent.filter?.category?.includes(curr?._id) ? "active" : ""}`} onClick={() => handleClick("category", curr?._id)} key={index}>
                <input type="checkbox" className="fltr_checkbx" />
                <img src={curr?.icon} className="icn" alt="Celebrity" />
                <p className="sort_txt">{curr?.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={() => handleClick("submit", "")}>
          Apply
        </button>
      </div>
    </>
  );
};

export default FeedFilter;
