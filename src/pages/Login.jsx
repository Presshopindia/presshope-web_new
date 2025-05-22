import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import loginimg from "../assets/images/forloginimg.png";
// import loginimg from "../assets/images/forlogin.png";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import Footerlandingpage from "../component/Footerlandingpage";
import { v4 as uuidv4 } from "uuid";
import Loader from "../component/Loader";
import LoginHeader from "../component/LoginHeader";

import locationImg from "../assets/images/location.svg";
import PhoneInput from "react-phone-number-input";
import user from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";
import follower from "../assets/images/follower.svg";
import chair from "../assets/images/chair.svg";
import { MenuItem, Select } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { isValidPhoneNumber } from "react-phone-number-input";
import "../EditableStyle.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const phoneInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const searchBoxRefPostalCode = useRef(null);
  const [showPostalCodePopUp, setPostalCodePopUp] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [existingEmail, setExistingEmail] = useState("");
  const [existingEmailError, setExistingEmailError] = useState("");

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
    email,
    phone: "",
    address: {
      country: "",
      city: "",
      pincode: "",
      complete_address: "",
    }
  });

  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const obj = {
        ...formData,
        password: "test@123456",
        userType: "demo"
      };

      const resp = await Post("auth/loginMediaHouse", obj);
      if (resp) {
        setLoading(false);
        navigate("/dashboard/exclusive");
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("id", resp.data.user._id);
        localStorage.setItem("user", JSON.stringify(resp.data.user));

        window.location.reload();

      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error?.response?.data?.errors?.msg.split("_").join(" "));
      }
      setLoading(false);
    }
  };

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
      country_code: value,
    });
    if (errors.phone) {
      setErrors({
        ...errors,
        country_code: ""
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
    if (!formData.publication_name.trim()) newErrors.publication_name = "Company name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.address.pincode) newErrors.post_code = "Post code is required";
    if (!formData.address.complete_address) newErrors.complete_address = "Address is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShare = async () => {
    try {
      const currentUrl = "https://demo.presshop.news";
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);

      // Reset the button text after 5 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleExistingUserLogin = async (e) => {
    e.preventDefault();
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!existingEmail) {
      setExistingEmailError("Email is required");
      return;
    } else if (!emailRegex.test(existingEmail)) {
      setExistingEmailError("Please enter a valid email address");
      return;
    } else {
      setExistingEmailError("");
    }
    setLoading(true);
    try {
      const resp = await Post("auth/loginMediaHouse", {
        email: existingEmail,
        password: "test@123456",
        userType: "demo"
      });
      if (resp) {
        setLoading(false);
        navigate("/dashboard/exclusive");
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("id", resp.data.user._id);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        window.location.reload();
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error?.response?.data?.errors?.msg.split("_").join(" "));
      }
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
                  <div className='onboardMain onboardStep'>

                    <div className="onboardIntro sign_section border-bottom-0">
                      <h1 className="mb-0 position-relative">Hop right in - the Scoop's waiting</h1>

                      <div className="onboardStep b_border top_txt">
                        <p>
                          Welcome to <span className="txt-success">PressHop</span> — the home of real stories, told in real time.
                        </p>
                        <p>
                          Pop in your details below to jump into the demo and explore what the buzz is all about.
                        </p>
                        <p>
                          By logging into the <span className="txt-success">PressHop</span> demo, you're registering your interest. We'll keep you in the loop with launch updates and all the good stuff coming your way. Fancy a look at the fine print? You can read our <span className="txt-success-link"><Link to="/pre-login-tandc">T&Cs</Link></span> here.
                        </p>
                        <p>
                          This access lasts for 30 days, so feel free to pass it along to your colleagues while it's live. Need a bit more time? No bother — just drop us a line at <span className="txt-success-link"><Link to="/contact-us">Contact Us</Link></span> and we'll happily sort you out with an extension
                        </p>
                      </div>
                    </div>
                    <Col lg="12" className="companyDetails sign_section rw_gp_sml adminDetails officeDetails">
                      <Form onSubmit={Submit} className="regit-newfrom">
                        <Row>
                          <Col md="6" className={`form-group-wrapper ${errors.first_name ? 'mb-5 has-error' : ''}`}>
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={user} alt="user icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.first_name ? "is-invalid" : ""}`}
                                placeholder="First name *"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                              />
                              {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                            </Form.Group>
                          </Col>
                          <Col md="6" className={`form-group-wrapper ${errors.last_name ? 'mb-5 has-error' : ''}`}>
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={user} alt="user icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.last_name ? "is-invalid" : ""}`}
                                placeholder="Last name *"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                              />
                              {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                            </Form.Group>
                          </Col>
                          <Col md="6" className={`form-group-wrapper ${errors.publication_name ? 'mb-5 has-error' : ''}`}>
                            <div className="input-field mb-0">
                              <img className="frnt_ic" src={follower} alt="company icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.publication_name ? "is-invalid" : ""}`}
                                placeholder="Company name *"
                                name="publication_name"
                                value={formData.publication_name}
                                onChange={handleChange}
                              />
                              {errors.publication_name && <div className="invalid-feedback">{errors.publication_name}</div>}
                            </div>
                          </Col>
                          <Col md="6" className={`form-group-wrapper ${errors.post_code ? 'mb-5 has-error' : ''}`}>
                            <div className="input-field mb-0">
                              <img className="frnt_ic" src={locationImg} alt="company icon" />
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
                              {errors.post_code && <div className="invalid-feedback">{errors.post_code}</div>}
                              {showPostalCodePopUp && isLoaded && (
                                <div className="map-popup">
                                  <GoogleMap
                                    onLoad={() => onMapLoadPostalCode(0)}
                                  />
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="12" className={`form-group-wrapper ${errors.complete_address ? 'mb-5 has-error' : ''}`}>
                            <Form.Group className="position-relative mb-0 input-field">
                              <img className="frnt_ic" src={locationImg} alt="website icon" />
                              <Form.Control
                                type="text"
                                className={`rnd grey ${errors.complete_address ? "is-invalid" : ""}`}
                                placeholder="Address *"
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
                          <Col md={6} className={`form-group-wrapper ${errors.department ? 'mb-5 has-error' : ''}`}>
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
                          <Col md={6} className={`form-group-wrapper ${errors.designation ? 'mb-5 has-error' : ''}`}>
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
                          <Col md="6" className={`form-group-wrapper ${errors.email ? 'mb-5 has-error' : ''}`}>
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
                          <Col md={6}>
                            <div className="number_inp_wrap forloginpage">
                              <input
                                type="number"
                                className="input_nmbr"
                                placeholder="Phone"
                                name="phone"
                                onChange={(e) => {
                                  if (e.target.value.length <= 10) {
                                    handleChange(e)
                                  }
                                }}
                                maxLength={10}
                                value={formData.phone || ""}
                                ref={phoneInputRef}
                              />
                              <PhoneInput
                                className="f_1 cntry_code"
                                international
                                required
                                name="country_code"
                                value={formData?.country_code || ""}
                                onChange={(e) => {
                                  handlePhoneChange(e)
                                  handleCountryCodeChange(e)
                                }}
                              />
                            </div>
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-between btm_btns gap-4">
                          <Button
                            variant=""
                            className="theme-btn custom-ab w-100 cntct_btn sm_btn"
                            type="submit"
                          >
                            Log In
                          </Button>
                          <Button
                            variant="secondary"
                            className="custom-ab w-100 cntct_btn sm_btn emal-btn"
                            onClick={handleShare}
                          >
                            {isCopied ? "Copied!" : "Share"}
                          </Button>
                        </div>
                      </Form>
                    </Col>
                    {/* Highlighted Login for Existing Users */}
                    <div className="existing-user-login-box">
                      <div className="existing-user-login-message">
                      Already on board? Let’s not waste time — pop in your email and away you go
                      </div>
                      <form
                        onSubmit={handleExistingUserLogin}
                        className="existing-user-login-form"
                        autoComplete="off"
                      >
                        <div style={{ position: 'relative', flex: 1 }}>
                          <img className="frnt_ic" src={mail} alt="mail icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, pointerEvents: 'none' }} />
                          <input
                            type="email"
                            placeholder="Email *"
                            value={existingEmail}
                            onChange={e => { setExistingEmail(e.target.value); setExistingEmailError(""); }}
                            className="existing-user-login-input"
                            style={{ paddingLeft: 38 }}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="existing-user-login-button"
                        >
                          Let's Go
                        </button>
                      </form>
                      {existingEmailError && (
                        <div style={{ color: '#ec4e54', fontSize: 13, marginTop: 6, marginLeft: 2 }}>{existingEmailError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="">
                <div className="left-side forposition">
                  <span className="shape gr_tri pos_abs"></span>
                  <span className="shape yl_sqr pos-abs"></span>
                  {/* <span className="shape rd_crcl pos_abs"></span> */}
                  <div className="px-3 p-3 text-center">
                    <img src={loginimg} className="rt_bg_img w-100" />
                  </div>
                  <div className="right_txt text-center">
                    <h2>
                      Let's start delivering{" "}
                      <span className="txt_bld">news</span>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container >
      </div >
      <Footerlandingpage />
    </>
  );
};

export default Login;
