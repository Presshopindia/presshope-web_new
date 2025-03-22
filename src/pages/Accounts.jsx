import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import {
  FormControl,
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import {
  BsEye,
  BsChevronDown,
  BsArrowLeft,
} from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import ReactApexChart from "react-apexcharts";
import task from "../assets/images/task.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import calendar from "../assets/images/calendar.svg";
import cameraic from "../assets/images/camera.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";
import watchic from "../assets/images/watch.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import shared from "../assets/images/share.png";
import idic from "../assets/images/id.svg";
import invic from "../assets/images/invoice.svg";
import Loader from "../component/Loader";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import AccountsFilter from "../component/Sortfilters/Content/AccountsFilter";
import ChartsSort from "../component/Sortfilters/Dashboard/ChartsSort";
import audiosm from "../assets/images/audimgsmall.svg";
import docsic from "../assets/images/docsic.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import {
  initStateOfContentSummary,
  initStateOfSortFilterAccount,
} from "../component/staticData";
import { PaginationComp } from "../component/Pagination";
import { DashboardCardInfo } from "../component/DashboardCardInfo";

const Accounts = () => {
  const navigate = useNavigate();

  const [fundInvested, setFundInvested] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#EC4E54"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });

  const [vatSummary, setVatSummary] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#53C5AE"],
    },
    series: [
      {
        name: "sales",
        data: [],
      },
    ],
  });

  const [accountCount, setAccountCount] = useState();
  const [activeKey, setActiveKey] = useState();
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [transaction_details, setTransaction_Details] = useState([]);
  const [vatDetails, setVatDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [active, setActive] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [contentTimeValues, setContentTimeValues] = useState("");
  const [timeValues, setTimeValues] = useState("");
  const [parentTimeValues, setParentTimeValues] = useState("");
  const [openSortTask, setOpenSortTask] = useState(false);
  const [taskState, setTaskState] = useState("");
  const [chartName, setChartName] = useState({
    task: "",
    transactionDetails: "",
    vatDetails: "",
  });

  // Time values handler -
  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  // Pagination-
  const [tranPage, setTranPage] = useState(1);
  const [vatPage, setVatPage] = useState(1);

  // Account and Vat sort filter-
  const [accountSortFilter, setAccountSortFilter] = useState(
    initStateOfSortFilterAccount
  );
  const [contentSummary, setContentSummary] = useState(
    initStateOfContentSummary
  );
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const parsedSort = query.get("sort") || "false";
  const parsedTask = query.get("task") || "false";
  const parsedContent = query.get("content") || "false";
  const parsedPaymentMade = query.get("payment_made") || "false";
  const parsedPaymentPending = query.get("payment_pending") || "false";
  const activeKeygraph = query.get("activekey") || "tasks";

  useEffect(() => {
    if (activeKeygraph) {
      setActiveKey(activeKeygraph);
    }
  }, [activeKeygraph]);

  useEffect(() => {
    setAccountSortFilter({
      sort: parsedSort,
      priceRange: {
        start: 0,
        end: 0,
      },
      task: parsedTask,
      content: parsedContent,
      payment_made: parsedPaymentMade,
      payment_pending: parsedPaymentPending,
    });
  }, []);

  const ReportCount = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/Account/count`);
      setAccountCount(resp.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [totalPage, setTotalPage] = useState(1);
  const TransactionDetails = async () => {
    setLoading(true);

    try {
      let resp;
      if (query.get("type") || tranPage) {
        resp = await Get(
          `mediahouse/getallinvoiseforMediahouse?${parsedSort}=${parsedSort}&task=${parsedTask}&content=${parsedContent}&task=${parsedTask}&payment_made=${parsedPaymentMade}&payment_pending=${parsedPaymentPending}&limit=5&offset=${(tranPage - 1) * 5
          }`
        );
      } else {
        resp = await Get(`mediahouse/getallinvoiseforMediahouse`);
      }
      if (resp) {
        setLoading(false);
        setTransaction_Details(resp.data.resp);
        setTotalPage(Math.ceil(resp.data.count / 5));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const VatDetails = async () => {
    setLoading(true);

    try {
      let resp;
      if (query.get("type") || vatPage) {
        resp = await Get(
          `mediahouse/getallinvoiseforMediahouse?${parsedSort}=${parsedSort}&task=${parsedTask}&content=${parsedContent}&task=${parsedTask}&payment_made=${parsedPaymentMade}&payment_pending=${parsedPaymentPending}&limit=5&offset=${(tranPage - 1) * 5
          }`
        );
      } else {
        resp = await Get(`mediahouse/getallinvoiseforMediahouse`);
      }
      if (resp) {
        setLoading(false);
        setVatDetails(resp.data.resp);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const FundInvested = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/AccountfundInvested?${taskState}=${taskState}`
      );
      if (resp) {
        setFundInvested((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
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

            tooltip: {
              enabled: true,
              x: {
                formatter: function (val, opts) {
                  return `${val} sales`;
                },
              },
              y: {
                formatter: function (val) {
                  return "£" + formatAmountInMillion(val);
                },
              },
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val ? "£" + formatAmountInMillion(val) : "";
              },
            },
          },

          series: [
            {
              name: "Funds invested",

              data: [
                resp.data.data.jan.toFixed(2),
                resp.data.data.feb.toFixed(2),
                resp.data.data.mar.toFixed(2),
                resp.data.data.apr.toFixed(2),
                resp.data.data.may.toFixed(2),
                resp.data.data.june.toFixed(2),
                resp.data.data.july.toFixed(2),
                resp.data.data.aug.toFixed(2),
                resp.data.data.sept.toFixed(2),
                resp.data.data.oct.toFixed(2),
                resp.data.data.nov.toFixed(2),
                resp.data.data.dec.toFixed(2),
              ],
            },
          ],
        }));
        setLoading(false);
        setChartName({ ...chartName, task: "" });
      }
    } catch (error) {
      setLoading(false);
      setChartName({ ...chartName, task: "" });
    }
  };

  const VatSummary = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/AccountcontentPurchasedOnline?${taskState}=${taskState}`
      );

      if (resp) {
        setVatSummary((prevTaskSummary) => ({
          ...prevTaskSummary,
          options: {
            ...prevTaskSummary.options,
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
            tooltip: {
              enabled: true,
              x: {
                // Customize tooltip to show "Month VAT paid"
                formatter: function (val, opts) {
                  return `${val} `;
                },
              },
              y: {
                formatter: function (val) {
                  return "£" + formatAmountInMillion(val); // e.g., "$123.45"
                },
              },
            },
            dataLabels: {
              enabled: true, // Enables showing values on the bars
              formatter: function (val) {
                // return "£"+formatAmountInMillion(val);
                return val ? "£" + formatAmountInMillion(val) : ""; // e.g., "$123.45"
              },
            },
          },
          series: [
            {
              name: "VAT Paid",
              data: [
                resp.data.data.jan.toFixed(2),
                resp.data.data.feb.toFixed(2),
                resp.data.data.mar.toFixed(2),
                resp.data.data.apr.toFixed(2),
                resp.data.data.may.toFixed(2),
                resp.data.data.june.toFixed(2),
                resp.data.data.july.toFixed(2),
                resp.data.data.aug.toFixed(2),
                resp.data.data.sept.toFixed(2),
                resp.data.data.oct.toFixed(2),
                resp.data.data.nov.toFixed(2),
                resp.data.data.dec.toFixed(2),
              ],
            },
          ],
        }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

            tooltip: {
              enabled: true,
              x: {
                // Customize tooltip to show "Month VAT paid"
                formatter: function (val, opts) {
                  return `${val} `;
                },
              },
              y: {
                formatter: function (val) {
                  return val; // e.g., "$123.45"
                },
              },
            },
          },
          series: [
            {
              ...prevTaskSummary.series[0],
              // name: "Funds invested",
              name: "Content purchased",

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
                resp.data.dec,
              ],
            },
          ],
        }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ReportCount();
    TransactionDetails();
    FundInvested();
    VatSummary();
    ContentSummary();
    VatDetails();
  }, []);

  useEffect(() => {
    FundInvested();
    VatSummary();
    ContentSummary();
  }, [taskState]);

  useEffect(() => {
    if (accountSortFilter?.type === "account" || tranPage) {
      TransactionDetails();
    }
  }, [accountSortFilter.active, tranPage]);

  useEffect(() => {
    if (accountSortFilter?.type === "vat" || vatPage) {
      VatDetails();
    }
  }, [accountSortFilter.active, vatPage]);

  const handleTabClick = () => {
    setTimeout(() => {
      const vatDetailSection = document.getElementById("vatdetail");
      if (vatDetailSection) {
        vatDetailSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardSort, setDashboardSort] = useState({ type: "" });
  const [dashboardPayload, setDashboardPayload] = useState({
    requestedItems: [
      "total_fund_invested",
      "content_purchased_online",
      "content_purchased_from_task",
      "total_fund_invested_in_task"
    ],
    requestedFilter: {
      total_fund_invested: "monthly",
      content_purchased_online: "monthly",
      content_purchased_from_task: "monthly",
      total_fund_invested_in_task: "monthly"
    }
  })

  const DashboardData = async (payload) => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/dashboard-data", payload);
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
      <div className="page-wrap all-reports-wrap">
        <Container fluid className="p-0">
          <Row className="dashboardStat_cards crd_edit_wrap">
            <Col sm={12}>
              <div className="reportsConainter">
                <div className="reportsFilter mb-4 d-flex justify-content align-items-center">
                  <div className="relevanceSelecter">
                    <FormControl>
                      {localStorage.getItem("backBtnVisibility") && (
                        <Link
                          onClick={() => history.back()}
                          className="back_link mb-3"
                        >
                          <BsArrowLeft className="text-pink" />
                          Back
                        </Link>
                      )}
                    </FormControl>
                  </div>
                </div>
                <div className="rprts_wrap allContent_report theme_card">
                  <div className="accnts_hdng">
                    <p className="ac_hdng">Accounts</p>
                  </div>
                  <div className="acnts_wrp acnts">
                    <div className="accountReports_container">
                      <Row className="accoutStats">
                        {/* Content purchased online */}
                        <Col>
                          <DashboardCardInfo
                            task={true}
                            type="content_purchased_online"
                            title="Total content purchased online"
                            path="/dashboard-tables/content_purchased_online"
                            trend={dashboardData?.content?.purchasedOnline?.trend}
                            total={dashboardData?.content?.purchasedOnline?.totalCount}
                            dashboardSort={dashboardSort}
                            setDashboardSort={setDashboardSort}
                            sort={dashboardPayload?.requestedFilter?.content_purchased_online}
                            setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_online: value } })}
                            setSortState={handleApplySorting}
                            handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                            handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.total_fund_invested, content_purchased_online: "" } })}
                          />
                        </Col>

                        {/* Total funds invested */}
                        <Col>
                          <DashboardCardInfo
                            task={true}
                            type="total_fund_invested"
                            path="/dashboard-tables/fund_invested"
                            title="Total funds invested for purchased content"
                            trend={dashboardData?.content?.totalFundInvested?.trend}
                            total={"£" + formatAmountInMillion(dashboardData?.content?.totalFundInvested?.totalAmount + dashboardData?.content?.totalFundInvested?.totalVat || 0)}
                            dashboardSort={dashboardSort}
                            setDashboardSort={setDashboardSort}
                            sort={dashboardPayload?.requestedFilter?.total_fund_invested}
                            setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested: value } })}
                            setSortState={handleApplySorting}
                            handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                            handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.total_fund_invested, content_purchased_online: "" } })}
                          />
                        </Col>


                        {/* Total content purchased from tasks */}
                        <Col>
                          <DashboardCardInfo
                            task={true}
                            type="content_purchased_from_task"
                            path="/accounts-tables/total_content"
                            title="Total content purchased from tasks"
                            trend={dashboardData?.task?.contentPurchasedFromTask?.trend}
                            total={dashboardData?.task?.contentPurchasedFromTask?.totalCount}
                            dashboardSort={dashboardSort}
                            setDashboardSort={setDashboardSort}
                            sort={dashboardPayload?.requestedFilter?.content_purchased_from_task}
                            setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: value } })}
                            setSortState={handleApplySorting}
                            handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                            handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: "" } })}
                          />
                        </Col>

                        {/* Total funds invested for content purchased from task */}
                        <Col>
                          <DashboardCardInfo
                            task={true}
                            type="total_fund_invested_in_task"
                            path="/accounts-tables/total_funds_sourced"
                            title="Total funds invested for content purchased from task"
                            trend={dashboardData?.task?.totalFundInvested?.trend}
                            total={"£" + formatAmountInMillion(dashboardData?.task?.totalFundInvested?.totalAmount || 0)}
                            dashboardSort={dashboardSort}
                            setDashboardSort={setDashboardSort}
                            sort={dashboardPayload?.requestedFilter?.total_fund_invested_in_task}
                            setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: value } })}
                            setSortState={handleApplySorting}
                            handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                            handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested_in_task: "" } })}
                          />
                        </Col>

                        <Col>
                          <Link to={"/accounts-tables/pending_payments"}>
                            <Card className="dash-top-cards pb-0">
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
                                  <Typography
                                    variant="body2"
                                    className="card-head-txt mb-2 mt-2"
                                  >
                                    £
                                    {formatAmountInMillion(accountCount?.pending_payment || 0)}
                                  </Typography>
                                </div>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                  className="cardContent_head"
                                >
                                  Pending payments
                                </Typography>
                                <div className="content_stat d-flex justify-content-between align-items-center">
                                  <span className="text-pink">OVERDUE</span>
                                  <span className="payPending">PAY</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Col>
                      </Row>
                      <div className="transactionBank_wrap trns_tbl">
                        <Row>
                          <Col md={12}>
                            <Card className="tbl_crd bg_grey">
                              <div className="">
                                <div className="d-flex justify-content-between align-items-center tbl_hdr" >
                                  <Typography className="tbl_hdng">
                                    Transaction details
                                  </Typography>
                                  <div className="tbl_rt">
                                    <div className="fltrs_prnt">
                                      <Button
                                        className="sort_btn"
                                        onClick={() => {
                                          setAccountSortFilter({
                                            ...accountSortFilter,
                                            type: "account",
                                          });
                                        }}
                                      >
                                        Sort
                                        <BsChevronDown />
                                      </Button>
                                      {accountSortFilter?.type ===
                                        "account" && (
                                          <AccountsFilter
                                            setAccountSortFilter={
                                              setAccountSortFilter
                                            }
                                            accountSortFilter={accountSortFilter}
                                          />
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="fix_ht_table">
                                  <table
                                    width="100%"
                                    mx="20px"
                                    variant="simple"
                                    className="common_table"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="cnt_prchsd_th">
                                          Content purchased online
                                        </th>
                                        <th>License</th>
                                        <th>Type</th>
                                        <th>Volume</th>
                                        <th>Category</th>
                                        <th>Time & date</th>
                                        <th>Location</th>
                                        <th>Transaction</th>
                                        <th>Invoice</th>
                                        <th>Total paid</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {transaction_details?.map((curr) => {
                                        const getMediaType = (type) => {
                                          const mediaType = curr?.type === "content" ? curr?.content_id?.content?.filter(
                                            (item) =>
                                              item.media_type === type
                                          ) : curr?.purchased_task_content?.filter(
                                            (item) =>
                                              item.type === type
                                          );
                                          return mediaType.length || 0;
                                        }
                                        {
                                          return (
                                            <tr className="clickable" key={curr?._id}>
                                              <td className="">
                                                <div className="cont_wrp d-flex flex-column">
                                                  {curr?.type ==
                                                    "content" ? (
                                                    <div className="d-flex cnt_inn">
                                                      {curr?.content_id?.content
                                                        ?.slice(0, 3)
                                                        .map((item) => {
                                                          return (
                                                            <img
                                                              src={
                                                                item?.media_type ===
                                                                  "video"
                                                                  ? process.env
                                                                    .REACT_APP_CONTENT_MEDIA +
                                                                  item?.thumbnail
                                                                  : item?.media_type ===
                                                                    "audio"
                                                                    ? audiosm
                                                                    : item?.thumbnail ||
                                                                    process.env
                                                                      .REACT_APP_CONTENT_MEDIA +
                                                                    item?.media
                                                              }
                                                              className="content_img"
                                                            />
                                                          );
                                                        })}
                                                    </div>
                                                  ) : (
                                                    <div className="d-flex cnt_inn">
                                                      {curr?.purchased_task_content
                                                        ?.slice(0, 3)
                                                        .map((item) => {
                                                          return (
                                                            <img
                                                              src={(item?.type === "video" || item?.type === "image") ? item?.videothubnail : audiosm
                                                              }
                                                              className="content_img"
                                                            />
                                                          );
                                                        })}
                                                    </div>
                                                  )}
                                                  <Link
                                                    to={
                                                      curr?.type === "content"
                                                        ? `/purchased-content-detail/${curr?._id}`
                                                        : `/purchased-task-content-detail/${curr?._id}`
                                                    }
                                                    className="link view_link d-flex align-items-center"
                                                  >
                                                    <BsEye />
                                                    View content
                                                  </Link>
                                                </div>
                                              </td>
                                              <td className="text-center">
                                                {/* tooptip Start */}
                                                {
                                                  curr?.type === "content" ? (
                                                    <Tooltip title={curr?.payment_content_type == "exclusive" ? "Exclusive" : "Shared"}
                                                    >
                                                      <img
                                                        src={curr?.payment_content_type ===
                                                          "exclusive"
                                                          ? exclusiveic
                                                          : shared
                                                        }
                                                        className="tbl_ic"
                                                        alt="Exclusive"
                                                      />
                                                    </Tooltip>
                                                  ) : <Tooltip title="Task">
                                                    <img
                                                      src={task}
                                                      className="tbl_ic"
                                                      alt="Exclusive"
                                                    />
                                                  </Tooltip>
                                                }
                                                {/* tooptip End */}
                                              </td>
                                              <td className="text-center">
                                                <div className="">
                                                  {getMediaType("image") ? (
                                                    <Tooltip title="Photo">
                                                      <img
                                                        src={cameraic}
                                                        alt="Photo"
                                                        className="icn"
                                                      />{" "}
                                                    </Tooltip>
                                                  ) : null}
                                                  <br />
                                                  {getMediaType("video") ? (
                                                    <Tooltip title="Video">
                                                      {" "}
                                                      <img
                                                        src={videoic}
                                                        alt="Video"
                                                        className="icn"
                                                      />
                                                    </Tooltip>
                                                  ) : null}
                                                  <br />
                                                  {getMediaType("audio") ? (
                                                    <Tooltip title="Audio">
                                                      <img
                                                        src={interviewic}
                                                        alt="Audio"
                                                        className="icn"
                                                      />
                                                    </Tooltip>
                                                  ) : null}
                                                  {getMediaType("pdf") ? (
                                                    <Tooltip title="Pdf">
                                                      <img
                                                        src={docsic}
                                                        alt="Pdf"
                                                        className="icn"
                                                      />
                                                    </Tooltip>
                                                  ) : null}
                                                </div>
                                              </td>
                                              <td>
                                                <p className="d-flex flex-column align-items-center volum">
                                                  <span>
                                                    {curr?.type === "content" ? curr?.content_id?.content?.length : curr?.purchased_task_content?.length}
                                                  </span>
                                                </p>
                                              </td>
                                              <td className="text-center">
                                                <Tooltip
                                                  title={curr?.type === "content" ? curr?.content_id?.category_id?.name : curr?.task_id?.category_id?.name
                                                  }
                                                >
                                                  <img
                                                    src={curr?.type === "content" ? curr?.content_id?.category_id?.icon : curr?.task_id?.category_id?.icon}
                                                    className="tbl_ic"
                                                    alt="Content category"
                                                  />
                                                </Tooltip>
                                              </td>
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img
                                                    src={watchic}
                                                    className="icn_time"
                                                  />
                                                  {moment(
                                                    curr?.createdAt
                                                  ).format("hh:mm A")}
                                                </p>
                                                <p className="timedate">
                                                  <img
                                                    src={calendar}
                                                    className="icn_time"
                                                  />
                                                  {moment(
                                                    curr?.createdAt
                                                  ).format("DD MMM, YYYY")}
                                                </p>
                                              </td>
                                              <td>
                                                {curr?.type === "content" ? curr?.content_id?.location : curr?.task_id?.location}
                                              </td>
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img
                                                    src={idic}
                                                    className="icn_time"
                                                  />
                                                  ID- {curr?._id}
                                                </p>
                                                <Link
                                                  to={curr?.type === "content" ? `/purchased-content-detail/${curr._id}` : `/purchased-task-content-detail/${curr?._id}`}
                                                  className="link view_link"
                                                >
                                                  <BsEye className="icn_time" />
                                                  View transaction
                                                </Link>
                                              </td>

                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img
                                                    src={invic}
                                                    className="icn_time"
                                                  />
                                                  INV- {curr?.invoiceNumber}
                                                </p>

                                                <Link
                                                  to={`/invoice/${curr._id}`}
                                                  className="link view_link"
                                                >
                                                  <BsEye className="icn_time" />
                                                  View invoice
                                                </Link>
                                              </td>
                                              <td>
                                                <p className="ttl_prc text-left">
                                                  £
                                                  {formatAmountInMillion((curr?.amount + curr?.Vat))}
                                                </p>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      })}
                                    </tbody>
                                  </table>
                                  {/* {totalPage?

<PaginationComp totalPage={totalPage} path="Favourited-Content" type="fav" setPage={setPage} page={page} />
:""   
} */}
                                  <PaginationComp
                                    totalPage={totalPage}
                                    path="accounts"
                                    type="transaction"
                                    setPage={setTranPage}
                                    page={tranPage}
                                  />
                                </div>
                              </div>
                            </Card>
                          </Col>
                          <Col md={12} id="vatdetail">
                            <Card className="tbl_crd bg_grey vt_dtl_wrp">
                              <div className="">
                                <div className="d-flex justify-content-between align-items-center tbl_hdr">
                                  <Typography className="tbl_hdng">
                                    VAT details
                                  </Typography>
                                  <div className="tbl_rt">
                                    <div className="fltrs_prnt">
                                      <Button
                                        className="sort_btn"
                                        onClick={() => {
                                          setAccountSortFilter({
                                            ...accountSortFilter,
                                            type: "vat",
                                          });
                                        }}
                                      >
                                        Sort
                                        <BsChevronDown />
                                      </Button>
                                      {accountSortFilter?.type === "vat" && (
                                        <AccountsFilter
                                          setAccountSortFilter={
                                            setAccountSortFilter
                                          }
                                          accountSortFilter={accountSortFilter}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="fix_ht_table">
                                  <table
                                    width="100%"
                                    mx="20px"
                                    variant="simple"
                                    className="common_table vat_dtls"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="cnt_prchsd_th">
                                          Content purchased online
                                        </th>
                                        <th>Time & date</th>
                                        <th>Location</th>
                                        <th>Transaction</th>
                                        <th>Invoice date</th>
                                        <th className="inv_th">Invoice</th>
                                        <th className="pmnt_dt_th">
                                          Payment date
                                        </th>
                                        <th>Nett paid</th>
                                        <th>20% VAT paid</th>
                                        <th>Total paid</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {transaction_details?.map((curr) => {
                                        return (
                                          <tr>
                                            <td className="">
                                              <div className="cont_wrp d-flex flex-column">
                                                {curr?.type ==
                                                  "content" ? (
                                                  <div className="d-flex cnt_inn">
                                                    {curr?.content_id?.content
                                                      ?.slice(0, 3)
                                                      .map((item) => {
                                                        return (
                                                          <img
                                                            src={
                                                              item?.media_type ===
                                                                "video"
                                                                ? process.env
                                                                  .REACT_APP_CONTENT_MEDIA +
                                                                item?.thumbnail
                                                                : item?.media_type ===
                                                                  "audio"
                                                                  ? audiosm
                                                                  : item?.thumbnail ||
                                                                  process.env
                                                                    .REACT_APP_CONTENT_MEDIA +
                                                                  item?.media
                                                            }
                                                            className="content_img"
                                                          />
                                                        );
                                                      })}
                                                  </div>
                                                ) : (
                                                  <div className="d-flex cnt_inn">
                                                    {curr?.purchased_task_content
                                                      ?.slice(0, 3)
                                                      .map((item) => {
                                                        return (
                                                          <img
                                                            src={(item?.type === "video" || item?.type === "image") ? item?.videothubnail : audiosm
                                                            }
                                                            className="content_img"
                                                          />
                                                        );
                                                      })}
                                                  </div>
                                                )}
                                                <Link
                                                  to={
                                                    curr?.type === "content"
                                                      ? `/purchased-content-detail/${curr?._id}`
                                                      : `/purchased-task-content-detail/${curr?._id}`
                                                  }
                                                  className="link view_link d-flex align-items-center"
                                                >
                                                  <BsEye />
                                                  View content
                                                </Link>
                                              </div>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img
                                                  src={watchic}
                                                  className="icn_time"
                                                />
                                                {moment(
                                                  curr?.createdAt
                                                ).format("hh:mm A")}
                                              </p>
                                              <p className="timedate">
                                                <img
                                                  src={calendar}
                                                  className="icn_time"
                                                />
                                                {moment(
                                                  curr?.createdAt
                                                ).format("DD MMM, YYYY")}
                                              </p>
                                            </td>
                                            <td>
                                              {curr?.type === "content" ? curr?.content_id?.location : curr?.task_id?.location}
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img
                                                  src={idic}
                                                  className="icn_time"
                                                />
                                                ID- {curr?._id}
                                              </p>
                                              <Link
                                                to={curr?.type === "content" ? `/purchased-content-detail/${curr._id}` : `/purchased-task-content-detail/${curr?._id}`}
                                                className="link view_link"
                                              >
                                                <BsEye className="icn_time" />
                                                View transaction
                                              </Link>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img
                                                  src={calendar}
                                                  className="icn_time"
                                                />
                                                {moment(
                                                  curr?.createdAt
                                                ).format("DD MMM, YYYY")}
                                              </p>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img
                                                  src={invic}
                                                  className="icn_time"
                                                />
                                                {curr?.invoiceNumber}
                                              </p>
                                              <Link
                                                className="link view_link"
                                                to={`/invoice/${curr._id}`}
                                              >
                                                <BsEye className="icn_time" />
                                                View invoice
                                              </Link>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img
                                                  src={calendar}
                                                  className="icn_time"
                                                />
                                                {moment(
                                                  curr?.updatedAt
                                                ).format("DD MMM, YYYY")}
                                              </p>
                                            </td>
                                            <td>
                                              <p className="ttl_prc text-left">
                                                £
                                                {formatAmountInMillion(curr?.amount)}
                                              </p>
                                            </td>
                                            <td>
                                              <p className="ttl_prc text-left">
                                                £
                                                {formatAmountInMillion(curr?.Vat)}
                                              </p>
                                            </td>
                                            <td>
                                              <p className="ttl_prc text-left">
                                                £
                                                {formatAmountInMillion(curr?.amount + curr?.Vat)}
                                              </p>
                                            </td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                  {/* {totalPage?

<PaginationComp totalPage={totalPage} path="Favourited-Content" type="fav" setPage={setPage} page={page} />
:""   
} */}
                                  <PaginationComp
                                    totalPage={totalPage}
                                    path="accounts"
                                    type="vat"
                                    setPage={setVatPage}
                                    page={vatPage}
                                  />
                                </div>
                              </div>
                            </Card>
                          </Col>
                        </Row>
                      </div>

                      {/* Tasks */}
                      <div className="taskSummaryBar mt-4">
                        <div className="reportCard">
                          {/* <div className="sortingStat">
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
                              <Fundsinvested
                                rangeTimeValues={timeValuesHandler}
                                closeSortComponent={() =>
                                  setOpenSortTask(false)
                                }
                              />
                            )}
                          </div> */}
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
                                closeSortComponent={() =>
                                  setOpenSortTask(false)
                                }
                              />
                            )}
                          </div>
                          <Tabs
                            // defaultActiveKey="tasks"
                            activeKey={activeKeygraph || activeKey}
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            onSelect={(k) => {
                              navigate(`/accounts?activekey=${k}`);
                              setActiveKey(k);
                            }}
                          >
                            <Tab
                              eventKey="tasks"
                              title="Funds invested summary"
                            >
                              <Link to="/reports-tables-content/fund_invested_summary">
                                <ReactApexChart
                                  options={fundInvested.options}
                                  series={fundInvested.series}
                                  type="bar"
                                  height={350}
                                />
                              </Link>
                            </Tab>
                            <Tab
                              eventKey="content"
                              title="Content purchased online summary"
                            >
                              <div
                                onClick={() => {
                                  navigate(
                                    "/reports-tables-content/content_purchased_summary"
                                  );
                                }}
                              // to={
                              //   "/reports-tables-content/content_purchased_summary"
                              // }
                              >
                                <ReactApexChart
                                  options={contentSummary.options}
                                  series={contentSummary.series}
                                  type="bar"
                                  height={350}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey="funds" title="VAT summary">
                              <Link to="/reports-tables-content/vat_invested_details"
                              >
                                <ReactApexChart
                                  options={vatSummary.options}
                                  series={vatSummary.series}
                                  type="bar"
                                  height={350}
                                />
                              </Link>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-4 topSearchWrapPadding">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Accounts;
