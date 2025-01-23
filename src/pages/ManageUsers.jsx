import React, { useEffect, useRef, useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import follower from "../assets/images/follower.svg";
import hash from "../assets/images/hash.svg";
import Receipt from "../assets/images/Receipt.svg";
import accessCenter from "../assets/images/accessCenter.png";
import office from "../assets/images/office.svg";
import chair from "../assets/images/chair.svg";
import location from "../assets/images/location.svg";
import call from "../assets/images/call.svg";
import website from "../assets/images/sortIcons/political.svg";
import addPic from "../assets/images/add-square.svg";
import userLogo from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";
import "react-phone-number-input/style.css";
import Autocomplete from "react-google-autocomplete";
import {
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Get, Patch, Post } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import manageusers from "../assets/images/login-images/manage-users.svg";
import lockic from "../assets/images/sortIcons/lock.svg";
import { BsArrowLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import callic from "../assets/images/call.svg";
import { useDarkMode } from "../context/DarkModeContext";
import PhoneInput from "react-phone-number-input";
import Loader from "../component/Loader";
import { initStateOfAddUserInManageUser, manageUserTopHeading, newInitStataOfAddUserInManageUser } from "../component/staticData";
import ComputerPic from "../assets/images/computer.svg";
import editProfileIcn from "../assets/images/editProfileIc.svg";
import userImg from "../assets/images/profile_img.png";
import followersic from "../assets/images/follower.svg";
import calendaric from "../assets/images/calendar.svg";
import person from "../assets/images/user.svg";
import officeic from "../assets/images/office.svg";
import departmentic from "../assets/images/chair.svg";
import emailic from "../assets/images/mail.svg";
import calendar from "../assets/images/calendar.svg";
import userImg2 from "../assets/images/user2.jpg";
import moment from "moment";
import { parsePhoneNumber } from "libphonenumber-js";
import { formattingUserData, successToasterFun } from "../component/commonFunction";

const ManageUsers = () => {
  const { profileData } = useDarkMode();
  const user = profileData;
  const [url, setUrl] = useState();
  const [cnfm_password, setCnfmPassword] = useState("");
  const [officedetails, setOfficeDetails] = useState();
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [officeNames, setOfficeNames] = useState([]);
  const [removal_reason, setRemovalReason] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeUser, setRemoveUser] = useState({
    user_id: "option1",
    reason_for_removal: "option1",
    confirm_removal: false,
  });
  const [userIds, setUserId] = useState(null);

  const [userDetails, setUserDetails] = useState(initStateOfAddUserInManageUser);

  const userProfileView=useRef();

  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
    console.log("Designation", list.data.data)
  };

  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getDepartmentType");
    setDepartmentTypes(list.data.data);
    console.log("Department", list.data.data)
  };

  const ConfirmPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userDetails.admin_password !== cnfm_password) {
        toast.error("Password doesn't match")
        setLoading(false);

      } else {
        const confirm = await Post("mediaHouse/confirm/password", {
          password: userDetails.admin_password,
        });
        if (confirm) {
      // toast.error(error.message)
      console.log("confirm",confirm)

          setShow(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      // toast.error(error?.message);
      console.log("errorData",error)
      toast.error(error?.response?.data?.error?.msg || error.message)

      // console.log(error, "<000000000")
    }
    setLoading(false);

  };

  const Profile = async (index) => {
    setLoading(true)

    try {
      const resp = await Get(`mediaHouse/getProfile`);
      if (resp) {
        setUserDetails((prev) => ({
          ...prev,
          user_id: resp.data.profile._id,
        }));
        const list = await Get(
          `mediaHouse/getOfficeDetail?company_vat=${resp.data.profile.company_vat}`
        );
        if (list) {
          setOfficeNames(list.data.data);
          setOfficeDetails(list.data.data[index]);
          setUserDetails((prev) => ({
            ...prev,
            full_name: list.data.data[index].name,
            type: list.data.data[index].office_type_id?._id,
            address: list.data.data[index].address.complete_address,
            pincode: list.data.data[index].address.pincode,
            country_code: list.data.data[index].country_code,
            city: list.data.data[index].address.city,
            country: list.data.data[index].address.country,
            phone_no: list.data.data[index].phone,
            website: list.data.data[index].website,
            select_office_name: list.data.data[index].name,
            office_id: list.data.data[index]._id,
          }));
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "phone") {
      if (value.length <= 15) {
        setUserDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    else if (name == "allow_to_complete" || name == "allow_to_broadcat" || name == "allow_to_chat_externally" || name == "allow_to_purchased_content") {
      setUserDetails((prev) => ({
        ...prev,
        admin_right: {
          ...prev.admin_right,
          [name]: value
        }
      }));
    }
    else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheck = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const AddUser = async (e) => {
    e.preventDefault();
    // const formdata = new FormData();
    // for (const key in userDetails) {
    //   formdata.append(key, userDetails[key]);
    // }

    setLoading(true);

    try {
      if (userDetails.admin_password !== cnfm_password) {
        // toast.error("Password doesn't match")
      } else {
        const resp = await Post("mediaHouse/ManageUser", userDetails);
        if (resp) {
          setUserDetails(initStateOfAddUserInManageUser);
          setUrl()
          setCnfmPassword("");
          toast.success('User added successfully')
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      // console.log(error, "<------error")
    }
  };

  const SelectUser = async (id) => {
    try {
      const resp = await Get(`mediaHouse/getdesignatedUSer?role=${id}`);
      if (resp) {
        setAddedUsers(resp.data.response);
      }
    } catch (error) {
      // console.log(error, "<---------error")
    }
  };

  const handleRemoveUser = (e) => {
    setRemoveUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const RemovalReason = async () => {
    const resp = await Get(`mediaHouse/find`);
    setRemovalReason(resp.data.payment);
  };

  const RemoveUser = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const obj = {
      user_id: removeUser.user_id,
      reason_for_removal: removeUser.reason_for_removal,
    };

    setLoading(true);

    try {
      if (
        removeUser.reason_for_removal &&
        removeUser.user_id === "option1" &&
        removeUser.reason_for_removal === "option1"
      ) {
      } else {
        const resp = await Patch(`mediaHouse/deleteadduser`, obj);
        setLoading(false);
        setRemoveUser({
          user_id: "",
          reason_for_removal: "",
          confirm_removal: false,
        })
        toast.success("User deleted successfully")
        SelectUser(userIds);
      }
    } catch (error) {
      // console.log(error, "<---------error")
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartmentType();
    getDesignation();
    Profile(0);
    RemovalReason();
  }, []);

  const phoneInputRef = useRef(null);
  useEffect(() => {
    if (userDetails?.country_code) {
      phoneInputRef?.current?.focus();
    }
  }, [userDetails?.country_code]);

  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };

  const handleAdminImageChange = async (e, i) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("path", "user");
    formData.append("media", file);

    setLoading(true);
    try {
      const response = await Post("mediaHouse/uploadUserMedia", formData);
      // setUserDetails((prev) => ({
      //   ...prev,
      //   profile_image: response.data.path,
      // }));

      setMultiUser((prev) => {
        const updatedUsers = [...prev];
        updatedUsers[i].profile_image = response.data.path;
        return updatedUsers;
      })
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };


  // New code implementation-
  const [getUsers, setGetUsers] = useState([]);
  const getUsersOfOffice = async (office_id) => {
    try {
      setGetUsers([])
      const resp = await Post(`mediaHouse/getUserListAccordingToOfficeId`, { office_id });
      if (resp) {
        setGetUsers(resp.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdateUsers = (key, value, i, type) => {
    setGetUsers((prev) => {
      const updatedUsers = [...prev];
      if (type === "checked") {
        updatedUsers[i].admin_rignts[key] = value;
      }
      else if (type == "price") {
        updatedUsers[i].admin_rignts.price_range[key] = value;
      }
      else {
        updatedUsers[i]["is_deleted"] = value
      }
      return updatedUsers;
    });

  }

  const handleUpdateAllUsers = async () => {
    setLoading(true);
    try {
      const isDeletedUser = getUsers?.filter((el) => el?.is_deleted);
      const deletedUserId = [...isDeletedUser]?.map((el) => el._id);
      if (isDeletedUser?.length > 0) {
        await Post(`mediaHouse/updateMultipleUser`, { user_data: getUsers });
        setLoading(false);
        successToasterFun("Deleted successfully.");
        setGetUsers((prev) => {
          return [...prev].filter((el) => !deletedUserId.includes(el._id))
        })
        setGetUserProfile(null)
      }
      else {
        await Post(`mediaHouse/updateMultipleUser`, { user_data: getUsers });
        setLoading(false);
        successToasterFun("Updated successfully.")
      }
    }
    catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const [getUserProfile, setGetUserProfile] = useState(null);
  const handleGetUserProfile = async (user_id) => {
    try {
      setLoading(true);
      setGetUserProfile(null)
      const data = await Post(`mediaHouse/getProfileAccordingUserId`, { user_id });
      const newData = await formattingUserData(data?.data?.profile);
      console.log("New data", newData) 
      setGetUserProfile(newData)
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(getUserProfile){
     userProfileView.current?.scrollIntoView({ behavior: 'smooth' });
    }

     
  },[getUserProfile])

  const updateSingleUserProfile = (e, type) => {
    if (type == "deleted") {
      const { name, checked } = e.target
      setGetUserProfile({ ...getUserProfile, [name]: checked })
    }
    else if (type === "checked") {
      const { name, checked } = e.target;
      setGetUserProfile({
        ...getUserProfile,
        admin_rignts: {
          ...getUserProfile.admin_rignts,
          [name]: checked
        }
      });
    }
    else if (type === "price") {
      const { name, value } = e.target;
      setGetUserProfile({
        ...getUserProfile,
        admin_rignts: {
          ...getUserProfile.admin_rignts,
          price_range: {
            ...getUserProfile.admin_rignts.price_range,
            [name]: value
          }
        }
      });
    }
    else {
      const { name, value } = e.target
      setGetUserProfile({ ...getUserProfile, [name]: value })
    }
  }

  const handleUpdateSingleUserDetail = async () => {
    try {
      setLoading(true);
      const data = await Post(`mediaHouse/updateMultipleUser`, { user_data: [getUserProfile] });
      if (getUserProfile?.is_deleted) {
        setGetUsers((prev) => {
          let updatedData = [...prev];
          updatedData = updatedData.filter((el) => el._id !== getUserProfile._id)
        })
        setGetUserProfile(null)
        setLoading(false);
        successToasterFun("Deleted successfully")
        return;
      }
      setLoading(false);
      successToasterFun("Updated successfully")
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function getCountryCodeFromCallingCode(callingCode) {
    try {
      const phoneNumber = parsePhoneNumber(`${callingCode}`);
      return phoneNumber?.country;
    } catch (error) {
      console.error("Error parsing phone number:", error);
    }
  }

  // Add multi users-
  const [multiUser, setMultiUser] = useState([]);
  const handleMultiUser = (type, id = null) => {
    if (type === "first_add") {
      setMultiUser([{ ...newInitStataOfAddUserInManageUser, uniqueId: Math.random(), administator_email: user?.email, media_house_id: user?._id }])
    }
    else if (type === "more_add") {
      setMultiUser([...multiUser, { ...newInitStataOfAddUserInManageUser, uniqueId: Math.random(), administator_email: user?.email, media_house_id: user?._id }])
    }
    else {
      setMultiUser((prev) => {
        let updatedItem = [...prev];
        return updatedItem = updatedItem?.filter((el) => el.uniqueId !== id)
      })
    }
  }

  const handleUpadteMultiUser = (key, value, i, type) => {
    setMultiUser((prev) => {
      const updatedUsers = [...prev];
      if (type == "checked") {
        updatedUsers[i].admin_rignts[key] = value;
      }
      else if (type == "price") {
        updatedUsers[i].admin_rignts.price_range[key] = value;
      }
      else {
        if (key == "full_name") {
          updatedUsers[i][key] = value;
          updatedUsers[i]["first_name"] = value?.split(" ")[0];
          updatedUsers[i]["last_name"] = value?.split(" ")[1];
        }
        else {
          updatedUsers[i][key] = value;
        }
      }
      return updatedUsers
    })
  }

  const handleAddMultiUser = async () => {
    try {
      setLoading(true);
      const data = await Post(`mediaHouse/addMultipleUser`, { user_data: multiUser });
      console.log("data -->", data?.data?.data)
      setLoading(false);
      setMultiUser([]);
      setGetUsers([...getUsers, ...data?.data?.data])
      successToasterFun("All users added successfully")
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap login-page manage_usr_wrp sign p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng mng_usr_pdng">
                  <div className="onboardMain">
                    <div className="onboardStep">
                      <Form onSubmit={ConfirmPassword}>
                        <div className="onboardIntro">
                          <h1 className="mb-0">Manage users</h1>
                          <div className="onboardStep b_border">
                            <p className="mb-0 tp_txt">
                              {manageUserTopHeading(user?.first_name, user?.last_name)}
                            </p>
                            <div className="ps_inp_wrp">
                              <Row>
                                <Col md={6} className="">
                                  <Form.Group className="form-group position-relative">
                                    <img src={lockic} alt="company" />
                                    <Form.Control
                                      type={!visibility1 ? "password" : "text"}
                                      disabled={show}
                                      value={userDetails.admin_password}
                                      pattern=".{8,}"
                                      title="Password should not be less than 8 letters"
                                      className="rnd"
                                      name="admin_password"
                                      required
                                      onChange={handleChange}
                                      placeholder="Enter password *"
                                    />
                                    {!visibility1 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility1(true);
                                        }}
                                      >
                                        <BsEyeSlash />
                                      </div>
                                    )}
                                    {visibility1 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility1(false);
                                        }}
                                      >
                                        <BsEye />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="form-group position-relative">
                                    <img src={lockic} alt="company" />
                                    <Form.Control
                                      type={!visibility2 ? "password" : "text"}
                                      disabled={show}
                                      value={cnfm_password}
                                      className="rnd"
                                      name="password"
                                      required
                                      onChange={(e) =>
                                        setCnfmPassword(e.target.value)
                                      }
                                      placeholder="Confirm password *"
                                    />
                                    {!visibility2 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility2(true);
                                        }}
                                      >
                                        <BsEyeSlash />
                                      </div>
                                    )}
                                    {visibility2 && (
                                      <div
                                        color="#000"
                                        className="pass_ic_wrap"
                                        onClick={() => {
                                          setVisibility2(false);
                                        }}
                                      >
                                        <BsEye />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <div className="stepFooter">
                                  <Button
                                    disabled={show}
                                    className="w-100 mt_25"
                                    type="submit"
                                    variant="primary"
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Form>

                      {show && (
                        <Form onSubmit={AddUser}>
                          <div className="officeDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Office details
                            </p>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={office} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    disabled
                                    value={officedetails?.name}
                                    name="name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    disabled
                                    value={officedetails?.office_type_id?.name}
                                    name="office_name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={12}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Autocomplete
                                    className="addr_custom_inp w-100"
                                    disabled
                                    value={
                                      officedetails?.address?.complete_address
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={3} className="">
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="number"
                                    className=""
                                    disabled
                                    value={officedetails?.address?.pincode}
                                    name="pincode"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    value={officedetails?.address?.city}
                                    name="city"
                                    disabled
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={5}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={location} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    value={officedetails?.address?.country}
                                    name="United Kingdom"
                                    disabled
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <div className="number_inp_wrap disabled">
                                  <input
                                    type="number"
                                    className="input_nmbr"
                                    placeholder="Phone"
                                    name="phone"
                                    value={officedetails?.phone}
                                    maxLength={15}
                                  />
                                  <PhoneInput
                                    className="f_1 cntry_code"
                                    international
                                    countryCallingCodeEditable={false}
                                    name="country_code"
                                    value={officedetails?.country_code}
                                    defaultCountry={`${getCountryCodeFromCallingCode(officedetails?.country_code + officedetails?.phone)}`}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={website} alt="" />
                                  <Form.Control
                                    type="url"
                                    disabled
                                    className=""
                                    placeholder="Website"
                                    name="website"
                                    required
                                    value={officedetails?.website}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    name="office_name"
                                    defaultValue={"option1"}
                                  >
                                    <MenuItem
                                      className="selectPlaceholder"
                                      value="option1"
                                    >
                                      Select office
                                    </MenuItem>
                                    {officeNames &&
                                      officeNames.map((value, index) => {
                                        return (
                                          <MenuItem
                                            onClick={() => {
                                              Profile(index);
                                              getUsersOfOffice(value?._id)
                                              setGetUserProfile(null)
                                            }}
                                            value={value._id}
                                          >
                                            {value.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                          {
                            getUsers?.length > 0
                              ?
                              <div className="edit_user_tble">
                                <Col md={12}>
                                  <div className="tbl_crd vt_dtl_wrp">
                                    <div className="">
                                      <div
                                        className="d-flex justify-content-between align-items-center tbl_hdr"
                                        px="20px"
                                        mb="10px"
                                      >
                                        <p className="onbrdheading sign_hdng">
                                          Edit users
                                        </p>
                                      </div>
                                      <div className="fix_ht_table">
                                        <table
                                          width="100%"
                                          mx="20px"
                                          variant="simple"
                                          className="common_table vat_dtls"
                                        >
                                          <thead>
                                            <tr>
                                              <th className="cnt_prchsd_th">User</th>
                                              <th>Rights</th>
                                              <th>Edit purchase range</th>
                                              <th>Remove user</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {
                                              getUsers?.map((el, i) => <tr>
                                                <td className="">
                                                  <div className="image-wrap d-flex align-items-center">
                                                    <img src={el?.profile_image || userImg}></img>
                                                    <Link
                                                      to="#"
                                                      className="link view_link d-flex align-items-center"
                                                      onClick={() => handleGetUserProfile(el._id)}
                                                    >
                                                      <BsEye />
                                                      View profile
                                                    </Link>
                                                  </div>
                                                  <div className="text">
                                                    <p className="text_bold">
                                                      {el?.full_name}
                                                    </p>
                                                    <p className="timedate">
                                                      <img
                                                        src={calendar}
                                                        className="icn_time"
                                                      />
                                                      {moment(el?.createdAt).format("DD MMM YYYY")}
                                                    </p>
                                                    <p className="text_light">
                                                      London
                                                    </p>
                                                  </div>
                                                </td>
                                                <td className="edit_user_checkbox">
                                                  <Row>
                                                    <Col md={12} className="mb-1">
                                                      <FormControlLabel
                                                        className="check_label"
                                                        checked={el?.admin_rignts?.allowed_complete_access}
                                                        onChange={(e) => handleUpdateUsers("allowed_complete_access", e.target.checked, i, "checked")}
                                                        control={<Checkbox />}
                                                        name="allowed_complete_access"
                                                        label="Allowed complete access"
                                                      />
                                                    </Col>
                                                    <Col md={12} className="mb-1">
                                                      <FormControlLabel
                                                        className="check_label"
                                                        checked={el?.admin_rignts?.allowed_to_broadcast_tasks}
                                                        onChange={(e) => handleUpdateUsers("allowed_to_broadcast_tasks", e.target.checked, i, "checked")}
                                                        control={<Checkbox />}
                                                        name="allowed_to_broadcast_tasks"
                                                        label="Allowed to broadcast tasks"
                                                      />
                                                    </Col>
                                                    <Col md={12} className="mb-1">
                                                      <FormControlLabel
                                                        className="check_label"
                                                        checked={el?.admin_rignts?.allow_to_chat_externally}
                                                        onChange={(e) => handleUpdateUsers("allow_to_chat_externally", e.target.checked, i, "checked")}
                                                        control={<Checkbox />}
                                                        name="allow_to_chat_externally"
                                                        label="Allowed to chat externally"
                                                      />
                                                    </Col>
                                                    <Col md={12} className="mb-1">
                                                      <FormControlLabel
                                                        className="check_label"
                                                        checked={el?.admin_rignts?.allowed_to_purchase_content}
                                                        onChange={(e) => handleUpdateUsers("allowed_to_purchase_content", e.target.checked, i, "checked")}
                                                        control={<Checkbox />}
                                                        name="allowed_to_purchase_content"
                                                        label="Allowed to purchase content"
                                                      />
                                                    </Col>
                                                  </Row>
                                                </td>
                                                <td>
                                                  <div className="set_price mng_price">
                                                    <Form.Group className="mb-2 form-group">
                                                      <p className="mb-0 font-bold">Min</p>
                                                      <Form.Control
                                                        type="text"
                                                        className=""
                                                        value={el?.admin_rignts?.price_range?.minimum_price}
                                                        name="minimum_price"
                                                        onChange={(e) => handleUpdateUsers("minimum_price", e.target.value, i, "price")}
                                                        placeholder="£Min"
                                                        disabled={!el?.admin_rignts?.allowed_to_purchase_content}
                                                      />
                                                    </Form.Group>
                                                    <Form.Group className="mb-2 form-group">
                                                      <p className="mb-0 font-bold">Max</p>
                                                      <Form.Control
                                                        type="text"
                                                        className=""
                                                        value={el?.admin_rignts?.price_range?.maximum_price}
                                                        name="maximum_price"
                                                        onChange={(e) => handleUpdateUsers("maximum_price", e.target.value, i, "price")}
                                                        placeholder="£Max"
                                                        disabled={!el?.admin_rignts?.allowed_to_purchase_content}
                                                      />
                                                    </Form.Group>
                                                  </div>
                                                </td>
                                                <td className="text-center">
                                                  <FormControlLabel
                                                    className="check_label"
                                                    checked={el?.is_deleted}
                                                    onChange={(e) => handleUpdateUsers("is_deleted", e.target.checked, i, "delete")}
                                                    control={<Checkbox />}
                                                    name=""
                                                    label=""
                                                  />
                                                </td>
                                              </tr>)
                                            }
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="stepFooter" onClick={() => handleUpdateAllUsers()}>
                                    <Button
                                      className="w-100 mt_25"
                                      variant="primary"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                  {/* <p className="red_text">Add new user</p> */}
                                </Col>
                              </div>
                              : <p className="red_text" style={{ marginTop: "-2rem" }}>
                                Please select office to view existing users or add a new user by clicking below. Thank you.
                              </p>
                          }

                          {/* Add multi users */}
                          {
                            multiUser?.length === 0 && <p className="red_text clickable" onClick={() => handleMultiUser("first_add")}>Add new user</p>
                          }
                          {
                            multiUser?.map((el, i) => <div key={i}>
                              <div className="adminDetails sign_section">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <p className="onbrdheading sign_hdng">Add new user details</p>
                                  <p className="red_text clickable" onClick={() => handleMultiUser("deleteUser", el?.uniqueId)}>Delete</p>
                                </div>
                                <Row>
                                  <Col md={9}>
                                    <Row>
                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={userLogo} alt="" />
                                          <Form.Control
                                            type="text"
                                            className=""
                                            value={el?.full_name}
                                            onChange={(e) => handleUpadteMultiUser("full_name", e.target.value, i)}
                                            placeholder="Enter full name *"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={chair} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            name="designation"
                                            value={el?.designation_id || "option1"}
                                            onChange={(e) => handleUpadteMultiUser("designation_id", e.target.value, i)}
                                          >
                                            <MenuItem
                                              className="selectPlaceholder"
                                              disabled
                                              value="option1"
                                            >
                                              Select designation
                                            </MenuItem>
                                            {designation &&
                                              designation.map((item) => {
                                                return (
                                                  <MenuItem value={item._id}>
                                                    {item.name}
                                                  </MenuItem>
                                                );
                                              })}
                                          </Select>
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={chair} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            value={el?.office_id || "option1"}
                                            onChange={(e) => handleUpadteMultiUser("office_id", e.target.value, i)}
                                          >
                                            <MenuItem
                                              className="selectPlaceholder"
                                              disabled
                                              value="option1"
                                            >
                                              Select office
                                            </MenuItem>
                                            {officeNames?.map((value, index) => {
                                              return (
                                                <MenuItem
                                                  value={value._id}
                                                >
                                                  {value.name}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Group className="mb-4 form-group">
                                          <img src={chair} alt="" />
                                          <Select
                                            className="w-100 slct_sign"
                                            name="select_user_office_department"
                                            value={el?.department_id || "option1"}
                                            onChange={(e) => handleUpadteMultiUser("department_id", e.target.value, i)}
                                          >
                                            <MenuItem
                                              disabled
                                              className="selectPlaceholder"
                                              value="option1"
                                            >
                                              Select department
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
                                  <Col md={3}>
                                    <div className="currentPic adm_profile position-relative text-center">
                                      {el?.profile_image ? (
                                        <img
                                          className="uploaded"
                                          src={el?.profile_image}
                                          alt=""
                                        />
                                      ) : (
                                        <>
                                          <img src={addPic} alt="" />
                                          <span className="mt-2 d-block">
                                            Add current photo
                                          </span>
                                        </>
                                      )}
                                      <input
                                        type="file"
                                        required
                                        onChange={(e) => {
                                          handleAdminImageChange(e, i)
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col md={6} className="admn_eml_wrp mt-3">
                                    <Form.Group className="form-group position-relative w-100">
                                      <img
                                        src={mail}
                                        className="eml_inp_icn"
                                        alt=""
                                      />
                                      <Form.Control
                                        type="email"
                                        required
                                        className=""
                                        placeholder="Official email id *"
                                        value={el?.email}
                                        onChange={(e) => handleUpadteMultiUser("email", e.target.value, i)}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6} className="admn_numb_wrap mt-3">
                                    <div className="number_inp_wrap w-100">
                                      <input
                                        type="number"
                                        required
                                        className="input_nmbr"
                                        placeholder=" phone"
                                        maxLength={12}
                                        name="phone"
                                        value={el?.phone}
                                        onChange={(e) => {
                                          if (e.target.value.length <= 12) {
                                            handleUpadteMultiUser("phone", e.target.value, i)
                                          }
                                        }}
                                        ref={phoneInputRef}
                                      />
                                      <PhoneInput
                                        className="f_1 cntry_code"
                                        international
                                        countryCallingCodeEditable={true}
                                        required
                                        name="country_code"
                                        value={el?.country_code}
                                        onChange={(e) => {
                                          handleUpadteMultiUser("country_code", e, i)
                                          handleCountryCodeChange(e)
                                        }}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="adminDetails sign_section mng_usr_rt">
                                <p className="onbrdheading sign_hdng">
                                  Add new user rights
                                </p>
                                <Row>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={el?.admin_rignts?.allowed_complete_access}
                                      onChange={(e) => handleUpadteMultiUser("allowed_complete_access", e.target.checked, i, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_complete_access"
                                      label="Allowed complete access"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={el?.admin_rignts?.allowed_to_broadcast_tasks}
                                      onChange={(e) => handleUpadteMultiUser("allowed_to_broadcast_tasks", e.target.checked, i, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_to_broadcast_tasks"
                                      label="Allowed to broadcast tasks"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={el?.admin_rignts?.allow_to_chat_externally}
                                      onChange={(e) => handleUpadteMultiUser("allow_to_chat_externally", e.target.checked, i, "checked")}
                                      control={<Checkbox />}
                                      name="allow_to_chat_externally"
                                      label="Allowed to chat externally"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={el?.admin_rignts?.allowed_to_purchase_content}
                                      onChange={(e) => handleUpadteMultiUser("allowed_to_purchase_content", e.target.checked, i, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_to_purchase_content"
                                      label="Allowed to purchase content"
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <div className="d-flex set_price mng_price">
                                      <p className="mb-0">Set purchase range</p>
                                      <Form.Group className="mb-4 form-group">
                                        <Form.Control
                                          type="text"
                                          className=""
                                          value={el?.price_range?.minimum_price}
                                          name="minimum_price"
                                          onChange={(e) => handleUpadteMultiUser("minimum_price", e.target.value, i, "price")}
                                          placeholder="£Min"
                                          disabled={!el?.admin_rignts?.allowed_to_purchase_content}
                                        />
                                      </Form.Group>
                                      <Form.Group className="mb-4 form-group">
                                        <Form.Control
                                          type="text"
                                          className=""
                                          value={el?.price_range?.maximum_price}
                                          name="maximum_price"
                                          onChange={(e) => handleUpadteMultiUser("maximum_price", e.target.value, i, "price")}
                                          placeholder="£Max"
                                          disabled={!el?.admin_rignts?.allowed_to_purchase_content}
                                        />
                                      </Form.Group>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>)
                          }
                          {
                            multiUser?.length >= 1 && <div className="stepFooter">
                              <Button
                                className="w-100 mt_25"
                                variant="primary"
                                onClick={() => handleAddMultiUser()}
                              >
                                Save
                              </Button>
                              <p className="red_text clickable" onClick={() => handleMultiUser("more_add")}>Add another new user</p>
                            </div>
                          }
                        </Form>
                      )}


                      {getUserProfile && (
                        <Form >
                          <div className="adminDetails sign_section" ref ={userProfileView}>
                            <p className="onbrdheading sign_hdng">
                              User profile
                            </p>
                            <Row>
                              <Col md={12}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group className="mb-4 form-group">
                                      <img src={chair} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        name="office_name"
                                        defaultValue={"option1"}
                                        onChange={(e) => {
                                          SelectUser(e.target.value)
                                          setUserId(e.target.value)
                                        }
                                        }
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Select office
                                        </MenuItem>
                                        {officeNames &&
                                          officeNames.map((value) => {
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
                                      <img src={user} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        name="user_id"
                                        onChange={handleRemoveUser}
                                        value={removeUser.user_id}
                                      >
                                        <MenuItem
                                          className="selectPlaceholder"
                                          disabled
                                          value="option1"
                                        >
                                          Select user
                                        </MenuItem>
                                        {addedUsers &&
                                          addedUsers.map((item) => {
                                            return (
                                              <MenuItem value={item._id}>
                                                {item.first_name +
                                                  " " +
                                                  item.last_name}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={12} className="mb-3 position-relative">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox />}
                                  value={removeUser.confirm_removal}
                                  onChange={(e) => {
                                    setRemoveUser((prev) => ({
                                      ...prev,
                                      confirm_removal: e.target.checked,
                                    }));
                                  }}
                                  name="confirm_removal"
                                  label="Please check the box to confirm the removal of the selected user from the Presshop platform"
                                />
                                {submit && !removeUser.confirm_removal && (
                                  <span
                                    className="req_inp"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                )}
                              </Col>
                            </Row> 
                            <Row>
                              <Col md={12}>
                                <div className="profile_img manage_prfle">
                                  <img src={getUserProfile?.profile_image || userImg} />
                                  <div className="EditProfileImgWrap">
                                    <label htmlFor="profilePicInput" className="editProfilepic">
                                      <img src={editProfileIcn} alt="Upload Profile Image" />
                                      <input
                                        type="file"
                                        id="profilePicInput"
                                        disabled
                                      />
                                    </label>
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Company name</label>
                                <Form.Group className="mb-4 form-group">
                                  <img src={followersic} alt="" />
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    name="company_name"
                                    disabled
                                    value={getUserProfile?.company_name}
                                    className="user"
                                    placeholder="Reuters Media"
                                  />
                                </Form.Group>
                                {/* </div> */}
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Onboarded on</label>
                                <Form.Group className="mb-4 form-group manage_clendr">
                                  <img className="privacy inp_icn" src={calendaric} alt="" />
                                  <Form.Control
                                    type="text"
                                    disabled
                                    placeholder="dd/mm/yyyy"
                                    value={moment(getUserProfile?.createdAt).format("DD MMMM YYYY")}
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>First name</label>
                                <Form.Group className="mb-4 form-group">
                                  <img src={person} alt="" />
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    className="user"
                                    value={getUserProfile?.first_name}
                                    onChange={(e) => updateSingleUserProfile(e, "")}
                                    placeholder="Sarah"
                                    name="first_name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Last name</label>
                                <Form.Group className="mb-4 form-group">
                                  <img className="privacy icn" src={person} alt="" />
                                  <Form.Control
                                    type="text"
                                    className=""
                                    value={getUserProfile?.last_name}
                                    onChange={(e) => updateSingleUserProfile(e, "")}
                                    placeholder="Oliver"
                                    name="last_name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Office name</label>
                                <Form.Group className="mb-4 form-group">
                                  <img src={chair} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    name="office_id"
                                    value={getUserProfile?.office_id}
                                    onChange={(e) => updateSingleUserProfile(e, "")}
                                  >
                                    {officeNames &&
                                      officeNames.map((value, index) => {
                                        return (
                                          <MenuItem
                                            value={value._id}
                                          >
                                            {value.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </Form.Group>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Department</label>
                                <Form.Group className="mb-4 form-group">
                                  <img src={departmentic} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    name="department_type"
                                    value={getUserProfile?.department_id}
                                    onChange={(e) => updateSingleUserProfile(e, "")}
                                  >
                                    {departmentTypes?.map((value, index) => {
                                      return (
                                        <MenuItem
                                          value={value._id}
                                        >
                                          {value.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Form.Group>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex mb-0">
                                <label>Mobile Number</label>
                                <div className="admn_numb_wrap disabled">
                                  <div className="number_inp_wrap w-100">
                                    <input
                                      type="number"
                                      required
                                      className="input_nmbr"
                                      placeholder=" phone"
                                      onChange={(e) => {
                                        if (e.target.value.length <= 12) {
                                          updateSingleUserProfile(e, "")
                                        }
                                      }}
                                      maxLength={12}
                                      name="phone"
                                      value={getUserProfile?.phone}
                                      ref={phoneInputRef}
                                    />
                                    <PhoneInput
                                      className="f_1 cntry_code"
                                      international
                                      countryCallingCodeEditable={true}
                                      required
                                      name="country_code"
                                      onChange={(e) => {
                                        setGetUserProfile((prev) => ({
                                          ...prev,
                                          country_code: e,
                                        }));
                                      }}
                                      defaultCountry={`${getCountryCodeFromCallingCode(getUserProfile?.country_code + getUserProfile?.phone)}`}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} md={6} sm={6} className="rw_inn_flex">
                                <label>Email address</label>
                                <Form.Group className="mb-4 form-group">
                                  <img className="privacy icn" src={emailic} alt="" />
                                  <Form.Control
                                    type="text"
                                    name="email"
                                    value={getUserProfile?.email}
                                    onChange={(e) => updateSingleUserProfile(e, "")}
                                  />
                                </Form.Group>
                              </Col>
                              <div className="adminDetails sign_section mng_usr_rt user_prfle_tick">
                                <Row>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={getUserProfile?.admin_rignts?.allowed_complete_access}
                                      onChange={(e) => updateSingleUserProfile(e, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_complete_access"
                                      label="Allowed complete access"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={getUserProfile?.admin_rignts?.allowed_to_broadcast_tasks}
                                      onChange={(e) => updateSingleUserProfile(e, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_to_broadcast_tasks"
                                      label="Allowed to broadcast tasks"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={getUserProfile?.admin_rignts?.allow_to_chat_externally}
                                      onChange={(e) => updateSingleUserProfile(e, "checked")}
                                      control={<Checkbox />}
                                      name="allow_to_chat_externally"
                                      label="Allowed to chat externally"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <FormControlLabel
                                      className="check_label"
                                      checked={
                                        getUserProfile?.admin_rignts?.allowed_to_purchase_content
                                      }
                                      onChange={(e) => updateSingleUserProfile(e, "checked")}
                                      control={<Checkbox />}
                                      name="allowed_to_purchase_content"
                                      label="Allowed to purchase content"
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <div className="d-flex set_price mng_price align-items-center">
                                      <p className="mb-0">Set purchase range</p>
                                      <Form.Group className="mb-4 form-group">
                                        <p className="mb-0 font-bold">Min</p>
                                        <Form.Control
                                          type="text"
                                          className=""
                                          value={getUserProfile?.admin_rignts?.price_range?.minimum_price}
                                          name="minimum_price"
                                          onChange={(e) => updateSingleUserProfile(e, "price")}
                                          placeholder="£Min"
                                          disabled={!getUserProfile?.admin_rignts?.allowed_to_purchase_content}
                                        />
                                      </Form.Group>
                                      <Form.Group className="mb-4 form-group">
                                        <p className="mb-0 font-bold">Max</p>
                                        <Form.Control
                                          type="text"
                                          className=""
                                          value={getUserProfile?.admin_rignts?.price_range?.maximum_price}
                                          name="maximum_price"
                                          onChange={(e) => updateSingleUserProfile(e, "price")}
                                          placeholder="£Max"
                                          disabled={!getUserProfile?.admin_rignts?.allowed_to_purchase_content}
                                        />
                                      </Form.Group>
                                    </div>
                                  </Col>
                                  <Col md={12} >
                                    <FormControlLabel
                                      className="check_label"
                                      checked={getUserProfile?.is_deleted}
                                      onChange={(e) => updateSingleUserProfile(e, "deleted")}
                                      control={<Checkbox />}
                                      name="is_deleted"
                                      label="Remove user"
                                    />
                                  </Col>
                                </Row>
                                <div className="stepFooter">
                                  <Button
                                    className="w-100 mt_25"
                                    onClick={() => handleUpdateSingleUserDetail()}
                                    variant="primary"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Form>
                      )}
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
                  <div className="text-center">
                    <img src={manageusers} alt="" />
                    <h2 className="mng_usr_rt_txt m-auto">
                      Get to see & hear the{" "}
                      <span className="txt_bld">news</span> first
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

export default ManageUsers;
