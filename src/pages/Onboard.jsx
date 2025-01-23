
import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from "../component/HeaderN";
// import loginimg from "../assets/images/login-images/onbrdimg.svg";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AdminDetailsPopup from "../component/AdminDetailsPopup";
import Footerlandingpage from "../component/Footerlandingpage";
import UserDetailsPopup from "../component/UserDetailsPopup";
import LoginHeader from "../component/LoginHeader";

const Login = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* <HeaderN /> */}
      <LoginHeader/>
      <div className="login-page">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0">
              <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721377753819onbrdimg.svg"} alt="" className="resp_bg obj_fit_contain" />
                <div className="left-side bg-white cstm_ht">
                  <div className="pg_heading">
                    <h1>Onboard now</h1>
                  </div>
                  <div className="log_txt">
                    <p class="mb-0">
                      Join our growing tribe, and connect directly with the
                      people. Please add your company, offices, and employee
                      details to register
                    </p>
                  </div>
                  <Form>
                    <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
                      {submit && !isChecked && (
                        <span className="req_inp" style={{ color: "red" }}>
                          *
                        </span>
                      )}
                      <FormControlLabel
                        className="onbrd_chk"
                        control={<Checkbox />}
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked);
                          setIsChecked1(false)
                        }}
                      />
                      <div className="onboardText log_txt no_border mb-0 pb-0">
                        <Typography>
                          Are you the administrator? If yes, please check the
                          box to proceed ahead
                        </Typography>
                      </div>
                    </div>

                    <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
                      {submit && !isChecked && !isChecked1 && (
                        <span className="req_inp" style={{ color: "red" }}>
                          *
                        </span>
                      )}
                      <FormControlLabel
                        className="onbrd_chk"
                        control={<Checkbox />}
                        checked={isChecked1}
                        onChange={(e) => {
                          setIsChecked1(e.target.checked);
                          setIsChecked(false)
                        }}
                      />
                      <div className="onboardText log_txt no_border">
                        <Typography>
                          Are you a new user? If yes, please check the box to
                          proceed. You will need to request the adminstrator to
                          register you onto the Presshop platform, and assign
                          user rights to you
                        </Typography>
                        <Typography variant="body2">
                          It is essential that this onboarding process is
                          completed by a company nominated adminstrator as user
                          rights have to be granted to all official employees,
                          and associates across the offices
                        </Typography>
                        <Typography variant="body2" className="mb-0">
                          If you have any questions regarding the onboarding
                          process, please <a className="link">chat</a> with our
                          helpful team members, or send us an{" "}
                          <a className="link"> email</a>
                        </Typography>
                      </div>
                    </div>

                    {/* <Link to={"/Signup "}> */}
                    <Button
                      variant=""
                      onClick={() => {
                        setSubmit(true);
                        if (isChecked) {
                          setModalShow(true)
                        } else if (isChecked1) {
                          setModalShow1(true)
                        }
                      }}
                      className="theme-btn theme_btn custom-ab mb-4 w-100"
                    >
                      <span>Next</span>
                    </Button>

                    <AdminDetailsPopup
                      show={modalShow}
                      onHide={() => {
                        setModalShow(false)
                      }}
                    />

                    <UserDetailsPopup
                      show={modalShow1}
                      onHide={() => {
                        setModalShow1(false)
                      }

                      }
                    />
                    <h6 className="text-center mt-3">1 of 3</h6>
                  </Form>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="rt_col">
                <div className="right-side position-relative">
                  <span className="shape yl_sqr pos-abs"></span>
                  <span className="shape bl_crcl pos_abs"></span>
                  {/* <span className='shape gr_tri pos_abs'></span> */}
                  <span className="shape rd_crcl pos_abs"></span>
                  <div className="">
                    <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721377753819onbrdimg.svg"} className="rt_bg_img" alt="" srcset="" />
                  </div>
                  <div className="right_txt">
                    <p>
                      Let's start delivering{" "}
                      <span className="txt_bld">news</span>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footerlandingpage />
    </>
  );
};

export default Login;

// import { React, useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import HeaderN from "../component/HeaderN";
// // import loginimg from "../assets/images/login-images/onbrdimg.svg";
// import {
//   Checkbox,
//   FormControlLabel,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import AdminDetailsPopup from "../component/AdminDetailsPopup";
// import Footerlandingpage from "../component/Footerlandingpage";
// import UserDetailsPopup from "../component/UserDetailsPopup";
// import LoginHeader from "../component/LoginHeader";

// const Login = () => {
//   const [modalShow, setModalShow] = useState(false);
//   const [modalShow1, setModalShow1] = useState(false);

//   const [isChecked, setIsChecked] = useState(false);
//   const [isChecked1, setIsChecked1] = useState(false);
//   const [submit, setSubmit] = useState(false);

//   // useEffect(() => {
//   //   window.scrollTo(0, 0);
//   // }, []);

//   const handleAdminCheck = (e) => {
//     const checked = e.target.checked;
//     localStorage.setItem(
//       "isAdminstrator",
//       "admin"
//     );
//     setIsChecked(checked);
//     setIsChecked1(false);
//   };

//   const handleUserCheck = (e) => {
//     const checked = e.target.checked;
//     localStorage.setItem(
//       "isAdminstrator","user"
//     );
//     setIsChecked(false);
//     setIsChecked1(checked);
//   };


//   useEffect(() => {
  
//     window.scrollTo(0, 0);
//     const storedData = JSON.parse(localStorage.getItem("isAdminstrator")) || "";
//     if (storedData=="admin") setIsChecked(true);
//     if (storedData == "user") setIsChecked1(true);
//   }, []);

//   return (
//     <>
//       {/* <HeaderN /> */}
//       <LoginHeader />

//       <div className="login-page">
//         <Container fluid className="pdng">
//           <div className="log-wrap">
//             <Row className="row-w-m m-0">
//               <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
//                 <img
//                   src={
//                     "https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721377753819onbrdimg.svg"
//                   }
//                   alt=""
//                   className="resp_bg obj_fit_contain"
//                 />
//                 <div className="left-side bg-white cstm_ht">
//                   <div className="pg_heading">
//                     <h1>Onboard now</h1>
//                   </div>
//                   <div className="log_txt">
//                     <p class="mb-0">
//                       Join our growing tribe, and connect directly with the
//                       people. Please add your company, offices, and employee
//                       details to register
//                     </p>
//                   </div>
//                   <Form>
//                     <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
//                       {submit && !isChecked && (
//                         <span className="req_inp" style={{ color: "red" }}>
//                           *
//                         </span>
//                       )}
//                       {/* <FormControlLabel
//                         className="onbrd_chk"
//                         control={<Checkbox />}
//                         checked={isChecked}
//                         onChange={(e) => {
//                           const isUser= localStorage.getItem("isAdminstrator")?.adminstrator;

//                           if(!isUser){
//                             localStorage.setItem("isAdminstrator",{
//                               "adminstrator":e.target.checked
//                             })
//                             setIsChecked(e.target.checked);
//                             setIsChecked1(false)
//                           }else{
//                             setIsChecked(isUser);
                        
//                             setIsChecked(false);
//                           }
//                           // setIsChecked(e.target.checked);
//                           // setIsChecked1(false)
//                         }}
//                       /> */}
//                       <FormControlLabel
//                         className="onbrd_chk"
//                         control={<Checkbox />}
//                         checked={isChecked}
//                         onChange={handleAdminCheck}
//                         // onChange={(e) => {
//                         //   // Parse the `isAdminstrator` item from localStorage, or use `null` if it doesn’t exist
//                         //   const isUser = JSON.parse(
//                         //     localStorage.getItem("isAdminstrator")
//                         //   )?.adminstrator;

//                         //   if (!isUser && !isChecked) {
//                         //     // Set the item in localStorage with `JSON.stringify`
//                         //     localStorage.setItem(
//                         //       "isAdminstrator",
//                         //       JSON.stringify({ adminstrator: e.target.checked })
//                         //     );
//                         //     setIsChecked(e.target.checked);
//                         //     setIsChecked1(false);
//                         //   }
//                         // }}
//                       />

//                       <div className="onboardText log_txt no_border mb-0 pb-0">
//                         <Typography>
//                           Are you the administrator? If yes, please check the
//                           box to proceed ahead
//                         </Typography>
//                       </div>
//                     </div>

//                     <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
//                       {submit && !isChecked && !isChecked1 && (
//                         <span className="req_inp" style={{ color: "red" }}>
//                           *
//                         </span>
//                       )}
//                       <FormControlLabel
//                         className="onbrd_chk"
//                         control={<Checkbox />}
//                         checked={isChecked1}
//                         onChange={handleUserCheck} 
//                         // onChange={(e) => {
//                         //   const isUser =
//                         //     localStorage.getItem("isAdminstrator").user;

//                         //   if (!isUser) {
//                         //     localStorage.setItem("isAdminstrator", {
//                         //       user: e.target.checked,
//                         //     });
//                         //     setIsChecked1(e.target.checked);
//                         //     setIsChecked(false);
//                         //   } else {
//                         //     setIsChecked1(isUser);
//                         //     setIsChecked(false);
//                         //   }
//                         // }}
//                       />
//                       <div className="onboardText log_txt no_border">
//                         <Typography>
//                           Are you a new user? If yes, please check the box to
//                           proceed. You will need to request the adminstrator to
//                           register you onto the Presshop platform, and assign
//                           user rights to you
//                         </Typography>
//                         <Typography variant="body2">
//                           It is essential that this onboarding process is
//                           completed by a company nominated adminstrator as user
//                           rights have to be granted to all official employees,
//                           and associates across the offices
//                         </Typography>
//                         <Typography variant="body2" className="mb-0">
//                           If you have any questions regarding the onboarding
//                           process, please <a className="link">chat</a> with our
//                           helpful team members, or send us an{" "}
//                           <a className="link"> email</a>
//                         </Typography>
//                       </div>
//                     </div>

//                     {/* <Link to={"/Signup "}> */}
//                     <Button
//                       variant=""
//                       onClick={() => {
//                         setSubmit(true);
//                         if (isChecked) {
//                           setModalShow(true);
//                         } else if (isChecked1) {
//                           setModalShow1(true);
//                         }
//                       }}
//                       className="theme-btn theme_btn custom-ab mb-4 w-100"
//                     >
//                       <span>Next</span>
//                     </Button>

//                     <AdminDetailsPopup
//                       show={modalShow}
//                       onHide={() => {
//                         setModalShow(false);
//                       }}
//                     />

//                     <UserDetailsPopup
//                       show={modalShow1}
//                       onHide={() => {
//                         setModalShow1(false);
//                       }}
//                     />
//                     <h6 className="text-center mt-3">1 of 3</h6>
//                   </Form>
//                 </div>
//               </Col>
//               <Col lg={6} md={6} sm={12} xs={12} className="rt_col">
//                 <div className="right-side position-relative">
//                   <span className="shape yl_sqr pos-abs"></span>
//                   <span className="shape bl_crcl pos_abs"></span>
//                   {/* <span className='shape gr_tri pos_abs'></span> */}
//                   <span className="shape rd_crcl pos_abs"></span>
//                   <div className="">
//                     <img
//                       src={
//                         "https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721377753819onbrdimg.svg"
//                       }
//                       className="rt_bg_img"
//                       alt=""
//                       srcset=""
//                     />
//                   </div>
//                   <div className="right_txt">
//                     <p>
//                       Let's start delivering{" "}
//                       <span className="txt_bld">news</span>
//                     </p>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Container>
//       </div>
//       <Footerlandingpage />
//     </>
//   );
// };

// export default Login;
