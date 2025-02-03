import React, { useEffect } from "react";
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

import Form from "react-bootstrap/Form";

const ContentUnderOffer = () => {
  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img src={closeic} height="17px" className="icn close" alt="Close" />
          <p className="hdng">Sort and filter</p>
          <div className="notf_icn_wrp">
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list">
          <div className="sort_item">
            <img src={relevanceic} className="icn" alt="relevance" />
            <p className="sort_txt">Relevance</p>
          </div>
          <div className="sort_item">
            <img src={latestic} className="icn" alt="Latest content" />
            <p className="sort_txt">Latest content</p>
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
            <img src={mostviewdedic} className="icn" alt="Most viewded" />
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
          <div className="sort_item">
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
          </div>
          <div className="sort_item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="fltr_lft">
                <img src={locationic} className="icn" alt="Scans" />
                <p className="sort_txt">Location</p>
              </div>
              <div className="fltr_srch">
                <input type="text" className="srch_inp" placeholder="Search" />
                <img src={""} className="srch_icn" alt="search" />
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
          <div className="sort_item">
            <img src={favouritic} className="icn" alt="favourited" />
            <p className="sort_txt">Favourited content</p>
          </div>
          <div className="sort_item">
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div>
          <div className="sort_item">
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div>

          <div className="sort_item">
            <img src={latestic} className="icn" alt="Latest" />
            <p className="sort_txt">Latest content</p>
          </div>

          <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Category
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
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
          </div>
        </div>
        <button className="fltr_btn mt-3">Apply</button>
      </div>
    </>
  );
};

export default ContentUnderOffer;
