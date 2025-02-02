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
const ContentReports = ({ timeValuesProps }) => {
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

  console.log("MYpROFILEdATA", profileData);

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
      const resp = await Get(
        `mediaHouse/publish/content?is_sold=true&limit=6&${sortFilterPurchasedContent?.sortField}=${sortFilterPurchasedContent?.sortValue}&favContent=${sortFilterPurchasedContent?.favContent}&category=${sortFilterPurchasedContent?.category}&type=${sortFilterPurchasedContent?.type}`
      );

      setPurcahsedContent(resp.data.content);
      setOpenReportPurchased(false);
      if (resp) {
        setLoading(false);
        setChartName({ ...chartName, purchased: "" });
      }
    } catch (error) {
      console.log(error);
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
      // console.log(error);
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
      // console.log(error);
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
      // console.log(error);
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
      // console.log(resp.data, "<--------resp.data.data")
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
      // console.log(error);
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
      // console.log(resp.data.data, "<--------resp.data.data")
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
          `mediahouse/reportgraphofContent?${taskState}=${taskState}`
        );
      } else {
        resp = await Get(`mediahouse/reportgraphofContent`);
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
      // console.log(error);
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
      // console.log(error);
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
      // console.log("avgdata",data.data)
      const data = res?.data?.data;
      setAvgAmount(data);
    } catch (error) {}
  };
  console.log("sortFilterPurchasedContent", sortFilterPurchasedContent);

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
        <Row className="top_crds_wrp">
          <Col>
            <Link to={"/reports-tables-content/content_purchased_online_today"}>
              {/* <Link to={"/dashboard-tables/content_purchased_online"}> */}
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {ContentData?.content_online?.count || 0}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content purchased online today
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.content_online?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    ) : ContentData?.content_online?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span>{"No change "}</span>
                    )}

                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>

          {/* //total  */}

          <Col>
            <Link to={"/dashboard-tables/content_purchased_online"}>
              {/* <Link to={"/dashboard-tables/content_purchased_online"}> */}
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {ContentData?.total_fund_invested?.task?.data.length || 0}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Total content purchased
                  </Typography>
                  {/* <div className="content_stat">
                    {ContentData?.content_online?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    ) : ContentData?.content_online?.type === "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.content_online?.percent?.toFixed(2)}%
                      </span>
                    ) : <span>{"No change "}</span>}

                    <span>vs yesterday</span>
                  </div> */}

                  <div className="content_stat">
                    {ContentData?.total_fund_invested?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : ContentData?.total_fund_invested?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span>{"No change "}</span>
                    )}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to={"/reports-tables-content/content_avg_price"}>
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      £{formatAmountInMillion(avgAmount)}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content average price
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.average_content_price?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.average_content_price?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : ContentData?.average_content_price?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.average_content_price?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : (
                      <span>{"No change "}</span>
                    )}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          {/* <Col>
            <Link to={"/reports-tables-content/content_purchase_volume_moment"}>
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {(
                        ContentData?.content_purchase_moment?.count || 0
                      )?.toFixed(2)}
                      %
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Content purchase volume movement
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.content_purchase_moment?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />
                        {ContentData?.content_purchase_moment?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : ContentData?.content_purchase_moment?.type ===
                      "decrease" ? (
                      <span className="stat_down">
                        <BsArrowUp />
                        {ContentData?.content_purchase_moment?.percent?.toFixed(
                          2
                        )}
                        %
                      </span>
                    ) : <span>{"No change "}</span>}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col> */}
          <Col>
            <Link to={"/reports-tables-content/fund_invested_today"}>
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      £
                      {formatAmountInMillion(
                        ContentData?.today_fund_invested?.count || 0
                      )}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Funds invested today
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.today_fund_invested?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.today_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : ContentData?.today_fund_invested?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.today_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span>{"No change "}</span>
                    )}
                    <span>vs yesterday</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to={"/reports-tables-content/total_fund_invested"}>
              <Card className="dash-top-cards">
                <CardContent className="dash-c-body">
                  <div className="cardCustomHead">
                    <div className="sortFilter_actions">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 6.15625H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.747559 10.8438H19.4976"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.21631 6.15625V15.5312"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Typography variant="body2" className="card-head-txt mb-2">
                      {`£${formatAmountInMillion(
                        ContentData?.total_fund_invested?.count || 0
                      )}`}
                    </Typography>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="cardContent_head"
                  >
                    Total funds invested
                  </Typography>
                  <div className="content_stat">
                    {ContentData?.total_fund_invested?.type === "decrease" ? (
                      <span className="stat_down">
                        <BsArrowDown />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : ContentData?.total_fund_invested?.type ===
                      "increase" ? (
                      <span className="stat_up">
                        <BsArrowUp />{" "}
                        {ContentData?.total_fund_invested?.percent?.toFixed(2)}%
                      </span>
                    ) : (
                      <span>{"No change "}</span>
                    )}
                    <span>vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Col>
        </Row>
        <div className="taskstat_chart chrts">
          <Row>
            <Col md={7}>
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
                            width="350"
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
                            width="350"
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
                            width="350"
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
                            width="350"
                          />
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={5}>
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
                      {purchasedContent?.slice(0, 6)?.map((curr) => {
                        const userProfile = profileData;
                        let mediaHouseId = null;
                        console.log("userProfile?.role", profileData);
                        if (
                          userProfile?.role &&
                          userProfile?.role == "MediaHouse"
                        ) {
                          mediaHouseId = userProfile?._id;
                          console.log("mediaHouseId", mediaHouseId);
                        } else if (
                          userProfile?.role &&
                          userProfile?.role != "MediaHouse"
                        ) {
                          mediaHouseId = userProfile?.media_house_id;
                        }

                        // JSON.parse(localStorage.getItem("user"))?._id
                        return (
                          <Col md={4} className="CntPurFeed">
                            <div
                              className="contentCard"
                              onClick={() =>
                                navigate(
                                  `/purchased-content-detail/${curr?.transaction_id}`
                                )
                              }
                            >
                              <img
                                className="reportcontentImg img-fluid"
                                src={
                                  curr?.content[0]?.media_type === "video"
                                    ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content[0]?.thumbnail
                                    : curr?.content[0]?.media_type === "audio"
                                    ? audioic
                                    : process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.content[0]?.media
                                }
                                alt=""
                              />
                              <div className="contInfo d-flex">
                                <h6 className="contentHeadng">
                                  {curr?.heading}
                                </h6>
                                {curr?.Vat?.find(
                                  (el) =>
                                    el?.purchased_mediahouse_id ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )?.purchased_content_type == "shared" ? (
                                  <img
                                    className="contentTag"
                                    src={share}
                                    alt="Shared Content"
                                  />
                                ) : (
                                  <img
                                    className="contentTag"
                                    src={exclusive}
                                    alt="Exclusive Content"
                                  />
                                )}
                              </div>
                              <div className="contInfo d-flex justify-content-between align-items-center">
                                <h6 className="mb-0 typeText font-md">
                                  {curr?.Vat?.find(
                                    (el) =>
                                      el?.purchased_mediahouse_id ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )?.purchased_content_type === "shared"
                                    ? "Shared"
                                    : "Exclusive"}
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
                                  {formatAmountInMillion(
                                    +curr?.Vat?.find(
                                      (el) =>
                                        el?.purchased_mediahouse_id ==
                                        mediaHouseId
                                    )?.amount
                                  )}
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
                        View All <BsArrowRight className="text-pink ms-1" />
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
                    height={350}
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
                    height={350}
                  />
                </Link>
              </Tab> */}

              <Tab eventKey="funds" title="Funds Invested summary">
                <Link to={"/reports-tables-content/fund_invested_summary"}>
                  <img src={taskIcon} alt="" className="tbles_icn" />
                </Link>
                <Link to={"/reports-tables-content/fund_invested_summary"}>
                  <ReactApexChart
                    options={fundInvested.options}
                    series={fundInvested.series}
                    type="bar"
                    height={350}
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
