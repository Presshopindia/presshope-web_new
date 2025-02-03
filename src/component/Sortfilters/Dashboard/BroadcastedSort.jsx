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
import lowestprcdic from "../../../assets/images/sortIcons/Lowest-rated.svg";
import highestprcdic from "../../../assets/images/sortIcons/highest-rated.svg";
import Form from "react-bootstrap/Form";
import cameraic from "../../../assets/images/sortIcons/camera.svg";
import videoic from "../../../assets/images/sortIcons/video.svg";

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
          <div className="sort_item">
            <img
              src={lowestprcdic}
              className="icn"
              alt="Lowest priced content"
            />
            <p className="sort_txt">Lowest priced content</p>
          </div>
          <div className="sort_item">
            <img
              src={highestprcdic}
              className="icn"
              alt="Highest priced content"
            />
            <p className="sort_txt">Highest priced content</p>
          </div>
          <div className="sort_item">
            <img src={cameraic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Images</p>
          </div>
          <div className="sort_item">
            <img src={videoic} className="icn" alt="Videos" />
            <p className="sort_txt">Videos</p>
          </div>
          <div className="sort_item" style={{ cursor: "pointer" }}>
            {/* <img src={calendaric} className="icn" alt="yearly" /> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.317 2.57964V2.57976L16.3266 2.57953C17.7456 2.54672 19.1194 3.07892 20.146 4.05906C21.1725 5.0392 21.7677 6.38698 21.8005 7.80592C21.8333 9.22486 21.3011 10.5987 20.3209 11.6253C19.3408 12.6518 17.993 13.2469 16.5741 13.2797L16.4392 13.2829L16.3337 13.3671L5.73215 21.834L5.73145 21.8345C5.67038 21.8835 5.59341 21.9083 5.51523 21.9042C5.43728 21.9001 5.36355 21.8675 5.30802 21.8127C5.30785 21.8125 5.30768 21.8124 5.30751 21.8122L2.43483 18.9395C2.43468 18.9394 2.43454 18.9392 2.43439 18.9391C2.37951 18.8835 2.34693 18.8098 2.34282 18.7318C2.33871 18.6536 2.36351 18.5767 2.41251 18.5156L2.41307 18.5149L10.8799 7.91332L10.961 7.81188L10.967 7.6822C11.0307 6.30662 11.6223 5.00856 12.6188 4.05815C13.6153 3.10773 14.9399 2.57817 16.317 2.57964ZM16.3149 12.525L16.4444 12.6545L16.627 12.6411C17.4931 12.5775 18.3249 12.2758 19.0304 11.7693L19.413 11.4945L19.0799 11.1615L13.0712 5.15274L12.7358 4.81737L12.4618 5.2045C11.9582 5.91615 11.6618 6.75356 11.6057 7.62359L11.5941 7.8042L11.722 7.93217L16.3149 12.525ZM5.30361 20.9056L5.55672 21.1587L5.83627 20.9352L15.4891 13.2158L15.8382 12.9366L15.5221 12.6205L11.6265 8.72492L11.3104 8.40886L11.0312 8.75795L3.31187 18.4108L3.08831 18.6903L3.34142 18.9434L5.30361 20.9056ZM19.5492 10.7065L19.8855 11.0428L20.1592 10.6539C20.7981 9.74633 21.0961 8.64233 21.0007 7.5365C20.9053 6.43068 20.4227 5.394 19.6379 4.60916C18.853 3.82432 17.8164 3.34169 16.7105 3.24633C15.6047 3.15096 14.5007 3.44898 13.5931 4.08786L13.2043 4.36156L13.5405 4.6978L19.5492 10.7065Z"
                stroke="#111111"
                stroke-width="0.8"
              />
              <path
                d="M10.0567 14.1899C10.1913 14.3238 10.3735 14.3989 10.5634 14.3989C10.7533 14.3989 10.9354 14.3238 11.0701 14.1899L12.5076 12.7524C12.6254 12.6149 12.6869 12.4381 12.6799 12.2572C12.6729 12.0763 12.5979 11.9047 12.4699 11.7767C12.3419 11.6487 12.1703 11.5737 11.9894 11.5667C11.8085 11.5597 11.6317 11.6212 11.4942 11.739L10.0567 13.1765C9.9228 13.3112 9.84766 13.4933 9.84766 13.6832C9.84766 13.8731 9.9228 14.0553 10.0567 14.1899Z"
                fill="#111111"
              />
            </svg>

            <p className="sort_txt">Interview</p>
          </div>
          <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={locationic} className="icn" alt="Scans" />
                <p className="sort_txt">Location</p>
              </div>
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
