import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";

function DashBoardCardList(props) {
  const { setPayload, selectedCard = "", setSelectedCard = () => {} } = props;

  const handleClick = (type, id, typeOfContent) => {
    if (setPayload) {
      setPayload((prev) => ({
        ...prev,
        [type]: id,
        content_type: typeOfContent,
      }));

      setSelectedCard(id); // Update selectedCard state to current card ID
    } else {
      setSelectedCard(null); // Deselect if setPayload is not provided (if needed)
    }
  };
  console.log("propsss", props);

  return (
    <>
      <Card
        className={`list-card rcnt_act_card ${
          selectedCard === props.id ? "selected" : ""
        }`}
        style={{ padding: !props?.colorWhite ? "" : 0 }}
      >
        <CardContent
          className="dash-c-body"
          style={{
            backgroundColor: !props?.colorWhite
              ? ""
              : props?.colorWhite && selectedCard === props.id
              ? ""
              : "white",
          }}
          onClick={() => handleClick(props.type, props.id, props.content_type)}
        >
          <Link
            to={
              props.hasOwnProperty("contentId")
                ? `/Feeddetail/content/${props?.contentId}`
                : props.hasOwnProperty("contentDetail")
                ? `/content-details/${props?.contentDetail}`
                : props?.underScoreid &&
                  `/sourced-content-detail/${props?.underScoreid}`
            }
          >
            <div className="list-in d-flex align-items-start gap-2">
              <div className="rateReview_content">
                {props.reviewType && (
                  <span className="rateView-type">
                    <span className="volCount">{props.imageCount}</span>
                    <img
                      className=""
                      src={props.reviewType}
                      alt="review type"
                    />
                  </span>
                )}
                {props.imgtype === "audio" ? (
                  <div className="cstm_icn_wrpr">
                    <img
                      className="list-card-img me-0"
                      src={props.imgl}
                      alt="audio icon"
                    />
                  </div>
                ) : (
                  <img
                    className="list-card-img"
                    src={props.imgl}
                    alt="content image"
                  />
                )}
              </div>
              <div className="list-in-txt pt-1">
                <Typography
                  variant="body2"
                  className="list-car-txt txt_mdm mb-2"
                >
                  {props.listcard1}
                  <br />
                </Typography>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="#9DA3A3"
                  gutterBottom
                  className="crd_time d-flex align-items-center mb-0 txt_mdm"
                >
                  <MdOutlineWatchLater color="#000" />
                  {props.listcard2}
                </Typography>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

export default DashBoardCardList;
