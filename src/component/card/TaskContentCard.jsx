import * as React from "react";
import { CardActions, Button, Card, CardContent, Typography } from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import fav from "../../assets/images/star.svg";
import taskCategory from "../../assets/images/taskCategory.svg";
function TaskContentCard(props) {

  return (
    <>
      <Card className="homeFeedCard">
        <CardContent className="homeFeed_body">
          <div className="feedImgTag">
            <img className="feedMedia" src={props.feedImg} alt="" />
            <img className="feedMediaType iconBg" src={props.feedType} alt="" />
            <img className="iconBg favCont" src={fav} alt="" />
            {props && props.feedTag && <span>{props.feedTag}</span>}
          </div>
          <div className="feedContent_wrap">
            <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
              <div className="authorType">
                <img src={props.userAvatar} alt="" />
                <span className="authName">{props.authorName}</span>
              </div>
              <div className="content_type">
                <img src={taskCategory} alt="" />
                <span className="typeOfContent">{props.type_tag}</span>
              </div>
            </div>
            <Typography variant="body2" className="card-head-txt mb-2">
              {props.feedHead}
              <br />
            </Typography>
            <div className="feed_dateTime">
              <small className="feedTime"><MdOutlineWatchLater /> {props.feedTime}</small>
              <small className="feedLocation"><GrLocation />{props.feedLocation}</small>
            </div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom className=""
            >
              {props.ccontent}
            </Typography>
          </div>
        </CardContent>
        <CardActions className="dash-c-foot feedFooter justify-content-between">
          <Button variant="secondary">View task</Button>
          <Button variant="primary" className="contentPrice_btn">{props.contentPrice}</Button>
        </CardActions>
      </Card>
    </>

  );
}
export default TaskContentCard;
