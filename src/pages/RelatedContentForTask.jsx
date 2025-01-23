import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from '../component/card/ContentFeedCard'
import exclusive from '../assets/images/exclusive.png';
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft, BsMic } from "react-icons/bs";
import feedcontimg from '../assets/images/imgn6.jpg'
import { AiOutlineStar } from "react-icons/ai";
import authorimg from '../assets/images/profile.webp'
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import Tab from 'react-bootstrap/Tab';
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import Tabs from 'react-bootstrap/Tabs';
import { IoCallOutline } from "react-icons/io5";
import imgprofile from '../assets/images/profile.webp'
import { AiOutlinePlus } from "react-icons/ai";
import InputGroup from 'react-bootstrap/InputGroup';
import inpimg from '../assets/images/profile.webp'
import contentCamera from '../assets/images/contentCamera.svg';
import contentVideo from '../assets/images/contentVideo.svg';
import { VscDeviceCameraVideo } from "react-icons/vsc";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Get, Patch, Post } from '../services/user.services';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import shared from '../assets/images/share.png';
import Loader from '../component/Loader';
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import favic from "../assets/images/star.svg";
import { formatAmountInMillion } from '../component/commonFunction';

const RelatedContentTask = () => {

  // Sort and Filter-
  const [content, setRelatedContent] = useState([])
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleFavourite = (i) => {
    setRelatedContent((prev) => {
      const allContent = [...prev];
      allContent[i]["favourite_status"] = allContent[i]["favourite_status"] === "true" ? "false" : "true";
      return allContent
    })
  }
// Related content-gg
  const Relatedcont = async () => {
    setLoading(true)
    try {
      const resp = await Post(`mediaHouse/relatedContentforTask`, {
        tag_id: [localStorage.getItem('tag_id')],
        hopper_id: params?.hopper_id,
        category_id: params?.category_id
      })
      setRelatedContent(resp.data.content)
      if (resp) {
        setLoading(false)
      }
    }
    catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    Relatedcont()
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedContent_header">
                <Link onClick={() => history.back()} className='back_link'><BsArrowLeft className='text-pink' /> Back </Link>
              </div>
              <div className="feedPreviews d-flex justify-content-between align-items-center">

              </div>
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
                    <h1>Related content</h1>
                  </div>
                  <Row className="">
                    {content?.map((item, index) => {

                        return (
                          <Col md={3}>
                            <ContentFeedCard
                            feedImg={
                              item?.type === "image" ?
                                item.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + item.imageAndVideo
                                : item?.type === "video" ?
                                  item.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + item.videothubnail
                                  : item?.type === "audio" ? audioic : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={item?.type === "image" ? cameraic : item?.type === "audio" ? interviewic : item?.type === "video" ? videoic : null}
                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + item?.avatar_detals[0]?.avatar}
                            author_Name={item?.hopper_id?.user_name}
                            lnkto={`/content-details/${item?._id}`}
                            // lnkto={`/Feeddetail/content/${item._id}uploaded`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?._id}`}
                            fvticns={item.favourite_status === "true" ? favouritedic : favic}
                            type_tag={item?.category_details[0]?.name}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item.task_id.task_description}
                            feedTime={moment(item.createdAt).format(" hh:mm A, DD MMM YYYY")}
                            feedLocation={item.task_id.location}
                            contentPrice={`${formatAmountInMillion(item?.type === "image" ? item?.task_id?.photo_price : item?.type === "audio" ? (item?.task_id?.interview_price || 0) : item?.type === "video" ? (item?.task_id?.videos_price || 0) : null)}`}
                            favourite={() => handleFavourite(index)}
                            bool_fav={item.favourite_status === "true" ? "false" : "true"}
                            content_id={item._id}
                          />
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <DbFooter />
    </>

  )
}

export default RelatedContentTask