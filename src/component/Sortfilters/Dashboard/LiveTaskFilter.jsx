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
import { Get, Post } from "../../../services/user.services";

import Form from "react-bootstrap/Form";

const BroadcastedSort = ({
  closeBroadcastTask,
  closeSortComponent,
  rangeTimeBroadcastValue,
  allFilterData,
  setAllFilterData,
}) => {
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");
  const [rangeValue, setRangeValue] = useState(0);
  // const [active, setActive] = useState("");
  const [active, setActive] = useState("");
  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "braodcast",
  });

  const handleClose = (values) => {
    // closeBroadcastTask(values);
    closeSortComponent(values);
  };

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "braodcast" });
    setActive(values);
  };

  const handleFilter = () => {
    rangeTimeBroadcastValue(filterSort);
  };

  const handleClick = (type, value) => {
    if (type == "sort") {
      setAllFilterData({
        ...allFilterData,
        sortdata: value,
      });
    } else if (type == "range") {
      setAllFilterData({
        ...allFilterData,
        range: value,
      });
    } else if (type == "filter") {
      setAllFilterData((prev) => ({
        ...prev,

        filterdata: prev.filterdata.includes(value)
          ? prev.filterdata.filter((el) => el !== value)
          : [...prev.filterdata, value],
      }));
      // setAllFilterData({
      //   ...allFilterData,
      //   filterdata:

      // });
    } else if (type == "category") {
      setAllFilterData((prev) => ({
        ...prev,

        category: prev?.category.includes(value)
          ? prev.category.filter((el) => el !== value)
          : [...prev.category, value],
      }));
    } else if (type == "location") {
      setAllFilterData((prev) => ({
        ...prev,
        ...(locationValue ? { hopper_location: locationValue } : {}),
      }));
    } else {
      // if (allFilterData?.price_range_to >> allFilterData?.price_range_from)
      //   return toast.error("Price2 should greater than price1");
      console.log("submit type", type);
      setAllFilterData((prev) => ({
        ...prev,
        // toggle_filter: true,
        // toggle_sort: true,
        // isBroadcastedTask: true,
        istotalFund: true,
      }));
    }
  };
  const handleGetdatalocation = async (locationValue) => {
    try {
      const resp = await Get(
        `mediahouse/searchaddress?address=${locationValue}`
      );
      if (resp) {
        console.log("location --->", resp.data);
        setLocationData(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetdatalocation(locationValue);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [locationValue]);

  useEffect(() => {
    handleClick("location", address);
  }, [address]);
  async function allcatdata() {
    const category = await Get("mediaHouse/getCategoryType?type=content");
    setAllFilterData({
      ...allFilterData,
      allcategoryData: category?.data?.data,
    });
  }

  useEffect(() => {
    allcatdata();
  }, []);
  useEffect(() => {
    handleClick("range", rangeValue);
  }, [rangeValue]);

  console.log("all fiolter data ---. allFilterData>", allFilterData);
  

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
          <div className="notf_icn_wrp" onClick={() => handleClose(false)}>
            <a className="link">Clear all</a>
          </div>
        </div>
        {/* <div
          className="sort_list"
          onClick={(e) => handleClickTime("type", "live")}
        >
          <div
           
            className={`sort_item ${
              allFilterData?.sortdata == "live" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "live")}
          >
            <img src={livetasksic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Live tasks</p>
          </div>
          <div className="sort_item">
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
          </div>
          <div
            className="sort_item"
            onClick={(e) => handleClickTime("type", "live")}
          >
            <img src={calendaric} className="icn" alt="Live tasks" />
            <p className="sort_txt">Deadline ending soon</p>
          </div>
          <div className="sort_item">
            <img src={locationic} className="icn" alt="Live tasks" />
            <div className="d-flex flex-column gap-2">
              <p className="sort_txt">Range (miles)</p>
              <Form.Range />
            </div>
          </div>
        </div> */}

        <div className="sort_list">
          {/* Live Tasks */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "live" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "live")}
          >
            <img src={livetasksic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Live tasks</p>
          </div>

          {/* Completed Tasks */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "completed" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "completed")}
          >
            <img src={completedtaskic} className="icn" alt="Completed tasks" />
            <p className="sort_txt">Completed tasks</p>
          </div>

          {/* Tasks Completed in Time */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "intime" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "intime")}
          >
            <img
              src={taskintimeic}
              className="icn"
              alt="Tasks completed in time"
            />
            <p className="sort_txt">Tasks completed in time</p>
          </div>

          {/* Delayed Tasks */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "delayed" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "delayed")}
          >
            <img src={delayedtaskic} className="icn" alt="Delayed tasks" />
            <p className="sort_txt">Delayed tasks</p>
          </div>

          {/* Deadline Ending Soon */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "deadline" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "deadline")}
          >
            <img src={calendaric} className="icn" alt="Deadline ending soon" />
            <p className="sort_txt">Deadline ending soon</p>
          </div>

          {/* Range Slider */}
          <div
            className={`sort_item ${
              allFilterData?.sortdata === "range" ? "active" : ""
            }`}
          >
            <img src={locationic} className="icn" alt="Range (miles)" />
            {/* <div className="d-flex flex-column gap-2">
              <p className="sort_txt">Range (miles)</p>
              <Form.Range />
            </div> */}

            <div
              className="d-flex flex-column gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("range", "range")}
            >
              <p className="sort_txt">Range (miles)</p>
              <Form.Range
                min={0}
                max={1000}
                step={5}
                value={rangeValue}
                onChange={(e) => setRangeValue(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <span>0</span>
                <span>500</span>
                <span>1000</span>
              </div>
              <p>Selected Value: {rangeValue}</p>
            </div>
          </div>
        </div>

        <button
          className="fltr_btn mt-3"
          onClick={() => {
            // handleFilter();
            handleClick("submit", true);
            handleClose();
          }}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default BroadcastedSort;
