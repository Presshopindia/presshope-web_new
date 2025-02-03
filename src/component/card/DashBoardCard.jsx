import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BsArrowRight } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function DashBoardCard(props) {


  const [name, setName] = useState("Word of the Day")

  return (
    <>
      <Card className="dash-top-cards">
        <CardContent className="dash-c-body">
          <div className="cardCustomHead">
            <Typography variant="body2" className="card-head-txt mb-2">
              {props.cardhead}
              <br />
            </Typography>
          </div>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom className="cardContent_head">
            {props.ccontent}
          </Typography>
        </CardContent>
        <CardActions className="dash-c-foot">
          <div className="card-imgs-wrap">
            <img className="card-img" src={props.imgs} alt="1" />
            <img className="card-img" src={props.img1} alt="2" />
            <img className="card-img" src={props.img2} alt="2" />
            <span> {props.arrow}<BsArrowRight /></span>
          </div>
        </CardActions>
      </Card>
    </>
  );
}
export default DashBoardCard;
