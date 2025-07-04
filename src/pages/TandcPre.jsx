import React, { useEffect, useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Get, Post } from "../services/user.services";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import { successToasterFun } from "../component/commonFunction";
import moment from "moment";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const TandcPre = () => {
  const navigate = useNavigate();
  const officeDetails = JSON.parse(localStorage.getItem("OfficeDetails"));
  const CompanyDetails = JSON.parse(localStorage.getItem("CompanyDetails"));
  const adminPopup = JSON.parse(localStorage.getItem("AdminPopup"));
  const page1 = JSON.parse(localStorage.getItem("Page1"));
  const page3 = JSON.parse(localStorage.getItem("Page3"));
  const docs = JSON.parse(localStorage.getItem("docs"));
  const [loading, setLoading] = useState(false);
  const [cmsData, setCmsData] = useState("");

  const SignUp = async (e) => {
    e.preventDefault();

    try {
      const obj = {
        phone: page1?.administrator_details?.phone,
        email: page1?.office_email,
        user_name: page1?.office_email,
        role: "MediaHouse",
        password: adminPopup?.password,
        verified: true,
        full_name: `${adminPopup?.first_name} ${adminPopup?.last_name}`,
        first_name: adminPopup?.first_name,
        last_name: adminPopup?.last_name,
        designation_id: adminPopup?.designation_id,
        company_name: CompanyDetails?.company_name,
        company_number: CompanyDetails?.company_number,
        company_vat: CompanyDetails?.company_vat,
        profile_image: CompanyDetails?.profile_image,
        docs,
        admin_detail: {
          full_name: page1?.administrator_details?.full_name,
          first_name: page1?.administrator_details?.first_name,
          last_name: page1?.administrator_details?.last_name,
          office_type: adminPopup?.designation_id,
          office_name: page1?.administrator_details?.office_name,
          department: page1?.administrator_details?.department,
          admin_profile: page1?.administrator_details?.admin_profile,
          country_code: page1?.administrator_details?.country_code,
          phone: page1?.administrator_details?.phone,
          email: page1?.office_email,
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
        AdminEmail: page1?.office_email,
      };

      setLoading(true);
      localStorage.setItem("OnboardDetails", JSON.stringify(onboardDetails));
      const resp = await Post("auth/registerMediaHouse", obj);
      setLoading(false);
      if (resp) {
        localStorage.removeItem("OfficeDetails");
        localStorage.removeItem("AdminPopup");
        localStorage.removeItem("Page1");
        localStorage.removeItem("Page3");
        localStorage.removeItem("CompanyDetails");
        localStorage.removeItem("docs");
        localStorage.removeItem("designation");
        localStorage.removeItem("UserEmailId");

        successToasterFun("Registered Successfully")
        navigate("/Success");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
      setLoading(false);
    }
  };

  const getCMS = async () => {
    try {
      setLoading(true);
      const cms = await Promise.all([Get("mediaHouse/getGenralMgmt?legal=legal"), Get("mediaHouse/getGenralMgmt?privacy_policy=privacy_policy")]);
      setCmsData(cms);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCMS();
    window?.scrollTo(0, 0);
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
                          <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, document.body.scrollHeight)}><FaChevronCircleDown className='text-pink' /></Link></Tooltip>
                        </div>
                        <span className="txt_updated">Updated on {moment(cmsData?.[0]?.data?.updatedAt)?.format("DD MMMM, YYYY")}</span>
                      </div>
                      <div className="onboardStep upload_docs">
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: cmsData[0]?.data?.status?.description || "" }}>
                        </div>
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: cmsData[1]?.data?.status?.description || "" }}>
                        </div>
                      </div>
                      <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, 0)}><FaChevronCircleUp className='text-pink' /></Link></Tooltip>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default TandcPre;
