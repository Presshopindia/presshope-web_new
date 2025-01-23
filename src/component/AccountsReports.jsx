import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Tabs, Tab } from "react-bootstrap";
import ReactApexChart from 'react-apexcharts';
import SortingDialog from '../popups/SortingDialog';
import avatar from '../assets/images/avatar.png';
import task from '../assets/images/task.svg';
import { Card, CardContent, Typography, Button } from "@mui/material";
import { BsArrowUp, BsArrowRight } from "react-icons/bs";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import taskIcon from '../assets/images/taskIcon.svg';
import barclays from '../assets/images/bankLogos/Barclays.png';
import lloyds from '../assets/images/bankLogos/lloyds.png';
import { FiEdit, FiX } from "react-icons/fi";
import TransactionSort from '../popups/TransactionSort';
import debitL from '../assets/images/bankLogos/debitL.png';
import debitM from '../assets/images/bankLogos/debitM.png';

import { MdAdd } from "react-icons/md";
const AccountsReports = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 2nd dialog
  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      colors: ["#EC4E54"]
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30]
      }
    ]
  });

  const [chartData2] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      colors: ["#20639B"]
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30]
      }
    ]
  });

  const [chartData3] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      colors: ["#53C5AE"]
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 60, 45, 30]
      }
    ]
  });


  return (
    <>
      <div className="accountReports_container">
        <Row className='accoutStats'>
          <Col>
            <Card className="dash-top-cards">
              <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                  <div className='sortFilter_actions'>
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 6.15625H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 10.8438H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.21631 6.15625V15.5312" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <Typography variant="body2" className="card-head-txt mb-2">
                    11
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom className="cardContent_head">
                  Total content purchased online
                </Typography>
                <div className="content_stat">
                  <span className='stat_up'><BsArrowUp /> 8%</span>
                  <span>vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Card className="dash-top-cards">
              <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                  <div className='sortFilter_actions'>
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 6.15625H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 10.8438H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.21631 6.15625V15.5312" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <Typography variant="body2" className="card-head-txt mb-2">
                    5
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom className="cardContent_head">
                  Total funds invested for content123
                </Typography>
                <div className="content_stat">
                  <span className='stat_up'><BsArrowUp /> 8%</span>
                  <span>vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Card className="dash-top-cards">
              <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                  <div className='sortFilter_actions'>
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 6.15625H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 10.8438H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.21631 6.15625V15.5312" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <Typography variant="body2" className="card-head-txt mb-2">
                    87
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom className="cardContent_head">
                  Total tasks broadcasted
                </Typography>
                <div className="content_stat">
                  <span className='stat_up'><BsArrowUp /> 8%</span>
                  <span>vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Card className="dash-top-cards">
              <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                  <div className='sortFilter_actions'>
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 6.15625H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 10.8438H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.21631 6.15625V15.5312" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <Typography variant="body2" className="card-head-txt mb-2">
                    £ 1,250
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom className="cardContent_head">
                  Total funds invested for tasks
                </Typography>
                <div className="content_stat">
                  <span className='stat_up'><BsArrowUp /> 8%</span>
                  <span>vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </Col>
          <Col>
            <Card className="dash-top-cards">
              <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                  <div className='sortFilter_actions'>
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 6.15625H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0.747559 10.8438H19.4976" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.21631 6.15625V15.5312" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <Typography variant="body2" className="card-head-txt mb-2">
                    £ 1,250
                  </Typography>
                </div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom className="cardContent_head">
                  Pending payments
                </Typography>
                <div className="content_stat d-flex justify-content-between align-items-center">
                  <span className='text-pink'>OVERDUE</span>
                  <span className='payPending'>PAY</span>
                </div>
              </CardContent>
            </Card>
          </Col>
        </Row>
        <div className="transactionBank_wrap">
          <Row>
            <Col md={7}>
              <div className="transactionList">
                <div className="statChartHead">
                  <h5>Transactions</h5>
                  <div className="statSort">
                    <img src={taskIcon} alt="" />
                    <button className='sortTrigger' onClick={handleOpen}>Sort <AiFillCaretDown /></button>
                  </div>
                </div>
                <Table className='mt-4'>
                  <tbody>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Nerdydude1</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Nerdydude1</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Dreampicman21</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Nerdydude1</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Silverfox28</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Makemylife007</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img src={avatar} alt="" /></td>
                      <td>
                        <h6 className='transactn_user'>Dramaqueenlondon</h6>
                      </td>
                      <td className='transactn_date'>
                        <span className='font-light'>20 Jan,  2023</span>
                      </td>
                      <td>
                        <img className='me-2' src={task} alt="" />
                        <span>Task</span>
                      </td>
                      <td className='transactn_amount'>
                        <span className='commnPriceTag'>£350</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="viewAllContn text-end">
                  <Link className='text-dark'>View All <BsArrowRight className='text-pink ms-1' /></Link>
                </div>
                <TransactionSort
                  open={open}
                  onClose={handleClose}
                  actions={<AiOutlineClose onClick={handleClose} />}
                />
              </div>
            </Col>
            <Col md={5}>
              <div className="transactionList">
                <div className="allBanks">
                  <div className="statChartHead mb-4">
                    <h5>Banks</h5>
                    <Button variant='primary'><MdAdd className='addFont' /> Add bank</Button>
                  </div>
                  <div className="bank_card">
                    <div className="bankInfo_wrap">
                      <img className='bankLogo' src={barclays} alt="" />
                      <div className="bankInfo">
                        <h5 className='addedBank'>Barclays Bank</h5>
                        <small className='bankLocatn'>Mayfair, London</small>
                      </div>
                    </div>
                    <span className='defaultTag'>Default</span>
                  </div>
                  <div className="bank_card">
                    <div className="bankInfo_wrap">
                      <img className='bankLogo' src={lloyds} alt="" />
                      <div className="bankInfo">
                        <h5 className='addedBank'>Lloyds Bank</h5>
                        <small className='bankLocatn'>Thorn Apple street, London</small>
                      </div>
                    </div>
                    <div className="bankActions">
                      <span className='editBank me-2'>
                        <FiEdit />
                      </span>
                      <span className='removeBank'>
                        <FiX />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="allCards">
                  <div className="statChartHead mb-4">
                    <h5>Cards</h5>
                    <Button variant='primary'><MdAdd className='addFont' /> Add card</Button>
                  </div>
                  <div className="debitCard_wrap">
                    <Row>
                      <Col md={6}>
                        <img className='dbt_card' src={debitL} alt="" />
                      </Col>
                      <Col md={6}>
                        <img className='dbt_card' src={debitM} alt="" />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="taskSummaryBar mt-4">
          <div className="reportCard">
            <div className='sortingStat'>
              <button className='sortTrigger' onClick={handleOpen2}>Sort <AiFillCaretDown /></button>
              <SortingDialog
                open={open2}
                onClose={handleClose2}
                actions={<AiOutlineClose onClick={handleClose2} />}
              />
            </div>
            <Tabs
              defaultActiveKey="tasks"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="tasks" title="Content purchased summary">
              <Link to={"/reports-tables-content/content_purchased_summary"}>
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
                </Link>
             
              </Tab>
              <Tab eventKey="content" title="Content sourced summary">
                <ReactApexChart options={chartData2.options} series={chartData2.series} type="bar" height={350} />
              </Tab>
              <Tab eventKey="funds" title="Funds Invested summary">
              <Link to={"/reports-tables-content/fund_invested_summary"}>
               
                <ReactApexChart options={chartData3.options} series={chartData3.series} type="bar" height={350} />
                </Link>
              </Tab>
            </Tabs>

          </div>
        </div>
      </div>
    </>
  )
}

export default memo(AccountsReports)