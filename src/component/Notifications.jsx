import React, { memo, useEffect, useState } from "react";
import ntf_hdr from "../../src/assets/images/notification_imgs/bell.svg";
import closeic from "../../src/assets/images/notification_imgs/close.svg";
import { FiSearch } from "react-icons/fi";
import fltric from "../assets/images/notification_imgs/filter.svg";
import avtrimg1 from "../assets/images/avatars/usrimg1.svg";
import { update } from "lodash";
import { Get, Patch } from "../services/user.services";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Notifications = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const Navigate = useNavigate();

  const getNotification = async () => {
    try {
      const res = await Get(`mediaHouse/notificationlisting`);
      setData(res?.data?.data);
      setCount(res?.data?.count);
      // console.log(res, `<---------respone of notification`)
      // console.log("all nofication message -->", res?.data?.data);
    } catch (err) {
      console.log(`<---------err`, err);
    }
  };

  const read = async (_id) => {
    try {
      let obj = {
        notification_id: _id,
      };
      const res = await Patch(`mediahouse/updatenotification`, obj);
      if (res) {
        getNotification();
      }
    } catch (err) {
      console.log(err, `<---------err`);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);
  console.log(data, `notification data  ---------> ------->`);

  return (
    <>
      {props.show && (
        <div className="notifications_wrap">
          <div className="ntf_hdr">
            <div className="notf_icn_wrp">
              <img src={ntf_hdr} className="ntf_icn" alt="Notification bell" />
              <span className="ntf_count">{count}</span>
            </div>
            <p className="hdng">Notifications</p>
            <span onClick={props.update}>
              <img
                src={closeic}
                height="17px"
                className="icn close"
                alt="Close"
              />
            </span>
          </div>
          <div className="notf_srch">
            <FiSearch className="searchIcon" />
            <input
              type="text"
              className="notf_srch_inp"
              placeholder="Search chats"
            />
            <img src={fltric} className="icn filter" alt="" />
          </div>

          {/* notfication content Start */}

          <div className="notfs_list">
            {data &&
              data.map((curr) => {
                return (
                  <div className="notf_wrp" onClick={() => read(curr?._id)}>
                    <div className="notf_item active">
                      {curr?.sender_id?.role === "Hopper" ? (
                        <img
                          src={
                            process.env.REACT_APP_AVATAR_IMAGE +
                            curr?.sender_id?.avatar_id?.avatar
                          }
                          className="notf_img"
                          alt=""
                        />
                      ) : (
                        <img
                          src={
                            process.env.REACT_APP_ADMIN_IMAGE +
                            curr?.sender_id?.profile_image
                          }
                          className="notf_img"
                          alt=""
                        />
                      )}
                      <div className="notf_cont_rt">
                        <p className="notf_usr d-flex align-items-center justify-content-between">
                          {curr?.sender_id?.role === "Hopper"
                            ? curr?.sender_id?.user_name
                            : curr?.sender_id?.name}
                          <span className="notf_time_txt">
                            {moment(curr?.createdAt).format(`hh:mm A`)}
                          </span>
                        </p>
                        <p className="notf_txt">{curr?.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Notifications);
