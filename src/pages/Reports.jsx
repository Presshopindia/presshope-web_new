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

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // open and close sort filter component-
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
                      window.location.reload();
                    }}
                    activeKey={params?.type}
                  >
                    <Tab eventKey="content" title="Content">
                      <ContentReports
                        timeValuesProps={timeValues}
                        type={params?.type}
                      />
                    </Tab>
                    <Tab eventKey="tasks" title="Tasks">
                      <TaskReports
                        timeValuesProps={timeValues}
                        type={params?.type}
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
