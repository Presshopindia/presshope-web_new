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
import srchic from "../../../assets/images/sortIcons/Search.svg";
import Form from "react-bootstrap/Form";
import { values } from "lodash";

const Favourited = ({ favourite_compo, favSortValues, active, setActive }) => {
  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "fav",
  });

  const handleCloseModal = (value) => {
    if (value == false) {
      setActive("");
      favSortValues({ field: "", values: "", type: "fav" });
    }
    favourite_compo(false);
  };

  const handleSort = (field, values) => {
    setFilterSort({ field, values, type: "fav" });
    setActive(values);
  };

  const handleFavSortFilter = () => {
    favSortValues(filterSort);
  };

  return (
    <div className="filter_wrap">
    <div className="srt_fltr_hdr">
      <img
        src={closeic}
        height="17px"
        className="icn close"
        alt="Close"
        onClick={() => handleCloseModal()}
      />
      <p className="hdng">Sort and filter</p>
      <div onClick={() => handleCloseModal(false)} className="notf_icn_wrp">
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
        className={`sort_item ${active === "latest" ? "active" : null}`}
        style={{ cursor: "pointer" }}
        onClick={(e) => handleSort("favcontent", "latest", "favContent")}
      >
        <img src={latestic} className="icn" alt="Latest content" />
        <p className="sort_txt">Latest content</p>
      </div>
      <div
        className={`sort_item ${active === "lowPrice" ? "active" : null}`}
        style={{ cursor: "pointer" }}
        onClick={(e) => handleSort("favcontent", "lowPrice", "favContent")}
      >
        <img
          src={lowestprcdic}
          className="icn"
          alt="Lowest priced content"
        />
        <p className="sort_txt">Lowest priced content</p>
      </div>
      <div
        className={`sort_item ${active === "highPrice" ? "active" : null}`}
        style={{ cursor: "pointer" }}
        onClick={(e) => handleSort("favcontent", "highPrice", "favContent")}
      >
        <img
          src={highestprcdic}
          className="icn"
          alt="Highest priced content"
        />
        <p className="sort_txt">Highest priced content</p>
      </div>
      <div className="sort_item">
        <img src={lowestprcdic} className="icn" alt="Latest content" />
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            handleSort("favMinPrice", e.target.value, "favContent")
          }
        />
      </div>
      <div className="sort_item">
        <img src={highestprcdic} className="icn" alt="Latest content" />
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            handleSort("favMaxPrice", e.target.value, "favContent")
          }
        />
      </div>
    </div>
    <button
      className="fltr_btn mt-3"
      onClick={() => {
        handleFavSortFilter();
        handleCloseModal();
      }}
    >
      Apply
    </button>
  </div>
  );
};

export default Favourited;
