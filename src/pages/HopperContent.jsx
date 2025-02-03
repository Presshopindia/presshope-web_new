import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../component/Header";
import contentCamera from "../assets/images/contentCamera.svg";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { BsArrowLeft } from "react-icons/bs";
import audioic from "../assets/images/audimg.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import { Container, Row, Col } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from "../component/DbFooter";
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdfic.svg";
import { Get, Post } from "../services/user.services";
import favic from "../assets/images/star.svg";
import moment from "moment/moment";
import favouritedic from "../assets/images/favouritestar.svg";
import shared from "../assets/images/share.png";
import Loader from "../component/Loader";
import cameraic from "../assets/images/camera.svg";
import { PaginationComp } from "../component/Pagination";

const HopperContent = () => {
  const param = useParams();
  const [pub_content, setPub_Content] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(false);

  // Pagination-
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(8);

  const handleFavourite = () => {
    setFav(!fav);
    PublishedContent();
    UploadedContent();
    TaskDetails();
  };

  const PublishedContent = async () => {
    const obj = {
      hopper_id: param?.hopper_id,
      limit: limit,
      offset: +(page - 1) * limit,
    };

    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, obj);
      console.log("resp.data.content",resp.data.content)
      setPub_Content(resp.data.content);
      setTotalPage(Math.ceil(resp.data.count / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log(pub_content, limit, totalPage, page);

  useEffect(() => {
    PublishedContent();
  }, [page]);

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });


    console.log("pub_content",pub_content)
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
                    <h1 className="rw_hdng">Published Content</h1>
                  </div>
                  <Row className="">
                    {pub_content?.map((curr, index) => {
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
                        //  console.log("curr?.basket_status",curr?.basket_status)
                      return (
                        <Col lg={3} md={4} sm={6}>
                          <ContentFeedCard
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                    curr.content[0]?.thumbnail
                                : curr?.content[0]?.media_type === "image"
                                ? curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.content?.[0]?.media
                                : curr?.content[0]?.media_type === "audio"
                                ? audioic
                                : curr?.content[0]?.media_type === "doc" ||
                                  "pdf"
                                ? docsic
                                : ""
                            }
                            feedType={contentCamera}
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
                              curr?.hopper_id?.avatar_id?.avatar
                            }
                            author_Name={curr?.hopper_id?.user_name}
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            fvticns={
                              curr.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            // content_id={curr._id}
                            content_id={curr._id}
                            basket={() =>{

                              //  handleBasket(index, i)
                              // console.log("success")
                              // getTransactionDetails();
                                //  PublishedContent();
                                setPub_Content((old)=>{
                                  let alldata=[...old]
                                  alldata[index].basket_status=alldata[index].basket_status=="true"?"false":"true";
                                  console.log("aasdfjkl;",alldata,"index",index)
                                   return alldata ;
                                 });

                            }

                            }
                            basketValue={curr?.basket_status}

                            allContent={curr?.content}
                            bool_fav={
                              curr.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            favourite={handleFavourite}
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr.type}
                            feedHead={curr.heading}
                            feedTime={moment(curr.published_time_date).format(
                              "h:mm A, DD MMMM YYYY"
                            )}
                            feedLocation={curr.location}
                            contentPrice={`${formatAmountInMillion(
                              curr.ask_price || 0
                            )}`}
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
                          />
                        </Col>
                      );
                    })}
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
                  {/* <PaginationComp totalPage={totalPage} path={`hopper-content/${param?.hopper_id}`} type="fav" setPage={setPage} page={page} /> */}
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

export default HopperContent;
