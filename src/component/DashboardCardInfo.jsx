import { Card, CardActions, CardContent, Typography } from "@mui/material"
import { BsArrowDown, BsArrowRight, BsArrowUp, BsChevronDown } from "react-icons/bs"
import CommonSort from "./Sortfilters/commonSort"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

export const DashboardCardInfo = ({
    path = "",
    type = "",
    title = "",
    total = 0,
    data = [],
    sort,
    setSort,
    dashboardSort,
    setDashboardSort,
    setSortState,
    handleSortClick,
    showSort = true,
    task = false,
    trend = {},
    handleClearSort
}) => {

    return (
        <Card className="dash-top-cards crd_edit">
            <CardContent className="dash-c-body">
                <div className="cardCustomHead">
                    <div className="edit_card_sel">
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
                        {
                            showSort && (
                                <div className="fltrs_prnt">
                                    <Button className="sort_btn" onClick={() => handleSortClick(type)} >
                                        Sort <BsChevronDown />
                                    </Button>
                                    {
                                        (dashboardSort?.type === type) && (
                                            <CommonSort
                                                sort={sort}
                                                setSort={setSort}
                                                dashboardSort={dashboardSort}
                                                setDashboardSort={setDashboardSort}
                                                setSortState={setSortState}
                                                handleClearSort={handleClearSort}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
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
                {
                    Object.keys(trend)?.length ? (
                        <div className="content_stat">
                            {
                                sort && (trend?.status === "Increasing" || trend?.status === "Decreasing") ? (
                                    <span className={trend?.status === "Increasing" ? "stat_up" : "stat_down"}>
                                        {trend?.status === "Increasing" ? <BsArrowUp /> : <BsArrowDown />} {trend?.percentage}
                                    </span>
                                ) : <span>{"No change "}</span>
                            }

                            <span>{trend?.period}</span>
                        </div>
                    ) : null
                }
            </CardContent>
            {
                data?.length > 0 && (
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
                )
            }
        </Card>
    )
}