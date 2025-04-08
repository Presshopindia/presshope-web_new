import React, { useEffect, useState } from "react";
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
import { BsArrowRight, BsChevronDown, BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import sports from "../assets/images/sortIcons/sports.png";
import crime from "../assets/images/sortIcons/crime.svg";
import fashion from "../assets/images/sortIcons/dress.svg";
import DbFooter from "../component/DbFooter";
import image8 from "../assets/images/img8.jpg";
import image9 from "../assets/images/img9.jpg";
import taskIcon from "../assets/images/task.svg";
import image10 from "../assets/images/img10.jpg";
import celebrity from "../assets/images/sortIcons/VIP.svg";
import politics from "../assets/images/sortIcons/political.svg";
import { Get, Post } from "../services/user.services";
import favic from "../assets/images/star.svg";
import moment from "moment/moment";
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from "../component/Loader";
import FavouritedDF from "../component/Sortfilters/Dashboard/Favourited";
import audioic from "../assets/images/audimg.svg";
import { AiFillCaretDown } from "react-icons/ai";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import ContentUnderOfferFilter from "../component/Sortfilters/Content/ContentUnderOfferFilter";
import UnderOfferSort from "../component/Sortfilters/Content/UnderOfferSort";
import { initStateOfFavouriteContent } from "../component/staticData";
import { PaginationComp } from "../component/Pagination";

const FavouritedContent = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [favContent, setFavContent] = useState(initStateOfFavouriteContent);

  const FavouriteContent = async () => {

    setLoading(true);
    try {
      const payload = {
        sort: favContent.sort.field,
        category: favContent.filter.category,
        price_range_to: favContent.sort.price_range_to,
        price_range_from: favContent.sort.price_range_from,
        hopper_location: favContent.sort.hopper_location,
        type: favContent.filter.type,
        favContent: favContent.filter.favContent,
        latestContent: favContent.filter.latestContent,
        limit: limit,
        offset: +(page - 1) * limit,
      };

      const resp = await Post("mediaHouse/favouritesListingNew", payload);
      const category = await Get("mediaHouse/getCategoryType?type=content");
      setTotalPage(Math.ceil(resp?.data?.response?.count / limit));
      setFavContent({
        ...favContent,
        data: resp?.data?.response,
        categoryData: category?.data?.data,
      });
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    FavouriteContent();
  }, [favContent.filter.active, favContent.sort.active, page]);

  const handleFavourite = (id) => {
    setFavContent((prev) => {
      const allContent = { ...prev };
      const newData = allContent?.data?.data?.filter((el) => el._id != id);
      const updatedData = { ...allContent, data: {...allContent.data, data: newData} };

      return updatedData;
    });
  };
  const handleBasket = (index) => {
    setFavContent((prev) => {
      const updatedContent = { ...prev };
      const allbasket = updatedContent?.data.map((ele, inx) => {
        if (index == inx) {
          return {
            ...ele,
            basket_status: ele?.basket_status == "true" ? "false" : "true",
          };
        }
        return ele;
      });
      const updatedDatafav = { ...updatedContent, data: allbasket };
      return updatedDatafav;
    });
  };

  useEffect(() => {
    FavouriteContent();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between align-items-center">
                <div className="feedContent_header">
                  <Link onClick={() => history.back()} className="back_link">
                    <BsArrowLeft className="text-pink" /> Back{" "}
                  </Link>
                </div>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setFavContent({
                            ...favContent,
                            filter: {
                              ...favContent.filter,
                              filter:
                                favContent.filter.filter == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {favContent?.filter?.filter == "true" && (
                        <ContentUnderOfferFilter
                          setContentUnderOffer={setFavContent}
                          contentUnderOffer={favContent}
                          favDev={false}
                        />
                      )}
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Sort</p>
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setFavContent({
                            ...favContent,
                            sort: {
                              ...favContent.sort,
                              sort:
                                favContent.sort.sort == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {favContent?.sort?.sort == "true" && (
                        <UnderOfferSort
                          setContentUnderOffer={setFavContent}
                          contentUnderOffer={favContent}
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
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Favourited content</h1>
                  </div>
                  <Row className="">
                    {favContent?.data?.data?.length > 0 ? (
                      favContent?.data?.data?.filter((el) => ("content_details" in el || "upload_content_details" in el) )?.map((curr, index) => {
                        if(curr?.upload_content_details) {
                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                key={curr?._id}
                                feedImg={
                                  curr?.upload_content_details?.type === "image"
                                    ? curr?.upload_content_details?.videothubnail ||
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                    curr?.upload_content_details?.imageAndVideo
                                    : curr?.upload_content_details?.type === "video"
                                      ? curr?.upload_content_details?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.upload_content_details?.videothubnail
                                      : curr?.upload_content_details?.type === "audio"
                                        ? audioic
                                        : null
                                }
                                basketValue={curr?.basket_status}
                                basket={() => {
                                  handleBasket(index, curr?._id);
                                }}
                                feedTag={
                                  curr?.sales_prefix
                                    ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
                                    : curr?.content_view_type == "mostpopular"
                                    ? "Most Popular"
                                    : curr?.content_view_type == "mostviewed"
                                    ? "Most viewed"
                                    : null
                                }
                                user_avatar={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.upload_content_details?.hopper_details?.avatar_details?.avatar
                                }
                                author_Name={
                                  curr?.upload_content_details?.hopper_details?.user_name
                                }
                                lnkto={`/content-details/${curr?.upload_content_details?.task_details?._id}?hopper_id=${curr?.upload_content_details?.hopper_details?._id}`}
                                viewDetail={`/content-details/${curr?.upload_content_details?.task_details?._id}?hopper_id=${curr?.upload_content_details?.hopper_details?._id}`}
                                fvticns={favouritedic}
                                viewTransaction={"View details"}
                                content_id={curr?.content_id?._id}
                                bool_fav={"false"}
                                taskContentId={[curr?.upload_content_details?._id]}
                                favourite={() => handleFavourite(curr?._id)}
                                type_img={taskIcon}
                                type_tag={"TASK"}
                                type="task"
                                feedHead={curr?.upload_content_details?.task_details?.heading}
                                feedTime={moment(
                                  curr?.upload_content_details?.createdAt
                                ).format("hh:mm A , DD MMM YYYY")}
                                feedLocation={curr?.upload_content_details?.task_details?.location}
                                contentPrice={`${formatAmountInMillion(
                                  curr?.upload_content_details?.type === "image" ? curr?.upload_content_details?.task_details?.hopper_photo_price :
                                  curr?.upload_content_details?.type === "video" ? curr?.upload_content_details?.task_details?.hopper_videos_price : 
                                  curr?.upload_content_details?.type === "audio" ? curr?.upload_content_details?.task_details?.hopper_interview_price : ""
                                )}`}
                                feedTypeImg1={curr?.upload_content_details?.type === "image" ? cameraic : null}
                                postcount={curr?.upload_content_details?.type === "image" ? 1 : null}
                                feedTypeImg2={curr?.upload_content_details?.type === "video" ? videoic : null}
                                postcount2={curr?.upload_content_details?.type === "video" ? 1 : null}
                                feedTypeImg3={curr?.upload_content_details?.type === "audio" ? interviewic : null}
                                postcount3={curr?.upload_content_details?.type === "audio" ? 1 : null}
                              />
                            </Col>
                          );
                        } else {
                          const contentId = curr?.content_details?.content || [];
                          const audioCount = contentId.filter(
                            (item) => item.media_type === "audio"
                          ).length;
                          const videoCount = contentId.filter(
                            (item) => item.media_type === "video"
                          ).length;
                          const imageCount = contentId.filter(
                            (item) => item.media_type === "image"
                          ).length;
                          const pdfCount = contentId.filter(
                            (item) => item.media_type === "pdf"
                          ).length;
                          const docCount = contentId.filter(
                            (item) => item.media_type === "doc"
                          ).length;
                          return (
                            <Col lg={3} md={4} sm={6}>
                              <ContentFeedCard
                                feedImg={
                                  curr?.content_details?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content_details?.content[0]?.media
                                    : curr?.content_details?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content_details?.content[0]?.media
                                      : curr?.content_details?.content[0]?.media_type === "audio" ? audioic
                                        : curr?.content_details?.content[0]?.media_type === "doc" ? pdfic
                                          : ""
                                }
                                allContent={curr?.content_details?.content}
                                basketValue={curr?.basket_status}
                                basket={() => {
                                  handleBasket(index, curr?._id);
                                }}
                                feedTag={
                                  curr?.sales_prefix
                                    ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
                                    : curr?.content_view_type == "mostpopular"
                                    ? "Most Popular"
                                    : curr?.content_view_type == "mostviewed"
                                    ? "Most viewed"
                                    : null
                                }
                                user_avatar={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.content_details?.hopper_details?.avatar_details?.avatar
                                }
                                author_Name={
                                  curr?.content_details?.hopper_details?.user_name
                                }
                                lnkto={`/Feeddetail/content/${curr?.content_details?._id}`}
                                viewTransaction={"View details"}
                                viewDetail={`/Feeddetail/content/${curr?.content_details?._id}`}
                                fvticns={favouritedic}
                                content_id={curr?.content_details?._id}
                                bool_fav={"false"}
                                favourite={() => handleFavourite(curr?._id)}
                                type_img={
                                  curr?.content_details?.type === "shared"
                                    ? shared
                                    : exclusive
                                }
                                type_tag={curr?.content_details?.type}
                                feedHead={curr?.content_details?.heading}
                                feedTime={moment(
                                  curr?.content_details?.createdAt
                                ).format("hh:mm A , DD MMM YYYY")}
                                feedLocation={curr?.content_details?.location}
                                contentPrice={`${formatAmountInMillion(
                                  curr?.content_details?.ask_price || 0
                                )}`}
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
                        }
                      })
                    ) : (
                      <h1>No data found</h1>
                    )}
                  </Row>
                  {totalPage ? (
                    <PaginationComp
                      totalPage={totalPage}
                      path="Favourited-Content"
                      type="fav"
                      setPage={setPage}
                      page={page}
                    />
                  ) : (
                    ""
                  )}
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

export default FavouritedContent;
