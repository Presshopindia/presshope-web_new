import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
// import tick from '../assets/images/email-template.gif'
import Button from 'react-bootstrap/Button';
const SignupSuccess = () => {
    return (
        <> 
            <div className="signup-successful">
                <Container>
                    <div className="sucess-page">
                        <Row className="justify-content-center">
                            <Col lg="7">
                                <div className="sucess-text text-center">
                                    <div className="thumb-img text-center">
                                        <img src={""} alt="" />
                                    </div>
                                    <h1 className="text-center">Signup success!</h1>
                                    <Typography className="sucess-p text-center">
                                        Congratulations, your account has been successfully created. Check your email to get started!
                                    </Typography>
                                    <Button variant="" type="submit" className="theme-btn btn-d">
                                        <span>
                                            {/* <Link to="/">Submit</Link> */}
                                            Resend email
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default SignupSuccess