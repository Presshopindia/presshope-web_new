import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


function SwiperCard(props) {


    return (
        <>
            <div className="login-swiper-card">
                <Card className="dash-top-cards">
                    <CardContent className="dash-c-body">
                        <div className="card-imgs-wrap">
                            <img className="card-img" src={props.logimg} alt="1"  />
                        </div>
                        <Typography variant="body2" className="btm-txt mb-2">
                            {props.slidetext}
                            <br />
                        </Typography>
                        <Typography variant="body2" className="btm-txt-n mb-2">
                            {props.slidetext2}
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>

    );
}
export default SwiperCard;
