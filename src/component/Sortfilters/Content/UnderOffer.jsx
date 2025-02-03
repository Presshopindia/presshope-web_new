import React, { useEffect, useState } from "react";
import closeic from "../../../assets/images/sortIcons/close.svg";
import exclusiveic from "../../../assets/images/exclusive.svg";
import sharedic from "../../../assets/images/shared.svg";
import { Get } from "../../../services/user.services";

const UnderOffer = ({ closeFilterComponent, feedMultiFilter, multiFilter, setMultiFilter, active, setActive }) => {
  const handleClose = (values) => {
    if (values === false) {
      feedMultiFilter([]);
      setMultiFilter([]);
      setActive([]);
    }
    closeFilterComponent(values);
  };

  const [categoryId, setCategoryId] = useState([]);
  const getCategory = async () => {
    try {
      const result = await Get("mediaHouse/getCategoryType?type=content");
      setCategoryId(result?.data?.data);
    } catch (error) {
      // console.log(error)
    }
  };

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
    feedMultiFilter(multiFilter);
    closeFilterComponent(false);
  };

  const clearAll = () => {
    setMultiFilter([]);
    setActive([]);
  };

  useEffect(() => {
    getCategory();
  }, []);

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
          <p className="sort_hdng" alt="">Filter</p>
        </div>
        <div className="sort_list">
          <div className={`sort_item ${multiFilter?.some(item => item.values === "exclusive") ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClickValues("type", "exclusive", 4)}>
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div className={`sort_item ${multiFilter?.some(item => item.values === "shared") ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => handleClickValues("type", "shared", 5)}>
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div>
          <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">Category</p>
          </div>
          <div className="d-flex flex-column gap-2">
            {categoryId && categoryId.map((curr, index) => (
              <div className={`sort_item ${multiFilter?.some(item => item.values === curr?._id) ? "active" : ""}`}
                style={{ cursor: "pointer" }} onClick={() => handleClickValues("category_id", curr?._id, 7)} key={index}>
                <input type="checkbox" className="fltr_checkbx" />
                <img src={curr?.icon} className="icn" alt={curr?.name} />
                <p className="sort_txt">{curr?.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="fltr_btn mt-3" onClick={() => { handleFilter(); handleClose() }}>Apply</button>
      </div>
    </>
  );
};

export default UnderOffer;
