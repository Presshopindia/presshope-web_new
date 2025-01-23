import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import calendaric from "../../../assets/images/calendar.svg";
import latestic from "../../../assets/images/sortIcons/latest.svg";
import celebrityic from "../../../assets/images/sortIcons/celebrity.svg";
import crimeic from "../../../assets/images/sortIcons/crime.svg";
import politicalic from "../../../assets/images/sortIcons/political.svg";
import businessic from "../../../assets/images/sortIcons/business.svg";
import fashionic from "../../../assets/images/Fashion.svg";
import exclusiveic from "../../../assets/images/exclusive.svg";
import sharedic from "../../../assets/images/shared.svg";
import favouritic from "../../../assets/images/sortIcons/fav.svg";
import paymentic from "../../../assets/images/sortIcons/payment.svg";
import sportsic from "../../../assets/images/sortIcons/sports.png";
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import custom from "../../../assets/images/sortIcons/custom.svg";
import DatePicker from "react-datepicker";
import { Get } from "../../../services/user.services";
import { useLocation, useNavigate } from "react-router-dom";
import { initStateOfSortFilterPurchasedContent } from "../../staticData";

const ReportPurchasedSourced = ({
  closeSortComponent,
  setSortFilterPurchasedContent,
  sortFilterPurchasedContent,
  shaEx,
  url
}) => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeSort, setActiveSort] = useState("");
  const [activeType, setActiveType] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const getCategory = async () => {
    try {
      const result = await Get("mediaHouse/getCategoryType?type=content");
      setCategories(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleClose = (values) => {
    closeSortComponent(values);
  };

  const handleClick = (type, value) => {
    switch (type) {
      case "sort":
        setSortFilterPurchasedContent({
          ...sortFilterPurchasedContent,
          sortField: value,
          sortValue: value,
        });
        setActiveSort(value);
        break;
      case "timeRangeStart":
        setSortFilterPurchasedContent({
          ...sortFilterPurchasedContent,
          timeRange: { ...sortFilterPurchasedContent.timeRange, start: value },
        });
        break;
      case "timeRangeEnd":
        setSortFilterPurchasedContent({
          ...sortFilterPurchasedContent,
          timeRange: { ...sortFilterPurchasedContent.timeRange, end: value },
        });
        break;
      case "type":
        if (sortFilterPurchasedContent?.type?.includes(value)) {
          setSortFilterPurchasedContent({ ...sortFilterPurchasedContent, type: sortFilterPurchasedContent?.type?.filter((el) => el != value) });
        } else {
          setSortFilterPurchasedContent({ ...sortFilterPurchasedContent, type: [...sortFilterPurchasedContent?.type, value] });
        }
        break;
      case "category":
        if (sortFilterPurchasedContent?.category?.includes(value)) {
          setSortFilterPurchasedContent({ ...sortFilterPurchasedContent, category: sortFilterPurchasedContent?.category?.filter((el) => el != value) });
        } else {
          setSortFilterPurchasedContent({ ...sortFilterPurchasedContent, category: [...sortFilterPurchasedContent?.category, value] });
        }
        break;
      default:
        break;
    }
  };

  const isSortActive = (sortType) => sortFilterPurchasedContent?.sortField === sortType;
  const isTypeActive = (type) => sortFilterPurchasedContent?.type?.includes(type);
  const isCategoryActive = (category) => sortFilterPurchasedContent?.category?.includes(category);

  const handleApply = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("sortField", sortFilterPurchasedContent.sortField);
    queryParams.set("sortValue", sortFilterPurchasedContent.sortValue);
    queryParams.set("timeRangeStart", sortFilterPurchasedContent.timeRange.start);
    queryParams.set("timeRangeEnd", sortFilterPurchasedContent.timeRange.end);
    queryParams.set("favContent", sortFilterPurchasedContent.favContent.toString());
    sortFilterPurchasedContent.type.forEach((type) => {
      queryParams.append("type", type);
    });
    sortFilterPurchasedContent.category.forEach((category) => {
      queryParams.append("category", category);
    });
    queryParams.set("change", sortFilterPurchasedContent.change.toString());

    navigate(`${url}?${queryParams.toString()}`);
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
            onClick={() => handleClose(false)}
          />
          <p className="hdng">Sort and filter</p>
          <div className="notf_icn_wrp" onClick={() => {
            handleClose(false);
            setSortFilterPurchasedContent(initStateOfSortFilterPurchasedContent);
            navigate("/reports/content")
          }}>
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
            className={`sort_item ${isSortActive("daily") ? "active" : ""}`}
            onClick={() => handleClick("sort", "daily")}
          >
            <img src={dailyic} className="icn" alt="Daily" />
            <p className="sort_txt">View daily</p>
          </div>
          <div
            className={`sort_item ${isSortActive("weekly") ? "active" : ""}`}
            onClick={() => handleClick("sort", "weekly")}
          >
            <img src={weeklyic} className="icn" alt="Weekly" />
            <p className="sort_txt">View weekly</p>
          </div>
          <div
            className={`sort_item ${isSortActive("monthly") ? "active" : ""}`}
            onClick={() => handleClick("sort", "monthly")}
          >
            <img src={monthlyic} className="icn" alt="Monthly" />
            <p className="sort_txt">View monthly</p>
          </div>
          <div
            className={`sort_item ${isSortActive("yearly") ? "active" : ""}`}
            onClick={() => handleClick("sort", "yearly")}
          >
            <img src={calendaric} className="icn" alt="yearly" />
            <p className="sort_txt">View yearly</p>
          </div>
          <div className="sort_item opnlist d-flex">
            <img src={custom} alt="" />
            <div className="optnVlaue custmView d-flex">
              <span className="fromDate">
                From
                <DatePicker onChange={(e) => handleClick("timeRangeStart", e)} />
              </span>
              <span className="toDate">
                To
                <DatePicker onChange={(e) => handleClick("timeRangeEnd", e)} />
              </span>
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
            className={`sort_item ${sortFilterPurchasedContent?.favContent ? "active" : ""}`}
            onClick={() =>
              setSortFilterPurchasedContent((prev) => ({
                ...prev,
                favContent: !prev?.favContent,
              }))
            }
          >
            <img src={favouritic} className="icn" alt="favourited" />
            <p className="sort_txt">Favourited content</p>
          </div>
          {
            !shaEx ? <>
              <div
                className={`sort_item ${sortFilterPurchasedContent?.type?.includes("exclusive") ? "active" : ""}`}
                onClick={() => handleClick("type", "exclusive")}
              >
                <img src={exclusiveic} className="icn" alt="Exclusive" />
                <p className="sort_txt">Exclusive content</p>
              </div>
              <div
                className={`sort_item ${sortFilterPurchasedContent?.type?.includes("shared") ? "active" : ""}`}
                onClick={() => handleClick("type", "shared")}
              >
                <img src={sharedic} className="icn" alt="Shared" />
                <p className="sort_txt">Shared content</p>
              </div></> : null
          }
          <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Category
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
            {categories?.map((curr, index) => (
              <div
                key={index}
                className={`sort_item ${isCategoryActive(curr._id) ? "active" : ""
                  }`}
                onClick={() => handleClick("category", curr._id)}
              >
                <input type="checkbox" className="fltr_checkbx" />
                <img src={curr.icon} className="icn" alt="Celebrity" />
                <p className="sort_txt">{curr.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={() => {
          handleApply();
          setSortFilterPurchasedContent((prev) => {
            const updatedData = { ...prev };
            updatedData.change = !updatedData.change;
            return updatedData;
          })
        }}>Apply</button>
      </div>
    </>
  );
};

export default ReportPurchasedSourced;
