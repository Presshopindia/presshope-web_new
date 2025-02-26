import React, { useEffect, useState, useRef } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import follower from "../assets/images/follower.svg";
import hash from "../assets/images/hash.svg";
import Receipt from "../assets/images/Receipt.svg";
import accessCenter from "../assets/images/accessCenter.png";
// import office from "../assets/images/office.svg";
import chair from "../assets/images/chair.svg";
import location from "../assets/images/location.svg";
import call from "../assets/images/call.svg";
import website from "../assets/images/sortIcons/political.svg";
import addPic from "../assets/images/add-square.svg";
import user from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
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
import { debounce, first } from "lodash";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { Link, useParams } from "react-router-dom";
import { Get, Patch, Post } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { useDarkMode } from "../context/DarkModeContext";
import Loader from "../component/Loader";
import office from "../assets/images/office.svg";
import { parsePhoneNumber } from "libphonenumber-js";

{
  /* <img src={office} alt="" /> */
}

const SignupUserN = () => {
  // Parse data from local storage
  const localAdmin = JSON.parse(localStorage.getItem("AdminPopup"));
  const localOffice = JSON.parse(localStorage.getItem("OfficeDetails"));

  // React state variables
  const [loading, setLoading] = useState(false);
  const [officetypes, setOfficeTypes] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [officeNames, setOfficeNames] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [onboard, setOnboard] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const { profileData } = useDarkMode();
  const userString = profileData;
  const user = profileData;
  const companyName = user?.company_name;
  const companyNumber = user?.company_number;
  const companyVat = user?.company_vat;
  console.log("all value ---->1111", user);
  console.log("all value ---->11115profileData", profileData);

  const navigate = useNavigate();
  const [addOffice, setAddOffice] = useState({
    office_details: {
      company_name: companyName,
      company_number: companyNumber,
      company_vat: companyVat,
      profile_image: user?.profile_image,
      name: "",
      complete_address: "",
      latitude: "",
      longitude: "",
      phone: "",
      country_code: "",
      city: "",
      country: "",
      post_code: "",
      website: `https://${""}`,
      office_type_id: "option1",
    },
  });
  const { name, number, vat, email, first_name, last_name, user_id } = useParams();

  // Define the initial state for onboardingUser
  const [onboardingUser, setOnboardingUser] = useState({
    full_name: last_name || "",
    designation_id: "",
    profile_image: "",
    office_id: "",
    department_id: "",
    phone: "",
    country_code: "",
    email: email || "",
    admin_rignts: {
      allowed_to_onboard_users: false,
      allowed_to_deregister_users: false,
      allowed_to_assign_users_rights: false,
      allowed_to_set_financial_limit: false,
      allowed_complete_access: false,
      allowed_to_broadcast_tasks: false,
      allowed_to_purchase_content: false,
      allow_to_chat_externally: false,
      price_range: {
        minimum_price: "",
        maximum_price: "",
      },
    },
  });
  // Function to handle adding office details
  const AddOfficeDetails = async (e) => {
    e.preventDefault();
    try {
      if (addOffice?.office_details.office_type_id === "option1") {
        // toast.error("Select Office Type");
      } else if (addOffice?.office_details.complete_address === "") {
        // toast.error("Fill Office Address");
      } else if (addOffice?.office_details.country_code === "") {
        // toast.error("Select Country Code");
      } else {
        const resp = await Post("mediaHouse/addOfficeDetail", {
          ...addOffice,
          company_name: name,
          company_number: number,
          company_vat: vat,
        });
        if (resp) {
          setOnboard(true);
          localStorage.setItem(
            "OfficeDetails",
            JSON.stringify({
              ...addOffice,
              company_name: name,
              company_number: number,
              company_vat: vat,
            })
          );
          if (localStorage.getItem("OfficeDetails")) {
            getOfficeDetails(resp.data.Create_Office_Detail.company_vat);
          }
        }
      }
    } catch (error) {
      // Handle errors here
    }
  };

  // Function to handle changes in the office details form
  const handleOfficeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "phone") {
      if (value.length <= 15) {
        setAddOffice((prev) => ({
          ...prev,
          office_details: { ...prev.office_details, [name]: value },
        }));
      }
    } else {
      setAddOffice((prev) => ({
        ...prev,
        office_details: { ...prev.office_details, [name]: value },
      }));
    }
  };

  // Function to handle admin rights changes
  const handleAdminRights = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    setOnboardingUser((prev) => ({
      ...prev,
      admin_rignts: { ...prev.admin_rignts, [name]: value },
    }));
  };

  // Function to handle price range changes
  const handlePriceRange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOnboardingUser((prev) => ({
      ...prev,
      admin_rignts: {
        ...prev.admin_rignts,
        price_range: {
          ...prev.admin_rignts.price_range,
          [name]: value,
        },
      },
    }));
  };

  // Function to handle address selection
  const handleAddress = (place) => {
    let city = "";
    let postalCode = "";

    const addressComponents = place.address_components;
    if (addressComponents) {
      const cityComponent = addressComponents.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1") ||
          component.types.includes("administrative_area_level_2")
      );
      const postalCodeComponent = addressComponents.find((component) =>
        component.types.includes("postal_code")
      );
      if (cityComponent) {
        city = cityComponent.long_name;
      }
      if (postalCodeComponent) {
        postalCode = postalCodeComponent.long_name;
      }
    }
    if (!city && place.formatted_address) {
      city = place.formatted_address.split(",")[0];
    }
    const country =
      place.address_components.find((component) =>
        component.types.includes("country")
      )?.long_name || "";

    setAddOffice((prev) => ({
      ...prev,
      office_details: {
        ...prev.office_details,
        complete_address: place.formatted_address,
        city: city,
        country: country,
        post_code: postalCode,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      },
    }));
  };

  // Function to fetch office types
  const getOfficeType = async () => {
    const list = await Get("mediaHouse/getOfficeType");
    setOfficeTypes(list.data.data);
  };

  // Function to fetch department types
  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getDepartmentType");
    setDepartmentTypes(list.data.data);
  };

  // Function to fetch office details
  const getOfficeDetails = async (vat) => {
    const list = await Get(`mediaHouse/getOfficeDetail?company_vat=${vat}`);
    if (list) {
      setOfficeNames(list.data.data);
    }
  };

  // Function to upload user profile
  const UseProfile = async (file) => {
    const Formdata = new FormData();
    Formdata.append("path", "user");
    Formdata.append("media", file);
    const filepath = await Post("mediaHouse/uploadUserMedia", Formdata);
    setOnboardingUser((prev) => ({
      ...prev,
      ...prev,
      profile_image: filepath.data.path,
    }));
  };

  // Function to fetch designation
  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data?.data);
  };

  const getProfile = async (user_id) => {
    const data = await Post(`mediaHouse/getProfileAccordingUserId`, {
      user_id,
    });
    console.log("data-->", data?.data?.profile);
    setOnboardingUser({
      ...onboardingUser,
      designation_id: data?.data?.profile?.designation_id?._id,
      department_id: data?.data?.profile?.department_id?._id,
      office_id: data?.data?.profile?.office_id?._id,
      profile_image: data?.data?.profile?.profile_image,
      phone: data?.data?.profile?.phone,
      country_code: data?.data?.profile?.country_code,
    });
  };

  useEffect(() => {
    getOfficeType();
    getDepartmentType();
    getDesignation();
    getOfficeDetails(vat);
    getProfile(user_id);
  }, []);

  const addUser = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await Patch(`mediaHouse/complete/onboard/user/details`, {
        ...onboardingUser,
        number,
        vat,
        first_name,
        last_name,
        status: "approved",
      });
      if (res) {
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const searchBoxRefStreet = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const onMapLoadStreet = (map) => {
    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRefStreet.current
    );
    // console.log('harshit', window.google.maps.places)
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const addressComponents = places[0].address_components;

      let postalCode = "";

      //Loop through address components to find postal code
      for (let i = 0; i < addressComponents?.length; i++) {
        const component = addressComponents[i];
        if (component.types.includes("postal_code")) {
          postalCode = component.long_name;
          break; // Break loop once postal code is found
        }
      }
      const htmlString = places[0].adr_address;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      // Extract country name and region
      const countryNameElement = doc.querySelector(".country-name");
      const cityElement = doc.querySelector(".locality");

      if (countryNameElement) {
        const address = places[0].formatted_address;
        const country = countryNameElement?.textContent;
        const city = cityElement?.textContent;
        const latitude = places[0].geometry.location.lat();
        const longitude = places[0].geometry.location.lng();

        setAddOffice((prev) => ({
          ...prev,
          office_details: {
            ...prev.office_details,
            // complete_address : address,
            city,
            country,
            latitude,
            longitude,
            post_code: postalCode,
          },
        }));
      }
    });
  };

  const phoneInputRef1 = useRef(null);
  useEffect(() => {
    const phoneInput = document.querySelector(".p_1");
    const inputElement = phoneInputRef1.current;

    const handleFocus = () => {
      inputElement.focus();
    };
    phoneInput.addEventListener("click", handleFocus);

    return () => {
      phoneInput.removeEventListener("click", handleFocus);
    };
  }, []);

  const phoneInputRef2 = useRef(null);
  useEffect(() => {
    const phoneInput = document.querySelector(".p_2");
    const inputElement = phoneInputRef2.current;

    const handleFocus = () => {
      inputElement.focus();
    };
    phoneInput.addEventListener("click", handleFocus);

    return () => {
      phoneInput.removeEventListener("click", handleFocus);
    };
  }, []);


  function getCountryCodeFromCallingCode(callingCode) {
    try {
      const phoneNumber = parsePhoneNumber(`${callingCode}`);
      return phoneNumber?.country;
    } catch (error) {
      return
    }
  }

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap login-page sign p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className="onboardMain">
                    <div className="onboardIntro">
                      <h1 className="mb-0">Onboard new user</h1>
                      <div className="onboardStep b_border">
                        <p className="mb_20">
                          Please enter office & new user details below, and
                          assign user rights.
                        </p>
                      </div>
                    </div>
                    <div className="onboardStep">
                      <div className="companyDetails sign_section">
                        <p className="onbrdheading sign_hdng">
                          Company Details
                        </p>
                        <Row>
                          <Col md={4} className="mb-4">
                            <Form.Group className="form-group">
                              <img src={follower} alt="company" />
                              <Form.Control
                                type="text"
                                className="rnd grey"
                                disabled
                                name="company_name"
                                required
                                placeholder="Company name *"
                                value={name}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="form-group">
                              <img src={hash} alt="company" />
                              <Form.Control
                                type="number"
                                className="rnd grey"
                                disabled
                                name="company_number"
                                required
                                placeholder="Company number *"
                                value={number}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="form-group">
                              <img src={Receipt} alt="company" />
                              <Form.Control
                                type="text"
                                className="rnd grey"
                                disabled
                                name="company_vat"
                                required
                                placeholder="Company VAT *"
                                value={vat}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      <div className="officeDetails sign_section">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            toast.success("Office added successfully");
                          }}
                        >
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
                                  placeholder="Enter office name *"
                                  name="name"
                                  required
                                  onChange={(e) => {
                                    handleOfficeChange(e);
                                  }}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4 form-group">
                                <img src={chair} alt="" />
                                <Select
                                  className="w-100 slct_sign"
                                  value={
                                    addOffice.office_details.office_type_id ||
                                    "option1"
                                  }
                                  name="office_type_id"
                                  onChange={(e) => {
                                    handleOfficeChange(e);
                                  }}
                                >
                                  <MenuItem
                                    disabled
                                    className="selectPlaceholder"
                                    value="option1"
                                  >
                                    Select Office Type
                                  </MenuItem>
                                  {officetypes &&
                                    officetypes.map((value, index) => (
                                      <MenuItem key={index} value={value._id}>
                                        {value.name}
                                      </MenuItem>
                                    ))}
                                </Select>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4 form-group">
                                <img src={location} alt="" />
                                <Form.Control
                                  type="text"
                                  className=""
                                  placeholder="Apartment number/Bulding name *"
                                  name="pincode"
                                  value={
                                    addOffice.office_details.complete_address
                                  }
                                  onChange={(e) => {
                                    setAddOffice((prev) => ({
                                      ...prev,
                                      office_details: {
                                        ...prev.office_details,
                                        complete_address: e.target.value,
                                      },
                                    }));
                                  }}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="">
                              <Form.Group className="mb-4 form-group">
                                <img src={location} alt="" />
                                <Form.Control
                                  type="text"
                                  className=""
                                  placeholder="Post code"
                                  name="pincode"
                                  onFocus={handlePopupOpen}
                                  onClick={handlePopupOpen}
                                  ref={searchBoxRefStreet}
                                />
                                {showPopup && (
                                  <div className="map-popup">
                                    <GoogleMap
                                      onLoad={onMapLoadStreet}
                                    ></GoogleMap>
                                  </div>
                                )}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4 form-group">
                                <img src={location} alt="" />
                                <Form.Control
                                  type="text"
                                  className=""
                                  placeholder="City"
                                  name="city"
                                  value={addOffice.office_details.city}
                                  disabled
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4 form-group">
                                <img src={location} alt="" />
                                <Form.Control
                                  type="text"
                                  className=""
                                  placeholder="Country"
                                  name="country"
                                  value={addOffice.office_details.country}
                                  disabled
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <div className="number_inp_wrap">
                                {/* Issue here */}
                                <input
                                  type="number"
                                  className="input_nmbr"
                                  name="phone"
                                  placeholder="Phone"
                                  required
                                  value={addOffice?.office_details?.phone}
                                  maxLength={10}
                                  onChange={(e) => {
                                    e.target.value.length <= 10 ? handleOfficeChange(e) : ""
                                  }}
                                  ref={phoneInputRef1}
                                />
                                <PhoneInput
                                  className="f_1 cntry_code p_1"
                                  international
                                  required
                                  countryCallingCodeEditable={true}
                                  name="country_code"
                                  onChange={(e) => {
                                    setAddOffice((prev) => ({
                                      ...prev,
                                      office_details: {
                                        ...prev.office_details,
                                        country_code: e,
                                      },
                                    }));
                                  }}
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4 form-group">
                                <img src={website} alt="" />
                                <Form.Control
                                  type="url"
                                  className=""
                                  placeholder="Website"
                                  name="website"
                                  required
                                  onChange={(e) => {
                                    handleOfficeChange(e);
                                  }}
                                  value={addOffice.office_details.website || ""}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Button
                            className="w-100 theme_btn"
                            variant="primary"
                            type="submit"
                          >
                            Save
                          </Button>
                        </Form>
                      </div>

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
                                    <img src={office} alt="" />
                                    <Form.Control
                                      type="text"
                                      className=""
                                      value={onboardingUser?.full_name}
                                      placeholder="Enter Full name"
                                      name="first_name"
                                      onChange={(e) =>
                                        setOnboardingUser((pre) => ({
                                          ...pre,
                                          full_name: e.target.value,
                                        }))
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={chair} alt="" />
                                    <Select
                                      className="w-100 slct_sign"
                                      name="designation"
                                      value={
                                        onboardingUser?.designation_id ||
                                        "option1"
                                      }
                                      placeholder="Select designation"
                                      onChange={(e) =>
                                        setOnboardingUser((prev) => ({
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
                                    <img src={office} alt="" />
                                    <Select
                                      className="w-100 slct_sign"
                                      value={
                                        onboardingUser?.office_id || "option1"
                                      }
                                      name="office_id"
                                      onChange={(e) =>
                                        setOnboardingUser((pre) => ({
                                          ...pre,
                                          office_id: e.target.value,
                                        }))
                                      }
                                    >
                                      <MenuItem
                                        disabled
                                        className="selectPlaceholder"
                                        value="option1"
                                      >
                                        Select Office Name
                                      </MenuItem>
                                      {officeNames &&
                                        officeNames.map((value, index) => {
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
                                    <img src={chair} alt="" />
                                    <Select
                                      className="w-100 slct_sign"
                                      value={
                                        onboardingUser?.department_id ||
                                        "option1"
                                      }
                                      name="department"
                                      onChange={(e) =>
                                        setOnboardingUser((pre) => ({
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
                              <div className="currentPic adm_profile position-relative text-center">
                                {onboardingUser?.profile_image === "" && (
                                  <img src={addPic} alt="" />
                                )}
                                {onboardingUser?.profile_image !== "" && (
                                  <img
                                    className="uploaded"
                                    src={onboardingUser?.profile_image}
                                    alt=""
                                  />
                                )}
                                {onboardingUser?.profile_image === "" && (
                                  <span className="mt-2 d-block">
                                    Add current photo
                                  </span>
                                )}
                                <input
                                  type="file"
                                  required
                                  onChange={(e) => {
                                    UseProfile(e.target.files[0]);
                                  }}
                                />
                              </div>
                            </Col>

                            <Col md={6} className="admn_numb_wrap">
                              <div className="number_inp_wrap w-100">
                                <input
                                  type="number"
                                  required
                                  className="input_nmbr"
                                  value={onboardingUser.phone}
                                  placeholder=" phone"
                                  name="phone"
                                  onChange={(e) =>
                                    e.target.value?.length <= 10
                                      ? setOnboardingUser((pre) => ({
                                        ...pre,
                                        phone: e.target.value,
                                      }))
                                      : ""
                                  }
                                  ref={phoneInputRef2}
                                />
                                <PhoneInput
                                  className="f_1 cntry_code p_2"
                                  international
                                  countryCallingCodeEditable={true}
                                  required
                                  name="country_code"
                                  value={onboardingUser?.country_code}
                                  defaultCountry={`${getCountryCodeFromCallingCode(onboardingUser?.country_code + onboardingUser?.phone) || "IN"}`}
                                  onChange={(e) => {
                                    setOnboardingUser((pre) => ({
                                      ...pre,
                                      country_code: e,
                                    }));
                                  }}
                                />
                              </div>
                            </Col>

                            <Col md={6} className="admn_eml_wrp">
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
                                  value={onboardingUser.email}
                                  placeholder="Official email id *"
                                  name="office_email"
                                  onChange={(e) => {
                                    setOnboardingUser((pre) => ({
                                      ...pre,
                                      email: e.target.value,
                                    }));
                                  }}
                                />
                                {emailExist && (
                                  <span
                                    style={{ color: "red" }}
                                    className="eml_txt_dngr"
                                  >
                                    This email already exists
                                  </span>
                                )}
                              </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                      </div>

                      <Form onSubmit={addUser}>
                        <div className="adminDetails sign_section">
                          <p className="onbrdheading sign_hdng">User rights</p>
                          <Row>
                            <Col md={4} className="mb-3">
                              <FormControlLabel
                                className="check_label"
                                control={<Checkbox />}
                                checked={
                                  onboardingUser?.admin_rignts
                                    ?.allowed_complete_access
                                }
                                name="allowed_complete_access"
                                onChange={handleAdminRights}
                                label="Allowed complete access"
                              />
                            </Col>
                            <Col md={4} className="mb-3">
                              <FormControlLabel
                                className="check_label"
                                control={<Checkbox />}
                                checked={
                                  onboardingUser?.admin_rignts
                                    .allowed_to_broadcast_tasks
                                }
                                name="allowed_to_broadcast_tasks"
                                onChange={handleAdminRights}
                                label="Allowed to broadcast tasks"
                              />
                            </Col>
                            <Col md={4} className="mb-3">
                              <FormControlLabel
                                className="check_label"
                                control={<Checkbox />}
                                checked={
                                  onboardingUser?.admin_rignts
                                    .allowed_to_purchase_content
                                }
                                name="allowed_to_purchase_content"
                                onChange={handleAdminRights}
                                label="Allowed to purchase content"
                              />
                            </Col>
                            <Col md={12}>
                              <div className="d-flex set_price">
                                <p className="mb-0 white_space">
                                  Set price range
                                </p>
                                <div className="row">
                                  <div className="col-lg-6">
                                    <Form.Group className="mb-4 form-group">
                                      <input
                                        type="number"
                                        className="w-100"
                                        name="minimum_price"
                                        placeholder="Min Price"
                                        value={
                                          onboardingUser?.admin_rignts
                                            ?.price_range?.minimum_price
                                        }
                                        onChange={handlePriceRange}
                                        disabled={
                                          !onboardingUser?.admin_rignts
                                            .allowed_to_purchase_content
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                  <div className="col-lg-6">
                                    <Form.Group className="mb-4 form-group">
                                      <input
                                        type="number"
                                        className="w-100"
                                        name="maximum_price"
                                        placeholder="Max Price"
                                        value={
                                          onboardingUser?.admin_rignts
                                            ?.price_range?.maximum_price
                                        }
                                        onChange={handlePriceRange}
                                        disabled={
                                          !onboardingUser?.admin_rignts
                                            .allowed_to_purchase_content
                                        }
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
                  {/* )} */}
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
            </Row>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default SignupUserN;
