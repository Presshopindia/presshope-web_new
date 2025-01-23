import Header from "../component/Header"
import DbFooter from "../component/DbFooter"
import { Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import { DateRangePicker } from 'react-date-range';

const startDate = new Date();
startDate.setDate(startDate.getDate() - 31);
// startDate.setMonth(startDate.getMonth() - 1);

const endDate = new Date();
endDate.setDate(endDate.getDate() - 31);

// endDate.setMonth(endDate.getMonth() - 1);

console.log("startdate",startDate)
console.log("enddate",endDate)
const ArchieveDates = () => {

    const [selectionRange, setSelectionRange] = useState({
        startDate,
        endDate,
        key: 'selection',
    });

    const handleSelect = (ranges) => {
        setSelectionRange({ startDate: ranges?.selection?.startDate, endDate: ranges?.selection?.endDate, key: "selection" })
    };


    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 31);

    return (
        <>
            <Header />
            <div className="feedTags_search">
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <div className="feedPreviews d-flex justify-content-between align-items-center">
                                <div className="FundsfeedHdTags_wrap">
                                    <Link className="backtoLink" onClick={() => history.back()}>
                                        <BsArrowLeft className="text-pink" /> Back
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="page-wrap dashb_page">
                <Container fluid>
                    <h1>Archived items</h1>
                    <div className="archivesWrap">
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            maxDate={maxDate}
                            staticRanges={[]}
                            inputRanges={[]}

                        />
                        <div className="text-center">
                            <Link className="btn MuiButton-primary" to={`/archieve-items/:${new Date(selectionRange.startDate).toISOString()}/:${new Date(selectionRange.endDate).toISOString()}`}>Check Archived Items</Link>
                        </div>
                    </div>
                </Container >

            </div >
            <DbFooter />
        </>

    )
}

export default ArchieveDates