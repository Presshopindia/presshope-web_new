import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


function LoginCardN(props) {

    return (
        <>
            <div className="login-swiper-card">
                <Card className="dash-top-cards log-card">
                    <CardContent className="dash-c-body">
                        <div className="card-imgs-wrap">
                            <img className="card-img" src={props.imgN} alt="1"  />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
export default LoginCardN;
