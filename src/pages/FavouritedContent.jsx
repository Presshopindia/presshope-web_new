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
    console.log("kjhvfdgkjfgkjfhfgkjfhgkj");

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

      const resp = await Post("mediaHouse/favourites", payload);
      const category = await Get("mediaHouse/getCategoryType?type=content");
      console.log("categoryDatacategoryData  ------> categoryData  --->", resp);
      setTotalPage(Math.ceil(resp?.data?.response?.totalCount / limit));
      setFavContent({
        ...favContent,
        data: resp?.data?.response?.response,
        categoryData: category?.data?.data,
      });
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      console.log("fav content error ----->  --->", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    FavouriteContent();
  }, [favContent.filter.active, favContent.sort.active, page]);

  const handleFavourite = (id) => {
    setFavContent((prev) => {
      const allContent = { ...prev };
      const newData = allContent?.data?.filter((el) => el._id != id);
      const updatedData = { ...allContent, data: newData };
      return updatedData;
    });
  };
  const handleBasket = (index) => {
    console.log("allindex", index);
    setFavContent((prev) => {
      const updatedContent = { ...prev };
      // console.log("favbasket12345", updatedContent?.data[index])
      const allbasket = updatedContent?.data.map((ele, inx) => {
        // console.log("allindex",index)
        // console.log("allindex123",inx)

        if (index == inx) {
          return {
            ...ele,
            basket_status: ele?.basket_status == "true" ? "false" : "true",
          };
        }
        return ele;
      });
      console.log("favbasket12345", allbasket);

      const updatedDatafav = { ...updatedContent, data: allbasket };
      return updatedDatafav;
    });
  };

  // console.log("all fav content -------->", favContent);
  useEffect(() => {
    console.log("all file should run");
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
                    {favContent?.data?.length > 0 ? (
                      favContent?.data?.map((curr, index) => {
                        const contentId = curr?.content_id?.content || [];
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
                        console.log("favcurr", curr);
                        return (
                          <Col lg={3} md={4} sm={6}>
                            <ContentFeedCard
                              feedImg={
                                curr?.content_id?.content[0]?.media_type ===
                                "video"
                                  ? curr?.content_id?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content_id?.content[0]?.thumbnail
                                  : curr?.content_id?.content[0]?.media_type ===
                                    "image"
                                  ? curr?.content_id?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content_id?.content[0]?.media
                                  : curr?.content_id?.content[0]?.media_type ===
                                    "audio"
                                  ? audioic
                                  : ""
                              }
                              allContent={curr?.content_id?.content}
                              basketValue={curr?.basket_status}
                              basket={() => {
                                console.log("myData");
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
                                curr?.content_id?.hopper_id?.avatar_id?.avatar
                              }
                              author_Name={
                                curr?.content_id?.hopper_id?.user_name
                              }
                              lnkto={`/Feeddetail/content/${curr?.content_id?._id}`}
                              viewTransaction={"View details"}
                              viewDetail={`/Feeddetail/content/${curr?.content_id?._id}`}
                              fvticns={favouritedic}
                              content_id={curr?.content_id?._id}
                              bool_fav={"false"}
                              favourite={() => handleFavourite(curr?._id)}
                              type_img={
                                curr?.content_id?.type === "shared"
                                  ? shared
                                  : exclusive
                              }
                              type_tag={curr?.content_id?.type}
                              feedHead={curr?.content_id?.heading}
                              feedTime={moment(
                                curr?.content_id?.createdAt
                              ).format("hh:mm A , DD MMM YYYY")}
                              feedLocation={curr?.content_id?.location}
                              contentPrice={`${formatAmountInMillion(
                                curr?.content_id?.ask_price || 0
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
