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
import { Get, Post } from "../../../services/user.services";

import Form from "react-bootstrap/Form";
// setAllFilterData = { setAllFilterData };
// allFilterData = { allFilterData };

const PurchasedCont = ({
  closeContentPurchased,
  allFilterData,
  setAllFilterData,
  rangeTimeValuesPurchasedContent,
}) => {
  const [active, setActive] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");

  const handleClose = (values) => {
    closeContentPurchased(values);
  };

  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "puchasedonline",
  });

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "puchasedonline" });
    setActive(values);
  };

  const handleFavSortFilter = () => {
    rangeTimeValuesPurchasedContent(filterSort);
  };

  const handleClick = (type, value) => {
    if (type == "sort") {
      setAllFilterData({
        ...allFilterData,
        sortdata: value,
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
      if (allFilterData?.price_range_to >> allFilterData?.price_range_from)
        return toast.error("Price2 should greater than price1");
      console.log("submit type", type);
      setAllFilterData((prev) => ({
        ...prev,
        toggle_filter: true,
        toggle_sort: true,
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
  useEffect(() => {
    async function getAllData() {
      const category = await Get("mediaHouse/getCategoryType?type=content");
      setAllFilterData({
        ...allFilterData,
        allcategoryData: category?.data?.data,
      });
    }
    getAllData();
  }, []);

  console.log("all fiolter data ---. >", allFilterData);

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
          <div
            // className="sort_item"
            className={`sort_item ${
              allFilterData?.sortdata == "relevance" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "relevance")}
          >
            {/* <img src={latestic} className="icn" alt="Latest content" /> */}
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5552 18.4971H2.56916C1.88471 18.4971 1.32922 17.9211 1.32922 17.2114V3.49714C1.32922 2.78743 1.88471 2.21143 2.56916 2.21143H17.4483C18.1328 2.21143 18.6883 2.78743 18.6883 3.49714V14.2114"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.87565 4.78292C6.10392 4.78292 6.28896 4.59105 6.28896 4.35435C6.28896 4.11766 6.10392 3.92578 5.87565 3.92578C5.64739 3.92578 5.46234 4.11766 5.46234 4.35435C5.46234 4.59105 5.64739 4.78292 5.87565 4.78292Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.1418 4.78292C14.3701 4.78292 14.5551 4.59105 14.5551 4.35435C14.5551 4.11766 14.3701 3.92578 14.1418 3.92578C13.9136 3.92578 13.7285 4.11766 13.7285 4.35435C13.7285 4.59105 13.9136 4.78292 14.1418 4.78292Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.28894 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5552 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.32922 6.49707H18.6883"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.3317 16.9255V10.9355L8.69171 11.8555L8.36171 11.1955L10.4817 10.0255H11.1517V16.9255H10.3317Z"
                fill="black"
              />
              <path
                d="M18.6883 14.2112H15.7951C15.1107 14.2112 14.5552 14.7872 14.5552 15.4969V18.4969L18.6883 14.2112Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="sort_txt">View Daily</p>
          </div>
          <div
            // className="sort_item"
            className={`sort_item ${
              allFilterData?.sortdata == "weekly" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "weekly")}
          >
            {/* <img src={latestic} className="icn" alt="Latest content" /> */}
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4174 18.4971H1.98884C1.27912 18.4971 0.703125 17.9211 0.703125 17.2114V3.49714C0.703125 2.78743 1.27912 2.21143 1.98884 2.21143H17.4174C18.1271 2.21143 18.7031 2.78743 18.7031 3.49714V14.2114"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.4174 4.78292C5.6541 4.78292 5.84597 4.59105 5.84597 4.35435C5.84597 4.11766 5.6541 3.92578 5.4174 3.92578C5.18071 3.92578 4.98883 4.11766 4.98883 4.35435C4.98883 4.59105 5.18071 4.78292 5.4174 4.78292Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.9888 4.78292C14.2255 4.78292 14.4174 4.59105 14.4174 4.35435C14.4174 4.11766 14.2255 3.92578 13.9888 3.92578C13.7521 3.92578 13.5602 4.11766 13.5602 4.35435C13.5602 4.59105 13.7521 4.78292 13.9888 4.78292Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.84601 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4174 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.703125 6.49707H18.7031"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.54177 16.9255L11.2218 10.7955H7.51177V10.0255H12.1118V10.6955L9.44177 16.9255H8.54177Z"
                fill="black"
              />
              <path
                d="M18.7031 14.2112H15.7031C14.9934 14.2112 14.4174 14.7872 14.4174 15.4969V18.4969L18.7031 14.2112Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="sort_txt">View Weekly</p>
          </div>
          <div
            // className="sort_item"
            className={`sort_item ${
              allFilterData?.sortdata == "monthly" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "monthly")}
          >
            {/* <img src={latestic} className="icn" alt="Latest content" /> */}
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4174 18.4971H1.98884C1.27912 18.4971 0.703125 17.9211 0.703125 17.2114V3.49714C0.703125 2.78743 1.27912 2.21143 1.98884 2.21143H17.4174C18.1271 2.21143 18.7031 2.78743 18.7031 3.49714V14.2114"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.4174 4.78268C5.6541 4.78268 5.84597 4.5908 5.84597 4.35411C5.84597 4.11742 5.6541 3.92554 5.4174 3.92554C5.18071 3.92554 4.98883 4.11742 4.98883 4.35411C4.98883 4.5908 5.18071 4.78268 5.4174 4.78268Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.9888 4.78268C14.2255 4.78268 14.4174 4.5908 14.4174 4.35411C14.4174 4.11742 14.2255 3.92554 13.9888 3.92554C13.7521 3.92554 13.5602 4.11742 13.5602 4.35411C13.5602 4.5908 13.7521 4.78268 13.9888 4.78268Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.84601 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4174 4.35421V0.49707"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.703125 6.49707H18.7031"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.84824 13.6535L5.46424 13.5095C5.68824 14.1335 6.11758 14.4455 6.75224 14.4455C7.08824 14.4455 7.37624 14.3522 7.61624 14.1655C7.86158 13.9735 7.98424 13.7149 7.98424 13.3895C7.98424 13.0482 7.86424 12.7895 7.62424 12.6135C7.38424 12.4375 7.08291 12.3495 6.72024 12.3495H6.12024V11.7495H6.69624C7.02158 11.7495 7.29624 11.6695 7.52024 11.5095C7.74958 11.3442 7.86424 11.1015 7.86424 10.7815C7.86424 10.4989 7.75758 10.2802 7.54424 10.1255C7.33624 9.96554 7.08291 9.88554 6.78424 9.88554C6.49091 9.88554 6.23758 9.96554 6.02424 10.1255C5.81624 10.2802 5.66691 10.4989 5.57624 10.7815L4.96824 10.6375C5.08024 10.2109 5.30158 9.8802 5.63224 9.64554C5.96824 9.40554 6.36291 9.28554 6.81624 9.28554C7.28024 9.28554 7.68291 9.4162 8.02424 9.67754C8.36558 9.93354 8.53624 10.2909 8.53624 10.7495C8.53624 11.0429 8.46158 11.2989 8.31224 11.5175C8.16824 11.7362 7.96291 11.9042 7.69624 12.0215C8.00024 12.1282 8.23491 12.3042 8.40024 12.5495C8.57091 12.7949 8.65624 13.0775 8.65624 13.3975C8.65624 13.8829 8.46691 14.2802 8.08824 14.5895C7.70958 14.8935 7.26958 15.0455 6.76824 15.0455C6.29891 15.0455 5.89358 14.9255 5.55224 14.6855C5.21624 14.4455 4.98158 14.1015 4.84824 13.6535ZM11.4761 15.0455C11.1827 15.0455 10.9161 14.9869 10.6761 14.8695C10.4414 14.7522 10.2494 14.6002 10.1001 14.4135C9.95072 14.2215 9.82539 13.9975 9.72405 13.7415C9.62805 13.4802 9.55872 13.2215 9.51605 12.9655C9.47872 12.7042 9.46005 12.4375 9.46005 12.1655C9.46005 11.8935 9.47872 11.6295 9.51605 11.3735C9.55872 11.1122 9.62805 10.8535 9.72405 10.5975C9.82539 10.3415 9.95072 10.1175 10.1001 9.92554C10.2494 9.73354 10.4414 9.57887 10.6761 9.46154C10.9161 9.3442 11.1881 9.28554 11.4921 9.28554C11.8601 9.28554 12.1801 9.37354 12.4521 9.54954C12.7294 9.7202 12.9401 9.9522 13.0841 10.2455C13.2334 10.5335 13.3401 10.8375 13.4041 11.1575C13.4734 11.4775 13.5081 11.8135 13.5081 12.1655C13.5081 12.5122 13.4734 12.8455 13.4041 13.1655C13.3347 13.4802 13.2254 13.7842 13.0761 14.0775C12.9321 14.3709 12.7214 14.6055 12.4441 14.7815C12.1721 14.9575 11.8494 15.0455 11.4761 15.0455ZM10.1321 12.1655C10.1321 12.4162 10.1507 12.6615 10.1881 12.9015C10.2254 13.1362 10.2894 13.3789 10.3801 13.6295C10.4707 13.8749 10.6094 14.0722 10.7961 14.2215C10.9881 14.3709 11.2174 14.4455 11.4841 14.4455C11.7561 14.4455 11.9854 14.3709 12.1721 14.2215C12.3641 14.0722 12.5027 13.8749 12.5881 13.6295C12.6787 13.3842 12.7427 13.1442 12.7801 12.9095C12.8174 12.6695 12.8361 12.4215 12.8361 12.1655C12.8361 11.9042 12.8174 11.6589 12.7801 11.4295C12.7481 11.1949 12.6867 10.9549 12.5961 10.7095C12.5054 10.4589 12.3641 10.2589 12.1721 10.1095C11.9854 9.9602 11.7561 9.88554 11.4841 9.88554C11.2174 9.88554 10.9881 9.9602 10.7961 10.1095C10.6094 10.2589 10.4707 10.4562 10.3801 10.7015C10.2894 10.9469 10.2254 11.1895 10.1881 11.4295C10.1507 11.6642 10.1321 11.9095 10.1321 12.1655Z"
                fill="black"
              />
              <path
                d="M18.7031 14.2114H15.7031C14.9934 14.2114 14.4174 14.7874 14.4174 15.4971V18.4971L18.7031 14.2114Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="sort_txt">View monthly</p>
          </div>
          <div
            // className="sort_item"
            className={`sort_item ${
              allFilterData?.sortdata == "yearly" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "yearly")}
          >
            {/* <img src={latestic} className="icn" alt="Latest content" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.95355 1.89263H3.62431V0.98528C3.62431 0.715598 3.86244 0.49707 4.15573 0.49707H6.84466C7.13821 0.49707 7.37608 0.715598 7.37608 0.98528V1.89263H12.7888V0.98528C12.7888 0.715598 13.0267 0.49707 13.3202 0.49707H16.0092C16.3025 0.49707 16.5406 0.715598 16.5406 0.98528V1.89263H17.2113C18.5308 1.89263 19.6083 2.88248 19.6083 4.09464V17.8051C19.6083 19.0172 18.5308 20.0071 17.2113 20.0071H2.95355C1.63411 20.0071 0.556641 19.0172 0.556641 17.8051V4.09464C0.556641 2.88248 1.63411 1.89263 2.95355 1.89263ZM4.68715 3.0178H6.31323V1.47349H4.68715V3.0178ZM13.8517 3.0178H15.4778V1.47349H13.8517V3.0178ZM5.33558 8.16439H7.33861V10.0045H5.33558V8.16439ZM5.33558 13.6092H7.33861V15.4493H5.33558V13.6092ZM12.8263 13.6092H14.8293V15.4493H12.8263V13.6092ZM9.08094 13.6092H11.084V15.4493H9.08094V13.6092ZM5.33558 10.8869H7.33861V12.7271H5.33558V10.8869ZM12.8263 10.8869H14.8293V12.7271H12.8263V10.8869ZM9.08094 10.8869H11.084V12.7271H9.08094V10.8869ZM12.8263 8.16439H14.8293V10.0045H12.8263V8.16439ZM9.08094 8.16439H11.084V10.0045H9.08094V8.16439ZM3.51987 5.73206H16.645C16.9383 5.73206 17.1765 5.95059 17.1765 6.22027V17.3937C17.1765 17.6631 16.9383 17.8819 16.645 17.8819H3.51987C3.22658 17.8819 2.98845 17.6631 2.98845 17.3937V6.22027C2.98845 5.95059 3.22658 5.73206 3.51987 5.73206ZM16.1136 6.70848H4.05129V16.9055H16.1136V6.70848ZM3.62431 2.86905H2.95355C2.22096 2.86905 1.61948 3.42161 1.61948 4.09464V17.8051C1.61948 18.4781 2.22096 19.0306 2.95355 19.0306H17.2113C17.9439 19.0306 18.5454 18.4781 18.5454 17.8051V4.09464C18.5454 3.42161 17.9439 2.86905 17.2113 2.86905H16.5406V3.50601C16.5406 3.77569 16.3025 3.99422 16.0092 3.99422H13.3202C13.0267 3.99422 12.7888 3.77569 12.7888 3.50601V2.86905H7.37608V3.50601C7.37608 3.77569 7.13821 3.99422 6.84466 3.99422H4.15573C3.86244 3.99422 3.62431 3.77569 3.62431 3.50601V2.86905Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">View yearly</p>
          </div>

          <div
            // className="sort_item"
            className={`sort_item ${
              allFilterData?.sortdata == "yearly" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "yearly")}
          >
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

            <div className="d-flex gap-3 align-items-center select-font">
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

          {/* added */}
          <div className="sort_list">
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "relevance" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "relevance")}
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.82443 8.12878L1.82409 8.12912C1.48542 8.47468 1.21616 8.88573 1.03225 9.339C0.848339 9.7923 0.75354 10.2786 0.75354 10.77C0.75354 11.2613 0.848339 11.7476 1.03225 12.2009C1.21616 12.6542 1.48542 13.0653 1.82409 13.4108L1.82443 13.4112L5.00265 16.6602L5.00298 16.6606C5.34099 17.0068 5.74187 17.2808 6.18237 17.4676C6.62285 17.6544 7.09464 17.7504 7.57083 17.7504C8.04702 17.7504 8.51881 17.6544 8.95929 17.4676C9.39979 17.2808 9.80067 17.0068 10.1387 16.6606L10.139 16.6602L16.1372 10.5283L16.1384 10.5271C16.4772 10.1831 16.7464 9.77321 16.9301 9.32089C17.1138 8.86855 17.208 8.3831 17.2071 7.89271V7.89182V3.69434C17.2071 2.95177 16.9185 2.24177 16.4081 1.71998C15.898 1.19856 15.2086 0.907715 14.4922 0.907715H10.3872C9.42751 0.911603 8.5057 1.3018 7.82212 1.99739C7.82203 1.99748 7.82194 1.99757 7.82185 1.99766L1.82443 8.12878ZM14.1619 6.68693C13.8528 6.89805 13.4882 7.01144 13.1143 7.01144C12.6127 7.01144 12.1339 6.80762 11.7826 6.44852C11.4317 6.0898 11.2365 5.60556 11.2365 5.10289C11.2365 4.72784 11.3452 4.36033 11.5502 4.04679C11.7552 3.73312 12.0477 3.48695 12.3921 3.34113C12.7366 3.19526 13.1163 3.15691 13.4828 3.23143C13.8492 3.30593 14.1842 3.48954 14.4461 3.75726C14.7078 4.02486 14.8849 4.36447 14.9565 4.7326C15.0281 5.10067 14.9915 5.48231 14.8507 5.82968C14.7099 6.17715 14.4708 6.47591 14.1619 6.68693Z"
                  stroke="black"
                />
              </svg>

              <p className="sort_txt">Relevance</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "latest_content" ? "active" : ""
              }`}
              // high_price_content
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "latest_content")}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.714512 8.24078C0.714512 8.24078 0.714355 8.24027 0.714238 8.23977L0.687988 8.1709L0.714512 8.24078Z"
                  fill="black"
                />
                <path
                  d="M0.873291 6.69195L1.30993 6.4068C1.31017 6.4068 1.3104 6.40652 1.31067 6.40625L0.873291 6.69195Z"
                  fill="black"
                />
                <path
                  d="M18.9641 10.483C18.9427 10.427 18.932 10.3678 18.932 10.3086C18.932 10.2492 18.9427 10.1898 18.9642 10.1331L19.6232 8.40364L19.6851 8.24067C19.7531 8.06238 19.786 7.87645 19.786 7.69356C19.7862 7.18629 19.5337 6.69684 19.0893 6.40633L18.8706 6.26352L17.3925 5.29836C17.2921 5.23258 17.2188 5.13133 17.1874 5.01528L16.6582 3.06031C16.4756 2.38727 15.866 1.92457 15.1747 1.92457C15.1485 1.92457 15.1225 1.92508 15.0964 1.9266L13.0814 2.02735V2.02711L13.0512 2.02789C12.938 2.02789 12.829 1.98961 12.7413 1.91899L11.266 0.730705L11.1646 0.649103C10.8838 0.422345 10.5407 0.308361 10.2 0.308595C9.85936 0.308088 9.51623 0.422345 9.23525 0.649103L9.23565 0.64883L7.82139 1.78789L7.65893 1.91875C7.5708 1.98965 7.46139 2.02793 7.34877 2.02793L7.32248 2.02735L5.30861 1.92688L5.30732 1.9266C5.27607 1.92481 5.24865 1.92457 5.22522 1.92457C4.53377 1.92457 3.92432 2.38723 3.7417 3.06031L3.21244 5.01528C3.18096 5.1318 3.10725 5.23332 3.00627 5.29938L2.86049 5.39453L1.30994 6.40684C0.865762 6.69762 0.613535 7.18676 0.61377 7.69379C0.61377 7.87641 0.646543 8.06156 0.714278 8.23961L1.43557 10.1331L1.43568 10.1333C1.45709 10.1895 1.46795 10.2491 1.46795 10.3086C1.46795 10.368 1.45725 10.4274 1.43568 10.4836L0.714551 12.3765L0.714668 12.3763C0.646699 12.5546 0.61377 12.7403 0.61377 12.9231C0.613535 13.4304 0.865762 13.9201 1.31057 14.2109L2.56908 15.0327L3.00662 15.3183C3.10752 15.3841 3.18096 15.4851 3.21244 15.6019L3.7417 17.5566C3.92416 18.2297 4.53389 18.6924 5.22522 18.6926C5.24865 18.6924 5.2742 18.6921 5.30147 18.6906L5.24357 18.6936L7.33104 18.5893H7.33002L7.34955 18.5891C7.4615 18.5891 7.57057 18.6273 7.65854 18.6982L9.23553 19.9686H9.23565C9.51631 20.1949 9.85924 20.3089 10.2 20.3086C10.5406 20.3089 10.8837 20.1949 11.1645 19.9684L12.877 18.5888L12.7416 18.698C12.8296 18.6271 12.9384 18.5891 13.0505 18.5891L13.0739 18.5896L15.1125 18.6913L15.1023 18.6909C15.1245 18.6919 15.1486 18.6924 15.1747 18.6926C15.8658 18.6924 16.4758 18.23 16.6583 17.5566L17.1875 15.6019C17.219 15.4851 17.2923 15.3844 17.393 15.3186L19.0903 14.2104C19.5342 13.9196 19.7863 13.4304 19.7861 12.9234C19.7861 12.7405 19.7532 12.5545 19.6851 12.376L18.9641 10.483ZM17.9882 9.76125C17.921 9.9375 17.8873 10.1232 17.8873 10.3086C17.8873 10.4943 17.921 10.68 17.9882 10.8562L18.7088 12.7484L18.709 12.7487C18.731 12.8066 18.7414 12.8652 18.7414 12.9234C18.7411 13.0861 18.6608 13.2432 18.5181 13.3363L16.8224 14.4435H16.8225C16.5066 14.6496 16.2776 14.9648 16.179 15.3291L15.6497 17.2838C15.5917 17.4995 15.3953 17.648 15.1747 17.6477L15.1454 17.6469L15.138 17.6467L13.1273 17.5464H13.1287C13.104 17.5449 13.0778 17.5444 13.0505 17.5441C12.7001 17.5441 12.3596 17.664 12.0858 17.8846L11.9503 17.9941L10.509 19.155C10.4182 19.2282 10.3103 19.2639 10.2 19.2639C10.0899 19.2639 9.98182 19.2282 9.89092 19.155L8.31404 17.8846C8.04037 17.6643 7.70002 17.5444 7.34959 17.5444C7.32611 17.5444 7.29869 17.5447 7.26732 17.5464V17.5467L5.25014 17.6475L5.25076 17.6472L5.22529 17.6477C5.0049 17.648 4.80826 17.4995 4.75025 17.2838L4.22104 15.3291C4.12244 14.9649 3.89342 14.6496 3.57752 14.4436L2.31924 13.622L1.88197 13.3364C1.73939 13.2435 1.65881 13.0862 1.65854 12.9232C1.65865 12.8647 1.66889 12.8061 1.6908 12.7487L2.41193 10.856L2.41182 10.8563C2.479 10.6798 2.51268 10.4943 2.51268 10.3086C2.51268 10.123 2.47916 9.93731 2.41182 9.76106L1.7174 7.93867L1.69088 7.8693C1.66881 7.81113 1.65861 7.75223 1.65846 7.69383C1.65873 7.53086 1.7392 7.37399 1.88174 7.28117L3.5776 6.17403L3.57787 6.17375C3.89357 5.96719 4.1224 5.65219 4.221 5.2882L4.75022 3.33324C4.80811 3.11774 5.00502 2.96903 5.22525 2.9693L5.2449 2.96953L7.27264 3.07078L7.27482 3.07106C7.29943 3.07207 7.3242 3.07262 7.34881 3.07285C7.69912 3.07285 8.03975 2.9532 8.31369 2.73285L9.89127 1.46219C9.98193 1.38899 10.0897 1.35352 10.2 1.35328C10.3102 1.35328 10.4181 1.38899 10.5089 1.46219L10.4072 1.38031L12.0861 2.73258C12.3604 2.95344 12.7014 3.07258 13.0512 3.07258C13.0772 3.07258 13.1006 3.0718 13.1212 3.07129H13.1158L15.1499 2.96977H15.1513L15.1748 2.96926C15.3951 2.96899 15.5919 3.1177 15.6498 3.3332L16.179 5.28817C16.2776 5.65211 16.5063 5.96711 16.8221 6.17371L18.7369 7.42395L18.5181 7.28113C18.6608 7.37399 18.7411 7.53082 18.7414 7.69356C18.7414 7.75199 18.731 7.81067 18.7088 7.86903L17.8951 10.0051L17.9882 9.76125Z"
                  fill="black"
                />
                <path
                  d="M7.86206 9.14837L7.32362 9.25419C7.2953 9.26005 7.27976 9.28251 7.28538 9.31134L7.68593 11.3494L7.66261 11.3543L6.11854 9.54087C6.09304 9.5113 6.0619 9.50235 6.02851 9.50899L5.45679 9.62149C5.42847 9.62712 5.41292 9.64954 5.41905 9.67833L6.0369 12.8208C6.04237 12.8497 6.06522 12.8652 6.09354 12.8596L6.63194 12.7537C6.66026 12.7479 6.67581 12.7252 6.67034 12.6963L6.27026 10.6631L6.29409 10.6585L7.84147 12.4663C7.86698 12.4959 7.89374 12.5053 7.93202 12.4982L8.49878 12.3865C8.52706 12.3808 8.54261 12.3581 8.53651 12.3293L7.91878 9.18657C7.91319 9.15782 7.89038 9.14278 7.86206 9.14837Z"
                  fill="black"
                />
                <path
                  d="M11.1713 11.2324L9.77552 11.5068C9.75665 11.5109 9.74505 11.5033 9.74173 11.4841L9.60951 10.8125C9.60552 10.7937 9.61333 10.7825 9.6322 10.7784L10.7946 10.5499C10.8229 10.5443 10.8385 10.5218 10.833 10.4933L10.7335 9.98853C10.7279 9.96024 10.7051 9.94466 10.6768 9.95001L9.51451 10.1788C9.4956 10.1824 9.48388 10.1745 9.48009 10.1556L9.35384 9.51286C9.35001 9.49372 9.35779 9.48224 9.37665 9.47868L10.7724 9.20423C10.8007 9.1986 10.8163 9.17591 10.8101 9.14735L10.7101 8.63806C10.7045 8.60923 10.6818 8.59392 10.6534 8.59954L8.57712 9.0079C8.54818 9.01353 8.53314 9.03622 8.53876 9.06501L9.15662 12.2077C9.16271 12.2363 9.1849 12.2516 9.21384 12.246L11.2901 11.8377C11.3185 11.832 11.3341 11.8093 11.328 11.7808L11.2279 11.2712C11.2224 11.2425 11.1996 11.2268 11.1713 11.2324Z"
                  fill="black"
                />
                <path
                  d="M14.9351 7.75754L14.3255 7.87739C14.2922 7.88379 14.2761 7.90215 14.2777 7.93657L14.23 10.0573L14.2199 10.0591L13.2494 8.13879C13.2338 8.11149 13.211 8.09645 13.1826 8.10207L12.7682 8.18344C12.7354 8.19008 12.7199 8.2125 12.7159 8.24364L12.5631 10.385L12.5537 10.3871L11.6869 8.44563C11.6769 8.41758 11.6541 8.40282 11.6208 8.40942L11.0063 8.52981C10.973 8.53645 10.9674 8.55739 10.978 8.58516L12.4337 11.5629C12.4492 11.5897 12.472 11.6052 12.5004 11.5996L12.9766 11.5057C13.0099 11.4994 13.0254 11.4764 13.0292 11.4461L13.1999 9.32047L13.2093 9.31872L14.1672 11.2222C14.1822 11.2489 14.2051 11.2645 14.2383 11.2579L14.7145 11.164C14.7478 11.1579 14.7678 11.1339 14.7673 11.104L14.9823 7.79758C14.9812 7.76774 14.9684 7.7509 14.9351 7.75754Z"
                  fill="black"
                />
              </svg>

              <p className="sort_txt">Latest content</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "low_price_content" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "low_price_content")}
            >
              {/* <img src={dailyic} className="icn" alt="Daily" /> */}
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.07574 18.4829C4.31005 18.7172 4.68995 18.7172 4.92426 18.4829L8.74264 14.6645C8.97696 14.4302 8.97696 14.0503 8.74264 13.816C8.50833 13.5816 8.12843 13.5816 7.89411 13.816L4.5 17.2101L1.10589 13.816C0.871573 13.5816 0.491675 13.5816 0.25736 13.816C0.0230452 14.0503 0.0230452 14.4302 0.25736 14.6645L4.07574 18.4829ZM3.9 0.558594L3.9 18.0586L5.1 18.0586L5.1 0.558594L3.9 0.558594Z"
                  fill="black"
                />
                <line
                  x1="7.41663"
                  y1="2.87534"
                  x2="10.3333"
                  y2="2.87534"
                  stroke="black"
                  stroke-width="1.2"
                />
                <line
                  x1="7.41663"
                  y1="6.76426"
                  x2="13.25"
                  y2="6.76426"
                  stroke="black"
                  stroke-width="1.2"
                />
                <line
                  x1="7.41663"
                  y1="10.6529"
                  x2="16.1666"
                  y2="10.6529"
                  stroke="black"
                  stroke-width="1.2"
                />
              </svg>

              <p className="sort_txt">Lowest priced content</p>
            </div>

            {/* <div className="sort_item sort_cnt">
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
          </div> */}
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "high_price_content" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "high_price_content")}
            >
              {/* <img src={weeklyic} className="icn" alt="Weekly" /> */}
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.92426 1.13177C4.68995 0.897457 4.31005 0.897457 4.07574 1.13177L0.25736 4.95015C0.0230452 5.18446 0.0230452 5.56436 0.25736 5.79868C0.491675 6.03299 0.871573 6.03299 1.10589 5.79868L4.5 2.40456L7.89411 5.79868C8.12843 6.03299 8.50833 6.03299 8.74264 5.79868C8.97696 5.56436 8.97696 5.18446 8.74264 4.95015L4.92426 1.13177ZM5.1 19.061L5.1 1.55604L3.9 1.55604L3.9 19.061L5.1 19.061Z"
                  fill="black"
                />
                <line
                  x1="7.41748"
                  y1="8.73618"
                  x2="10.335"
                  y2="8.73618"
                  stroke="black"
                  stroke-width="1.2"
                />
                <line
                  x1="7.41748"
                  y1="12.6261"
                  x2="13.2525"
                  y2="12.6261"
                  stroke="black"
                  stroke-width="1.2"
                />
                <line
                  x1="7.41748"
                  y1="16.5162"
                  x2="16.17"
                  y2="16.5162"
                  stroke="black"
                  stroke-width="1.2"
                />
              </svg>

              <p className="sort_txt">Highest priced content</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "most_viewed_content" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "most_viewed_content")}
            >
              {/* <img src={monthlyic} className="icn" alt="Monthly" /> */}
              <svg
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.532 6.60361C19.4561 6.10643 19.2798 5.66542 18.9969 5.28954C18.542 4.68604 17.8587 4.30255 17.0205 4.18104C16.917 4.16605 16.8092 4.15845 16.7 4.15845C16.1974 4.15845 15.6814 4.31568 15.2434 4.58316C14.806 4.31568 14.2897 4.15845 13.7874 4.15845C13.6782 4.15845 13.5701 4.16605 13.4666 4.18104C12.6287 4.30255 11.9453 4.68608 11.4904 5.28954C11.208 5.66438 11.0321 6.10378 10.9559 6.5994C10.6016 6.5209 10.2371 6.53431 10.2371 6.53431C10.2371 6.53431 9.87263 6.5209 9.51831 6.5994C9.44188 6.10382 9.26596 5.66438 8.98378 5.28954C8.52892 4.68604 7.84554 4.30255 7.00739 4.18104C6.90414 4.16605 6.79605 4.15845 6.68693 4.15845C6.18432 4.15845 5.66829 4.31568 5.2303 4.58316C4.79289 4.31568 4.27659 4.15845 3.77424 4.15845C3.66509 4.15845 3.557 4.16605 3.45348 4.18104C2.61559 4.30255 1.93226 4.68608 1.47736 5.28954C1.19255 5.66751 1.01606 6.11168 0.940958 6.61274C0.729582 6.68051 0.5 6.78261 0.5 6.90755C0.5 7.13933 0.579142 8.14391 0.579142 8.14391L1.05735 8.35679C1.68653 10.4972 4.30714 12.2068 5.2303 12.2068C6.19075 12.2068 8.98622 10.3573 9.46819 8.09743C9.71975 7.80344 9.9547 7.68665 10.2371 7.68665C10.5196 7.68665 10.7545 7.80344 11.0056 8.09743C11.488 10.3573 14.2835 12.2068 15.2434 12.2068C16.1647 12.2068 18.7759 10.5043 19.4124 8.37043L19.9212 8.14387C19.9212 8.14387 20 7.1393 20 6.90752C20 6.77739 19.7503 6.6713 19.532 6.60361ZM8.21726 7.82159C7.95017 9.51733 5.67229 10.9558 5.23026 10.9558C4.78881 10.9558 2.51097 9.51729 2.24357 7.82159C1.99632 6.25106 2.80949 5.55941 3.76373 5.42082C4.23173 5.35309 4.89477 5.59408 5.23026 6.07366C5.56633 5.59408 6.2291 5.35309 6.69733 5.42082C7.65161 5.55937 8.46455 6.25106 8.21726 7.82159ZM18.2303 7.82159C17.9632 9.51733 15.6854 10.9558 15.2433 10.9558C14.8019 10.9558 12.5238 9.51729 12.2566 7.82159C12.0094 6.25106 12.8223 5.55941 13.7768 5.42082C14.2448 5.35309 14.9078 5.59408 15.2434 6.07366C15.5792 5.59408 16.2419 5.35309 16.7102 5.42082C17.6647 5.55937 18.4776 6.25106 18.2303 7.82159Z"
                  fill="black"
                />
                <path
                  d="M3.77424 3.62616C4.0867 3.62616 4.40746 3.67969 4.71831 3.78026L7.43574 1.40439L8.13442 1.82937C8.30794 1.93489 8.53433 1.89684 8.66172 1.74091L8.84678 1.51439C8.88864 1.46373 8.90688 1.39835 8.89747 1.33379C8.88833 1.26945 8.85238 1.21145 8.79822 1.17365L7.87133 0.529495C7.39525 0.302711 6.82343 0.405592 6.46108 0.783342L2.8291 3.78134C3.01123 3.72647 3.20002 3.68159 3.39795 3.65274C3.51967 3.63511 3.64631 3.62616 3.77424 3.62616Z"
                  fill="black"
                />
                <path
                  d="M11.8386 1.74094C11.966 1.89686 12.1924 1.93492 12.3659 1.8294L13.0648 1.40442L15.782 3.78029C16.0928 3.67972 16.4138 3.62619 16.7263 3.62619C16.854 3.62619 16.9803 3.6351 17.1024 3.65273C17.3005 3.68158 17.4891 3.7265 17.6712 3.78133L14.0392 0.783333C13.6768 0.40562 13.105 0.302702 12.629 0.529486L11.7023 1.17364C11.6479 1.21144 11.612 1.26944 11.6029 1.33378C11.5935 1.39834 11.612 1.46372 11.6535 1.51438L11.8386 1.74094Z"
                  fill="black"
                />
              </svg>

              <p className="sort_txt">Most viewed content</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "images" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "images")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0698 16.4942H1.33412C0.957578 16.4942 0.651978 16.1893 0.651978 15.8121V6.26209C0.651978 5.88555 0.957578 5.57995 1.33412 5.57995C1.71066 5.57995 2.01626 5.88555 2.01626 6.26209V15.1299H18.3877V4.21566H14.977C14.7955 4.21566 14.6223 4.14403 14.4947 4.01579L11.966 1.48709H8.43796L5.90925 4.01579C5.78169 4.14403 5.60775 4.21566 5.42698 4.21566H1.33412C0.957578 4.21566 0.651978 3.91006 0.651978 3.53352C0.651978 3.15697 0.957578 2.85137 1.33412 2.85137H5.14457L7.67327 0.322671C7.80083 0.194428 7.97478 0.122803 8.15555 0.122803H12.2484C12.4299 0.122803 12.6031 0.194428 12.7307 0.322671L15.2594 2.85137H19.0698C19.4471 2.85137 19.752 3.15697 19.752 3.53352V15.8121C19.752 16.1893 19.4471 16.4942 19.0698 16.4942Z"
                  fill="black"
                />
                <path
                  d="M10.2016 13.7641C7.94441 13.7641 6.10876 11.9284 6.10876 9.67123C6.10876 7.41402 7.94441 5.57837 10.2016 5.57837C12.4588 5.57837 14.2945 7.41402 14.2945 9.67123C14.2945 11.9284 12.4588 13.7641 10.2016 13.7641ZM10.2016 6.94265C8.69681 6.94265 7.47305 8.16642 7.47305 9.67123C7.47305 11.176 8.69681 12.3998 10.2016 12.3998C11.7064 12.3998 12.9302 11.176 12.9302 9.67123C12.9302 8.16642 11.7064 6.94265 10.2016 6.94265Z"
                  fill="black"
                />
              </svg>

              <p className="sort_txt">Images</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "videos" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "videos")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2737 2.1521L14.3597 4.7981V7.8221L19.2737 10.4681V2.1521Z"
                  stroke="black"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
                <path
                  d="M14.3595 10.4667C14.3595 11.3017 13.6825 11.9787 12.8475 11.9787H2.64152C1.80651 11.9787 1.12952 11.3017 1.12952 10.4667V2.15067C1.12952 1.31567 1.80651 0.638672 2.64152 0.638672H12.8475C13.6825 0.638672 14.3595 1.31567 14.3595 2.15067V10.4667Z"
                  stroke="black"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>

              <p className="sort_txt">Videos</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "recordings" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "recordings")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_618_37531)">
                  <path
                    d="M10.9999 13.0508C9.31829 13.0508 7.94836 11.7461 7.94836 10.1445V3.21484C7.94836 1.61328 9.31829 0.308594 10.9999 0.308594C12.6816 0.308594 14.0515 1.61328 14.0515 3.21484V10.1445C14.0515 11.7461 12.6816 13.0508 10.9999 13.0508ZM10.9999 1.13281C9.79407 1.13281 8.81379 2.06641 8.81379 3.21484V10.1445C8.81379 11.293 9.79407 12.2266 10.9999 12.2266C12.2058 12.2266 13.1861 11.293 13.1861 10.1445V3.21484C13.1861 2.06641 12.2058 1.13281 10.9999 1.13281Z"
                    fill="black"
                  />
                  <path
                    d="M11 15.543C7.76382 15.543 5.13062 13.0352 5.13062 9.95312C5.13062 9.72656 5.32339 9.54297 5.56128 9.54297C5.79917 9.54297 5.99194 9.72656 5.99194 9.95312C5.99194 12.582 8.2355 14.7188 10.9958 14.7188C13.7562 14.7188 15.9998 12.582 15.9998 9.95312C15.9998 9.72656 16.1925 9.54297 16.4304 9.54297C16.6683 9.54297 16.8611 9.72656 16.8611 9.95312C16.8693 13.0352 14.2361 15.543 11 15.543Z"
                    fill="black"
                  />
                  <path
                    d="M11 20.3086C10.7621 20.3086 10.5693 20.125 10.5693 19.8984V15.1328C10.5693 14.9062 10.7621 14.7227 11 14.7227C11.2379 14.7227 11.4307 14.9062 11.4307 15.1328V19.8984C11.4307 20.125 11.2379 20.3086 11 20.3086Z"
                    fill="black"
                  />
                  <path
                    d="M13.9079 20.3086H8.09192C7.85403 20.3086 7.66125 20.125 7.66125 19.8984C7.66125 19.6719 7.85403 19.4883 8.09192 19.4883H13.9038C14.1417 19.4883 14.3345 19.6719 14.3345 19.8984C14.3386 20.125 14.1458 20.3086 13.9079 20.3086Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_618_37531">
                    <rect
                      width="21"
                      height="20"
                      fill="white"
                      transform="translate(0.5 0.308594)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p className="sort_txt">Recordings</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sort == "scans" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "scans")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_618_37540)">
                  <path
                    d="M18.5938 11.8211C18.9031 11.8211 19.158 12.0539 19.1928 12.3539L19.1969 12.4242V14.874C19.1969 16.4749 17.9332 17.7807 16.3489 17.8483L16.2198 17.8511H4.07937C2.47889 17.8511 1.17347 16.5878 1.10587 15.0039L1.10312 14.8748V12.4264C1.10312 12.0933 1.37315 11.8233 1.70625 11.8233C2.01555 11.8233 2.27048 12.0562 2.30532 12.3561L2.30937 12.4264V14.8748C2.30937 15.8175 3.04624 16.588 3.97537 16.6418L4.07937 16.6448H16.2198C17.1629 16.6448 17.9338 15.9076 17.9876 14.978L17.9906 14.874V12.4242C17.9906 12.0911 18.2607 11.8211 18.5938 11.8211ZM19.1969 8.20107C19.53 8.20107 19.8 8.4711 19.8 8.8042C19.8 9.1373 19.53 9.40732 19.1969 9.40732H1.10312C0.770028 9.40732 0.5 9.1373 0.5 8.8042C0.5 8.4711 0.770028 8.20107 1.10312 8.20107H19.1969ZM16.2164 -0.242676C17.8191 -0.242676 19.1264 1.02243 19.1941 2.60853L19.1969 2.73782V5.18819C19.1969 5.52129 18.9268 5.79132 18.5938 5.79132C18.2844 5.79132 18.0295 5.55848 17.9947 5.25853L17.9906 5.18819V2.73782C17.9906 1.79292 17.252 1.02055 16.3206 0.966586L16.2164 0.963574H4.08198C3.13796 0.963574 2.3663 1.70152 2.31238 2.63203L2.30937 2.73618V5.18458C2.30937 5.51767 2.03935 5.7877 1.70625 5.7877C1.39695 5.7877 1.14202 5.55487 1.10718 5.25491L1.10312 5.18458V2.73618C1.10312 1.1343 2.36753 -0.172266 3.95277 -0.239924L4.08198 -0.242676H16.2164Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_618_37540">
                    <rect
                      width="19.3"
                      height="19.3"
                      fill="white"
                      transform="translate(0.5 0.154297)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p className="sort_txt">Scans</p>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "price_range" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "price_range")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="40"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2559 0.682617C4.94348 0.682617 0.621704 5.06395 0.621704 10.4491C0.621704 15.8343 4.94348 20.2151 10.2559 20.2151C15.5685 20.2151 19.8903 15.8343 19.8903 10.4491C19.8903 5.06395 15.5685 0.682617 10.2559 0.682617ZM10.2559 18.6746C5.7817 18.6746 2.14163 14.9846 2.14163 10.4491C2.14163 5.91299 5.78165 2.22306 10.2559 2.22306C14.7303 2.22306 18.3707 5.91304 18.3707 10.4491C18.3707 14.9846 14.7303 18.6746 10.2559 18.6746Z"
                  fill="black"
                />
                <path
                  d="M11.5355 6.22045C12.2936 6.22045 12.5016 6.77784 12.7095 7.44132L13.4232 6.52227C13.1854 5.55754 12.5312 4.98535 11.2232 4.98535C8.97827 4.98535 8.71095 6.64268 8.71095 8.08887V9.65662H7.61063L7.31351 10.9226H8.6363C8.47281 12.6256 8.04175 14.2224 6.88208 15.6241H13.2898V14.0569H9.67662C10.1375 12.9866 10.3165 12.0527 10.3908 10.9225H12.873L13.1705 9.65651H10.4499V8.39053C10.4499 7.21539 10.5096 6.22045 11.5355 6.22045Z"
                  fill="black"
                />
              </svg>

              <div className="d-flex gap-3 align-items-center select-font custm-fltr">
                <p className="sort_txt">Price</p>
                <div
                  className="from_to_div filter-input
              "
                >
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => {
                      setAllFilterData({
                        ...allFilterData,

                        price_range_to: e.target.value,
                        // field: "price_range",
                      });
                    }}
                  />
                  {/* <select name="" id="" className="form-select" onChange={()=>{ }}>
                  <option value="" selected>
                    From
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
                </div>
                <div className="from_to_div filter-input">
                  {/* <select name="" id="" className="form-select">
                  <option value="" selected>
                    To
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => {
                      if (
                        allFilterData?.sort?.price_range_to &&
                        e.target.value >> allFilterData?.sort?.price_range_to
                      ) {
                        setAllFilterData({
                          ...allFilterData,

                          price_range_from: e?.target?.value,
                        });
                      } else {
                        setAllFilterData({
                          ...allFilterData,

                          price_range_from: e?.target?.value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={`sort_item ${
                allFilterData?.sortdata == "location" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("sort", "location")}
            >
              {/* <img src={calendaric} className="icn" alt="yearly" /> */}
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.42603 8.67451C5.42603 6.62368 7.09353 4.97534 9.13478 4.97534C11.176 4.97534 12.8435 6.63326 12.8435 8.68409C12.8435 10.7349 11.176 12.3833 9.13478 12.3833C7.09353 12.3833 5.42603 10.7253 5.42603 8.67451ZM6.86353 8.68409C6.86353 9.93951 7.87936 10.9553 9.13478 10.9553C10.3902 10.9553 11.406 9.93951 11.406 8.68409C11.406 7.42868 10.3806 6.41284 9.13478 6.41284C7.88894 6.41284 6.86353 7.42868 6.86353 8.68409Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.17574 19.015C2.34865 16.2934 -0.775514 11.9521 0.403236 6.78671C1.46699 2.10046 5.55907 0.00170898 9.13365 0.00170898C9.13365 0.00170898 9.13365 0.00170898 9.14324 0.00170898C12.7178 0.00170898 16.8099 2.10046 17.8737 6.79629C19.0428 11.9617 15.9187 16.2934 13.0916 19.015C11.9799 20.0788 10.552 20.6155 9.13365 20.6155C7.71532 20.6155 6.2874 20.0788 5.17574 19.015ZM1.81199 7.10296C0.776986 11.6167 3.61365 15.5075 6.18199 17.9705C7.8399 19.5709 10.437 19.5709 12.0949 17.9705C14.6537 15.5075 17.4903 11.6167 16.4745 7.10296C15.5162 2.92463 11.9224 1.43921 9.13365 1.43921C6.3449 1.43921 2.76074 2.92463 1.81199 7.10296Z"
                  fill="black"
                />
              </svg>

              <div className="d-flex gap-3 align-items-center select-font custm-fltr">
                <p className="sort_txt">Location</p>
                <div className="from_to_div filter-input">
                  <input
                    className="form-control"
                    value={locationValue}
                    placeholder="Search location"
                    onChange={(e) => {
                      setLocationValue(e?.target?.value);
                    }}
                  />
                  {/* <select name="" id="" className="form-select">
                  <option value="" selected>
                    Choose
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
                </div>
              </div>
            </div>
            <div>
              {locationData.length > 0
                ? locationData.map((ele) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            setAddress(ele?.address);
                            setLocationValue(ele?.address);
                          }}
                        >
                          {ele?.address}
                        </div>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>

          {/* end */}

          <div className="sort_item">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.3243 8.12926L2.32397 8.1296C1.9853 8.47517 1.71604 8.88621 1.53213 9.33949C1.34822 9.79279 1.25342 10.2791 1.25342 10.7705C1.25342 11.2618 1.34822 11.7481 1.53213 12.2014C1.71604 12.6547 1.9853 13.0657 2.32397 13.4113L2.3243 13.4116L5.50252 16.6607L5.50285 16.661C5.84087 17.0073 6.24175 17.2813 6.68225 17.4681C7.12273 17.6549 7.59452 17.7508 8.07071 17.7508C8.5469 17.7508 9.01869 17.6549 9.45917 17.4681C9.89967 17.2813 10.3006 17.0073 10.6386 16.661L10.6389 16.6607L16.6371 10.5288L16.6383 10.5276C16.977 10.1836 17.2463 9.77369 17.43 9.32137C17.6136 8.86904 17.7079 8.38359 17.707 7.8932V7.89231V3.69483C17.707 2.95225 17.4184 2.24226 16.908 1.72047C16.3979 1.19905 15.7085 0.908203 14.9921 0.908203H10.8871C9.92739 0.912091 9.00558 1.30229 8.322 1.99788C8.32191 1.99797 8.32182 1.99806 8.32173 1.99815L2.3243 8.12926ZM14.6617 6.68742C14.3527 6.89853 13.9881 7.01193 13.6142 7.01193C13.1126 7.01193 12.6338 6.80811 12.2825 6.44901C11.9316 6.09028 11.7364 5.60604 11.7364 5.10338C11.7364 4.72832 11.8451 4.36082 12.0501 4.04727C12.2551 3.73361 12.5476 3.48744 12.892 3.34162C13.2365 3.19575 13.6162 3.1574 13.9827 3.23192C14.349 3.30642 14.6841 3.49003 14.9459 3.75775C15.2077 4.02534 15.3848 4.36496 15.4564 4.73309C15.528 5.10116 15.4913 5.48279 15.3506 5.83017C15.2098 6.17764 14.9707 6.4764 14.6617 6.68742Z"
                stroke="black"
              />
            </svg>

            <p className="sort_txt">Relevance</p>
          </div>

          <div className="sort_item">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_542_40283)">
                <path
                  d="M1.21451 8.24078C1.21451 8.24078 1.21436 8.24027 1.21424 8.23977L1.18799 8.1709L1.21451 8.24078Z"
                  fill="black"
                />
                <path
                  d="M1.37329 6.69195L1.80993 6.4068C1.81017 6.4068 1.8104 6.40652 1.81067 6.40625L1.37329 6.69195Z"
                  fill="black"
                />
                <path
                  d="M19.4641 10.483C19.4427 10.427 19.432 10.3678 19.432 10.3086C19.432 10.2492 19.4427 10.1898 19.4642 10.1331L20.1232 8.40364L20.1851 8.24067C20.2531 8.06238 20.286 7.87645 20.286 7.69356C20.2862 7.18629 20.0337 6.69684 19.5893 6.40633L19.3706 6.26352L17.8925 5.29836C17.7921 5.23258 17.7188 5.13133 17.6874 5.01528L17.1582 3.06031C16.9756 2.38727 16.366 1.92457 15.6747 1.92457C15.6485 1.92457 15.6225 1.92508 15.5964 1.9266L13.5814 2.02735V2.02711L13.5512 2.02789C13.438 2.02789 13.329 1.98961 13.2413 1.91899L11.766 0.730705L11.6646 0.649103C11.3838 0.422345 11.0407 0.308361 10.7 0.308595C10.3594 0.308088 10.0162 0.422345 9.73525 0.649103L9.73565 0.64883L8.32139 1.78789L8.15893 1.91875C8.0708 1.98965 7.96139 2.02793 7.84877 2.02793L7.82248 2.02735L5.80861 1.92688L5.80732 1.9266C5.77607 1.92481 5.74865 1.92457 5.72522 1.92457C5.03377 1.92457 4.42432 2.38723 4.2417 3.06031L3.71244 5.01528C3.68096 5.1318 3.60725 5.23332 3.50627 5.29938L3.36049 5.39453L1.80994 6.40684C1.36576 6.69762 1.11354 7.18676 1.11377 7.69379C1.11377 7.87641 1.14654 8.06156 1.21428 8.23961L1.93557 10.1331L1.93568 10.1333C1.95709 10.1895 1.96795 10.2491 1.96795 10.3086C1.96795 10.368 1.95725 10.4274 1.93568 10.4836L1.21455 12.3765L1.21467 12.3763C1.1467 12.5546 1.11377 12.7403 1.11377 12.9231C1.11354 13.4304 1.36576 13.9201 1.81057 14.2109L3.06908 15.0327L3.50662 15.3183C3.60752 15.3841 3.68096 15.4851 3.71244 15.6019L4.2417 17.5566C4.42416 18.2297 5.03389 18.6924 5.72522 18.6926C5.74865 18.6924 5.7742 18.6921 5.80147 18.6906L5.74357 18.6936L7.83104 18.5893H7.83002L7.84955 18.5891C7.9615 18.5891 8.07057 18.6273 8.15854 18.6982L9.73553 19.9686H9.73565C10.0163 20.1949 10.3592 20.3089 10.7 20.3086C11.0406 20.3089 11.3837 20.1949 11.6645 19.9684L13.377 18.5888L13.2416 18.698C13.3296 18.6271 13.4384 18.5891 13.5505 18.5891L13.5739 18.5896L15.6125 18.6913L15.6023 18.6909C15.6245 18.6919 15.6486 18.6924 15.6747 18.6926C16.3658 18.6924 16.9758 18.23 17.1583 17.5566L17.6875 15.6019C17.719 15.4851 17.7923 15.3844 17.893 15.3186L19.5903 14.2104C20.0342 13.9196 20.2863 13.4304 20.2861 12.9234C20.2861 12.7405 20.2532 12.5545 20.1851 12.376L19.4641 10.483ZM18.4882 9.76125C18.421 9.9375 18.3873 10.1232 18.3873 10.3086C18.3873 10.4943 18.421 10.68 18.4882 10.8562L19.2088 12.7484L19.209 12.7487C19.231 12.8066 19.2414 12.8652 19.2414 12.9234C19.2411 13.0861 19.1608 13.2432 19.0181 13.3363L17.3224 14.4435H17.3225C17.0066 14.6496 16.7776 14.9648 16.679 15.3291L16.1497 17.2838C16.0917 17.4995 15.8953 17.648 15.6747 17.6477L15.6454 17.6469L15.638 17.6467L13.6273 17.5464H13.6287C13.604 17.5449 13.5778 17.5444 13.5505 17.5441C13.2001 17.5441 12.8596 17.664 12.5858 17.8846L12.4503 17.9941L11.009 19.155C10.9182 19.2282 10.8103 19.2639 10.7 19.2639C10.5899 19.2639 10.4818 19.2282 10.3909 19.155L8.81404 17.8846C8.54037 17.6643 8.20002 17.5444 7.84959 17.5444C7.82611 17.5444 7.79869 17.5447 7.76732 17.5464V17.5467L5.75014 17.6475L5.75076 17.6472L5.72529 17.6477C5.5049 17.648 5.30826 17.4995 5.25025 17.2838L4.72104 15.3291C4.62244 14.9649 4.39342 14.6496 4.07752 14.4436L2.81924 13.622L2.38197 13.3364C2.23939 13.2435 2.15881 13.0862 2.15854 12.9232C2.15865 12.8647 2.16889 12.8061 2.1908 12.7487L2.91193 10.856L2.91182 10.8563C2.979 10.6798 3.01268 10.4943 3.01268 10.3086C3.01268 10.123 2.97916 9.93731 2.91182 9.76106L2.2174 7.93867L2.19088 7.8693C2.16881 7.81113 2.15861 7.75223 2.15846 7.69383C2.15873 7.53086 2.2392 7.37399 2.38174 7.28117L4.0776 6.17403L4.07787 6.17375C4.39357 5.96719 4.6224 5.65219 4.721 5.2882L5.25022 3.33324C5.30811 3.11774 5.50502 2.96903 5.72525 2.9693L5.7449 2.96953L7.77264 3.07078L7.77482 3.07106C7.79943 3.07207 7.8242 3.07262 7.84881 3.07285C8.19912 3.07285 8.53975 2.9532 8.81369 2.73285L10.3913 1.46219C10.4819 1.38899 10.5897 1.35352 10.7 1.35328C10.8102 1.35328 10.9181 1.38899 11.0089 1.46219L10.9072 1.38031L12.5861 2.73258C12.8604 2.95344 13.2014 3.07258 13.5512 3.07258C13.5772 3.07258 13.6006 3.0718 13.6212 3.07129H13.6158L15.6499 2.96977H15.6513L15.6748 2.96926C15.8951 2.96899 16.0919 3.1177 16.1498 3.3332L16.679 5.28817C16.7776 5.65211 17.0063 5.96711 17.3221 6.17371L19.2369 7.42395L19.0181 7.28113C19.1608 7.37399 19.2411 7.53082 19.2414 7.69356C19.2414 7.75199 19.231 7.81067 19.2088 7.86903L18.3951 10.0051L18.4882 9.76125Z"
                  fill="black"
                />
                <path
                  d="M8.36206 9.14861L7.82362 9.25443C7.7953 9.26029 7.77976 9.28275 7.78538 9.31158L8.18593 11.3497L8.16261 11.3545L6.61854 9.54111C6.59304 9.51154 6.5619 9.5026 6.52851 9.50924L5.95679 9.62174C5.92847 9.62736 5.91292 9.64979 5.91905 9.67857L6.5369 12.8211C6.54237 12.8499 6.56522 12.8654 6.59354 12.8598L7.13194 12.754C7.16026 12.7481 7.17581 12.7254 7.17034 12.6966L6.77026 10.6633L6.79409 10.6587L8.34147 12.4665C8.36698 12.4961 8.39374 12.5056 8.43202 12.4984L8.99878 12.3867C9.02706 12.3811 9.04261 12.3584 9.03651 12.3296L8.41878 9.18682C8.41319 9.15807 8.39038 9.14303 8.36206 9.14861Z"
                  fill="black"
                />
                <path
                  d="M11.6713 11.2326L10.2755 11.5071C10.2567 11.5112 10.2451 11.5035 10.2417 11.4844L10.1095 10.8128C10.1055 10.7939 10.1133 10.7827 10.1322 10.7787L11.2946 10.5501C11.3229 10.5445 11.3385 10.5221 11.333 10.4935L11.2335 9.98877C11.2279 9.96049 11.2051 9.9449 11.1768 9.95025L10.0145 10.179C9.9956 10.1826 9.98388 10.1747 9.98009 10.1558L9.85384 9.51311C9.85001 9.49397 9.85779 9.48248 9.87665 9.47893L11.2724 9.20447C11.3007 9.19885 11.3163 9.17615 11.3101 9.1476L11.2101 8.6383C11.2045 8.60947 11.1818 8.59416 11.1534 8.59978L9.07712 9.00814C9.04818 9.01377 9.03314 9.03646 9.03876 9.06525L9.65662 12.208C9.66271 12.2366 9.6849 12.2519 9.71384 12.2463L11.7901 11.8379C11.8185 11.8323 11.8341 11.8096 11.828 11.781L11.7279 11.2714C11.7224 11.2428 11.6996 11.227 11.6713 11.2326Z"
                  fill="black"
                />
                <path
                  d="M15.4351 7.7573L14.8255 7.87714C14.7922 7.88355 14.7761 7.90191 14.7777 7.93632L14.73 10.0571L14.7199 10.0589L13.7494 8.13855C13.7338 8.11124 13.711 8.09621 13.6826 8.10183L13.2682 8.1832C13.2354 8.18984 13.2199 8.21226 13.2159 8.24339L13.0631 10.3848L13.0537 10.3868L12.1869 8.44539C12.1769 8.41734 12.1541 8.40257 12.1208 8.40917L11.5063 8.52956C11.473 8.53621 11.4674 8.55714 11.478 8.58492L12.9337 11.5627C12.9492 11.5894 12.972 11.605 13.0004 11.5994L13.4766 11.5055C13.5099 11.4991 13.5254 11.4762 13.5292 11.4458L13.6999 9.32023L13.7093 9.31847L14.6672 11.2219C14.6822 11.2487 14.7051 11.2643 14.7383 11.2576L15.2145 11.1637C15.2478 11.1576 15.2678 11.1337 15.2673 11.1038L15.4823 7.79734C15.4812 7.76749 15.4684 7.75066 15.4351 7.7573Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_542_40283">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.699951 0.308594)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p className="sort_txt">Latest Content</p>
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
            <svg
              width="20"
              height="13"
              viewBox="0 0 20 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.032 6.60337C18.9561 6.10618 18.7798 5.66518 18.4969 5.28929C18.042 4.6858 17.3587 4.30231 16.5205 4.18079C16.417 4.16581 16.3092 4.1582 16.2 4.1582C15.6974 4.1582 15.1814 4.31543 14.7434 4.58292C14.306 4.31543 13.7897 4.1582 13.2874 4.1582C13.1782 4.1582 13.0701 4.16581 12.9666 4.18079C12.1287 4.30231 11.4453 4.68584 10.9904 5.28929C10.708 5.66413 10.5321 6.10354 10.4559 6.59915C10.1016 6.52065 9.73711 6.53407 9.73711 6.53407C9.73711 6.53407 9.37263 6.52065 9.01831 6.59915C8.94188 6.10358 8.76596 5.66413 8.48378 5.28929C8.02892 4.6858 7.34554 4.30231 6.50739 4.18079C6.40414 4.16581 6.29605 4.1582 6.18693 4.1582C5.68432 4.1582 5.16829 4.31543 4.7303 4.58292C4.29289 4.31543 3.77659 4.1582 3.27424 4.1582C3.16509 4.1582 3.057 4.16581 2.95348 4.18079C2.11559 4.30231 1.43226 4.68584 0.97736 5.28929C0.692553 5.66727 0.516064 6.11144 0.440958 6.6125C0.229582 6.68027 0 6.78236 0 6.90731C0 7.13909 0.0791424 8.14366 0.0791424 8.14366L0.557349 8.35655C1.18653 10.4969 3.80714 12.2066 4.7303 12.2066C5.69075 12.2066 8.48622 10.357 8.96819 8.09718C9.21975 7.80319 9.4547 7.68641 9.73715 7.68641C10.0196 7.68641 10.2545 7.80319 10.5056 8.09718C10.988 10.357 13.7835 12.2066 14.7434 12.2066C15.6647 12.2066 18.2759 10.504 18.9124 8.37019L19.4212 8.14363C19.4212 8.14363 19.5 7.13905 19.5 6.90727C19.5 6.77714 19.2503 6.67106 19.032 6.60337ZM7.71726 7.82134C7.45017 9.51708 5.17229 10.9555 4.73026 10.9555C4.28881 10.9555 2.01097 9.51704 1.74357 7.82134C1.49632 6.25081 2.30949 5.55917 3.26373 5.42058C3.73173 5.35285 4.39477 5.59383 4.73026 6.07342C5.06633 5.59383 5.7291 5.35285 6.19733 5.42058C7.15161 5.55913 7.96455 6.25081 7.71726 7.82134ZM17.7303 7.82134C17.4632 9.51708 15.1854 10.9555 14.7433 10.9555C14.3019 10.9555 12.0238 9.51704 11.7566 7.82134C11.5094 6.25081 12.3223 5.55917 13.2768 5.42058C13.7448 5.35285 14.4078 5.59383 14.7434 6.07342C15.0792 5.59383 15.7419 5.35285 16.2102 5.42058C17.1647 5.55913 17.9776 6.25081 17.7303 7.82134Z"
                fill="black"
              />
              <path
                d="M3.27424 3.62616C3.5867 3.62616 3.90746 3.67969 4.21831 3.78026L6.93574 1.40439L7.63442 1.82937C7.80794 1.93489 8.03433 1.89684 8.16172 1.74091L8.34678 1.51439C8.38864 1.46373 8.40688 1.39835 8.39747 1.33379C8.38833 1.26945 8.35238 1.21145 8.29822 1.17365L7.37133 0.529495C6.89525 0.302711 6.32343 0.405592 5.96108 0.783342L2.3291 3.78134C2.51123 3.72647 2.70002 3.68159 2.89795 3.65274C3.01967 3.63511 3.14631 3.62616 3.27424 3.62616Z"
                fill="black"
              />
              <path
                d="M11.3385 1.74094C11.4659 1.89686 11.6922 1.93492 11.8658 1.8294L12.5647 1.40442L15.2819 3.78029C15.5927 3.67972 15.9137 3.62619 16.2262 3.62619C16.3538 3.62619 16.4802 3.6351 16.6022 3.65273C16.8004 3.68158 16.989 3.7265 17.1711 3.78133L13.5391 0.783333C13.1767 0.40562 12.6049 0.302702 12.1289 0.529486L11.2022 1.17364C11.1478 1.21144 11.1118 1.26944 11.1027 1.33378C11.0933 1.39834 11.1118 1.46372 11.1534 1.51438L11.3385 1.74094Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Most viewed content</p>
          </div>

          <div className="sort_item">
            <img src={cameraic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Images</p>
          </div>
          <div className="sort_item">
            <img src={videoic} className="icn" alt="Videos" />
            <p className="sort_txt">Videos</p>
          </div>
          <div className="sort_item">
            <img src={recic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Recordings</p>
          </div>
          <div className="sort_item">
            <img src={scanic} className="icn" alt="Scans" />
            <p className="sort_txt">scans</p>
          </div>
          {/* <div className="sort_item">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75574 0.682617C4.44336 0.682617 0.121582 5.06395 0.121582 10.4491C0.121582 15.8343 4.44336 20.2151 9.75574 20.2151C15.0684 20.2151 19.3902 15.8343 19.3902 10.4491C19.3902 5.06395 15.0684 0.682617 9.75574 0.682617ZM9.75574 18.6746C5.28158 18.6746 1.6415 14.9846 1.6415 10.4491C1.6415 5.91299 5.28153 2.22306 9.75574 2.22306C14.2302 2.22306 17.8705 5.91304 17.8705 10.4491C17.8706 14.9846 14.2302 18.6746 9.75574 18.6746Z"
                fill="black"
              />
              <path
                d="M11.0355 6.22045C11.7936 6.22045 12.0016 6.77784 12.2095 7.44132L12.9232 6.52227C12.6854 5.55754 12.0312 4.98535 10.7232 4.98535C8.47827 4.98535 8.21095 6.64268 8.21095 8.08887V9.65662H7.11063L6.81351 10.9226H8.1363C7.97281 12.6256 7.54175 14.2224 6.38208 15.6241H12.7898V14.0569H9.17662C9.63753 12.9866 9.81653 12.0527 9.89078 10.9225H12.373L12.6705 9.65651H9.94991V8.39053C9.94991 7.21539 10.0096 6.22045 11.0355 6.22045Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Price</p>
            <div className="d-flex gap-3 align-items-center select-font">
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
          <div className="sort_item">
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.92603 8.67475C5.92603 6.62392 7.59353 4.97559 9.63478 4.97559C11.676 4.97559 13.3435 6.6335 13.3435 8.68434C13.3435 10.7352 11.676 12.3835 9.63478 12.3835C7.59353 12.3835 5.92603 10.7256 5.92603 8.67475ZM7.36353 8.68434C7.36353 9.93975 8.37936 10.9556 9.63478 10.9556C10.8902 10.9556 11.906 9.93975 11.906 8.68434C11.906 7.42892 10.8806 6.41309 9.63478 6.41309C8.38894 6.41309 7.36353 7.42892 7.36353 8.68434Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.67574 19.0153C2.84865 16.2936 -0.275514 11.9524 0.903236 6.78695C1.96699 2.1007 6.05907 0.00195312 9.63365 0.00195312C9.63365 0.00195312 9.63365 0.00195312 9.64324 0.00195312C13.2178 0.00195312 17.3099 2.1007 18.3737 6.79654C19.5428 11.962 16.4187 16.2936 13.5916 19.0153C12.4799 20.079 11.052 20.6157 9.63365 20.6157C8.21532 20.6157 6.7874 20.079 5.67574 19.0153ZM2.31199 7.1032C1.27699 11.617 4.11365 15.5078 6.68199 17.9707C8.3399 19.5711 10.937 19.5711 12.5949 17.9707C15.1537 15.5078 17.9903 11.617 16.9745 7.1032C16.0162 2.92487 12.4224 1.43945 9.63365 1.43945C6.8449 1.43945 3.26074 2.92487 2.31199 7.1032Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Location</p>
            <div className="d-flex gap-3 align-items-center select-font">
              <div className="from_to_div">
                <select name="" id="" className="form-select">
                  <option value="" selected>
                    Choose
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select>
              </div>
            </div>
          </div> */}

          <div
            className={`sort_item ${
              allFilterData?.sort == "price_range" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "price_range")}
          >
            {/* <img src={calendaric} className="icn" alt="yearly" /> */}
            <svg
              width="40"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2559 0.682617C4.94348 0.682617 0.621704 5.06395 0.621704 10.4491C0.621704 15.8343 4.94348 20.2151 10.2559 20.2151C15.5685 20.2151 19.8903 15.8343 19.8903 10.4491C19.8903 5.06395 15.5685 0.682617 10.2559 0.682617ZM10.2559 18.6746C5.7817 18.6746 2.14163 14.9846 2.14163 10.4491C2.14163 5.91299 5.78165 2.22306 10.2559 2.22306C14.7303 2.22306 18.3707 5.91304 18.3707 10.4491C18.3707 14.9846 14.7303 18.6746 10.2559 18.6746Z"
                fill="black"
              />
              <path
                d="M11.5355 6.22045C12.2936 6.22045 12.5016 6.77784 12.7095 7.44132L13.4232 6.52227C13.1854 5.55754 12.5312 4.98535 11.2232 4.98535C8.97827 4.98535 8.71095 6.64268 8.71095 8.08887V9.65662H7.61063L7.31351 10.9226H8.6363C8.47281 12.6256 8.04175 14.2224 6.88208 15.6241H13.2898V14.0569H9.67662C10.1375 12.9866 10.3165 12.0527 10.3908 10.9225H12.873L13.1705 9.65651H10.4499V8.39053C10.4499 7.21539 10.5096 6.22045 11.5355 6.22045Z"
                fill="black"
              />
            </svg>

            <div className="d-flex gap-3 align-items-center select-font custm-fltr">
              <p className="sort_txt">Price</p>
              <div
                className="from_to_div filter-input
              "
              >
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) => {
                    setAllFilterData({
                      ...allFilterData,
                      sort: {
                        ...allFilterData.sort,
                        price_range_to: e.target.value,
                        // field: "price_range",
                      },
                    });
                  }}
                />
                {/* <select name="" id="" className="form-select" onChange={()=>{ }}>
                  <option value="" selected>
                    From
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
              </div>
              <div className="from_to_div filter-input">
                {/* <select name="" id="" className="form-select">
                  <option value="" selected>
                    To
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) => {
                    if (
                      allFilterData?.sort?.price_range_to &&
                      e.target.value >> allFilterData?.sort?.price_range_to
                    ) {
                      setAllFilterData({
                        ...allFilterData,
                        sort: {
                          ...allFilterData.sort,
                          price_range_from: e?.target?.value,
                        },
                      });
                    } else {
                      setAllFilterData({
                        ...allFilterData,
                        sort: {
                          ...allFilterData.sort,
                          price_range_from: e?.target?.value,
                        },
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={`sort_item ${
              allFilterData?.sort == "location" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("sort", "location")}
          >
            {/* <img src={calendaric} className="icn" alt="yearly" /> */}
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.42603 8.67451C5.42603 6.62368 7.09353 4.97534 9.13478 4.97534C11.176 4.97534 12.8435 6.63326 12.8435 8.68409C12.8435 10.7349 11.176 12.3833 9.13478 12.3833C7.09353 12.3833 5.42603 10.7253 5.42603 8.67451ZM6.86353 8.68409C6.86353 9.93951 7.87936 10.9553 9.13478 10.9553C10.3902 10.9553 11.406 9.93951 11.406 8.68409C11.406 7.42868 10.3806 6.41284 9.13478 6.41284C7.88894 6.41284 6.86353 7.42868 6.86353 8.68409Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.17574 19.015C2.34865 16.2934 -0.775514 11.9521 0.403236 6.78671C1.46699 2.10046 5.55907 0.00170898 9.13365 0.00170898C9.13365 0.00170898 9.13365 0.00170898 9.14324 0.00170898C12.7178 0.00170898 16.8099 2.10046 17.8737 6.79629C19.0428 11.9617 15.9187 16.2934 13.0916 19.015C11.9799 20.0788 10.552 20.6155 9.13365 20.6155C7.71532 20.6155 6.2874 20.0788 5.17574 19.015ZM1.81199 7.10296C0.776986 11.6167 3.61365 15.5075 6.18199 17.9705C7.8399 19.5709 10.437 19.5709 12.0949 17.9705C14.6537 15.5075 17.4903 11.6167 16.4745 7.10296C15.5162 2.92463 11.9224 1.43921 9.13365 1.43921C6.3449 1.43921 2.76074 2.92463 1.81199 7.10296Z"
                fill="black"
              />
            </svg>

            <div className="d-flex gap-3 align-items-center select-font custm-fltr">
              <p className="sort_txt">Location</p>
              <div className="from_to_div filter-input">
                <input
                  className="form-control"
                  value={locationValue}
                  placeholder="Search location"
                  onChange={(e) => {
                    setLocationValue(e?.target?.value);
                  }}
                />
                {/* <select name="" id="" className="form-select">
                  <option value="" selected>
                    Choose
                  </option>
                  <option value="">01</option>
                  <option value="">02</option>
                </select> */}
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
          {allFilterData?.allcategoryData?.map((curr, index) => (
            <div
              className={`sort_item ${
                allFilterData?.category?.includes(curr?._id) ? "active" : ""
              }`}
              onClick={() => handleClick("category", curr?._id)}
              key={index}
            >
              <input type="checkbox" className="fltr_checkbx" />
              <img src={curr?.icon} className="icn" alt="Celebrity" />
              <p className="sort_txt">{curr?.name}</p>
            </div>
          ))}
        </div>
        <div className="sort_list">
          <div
            //  className="sort_item"
            // className={`sort_item ${
            //   allFilterData?.filterdata?.includes(curr?._id) ? "active" : ""
            // }`}
            // onClick={() => handleClick("filter", curr?._id)}
            // key={index}
            className={`sort_item icn
               ${
                 allFilterData?.filterdata?.includes("exclusive")
                   ? "active"
                   : ""
               }`}
            onClick={() => handleClick("filter", "exclusive")}
          >
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div
            onClick={() => handleClick("filter", "shared")}
            //  className="sort_item"
            className={`sort_item icn ${
              allFilterData?.filterdata?.includes("shared") ? "active" : ""
            }`}
          >
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div>
          {/* <div className="d-flex flex-column gap-2">
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={celebrityic} className="icn" alt="Celebrity" />
              <p className="sort_txt">Celebrity content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={politicalic} className="icn" alt="Political" />
              <p className="sort_txt">Political content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={crimeic} className="icn" alt="Crime" />
              <p className="sort_txt">Crime content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={businessic} className="icn" alt="Business" />
              <p className="sort_txt">Business content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Fashion" />
              <p className="sort_txt">Fashion content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
               <img src={fashionic} className="icn" alt="Fashion" /> 
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.2537 3.85565C2.10303 5.00884 1.26203 6.38434 0.822105 7.83744C0.241899 9.74785 0.343933 11.8842 1.1021 13.8534C1.86308 15.8333 3.24239 17.5023 4.98265 18.5511L4.98269 18.5511C6.42338 19.4177 8.14083 19.8742 9.92055 19.8742C10.3105 19.8742 10.706 19.8531 11.0988 19.8082C13.3012 19.5602 15.294 18.6338 16.7106 17.1985C18.187 15.7032 19.1616 13.6125 19.4581 11.3098L19.4581 11.3097C19.6201 10.0488 19.568 8.75846 19.3015 7.57567C19.013 6.29529 18.4908 5.14859 17.7453 4.17317C16.2109 2.15974 13.9285 0.960517 11.3205 0.794153L11.3205 0.794153C8.37033 0.606744 5.35493 1.74945 3.2537 3.85565ZM3.2537 3.85565L3.2891 3.89097M3.2537 3.85565L3.2891 3.89097M3.2891 3.89097C2.14376 5.03881 1.30731 6.40729 0.869954 7.85195C0.293187 9.75102 0.394326 11.876 1.14877 13.8355L3.2891 3.89097ZM10.655 13.3417L10.6549 13.3417C10.0794 13.3625 9.48844 13.3858 8.91863 13.4243C8.65094 13.7132 8.38301 14.06 8.12044 14.3998L8.09053 14.4385C7.79958 14.8181 7.49385 15.2126 7.18212 15.5413C7.39804 16.1086 7.66792 16.7608 7.93237 17.3998L7.95487 17.4542L10.655 13.3417ZM10.655 13.3417C11.2202 13.321 11.8046 13.2978 12.3712 13.2594C12.6517 13.6207 12.9349 14.0366 13.2085 14.4413L13.2085 14.4413M10.655 13.3417L13.2085 14.4413M13.2085 14.4413C13.4874 14.8536 13.7778 15.28 14.0687 15.6547C13.9142 16.1143 13.7561 16.617 13.5991 17.1161C13.567 17.2182 13.5349 17.3202 13.5029 17.4216L13.4688 17.5297C13.3263 17.9814 13.1802 18.4446 13.0407 18.876M13.2085 14.4413L13.0407 18.876M7.75374 10.9734L7.75377 10.9735C8.08659 11.6313 8.43045 12.3073 8.91841 12.925C9.45421 12.8911 10.006 12.8684 10.5424 12.8463C10.5732 12.8451 10.604 12.8438 10.6347 12.8425L10.6349 12.8425C11.193 12.8219 11.7638 12.7988 12.3165 12.7632C12.4779 12.3756 12.6373 11.8767 12.7953 11.3822C12.8061 11.3482 12.817 11.3142 12.8278 11.2803L7.75374 10.9734ZM7.75374 10.9734C7.59208 10.6551 7.42465 10.3256 7.24441 10.0101C8.06772 8.95625 8.84269 8.12922 10.0227 7.34138C11.4337 8.21506 12.4979 8.99195 13.3488 9.76944C13.1744 10.1912 13.0051 10.7231 12.8417 11.2368L12.8278 11.2803L7.75374 10.9734ZM17.3514 7.80064L17.3514 7.80061C17.5799 7.50126 17.8072 7.20096 18.0348 6.90018C18.1611 6.73336 18.2874 6.56639 18.4142 6.39936C18.1383 5.69398 17.7776 5.04755 17.335 4.46493C16.5906 3.48594 15.6671 2.71603 14.5942 2.17051C14.4653 2.1061 14.3338 2.04398 14.1974 1.98191C14.1384 2.01311 14.079 2.04472 14.0188 2.07669C13.9191 2.12965 13.8176 2.1836 13.7134 2.23838C13.6179 2.289 13.5202 2.34081 13.4205 2.39369C12.5085 2.87746 11.4268 3.45118 10.3091 4.03188C10.3044 4.36149 10.3016 4.65218 10.2989 4.92415C10.297 5.11103 10.2953 5.28906 10.2931 5.4648C10.2931 5.46485 10.2931 5.4649 10.2931 5.46495L10.2431 5.46433L17.3514 7.80064ZM17.3514 7.80064C17.1724 8.03568 16.9941 8.27137 16.8158 8.50698L16.8156 8.50734L16.8148 8.50833C16.6415 8.73733 16.4683 8.96626 16.2945 9.19457C15.7291 9.2068 14.8655 9.28472 13.7205 9.4254C12.8368 8.61541 11.7361 7.81083 10.2771 6.90763L17.3514 7.80064ZM2.5082 7.45903L2.50832 7.45926C2.82793 8.09952 3.18729 8.81613 3.67183 9.65846C4.64296 9.72953 6.04899 9.75044 6.81537 9.74583C7.66288 8.66026 8.50674 7.7517 9.76967 6.91348C9.77505 6.35069 9.78043 5.90089 9.78581 5.46387C9.78581 5.46382 9.78582 5.46377 9.78582 5.46371L9.83581 5.46433L2.5082 7.45903ZM2.5082 7.45903C2.48041 7.40407 2.45285 7.3495 2.42546 7.29526C2.2712 6.98981 2.1223 6.69499 1.96804 6.40223C2.39321 5.61177 2.95161 4.86729 3.61968 4.19685C4.33642 3.47965 5.16275 2.88034 6.05901 2.41427C7.13991 3.06433 8.54515 3.68688 9.80167 4.06973L2.5082 7.45903ZM13.0407 18.876C12.406 19.0886 11.7343 19.2374 11.0412 19.3175C10.6658 19.3593 10.2932 19.3802 9.92055 19.3802C9.51175 19.3802 9.10557 19.3553 8.70456 19.3055C8.48481 18.7336 8.21575 18.0822 7.9549 17.4542L13.0407 18.876ZM2.04715 7.67479C2.37066 8.31983 2.73459 9.04516 3.22514 9.9003C2.8584 10.2157 2.4923 10.5318 2.12623 10.8478L2.12612 10.8479C1.77215 11.1534 1.41822 11.459 1.06373 11.764C0.86866 10.5059 0.934431 9.20609 1.30868 7.97418L1.26084 7.95964L1.30866 7.97426C1.41296 7.63301 1.54 7.29602 1.68771 6.9653C1.77141 7.12663 1.85361 7.29016 1.93773 7.4575C1.97376 7.52919 2.01015 7.60157 2.04715 7.67479ZM2.04715 7.67479C2.04715 7.67477 2.04714 7.67476 2.04713 7.67474L2.09183 7.65233L2.0472 7.67488C2.04719 7.67485 2.04717 7.67482 2.04715 7.67479ZM5.25298 18.1319L5.25292 18.1318C4.32038 17.5708 3.51341 16.8294 2.86218 15.9747C3.23549 15.9477 3.66856 15.9184 4.15068 15.8869L4.15077 15.8869C4.23267 15.8814 4.31568 15.8758 4.39974 15.8702C5.10714 15.8228 5.88861 15.7704 6.7026 15.7059C6.92765 16.2975 7.20923 16.9778 7.48256 17.637C7.5069 17.6959 7.53133 17.7549 7.55579 17.8141C7.75246 18.2895 7.95126 18.7701 8.12468 19.2124C7.09401 19.0174 6.11934 18.6547 5.25298 18.1319ZM16.3416 16.855L16.3415 16.8551C15.5943 17.611 14.6759 18.218 13.6477 18.647C13.7121 18.4464 13.7767 18.242 13.8412 18.0378C13.8914 17.8785 13.9417 17.7194 13.9919 17.5621L13.9919 17.562C14.0298 17.4422 14.0677 17.3217 14.1056 17.201C14.2503 16.741 14.3955 16.2796 14.5375 15.8564C15.4104 15.879 16.2414 15.9026 17.073 16.0069C16.8455 16.3082 16.6016 16.593 16.3416 16.855ZM11.2868 1.28532L11.29 1.23542L11.2868 1.28532C12.0927 1.33761 12.8637 1.49193 13.5906 1.74362C13.551 1.76458 13.5109 1.78593 13.4695 1.80869C12.4929 2.32885 11.281 2.9712 10.0302 3.62188C8.8948 3.28253 7.62564 2.73786 6.59687 2.15214C7.88393 1.57665 9.28511 1.26704 10.6859 1.26704C10.8873 1.26704 11.0858 1.27227 11.2868 1.28532ZM7.29822 11.1919L7.29829 11.1921L7.31966 11.2341C7.64588 11.8764 7.98492 12.5439 8.47216 13.1713C8.20414 13.4703 7.93933 13.8114 7.68591 14.1412L7.66951 14.1625C7.38871 14.5265 7.10002 14.9008 6.8142 15.2003C5.85108 15.2783 4.93146 15.3409 4.11688 15.3931L4.11674 15.3931C3.50192 15.4342 2.96256 15.4703 2.52712 15.5038C1.88583 14.5435 1.42355 13.4601 1.17394 12.3356C1.72476 11.8589 2.27667 11.3834 2.82903 10.9075C3.1192 10.6575 3.40949 10.4073 3.69981 10.1569C4.61008 10.219 5.85859 10.2397 6.64036 10.2397H6.64074H6.64113H6.64151H6.6419H6.64228H6.64266H6.64305H6.64343H6.64381H6.6442H6.64458H6.64496H6.64535H6.64573H6.64611H6.64649H6.64688H6.64726H6.64764H6.64802H6.6484H6.64879H6.64917H6.64955H6.64993H6.65031H6.65069H6.65107H6.65145H6.65183H6.65222H6.6526H6.65298H6.65336H6.65374H6.65412H6.6545H6.65488H6.65526H6.65564H6.65602H6.65639H6.65677H6.65715H6.65753H6.65791H6.65829H6.65867H6.65905H6.65942H6.6598H6.66018H6.66056H6.66094H6.66131H6.66169H6.66207H6.66245H6.66282H6.6632H6.66358H6.66396H6.66433H6.66471H6.66509H6.66546H6.66584H6.66621H6.66659H6.66697H6.66734H6.66772H6.66809H6.66847H6.66885H6.66922H6.6696H6.66997H6.67035H6.67072H6.6711H6.67147H6.67184H6.67222H6.67259H6.67297H6.67334H6.67372H6.67409H6.67446H6.67484H6.67521H6.67558H6.67596H6.67633H6.6767H6.67708H6.67745H6.67782H6.67819H6.67857H6.67894H6.67931H6.67968H6.68005H6.68043H6.6808H6.68117H6.68154H6.68191H6.68228H6.68266H6.68303H6.6834H6.68377H6.68414H6.68451H6.68488H6.68525H6.68562H6.68599H6.68636H6.68673H6.6871H6.68747H6.68784H6.68821H6.68858H6.68895H6.68932H6.68969H6.69006H6.69042H6.69079H6.69116H6.69153H6.6919H6.69227H6.69264H6.693H6.69337H6.69374H6.69411H6.69448H6.69484H6.69521H6.69558H6.69595H6.69631H6.69668H6.69705H6.69741H6.69778H6.69815H6.69851H6.69888H6.69925H6.69961H6.69998H6.70034H6.70071H6.70108H6.70144H6.70181H6.70217H6.70254H6.7029H6.70327H6.70363H6.704H6.70436H6.70473H6.70509H6.70546H6.70582H6.70619H6.70655H6.70691H6.70728H6.70764H6.70801H6.70837H6.70873H6.7091H6.70946H6.70982H6.71019H6.71055H6.71091H6.71128H6.71164H6.712H6.71236H6.71273H6.71309H6.71345H6.71381H6.71417H6.71454H6.7149H6.71526H6.71562H6.71598H6.71634H6.71671H6.71707H6.71743H6.71779H6.71815H6.71851H6.71887H6.71923H6.71959H6.71995H6.72031H6.72067H6.72104H6.7214H6.72176H6.72212H6.72247H6.72283H6.72319H6.72355H6.72391H6.72427H6.72463H6.72499H6.72535H6.72571H6.72607H6.72643H6.72678H6.72714H6.7275H6.72786H6.72822H6.72858H6.72893H6.72929H6.72965H6.73001H6.73037H6.73072H6.73108H6.73144H6.73179H6.73215H6.73251H6.73287H6.73322H6.73358H6.73394H6.73429H6.73465H6.73501H6.73536H6.73572H6.73607H6.73643H6.73679H6.73714H6.7375H6.73785H6.73821H6.73856H6.73892H6.73928H6.73963H6.73999H6.74034H6.7407H6.74105H6.74141H6.74176H6.74211H6.74247H6.74282H6.74318H6.74353H6.74389H6.74424H6.74459H6.74495H6.7453H6.74566H6.74601H6.74636H6.74672H6.74707H6.74742H6.74778H6.74813H6.74848H6.74883H6.74919H6.74954H6.74989H6.75024H6.7506H6.75095H6.7513H6.75165H6.75201H6.75236H6.75271H6.75306H6.75341H6.75376H6.75412H6.75447H6.75482H6.75517H6.75552H6.75587H6.75622H6.75657H6.75693H6.75728H6.75763H6.75798H6.75833H6.75868H6.75903H6.75938H6.75973H6.76008H6.76043H6.76078H6.76113H6.76148H6.76183H6.76218H6.76253H6.76288H6.76323H6.76357H6.76392H6.76427H6.76462H6.76497H6.76532H6.76567H6.76602H6.76637H6.76671H6.76706H6.76741H6.76776H6.76811H6.76845H6.7688H6.76915H6.7695H6.76985H6.77019H6.77054H6.77089H6.77124H6.77158H6.77193H6.77228H6.77262H6.77297H6.77332H6.77367H6.77401H6.77436H6.77471H6.77505H6.7754H6.77574H6.77609H6.77644H6.77678H6.77713H6.77748H6.77782H6.77817H6.77851H6.77886H6.7792H6.77955H6.77989H6.78024H6.78059H6.78093H6.78128H6.78162H6.78197H6.78231H6.78266H6.783H6.78334H6.78369H6.78403H6.78438H6.78472H6.78507H6.78541H6.78575H6.7861H6.78644H6.78679H6.78713H6.78747H6.78782H6.78816H6.7885H6.78885H6.78919H6.78953H6.78988H6.79022H6.79056H6.79091H6.79125H6.79159H6.79194H6.79228H6.79262H6.79296H6.79331H6.79365H6.79399H6.79433H6.79459C6.96873 10.5433 7.13063 10.8596 7.29822 11.1919ZM18.6458 12.7611C18.3657 13.7766 17.9416 14.7208 17.3943 15.5518C16.4254 15.4119 15.4774 15.3853 14.483 15.362C14.211 15.0126 13.9389 14.6128 13.6704 14.2181L13.6357 14.1672C13.6239 14.1499 13.6122 14.1326 13.6004 14.1153C13.3334 13.7229 13.0605 13.3219 12.7826 12.9637C12.9639 12.5301 13.1397 11.9757 13.3095 11.4405L13.314 11.4262L13.3173 11.4157C13.4879 10.878 13.6626 10.3271 13.8395 9.91005C14.9289 9.7752 15.7505 9.70071 16.2851 9.68858C17.0634 10.6589 17.8317 11.6795 18.5807 12.6746L18.6458 12.7611ZM18.8049 7.68183C19.0577 8.80789 19.1095 10.0417 18.9544 11.2471C18.9155 11.5456 18.8659 11.8399 18.8035 12.1318C18.1294 11.235 17.4378 10.3226 16.7384 9.4456C17.0805 8.99609 17.4225 8.5442 17.7618 8.09484C17.9132 7.89566 18.0646 7.69584 18.2159 7.49604L18.2169 7.49471L18.2194 7.49147C18.3508 7.31794 18.4823 7.14444 18.6137 6.97137C18.6859 7.20327 18.7496 7.43948 18.8049 7.68183Z"
                  fill="black"
                  stroke="black"
                  stroke-width="0.1"
                />
              </svg>

              <p className="sort_txt">Sports content</p>
            </div>
          </div> */}
        </div>
        <div className="sort_list">
          {/* <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={locationic} className="icn" alt="Scans" />
                <p className="sort_txt">Location</p>
              </div>
              <div className="fltr_srch">
                <input type="text" className="srch_inp" placeholder="Search" />
                <img src={"srchic"} className="srch_icn" alt="search" />
              </div>
            </div>
          </div> */}
          {/* <div className={`sort_item ${active === "latest" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={(e) => handleClickTime("content", "latest")}>
            <img src={latestic} className="icn" alt="Latest content" />
            <p className="sort_txt">Latest content</p>
          </div>
          <div className={`sort_item ${active === "lowPrice" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("content", "lowPrice")}>
            <img
              src={lowestprcdic}
              className="icn"
              alt="Lowest priced content"
            />
            <p className="sort_txt">Lowest priced content</p>
          </div>
          <div className={`sort_item ${active === "highPrice" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("content", "highPrice")}>
            <img
              src={highestprcdic}
              className="icn"
              alt="Highest priced content"
            />
            <p className="sort_txt">Highest priced content</p>
          </div> */}
        </div>
        <button
          className="fltr_btn mt-3"
          onClick={() => {
            handleClick("submit", true);
            handleFavSortFilter();
            handleClose();
          }}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default PurchasedCont;
