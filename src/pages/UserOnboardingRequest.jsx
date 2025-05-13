import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, MenuItem, Select } from "@mui/material";

import Loader from "../component/Loader";
import DbFooter from "../component/DbFooter";
import HeaderN from "../component/HeaderN";

import user from "../assets/images/user.svg";
import companyNameImg from "../assets/images/follower.svg";
import chairImg from "../assets/images/chair.svg";
import mailImg from "../assets/images/mail.svg";
import officeIcon from "../assets/images/office.svg";
import userIcon from "../assets/images/user.svg";
import accessCenter from "../assets/images/accessCenter.png";
import newUserBg from "../assets/images/new_user_bg.svg";
import addPic from "../assets/images/add-square.svg";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import hash from "../assets/images/hash.svg";
import Receipt from "../assets/images/Receipt.svg";
import Password from "../assets/images/passoword.svg";
import { parsePhoneNumber } from "libphonenumber-js/core";
import { formatAmountInMillion } from "../component/commonFunction";
import location from "../assets/images/location.svg";
import website from "../assets/images/sortIcons/political.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ImageCrop from "../component/ImageCrop";

const UserOnboadingRequest = () => {
  const [loading, setLoading] = useState(false);
  const [startOnboarding, setStartOnboarding] = useState(false);
  const [error, setError] = useState({});
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [office, setOffice] = useState([]);
  const [officeDetails, setOfficeDetails] = useState({});
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageFile, setTempImageFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    full_name: "",
    user_first_name: "",
    user_last_name: "",
    email: "",
    administator_full_name: "",
    administator_first_name: "",
    administator_last_name: "",
    administator_email: "",
    office_id: "",
    designation_id: "",
    department_id: "",
    phone: "",
    country_code: "",
    profile_image: "",
    company_number: "",
    company_vat: "",
    password: "",
    confirm_password: "",
    admin_rignts: {
      allowed_to_onboard_users: true,
      allowed_to_deregister_users: true,
      allowed_to_assign_users_rights: true,
      allowed_to_set_financial_limit: true,
      allowed_complete_access: true,
      allowed_to_broadcast_tasks: true,
      allowed_to_purchase_content: true,
      allow_to_chat_externally: true,
      price_range: {
        minimum_price: 1,
        maximum_price: 1000,
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details?.password !== details?.confirm_password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const obj = {
      ...details,
      user_first_name: details?.full_name?.split(" ")?.[0],
      user_last_name: details?.full_name?.split(" ")?.slice(1)?.join(" "),
      first_name: details?.full_name?.split(" ")?.[0],
      last_name: details?.full_name?.split(" ")?.slice(1)?.join(" "),
      administator_first_name: details?.administator_full_name?.split(" ")?.[1],
      administator_last_name: details?.administator_full_name?.split(" ")?.[1],
    };

    try {
      const list = await Post(`mediaHouse/userRegisteration`, obj);
      if (list) {
        toast.success("Successfully registered");
        setLoading(false);

        const onboardDetails = {
          AdminName: details?.full_name,
        };
        localStorage.setItem("OnboardDetails", JSON.stringify(onboardDetails));

        navigate("/Success");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.errors?.msg);
      setError({
        email: error?.response?.data?.errors?.msg.includes("E11000")
          ? "This email already exists"
          : "",
      });
    }
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  // Function to fetch office details
  const getOfficeDetails = async (id) => {
    console.log(id)
    setLoading(true);
    try {
      const data = await Get(`mediaHouse/getOfficeDetail?office_id=${id}`);
      if (data) {
        setLoading(false);
        setOfficeDetails(data.data.data);
      }
    }
    catch (error) {
      setLoading(false);
      console.log(error)
    }
  };

  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getCategoryType?type=department");
    setDepartmentTypes(list.data.data);
  };

  const getAdministrator = async () => {
    try {
      setLoading(true);
      const administratorDetails = await Get(`auth/administratorInfo?id=${id}`);
      setDetails({
        ...details,
        administator_email: administratorDetails?.data?.data?.email,
        administator_full_name: administratorDetails?.data?.data?.full_name,
        designation: administratorDetails?.data?.data?.designation?.name,
        company_name: administratorDetails?.data?.data?.company_name,
        company_number: administratorDetails?.data?.data?.company_number,
        company_vat: administratorDetails?.data?.data?.company_vat
      })

      if (administratorDetails?.data?.data?.email) {
        const data = await Post("mediaHouse/getOfficeListBasedUponMediahouseEmail", { email: administratorDetails?.data?.data?.email });
        setOffice(data?.data?.data);
        if (data?.data?.data?.length > 0) {
          const firstOffice = data.data.data[0];
          setDetails(prev => ({
            ...prev,
            office_id: firstOffice._id
          }));
          getOfficeDetails(firstOffice._id);
        }
        setLoading(false)
      }
    }
    catch (error) {
      setLoading(false);
    }
  };

  const phoneInputRef2 = useRef(null);
  useEffect(() => {
    const phoneInput = document.querySelector(".p_2");
    const inputElement = phoneInputRef2.current;

    const handleFocus = () => {
      inputElement.focus();
    };
    phoneInput?.addEventListener("click", handleFocus);

    return () => {
      phoneInput?.removeEventListener("click", handleFocus);
    };
  }, []);

  const profileImageInputRef = useRef(null);

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setTempImageFile(e.target.files[0]);
      setShowCropModal(true);
      // Reset the file input value
      profileImageInputRef.current.value = '';
    }
  };

  const handleCropComplete = async (croppedFile) => {
    await UseProfile(croppedFile);
    setTempImageFile(null);
  };

  // Modify the existing UseProfile function
  const UseProfile = async (file) => {
    setLoading(true);
    const Formdata = new FormData();
    Formdata.append("path", "user");
    Formdata.append("media", file);
    try {
      const filepath = await Post("mediaHouse/uploadUserMedia", Formdata);
      setDetails((prev) => ({
        ...prev,
        profile_image: filepath.data.path,
      }));
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error("Failed to process image");
    }
  };

  // Phone input ref-
  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current?.focus();
  };

  useEffect(() => {
    getDesignation();
    getDepartmentType();
    getAdministrator();
  }, []);

  return (
    <>
      <HeaderN />
      {loading && <Loader />}
      <div className="page-wrap login-page sign p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              {
                !startOnboarding ? (
                  <>
                    <Col lg="6" className="bg-white p-0">
                      <div className="login_stepsWrap left-pdng">
                        <div className="onboardMain">
                          <div className="onboardIntro">
                            <h1 className="mb-0 pb-30">Hello new user</h1>
                          </div>
                          <div className="onboardStep">
                            <div className="companyDetails sign_section">
                              <p className="onbrdheading sign_hdng">
                                Administrator details
                              </p>
                              <Row>
                                <Col lg={4} md={4} xs={12}>
                                  <Form.Group className="form-group">
                                    <img src={user} alt="" />
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      className="user invite-user-disable-field"
                                      value={details?.administator_full_name}
                                      disabled
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={8} md={8} xs={12} className="mb-3">
                                  <Form.Group className="form-group">
                                    <img src={companyNameImg} alt="" />
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      className="user invite-user-disable-field"
                                      value={details?.company_name}
                                      disabled
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={4} md={4} xs={12}>
                                  <Form.Group className="form-group">
                                    <img src={chairImg} alt="" />
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      className="user invite-user-disable-field"
                                      value={details?.designation}
                                      disabled
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={8} md={8} xs={12}>
                                  <Form.Group className="form-group">
                                    <img src={mailImg} alt="" />
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      className="user invite-user-disable-field"
                                      value={details?.administator_email}
                                      disabled
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </div>
                            <div className="onboardStep b_border top_txt">
                              <p>
                                Great news! Your administrator has invited you to join <span className='txt-success'>PressHop</span>.
                              </p>
                              <p>
                                {/* If you need any assitance, please <span className='txt-success-link'><Link to="/contact-us">contact us</Link></span> and speak to our helpful team members who will be glad to assist you. Thanks! */}
                                Simply enter your details, log in and dive straight into the citizen journalism revolution taking the UK by storm. It's quick, easy, and you're in control!
                              </p>
                              <p>
                                Need a hand? Please <span className='txt-success-link'><Link to="/contact-us">contact</Link></span> our friendly PressHop team who are just a click away and ready to help.
                              </p>
                            </div>
                            <Button
                              className="mt-4 d-inline-block py-2 text-lowercase mdl_btn"
                              variant="primary"
                              type="submit"
                              fullWidth
                              onClick={() => setStartOnboarding(true)}
                            >
                              <div className="link_white">Onboard Now</div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg="6" className="pos_stick position-relative">
                      <div className="right-side position-relative">
                        <div className="left-side text-center news-img">
                          <img src={newUserBg} alt="" />
                          <h2>
                            Building {" "}
                            <span className="txt_bld">our tribe together</span> {" "} one step at a time
                          </h2>
                        </div>
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col lg="6" className="bg-white p-0">
                      <div className="login_stepsWrap left-pdng">
                        <div className="onboardMain">
                          <div className="onboardIntro">
                            <h1 className="mb-0">Let's get you onboarded</h1>
                            <div className="onboardStep b_border">
                              <p className="mb_20">
                              You're good to go! Your admin has pre-assigned you access and rights — simply pop in your details, log in, and dive into the exciting world of <span className="txt-success">PressHop</span>.
                              </p>
                            </div>
                          </div>
                          <div className="onboardStep">
                            {/* Details */}
                            <div className="companyDetails sign_section">
                              <p className="onbrdheading sign_hdng">
                                Company Details
                              </p>
                              <Row>
                                <Col md={4} className="mb-4">
                                  <Form.Group className="form-group">
                                    <img src={companyNameImg} alt="company" />
                                    <Form.Control
                                      type="text"
                                      className="invite-user-disable-field"
                                      disabled
                                      name="company_name"
                                      required
                                      placeholder="Company name *"
                                      value={details?.company_name}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="form-group">
                                    <img src={hash} alt="company" />
                                    <Form.Control
                                      type="number"
                                      className="invite-user-disable-field"
                                      disabled
                                      name="company_number"
                                      required
                                      placeholder="Company number *"
                                      value={details?.company_number}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="form-group">
                                    <img src={Receipt} alt="company" />
                                    <Form.Control
                                      type="text"
                                      className="invite-user-disable-field"
                                      disabled
                                      name="company_vat"
                                      required
                                      placeholder="Company VAT *"
                                      value={details?.company_vat}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </div>

                            {/* Office Details */}
                            <div className="officeDetails sign_section">
                              <Form>
                                <p className="onbrdheading sign_hdng">
                                  Office details
                                </p>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={officeIcon} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        placeholder="Enter office name *"
                                        name="name"
                                        required
                                        value={officeDetails?.name}
                                        disabled
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={chairImg} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        placeholder="Enter office type *"
                                        name="name"
                                        required
                                        disabled
                                        value={officeDetails?.office_type_id?.name}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={12}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={location} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        placeholder="Apartment number/Bulding name *"
                                        name="pincode"
                                        disabled
                                        value={officeDetails?.address?.complete_address}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={4} className="">
                                    <Form.Group className="mb-4 form-group">
                                      <img src={location} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        placeholder="Post code"
                                        name="pincode"
                                        disabled
                                        value={officeDetails?.address?.pincode}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={location} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        disabled
                                        placeholder="City"
                                        name="city"
                                        value={officeDetails?.address?.city}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={location} alt="" />
                                      <Form.Control
                                        type="text"
                                        className="invite-user-disable-field"
                                        disabled
                                        placeholder="Country"
                                        name="country"
                                        value={officeDetails?.address?.country}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <div className="number_inp_wrap invite-user-disable-field">
                                      <input
                                        type="number"
                                        className="input_nmbr invite-user-disable-field"
                                        name="phone"
                                        disabled
                                        placeholder="Phone"
                                        required
                                        value={officeDetails?.phone}
                                        maxLength={10}
                                      />
                                      <PhoneInput
                                        className="f_1 cntry_code p_1 invite-user-disable-field country_code_container"
                                        international
                                        required
                                        countryCallingCodeEditable={true}
                                        name="country_code"
                                        value={officeDetails?.country_code}
                                      />
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={website} alt="" />
                                      <Form.Control
                                        type="url"
                                        className="invite-user-disable-field"
                                        disabled
                                        placeholder="Website"
                                        name="website"
                                        required
                                        value={officeDetails?.website}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </Form>
                            </div>

                            {/* Admin Details */}
                            <div className="adminDetails sign_section">
                              <Form>
                                <p className="onbrdheading sign_hdng">
                                  New user details
                                </p>
                                <Row>
                                  <Col md={9}>
                                    <Row>
                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={userIcon} alt="" />
                                          <Form.Control
                                            type="text"
                                            className=""
                                            value={details?.full_name}
                                            placeholder="Enter Full name"
                                            name="first_name"
                                            onChange={(e) =>
                                              setDetails((pre) => ({
                                                ...pre,
                                                full_name: e.target.value,
                                              }))
                                            }
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={chairImg} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            name="designation"
                                            value={
                                              details?.designation_id || "option1"
                                            }
                                            placeholder="Select designation"
                                            onChange={(e) =>
                                              setDetails((prev) => ({
                                                ...prev,
                                                designation_id: e.target.value,
                                              }))
                                            }
                                          >
                                            <MenuItem
                                              disabled
                                              className="selectPlaceholder"
                                              value="option1"
                                            >
                                              Select Designation
                                            </MenuItem>
                                            {designations &&
                                              designations.map((value, index) => (
                                                <MenuItem
                                                  key={value._id}
                                                  value={value._id}
                                                >
                                                  {value.name}
                                                </MenuItem>
                                              ))}
                                          </Select>
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={officeIcon} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            value={
                                              details?.office_id || "option1"
                                            }
                                            name="office_id"
                                            onChange={async (e) => {
                                              setDetails((pre) => ({
                                                ...pre,
                                                office_id: e.target.value,
                                              }))
                                              getOfficeDetails(e.target.value)
                                            }}
                                          >
                                            <MenuItem
                                              disabled
                                              className="selectPlaceholder"
                                              value="option1"
                                            >
                                              Select office name
                                            </MenuItem>
                                            {office &&
                                              office.map((value, index) => {
                                                return (
                                                  <MenuItem value={value._id}>
                                                    {value.name}
                                                  </MenuItem>
                                                );
                                              })}
                                          </Select>
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={chairImg} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            value={
                                              details?.department_id || "option1"
                                            }
                                            name="department"
                                            onChange={(e) =>
                                              setDetails((pre) => ({
                                                ...pre,
                                                department_id: e.target.value,
                                              }))
                                            }
                                          >
                                            <MenuItem
                                              disabled
                                              className="selectPlaceholder"
                                              value="option1"
                                            >
                                              Select Department
                                            </MenuItem>
                                            {departmentTypes &&
                                              departmentTypes.map((value, index) => {
                                                return (
                                                  <MenuItem value={value._id}>
                                                    {value.name}
                                                  </MenuItem>
                                                );
                                              })}
                                          </Select>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col md={3} className="mb-4">
                                    <div className="currentPic logo_inp position-relative text-center">
                                      {details?.profile_image === "" && (
                                        <img src={addPic} alt="" />
                                      )}
                                      {details?.profile_image !== "" && (
                                        <img
                                          className="uploaded"
                                          src={details?.profile_image}
                                          alt=""
                                        />
                                      )}
                                      {details?.profile_image === "" && (
                                        <span className="mt-2 d-block">
                                          Add current photo
                                        </span>
                                      )}
                                      <input
                                        ref={profileImageInputRef}
                                        type="file"
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                      />
                                    </div>
                                  </Col>

                                  <Col md={6} className="admn_numb_wrap mb-4">
                                    <div className="number_inp_wrap w-100">
                                      <input
                                        type="number"
                                        required
                                        className="input_nmbr"
                                        value={details.phone}
                                        placeholder="Enter mobile number"
                                        name="phone"
                                        onChange={(e) =>
                                          e.target.value?.length <= 10
                                            ? setDetails((pre) => ({
                                              ...pre,
                                              phone: e.target.value,
                                            }))
                                            : ""
                                        }
                                        ref={phoneInputRef}
                                      />
                                      <PhoneInput
                                        className="f_1 cntry_code p_2"
                                        international
                                        countryCallingCodeEditable={true}
                                        required
                                        name="country_code"
                                        value={details?.country_code || ""}
                                        onChange={(e) => {
                                          setDetails((pre) => ({
                                            ...pre,
                                            country_code: e,
                                          }));
                                          handleCountryCodeChange(e);
                                        }}
                                      />
                                    </div>
                                  </Col>

                                  <Col md={6} className="admn_eml_wrp mb-4">
                                    <Form.Group className="form-group position-relative w-100">
                                      <img
                                        src={mailImg}
                                        className="eml_inp_icn"
                                        alt=""
                                      />
                                      <Form.Control
                                        type="email"
                                        required
                                        className=""
                                        value={details.email}
                                        placeholder="Official email id *"
                                        name="office_email"
                                        onChange={(e) => {
                                          setDetails((pre) => ({
                                            ...pre,
                                            email: e.target.value,
                                          }));
                                        }}
                                      />
                                      {/* {emailExist && (
                                        <span
                                          style={{ color: "red" }}
                                          className="eml_txt_dngr"
                                        >
                                          This email already exists
                                        </span>
                                      )} */}
                                    </Form.Group>
                                  </Col>

                                  <Col md={6} className="admn_eml_wrp">
                                    <Form.Group className="form-group position-relative w-100">
                                      <img
                                        src={Password}
                                        className="eml_inp_icn"
                                        alt=""
                                      />
                                      <Form.Control
                                        type={!visibility1 ? "password" : "text"}
                                        required
                                        className=""
                                        value={details.password}
                                        placeholder="Choose new password *"
                                        name="password"
                                        onChange={(e) => {
                                          setDetails((pre) => ({
                                            ...pre,
                                            password: e.target.value,
                                          }));
                                          setErrorMessage("")
                                        }}
                                      />
                                      <div className="pass_ic_wrap">
                                        {
                                          visibility1 ? <BsEye onClick={() => setVisibility1(false)} /> : <BsEyeSlash onClick={() => setVisibility1(true)} />
                                        }
                                      </div>
                                      {errorMessage && (
                                        <span className="errorInput">
                                          {errorMessage}
                                        </span>
                                      )}
                                    </Form.Group>
                                  </Col>

                                  <Col md={6} className="admn_eml_wrp">
                                    <Form.Group className="form-group position-relative w-100">
                                      <img
                                        src={Password}
                                        className="eml_inp_icn"
                                        alt=""
                                      />
                                      <Form.Control
                                        type={!visibility2 ? "password" : "text"}
                                        required
                                        className=""
                                        value={details.confirm_password}
                                        placeholder="Confirm password *"
                                        name="password"
                                        onChange={(e) => {
                                          setDetails((pre) => ({
                                            ...pre,
                                            confirm_password: e.target.value,
                                          }));
                                          setErrorMessage("")
                                        }}
                                      />
                                      <div className="pass_ic_wrap">
                                        {
                                          visibility2 ? <BsEye onClick={() => setVisibility2(false)} /> : <BsEyeSlash onClick={() => setVisibility2(true)} />
                                        }
                                      </div>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </Form>
                            </div>

                            {/* Rights */}
                            <Form onSubmit={handleSubmit}>
                              <div className="adminDetails sign_section">
                                <p className="onbrdheading sign_hdng">Pre-approved user rights</p>
                                <Row>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      control={<Checkbox />}
                                      checked={
                                        details?.admin_rignts
                                          ?.allowed_complete_access
                                      }
                                      name="allowed_complete_access"
                                      label="Allowed complete access"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      control={<Checkbox />}
                                      checked={
                                        details?.admin_rignts
                                          .allowed_to_broadcast_tasks
                                      }
                                      name="allowed_to_broadcast_tasks"
                                      label="Allowed to broadcast tasks"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      control={<Checkbox />}
                                      checked={
                                        details?.admin_rignts
                                          .allow_to_chat_externally
                                      }
                                      name="allow_to_chat_externally"
                                      label="Allowed to chat externally"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label afterCheck"
                                      control={<Checkbox defaultChecked />}
                                      checked={
                                        details?.admin_rignts
                                          .allowed_to_purchase_content
                                      }
                                      name="allowed_to_purchase_content"
                                      label="Allowed to purchase content"
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <div className="d-flex set_price">
                                      <p className="mb-0 white_space">
                                        Set price range
                                      </p>
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <Form.Group className="mb-4 form-group">
                                            <input
                                              disabled
                                              className="w-100 invite-user-disable-field"
                                              name="minimum_price"
                                              placeholder="Min Price"
                                              value={`£${formatAmountInMillion(details?.admin_rignts?.price_range?.minimum_price)}`}
                                            />
                                          </Form.Group>
                                        </div>
                                        <div className="col-lg-6">
                                          <Form.Group className="mb-4 form-group">
                                            <input
                                              disabled
                                              className="w-100 invite-user-disable-field"
                                              name="maximum_price"
                                              placeholder="Max Price"
                                              value={`£${formatAmountInMillion(details?.admin_rignts?.price_range?.maximum_price)}`}
                                            />
                                          </Form.Group>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="stepFooter">
                                <Button
                                  className="w-100"
                                  type="submit"
                                  variant="primary"
                                >
                                  Save
                                </Button>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg="6" className="pos_stick position-relative">
                      <div className="right-side position-relative">
                        <span className="shape yl_sqr pos-abs"></span>
                        <span className="shape bl_crcl pos_abs"></span>
                        <span className="shape gr_tri pos_abs"></span>
                        <span className="shape rd_crcl pos_abs"></span>
                        <div className="left-side text-center news-img">
                          <img src={accessCenter} alt="" />
                          <h2>
                            Let's start delivering{" "}
                            <span className="txt_bld">news</span>
                          </h2>
                        </div>
                      </div>
                    </Col>
                  </>
                )
              }
            </Row>
          </div>
        </Container>
      </div>
      <DbFooter />
      <ImageCrop
        show={showCropModal}
        onHide={() => {
          setShowCropModal(false);
          setTempImageFile(null);
        }}
        onCropComplete={handleCropComplete}
        initialImage={tempImageFile}
        aspectRatio={140/100}
        maxWidthCm={140}
        maxHeightCm={100}
      />
    </>
  );
};

export default UserOnboadingRequest;
