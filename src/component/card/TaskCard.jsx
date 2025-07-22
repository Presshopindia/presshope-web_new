import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";

function TaskCard(props) {
  return (
    <Card className={`list-card rcnt_act_card selected bg_grey`}>
      <CardContent className="dash-c-body">
        <Link
          to={props?.linkTo}
        >
          <div className="list-in d-flex align-items-start gap-2">
            <div className="rateReview_content">
              {props.reviewType && (
                <span className="rateView-type">
                  <span className="volCount">{props?.imageCount}</span>
                </span>
              )}
              <img
                className="list-card-img light-gray-bg"
                src={props?.imgl}
                alt="content image"
              />
            </div>
            <div className="list-in-txt pt-1">
              <Typography
                variant="body2"
                className="list-car-txt txt_mdm mb-2"
              >
                {props?.listcard1}
                <br />
              </Typography>
              <Typography
                sx={{ fontSize: 12 }}
                color="#9DA3A3"
                gutterBottom
                className="crd_time d-flex align-items-center mb-0 txt_mdm"
              >
                <MdOutlineWatchLater color="#000" />
                {props?.listcard2}
              </Typography>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
