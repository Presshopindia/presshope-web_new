import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import daily from '../assets/images/sortIcons/daily.svg';
import weekly from '../assets/images/sortIcons/weekly.svg';
import monthly from '../assets/images/sortIcons/monthly.svg';
import yearly from '../assets/images/sortIcons/yearly.svg';
import custom from '../assets/images/sortIcons/custom.svg';

import content from '../assets/images/sortIcons/content.svg';
import money from '../assets/images/sortIcons/money.svg';
import pending from '../assets/images/sortIcons/pending.svg';

import task from '../assets/images/task.svg';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TransactionSort = (props) => {
  const { open, onClose, actions } = props;
  const [selectedDate, setSelectedDate] = useState(null);

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
            <div className="opnlist selected">
              <img src={daily} alt="" />
              <span className='optnVlaue'>Daly</span>
            </div>
            <div className="opnlist">
              <img src={weekly} alt="" />
              <span className='optnVlaue'>Weekly</span>
            </div>
            <div className="opnlist">
              <img src={monthly} alt="" />
              <span className='optnVlaue'>Monthly</span>
            </div>
            <div className="opnlist">
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
              <img src={task} alt="" />
              <span className='optnVlaue'>View tasks</span>
            </div>
            <div className="opnlist">
              <img src={content} alt="" />
              <span className='optnVlaue'>View content</span>
            </div>
            <div className="opnlist selected">
              <img src={money} alt="" />
              <span className='optnVlaue'>View payments made</span>
            </div>
            <div className="opnlist">
              <img src={pending} alt="" />
              <span className='optnVlaue'>View payments pending</span>
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default TransactionSort