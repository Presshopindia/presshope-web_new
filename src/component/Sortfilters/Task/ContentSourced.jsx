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
import dailyic from "../../../assets/images/sortIcons/daily.svg";
import weeklyic from "../../../assets/images/sortIcons/weekly.svg";
import monthlyic from "../../../assets/images/sortIcons/monthly.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { BsEye } from "react-icons/bs";


const ContentSourced = ({ close, hide, closeContentSourced, contentRangeTimeValues,active,setActive }) => {
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [paramSort, setParmsSort] = useState({ paramsName: "", params: "" })

  //const [active, setActive] = useState("")

  const handleClose = (values) => {
    if(values===false){
      contentRangeTimeValues("")
      setActive("")
    }
    closeContentSourced(values)
  }
  const [sorting, setSorting] = useState("")
  const handleClickTime = (values) => {
    setSorting(values)
    setActive(values)
  }
  const handleSort = () => {
    contentRangeTimeValues(sorting)
    handleClose()
  }


  const handleDateChange = (newValue, type) => {
    if (newValue !== null) {
      const formattedDate = moment(newValue.$d).format('YYYY-MM-DD');
      if (type === 'start_date') {
        setStartDate(formattedDate);
        setParmsSort((prev) => ({
          ...prev,
          paramsName: "start_date",
          params: formattedDate
        }));

      } else if (type === 'end_date') {
        setEndDate(formattedDate);
        setParmsSort((prev) => ({
          ...prev,
          paramsName: "end_date",
          params: formattedDate
        }));
      }
    }
  };


  return (
    <>
      {

        hide &&
        <div className="filter_wrap">
          <div className="srt_fltr_hdr" onClick={() => handleClose()}>
            <img src={closeic} height="17px" className="icn close" alt="Close"
              onClick={close}
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
            <div className={`sort_item ${active === "daily" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("daily")} >
              <img src={dailyic} className="icn" alt="Daily" />
              <p className="sort_txt" onClick={() => setParmsSort((prev) =>
              ({
                ...prev,
                paramsName: "daily",
                params: "daily"
              }
              ))}>View daily</p>
            </div>
            <div className={`sort_item ${active === "weekly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("weekly")}>
              <img src={weeklyic} className="icn" alt="Weekly" />
              <p className="sort_txt"
                onClick={() => setParmsSort((prev) =>
                ({
                  ...prev,
                  paramsName: "weekly",
                  params: "weekly"
                }
                ))}
              >View weekly</p>
            </div>
            <div className={`sort_item ${active === "monthly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("monthly")}>
              <img src={monthlyic} className="icn" alt="Monthly" />
              <p className="sort_txt"
                onClick={() => setParmsSort((prev) =>
                ({
                  ...prev,
                  paramsName: "monthly",
                  params: "monthly"
                }
                ))}

              >View monthly</p>
            </div>
            <div className={`sort_item ${active === "yearly" ? "active" : null}`} style={{ cursor: "pointer" }} onClick={() => handleClickTime("yearly")}>
              <img src={calendaric} className="icn" alt="yearly" />
              <p className="sort_txt"
                onClick={() => setParmsSort((prev) =>
                ({
                  ...prev,
                  paramsName: "yearly",
                  params: "yearly"
                }
                ))}
              >View yearly</p>
            </div>
            {/* <div className="sort_item">
              <div className="d-flex align-items-center gap-3 w-100">
                <div className="fltr_lft">
                  <BsEye className="icn" />
                </div>
                <div className="fltr_rt d-flex gap-2">
                  <div className="date_item sort_date_item">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className='tsk_time_inp'
                        inputFormat='YYYY-MM-DD'
                        minDate={new Date()}
                        value={start_date}
                        onChange={(newValue) => handleDateChange(newValue, 'start_date')}
                        renderInput={(params) => <TextField {...params} error={false} />}
                      />

                    </LocalizationProvider>
                  </div>
                  <div className="date_item sort_date_item">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className='tsk_time_inp'
                        inputFormat='YYYY-MM-DD'
                        minDate={new Date()}
                        value={end_date}
                        onChange={(newValue) => handleDateChange(newValue, 'end_date')}
                        renderInput={(params) => <TextField {...params} error={false} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Filter
            </p>
          </div> */}
          {/* <div className="sort_list">
            <div className="sort_item">
              <img src={latestic} className="icn" alt="Live tasks" />
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
              <img src={celebrityic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Celebrity content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={politicalic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Political content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={crimeic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Crime content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={businessic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Business content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Fashion content</p>
            </div>
          </div>
          </div> */}
          <button className="fltr_btn mt-3"
            onClick={() => {
              // ContentSourced(paramSort.paramsName, paramSort.params);
              handleSort()
            }

            }
          >Apply</button>
        </div>}
    </>
  );
};

export default ContentSourced;
