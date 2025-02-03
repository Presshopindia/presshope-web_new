import React, { memo } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import facebook from '../assets/images/facebook.svg'
import linkedin from '../assets/images/linkedin.svg'
import instagram from '../assets/images/instagram.svg'
import google from '../assets/images/google.svg'
import twitter from '../assets/images/twitter.svg'
// import Footerbottom from '../component/Footerbottom'
const Footerold = () => {
    return (
        <>
            <div className="footer old">
                <Container fluid className="">
                    <div className="footer-txt">
                        <Row className="justify-content-center">
                            <Col sm={8}>
                                <h1 className="text-center">On a global mission to connect ~6.92 Bn smartphone users with ~21,000 publications</h1>
                                <div className="foot-logos text-center">
                                    <div className="img-wrap">
                                    <img  src={facebook} alt="Facebook" className="facebook" />
                                    </div>
                                    <div className="img-wrap">
                                    <img src={linkedin} alt="LinkedIn" />
                                    </div>
                                    <div className="img-wrap">
                                    <img src={instagram} alt="" className="instagram" />
                                    </div>
                                    <div className="img-wrap">
                                    <img src={google} alt="google" className="google"/>
                                    </div>
                                    <div className="img-wrap">
                                    <img src={twitter} alt="twitter" className="twitter"/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                        <div className="dark-layer"></div>
                        {/* <Footerbottom /> */}
            </div>
        </>
    )
}

export default memo(Footerold)