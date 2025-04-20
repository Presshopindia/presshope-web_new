import { React, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import account from "../assets/images/piggy.svg";
import code from "../assets/images/code.svg";
import bank from "../assets/images/bank.svg";
import { Container, Row, Col } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import audioic from "../assets/images/audimg.svg";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater } from "react-icons/md";
import contentVideo from "../assets/images/contentVideo.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin, SlMagnifierAdd } from "react-icons/sl";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "../component/Loader";
import favic from "../assets/images/star.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import docsic from "../assets/images/docsic.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import shared from "../assets/images/share.png";
import moment from "moment";
import "swiper/css";

import { Pagination } from "swiper";
import { formatAmountInMillion } from "../component/commonFunction";
import ViewUploadedContent from "../component/ViewUploadedContent";

const PurchasedTaskContentDetail = () => {
  const [moreContent, setMoreContent] = useState([]);
  const [relatedContent, setRelatedContent] = useState([]);

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState();

  const [openContent, setOpenContent] = useState(false);
  const [showContent, setShowContent] = useState({});
  const [imageSize, setImageSize] = useState({ height: 0, width: 0 });

  const getTransactionDetails = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/getPurchasedTaskContentDetail?id=${id}`);
      if (res) {
        setTransactionDetails(res?.data?.resp);
        setShowContent(res?.data?.resp?.purchased_content?.[0]);

        const resp1 = await Post(`mediaHouse/MoreContentforTask`, {
          hopper_id: res?.data?.resp?.hopper_details?._id,
          task_id: res?.data?.resp?.task_details?._id,
        });
        setMoreContent(resp1?.data.content);
        const resp2 = await Post(`mediaHouse/relatedContent`, {
          content_id: res?.data?.resp.content_id?._id,
          limit: 4
        });
        setRelatedContent(resp2.data.content);

        setLoading(false);
      }
    } catch (er) {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTransactionDetails();
  }, []);

  const Audio = transactionDetails?.purchased_content?.filter(
    (item) => item?.type === "audio"
  );
  const Video = transactionDetails?.purchased_content?.filter(
    (item) => item?.type === "video"
  );
  const images = transactionDetails?.purchased_content?.filter(
    (item) => item?.type === "image"
  );

  // add fav
  const Favourite = async () => {
    try {
      const obj = {
        favourite_status:
          transactionDetails?.content_id?.favourite_status === "false"
            ? "true"
            : "false",
        content_id: transactionDetails?.content_id?._id,
      };
      const resp = await Patch(`mediaHouse/add/to/favourites`, obj);
      if (resp) {
        getTransactionDetails();
      }
    } catch (error) { }
  };

  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  };

  const DownloadContent = async (id) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=task`,
      "_blank"
    );
  };

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
                    <div
                      className="back_link clickable"
                      style={{ pointer: "cursor" }}
                      onClick={() => window.history.back()}
                    >
                      <BsArrowLeft className="text-pink" />
                      Back{" "}
                    </div>
                  </div>
                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="photo-resize">
                            <div className="post_icns_cstm_wrp">
                              {images && images.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {images && images.length > 0 && (
                                    <span className="count">
                                      {images &&
                                        images.length > 0 &&
                                        images.length}
                                    </span>
                                  )}

                                  {images && images.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={cameraic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}

                              {Video && Video.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Video && Video.length > 0 && (
                                    <span className="count">
                                      {Video &&
                                        Video.length > 0 &&
                                        Video.length}
                                    </span>
                                  )}
                                  {Video && Video.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={videoic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}
                              {Audio && Audio.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Audio && Audio.length > 0 && (
                                    <span className="count">
                                      {Audio &&
                                        Audio.length > 0 &&
                                        Audio.length}
                                    </span>
                                  )}

                                  {Audio && Audio.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={interviewic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}
                            </div>

                            <div
                              className="post_itm_icns right dtl_icns magnifier-icn-2"
                              onClick={() => {
                                setOpenContent(!openContent);
                              }}
                            >
                              <div className="feedMediaType iconBg view-icon">
                                <SlMagnifierAdd />
                              </div>
                            </div>
                            <ViewUploadedContent
                              openContent={openContent}
                              setOpenContent={setOpenContent}
                              showContent={showContent}
                              imageSize={imageSize}
                            />
                            <Swiper
                              spaceBetween={50}
                              slidesPerView={1}
                              pagination={{ clickable: true }}
                              modules={[Pagination]}
                              slidesPerGroupSkip={1}
                              focusableElements="pagination"
                              nested={true}
                              onSlideChange={(e) => {
                                setShowContent(
                                  transactionDetails?.purchased_content[
                                  e.activeIndex
                                  ]
                                );
                                if (
                                  transactionDetails?.purchased_content[
                                    e.activeIndex
                                  ]?.type == "image"
                                ) {
                                  const img = new Image();
                                  img.src =
                                    transactionDetails?.purchased_content[
                                      e.activeIndex
                                    ]?.videothubnail;
                                  img.onload = function () {
                                    setImageSize({
                                      height: img.height,
                                      width: img.width,
                                    });
                                  };
                                }
                              }}
                            >
                              {transactionDetails?.purchased_content?.map(
                                (curr) => (
                                  <SwiperSlide key={curr._id}>
                                    <div className="swiper-slide-content">
                                      {curr?.type === "image" && (
                                        <img
                                          src={curr?.videothubnail}
                                          alt={`Image ${curr._id}`}
                                        />
                                      )}
                                      {curr?.type === "audio" && (
                                        <div className="audio-wrapper">
                                          <img
                                            src={audioic}
                                            alt={`Audio ${curr._id}`}
                                            className="slider-img"
                                            onClick={toggleAudio}
                                          />
                                          <audio
                                            controls
                                            src={curr?.videothubnail}
                                            type="audio/mpeg"
                                            className="slider-audio"
                                            ref={audioRef}
                                          />
                                        </div>
                                      )}
                                      {curr?.type === "video" && (
                                        <video
                                          controls
                                          className="slider-video"
                                          src={curr?.imageAndVideo}
                                        />
                                      )}
                                    </div>
                                  </SwiperSlide>
                                )
                              )}

                              {/* )
                            })} */}
                            </Swiper>
                          </div>
                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {transactionDetails?.task_details?.heading}
                            </h1>
                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={
                                transactionDetails?.task_details?.task_description
                              }
                            ></textarea>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info trnsc_info_crd">
                        <CardContent className="card-content">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography> Content info</Typography>
                            </div>
                          </div>
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      transactionDetails?.hopper_details?.avatar_details
                                        ?.avatar
                                    }
                                    alt=""
                                  />
                                  <span className="hpr_nme">
                                    {transactionDetails?.hopper_details?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />
                                    {transactionDetails?.task_details?.location}
                                  </span>
                                </div>
                              </div>
                            </div> */}

                            {/* <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <MdOutlineWatchLater />{" "}
                                    {moment(
                                      transactionDetails?.createdAt
                                    ).format(`hh:mm A, DD MMM YYYY`)}
                                  </span>
                                </div>
                              </div>
                            </div> */}

                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />{" "}
                                    <div>
                                      {transactionDetails?.task_details?.location}
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <MdOutlineWatchLater />
                                    {moment(
                                      transactionDetails?.createdAt
                                    ).format(`hh:mm A, DD MMM YYYY`)}
                                  </span>
                                </div>
                              </div>
                            </div>


                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>
                                <div className="">
                                  <img
                                    src={
                                      transactionDetails?.task_details
                                        ?.category_id?.icon
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {
                                      transactionDetails?.task_details
                                        ?.category_id?.name
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot d-flex gap-5 justify-content-between align-items-center foot-button">
                              <Link to={``}>
                                <Button
                                  disabled={true}
                                  className="greyBtn custm_grey_btn"
                                >
                                  £
                                  {formatAmountInMillion(
                                    +(transactionDetails?.amount)
                                  )}
                                </Button>
                              </Link>
                              <Link to={``}>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    DownloadContent(
                                      transactionDetails?.purchased_content?.map(el => el?._id)?.join(",")
                                    )
                                  }
                                >
                                  Download
                                </Button>
                              </Link>
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
                            <h6>
                              <Link
                                to={`/invoice/${id}`}
                                className="text-danger"
                                style={{ color: "red" }}
                              >
                                {transactionDetails?.invoiceNumber}
                              </Link>
                            </h6>
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
                              {formatAmountInMillion(transactionDetails?.amount || 0)}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>VAT 20%</h6>
                            <h6>
                              £
                              {formatAmountInMillion(transactionDetails?.Vat || 0)}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Total amount paid</h6>
                            <h6>
                              £
                              {formatAmountInMillion((transactionDetails?.amount + transactionDetails?.Vat) || 0)}
                            </h6>
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
                                      transactionDetails?.admin_details
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
                                      transactionDetails?.admin_details
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
                                      transactionDetails?.admin_details
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
                                      transactionDetails?.admin_details
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
                                      transactionDetails?.admin_details?.bank_details
                                        ?.bank_name
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
                                      transactionDetails?.admin_details?.bank_details
                                        ?.sort_code
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
                                      transactionDetails?.admin_details?.bank_details
                                        ?.account_number
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
                                    Payment method{" "}
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.payment_method?.type
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
                      <Link
                        to={`/related-content/${transactionDetails?.content_id?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {relatedContent?.slice(0, 4).map((curr) => {
                      const Audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const Video = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      const Image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const Pdf = curr?.content?.filter(
                        (curr) => curr?.media_type === "pdf"
                      );
                      const Doc = curr?.content?.filter(
                        (curr) => curr?.media_type === "doc"
                      );
                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.watermark ||
                                process.env.REACT_APP_CONTENT_MEDIA +
                                curr?.content[0]?.thumbnail
                                : curr?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                  curr?.content[0]?.media
                            }
                            // feedType={contentVideo}
                            feedTag={"Most Viewed"}
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              curr?.hopper_id?.avatar_id?.avatar
                            }
                            author_Name={curr.hopper_id?.user_name}
                            fvticns={
                              curr?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr.type}
                            feedHead={curr.heading}
                            // feedTime={moment(curr?.updatedAt).format(
                            //   "DD MMMM YYYY"
                            // )}
                            feedTime={moment(curr.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            content_id={curr._id}
                            basket={() => {
                              //  handleBasket(index, i)
                              // console.log("success")
                              getTransactionDetails();
                            }}
                            basketValue={curr.basket_status}
                            allContent={curr?.content}
                            feedLocation={curr.location}
                            contentPrice={formatAmountInMillion(
                              curr?.ask_price
                            )}
                            feedTypeImg1={imageCount > 0 ? cameraic : null}
                            postcount={imageCount > 0 ? imageCount : null}
                            feedTypeImg2={videoCount > 0 ? videoic : null}
                            postcount2={videoCount > 0 ? videoCount : null}
                            feedTypeImg3={audioCount > 0 ? interviewic : null}
                            postcount3={audioCount > 0 ? audioCount : null}
                            feedTypeImg4={pdfCount > 0 ? docsic : null}
                            postcount4={pdfCount > 0 ? pdfCount : null}
                            feedTypeImg5={docCount > 0 ? docsic : null}
                            postcount5={docCount > 0 ? docCount : null}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>
                      More content from{" "}
                      {transactionDetails?.hopper_id?.user_name}
                    </h1>
                    <div className="d-flex align-items-center">
                      <Link
                        to={`/more-content-task/${transactionDetails?.hopper_id?._id}/${transactionDetails?.task_details?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {moreContent?.slice(0, 4)?.map((item) => {
                      const Audio = item?.content?.filter(
                        (item) => item?.media_type === "audio"
                      );
                      const Video = item?.content?.filter(
                        (item) => item?.media_type === "video"
                      );
                      const Image = item?.content?.filter(
                        (item) => item?.media_type === "image"
                      );
                      const Pdf = item?.content?.filter(
                        (item) => item?.media_type === "pdf"
                      );
                      const Doc = item?.content?.filter(
                        (item) => item?.media_type === "doc"
                      );
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item?.videothubnail ||
                                process.env.REACT_APP_UPLOADED_CONTENT +
                                item?.imageAndVideo
                                : item?.type === "video"
                                  ? item?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                  item?.videothubnail
                                  : item?.type === "audio"
                                    ? audioic
                                    : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.type === "image"
                                ? cameraic
                                : item?.type === "audio"
                                  ? interviewic
                                  : item?.type === "video"
                                    ? videoic
                                    : null
                            }
                            user_avatar={
                              item?.avatar_details?.[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                item?.avatar_details?.[0]?.avatar
                                : item?.avatar_detals?.[0]?.avatar
                                  ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.avatar_detals?.[0]?.avatar
                                  : ""
                            }
                            author_Name={item?.hopper_id?.user_name}
                            // lnkto={`/content-details/${item?._id}`}
                            lnkto={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            fvticns={
                              item?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_tag={item?.category_details[0]?.name}
                            basket={() => handleBasket(index, "more")}
                            basketValue={item?.basket_status}
                            allContent={item?.task_id?.content}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item?.task_id?.task_description}
                            feedTime={moment(item?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item?.task_id?.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.hopper_photo_price || 0
                                : item?.type === "audio"
                                  ? item?.task_id?.hopper_interview_price || 0
                                  : item?.type === "video"
                                    ? item?.task_id?.hopper_videos_price || 0
                                    : null
                            )}`}
                            favourite={() => handleFavourite(index, "more")}
                            bool_fav={
                              item?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            // content_id={item?.content_id}
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskHopperId={item?._id}
                          />
                        </Col>
                      );
                    })}
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

export default PurchasedTaskContentDetail;
