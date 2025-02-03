import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from "../component/Header"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import avatar from "../assets/images/avatar.png";
import map from "../assets/images/map.svg";
import ContentFeedCard from '../component/card/ContentFeedCard'
import shared from '../assets/images/share.png';
import exclusive from '../assets/images/exclusive.png';
import { Select, MenuItem } from '@mui/material';
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import sports from "../assets/images/sortIcons/sports.png";
import crime from "../assets/images/sortIcons/crime.svg"
import fashion from "../assets/images/sortIcons/dress.svg"
import DbFooter from '../component/DbFooter';
import image8 from "../assets/images/img8.jpg";
import image9 from "../assets/images/img9.jpg";
import image10 from "../assets/images/img10.jpg";
import celebrity from "../assets/images/sortIcons/VIP.svg";
import politics from "../assets/images/sortIcons/political.svg"
import { Get, Post } from '../services/user.services';
import favic from "../assets/images/star.svg";
import moment from 'moment/moment';
import favouritedic from "../assets/images/favouritestar.svg";
import Loader from '../component/Loader';
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import audioic from "../assets/images/audimg.svg";


import Fundsinvested from '../component/Sortfilters/Dashboard/Fundsinvested';
import TopFilterComn from '../component/Sortfilters/Content/TopFilterComn';
const SourcedContent = () => {
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [sourcedContennewt, setSourcedContent] = useState([])
  const [sortingField, setSortingField] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [sortingType, setSortingType] = useState("");
  const [loading, setLoading] = useState(false);


  const TaskDetails = async () => {
    setLoading(true)
    try {
      const resp = await Get(`mediaHouse/Content/Count?${sortingField && sortingField}=${sortingValue && sortingValue}`)
      if (resp) {
        setSourcedContent(resp.data.sourced_content_from_tasks)
        setLoading(false)
      }
    }
    catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    TaskDetails()
  }, [])
  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values)
  }

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values)
  }


  const [sortValues, setSortValues] = useState("");
  const handleSortValues = (values) => {
    setSortValues(values)
    // console.log("handleSortValues 55", values)
  }

  const [multiFilter, setMultiFilter] = useState([]);
  const handleMultiFilter = (values) => {
    setMultiFilter(values);
    // console.log("multiFilter 59", values)
  }
  const queryParams = multiFilter.map((item) => `${item.field}=${item.values}`).join("&");

  // console.log("queryParams 64", queryParams)


  const [PublishedData, setPublishedData] = useState({
    all: [],

    exclusive: [],
    shared: [],
    crime: [],
    celebrity: []
  })

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between">
                <div className="feedHdTags_wrap">
                  <Link className="backtoLink" onClick={() => window.history.back()}>
                    <BsArrowLeft className='text-pink' /> Back
                  </Link>
                </div>
                {/* <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      {
                        openSortComponent && <Fundsinvested
                          rangeTimeValues={handleSortValues}
                          closeSortComponent={handleCloseSortComponent}
                        />
                      }
                    </div>
                  </div>
                </div> */}
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
                <div className="feedsContainer feedUSourcedContent mb-0" >
                  <div className="feedContent_header">
                    <h1 className='rw_hdng'>Content purchased from tasks</h1>
                  </div>
                  <Row className=''>
                    {
                      sourcedContennewt?.task && sourcedContennewt?.task.map((curr, index) => {
                        const content = (curr?.type === "image" ? curr?.imageAndVideo :
                          curr?.type === "video" ? curr?.videothubnail :
                            curr?.type === "audio" ? audioic : "")
                        return (
                          <Col lg={3} md={4} sm={6}>
                            <Link to={`/sourced-content-detail/${curr?._id}`}>
                              <ContentFeedCard feedImg={process.env.REACT_APP_UPLOADED_CONTENT + content}
                                feedTypeImg1={curr.type === "audio" ? interviewic : curr.type === "video" ? videoic : cameraic}
                                lnkto={`/sourced-content-detail/${curr?._id}`}
                                viewDetail={`/sourced-content-detail/${curr?._id}`}
                                content_id={curr?._id}
                                user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr?.hopper_details?.avatar_details?.avatar}
                                author_Name={curr?.hopper_details?.user_name}
                                feedHead={curr?.task_id?.heading}
                                viewTransaction={"View details"}
                                postcount={"1"}
                                fvticns={favic}
                                feedTime={moment(curr?.createdAt).format("hh:mm A , DD MMMM YYYY")} feedLocation={curr?.task_id?.location} contentPrice={`${curr?.task_id?.photo_price}`}
                              />
                            </Link>
                          </Col>
                        )
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
      </div>
      <DbFooter />
    </>

  )
}

export default SourcedContent