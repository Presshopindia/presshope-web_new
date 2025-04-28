import React, { memo, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Dropdown, Row, Col } from "react-bootstrap";
// import Logo from "../assets/images/hdr-post-login-logo.svg";
import Logo from "../assets/images/white_logo.png";
import reutersLogo from "../assets/images/reuters.png";
import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "@mui/material";

import { IoMoonOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { Subject, Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import notifyic from "../assets/images/navicons/navnotify.svg";
import darkic from "../assets/images/navicons/navdark.svg";
import contactic from "../assets/images/navicons/navcontactus.svg";
import setngic from "../assets/images/navicons/navsetting.svg";
import Myprofilemd1 from "../component/Myprofilemdl";
import { useState } from "react";
import { toast } from "react-toastify";
import { Get } from "../services/user.services";
import Noprofile from "../assets/images/blank-profile-picture.png";
import Loader from "../component/Loader";
import ntf_hdr from "../../src/assets/images/notification_imgs/bell.svg";
import closeic from "../../src/assets/images/notification_imgs/close.svg";
import { FiSearch } from "react-icons/fi";
import fltric from "../assets/images/notification_imgs/filter.svg";
import myprofileic from "../assets/images/menu-icons/user-square.svg";
import editic from "../assets/images/menu-icons/edit.svg";
import { Patch, Post } from "../services/user.services";

import { MdClose, MdKeyboardArrowRight } from "react-icons/md";
import usric from "../assets/images/menu-icons/user.svg";
import uploadicdocsic from "../assets/images/menu-icons/upload.svg";
import viewcontentic from "../assets/images/menu-icons/content.svg";
import viewtaskic from "../assets/images/menu-icons/task.svg";
import archive from "../assets/images/menu-icons/archive.png";
import accountsic from "../assets/images/menu-icons/accounts.svg";
import bankic from "../assets/images/menu-icons/bank.svg";
import ratingic from "../assets/images/menu-icons/rating.svg";
import dropcontactic from "../assets/images/menu-icons/contact.svg";
import legalic from "../assets/images/menu-icons/legaltandc.svg";
import privacypolicyic from "../assets/images/menu-icons/lock.svg";
import logoutic from "../assets/images/menu-icons/logout.svg";
import Notifications from "../component/Notifications";
import moment from "moment";
import { Tooltip } from "@mui/material";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "../style.scss";

// STYLES
import "../Navbar.scss";
import { useDarkMode } from "../context/DarkModeContext";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [profileType, setProfileType] = useState("");
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState([]);
  const [profile, setProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [sidebar, setSidebar] = useState(false);
  const [basketItemsCount, setBasketItemsCount] = useState(0);
  const showSidebar = () => setSidebar(!sidebar);

  const handleShow = () => setModalShow(!modalShow);

  const SignOut = () => {
    localStorage.clear();
    navigate("/landing-page");
    window.location.reload();
    // toast.success("Logged Out")
  };

  const subject = new Subject();
  subject
    .asObservable()
    .pipe(debounceTime(1000))
    .subscribe((data) => {});

  let debounceTimeout;

  // Define the debounced version of the event handler
  const onKeyUp = async (event) => {
    // Clear the previous timeout if it exists
    clearTimeout(debounceTimeout);

    // Set a new timeout to debounce the event
    debounceTimeout = setTimeout(async () => {
      let a = event.target.value;
      if (a) {
        // Get the current pathname
        const currentPath = window.location.pathname;
        // Check if the current route is the search route
        if (currentPath.startsWith("/content-search")) {
          // Update the search results without navigating
          addTrendingSearch(a);
        } else {
          // Perform regular search functionality and navigate
          const resp = await Get(`users/getTags?type=mediahouse&tagName=${a}`);
          setFilter(resp?.data?.tags);
          navigate(`/content-search/${encodeURIComponent(a)}`);
        }
      } else {
        setFilter([]);
      }
    }, 1000); // Adjust the debounce delay as needed
  };

  const addTrendingSearch = async (tagName) => {
    // Remove '#' character if it exists at the beginning of the tagName string
    const normalizedTagName = tagName.startsWith("#")
      ? tagName.slice(1)
      : tagName;

    const result = await Post("mediahouse/addTrendingSearch", {
      tagName: normalizedTagName,
    });
  };

  const Navigate = (route) => {
    navigate(route);
  };

  const handleClose = () => {
    setShow(!show);
    setSearchQuery("");
  };

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const getNotification = async () => {
    try {
      const res = await Get(`mediaHouse/notificationlisting`);
      setData(res?.data?.data || []);
      setCount(res?.data?.count);
    } catch (err) {}
  };

  const handelDeleteNotification = async () => {
    try {
      setData([]);
      setCount(0);
      const res = await Post("mediaHouse/updateNotification/ClearAll");
    } catch (error) {
      console.log(error);
    }
  };

  const read = async (_id) => {
    try {
      let obj = {
        notification_id: _id,
      };
      const res = await Post(`mediahouse/updatenotification`, obj);
      if (res) {
        getNotification();
      }
    } catch (err) {}
  };

  // Dark Mode-
  const {
    isDarkMode,
    toggleDarkMode,
    disableDarkMode,
    profileData,
    cartCount,
    setCartCount,
    navColor,
    setNavColor,
  } = useDarkMode();
  useEffect(() => {
    const allDivs = document.querySelectorAll("div");

    if (isDarkMode) {
      // Iterate through each div and add an id
      // allDivs.forEach((div) => {
      //   div.classList.add(`darkmode`);
      // });
      allDivs[0]?.classList.add(`darkmode`);
    }
    if (!isDarkMode) {
      allDivs.forEach((div) => {
        div.classList.remove(`darkmode`);
      });
    }
  }, [isDarkMode]);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase(); // Convert search query to lowercase

    // Filter notifications based on search query
    const filteredNotifications = data.filter((notification) =>
      notification.body.toLowerCase().includes(searchQuery)
    );

    console.log("Searching", searchQuery, filteredNotifications, data);
    setData(data);
  };

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);

      setCartCount(res?.data?.data || 0);
      // setBasketItemsCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  useEffect(() => {
    getNotification();
    getCountOfBasketItems();
  }, []);

  return (
    <>
      <div className="db_header mn_hdr dashboard_header">
        <Navbar>
          <Container
            fluid
            className=" p-0 justify-content-between align-items-center cont-pdng"
          >
            <div className="logo-wrap">
              <Navbar.Brand>
                <Link to={"/landing-page"}>
                  <img src={Logo} alt="logo" />
                </Link>
              </Navbar.Brand>
            </div>
            <div className="nav-center">
              {/* responsive header start */}
              <div className="resp_hdr">
                <IconContext.Provider value={{ color: "#FFF" }}>
                  {/* All the icons now are white */}
                  <div className="navbar resp">
                    <Link to="#" className="menu-bars">
                      <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                  </div>
                  <nav
                    className={
                      sidebar || window.location.pathname.includes("content")
                        ? "nav-menu active"
                        : "nav-menu"
                    }
                  >
                    <ul className="nav-menu-items" onClick={showSidebar}>
                      <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                          <AiIcons.AiOutlineClose />
                        </Link>
                      </li>

                      <li className="nav-text">
                        <Link to={"/dashboard/exclusive"}>
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li
                        className="nav-text"
                        onClick={() =>
                          localStorage.removeItem("backBtnVisibility")
                        }
                      >
                        <Link to={"/published-content"}>
                          <span>Feed</span>
                        </Link>
                      </li>
                      <li className="nav-text">
                        <Link to={"/content/exclusive/published/favourited"}>
                          <span>Content</span>
                        </Link>
                      </li>
                      <li className="nav-text">
                        {/* <Link to={`/broadcasted-taks`}> */}
                        <Link to={`/task`}>
                          <span>Tasks</span>
                        </Link>
                      </li>
                      <li
                        className="nav-text"
                        onClick={() =>
                          localStorage.removeItem("backBtnVisibility")
                        }
                      >
                        <Link to={"/chat"}>
                          <span>Chat</span>
                        </Link>
                      </li>
                      <li className="nav-text">
                        <Link to={"/reports/content"}>
                          <span>Reports</span>
                        </Link>
                      </li>
                      <li
                        className="nav-text"
                        onClick={() =>
                          localStorage.removeItem("backBtnVisibility")
                        }
                      >
                        <Link to={"/accounts"}>
                          <span>Accounts</span>
                        </Link>
                      </li>
                      <li className="nav-text nme">
                        <Link className="nav-link position-relative usr_lg_name eml">
                          {profileData?.full_name}
                          {profileData && profileData?.role != "MediaHouse" ? (
                            <span className="msg-count">User</span>
                          ) : (
                            <span className="msg-count">Admin</span>
                          )}
                        </Link>
                      </li>
                      <li className="nav-text">
                        <div className="mediaHouse_logo hdr_prfl_img">
                          <img
                            src={
                              profileData?.hasOwnProperty("admin_detail")
                                ? profileData?.admin_detail?.admin_profile
                                : profileData?.profile_image
                            }
                            alt="media house"
                          />
                        </div>
                      </li>
                    </ul>
                  </nav>
                </IconContext.Provider>
              </div>
              {/* responsive header end */}

              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              <Navbar id="basic-navbar-nav" className="dash_header_links">
                <Nav className="me-auto center-links nav_inn align-items-center">
                  <NavLink
                    to={"/dashboard/exclusive"}
                    // className="nav-link dashboard"
                    className={`nav-link ${
                      navColor.startsWith("/dashboard/") ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      // localStorage.removeItem("backBtnVisibility");
                      setNavColor("/dashboard/exclusive");
                    }}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={"/published-content"}
                    // className="nav-link"
                    // onClick={() => localStorage.removeItem("backBtnVisibility")}
                    className={`nav-link ${
                      navColor == "/published-content" ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      localStorage.removeItem("backBtnVisibility");
                      setNavColor("/published-content");
                    }}
                  >
                    Feed
                  </NavLink>
                  <NavLink
                    to={"/content/exclusive/published/favourited"}
                    // className="nav-link"
                    className={`nav-link ${
                      navColor.startsWith("/content/") ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      localStorage.removeItem("backBtnVisibility");
                      setNavColor("/content/exclusive/published/favourited");
                    }}
                  >
                    Content
                  </NavLink>
                  {/* <NavLink to={"/broadcasted-taks"} className="nav-link"> */}
                  <NavLink
                    to={`/task`}
                    //  className="nav-link"
                    className={`nav-link ${
                      navColor == "/task" ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      setNavColor("/task");
                    }}
                  >
                    Tasks
                  </NavLink>
                  {/* <Tooltip title="Coming soon">
                    <NavLink style={{ color: "white", fontWeight: "600" }}>
                      Tasks
                    </NavLink>
                  </Tooltip> */}
                  <NavLink
                    to={"/chat"}
                    // className="position-relative nav-link messages_countWrap"
                    className={`position-relative nav-link messages_countWrap ${
                      navColor == "/chat" ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      setNavColor("/chat");
                      localStorage.removeItem("backBtnVisibility");
                    }}
                  >
                    Chat
                  </NavLink>
                  <NavLink
                    to={"/reports/content"}
                    //  className="nav-link"
                    className={`nav-link ${
                      navColor.startsWith("/reports/") ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      setNavColor("/reports/content");
                    }}
                  >
                    Reports
                  </NavLink>
                  <NavLink
                    to={"/accounts"}
                    className={`nav-link ${
                      navColor == "/accounts" ? "nav-active" : ""
                    }`}
                    onClick={() => {
                      setNavColor("/accounts");
                      localStorage.removeItem("backBtnVisibility");
                    }}
                  >
                    Accounts
                  </NavLink>
                  <NavLink className="nav-link position-relative usr_lg_name eml">
                    {profileData?.full_name}
                    {/* <span className="msg-count">Admin</span> */}
                    {profileData && profileData?.role != "MediaHouse" ? (
                      <span className="msg-count">User </span>
                    ) : (
                      <span className="msg-count">Admin</span>
                    )}
                  </NavLink>
                  <div className="mediaHouse_logo hdr_prfl_img">
                    <img
                      src={
                        profileData?.hasOwnProperty("admin_detail")
                          ? profileData?.admin_detail?.admin_profile
                          : profileData?.profile_image
                      }
                      alt="media house"
                    />
                  </div>
                </Nav>
              </Navbar>
            </div>
          </Container>
        </Navbar>
        <div className="feedHeader searchHeader">
          <Container fluid className="">
            <Row className="justify-content-between">
              <Col md={6} sm={6} className="p-0">
                <div className="feedSearch srch_prnt">
                  <input
                    fullWidth
                    className="inputDark"
                    placeholder="Search content"
                    onChange={onKeyUp}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const inputValue = e.target.value.startsWith("#")
                          ? e.target.value.slice(1).toLowerCase()
                          : e.target.value.toLowerCase();
                        addTrendingSearch(inputValue);
                        navigate(
                          `/content-search/${encodeURIComponent(inputValue)}`
                        );
                      }
                    }}
                  />
                  <HiOutlineSearch />

                  {filter && filter.length ? (
                    <div className="srch_rsults_wrap">
                      <ul className="srch_list">
                        {filter &&
                          filter.map((curr) => {
                            return (
                              <li className="srch_item">
                                {" "}
                                <Link
                                  to={`/content-search/${encodeURIComponent(
                                    curr?.name
                                  )}`}
                                  onClick={() =>
                                    addTrendingSearch(curr?.name.toLowerCase())
                                  }
                                >
                                  {curr?.name}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col md={5} sm={6} className="p-0">
                <div className="icons-wrap nav-right d-flex justify-content-end align-items-center">
                  <div className="iconheaders notifications_hdr_opt">
                    <Tooltip title="Notifications">
                      <span onClick={() => setShow(true)} className="clickable">
                        <img src={notifyic} alt="notifications" />
                      </span>
                    </Tooltip>
                    <span className="msg-count">{count}</span>
                    {show && (
                      <div className="notifications_wrap">
                        <div className="ntf_hdr">
                          <div className="notf_icn_wrp">
                            <img
                              src={ntf_hdr}
                              className="ntf_icn"
                              alt="Notification bell"
                            />
                            <span className="ntf_count">{count}</span>
                          </div>
                          <p className="hdng">Notifications</p>
                          <span onClick={handleClose}>
                            <img
                              src={closeic}
                              height="17px"
                              className="icn close"
                              alt="Close"
                            />
                          </span>
                        </div>
                        <div className="notf_srch">
                          <FiSearch className="searchIcon" />
                          <input
                            type="text"
                            className="notf_srch_inp"
                            placeholder="Search"
                            onChange={(e) =>
                              setSearchQuery(e.target.value.toLowerCase())
                            }
                          />
                          {/* <img src={fltric} className="icn filter" alt="" /> */}
                        </div>
                        <div
                          className="notify_clear"
                          onClick={() => handelDeleteNotification()}
                        >
                          <button className="clear-btn">Clear all</button>
                        </div>
                        {/* notfication content Start */}
                        <div className="notfs_list">
                          {searchQuery
                            ? data
                                ?.filter(
                                  (el) =>
                                    el?.body
                                      ?.toLowerCase()
                                      .includes(searchQuery) ||
                                    el?.sender_id?.user_name
                                      ?.toLowerCase()
                                      .includes(searchQuery) ||
                                    el?.sender_id?.name
                                      ?.toLowerCase()
                                      .includes(searchQuery)
                                )
                                ?.map((curr) => {
                                  return (
                                    <div
                                      className="notf_wrp"
                                      onClick={() => read(curr?._id)}
                                    >
                                      <div
                                        className={`notf_item ${
                                          !curr?.is_read ? "active" : null
                                        }`}
                                      >
                                        {curr?.sender_id?.role === "Hopper" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.sender_id?.avatar_ids?.[0]
                                                ?.avatar
                                            }
                                            className="notf_img"
                                            alt=""
                                          />
                                        ) : curr?.sender_id?.role ==
                                          "MediaHouse" ? (
                                          <img
                                            src={curr?.sender_id?.profile_image}
                                            className="notf_img"
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_ADMIN_IMAGE +
                                              curr?.sender_id?.profile_image
                                            }
                                            className="notf_img"
                                            alt=""
                                          />
                                        )}
                                        <div className="notf_cont_rt">
                                          <p className="notf_usr d-flex align-items-center justify-content-between">
                                            {curr?.sender_id?.role === "Hopper"
                                              ? curr?.sender_id?.user_name
                                              : curr?.sender_id?.name}
                                            <span className="notf_time_txt">
                                              {/* {moment(curr?.createdAt).format("hh:mm A DD MMMM YYYY")} */}
                                              {moment(curr?.createdAt).format(
                                                "hh:mm A, DD MMM YYYY"
                                              )}

                                              {/* , {" "} */}
                                              {/* {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )} */}
                                            </span>
                                          </p>
                                          <p className="notf_txt">
                                            {curr?.title}
                                          </p>
                                          <p className="notf_txt">
                                            {curr?.body
                                              .split(
                                                "(here has to be a hyperlink)"
                                              )
                                              .map((part, index) => {
                                                if (index === 1) {
                                                  return (
                                                    <>
                                                      <Link
                                                        to={`/Feeddetail/content/${curr?.content_id}`}
                                                      >
                                                        Click here
                                                      </Link>
                                                      {part}
                                                    </>
                                                  );
                                                }
                                                return part;
                                              })}
                                          </p>

                                          {curr?.promo_code_link ? (
                                            <button
                                              className="notify_clear clear-btn"
                                              onClick={() => {
                                                let promoCode =
                                                  curr?.promo_code_link;
                                                if (promoCode) {
                                                  navigator.clipboard
                                                    .writeText(promoCode)
                                                    .then(() => {
                                                      alert(
                                                        "Promo code copied to clipboard!"
                                                      );
                                                    })
                                                    .catch((err) => {
                                                      console.error(
                                                        "Failed to copy promo code:",
                                                        err
                                                      );
                                                    });
                                                } else {
                                                  console.error(
                                                    "Promo code is undefined"
                                                  );
                                                }
                                              }}
                                            >
                                              Copy Promo Code
                                            </button>
                                          ) : (
                                            ""
                                          )}

                                          {curr?.content_link ? (
                                            <button
                                              // className="notf_txt"
                                              className=" notify_clear clear-btn"
                                              onClick={() => {
                                                let itemLink =
                                                  curr?.content_link;
                                                console.log(
                                                  "itemLink",
                                                  itemLink
                                                );

                                                if (itemLink) {
                                                  window.location.href =
                                                    itemLink;
                                                } else {
                                                  console.error(
                                                    "itemLink is undefined"
                                                  );
                                                }
                                              }}
                                            >
                                              Link
                                            </button>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                            : data?.map((curr) => {
                                return (
                                  <div
                                    className="notf_wrp"
                                    onClick={() => read(curr?._id)}
                                  >
                                    <div
                                      className={`notf_item ${
                                        !curr?.is_read ? "active" : null
                                      }`}
                                    >
                                      {curr?.sender_id?.role === "Hopper" ? (
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.sender_id?.avatar_ids?.[0]
                                              ?.avatar
                                          }
                                          className="notf_img"
                                          alt=""
                                        />
                                      ) : curr?.sender_id?.role ==
                                        "MediaHouse" ? (
                                        <img
                                          src={curr?.sender_id?.profile_image}
                                          className="notf_img"
                                          alt=""
                                        />
                                      ) : (
                                        <img
                                          src={
                                            process.env.REACT_APP_ADMIN_IMAGE +
                                            curr?.sender_id?.profile_image
                                          }
                                          className="notf_img"
                                          alt=""
                                        />
                                      )}
                                      <div className="notf_cont_rt">
                                        <p className="notf_usr d-flex align-items-center justify-content-between">
                                          {curr?.sender_id?.role === "Hopper"
                                            ? curr?.sender_id?.user_name
                                            : curr?.sender_id?.name}
                                          <span className="notf_time_txt">
                                            {/* {moment(curr?.createdAt).format("DD MMMM YYYY")}, {" "}
                                        {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )} */}
                                            {moment(curr?.createdAt).format(
                                              "hh:mm A, DD MMM YYYY"
                                            )}
                                          </span>
                                        </p>

                                        <p className="notf_txt">
                                          {curr?.title}
                                        </p>
                                        <p className="notf_txt">
                                          {curr?.body
                                            .split(
                                              "(here has to be a hyperlink)"
                                            )
                                            .map((part, index) => {
                                              if (index === 1) {
                                                return (
                                                  <>
                                                    <Link
                                                      to={`/Feeddetail/content/${curr?.content_id}`}
                                                    >
                                                      Click here
                                                    </Link>
                                                    {part}
                                                  </>
                                                );
                                              }
                                              return part;
                                            })}
                                        </p>
                                        {curr?.content_link ? (
                                          <button
                                            className="notify_clear clear-btn"
                                            onClick={() => {
                                              let promoCode =
                                                curr?.content_link;
                                              console.log(
                                                "Promo Code:",
                                                promoCode
                                              );

                                              if (promoCode) {
                                                navigator.clipboard
                                                  .writeText(promoCode)
                                                  .then(() => {
                                                    console.log(
                                                      "Promo code copied !"
                                                    );
                                                    toast.success(
                                                      "Promo code copied !"
                                                    );
                                                  })
                                                  .catch((err) => {
                                                    console.error(
                                                      "Failed to copy promo code:",
                                                      err
                                                    );
                                                  });
                                              } else {
                                                console.error(
                                                  "Promo code is undefined"
                                                );
                                              }
                                            }}
                                          >
                                            {/* {curr?.promo_code_link} */}
                                            Copy Promo Code link
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                        {curr?.content_link ? (
                                          <button
                                            // className="notf_txt"
                                            className="notify_clear clear-btn"
                                            onClick={() => {
                                              let itemLink = curr?.content_link;
                                              console.log("itemLink", itemLink);
                                              // Navigate(`/${itemLink}`);
                                              if (itemLink) {
                                                window.location.href = itemLink;
                                              } else {
                                                console.error(
                                                  "itemLink is undefined"
                                                );
                                              }
                                            }}
                                          >
                                            Link
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="cart-wrap position-relative"
                    onClick={() => Navigate("/basket")}
                  >
                    <Tooltip title="Cart">
                      <span>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.910156 1.32617H5.03467C5.25712 1.32617 5.45282 1.47314 5.51485 1.68677L7.00693 6.82617M7.00693 6.82617L9.80547 16.4656C9.86749 16.6792 10.0632 16.8262 10.2856 16.8262H22.5198C22.7492 16.8262 22.9492 16.67 23.0048 16.4474L25.2548 7.44744C25.3337 7.13187 25.0951 6.82617 24.7698 6.82617H7.00693ZM11.9102 19.8262C13.4289 19.9642 14.5482 21.3074 14.4102 22.8262C14.2852 24.2012 13.2852 25.2012 11.9102 25.3262C10.3914 25.4642 9.04823 24.345 8.91016 22.8262C8.76015 21.1761 10.2601 19.6762 11.9102 19.8262ZM21.4102 19.8262C22.9289 19.9642 24.0482 21.3074 23.9102 22.8262C23.7852 24.2012 22.7852 25.2012 21.4102 25.3262C19.8914 25.4642 18.5482 24.345 18.4102 22.8262C18.2602 21.1761 19.7601 19.6762 21.4102 19.8262Z"
                            stroke="white"
                          />
                        </svg>
                      </span>
                    </Tooltip>
                    <span className="msg-count">{cartCount}</span>
                  </div>

                  <Tooltip title="Dark mode" onClick={toggleDarkMode}>
                    <span>
                      {isDarkMode ? <IoMoon /> : <IoMoonOutline color="#fff" />}
                    </span>
                  </Tooltip>
                  <Link to={"/contact-us-post"}>
                    <Tooltip title="Contact us">
                      <img src={contactic} alt="" />
                    </Tooltip>
                  </Link>
                  <Dropdown className="iconheaders menu_cstm_drpdn d-flex align-items-center">
                    <Dropdown.Toggle id="dropdown-basic" className="p-0">
                      <Tooltip title="Menu">
                        <img src={setngic} alt="setting icon" />
                      </Tooltip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="drpMenu_hdr">
                        <p className="menu_hdng">Menu</p>
                        <MdClose
                          onClick={() => {
                            setModalShow(true);
                          }}
                        />
                      </div>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => {
                          setModalShow(true);
                          setProfileType("My");
                        }}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={myprofileic}
                            alt="my profile"
                            className="menu_img"
                          />
                          My profile
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => {
                          setModalShow(true);
                          setProfileType("Edit");
                        }}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={editic}
                            alt="my profile"
                            className="menu_img"
                          />{" "}
                          Edit profile
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => Navigate("/manage-users")}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={usric}
                            alt="my profile"
                            className="menu_img"
                          />
                          Manage users
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => Navigate("/upload-doc-post")}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={uploadicdocsic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Upload documents
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item className="d-flex justify-content-between align-items-center">
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/published-content")}
                        >
                          <img
                            src={viewcontentic}
                            alt="my profile"
                            className="menu_img"
                          />
                          View feed
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item className="d-flex justify-content-between align-items-center">
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/broadcasted-taks")}
                        >
                          <img
                            src={viewtaskic}
                            alt="my profile"
                            className="menu_img"
                          />
                          View tasks
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>

                      <Dropdown.Item className="d-flex justify-content-between align-items-center">
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/archieve-dates")}
                        >
                          <img
                            src={archive}
                            alt="my profile"
                            className="menu_img"
                          />
                          View archive
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>

                      <Dropdown.Item className="d-flex justify-content-between align-items-center">
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/accounts")}
                        >
                          <img
                            src={accountsic}
                            alt="my profile"
                            className="menu_img"
                          />
                          View accounts
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      {/* <Dropdown.Item className="d-flex justify-content-between align-items-center">
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/accounts")}
                        >
                          <img
                            src={bankic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Manage payment methods
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item> */}
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        to={"/rating-and-review"}
                      >
                        <div
                          className="menu_itm_wrp d-flex align-items-center"
                          onClick={() => Navigate("/rating-and-review")}
                        >
                          <img
                            src={ratingic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Ratings & reviews
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        to={"/contact-us-post"}
                        onClick={() => Navigate("/contact-us-post")}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={dropcontactic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Contact PressHop
                          {/* <span style={{ fontSize: "16px" }}> Press</span>
                          <span className="italicTxt italicTxtP">Hop</span> */}
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => Navigate("/post-login-tandc")}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={legalic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Legal T&Cs
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => Navigate("/privacy-policy")}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={privacypolicyic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Privacy policy
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex justify-content-between align-items-center"
                        onClick={() => {
                          SignOut();
                          disableDarkMode();
                        }}
                      >
                        <div className="menu_itm_wrp d-flex align-items-center">
                          <img
                            src={logoutic}
                            alt="my profile"
                            className="menu_img"
                          />
                          Logout
                        </div>
                        <MdKeyboardArrowRight />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Myprofilemd1
        show={modalShow}
        update={handleShow}
        profileType={profileType}
      />
    </>
  );
};

export default memo(Header);
