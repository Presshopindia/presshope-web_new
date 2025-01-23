import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import daily from '../assets/images/sortIcons/daily.svg';
import weekly from '../assets/images/sortIcons/weekly.svg';
import monthly from '../assets/images/sortIcons/monthly.svg';
import yearly from '../assets/images/sortIcons/yearly.svg';
import custom from '../assets/images/sortIcons/custom.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const SortingDialog = ({open, onClose, actions, rangeTimeValues, dateValues}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClickTime = (values) => {
    // console.log("values 16", values);
    rangeTimeValues(values)
    onClose()
  }

  const handleClickDate = () => {
    dateValues()
  }



  return (
    <>
      <Dialog open={open} onClose={onClose} className="sortingDialog">
        <DialogTitle>
          <div className='d-flex align-items-center sortingHeadr justify-content-between'>
            <DialogActions>{actions}</DialogActions>
            <h4>Sort</h4>
            <span className='text-pink'>clear</span>
          </div>
        </DialogTitle>

        <DialogContent>
          <h5>Sort</h5>
          <div className="sortOptns">
            <div className="opnlist selected" onClick={() => handleClickTime("daily")}>
              <img src={daily} alt="" />
              <span className='optnVlaue'>Daily</span>
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
        </DialogContent>

      </Dialog>
    </>
  )
}

export default SortingDialog