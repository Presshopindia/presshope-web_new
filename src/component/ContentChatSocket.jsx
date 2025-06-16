import { Card, CardContent, Typography } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import presshopchatic from "../assets/images/chat_logo.png";

import { Get, Post } from "../services/user.services";
import Loader from "./Loader";
import { UserDetails } from "./Utils";
import { useDarkMode } from "../context/DarkModeContext";
import socketServer from "../socket.config";
import heart from "../assets/images/heart.svg";
import { successToasterFun } from "./commonFunction";

function ContentChatSocket(props) {
  const [offer_value, setOffer_value] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [features, setFeatures] = useState([]);
  const chatBoxRef = useRef(null);

  const handleFeatures = (val) => {
    if (features.includes(val)) {
      const data = features.filter((el) => el != val);
      setFeatures(data);
    } else {
      setFeatures([...features, val]);
    }
  };
  const handleRating = (rate) => {
    setRating(rate);
  };

  const { profileData } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const username = profileData?.full_name;
  const user = profileData;
  const fullName = user?.first_name + " " + user?.last_name;

  const Payment = async (
    amount,
    image_id,
    reconsider = false,
    reconsider_amount = 0,
    room_id
  ) => {
    try {
      setLoading(true);
      const obj1 = {
        customer_id: UserDetails.stripe_customer_id,
        type: "content",
        amount,
        image_id,
        reconsider,
        reconsider_amount,
        room_id: room_id?.room_id,
        offer: true,
        is_charity: props?.data?.is_charity,
        description: props?.data?.heading,
      };
      const obj2 = {
        type: "content",
        product_id: image_id,
        amount_paid: amount,
        commission: 0,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);
      obj1.application_fee = resp1?.data?.data;
      // obj1.stripe_account_id = resp1?.data?.stripe_account_id;
      obj1.stripe_account_id = props?.data?.is_charity
        ? props?.data?.stripe_account_id
        : resp1?.data?.stripe_account_id;
      const resp2 = await Post("mediahouse/createPayment", obj1);
      window.open(resp2?.data?.url, "_blank");
      if (resp2) {
        setLoading(false);
      }
      // const resp2 = await Post("mediahouse/ContentChatSocket", obj1);
      // window.open(resp2.data.url, "_blank");
      // if (resp2) {
      //   setLoading(false);
      // }
    } catch (error) {
      setLoading(false);
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  // const RatingNReview = (image_id) => {
  //     const obj = {
  //         room_id: props.room_details.room_id,
  //         sender_type: "Mediahouse",
  //         receiver_id: props.room_details.receiver_id,
  //         sender_id: props.room_details.sender_id,
  //         rating: rating,
  //         review: review,
  //         chat_id: props.messages && props.messages.find((obj) => obj.message_type === "rating_mediaHouse")._id,
  //         type: "content",
  //         image_id: image_id
  //     }
  //     socketServer.emit("rating", obj)
  //     socketServer.on("rating", (obj) => {
  //     })
  //     getMessages(props.room_details.room_id)
  // }

  const RatingNReview = (image_id, paid_status) => {
    const obj = {
      room_id: props?.room_details.room_id,
      sender_type: "Mediahouse",
      receiver_id: props?.room_details.receiver_id,
      sender_id: props?.room_details.sender_id,
      rating: rating,
      review: review,
      type: "content",
      image_id: image_id,
      features: features,
      message_type: "rating_by_mediahouse",
      paid_status,
    };
    socketServer.emit("rating", obj);
    socketServer.on("rating", (data) => {
      props?.getMessages();
    });
  };

  // const DownloadContent = async (id) => {
  //     setLoading(true);
  //     try {
  //         const resp = await Get(`mediahouse/image_pathdownload?image_id=${id}&type=content`)
  //         setLoading(false);
  //         if (resp) {
  //             const filename = resp.data.message.slice(85)
  //             fetch(resp.data.message)
  //                 .then(response => response.blob())
  //                 .then(blob => {
  //                     const downloadElement = document.createElement('a');
  //                     const url = URL.createObjectURL(blob);
  //                     downloadElement.href = url;
  //                     downloadElement.download = filename;
  //                     downloadElement.click();
  //                     URL.revokeObjectURL(url);
  //                     setLoading(false)
  //                 });
  //         }
  //     }
  //     catch (error) {
  //         setLoading(false);
  //     }
  // }

  const DownloadContent = async (id) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=content`,
      "_blank"
    );
  };
  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  // Scroll to bottom when messages change
  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [ chatBoxRef.current.scrollHeight]);
  useEffect(() => {
    scrollToBottom();
  }, [chatBoxRef]);

  console.log("all props data ------>  -------> ,", props);

  return (
    <>
      {loading && <Loader />}
      <Card className="chatmain cht_ht">
        <CardContent className="chatting">
          <div className="chatting_header">
            <p className="mb-0">Manage content</p>
          </div>
          <div className="chat_msgs_scrl" ref={chatBoxRef}>
            <div className="externalText">
              <h6 className="txt_light">
                Welcome <span className="txt_bld">{fullName}</span>
              </h6>

              <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                <div className="img" style={{ width: '50px' }}>
                  <img src={presshopchatic} alt="User" className="usr_img" />
                </div>
                <div className="cht_txt postedcmnt_info" style={{ width: 'calc(100% - 50px)' }}>
                  <h5>
                    {"PressHop"}
                    <span className="text-secondary time">
                      {moment().format(
                        // curr?.createdAt
                        "h:mm A, D MMM YYYY"
                      )}
                    </span>
                  </h5>
                  <Typography className="comment_text">
                    Please click the 'Offer' button to make an offer, or simply
                    click 'Buy' to purchase the content
                  </Typography>
                </div>
              </div>
            </div>
            <>
              {props.messages
                ?.filter((el) => el?.amount != "0")
                ?.reverse()
                ?.map((curr) => {
                  console.log("all message current type---->---->", curr);
                  return curr?.message_type === "offer_started" ? (
                    <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                      <div className="img" style={{ width: '50px' }}>
                        <img
                          src={presshopchatic}
                          alt="User"
                          className="usr_img"
                        />
                      </div>
                      <div className="cht_txt postedcmnt_info" style={{ width: 'calc(100% - 50px)' }}>
                        <h5>
                          PressHop
                          <span className="text-secondary time">
                            {moment(curr?.createdAt).format(
                              "h:mm A, D MMM YYYY"
                            )}
                          </span>
                        </h5>
                        <Typography className="comment_text">
                          Enter your offer below
                        </Typography>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            props?.NewExternalChatFun(
                              "accept",
                              offer_value,
                              props?.data?.original_ask_price,
                              props?.room_details
                            );
                          }}
                          className="usr_upld_opts cont_opts"
                        >
                          <input
                            className="cht_prc_inp text-center"
                            disabled={props?.messages.length !== 1 && true}
                            type="number"
                            value={
                              props?.messages?.length <= 1 ? offer_value : null
                            }
                            placeholder={
                              props?.messages?.length > 1
                                ? `£${props?.messages?.find(
                                  (el) =>
                                    el?.message_type ==
                                    "accept_mediaHouse_offer" ||
                                    el?.message_type ==
                                    "decline_mediaHouse_offer"
                                )?.amount
                                }`
                                : "Enter price here ..."
                            }
                            onChange={(e) => {
                              setOffer_value(e.target.value);
                            }}
                          />

                          {
                            <button
                              className="theme_btn"
                              disabled={props?.messages.length !== 1 && true}
                              type="submit"
                            >
                              Submit
                            </button>
                          }
                        </form>
                      </div>
                    </div>
                  ) : curr?.message_type === "accept_mediaHouse_offer" ? (
                    <>
                      <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img src={userImage} alt="User" className="usr_img" />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <h5>
                            {username}
                            <span className="text-secondary time">
                              {moment(curr?.createdAt).format(
                                "h:mm A, D MMM YYYY"
                              )}
                            </span>
                          </h5>
                          <Typography className="comment_text">
                            Has offered <a className="link">£{curr?.amount}</a>{" "}
                            to buy the content
                          </Typography>
                        </div>
                      </div>
                      <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <div className="d-flex align-items-center msg-worries">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            PressHop has accepted your offer of{" "}
                            <a className="link">£{curr?.amount}</a> to sell the
                            content
                          </p>
                          <div className="usr_upld_opts">
                            <button
                              className={
                                curr.paid_status === true
                                  ? "sub_hdng_inn"
                                  : "theme_btn"
                              }
                              disabled={curr.paid_status === true}
                              onClick={() => {
                                Payment(
                                  +props?.messages?.find(
                                    (el) =>
                                      el?.message_type ==
                                      "Mediahouse_initial_offer"
                                  )?.initial_offer_price,
                                  props?.data?._id,
                                  false,
                                  0,
                                  props?.room_details
                                );
                              }}
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : curr?.message_type === "decline_mediaHouse_offer" ? (
                    <>
                      <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img src={userImage} alt="User" className="usr_img" />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <h5>
                            {username}
                            <span className="text-secondary time">
                              {moment(curr?.createdAt).format(
                                "h:mm A, D MMM YYYY"
                              )}
                            </span>
                          </h5>
                          <Typography className="comment_text">
                            Has offered <a className="link">£{curr?.amount}</a>{" "}
                            to buy the content
                          </Typography>
                        </div>
                      </div>

                      <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <div className="d-flex align-items-center msg-worries">
                            <h5 className="usr_name">
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg">
                            PressHop has rejected your offer of{" "}
                            <a className="link">£{curr?.amount}</a> to sell the
                            content
                          </p>
                        </div>
                      </div>

                      <div className="crd chatting_itm sngl_cht user-data">
                        <div className="chat-box d-flex align-items-start">
                          <div className="img">
                            <img
                              src={presshopchatic}
                              alt="User"
                              className="usr_img"
                            />
                          </div>
                          <div className="cht_txt postedcmnt_info">
                            <h5>
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                            <Typography className="comment_text">
                              Would you like to reconsider buying the content at{" "}
                              <a className="link">
                                £{props?.data?.original_ask_price}
                              </a>{" "}
                            </Typography>
                          </div>
                        </div>
                        <div className="usr_upld_opts user-btn d-flex align-items-center">
                          <button
                            className="theme_btn"
                            onClick={() => {
                              Payment(
                                +props?.data?.original_ask_price,
                                props?.data?._id,
                                true,
                                props?.data?.original_ask_price,
                                props?.room_details
                              );
                            }}
                            disabled={props?.messages?.find(
                              (el) => el?.message_type == "PaymentIntent"
                            )}
                          >
                            Buy
                          </button>
                          <button
                            className="theme_btn black-btn"
                            disabled={props?.messages?.find(
                              (el) => el?.message_type == "PaymentIntent"
                            )}
                            onClick={() =>
                              props?.NewExternalChatFun(
                                "no",
                                curr?.amount,
                                0,
                                props?.room_details
                              )
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </>
                  ) : curr?.message_type === "reject_mediaHouse_offer" ? (
                    <>
                      <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <div className="d-flex align-items-center msg-worries">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            No worries! Check out our awesome selection of
                            discounted content available for purchase
                          </p>
                          <div className="usr_upld_opts">
                            <button className="theme_btn">
                              Show Me The Offers
                            </button>
                          </div>
                          <p className="buy_btn_txt mb-0">
                            Please refer to our{" "}
                            <a className="link">terms and conditions</a>. If you
                            have any questions, please{" "}
                            <a className="link">contact</a> our helpful teams
                            who are available 24x7 to assist you. Thank you.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : curr?.message_type === "PaymentIntent" ? (
                    <>
                      <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <div className="d-flex align-items-center msg-worries">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Congrats, you’ve successfully purchased{" "}
                            {props?.data?.content?.length} content for{" "}
                            <a className="link">£{curr?.amount}</a>. Please
                            download the water-mark free, and high definition
                            content, by clicking below
                          </p>
                          <div className="usr_upld_opts">
                            <button
                              className="theme_btn"
                              onClick={() => DownloadContent(props?.data?._id)}
                            >
                              Download
                            </button>
                          </div>
                          <p className="buy_btn_txt mb-0">
                            Please refer to our{" "}
                            <a className="link">licensing terms of usage</a>,
                            and <a className="link">terms and conditions</a>. If
                            you have any questions, please{" "}
                            <a className="link">chat</a> or{" "}
                            <a className="link">contact</a> our helpful teams
                            who are available 24x7 to assist you. Thank you.
                          </p>
                        </div>
                      </div>

                      <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info rating-update">
                          <div className="d-flex align-items-center msg-worries">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Please rate your experience with PressHop
                          </p>
                          <div className="usr_reviews">
                            <Rating
                              onClick={handleRating}
                              value={rating}
                              initialValue={
                                +props?.messages?.find(
                                  (el) =>
                                    el.message_type == "rating_by_mediahouse"
                                )?.rating || 0
                              }
                              disabled={
                                props?.messages?.find(
                                  (el) =>
                                    el.message_type == "rating_by_mediahouse"
                                )?.rating
                              }
                            />
                            <p className="mb-0 msg auto_press_msg">
                              Please select the key features you liked about our
                              platform
                            </p>
                            <ul>
                              <li
                                onClick={() => handleFeatures("Experience")}
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes("Experience") ||
                                    features.includes("Experience")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Experience
                              </li>
                              <li
                                onClick={() => handleFeatures("Easy to use")}
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes("Easy to use") ||
                                    features.includes("Easy to use")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Easy to use
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures("Connectivity with Hoppers")
                                }
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Connectivity with Hoppers"
                                    ) ||
                                    features.includes("Connectivity with Hoppers")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Connectivity with Hoppers
                              </li>
                              <li
                                onClick={() => handleFeatures("Pricing")}
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes("Pricing") ||
                                    features.includes("Pricing")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Pricing
                              </li>
                              <li
                                onClick={() => handleFeatures("Secure payment")}
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes("Secure payment") ||
                                    features.includes("Secure payment")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Secure payment
                              </li>
                              <li
                                onClick={() => handleFeatures("Support")}
                                className={
                                  props?.messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes("Support") ||
                                    features.includes("Support")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Support
                              </li>
                            </ul>
                            <div className="position-relative">
                              <div className="right_text_svg">
                                <svg
                                  width="22"
                                  height="21"
                                  viewBox="0 0 22 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_5392_68582)">
                                    <path
                                      d="M13.5472 5.87891H3.86719V6.71891H13.5472V5.87891Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M13.5472 8.40039H3.86719V9.24039H13.5472V8.40039Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M11.3472 10.9199H3.86719V11.7599H11.3472V10.9199Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M9.14719 13.4395H3.86719V14.2795H9.14719V13.4395Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M9.14719 15.9609H3.86719V16.8009H9.14719V15.9609Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M17.0677 7.80604V3.60604L13.7298 0.419922H0.347656V20.5799H17.0677V13.1938L21.6498 8.81992L18.8277 6.12604L17.0677 7.80604ZM16.6277 9.4138L18.2055 10.9199L12.9255 15.9599H11.3477V14.4538L16.6277 9.4138ZM13.9877 1.8538L15.5655 3.35992H13.9877V1.8538ZM16.1877 19.7399H1.22766V1.25992H13.1077V4.19992H16.1877V8.64604L10.4677 14.106V16.7999H13.2898L16.1877 14.0338V19.7399ZM18.8277 10.326L17.2498 8.81992L18.8277 7.3138L20.4055 8.81992L18.8277 10.326Z"
                                      fill="#9DA3A3"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_5392_68582">
                                      <rect
                                        width="22"
                                        height="21"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Control
                                  placeholder="We hope you're enjoying your experience with PressHop. Please share your feedback with us. Your insights will help us enhance both your experience, and the quality of our service. Thank you"
                                  as="textarea"
                                  rows={3}
                                  onChange={(e) => setReview(e.target.value)}
                                  value={
                                    props?.messages?.find(
                                      (el) =>
                                        el.message_type ==
                                        "rating_by_mediahouse"
                                    )?.review || review
                                  }
                                ></Form.Control>
                              </Form.Group>
                            </div>

                            <button
                              className="theme_btn"
                              onClick={() =>
                                RatingNReview(props?.data?._id, true)
                              }
                              disabled={
                                props?.messages?.filter(
                                  (el) =>
                                    el.message_type == "rating_by_mediahouse"
                                )?.length != 0
                              }
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : curr?.message_type == "rating_by_mediahouse" ? (
                    <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start heart-icon">
                      <div className="img">
                        <img
                          src={presshopchatic}
                          alt="User"
                          className="usr_img"
                        />
                      </div>
                      <div className="cht_txt postedcmnt_info">
                        <div className="d-flex align-items-center msg-worries">
                          <h5 className="usr_name mb-0">
                            PressHop
                            <span className="text-secondary time">
                              {moment(curr?.createdAt).format(
                                "h:mm A, D MMM YYYY"
                              )}
                            </span>
                          </h5>
                        </div>
                        <p className="mb-0 msg auto_press_msg">
                          Thank you for your valuable feedback. Your views
                          matter a lot to us. Thank you very much for your
                          business <img src={heart} />
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })}
            </>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default React.memo(ContentChatSocket);
