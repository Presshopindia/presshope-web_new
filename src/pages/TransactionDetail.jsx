import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import account from "../assets/images/piggy.svg";
import code from "../assets/images/code.svg";
import bank from "../assets/images/bank.svg";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import sharedic from "../assets/images/shared.svg";
import audioic from "../assets/images/audimg.svg";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft, BsChevronDown } from "react-icons/bs";
import feedcontimg from "../assets/images/imgn6.jpg";
import { AiOutlineStar } from "react-icons/ai";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import Loader from "../component/Loader";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import contentimg from "../assets/images/Contentdetail/content3.png";
import favic from "../assets/images/favouritestar.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import audiosm from "../assets/images/audimgsmall.svg";
import "swiper/css";
import { Pagination } from "swiper";
import { formatAmountInMillion } from "../component/commonFunction";
const TransactionDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState();
  const [exclusiveContent, setExclusiveContent] = useState([]);
  const [contentId, setContentId] = useState(null);

  const getTransactionDetails = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/getallinvoiseforMediahouse?id=${id}`);
      if (res) {
        setContentId(res?.data?.resp?.content_id?._id)
        setTransactionDetails(res?.data?.resp);
        setLoading(false);
      }
    } catch (er) {
      // console.log(er, `<------erors`);
      setLoading(false);
    }
  };

  const ExclusiveContnetLists = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediaHouse/get/exclusive/content`);
      if (res) {
        setExclusiveContent(res?.data?.data);
        setLoading(false);
      }
    } catch (er) {
      // console.log(er, `<------erors`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionDetails();
    ExclusiveContnetLists();
  }, []);

  const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const handleCloseRecentActivity = (values) => {
    setOpenRecentActivity(values);
  };

  const [recentActivityValues, setRecentActivityValues] = useState({
    field: "",
    value: "",
  });

  const handleRecentActivityValue = (value) => {
    // console.log("handleFavouriteComponentValues", value);
    setRecentActivityValues({ field: value.field, value: value.values });
  };

  // recent activity
  const recentActivity = async () => {
    try {
      if (contentId) {
        const response = await Post('mediaHouse/recentactivityformediahouse', {
          content_id: contentId,
        });

        // console.log("response 1902", response)

      }
    } catch (err) {
      console.error(err); // Use "err" instead of "er"
    }
  };

  useEffect(() => {
    recentActivity();
  }, [contentId]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <Link onClick={() => history.back()}>
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                  </div>
                  <Row className="">
                    <Col md={8}>
                      {/* old start */}
                      {/* <Card className="feeddetail-card left-card dtl_top_lft">
                        <CardContent className="card-content">
                          <img src={feedcontimg} alt="" />
                          <div className="feedTitle_content pb-3">
                            <h1 className="feedTitle">
                              {transactionDetails?.content_id?.heading}
                            </h1>
                            <p>{transactionDetails?.content_id?.description}</p>
                          </div>
                          <div className="text-end my-3 mx-4">
                            <Link className="txt_bold text-dark">
                              View more{" "}
                              <BsArrowRight className="text-pink ms-1" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card> */}
                      {/* old end */}
                      {/* New start */}
                      <Card className="feeddetail-card left-card dtl_top_lft">
                        <CardContent className="card-content position-relative">
                          <div className="post_itm_icns dtl_icns">
                            <span className="count">1</span>
                            <img
                              className="feedMediaType iconBg"
                              postcount={""}
                              src={cameraic}
                              alt=""
                            />
                          </div>
                          <div className="post_itm_icns right dtl_icns">
                            <img
                              className="feedMediaType iconBg"
                              src={favic}
                              alt=""
                            />
                          </div>
                          {/* <img src={data ? (data.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].thumbnail : (data?.paid_status === "paid" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].media : data.content[0].watermark)) : (fav?.content_id.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].thumbnail : process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].media)} alt="" /> */}
                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            nested={true}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            <SwiperSlide>
                              {transactionDetails?.content_id?.content
                                ?.slice(0, 3)
                                .map((item) => {
                                  return (
                                    <img
                                      src={
                                        item?.media_type ===
                                          "video"
                                          ? process.env
                                            .REACT_APP_CONTENT_MEDIA +
                                          item?.thumbnail
                                          : item?.media_type ===
                                            "audio"
                                            ? audiosm
                                            : process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            item?.media
                                      }
                                      className="content_img"
                                    />
                                  );
                                })}
                            </SwiperSlide>
                          </Swiper>
                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {transactionDetails?.content_id?.heading}
                            </h1>
                            {/* <p className="feed_descrptn">
                              {transactionDetails?.content_id?.description}
                            </p> */}
                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={
                                transactionDetails?.content_id?.description
                              }
                            ></textarea>
                          </div>
                          {/* <div className="text-end my-3 mx-4">
                            <Link className="txt_bold text-dark">
                              View more{" "}
                              <BsArrowRight className="text-pink ms-1" />
                            </Link>
                          </div> */}
                        </CardContent>
                      </Card>

                      {/* New End */}
                    </Col>
                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info trnsc_info_crd">
                        <CardContent className="card-content">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography> Content info</Typography>
                              {transactionDetails?.content_id?.is_favourite ===
                                true && (
                                  <div className="favourite">
                                    <AiOutlineStar />
                                    <span>Favourite</span>
                                  </div>
                                )}
                            </div>
                          </div>
                          {/* <hr /> */}
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      transactionDetails?.hopper_id?.avatar_id
                                        ?.avatar
                                    }
                                    alt=""
                                  />
                                  <span className="hpr_nme">
                                    {transactionDetails?.hopper_id?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />
                                    {transactionDetails?.type === "content" ? (
                                      <div>
                                        {
                                          transactionDetails?.content_id
                                            ?.location
                                        }
                                      </div>
                                    ) : (
                                      <div>
                                        {transactionDetails?.task_id?.location}
                                      </div>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  {transactionDetails?.type === "content" ? (
                                    <span>
                                      <MdOutlineWatchLater />
                                      {moment(
                                        transactionDetails?.content_id
                                          ?.published_time_date
                                      ).format(`hh:mm A, DD MMMM YYYY`)}
                                    </span>
                                  ) : (
                                    <span>
                                      <MdOutlineWatchLater />{" "}
                                      {moment(
                                        transactionDetails?.task_id?.timestamp
                                      ).format(`hh:mm A, DD MMMM YYYY`)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hashtags</span>
                                <div>
                                  <div className="item-in-right hashtag-wrap">
                                    {transactionDetails?.type === "content" &&
                                      transactionDetails?.content_id &&
                                      transactionDetails?.content_id?.tag_ids
                                        .slice(0, 3)
                                        .map((curr) => (
                                          <span key={curr?._id} className="mr">
                                            {curr?.name}
                                          </span>
                                        ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>

                                {transactionDetails?.type === "content" ? (
                                  <div className="">
                                    <span className="txt_catg_licn">
                                      {
                                        transactionDetails?.content_id
                                          ?.category_id?.name
                                      }
                                    </span>
                                  </div>
                                ) : (
                                  <div className="">
                                    <span className="txt_catg_licn">
                                      {
                                        transactionDetails?.task_id?.category_id
                                          ?.name
                                      }
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">License</span>

                                {transactionDetails?.type === "content" &&
                                  transactionDetails?.content_id?.type ===
                                  "shared" ? (
                                  <div className="">
                                    <img
                                      src={sharedic}
                                      className="exclusive-img"
                                      alt=""
                                    />
                                    <span className="txt_catg_licn">
                                      Shared
                                    </span>
                                  </div>
                                ) : (
                                  <div className="">
                                    <img
                                      src={exclusive}
                                      className="exclusive-img"
                                      alt=""
                                    />
                                    <span className="txt_catg_licn">
                                      Exclusive
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="foot cont-info-actions d-flex justify-content-between align-items-center">
                              <span className="greyBtn">
                                £{transactionDetails?.amount}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div className="transactionDetail_wrap mb-5">
                  <h3 className="card_headings">Transaction details</h3>
                  <Row>
                    <Col md={4}>
                      <div className="invoice_summary">
                        <h5 className="transaction_hdngs">Invoice Summary</h5>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Transaction ID</h6>
                            <h6>{transactionDetails?._id}</h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice number</h6>
                            <h6>{transactionDetails?.invoiceNumber}</h6>
                          </div>
                        </div>
                        <hr />
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice from</h6>
                            <h6>
                              {transactionDetails?.media_house_id?.company_name}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice date </h6>
                            <h6>
                              {moment(transactionDetails?.createdAt).format(
                                `DD MMMM YYYY`
                              )}
                            </h6>
                          </div>
                        </div>
                        <hr />
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Amount</h6>
                            <h6>
                              £
                              {transactionDetails?.amount -
                                transactionDetails?.Vat}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>VAT 20%</h6>
                            <h6>£{transactionDetails?.Vat}</h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Total amount paid</h6>
                            <h6>£{transactionDetails?.amount}</h6>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="paymentBank_summary invoice_summary h-100">
                        <Row>
                          <Col md={6}>
                            <div className="payment_summary">
                              <h5 className="transaction_hdngs">
                                Payment Summary
                              </h5>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Payment date</h6>
                                  <h6>
                                    {moment(
                                      transactionDetails?.createdAt
                                    ).format(`DD MMMM YYYY`)}
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Payment time</h6>
                                  <h6>
                                    {moment(
                                      transactionDetails?.createdAt
                                    ).format(`hh:mm A`)}
                                  </h6>
                                </div>
                              </div>
                              <hr />

                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Paid to</h6>
                                  <h6>
                                    {
                                      transactionDetails?.payment_admin_id
                                        ?.office_details?.company_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Address </h6>
                                  <h6>
                                    {
                                      transactionDetails?.payment_admin_id
                                        ?.office_details?.address
                                    }
                                  </h6>
                                </div>
                              </div>
                              <hr />
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Company number</h6>
                                  <h6>
                                    {
                                      transactionDetails?.payment_admin_id
                                        ?.office_details?.company_number
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>VAT number</h6>
                                  <h6>
                                    {
                                      transactionDetails?.payment_admin_id
                                        ?.office_details?.company_vat
                                    }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="banking_summary">
                              <h5 className="transaction_hdngs">
                                Banking Summary
                              </h5>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={bank} alt="" />
                                    </span>
                                    Payee bank
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_id
                                        ?.bank_details?.bank_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={code} alt="" />
                                    </span>
                                    Sort Code{" "}
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_id
                                        ?.bank_details?.sort_code
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={account} alt="" />
                                    </span>
                                    Account number
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_id
                                        ?.bank_details?.account_number
                                    }
                                  </h6>
                                </div>
                              </div>
                              <hr />
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={bank} alt="" />
                                    </span>
                                    Payer bank{" "}
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.media_house_id
                                        ?.company_bank_details?.bank_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              {/* <hr /> */}
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={code} alt="" />
                                    </span>
                                    Sort Code
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.media_house_id
                                        ?.company_bank_details?.sort_code
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={account} alt="" />
                                    </span>
                                    Account number
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.media_house_id
                                        ?.company_bank_details?.account_number
                                    }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Related content</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenRecentActivity(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openRecentActivity && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                          />
                        )}
                      </div>
                      <Link>
                        View all <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {exclusiveContent &&
                      exclusiveContent.slice(0, 3).map((curr) => {
                        const images = curr?.content?.filter(
                          (item) => item.media_type === "image"
                        );
                        const imageCount =
                          images && images.length > 0 ? images.length : 0;

                        const audio = curr?.content?.filter(
                          (item) => item.media_type === "audio"
                        );
                        const audioCount =
                          audio && audio.length > 0 ? audio.length : 0;

                        const CVideo = curr?.content?.filter(
                          (item) => item.media_type === "video"
                        );
                        const videoCount =
                          CVideo && CVideo.length > 0 ? CVideo.length : 0;
                        const Avtar = curr?.hopper_id?.avatar_id?.avatar;

                        const contentImage =
                          curr.paid_status === "un_paid"
                            ? curr?.content[0]?.media_type === "image"
                              ? curr?.content[0]?.watermark
                              : curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.watermark
                                : curr?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : ""
                            : curr?.content[0]?.media_type === "image"
                              ? curr?.content[0]?.media
                              : curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.media
                                : curr?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : "";

                        return (
                          <Col md={3} key={curr?._id}>
                            <ContentFeedCard
                              feedImg={contentImage}
                              feedTypeImg={audioic}
                              feedTypeAudio={audioic}
                              feedTypeVieo={audioic}
                              feedTag={"Most Viewed"}
                              userAvatar={
                                process.env.REACT_APP_AVATAR_IMAGE + Avtar
                              }
                              authorName={curr?.hopper_id?.user_name}
                              type_img={curr?.type === "exclusive" && exclusive}
                              type_tag={
                                curr?.type === "exclusive" && "Exclusive"
                              }
                              feedHead={curr?.description}
                              feedTime={curr?.type == "content" ? moment(curr?.content_id?.published_time_date).format(`hh:mm A, DD MMMM YYYY`) : moment(curr?.timestamp).format(`hh:mm A, DD MMMM YYYY`)}
                              feedLocation={curr?.location}
                              contentPrice={`${formatAmountInMillion(curr?.ask_price)}`}
                              postcount={2}
                              feedTypeImg2={interviewic}
                              postcount2={3}
                            />
                          </Col>
                        );
                      })}

                    {/* <Col md={3}>
                      <ContentFeedCard feedImg={img2} feedType={contentCamera} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={exclusive} type_tag={"Exclusive"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£800'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={img2} feedType={contentVideo} feedTag={"Hot"} userAvatar={avatar} authorName={"pseudonymous"}
                        type_img={exclusive} type_tag={"Exclusive"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£4000'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={imgs} feedType={contentCamera} feedTag={"Most Viewed"} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={exclusive} type_tag={"Exclusive"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£1000'}
                      />
                    </Col> */}

                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>More content from Pseudynoumos</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenRecentActivity(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openRecentActivity && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                          />
                        )}
                      </div>
                      <Link to="/more-content/hopper_id" className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default TransactionDetail;
