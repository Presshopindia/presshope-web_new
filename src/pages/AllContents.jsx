import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import exclusive from "../assets/images/exclusive.png";
import img2 from "../assets/images/img2.webp";
import imgs from "../assets/images/imgn6.jpg";
import shared from "../assets/images/share.png";
import taskCategory from "../assets/images/taskCategory.svg";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import ContentFeedCard from "../component/card/ContentFeedCard";
import TaskContentCard from "../component/card/TaskContentCard";

import { AiFillCaretDown } from "react-icons/ai";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";

const AllContents = () => {
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  
  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  return (
    <>
      <Header />
      <div className="feedTags_search">
        <Container fluid>
          <Row>
            <Col sm={12}>
              <div className="feedPreviews d-flex justify-content-between">
                <Link className="backtoLink">
                  <BsArrowLeft className="text-pink" onClick={() => window.history.back()} /> Back
                </Link>
                <div className="sorting_wrap d-flex">
                  <div className="feedSorting me-4">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Filter</p>
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenFilterComponent(true);
                        }}
                      >
                        Filter <AiFillCaretDown />
                      </button>
                      {openFilterComponent && (
                        <TopFilterComn
                          closeFilterComponent={handleCloseFilterComponent}
                          // feedMultiFilter={handleMultiFilter}
                        />
                      )}
                    </div>
                  </div>
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <p className="lbl_fltr">Sort</p>
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenSortComponent(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openSortComponent && (
                        <Fundsinvested
                          rangeTimeValues={handleSortValues}
                          closeSortComponent={handleCloseSortComponent}
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
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Uploaded content</h1>
                  </div>
                  <Row className="">
                    <Col lg={3} md={4} sm={6}>
                      <Link to={"/Feeddetail"}>
                        <TaskContentCard
                          feedImg={imgs}
                          feedType={contentCamera}
                          feedTag={"Most Viewed"}
                          userAvatar={imgs}
                          authorName={"pseudonymous"}
                          type_img={shared}
                          type_tag={"Shared"}
                          feedHead={
                            "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                          }
                          feedTime={"12:36 AM, 10 Oct 2022"}
                          feedLocation={"Grenfell Tower, London"}
                          contentPrice={"£800"}
                        />
                      </Link>
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={img2}
                        feedType={contentVideo}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£800"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={img2}
                        feedType={contentCamera}
                        feedTag={"8 People are viewing this content, Hurry Up!"}
                        userAvatar={avatar}
                        authorName={"pseudonymous"}
                        type_img={shared}
                        type_tag={"POLITICS"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£4000"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={imgs}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={exclusive}
                        type_tag={"CRIME"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£1000"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={img2}
                        feedType={contentVideo}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={exclusive}
                        type_tag={"SPORTS11111"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£800"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={img2}
                        feedType={contentCamera}
                        feedTag={"8 People are viewing this content, Hurry Up!"}
                        userAvatar={avatar}
                        authorName={"pseudonymous"}
                        type_img={shared}
                        type_tag={"CRIME"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£4000"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <TaskContentCard
                        feedImg={imgs}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={exclusive}
                        type_tag={"sports"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£1000"}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1 className="rw_hdng">Shared content</h1>
                    <Link>
                      View all <BsArrowRight className="text-pink" />
                    </Link>
                  </div>
                  <Row className="">
                    <Col lg={3} md={4} sm={6}>
                      <ContentFeedCard
                        feedImg={imgs}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={taskCategory}
                        type_tag={"SPORTS"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£800"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <ContentFeedCard
                        feedImg={img2}
                        feedType={contentCamera}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={taskCategory}
                        type_tag={"CELEBRITY"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£800"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <ContentFeedCard
                        feedImg={img2}
                        feedType={contentVideo}
                        feedTag={"Hot"}
                        userAvatar={avatar}
                        authorName={"pseudonymous"}
                        type_img={taskCategory}
                        type_tag={"CRIME"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£4000"}
                      />
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                      <ContentFeedCard
                        feedImg={imgs}
                        feedType={contentCamera}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"pseudonymous"}
                        type_img={taskCategory}
                        type_tag={"FASHION"}
                        feedHead={
                          "Sed efficitur, libero sit amet mollis dictum, elit orci dapibus mi"
                        }
                        feedTime={"12:36 AM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£1000"}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default AllContents;
