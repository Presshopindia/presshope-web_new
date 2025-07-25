import React, { useEffect, useRef, useState } from "react";
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
import website from "../assets/images/sortIcons/political.svg";
import addPic from "../assets/images/add-square.svg";
import ComputerPic from "../assets/images/computer.svg";
import mail from "../assets/images/mail.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Loader from "../component/Loader";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { debounce } from "lodash";

import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  adminDetailInitState,
  joinTribeHeadingSignUp,
  multiOfficeInitState,
} from "../component/staticData";
import { successToasterFun } from "../component/commonFunction";
import LoginHeader from "../component/LoginHeader";
import { useDarkMode } from "../context/DarkModeContext";
import ImageCrop from "../component/ImageCrop";

const Signup = () => {
  const localAdmin = JSON.parse(localStorage.getItem("AdminPopup"));
  const localOffice = JSON.parse(localStorage.getItem("OfficeDetails"));
  const navigate = useNavigate();
  const [officetypes, setOfficeTypes] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [officeNames, setOfficeNames] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [emailExist, setEmailExist] = useState(false);
  const [show, setShow] = useState(
    (multiOfficeInitState.length > 1 && true) || false
  );
  const [AdminDetails, setAdminDetails] = useState({ ...adminDetailInitState, office_email: localAdmin?.user_email });
  const [isWindowShowMessage, setIsWindowShowMessage] = useState(false);
  const [errorData, setErrorData] = useState({
    number: "",
    vat: "",
    phone: "",
    company_name: ""
  });
  const [loading, setLoading] = useState(false);
  const { adminPreRegistrationEmail } =
    useDarkMode();

  const [phoneErrors, setPhoneErrors] = useState([]);

  // Filtered designation-
  const filteredDesignation = designations.filter(
    (item) => item._id === localAdmin?.designation_id
  );

  // Check email debounce-
  const checkEmail = debounce(async (email) => {
    try {
      const resp = await Post(`mediaHouse/checkEmailAvailability`, { email });
      if (resp) setEmailExist(false);
    } catch (error) {
      setEmailExist(true);
    }
  }, 300);

  // Check company number function-
  const checkCompanyNumber = async (value) => {
    try {
      const resp = await Post(`mediaHouse/checkcompanyvalidation`, {
        key: "company_number",
        value,
      });
      if (resp.data.data === "Data exist") {
        setErrorData({ ...errorData, number: "Company number already exists" });
      }
    } catch (error) {
    }
  };

  // Check company vat function-
  const checkCompanyVat = async (value) => {
    try {
      const resp = await Post(`mediaHouse/checkcompanyvalidation`, {
        key: "company_vat",
        value,
      });
      if (resp.data.data === "Data exist") {
        setErrorData({ ...errorData, vat: "Company vat already exists" });
      }
    } catch (error) { }
  };

  // Check phone function-
  const checkPhone = async (value) => {
    try {
      const resp = await Post(`mediaHouse/checkcompanyvalidation`, {
        key: "phone",
        value,
      });
      if (resp.data.data === "Data exist") {
        setErrorData({
          ...errorData,
          phone: "This mobile number already exists.",
        });
      }
    } catch (error) { }
  };

  // Check company name function-
  const checkCompanyName = async (value) => {
    try {
      const resp = await Post(`mediaHouse/checkcompanyvalidation`, {
        key: "company_name",
        value,
      });
      if (resp.data.data === "Data exist") {
        setErrorData({
          ...errorData,
          company_name: "This company name already exists.",
        });
      }
    } catch (error) { }
  };

  // Handle company change-
  const handleCompanyChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAdminDetails((prev) => ({
      ...prev,
      company_details: { ...prev.company_details, [name]: value },
    }));

    setIsWindowShowMessage(true);
  };

  // Handle administrator function-
  const handleAdministratorChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAdminDetails((prev) => ({
      ...prev,
      administrator_details: { ...prev.administrator_details, [name]: value },
    }));
  };

  // Handle admin rights-
  const handleAdminRights = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    setAdminDetails((prev) => ({
      ...prev,
      admin_rights: { ...prev.admin_rights, [name]: value },
    }));
  };

  // Get office type-
  const getOfficeType = async () => {
    const list = await Get("mediaHouse/getOfficeType");
    setOfficeTypes(list.data.data);
  };

  // Get department type-
  const getDepartmentType = async () => {
    const list = await Get("mediaHouse/getDepartmentType");
    setDepartmentTypes(list.data.data);
  };

  // Get office details-
  const getOfficeDetails = async (vat) => {
    if (localStorage.getItem("OfficeDetails")) {
      const list = await Get(
        `mediaHouse/getOfficeDetail?company_vat=${vat ? vat : localOffice?.company_vat
        }`
      );
      if (list) setOfficeNames(list.data.data);
    }
  };

  // Next page function-
  const NextPage = async (e) => {
    e.preventDefault();
    // if(emailExist){
    //   toast.error("")
    // }
    if (officeNames.length === 0) {
      toast.error("Please select office details");
    } else if (AdminDetails.administrator_details.office_name === "") {
      toast.error("Please select office name");
    } else if (AdminDetails.administrator_details.admin_profile === "") {
      toast.error("Please select profile image");
    } else if (AdminDetails.administrator_details.department === "") {
      toast.error("Please select the department");
    } else if (AdminDetails.administrator_details.country_code === "") {
      toast.error("Please select the country code");
    } else if (errorData.phone ) {
      toast.error("This mobile number already exists. Please enter a new number.");
    } else if (AdminDetails.admin_rights.price_range.minimum_price === "" ) {
      toast.error("Please enter minimum price");
    } else if (AdminDetails.admin_rights.price_range.maximum_price === "" ) {
      toast.error("Please enter maximum price");
    } else {
      localStorage.setItem("Page1", JSON.stringify(AdminDetails));
      localStorage.setItem("designation", JSON.stringify(filteredDesignation[0]));
      const userEmailId = localStorage.getItem("UserEmailId");
      // data preboarding saving
      const step2Data = {
        email: userEmailId ?? adminPreRegistrationEmail,
        step2: {
          administrator_details: AdminDetails?.administrator_details,
          admin_rights: AdminDetails?.admin_rights,
        },
      };

      await Post(
        "mediaHouse/preRegistration",
        step2Data
      );

      if (localStorage.getItem("Page1")) {
        navigate("/upload-docs");
      }
    }
  };

  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageFile, setTempImageFile] = useState(null);
  const [isCompanyLogo, setIsCompanyLogo] = useState(true);
  const companyLogoInputRef = useRef(null);
  const adminProfileInputRef = useRef(null);

  const handleImageSelect = (e, isCompany = true) => {
    if (e.target.files && e.target.files.length > 0) {
      setTempImageFile(e.target.files[0]);
      setIsCompanyLogo(isCompany);
      setShowCropModal(true);
      // Reset the file input value
      if (isCompany) {
        companyLogoInputRef.current.value = '';
      } else {
        adminProfileInputRef.current.value = '';
      }
    }
  };

  const handleCropComplete = async (croppedFile) => {
    if (isCompanyLogo) {
      await AddCompanyLogo(croppedFile);
    } else {
      await AddAdminProfile(croppedFile);
    }
    setTempImageFile(null);
  };

  const AddCompanyLogo = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("path", "user");
      formData.append("media", file);

      // Upload the resized image
      const filepath = await Post("mediaHouse/uploadUserMedia", formData);

      // Update state with the new image path
      setAdminDetails((prev) => ({
        ...prev,
        company_details: {
          ...prev.company_details,
          profile_image: filepath.data.path,
        },
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to process image");
    }
  };

  // Add admin profile-
  const AddAdminProfile = async (file) => {
    try{
      setLoading(true);
      const Formdata = new FormData();
      Formdata.append("path", "user");
      Formdata.append("media", file);
  
      const filepath = await Post("mediaHouse/uploadUserMedia", Formdata);
      setAdminDetails((prev) => ({
        ...prev,
        administrator_details: {
          ...prev.administrator_details,
          admin_profile: filepath.data.path,
        },
      }));
      setLoading(false);
    }
    catch(error) {
      setLoading(false);
      toast.error("Failed to process image");
    }
  };

  const [mediahouseType, setMediahouseType] = useState([]);
  // Get designation-
  const getDesignation = async () => {
    const list = await Get(`mediaHouse/getCategoryType?type=designation`);
    setDesignation(list.data.data);
    const list2 = await Get(`mediaHouse/getCategoryType?type=user_type`);
    setMediahouseType(list2?.data?.data);
  };

  // Use effect-
  useEffect(() => {
    getOfficeType();
    getDepartmentType();
    getDesignation();
    getOfficeDetails(AdminDetails?.company_vat);
  }, []);

  // Add multiple offices-------------------------------------------------------------------------
  const [multiOffice, setMultiOffice] = useState(multiOfficeInitState);

  // Handle change for multi office-
  const handleMultiAddOffice = (index, name, value) => {
    const newOffice = [...multiOffice];
    if (name === "country" || name === "city" || name === "pincode" || name === "complete_address") {
      newOffice[index] = {
        ...newOffice[index],
        address: {
          ...newOffice[index].address,
          [name]: value,
        },
      };
    } else if (name === "checkbox") {
      newOffice[index] = {
        ...newOffice[index],
        [name]: value,
      };

      if (value) {
        newOffice.splice(index + 1, 0, {
          company_name: "",
          company_number: "",
          company_vat: "",
          profile_image: "",
          name: "",
          office_type_id: "",
          address: {
            country: "",
            city: "",
            complete_address: "",
            Pin_Location: { lat: "", long: "" },
            location: { type: "Point", coordinates: ["", ""] },
            pincode: "",
          },
          country_code: "",
          phone: "",
          website: `https://${""}`,
          is_another_office_exist: false,
        });
      } else {
        newOffice.splice(index + 1, 1);
      }
    } else {
      newOffice[index] = {
        ...newOffice[index],
        [name]: value,
      };
    }

    setMultiOffice(newOffice);
    setIsWindowShowMessage(true);
  };

  const handleValidation = (index, phone) => {
    const updatedErrors = [...phoneErrors];
    if (phone.length < 10) {
      updatedErrors[index] = "Mobile number should be 10 digits.";
    } else {
      updatedErrors[index] = ""; // Clear error if valid
    }
    setPhoneErrors(updatedErrors);
    // phoneErrors, setPhoneErrors
  };
  // Address-
  const searchBoxRefStreet = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const searchBoxRefPostalCode = useRef(null);
  const [showPostalCodePopUp, setPostalCodePopUp] = useState(false);
  const handlePostalCodePopUp = () => {
    setPostalCodePopUp(true);
  };

  // Google map address-
  const onMapLoadStreet = (index) => {
    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRefStreet.current
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      const htmlString = places[0].adr_address;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const countryNameElement = doc.querySelector(".country-name");
      const cityElement = doc.querySelector(".locality");

      if (countryNameElement) {
        const name = places[0]?.name;
        const address = places[0].formatted_address;
        const country = countryNameElement?.textContent;
        const city = cityElement?.textContent;
        const latitude = places[0].geometry.location.lat();
        const longitude = places[0].geometry.location.lng();

        setAdminDetails((prev) => ({
          ...prev,
          office_details: {
            ...prev.office_details,
            address,
            city,
            country,
            latitude,
            longitude,
          },
        }));

        setMultiOffice((prev) => {
          const newOffice = [...prev];

          newOffice[index] = {
            ...newOffice[index],
            post_code: name,
            address: {
              ...newOffice[index].address,
              complete_address: address,
              city,
              country,
              Pin_Location: {
                lat: latitude,
                long: longitude,
              },
              location: {
                type: "Point",
                coordinates: [latitude, longitude],
              },
              pincode: name,
            },
          };

          return newOffice;
        });
      }
    });
  };

  // Google map address-
  const onMapLoadPostalCode = (index) => {
    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRefPostalCode.current
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      const htmlString = places[0].adr_address;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const countryNameElement = doc.querySelector(".country-name");
      const cityElement = doc.querySelector(".locality");

      if (countryNameElement) {
        const name = places[0]?.name;
        const address = places[0].formatted_address;
        const country = countryNameElement?.textContent;
        const city = cityElement?.textContent;
        const latitude = places[0].geometry.location.lat();
        const longitude = places[0].geometry.location.lng();

        setMultiOffice((prev) => {
          const newOffice = [...prev];

          newOffice[index] = {
            ...newOffice[index],
            post_code: name,
            address: {
              ...newOffice[index].address,
              complete_address: address,
              city,
              country,
              Pin_Location: {
                lat: latitude,
                long: longitude,
              },
              location: {
                type: "Point",
                coordinates: [latitude, longitude],
              },
              pincode: name,
            },
          };

          return newOffice;
        });
      }
    });
  };

  const handleGetAllinformationAndAddAnotherOffice = async () => {
    try {
      const userEmailId = localStorage.getItem("UserEmailId");
      const list = await Get(
        `mediaHouse/getPreRegistrationData?email=${userEmailId}`
      );

      if (
        list?.data?.data?.step2 &&
        list?.data?.data?.step2?.office_details.length >= 1
      ) {
        const company_details = list?.data?.data?.step2?.company_details;
        const office_details = list?.data?.data?.step2?.office_details;
        // office_details.is_another_office_exist=true
        if (office_details.length > 0) {
          let length = office_details.length;
          office_details[length - 1].is_another_office_exist = true;
        }
        setAdminDetails({
          ...AdminDetails,
          company_details,
          office_details,
          // admin_rights
          ...(list?.data?.data?.step2?.administrator_details && {
            administrator_details:
              list?.data?.data?.step2?.administrator_details,
          }),
          ...(list?.data?.data?.step2?.admin_rights && {
            admin_rights: list?.data?.data?.step2?.admin_rights,
          }),
        });
        //  setAdminDetails({...AdminDetails,company_details,office_details})
        setMultiOffice(office_details);
      }
    } catch (error) { }
  };

  // Add office-
  const AddOffice = async (e) => {
    e.preventDefault();

    try {
      if (!AdminDetails?.company_details?.user_type || AdminDetails?.company_details?.user_type === "option1") {
        toast.error("Please select mediahouse type");
        return;
      }
  
      if (!AdminDetails?.company_details?.profile_image) {
        toast.error("Please select company logo");
        return;
      }
  
      if (!AdminDetails?.company_details?.company_number || AdminDetails?.company_details?.company_number?.length !== 8 ) {
        toast.error("Please enter valid company number");
        return;
      }
  
      if (!AdminDetails?.company_details?.company_vat || AdminDetails?.company_details?.company_vat?.length !== 9) {
        toast.error("Please enter valid company VAT");
        return;
      }

      let payload = multiOffice[multiOffice.length - 1];
      payload = {
        ...payload,
        company_name: AdminDetails.company_details.company_name,
        company_vat: AdminDetails.company_details.company_vat,
        company_number: AdminDetails.company_details.company_number,
        profile_image: AdminDetails.company_details.profile_image,
      };

      if (!payload?.office_type_id || payload?.office_type_id === "option1") {
        toast.error("Please select office type");
        return;
      }

      if (!payload?.phone || payload?.phone?.length !== 10) {
        toast.error("Please enter valid phone number");
        return;
      }


      setLoading(true);
      const resp = await Post("mediaHouse/addOfficeDetail", payload);
      if (resp) {
        setLoading(false);
        successToasterFun("Office added. Cheers");
        setShow(true);

        // Update all offices except the last one to have is_another_office_exist as true
        let newOffice = multiOffice.map((office, index) => {
          if (index < multiOffice.length) {
            return {
              ...office,
              is_another_office_exist: true
            };
          }
          return office;
        });
        
        setMultiOffice(newOffice);

        localStorage.setItem("OfficeDetails", JSON.stringify(newOffice));
        localStorage.setItem(
          "CompanyDetails",
          JSON.stringify(AdminDetails.company_details)
        );
        if (localStorage.getItem("OfficeDetails")) {
          getOfficeDetails(resp.data.Create_Office_Detail.company_vat);
        }
      }

      // localStorage.getItem("user")
      const userEmailId = localStorage.getItem("UserEmailId");
      
      // Use the updated newOffice array here as well
      const step2Data = {
        email: userEmailId ?? adminPreRegistrationEmail,
        step2: {
          company_details: AdminDetails?.company_details,
          office_details: newOffice,
        },
      };
      const respPreRegistrationData = await Post(
        "mediaHouse/preRegistration",
        step2Data
      );

      if (respPreRegistrationData) {
        setShow(true);
        setIsWindowShowMessage(false);
      }

      handleGetAllinformationAndAddAnotherOffice();
    } catch (error) {
      setLoading(false);
    }
  };

  // Phone input ref-
  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };

  const phoneInputRef1 = useRef(null);
  useEffect(() => {
    if (AdminDetails?.administrator_details?.country_code) {
      phoneInputRef1?.current?.focus();
    }
  }, [AdminDetails?.administrator_details?.country_code]);

  const handleGetAllinformation = async () => {
    try {
      const userEmailId = localStorage.getItem("UserEmailId");
      const list = await Get(
        `mediaHouse/getPreRegistrationData?email=${userEmailId}`
      );

      if (
        list?.data?.data?.step2 &&
        list?.data?.data?.step2?.office_details.length >= 1
      ) {
        const company_details = list?.data?.data?.step2?.company_details;
        const office_details = list?.data?.data?.step2?.office_details;
        // office_details.is_another_office_exist=true
        // if (office_details[0]) {
        //   office_details[0].is_another_office_exist = true; // Add property to the first office object
        // }
        setAdminDetails({
          ...AdminDetails,
          company_details,
          office_details,
          // admin_rights
          ...(list?.data?.data?.step2?.administrator_details && {
            administrator_details:
              list?.data?.data?.step2?.administrator_details,
          }),
          ...(list?.data?.data?.step2?.admin_rights && {
            admin_rights: list?.data?.data?.step2?.admin_rights,
          }),
        });

        //  setAdminDetails({...AdminDetails,company_details,office_details})
        setMultiOffice(office_details);
      }
    } catch (error) { }
  };
  useEffect(() => {
    setTimeout(() => {
      handleGetAllinformation();
    }, 1000);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isWindowShowMessage) {
        const message =
          "You have unsaved changes. If you leave, you will lose your data.";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isWindowShowMessage]);

  //for showing message when window close

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Display a custom message
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      {/* <HeaderN /> */}
      <LoginHeader />
      <div className="page-wrap login-page sign p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                <img
                  src={accessCenter}
                  alt=""
                  className="resp_bg obj_fit_contain"
                />
                <div className="login_stepsWrap left-pdng bg-white">
                  <div className="onboardMain">
                    <div className="onboardIntro">
                      <div className="pg_heading">
                        <h1 className="mb-0">Onboard now</h1>
                      </div>
                      <div className="onboardStep b_border">
                        <p className="mb-0 brd_btm_sign">
                          {joinTribeHeadingSignUp}
                        </p>
                      </div>
                    </div>
                    <div className="onboardStep">
                      <form onSubmit={AddOffice}>
                        <div className="companyDetails sign_section">
                          <p className="onbrdheading sign_hdng">
                            Company Details
                          </p>
                          <Row className="rw_gp_sml">
                            <Col lg={9} md={12} sm={12}>
                              <Row className="comp_frm_gap">
                                <Col md={6} className="">
                                  <Form.Group className="form-group">
                                    <img src={follower} alt="company" />
                                    <Form.Control
                                      type="text"
                                      className="rnd grey"
                                      name="company_name"
                                      required
                                      onChange={(e) => {
                                        checkCompanyName(e.target.value);
                                        setErrorData({
                                          ...errorData,
                                          company_name: "",
                                        });
                                        handleCompanyChange(e);
                                      }}
                                      placeholder="Company name *"
                                      value={
                                        AdminDetails?.company_details
                                          ?.company_name
                                      }
                                    />
                                    {errorData?.company_name && (
                                      <span className="errorInput">
                                        {errorData?.company_name}
                                      </span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="form-group">
                                    <img src={ComputerPic} alt="" />
                                    <Select
                                      className="w-100 slct_sign"
                                      required
                                      onChange={(e) => handleCompanyChange(e)}
                                      value={
                                        AdminDetails?.company_details?.user_type || "option1"
                                      }
                                      name="user_type"
                                    >
                                      <MenuItem
                                        className="selectPlaceholder"
                                        value="option1"
                                      >
                                        Kind
                                      </MenuItem>
                                      {mediahouseType?.map((el, i) => (
                                        <MenuItem
                                          className="selectPlaceholder"
                                          value={el?._id}
                                          key={i}
                                        >
                                          {el?.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </Form.Group>
                                </Col>
                                <Col md={6} sm={12} xs={12} style={{ marginTop: errorData?.company_name ? "0.5rem" : 0 }}>
                                  <Form.Group className="form-group">
                                    <img src={hash} alt="company" />
                                    <Form.Control
                                      type="text"
                                      className="rnd grey"
                                      name="company_number"
                                      maxLength={8}
                                      required
                                      onChange={(e) => {
                                        let inputValue = e.target.value;
                                        inputValue = inputValue.replace(
                                          /\D/g,
                                          ""
                                        );
                                        inputValue = inputValue.slice(0, 8);
                                        e.target.value = inputValue;
                                        checkCompanyNumber(inputValue);
                                        setErrorData({
                                          ...errorData,
                                          number: "",
                                        });
                                        handleCompanyChange(e);
                                      }}
                                      placeholder="Company number *"
                                      value={
                                        AdminDetails?.company_details
                                          ?.company_number
                                      }
                                    />
                                    {!errorData?.number &&
                                      AdminDetails?.company_details
                                        ?.company_number?.length < 8 && (
                                        <span className="errorInput">
                                          Please enter 8 digits
                                        </span>
                                      )}
                                    {errorData?.number && (
                                      <span className="errorInput">
                                        {errorData?.number}
                                      </span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={6} sm={12} xs={12} style={{ marginTop: errorData?.company_name ? "0.5rem" : 0 }}>
                                  <Form.Group className="form-group">
                                    <img src={Receipt} alt="company" />
                                    <Form.Control
                                      type="text"
                                      className="rnd grey"
                                      name="company_vat"
                                      required
                                      maxLength={9}
                                      onChange={(e) => {
                                        let inputValue = e.target.value;
                                        inputValue = inputValue.replace(
                                          /\D/g,
                                          ""
                                        );
                                        inputValue = inputValue.slice(0, 9);
                                        e.target.value = inputValue;

                                        checkCompanyVat(inputValue);
                                        setErrorData({ ...errorData, vat: "" });
                                        // if (inputValue) {
                                        //   handleCompanyChange(e);
                                        // }
                                        handleCompanyChange(e);
                                      }}
                                      placeholder="Company VAT *"
                                      value={
                                        AdminDetails?.company_details
                                          ?.company_vat
                                      }
                                    />
                                    {AdminDetails?.company_details?.company_vat
                                      ?.length < 9 &&
                                      !errorData.vat && (
                                        <span className="errorInput">
                                          Please enter 9 digits
                                        </span>
                                      )}
                                    {errorData.vat && (
                                      <span className="errorInput">
                                        {errorData.vat}
                                      </span>
                                    )}
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3} md={3} sm={12}>
                              <div className="currentPic logo_inp position-relative text-center p-0">
                                {AdminDetails?.company_details?.profile_image === "" && (
                                  <img src={addPic} alt="" />
                                )}
                                {AdminDetails?.company_details?.profile_image !== "" && (
                                  <img
                                    className="uploaded"
                                    src={AdminDetails?.company_details?.profile_image}
                                    alt=""
                                  />
                                )}
                                {AdminDetails?.company_details?.profile_image === "" && (
                                  <span className="mt-2 d-block">
                                    Add company logo
                                  </span>
                                )}
                                <input
                                  ref={companyLogoInputRef}
                                  type="file"
                                  onChange={(e) => handleImageSelect(e, true)}
                                  accept="image/*"
                                  style={{ padding: "0px" }}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="officeDetails sign_section">
                          <p className="onbrdheading sign_hdng">
                            Office details
                          </p>


                          {/* New work for multi offices adding */}
                          {multiOffice.map((el, index) => (
                            <>
                              <Row className="mt-2">
                                <Col md={6}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={office} alt="" />
                                    <Form.Control
                                      type="text"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="Enter office name *"
                                      name="name"
                                      required
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.name || ""}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={chair} alt="" />
                                    <Select
                                      className={el.is_another_office_exist ? "w-100 slct_sign invite-user-disable-field" : "w-100 slct_sign"}
                                      name="office_type_id"
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.office_type_id || "option1"}
                                    >
                                      <MenuItem
                                        className="selectPlaceholder"
                                        value="option1"
                                      >
                                        Select office type{" "}
                                      </MenuItem>
                                      {officetypes &&
                                        officetypes.map((value, index) => {
                                          return (
                                            <MenuItem
                                              value={value._id}
                                              key={index}
                                            >
                                              {value.name}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={office} alt="" />
                                    <Form.Control
                                      type="text"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="Apartment, suite/unit, floor, etc. *"
                                      name="number"
                                      required
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.number || ""}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={8} className="">
                                  <Form.Group className="mb-4 form-group">
                                    <img src={location} alt="" />
                                    <Form.Control
                                      type="text"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="Address *"
                                      name="complete_address"
                                      required
                                      disabled={el.is_another_office_exist}
                                      onFocus={handlePopupOpen}
                                      onClick={handlePopupOpen}
                                      ref={searchBoxRefStreet}
                                      value={el?.address?.complete_address}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {showPopup && (
                                      <div className="map-popup">
                                        <GoogleMap
                                          onLoad={() => onMapLoadStreet(index)}
                                        />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={location} alt="" />
                                    <Form.Control
                                      placeholder="Post code"
                                      className={el.is_another_office_exist ? "invite-user-disable-field addr_custom_inp w-100" : "addr_custom_inp w-100"}
                                      type="textarea"
                                      name="post_code"
                                      disabled={el.is_another_office_exist}
                                      onFocus={handlePostalCodePopUp}
                                      onClick={handlePostalCodePopUp}
                                      ref={searchBoxRefPostalCode}
                                      value={el.post_code}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {showPostalCodePopUp && (
                                      <div className="map-popup">
                                        <GoogleMap
                                          onLoad={() => onMapLoadPostalCode(index)}
                                        />
                                      </div>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={location} alt="" />
                                    <Form.Control
                                      type="text"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="City"
                                      name="city"
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.address.city || ""}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={location} alt="" />
                                    <Form.Control
                                      type="text"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="Country"
                                      name="country"
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.address.country || ""}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <div className={`number_inp_wrap ${el.is_another_office_exist ? "invite-user-disable-field" : ""}`}>
                                    {/* Phone start */}
                                    <input
                                      type="number"
                                      className={`input_nmbr ${el.is_another_office_exist ? "invite-user-disable-field" : ""}`}
                                      placeholder="Phone"
                                      name="phone"
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) => {
                                        if (e.target.value.length <= 10) {
                                          handleMultiAddOffice(
                                            index,
                                            e.target.name,
                                            e.target.value
                                          );
                                          handleValidation(
                                            index,
                                            e.target.value
                                          );
                                        }
                                      }}
                                      maxLength={10}
                                      value={el.phone || ""}
                                      ref={phoneInputRef}
                                    />
                                    <PhoneInput
                                      className="f_1 cntry_code"
                                      international
                                      required
                                      // disabled={el.is_another_office_exist}
                                      name="country_code"
                                      value={el?.country_code || ""}
                                      onChange={(e) => {
                                        handleMultiAddOffice(
                                          index,
                                          "country_code",
                                          e
                                        );
                                        handleCountryCodeChange(e);
                                      }}
                                    />
                                  </div>
                                  {phoneErrors[index] && (
                                    <p
                                      style={{ color: "red", fontSize: "13px" }}
                                    >
                                      {phoneErrors[index]}
                                    </p>
                                  )}
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-4 form-group">
                                    <img src={website} alt="" />
                                    <Form.Control
                                      type="url"
                                      className={el.is_another_office_exist ? "invite-user-disable-field" : ""}
                                      placeholder="Website"
                                      name="website"
                                      disabled={el.is_another_office_exist}
                                      onChange={(e) =>
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      value={el.website || ""}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              {el.is_another_office_exist ? (
                                <FormControlLabel
                                  className="anthr_office_check"
                                  // disabled={index !== multiOffice.length - 2}
                                  control={
                                    <Checkbox
                                      checked={el.checkbox || false}
                                      onChange={(e) => {
                                        handleMultiAddOffice(
                                          index,
                                          e.target.name,
                                          e.target.checked
                                        );
                                      }}
                                    />
                                  }
                                  label="Onboard another office"
                                  name="checkbox"
                                />
                              ) : null}

                              {index === multiOffice.length - 1 && !el.is_another_office_exist ? (
                                <Button
                                  className="w-100 theme_btn"
                                  type="submit"
                                  variant="primary"
                                >
                                  Save
                                </Button>
                              ) : null}
                            </>
                          ))}
                        </div>
                      </form>

                      {/* After completing 2nd steps */}

                      {show && (
                        <Form onSubmit={NextPage} autoComplete="off">
                          <div className="adminDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Administrator details
                            </p>
                            <Row className="row_gap_20">
                              <Col md={9}>
                                <Row className="comp_frm_gap">
                                  <Col lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group className="form-group">
                                      <img src={office} alt="" />
                                      <Form.Control
                                        type="text"
                                        className=""
                                        value={localAdmin?.first_name}
                                        placeholder="Enter first name"
                                        name="first_name"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group className="form-group">
                                      <img src={office} alt="" />
                                      <Form.Control
                                        type="text"
                                        className=""
                                        value={localAdmin?.last_name}
                                        placeholder="Enter last name"
                                        name="last_name"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={6} md={12} sm={12} xs={12}>
                                    {filteredDesignation &&
                                      filteredDesignation.map((item) => {
                                        return (
                                          <Form.Group className="form-group">
                                            <img src={chair} alt="" />
                                            <Form.Control
                                              type="text"
                                              className=""
                                              // disabled
                                              value={item.name}
                                              placeholder="Designation"
                                              name="designation_id"
                                            />
                                          </Form.Group>
                                        );
                                      })}
                                  </Col>
                                  <Col lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group className="form-group">
                                      <img src={office} alt="" />
                                      <Select
                                        className="w-100 slct_sign"
                                        value={
                                          AdminDetails.administrator_details
                                            .office_name
                                            ? AdminDetails.administrator_details
                                              .office_name
                                            : "option1"
                                        }
                                        name="office_name"
                                        onChange={handleAdministratorChange}
                                      >
                                        <MenuItem
                                          disabled
                                          className="selectPlaceholder"
                                          value="option1"
                                        >
                                          Select office name
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
                                </Row>
                              </Col>
                              <Col md={3}>
                                <div className="currentPic logo_inp position-relative text-center p-0">
                                  {AdminDetails.administrator_details
                                    .admin_profile === "" && (
                                      <img src={addPic} alt="" />
                                    )}
                                  {AdminDetails.administrator_details
                                    .admin_profile !== "" && (
                                      <img
                                        className="uploaded"
                                        src={
                                          AdminDetails.administrator_details
                                            .admin_profile
                                        }
                                        alt=""
                                      />
                                    )}
                                  {AdminDetails.administrator_details
                                    .admin_profile === "" && (
                                      <span className="mt-2 d-block">
                                        Add current photo
                                      </span>
                                    )}
                                  
                                  <input
                                    ref={adminProfileInputRef}
                                    type="file"
                                    onChange={(e) => handleImageSelect(e, false)}
                                    accept="image/*"
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="form-group">
                                  <img src={chair} alt="" />
                                  <Select
                                    className="w-100 slct_sign"
                                    value={
                                      AdminDetails.administrator_details
                                        .department
                                        ? AdminDetails.administrator_details
                                          .department
                                        : "option1"
                                    }
                                    name="department"
                                    onChange={handleAdministratorChange}
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
                                    value={
                                      localAdmin?.user_email
                                    }
                                    placeholder="Official email id *"
                                    name="office_email"
                                    onChange={(e) => {
                                      checkEmail(e.target.value);
                                      handleAdministratorChange(e);
                                    }}
                                  />
                                  {emailExist && (
                                    <span
                                      style={{ color: "red" }}
                                      className="eml_txt_dngr"
                                    >
                                      This email id already exists. Please enter a new email id.
                                    </span>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={6} className="admn_numb_wrap">
                                <div className="number_inp_wrap w-100">
                                  <input
                                    type="number"
                                    required
                                    className="input_nmbr"
                                    value={
                                      AdminDetails.administrator_details.phone
                                    }
                                    placeholder="Mobile number"
                                    name="phone"
                                    onChange={(e) => {
                                      if (e.target.value.length <= 10) {
                                        checkPhone(e.target.value);
                                        setErrorData({
                                          ...errorData,
                                          phone: "",
                                        });
                                        if (e.target.value.length <= 12) {
                                          handleAdministratorChange(e);
                                        }
                                      }
                                    }}
                                    maxLength={10}
                                    ref={phoneInputRef1}
                                  />
                                  <PhoneInput
                                    className="f_1 cntry_code"
                                    international
                                    // countryCallingCodeEditable={false}
                                    required
                                    name="country_code"
                                    value={
                                      AdminDetails?.administrator_details
                                        ?.country_code
                                    }
                                    onChange={(e) => {
                                      setAdminDetails((prev) => ({
                                        ...prev,
                                        administrator_details: {
                                          ...prev.administrator_details,
                                          country_code: e,
                                        },
                                      }));
                                    }}
                                  // readOnly
                                  />
                                  {AdminDetails.administrator_details.phone
                                    .length < 10 ? (
                                    <span className="errorInput">
                                      Mobile number should be 10 digits
                                    </span>
                                  ) : errorData.phone ? (
                                    <span className="errorInput" >
                                      {errorData.phone}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="adminDetails sign_section">
                            <p className="onbrdheading sign_hdng">
                              Administrator rights
                            </p>
                            <Row>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
                                      .allowed_to_onboard_users
                                  }
                                  name="allowed_to_onboard_users"
                                  onChange={handleAdminRights}
                                  label="Allowed to onboard  users"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
                                      .allowed_to_deregister_users
                                  }
                                  name="allowed_to_deregister_users"
                                  onChange={handleAdminRights}
                                  label="Allowed to de-register users "
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
                                      .allowed_to_assign_users_rights
                                  }
                                  name="allowed_to_set_financial_limit"
                                  onChange={handleAdminRights}
                                  label="Allowed to assign user rights"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
                                      .allowed_to_set_financial_limit
                                  }
                                  name="allowed_to_set_financial_limit"
                                  onChange={handleAdminRights}
                                  label="Allowed to set financial limits for users"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
                                      .allowed_complete_access
                                  }
                                  name="allowed_complete_access"
                                  onChange={handleAdminRights}
                                  label="Allowed complete access"
                                />
                              </Col>
                              <Col md={4} className="mb-3">
                                <FormControlLabel
                                  className="check_label"
                                  control={<Checkbox disabled />}
                                  checked={
                                    AdminDetails.admin_rights
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
                                    AdminDetails.admin_rights
                                      .allowed_to_purchase_content
                                  }
                                  name="allowed_to_purchase_content"
                                  onChange={handleAdminRights}
                                  label="Allowed to purchase content"
                                />
                              </Col>
                              <Col md={8}>
                                <div className="d-flex set_price">
                                  <p className="mb-0">Set price range</p>
                                  <Form.Group className="mb-4 form-group">
                                    <input
                                      type="text"
                                      value={
                                        AdminDetails.admin_rights.price_range
                                          .minimum_price
                                      }
                                      name="minimum_price"
                                      onChange={(e) => {
                                        setAdminDetails((prev) => ({
                                          ...prev,
                                          admin_rights: {
                                            ...prev.admin_rights,
                                            price_range: {
                                              ...prev.admin_rights.price_range,
                                              minimum_price: e.target.value,
                                            },
                                          },
                                        }));
                                      }}
                                      className="form-control minInput"
                                      placeholder="Min"
                                      disabled={
                                        !AdminDetails.admin_rights
                                          .allowed_to_purchase_content
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-4 form-group">
                                    <input
                                      name="maximum_price"
                                      type="text"
                                      value={
                                        AdminDetails.admin_rights.price_range
                                          .maximum_price
                                      }
                                      onChange={(e) => {
                                        setAdminDetails((prev) => ({
                                          ...prev,
                                          admin_rights: {
                                            ...prev.admin_rights,
                                            price_range: {
                                              ...prev.admin_rights.price_range,
                                              maximum_price: e.target.value,
                                            },
                                          },
                                        }));
                                      }}
                                      className="form-control minInput"
                                      placeholder="Max"
                                      disabled={
                                        !AdminDetails.admin_rights
                                          .allowed_to_purchase_content
                                      }
                                    />
                                  </Form.Group>
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
                              Next
                            </Button>
                            <h6 className="text-center mt-3">1 of 3</h6>
                          </div>
                        </Form>
                      )}
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="rt_col pos_stick position-relative"
              >
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

export default Signup;
