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
import { Input } from "@mui/material";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import { Get, Patch, Post } from "../../../services/user.services";

const RecentActivity = ({
  closeRecentActivity,
  recentActivityValues,
  handleCloseRecentActivity,
  setActive,
  active,
}) => {
  // const [active, setActive] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");
  const [filterName, setFilterName] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "braodcast",
  });

  const handleClose = (values) => {
    if (values === false) {
      setActive("");
      recentActivityValues({
        field: "",
        values: "",
        type: "braodcast",
      });
    }
    handleCloseRecentActivity();
  };

  const [selectedCategories, setSelectedCategories] = useState(null);

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "recentactivity" });
    setActive(values);
    if (field === "category") {
      setSelectedCategories(values == selectedCategories ? null : values);
      // setSelectedCategories((prev) =>
      //   prev.includes(values)
      //     ? prev.filter((item) => item !== values)
      //     : [...prev, values]
      // );
    }
  };
  const handleFilter = () => {
    recentActivityValues(filterSort);
    handleCloseRecentActivity();
  };

  async function fetch() {
    const category = await Get("mediaHouse/getCategoryType?type=content");
    console.log("category ---> --->", category?.data?.data);

    if (category) {
      console.log("category ---> --->", category?.data?.data);
      // categoryData: category?.data?.data,
      setCategoryData(category?.data?.data);
    }
  }

  const handleGetdatalocation = async (locationValue) => {
    try {
      console.log("all location value ------>", locationValue);
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
    handleClickTime("location", address || locationValue);
    // handleClick("location", address);
  }, [address]);

  useEffect(() => {
    fetch();
  }, []);

  console.log("dfgedfgdfg7887 --->", categoryData);

  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
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

        {/* newly added */}
        <div className="sort_list">
          <div
            className={`sort_item ${
              active === "most_viewed" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "most_viewed")}
          >
            {/* <img src={calendaric} className="icn" alt="Most Viewed" /> */}
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.32443 8.12926L2.32409 8.1296C1.98542 8.47517 1.71616 8.88621 1.53225 9.33949C1.34834 9.79279 1.25354 10.2791 1.25354 10.7705C1.25354 11.2618 1.34834 11.7481 1.53225 12.2014C1.71616 12.6547 1.98542 13.0657 2.32409 13.4113L2.32443 13.4116L5.50265 16.6607L5.50298 16.661C5.84099 17.0073 6.24187 17.2813 6.68237 17.4681C7.12285 17.6549 7.59464 17.7508 8.07083 17.7508C8.54702 17.7508 9.01881 17.6549 9.45929 17.4681C9.89979 17.2813 10.3007 17.0073 10.6387 16.661L10.639 16.6607L16.6372 10.5288L16.6384 10.5276C16.9772 10.1836 17.2464 9.77369 17.4301 9.32137C17.6138 8.86904 17.708 8.38359 17.7071 7.8932V7.89231V3.69483C17.7071 2.95225 17.4185 2.24226 16.9081 1.72047C16.398 1.19905 15.7086 0.908203 14.9922 0.908203H10.8872C9.92751 0.912091 9.0057 1.30229 8.32212 1.99788C8.32203 1.99797 8.32194 1.99806 8.32185 1.99815L2.32443 8.12926ZM14.6619 6.68742C14.3528 6.89853 13.9882 7.01193 13.6143 7.01193C13.1127 7.01193 12.6339 6.80811 12.2826 6.44901C11.9317 6.09028 11.7365 5.60604 11.7365 5.10338C11.7365 4.72832 11.8452 4.36082 12.0502 4.04727C12.2552 3.73361 12.5477 3.48744 12.8921 3.34162C13.2366 3.19575 13.6163 3.1574 13.9828 3.23192C14.3492 3.30642 14.6842 3.49003 14.9461 3.75775C15.2078 4.02534 15.3849 4.36496 15.4565 4.73309C15.5281 5.10116 15.4915 5.48279 15.3507 5.83017C15.2099 6.17764 14.9708 6.4764 14.6619 6.68742Z"
                stroke="black"
              />
            </svg>

            <p className="sort_txt">Relevance</p>
          </div>
        </div>
        <div className="sort_list">
          <div
            className={`sort_item ${active === "Latest" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "Latest")}
          >
            {/* <img src={calendaric} className="icn" alt="Most Popular" /> */}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.214512 8.24078C0.214512 8.24078 0.214355 8.24027 0.214238 8.23977L0.187988 8.1709L0.214512 8.24078Z"
                fill="black"
              />
              <path
                d="M0.373291 6.69195L0.809932 6.4068C0.810166 6.4068 0.8104 6.40652 0.810674 6.40625L0.373291 6.69195Z"
                fill="black"
              />
              <path
                d="M18.4641 10.483C18.4427 10.427 18.432 10.3678 18.432 10.3086C18.432 10.2492 18.4427 10.1898 18.4642 10.1331L19.1232 8.40364L19.1851 8.24067C19.2531 8.06238 19.286 7.87645 19.286 7.69356C19.2862 7.18629 19.0337 6.69684 18.5893 6.40633L18.3706 6.26352L16.8925 5.29836C16.7921 5.23258 16.7188 5.13133 16.6874 5.01528L16.1582 3.06031C15.9756 2.38727 15.366 1.92457 14.6747 1.92457C14.6485 1.92457 14.6225 1.92508 14.5964 1.9266L12.5814 2.02735V2.02711L12.5512 2.02789C12.438 2.02789 12.329 1.98961 12.2413 1.91899L10.766 0.730705L10.6646 0.649103C10.3838 0.422345 10.0407 0.308361 9.69998 0.308595C9.35936 0.308088 9.01623 0.422345 8.73525 0.649103L8.73565 0.64883L7.32139 1.78789L7.15893 1.91875C7.0708 1.98965 6.96139 2.02793 6.84877 2.02793L6.82248 2.02735L4.80861 1.92688L4.80732 1.9266C4.77607 1.92481 4.74865 1.92457 4.72522 1.92457C4.03377 1.92457 3.42432 2.38723 3.2417 3.06031L2.71244 5.01528C2.68096 5.1318 2.60725 5.23332 2.50627 5.29938L2.36049 5.39453L0.809942 6.40684C0.365762 6.69762 0.113535 7.18676 0.11377 7.69379C0.11377 7.87641 0.146543 8.06156 0.214278 8.23961L0.935567 10.1331L0.935684 10.1333C0.95709 10.1895 0.96795 10.2491 0.96795 10.3086C0.96795 10.368 0.957246 10.4274 0.935684 10.4836L0.214551 12.3765L0.214668 12.3763C0.146699 12.5546 0.11377 12.7403 0.11377 12.9231C0.113535 13.4304 0.365762 13.9201 0.810567 14.2109L2.06908 15.0327L2.50662 15.3183C2.60752 15.3841 2.68096 15.4851 2.71244 15.6019L3.2417 17.5566C3.42416 18.2297 4.03389 18.6924 4.72522 18.6926C4.74865 18.6924 4.7742 18.6921 4.80147 18.6906L4.74357 18.6936L6.83104 18.5893H6.83002L6.84955 18.5891C6.9615 18.5891 7.07057 18.6273 7.15854 18.6982L8.73553 19.9686H8.73565C9.01631 20.1949 9.35924 20.3089 9.69998 20.3086C10.0406 20.3089 10.3837 20.1949 10.6645 19.9684L12.377 18.5888L12.2416 18.698C12.3296 18.6271 12.4384 18.5891 12.5505 18.5891L12.5739 18.5896L14.6125 18.6913L14.6023 18.6909C14.6245 18.6919 14.6486 18.6924 14.6747 18.6926C15.3658 18.6924 15.9758 18.23 16.1583 17.5566L16.6875 15.6019C16.719 15.4851 16.7923 15.3844 16.893 15.3186L18.5903 14.2104C19.0342 13.9196 19.2863 13.4304 19.2861 12.9234C19.2861 12.7405 19.2532 12.5545 19.1851 12.376L18.4641 10.483ZM17.4882 9.76125C17.421 9.9375 17.3873 10.1232 17.3873 10.3086C17.3873 10.4943 17.421 10.68 17.4882 10.8562L18.2088 12.7484L18.209 12.7487C18.231 12.8066 18.2414 12.8652 18.2414 12.9234C18.2411 13.0861 18.1608 13.2432 18.0181 13.3363L16.3224 14.4435H16.3225C16.0066 14.6496 15.7776 14.9648 15.679 15.3291L15.1497 17.2838C15.0917 17.4995 14.8953 17.648 14.6747 17.6477L14.6454 17.6469L14.638 17.6467L12.6273 17.5464H12.6287C12.604 17.5449 12.5778 17.5444 12.5505 17.5441C12.2001 17.5441 11.8596 17.664 11.5858 17.8846L11.4503 17.9941L10.009 19.155C9.91822 19.2282 9.81033 19.2639 9.70002 19.2639C9.58986 19.2639 9.48182 19.2282 9.39092 19.155L7.81404 17.8846C7.54037 17.6643 7.20002 17.5444 6.84959 17.5444C6.82611 17.5444 6.79869 17.5447 6.76732 17.5464V17.5467L4.75014 17.6475L4.75076 17.6472L4.72529 17.6477C4.5049 17.648 4.30826 17.4995 4.25025 17.2838L3.72104 15.3291C3.62244 14.9649 3.39342 14.6496 3.07752 14.4436L1.81924 13.622L1.38197 13.3364C1.23939 13.2435 1.15881 13.0862 1.15854 12.9232C1.15865 12.8647 1.16889 12.8061 1.1908 12.7487L1.91193 10.856L1.91182 10.8563C1.979 10.6798 2.01268 10.4943 2.01268 10.3086C2.01268 10.123 1.97916 9.93731 1.91182 9.76106L1.2174 7.93867L1.19088 7.8693C1.16881 7.81113 1.15861 7.75223 1.15846 7.69383C1.15873 7.53086 1.2392 7.37399 1.38174 7.28117L3.0776 6.17403L3.07787 6.17375C3.39357 5.96719 3.6224 5.65219 3.721 5.2882L4.25022 3.33324C4.30811 3.11774 4.50502 2.96903 4.72525 2.9693L4.7449 2.96953L6.77264 3.07078L6.77482 3.07106C6.79943 3.07207 6.8242 3.07262 6.84881 3.07285C7.19912 3.07285 7.53975 2.9532 7.81369 2.73285L9.39127 1.46219C9.48193 1.38899 9.58971 1.35352 9.70002 1.35328C9.81021 1.35328 9.91811 1.38899 10.0089 1.46219L9.90725 1.38031L11.5861 2.73258C11.8604 2.95344 12.2014 3.07258 12.5512 3.07258C12.5772 3.07258 12.6006 3.0718 12.6212 3.07129H12.6158L14.6499 2.96977H14.6513L14.6748 2.96926C14.8951 2.96899 15.0919 3.1177 15.1498 3.3332L15.679 5.28817C15.7776 5.65211 16.0063 5.96711 16.3221 6.17371L18.2369 7.42395L18.0181 7.28113C18.1608 7.37399 18.2411 7.53082 18.2414 7.69356C18.2414 7.75199 18.231 7.81067 18.2088 7.86903L17.3951 10.0051L17.4882 9.76125Z"
                fill="black"
              />
              <path
                d="M7.36206 9.14861L6.82362 9.25443C6.7953 9.26029 6.77976 9.28275 6.78538 9.31158L7.18593 11.3497L7.16261 11.3545L5.61854 9.54111C5.59304 9.51154 5.5619 9.5026 5.52851 9.50924L4.95679 9.62174C4.92847 9.62736 4.91292 9.64979 4.91905 9.67857L5.5369 12.8211C5.54237 12.8499 5.56522 12.8654 5.59354 12.8598L6.13194 12.754C6.16026 12.7481 6.17581 12.7254 6.17034 12.6966L5.77026 10.6633L5.79409 10.6587L7.34147 12.4665C7.36698 12.4961 7.39374 12.5056 7.43202 12.4984L7.99878 12.3867C8.02706 12.3811 8.04261 12.3584 8.03651 12.3296L7.41878 9.18682C7.41319 9.15807 7.39038 9.14303 7.36206 9.14861Z"
                fill="black"
              />
              <path
                d="M10.6713 11.2326L9.27552 11.5071C9.25665 11.5112 9.24505 11.5035 9.24173 11.4844L9.10951 10.8128C9.10552 10.7939 9.11333 10.7827 9.1322 10.7787L10.2946 10.5501C10.3229 10.5445 10.3385 10.5221 10.333 10.4935L10.2335 9.98877C10.2279 9.96049 10.2051 9.9449 10.1768 9.95025L9.01451 10.179C8.9956 10.1826 8.98388 10.1747 8.98009 10.1558L8.85384 9.51311C8.85001 9.49397 8.85779 9.48248 8.87665 9.47893L10.2724 9.20447C10.3007 9.19885 10.3163 9.17615 10.3101 9.1476L10.2101 8.6383C10.2045 8.60947 10.1818 8.59416 10.1534 8.59978L8.07712 9.00814C8.04818 9.01377 8.03314 9.03646 8.03876 9.06525L8.65662 12.208C8.66271 12.2366 8.6849 12.2519 8.71384 12.2463L10.7901 11.8379C10.8185 11.8323 10.8341 11.8096 10.828 11.781L10.7279 11.2714C10.7224 11.2428 10.6996 11.227 10.6713 11.2326Z"
                fill="black"
              />
              <path
                d="M14.4351 7.7573L13.8255 7.87714C13.7922 7.88355 13.7761 7.90191 13.7777 7.93632L13.73 10.0571L13.7199 10.0589L12.7494 8.13855C12.7338 8.11124 12.711 8.09621 12.6826 8.10183L12.2682 8.1832C12.2354 8.18984 12.2199 8.21226 12.2159 8.24339L12.0631 10.3848L12.0537 10.3868L11.1869 8.44539C11.1769 8.41734 11.1541 8.40257 11.1208 8.40917L10.5063 8.52956C10.473 8.53621 10.4674 8.55714 10.478 8.58492L11.9337 11.5627C11.9492 11.5894 11.972 11.605 12.0004 11.5994L12.4766 11.5055C12.5099 11.4991 12.5254 11.4762 12.5292 11.4458L12.6999 9.32023L12.7093 9.31847L13.6672 11.2219C13.6822 11.2487 13.7051 11.2643 13.7383 11.2576L14.2145 11.1637C14.2478 11.1576 14.2678 11.1337 14.2673 11.1038L14.4823 7.79734C14.4812 7.76749 14.4684 7.75066 14.4351 7.7573Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Latest content</p>
          </div>
        </div>
        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${
              active === "lowest_priced" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "lowest_priced")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.57574 18.4829C4.81005 18.7172 5.18995 18.7172 5.42426 18.4829L9.24264 14.6645C9.47696 14.4302 9.47696 14.0503 9.24264 13.816C9.00833 13.5816 8.62843 13.5816 8.39411 13.816L5 17.2101L1.60589 13.816C1.37157 13.5816 0.991675 13.5816 0.75736 13.816C0.523045 14.0503 0.523045 14.4302 0.75736 14.6645L4.57574 18.4829ZM4.4 0.558594L4.4 18.0586L5.6 18.0586L5.6 0.558594L4.4 0.558594Z"
                fill="black"
              />
              <line
                x1="7.91663"
                y1="2.87559"
                x2="10.8333"
                y2="2.87559"
                stroke="black"
                stroke-width="1.2"
              />
              <line
                x1="7.91663"
                y1="6.76426"
                x2="13.75"
                y2="6.76426"
                stroke="black"
                stroke-width="1.2"
              />
              <line
                x1="7.91663"
                y1="10.6529"
                x2="16.6666"
                y2="10.6529"
                stroke="black"
                stroke-width="1.2"
              />
            </svg>

            <p className="sort_txt">Lowest priced content</p>
          </div>
        </div>
        {/* <div className="sort_list">
          <div className="sort_item">
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
          </div>
        </div> */}

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${
              active === "highest_priced" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "highest_priced")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.42426 1.13226C5.18995 0.897945 4.81005 0.897945 4.57574 1.13226L0.75736 4.95064C0.523045 5.18495 0.523045 5.56485 0.75736 5.79916C0.991675 6.03348 1.37157 6.03348 1.60589 5.79916L5 2.40505L8.39411 5.79916C8.62843 6.03348 9.00833 6.03348 9.24264 5.79916C9.47696 5.56485 9.47696 5.18495 9.24264 4.95064L5.42426 1.13226ZM5.6 19.0615L5.6 1.55652L4.4 1.55652L4.4 19.0615L5.6 19.0615Z"
                fill="black"
              />
              <line
                x1="7.91748"
                y1="8.73691"
                x2="10.835"
                y2="8.73691"
                stroke="black"
                stroke-width="1.2"
              />
              <line
                x1="7.91748"
                y1="12.6266"
                x2="13.7525"
                y2="12.6266"
                stroke="black"
                stroke-width="1.2"
              />
              <line
                x1="7.91748"
                y1="16.5162"
                x2="16.67"
                y2="16.5162"
                stroke="black"
                stroke-width="1.2"
              />
            </svg>

            <p className="sort_txt">Highest priced content</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${
              active === "most_viewed_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "most_viewed_content")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
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
                d="M11.3386 1.74094C11.466 1.89686 11.6924 1.93492 11.8659 1.8294L12.5648 1.40442L15.282 3.78029C15.5928 3.67972 15.9138 3.62619 16.2263 3.62619C16.354 3.62619 16.4803 3.6351 16.6024 3.65273C16.8005 3.68158 16.9891 3.7265 17.1712 3.78133L13.5392 0.783333C13.1768 0.40562 12.605 0.302702 12.129 0.529486L11.2023 1.17364C11.1479 1.21144 11.112 1.26944 11.1029 1.33378C11.0935 1.39834 11.112 1.46372 11.1535 1.51438L11.3386 1.74094Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Most viewed content</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${active === "images" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "images")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5698 16.4945H0.83412C0.457578 16.4945 0.151978 16.1896 0.151978 15.8123V6.26233C0.151978 5.88579 0.457578 5.58019 0.83412 5.58019C1.21066 5.58019 1.51626 5.88579 1.51626 6.26233V15.1302H17.8877V4.2159H14.477C14.2955 4.2159 14.1223 4.14428 13.9947 4.01604L11.466 1.48733H7.93796L5.40925 4.01604C5.28169 4.14428 5.10775 4.2159 4.92698 4.2159H0.83412C0.457578 4.2159 0.151978 3.9103 0.151978 3.53376C0.151978 3.15722 0.457578 2.85162 0.83412 2.85162H4.64457L7.17327 0.322915C7.30083 0.194672 7.47478 0.123047 7.65555 0.123047H11.7484C11.9299 0.123047 12.1031 0.194672 12.2307 0.322915L14.7594 2.85162H18.5698C18.9471 2.85162 19.252 3.15722 19.252 3.53376V15.8123C19.252 16.1896 18.9471 16.4945 18.5698 16.4945Z"
                fill="black"
              />
              <path
                d="M9.70162 13.7638C7.44441 13.7638 5.60876 11.9282 5.60876 9.67098C5.60876 7.41377 7.44441 5.57812 9.70162 5.57812C11.9588 5.57812 13.7945 7.41377 13.7945 9.67098C13.7945 11.9282 11.9588 13.7638 9.70162 13.7638ZM9.70162 6.94241C8.19681 6.94241 6.97305 8.16618 6.97305 9.67098C6.97305 11.1758 8.19681 12.3996 9.70162 12.3996C11.2064 12.3996 12.4302 11.1758 12.4302 9.67098C12.4302 8.16618 11.2064 6.94241 9.70162 6.94241Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Images</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${active === "videos" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "videos")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="20"
              height="13"
              viewBox="0 0 20 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7737 2.15234L13.8597 4.79834V7.82234L18.7737 10.4683V2.15234Z"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M13.8595 10.4667C13.8595 11.3017 13.1825 11.9787 12.3475 11.9787H2.14152C1.30651 11.9787 0.629517 11.3017 0.629517 10.4667V2.15067C0.629517 1.31567 1.30651 0.638672 2.14152 0.638672H12.3475C13.1825 0.638672 13.8595 1.31567 13.8595 2.15067V10.4667Z"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>

            <p className="sort_txt">Videos</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${active === "recordings" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "recordings")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="13"
              height="21"
              viewBox="0 0 13 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.49993 13.0508C4.81829 13.0508 3.44836 11.7461 3.44836 10.1445V3.21484C3.44836 1.61328 4.81829 0.308594 6.49993 0.308594C8.18157 0.308594 9.55149 1.61328 9.55149 3.21484V10.1445C9.55149 11.7461 8.18157 13.0508 6.49993 13.0508ZM6.49993 1.13281C5.29407 1.13281 4.31379 2.06641 4.31379 3.21484V10.1445C4.31379 11.293 5.29407 12.2266 6.49993 12.2266C7.70579 12.2266 8.68606 11.293 8.68606 10.1445V3.21484C8.68606 2.06641 7.70579 1.13281 6.49993 1.13281Z"
                fill="black"
              />
              <path
                d="M6.49995 15.543C3.26382 15.543 0.630615 13.0352 0.630615 9.95312C0.630615 9.72656 0.823389 9.54297 1.06128 9.54297C1.29917 9.54297 1.49194 9.72656 1.49194 9.95312C1.49194 12.582 3.7355 14.7188 6.49585 14.7188C9.2562 14.7188 11.4998 12.582 11.4998 9.95312C11.4998 9.72656 11.6925 9.54297 11.9304 9.54297C12.1683 9.54297 12.3611 9.72656 12.3611 9.95312C12.3693 13.0352 9.73608 15.543 6.49995 15.543Z"
                fill="black"
              />
              <path
                d="M6.5 20.3086C6.26211 20.3086 6.06934 20.125 6.06934 19.8984V15.1328C6.06934 14.9062 6.26211 14.7227 6.5 14.7227C6.73789 14.7227 6.93066 14.9062 6.93066 15.1328V19.8984C6.93066 20.125 6.73789 20.3086 6.5 20.3086Z"
                fill="black"
              />
              <path
                d="M9.40793 20.3086H3.59192C3.35403 20.3086 3.16125 20.125 3.16125 19.8984C3.16125 19.6719 3.35403 19.4883 3.59192 19.4883H9.40383C9.64172 19.4883 9.8345 19.6719 9.8345 19.8984C9.8386 20.125 9.64583 20.3086 9.40793 20.3086Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Recordings</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div
            className={`sort_item ${active === "scans" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("filter", "scans")}
          >
            {/* <img src={calendaric} className="icn" alt="Lowest Priced" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0938 11.8216C18.4031 11.8216 18.658 12.0544 18.6928 12.3544L18.6969 12.4247V14.8745C18.6969 16.4754 17.4332 17.7812 15.8489 17.8488L15.7198 17.8516H3.57937C1.97889 17.8516 0.673473 16.5883 0.605875 15.0044L0.603125 14.8753V12.4269C0.603125 12.0938 0.873153 11.8238 1.20625 11.8238C1.51555 11.8238 1.77048 12.0566 1.80532 12.3566L1.80937 12.4269V14.8753C1.80937 15.8179 2.54624 16.5885 3.47537 16.6423L3.57937 16.6453H15.7198C16.6629 16.6453 17.4338 15.9081 17.4876 14.9785L17.4906 14.8745V12.4247C17.4906 12.0916 17.7607 11.8216 18.0938 11.8216ZM18.6969 8.20156C19.03 8.20156 19.3 8.47159 19.3 8.80469C19.3 9.13778 19.03 9.40781 18.6969 9.40781H0.603125C0.270028 9.40781 0 9.13778 0 8.80469C0 8.47159 0.270028 8.20156 0.603125 8.20156H18.6969ZM15.7164 -0.242188C17.3191 -0.242188 18.6264 1.02292 18.6941 2.60902L18.6969 2.7383V5.18868C18.6969 5.52178 18.4268 5.7918 18.0938 5.7918C17.7844 5.7918 17.5295 5.55897 17.4947 5.25902L17.4906 5.18868V2.7383C17.4906 1.79341 16.752 1.02104 15.8206 0.967074L15.7164 0.964062H3.58198C2.63796 0.964062 1.8663 1.70201 1.81238 2.63252L1.80937 2.73667V5.18506C1.80937 5.51816 1.53935 5.78819 1.20625 5.78819C0.896946 5.78819 0.642022 5.55536 0.607183 5.2554L0.603125 5.18506V2.73667C0.603125 1.13479 1.86753 -0.171778 3.45277 -0.239435L3.58198 -0.242188H15.7164Z"
                fill="black"
              />
            </svg>

            <p className="sort_txt">Scans</p>
          </div>
        </div>

        <div className="sort_list sort_cnt">
          <div className="sort_item" style={{ cursor: "pointer" }}>
            {/* <img src={calendaric} className="icn" alt="yearly" /> */}
            <svg
              width="20"
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

            <div className="d-flex gap-3 align-items-center select-font">
              <p className="sort_txt">Price</p>
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
        </div>

        <div className="sort_list sort_cnt">
          <div className="sort_item" style={{ cursor: "pointer" }}>
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

            <div className="d-flex gap-3 align-items-center select-font">
              <p className="sort_txt">Location search</p>
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
        </div>

        <div className="srt_sub_hdng mt-3">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div>
        <div className="sort_list">
          {/* <div className="sort_item">
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
          </div> */}
          {/* <div className="sort_item">
            <img src={scanic} className="icn" alt="Scans" />
            <p className="sort_txt">scans</p>
          </div> */}
          {/* <div className="sort_item">
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
          </div> */}
          {/* <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={locationic} className="icn" alt="Scans" />
                <p className="sort_txt">Location</p>
              </div>
              <div className="fltr_srch">
                <input type="text" className="srch_inp" placeholder="Search" />
                <img src={srchic} className="srch_icn" alt="search" />
              </div>
            </div>
          </div> */}

          {/* <div className="sort_item">
            <img src={favouritic} className="icn" alt="favourited" />
            <p className="sort_txt">Favourited content</p>
          </div>
          <div className="sort_item">
            <img src={paymentic} className="icn" alt="Under offer" />
            <p className="sort_txt">Content under offer</p>
          </div> */}

          {/* previous */}
          {/* <div
            className={`sort_item ${active === "exclusive" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "exclusive")}
          >
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div
            className={`sort_item ${active === "shared" ? "active" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "shared")}
          >
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div> */}

          {/* new content added */}

          <div
            className={`sort_item ${
              active === "favourited_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "favourited_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Sourced Tasks" /> */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.126 20.2836L11.276 18.5966C10.9805 18.425 10.4086 18.425 10.1227 18.5966L7.26322 20.2836C5.57612 21.2845 4.58483 20.8841 4.13685 20.5601C3.69839 20.236 3.01211 19.4067 3.4601 17.5004L4.13685 14.5742C4.2131 14.2692 4.06059 13.745 3.83183 13.5162L1.46799 11.1524C0.286073 9.97044 0.381389 8.96009 0.543427 8.46444C0.705464 7.9688 1.22017 7.09189 2.85961 6.81547L5.90019 6.3103C6.18614 6.26264 6.596 5.95763 6.71991 5.70027L8.40701 2.33561C9.16954 0.801024 10.1704 0.572266 10.6946 0.572266C11.2188 0.572266 12.2197 0.801024 12.9822 2.33561L14.6597 5.69074C14.7932 5.9481 15.2031 6.25311 15.489 6.30077L18.5296 6.80594C20.1786 7.08236 20.6933 7.95927 20.8458 8.45491C20.9983 8.95056 21.0936 9.96091 19.9212 11.1428L17.5574 13.5162C17.3286 13.745 17.1856 14.2597 17.2523 14.5742L17.9291 17.5004C18.3675 19.4067 17.6908 20.236 17.2523 20.5601C17.0141 20.7316 16.6328 20.9223 16.0895 20.9223C15.5843 20.9223 14.9362 20.7602 14.126 20.2836ZM12.0004 17.367L14.8504 19.0541C15.6796 19.5497 16.2039 19.5497 16.404 19.4067C16.6042 19.2638 16.7472 18.7586 16.5375 17.8245L15.8607 14.8983C15.6796 14.1072 15.9751 13.0873 16.547 12.5058L18.9109 10.142C19.3779 9.67496 19.5876 9.21744 19.4923 8.9029C19.3874 8.58836 18.949 8.331 18.3008 8.22615L15.2602 7.72098C14.5263 7.59707 13.7257 7.00611 13.392 6.33889L11.7145 2.98376C11.4095 2.37374 11.0282 2.01154 10.6946 2.01154C10.361 2.01154 9.97973 2.37374 9.68425 2.98376L7.99715 6.33889C7.66354 7.00611 6.86289 7.59707 6.12895 7.72098L3.0979 8.22615C2.44975 8.331 2.0113 8.58836 1.90645 8.9029C1.8016 9.21744 2.02083 9.68449 2.48788 10.142L4.85172 12.5058C5.42361 13.0777 5.71909 14.1072 5.53799 14.8983L4.86125 17.8245C4.64202 18.7681 4.79453 19.2638 4.99469 19.4067C5.19486 19.5497 5.70956 19.5402 6.54834 19.0541L9.3983 17.367C9.7605 17.1477 10.2275 17.0334 10.6946 17.0334C11.1616 17.0334 11.6287 17.1477 12.0004 17.367Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Favourited Content</p>
          </div>

          <div
            className={`sort_item ${
              active === "content_under_offer" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleClickTime("contentType", "content_under_offer")
            }
          >
            {/* <img src={exclusiveic} className="icn" alt="Celebrity" /> */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.28867 10.7523C1.28867 5.45906 5.5955 1.15195 10.8887 1.15195C16.1822 1.15195 20.489 5.45907 20.489 10.7523C20.489 16.0454 16.1822 20.352 10.8887 20.352C5.59546 20.352 1.28867 16.0455 1.28867 10.7523ZM2.06631 10.7522C2.06631 15.6172 6.0237 19.5746 10.8887 19.5746C15.7539 19.5746 19.7117 15.6172 19.7116 10.7522C19.7116 5.88666 15.754 1.92927 10.8887 1.92927C6.02363 1.92927 2.06631 5.88663 2.06631 10.7522Z"
                stroke="black"
                stroke-width="0.8"
              />
              <path
                d="M12.2184 6.42189C13.0052 6.42189 13.2211 6.99262 13.4369 7.67199L14.1777 6.73093C13.9308 5.74311 13.2518 5.15723 11.8942 5.15723C9.56398 5.15723 9.28651 6.85423 9.28651 8.33504V9.94031H8.1444L7.83599 11.2366H9.20902C9.03932 12.9804 8.59189 14.6153 7.38818 16.0507H14.0392V14.4459H10.2888C10.7673 13.35 10.9531 12.3937 11.0301 11.2365H13.6066L13.9154 9.9402H11.0915V8.64392C11.0915 7.44064 11.1535 6.42189 12.2184 6.42189Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Content under offer</p>
          </div>

          <div
            className={`sort_item ${
              active === "content_ourced_from_Tasks" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleClickTime("contentType", "content_ourced_from_Tasks")
            }
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7312 1.44445L18.0592 4.25451C19.8825 5.05892 19.8825 6.38887 18.0592 7.19328L11.7312 10.0033C11.0126 10.3251 9.8328 10.3251 9.1142 10.0033L2.78619 7.19328C0.96287 6.38887 0.96287 5.05892 2.78619 4.25451L9.1142 1.44445C9.8328 1.12268 11.0126 1.12268 11.7312 1.44445Z"
                stroke="black"
                stroke-width="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.994873 10.1104C0.994873 11.0113 1.67058 12.0517 2.49643 12.4163L9.779 15.6554C10.3367 15.9021 10.9695 15.9021 11.5165 15.6554L18.7991 12.4163C19.625 12.0517 20.3007 11.0113 20.3007 10.1104"
                stroke="black"
                stroke-width="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.994873 15.4727C0.994873 16.4701 1.58477 17.3711 2.49643 17.7786L9.779 21.0177C10.3367 21.2644 10.9695 21.2644 11.5165 21.0177L18.7991 17.7786C19.7108 17.3711 20.3007 16.4701 20.3007 15.4727"
                stroke="black"
                stroke-width="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="sort_txt">Content Sourced from Tasks</p>
          </div>

          <div
            className={`sort_item ${
              active === "exclusive_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "exclusive_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Political" /> */}
            <svg
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.26548 2.30322V10.797C1.26548 12.8695 3.24711 14.5612 5.67486 14.5612H16.0499C18.7266 14.5612 20.4593 13.0821 20.4593 10.797V2.30322C20.4593 2.09066 20.4281 1.96666 20.397 1.89581C20.314 1.93123 20.1895 2.00209 20.0131 2.15266L17.326 4.44659C16.6413 5.03115 15.4378 5.03115 14.7634 4.44659L11.0387 1.26696C10.935 1.1784 10.769 1.1784 10.6756 1.26696L6.96137 4.43774C6.27661 5.02229 5.07311 5.02229 4.39874 4.43774L1.71161 2.1438C1.53523 1.99323 1.40036 1.92238 1.32773 1.88695C1.29661 1.9578 1.26548 2.09066 1.26548 2.30322Z"
                stroke="black"
              />
            </svg>
            <p className="sort_txt">Exclusive content</p>
          </div>

          <div
            className={`sort_item ${
              active === "shared_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "shared_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Crime" /> */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1444 11.2526C17.9157 9.09906 16.7532 7.14565 14.9618 5.9069C14.6378 5.67821 14.5616 5.23988 14.7808 4.9159C15.0094 4.59192 15.4573 4.51569 15.7718 4.73485C17.9062 6.21183 19.2784 8.53686 19.5547 11.1001C19.5928 11.4908 19.3165 11.8434 18.9163 11.891C18.9067 11.891 18.8782 11.891 18.8591 11.891C18.497 11.891 18.1921 11.6147 18.1444 11.2526Z"
                fill="black"
              />
              <path
                d="M2.46069 11.9391C2.07001 11.8915 1.78414 11.5389 1.82226 11.1482C2.07954 8.58497 3.44216 6.26946 5.54804 4.77343C5.87202 4.54473 6.31987 4.62097 6.54856 4.94495C6.77726 5.26893 6.70103 5.71678 6.37705 5.94548C4.60468 7.19375 3.46122 9.14717 3.24206 11.3007C3.21347 11.6628 2.89902 11.9391 2.53692 11.9391C2.50833 11.9391 2.48928 11.9391 2.46069 11.9391Z"
                fill="black"
              />
              <path
                d="M6.69162 20.0293C6.33905 19.8482 6.19612 19.4194 6.37716 19.0669C6.55821 18.7143 6.98701 18.5714 7.33958 18.7524C9.39781 19.7911 11.8753 19.8101 13.9526 18.8096C14.3052 18.6381 14.734 18.7905 14.9055 19.1431C15.077 19.4957 14.9245 19.9245 14.572 20.096C13.3523 20.6868 12.0564 20.9822 10.7033 20.9822C9.29299 20.9822 7.94942 20.6582 6.69162 20.0293Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.33936 4.11564C7.33936 2.25751 8.84491 0.751953 10.703 0.751953C12.5612 0.751953 14.0667 2.25751 14.0667 4.11564C14.0667 5.97376 12.5516 7.47932 10.703 7.47932C8.84491 7.47932 7.33936 5.97376 7.33936 4.11564ZM8.76868 4.12516C8.76868 5.1924 9.63581 6.05952 10.703 6.05952C11.7703 6.05952 12.6374 5.1924 12.6374 4.12516C12.6374 3.05793 11.7607 2.19081 10.703 2.19081C9.63581 2.19081 8.76868 3.05793 8.76868 4.12516Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.450928 15.7699C0.450928 13.9213 1.95649 12.4062 3.81461 12.4062C5.67274 12.4062 7.17829 13.9118 7.17829 15.7699C7.17829 17.6185 5.67274 19.1336 3.81461 19.1336C1.95649 19.1336 0.450928 17.6281 0.450928 15.7699ZM1.88025 15.7699C1.88025 16.8372 2.74738 17.7043 3.81461 17.7043C4.88184 17.7043 5.74897 16.8372 5.74897 15.7699C5.74897 14.7027 4.88184 13.8356 3.81461 13.8356C2.74738 13.8356 1.88025 14.7027 1.88025 15.7699Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.1155 15.7699C14.1155 13.9213 15.621 12.4062 17.4792 12.4062C19.3373 12.4062 20.8428 13.9118 20.8428 15.7699C20.8333 17.6185 19.3278 19.1336 17.4792 19.1336C15.621 19.1336 14.1155 17.6281 14.1155 15.7699ZM15.5448 15.7699C15.5448 16.8372 16.4119 17.7043 17.4792 17.7043C18.5464 17.7043 19.4135 16.8372 19.4135 15.7699C19.404 14.7027 18.5464 13.8356 17.4792 13.8356C16.4119 13.8356 15.5448 14.7027 15.5448 15.7699Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Shared content</p>
          </div>

          <div
            className={`sort_item ${
              active === "latest_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "latest_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Business" /> */}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.914707 8.68414C0.914707 8.68414 0.914551 8.68363 0.914434 8.68313L0.888184 8.61426L0.914707 8.68414Z"
                fill="black"
              />
              <path
                d="M1.07349 7.13531L1.51013 6.85016C1.51036 6.85016 1.5106 6.84988 1.51087 6.84961L1.07349 7.13531Z"
                fill="black"
              />
              <path
                d="M19.1643 10.9264C19.1429 10.8703 19.1322 10.8111 19.1322 10.752C19.1322 10.6925 19.1429 10.6331 19.1644 10.5765L19.8234 8.84699L19.8853 8.68403C19.9533 8.50574 19.9862 8.31981 19.9862 8.13692C19.9864 7.62965 19.7339 7.1402 19.2895 6.84969L19.0708 6.70688L17.5927 5.74172C17.4923 5.67594 17.419 5.57469 17.3876 5.45863L16.8584 3.50367C16.6758 2.83063 16.0662 2.36793 15.3749 2.36793C15.3487 2.36793 15.3227 2.36844 15.2966 2.36996L13.2816 2.4707V2.47047L13.2513 2.47125C13.1382 2.47125 13.0292 2.43297 12.9415 2.36235L11.4662 1.17406L11.3647 1.09246C11.084 0.865705 10.7409 0.75172 10.4002 0.751955C10.0596 0.751447 9.71643 0.865705 9.43545 1.09246L9.43584 1.09219L8.02158 2.23125L7.85912 2.36211C7.771 2.43301 7.66158 2.47129 7.54897 2.47129L7.52268 2.4707L5.50881 2.37024L5.50752 2.36996C5.47627 2.36817 5.44885 2.36793 5.42541 2.36793C4.73397 2.36793 4.12451 2.83059 3.9419 3.50367L3.41264 5.45863C3.38115 5.57516 3.30744 5.67668 3.20647 5.74274L3.06068 5.83789L1.51014 6.8502C1.06596 7.14098 0.813731 7.63012 0.813965 8.13715C0.813965 8.31977 0.846738 8.50492 0.914473 8.68297L1.63576 10.5764L1.63588 10.5767C1.65729 10.6328 1.66814 10.6925 1.66814 10.7519C1.66814 10.8114 1.65744 10.8708 1.63588 10.9269L0.914746 12.8199L0.914863 12.8197C0.846895 12.9979 0.813965 13.1836 0.813965 13.3665C0.813731 13.8738 1.06596 14.3635 1.51076 14.6542L2.76928 15.476L3.20682 15.7617C3.30772 15.8275 3.38115 15.9285 3.41264 16.0453L3.9419 18C4.12436 18.673 4.73408 19.1357 5.42541 19.136C5.44885 19.1357 5.4744 19.1355 5.50166 19.1339L5.44377 19.137L7.53123 19.0327H7.53022L7.54975 19.0324C7.6617 19.0324 7.77076 19.0707 7.85873 19.1416L9.43572 20.412H9.43584C9.71651 20.6382 10.0594 20.7522 10.4002 20.752C10.7408 20.7523 11.0838 20.6382 11.3647 20.4118L13.0772 19.0322L12.9418 19.1413C13.0298 19.0704 13.1386 19.0324 13.2506 19.0324L13.2741 19.0329L15.3127 19.1347L15.3025 19.1342C15.3247 19.1352 15.3488 19.1357 15.3749 19.136C16.066 19.1357 16.676 18.6733 16.8585 18L17.3877 16.0453C17.4192 15.9285 17.4925 15.8277 17.5932 15.7619L19.2905 14.6537C19.7344 14.3629 19.9865 13.8738 19.9863 13.3667C19.9863 13.1838 19.9534 12.9979 19.8853 12.8194L19.1643 10.9264ZM18.1884 10.2046C18.1212 10.3809 18.0875 10.5665 18.0875 10.752C18.0875 10.9377 18.1212 11.1233 18.1884 11.2996L18.909 13.1918L18.9092 13.192C18.9312 13.2499 18.9415 13.3086 18.9415 13.3668C18.9413 13.5295 18.861 13.6866 18.7183 13.7797L17.0226 14.8869H17.0227C16.7068 15.0929 16.4778 15.4082 16.3792 15.7724L15.8499 17.7271C15.7919 17.9429 15.5955 18.0913 15.3749 18.0911L15.3456 18.0903L15.3382 18.09L13.3275 17.9898H13.3289C13.3042 17.9883 13.278 17.9878 13.2506 17.9875C12.9003 17.9875 12.5598 18.1074 12.286 18.328L12.1505 18.4374L10.7092 19.5984C10.6184 19.6716 10.5105 19.7073 10.4002 19.7073C10.2901 19.7073 10.182 19.6716 10.0911 19.5984L8.51424 18.328C8.24057 18.1077 7.90022 17.9878 7.54979 17.9878C7.52631 17.9878 7.49889 17.988 7.46752 17.9898V17.9901L5.45033 18.0908L5.45096 18.0906L5.42549 18.0911C5.2051 18.0913 5.00846 17.9429 4.95045 17.7271L4.42123 15.7725C4.32264 15.4082 4.09361 15.093 3.77772 14.8869L2.51943 14.0654L2.08217 13.7797C1.93959 13.6869 1.859 13.5295 1.85873 13.3665C1.85885 13.3081 1.86908 13.2495 1.891 13.1921L2.61213 11.2993L2.61201 11.2996C2.6792 11.1231 2.71287 10.9377 2.71287 10.752C2.71287 10.5663 2.67936 10.3807 2.61201 10.2044L1.9176 8.38203L1.89107 8.31266C1.869 8.25449 1.85881 8.19559 1.85865 8.13719C1.85893 7.97422 1.93939 7.81735 2.08193 7.72453L3.77779 6.61738L3.77807 6.61711C4.09377 6.41055 4.3226 6.09555 4.42119 5.73156L4.95041 3.7766C5.0083 3.5611 5.20522 3.41238 5.42545 3.41266L5.4451 3.41289L7.47283 3.51414L7.47502 3.51442C7.49963 3.51543 7.52439 3.51598 7.549 3.51621C7.89932 3.51621 8.23994 3.39656 8.51389 3.17621L10.0915 1.90555C10.1821 1.83235 10.2899 1.79688 10.4002 1.79664C10.5104 1.79664 10.6183 1.83235 10.7091 1.90555L10.6074 1.82367L12.2863 3.17594C12.5606 3.3968 12.9016 3.51594 13.2514 3.51594C13.2774 3.51594 13.3008 3.51516 13.3214 3.51465H13.316L15.3501 3.41313H15.3515L15.375 3.41262C15.5953 3.41235 15.7921 3.56106 15.85 3.77656L16.3792 5.73152C16.4778 6.09547 16.7065 6.41047 17.0223 6.61707L18.9371 7.86731L18.7183 7.72449C18.861 7.81735 18.9413 7.97418 18.9415 8.13692C18.9415 8.19535 18.9312 8.25402 18.909 8.31238L18.0953 10.4484L18.1884 10.2046Z"
                fill="black"
              />
              <path
                d="M8.06226 9.59197L7.52382 9.69779C7.4955 9.70365 7.47995 9.72611 7.48558 9.75494L7.88612 11.793L7.8628 11.7979L6.31874 9.98447C6.29323 9.9549 6.2621 9.94596 6.2287 9.9526L5.65698 10.0651C5.62866 10.0707 5.61311 10.0931 5.61925 10.1219L6.2371 13.2644C6.24257 13.2933 6.26542 13.3088 6.29374 13.3032L6.83214 13.1973C6.86046 13.1915 6.87601 13.1688 6.87054 13.1399L6.47046 11.1067L6.49429 11.1021L8.04167 12.9099C8.06718 12.9395 8.09393 12.9489 8.13222 12.9418L8.69897 12.8301C8.72726 12.8244 8.7428 12.8017 8.73671 12.7729L8.11897 9.63018C8.11339 9.60143 8.09058 9.58639 8.06226 9.59197Z"
                fill="black"
              />
              <path
                d="M11.3715 11.676L9.97572 11.9504C9.95685 11.9545 9.94525 11.9469 9.94193 11.9277L9.8097 11.2562C9.80572 11.2373 9.81353 11.2261 9.8324 11.222L10.9948 10.9935C11.0231 10.9879 11.0386 10.9654 11.0332 10.9369L10.9337 10.4321C10.9281 10.4038 10.9053 10.3883 10.877 10.3936L9.7147 10.6224C9.6958 10.626 9.68408 10.6181 9.68029 10.5992L9.55404 9.95647C9.55021 9.93732 9.55798 9.92584 9.57685 9.92229L10.9726 9.64783C11.0009 9.64221 11.0165 9.61951 11.0103 9.59096L10.9103 9.08166C10.9047 9.05283 10.882 9.03752 10.8536 9.04314L8.77732 9.4515C8.74837 9.45713 8.73333 9.47982 8.73896 9.50861L9.35681 12.6513C9.3629 12.6799 9.38509 12.6952 9.41404 12.6896L11.4903 12.2813C11.5187 12.2756 11.5343 12.2529 11.5282 12.2244L11.4281 11.7148C11.4226 11.6862 11.3998 11.6704 11.3715 11.676Z"
                fill="black"
              />
              <path
                d="M15.1353 8.20066L14.5257 8.3205C14.4924 8.32691 14.4763 8.34527 14.4779 8.37968L14.4302 10.5004L14.4201 10.5022L13.4495 8.58191C13.434 8.5546 13.4112 8.53957 13.3828 8.54519L12.9684 8.62656C12.9356 8.6332 12.9201 8.65562 12.9161 8.68675L12.7633 10.8282L12.7539 10.8302L11.8871 8.88874C11.8771 8.8607 11.8543 8.84593 11.821 8.85253L11.2065 8.97292C11.1732 8.97956 11.1676 9.0005 11.1782 9.02828L12.6339 12.006C12.6494 12.0328 12.6722 12.0484 12.7006 12.0427L13.1768 11.9489C13.2101 11.9425 13.2256 11.9195 13.2294 11.8892L13.4001 9.76359L13.4095 9.76183L14.3674 11.6653C14.3824 11.692 14.4053 11.7076 14.4385 11.701L14.9147 11.6071C14.948 11.601 14.968 11.577 14.9675 11.5471L15.1825 8.2407C15.1813 8.21085 15.1686 8.19402 15.1353 8.20066Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Latest content</p>
          </div>

          <div
            className={`sort_item ${
              active === "celebrity_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "celebrity_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Fashion" /> */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.053 20.1242L11.2708 18.4662C10.9823 18.2975 10.424 18.2975 10.1449 18.4662L7.35339 20.1242C5.7064 21.1078 4.73868 20.7144 4.30135 20.3959C3.87332 20.0774 3.20335 19.2624 3.64069 17.3889L4.30135 14.513C4.37579 14.2132 4.22691 13.698 4.00359 13.4732L1.69594 11.15C0.54212 9.98844 0.63517 8.99547 0.793355 8.50836C0.95154 8.02124 1.45401 7.15942 3.05447 6.88775L6.02277 6.39127C6.30192 6.34443 6.70204 6.04467 6.823 5.79174L8.46999 2.48497C9.21439 0.976776 10.1914 0.751953 10.7032 0.751953C11.215 0.751953 12.192 0.976776 12.9364 2.48497L14.5741 5.78237C14.7044 6.0353 15.1045 6.33506 15.3836 6.3819L18.3519 6.87839C19.9617 7.15005 20.4642 8.01187 20.613 8.49899C20.7619 8.98611 20.855 9.97908 19.7105 11.1407L17.4028 13.4732C17.1795 13.698 17.0399 14.2039 17.105 14.513L17.7657 17.3889C18.1937 19.2624 17.5331 20.0774 17.105 20.3959C16.8724 20.5645 16.5002 20.7519 15.9698 20.7519C15.4767 20.7519 14.8439 20.5926 14.053 20.1242ZM11.978 17.2577L14.7602 18.9158C15.5697 19.4029 16.0815 19.4029 16.2769 19.2624C16.4723 19.1219 16.6119 18.6254 16.4072 17.7074L15.7465 14.8315C15.5697 14.054 15.8582 13.0517 16.4165 12.4802L18.7241 10.1571C19.1801 9.69805 19.3848 9.2484 19.2917 8.93927C19.1894 8.63014 18.7613 8.37721 18.1286 8.27417L15.1603 7.77768C14.4438 7.6559 13.6622 7.07511 13.3365 6.41937L11.6988 3.12196C11.4011 2.52244 11.0289 2.16647 10.7032 2.16647C10.3775 2.16647 10.0053 2.52244 9.71686 3.12196L8.06988 6.41937C7.7442 7.07511 6.96258 7.6559 6.24609 7.77768L3.2871 8.27417C2.65436 8.37721 2.22633 8.63014 2.12397 8.93927C2.02162 9.2484 2.23563 9.70741 2.69158 10.1571L4.99922 12.4802C5.55752 13.0423 5.84598 14.054 5.66918 14.8315L5.00853 17.7074C4.79451 18.6348 4.94339 19.1219 5.1388 19.2624C5.3342 19.4029 5.83667 19.3935 6.65551 18.9158L9.43771 17.2577C9.79131 17.0423 10.2473 16.9299 10.7032 16.9299C11.1591 16.9299 11.6151 17.0423 11.978 17.2577Z"
                fill="black"
              />
              <path
                d="M7.0386 9.96172H7.7036L8.7386 12.8217L9.7686 9.96172H10.4086L9.0486 13.5117H8.3986L7.0386 9.96172ZM10.8532 13.5117V9.96172H11.4632V13.5117H10.8532ZM12.1618 13.5117V9.96172H13.2368C13.6368 9.96172 13.9618 10.0584 14.2118 10.2517C14.4651 10.4451 14.5918 10.7384 14.5918 11.1317C14.5918 11.5051 14.4601 11.7917 14.1968 11.9917C13.9334 12.1917 13.6051 12.2917 13.2118 12.2917C13.0851 12.2917 12.9351 12.2801 12.7618 12.2567V13.5117H12.1618ZM12.7618 10.4917V11.7267C12.9251 11.7501 13.0668 11.7617 13.1868 11.7617C13.4201 11.7617 13.6084 11.7117 13.7518 11.6117C13.8984 11.5117 13.9718 11.3501 13.9718 11.1267C13.9718 10.9101 13.9034 10.7501 13.7668 10.6467C13.6301 10.5434 13.4501 10.4917 13.2268 10.4917H12.7618Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Celebrity content</p>
          </div>

          <div
            className={`sort_item ${
              active === "political_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "political_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Sports" /> */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6555 0.751953C5.30577 0.751953 0.953613 5.10411 0.953613 10.4539C0.953613 15.8036 5.30577 20.1558 10.6555 20.1558C16.0053 20.1558 20.3574 15.8036 20.3574 10.4539C20.3574 5.10411 16.0041 0.751953 10.6555 0.751953ZM2.12355 11.0246H5.47584C5.52606 12.1934 5.71668 13.3427 6.06138 14.4488H3.09031C2.5413 13.4146 2.20459 12.2538 2.12355 11.0246ZM5.47584 9.88316H2.12355C2.20459 8.65387 2.5413 7.49306 3.09031 6.45896H6.05796C5.71439 7.56497 5.52492 8.71436 5.47584 9.88316ZM7.2667 6.45896H13.9964C14.3731 7.56041 14.5922 8.7098 14.6459 9.88316H6.61724C6.66975 8.7098 6.89004 7.56041 7.2667 6.45896ZM6.61724 11.0246H14.647C14.5911 12.1979 14.3719 13.3473 13.9941 14.4488H7.27012C6.89232 13.3473 6.67203 12.1979 6.61724 11.0246ZM15.7884 11.0246H19.1875C19.1064 12.2538 18.7697 13.4146 18.2207 14.4488H15.2029C15.5476 13.3427 15.7382 12.1934 15.7884 11.0246ZM15.7884 9.88316C15.7393 8.71436 15.5498 7.56497 15.2063 6.45896H18.2207C18.7686 7.49306 19.1053 8.65387 19.1875 9.88316H15.7884ZM17.4879 5.31755H14.8011C14.3537 4.22752 13.7556 3.19683 13.0319 2.23577C14.833 2.75739 16.3853 3.85656 17.4879 5.31755ZM11.2924 1.92531C12.2329 2.94915 12.9863 4.09397 13.5433 5.31755H7.71984C8.2757 4.09512 9.02788 2.95143 9.96839 1.9276C10.1955 1.91047 10.4227 1.89335 10.6555 1.89335C10.8701 1.89335 11.0813 1.91047 11.2924 1.92531ZM8.22091 2.25061C7.50297 3.20711 6.90716 4.23322 6.46315 5.31755H3.82195C4.91199 3.8714 6.44375 2.77908 8.22091 2.25061ZM3.82195 15.5902H6.46658C6.91287 16.6756 7.51096 17.7029 8.23232 18.6594C6.4506 18.1332 4.91427 17.0397 3.82195 15.5902ZM9.98209 18.9801C9.03929 17.9563 8.28369 16.8126 7.7244 15.5902H13.5387C12.9794 16.8137 12.2238 17.9586 11.2799 18.9824C11.0733 18.9972 10.8655 19.0144 10.6555 19.0144C10.4272 19.0144 10.2047 18.9972 9.98209 18.9801ZM13.0194 18.6754C13.7453 17.7143 14.3479 16.6813 14.7965 15.5902H17.4879C16.3831 17.0546 14.8262 18.1549 13.0194 18.6754Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Political content</p>
          </div>

          <div
            className={`sort_item ${
              active === "crime_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "crime_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="General" /> */}
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.89591 18.4759C2.80595 18.4759 2.71802 18.4491 2.64327 18.3991C2.56852 18.349 2.51032 18.2779 2.47604 18.1947C1.61628 16.0208 1.63439 13.5979 2.52655 11.4371C3.41871 9.27632 5.11518 7.54644 7.25819 6.61232C7.3672 6.57565 7.48606 6.58169 7.59079 6.62922C7.69552 6.67675 7.77833 6.76223 7.8225 6.86842C7.86667 6.97461 7.86893 7.0936 7.82881 7.20139C7.78869 7.30917 7.70919 7.39773 7.60633 7.4492C5.68257 8.28847 4.15998 9.8421 3.3597 11.7824C2.55942 13.7227 2.54402 15.898 3.31674 17.8494C3.33956 17.9046 3.35125 17.9638 3.35114 18.0235C3.35103 18.0832 3.33912 18.1423 3.31611 18.1974C3.29309 18.2525 3.25941 18.3025 3.21701 18.3446C3.17461 18.3866 3.12432 18.4199 3.06903 18.4424C3.01432 18.4645 2.95491 18.4759 2.89591 18.4759ZM16.8062 15.9433C18.26 15.3971 18.8817 14.0208 18.4704 12.2581C17.8143 9.44336 14.2994 5.62815 9.65692 6.09202C9.5953 6.09488 9.53491 6.11025 9.47942 6.13721C9.42394 6.16416 9.37453 6.20213 9.3342 6.24881C9.29386 6.29548 9.26346 6.34988 9.24484 6.40868C9.22622 6.46749 9.21976 6.52947 9.22587 6.59086C9.23199 6.65224 9.25054 6.71173 9.28039 6.76571C9.31024 6.81969 9.35078 6.86702 9.39952 6.90483C9.44826 6.94263 9.50419 6.97011 9.5639 6.9856C9.62361 7.00108 9.68585 7.00425 9.74682 6.99489C11.48 6.88462 13.1994 7.36571 14.6237 8.35948C16.048 9.35326 17.0929 10.8009 17.5876 12.4657C17.7806 12.9608 17.7738 13.5114 17.5686 14.0016C17.3634 14.4918 16.9759 14.8831 16.4877 15.093C15.6719 15.399 14.7509 14.7238 13.628 13.8085C13.5819 13.7709 13.5287 13.7427 13.4717 13.7256C13.4147 13.7086 13.3548 13.7029 13.2956 13.7089C13.2363 13.7149 13.1789 13.7326 13.1265 13.7608C13.074 13.7891 13.0277 13.8274 12.9901 13.8735C12.9525 13.9197 12.9243 13.9728 12.9072 14.0299C12.8901 14.0869 12.8844 14.1467 12.8905 14.206C12.8965 14.2652 12.9142 14.3227 12.9424 14.3751C12.9707 14.4275 13.009 14.4739 13.0551 14.5115C13.9264 15.2221 14.9728 16.0762 16.0755 16.0762C16.3252 16.0762 16.5728 16.0318 16.8062 15.9433ZM13.1861 20.646C13.2353 20.5364 13.2391 20.4118 13.1966 20.2994C13.1541 20.187 13.0689 20.096 12.9595 20.0463C10.0758 18.7446 8.11993 15.9605 8.10272 14.1786C8.0747 13.9143 8.12891 13.6477 8.25797 13.4152C8.38703 13.1828 8.58464 12.9958 8.82387 12.8798C9.23148 12.7044 9.67887 12.6422 10.1189 12.6998C10.5589 12.7573 10.9752 12.9325 11.324 13.2069C11.4268 13.2694 11.5503 13.2885 11.6673 13.26C11.7842 13.2315 11.885 13.1577 11.9476 13.0548C12.0101 12.952 12.0292 12.8285 12.0007 12.7115C11.9722 12.5946 11.8984 12.4938 11.7955 12.4312C11.3178 12.0784 10.7554 11.8581 10.1651 11.7928C9.57489 11.7275 8.97787 11.8194 8.4346 12.0592C8.0382 12.2484 7.70797 12.5526 7.48689 12.9322C7.2658 13.3118 7.16412 13.7491 7.19507 14.1873C7.21419 16.2407 9.28104 19.3816 12.5855 20.8727C12.6952 20.9222 12.8201 20.9261 12.9327 20.8836C13.0453 20.8411 13.1365 20.7557 13.1861 20.646ZM17.03 18.957C17.0593 18.8403 17.0411 18.7168 16.9794 18.6135C16.9177 18.5102 16.8176 18.4356 16.701 18.4061C14.2114 17.7767 11.5975 16.0016 10.621 14.2762C10.5929 14.222 10.5541 14.1741 10.507 14.1352C10.4599 14.0963 10.4055 14.0674 10.3469 14.05C10.2884 14.0327 10.227 14.0273 10.1663 14.0342C10.1056 14.0411 10.047 14.0602 9.99387 14.0903C9.94075 14.1204 9.89424 14.1609 9.85713 14.2094C9.82001 14.2579 9.79304 14.3133 9.77783 14.3725C9.76263 14.4316 9.7595 14.4932 9.76863 14.5535C9.77777 14.6139 9.79897 14.6718 9.83099 14.7238C11.081 16.9322 14.1215 18.6901 16.4782 19.286C16.5148 19.295 16.5524 19.2995 16.5901 19.2994C16.691 19.2993 16.7891 19.2656 16.8688 19.2036C16.9484 19.1416 17.0052 19.0548 17.03 18.957ZM7.49443 21.0802C7.5954 21.0148 7.66631 20.912 7.69159 20.7944C7.71687 20.6768 7.69446 20.5539 7.62929 20.4528C4.41664 15.465 5.47349 12.0946 7.35479 10.724C9.2007 9.37832 12.4583 9.53135 14.8609 12.458C14.8983 12.5051 14.9446 12.5443 14.9973 12.5732C15.05 12.6022 15.1079 12.6204 15.1677 12.6268C15.2275 12.6332 15.2879 12.6276 15.3456 12.6104C15.4032 12.5932 15.4568 12.5647 15.5033 12.5266C15.5498 12.4885 15.5882 12.4415 15.6164 12.3884C15.6445 12.3353 15.6618 12.2771 15.6673 12.2172C15.6728 12.1573 15.6663 12.0969 15.6482 12.0396C15.6301 11.9823 15.6008 11.9291 15.5619 11.8832C12.8074 8.52423 9.00272 8.4018 6.82014 9.99139C4.62035 11.5934 3.31196 15.4239 6.86701 20.9444C6.93209 21.0455 7.03464 21.1166 7.15212 21.142C7.2696 21.1675 7.39238 21.1453 7.49347 21.0802H7.49443ZM3.55585 3.38437C4.82121 2.20413 11.5631 -0.984607 16.6369 3.06875C16.6832 3.10782 16.7368 3.13723 16.7946 3.15525C16.8524 3.17326 16.9133 3.17951 16.9735 3.17363C17.0338 3.16774 17.0923 3.14985 17.1455 3.12099C17.1988 3.09214 17.2457 3.05291 17.2835 3.00563C17.3213 2.95834 17.3493 2.90396 17.3658 2.84569C17.3822 2.78742 17.3869 2.72644 17.3794 2.66635C17.3719 2.60626 17.3524 2.54829 17.3222 2.49584C17.2919 2.44339 17.2514 2.39754 17.2032 2.36099C11.9485 -1.83774 4.86807 0.916777 2.93704 2.72156C2.89352 2.76219 2.85843 2.811 2.83377 2.86519C2.80911 2.91939 2.79537 2.97791 2.79332 3.03741C2.79128 3.09691 2.80098 3.15624 2.82186 3.212C2.84275 3.26775 2.87441 3.31885 2.91504 3.36237C2.95567 3.40589 3.00448 3.44098 3.05867 3.46564C3.11286 3.4903 3.17138 3.50404 3.23089 3.50608C3.29039 3.50813 3.34972 3.49843 3.40547 3.47755C3.46123 3.45666 3.51233 3.425 3.55585 3.38437ZM20.147 11.6766C20.2654 11.6541 20.3699 11.5856 20.4377 11.486C20.5055 11.3865 20.531 11.2641 20.5086 11.1458C20.0658 9.02804 18.9525 7.10928 17.3336 5.6739C15.7148 4.23852 13.6765 3.3629 11.521 3.17682C9.30512 2.91208 7.06409 3.39133 5.15028 4.53919C3.23648 5.68706 1.75846 7.43844 0.948619 9.51796C0.905501 9.62739 0.906506 9.74928 0.951423 9.85799C0.996339 9.96669 1.08167 10.0537 1.18945 10.1008C1.29724 10.1479 1.41909 10.1513 1.52936 10.1104C1.63963 10.0695 1.72973 9.9874 1.78071 9.8814C3.57115 5.76875 7.17498 3.59765 11.4196 4.07874C13.382 4.24378 15.239 5.03668 16.7154 6.33993C18.1917 7.64317 19.2089 9.38741 19.6162 11.3141C19.6358 11.4181 19.6911 11.5119 19.7724 11.5795C19.8538 11.647 19.9562 11.6841 20.0619 11.6843C20.0905 11.684 20.119 11.6811 20.147 11.6757V11.6766Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Crime content</p>
          </div>

          <div
            className={`sort_item ${
              active === "business_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "business_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Racism" /> */}
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8346 12.9514C12.7196 13.1667 12.5621 13.3458 12.3627 13.4929C12.1627 13.6393 11.9228 13.7482 11.644 13.8208C11.5222 13.8516 11.3954 13.8725 11.2656 13.8904V14.7013H10.2971V13.9063C10.0221 13.8829 9.75808 13.8399 9.51015 13.7716C9.13111 13.6682 8.63516 13.2492 8.63516 13.2492C8.59208 13.2246 8.56377 13.1809 8.55762 13.1322C8.55148 13.0836 8.56869 13.035 8.60315 13L9.08799 12.5145C9.14092 12.4628 9.22212 12.4529 9.28489 12.4911C9.28489 12.4911 9.64794 12.8068 9.92237 12.8818C10.198 12.9569 10.4713 12.9944 10.7432 12.9944C11.0866 12.9944 11.3708 12.9335 11.596 12.8123C11.8212 12.6899 11.9345 12.5015 11.9345 12.2431C11.9345 12.0573 11.8791 11.9108 11.7671 11.8032C11.6563 11.6967 11.4693 11.629 11.2047 11.6001L10.3359 11.5251C9.82144 11.4746 9.42398 11.3312 9.14525 11.0962C8.8653 10.8599 8.72621 10.5024 8.72621 10.0237C8.72621 9.75853 8.78036 9.52284 8.88802 9.31551C8.99569 9.10817 9.14155 8.9334 9.32734 8.79065C9.51377 8.64727 9.73036 8.54023 9.97648 8.46884C10.0799 8.43867 10.1875 8.41898 10.2971 8.40114V7.70215H11.2656V8.38638C11.4914 8.40914 11.7068 8.44544 11.9061 8.50081C12.247 8.59312 12.6033 8.87185 12.6033 8.87185C12.6482 8.89524 12.6783 8.93891 12.6857 8.98814C12.6937 9.03859 12.6777 9.08844 12.6421 9.12475L12.1867 9.58683C12.1381 9.63606 12.0637 9.64838 12.0015 9.61637C12.0015 9.61637 11.7326 9.42439 11.4994 9.3641C11.2668 9.30381 11.0226 9.27242 10.7648 9.27242C10.4288 9.27242 10.1802 9.33705 10.0196 9.46625C9.85838 9.59487 9.7784 9.76282 9.7784 9.96957C9.7784 10.1554 9.83503 10.2987 9.95069 10.3978C10.0639 10.4988 10.2571 10.564 10.5291 10.591L11.2909 10.6562C11.8545 10.7067 12.2828 10.8562 12.5719 11.1067C12.8617 11.3565 13.0063 11.722 13.0063 12.2001C13.0063 12.4868 12.9491 12.7366 12.8346 12.9514Z"
                fill="black"
              />
              <path
                d="M18.1837 4.61426H3.37925C1.90006 4.61426 0.700195 5.8135 0.700195 7.29332V15.1669C0.700195 16.6461 1.89884 17.8453 3.37803 17.8459V18.5283C3.37803 18.9633 3.7306 19.3159 4.16563 19.3159C4.60066 19.3159 4.95323 18.9633 4.95323 18.5283V17.8459H16.6097V18.5283C16.6097 18.9633 16.9623 19.3159 17.3973 19.3159C17.8323 19.3159 18.1849 18.9633 18.1849 18.5283V17.8459C19.6641 17.8453 20.8627 16.6461 20.8627 15.1669V7.29332C20.8627 5.8135 19.6629 4.61426 18.1837 4.61426ZM19.2875 15.1669C19.2875 15.7754 18.7922 16.2707 18.1837 16.2707H3.37925C2.77071 16.2707 2.27539 15.7754 2.27539 15.1669V7.29332C2.27539 6.68478 2.77071 6.18946 3.37925 6.18946H18.1837C18.7922 6.18946 19.2875 6.68478 19.2875 7.29332V15.1669Z"
                fill="black"
              />
              <path
                d="M7.86249 2.72341C7.86312 2.38254 7.99847 2.07979 8.22183 1.85583C8.44583 1.63247 8.74854 1.49649 9.08941 1.49649H12.649C12.8201 1.49649 12.9603 1.52973 13.0822 1.5851C13.2631 1.66878 13.4096 1.80476 13.5203 1.99736C13.6311 2.18934 13.6987 2.43917 13.6987 2.72345V3.38614H14.9589V2.72341C14.9589 2.07794 14.7534 1.46388 14.3497 0.997468C14.1479 0.76489 13.8956 0.571653 13.6064 0.439375C13.3166 0.306468 12.9905 0.235702 12.649 0.236332H9.08938C7.71537 0.236332 6.60289 1.35004 6.60229 2.72341V3.3861H7.86245V2.72341H7.86249Z"
                fill="black"
              />
            </svg>
            <p className="sort_txt">Business content</p>
          </div>

          <div
            className={`sort_item ${
              active === "fashion_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "fashion_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Accident" /> */}
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0545 0.961034L14.0552 0.96126C14.4846 1.10266 14.82 1.39509 14.9949 1.75773C14.9949 1.75775 14.9949 1.75777 14.9949 1.75779L19.4489 10.999C19.4489 10.999 19.449 10.9991 19.449 10.9992C19.4642 11.0309 19.4642 11.0614 19.4528 11.0904C19.4411 11.1205 19.4135 11.1565 19.3606 11.1814C19.3604 11.1815 19.3602 11.1816 19.36 11.1817L18.158 11.738C18.1577 11.7382 18.1573 11.7384 18.157 11.7385C18.11 11.7594 18.0453 11.7652 17.9788 11.7453C17.9372 11.7329 17.8925 11.6972 17.8669 11.6508C17.8669 11.6507 17.8668 11.6507 17.8668 11.6506L14.6123 5.68893L14.2249 4.97929L13.8959 5.71778C13.0681 7.57551 12.9851 9.61968 13.6983 11.536L13.7023 11.5465L13.7067 11.5567L16.2982 17.4808C14.9384 17.7018 12.8319 17.8117 10.0234 17.8117H10.0234H10.0234H10.0234H10.0233H10.0233H10.0233H10.0233H10.0233H10.0232H10.0232H10.0232H10.0232H10.0232H10.0231H10.0231H10.0231H10.0231H10.0231H10.023H10.023H10.023H10.023H10.023H10.0229H10.0229H10.0229H10.0229H10.0229H10.0228H10.0228H10.0228H10.0228H10.0228H10.0227H10.0227H10.0227H10.0227H10.0227H10.0226H10.0226H10.0226H10.0226H10.0225H10.0225H10.0225H10.0225H10.0225H10.0224H10.0224H10.0224H10.0224H10.0224H10.0223H10.0223H10.0223H10.0223H10.0222H10.0222H10.0222H10.0222H10.0222H10.0221H10.0221H10.0221H10.0221H10.022H10.022H10.022H10.022H10.022H10.0219H10.0219H10.0219H10.0219H10.0218H10.0218H10.0218H10.0218H10.0218H10.0217H10.0217H10.0217H10.0217H10.0216H10.0216H10.0216H10.0216H10.0216H10.0215H10.0215H10.0215H10.0215H10.0214H10.0214H10.0214H10.0214H10.0213H10.0213H10.0213H10.0213H10.0213H10.0212H10.0212H10.0212H10.0212H10.0211H10.0211H10.0211H10.0211H10.021H10.021H10.021H10.021H10.021H10.0209H10.0209H10.0209H10.0209H10.0208H10.0208H10.0208H10.0208H10.0207H10.0207H10.0207H10.0207H10.0207H10.0206H10.0206H10.0206H10.0206H10.0205H10.0205H10.0205H10.0205H10.0204H10.0204H10.0204H10.0204H10.0204H10.0203H10.0203H10.0203H10.0203H10.0202H10.0202H10.0202H10.0202H10.0201H10.0201H10.0201H10.0201H10.0201H10.02H10.02H10.02H10.02H10.0199H10.0199H10.0199H10.0199H10.0198H10.0198H10.0198H10.0198H10.0198H10.0197H10.0197H10.0197H10.0197H10.0196H10.0196H10.0196H10.0196H10.0195H10.0195H10.0195H10.0195H10.0195H10.0194H10.0194H10.0194H10.0194H10.0193H10.0193H10.0193H10.0193H10.0193H10.0192H10.0192H10.0192H10.0192H10.0191H10.0191H10.0191H10.0191H10.0191H10.019H10.019H10.019H10.019H10.0189H10.0189H10.0189H10.0189H10.0189H10.0188H10.0188H10.0188H10.0188H10.0188H10.0187H10.0187H10.0187H10.0187H10.0187H10.0186H10.0186H10.0186H10.0186H10.0185H10.0185H10.0185H10.0185H10.0185H10.0184H10.0184H10.0184H10.0184H10.0184H10.0183H10.0183H10.0183H10.0183H10.0183H10.0182H10.0182H10.0182H10.0182H10.0182H10.0181H10.0181H10.0181H10.0181H10.0181H10.018H10.018H10.018H10.018H10.018H10.0179H10.0179H10.0179H10.0179H10.0179H10.0179H10.0178H10.0178H10.0178H10.0178H10.0178H10.0177H10.0177H10.0177H10.0177H10.0177H10.0176H10.0176H10.0176H10.0176H10.0176H10.0175H10.0175H10.0175H10.0175H10.0175H10.0174H10.0174H10.0174H10.0174H10.0174H10.0173H10.0173H10.0173H10.0173H10.0173H10.0172H10.0172H10.0172H10.0172H10.0172H10.0171H10.0171H10.0171H10.0171H10.0171H10.017H10.017H10.017H10.017H10.017H10.0169H10.0169H10.0169H10.0169H10.0168H10.0168H10.0168H10.0168H10.0168H10.0167H10.0167H10.0167H10.0167H10.0167H10.0166H10.0166H10.0166H10.0166H10.0165H10.0165H10.0165H10.0165H10.0165H10.0164H10.0164H10.0164H10.0164H10.0163H10.0163H10.0163H10.0163H10.0163H10.0162H10.0162H10.0162H10.0162H10.0161H10.0161H10.0161H10.0161H10.016H10.016H10.016H10.016H10.016H10.0159H10.0159H10.0159H10.0159H10.0158H10.0158H10.0158H10.0158H10.0157H10.0157H10.0157H10.0157H10.0157H10.0156H10.0156H10.0156H10.0156H10.0155H10.0155H10.0155H10.0155H10.0154H10.0154H10.0154H10.0154H10.0154H10.0153H10.0153H10.0153H10.0153H10.0152H10.0152H10.0152H10.0152H10.0151H10.0151H10.0151H10.0151H10.0151H10.015H10.015H10.015H10.015H10.0149H10.0149H10.0149H10.0149H10.0148H10.0148H10.0148H10.0148H10.0148H10.0147H10.0147H10.0147H10.0147H10.0146H10.0146H10.0146H10.0146H10.0145H10.0145H10.0145H10.0145H10.0145H10.0144H10.0144H10.0144H10.0144H10.0143H10.0143H10.0143H10.0143H10.0142H10.0142H10.0142H10.0142H10.0142H10.0141H10.0141H10.0141H10.0141H10.014H10.014H10.014H10.014H10.014H10.0139H10.0139H10.0139H10.0139H10.0138H10.0138H10.0138H10.0138H10.0137H10.0137H10.0137H10.0137H10.0137H10.0136H10.0136H10.0136H10.0136H10.0135H10.0135H10.0135H10.0135H10.0135H10.0134H10.0134H10.0134H10.0134H10.0134H10.0133H10.0133H10.0133H10.0133H10.0132H10.0132H10.0132H10.0132H10.0132H10.0131H10.0131H10.0131H10.0131H10.0131H10.013H10.013H10.013H10.013H10.013H10.0129H10.0129H10.0129H10.0129H10.0128H10.0128H10.0128H10.0128H10.0128H10.0127H10.0127H10.0127H10.0127H10.0127H10.0126H10.0126H10.0126H10.0126H10.0126H10.0125H10.0125H10.0125H10.0125H10.0125H10.0125H10.0124H10.0124H10.0124H10.0124H10.0124H10.0123H10.0123H10.0123C7.20518 17.8117 5.09929 17.7019 3.7389 17.4811L6.32749 11.6305L6.3324 11.6194L6.33663 11.608C7.04896 9.69197 6.96611 7.61218 6.13829 5.75354L5.80983 5.01609L5.42206 5.72415L2.16731 11.6673C2.16727 11.6673 2.16723 11.6674 2.16718 11.6675C2.14854 11.7013 2.11012 11.7365 2.05325 11.7537L2.16602 12.127L2.05325 11.7537C1.99458 11.7714 1.92942 11.7665 1.87601 11.7423C1.87581 11.7422 1.8756 11.7421 1.8754 11.742L0.66726 11.1819L0.666961 11.1817C0.613963 11.1572 0.584534 11.1203 0.571731 11.0883C0.559498 11.0577 0.560207 11.0281 0.574056 10.9991C0.574078 10.999 0.574099 10.999 0.574121 10.999L5.01781 1.75779C5.19588 1.38848 5.5147 1.10029 5.93688 0.96126L5.93739 0.96109C6.36146 0.820808 6.79166 0.846166 7.19586 1.03318L7.70543 1.28608C7.71297 2.12922 7.90386 2.92227 8.22137 3.52163C8.53369 4.11119 9.03486 4.62259 9.69181 4.62259C10.3488 4.62259 10.85 4.11087 11.1623 3.52131C11.46 2.95912 11.6464 2.22663 11.6747 1.44252L11.7028 1.43131C11.7133 1.42707 11.7265 1.42171 11.7401 1.4158L12.7231 1.04708L12.7375 1.04167L12.7515 1.03517C13.1558 0.846854 13.6287 0.81996 14.0545 0.961034ZM11.6784 1.23422V1.23263C11.6784 1.23316 11.6784 1.23369 11.6784 1.23422Z"
                stroke="black"
                stroke-width="0.8"
              />
            </svg>
            <p className="sort_txt">Fashion content</p>
          </div>

          <div
            className={`sort_item ${
              active === "sports_content" ? "active" : null
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTime("contentType", "sports_content")}
          >
            {/* <img src={exclusiveic} className="icn" alt="Accident" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.4539 3.6076C2.30322 4.7608 1.46222 6.13629 1.0223 7.5894C0.442094 9.49981 0.544129 11.6362 1.30229 13.6054C2.06328 15.5852 3.44259 17.2543 5.18285 18.303L5.18289 18.3031C6.62357 19.1696 8.34103 19.6262 10.1207 19.6262C10.5107 19.6262 10.9062 19.6051 11.299 19.5602C13.5014 19.3121 15.4942 18.3857 16.9108 16.9505C18.3872 15.4552 19.3618 13.3644 19.6583 11.0617L19.6583 11.0617C19.8203 9.80073 19.7682 8.51041 19.5017 7.32762C19.2132 6.04724 18.691 4.90054 17.9455 3.92513C16.4111 1.91169 14.1287 0.712471 11.5207 0.546107L11.5207 0.546106C8.57053 0.358697 5.55513 1.50141 3.4539 3.6076ZM3.4539 3.6076L3.48929 3.64292M3.4539 3.6076L3.48929 3.64292M3.48929 3.64292C2.34396 4.79076 1.50751 6.15925 1.07015 7.60391C0.493382 9.50297 0.594522 11.6279 1.34897 13.5874L3.48929 3.64292ZM10.8552 13.0937L10.8551 13.0937C10.2796 13.1144 9.68863 13.1378 9.11882 13.1763C8.85114 13.4651 8.5832 13.8119 8.32063 14.1517L8.29072 14.1904C7.99978 14.57 7.69404 14.9645 7.38231 15.2933C7.59823 15.8606 7.86811 16.5127 8.13256 17.1518L8.15507 17.2061L10.8552 13.0937ZM10.8552 13.0937C11.4204 13.073 12.0048 13.0497 12.5714 13.0113C12.8519 13.3727 13.1351 13.7885 13.4087 14.1933L13.4087 14.1933M10.8552 13.0937L13.4087 14.1933M13.4087 14.1933C13.6876 14.6056 13.978 15.032 14.2689 15.4067C14.1144 15.8662 13.9563 16.3689 13.7993 16.8681C13.7672 16.9702 13.7351 17.0721 13.7031 17.1735L13.669 17.2816C13.5265 17.7333 13.3804 18.1966 13.2408 18.628M13.4087 14.1933L13.2408 18.628M7.95393 10.7254L7.95397 10.7254C8.28678 11.3832 8.63065 12.0593 9.1186 12.6769C9.6544 12.643 10.2062 12.6203 10.7426 12.5983C10.7734 12.597 10.8042 12.5958 10.8349 12.5945L10.8351 12.5945C11.3932 12.5739 11.964 12.5507 12.5167 12.5151C12.6781 12.1276 12.8375 11.6287 12.9955 11.1341C13.0063 11.1001 13.0172 11.0662 13.028 11.0323L7.95393 10.7254ZM7.95393 10.7254C7.79228 10.4071 7.62485 10.0776 7.4446 9.76203C8.26791 8.7082 9.04289 7.88117 10.2229 7.09333C11.6339 7.96701 12.6981 8.7439 13.549 9.52139C13.3746 9.94319 13.2053 10.475 13.0419 10.9887L13.028 11.0322L7.95393 10.7254ZM17.5516 7.5526L17.5516 7.55256C17.7801 7.25321 18.0074 6.95291 18.235 6.65213C18.3613 6.48531 18.4876 6.31834 18.6144 6.15131C18.3385 5.44593 17.9778 4.7995 17.5352 4.21688C16.7908 3.23789 15.8673 2.46798 14.7944 1.92246C14.6655 1.85805 14.534 1.79593 14.3976 1.73386C14.3386 1.76506 14.2791 1.79667 14.219 1.82864C14.1193 1.8816 14.0178 1.93556 13.9136 1.99033C13.8181 2.04095 13.7204 2.09276 13.6207 2.14564C12.7087 2.62942 11.627 3.20314 10.5093 3.78383C10.5046 4.11344 10.5017 4.40414 10.4991 4.67611C10.4972 4.86298 10.4955 5.04101 10.4933 5.21676C10.4933 5.21681 10.4933 5.21686 10.4933 5.2169L10.4433 5.21628L17.5516 7.5526ZM17.5516 7.5526C17.3726 7.78764 17.1943 8.02332 17.016 8.25893L17.0157 8.25929L17.015 8.26029C16.8417 8.48928 16.6685 8.71821 16.4947 8.94653C15.9293 8.95876 15.0657 9.03667 13.9207 9.17736C13.037 8.36736 11.9363 7.56279 10.4773 6.65959L17.5516 7.5526ZM2.7084 7.21098L2.70851 7.21122C3.02812 7.85148 3.38749 8.56809 3.87202 9.41041C4.84315 9.48148 6.24919 9.50239 7.01557 9.49778C7.86307 8.41221 8.70694 7.50365 9.96986 6.66543C9.97524 6.10264 9.98063 5.65285 9.98601 5.21583C9.98601 5.21577 9.98601 5.21572 9.98601 5.21567L10.036 5.21628L2.7084 7.21098ZM2.7084 7.21098C2.6806 7.15603 2.65304 7.10145 2.62565 7.04721C2.47139 6.74177 2.3225 6.44694 2.16824 6.15418C2.59341 5.36373 3.15181 4.61925 3.81988 3.94881C4.53662 3.2316 5.36294 2.63229 6.25921 2.16623C7.3401 2.81629 8.74534 3.43884 10.0019 3.82168L2.7084 7.21098ZM13.2408 18.628C12.6062 18.8405 11.9345 18.9894 11.2414 19.0694C10.866 19.1113 10.4934 19.1322 10.1207 19.1322C9.71194 19.1322 9.30577 19.1073 8.90476 19.0575C8.685 18.4856 8.41594 17.8341 8.1551 17.2062L13.2408 18.628ZM2.24735 7.42674C2.57086 8.07179 2.93479 8.79711 3.42534 9.65225C3.0586 9.9677 2.69249 10.2837 2.32643 10.5997L2.32632 10.5998C1.97235 10.9054 1.61842 11.2109 1.26393 11.5159C1.06886 10.2578 1.13463 8.95804 1.50888 7.72613L1.46104 7.7116L1.50886 7.72621C1.61316 7.38496 1.74019 7.04798 1.8879 6.71726C1.9716 6.87858 2.0538 7.04211 2.13792 7.20945C2.17396 7.28114 2.21034 7.35353 2.24735 7.42674ZM2.24735 7.42674C2.24734 7.42672 2.24733 7.42671 2.24733 7.4267L2.29202 7.40428L2.2474 7.42684C2.24738 7.4268 2.24736 7.42677 2.24735 7.42674ZM5.45317 17.8838L5.45311 17.8838C4.52058 17.3228 3.71361 16.5814 3.06237 15.7267C3.43568 15.6996 3.86876 15.6703 4.35087 15.6388L4.35096 15.6388C4.43286 15.6333 4.51588 15.6277 4.59994 15.6221C5.30733 15.5747 6.0888 15.5224 6.90279 15.4579C7.12785 16.0495 7.40943 16.7298 7.68275 17.3889C7.7071 17.4478 7.73153 17.5069 7.75599 17.566C7.95265 18.0414 8.15145 18.522 8.32488 18.9644C7.29421 18.7694 6.31953 18.4067 5.45317 17.8838ZM16.5418 16.607L16.5417 16.6071C15.7945 17.363 14.8761 17.9699 13.8478 18.399C13.9123 18.1983 13.9769 17.994 14.0413 17.7897C14.0916 17.6305 14.1419 17.4713 14.1921 17.3141L14.1921 17.3139C14.23 17.1942 14.2679 17.0736 14.3058 16.9529C14.4505 16.493 14.5957 16.0315 14.7377 15.6083C15.6106 15.6309 16.4416 15.6546 17.2732 15.7589C17.0456 16.0602 16.8018 16.3449 16.5418 16.607ZM11.487 1.03727L11.4902 0.987376L11.487 1.03727C12.2929 1.08956 13.0639 1.24388 13.7908 1.49558C13.7512 1.51653 13.7111 1.53788 13.6697 1.56065C12.6931 2.0808 11.4812 2.72315 10.2304 3.37383C9.095 3.03448 7.82584 2.48981 6.79707 1.90409C8.08413 1.3286 9.48531 1.01899 10.8861 1.01899C11.0875 1.01899 11.286 1.02422 11.487 1.03727ZM7.49842 10.9439L7.49848 10.944L7.51986 10.9861C7.84608 11.6283 8.18511 12.2958 8.67235 12.9232C8.40434 13.2223 8.13953 13.5634 7.88611 13.8932L7.8697 13.9144C7.5889 14.2785 7.30022 14.6527 7.01439 14.9522C6.05128 15.0303 5.13165 15.0928 4.31708 15.145L4.31694 15.145C3.70212 15.1861 3.16275 15.2222 2.72732 15.2558C2.08603 14.2955 1.62375 13.212 1.37413 12.0875C1.92495 11.6109 2.47687 11.1354 3.02922 10.6594C3.31939 10.4094 3.60968 10.1593 3.9 9.90886C4.81028 9.97092 6.05879 9.99162 6.84055 9.99162H6.84094H6.84132H6.84171H6.84209H6.84247H6.84286H6.84324H6.84363H6.84401H6.84439H6.84478H6.84516H6.84554H6.84592H6.84631H6.84669H6.84707H6.84745H6.84784H6.84822H6.8486H6.84898H6.84936H6.84974H6.85013H6.85051H6.85089H6.85127H6.85165H6.85203H6.85241H6.85279H6.85317H6.85355H6.85393H6.85431H6.85469H6.85507H6.85545H6.85583H6.85621H6.85659H6.85697H6.85735H6.85773H6.85811H6.85848H6.85886H6.85924H6.85962H6.86H6.86038H6.86075H6.86113H6.86151H6.86189H6.86227H6.86264H6.86302H6.8634H6.86377H6.86415H6.86453H6.8649H6.86528H6.86566H6.86603H6.86641H6.86679H6.86716H6.86754H6.86791H6.86829H6.86867H6.86904H6.86942H6.86979H6.87017H6.87054H6.87092H6.87129H6.87167H6.87204H6.87241H6.87279H6.87316H6.87354H6.87391H6.87428H6.87466H6.87503H6.8754H6.87578H6.87615H6.87652H6.8769H6.87727H6.87764H6.87802H6.87839H6.87876H6.87913H6.87951H6.87988H6.88025H6.88062H6.88099H6.88136H6.88174H6.88211H6.88248H6.88285H6.88322H6.88359H6.88396H6.88433H6.8847H6.88508H6.88545H6.88582H6.88619H6.88656H6.88693H6.8873H6.88767H6.88804H6.88841H6.88877H6.88914H6.88951H6.88988H6.89025H6.89062H6.89099H6.89136H6.89173H6.89209H6.89246H6.89283H6.8932H6.89357H6.89394H6.8943H6.89467H6.89504H6.89541H6.89577H6.89614H6.89651H6.89687H6.89724H6.89761H6.89798H6.89834H6.89871H6.89908H6.89944H6.89981H6.90017H6.90054H6.90091H6.90127H6.90164H6.902H6.90237H6.90273H6.9031H6.90346H6.90383H6.90419H6.90456H6.90492H6.90529H6.90565H6.90602H6.90638H6.90675H6.90711H6.90747H6.90784H6.9082H6.90856H6.90893H6.90929H6.90966H6.91002H6.91038H6.91074H6.91111H6.91147H6.91183H6.9122H6.91256H6.91292H6.91328H6.91365H6.91401H6.91437H6.91473H6.91509H6.91546H6.91582H6.91618H6.91654H6.9169H6.91726H6.91762H6.91798H6.91835H6.91871H6.91907H6.91943H6.91979H6.92015H6.92051H6.92087H6.92123H6.92159H6.92195H6.92231H6.92267H6.92303H6.92339H6.92375H6.92411H6.92447H6.92483H6.92519H6.92554H6.9259H6.92626H6.92662H6.92698H6.92734H6.9277H6.92805H6.92841H6.92877H6.92913H6.92949H6.92984H6.9302H6.93056H6.93092H6.93128H6.93163H6.93199H6.93235H6.9327H6.93306H6.93342H6.93377H6.93413H6.93449H6.93484H6.9352H6.93556H6.93591H6.93627H6.93663H6.93698H6.93734H6.93769H6.93805H6.9384H6.93876H6.93912H6.93947H6.93983H6.94018H6.94054H6.94089H6.94125H6.9416H6.94196H6.94231H6.94266H6.94302H6.94337H6.94373H6.94408H6.94444H6.94479H6.94514H6.9455H6.94585H6.9462H6.94656H6.94691H6.94726H6.94762H6.94797H6.94832H6.94868H6.94903H6.94938H6.94973H6.95009H6.95044H6.95079H6.95114H6.9515H6.95185H6.9522H6.95255H6.9529H6.95326H6.95361H6.95396H6.95431H6.95466H6.95501H6.95537H6.95572H6.95607H6.95642H6.95677H6.95712H6.95747H6.95782H6.95817H6.95852H6.95887H6.95922H6.95957H6.95992H6.96027H6.96062H6.96097H6.96132H6.96167H6.96202H6.96237H6.96272H6.96307H6.96342H6.96377H6.96412H6.96447H6.96482H6.96517H6.96551H6.96586H6.96621H6.96656H6.96691H6.96726H6.96761H6.96795H6.9683H6.96865H6.969H6.96935H6.96969H6.97004H6.97039H6.97074H6.97108H6.97143H6.97178H6.97213H6.97247H6.97282H6.97317H6.97351H6.97386H6.97421H6.97455H6.9749H6.97525H6.97559H6.97594H6.97629H6.97663H6.97698H6.97732H6.97767H6.97802H6.97836H6.97871H6.97905H6.9794H6.97974H6.98009H6.98044H6.98078H6.98113H6.98147H6.98182H6.98216H6.98251H6.98285H6.9832H6.98354H6.98388H6.98423H6.98457H6.98492H6.98526H6.98561H6.98595H6.98629H6.98664H6.98698H6.98733H6.98767H6.98801H6.98836H6.9887H6.98904H6.98939H6.98973H6.99007H6.99042H6.99076H6.9911H6.99145H6.99179H6.99213H6.99247H6.99282H6.99316H6.9935H6.99384H6.99419H6.99453H6.99478C7.16893 10.2952 7.33083 10.6116 7.49842 10.9439ZM18.846 12.5131C18.5659 13.5286 18.1418 14.4728 17.5945 15.3037C16.6256 15.1639 15.6776 15.1372 14.6832 15.114C14.4112 14.7645 14.1391 14.3647 13.8706 13.9701L13.8359 13.9191C13.8241 13.9019 13.8124 13.8846 13.8006 13.8673C13.5336 13.4749 13.2607 13.0739 12.9828 12.7156C13.1641 12.2821 13.3399 11.7277 13.5097 11.1925L13.5142 11.1781L13.5175 11.1677C13.6881 10.6299 13.8628 10.0791 14.0397 9.662C15.1291 9.52715 15.9507 9.45267 16.4853 9.44053C17.2636 10.4108 18.0319 11.4315 18.7809 12.4266L18.846 12.5131ZM19.0051 7.43378C19.2579 8.55984 19.3097 9.79368 19.1546 10.999C19.1157 11.2976 19.0661 11.5919 19.0037 11.8837C18.3296 10.987 17.638 10.0745 16.9386 9.19755C17.2807 8.74804 17.6227 8.29615 17.962 7.8468C18.1134 7.64762 18.2648 7.44779 18.4161 7.248L18.4171 7.24666L18.4196 7.24343C18.551 7.06989 18.6824 6.89639 18.8139 6.72332C18.8861 6.95522 18.9498 7.19143 19.0051 7.43378Z"
                fill="black"
                stroke="black"
                stroke-width="0.1"
              />
            </svg>
            <p className="sort_txt">Sports content</p>
          </div>
        </div>
        <button
          className="fltr_btn mt-3"
          onClick={() => {
            handleFilter();
          }}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default RecentActivity;
