import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import fashionic from "../../../assets/images/Fashion.svg";
import businessic from "../../../assets/images/sortIcons/business.svg";
import celebrityic from "../../../assets/images/sortIcons/celebrity.svg";
import closeic from "../../../assets/images/sortIcons/close.svg";
import crimeic from "../../../assets/images/sortIcons/crime.svg";
import politicalic from "../../../assets/images/sortIcons/political.svg";
import latestic from "../../../assets/images/sortIcons/latest.svg";
import exclusiveic from "../../../assets/images/exclusive.svg";
import sharedic from "../../../assets/images/shared.svg";
import contentic from "../../../assets/images/sortIcons/content.svg";
import { Get, Post } from "../../../services/user.services";

const FundsinvestedFilter = ({
  rangeTimeValues,
  closeSortComponent,
  // active,
  // setActive,
  allFilterData,
  setAllFilterData,
}) => {
  // const [active, setActive] = useState("")

  const [active, setActive] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [address, setAddress] = useState("");

  const [filterSort, setFilterSort] = useState({
    field: "",
    values: "",
    type: "fundsinvested",
  });

  const handleClose = (values) => {
    if (values === false) {
      rangeTimeValues({ field: "", values: "", type: "fundsinvested" });
      setActive("");
    }
    closeSortComponent(values);
  };

  const handleClickTime = (field, values) => {
    setFilterSort({ field, values, type: "fundsinvested" });
    setActive(values);
  };

  const handleFavSortFilter = () => {
    rangeTimeValues(filterSort);
    // console.log("filterSort 52 ==>", filterSort)
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

  // console.log("all fiolter data ---. >", allFilterData);

  return (
    <>
      <div className="filter_wrap custm-fltr">
        <div className="srt_fltr_hdr">
          <img
            src={closeic}
            height="17px"
            className="icn close"
            alt="Close"
            onClick={() => handleClose()}
          />
          <p className="hdng">Filter</p>
          <div className="notf_icn_wrp" onClick={() => handleClose(false)}>
            <a className="link">Clear all</a>
          </div>
        </div>
        <div className="srt_sub_hdng">
          <p className="sort_hdng" alt="">
            Filter
          </p>
        </div>
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
              //  className="sort_item"
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
                    allFilterData?.category?.includes(curr?._id) ? "active" : ""
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
    </>
  );
};

export default FundsinvestedFilter;
