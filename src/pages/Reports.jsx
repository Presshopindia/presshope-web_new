import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import ContentReports from "../component/ContentReports";
import TaskReports from "../component/TaskReports";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../services/user.services";
import Loader from "../component/Loader";

const Reports = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardSort, setDashboardSort] = useState({ type: "" });
  const [dashboardPayload, setDashboardPayload] = useState({
    requestedItems: [
      "live_task",
      "broadcasted_task",
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
    requestedFilter: {
      total_fund_invested: "monthly",
      content_average_price: "monthly",
      content_purchased_online: "monthly",
      content_purchased_from_task: "",
      total_fund_invested_in_task: "monthly"
    }
  });

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
                        type={params?.type}
                        dashboardSort={dashboardSort}
                        handleClearSort={handleClearSort}
                        dashboardPayload={dashboardPayload}
                        setDashboardSort={setDashboardSort}
                        dashboardData={dashboardData?.content}
                        handleApplySorting={handleApplySorting}
                        setDashboardPayload={setDashboardPayload}
                      />
                    </Tab>
                    <Tab eventKey="tasks" title="Tasks">
                      <TaskReports
                        type={params?.type}
                        dashboardSort={dashboardSort}
                        handleClearSort={handleClearSort}
                        dashboardPayload={dashboardPayload}
                        setDashboardSort={setDashboardSort}
                        dashboardData={dashboardData?.task}
                        handleApplySorting={handleApplySorting}
                        setDashboardPayload={setDashboardPayload}
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
