import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../component/Header";
import imgs from "../assets/images/imgn6.jpg";
// import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
// import contentVideo from "../assets/images/contentVideo.svg";
// import avatar from "../assets/images/avatar.png";
// import map from "../assets/images/map.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Select, MenuItem } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from "../component/DbFooter";
// import image8 from "../assets/images/img8.jpg";
// import image9 from "../assets/images/img9.jpg";
// import image10 from "../assets/images/img10.jpg";
import favic from "../assets/images/star.svg";
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import Loader from "../component/Loader";
import favouritedic from "../assets/images/favouritestar.svg";
import cameraic from "../assets/images/camera.svg";
// import favic from "../assets/images/favouritestar.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import { AiFillCaretDown } from "react-icons/ai";
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdfic.svg";
import shared from "../assets/images/share.png";
import audioic from "../assets/images/audimg.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import ContentUnderOfferFilter from "../component/Sortfilters/Content/ContentUnderOfferFilter";
import UnderOfferSort from "../component/Sortfilters/Content/UnderOfferSort";
import { initStateOfPurchaseContent } from "../component/staticData";
import { PaginationComp } from "../component/Pagination";

const Purchasedcontent = () => {
  const type = useParams();
  const [purchaseContent, setPurchaseContent] = useState(
    initStateOfPurchaseContent
  );
  const [loading, setLoading] = useState(false);

  // Pagination-
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const PurchasedContent = async (contentType) => {
    const offset = (page - 1) * limit;

    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/purchasedContents?limit=${limit}&offset=${offset}&licenseType=${contentType}`);
      const category = await Get("mediaHouse/getCategoryType?type=content");
      setPurchaseContent({
        ...purchaseContent,
        data: resp.data.data,
        categoryData: category?.data?.data,
      });
      setTotalPage(Math.ceil(resp.data.count / limit));
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    PurchasedContent(type.type);
  }, [purchaseContent.filter.active, purchaseContent.sort.active, page]);


   const handleBasket = ()=>{
    PurchasedContent(type.type);
  }
  const handleFavourite = (index) => {
    setPurchaseContent((prev) => {
      const updatedData = { ...prev };
      updatedData.data[index].favourite_status =
        updatedData.data[index].favourite_status == "true" ? "false" : "true";
      return updatedData;
    });
  };

  return (
    <>
      <Header />
      {loading && <Loader />}
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between">
                <div className="feedHdTags_wrap">
                  <Link
                    onClick={() => history.back()}
                    className="back_link mb-3"
                  >
                    <BsArrowLeft className="text-pink" />
                    Back
                  </Link>
                </div>

                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        onClick={() =>
                          setPurchaseContent({
                            ...purchaseContent,
                            filter: {
                              ...purchaseContent.filter,
                              filter:
                                purchaseContent.filter.filter == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {purchaseContent?.filter?.filter == "true" && (
                        <ContentUnderOfferFilter
                          setContentUnderOffer={setPurchaseContent}
                          contentUnderOffer={purchaseContent}
                          shareDev={false}
                          excDev={false}
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
                          setPurchaseContent({
                            ...purchaseContent,
                            sort: {
                              ...purchaseContent.sort,
                              sort:
                                purchaseContent.sort.sort == "true"
                                  ? "false"
                                  : "true",
                            },
                          })
                        }
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {purchaseContent?.sort?.sort == "true" && (
                        <UnderOfferSort
                          setContentUnderOffer={setPurchaseContent}
                          contentUnderOffer={purchaseContent}
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
                <div className="feedsContainer feedpurchaseContent mb-0">
                  <div className="feedContent_header">
                    <h1>
                      Purchased content | {capitalizeFirstLetter(type.type)}
                    </h1>
                  </div>
                  {
                    console.log("purchaseContent", purchaseContent)
                  }
                  <Row className="">
                    {purchaseContent?.data?.map((item, index) => {
                        const Audio = item?.contentDetails?.content?.filter(
                          (item) => item?.media_type === "audio"
                        );
                        const Video = item?.contentDetails?.content?.filter(
                          (item) => item?.media_type === "video"
                        );
                        const Image = item?.contentDetails?.content?.filter(
                          (item) => item?.media_type === "image"
                        );
                        const Pdf = item?.contentDetails?.content?.filter(
                          (item) => item?.media_type === "pdf"
                        );
                        const Doc = item?.contentDetails?.content?.filter(
                          (item) => item?.media_type === "doc"
                        );
                        const imageCount = Image.length;
                        const videoCount = Video.length;
                        const audioCount = Audio.length;
                        const pdfCount = Pdf.length;
                        const docCount = Doc.length;

                        return (
                          <Col md={3} key={item?._id}>
                            <ContentFeedCard
                              feedImg={
                                item?.contentDetails?.content[0]?.media_type === "video"
                                  ? item?.contentDetails?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      item?.contentDetails?.content[0].thumbnail
                                  : item?.contentDetails?.content[0]?.media_type === "image"
                                  ? item?.contentDetails?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      item?.contentDetails?.content[0].media
                                  : item?.contentDetails?.content[0]?.media_type === "audio"
                                  ? audioic
                                  : ""
                              }
                              feedTag={
                                item?.contentDetails?.content_view_type == "mostpopular"
                                  ? "Most Popular"
                                  : item?.contentDetails?.content_view_type == "mostviewed"
                                  ? "Most viewed"
                                  : null
                              }
                              lnkto={`/purchased-content-detail/${item?._id}`}
                              viewTransaction={"View details"}
                              viewDetail={`/purchased-content-detail/${item?._id}`}
                              author_Name={item?.hopper_id?.user_name}
                              user_avatar={
                                process.env.REACT_APP_AVATAR_IMAGE +
                                item?.hopperDetails?.avatarDetails?.avatar
                              }
                              content_id={item._id}
                              is_sale_status={true}
                              type_img={item?.payment_content_type === "shared" ? shared : exclusive}
                              type_tag={item?.payment_content_type === "shared" ? "Shared" : "Exclusive"}
                              feedHead={item?.contentDetails?.heading}
                              feedTime={moment(item?.createdAt).format(
                                "hh:mm A, DD MMM YYYY"
                              )}
                              feedLocation={item?.contentDetails?.location}
                              contentPrice={formatAmountInMillion(Number(item?.amount + item?.Vat) || 0)}
                              allContent={item?.content}
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
              // path="Favourited-Content"
              path={`purchased-content/${type?.type}`}
              type="fav"
              setPage={setPage}
              page={page}
            />
          ) : (
            ""
          )}
          {/* <PaginationComp totalPage={totalPage} path={`purchased-content/${type?.type}`} type="fav" setPage={setPage} page={page} /> */}
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Purchasedcontent;
