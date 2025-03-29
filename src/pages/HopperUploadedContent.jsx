import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../component/Header";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Select, MenuItem } from "@mui/material";
import audioic from "../assets/images/audimg.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";

import { Container, Row, Col } from "react-bootstrap";
import DbFooter from "../component/DbFooter";
import { Get } from "../services/user.services";
import favic from "../assets/images/star.svg";
import moment from "moment/moment";
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from "../component/Loader";
import cameraic from "../assets/images/camera.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import { PaginationComp } from "../component/Pagination";
import { BsArrowLeft } from "react-icons/bs";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

const HopperUploadedContent = () => {
  const param = useParams();
  const [newUploadedContent, setNewUploadedContent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8);

  const TaskDetails = async (id) => {
    setLoading(true);
    try {
      let resp = "";
      if (param?.task_id !== "all") {
        resp = await Get(`mediaHouse/getuploadedContentbyHoppers?limit=${limit}&offet=${+(page - 1) * limit}&task_id=${param?.task_id}`)
      } else {
        resp = await Get(`mediaHouse/getuploadedContentbyHoppers?limit=${limit}&offet=${+(page - 1) * limit}`)
      }
      setNewUploadedContent(resp?.data);
      setTotalPage(Math.ceil(resp.data?.totalUploadedContent / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    TaskDetails();
  }, [page]);

  const handleFavourite = (i) => {
    setNewUploadedContent((prev) => {
      const allContent = {...prev};
      allContent.uploadedContent[i].content[0]["favourited"] = allContent.uploadedContent[i].content[0]["favourited"] === "true" ? "false" : "true";
      return allContent;
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between align-items-center">
                <div className="FundsfeedHdTags_wrap">
                  <Link className="backtoLink" onClick={() => history.back()}>
                    <BsArrowLeft className="text-pink" /> Back
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="page-wrap uploaded_cont_page">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedUploadedContent mb-0">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">
                      Uploaded Content
                    </h1>
                  </div>
                  <Row >
                    {newUploadedContent?.uploadedContent?.map((item, index) => {
                      const filteredContent = (mediaType) => {
                        const content = item?.content?.filter((el) => el.type === mediaType);
                        return content;
                      };

                      return (
                        <Col lg={3} md={3} sm={3} key={item?._id}>
                          <ContentFeedCard
                            feedImg={
                              item?.content[0]?.type === "image"
                                ? item?.content[0]?.videothubnail ||
                                process.env.REACT_APP_UPLOADED_CONTENT +
                                item?.content[0]?.imageAndVideo
                                : item?.content[0]?.type === "video"
                                  ? item?.content[0]?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                  item?.content[0]?.videothubnail
                                  : item?.content[0]?.type === "audio"
                                    ? audioic
                                    : null
                            }
                            type={"task"}
                            postcount={filteredContent("image")?.length}
                            postcount2={filteredContent("video")?.length}
                            postcount3={filteredContent("interview")?.length}
                            feedTypeImg1={
                              item?.content[0]?.type === "image"
                                ? cameraic
                                : item?.content[0]?.type === "audio"
                                  ? interviewic
                                  : item?.content[0]?.type === "video"
                                    ? videoic
                                    : null
                            }
                            user_avatar={
                              item?.content[0]?.avatar_details?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                item?.content[0]?.avatar_details?.avatar
                                : item?.content[0]?.avatar_detals?.[0]?.avatar
                                  ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.content[0]?.avatar_detals?.avatar
                                  : ""
                            }
                            author_Name={item?.uploaded_by?.user_name}
                            lnkto={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                            // fvticns={
                            //   item?.content[0]?.favourited === "true"
                            //     ? favouritedic
                            //     : favic
                            // }
                            type_tag={item?.content[0]?.category_details?.name}
                            allContent={item?.content[0]?.task_id?.content}
                            type_img={item?.content[0]?.category_details?.icon}
                            feedHead={item?.content[0]?.task_id?.task_description}
                            feedTime={moment(item?.content[0]?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item?.content[0]?.task_id?.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.content[0]?.type === "image"
                                ? item?.content[0]?.task_id?.hopper_photo_price || 0
                                : item?.content[0]?.type === "audio"
                                  ? item?.content[0]?.task_id?.hopper_interview_price || 0
                                  : item?.content[0]?.type === "video"
                                    ? item?.content[0]?.task_id?.hopper_videos_price || 0
                                    : null
                            )}`}
                            // favourite={() => handleFavourite(index, "task")}
                            // bool_fav={
                            //   item?.content[0]?.favourited === "true" ? "false" : "true"
                            // }
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?.content?.map((el) => el._id)}
                            is_sale_status={true}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          {totalPage ? (
            <PaginationComp
              totalPage={totalPage}
              path={`hopper-task-content/${param?.task_id}`}
              type="fav"
              setPage={setPage}
              page={page}
            />
          ) : (
            " "
          )}
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default HopperUploadedContent;
