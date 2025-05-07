import React, { memo, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoBlack1 from "../assets/images/presshop_new_logo.png";
// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

// STYLES
import "../Navbar.scss";
const HeaderN = ({ scrollToDiv,activeHeader}) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  console.log("activeHeader",activeHeader)
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
                    className={activeHeader=="div1"?"bg-red":""} 
                     onClick={() => scrollToDiv("div1")}>
                      <span>About PressHop</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link 
                    className={activeHeader=="div2"?"bg-red":""} 

                    onClick={() => scrollToDiv("div2")}>
                      <span>Platform</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link onClick={() => scrollToDiv("div3")}>
                      <span>Features</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link onClick={() => scrollToDiv("div4")}>
                      <span>Reports</span>
                    </Link>
                  </li>
                  <li className="nav-text">
                    <Link onClick={() => scrollToDiv("div5")}>
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
                      to={"/register"}
                      className="authbtns"
                      style={{ fontFamily: "AirbnbBold" }}
                    >
                      <span>Register</span>
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
                  onClick={() => scrollToDiv("div1")}
                  // className="active nav-link"
                  className={activeHeader=="div1"?"nav-linkActiveNav":"nav-link"} 

                >
                  About PressHop
                </NavLink>
                <NavLink
                  className={activeHeader=="div2"?"nav-linkActiveNav":"nav-link"} 
                  onClick={() => scrollToDiv("div2")}
                  // className="nav-link"
                >
                  Platform
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div3")}
                  // className="nav-link"
                  className={activeHeader=="div3"?"nav-linkActiveNav":"nav-link"} 

                >
                  Features
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div4")}
                  // className="nav-link"
                  className={activeHeader=="div4"?"nav-linkActiveNav":"nav-link"} 

                >
                  Reports
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div5")}
                  // className="nav-link"
                  className={activeHeader=="div5"?"nav-linkActiveNav":"nav-link"} 

                >
                  FAQs
                </NavLink>
                <NavLink
                  to={"/register"}
                  className="authbtns header_btn"
                  style={{ fontFamily: "AirbnbBold", marginLeft: "10px" }}
                >
                  <span className="headAuth">Register</span>
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="authbtns header_btn"
                  style={{ fontFamily: "AirbnbBold" }}
                >
                  <span className="headAuth">Log in</span>
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
