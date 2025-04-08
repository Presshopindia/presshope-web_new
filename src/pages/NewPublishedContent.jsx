import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import shared from "../assets/images/share.png";
import exclusive from "../assets/images/exclusive.png";
import { Select, MenuItem } from "@mui/material";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";
import moment from "moment/moment";
import favic from "../assets/images/star.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from "../component/Loader";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import { AiFillCaretDown } from "react-icons/ai";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import DbFooter from "../component/DbFooter";
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdf-icn-card.png";
import { formatAmountInMillion } from "../component/commonFunction";
import ContentUnderOfferFilter from "../component/Sortfilters/Content/ContentUnderOfferFilter";
import UnderOfferSort from "../component/Sortfilters/Content/UnderOfferSort";
import {
  feedDynamicRoute,
  feedTitle,
  initStateOfFeed,
} from "../component/staticData";
import FeedFilter from "../component/Sortfilters/Content/FeedFilter";
import ViewContent from "../component/ViewContent";
import { useDarkMode } from "../context/DarkModeContext";

const NewPublishedContent = (props) => {
  const [loading, setLoading] = useState(false);
  const [publishedContent, setPublishedContent] = useState(initStateOfFeed);
  const {
    isDarkMode,
    toggleDarkMode,
    disableDarkMode,
    profileData,
    cartCount,
    setCartCount,
  } = useDarkMode();

  console.log("publishedContent", publishedContent);

  const MultiData = async () => {
    setLoading(true);
    try {
      const newArray = [
        publishedContent?.filter?.content,
        publishedContent?.filter?.isDiscount,
        publishedContent?.filter?.favContent,
        ...publishedContent?.filter?.type,
        ...publishedContent?.filter?.category,
      ]?.filter((el) => el && el != "false");

      console.log("newArray123", newArray)
      const multiPromise = newArray?.map((el) => {
        return Post("mediaHouse/view/published/content", {
          [el == "latest"
            ? "content"
            : el == "true" || el == "false"
              ? "favContent"
              : el == "shared" || el == "exclusive"
                ? "type"
                : el === true || el === false
                  ? "isDiscount"
                  : el?.length > 20
                    ? "category_id"
                    : ""]:
            el == "latest" ||
              el == "true" ||
              el == "false" ||
              el === true ||
              el === false
              ? el
              : [el],
          sortValuesName:
            publishedContent?.sort?.field == "high_price_content"
              ? "highPrice"
              : publishedContent?.sort?.field == "low_price_content"
                ? "lowPrice"
                : publishedContent?.sort?.field,
        });
      });

      const category = await Get("mediaHouse/getCategoryType?type=content");
      const results = await Promise.all(multiPromise);
      // console.log("allresult123",results)
      setLoading(false);
      setPublishedContent({
        ...publishedContent,
        data: results,
        categoryData: category?.data?.data,
        title: newArray,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    MultiData();
    window.scrollTo(0, 0);
  }, [publishedContent?.filter?.active, publishedContent?.sort?.active]);

  useEffect(() => {
    MultiData();
  }, [cartCount]);

  const handleFavourite = (index, i) => {
    setPublishedContent((prev) => {
      const updatedContent = { ...prev };
      if (
        updatedContent.data &&
        updatedContent.data[index] &&
        updatedContent.data[index].data &&
        updatedContent.data[index].data.content &&
        updatedContent.data[index].data.content[i]
      ) {
        updatedContent.data[index].data.content[i].favourite_status =
          updatedContent.data[index].data.content[i].favourite_status === "true"
            ? "false"
            : "true";
      }
      return updatedContent;
    });
  };

  const handleBasket = (index, i) => {
    setPublishedContent((prev) => {
      const updatedContent = { ...prev };
      if (
        updatedContent.data &&
        updatedContent.data[index] &&
        updatedContent.data[index].data &&
        updatedContent.data[index].data.content &&
        updatedContent.data[index].data.content[i]
      ) {
        updatedContent.data[index].data.content[i].basket_status =
          updatedContent.data[index].data.content[i].basket_status === "true"
            ? "false"
            : "true";
      }
      return updatedContent;
    });
  };

  const [openContent, setOpenContent] = useState(false);
  const [showContent, setShowContent] = useState([]);


  console.log("publishedContent123", publishedContent);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <ViewContent
        openContent={openContent}
        setOpenContent={setOpenContent}
        showContent={showContent}
      />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between flex-wrap">
                {localStorage.getItem("backBtnVisibility") ? (
                  <Link
                    onClick={() => history.back()}
                    className="back_link mb-3"
                  >
                    <BsArrowLeft className="text-pink" />
                    Back
                  </Link>
                ) : (
                  <div></div>
                )}
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setPublishedContent({
                            ...publishedContent,
                            filter: {
                              ...publishedContent.filter,
                              filter:
                                publishedContent.filter.filter == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {publishedContent?.filter?.filter == "true" && (
                        <FeedFilter
                          setPublishedContent={setPublishedContent}
                          publishedContent={publishedContent}
                        />
                      )}
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setPublishedContent({
                            ...publishedContent,
                            sort: {
                              ...publishedContent.sort,
                              sort:
                                publishedContent.sort.sort == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {publishedContent?.sort?.sort == "true" && (
                        <UnderOfferSort
                          setContentUnderOffer={setPublishedContent}
                          contentUnderOffer={publishedContent}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="page-wrap">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                {publishedContent?.data?.map((el, index) => {

                  console.log("allPublishedData", el);
                  const header = feedTitle(
                    publishedContent?.title[index],
                    publishedContent?.categoryData
                  );
                  return (
                    <div className="feedsContainer" key={index}>
                      <div className="feedContent_header">
                        <h1 className="rw_hdng">
                          {header} {header == "Special" ? "offers" : "content"}
                        </h1>
                        <Link
                          to={feedDynamicRoute(
                            publishedContent?.title[index],
                            publishedContent?.categoryData
                          )}
                        >
                          View all <BsArrowRight className="text-pink" />
                        </Link>
                      </div>
                      <Row className="">
                        {el?.data?.content?.map((curr, i) => (
                          <Col lg={3} md={4} sm={6} key={i}>
                            <ContentFeedCard
                              feedImg={
                                curr?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media
                                  : curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content[0]?.media
                                    : curr?.content[0]?.media_type === "audio" ? audioic
                                      : curr?.content[0]?.media_type === "doc" ? pdfic
                                        : ""
                              }
                              feedType={
                                curr?.content[0]?.media_type === "video"
                                  ? contentVideo
                                  : contentCamera
                              }
                              feedTag={
                                curr?.sales_prefix
                                  ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
                                  : curr?.content_view_type == "mostpopular"
                                    ? "Most Popular"
                                    : curr?.content_view_type == "mostviewed"
                                      ? "Most viewed"
                                      : null
                              }
                              userAvatar={imgs}
                              authorName={"pseudonymous"}
                              lnkto={`/Feeddetail/content/${curr._id}`}
                              most_viewed={true}
                              author_Name={curr?.hopper_id?.user_name}
                              user_avatar={
                                process.env.REACT_APP_AVATAR_IMAGE +
                                curr?.hopper_id?.avatar_id?.avatar
                              }
                              fvticns={
                                curr?.favourite_status === "true"
                                  ? favouritedic
                                  : favic
                              }
                              content_id={curr._id}
                              bool_fav={
                                curr.favourite_status === "true"
                                  ? "false"
                                  : "true"
                              }
                              favourite={() => handleFavourite(index, i)}
                              basket={() => handleBasket(index, i)}
                              basketValue={curr.basket_status}
                              type_img={
                                curr?.type === "shared" ? shared : exclusive
                              }
                              type_tag={
                                curr.type === "shared" ? "Shared" : "Exclusive"
                              }
                              feedHead={curr.heading}
                              feedTime={moment(curr.createdAt).format(
                                "hh:mm A , DD MMM YYYY"
                              )}
                              feedLocation={curr.location}
                              contentPrice={`${formatAmountInMillion(
                                curr.ask_price || 0
                              )}`}
                              viewTransaction={"View details"}
                              viewDetail={`/Feeddetail/content/${curr._id}`}
                              feedTypeImg1={
                                curr.content?.filter(
                                  (el) => el?.media_type == "image"
                                )?.length > 0
                                  ? cameraic
                                  : null
                              }
                              postcount={
                                curr?.content?.filter(
                                  (curr) => curr?.media_type === "image"
                                )?.length || null
                              }
                              feedTypeImg2={
                                curr.content?.filter(
                                  (el) => el?.media_type == "video"
                                )?.length > 0
                                  ? videoic
                                  : null
                              }
                              postcount2={
                                curr?.content?.filter(
                                  (curr) => curr?.media_type === "video"
                                )?.length || null
                              }
                              feedTypeImg3={
                                curr.content?.filter(
                                  (el) => el?.media_type == "audio"
                                )?.length > 0
                                  ? interviewic
                                  : null
                              }
                              postcount3={
                                curr?.content?.filter(
                                  (curr) => curr?.media_type === "audio"
                                )?.length || null
                              }
                              feedTypeImg4={
                                curr.content?.filter(
                                  (el) => el?.media_type == "pdf"
                                )?.length > 0
                                  ? pdfic
                                  : null
                              }
                              postcount4={
                                curr?.content?.filter(
                                  (curr) => curr?.media_type === "pdf"
                                )?.length || null
                              }
                              feedTypeImg5={
                                curr.content?.filter(
                                  (el) => el?.media_type == "doc"
                                )?.length > 0
                                  ? docsic
                                  : null
                              }
                              postcount5={
                                curr?.content?.filter(
                                  (curr) => curr?.media_type === "doc"
                                )?.length || null
                              }
                              setOpenContent={setOpenContent}
                              openContent={openContent}
                              allContent={curr?.content}
                              setShowContent={setShowContent}
                              before_discount_value={
                                header === "Special"
                                  ? curr?.before_discount_value
                                  : null
                              }
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <div className="mt-0 feedTrendingSearchWrap">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default NewPublishedContent;
