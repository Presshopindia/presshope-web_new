import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft, BsMic } from "react-icons/bs";
import feedcontimg from "../assets/images/imgn6.jpg";
import { AiOutlineStar } from "react-icons/ai";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import Tabs from "react-bootstrap/Tabs";
import { IoCallOutline } from "react-icons/io5";
import imgprofile from "../assets/images/profile.webp";
import { AiOutlinePlus } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import inpimg from "../assets/images/profile.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Get, Patch, Post } from "../services/user.services";
import moment from "moment/moment";
import { toast } from "react-toastify";
import shared from "../assets/images/share.png";
import Loader from "../component/Loader";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import favic from "../assets/images/star.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import { PaginationComp } from "../component/Pagination";

const MoreContentFromUser = () => {
  const [moreContent, setMoreContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hopper_id } = useParams()

  // Pagination-
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8)

  const ContentByID = async () => {
    try {
      setLoading(true)
      const resp1 = await Post(`mediaHouse/MoreContent`, {
        hopper_id: localStorage.getItem("hopperid") || hopper_id,
        limit: limit,
        offset: (+(page-1)) * limit
      });
      setMoreContent(resp1.data.content);
      setTotalPage(Math.ceil(resp1.data?.totalCount / limit))
      if (resp1) {
        setLoading(false)
      }
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    ContentByID();
  }, [page]);

  const handleFavourite = (i) => {
    setMoreContent((prev) => {
      const allContent = [...prev];
      allContent[i]["favourite_status"] = allContent[i]["favourite_status"] === "true" ? "false" : "true";
      return allContent
    })
  }

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedContent_header">
                <Link onClick={() => history.back()} className="back_link">
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>
              <div className="feedPreviews d-flex justify-content-between align-items-center"></div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <div className="feedContent_header">
                    <h1>More content </h1>
                  </div>
                  <Row className="">
                    {moreContent?.map((curr, index) => {

                      const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio");
                      const Video = curr?.content?.filter((curr) => curr?.media_type === "video");
                      const Image = curr?.content?.filter((curr) => curr?.media_type === "image");
                      const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf");
                      const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc");
                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;

                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            feedImg={curr.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail : curr.content[0].media_type === "image" ? (curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media) : audioic} feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera}
                            userAvatar={imgs}
                            authorName={"pseudonymous"}
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            feedHead={curr.heading}
                            feedTime={moment(curr?.createdAt).format("hh:mm A, DD MMM YYYY")} feedLocation={curr.location} contentPrice={curr.ask_price}
                            feedTypeImg={curr.content[0].media_type === "audio" ? interviewic : cameraic}
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
                            content_id={curr?._id}
                            hopper_id={curr?.hopper_id?._id}
                            type={"content"}
                            hopper_stripe_account_id={curr?.hopper_id?.stripe_account_id}
                            allContent={curr?.content}
                            basketValue={curr?.basket_status}
                            basket={()=>{console.log("myData");

                              setMoreContent((prev) => {
                                const allContent = [...prev];
                                allContent[index]["basket_status"] = allContent[index]["basket_status"] === "true" ? "false" : "true";
                                return allContent
                              })
                            }}

                            bool_fav={
                              curr?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            favourite={() => handleFavourite(index)}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            feedTypeImg1={imageCount > 0 ? cameraic : null}
                            postcount={imageCount > 0 ? imageCount : null}
                            feedTypeImg2={videoCount > 0 ? videoic : null}
                            postcount2={videoCount > 0 ? videoCount : null}
                            feedTypeImg3={audioCount > 0 ? interviewic : null}
                            postcount3={audioCount > 0 ? audioCount : null}
                            feedTypeImg4={pdfCount > 0 ? pdfic : null}
                            postcount4={pdfCount > 0 ? pdfCount : null}
                            feedTypeImg5={docCount > 0 ? docsic : null}
                            postcount5={docCount > 0 ? docCount : null}
                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                  <PaginationComp totalPage={totalPage} path={`more-content/${hopper_id}`} type="fav" setPage={setPage} page={page} />
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

export default MoreContentFromUser;
