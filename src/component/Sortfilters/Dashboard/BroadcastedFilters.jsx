import React, { useEffect, useState } from "react";
import contentic from "../../../assets/images/sortIcons/content.svg";
import closeic from "../../../assets/images/sortIcons/close.svg";
import exclusiveic from "../../../assets/images/exclusive.svg";
import sharedic from "../../../assets/images/shared.svg";
import { FiSearch } from "react-icons/fi";
import livetasksic from "../../../assets/images/sortIcons/livetasks.png";
import completedtaskic from "../../../assets/images/sortIcons/completedtask.svg";
import taskintimeic from "../../../assets/images/sortIcons/taskintime.svg";
import delayedtaskic from "../../../assets/images/sortIcons/delayedtask.svg";
import calendaric from "../../../assets/images/calendar.svg";
import locationic from "../../../assets/images/location.svg";
import latestic from "../../../assets/images/sortIcons/latest.svg";
import celebrityic from "../../../assets/images/sortIcons/celebrity.svg";
import crimeic from "../../../assets/images/sortIcons/crime.svg";
import politicalic from "../../../assets/images/sortIcons/political.svg";
import businessic from "../../../assets/images/sortIcons/business.svg";
import fashionic from "../../../assets/images/Fashion.svg";
import srchic from "../../../assets/images/sortIcons/Search.svg";
import { Get, Post } from "../../../services/user.services";

import Form from "react-bootstrap/Form";

const BroadcastedFilters = ({
  closeBroadcastTask,
  rangeTimeBroadcastValue,
  allFilterData,
  setAllFilterData,
}) => {
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");
  const [active, setActive] = useState("");

  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "braodcast",
  });

  const handleClose = (values) => {
    closeBroadcastTask(values);
    setAllFilterData({
      ...allFilterData,
      filterdata: [],
      category: [],
      sortData: "",
      price_range1: "",
      price_range2: "",
      location_search: "",
      toggle_filter: false,
      toggle_sort: false,
      istotalFund: true,
    });
  };

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "braodcast" });
    setActive(values);
  };

  const handleFilter = () => {
    rangeTimeBroadcastValue(filterSort);
  };

  const handleClick = (type, value) => {
    if (type == "sort") {
      setAllFilterData({
        ...allFilterData,
        sortdata: value,
      });
    } else if (type == "filter") {
      setAllFilterData((prev) => ({
        ...prev,

        filterdata: prev.filterdata.includes(value)
          ? prev.filterdata.filter((el) => el !== value)
          : [...prev.filterdata, value],
      }));
      // setAllFilterData({
      //   ...allFilterData,
      //   filterdata:

      // });
    } else if (type == "category") {
      setAllFilterData((prev) => ({
        ...prev,

        category: prev?.category.includes(value)
          ? prev.category.filter((el) => el !== value)
          : [...prev.category, value],
      }));
    } else if (type == "location") {
      setAllFilterData((prev) => ({
        ...prev,
        ...(locationValue ? { hopper_location: locationValue } : {}),
      }));
    } else {
      // if (allFilterData?.price_range_to >> allFilterData?.price_range_from)
      //   return toast.error("Price2 should greater than price1");
      console.log("submit type", type);
      setAllFilterData((prev) => ({
        ...prev,
        // toggle_filter: true,
        // toggle_sort: true,
        // isBroadcastedTask: true,
        istotalFund: true,
      }));
    }
  };
  const handleGetdatalocation = async (locationValue) => {
    try {
      const resp = await Get(
        `mediahouse/searchaddress?address=${locationValue}`
      );
      if (resp) {
        console.log("location --->", resp.data);
        setLocationData(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetdatalocation(locationValue);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [locationValue]);

  useEffect(() => {
    handleClick("location", address);
  }, [address]);
  async function allcatdata() {
    const category = await Get("mediaHouse/getCategoryType?type=content");
    setAllFilterData({
      ...allFilterData,
      allcategoryData: category?.data?.data,
    });
  }

  useEffect(() => {
    allcatdata();
  }, []);

  console.log("all fiolter data ---. allFilterData>", allFilterData);

  return (
    <>
      <div className="filter_wrap">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => handleClose(false)}
          />
          <p className="hdng">Filter</p>
          <div className="notf_icn_wrp" onClick={() => handleClose(false)}>
            <a className="link">Clear all</a>
          </div>
        </div>
        {/* <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Sort
          </p>
        </div>
        <div className="sort_list" onClick={(e) => handleClickTime("type", "live")}>
          <div className={`sort_item ${active === "live" ? "active" : null}`} style={{ cursor: "pointer" }}>
            <img src={livetasksic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Live tasks</p>
          </div>
          <div className="sort_item">
            <img src={completedtaskic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Completed tasks</p>
          </div>
          <div className="sort_item">
            <img src={taskintimeic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Tasks completed in time</p>
          </div>
          <div className="sort_item">
            <img src={delayedtaskic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Delayed tasks</p>
          </div>
          <div className="sort_item" onClick={(e) => handleClickTime ("type", "live")}>
            <img src={calendaric} className="icn" alt="Live tasks" />
            <p className="sort_txt">Deadline ending soon</p>
          </div>
          <div className="sort_item">
            <img src={locationic} className="icn" alt="Live tasks" />
            <div className="d-flex flex-column gap-2">
              <p className="sort_txt">Range (miles)</p>
              <Form.Range />
            </div>
          </div>
        </div> */}
        <div className="sort_list">
          <div className="sort_item">
            <img src={latestic} className="icn" alt="Live tasks" />
            <p className="sort_txt">Latest content sourced from tasks</p>
          </div>
          {/* <div className="srt_sub_hdng mt-3">
            <p className="sort_hdng" alt="">
              Category
            </p>
          </div> */}
          {/* <div className="d-flex flex-column gap-2">
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={celebrityic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Celebrity content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={politicalic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Political content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={crimeic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Crime content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={businessic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Business content</p>
            </div>
            <div
              className={`sort_item ${active === "accident" ? "active" : null}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClickTime("contentType", "accident")}
            >
            
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.4539 3.6076C2.30322 4.7608 1.46222 6.13629 1.0223 7.5894C0.442094 9.49981 0.544129 11.6362 1.30229 13.6054C2.06328 15.5852 3.44259 17.2543 5.18285 18.303L5.18289 18.3031C6.62357 19.1696 8.34103 19.6262 10.1207 19.6262C10.5107 19.6262 10.9062 19.6051 11.299 19.5602C13.5014 19.3121 15.4942 18.3857 16.9108 16.9505C18.3872 15.4552 19.3618 13.3644 19.6583 11.0617L19.6583 11.0617C19.8203 9.80073 19.7682 8.51041 19.5017 7.32762C19.2132 6.04724 18.691 4.90054 17.9455 3.92513C16.4111 1.91169 14.1287 0.712471 11.5207 0.546107L11.5207 0.546106C8.57053 0.358697 5.55513 1.50141 3.4539 3.6076ZM3.4539 3.6076L3.48929 3.64292M3.4539 3.6076L3.48929 3.64292M3.48929 3.64292C2.34396 4.79076 1.50751 6.15925 1.07015 7.60391C0.493382 9.50297 0.594522 11.6279 1.34897 13.5874L3.48929 3.64292ZM10.8552 13.0937L10.8551 13.0937C10.2796 13.1144 9.68863 13.1378 9.11882 13.1763C8.85114 13.4651 8.5832 13.8119 8.32063 14.1517L8.29072 14.1904C7.99978 14.57 7.69404 14.9645 7.38231 15.2933C7.59823 15.8606 7.86811 16.5127 8.13256 17.1518L8.15507 17.2061L10.8552 13.0937ZM10.8552 13.0937C11.4204 13.073 12.0048 13.0497 12.5714 13.0113C12.8519 13.3727 13.1351 13.7885 13.4087 14.1933L13.4087 14.1933M10.8552 13.0937L13.4087 14.1933M13.4087 14.1933C13.6876 14.6056 13.978 15.032 14.2689 15.4067C14.1144 15.8662 13.9563 16.3689 13.7993 16.8681C13.7672 16.9702 13.7351 17.0721 13.7031 17.1735L13.669 17.2816C13.5265 17.7333 13.3804 18.1966 13.2408 18.628M13.4087 14.1933L13.2408 18.628M7.95393 10.7254L7.95397 10.7254C8.28678 11.3832 8.63065 12.0593 9.1186 12.6769C9.6544 12.643 10.2062 12.6203 10.7426 12.5983C10.7734 12.597 10.8042 12.5958 10.8349 12.5945L10.8351 12.5945C11.3932 12.5739 11.964 12.5507 12.5167 12.5151C12.6781 12.1276 12.8375 11.6287 12.9955 11.1341C13.0063 11.1001 13.0172 11.0662 13.028 11.0323L7.95393 10.7254ZM7.95393 10.7254C7.79228 10.4071 7.62485 10.0776 7.4446 9.76203C8.26791 8.7082 9.04289 7.88117 10.2229 7.09333C11.6339 7.96701 12.6981 8.7439 13.549 9.52139C13.3746 9.94319 13.2053 10.475 13.0419 10.9887L13.028 11.0322L7.95393 10.7254ZM17.5516 7.5526L17.5516 7.55256C17.7801 7.25321 18.0074 6.95291 18.235 6.65213C18.3613 6.48531 18.4876 6.31834 18.6144 6.15131C18.3385 5.44593 17.9778 4.7995 17.5352 4.21688C16.7908 3.23789 15.8673 2.46798 14.7944 1.92246C14.6655 1.85805 14.534 1.79593 14.3976 1.73386C14.3386 1.76506 14.2791 1.79667 14.219 1.82864C14.1193 1.8816 14.0178 1.93556 13.9136 1.99033C13.8181 2.04095 13.7204 2.09276 13.6207 2.14564C12.7087 2.62942 11.627 3.20314 10.5093 3.78383C10.5046 4.11344 10.5017 4.40414 10.4991 4.67611C10.4972 4.86298 10.4955 5.04101 10.4933 5.21676C10.4933 5.21681 10.4933 5.21686 10.4933 5.2169L10.4433 5.21628L17.5516 7.5526ZM17.5516 7.5526C17.3726 7.78764 17.1943 8.02332 17.016 8.25893L17.0157 8.25929L17.015 8.26029C16.8417 8.48928 16.6685 8.71821 16.4947 8.94653C15.9293 8.95876 15.0657 9.03667 13.9207 9.17736C13.037 8.36736 11.9363 7.56279 10.4773 6.65959L17.5516 7.5526ZM2.7084 7.21098L2.70851 7.21122C3.02812 7.85148 3.38749 8.56809 3.87202 9.41041C4.84315 9.48148 6.24919 9.50239 7.01557 9.49778C7.86307 8.41221 8.70694 7.50365 9.96986 6.66543C9.97524 6.10264 9.98063 5.65285 9.98601 5.21583C9.98601 5.21577 9.98601 5.21572 9.98601 5.21567L10.036 5.21628L2.7084 7.21098ZM2.7084 7.21098C2.6806 7.15603 2.65304 7.10145 2.62565 7.04721C2.47139 6.74177 2.3225 6.44694 2.16824 6.15418C2.59341 5.36373 3.15181 4.61925 3.81988 3.94881C4.53662 3.2316 5.36294 2.63229 6.25921 2.16623C7.3401 2.81629 8.74534 3.43884 10.0019 3.82168L2.7084 7.21098ZM13.2408 18.628C12.6062 18.8405 11.9345 18.9894 11.2414 19.0694C10.866 19.1113 10.4934 19.1322 10.1207 19.1322C9.71194 19.1322 9.30577 19.1073 8.90476 19.0575C8.685 18.4856 8.41594 17.8341 8.1551 17.2062L13.2408 18.628ZM2.24735 7.42674C2.57086 8.07179 2.93479 8.79711 3.42534 9.65225C3.0586 9.9677 2.69249 10.2837 2.32643 10.5997L2.32632 10.5998C1.97235 10.9054 1.61842 11.2109 1.26393 11.5159C1.06886 10.2578 1.13463 8.95804 1.50888 7.72613L1.46104 7.7116L1.50886 7.72621C1.61316 7.38496 1.74019 7.04798 1.8879 6.71726C1.9716 6.87858 2.0538 7.04211 2.13792 7.20945C2.17396 7.28114 2.21034 7.35353 2.24735 7.42674ZM2.24735 7.42674C2.24734 7.42672 2.24733 7.42671 2.24733 7.4267L2.29202 7.40428L2.2474 7.42684C2.24738 7.4268 2.24736 7.42677 2.24735 7.42674ZM5.45317 17.8838L5.45311 17.8838C4.52058 17.3228 3.71361 16.5814 3.06237 15.7267C3.43568 15.6996 3.86876 15.6703 4.35087 15.6388L4.35096 15.6388C4.43286 15.6333 4.51588 15.6277 4.59994 15.6221C5.30733 15.5747 6.0888 15.5224 6.90279 15.4579C7.12785 16.0495 7.40943 16.7298 7.68275 17.3889C7.7071 17.4478 7.73153 17.5069 7.75599 17.566C7.95265 18.0414 8.15145 18.522 8.32488 18.9644C7.29421 18.7694 6.31953 18.4067 5.45317 17.8838ZM16.5418 16.607L16.5417 16.6071C15.7945 17.363 14.8761 17.9699 13.8478 18.399C13.9123 18.1983 13.9769 17.994 14.0413 17.7897C14.0916 17.6305 14.1419 17.4713 14.1921 17.3141L14.1921 17.3139C14.23 17.1942 14.2679 17.0736 14.3058 16.9529C14.4505 16.493 14.5957 16.0315 14.7377 15.6083C15.6106 15.6309 16.4416 15.6546 17.2732 15.7589C17.0456 16.0602 16.8018 16.3449 16.5418 16.607ZM11.487 1.03727L11.4902 0.987376L11.487 1.03727C12.2929 1.08956 13.0639 1.24388 13.7908 1.49558C13.7512 1.51653 13.7111 1.53788 13.6697 1.56065C12.6931 2.0808 11.4812 2.72315 10.2304 3.37383C9.095 3.03448 7.82584 2.48981 6.79707 1.90409C8.08413 1.3286 9.48531 1.01899 10.8861 1.01899C11.0875 1.01899 11.286 1.02422 11.487 1.03727ZM7.49842 10.9439L7.49848 10.944L7.51986 10.9861C7.84608 11.6283 8.18511 12.2958 8.67235 12.9232C8.40434 13.2223 8.13953 13.5634 7.88611 13.8932L7.8697 13.9144C7.5889 14.2785 7.30022 14.6527 7.01439 14.9522C6.05128 15.0303 5.13165 15.0928 4.31708 15.145L4.31694 15.145C3.70212 15.1861 3.16275 15.2222 2.72732 15.2558C2.08603 14.2955 1.62375 13.212 1.37413 12.0875C1.92495 11.6109 2.47687 11.1354 3.02922 10.6594C3.31939 10.4094 3.60968 10.1593 3.9 9.90886C4.81028 9.97092 6.05879 9.99162 6.84055 9.99162H6.84094H6.84132H6.84171H6.84209H6.84247H6.84286H6.84324H6.84363H6.84401H6.84439H6.84478H6.84516H6.84554H6.84592H6.84631H6.84669H6.84707H6.84745H6.84784H6.84822H6.8486H6.84898H6.84936H6.84974H6.85013H6.85051H6.85089H6.85127H6.85165H6.85203H6.85241H6.85279H6.85317H6.85355H6.85393H6.85431H6.85469H6.85507H6.85545H6.85583H6.85621H6.85659H6.85697H6.85735H6.85773H6.85811H6.85848H6.85886H6.85924H6.85962H6.86H6.86038H6.86075H6.86113H6.86151H6.86189H6.86227H6.86264H6.86302H6.8634H6.86377H6.86415H6.86453H6.8649H6.86528H6.86566H6.86603H6.86641H6.86679H6.86716H6.86754H6.86791H6.86829H6.86867H6.86904H6.86942H6.86979H6.87017H6.87054H6.87092H6.87129H6.87167H6.87204H6.87241H6.87279H6.87316H6.87354H6.87391H6.87428H6.87466H6.87503H6.8754H6.87578H6.87615H6.87652H6.8769H6.87727H6.87764H6.87802H6.87839H6.87876H6.87913H6.87951H6.87988H6.88025H6.88062H6.88099H6.88136H6.88174H6.88211H6.88248H6.88285H6.88322H6.88359H6.88396H6.88433H6.8847H6.88508H6.88545H6.88582H6.88619H6.88656H6.88693H6.8873H6.88767H6.88804H6.88841H6.88877H6.88914H6.88951H6.88988H6.89025H6.89062H6.89099H6.89136H6.89173H6.89209H6.89246H6.89283H6.8932H6.89357H6.89394H6.8943H6.89467H6.89504H6.89541H6.89577H6.89614H6.89651H6.89687H6.89724H6.89761H6.89798H6.89834H6.89871H6.89908H6.89944H6.89981H6.90017H6.90054H6.90091H6.90127H6.90164H6.902H6.90237H6.90273H6.9031H6.90346H6.90383H6.90419H6.90456H6.90492H6.90529H6.90565H6.90602H6.90638H6.90675H6.90711H6.90747H6.90784H6.9082H6.90856H6.90893H6.90929H6.90966H6.91002H6.91038H6.91074H6.91111H6.91147H6.91183H6.9122H6.91256H6.91292H6.91328H6.91365H6.91401H6.91437H6.91473H6.91509H6.91546H6.91582H6.91618H6.91654H6.9169H6.91726H6.91762H6.91798H6.91835H6.91871H6.91907H6.91943H6.91979H6.92015H6.92051H6.92087H6.92123H6.92159H6.92195H6.92231H6.92267H6.92303H6.92339H6.92375H6.92411H6.92447H6.92483H6.92519H6.92554H6.9259H6.92626H6.92662H6.92698H6.92734H6.9277H6.92805H6.92841H6.92877H6.92913H6.92949H6.92984H6.9302H6.93056H6.93092H6.93128H6.93163H6.93199H6.93235H6.9327H6.93306H6.93342H6.93377H6.93413H6.93449H6.93484H6.9352H6.93556H6.93591H6.93627H6.93663H6.93698H6.93734H6.93769H6.93805H6.9384H6.93876H6.93912H6.93947H6.93983H6.94018H6.94054H6.94089H6.94125H6.9416H6.94196H6.94231H6.94266H6.94302H6.94337H6.94373H6.94408H6.94444H6.94479H6.94514H6.9455H6.94585H6.9462H6.94656H6.94691H6.94726H6.94762H6.94797H6.94832H6.94868H6.94903H6.94938H6.94973H6.95009H6.95044H6.95079H6.95114H6.9515H6.95185H6.9522H6.95255H6.9529H6.95326H6.95361H6.95396H6.95431H6.95466H6.95501H6.95537H6.95572H6.95607H6.95642H6.95677H6.95712H6.95747H6.95782H6.95817H6.95852H6.95887H6.95922H6.95957H6.95992H6.96027H6.96062H6.96097H6.96132H6.96167H6.96202H6.96237H6.96272H6.96307H6.96342H6.96377H6.96412H6.96447H6.96482H6.96517H6.96551H6.96586H6.96621H6.96656H6.96691H6.96726H6.96761H6.96795H6.9683H6.96865H6.969H6.96935H6.96969H6.97004H6.97039H6.97074H6.97108H6.97143H6.97178H6.97213H6.97247H6.97282H6.97317H6.97351H6.97386H6.97421H6.97455H6.9749H6.97525H6.97559H6.97594H6.97629H6.97663H6.97698H6.97732H6.97767H6.97802H6.97836H6.97871H6.97905H6.9794H6.97974H6.98009H6.98044H6.98078H6.98113H6.98147H6.98182H6.98216H6.98251H6.98285H6.9832H6.98354H6.98388H6.98423H6.98457H6.98492H6.98526H6.98561H6.98595H6.98629H6.98664H6.98698H6.98733H6.98767H6.98801H6.98836H6.9887H6.98904H6.98939H6.98973H6.99007H6.99042H6.99076H6.9911H6.99145H6.99179H6.99213H6.99247H6.99282H6.99316H6.9935H6.99384H6.99419H6.99453H6.99478C7.16893 10.2952 7.33083 10.6116 7.49842 10.9439ZM18.846 12.5131C18.5659 13.5286 18.1418 14.4728 17.5945 15.3037C16.6256 15.1639 15.6776 15.1372 14.6832 15.114C14.4112 14.7645 14.1391 14.3647 13.8706 13.9701L13.8359 13.9191C13.8241 13.9019 13.8124 13.8846 13.8006 13.8673C13.5336 13.4749 13.2607 13.0739 12.9828 12.7156C13.1641 12.2821 13.3399 11.7277 13.5097 11.1925L13.5142 11.1781L13.5175 11.1677C13.6881 10.6299 13.8628 10.0791 14.0397 9.662C15.1291 9.52715 15.9507 9.45267 16.4853 9.44053C17.2636 10.4108 18.0319 11.4315 18.7809 12.4266L18.846 12.5131ZM19.0051 7.43378C19.2579 8.55984 19.3097 9.79368 19.1546 10.999C19.1157 11.2976 19.0661 11.5919 19.0037 11.8837C18.3296 10.987 17.638 10.0745 16.9386 9.19755C17.2807 8.74804 17.6227 8.29615 17.962 7.8468C18.1134 7.64762 18.2648 7.44779 18.4161 7.248L18.4171 7.24666L18.4196 7.24343C18.551 7.06989 18.6824 6.89639 18.8139 6.72332C18.8861 6.95522 18.9498 7.19143 19.0051 7.43378Z"
                  fill="black"
                  stroke="black"
                  stroke-width="0.1"
                />
              </svg>
              <p className="sort_txt">Sports content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Live tasks" />
              <p className="sort_txt">General content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Racism content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Live tasks" />
              <p className="sort_txt">Accident content</p>
            </div>
          </div> */}

          <div className="sort_list">
            <div
              //  className="sort_item"
              className={`sort_item icn
            ${
              allFilterData?.filterdata?.includes("content_purchased_online")
                ? "active"
                : ""
            }`}
              onClick={() => handleClick("filter", "content_purchased_online")}
            >
              <img src={contentic} className="icn" alt="Exclusive" />
              <p className="sort_txt">Content purchased online</p>
            </div>
            <div
              className={`sort_item icn
            ${
              allFilterData?.filterdata?.includes(
                "Latest_content_sourced_from_tasks"
              )
                ? "active"
                : ""
            }`}
              onClick={() =>
                handleClick("filter", "Latest_content_sourced_from_tasks")
              }
            >
              <img src={latestic} className="icn" alt="Exclusive" />
              <p className="sort_txt">Latest content sourced from tasks</p>
            </div>
            {/* <div className="sort_item">
            <img src={exclusiveic} className="icn" alt="Exclusive" />
            <p className="sort_txt">Exclusive content</p>
          </div> */}
            <div
              //  className="sort_item"
              // className={`sort_item ${
              //   allFilterData?.filterdata?.includes(curr?._id) ? "active" : ""
              // }`}
              // onClick={() => handleClick("filter", curr?._id)}
              // key={index}
              className={`sort_item icn
               ${
                 allFilterData?.filterdata?.includes("exclusive")
                   ? "active"
                   : ""
               }`}
              onClick={() => handleClick("filter", "exclusive")}
            >
              <img src={exclusiveic} className="icn" alt="Exclusive" />
              <p className="sort_txt">Exclusive content</p>
            </div>
            <div
              onClick={() => handleClick("filter", "shared")}
              //  className="sort_item"
              className={`sort_item icn ${
                allFilterData?.filterdata?.includes("shared") ? "active" : ""
              }`}
            >
              <img src={sharedic} className="icn" alt="Shared" />
              <p className="sort_txt">Shared content</p>
            </div>
            {/* <div className="sort_item">
            <img src={sharedic} className="icn" alt="Shared" />
            <p className="sort_txt">Shared content</p>
          </div> */}
            <div className="d-flex flex-column gap-2">
              {/* <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={celebrityic} className="icn" alt="Celebrity" />
              <p className="sort_txt">Celebrity content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={politicalic} className="icn" alt="Political" />
              <p className="sort_txt">Political content</p>
            </div> */}
              {/* <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={crimeic} className="icn" alt="Crime" />
              <p className="sort_txt">Crime content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={businessic} className="icn" alt="Business" />
              <p className="sort_txt">Business content</p>
            </div>
            <div className="sort_item">
              <input type="checkbox" className="fltr_checkbx" />
              <img src={fashionic} className="icn" alt="Fashion" />
              <p className="sort_txt">Fashion content</p>
            </div> */}
              <div
                onClick={() => handleClick("filter", "sports")}
                className={`sort_item icn ${
                  allFilterData?.filterdata?.includes("sports") ? "active" : ""
                }`}
              >
                <input type="checkbox" className="fltr_checkbx" />
                {/* <img src={fashionic} className="icn" alt="Fashion" /> */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.2537 3.85565C2.10303 5.00884 1.26203 6.38434 0.822105 7.83744C0.241899 9.74785 0.343933 11.8842 1.1021 13.8534C1.86308 15.8333 3.24239 17.5023 4.98265 18.5511L4.98269 18.5511C6.42338 19.4177 8.14083 19.8742 9.92055 19.8742C10.3105 19.8742 10.706 19.8531 11.0988 19.8082C13.3012 19.5602 15.294 18.6338 16.7106 17.1985C18.187 15.7032 19.1616 13.6125 19.4581 11.3098L19.4581 11.3097C19.6201 10.0488 19.568 8.75846 19.3015 7.57567C19.013 6.29529 18.4908 5.14859 17.7453 4.17317C16.2109 2.15974 13.9285 0.960517 11.3205 0.794153L11.3205 0.794153C8.37033 0.606744 5.35493 1.74945 3.2537 3.85565ZM3.2537 3.85565L3.2891 3.89097M3.2537 3.85565L3.2891 3.89097M3.2891 3.89097C2.14376 5.03881 1.30731 6.40729 0.869954 7.85195C0.293187 9.75102 0.394326 11.876 1.14877 13.8355L3.2891 3.89097ZM10.655 13.3417L10.6549 13.3417C10.0794 13.3625 9.48844 13.3858 8.91863 13.4243C8.65094 13.7132 8.38301 14.06 8.12044 14.3998L8.09053 14.4385C7.79958 14.8181 7.49385 15.2126 7.18212 15.5413C7.39804 16.1086 7.66792 16.7608 7.93237 17.3998L7.95487 17.4542L10.655 13.3417ZM10.655 13.3417C11.2202 13.321 11.8046 13.2978 12.3712 13.2594C12.6517 13.6207 12.9349 14.0366 13.2085 14.4413L13.2085 14.4413M10.655 13.3417L13.2085 14.4413M13.2085 14.4413C13.4874 14.8536 13.7778 15.28 14.0687 15.6547C13.9142 16.1143 13.7561 16.617 13.5991 17.1161C13.567 17.2182 13.5349 17.3202 13.5029 17.4216L13.4688 17.5297C13.3263 17.9814 13.1802 18.4446 13.0407 18.876M13.2085 14.4413L13.0407 18.876M7.75374 10.9734L7.75377 10.9735C8.08659 11.6313 8.43045 12.3073 8.91841 12.925C9.45421 12.8911 10.006 12.8684 10.5424 12.8463C10.5732 12.8451 10.604 12.8438 10.6347 12.8425L10.6349 12.8425C11.193 12.8219 11.7638 12.7988 12.3165 12.7632C12.4779 12.3756 12.6373 11.8767 12.7953 11.3822C12.8061 11.3482 12.817 11.3142 12.8278 11.2803L7.75374 10.9734ZM7.75374 10.9734C7.59208 10.6551 7.42465 10.3256 7.24441 10.0101C8.06772 8.95625 8.84269 8.12922 10.0227 7.34138C11.4337 8.21506 12.4979 8.99195 13.3488 9.76944C13.1744 10.1912 13.0051 10.7231 12.8417 11.2368L12.8278 11.2803L7.75374 10.9734ZM17.3514 7.80064L17.3514 7.80061C17.5799 7.50126 17.8072 7.20096 18.0348 6.90018C18.1611 6.73336 18.2874 6.56639 18.4142 6.39936C18.1383 5.69398 17.7776 5.04755 17.335 4.46493C16.5906 3.48594 15.6671 2.71603 14.5942 2.17051C14.4653 2.1061 14.3338 2.04398 14.1974 1.98191C14.1384 2.01311 14.079 2.04472 14.0188 2.07669C13.9191 2.12965 13.8176 2.1836 13.7134 2.23838C13.6179 2.289 13.5202 2.34081 13.4205 2.39369C12.5085 2.87746 11.4268 3.45118 10.3091 4.03188C10.3044 4.36149 10.3016 4.65218 10.2989 4.92415C10.297 5.11103 10.2953 5.28906 10.2931 5.4648C10.2931 5.46485 10.2931 5.4649 10.2931 5.46495L10.2431 5.46433L17.3514 7.80064ZM17.3514 7.80064C17.1724 8.03568 16.9941 8.27137 16.8158 8.50698L16.8156 8.50734L16.8148 8.50833C16.6415 8.73733 16.4683 8.96626 16.2945 9.19457C15.7291 9.2068 14.8655 9.28472 13.7205 9.4254C12.8368 8.61541 11.7361 7.81083 10.2771 6.90763L17.3514 7.80064ZM2.5082 7.45903L2.50832 7.45926C2.82793 8.09952 3.18729 8.81613 3.67183 9.65846C4.64296 9.72953 6.04899 9.75044 6.81537 9.74583C7.66288 8.66026 8.50674 7.7517 9.76967 6.91348C9.77505 6.35069 9.78043 5.90089 9.78581 5.46387C9.78581 5.46382 9.78582 5.46377 9.78582 5.46371L9.83581 5.46433L2.5082 7.45903ZM2.5082 7.45903C2.48041 7.40407 2.45285 7.3495 2.42546 7.29526C2.2712 6.98981 2.1223 6.69499 1.96804 6.40223C2.39321 5.61177 2.95161 4.86729 3.61968 4.19685C4.33642 3.47965 5.16275 2.88034 6.05901 2.41427C7.13991 3.06433 8.54515 3.68688 9.80167 4.06973L2.5082 7.45903ZM13.0407 18.876C12.406 19.0886 11.7343 19.2374 11.0412 19.3175C10.6658 19.3593 10.2932 19.3802 9.92055 19.3802C9.51175 19.3802 9.10557 19.3553 8.70456 19.3055C8.48481 18.7336 8.21575 18.0822 7.9549 17.4542L13.0407 18.876ZM2.04715 7.67479C2.37066 8.31983 2.73459 9.04516 3.22514 9.9003C2.8584 10.2157 2.4923 10.5318 2.12623 10.8478L2.12612 10.8479C1.77215 11.1534 1.41822 11.459 1.06373 11.764C0.86866 10.5059 0.934431 9.20609 1.30868 7.97418L1.26084 7.95964L1.30866 7.97426C1.41296 7.63301 1.54 7.29602 1.68771 6.9653C1.77141 7.12663 1.85361 7.29016 1.93773 7.4575C1.97376 7.52919 2.01015 7.60157 2.04715 7.67479ZM2.04715 7.67479C2.04715 7.67477 2.04714 7.67476 2.04713 7.67474L2.09183 7.65233L2.0472 7.67488C2.04719 7.67485 2.04717 7.67482 2.04715 7.67479ZM5.25298 18.1319L5.25292 18.1318C4.32038 17.5708 3.51341 16.8294 2.86218 15.9747C3.23549 15.9477 3.66856 15.9184 4.15068 15.8869L4.15077 15.8869C4.23267 15.8814 4.31568 15.8758 4.39974 15.8702C5.10714 15.8228 5.88861 15.7704 6.7026 15.7059C6.92765 16.2975 7.20923 16.9778 7.48256 17.637C7.5069 17.6959 7.53133 17.7549 7.55579 17.8141C7.75246 18.2895 7.95126 18.7701 8.12468 19.2124C7.09401 19.0174 6.11934 18.6547 5.25298 18.1319ZM16.3416 16.855L16.3415 16.8551C15.5943 17.611 14.6759 18.218 13.6477 18.647C13.7121 18.4464 13.7767 18.242 13.8412 18.0378C13.8914 17.8785 13.9417 17.7194 13.9919 17.5621L13.9919 17.562C14.0298 17.4422 14.0677 17.3217 14.1056 17.201C14.2503 16.741 14.3955 16.2796 14.5375 15.8564C15.4104 15.879 16.2414 15.9026 17.073 16.0069C16.8455 16.3082 16.6016 16.593 16.3416 16.855ZM11.2868 1.28532L11.29 1.23542L11.2868 1.28532C12.0927 1.33761 12.8637 1.49193 13.5906 1.74362C13.551 1.76458 13.5109 1.78593 13.4695 1.80869C12.4929 2.32885 11.281 2.9712 10.0302 3.62188C8.8948 3.28253 7.62564 2.73786 6.59687 2.15214C7.88393 1.57665 9.28511 1.26704 10.6859 1.26704C10.8873 1.26704 11.0858 1.27227 11.2868 1.28532ZM7.29822 11.1919L7.29829 11.1921L7.31966 11.2341C7.64588 11.8764 7.98492 12.5439 8.47216 13.1713C8.20414 13.4703 7.93933 13.8114 7.68591 14.1412L7.66951 14.1625C7.38871 14.5265 7.10002 14.9008 6.8142 15.2003C5.85108 15.2783 4.93146 15.3409 4.11688 15.3931L4.11674 15.3931C3.50192 15.4342 2.96256 15.4703 2.52712 15.5038C1.88583 14.5435 1.42355 13.4601 1.17394 12.3356C1.72476 11.8589 2.27667 11.3834 2.82903 10.9075C3.1192 10.6575 3.40949 10.4073 3.69981 10.1569C4.61008 10.219 5.85859 10.2397 6.64036 10.2397H6.64074H6.64113H6.64151H6.6419H6.64228H6.64266H6.64305H6.64343H6.64381H6.6442H6.64458H6.64496H6.64535H6.64573H6.64611H6.64649H6.64688H6.64726H6.64764H6.64802H6.6484H6.64879H6.64917H6.64955H6.64993H6.65031H6.65069H6.65107H6.65145H6.65183H6.65222H6.6526H6.65298H6.65336H6.65374H6.65412H6.6545H6.65488H6.65526H6.65564H6.65602H6.65639H6.65677H6.65715H6.65753H6.65791H6.65829H6.65867H6.65905H6.65942H6.6598H6.66018H6.66056H6.66094H6.66131H6.66169H6.66207H6.66245H6.66282H6.6632H6.66358H6.66396H6.66433H6.66471H6.66509H6.66546H6.66584H6.66621H6.66659H6.66697H6.66734H6.66772H6.66809H6.66847H6.66885H6.66922H6.6696H6.66997H6.67035H6.67072H6.6711H6.67147H6.67184H6.67222H6.67259H6.67297H6.67334H6.67372H6.67409H6.67446H6.67484H6.67521H6.67558H6.67596H6.67633H6.6767H6.67708H6.67745H6.67782H6.67819H6.67857H6.67894H6.67931H6.67968H6.68005H6.68043H6.6808H6.68117H6.68154H6.68191H6.68228H6.68266H6.68303H6.6834H6.68377H6.68414H6.68451H6.68488H6.68525H6.68562H6.68599H6.68636H6.68673H6.6871H6.68747H6.68784H6.68821H6.68858H6.68895H6.68932H6.68969H6.69006H6.69042H6.69079H6.69116H6.69153H6.6919H6.69227H6.69264H6.693H6.69337H6.69374H6.69411H6.69448H6.69484H6.69521H6.69558H6.69595H6.69631H6.69668H6.69705H6.69741H6.69778H6.69815H6.69851H6.69888H6.69925H6.69961H6.69998H6.70034H6.70071H6.70108H6.70144H6.70181H6.70217H6.70254H6.7029H6.70327H6.70363H6.704H6.70436H6.70473H6.70509H6.70546H6.70582H6.70619H6.70655H6.70691H6.70728H6.70764H6.70801H6.70837H6.70873H6.7091H6.70946H6.70982H6.71019H6.71055H6.71091H6.71128H6.71164H6.712H6.71236H6.71273H6.71309H6.71345H6.71381H6.71417H6.71454H6.7149H6.71526H6.71562H6.71598H6.71634H6.71671H6.71707H6.71743H6.71779H6.71815H6.71851H6.71887H6.71923H6.71959H6.71995H6.72031H6.72067H6.72104H6.7214H6.72176H6.72212H6.72247H6.72283H6.72319H6.72355H6.72391H6.72427H6.72463H6.72499H6.72535H6.72571H6.72607H6.72643H6.72678H6.72714H6.7275H6.72786H6.72822H6.72858H6.72893H6.72929H6.72965H6.73001H6.73037H6.73072H6.73108H6.73144H6.73179H6.73215H6.73251H6.73287H6.73322H6.73358H6.73394H6.73429H6.73465H6.73501H6.73536H6.73572H6.73607H6.73643H6.73679H6.73714H6.7375H6.73785H6.73821H6.73856H6.73892H6.73928H6.73963H6.73999H6.74034H6.7407H6.74105H6.74141H6.74176H6.74211H6.74247H6.74282H6.74318H6.74353H6.74389H6.74424H6.74459H6.74495H6.7453H6.74566H6.74601H6.74636H6.74672H6.74707H6.74742H6.74778H6.74813H6.74848H6.74883H6.74919H6.74954H6.74989H6.75024H6.7506H6.75095H6.7513H6.75165H6.75201H6.75236H6.75271H6.75306H6.75341H6.75376H6.75412H6.75447H6.75482H6.75517H6.75552H6.75587H6.75622H6.75657H6.75693H6.75728H6.75763H6.75798H6.75833H6.75868H6.75903H6.75938H6.75973H6.76008H6.76043H6.76078H6.76113H6.76148H6.76183H6.76218H6.76253H6.76288H6.76323H6.76357H6.76392H6.76427H6.76462H6.76497H6.76532H6.76567H6.76602H6.76637H6.76671H6.76706H6.76741H6.76776H6.76811H6.76845H6.7688H6.76915H6.7695H6.76985H6.77019H6.77054H6.77089H6.77124H6.77158H6.77193H6.77228H6.77262H6.77297H6.77332H6.77367H6.77401H6.77436H6.77471H6.77505H6.7754H6.77574H6.77609H6.77644H6.77678H6.77713H6.77748H6.77782H6.77817H6.77851H6.77886H6.7792H6.77955H6.77989H6.78024H6.78059H6.78093H6.78128H6.78162H6.78197H6.78231H6.78266H6.783H6.78334H6.78369H6.78403H6.78438H6.78472H6.78507H6.78541H6.78575H6.7861H6.78644H6.78679H6.78713H6.78747H6.78782H6.78816H6.7885H6.78885H6.78919H6.78953H6.78988H6.79022H6.79056H6.79091H6.79125H6.79159H6.79194H6.79228H6.79262H6.79296H6.79331H6.79365H6.79399H6.79433H6.79459C6.96873 10.5433 7.13063 10.8596 7.29822 11.1919ZM18.6458 12.7611C18.3657 13.7766 17.9416 14.7208 17.3943 15.5518C16.4254 15.4119 15.4774 15.3853 14.483 15.362C14.211 15.0126 13.9389 14.6128 13.6704 14.2181L13.6357 14.1672C13.6239 14.1499 13.6122 14.1326 13.6004 14.1153C13.3334 13.7229 13.0605 13.3219 12.7826 12.9637C12.9639 12.5301 13.1397 11.9757 13.3095 11.4405L13.314 11.4262L13.3173 11.4157C13.4879 10.878 13.6626 10.3271 13.8395 9.91005C14.9289 9.7752 15.7505 9.70071 16.2851 9.68858C17.0634 10.6589 17.8317 11.6795 18.5807 12.6746L18.6458 12.7611ZM18.8049 7.68183C19.0577 8.80789 19.1095 10.0417 18.9544 11.2471C18.9155 11.5456 18.8659 11.8399 18.8035 12.1318C18.1294 11.235 17.4378 10.3226 16.7384 9.4456C17.0805 8.99609 17.4225 8.5442 17.7618 8.09484C17.9132 7.89566 18.0646 7.69584 18.2159 7.49604L18.2169 7.49471L18.2194 7.49147C18.3508 7.31794 18.4823 7.14444 18.6137 6.97137C18.6859 7.20327 18.7496 7.43948 18.8049 7.68183Z"
                    fill="black"
                    stroke="black"
                    stroke-width="0.1"
                  />
                </svg>

                <p className="sort_txt">Sports content</p>
              </div>
              <div className="d-flex flex-column gap-2">
                {allFilterData?.allcategoryData?.map((curr, index) => (
                  <div
                    className={`sort_item ${
                      allFilterData?.category?.includes(curr?._id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleClick("category", curr?._id)}
                    key={index}
                  >
                    <input type="checkbox" className="fltr_checkbx" />
                    <img src={curr?.icon} className="icn" alt="Celebrity" />
                    <p className="sort_txt">{curr?.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="fltr_btn mt-3"
              onClick={() => {
                handleClick("submit", true);
                // handleFavSortFilter();
                handleClose();
              }}
            >
              Apply
            </button>
          </div>
        </div>
        {/* <button
          className="fltr_btn mt-3"
          onClick={() => {
            handleFilter();
            handleClose();
          }}
        >
          Apply
        </button> */}
      </div>
    </>
  );
};

export default BroadcastedFilters;
