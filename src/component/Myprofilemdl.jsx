import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment/moment";
import React, { memo, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import countryNames from 'react-phone-number-input/locale/en'
import { parsePhoneNumber } from "libphonenumber-js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import calendaric from "../assets/images/calendar.svg";
import departmentic from "../assets/images/chair.svg";
import followersic from "../assets/images/follower.svg";
import emailic from "../assets/images/mail.svg";
import officeic from "../assets/images/office.svg";
import user from "../assets/images/user.svg";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "./Loader";
import { Slide } from 'react-toastify';
import editProfileIcn from "../assets/images/editProfileIc.svg";
import { useDarkMode } from "../context/DarkModeContext";

const Myprofilemdl = (props) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [edit, setEdit] = useState(false);
  const [designation, setDesignation] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const toggle = () => setEdit(!edit);
  const { setProfileChange, profileData } = useDarkMode();

  const Profile = async () => {
    try {
      const resp = await Get(`mediaHouse/getProfile`);
      let offices;
      if (resp?.data?.profile?.role == "User_mediaHouse" || resp?.data?.profile?.role == "Adduser") {
        offices = await Get(`mediaHouse/getOfficeDetail?company_vat=${resp?.data?.profile?.user_id?.company_vat}`);
      }
      else {
        offices = await Get(`mediaHouse/getOfficeDetail?company_vat=${resp?.data?.profile?.company_vat}`);
      }
      setOfficeList(offices?.data?.data)
      setProfile(resp.data.profile);
    } catch (error) {
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("path", "user");
    formData.append("media", file);

    setLoading(true);
    try {
      const response = await Post("mediaHouse/uploadUserMedia", formData);
      setProfile((prev) => ({
        ...prev,
        profile_image: response.data.path, // Update profile image URL with the uploaded image URL
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleAdminImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("path", "user");
    formData.append("media", file);

    setLoading(true);
    try {
      const response = await Post("mediaHouse/uploadUserMedia", formData);
      setProfile((prev) => ({
        ...prev,
        admin_detail: {
          ...prev.admin_detail,
          admin_profile: response.data.path
        },
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const EditProfile = async () => {
    setLoading(true);

    let obj = {
      first_name: profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser" ? profile?.first_name : profile?.user_first_name,
      last_name: profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser" ? profile?.last_name : profile?.user_last_name,
      full_name: profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser" ? `${profile?.first_name} ${profile?.last_name}` : `${profile?.user_first_name} ${profile?.user_last_name}`,
      phone: profile?.phone,
      email: profile?.email,
      designation_id: profile?.designation_id,
      country_code: profile?.country_code,
      profile_image: profile?.profile_image,
      admin_detail: profile?.admin_detail || profile?.user_id?.admin_detail,
    };

    if (profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser") {
      obj.company_name = profile?.company_name
    }

    try {
      const resp = await Patch(`mediaHouse/editProfile`, obj);
      // console.log(resp, "<---------resp of edit profile");
      if (resp) {
        setProfileChange((prev) => !prev)
        props.update();
        setLoading(false);
        toast.success('Successfully updated. Thank you', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
  };

  useEffect(() => {
    Profile();
    getDesignation();
  }, []);


  // Example function to get country code from calling code
  function getCountryCodeFromCallingCode(callingCode) {
    try {
      console.log("Callingcode", callingCode)
      const phoneNumber = parsePhoneNumber(`${callingCode}`);
      return phoneNumber?.country;
    } catch (error) {
      console.log("Error parsing phone number:", error.message);
    }
  }

  console.log("Profile", profile)

  return (
    <>
      {
        loading && <Loader />
      }
      <div className="admin_popup_dtl">
        <Modal
          show={props.show}
          aria-labelledby="contained-modal-title-hcenter"
          onHide={() => props.update()}
          className="modal_wrapper my_profile_modal"
          dialogClassName="my-modal">
          <Modal.Header className="profile_mdl_hdr_wrap" closeButton>
            <Modal.Title className="modal-title profile_modal_ttl">
              <p className="mb-0">{props.profileType === "My" ? "My profile" : "Edit Profile"}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid modal-body border-0 profile_mdl_body">
            <Container className="p-0">
              <div className="profile_img">
                <img src={profile?.role == "MediaHouse" ? profile?.profile_image : profile?.media_house_id?.profile_image} />
                {
                  props.profileType != "My" ?
                    <div className="EditProfileImgWrap">
                      <label htmlFor="profilePicInput" className="editProfilepic">
                        <img src={editProfileIcn} alt="Upload Profile Image" />
                        <input
                          type="file"
                          id="profilePicInput"
                          onChange={handleImageChange}
                          disabled={props.profileType == "My"}
                        />
                      </label>
                    </div>
                    : null
                }
              </div>
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Company name</label>
                  <Form.Group className="mb-4 form-group">
                    <img src={followersic} alt="" />
                    <Form.Control
                      type="text"
                      size="sm"
                      name="company_name"
                      disabled={(props.profileType == "My") ? true : false}
                      value={profile?.role == "MediaHouse" ? profile?.company_name : profile?.media_house_id?.company_name}
                      className="user"
                      placeholder="Reuters Media"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* </div> */}
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Onboarded on</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy inp_icn" src={calendaric} alt="" />
                    <Form.Control
                      type="text"
                      disabled
                      placeholder="dd/mm/yyyy"
                      value={moment(profile?.createdAt).format("DD MMM YYYY")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {
                profile?.role != "User_mediaHouse" || profile?.role != "Adduser" ? <div className="profile_img">
                  <img src={profile?.role == "MediaHouse" ? profile?.admin_detail?.admin_profile : profile?.profile_image} />
                  {
                    props.profileType != "My" ?
                      <div className="EditProfileImgWrap">
                        <label htmlFor="profilePicInputs" className="editProfilepic">
                          <img src={editProfileIcn} alt="Upload Profile Image" />
                          <input
                            type="file"
                            id="profilePicInputs"
                            style={{ display: "none" }}
                            onChange={handleAdminImageChange}
                            disabled={props.profileType == "My"}
                          />
                        </label>
                      </div> : null
                  }
                </div> : null
              }
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>First name</label>
                  <Form.Group className="mb-4 form-group">
                    <img src={user} alt="" />
                    <Form.Control
                      type="text"
                      size="sm"
                      disabled={props.profileType == "My"}
                      className="user"
                      name="first_name"
                      placeholder="First Name"
                      value={profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser" ? profile?.first_name : profile?.user_first_name}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[A-Za-z]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                  <label>Last name</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy icn" src={user} alt="" />
                    <Form.Control
                      type="text"
                      className=""
                      disabled={props.profileType == "My"}
                      name="last_name"
                      placeholder="Last Name"
                      value={profile?.role !== "User_mediaHouse" || profile?.role !== "Adduser" ? profile?.last_name : profile?.user_last_name}
                      onChange={handleChange}
                      onKeyPress={(event) => {
                        if (!/[A-Za-z]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {props.profileType == "My" ? (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Office name</label>
                    <Form.Group className="mb-4 form-group">
                      <img
                        className="privacy inp_icn"
                        src={officeic}
                        alt=""
                      />
                      <Form.Control
                        type="text"
                        className=""
                        value={profile?.role == "User_mediaHouse" || profile?.role == "Adduser" ? profile?.office_id?.name : officeList?.find((el) => el._id == profile?.admin_detail?.office_name)?.name}
                        disabled={props.profileType == "My"}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Office name</label>
                    {
                      profile?.role == "User_mediaHouse" || profile?.role == "Adduser"
                        ?
                        <Form.Group className="mb-4 form-group">
                          <img
                            className="privacy inp_icn"
                            src={officeic}
                            alt=""
                          />
                          <Form.Control
                            type="text"
                            className=""
                            value={profile?.role == "User_mediaHouse" || profile?.role == "Adduser" ? profile?.office_id?.name : officeList?.find((el) => el._id == profile?.admin_detail?.office_name)?.name}
                            disabled={true}
                          />
                        </Form.Group>
                        :
                        <Form.Group className="mb-4 d-flex position-relative form-group">
                          <img
                            className="privacy inp_icn"
                            src={officeic}
                            alt=""
                          />
                          <Select
                            className="w-100 "
                            value={
                              profile?.admin_detail?.office_name
                            }
                            name="office_name"
                            onChange={(e) => setProfile({ ...profile, admin_detail: { ...profile.admin_detail, office_name: e.target.value } })}
                          >
                            <MenuItem
                              value="option1"
                              className="selectPlaceholder"
                            >
                              Select Office
                            </MenuItem>
                            {officeList?.map((item) => {
                              return (
                                <MenuItem value={item._id}>{item.name}</MenuItem>
                              );
                            })}
                          </Select>
                        </Form.Group>
                    }
                  </Col>
                )}
                {props.profileType == "My" ? (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Department</label>
                    <Form.Group className="mb-4 form-group">
                      <img
                        className="privacy inp_icn"
                        src={departmentic}
                        alt=""
                      />
                      <Form.Control
                        type="text"
                        className=""
                        value={designation?.filter((el => el._id == profile?.designation_id || profile?.designation))?.[0]?.name}
                        disabled={props.profileType == "My"}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                    <label>Department</label>
                    <Form.Group className="mb-4 d-flex position-relative form-group">
                      <img
                        className="privacy inp_icn"
                        src={departmentic}
                        alt=""
                      />
                      <Select
                        className="w-100 "
                        value={
                          profile?.designation_id ? profile?.designation_id : profile?.designation
                        }
                        name="designation_id"
                        onChange={handleChange}
                      >
                        <MenuItem
                          value="option1"
                          // disabled
                          className="selectPlaceholder"
                        >
                          Select Designation
                        </MenuItem>
                        {designation &&
                          designation.map((item) => {
                            return (
                              <MenuItem value={item._id}>{item.name}</MenuItem>
                            );
                          })}
                      </Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex">
                  <label>Mobile number</label>
                  <div className={`mb-4 number_inp_wrap ${props.profileType == "My" ? "dsblBgClr" : ""}`}>
                    {/* Phone start */}
                    <input
                      className="input_nmbr"
                      type="number"
                      size="sm"
                      disabled={props.profileType == "My"}
                      name="phone"
                      value={profile?.phone}
                      pattern="^\d{10}$"
                      onChange={handleChange}
                    />
                    <PhoneInput
                      className="f_1 cntry_code"
                      international
                      required
                      countryCallingCodeEditable={true}
                      name="country_code"
                      defaultCountry={`${getCountryCodeFromCallingCode(profile?.role == "User_mediaHouse" || profile?.role == "Adduser" ? profile?.country_code + profile?.phone : profile?.admin_detail?.country_code + profile?.phone)}`}
                      value={profile?.role == "User_mediaHouse" || profile?.role == "Adduser" ? profile?.country_code : profile?.admin_detail?.country_code}
                      onChange={(value) => {
                        profile?.role == "User_mediaHouse" || profile?.role == "Adduser" ? setProfile((prevProfile) => ({
                          ...prevProfile,
                          country_code: value
                        })) : setProfile((prevProfile) => ({
                          ...prevProfile,
                          admin_detail: {
                            ...prevProfile.admin_detail,
                            country_code: value
                          }
                        }))

                      }
                      }
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} sm={6} className="rw_inn_flex">
                  <label>Email address</label>
                  <Form.Group className="mb-4 form-group">
                    <img className="privacy icn" src={emailic} alt="" />
                    <Form.Control
                      type="text"
                      disabled={props.profileType === "My"}
                      name="email"
                      value={profile?.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          {props.profileType === "My" ? null : <Modal.Footer className="profile_mdl_ftr border-0 mb-4">
            <Button
              className="mdl_ftr_btn w-50 m-auto d-inline-block py-2 text-lowercase"
              variant="primary"
              onClick={() => { toggle(); EditProfile(); }}
            >
              <Link className="mdl_btn mdl_link white">
                {"Save Profile"}
              </Link>
            </Button>
          </Modal.Footer>}

        </Modal>
      </div>
    </>
  );
};

export default memo(Myprofilemdl);
