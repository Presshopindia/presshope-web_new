import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import LoginHeader from "../component/LoginHeader";
import Footerlandingpage from "../component/Footerlandingpage";
import { Post, Get } from "../services/user.services";
import user from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";
import website from "../assets/images/sortIcons/political.svg";
import marketPlaceDemo from "../assets/images/marketPlaceDemo.png";
import accessCenter from "../assets/images/accessCenter.png";
import follower from "../assets/images/follower.svg";
import hash from "../assets/images/hash.svg";
import chair from "../assets/images/chair.svg";
import location from "../assets/images/location.svg";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { isValidPhoneNumber } from "react-phone-number-input";
import "../EditableStyle.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const searchBoxRefPostalCode = useRef(null);
  const [showPostalCodePopUp, setPostalCodePopUp] = useState(false);
  
  // Load Google Maps API
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    publication_name: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    address: {
      country: "",
      city: "",
      pincode: "",
      complete_address: "",
    }
  });
  
  const handlePostalCodePopUp = () => {
    setPostalCodePopUp(true);
  };
  
  // Google map address for postal code
  const onMapLoadPostalCode = (index) => {
    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRefPostalCode.current
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      
      const place = places[0];
      
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      
      let city = "";
      let postcode = "";
      let country = "";
      
      // Extract address components
      for (const component of place.address_components) {
        const componentType = component.types[0];
        
        if (componentType === "postal_code") {
          postcode = component.long_name;
        }
        
        if (componentType === "locality" || componentType === "postal_town") {
          city = component.long_name;
        }
        
        if (componentType === "country") {
          country = component.long_name;
        }
      }
      
      // Update the form data with the address information
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          city: city,
          pincode: postcode,
          country: country,
          complete_address: place.formatted_address,
        }
      });
      
      // Close the popup after selection
      setPostalCodePopUp(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value
    });
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: ""
      });
    }
  };

  // Fetch departments from API
  const getDepartmentTypes = async () => {
    try {
      const response = await Get("mediaHouse/getDepartmentType");
      if (response && response.data && response.data.data) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch designations from API
  const getDesignations = async () => {
    try {
      const response = await Get("mediaHouse/getCategoryType?type=designation");
      if (response && response.data && response.data.data) {
        setDesignations(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  useEffect(() => {
    getDepartmentTypes();
    getDesignations();
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.publication_name.trim()) newErrors.publication_name = "Publication name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.address.pincode) newErrors.post_code = "Post code is required";
    if (!formData.address.complete_address) newErrors.complete_address = "Full address is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    console.log("formData========", formData);
    return

    try {
      const obj = {
        email: formData.email,
        password: "test@123456",
        userType: "demo"
      };
      const response = await Post("mediaHouse/registerCompany", formData);

      if (response && response.data) {
        toast.success("You’re on the list! Get ready to change the way you source stories");
        navigate("/landing-page");
      }

      // const resp = await Post("auth/loginMediaHouse", obj);
      // if (resp) {
      //   setLoading(false);
      //   toast.success("Registration successful! Our team will contact you shortly.");
      //   navigate("/dashboard/exclusive");
      //   localStorage.setItem("token", resp.data.token);
      //   localStorage.setItem("id", resp.data.user._id);
      //   localStorage.setItem("user", JSON.stringify(resp.data.user));

      //   window.location.reload();

      // }

    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else if (error?.response?.data?.errors?.msg) {
        toast.error(error?.response?.data?.errors?.msg.split("_").join(" "));
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginHeader />
      {loading && <Loader />}
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success">
            <Row className="row-w-m m-0">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className="onboardMain onboardStep">
                    <div className="onboardIntro sign_section border-bottom-0">
                      <h1 className="mb-0 position-relative">Ready to Hop in? We’ve saved you a seat
                      </h1>
                      <p className="mb-4">
                        Join the early wave of publishers getting ahead. Sign up for our exclusive waitlist to bag priority access and a cheeky discount — when we launch soon.
                      </p>
                    </div>

                    <Col lg="12" className="companyDetails sign_section rw_gp_sml adminDetails officeDetails">
                      {/* <h2 className="section-heading">Company Details</h2> */}
                      <Form onSubmit={handleSubmit} className="regit-newfrom">
                        <Row className="comp_frm_gap row_gap_20">
                          <Col md="6">
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={user} alt="user icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.first_name ? "is-invalid" : ""}`}
                                placeholder="First Name *"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                              />
                              {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                            </Form.Group>
                          </Col>
                          <Col md="6">
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={user} alt="user icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.last_name ? "is-invalid" : ""}`}
                                placeholder="Last Name *"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                              />
                              {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                            </Form.Group>
                          </Col>
                          <Col md="6" className="mb-0">
                            <div className="input-field mb-0">
                              <img className="frnt_ic" src={follower} alt="company icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.publication_name ? "is-invalid" : ""}`}
                                placeholder="Publication  name *"
                                name="publication_name"
                                value={formData.publication_name}
                                onChange={handleChange}
                              />
                              {errors.publication_name && <div className="invalid-feedback">{errors.publication_name}</div>}
                            </div>
                          </Col>
                          <Col md="6" className="mb-0">
                            <div className="input-field mb-0">
                              <img className="frnt_ic" src={location} alt="company icon" />
                              <Form.Control
                                placeholder="Post code *"
                                className={`rnd grey ${errors.post_code ? "is-invalid" : ""}`}
                                type="text"
                                name="post_code"
                                onFocus={handlePostalCodePopUp}
                                onClick={handlePostalCodePopUp}
                                ref={searchBoxRefPostalCode}
                                value={formData.address.pincode}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    address: {
                                      ...formData.address,
                                      pincode: e.target.value
                                    }
                                  });
                                  if (errors.post_code) {
                                    setErrors({
                                      ...errors,
                                      post_code: ""
                                    });
                                  }
                                }}
                              />
                              {showPostalCodePopUp && isLoaded && (
                                <div className="map-popup">
                                  <GoogleMap
                                    onLoad={() => onMapLoadPostalCode(0)}
                                  />
                                </div>
                              )}
                              {errors.post_code && <div className="invalid-feedback">{errors.post_code}</div>}
                            </div>

                          </Col>


                          <Col md="12">
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={location} alt="website icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.complete_address ? "is-invalid" : ""}`}
                                placeholder="Full Address *"
                                name="complete_address"
                                value={formData.address.complete_address}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    address: {
                                      ...formData.address,
                                      complete_address: e.target.value
                                    }
                                  });
                                  if (errors.complete_address) {
                                    setErrors({
                                      ...errors,
                                      complete_address: ""
                                    });
                                  }
                                }}
                              />
                              {errors.complete_address && <div className="invalid-feedback">{errors.complete_address}</div>}
                            </Form.Group>
                          </Col>
                          {/* <Col md="12">
                            <h2 className="section-heading">Employee Details</h2>
                          </Col> */}

                          <Col md={6}>
                            <Form.Group className="form-group">
                              <img src={chair} alt="" />
                              <Select
                                className={`w-100 slct_sign ${!formData.department ? 'placeholder-showing' : ''}`}
                                labelId="department-label"
                                id="department"
                                name="department"
                                value={formData.department || ""}
                                label="Department *"
                                onChange={handleChange}
                                error={!!errors.department}
                                displayEmpty
                                renderValue={value => {
                                  return value ? departments.find(dept => dept._id === value)?.name : "Select department";
                                }}
                                sx={{
                                  '& .MuiSelect-select': {
                                    color: formData.department ? 'inherit' : '#6c757d'
                                  }
                                }}
                              >
                                {departments.map((dept) => (
                                  <MenuItem className="selectPlaceholder" key={dept._id} value={dept._id}>
                                    {dept.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {errors.department && <div className="text-danger small mt-1">{errors.department}</div>}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="form-group">
                              <img src={chair} alt="" />
                              <Select
                                className={`w-100 slct_sign ${!formData.designation ? 'placeholder-showing' : ''}`}
                                labelId="designation-label"
                                id="designation"
                                name="designation"
                                value={formData.designation || ""}
                                label="designation *"
                                onChange={handleChange}
                                error={!!errors.designation}
                                displayEmpty
                                renderValue={value => {
                                  return value ? designations.find(design => design._id === value)?.name : "Select designation";
                                }}
                                sx={{
                                  '& .MuiSelect-select': {
                                    color: formData.designation ? 'inherit' : '#6c757d'
                                  }
                                }}
                              >
                                {designations.map((dept) => (
                                  <MenuItem className="selectPlaceholder" key={dept._id} value={dept._id}>
                                    {dept.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {errors.designation && <div className="text-danger small mt-1">{errors.designation}</div>}
                            </Form.Group>
                          </Col>

                          <Col md="6">
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={mail} alt="mail icon" />
                              <Form.Control
                                type="email"
                                className={`rnd grey ${errors.email ? "is-invalid" : ""}`}
                                placeholder="Email *"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </Form.Group>
                          </Col>
                          <Col md="6" className="phone-input-container">
                            <div className="phone-wrapper">
                              <PhoneInput
                                international
                                defaultCountry="GB"
                                value={formData.phone}
                                placeholder="Phone Number *"
                                onChange={handlePhoneChange}
                                className={`form-control phone-field ${errors.phone ? "is-invalid" : ""}`}
                              />
                              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>
                          </Col>

                        </Row>

                        <Button
                          variant=""
                          type="submit"
                          className="theme-btn custom-ab w-100 sm_btn mt-5"
                        >
                          <span>Register</span>
                        </Button>

                      </Form>
                    </Col>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="rt_col pos_stick position-relative">
                <div className="right-side position-relative">
                  <span className="shape yl_sqr pos-abs"></span>
                  <span className="shape bl_crcl pos_abs"></span>
                  <span className="shape gr_tri pos_abs"></span>
                  <span className="shape rd_crcl pos_abs"></span>
                  <div className="left-side text-center">
                    <img src={accessCenter} className="signupBigImg" alt="" />
                    <h2>
                      Let's start delivering{" "}
                      <span className="txt_bld">news</span>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footerlandingpage />
    </>
  );
};

export default Register; 