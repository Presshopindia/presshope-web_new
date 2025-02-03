import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import daily from '../assets/images/sortIcons/daily.svg';
import weekly from '../assets/images/sortIcons/weekly.svg';
import monthly from '../assets/images/sortIcons/monthly.svg';
import yearly from '../assets/images/sortIcons/yearly.svg';
import custom from '../assets/images/sortIcons/custom.svg';
import fav from '../assets/images/sortIcons/fav.svg';
import share from '../assets/images/share.png';
import latest from '../assets/images/sortIcons/latest.svg';
import underOffer from '../assets/images/sortIcons/underOffer.svg';
import political from '../assets/images/sortIcons/political.svg';
import business from '../assets/images/sortIcons/business.svg';
import dress from '../assets/images/sortIcons/dress.svg';
import sports from '../assets/images/sortIcons/sports.png';
import vip from '../assets/images/sortIcons/VIP.svg';
import crime from '../assets/images/sortIcons/crime.svg';
import exclusive from '../assets/images/exclusive.png';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ContentSortingDialog = ({ open, onClose, actions, rangeContentTimeValues }) => {
  const [selectedDate, setSelectedDate] = useState(null);


  const handleClickTime = (values) => {
    // console.log("values 16", values);
    rangeContentTimeValues(values)
    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} className="sortingDialog">
        <DialogTitle>
          <div className='d-flex align-items-center sortingHeadr justify-content-between'>
            <DialogActions>{actions}</DialogActions>
            <h4>Sort and Filter</h4>
            <span className='text-pink'>clear</span>
          </div>
        </DialogTitle>

        <DialogContent>
          <h5>Sort</h5>
          <div className="sortOptns">
            <div className="opnlist selected" onClick={() => handleClickTime("daily")}>
              <img src={daily} alt="" />
              <span className='optnVlaue'>Daly</span>
            </div>
            <div className="opnlist" onClick={() => handleClickTime("weakly")}>
              <img src={weekly} alt="" />
              <span className='optnVlaue'>Weekly</span>
            </div>
            <div className="opnlist" onClick={()=> handleClickTime("monthly")}>
              <img src={monthly} alt="" />
              <span className='optnVlaue'>Monthly</span>
            </div>
            <div className="opnlist" onClick={()=> handleClickTime("yearly")}>
              <img src={yearly} alt="" />
              <span className='optnVlaue'>Yearly</span>
            </div>
            <div className="opnlist d-flex">
              <img src={custom} alt="" />
              <div className='optnVlaue custmView d-flex'>
                <span className='fromDate'>
                  From
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </span>
                <span className='toDate'>
                  To
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </span>
              </div>

            </div>
          </div>
          <h5 className='mt-4'>Filter</h5>
          <div className="sortOptns">
            <div className="opnlist">
              <img src={fav} alt="" />
              <span className='optnVlaue'>Favourited content</span>
            </div>
            <div className="opnlist">
              <img src={underOffer} alt="" />
              <span className='optnVlaue'>Content under offer</span>
            </div>
            <div className="opnlist selected">
              <img src={exclusive} alt="" />
              <span className='optnVlaue'>Exclusive content</span>
            </div>
            <div className="opnlist">
              <img src={share} alt="" />
              <span className='optnVlaue'>Shared content</span>
            </div>
            <div className="opnlist">
              <img src={latest} alt="" />
              <span className='optnVlaue'>Latest content</span>
            </div>
            <div className="opnlist">
              <img src={vip} alt="" />
              <span className='optnVlaue'>Celebrity content</span>
            </div>
            <div className="opnlist">
              <img src={political} alt="" />
              <span className='optnVlaue'>Political content</span>
            </div>
            <div className="opnlist">
              <img src={crime} alt="" />
              <span className='optnVlaue'>Crime content</span>
            </div>
            <div className="opnlist">
              <img src={business} alt="" />
              <span className='optnVlaue'>Business content</span>
            </div>
            <div className="opnlist">
              <img src={dress} alt="" />
              <span className='optnVlaue'>Fashion content</span>
            </div>
            <div className="opnlist">
              <img src={sports} alt="" />
              <span className='optnVlaue'>Sports content</span>
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default ContentSortingDialog