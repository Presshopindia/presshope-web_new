import { Card, CardContent, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import exclusive from "../assets/images/exclusive.png";
import share from "../assets/images/share.png";
import contentCamera from "../assets/images/contentCamera.svg";
import taskIcon from "../assets/images/taskIcon.svg";
import ContentSortingDialog from "../popups/ContentSortingDialog";
import { Get, Post } from "../services/user.services";
import Loader from "./Loader";
import ChartsSort from "./Sortfilters/Dashboard/ChartsSort";
import ReportPurchasedSourced from "./Sortfilters/Dashboard/ReportPurchasedSourced";
import { formatAmountInMillion } from "./commonFunction";

import {
  initStateOfContentSourcedAndFundInvested,
  initStateOfContentSummary,
  initStateOfSortFilterPurchasedContent,
} from "./staticData";
import { useDarkMode } from "../context/DarkModeContext";
import { DashboardCardInfo } from "./DashboardCardInfo";
const ContentReports = ({
  dashboardData,
  dashboardSort,
  setDashboardSort,
  handleClearSort,
  dashboardPayload,
  setDashboardPayload,
  handleApplySorting
}) => {
  const [activeTab, setActiveTab] = useState("task");
  const [ContentData, setContentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [purchasedContent, setPurcahsedContent] = useState([]);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeValues, setTimeValues] = useState("");
  const [avgAmount, setAvgAmount] = useState(0);
  const [chartName, setChartName] = useState({
    category: "",
    type: "",
    split: "",
    location: "",
    purchased: "",
    sourced: "",
    task: "",
  });
  const { cartCount, setCartCount, profileData } = useDarkMode();

  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  const [contentTimeValues, setContentTimeValues] = useState("");
  const contentTimeValuesHandler = (values) => {
    setContentTimeValues(values);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // configure dialog box
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  // open components -
  const [openSortSplit, setOpenSortSplit] = useState(false);
  const [contentSpilitState, setContentSpilitState] = useState("");

  const [openSortType, setOpenSortType] = useState(false);
  const [typeState, setTypeState] = useState("");

  const [openSortCategory, setOpenSortCategory] = useState(false);
  const [categoryState, setCategoryState] = useState("");

  const [openSortLocation, setOpenSortLocation] = useState(false);
  const [locationState, setLocationState] = useState("");

  const [openSortTask, setOpenSortTask] = useState(false);
  const [taskState, setTaskState] = useState("");

  const [openreportPurchased, setOpenReportPurchased] = useState(false);
  const [reportPurchasedState, setReportPurchasedState] = useState("");

  const [sortFilterPurchasedContent, setSortFilterPurchasedContent] = useState(
    initStateOfSortFilterPurchasedContent
  );

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const parsedSortField = query.get("sortField") || "";
    const parsedSortValue = query.get("sortValue") || "";
    const parsedTimeRangeStart = query.get("timeRangeStart") || "";
    const parsedTimeRangeEnd = query.get("timeRangeEnd") || "";
    const parsedFavContent = query.get("favContent") === "true";
    const parsedType = query.getAll("type") || [];
    const parsedCategory = query.getAll("category") || [];
    const parsedChange = query.get("change") || false;

    setSortFilterPurchasedContent({
      sortField: parsedSortField,
      sortValue: parsedSortValue,
      timeRange: {
        start: parsedTimeRangeStart,
        end: parsedTimeRangeEnd,
      },
      favContent: parsedFavContent,
      type: parsedType,
      category: parsedCategory,
      change: parsedChange,
    });
  }, []);

  const [contentLocation, setContentLocation] = useState({
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

  const [contentType, setContentType] = useState({
    series: [],
    labels: [],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#20639B", "#53C5AE", "#FFEC00"],
  });

  const [contentSummary, setContentSummary] = useState(
    initStateOfContentSummary
  );

  const chartOptions = {
    labels: ["Business", "Fashion"],
    series: [90, 40],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#FFEC00", "#20639B"],
  };

  const chartOptionsSplit = {
    labels: ["Business", "Fashion"],
    series: [90, 40],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
    colors: ["#FFEC00", "#20639B"],
  };

  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
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
      colors: ["#EC4E54"],
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30],
      },
    ],
  });

  const [contentsourced, setContentsourced] = useState(
    initStateOfContentSourcedAndFundInvested
  );

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

  const [fundInvested, setFundInvested] = useState(
    initStateOfContentSourcedAndFundInvested
  );

  const CountReport = async () => {
    await Get(`mediaHouse/report/count`).then((res) => {
      setContentData(res.data);
    });
  };

  const PurchasedContent = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/purchasedContents?limit=9`);
      setPurcahsedContent(resp.data.data);
      setOpenReportPurchased(false);
      if (resp) {
        setLoading(false);
        setChartName({ ...chartName, purchased: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, purchased: "" });
    }
  };

  const ContentLocation = async () => {
    setLoading(true);

    try {
      let resp;
      if (locationState) {
        resp = await Get(
          `mediaHouse/report/content/location?${locationState}=${locationState}`
        );
      } else {
        resp = await Get(`mediaHouse/report/content/location`);
      }
      if (resp) {
        setContentLocation((prev) => ({
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
      setLoading(false);
      setChartName({ ...chartName, location: "" });
    }
  };

  const ContentCategories = async () => {
    setLoading(true);

    try {
      let resp;
      if (categoryState) {
        resp = await Get(
          `mediaHouse/report/content/category?${categoryState}=${categoryState}`
        );
      } else {
        resp = await Get(`mediaHouse/report/content/category`);
      }
      if (resp) {
        setTaskCategories((prev) => ({
          ...prev,
          series: [
            resp.data.data.buisness_count,
            resp.data.data.politics_count,
            resp.data.data.crime_count,
            resp.data.data.fashion_count,
            resp?.data?.data?.other ?? 0,
          ],
          labels: ["Business", "Political", "Crime", "Fashion", "Others"],
        }));
        setLoading(false);
        setChartName({ ...chartName, category: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, category: "" });
    }
  };

  const ContentSplit = async () => {
    setLoading(true);

    try {
      let resp;
      if (contentSpilitState) {
        resp = await Get(
          `mediaHouse/content/reportSplit?${contentSpilitState}=${contentSpilitState}`
        );
      } else {
        resp = await Get(`mediaHouse/content/reportSplit`);
      }
      if (resp) {
        setContentSplit((prev) => ({
          ...prev,
          series: [resp?.data?.data?.shared, resp?.data?.data?.exclusive],
          labels: ["Shared", "Exclusive"],
        }));
        setLoading(false);
        setChartName({ ...chartName, split: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, split: "" });
    }
  };

  const ContentType = async () => {
    setLoading(true);

    try {
      let resp;
      if (typeState) {
        resp = await Get(
          `mediaHouse/report/content/type?${typeState}=${typeState}`
        );
      } else {
        resp = await Get(`mediaHouse/report/content/type`);
      }
      if (resp) {
        setContentType((prev) => ({
          ...prev,
          series: [
            resp.data.data.video,
            resp.data.data.interview,
            resp.data.data.image,
          ],
          labels: ["Videos", "Audio", "Photos"],
        }));
        setLoading(false);
        setChartName({ ...chartName, type: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, type: "" });
    }
  };

  const ContentSummary = async () => {
    setLoading(true);

    try {
      let resp;
      if (taskState) {
        resp = await Get(
          `mediahouse/reportgraphofContentforPaid?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportgraphofContentforPaid`);
      }
      if (resp) {
        setContentSummary((prevTaskSummary) => ({
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
                resp.data.data.dec,
              ],
            },
          ],
        }));
        setFundInvested(initStateOfContentSourcedAndFundInvested);
        setContentsourced(initStateOfContentSourcedAndFundInvested);
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
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
          `mediahouse/reportgraphofContent?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportgraphofContent`);
      }
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
        setFundInvested(initStateOfContentSourcedAndFundInvested);
        setContentSummary(initStateOfContentSummary);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      let resp;
      if (taskState) {
        resp = await Get(
          `mediahouse/reportfundInvestedforContent?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportfundInvestedforContent`);
      }
      if (resp) {
        const formattedData = Object.values(resp?.data?.data).map((value) =>
          parseFloat(value.toFixed(2))
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
              data: formattedData,
              // data: [
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
        setContentsourced(initStateOfContentSourcedAndFundInvested);
        setContentSummary(initStateOfContentSummary);
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const UploadedContent = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/getuploadedContentbyHoppers?limit=6&${sortFilterPurchasedContent?.sortField}=${sortFilterPurchasedContent?.sortValue}&favContent=${sortFilterPurchasedContent?.favContent}&category=${sortFilterPurchasedContent?.category}`
      );
      setUploadedContent(resp.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, purchased: "" });
    }
  };

  const handleAverageAmount = async () => {
    try {
      const res = await Post(`mediaHouse/contentaverageprice`, {});
      const data = res?.data?.data;
      setAvgAmount(data);
    } catch (error) { }
  };

  useEffect(() => {
    CountReport();
    PurchasedContent();
    ContentLocation();
    ContentType();
    ContentSummary();
    ContentCategories();
    UploadedContent();
    ContentSplit();
  }, []);

  useEffect(() => {
    PurchasedContent();
    UploadedContent();
  }, [query.get("change")]);

  useEffect(() => {
    ContentCategories();
  }, [categoryState]);

  useEffect(() => {
    ContentSplit();
  }, [contentSpilitState]);

  useEffect(() => {
    ContentType();
  }, [typeState]);

  useEffect(() => {
    ContentLocation();
  }, [locationState]);

  useEffect(() => {
    ContentSummary();
    ContentSourced();
    FundInvested();
  }, [taskState]);

  // Active tab-
  useEffect(() => {
    if (activeTab == "task") {
      ContentSummary();
    } else if (activeTab == "content") {
      ContentSourced();
    } else if (activeTab == "funds") {
      FundInvested();
    }
  }, [activeTab]);

  useEffect(() => {
    handleAverageAmount();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="taskReports_container tsk cnt">
        <Row className="dashboardStat_cards crd_edit_wrap">
          {/* Content purchased online today */}
          <Col>
            <DashboardCardInfo
              showSort={false}
              type="content_purchased_online_today"
              title="Content purchased online today"
              path="/content-tables/content_purchased_online_today"
              trend={dashboardData?.purchasedOnlineToday?.trend}
              total={dashboardData?.purchasedOnlineToday?.totalCount}
            />
          </Col>

          {/* Total content purchased */}
          <Col>
            <DashboardCardInfo
              type="content_purchased_online"
              title="Total content purchased"
              path="/dashboard-tables/content_purchased_online"
              trend={dashboardData?.purchasedOnline?.trend}
              total={dashboardData?.purchasedOnline?.totalCount}
              dashboardSort={dashboardSort}
              setDashboardSort={setDashboardSort}
              sort={dashboardPayload?.requestedFilter?.content_purchased_online}
              setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_online: value } })}
              setSortState={handleApplySorting}
              handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
              handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_online: "" } })}
            />
          </Col>

          {/* Content average price */}
          <Col>
            <DashboardCardInfo
              type="content_average_price"
              title="Content average price"
              path="/dashboard-tables/content_average_price"
              trend={dashboardData?.contentAveragePrice?.trend}
              total={"£" + formatAmountInMillion(dashboardData?.contentAveragePrice?.contentAveragePrice || 0)}
              dashboardSort={dashboardSort}
              setDashboardSort={setDashboardSort}
              sort={dashboardPayload?.requestedFilter?.content_average_price}
              setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_average_price: value } })}
              setSortState={handleApplySorting}
              handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
              handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_average_price: "" } })}
            />
          </Col>

          {/* Funds invested today */}
          <Col>
            <DashboardCardInfo
              showSort={false}
              title="Funds invested today"
              type="total_fund_invested_today"
              path="/content-tables/fund_invested_today"
              trend={dashboardData?.totalFundInvestedToday?.trend}
              total={"£" + formatAmountInMillion(dashboardData?.totalFundInvestedToday?.totalAmount + dashboardData?.totalFundInvestedToday?.totalVat || 0)}
            />
          </Col>

          {/* Total fund invested */}
          <Col>
            <DashboardCardInfo
              title="Total funds invested"
              type="total_fund_invested"
              path="/dashboard-tables/fund_invested"
              trend={dashboardData?.totalFundInvested?.trend}
              total={"£" + formatAmountInMillion(dashboardData?.totalFundInvested?.totalAmount + dashboardData?.totalFundInvested?.totalVat || 0)}
              dashboardSort={dashboardSort}
              setDashboardSort={setDashboardSort}
              sort={dashboardPayload?.requestedFilter?.total_fund_invested}
              setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.Total, total_fund_invested: value } })}
              setSortState={handleApplySorting}
              handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
              handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.Total, total_fund_invested: "" } })}
            />
          </Col>

        </Row>
        <div className="taskstat_chart chrts">
          <Row>
            <Col md={7} className="for-min60">
              <div className="contentChartsWrap">
                <Row>
                  <Col md={6}>
                    <div className="reportCard">
                      <div className="statChartHead align-items-center">
                        <Link to={"/reports-tables-content/content_categories"}>
                          <p className="cht_hdngs">Content categories</p>
                        </Link>
                        <div className="statSort">
                          <Link
                            to={"/reports-tables-content/content_categories"}
                          >
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, category: "contentCategories"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortCategory(true);
                                setChartName({
                                  ...chartName,
                                  category: "contentCategories",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortCategory && (
                              <ChartsSort
                                active={categoryState}
                                setActive={setCategoryState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortCategory(false)
                                }
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_categories"}>
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
                        <Link to={"/reports-tables-content/content_type"}>
                          <p className="cht_hdngs">Content type</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_type"}>
                            <img src={taskIcon} className="tbl_icn" />
                            {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, type: "contentType"})}}>Sort <AiFillCaretDown /></button> */}
                          </Link>
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortType(true);
                                setChartName({
                                  ...chartName,
                                  type: "contentType",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortType && (
                              <ChartsSort
                                active={typeState}
                                setActive={setTypeState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortType(false)
                                }
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_type"}>
                          <ReactApexChart
                            options={contentType}
                            series={contentType.series}
                            type="pie"
                            width="365"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="reportCard mb-0">
                      <div className="statChartHead">
                        <Link to={"/reports-tables-content/content_split"}>
                          <p className="cht_hdngs">Content split</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_split"}>
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, split: "contentSplit"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortSplit(true);
                                setChartName({
                                  ...chartName,
                                  split: "contentSplit",
                                });
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openSortSplit && (
                              <ChartsSort
                                active={contentSpilitState}
                                setActive={setContentSpilitState}
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortSplit(false)
                                }
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_split"}>
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
                      <div className="statChartHead">
                        <Link to={"/reports-tables-content/content_location"}>
                          <p className="cht_hdngs">Content locations</p>
                        </Link>
                        <div className="statSort">
                          <Link to={"/reports-tables-content/content_location"}>
                            <img src={taskIcon} className="tbl_icn" />
                          </Link>
                          {/* <button className='sortTrigger' onClick={() => {handleOpen(); setChartName({...chartName, location: "contentLocation"})}}>Sort <AiFillCaretDown /></button> */}
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortLocation(true);
                                setChartName({
                                  ...chartName,
                                  location: "contentLocation",
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
                                closeSortComponent={() =>
                                  setOpenSortLocation(false)
                                }
                                setChartName={setChartName}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="statChartBody">
                        <Link to={"/reports-tables-content/content_location"}>
                          <ReactApexChart
                            options={contentLocation}
                            series={contentLocation.series}
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
                  <Tab eventKey="purchased" title="Content purchased from feed">
                    {/* <button className='sortTrigger' onClick={() => { handleClickOpen(); setChartName({ ...chartName, purchased: "purchased" }) }}>Sort <AiFillCaretDown /></button> */}
                    <div className="fltrs_prnt rport_cont_fltrprnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenReportPurchased(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openreportPurchased && (
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
                      )}
                    </div>
                    <Row>
                      {purchasedContent?.map((curr) => {
                        const userProfile = profileData;
                        let mediaHouseId = null;
                        if (
                          userProfile?.role &&
                          userProfile?.role == "MediaHouse"
                        ) {
                          mediaHouseId = userProfile?._id;
                        } else if (
                          userProfile?.role &&
                          userProfile?.role != "MediaHouse"
                        ) {
                          mediaHouseId = userProfile?.media_house_id;
                        }

                        return (
                          <Col md={4} className="CntPurFeed" key={curr?._id}>
                            <div
                              className="contentCard"
                              onClick={() =>
                                navigate(
                                  `/purchased-content-detail/${curr?._id}`
                                )
                              }
                            >
                              <img
                                className="reportcontentImg img-fluid"
                                src={
                                  curr?.contentDetails?.content[0]?.media_type === "video"
                                    ? process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.contentDetails?.content[0]?.thumbnail
                                    : curr?.contentDetails?.content[0]?.media_type === "audio"
                                      ? audioic
                                      : process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.contentDetails?.content[0]?.media
                                }
                                alt=""
                              />
                              <div className="contInfo d-flex justify-between">
                                <h6 className="contentHeadng">
                                  {curr?.contentDetails?.heading}
                                </h6>
                                <img
                                  className="contentTag"
                                  src={curr?.payment_content_type ? share : exclusive}
                                  alt="Exclusive Content"
                                />
                              </div>
                              <div className="contInfo d-flex justify-content-between align-items-center">
                                <h6 className="mb-0 typeText font-md">
                                  {
                                    curr?.payment_content_type ? "SHARED" : "EXCLUSIVE"
                                  }
                                </h6>
                                <span
                                  style={{
                                    color: "#4c4c4c",
                                    background: "#f3f5f4",
                                  }}
                                  className="priceTag"
                                >
                                  {" "}
                                  £
                                  {formatAmountInMillion(curr?.amount + curr?.Vat)}
                                </span>
                              </div>
                            </div>
                            {/* </Link> */}
                          </Col>
                        );
                      })}
                    </Row>
                    <div className="viewAllContn text-end">
                      <Link
                        className="view_link"
                        to={"/dashboard-tables/content_purchased_online"}
                      >
                        View all <BsArrowRight className="text-pink ms-1" />
                      </Link>
                    </div>
                  </Tab>
                  {/* <Tab eventKey="sourced" title="Content Purchased From Tasks">
                    <div className="fltrs_prnt rport_cont_fltrprnt">
                      <button
                        className="sortTrigger"
                        onClick={() => {
                          setOpenReportPurchased(true);
                        }}
                      >
                        Sort <AiFillCaretDown />
                      </button>
                      {openreportPurchased && (
                        <ReportPurchasedSourced
                        shaEx= {true}
                          setSortFilterPurchasedContent={setSortFilterPurchasedContent}
                          sortFilterPurchasedContent={sortFilterPurchasedContent}
                          closeSortComponent={() =>
                            setOpenReportPurchased(false)
                          }
                          url="/reports/content"
                        />
                      )}
                    </div>
                    <Row>
                      {uploadedContent?.map((curr, index) => {
                        return (
                          <Col md={4} className="CntPurFeed">
                            <div className="contentCard" onClick={() => navigate(`/content-details/${curr._id}`)}>
                              <img
                                className="reportcontentImg img-fluid"
                                src={
                                  curr.type == "image"
                                    ? curr?.videothubnail ||
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                    curr?.imageAndVideo
                                    : curr.type == "video"
                                      ? curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.imageAndVideo
                                      : audioic
                                }
                                alt=""
                              />
                              <div className="contInfo d-flex">
                                <h6 className="contentHeadng">
                                  {curr.task_id.heading}
                                </h6>
                              </div>
                              <div className="contInfo d-flex justify-content-between align-items-center">
                                <span className="priceTag">
                                  £{curr?.type === "image" ? curr?.task_id?.photo_price : curr?.type === "audio" ? (curr?.task_id?.interview_price || 0) : curr?.type === "video" ? (curr?.task_id?.videos_price || 0) : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <div className="viewAllContn text-end">
                      <Link className="view_link" to={"/Uploaded-Content/uploaded"}>
                        View All <BsArrowRight className="text-pink ms-1" />
                      </Link>
                    </div>
                  </Tab>  */}
                </Tabs>
                <ContentSortingDialog
                  rangeContentTimeValues={contentTimeValuesHandler}
                  open={open2}
                  onClose={handleClose2}
                  actions={<AiOutlineClose onClick={handleClose2} />}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Tasks */}
        <div className="taskSummaryBar mt-4">
          <div className="reportCard">
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
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={(e) => setActiveTab(e)}
              activeKey={activeTab}
            >
              <Tab eventKey="task" title="Content purchased summary">
                <Link to={"/reports-tables-content/content_purchased_summary"}>
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link to={"/reports-tables-content/content_purchased_summary"}>
                  <ReactApexChart
                    options={contentSummary.options}
                    series={contentSummary.series}
                    type="bar"
                    height={365}
                  />
                </Link>
              </Tab>
              {/* 
              <Tab eventKey="content" title="Content sourced summary">
                <Link to="/reports-tables-content/content_sourced_summary">
                  <img src={taskIcon} alt="Task Icon" className="tbles_icn" />
                </Link>
                <Link to="/reports-tables-content/content_sourced_summary">
                  <ReactApexChart
                    options={contentsourced.options}
                    series={contentsourced.series}
                    type="bar"
                    height={365}
                  />
                </Link>
              </Tab> */}

              <Tab eventKey="funds" title="Funds invested summary">
                <Link to={"/reports-tables-content/fund_invested_summary"}>
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link to={"/reports-tables-content/fund_invested_summary"}>
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

export default memo(ContentReports);
