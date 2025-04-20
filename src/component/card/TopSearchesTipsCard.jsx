import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { Get } from "../../services/user.services";
import { Link } from "react-router-dom";
import { capitalizeWord } from "../commonFunction"

function TopSearchesTipsCard(props) {
  const [content_count, setContent_count] = useState([]);

  const ChatCount = async () => {
    // setLoading(true)
    try {
      const resp = await Get(`mediahouse/trending_search`);
      setContent_count(resp?.data?.response);
      // console.log("resp?.data?.response--------->", resp?.data?.response)
    } catch (error) {
      // setLoading(false)
    }
  };

  useEffect(() => {
    ChatCount();
  }, []);

  return (
    <>
      <div className="topSearches_tipsCard">
        <Row>
          <Col lg={12} className="p-md-0">
            <Card className="dash-top-cards listing trending-search mt-0 mr-0 p-0">
              <CardContent className="dash-c-body rev">
                <div className="mb-3">
                  <h2 className="dashCard-heading p-0 mb-4">
                    Trending searches
                  </h2>
                  <div className="trendSearch_wrap mt-3">
                    {content_count
                      ?.filter((el) => el._id !== "")
                      ?.slice(0, 7)
                      .map((curr) => {
                        return (
                          <span key={curr._id}>
                            <Link to={`/content-search/${curr._id}`}>
                              {capitalizeWord(curr?._id)}
                            </Link>
                          </span>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default TopSearchesTipsCard;
