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

const TopFilterComn = ({ closeFilterComponent, feedMultiFilter,multiFilter,setMultiFilter,active,setActive }) => {
  const handleClose = (values) => {
    if(values===false){
      feedMultiFilter([])
      setMultiFilter([])
      setActive("")
    }
    closeFilterComponent(values)
  }

  // const [active, setActive] = useState("")

  const [categoryId, setCategoryId] = useState([]);
  const getCategory = async () => {
    try {
      const result = await Get("mediaHouse/getCategoryType?type=content");
      setCategoryId(result?.data?.data)
    }
    catch (error) {
      // console.log(error)
    }
  }

  //const [multiFilter, setMultiFilter] = useState([])

  const handleClickValues = (field, values, type) => {
    const existingIndex = multiFilter.findIndex((item) => item.values === values);

    if (existingIndex !== -1) {
      const updatedFilter = [...multiFilter];
      updatedFilter.splice(existingIndex, 1);
      setMultiFilter(updatedFilter);
    } else {
      setMultiFilter([...multiFilter, { field, values, type }]);
    }
    setActive((prevActive) => [...prevActive, values]);

  };

  const handleFilter = () => {
    feedMultiFilter(multiFilter)
  }

  const clearAll = () => {
    setMultiFilter([])
    setActive("")
  }

  useEffect(() => {
    getCategory();
  }, [])

  return (

    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" onClick={() => handleClose()} />
          <p className="hdng">Filter</p>
          <div className="notf_icn_wrp">
            <a className="link" onClick={() => handleClose(false)}>Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div>
        <div className="sort_list">
          <div className={`sort_item 
          
          ${multiFilter?.some(item => item.values === true) ? "active" : ""}`}

            style={{ cursor: "pointer" }} onClick={() => handleClickValues("content_under_offer", true, 2)}>
            <img src={paymentic} className="icn" alt="Under offer" />
            <p className="sort_txt">Content under offer</p>
          </div>
          <div className={`sort_item ${multiFilter?.some(item => item.values === "exclusive") ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClickValues("type", "exclusive", 4)}>
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div className={`sort_item ${multiFilter?.some(item => item.values === "shared") ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClickValues("type", "shared", 5)}>
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div>
          <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Category
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
            {
              categoryId && categoryId.map((curr, index) => {
                return (
                  <div className={`sort_item ${multiFilter?.some(item => item.values === categoryId[index]?._id) ? "active" : ""}`}
                    style={{ cursor: "pointer" }} onClick={() => handleClickValues("category_id", categoryId[index]?._id, 7)}
                  >
                    <input type="checkbox" className="fltr_checkbx" />
                    <img src={curr?.icon} className="icn" alt="Celebrity" />
                    <p className="sort_txt">{curr?.name}</p>
                  </div>

                )
              })


            }

          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={() => { handleFilter(); handleClose() }}>Apply</button>
      </div>
    </>
  );
};

export default TopFilterComn;