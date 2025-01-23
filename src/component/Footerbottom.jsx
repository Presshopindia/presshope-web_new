import React, { memo } from 'react'
import { Container } from "react-bootstrap";
import Typography from "@mui/material/Typography";
const Footerbottom = () => {
    return (
        <>
        <section className="footer-bottom">
            <Container fluid className="">
                <div className="copyright">
                    <Typography className="text-center">
                        Copyright © 2024 Presshop UK. All Rights Reserved.
                    </Typography>
                </div>
            </Container>
            </section>
        </>
    )
}

export default memo(Footerbottom)