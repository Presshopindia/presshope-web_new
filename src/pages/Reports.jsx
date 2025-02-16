import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import AccountsReports from "../component/AccountsReports";
import ContentReports from "../component/ContentReports";
import TaskReports from "../component/TaskReports";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Select, MenuItem, FormControl } from "@mui/material";
import SortingDialog from "../popups/SortingDialog";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import ChartsSort from "../component/Sortfilters/Dashboard/ChartsSort";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../services/user.services";
import Loader from "../component/Loader";

const Reports = () => {
  
  const [selectedOption, setSelectedOption] = useState("");
  const [timeValues, setTimeValues] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);
  const [reportState, setReportState] = useState("");
  const timeValuesHandler = (values) => {
    setTimeValues(values);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const DashboardData = async () => {
    const dashboardPayload = {
      requestedItems: [
        "total_fund_invested",
        "content_average_price",
        "broadcasted_task_today",
        "content_purchased_online",
        "total_fund_invested_today",
        "content_purchased_from_task",
        "total_fund_invested_in_task",
        "content_purchased_online_today",
        "total_fund_invested_in_task_today",
        "content_purchased_from_task_today",
      ],
      requestedFilter: {}
    }
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/dashboard-data", dashboardPayload );
      setDashboardData(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    DashboardData();
  }, []);


  return (
    <>
    {loading && <Loader />}
      <Header />
      <div className="page-wrap all-reports-wrap">
        <Container fluid className="p-0">
          <Row>
            <Col sm={12}>
              <div className="reportsConainter">
                <div className="reportsFilter mb-4 d-flex justify-content-end align-items-center">
                  <div className="relevanceSelecter me-4">
                    <FormControl></FormControl>
                  </div>
                  <div className="relevanceSelecter"></div>
                </div>
                <div className="rprts_wrap allContent_report theme_card">
                  <Tabs
                    defaultActiveKey="content"
                    id="uncontrolled-tab-example"
                    className="reports_tabs_opts"
                    onSelect={(e) => {
                      navigate(`/reports/${e}`);
                      // window.location.reload();
                    }}
                    activeKey={params?.type}
                  >
                    <Tab eventKey="content" title="Content">
                      <ContentReports
                        timeValuesProps={timeValues}
                        type={params?.type}
                        dashboardData={dashboardData?.content}
                      />
                    </Tab>
                    <Tab eventKey="tasks" title="Tasks">
                      <TaskReports
                        timeValuesProps={timeValues}
                        type={params?.type}
                        dashboardData={dashboardData?.task}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-4">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Reports;
