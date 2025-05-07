import React, { memo ,useState} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoBlack1 from "../assets/images/presshop_new_logo.png";
// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
const HeaderNPost = ({ scrollToDiv, activeHeader }) => {

    const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  console.log("activeHeader",activeHeader)
  return (
    <>
      <Navbar className="headerNav presshop_logo">
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
          <div className="nav-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="me-auto center-links lndg_nav_links">
                                <NavLink to={'/dashboard/exclusive'}
                                
                                 className="active nav-link">
                                    Dashboard
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div1')}
                                //  className="active nav-link"
                                className={activeHeader=="div1"?"bg-red":""}
                                 >
                                    About PressHop
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div2')} className="nav-link">
                                    Platform
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div3')} className="nav-link">
                                    Features
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div4')} className="nav-link">
                                    Reports
                                </NavLink>
                                <NavLink onClick={() => scrollToDiv('div5')} className="nav-link">
                                    FAQs
                                </NavLink>
                            </Nav> */}
              <Nav className="me-auto center-links lndg_nav_links">
                <NavLink
                  to={"/dashboard/exclusive"}
                  className="active nav-link"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  onClick={() => scrollToDiv("div1")}
                  // className="active nav-link"
                  className={
                    activeHeader == "div1" ? "nav-linkActiveNav" : "nav-link"
                  }
                >
                  About PressHop
                </NavLink>
                <NavLink
                  className={
                    activeHeader == "div2" ? "nav-linkActiveNav" : "nav-link"
                  }
                  onClick={() => scrollToDiv("div2")}
                  // className="nav-link"
                >
                  Platform
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div3")}
                  // className="nav-link"
                  className={
                    activeHeader == "div3" ? "nav-linkActiveNav" : "nav-link"
                  }
                >
                  Features
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div4")}
                  // className="nav-link"
                  className={
                    activeHeader == "div4" ? "nav-linkActiveNav" : "nav-link"
                  }
                >
                  Reports
                </NavLink>
                <NavLink
                  onClick={() => scrollToDiv("div5")}
                  // className="nav-link"
                  className={
                    activeHeader == "div5" ? "nav-linkActiveNav" : "nav-link"
                  }
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
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default memo(HeaderNPost);
