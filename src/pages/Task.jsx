import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import interviewic from "../assets/images/interview.svg";
import Header from "../component/Header";
import BroadcastedTrackings from "./BroadcastedList";

import { Card, CardContent, Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import DbFooter from "../component/DbFooter";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import AddBroadcastTask from "./AddBroadcastTask";
import favouritedic from "../assets/images/favouritestar.svg";
import audioic from "../assets/images/audimg.svg";
import videoic from "../assets/images/video.svg";
import favic from "../assets/images/star.svg";
import moment from "moment";
import { AiFillCaretDown } from "react-icons/ai";
import cameraic from "../assets/images/camera.svg";
import Loader from "../component/Loader";
import { PaginationComp } from "../component/Pagination";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import ContentFeedCard from "../component/card/ContentFeedCard";
import { formatAmountInMillion, getDeepModifiedTaskContent, getPurchasedTaskContent, getTaskContent } from "../component/commonFunction";
import { Get, Post } from "../services/user.services";
import { DashboardCardInfo } from "../component/DashboardCardInfo";

const BroadcastedTask = () => {
  const [searchParams] = useSearchParams();
  const taskId = searchParams?.get('task_ids');

  const [viewTask, setViewTask] = useState({
    open: false,
    taskDetails: {},
    taskId: taskId || ""
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [allFilterData, setAllFilterData] = useState({
    filterdata: [],
    allcategoryData: [],
    category: [],
    sortData: "",
    price_range1: "",
    price_range2: "",
    location_search: "",
    toggle_filter: false,
    toggle_sort: false,
  });

  const handleShow = () => {
    setShow(!show);
  };

  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  // New Uploaded Content -
  const [newUploadedContent, setNewUploadedContent] = useState(null);

  const TaskDetails = async (id = "") => {
    setLoading(true);
    try {
      let resp = await Get(`mediaHouse/getuploadedContentbyHoppers?task_id=${id}&limit=${limit}&offet=${+(page - 1) * limit}`)
      setNewUploadedContent(resp?.data);
      setLoading(false);
      setTotalPage(Math.ceil(resp.data?.totalUploadedContent / limit));
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    TaskDetails();
  }, [page]);

  const handleFavourite = (i) => {
    setNewUploadedContent((prev) => {
      const allContent = { ...prev };
      allContent.uploadedContent[i].content[0]["favourited"] = allContent.uploadedContent[i].content[0]["favourited"] === "true" ? "false" : "true";
      return allContent;
    });
  };

  // Dashboard Data -
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardSort, setDashboardSort] = useState({ type: "" });
  const [dashboardPayload, setDashboardPayload] = useState({
    requestedItems: ["live_task", "total_fund_invested_in_task", "content_purchased_from_task", "broadcasted_task"],
    requestedFilter: {
      live_task: "",
      total_fund_invested_in_task: "",
      content_purchased_from_task: "",
      broadcasted_task: ""
    }
  })

  const DashboardData = async (data) => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/dashboard-data", dashboardPayload);
      setDashboardData(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    DashboardData(dashboardPayload);
  }, []);

  const handleApplySorting = async () => {
    DashboardData(dashboardPayload);
    setDashboardSort({ ...dashboardSort, type: "" });
  }

  const handleClearSort = async (payload) => {
    DashboardData(payload)
    setDashboardPayload(payload);
    setDashboardSort({ ...dashboardSort, type: "" });
  }

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap task_pg renew-task">
        <Container fluid>
          <Row className="dashboardStat_cards crd_edit_wrap">
            {/* Live Tasks */}
            <Col md={3} className="p-0 task-card">
              <DashboardCardInfo
                path="/task-tables/liveTasks"
                title="Live tasks"
                type="live_task"
                total={dashboardData?.task?.liveTask?.totalCount}
                data={getDeepModifiedTaskContent(dashboardData?.task?.liveTask?.data)}
                dashboardSort={dashboardSort}
                setDashboardSort={setDashboardSort}
                sort={dashboardPayload?.requestedFilter?.live_task}
                setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, live_task: value } })}
                setSortState={handleApplySorting}
                handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, live_task: "" } })}
                task={true}
              />
            </Col>
            {/* Broadcast Tasks */}
            <Col md={3} className="p-0 task-card">
              <DashboardCardInfo
                path="/dashboard-tables/broadcasted_task"
                title="Broadcasted tasks"
                type="broadcasted_task"
                total={dashboardData?.task?.broadcastedTask?.totalCount}
                data={getDeepModifiedTaskContent(dashboardData?.task?.broadcastedTask?.data)}
                dashboardSort={dashboardSort}
                setDashboardSort={setDashboardSort}
                sort={dashboardPayload?.requestedFilter?.broadcasted_task}
                setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, broadcasted_task: value } })}
                setSortState={handleApplySorting}
                handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, broadcasted_task: "" } })}
                task={true}
              />
            </Col>

            {/* Content Purchased From Task */}
            <Col md={3} className="p-0 task-card">
              <DashboardCardInfo
                path="/content-tables/content_sourced_from_task"
                title="Content purchased from tasks"
                type="content_purchased_from_task"
                total={dashboardData?.task?.contentPurchasedFromTask?.totalCount}
                data={getPurchasedTaskContent(dashboardData?.task?.contentPurchasedFromTask?.data)}
                dashboardSort={dashboardSort}
                setDashboardSort={setDashboardSort}
                sort={dashboardPayload?.requestedFilter?.content_purchased_from_task}
                setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: value } })}
                setSortState={handleApplySorting}
                handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: "" } })}
                task={true}
              />
            </Col>

            {/* Total fund invested */}
            <Col md={3} className="p-0 task-card">
              <DashboardCardInfo
                path="/content-tables/content_sourced_from_task_funds_invested"
                title="Total funds invested (inc VAT)"
                type="total_fund_invested_in_task"
                total={"£" + formatAmountInMillion(dashboardData?.task?.totalFundInvested?.totalAmount || 0)}
                data={getPurchasedTaskContent(dashboardData?.task?.totalFundInvested?.data)}
                dashboardSort={dashboardSort}
                setDashboardSort={setDashboardSort}
                sort={dashboardPayload?.requestedFilter?.total_fund_invested_in_task}
                setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: value } })}
                setSortState={handleApplySorting}
                handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: "" } })}
                task={true}
              />
            </Col>

            <Col md={2} className="mb-4 p-0 add-task-card">
              <Card className="dash-top-cards mb-0 add-br rt_crd d-flex align-items-center justify-content-center mr-0">
                <CardContent className="dash-c-body rev">
                  <div className="broadcast">
                    <Typography className="mb-3 text-center d-flex justify-content-center">
                      <span className="clickable" onClick={handleShow}>
                        <svg
                          width="31"
                          height="30"
                          viewBox="0 0 31 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.7568 15.9375C10.2443 15.9375 9.81934 15.5125 9.81934 15C9.81934 14.4875 10.2443 14.0625 10.7568 14.0625H20.7568C21.2693 14.0625 21.6943 14.4875 21.6943 15C21.6943 15.5125 21.2693 15.9375 20.7568 15.9375H10.7568Z"
                            fill="#292D32"
                          />
                          <path
                            d="M14.8193 20V10C14.8193 9.4875 15.2443 9.0625 15.7568 9.0625C16.2693 9.0625 16.6943 9.4875 16.6943 10V20C16.6943 20.5125 16.2693 20.9375 15.7568 20.9375C15.2443 20.9375 14.8193 20.5125 14.8193 20Z"
                            fill="#292D32"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.0068 28.4375C5.21934 28.4375 2.31934 25.5375 2.31934 18.75V11.25C2.31934 4.4625 5.21934 1.5625 12.0068 1.5625H19.5068C26.2943 1.5625 29.1943 4.4625 29.1943 11.25V18.75C29.1943 25.5375 26.2943 28.4375 19.5068 28.4375H12.0068ZM4.19434 11.25V18.75C4.19434 24.5125 6.24434 26.5625 12.0068 26.5625H19.5068C25.2693 26.5625 27.3193 24.5125 27.3193 18.75V11.25C27.3193 5.4875 25.2693 3.4375 19.5068 3.4375H12.0068C6.24434 3.4375 4.19434 5.4875 4.19434 11.25Z"
                            fill="#292D32"
                          />
                        </svg>
                      </span>
                    </Typography>
                    <Typography className="mb-0 text-center txt_bold text-white font-14">
                      Broadcast task
                    </Typography>
                  </div>
                </CardContent>
                {show && (
                  <AddBroadcastTask isOpen={show} show={handleShow} />
                )}
              </Card>
            </Col>
          </Row>

          <Row className="tracker-task">
            <Col md={4} className="mb-0">
              <BroadcastedTrackings show={show} setViewTask={setViewTask} viewTask={viewTask} TaskDetails={TaskDetails} />
            </Col>
            <Col md={8} className="pe-0">
              <div className="top-bar">
                <Row>
                  <Col sm={12}>
                    <div className="feedPreviews d-flex justify-content-between broadcast-heading align-items-center">
                      <h2 className="mb-0">Uploaded content</h2>
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
                                closeFilterComponent={
                                  handleCloseFilterComponent
                                }
                                setAllFilterData={setAllFilterData}
                                allFilterData={allFilterData}
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
                                closeSortComponent={handleCloseSortComponent}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row className="custm-crds">
                {newUploadedContent?.uploadedContent?.map((item, index) => {
                  const filteredContent = (mediaType) => {
                    const content = item?.content?.filter((el) => el.type === mediaType);
                    return content;
                  };

                  return (
                    <Col lg={4} sm={6} key={item?._id}>
                      <ContentFeedCard
                        feedImg={
                          item?.content[0]?.type === "image"
                            ? item?.content[0]?.videothubnail ||
                            process.env.REACT_APP_UPLOADED_CONTENT +
                            item?.content[0]?.imageAndVideo
                            : item?.content[0]?.type === "video"
                              ? item?.content[0]?.videothubnail ||
                              process.env.REACT_APP_UPLOADED_CONTENT +
                              item?.content[0]?.videothubnail
                              : item?.content[0]?.type === "audio"
                                ? audioic
                                : null
                        }
                        type={"task"}
                        user_avatar={
                          item?.content[0]?.avatar_details?.avatar
                            ? process.env.REACT_APP_AVATAR_IMAGE +
                            item?.content[0]?.avatar_details?.avatar
                            : item?.content[0]?.avatar_detals?.[0]?.avatar
                              ? process.env.REACT_APP_AVATAR_IMAGE +
                              item?.content[0]?.avatar_detals?.avatar
                              : ""
                        }
                        author_Name={item?.content[0]?.uploaded_by?.user_name}
                        lnkto={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                        viewTransaction="View details"
                        viewDetail={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                        // fvticns={
                        //   item?.content[0]?.favourited === "true"
                        //     ? favouritedic
                        //     : favic
                        // }
                        type_tag={item?.content[0]?.category_details?.name}
                        allContent={item?.content[0]?.task_id?.content}
                        type_img={item?.content[0]?.category_details?.icon}
                        feedHead={item?.content[0]?.task_id?.heading}
                        feedTime={moment(item?.content[0]?.updatedAt).format(
                          " hh:mm A, DD MMM YYYY"
                        )}
                        feedLocation={item?.content[0]?.task_id?.location}
                        // favourite={() => handleFavourite(index, "task")}
                        // bool_fav={
                        //   item?.content[0]?.favourited === "true" ? "false" : "true"
                        // }
                        content_id={item?._id}
                        task_content_id={item?._id || item?.task_id?._id}
                        // taskContentId={item?.content?.map((el) => el._id)}
                        is_sale_status={true}
                        feedTypeImg1={filteredContent("image")?.length > 0 ? cameraic : null}
                        feedTypeImg2={filteredContent("video")?.length > 0 ? videoic : null}
                        feedTypeImg3={filteredContent("audio")?.length > 0 ? interviewic : null}
                        postcount={filteredContent("image")?.length}
                        postcount2={filteredContent("video")?.length}
                        postcount3={filteredContent("audio")?.length}
                      />
                    </Col>
                  );
                })}
                {totalPage ? (
                  <PaginationComp
                    totalPage={totalPage}
                    path="task"
                    type="fav"
                    setPage={setPage}
                    page={page}
                  />
                ) : (
                  " "
                )}
              </Row>
            </Col>
          </Row>

          <div className="mt-4">
            <TopSearchesTipsCard dashboard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default BroadcastedTask;
