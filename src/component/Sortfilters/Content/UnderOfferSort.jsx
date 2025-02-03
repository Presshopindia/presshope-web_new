import React, { useState, useEffect } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import lowestprcdic from "../../../assets/images/sortIcons/Lowest-rated.svg";
import highestprcdic from "../../../assets/images/sortIcons/highest-rated.svg";
import { initStateOfUnderOffer } from "../../staticData";
import { Get, Patch, Post } from "../../../services/user.services";

import { toast } from "react-toastify";
import { add } from "lodash";
import Form from "react-bootstrap/Form";
import priceic from "../../../assets/images/sortIcons/payment.svg";
import DatePicker from "react-datepicker";
import { BsEye } from "react-icons/bs";

const UnderOfferSort = ({ setContentUnderOffer, contentUnderOffer }) => {
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");

  // setAddress

  // Handle click-
  const handleClick = (type, value) => {
    if (type != "submit") {
      setContentUnderOffer({
        ...contentUnderOffer,
        sort: {
          ...contentUnderOffer.sort,
          field: value,
          ...(locationValue ? { hopper_location: locationValue } : {}),
        },
      });
    } else {
      if (
        contentUnderOffer?.sort?.price_range_to >>
        contentUnderOffer?.sort?.price_range_from
      )
        return toast.error("Price2 should greater than price1");

      // if (contentUnderOffer?.sort?.field == "location") {
      //   setContentUnderOffer((prev) => ({
      //     ...prev,
      //     sort: {
      //       ...prev.sort,
      //       active: prev.sort.active === "true" ? "false" : "true",
      //       sort: "false",
      //       hopper_location: address || locationValue,
      //     },
      //   }));
      //   setLocationData([]);
      //   setLocationValue("");
      // }
      setContentUnderOffer((prev) => ({
        ...prev,
        sort: {
          ...prev.sort,
          active: prev.sort.active === "true" ? "false" : "true",
          sort: "false",
        },
      }));
      setLocationData([]);
      setLocationValue("");
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


  return (
    <>
      <div className="filter_wrap custm-fltr">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() =>
              setContentUnderOffer((prev) => ({
                ...prev,
                sort: {
                  ...prev.sort,
                  sort: "false",
                },
              }))
            }
          />
          <p className="hdng">Sort</p>
          <div
            className="notf_icn_wrp"
            onClick={() =>
              setContentUnderOffer({
                ...contentUnderOffer,
                sort: initStateOfUnderOffer.sort,
              })
            }
          >
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className="sort_item" style={{ cursor: "pointer" }}>
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div className="sort_item" style={{ cursor: "pointer" }}>
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div className="sort_item" style={{ cursor: "pointer" }}>
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div className="sort_item" style={{ cursor: "pointer" }}>
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <div className="sort_list">
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
        </div>
          {/* <div className="sort_item" style={{ cursor: "pointer" }}>
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
          </div> */}
          <div
            className={`sort_item ${
              contentUnderOffer?.sort?.field == "latest_content" ? "active" : ""
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
              contentUnderOffer?.sort?.field == "low_price_content"
                ? "active"
                : ""
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
              contentUnderOffer?.sort?.field == "high_price_content"
                ? "active"
                : ""
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
              contentUnderOffer?.sort?.field == "most_viewed_content"
                ? "active"
                : ""
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
              contentUnderOffer?.sort?.field == "images" ? "active" : ""
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
              contentUnderOffer?.sort?.field == "videos" ? "active" : ""
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
              contentUnderOffer?.sort?.field == "recordings" ? "active" : ""
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
              contentUnderOffer?.sort?.field == "scans" ? "active" : ""
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
            className={`sort_item custm_filtrs ${
              contentUnderOffer?.sort?.field == "price_range" ? "active" : ""
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

            <div className="d-flex gap-3 align-items-center select-font">
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
                    setContentUnderOffer({
                      ...contentUnderOffer,
                      sort: {
                        ...contentUnderOffer.sort,
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
                      contentUnderOffer?.sort?.price_range_to &&
                      e.target.value >> contentUnderOffer?.sort?.price_range_to
                    ) {
                      setContentUnderOffer({
                        ...contentUnderOffer,
                        sort: {
                          ...contentUnderOffer.sort,
                          price_range_from: e?.target?.value,
                        },
                      });
                    } else {
                      setContentUnderOffer({
                        ...contentUnderOffer,
                        sort: {
                          ...contentUnderOffer.sort,
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
            className={`sort_item custm_filtrs ${
              contentUnderOffer?.sort?.field == "location" ? "active" : ""
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
        <button
          className="fltr_btn mt-3"
          onClick={() => handleClick("submit", "")}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default UnderOfferSort;
