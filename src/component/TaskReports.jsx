import React, { memo, useEffect, useState } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { Card, CardContent, Typography } from "@mui/material";
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import ReactApexChart from "react-apexcharts";
import taskIcon from "../assets/images/taskIcon.svg";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import { Get, Post } from "../services/user.services";
import SortingDialog from "../popups/SortingDialog";
import Loader from "./Loader";
import Fundsinvested from "./Sortfilters/Dashboard/Fundsinvested";
import ChartsSort from "./Sortfilters/Dashboard/ChartsSort";
import { Link, useNavigate } from "react-router-dom";
import { formatAmountInMillion } from "./commonFunction";
import { initStateOfTaskGraph } from "./staticData";
import { DashboardCardInfo } from "./DashboardCardInfo";
import audioic from "../assets/images/audimg.svg";

// import { Get } from '../services/user.services';
const TaskReports = ({
  dashboardData,
  dashboardSort,
  setDashboardSort,
  handleClearSort,
  dashboardPayload,
  setDashboardPayload,
  handleApplySorting
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("task");
  const [contentType, setContentType] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
      color: "red",
    },
    tooltip: {
      theme: "custom-tooltip", // Use a custom tooltip theme
    },
    colors: ["#20639B", "#53C5AE", "#FFEC00"],
  });

  const [taskLocation, setTaskLocation] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#EC4E54", "#53C5AE", "#FFEC00", "#20639B"],
  });

  const [taskCategories, setTaskCategories] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },

    colors: ["#EC4E54", "#53C5AE", "#FFEC00", "#20639B", "#9A7B4F"],
  });

  const [taskSummary, setTaskSummary] = useState(initStateOfTaskGraph);

  const [contentsourced, setContentsourced] = useState(initStateOfTaskGraph);

  const [fundInvested, setFundInvested] = useState(initStateOfTaskGraph);

  const [contentTypeState, setContentTypeState] = useState("");
  const [openSortContentType, setOpenSortContentType] = useState(false);

  const [locationState, setLocationState] = useState("");
  const [openSortLocation, setOpenSortLocation] = useState(false);

  const [sortCategoryState, setCategoryState] = useState("");
  const [openSortCategory, setOpenSortCategory] = useState(false);

  const [taskState, setTaskState] = useState("");
  const [openSortTask, setOpenSortTask] = useState(false);

  const [loading, setLoading] = useState(false);
  const [timeValues, setTimeValues] = useState("");
  const [chartName, setChartName] = useState({
    category: "",
    type: "",
    location: "",
    task: "",
    taskSplit: ""
  });

  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  const TaskType = async () => {
    setLoading(true);
    try {
      let resp;
      if (contentTypeState) {
        resp = await Get(
          `mediaHouse/reportcontentType?${contentTypeState}=${contentTypeState}`
        );
      } else {
        resp = await Get(`mediaHouse/reportcontentType?`);
      }
      if (resp) {
        setContentType((prev) => ({
          ...prev,
          series: [
            resp.data.data.video,
            resp.data.data.interview,
            resp.data.data.image,
          ],
          labels: ["Videos", "Interview", "Photos"],
        }));
        setLoading(false);
        setChartName({ ...chartName, type: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, type: "" });
    }
  };

  const TaskCategories = async () => {
    setLoading(true);

    try {
      let resp;
      if (sortCategoryState) {
        resp = await Get(
          `mediaHouse/reportTaskcategory?${sortCategoryState}=${sortCategoryState}`
        );
      } else {
        resp = await Get(`mediaHouse/reportTaskcategory`);
      }
      if (resp) {
        setTaskCategories((prev) => ({
          ...prev,
          series: [
            resp.data.data.buisnesscount,
            resp.data.data.politics,
            resp.data.data.crimecount,
            resp.data.data.fashoncount,
            resp.data.data.others,
          ],
          labels: ["Business", "Political", "Crime", "Fashion", "Others"],
        }));
        setLoading(false);
        setChartName({ ...chartName, category: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, category: "" });
    }
  };

  const TaskLocation = async () => {
    setLoading(true);

    try {
      let resp;
      if (locationState) {
        resp = await Get(
          `mediaHouse/reportlocation?${locationState}=${locationState}`
        );
      } else {
        resp = await Get(`mediaHouse/reportlocation`);
      }
      if (resp) {
        setTaskLocation((prev) => ({
          ...prev,
          series: [
            resp.data.data.north,
            resp.data.data.south,
            resp.data.data.east,
            resp.data.data.west,
          ],
          labels: ["North", "South", "East", "West"],
        }));
        setLoading(false);
        setChartName({ ...chartName, location: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, location: "" });
    }
  };

  const TaskSummary = async () => {
    setLoading(true);

    try {
      let resp;
      if (taskState) {
        resp = await Get(
          `mediahouse/reportgraphoftask?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportgraphoftask`);
      }
      console.log(resp.data.data, "<--------resp.data.data task name is task");
      if (resp) {
        setTaskSummary((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
            xaxis: {
              ...prevTaskSummary.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              data: [
                resp.data.data.jan,
                resp.data.data.feb,
                resp.data.data.mar,
                resp.data.data.apr,
                resp.data.data.may,
                resp.data.data.june,
                resp.data.data.july,
                resp.data.data.aug,
                resp.data.data.sept,
                resp.data.data.oct,
                resp.data.data.nov,
                resp?.data?.data?.dec,
              ],
            },
          ],
        }));
        setContentsourced(initStateOfTaskGraph);
        setFundInvested(initStateOfTaskGraph);
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const ContentSourced = async () => {
    setLoading(true);

    try {
      let resp;
      if (taskState) {
        resp = await Get(
          `mediahouse/reportcontentsourced?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportcontentsourced`);
      }
      // console.log(resp.data.data, "<--------resp.data.data")
      if (resp) {
        setContentsourced((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
            xaxis: {
              ...prevTaskSummary.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            yaxis: {
              tickAmount: 10, // Number of ticks on the Y-axis
              min: 0, // Minimum value
              max: 100, // Maximum value
              labels: {
                formatter: function (val) {
                  return Math.round(val);
                },
              },
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              data: [
                resp.data.data.jan,
                resp.data.data.feb,
                resp.data.data.mar,
                resp.data.data.apr,
                resp.data.data.may,
                resp.data.data.june,
                resp.data.data.july,
                resp.data.data.aug,
                resp.data.data.sept,
                resp.data.data.oct,
                resp.data.data.nov,
                resp.data.data.dec,
              ],
            },
          ],
        }));
        setTaskSummary(initStateOfTaskGraph);
        setFundInvested(initStateOfTaskGraph);
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      let resp;
      if (taskState) {
        resp = await Get(
          `mediahouse/reportfundInvested?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportfundInvested`);
      }
      // console.log(resp.data.data, "<--------resp.data.data")
      if (resp) {
        const formatedData = Object.values(resp?.data?.data).map((ele) =>
          parseFloat(ele.toFixed(2))
        );
        setFundInvested((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
            xaxis: {
              ...prevTaskSummary.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            yaxis: {
              // title: {
              //   text: "Sales (in EUR)"
              // },
              labels: {
                formatter: (value) => `${formatAmountInMillion(value)}`,
              },
            },
            dataLabels: {
              enabled: true,
              formatter: (value) => `£${formatAmountInMillion(value)}`, // Formats the label with euro sign
              style: {
                fontSize: "12px",
                colors: ["#fff"], // Color of the data labels
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `£${formatAmountInMillion(value)}`,
              },
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              data: formatedData,
              //  [
              //   resp.data.data.jan,
              //   resp.data.data.feb,
              //   resp.data.data.mar,
              //   resp.data.data.apr,
              //   resp.data.data.may,
              //   resp.data.data.june,
              //   resp.data.data.july,
              //   resp.data.data.aug,
              //   resp.data.data.sept,
              //   resp.data.data.oct,
              //   resp.data.data.nov,
              //   resp.data.data.dec,
              // ],
            },
          ],
        }));
        setContentsourced(initStateOfTaskGraph);
        setTaskSummary(initStateOfTaskGraph);
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  useEffect(() => {
    TaskLocation();
    TaskType();
    TaskSummary();
    ContentSourced();
    FundInvested();
    TaskCategories();
  }, []);

  useEffect(() => {
    TaskCategories();
  }, [sortCategoryState]);

  useEffect(() => {
    TaskType();
  }, [contentTypeState]);

  useEffect(() => {
    TaskLocation();
  }, [locationState]);

  useEffect(() => {
    TaskSummary();
    ContentSourced();
    FundInvested();
  }, [taskState]);

  useEffect(() => {
    if (activeTab === "task") {
      TaskSummary();
    } else if (activeTab === "content") {
      ContentSourced();
    } else if (activeTab === "funds") {
      FundInvested();
    }
  }, [activeTab]);

  let broadcastedCount = dashboardData?.broadcastedTask?.totalCount ?? 0;
  let liveCount = dashboardData?.liveTask?.totalCount ?? 0;

  let deadlineMet = broadcastedCount > 0
    ? (((broadcastedCount - liveCount) * 100) / broadcastedCount).toFixed(2) + "%"
    : "0%";

  const [contentPurchasedFromTask, setContentPurchasedFromTask] = useState(null);

  const DashboardData = async (payload) => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/content-purchased-from-task");
      setContentPurchasedFromTask(resp?.data?.response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    DashboardData();
  }, []);

  const [openSplit, setOpenSplit] = useState(false);
  const [reportSplitState, setReportSplitState] = useState("");
  const [contentSplit, setContentSplit] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#53C5AE", "#20639B"],
  });

  const TaskSplit = async () => {
    setLoading(true);

    try {
      let resp;
      if (reportSplitState) {
        resp = await Get(
          `mediaHouse/task/reportSplit?period=${reportSplitState}`
        );
      } else {
        resp = await Get(`mediaHouse/task/reportSplit`);
      }
      if (resp) {
        setContentSplit((prev) => ({
          ...prev,
          series: [resp?.data?.data?.liveTaskCount, resp?.data?.data?.broadcastedTaskCount],
          labels: ["Live task", "Broadcasted task"],
        }));
        setLoading(false);
        setChartName({ ...chartName, taskSplit: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, taskSplit: "" });
    }
  };

  useEffect(() => {
    TaskSplit();
  }, [reportSplitState]);

  return (
    <>
      {loading && <Loader />}
      <div className="taskReports_container tsk cnt">
        <Row className="dashboardStat_cards crd_edit_wrap">
          {/* Broadcasted task today */}
          <Col md={2}>
            <DashboardCardInfo
              showSort={false}
              title="Broadcasted tasks today"
              path="/reports-tables-task/task_broadcasted_today"
              trend={dashboardData?.broadcastedTaskToday?.trend}
              total={dashboardData?.broadcastedTaskToday?.totalCount}
            />
          </Col>

          {/* Content purchased from tasks today */}
          <Col md={2}>
            <DashboardCardInfo
              showSort={false}
              title="Content purchased from tasks today"
              path="/reports-tables-task/content_sourced_task"
              trend={dashboardData?.contentPurchasedFromTaskToday?.trend}
              total={dashboardData?.contentPurchasedFromTaskToday?.totalCount}
            />
          </Col>

          {/* Total content purchased from tasks */}
          <Col md={2}>
            <DashboardCardInfo
              title="Total content purchased from tasks"
              path="/content-tables/content_sourced_from_task"
              trend={dashboardData?.contentPurchasedFromTask?.trend}
              total={dashboardData?.contentPurchasedFromTask?.totalCount}
              dashboardSort={dashboardSort}
              setDashboardSort={setDashboardSort}
              type="content_purchased_from_task"
              sort={dashboardPayload?.requestedFilter?.content_purchased_from_task}
              setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: value } })}
              setSortState={handleApplySorting}
              handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
              handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: "" } })}
            />
          </Col>

          {/* Funds invested today */}
          <Col md={2}>
            <DashboardCardInfo
              showSort={false}
              title="Funds invested today"
              path="/reports-tables-task/funds_invested_today"
              trend={dashboardData?.contentPurchasedFromTask?.trend}
              total={"£" + formatAmountInMillion(dashboardData?.totalFundInvestedToday?.totalAmount || 0)}
            />
          </Col>

          {/* Total funds today */}
          <Col md={2}>
            <DashboardCardInfo
              title="Total funds invested"
              path="/content-tables/content_sourced_from_task_funds_invested"
              trend={dashboardData?.totalFundInvested?.trend}
              total={"£" + formatAmountInMillion(dashboardData?.totalFundInvested?.totalAmount || 0)}
              dashboardSort={dashboardSort}
              setDashboardSort={setDashboardSort}
              type="total_fund_invested_in_task"
              sort={dashboardPayload?.requestedFilter?.total_fund_invested_in_task}
              setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: value } })}
              setSortState={handleApplySorting}
              handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
              handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: "" } })}
            />
          </Col>

          {/* Deadline met */}
          <Col md={2}>
            <DashboardCardInfo
              path="/reports-tables-task/deadline_met"
              title="Deadline met"
              total={deadlineMet}
              showSort={false}
            />
          </Col>

        </Row>

        {/* 3 Task Chart */}
        <div className="taskstat_chart chrts">
          <Row>
            <Col md={7} className="for-min60">
              <div className="contentChartsWrap">
                <Row>
                  <Col md={6}>
                    <div className="reportCard">
                      <div className="statChartHead align-items-center">
                        <Link
                          to={"/reports-tables-task/task_categories"}
                          className="text-dark"
                        >
                          <p className="cht_hdngs">Task categories</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-task/task_categories"}
                            className="text-dark"
                          >
                            <img src={taskIcon} className="tbl_icn" alt="" />
                            {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, category: "taskCategories"})}}>Sort <AiFillCaretDown /></button> */}
                          </Link>
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortCategory(true);
                                setChartName({
                                  ...chartName,
                                  category: "taskCategories",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortCategory && (
                              <ChartsSort
                                setActive={setCategoryState}
                                active={sortCategoryState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() => setOpenSortCategory(false)}
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link
                          to={"/reports-tables-task/task_categories"}
                          className="text-dark"
                        >
                          <ReactApexChart
                            options={taskCategories}
                            series={taskCategories.series}
                            type="pie"
                            width="365"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead align-items-center">
                        <Link
                          to={"/reports-tables-task/content_type"}
                          className="text-dark"
                        >
                          <p className="cht_hdngs">Content type</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-task/content_type"}
                            className="text-dark"
                          >
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, type: "contentType"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortContentType(true);
                                setChartName({ ...chartName, type: "contentType" });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortContentType && (
                              <ChartsSort
                                active={contentTypeState}
                                setActive={setContentTypeState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortContentType(false)
                                }
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link
                          to={"/reports-tables-task/content_type"}
                          className="text-dark"
                        >
                          <ReactApexChart
                            options={contentType && contentType}
                            series={contentType?.series}
                            type="pie"
                            width="365"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead align-items-center">
                        <Link
                          to={"/reports-tables-task/task_location"}
                          className="text-dark"
                        >
                          <p className="cht_hdngs">Task Split</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-task/task_location"}
                            className="text-dark"
                          >
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, location: "taskLocation"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSplit(true);
                                setChartName({
                                  ...chartName,
                                  taskSplit: "taskSplit",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSplit && (
                              <ChartsSort
                                active={reportSplitState}
                                setActive={setReportSplitState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() => setOpenSplit(false)}
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link
                          to={"/reports-tables-task/task_location"}
                          className="text-dark"
                        >
                          <ReactApexChart
                            options={contentSplit}
                            series={contentSplit.series}
                            type="pie"
                            width="365"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead align-items-center">
                        <Link
                          to={"/reports-tables-task/task_location"}
                          className="text-dark"
                        >
                          <p className="cht_hdngs">Task locations</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-task/task_location"}
                            className="text-dark"
                          >
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, location: "taskLocation"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortLocation(true);
                                setChartName({
                                  ...chartName,
                                  location: "taskLocation",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortLocation && (
                              <ChartsSort
                                active={locationState}
                                setActive={setLocationState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() => setOpenSortLocation(false)}
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link
                          to={"/reports-tables-task/task_location"}
                          className="text-dark"
                        >
                          <ReactApexChart
                            options={taskLocation}
                            series={taskLocation.series}
                            type="pie"
                            width="365"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={5} className="for-min39">
              <div className="typeContentsWrap bg-grey h-100">
                <Tabs
                  defaultActiveKey="purchased"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="purchased" title="Content purchased from tasks">
                    <div className="fltrs_prnt rport_cont_fltrprnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          // setOpenReportPurchased(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {/* {openreportPurchased && (
                        <ReportPurchasedSourced
                          shaEx={false}
                          closeSortComponent={() =>
                            setOpenReportPurchased(false)
                          }
                          setSortFilterPurchasedContent={
                            setSortFilterPurchasedContent
                          }
                          sortFilterPurchasedContent={
                            sortFilterPurchasedContent
                          }
                          url="/reports/content"
                        />
                      )} */}
                    </div>
                    <Row>
                      {contentPurchasedFromTask?.map((curr) => {
                        return (
                          <Col md={4} className="CntPurFeed">
                            <div
                              className="contentCard"
                              onClick={() =>
                                navigate(
                                  `/purchased-task-content-detail/${curr?._id}`
                                )
                              }
                            >
                              <img
                                className="reportcontentImg img-fluid"
                                src={(curr?.purchased_task_content?.type === "image" || curr?.purchased_task_content?.type === "video") ? curr?.purchased_task_content?.videothubnail : audioic}
                                alt=""
                              />
                              <div className="contInfo d-flex">
                                <h6 className="contentHeadng">
                                  {curr?.taskDetails?.heading}
                                </h6>
                              </div>
                              <div className="contInfo d-flex justify-content-between align-items-center">
                                <span
                                  style={{
                                    color: "#4c4c4c",
                                    background: "#f3f5f4",
                                  }}
                                  className="priceTag"
                                >
                                  {" "}
                                  £
                                  {formatAmountInMillion(curr?.amount)}
                                </span>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <div className="viewAllContn text-end">
                      <Link
                        className="view_link"
                        to={"/content-tables/content_sourced_from_task"}
                      >
                        View all <BsArrowRight className="text-pink ms-1" />
                      </Link>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col md={5}></Col>
          </Row>
        </div>

        {/* Sorting Dialogue */}
        <div className="taskSummaryBar mt-4">
          <div className="reportCard">
            {/* <div className='sortingStat'>
              <button className='sortTrigger' onClick={handleOpen}>Sort <AiFillCaretDown /></button>
              <SortingDialog
                rangeTimeValues={timeValuesHandler}
                open={open}
                onClose={handleClose}
                actions={<AiOutlineClose onClick={handleClose} />}
              />
            </div> */}
            {/* <div className="tbl_icn_th"> */}
            {/* </div> */}

            <div className="sortingStat">
              <button
                className="sortTrigger"
                onClick={() => {
                  setOpenSortTask(true);
                  setChartName({ ...chartName, task: "task" });
                }}
              >
                Sort <AiFillCaretDown />
              </button>
              {openSortTask && (
                <ChartsSort
                  active={taskState}
                  setActive={setTaskState}
                  rangeTimeValues={timeValuesHandler}
                  closeSortComponent={() => setOpenSortTask(false)}
                  setChartName={setChartName}
                />
              )}
            </div>

            <Tabs
              activeKey={activeTab}
              id="uncontrolled-tab-example"
              className="mb-3 grph_tbs"
              onSelect={(e) => setActiveTab(e)}
            >
              <Tab eventKey="task" title="Task summary">
                <Link
                  to={"/reports-tables-task/task_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/task_summary"}
                  className="text-dark"
                >
                  <ReactApexChart
                    options={taskSummary.options}
                    series={taskSummary.series}
                    type="bar"
                    height={365}
                  />
                </Link>
              </Tab>

              <Tab
                eventKey="content"
                title="Content purchased from tasks summary"
              >
                <Link
                  to={"/reports-tables-task/content_sourced_from_task_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/content_sourced_from_task_summary"}
                  className="text-dark"
                >
                  <ReactApexChart
                    options={contentsourced.options}
                    series={contentsourced.series}
                    type="bar"
                    height={365}
                  />
                </Link>
              </Tab>

              <Tab eventKey="funds" title="Funds invested summary">
                <Link
                  to={"/reports-tables-task/fund_invested_summary"}
                  className="text-dark"
                >
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link
                  to={"/reports-tables-task/fund_invested_summary"}
                  className="text-dark"
                >
                  <ReactApexChart
                    options={fundInvested.options}
                    series={fundInvested.series}
                    type="bar"
                    height={365}
                  />
                </Link>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TaskReports);
