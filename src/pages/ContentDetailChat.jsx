import React from 'react'
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
import { BsArrowRight } from "react-icons/bs";
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
import politics from "../assets/images/sortIcons/political.svg";
import contentbg from "../assets/images/Contentdetail/contentbg.png"
import Button from 'react-bootstrap/Button';
import star from "../assets/images/star.svg";


import Card from 'react-bootstrap/Card';



const ContentDetailChat = () => {
  return (
    <>
      <Header />
      {/* <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between">
                <div className="feedHdTags_wrap">
                  <span className='tag_select'>
                    <img src={map} className="me-3" alt="" />
                    Map View</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <div className="page-wrap">

        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="content_dtl_wrap">
                <div className="content_container">
                  <Row className=''>
                    <Col md="7" className='main_content_container'>
                      <Card className='content_img_wrapper'>
                        <Card.Img className="card_img_top" variant="top" src={contentbg} />
                        <Card.Body>
                          <Card.Text className='fs-1 fw-bold'>
                            Ramsdale creates history once again by stopping Drogba's goal
                          </Card.Text>
                          <Card.Text className='fs-6 fw-normal mb-4'>
                            Vivamus sit amet commodo risus. Ut dictum rutrum lacinia. Ut at nunc a mi facilisis ornare. Nullam arcu odio, volutpat at sem volutpat, imperdiet maximus nisi. Curabitur elit nulla, dictum a congue a, maximus vel elit. Donec dapibus est dapibus odio consectetur, a auctor erat tristique. Cras sed mattis ipsum.                             </Card.Text>
                        </Card.Body>

                        <Card.Footer className='p-0 border-top-0'>
                          <div className="card_button_wrapper">
                            <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                            <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                            <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col md="" className="content_info_wrapper">
                      <Card className='content_Details'>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                          <Card.Text className='mb-0'>
                            Content info
                          </Card.Text>
                          <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                        </Card.Header>
                        <Card className="card-body">

                        </Card>
                      </Card>
                      <div className="card_button_wrapper">
                        <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                        <Button variant="dark" className='favourite-btn btnType'><img src={star} alt="" /> Favorite</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <div className="feedContent_header">
                    <h1>Favourited content</h1>
                  </div>
                  <Row className=''>
                    <Col md={3}>
                      <Link to={"/Feeddetail"}>
                        <ContentFeedCard feedImg={imgs} feedType={contentCamera} userAvatar={imgs} authorName={"pseudonymous"}
                          type_img={sports} type_tag={"Sports"}
                          feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                          feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£800'}
                        />
                      </Link>
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={img2} feedType={contentVideo} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={shared} type_tag={"shared"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£800'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={image8} feedType={contentCamera} userAvatar={avatar} authorName={"pseudonymous"}
                        type_img={crime} type_tag={"crime"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£4000'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={image9} feedType={contentVideo} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={fashion} type_tag={"fashion"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£1000'}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="feedsContainer feedFavouriteContent mb-0">
                  <Row className=''>
                    <Col md={3}>
                      <ContentFeedCard feedImg={image10} feedType={contentVideo} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={celebrity} type_tag={"celebrity"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£800'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={image9} feedType={contentCamera} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={exclusive} type_tag={"Exclusive"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£800'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={img2} feedType={contentVideo} userAvatar={avatar} authorName={"pseudonymous"}
                        type_img={sports} type_tag={"sports"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£4000'}
                      />
                    </Col>
                    <Col md={3}>
                      <ContentFeedCard feedImg={imgs} feedType={contentCamera} userAvatar={imgs} authorName={"pseudonymous"}
                        type_img={shared} type_tag={"shared"}
                        feedHead={"Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"}
                        feedTime={"12:36 AM, 10 Oct 2022"} feedLocation={"Grenfell Tower, London"} contentPrice={'£1000'}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div >
      <DbFooter />
    </>

  )
}

export default ContentDetailChat