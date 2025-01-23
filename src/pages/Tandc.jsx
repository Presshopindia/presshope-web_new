import React, { useEffect, useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Form } from "react-bootstrap";
import accessCenter from "../assets/images/accessCenter.png";
import addPic from "../assets/images/add-square.svg";
// import 'react-phone-number-input/style.css';
import tandcimg from "../assets/images/tandcimg.png";
import { Checkbox, FormControlLabel, Button, Tooltip } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import axios from "axios";
import { successToasterFun } from "../component/commonFunction";
import moment from "moment";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";

const Tandc = () => {
  const navigate = useNavigate();
  const officeDetails = JSON.parse(localStorage.getItem("OfficeDetails"));
  const CompanyDetails = JSON.parse(localStorage.getItem("CompanyDetails"));
  const adminPopup = JSON.parse(localStorage.getItem("AdminPopup"));
  const page1 = JSON.parse(localStorage.getItem("Page1"));
  const page2 = JSON.parse(localStorage.getItem("Page2"));
  const page3 = JSON.parse(localStorage.getItem("Page3"));
  const [loading, setLoading] = useState(false);
  const [cmsData, setCmsData] = useState("");

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  const [isChecked, setIsChecked] = useState({
    sign_leagel_terms: {
      is_condition_one: false,
      is_condition_two: false,
      is_condition_three: false,
    },
  });

  const handleChange = (e) => {
    setIsChecked((prev) => ({
      ...prev,
      sign_leagel_terms: {
        ...prev.sign_leagel_terms,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  const deletePreOnboardDetails=async(email)=>{
    try{
      // const resp = await Get(`auth/registerMediaHouse?email=${email}`);
      console.log("userEmail ------> ----->",email)
      const resp = await Get(
        `mediaHouse/deletePreRegistrationData?email=${email}`
      );
      if(resp){
        console.log(resp);
        localStorage.removeItem("UserEmailId");
       
      }
    }catch(error){
      console.log("error -->",error);
    }
  }

  const SignUp = async (e) => {
    e.preventDefault();

    try {
      const obj = {
        phone: page1?.administrator_details?.phone,
        email: page1?.administrator_details?.office_email,
        user_name: page1?.administrator_details?.office_email,
        role: "MediaHouse",
        password: adminPopup?.password,
        verified: false,
        full_name: `${adminPopup?.first_name} ${adminPopup?.last_name}`,
        first_name: adminPopup?.first_name,
        last_name: adminPopup?.last_name,
        designation_id: adminPopup?.designation_id,
        company_name: CompanyDetails?.company_name,
        company_number: CompanyDetails?.company_number,
        company_vat: CompanyDetails?.company_vat,
        profile_image: CompanyDetails?.profile_image,
        user_type_id: CompanyDetails?.user_type,
        docs: JSON.parse(localStorage.getItem("docs")),
        // office_details: [
        //   {
        //     name: officeDetails?.name,
        //     office_type_id: officeDetails?.office_type_id,
        //     address: {
        //       pincode: page1?.office_details.pincode,
        //       country: page1?.office_details.country,
        //       city: page1?.office_details.city,
        //       complete_address: page1?.office_details.address,
        //       Pin_Location: {
        //         lat: page1?.office_details.latitude,
        //         long: page1?.office_details.longitude,
        //       },
        //       location: {
        //         type: "Point",
        //         coordinates: [
        //           page1?.office_details.latitude,
        //           page1?.office_details.longitude,
        //         ],
        //       },
        //     },
        //     country_code: page1?.office_details.country_code,
        //     phone: page1?.office_details.phone,
        //     website: page1?.office_details.website,
        //     is_another_office_exist: false,
        //   },
        // ],
        office_details: officeDetails,
        admin_detail: {
          full_name: `${adminPopup?.first_name} ${adminPopup?.last_name}`,
          first_name: adminPopup?.first_name,
          last_name: adminPopup?.last_name,  
          office_type: adminPopup?.designation_id,
          office_name: page1?.administrator_details?.office_name,
          department: page1?.administrator_details?.department,
          admin_profile: page1?.administrator_details?.admin_profile,
          country_code: page1?.administrator_details?.country_code,
          phone: page1?.administrator_details?.phone,
          email: page1?.administrator_details?.office_email,
        },
        admin_rignts: {
          allowed_to_onboard_users:
            page1?.admin_rights.allowed_to_onboard_users,
          allowed_to_deregister_users:
            page1?.admin_rights.allowed_to_deregister_users,
          allowed_to_assign_users_rights:
            page1?.admin_rights.allowed_to_assign_users_rights,
          allowed_to_set_financial_limit:
            page1?.admin_rights.allowed_to_set_financial_limit,
          allowed_complete_access: page1?.admin_rights.allowed_complete_access,
          allowed_to_broadcast_tasks:
            page1?.admin_rights.allowed_to_broadcast_tasks,
          allowed_to_purchase_content:
            page1?.admin_rights.allowed_to_purchase_content,
          price_range: {
            minimum_price: page1?.admin_rights.price_range.minimum_price,
            maximum_price: page1?.admin_rights.price_range.maximum_price,
          },
        },
        is_administator: true,
        is_responsible_for_user_rights: false,
        is_responsible_for_granting_purchasing: true,
        is_responsible_for_fixing_minimum_and_maximum_financial_limits: false,
        is_confirm: true,
        company_bank_details: {
          company_account_name: page3?.company_account_name,
          bank_name: page3?.bank_name,
          sort_code: page3?.sort_code,
          account_number: page3?.account_number,
          is_default: page3?.is_default,
        },
        sign_leagel_terms: {
          is_condition_one: true,
          is_condition_two: true,
          is_condition_three: true,
        },
      };

      const onboardDetails = {
        AdminName: `${adminPopup?.first_name} ${adminPopup?.last_name}`,
        AdminEmail: page1?.administrator_details?.office_email,
      };

      setLoading(true);
      localStorage.setItem("OnboardDetails", JSON.stringify(onboardDetails));
      const resp = await Post("auth/registerMediaHouse", obj);
      setLoading(false);
      if (resp) {
        localStorage.removeItem("OfficeDetails");
        localStorage.removeItem("AdminPopup");
        localStorage.removeItem("Page1");
        localStorage.removeItem("Page2");
        localStorage.removeItem("Page3");
        const UserEmailId=localStorage.getItem("UserEmailId")
        await deletePreOnboardDetails(UserEmailId)
        toast.success("Registered Successfully")
        navigate("/Success");
      }
    } catch (error) {
      setLoading(false);
      successToasterFun(error.message)
      console.log("Error in mediahouse", error)
      setLoading(false);
    }
  };


  const getCMS = async () => {
    try {
      setLoading(true);
      const cms = await Promise.all([Get("mediaHouse/getGenralMgmt?legal=legal"), Get("mediaHouse/getGenralMgmt?privacy_policy=privacy_policy")]);
      // console.log('cms---', cms)
      setCmsData(cms);
      setLoading(false);
    }
    catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCMS();
  }, [])

  return (
    <>
      {
        loading && <Loader />
      }
      <HeaderN />
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0">
              <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                <Form onSubmit={(e) => SignUp(e)}>
                  <div className="login_stepsWrap left-pdng bg-white">
                    <div className="onboardMain">
                      <div className="onboardIntro sign_section post">
                        <div className='d-flex justify-content-between'>
                          <h1 className="mb-0 pg_hdng">Legal T&Cs</h1>
                          <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, document.body.scrollHeight)}><FaRegArrowAltCircleDown className='text-pink' /></Link></Tooltip>
                        </div>
                        <span className="txt_updated">Updated on {moment(cmsData?.[0]?.data?.updatedAt)?.format("DD MMMM, YYYY")}</span>
                        <div className="onboardStep b_border top_txt mt-4">
                          <p>
                            Please sign our legal terms & conditions, privacy
                            policy, and content licensing agreement to complete
                            your on-boarding
                          </p>
                          <p>
                            If you have any questions, and would like to have a
                            quick chat have with our helpful team members,
                            kindly contact us. Thanks!
                          </p>
                        </div>
                      </div>
                      <div className="onboardStep upload_docs">

                        {/* Terms and condition */}
                        {/* <div className="onboardStep b_border top_txt mb-4">
                          <p className="sub_h">Terms and Conditions</p>
                          <div className="txt_tandc">
                            <p className="sub_sub_h">What & Why</p>
                            <p className="mb-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                          <div className="txt_tandc">
                            <p className="sub_sub_h mb-3">What & Why</p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                        </div> */}
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: cmsData[0]?.data?.status?.description || "" }}>
                        </div>

                        {/* <div className="onboardStep b_border top_txt mb-4">
                          <p className="sub_h">Copyright and licensing</p>
                          <div className="txt_tandc">
                            <p className="sub_sub_h">What & Why</p>
                            <p className="mb-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                          <div className="txt_tandc">
                            <p className="sub_sub_h mb-3">What & Why</p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                        </div> */}

                        {/* Privacy Policy */}
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: cmsData[1]?.data?.status?.description || "" }}>
                        </div>
                        {/* <div className="onboardStep b_border top_txt mb-4">
                          <p className="sub_h">Privacy policy</p>
                          <div className="txt_tandc">
                            <p className="sub_sub_h">What & Why</p>
                            <p className="mb-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                          <div className="txt_tandc">
                            <p className="sub_sub_h mb-3">What & Why</p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                        </div> */}
                        <div className="onboardStep b_border top_txt mb-4">
                          <div className="txt_tandc btm_checks">
                            <p className="">
                              Please confirm that you’ve read our terms &
                              conditions, and our privacy policy by accepting
                              all the conditions below
                            </p>
                            <FormControlLabel
                              className="tandc_check check_label"
                              control={<Checkbox />}
                              name="is_condition_one"
                              value="option1"
                              inputProps={{ "aria-label": "Option 1" }}
                              onChange={handleChange}
                              label="I agree to Presshop's Terms and Conditions & Privacy Policy."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="stepFooter d-flex justify-content-between gap-padding">
                        <Button type="submit" className="w-100" variant="primary">Finish</Button>
                        {/* <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, 0)}><FaRegArrowAltCircleUp className='text-pink' /></Link></Tooltip> */}
                      </div>
                      <h6 className="text-center mt-3">3 of 3</h6>
                    </div>
                  </div>
                </Form>
              </Col>
              <Col lg="6" className="">
                <div className="left-side">
                  <img src={tandcimg} alt="" />
                  <h2 className="mt-3 text-center">
                    View, chat, negotiate, and buy content instantly
                  </h2>
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

export default Tandc;
