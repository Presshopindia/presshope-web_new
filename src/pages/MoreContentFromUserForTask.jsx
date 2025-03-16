import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import { BsArrowLeft } from "react-icons/bs";
import audioic from "../assets/images/audimg.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Post } from "../services/user.services";
import moment from "moment/moment";
import Loader from "../component/Loader";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import favic from "../assets/images/star.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import { PaginationComp } from "../component/Pagination";

const MoreContentFromUserForTask = () => {
  const [moreContent, setMoreContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hopper_id, task_id } = useParams();

    // Pagination-
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(8)

  const ContentByID = async () => {
    try {
      setLoading(true);
      const resp1 = await Post(`mediaHouse/MoreContentforTask`, {
        hopper_id,
        task_id,
        limit,
        offset: (+(page-1)) * limit
      });
      setMoreContent(resp1.data.content);
      setTotalPage(Math.ceil(resp1.data?.totalCount / limit))

      if (resp1) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID();
  }, [page]);

  const handleFavourite = (i) => {
    setMoreContent((prev) => {
      const allContent = [...prev];
      allContent[i]["favourite_status"] =
        allContent[i]["favourite_status"] === "true" ? "false" : "true";
      return allContent;
    });
  };
  const handleBasket = (i) => {
    setMoreContent((prev) => {
      const allContent = [...prev];
      allContent[i]["basket_status"] =
        allContent[i]["basket_status"] === "true" ? "false" : "true";
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
                    {moreContent?.map((item, index) => {
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.imageAndVideo
                                : item?.type === "video"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.videothubnail
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
                              process.env.REACT_APP_AVATAR_IMAGE +
                              item?.avatar_detals[0]?.avatar
                            }
                            author_Name={item?.hopper_id?.user_name}
                            lnkto={`/content-details/${item?.task_id?._id}?hopper_id=${item?.hopper_id?._id}`}
                            basket={() => handleBasket(index)}
                            basketValue={item?.basket_status}
                            // lnkto={`/Feeddetail/content/${item._id}uploaded`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?.task_id?._id}?hopper_id=${item?.hopper_id?._id}`}
                            fvticns={
                              item.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_tag={item?.category_details[0]?.name}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item.task_id.task_description}
                            feedTime={moment(item.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item.task_id.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.photo_price
                                : item?.type === "audio"
                                ? item?.task_id?.interview_price || 0
                                : item?.type === "video"
                                ? item?.task_id?.videos_price || 0
                                : null
                            )}`}
                            favourite={() => handleFavourite(index)}
                            bool_fav={
                              item.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?._id}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <PaginationComp totalPage={totalPage} path={`more-content-task/${hopper_id}/${task_id}`} type="more" setPage={setPage} page={page} />
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>

      <DbFooter />
    </>
  );
};

export default MoreContentFromUserForTask;
