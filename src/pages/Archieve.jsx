import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import contentCamera from "../assets/images/contentCamera.svg";
import exclusive from "../assets/images/exclusive.png";
import Header from "../component/Header";
import ContentFeedCard from "../component/card/ContentFeedCard";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";


import moment from "moment/moment";
import { Col, Container, Row } from "react-bootstrap";
import cameraic from "../assets/images/camera.svg";
import docsic from "../assets/images/docsic.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import pdfic from "../assets/images/pdfic.svg";
import shared from "../assets/images/share.png";
import favic from "../assets/images/star.svg";
import DbFooter from "../component/DbFooter";
import Loader from "../component/Loader";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Post } from "../services/user.services";

const ArchieveItems = () => {
    const { startDate, endDate } = useParams();
    const [archieveContent, setArchieveContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFavourite = (i) => {
        setArchieveContent((prev) => {
            const allContent = [...prev];
            allContent[i]["favourite_status"] = allContent[i]["favourite_status"] === "true" ? "false" : "true";
            return allContent
          })
    };

    const PublishedContent = async () => {
        setLoading(true);
        try {
            const resp = await Post(`mediahouse/archivecontent`, { start: startDate.slice(1), end: endDate.slice(1) });
            const mostViewd = resp?.data?.content?.slice()?.sort((a, b) => b.content_view_count - a.content_view_count)?.slice(0, 5);
            const mostPopular = resp?.data?.content?.slice()?.sort((a, b) => b.content_view_count - a.content_view_count)?.slice(5, 15);
            resp?.data?.content?.forEach((obj) => {
                if (mostViewd.includes(obj)) {
                    obj.mostviewed = true;
                }
            });
            resp?.data?.content?.forEach((obj) => {
                if (mostPopular.includes(obj)) {
                    obj.mostPopular = true;
                }
            });


            setArchieveContent(resp.data.content);
            if (resp) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        PublishedContent();
    }, []);


    const formatAmountInMillion = (amount) =>
        amount?.toLocaleString('en-US', {
            maximumFractionDigits: 0,
        });

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
                    <h1>{new Date(endDate?.slice(1))?.toLocaleString('default', { month: 'short' })} {new Date(endDate?.slice(1))?.getFullYear()}</h1>
                    <Row className="">
                        {
                            archieveContent?.map((curr, index) => {
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
                                            feedImg={
                                                curr?.content[0]?.media_type === "video" ?
                                                    curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0]?.thumbnail
                                                    : curr?.content[0]?.media_type === "image" ?
                                                        curr?.content[0]?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.content?.[0]?.media
                                                        : curr?.content[0]?.media_type === "audio" ?
                                                            audioic
                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? docsic : ''}
                                            feedType={contentCamera}
                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                            author_Name={curr?.hopper_id?.user_name}
                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                            fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                                            content_id={curr._id}
                                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                            favourite={()=> handleFavourite(index)}
                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                            type_tag={curr.type}
                                            feedHead={curr.heading}
                                            feedTime={moment(curr.createdAt).format("h:mm A, DD MMMM YYYY")}
                                            feedLocation={curr.location}
                                            contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
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
                            })

                        }
                    </Row>
                    {
                        archieveContent.length === 0 && <p>No Data Found</p>
                    }
                    <div className="mt-0">
                        <TopSearchesTipsCard />
                    </div>
                </Container>
            </div>
            <DbFooter />
        </>
    );
};

export default ArchieveItems;