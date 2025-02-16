import { Card, CardActions, CardContent, Typography } from "@mui/material"
import { BsArrowRight } from "react-icons/bs"
import { Link } from "react-router-dom"

export const ReportAccountCardInfo = ({
    path = "",
    title = "",
    total = 0,
    data = [],
    task = false
}) => {
    return (
        <Card className={task ? "dash-top-cards tsk" : "dash-top-cards crd_edit"}>
            <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                    <div className={task ? "sortFilter_actions" : "edit_card_sel"}>
                        <svg
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M0.747559 6.15625H19.4976"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M0.747559 10.8438H19.4976"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.21631 6.15625V15.5312"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <Link to={path}>
                        <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                        >
                            {total}
                        </Typography>
                    </Link>
                </div>
                <Link to={path}>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                    >
                        {title}
                    </Typography>
                </Link>
            </CardContent>
            <Link to={path}>
                <CardActions className="dash-c-foot">
                    <div className="card-imgs-wrap">
                        {
                            data?.map((el) => <img src={el} key={el} alt={el} className="card-img" />)
                        }
                        <span>
                            {" "}
                            <BsArrowRight />
                        </span>
                    </div>
                </CardActions>
            </Link>
        </Card>
    )
}