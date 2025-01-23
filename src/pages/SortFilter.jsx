import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoBlack1 from "../assets/images/darkLogo.png";
// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
const SortFilter = () => {
  return (
    <>
      <Navbar className="headerNav">
        <Container fluid className="justify-content-between align-items-center cont-pdng p-0">
          <div className="logo-wrap">
            <Navbar.Brand>
              <Link to={'/'}>
                <img src={LogoBlack1} alt="Presshop" />
              </Link>
            </Navbar.Brand>
          </div>
          <div className="nav-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto center-links lndg_nav_links">
                <NavLink to={'/'} className="active nav-link">
                  About Presshop
                </NavLink>
                <NavLink to={'/'} className="nav-link">
                  Platform
                </NavLink>
                <NavLink to={'/'} className="nav-link">
                  Features
                </NavLink>
                <NavLink to={'/reports/content'} className="nav-link">
                  Reports
                </NavLink>
                <NavLink to={'/'} className="nav-link">
                  FAQs
                </NavLink>
                <NavLink to={'/login'} className="authbtns" style={{'fontFamily':'AirbnbBold'}}>
                  <span className="headAuth">Log in</span>
                </NavLink>
                <NavLink to={'/onboard'} className="authbtns" style={{'fontFamily':'AirbnbBold'}}>
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

export default SortFilter;