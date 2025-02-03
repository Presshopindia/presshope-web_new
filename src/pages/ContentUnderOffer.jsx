import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import ContentFeedCard from "../component/card/ContentFeedCard";
import DbFooter from "../component/DbFooter";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import UnderOffer from "../component/Sortfilters/Content/UnderOffer";
import Loader from "../component/Loader";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import { Container, Row, Col } from "react-bootstrap";
import avatar from "../assets/images/avatar.png";
import favouritedic from "../assets/images/favouritestar.svg";
import favic from "../assets/images/star.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import exclusive from "../assets/images/exclusive.png";
import shared from "../assets/images/share.png";
import audioic from "../assets/images/audimg.svg";
import UnderOfferSort from "../component/Sortfilters/Content/UnderOfferSort";
import { formatAmountInMillion } from "../component/commonFunction";
import ContentUnderOfferFilter from "../component/Sortfilters/Content/ContentUnderOfferFilter";
import { initStateOfUnderOffer } from "../component/staticData";
import { PaginationComp } from "../component/Pagination";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";

const ContentUnderOffer = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const location = useLocation();
  const navigate = useNavigate();
  const [contentUnderOffer, setContentUnderOffer] = useState(
    initStateOfUnderOffer
  );
  const [loading, setLoading] = useState(false);

  // Content under offer api-
  const offeredContent = async () => {
    setLoading(true);
    try {
      console.log(
        "contentUnderOffer.sort.hopper_location,",
        contentUnderOffer.sort.hopper_location
      );
      const payload = {
        limit: 20,
        sort_for_under_offer: contentUnderOffer.sort.field,
        price_range_from: contentUnderOffer.sort.price_range_from,
        price_range_to: contentUnderOffer.sort.price_range_to,
        hopper_location: contentUnderOffer.sort.hopper_location,
        category: contentUnderOffer.filter.category,
        type: contentUnderOffer.filter.type,
        favContent: contentUnderOffer.filter.favContent,
        latestContent: contentUnderOffer.filter.latestContent,
        limit: limit,
        offset: +(page - 1) * limit,
      };
      const resp = await Post("mediaHouse/contentUnderOfferForcard", payload);
      const category = await Get("mediaHouse/getCategoryType?type=content");
      setTotalPage(
        Math.ceil(resp?.data?.content_under_offer?.totalCount / limit)
      );
      setContentUnderOffer({
        ...contentUnderOffer,
        data: resp?.data?.content_under_offer?.newdata,
        categoryData: category?.data?.data,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    offeredContent();
  }, [contentUnderOffer.filter.active, contentUnderOffer.sort.active, page]);

  // Favourite content-
  const handleFavourite = (i) => {
    setContentUnderOffer((prev) => {
      const allContent = { ...prev };
      allContent.data[i]["favourite_status"] =
        allContent.data[i]["favourite_status"] === "true" ? "false" : "true";
      return allContent;
    });
  };

  const handleBasket = (i) => {
    setContentUnderOffer((prev) => {
      const allContent = { ...prev };
      allContent.data[i]["basket_status"] =
        allContent.data[i]["basket_status"] === "true" ? "false" : "true";
      console.log("allcontentexmaple", allContent);
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
              <div className="feedPreviews d-flex justify-content-between align-items-center flex-wrap">
                <Link
                  onClick={() => window.history.back()}
                  className="back_link"
                >
                  <BsArrowLeft className="text-pink" /> Back
                </Link>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setContentUnderOffer({
                            ...contentUnderOffer,
                            filter: {
                              ...contentUnderOffer.filter,
                              filter:
                                contentUnderOffer.filter.filter == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {contentUnderOffer?.filter?.filter == "true" && (
                        <ContentUnderOfferFilter
                          setContentUnderOffer={setContentUnderOffer}
                          contentUnderOffer={contentUnderOffer}
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
                          setContentUnderOffer({
                            ...contentUnderOffer,
                            sort: {
                              ...contentUnderOffer.sort,
                              sort:
                                contentUnderOffer.sort.sort == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {contentUnderOffer?.sort?.sort == "true" && (
                        <UnderOfferSort
                          setContentUnderOffer={setContentUnderOffer}
                          contentUnderOffer={contentUnderOffer}
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

      <div className="page-wrap cont_undr_ofr_pg">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedofferedContent mb-0">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Content under offer</h1>
                  </div>
                  <Row className="">
                    {/* {contentUnderOffer?.data?.map((curr, index) => {
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
                        <Col lg={3} md={4} sm={6} key={index}>
                          <ContentFeedCard
                            className="undr_ofr_crd"
                            feedImg={
                              curr.content[0].media_type === "video"
                                ? curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                : curr.content[0].media_type === "image"
                                  ? curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                  : curr.content[0].media_type === "audio"
                                    ? audioic
                                    : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''
                            }
                            user_avatar={curr?.hopper_id?.avatar_details[0]?.avatar ? process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_details[0]?.avatar : avatar}
                            author_Name={curr?.hopper_id?.user_name}
                            lnkto={`/Feeddetail/content/${curr?._id}`}
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
                            fvticns={
                              curr?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            content_id={curr?._id}
                            bool_fav={
                              curr?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            favourite={() => favContentHandler(index, "content")}
                            type_img={curr?.type === "exclusive" ? exclusive : shared}
                            type_tag={curr?.type}
                            feedHead={curr?.heading}
                            feedTime={moment(curr?.createdAt).format("hh:mm A , DD MMM YYYY")}
                            feedLocation={curr?.location}
                            contentPrice={`${formatAmountInMillion(curr?.ask_price || 0)}`}
                            offeredPrice={`£${formatAmountInMillion(+(curr?.offered_price[curr?.offered_price.length - 1]?.initial_offer_price || curr?.offered_price[curr?.offered_price.length - 1]?.finaloffer_price))}`}
                          />
                        </Col>
                      );
                    })} */}
                    {contentUnderOffer?.data?.length >= 1 ? (
                      contentUnderOffer?.data?.map((curr, i) => (
                        <Col lg={3} md={4} sm={6} key={i}>
                          <ContentFeedCard
                            feedImg={
                              curr.content[0].media_type === "video"
                                ? process.env.REACT_APP_CONTENT_MEDIA +
                                    curr.content[0].thumbnail ||
                                  curr.content[0].watermark
                                : curr.content[0].media_type === "image"
                                ? curr.content[0].watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                    curr.content[0].media
                                : curr.content[0].media_type === "audio"
                                ? audioic
                                : curr?.content[0]?.media_type === "doc" ||
                                  "pdf"
                                ? pdfic
                                : ""
                            }
                            feedType={
                              curr.content[0].media_type === "video"
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
                            // userAvatar={imgs}
                            authorName={"pseudonymous"}
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            most_viewed={true}
                            author_Name={curr?.hopper_id?.user_name}
                            user_avatar={
                              curr?.hopper_id?.avatar_details[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.hopper_id?.avatar_details[0]?.avatar
                                : avatar
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
                            favourite={() => handleFavourite(i)} // Call the function directly
                            basket={() => {
                              handleBasket(i);
                            }}
                            basketValue={curr.basket_status}
                            allContent={curr?.content}
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
                            offeredPrice={`£${formatAmountInMillion(
                              +(
                                curr?.offered_price[
                                  curr?.offered_price.length - 1
                                ]?.initial_offer_price ||
                                curr?.offered_price[
                                  curr?.offered_price.length - 1
                                ]?.finaloffer_price
                              )
                            )}`}
                          />
                        </Col>
                      ))
                    ) : (
                      <>
                        <h1>No data found</h1>
                      </>
                    )}
                  </Row>
                  {totalPage ? (
                    <PaginationComp
                      totalPage={totalPage}
                      path="Content-Under-Offer"
                      type="fav"
                      setPage={setPage}
                      page={page}
                    />
                  ) : (
                    ""
                  )}
                  {/*                   
                  { totalPage ?  <PaginationComp totalPage={totalPage} path="Content-Under-Offer" type="fav" setPage={setPage} page={page} /> :"" }
                   */}
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

export default ContentUnderOffer;
