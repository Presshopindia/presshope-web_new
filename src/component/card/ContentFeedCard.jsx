import * as React from "react";
import { useState } from "react";
import {
  CardActions,
  Button,
  Link,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import fav from "../../assets/images/star.svg";
import { useNavigate } from "react-router-dom";
import { Get, Patch, Post } from "../../services/user.services";
import Loader from "../Loader";
import { UserDetails } from "./../Utils";
import { SlMagnifierAdd } from "react-icons/sl";
import ViewContent from "../ViewContent";
import { useDarkMode } from "../../context/DarkModeContext";
import { parseFormattedAmount } from "../commonFunction";

function ContentFeedCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { setCartCount } = useDarkMode();

  const Favourite = async () => {
    try {
      let obj = {};

      if (props?.type == "task") {
        obj = {
          favourite_status: props.bool_fav === "true" ? "true" : "false",
          uploaded_content: props?.taskContentId
        };
      } else {
        obj = {
          favourite_status: props.bool_fav === "true" ? "true" : "false",
          content_id: props.content_id,
        };
      }

      await Patch(`mediaHouse/add/to/favourites`, obj);

    } catch (error) {
      console.log("addfav", error);
    }
  };

  const Most_Viewed = async () => {
    try {
      const obj = {
        user_id: user._id,
        content_id: props.content_id,
        type: "content",
      };
      const resp = await Post(`mediaHouse/mostviewed`, obj);
    } catch (error) {}
  };

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);

      setCartCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  const AddToBasket = async () => {
    props?.basket();
    try {
      let object = {
        content_id: [props.content_id],
        type: props.type,
        hopper_id: props?.hopper_id,
        amount: parseFormattedAmount(props?.contentPrice),
        stripe_account_id: props?.hopper_stripe_account_id,
        offer: false,
        application_fee: 15,
        hopper_charge_ac_category: 5,
        room_id: ""
      };


      const res = await Post(`mediaHouse/addToBasket`, object);
      if (res) {
        getCountOfBasketItems();
      }
    } catch (error) {
      console.log("errorMessage", error);
    }
  };

  return (
    <Card className="homeFeedCard feed_single_crd photo-resize">
    <CardContent
      className="homeFeed_body clickable"
      onClick={() => {
        if (props.most_viewed) {
          Most_Viewed();
          navigate(props.lnkto);
        } else {
          navigate(props.lnkto);
        }
      }}
    >
      <div className="feedImgTag">
        <div className="tags_prnt iflex">
          {props?.postcount ? (
            <div className="post_itm_icns">
              {props?.postcount && (
                <p className="count">{props.postcount}</p>
              )}
              <img
                className="feedMediaType iconBg"
                src={props?.feedTypeImg1}
                alt=""
              />
            </div>
          ) : null}

          {props?.postcount2 ? (
            <div className="post_itm_icns">
              {props?.postcount2 && (
                <p className="count">{props.postcount2}</p>
              )}
              <img
                className="feedMediaType iconBg"
                src={props?.feedTypeImg2}
                alt=""
              />
            </div>
          ) : null}
          {props?.postcount3 ? (
            <div className="post_itm_icns">
              {props?.postcount3 && (
                <p className="count">{props.postcount3}</p>
              )}
              <img
                className="feedMediaType iconBg"
                src={props?.feedTypeImg3}
                alt=""
              />
            </div>
          ) : null }
          {props?.postcount4 && (
            <div className="post_itm_icns">
              {props?.postcount4 && (
                <p className="count">{props.postcount4}</p>
              )}
              <img
                className="feedMediaType iconBg"
                src={props?.feedTypeImg4}
                alt=""
              />
            </div>
          )}
          {props?.postcount5 && (
            <div className="post_itm_icns">
              {props?.postcount5 && (
                <p className="count">{props?.postcount5}</p>
              )}
              <img
                className="feedMediaType iconBg"
                src={props?.feedTypeImg5}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="feedImgContainer">
          <img className="feedMedia" src={props?.feedImg} alt="" />
          <div className="backgroundOverlay"></div>
        </div>
        {props.fvticns ? (
          <div
            onClick={(event) => {
              event.stopPropagation();
              Favourite();
              props.favourite();
            }}
            className="z_index_high"
          >
            <img className="iconBg favCont" src={props.fvticns} alt="" />
          </div>
        ) : (
          ""
        )}
        {!props?.is_sale_status ? (
          <div
            onClick={(event) => {
              event.stopPropagation();
              AddToBasket();
            }}
            className="z_index_high"
          >
            <div className="iconBg favCont upload-icn">
              {props?.basketValue == "false" ? (
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                    stroke="white"
                    stroke-width="1.96354"
                  />
                </svg>
              ) : (
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                    stroke="white"
                    stroke-width="1.96354"
                  />
                  <path d="M9 8H27.5L25 18H12L9 8Z" fill="white" />
                </svg>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {props && props.feedTag && <span>{props?.feedTag}</span>}
      </div>
      <div
        // onClick={() => navigate(props?.lnkto)}
        onClick={() => navigate(props?.viewTransaction)}
        // props.viewTransaction
        className="feedContent_wrap"
      >
        <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
          <div className="authorType">
            <img src={props.user_avatar} alt="" />
            <span className="authName">{props?.author_Name}</span>
          </div>
          <div className="content_type">
            <img src={props.type_img} alt="" />
            <span className="typeOfContent">{props?.type_tag}</span>
          </div>
        </div>
        <Typography variant="body2" className="card-head-txt mb-2">
          {props?.feedHead}
          <br />
        </Typography>
        <div className="feed_dateTime">
          <small className="feedTime">
            <MdOutlineWatchLater /> {props.feedTime}
          </small>
          <small className="feedLocation">
            <GrLocation />
            {props.feedLocation}
          </small>
        </div>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          className=""
        >
          {props.ccontent}
        </Typography>
      </div>
    </CardContent>
    <CardActions
      className={`dash-c-foot feedFooter justify-content-between ${
        props?.before_discount_value ? "special-offr-cnt" : ""
      }`}
    >
      {props?.offeredPrice && (
        <Button className="offeredPrice_btn position-relative">
          {props?.offeredPrice}
          <span className="offered-badge">{props.offerbadge}</span>
        </Button>
      )}
      <Link
        to={props?.viewDetail}
        onClick={() => navigate(`${props.viewDetail}`)}
        className="red_font"
      >
        {props.viewTransaction}
      </Link>
      <div
        className={`btn-grp ${
          props?.before_discount_value ? "special-offr-btn" : ""
        }`}
      >
        {props?.before_discount_value ? (
          <Link
            to={props.viewDetail}
            onClick={() => navigate(`${props.viewDetail}`)}
          >
            <>
              <span className="contentPrice_text">
                £{props?.before_discount_value}
              </span>
              <button variant="primary" className="contentPrice_btn">
                £
                {props?.contentPrice?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                }) || 0}
              </button>
            </>
          </Link>
        ) : props?.contentPrice ? (
          <Link
            to={props.viewDetail}
            onClick={() => navigate(`${props.viewDetail}`)}
          >
            <button variant="primary" className="contentPrice_btn">
              £
              {props?.contentPrice?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              }) || 0}
            </button>
          </Link>
        ) : ""}
      </div>
    </CardActions>
  </Card>
  );
}

export default ContentFeedCard;
