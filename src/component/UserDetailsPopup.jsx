import React, { memo, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import chair from "../assets/images/chair.svg";
import user from "../assets/images/user.svg";
import addPic from "../assets/images/add-square.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import emailic from "../assets/images/mail.svg";
import officeicon from "../assets/images/office.svg";

import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import Loader from "./Loader";

const UserDetailsPopup = (props) => {
  const navigate = useNavigate();
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [office, setOffice] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [mediahouseListLoading, setMediahouseListLoading] = useState(false);
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
  });

  const handleChange = async (e) => {
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

  const [mediahouseList, setMediahouseList] = useState([]);
  const getMediahouseList = async (search = "") => {
    try {
      setMediahouseListLoading(true);
      const list = await Get(`auth/mediahouse-list?search=${search}`);
      const updatedData = list?.data?.data?.map((el) => {
        return {
          ...el,
          label: `${el?.company_name}`
        }
      })
      setMediahouseList(updatedData);
      setMediahouseListLoading(false);
    }
    catch (error) {
      setMediahouseListLoading(false);
    }
  };

  // Phone input ref-
  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        localStorage.setItem("requsetregisterId", list?.data?.data?._id);
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

  useEffect(() => {
    getDesignation();
    getDepartmentType();
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((value) => {
    getMediahouseList(value);
  }, 500);

  return (
    <>
      {loading && <Loader />}
      <div className="admin_popup_dtl">
        <Modal
          show={show}
          {...props}
          aria-labelledby="contained-modal-title-hcenter profile_mdl"
          className="modal_wrapper "
          dialogClassName="my-modal adm_reg_mdl mdl_dsn add_usr_mdl"
        >
          <Form onSubmit={handleSubmit}>
            <Modal.Header
              className="modal-header profile_mdl_hdr_wrap"
              closeButton
            >
              <Modal.Title className="modal-title profile_modal_ttl ">
                <p className="mb-0">Hello new user</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid modal-body border-0">
              <Container>
                <Row className="mb-4">
                  <p className="bg_lbl">Administrator details</p>
                  <Col>
                    <Autocomplete
                      name="administator_email"
                      size="small"
                      className="w-100 slct_sign"
                      options={mediahouseList}
                      loading={mediahouseListLoading}
                      noOptionsText="No data found"
                      getOptionLabel={(option) => option?.company_name}
                      onInputChange={(event, value) => handleSearch(value)}
                      onChange={async (event, newValue) => {
                        setDetails({ ...details, "administator_email": newValue?.email })
                        if (newValue?.email) {
                          const list = await Post("mediaHouse/getOfficeListBasedUponMediahouseEmail", { email: newValue?.email });
                          setOffice(list?.data?.data);
                        }
                      }}
                      renderOption={(props, option) => (
                        <li {...props} className="mediahouse-list" key={option?.email}>
                          <img src={option?.profile_image} alt={option?.company_name} />
                          <span>{option?.company_name}</span>
                        </li>
                      )}
                      renderInput={(params) => <TextField {...params} placeholder="Enter your company name OR company number" />}
                    />
                  </Col>
                </Row>
                <div>
                  <p className="bg_lbl">Your details</p>
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
                            <img src={chair} alt="" />
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
                            <img src={chair} alt="" />
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
                              countryCallingCodeEditable={false}
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
                          <img src={emailic} alt="" />
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
                        </Form.Group>
                      </Col>
                    </Row>
                  </Row>
                </div>

                <Col md={12} className="mb-3">
                  <Row>
                    <div className="term_conditions">
                      <p className="text_condition mb-3">
                        Please enter your details above, and send your
                        onboarding request to your company administrator. Once
                        the administrator onboards, and assigns user rights to
                        you, you can then log onto the <b>PressHop</b> platform
                      </p>
                      <p className="text_condition mb-0">
                        If you have any questions regarding the onboarding
                        process, please <a className="link">chat</a> with our
                        helpful team members, or send us an{" "}
                        <a className="link"> email</a>
                      </p>
                    </div>
                  </Row>
                </Col>
              </Container>
            </Modal.Body>
            <Modal.Footer className="border-0 mb-4">
              <Button
                className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
                variant="primary"
                type="submit"
              >
                <div className="link_white">Onboard Me</div>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default memo(UserDetailsPopup);
