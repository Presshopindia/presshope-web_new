import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from "../component/Header"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from '../component/card/ContentFeedCard';
import shared from '../assets/images/share.png';
import exclusive from '../assets/images/exclusive.png';
import { Select, MenuItem } from '@mui/material';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";
import moment from 'moment/moment';
import favic from "../assets/images/star.svg";
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from '../component/Loader';
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";
import Fundsinvested from '../component/Sortfilters/Dashboard/Fundsinvested';
import TopFilterComn from '../component/Sortfilters/Content/TopFilterComn';
import { AiFillCaretDown } from 'react-icons/ai';
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import DbFooter from '../component/DbFooter';
import docsic from "../assets/images/docsic.svg";
import pdfic from "../assets/images/pdf-icn-card.png";
import { formatAmountInMillion } from '../component/commonFunction';
import ContentUnderOfferFilter from '../component/Sortfilters/Content/ContentUnderOfferFilter';
import UnderOfferSort from '../component/Sortfilters/Content/UnderOfferSort';
import { initStateOfFeed } from '../component/staticData';
import ViewContent from '../component/ViewContent';

const PublishedContent = (props) => {
    // console.log("props.locations", props.location)
    const [loading, setLoading] = useState(false);
    const [crime, setCrime] = useState();
    const [cel, setCel] = useState();
    const [activeFilter, setActiveFilter] = useState("");
    const [multiFilterState, setMultiFilterState] = useState([])
    const [activeSort, setActiveSort] = useState("")
    const [contentPurchaseState, setContentPurchaseState] = useState("")
    const [openSortComponent, setOpenSortComponent] = useState(false);
    const [openFilterComponent, setOpenFilterComponent] = useState(false);
    const [contentUnderOffer, setContentUnderOffer] = useState(initStateOfFeed);

    const handleCloseFilterComponent = (values) => {
        setOpenFilterComponent(values);
    }

    const handleCloseSortComponent = (values) => {
        setOpenSortComponent(values);
    }

    const [sortValues, setSortValues] = useState("");

    const [sortValuesName, setSortValuesName] = useState("");

    const handleSortValues = (values) => {
        setSortValues(values?.values);
        // console.log("handleSortValues 55", values?.values);
        setSortValuesName(values?.values)
    }



    const [multiFilter, setMultiFilter] = useState([]);
    const [filterParams, setFilterParams] = useState({ type: [], category_id: [], content_under_offer: "" });

    const handleMultiFilter = (values) => {
        setMultiFilter(values);

        const categoryFilter = values?.filter((el) => el.field === "category_id");
        const typeFilter = values?.filter((el) => el.field === "type");
        const contentUnderOffer = values?.find((el) => el.field === "content_under_offer")?.values;

        setFilterParams({
            category_id: categoryFilter,
            type: typeFilter,
            content_under_offer: contentUnderOffer,
        });
    };

    const [PublishedData, setPublishedData] = useState({
        all: [],
        exclusive: [],
        shared: [],
        crime: [],
        celebrity: [],
    });

    const PublishContent = async () => {
        setLoading(true)
        try {
            if (filterParams.type.length === 0 && filterParams.category_id.length === 0 && !filterParams.content_under_offer) {

                const all = await Post("mediaHouse/view/published/content", { content: "latest", sortValuesName: sortValues });
                const exclusive = await Post("mediaHouse/view/published/content", { type: ["exclusive"], sortValuesName: sortValues });
                const shared = await Post("mediaHouse/view/published/content", { type: ["shared"], sortValuesName: sortValues });
                const crime = await Post("mediaHouse/view/published/content", { category_id: ["64f09d79db646e4f7791761b"], sortValuesName: sortValues });
                const celebrity = await Post("mediaHouse/view/published/content", { category_id: ["64f09d1fdb646e4f779174a1"], sortValuesName: sortValues });
                setLoading(false)

                setPublishedData((prev) => ({

                    ...prev,
                    all: all.data.content,
                    exclusive: exclusive.data.content,
                    shared: shared.data.content,
                    crime: crime.data.content,
                    celebrity: celebrity.data.content,

                }));
            } else {
                if (filterParams.type.length === 0) {
                    const result = await Post("mediaHouse/view/published/content", {
                        category_id: filterParams.category_id?.map((el) => el.values),
                        content_under_offer: filterParams.content_under_offer,
                    });
                    const sharedData = result?.data?.content?.filter((el) => el.type === "shared");
                    const exclusiveData = result?.data?.content?.filter((el) => el.type === "exclusive");
                    const celebrityData = result?.data?.content?.filter((el) => el.category_id?._id === "64f09d1fdb646e4f779174a1");
                    const crimeData = result?.data?.content?.filter((el) => el.category_id?._id === "64f09d79db646e4f7791761b");

                    setLoading(false)
                    setPublishedData({
                        exclusive: exclusiveData,
                        shared: sharedData,
                        celebrity: celebrityData,
                        crime: crimeData,
                    });
                } else {
                    const result = await Post("mediaHouse/view/published/content", {
                        type: filterParams.type?.map((el) => el.values),
                        category_id: filterParams.category_id?.map((el) => el.values),
                        content_under_offer: filterParams.content_under_offer,
                    });
                    const sharedData = result?.data?.content?.filter((el) => el.type === "shared");
                    const exclusiveData = result?.data?.content?.filter((el) => el.type === "exclusive");
                    const celebrityData = result?.data?.content?.filter((el) => el.category_id?._id === "64f09d1fdb646e4f779174a1");
                    const crimeData = result?.data?.content?.filter((el) => el.category_id?._id === "64f09d79db646e4f7791761b");
                    setPublishedData(
                        {
                            exclusive: exclusiveData,
                            shared: sharedData,
                            celebrity: celebrityData,
                            crime: crimeData,
                        });
                    setLoading(false)
                }
            }
        } catch (error) {
            // Handle errors here
            console.error(error);
            setLoading(false)
        }
    };

    const handleFavourite = (i, type) => {
        setPublishedData((prev) => {
            const allContent = { ...prev };
            allContent[type][i]["favourite_status"] = allContent[type][i]["favourite_status"] === "true" ? "false" : "true";
            return allContent
        })
    }


    useEffect(() => {
        // Make the API call when filterParams changes
        PublishContent();
    }, [filterParams, sortValues]);

    // API for category id
    const getCategory = async () => {
        try {
            const result = await Get("mediaHouse/getCategoryType?type=content");
            // console.log("result 66", result?.data);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Header />
            <div className="feedTags_search">
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <div className="feedPreviews d-flex justify-content-between flex-wrap">
                                {
                                    localStorage.getItem("backBtnVisibility") ? <Link onClick={() => history.back()}
                                        className='back_link mb-3'><BsArrowLeft className='text-pink' />
                                        Back
                                    </Link> : <div></div>
                                }
                                <div className="sorting_wrap d-flex">
                                    <div className="feedSorting me-4">
                                        <div className="fltrs_prnt top_fltr">
                                            <button className='sortTrigger' onClick={() => setContentUnderOffer({ ...contentUnderOffer, filter: { ...contentUnderOffer.filter, filter: contentUnderOffer.filter.filter == "true" ? "false" : "true" } })} >Filter <AiFillCaretDown /></button>
                                            {
                                                contentUnderOffer?.filter?.filter == "true" && <ContentUnderOfferFilter setContentUnderOffer={setContentUnderOffer} contentUnderOffer={contentUnderOffer} />
                                            }
                                        </div>
                                    </div>
                                    <div className="feedSorting">
                                        <div className="fltrs_prnt top_fltr">
                                            <p className="lbl_fltr">Sort</p>
                                            <button className='sortTrigger' onClick={() => setContentUnderOffer({ ...contentUnderOffer, sort: { ...contentUnderOffer.sort, sort: contentUnderOffer.sort.sort == "true" ? "false" : "true" } })}>Sort <AiFillCaretDown /></button>
                                            {
                                                contentUnderOffer?.sort?.sort == "true" && <UnderOfferSort setContentUnderOffer={setContentUnderOffer} contentUnderOffer={contentUnderOffer} />
                                            }
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
                                <div className="feedsContainer">
                                    {
                                        PublishedData?.all && PublishedData?.all?.length > 0 && <div className="feedContent_header">
                                            <h1 className='rw_hdng'>Latest content</h1>
                                            <Link to="/Uploaded-Content/all">View all <BsArrowRight className='text-pink' /></Link>
                                        </div>
                                    }
                                    <Row className=''>
                                        {PublishedData?.all?.map((curr, index) => {

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
                                            if (index < 4) {
                                                return (
                                                    <Col lg={3} md={4} sm={6} key={index}>
                                                        <ContentFeedCard
                                                            feedImg={
                                                                curr.content[0].media_type === "video" ?
                                                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                                                    : curr.content[0].media_type === "image" ?
                                                                        curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                                                        : curr.content[0].media_type === "audio" ?
                                                                            audioic
                                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? pdfic : ''
                                                            }
                                                            feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera}
                                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                                            userAvatar={imgs}
                                                            authorName={"pseudonymous"}
                                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                                            most_viewed={true}
                                                            author_Name={curr?.hopper_id?.user_name}
                                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                                            fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                                                            content_id={curr._id}
                                                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                                            favourite={() => handleFavourite(index, "all")}
                                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                                            type_tag={curr.type === "shared" ? "Shared" : "Exclusive"}
                                                            feedHead={curr.heading}
                                                            feedTime={moment(curr.createdAt).format("hh:mm A , DD MMMM YYYY")}
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
                                            }
                                            return null;
                                        })}
                                    </Row>

                                </div>
                                <div className="feedsContainer">
                                    {
                                        PublishedData?.exclusive && PublishedData?.exclusive?.length > 0 && <div className="feedContent_header">
                                            <h1 className='rw_hdng'>Exclusive content</h1>
                                            <Link to="/Uploaded-Content/exclusive">View all <BsArrowRight className='text-pink' /></Link>
                                        </div>
                                    }
                                    <Row className=''>
                                        {PublishedData && PublishedData.exclusive?.map((curr, index) => {

                                            const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                                            const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                                            const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                                            const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                                            const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")

                                            const imageCount = Image.length;
                                            const videoCount = Video.length;
                                            const audioCount = Audio.length;
                                            const pdfCount = Pdf.length;
                                            const docCount = Doc.length;

                                            if (index < 4) {
                                                return (
                                                    <Col lg={3} md={4} sm={6}>
                                                        <ContentFeedCard
                                                            feedImg={
                                                                curr.content[0].media_type === "video" ?
                                                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                                                    : curr.content[0].media_type === "image" ?
                                                                        curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                                                        : curr.content[0].media_type === "audio" ?
                                                                            audioic
                                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? pdfic : ''}
                                                            feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera}
                                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                                            userAvatar={imgs}
                                                            authorName={"pseudonymous"}
                                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                                            fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                                            content_id={curr._id}
                                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                                            author_Name={curr?.hopper_id?.user_name}
                                                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                                            favourite={() => handleFavourite(index, "exclusive")}
                                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                                            type_tag={curr.type === "shared" ? "Shared" : "Exclusive"}
                                                            feedHead={curr?.heading}
                                                            feedTime={moment(curr.createdAt).format("hh:mm A , DD MMMM YYYY")} feedLocation={curr.location} contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
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
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                                <div className="feedsContainer">
                                    {
                                        PublishedData?.shared && PublishedData?.shared?.length > 0 && <div className="feedContent_header">
                                            <h1 className='rw_hdng'>Shared content</h1>
                                            <Link to="/Uploaded-Content/shared">View all <BsArrowRight className='text-pink' /></Link>
                                        </div>
                                    }
                                    <Row className=''>
                                        {PublishedData && PublishedData.shared?.map((curr, index) => {
                                            const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                                            const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                                            const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                                            const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                                            const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")
                                            const imageCount = Image.length;
                                            const videoCount = Video.length;
                                            const audioCount = Audio.length;
                                            const pdfCount = Pdf.length;
                                            const docCount = Doc.length;
                                            if (index < 4) {
                                                return (
                                                    <Col lg={3} md={4} sm={6}>
                                                        <ContentFeedCard
                                                            feedImg={
                                                                curr.content[0].media_type === "video" ?
                                                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                                                    : curr.content[0].media_type === "image" ?
                                                                        curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                                                        : curr.content[0].media_type === "audio" ?
                                                                            audioic
                                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? pdfic : ''}
                                                            feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera}
                                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                                            userAvatar={imgs}
                                                            authorName={"pseudonymous"}
                                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                                            fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                                            content_id={curr._id}
                                                            most_viewed={true}
                                                            author_Name={curr?.hopper_id?.user_name}
                                                            bool_fav={curr?.favourite_status === "true" ? "false" : "true"}
                                                            favourite={() => handleFavourite(index, "shared")}
                                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                                            type_tag={curr.type === "shared" ? "Shared" : "Exclusive"}
                                                            feedHead={curr?.heading}
                                                            feedTime={moment(curr.createdAt).format("hh:mm A , DD MMMM YYYY")} feedLocation={curr.location} contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
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
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                                <div className="feedsContainer">
                                    {
                                        PublishedData?.crime && PublishedData?.crime?.length > 0 && <div className="feedContent_header">
                                            <h1 className='rw_hdng'>Crime content</h1>
                                            <Link to="/Uploaded-Content/Crime">View all <BsArrowRight className='text-pink' /></Link>
                                        </div>
                                    }
                                    <Row className=''>
                                        {PublishedData && PublishedData.crime?.map((curr, index) => {
                                            if (index < 4) {
                                                const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                                                const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                                                const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                                                const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                                                const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")

                                                const imageCount = Image.length;
                                                const videoCount = Video.length;
                                                const audioCount = Audio.length;
                                                const pdfCount = Pdf.length;
                                                const docCount = Doc.length;
                                                return (
                                                    <Col lg={3} md={4} sm={6}>
                                                        <ContentFeedCard
                                                            feedImg={
                                                                curr.content[0].media_type === "video" ?
                                                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                                                    : curr.content[0].media_type === "image" ?
                                                                        curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                                                        : curr.content[0].media_type === "audio" ?
                                                                            audioic
                                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? pdfic : ''}
                                                            feedType={curr.content[0].media_type === "video" ? contentVideo : contentCamera}
                                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                                            userAvatar={imgs}
                                                            authorName={"pseudonymous"}
                                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}

                                                            fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                                            content_id={curr._id}
                                                            author_Name={curr?.hopper_id?.user_name}
                                                            most_viewed={true}
                                                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                                            favourite={() => handleFavourite(index, "crime")}
                                                            viewTransaction={"View details"}
                                                            viewDetail={`/Feeddetail/content/${curr._id}`}
                                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                                            type_tag={curr.type === "shared" ? "Shared" : "Exclusive"}
                                                            feedHead={curr?.heading}
                                                            feedTime={moment(curr.createdAt).format("hh:mm A , DD MMMM YYYY")} feedLocation={curr.location} contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
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
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                                <div className="feedsContainer mb-0">
                                    {
                                        PublishedData?.celebrity && PublishedData?.celebrity?.length > 0 && <div className="feedContent_header">
                                            <h1 className='rw_hdng'>Celebrity content</h1>
                                            <Link to="/Uploaded-Content/Celebrity">View all <BsArrowRight className='text-pink' /></Link>
                                        </div>
                                    }
                                    <Row className=''>
                                        {PublishedData && PublishedData.celebrity?.map((curr, index) => {

                                            const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                                            const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                                            const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                                            const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                                            const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")
                                            const imageCount = Image.length;
                                            const videoCount = Video.length;
                                            const audioCount = Audio.length;
                                            const pdfCount = Pdf.length;
                                            const docCount = Doc.length;

                                            if (index < 4) {
                                                return (
                                                    <Col lg={3} md={4} sm={6}>
                                                        <ContentFeedCard
                                                            feedImg={
                                                                curr.content[0].media_type === "video" ?
                                                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                                                    : curr.content[0].media_type === "image" ?
                                                                        curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                                                        : curr.content[0].media_type === "audio" ?
                                                                            audioic
                                                                            : curr?.content[0]?.media_type === "doc" || 'pdf' ? pdfic : ''}
                                                            feedTag={curr?.sales_prefix ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off` : curr?.content_view_type == "mostpopular" ? "Most Popular" : curr?.content_view_type == "mostviewed" ? "Most viewed" :  null}
                                                            userAvatar={imgs} authorName={"pseudonymous"}
                                                            lnkto={`/Feeddetail/content/${curr._id}`}
                                                            user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_id?.avatar_id?.avatar}
                                                            fvticns={curr.favourite_status === "true" ? favouritedic : favic}
                                                            content_id={curr._id}
                                                            author_Name={curr?.hopper_id?.user_name}
                                                            most_viewed={true}
                                                            bool_fav={curr.favourite_status === "true" ? "false" : "true"}
                                                            favourite={() => handleFavourite(index, "celebrity")}
                                                            type_img={curr?.type === "shared" ? shared : exclusive}
                                                            type_tag={curr.type === "shared" ? "Shared" : "Exclusive"}
                                                            feedHead={curr?.heading}
                                                            feedTime={moment(curr.createdAt).format("hh:mm A , DD MMMM YYYY")} feedLocation={curr.location} contentPrice={`${formatAmountInMillion(curr.ask_price || 0)}`}
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
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="mt-0">
                        <TopSearchesTipsCard />
                    </div>
                </Container>
            </div >
            <DbFooter />
        </>

    )
}

export default PublishedContent