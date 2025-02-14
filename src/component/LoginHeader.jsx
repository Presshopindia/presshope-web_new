import React, { memo, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import LogoBlack1 from "../assets/images/darkLogo.png";
import LogoBlack1 from "../assets/images/presshop_new_logo.png";
// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

// STYLES
import "../Navbar.scss";
const HeaderN = ({ scrollToDiv }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const location = useLocation();
  const navigate = useNavigate();

  function handleScrollToDiv(div) {
    if (location.pathname == "/login") {
      navigate("/landing-page");
    }
    console.log("hellodiv", div);
    scrollToDiv(div);
  }

  useEffect(() => {}, []);
  return (
    <>
      <Navbar className="headerNav pre_nav presshop_logo">
        <Container
          fluid
          className="justify-content-between align-items-center cont-pdng p-0"
        >
          <div className="logo-wrap">
            <Navbar.Brand>
              <Link to={"/landing-page"}>
                <img src={LogoBlack1} alt="PressHop" />
              </Link>
            </Navbar.Brand>
          </div>

          {/* responsive header start */}
          <div className="resp_hdr pre_login_hdr">
            <IconContext.Provider value={{ color: "#FFF" }}>
              <div className="navbar resp">
                <Link to="#" className="menu-bars">
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
              </div>
              <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                  <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>

                  <li className="nav-text">
                    <Link
                      // onClick={() =>handleScrollToDiv("div1")}
                      to="/landing-page?q=div1"
                    >
                      <span>About PressHop</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      //  onClick={() =>handleScrollToDiv("div2")}
                      to="/landing-page?q=div2"
                    >
                      <span>Platform</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      to="/landing-page?q=div3"
                      //  onClick={() => scrollToDiv("div3")}
                    >
                      <span>Features</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      //  onClick={() => scrollToDiv("div4")}
                      to="/landing-page?q=div4"
                    >
                      <span>Reports</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      //  onClick={() => scrollToDiv("div5")}
                      to="/landing-page?q=div5"
                    >
                      <span>FAQs</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      to={"/login"}
                      className="authbtns"
                      style={{ fontFamily: "AirbnbBold" }}
                    >
                      <span>Log in</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link
                      to={"/onboard"}
                      className="authbtns"
                      style={{ fontFamily: "AirbnbBold" }}
                    >
                      <span>Onboard</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </IconContext.Provider>
          </div>
          {/* responsive header end */}

          <div className="nav-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto center-links lndg_nav_links">
                <NavLink
                  //   onClick={() => navigate("/landing-page?q='div1'")}
                  to="/landing-page?q=div1"
                  className="active nav-link"
                >
                  About PressHop
                </NavLink>
                <NavLink
                  //   onClick={() => navigate(`/landing-page?q=div2`)}
                  to="/landing-page?q=div2"
                  className="nav-link"
                >
                  Platform
                </NavLink>
                <NavLink
                //   onClick={() => scrollToDiv("div3")}
                to="/landing-page?q=div3"
                  className="nav-link"
                >
                  Features
                </NavLink>
                <NavLink
                  //   onClick={() => scrollToDiv("div4")}
                  to="/landing-page?q=div4"
                  className="nav-link"
                >
                  Reports
                </NavLink>
                <NavLink
                  //   onClick={() => scrollToDiv("div5")}
                  to="/landing-page?q=div5"
                  className="nav-link"
                >
                  FAQs
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="authbtns header_btn"
                  style={{ fontFamily: "AirbnbBold" }}
                >
                  <span className="headAuth">Log in</span>
                </NavLink>
                <NavLink
                  to={"/onboard"}
                  className="authbtns header_btn"
                  style={{ fontFamily: "AirbnbBold" }}
                >
                  <span className="headAuth">Onboard</span>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default memo(HeaderN);
