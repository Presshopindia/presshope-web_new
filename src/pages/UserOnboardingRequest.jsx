import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MenuItem, Select } from "@mui/material";

import Loader from "../component/Loader";
import DbFooter from "../component/DbFooter";
import HeaderN from "../component/HeaderN";

import user from "../assets/images/user.svg";
import companyNameImg from "../assets/images/follower.svg";
import chairImg from "../assets/images/chair.svg";
import mailImg from "../assets/images/mail.svg";
import officeicon from "../assets/images/office.svg";
import accessCenter from "../assets/images/accessCenter.png";
import addPic from "../assets/images/add-square.svg";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";

const UserOnboadingRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [office, setOffice] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    user_full_name: "",
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    administator_full_name: "",
    administator_first_name: "",
    administator_last_name: "",
    administator_email: "",
    office_id: "option1",
    designation_id: "option1",
    department_id: "option1",
    phone: "",
    country_code: "",
    profile_image: "",
    administrator_company: ""
  });

  const handleSubmit = async () => {
    setLoading(true);

    const obj = {
      ...details,
      user_first_name: details?.user_full_name?.split(" ")?.[0],
      user_last_name: details?.user_full_name?.split(" ")?.[1],
      administator_first_name: details?.administator_full_name?.split(" ")?.[1],
      administator_last_name: details?.administator_full_name?.split(" ")?.[1],
    };

    try {
      const list = await Post(`mediaHouse/userRegisteration`, obj);
      if (list) {
        toast.success("Onboarding request sent");
        setLoading(false);
        navigate("/landing-page");
      }
    } catch (error) {
      setLoading(false);
      setError({
        email: error?.response?.data?.errors?.msg.includes("E11000")
          ? "This email already exists"
          : "",
      });
    }
  };

  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };

  const handleChange = async (e) => {
    setError({})
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getDepartmentType");
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
        company_name: administratorDetails?.data?.data?.company_name
      })

      if (administratorDetails?.data?.data?.email) {
        const data = await Post("mediaHouse/getOfficeListBasedUponMediahouseEmail", { email: administratorDetails?.data?.data?.email });
        setOffice(data?.data?.data);
        setLoading(false)
      }
    }
    catch (error) {
      setLoading(false);
    }
  };

  const AddCompanyLogo = async (file) => {
    const Formdata = new FormData();
    Formdata.append("path", "user");
    Formdata.append("media", file);
    setLoading(true);
    try {
      const filepath = await Post("mediaHouse/uploadUserMedia", Formdata);
      setDetails({ ...details, profile_image: filepath.data.path });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
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
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className="onboardMain">
                    <div className="onboardIntro">
                      <h1 className="mb-0">Onboard now</h1>
                      <div className="onboardStep b_border">
                        <p className="mb_20">
                          Great news! Your administrator has invited you to join PressHop. Just fill in your details, and send your onboarding request. Once your access is set up, we'll send a new login link to your registered official email --then you're all set to dive in!
                        </p>
                      </div>
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
                      <div>
                        <p className="onbrdheading sign_hdng">
                          Your details
                        </p>
                        <Row className="rw_gp_sml">
                          <Col lg={9} md={9} sm={12}>
                            <Row className="comp_frm_gap">
                              <Col lg={6} md={6} xs={12}>
                                <Form.Group className="form-group">
                                  <img src={user} alt="" />
                                  <Form.Control
                                    type="text"
                                    pattern="\S.*"
                                    title="First Name should not start with space"
                                    size="sm"
                                    name="user_full_name"
                                    className="user"
                                    placeholder="Enter full name *"
                                    required
                                    onChange={handleChange}
                                    value={details?.user_full_name}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="form-group">
                                  <img src={chairImg} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    value={details?.designation_id}
                                    onChange={(e) => handleChange(e)}
                                    name="designation_id"
                                  >
                                    <MenuItem
                                      disabled
                                      className="selectPlaceholder"
                                      value="option1"
                                    >
                                      Select designation
                                    </MenuItem>
                                    {designation?.map((value) => (
                                      <MenuItem key={value._id} value={value._id}>
                                        {value.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="form-group">
                                  <img src={officeicon} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    value={details?.office_id}
                                    onChange={(e) => handleChange(e)}
                                    name="office_id"
                                  >
                                    <MenuItem
                                      className="selectPlaceholder"
                                      value="option1"
                                      selected
                                    >
                                      Select office name *
                                    </MenuItem>
                                    {office?.map((value) => {
                                      return (
                                        <MenuItem value={value._id} key={value._id}>
                                          {value.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="form-group">
                                  <img src={chairImg} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    value={details?.department_id}
                                    onChange={(e) => handleChange(e)}
                                    name="department_id"
                                  >
                                    <MenuItem
                                      className="selectPlaceholder"
                                      value="option1"
                                      selected
                                    >
                                      Select department *
                                    </MenuItem>
                                    <MenuItem
                                      disabled
                                      className="selectPlaceholder"
                                      value="option1"
                                    >
                                      Select department
                                    </MenuItem>
                                    {departmentTypes?.map((value) => {
                                      return (
                                        <MenuItem value={value._id} key={value._id}>
                                          {value.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={3} md={3} sm={12}>
                            <div className="currentPic logo_inp position-relative text-center">
                              <img
                                src={details?.profile_image || addPic}
                                alt=""
                                className={details?.profile_image ? "uploaded" : ""}
                              />
                              <input
                                type="file"
                                required
                                onChange={(e) => {
                                  AddCompanyLogo(e.target.files[0]);
                                }}
                              />
                            </div>
                          </Col>
                          <Row className="mt-4 mb-4 user-row">
                            <Col md={6}>
                              <div className="number_inp_wrap">
                                {/* Phone start */}
                                <input
                                  type="number"
                                  className="input_nmbr"
                                  placeholder="Phone"
                                  name="phone"
                                  onChange={(e) => {
                                    if (e.target.value.length <= 10) {
                                      handleChange(e);
                                    }
                                  }}
                                  maxLength={10}
                                  value={details?.phone}
                                  ref={phoneInputRef}
                                />
                                <div className="primry_phone_input">
                                  <PhoneInput
                                    className="f_1 cntry_code"
                                    international
                                    required
                                    // countryCallingCodeEditable={true}
                                    name="country_code"
                                    onChange={(e) => {
                                      setDetails({ ...details, country_code: e });
                                      handleCountryCodeChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col lg={6} md={6} xs={12} className="p-0">
                              <Form.Group className="form-group">
                                <img src={mailImg} alt="" />
                                <Form.Control
                                  type="email"
                                  title="First Name should not start with space"
                                  size="sm"
                                  name="user_email"
                                  className="user"
                                  placeholder="Enter email *"
                                  required
                                  onChange={(e) => handleChange(e)}
                                />
                                {error?.email && (
                                  <span className="errorInput">
                                    {error?.email}
                                  </span>
                                )}
                              </Form.Group>
                            </Col>
                          </Row>
                        </Row>
                      </div>
                      <div>
                        <p>
                          Please enter your details above, and send your onboading request to your company administrator. Once the administrator onboards, and assigns user rights to you, you can then log onto the Presshop platform.
                        </p>
                        <p>
                          If you have any questions regarding the onboarding process, please send us an email.
                        </p>
                      </div>
                      <Button
                        className="mt-4 d-inline-block py-2 text-lowercase mdl_btn"
                        variant="primary"
                        type="submit"
                        fullWidth
                        onClick={handleSubmit}
                      >
                        <div className="link_white">Onboard Me</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="pos_stick position-relative">
                <div className="right-side position-relative">
                  <div className="left-side text-center news-img">
                    <img src={accessCenter} alt="" />
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
      <DbFooter />
    </>
  );
};

export default UserOnboadingRequest;
