// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// // import HeaderN from "../component/HeaderN"
// import {
//   Button,
//   Card,
//   CardContent,
//   Checkbox,
//   FormControlLabel,
//   Typography,
// } from "@mui/material";
// import moment from "moment/moment";
// import { Col, Container, Form, Row } from "react-bootstrap";
// import InputGroup from "react-bootstrap/InputGroup";
// import Modal from "react-bootstrap/Modal";
// import Overlay from "react-bootstrap/Overlay";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import Tooltip from "react-bootstrap/Tooltip";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import {
//   BsArrowLeft,
//   BsArrowRight,
//   BsChevronDown,
//   BsMic,
//   BsPause,
//   BsPlay,
// } from "react-icons/bs";
// import { MdAdd, MdOutlineWatchLater } from "react-icons/md";
// import { SlLocationPin } from "react-icons/sl";
// import { ReactMic } from "react-mic-recorder";
// import { Rating } from "react-simple-star-rating";
// import { Pagination } from "swiper";
// import "swiper/css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import audioic from "../assets/images/audimg.svg";
// import NoProfile from "../assets/images/blank-profile-picture.png";
// import cameraic from "../assets/images/camera.svg";
// // import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
// import presshopchatic from "../assets/images/chat_logo.png";
// import contentVideo from "../assets/images/contentVideo.svg";
// import docsic from "../assets/images/docsic.svg";
// import usric from "../assets/images/menu-icons/user.svg";
// import exclusive from "../assets/images/exclusive.png";
// import favouritedic from "../assets/images/favouritestar.svg";
// import interviewic from "../assets/images/interview.svg";
// import pdfic from "../assets/images/pdfic.svg";
// import authorimg from "../assets/images/profile.webp";
// import shared from "../assets/images/share.png";
// import favic from "../assets/images/star.svg";
// import videoic from "../assets/images/video.svg";
// import ChatCard from "../component/ChatCard";
// import DbFooter from "../component/DbFooter";
// import Header from "../component/Header";
// import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
// import { UserDetails } from "../component/Utils";
// import ContentFeedCard from "../component/card/ContentFeedCard";
// import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
// import { Get, Patch, Post } from "../services/user.services";
// import Loader from "../component/Loader";
// import { useDarkMode } from "../context/DarkModeContext";
// import {
//   blobImageUrl,
//   formatAmountInMillion,
//   successToasterFun,
// } from "../component/commonFunction";
// import socketServer from "../socket.config";
// import { SlMagnifierAdd } from "react-icons/sl";
// import ViewContent from "../component/ViewContent";
// import heart from "../assets/images/heart.svg";

// const Feeddetail = (props) => {
//   const [isRecording, setIsRecording] = useState(false);

//   const [selectedIds, setSelectedIds] = useState([]);
//   const param = useParams();
//   const navigate = useNavigate();
//   const [adminList, setAdminList] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [offer_value, setOffer_value] = useState("");
//   const [room_details, setRoom_Details] = useState();
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();
//   const [fav, setFav] = useState();
//   const [hopper, setHopper] = useState();
//   const [hopperid, setHopperid] = useState();
//   const [userList, setUserList] = useState([]);
//   const [senderId, setSenderId] = useState("");
//   const [review, setReview] = useState("");
//   const usernew = UserDetails;
//   const [content, setRelatedContent] = useState([]);
//   const [moreContent, setMoreContent] = useState([]);
//   const [chatContentIds, setChatContentIds] = useState({
//     room_id: "",
//     sender_id: "",
//   });
//   const [contentId, setContentId] = useState(null);
//   const [showChat, setShowChat] = useState({
//     content: false,
//     task: false,
//     presshop: false,
//     internal: false,
//   });
//   const [room_idForContent, setRoom_idForContent] = useState("");
//   const [roomDetails, setRoomDetails] = useState();
//   const [show, setShow] = useState(false);
//   const target = useRef(null);
//   const [show1, setShow1] = useState(false);
//   const handleClose = () => setShow1(false);
//   const [bigData, setBigData] = useState("");
//   const handleShow = (curr) => {
//     setBigData(curr?.message), setShow1(true);
//   };
//   const [preview, setPreview] = useState({
//     type: "",
//     path: "",
//     modalOpen: false,
//   });

//   const handleClosePreview = () =>
//     setPreview((pre) => ({ ...pre, modalOpen: false }));

//   const [admins, setAdmins] = useState([]);
//   const [tabSelect, setTabSelect] = useState("internal");
//   const [openContent, setOpenContent] = useState(false);
//   const [showContent, setShowContent] = useState({});
//   const [imageSize, setImageSize] = useState({ height: 0, width: 0 });
//   const [features, setFeatures] = useState([]);

//   const handleFeatures = (val) => {
//     if (features.includes(val)) {
//       const data = features.filter((el) => el != val);
//       setFeatures(data);
//     } else {
//       setFeatures([...features, val]);
//     }
//   };

//   const { profileData,setCartCount } = useDarkMode();
//   const userImage = profileData?.hasOwnProperty("admin_detail")
//     ? profileData?.admin_detail?.admin_profile
//     : profileData?.profile_image;

//   const username = profileData?.full_name;

//   useEffect(() => {
//     window?.scrollTo(0, 0);
//   }, [param.id]);

//   const CreateRoom = async (id, idnew) => {
//     try {
//       const obj = {
//         receiver_id: id,
//         room_type: "MediahousetoAdmin",
//         type: "external_content",
//         content_id: param?.type === "favourite" ? idnew : param.id,
//       };
//       if (!id) {
//         return;
//       }
//       const resp = await Post(`mediaHouse/createRoom`, obj);
//       if (resp && resp.data && resp.data.details) {
//         setRoom_Details(resp.data.details);
//         setRoomDetails(resp.data.details);
//         setRoom_idForContent(resp.data.details.room_id);
//         localStorage.setItem("roomId2", resp.data.details.room_id || "");
//         // JoinRoom(resp.data.details.room_id);
//         const resp1 = await Post(`mediaHouse/getAllchat`, {
//           room_id: resp.data.details.room_id,
//         });
//         if (resp1 && resp1.data && resp1.data.response) {
//           setMessages(resp1.data.response);
//         }
//       } else {
//         console.error("Incomplete response data:", resp);
//       }
//     } catch (error) {
//       console.error("API request error:", error);
//     }
//   };

//   const Start_Offer = async () => {
//     setLoading(true);
//     try {
//       const obj = {
//         room_id: roomDetails.room_id,
//         content_id: roomDetails.content_id,
//         sender_type: "Mediahouse",
//         sender_id: roomDetails.sender_id,
//         message_type: "offer_started",
//         receiver_id: roomDetails.receiver_id,
//         initial_offer_price: "",
//         finaloffer_price: "",
//       };
//       socketServer.emit("initialoffer", obj);
//       socketServer.on("initialoffer", (obj) => {
//         const tempMsg = obj;
//         setMessages([...messages]);
//         getMessages();
//       });
//       setLoading(false);
//     } catch (error) {
//       // Handle errors
//       setLoading(false);
//     }
//   };

//   const Content_Offer = (offer_type) => {
//     try {
//       let obj = {
//         room_id: room_details.room_id,
//         content_id: room_details.content_id,
//         sender_type: "Mediahouse",
//         sender_id: room_details.sender_id,
//         message_type: offer_type,
//         receiver_id: room_details.receiver_id,
//         initial_offer_price: "",
//         finaloffer_price: "",
//       };
//       if (offer_type === "Mediahouse_initial_offer") {
//         obj.initial_offer_price = offer_value;
//       }
//       if (offer_type === "Mediahouse_final_offer") {
//         obj.finaloffer_price = offer_value;
//       }

//       socketServer.emit("initialoffer", obj);
//       setOffer_value("");
//       getMessages();
//     } catch (error) {
//       // Handle errors
//     }
//   };

//   const NewExternalChatFun = async (
//     type,
//     offer_amount,
//     initial_offer_price = 0,
//     room
//   ) => {
//     const obj = {
//       image_id: contentId,
//       offer_amount: offer_amount,
//       room_id: room.room_id,
//       sender_id: room.sender_id,
//       receiver_id: room.receiver_id,
//       type: type,
//       initial_offer_price,
//     };
//     try {
//       await Post("mediahouse/newChatFlow", obj);
//       getMessages();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // console.log("Messages", messages)

//   const Payment = async (
//     amount,
//     image_id,
//     reconsider = false,
//     reconsider_amount = 0,
//     room_id
//   ) => {
//     try {
//       setLoading(true);
//       const obj1 = {
//         customer_id: UserDetails.stripe_customer_id,
//         type: "content",
//         amount,
//         image_id,
//         reconsider,
//         reconsider_amount,
//         room_id: room_id?.room_id,
//         offer: true,
//         is_charity: data?.is_charity,
//         description: data?.heading,
//       };
//       const obj2 = {
//         type: "content",
//         product_id: image_id,
//         amount_paid: amount,
//         commission: 0,
//       };
//       const resp1 = await Post("mediahouse/applicationfee", obj2);
//       obj1.application_fee = resp1?.data?.data;
//       // obj1.stripe_account_id = resp1?.data?.stripe_account_id;
//       obj1.stripe_account_id = data?.is_charity
//         ? data?.stripe_account_id
//         : resp1?.data?.stripe_account_id;

//       const resp2 = await Post("mediahouse/createPayment", obj1);
//       window.open(resp2.data.url, "_blank");
//       if (resp2) {
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       successToasterFun(error?.response?.data?.errors?.msg);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("focus", () => {
//       ContentByID();
//     });
//     return () =>
//       window.removeEventListener("focus", () => {
//         ContentByID();
//       });
//   }, []);

//   const DownloadContent = async (id) => {
//     window.open(
//       `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=content`,
//       "_blank"
//     );
//   };

//   const RatingForMediahouse = () => {
//     try {
//       let obj = {
//         room_id: room_details.room_id,
//         content_id: room_details.content_id,
//         sender_type: "Mediahouse",
//         sender_id: room_details.sender_id,
//         message_type: "rating_mediaHouse",
//         receiver_id: room_details.receiver_id,
//         initial_offer_price: "",
//         finaloffer_price: "",
//       };
//       getMessages();
//       socket.emit("initialoffer", obj);
//     } catch (error) {
//       // console.log(error, "<-----errors for Start_Offer");
//     }
//   };

//   const [rating, setRating] = useState(0);
//   const handleRating = (rate) => {
//     setRating(rate);
//   };

//   const RatingNReview = (image_id, paid_status) => {
//     const obj = {
//       room_id: room_details.room_id,
//       sender_type: "Mediahouse",
//       receiver_id: room_details.receiver_id,
//       sender_id: room_details.sender_id,
//       rating: rating,
//       review: review,
//       type: "content",
//       image_id: image_id,
//       features: features,
//       message_type: "rating_by_mediahouse",
//       paid_status,
//     };
//     socketServer.emit("rating", obj);
//     socketServer.on("rating", (data) => {
//       // console.log("Rating", data)
//       getMessages();
//     });
//   };

//   const hopperFinalOffer = messages?.find(
//     (item) => item.message_type === "Mediahouse_final_offer"
//   );

//   const hopperFinalOfferPrice = hopperFinalOffer
//     ? hopperFinalOffer.finaloffer_price
//     : "";

//   const MediahouseFinal = messages?.find(
//     (item) => item.message_type === "Mediahouse_final_counter"
//   );

//   const MediahouseFinalCounter = MediahouseFinal ? true : false;

//   const MediahouseInitial = messages?.find(
//     (item) => item.message_type === "Mediahouse_initial_offer"
//   );

//   const MediahouseInitialOffer = MediahouseInitial ? true : false;

//   const Paymentt = messages?.find(
//     (item) => item.message_type === "PaymentIntent"
//   );

//   const PaymentIntent = Paymentt ? Paymentt.paid_status : "";

//   const ContentByID = async () => {
//     setLoading(true);
//     try {
//       const resp = await Post(`mediaHouse/view/published/content`, {
//         id: param.id,
//       });
//       setContentId(param.id);
//       setData(resp.data.content);
//       setShowContent(resp?.data?.content?.content[0]);

//       if (resp?.data?.content?.content[0]?.media_type == "image") {
//         const img = new Image();
//         img.src = resp?.data?.content?.content[0]?.watermark;
//         img.onload = function () {
//           setImageSize({ height: img.height, width: img.width });
//         };
//       }

//       setChatContentIds((pre) => ({
//         ...pre,
//         room_id: resp.data.room_id?.room_id,
//         sender_id: JSON.parse(localStorage.getItem("user"))?._id,
//       }));
//       localStorage.setItem("internal", resp.data.content._id);
//       if (resp.data.content?.hopper_id?._id && resp.data.content?._id) {
//         CreateRoom(resp.data.content?.hopper_id?._id, resp.data.content?._id);
//       }
//       setHopper(resp.data.content?.hopper_id);
//       setHopperid(resp.data.content?.hopper_id?._id);
//       const resp1 = await Post(`mediaHouse/MoreContent`, {
//         hopper_id: resp.data.content?.hopper_id?._id,
//         content_id: param?.id,
//       });
//       console.log("resp1.data.content",resp1.data.content)
//       setMoreContent(resp1.data.content);
//       const resp2 = await Post(`mediaHouse/relatedContent`, {
//         tag_id: [resp.data.content.tag_ids[0]?._id],
//         hopper_id: resp.data.content?.hopper_id?._id,
//         category_id: resp.data.content.category_id?._id,
//         content_id: resp.data.content._id,
//       });
//       console.log("resp2?.data?.content",resp2?.data?.content)
//       setRelatedContent(resp2?.data?.content);
//       localStorage.setItem(
//         "tag_id",
//         resp.data.content.tag_ids[0]?._id,
//         "hopper_id",
//         resp.data.content?.hopper_id?._id
//       );
//       setHopperid(resp.data.content?.hopper_id?._id);
//       localStorage.setItem("hopperid", resp.data.content?.hopper_id?._id);
//       if (resp) {
//         setLoading(false);
//       }
//     } catch (error) {
//       // console.log(error);
//       setLoading(false);
//     }
//   };

//   const Favourite = async (val) => {
//     try {
//       let obj = {
//         favourite_status: val,
//         content_id: data ? data._id : fav?.content_id?._id,
//       };

//       setData({ ...data, favourite_status: val });
//       await Patch(`mediaHouse/add/to/favourites`, obj);
//     } catch (error) {
//       // console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     if (param.type === "content") {
//       ContentByID();
//     } else if (param.type === "favourite") {
//       FavouriteByID();
//     }
//     GetUserList();
//   }, [param?.id]);

//   const Audio = data
//     ? data.content.filter((item) => item.media_type === "audio")
//     : fav?.content_id?.content?.filter((item) => item?.media_type === "audio");
//   const Video = data
//     ? data.content.filter((item) => item.media_type === "video")
//     : fav?.content_id?.content?.filter((item) => item?.media_type === "video");
//   const images = data
//     ? data.content.filter((item) => item.media_type === "image")
//     : fav?.content_id?.content?.filter((item) => item?.media_type === "image");
//   const Pdf = data
//     ? data.content.filter((item) => item.media_type === "pdf")
//     : fav?.content_id?.content?.filter((item) => item?.media_type === "pdf");
//   const Doc = data
//     ? data.content.filter((item) => item.media_type === "doc")
//     : fav?.content_id?.content?.filter((item) => item?.media_type === "doc");

//   function capitalizeFirstLetter(string) {
//     return string?.charAt(0)?.toUpperCase() + string?.slice(1);
//   }

//   const GetUserList = async () => {
//     const resp = await Post(`mediaHouse/getMediahouseUser`);
//     if (resp) {
//       setUserList(resp.data.response);
//     }
//     const resp1 = await Get(`mediaHouse/adminlist`);
//     const newData = resp1?.data?.data?.map((el) => {
//       return {
//         ...el,
//         checked: false,
//       };
//     });
//     setAdminList(newData);
//   };

//   const handleChecked = (el) => {
//     setAdminList((prev) => {
//       const changedData = prev.map((item) => ({
//         ...item,
//         checked: item == el ? !item.checked : false,
//       }));
//       return changedData;
//     });
//   };

//   // internal chat start
//   const [mediaFile, setMediaFile] = useState({ path: "", type: "" });
//   const [message, setMessage] = useState([]);
//   const [msg1, setMsg1] = useState("");

//   const onStartRecording = () => {
//     setIsRecording(true);
//   };

//   const onStopRecording = async (recordedBlob) => {
//     setIsRecording(false);
//     try {
//       const formData = new FormData();
//       formData.append("path", "profileImg");
//       formData.append("media", recordedBlob?.blob);
//       const filePath = await Post("mediaHouse/uploadUserMedia", formData);
//       if (filePath) {
//         setMediaFile((prev) => ({
//           ...prev,
//           path: filePath?.data?.path,
//           type: "audio",
//         }));
//       }
//     } catch (error) {
//       console.error("Error uploading audio:", error);
//     }
//   };

//   useEffect(() => {
//     ChatList();
//   }, [chatContentIds, socketServer]);

//   useEffect(() => {
//     // Internal Chat and External Chat-
//     if (tabSelect == "internal") {
//       const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
//       if (messageContainer) {
//         messageContainer.scrollTop = messageContainer.scrollHeight;
//       }
//       socketServer.emit("room join", { room_id: chatContentIds?.room_id });
//       socketServer.on("internal group chat", (data) => {
//         const newMessage = data;
//         if (!newMessage?.createdAt) {
//           setMessage((prevMessages) => [...prevMessages, newMessage]);
//           messageContainer.scrollTop = messageContainer.scrollHeight;
//         }
//         if (newMessage) {
//           messageContainer.scrollTop = messageContainer.scrollHeight;
//         }
//       });
//       return () => {
//         socketServer.emit("room leave", { room_id: chatContentIds?.room_id });
//         socketServer.off("internal group chat");
//       };
//     } else if (tabSelect == "external") {
//       socketServer.emit("room join", { room_id: room_idForContent });
//       socketServer?.on("getAdmins", (data) => {
//         setAdmins(data);
//       });
//       socketServer.on("initialoffer", (data) => {
//         const newMessage = data;
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });
//       socketServer.on("chat message", (data) => {
//         // console.log("chat message", data)
//         getMessages();
//       });
//       socketServer.on("buy", (data) => {
//         // console.log("Buy", data)
//         getMessages();
//       });
//       return () => {
//         socketServer.emit("room leave", { room_id: room_idForContent });
//         socketServer.off("initialoffer");
//       };
//     }
//   }, [tabSelect, socketServer]);

//   const handleCheckboxChange = (itemId) => {
//     if (selectedIds.includes(itemId)) {
//       setSelectedIds(selectedIds.filter((id) => id !== itemId));
//     } else {
//       setSelectedIds([...selectedIds, itemId]);
//     }
//   };

//   const AddParticipents = async () => {
//     try {
//       let obj = {
//         type: "add",
//         users: selectedIds,
//         content_id: param.id,
//         room_id: chatContentIds ? chatContentIds?.room_id : "",
//       };
//       // console.log("Obj ----->", obj)
//       const resp = await Post("mediaHouse/internalGroupChatMH", obj);
//       if (resp) {
//         setSelectedIds([]);
//         GetUserList();
//         setChatContentIds((pre) => ({
//           ...pre,
//           room_id: resp?.data?.data?.data?.room_id,
//         }));
//         socketServer.emit("room join", {
//           room_id: resp?.data?.data?.data?.room_id,
//         });
//       }
//     } catch (error) {
//       // console.log(error, `<<<<<socketServer error`);
//       // Handle errors
//     }
//   };

//   const handleChange = async (event) => {
//     setLoading(true);
//     const file = event.target.files[0];
//     if (file.type.startsWith("video/")) {
//       setMediaFile((pre) => ({ ...pre, type: "video" }));
//       setPreview((pre) => ({ ...pre, type: "video" }));
//     } else if (file.type.startsWith("image/")) {
//       setMediaFile((pre) => ({ ...pre, type: "image" }));
//       setPreview((pre) => ({ ...pre, type: "image" }));
//     } else if (file.type.startsWith("audio/")) {
//       setMediaFile((pre) => ({ ...pre, type: "audio" }));
//       setPreview((pre) => ({ ...pre, type: "audio" }));
//     }
//     const Formdata = new FormData();
//     Formdata.append("path", "profileImg");
//     Formdata.append("media", file);
//     const filePath = await Post("mediaHouse/uploadUserMedia", Formdata);
//     if (filePath) {
//       setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }));
//       setPreview((pre) => ({
//         ...pre,
//         path: filePath?.data?.path,
//         modalOpen: true,
//       }));
//     }
//     setLoading(false);
//   };

//   const handleButtonClick = (e) => {
//     e.preventDefault();
//     let messages = {
//       sender_id: chatContentIds?.sender_id,
//       room_id: chatContentIds?.room_id,
//       message: mediaFile?.path ? mediaFile?.path : msg1,
//       type: mediaFile?.type ? mediaFile?.type : "text",
//       user_info: {
//         profile_image: profileData?.hasOwnProperty("admin_detail")
//           ? profileData?.admin_detail?.admin_profile
//           : profileData?.profile_image,
//         first_name: profileData?.first_name,
//         last_name: profileData?.last_name,
//       },
//     };

//     // console.log("Send message", messages)
//     socketServer.emit("internal group chat", messages);
//     setMsg1("");
//     setMediaFile({
//       path: "",
//       type: "",
//     });
//     setPreview((pre) => ({ ...pre, modalOpen: false }));
//   };

//   const ChatList = async () => {
//     try {
//       const resp = await Get(
//         `mediaHouse/openChatsMH?room_id=${chatContentIds?.room_id}`
//       );
//       if (resp) {
//         localStorage.setItem("contentId", JSON.stringify(param.id));
//         localStorage.setItem("type", "content");
//         localStorage.setItem("roomId", chatContentIds?.room_id || "");
//         localStorage.removeItem("receiverId");
//         localStorage.setItem("tabName", JSON.stringify("internal"));
//         setMessage(resp?.data?.response?.data);
//       }
//     } catch (error) {
//       // Handle errors
//     }
//   };

//   // internal chat end

//   // Detail of current User
//   const user = profileData;
//   const fullName = user?.first_name + " " + user?.last_name;

//   const audioRef = useRef(null);

//   const toggleAudio = () => {
//     const audio = audioRef.current;
//     if (audio.paused) {
//       audio.play().catch((error) => {
//         console.error("Error playing audio:", error);
//       });
//     } else {
//       audio.pause();
//     }
//   };

//   const chatBoxRef = useRef(null);

//   const scrollToBottom = () => {
//     if (chatBoxRef?.current) {
//       const { scrollHeight, clientHeight, offsetHeight } = chatBoxRef?.current;
//       let currentScrollTop = chatBoxRef?.current?.scrollTop;
//       const scrollStep = 0;

//       const scrollDown = () => {
//         if (chatBoxRef.current && currentScrollTop < scrollHeight - clientHeight) {
//           currentScrollTop += scrollStep;
//           chatBoxRef.current.scrollTop = currentScrollTop;
//           requestAnimationFrame(scrollDown);
//         }
//       };

//       scrollDown();
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [message]);

//   // Favourite content-
//   const favContentHandler = (i, type) => {
//     if (type == "related") {
//       setRelatedContent((prev) => {
//         const allContent = [...prev];
//         allContent[i]["favourite_status"] =
//           allContent[i]["favourite_status"] === "true" ? "false" : "true";
//         return allContent;
//       });
//     } else {
//       setMoreContent((prev) => {
//         const allContent = [...prev];
//         allContent[i]["favourite_status"] =
//           allContent[i]["favourite_status"] === "true" ? "false" : "true";
//         return allContent;
//       });
//     }
//   };

//   // recent activity
//   const recentActivity = async () => {
//     try {
//       if (contentId) {
//         await Post("mediaHouse/recentactivityformediahouse", {
//           content_id: contentId,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     recentActivity();
//   }, [contentId]);

//   const getMessages = async () => {
//     try {
//       const resp1 = await Post(`mediaHouse/getAllchat`, {
//         room_id: roomDetails?.room_id,
//       });
//       if (resp1) {
//         setMessages(resp1?.data?.response);
//         scrollToBottom();
//       }
//     } catch (error) {
//       // console.log("Error in get messages", error);
//     }
//   };

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollDown({ behavior: "smooth" });
//     }
//   }, [messages]);
// console.log("messages",messages);

// async function getCountOfBasketItems(){
//   try{

//     const res = await Get(`mediaHouse/getBasketDataCount`);

//             console.log("count",res?.data?.data);
//             setCartCount(res?.data?.data || 0)

//   }catch(error){
//     console.log("basketcountError",error)
//   }
// }

// // Add to basket-
// const AddToBasket = async (element) => {
//   try {

//     console.log("dataType",element)
//     // return
//     let obj = {};

//     if (data.type == "task") {
//       obj = {
//         type: "uploaded_content",
//         uploaded_content: element.content_id
//       };
//     }
//     else {
//       obj = {
//         type: element?.type == "task" ? "task" : "content",
//         post_id: element._id,
//         content: element?.content?.map((el) => {
//           return {
//             media_type: el?.media_type,
//             media: el?.media,
//             watermark:el?.watermark,
//             content_id: el?._id
//           }
//         })
//       };
//     }
//    const res= await Post(`mediaHouse/addToBasket`, { order: [obj] });
//    if(res){
//     //  ContentByID();
//     setData({ ...data,
//       basket_status: data?.basket_status=="true" ? "false":"true" });

//      getCountOfBasketItems();
//    }
//   }
//   catch (error) {
//   }
// };
//   return (
//     <>
//       {loading && <Loader />}
//       <Header />
//       <div className="page-wrap feed-detail">
//         <Container fluid>
//           <Row>
//             <Col md={12}>
//               <div className="feedsMain_wrap">
//                 <div className="feedsContainer">
//                   <div className="feedContent_header">
//                     <Link onClick={() => window.history.back()}>
//                       <BsArrowLeft className="text-pink" /> Back{" "}
//                     </Link>
//                   </div>

//                   <Row className="">
//                     <Col md={8}>
//                       <Card className="feeddetail-card left-card">
//                         <CardContent className="card-content position-relative">
//                           <div className="photo-resize">
//                             <div className="post_icns_cstm_wrp">
//                               {Audio && Audio.length > 0 && (
//                                 <div className="post_itm_icns dtl_icns">
//                                   {Audio && Audio.length > 0 && (
//                                     <span className="count">
//                                       {Audio &&
//                                         Audio.length > 0 &&
//                                         Audio.length}
//                                     </span>
//                                   )}

//                                   {Audio && Audio.length > 0 && (
//                                     <img
//                                       className="feedMediaType iconBg"
//                                       src={interviewic}
//                                       alt=""
//                                     />
//                                   )}
//                                 </div>
//                               )}

//                               {Video && Video.length > 0 && (
//                                 <div className="post_itm_icns dtl_icns">
//                                   {Video && Video.length > 0 && (
//                                     <span className="count">
//                                       {Video &&
//                                         Video.length > 0 &&
//                                         Video.length}
//                                     </span>
//                                   )}
//                                   {Video && Video.length > 0 && (
//                                     <img
//                                       className="feedMediaType iconBg"
//                                       src={videoic}
//                                       alt=""
//                                     />
//                                   )}
//                                 </div>
//                               )}

//                               {images && images.length > 0 && (
//                                 <div className="post_itm_icns dtl_icns">
//                                   {images && images.length > 0 && (
//                                     <span className="count">
//                                       {images &&
//                                         images.length > 0 &&
//                                         images.length}
//                                     </span>
//                                   )}

//                                   {images && images.length > 0 && (
//                                     <img
//                                       className="feedMediaType iconBg"
//                                       src={cameraic}
//                                       alt=""
//                                     />
//                                   )}
//                                 </div>
//                               )}
//                               {Pdf && Pdf.length > 0 && (
//                                 <div className="post_itm_icns dtl_icns">
//                                   {Pdf && Pdf.length > 0 && (
//                                     <span className="count">
//                                       {Pdf && Pdf.length > 0 && Pdf.length}
//                                     </span>
//                                   )}

//                                   {Pdf && Pdf.length > 0 && (
//                                     <img
//                                       className="feedMediaType iconBg"
//                                       src={docsic}
//                                       alt=""
//                                     />
//                                   )}
//                                 </div>
//                               )}

//                               {Doc && Doc.length > 0 && (
//                                 <div className="post_itm_icns dtl_icns">
//                                   {Doc && Doc.length > 0 && (
//                                     <span className="count">
//                                       {Doc && Doc.length > 0 && Doc.length}
//                                     </span>
//                                   )}

//                                   {Doc && Doc.length > 0 && (
//                                     <img
//                                       className="feedMediaType iconBg"
//                                       src={docsic}
//                                       alt=""
//                                     />
//                                   )}
//                                 </div>
//                               )}
//                             </div>

//                             <div
//                               className="post_itm_icns right dtl_icns"
//                               onClick={() =>
//                                 Favourite(
//                                   data?.favourite_status === "true"
//                                     ? "false"
//                                     : "true"
//                                 )
//                               }
//                             >
//                               {/* Favourite icon */}
//                               <img
//                                 className="feedMediaType iconBg"
//                                 src={
//                                   data?.favourite_status === "true"
//                                     ? favouritedic
//                                     : favic
//                                 }
//                                 alt={
//                                   data?.favourite_status === "true"
//                                     ? favouritedic
//                                     : favic
//                                 }
//                               />
//                             </div>

//                             <div
//                               className="post_itm_icns right dtl_icns cart_icn"
//                               onClick={(event) => {
//                                 event.stopPropagation();
//                                 AddToBasket(data);
//                                 // props.basket();
//                               }}
//                             // onClick={() => Favourite(data?.favourite_status === "true" ? "false" : "true")}
//                             >

//                               {/* Favourite icon */}
//                               {/* <svg
//                                 width="31"
//                                 height="30"
//                                 viewBox="0 0 31 30"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
//                                   stroke="white"
//                                   stroke-width="1.96354"
//                                 />
//                               </svg> */}

//                 {
//                   data?.basket_status == "false"
//                     ?
//                     <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z" stroke="white" stroke-width="1.96354" />
//                     </svg>
//                     :
//                     <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z" stroke="white" stroke-width="1.96354" />
//                       <path d="M9 8H27.5L25 18H12L9 8Z" fill="white" />
//                     </svg>
//                 }

//                             </div>

//                             <div
//                               className="post_itm_icns right dtl_icns magnifier-icn"
//                               onClick={() => {
//                                 setOpenContent(!openContent);
//                               }}
//                             >
//                               <div className="feedMediaType iconBg view-icon">
//                                 <SlMagnifierAdd />
//                               </div>
//                             </div>
//                             <ViewContent
//                               openContent={openContent}
//                               setOpenContent={setOpenContent}
//                               showContent={showContent}
//                               imageSize={imageSize}
//                             />

//                             {/* Swiper container */}
//                             <Swiper
//                               spaceBetween={50}
//                               slidesPerView={1}
//                               modules={[Pagination]}
//                               slidesPerGroupSkip={1}
//                               focusableElements="pagination"
//                               pagination={{ clickable: true }}
//                               onSlideChange={(e) => {
//                                 setShowContent(data.content[e.activeIndex]);
//                                 if (
//                                   data.content[e.activeIndex]?.media_type ==
//                                   "image"
//                                 ) {
//                                   const img = new Image();
//                                   img.src =
//                                     data.content[e.activeIndex]?.watermark;
//                                   img.onload = function () {
//                                     setImageSize({
//                                       height: img.height,
//                                       width: img.width,
//                                     });
//                                   };
//                                 }
//                               }}
//                             // onSwiper={(swiper) => console.log(swiper)}
//                             >
//                               {data
//                                 ? data.content.map((curr) => (
//                                   <SwiperSlide key={curr._id}>
//                                     <div
//                                       className={`swiper-slide-content ${data?.before_discount_value
//                                           ? "slide-offer"
//                                           : ""
//                                         }`}
//                                     >
//                                       {/* Media content based on type */}
//                                       {curr?.media_type === "image" && (
//                                         <img
//                                           src={curr?.watermark}
//                                           alt={`Image ${curr._id}`}
//                                         />
//                                       )}
//                                       {curr?.media_type === "audio" && (
//                                         <div>
//                                           <img
//                                             src={audioic}
//                                             alt={`Audio ${curr._id}`}
//                                             className="slider-img"
//                                             onClick={toggleAudio}
//                                           />
//                                           <audio
//                                             controls
//                                             src={
//                                               curr?.watermark ||
//                                               process.env
//                                                 .REACT_APP_CONTENT_MEDIA +
//                                               curr?.media
//                                             }
//                                             type="audio/mpeg"
//                                             className="slider-audio"
//                                             ref={audioRef}
//                                           />
//                                         </div>
//                                       )}
//                                       {curr?.media_type === "video" && (
//                                         <video
//                                           controls
//                                           className="slider-video"
//                                           src={curr?.watermark}
//                                           style={{
//                                             height: "380px",
//                                             width: "100%",
//                                           }}
//                                         />
//                                       )}
//                                       {curr?.media_type === "pdf" && (
//                                         <embed
//                                           src={`${process.env
//                                               .REACT_APP_CONTENT_MEDIA +
//                                             curr?.media
//                                             }`}
//                                           type="application/pdf"
//                                           width="100%"
//                                           height="500"
//                                         />
//                                       )}
//                                       {data?.before_discount_value ? (
//                                         <span>{`${data?.sales_prefix} ${data?.discount_percent}% Off`}</span>
//                                       ) : null}
//                                     </div>
//                                   </SwiperSlide>
//                                 ))
//                                 : fav?.content_id?.content?.map((curr) => (
//                                   <SwiperSlide key={curr._id}>
//                                     <div className="swiper-slide-content">
//                                       {/* Media content based on type */}
//                                       {curr?.media_type === "image" && (
//                                         <img
//                                           src={
//                                             curr?.watermark ||
//                                             process.env
//                                               .REACT_APP_CONTENT_MEDIA +
//                                             curr?.media
//                                           }
//                                           alt={`Image ${curr._id}`}
//                                         />
//                                       )}
//                                       {curr?.media_type === "audio" && (
//                                         <div>
//                                           <img
//                                             src={audioic}
//                                             alt={`Audio ${curr._id}`}
//                                             className="slider-img"
//                                             onClick={toggleAudio}
//                                           />
//                                           <audio
//                                             controls
//                                             src={
//                                               process.env
//                                                 .REACT_APP_CONTENT_MEDIA +
//                                               curr?.media
//                                             }
//                                             type="audio/mpeg"
//                                             className="slider-audio"
//                                             ref={audioRef}
//                                           />
//                                         </div>
//                                       )}
//                                       {curr?.media_type === "video" && (
//                                         <video
//                                           controls
//                                           className="slider-video"
//                                           src={curr?.media}
//                                         />
//                                       )}
//                                     </div>
//                                   </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                           </div>

//                           <div className="feedTitle_content">
//                             <h1 className="feedTitle">
//                               {data ? data?.heading : fav?.content_id?.heading}
//                             </h1>

//                             {/* <p className="feed_descrptn dtl_txt">
//                               {data
//                                 ? data?.description
//                                 : fav?.content_id?.description}
//                             </p> */}
//                             <textarea
//                               className="form-control custom_textarea"
//                               readOnly
//                               value={
//                                 data
//                                   ? data?.description
//                                   : fav?.content_id?.description
//                               }
//                             ></textarea>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </Col>

//                     <Col md={4}>
//                       <Card className="feeddetail-card h-100 content-info">
//                         <CardContent className="card-content feedDetailInfo">
//                           <div className="sub-content">
//                             <div className="heading w-100 d-flex align-items-center justify-content-between">
//                               <Typography className="txt_bld">
//                                 {" "}
//                                 Content info
//                               </Typography>
//                               {data?.favourite_status === "true" && (
//                                 <div className="favourite">
//                                   <AiFillStar />
//                                   <span>Favourited</span>
//                                 </div>
//                               )}
//                               {data?.favourite_status === "false" && (
//                                 <div className="favourite">
//                                   <AiOutlineStar />
//                                   <span>Favourite</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           {/* <hr /> */}
//                           <div className="content">
//                             <div className="sub-content">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">Hopper</span>
//                                 <div className="item-in-right">
//                                   <img
//                                     src={
//                                       data
//                                         ? data?.hopper_id?.avatar_id?.avatar
//                                           ? process.env.REACT_APP_AVATAR_IMAGE +
//                                           data?.hopper_id?.avatar_id?.avatar
//                                           : null
//                                         : fav?.content_id?.hopper_id?.avatar_id
//                                           ?.avatar
//                                           ? process.env.REACT_APP_AVATAR_IMAGE +
//                                           fav?.content_id?.hopper_id?.avatar_id
//                                             ?.avatar
//                                           : null
//                                     }
//                                     alt=""
//                                   />

//                                   <span className="hpr_nme">
//                                     {data
//                                       ? data?.hopper_id?.user_name
//                                       : fav?.content_id?.hopper_id?.user_name}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="sub-content">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">Location</span>
//                                 <div className="item-in-right loc">
//                                   <span>
//                                     <SlLocationPin />{" "}
//                                     <div>
//                                       {data
//                                         ? data?.location
//                                         : fav?.content_id?.location}
//                                     </div>
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="sub-content">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">TimeStamp</span>
//                                 <div className="item-in-right loc">
//                                   <span>
//                                     <MdOutlineWatchLater />
//                                     {data
//                                       ? moment(data?.createdAt).format(
//                                         "h:mm A, DD MMM YYYY"
//                                       )
//                                       : moment(
//                                         fav?.content_id?.createdAt
//                                       ).format("h:mm A, DD MMM YYYY")}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="sub-content tags_wrp">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">Hashtags</span>
//                                 <div>
//                                   <div className="item-in-right hashtag-wrap">
//                                     {data
//                                       ? data &&
//                                       data?.tag_ids.map((tag) => {
//                                         return (
//                                           <span className="mr">
//                                             #{tag.name}
//                                           </span>
//                                         );
//                                       })
//                                       : fav &&
//                                       fav?.content_id?.tag_ids.map((tag) => {
//                                         return (
//                                           <span className="mr">
//                                             #{tag.name}
//                                           </span>
//                                         );
//                                       })}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="sub-content">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">Category</span>
//                                 <div className="">
//                                   <img
//                                     src={
//                                       data
//                                         ? data?.category_id?.icon
//                                         : fav?.content_id?.category_id?.icon
//                                     }
//                                     className="exclusive-img"
//                                     alt=""
//                                   />
//                                   <span className="txt_catg_licn">
//                                     {capitalizeFirstLetter(
//                                       data
//                                         ? data?.category_id?.name
//                                         : fav?.content_id?.category_id?.name
//                                     )}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="sub-content">
//                               <div className="item d-flex justify-content-between align-items-center">
//                                 <span className="fnt-bold">License</span>
//                                 <div className="">
//                                   <img
//                                     src={
//                                       data
//                                         ? data?.type === "exclusive"
//                                           ? exclusive
//                                           : shared
//                                         : fav?.content_id?.type === "exclusive"
//                                           ? exclusive
//                                           : shared
//                                     }
//                                     className="exclusive-img"
//                                     alt=""
//                                   />
//                                   <span className="txt_catg_licn">
//                                     {data
//                                       ? capitalizeFirstLetter(data?.type)
//                                       : capitalizeFirstLetter(
//                                         fav?.content_id?.type
//                                       )}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="foot cont-info-actions d-flex gap-5 justify-content-between align-items-center">
//                               {messages && messages.length === 0 ? (
//                                 <Button
//                                   variant={
//                                     data?.sales_prefix ? "" : "secondary"
//                                   }
//                                   onClick={() => {
//                                     console.log("offer started jkllkj;poiu")

//                                     if (
//                                       messages[0]?.message_type !==
//                                       "offer_started"
//                                     ) {
//                                       console.log("offer started jkllkj;poiu")
//                                       // setTabSelect("external");
//                                       // Start_Offer();
//                                       // setMessages(old=>[...old]);
//                                     }
//                                   }}
//                                   className={
//                                     data?.sales_prefix ? "greyBtn" : ""
//                                   }
//                                   disabled={data?.sales_prefix ? true : loading}
//                                 >
//                                   Offer
//                                 </Button>
//                               ) : messages?.length === 1 ? (
//                                 <Button
//                                 onClick={() => {
//                                   console.log("offer started jkllkj;poiu external")

//                                     setTabSelect("external");

//                                 }}
//                                   className="greyBtn">
//                                   Offer
//                                 </Button>
//                               ) : (
//                                 <Button
//                                   className="offeredPrice_btn bigBtn"
//                                   disabled={true}
//                                 >
//                                   £
//                                   {Number(
//                                     messages?.find(
//                                       (el) =>
//                                         el.message_type ===
//                                         "accept_mediaHouse_offer" ||
//                                         el.message_type ===
//                                         "decline_mediaHouse_offer"
//                                     )?.amount
//                                   )?.toLocaleString("en-US", {
//                                     maximumFractionDigits: 2,
//                                   })}
//                                 </Button>
//                               )}

//                               {(data
//                                 ? !data?.purchased_mediahouse.find(
//                                   (el) =>
//                                     el ==
//                                     JSON.parse(localStorage.getItem("user"))
//                                       ?._id
//                                 )
//                                 : !fav?.content_id?.purchased_mediahouse.find(
//                                   (el) =>
//                                     el ==
//                                     JSON.parse(localStorage.getItem("user"))
//                                       ?._id
//                                 )) && (
//                                   <Link to={`/auto-invoice/${param.id}`}>
//                                     {" "}
//                                     <Button variant="primary">
//                                       £
//                                       {data
//                                         ? data?.ask_price?.toLocaleString(
//                                           "en-US",
//                                           { maximumFractionDigits: 2 }
//                                         ) || 0
//                                         : fav?.content_id?.ask_price?.toLocaleString(
//                                           "en-US",
//                                           { maximumFractionDigits: 2 }
//                                         ) || 0}
//                                     </Button>
//                                   </Link>
//                                 )}
//                               {(data
//                                 ? data?.purchased_mediahouse.find(
//                                   (el) =>
//                                     el ===
//                                     JSON.parse(localStorage.getItem("user"))
//                                       ?._id
//                                 )
//                                 : fav?.content_id?.purchased_mediahouse.find(
//                                   (el) =>
//                                     el ===
//                                     JSON.parse(localStorage.getItem(user))
//                                       ?._id
//                                 )) && (
//                                   <Link className="w-100">
//                                     {" "}
//                                     <Button className="greyBtn">Paid</Button>
//                                   </Link>
//                                 )}
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </Col>

//                     <Col md={12} className="feed_dtl_chat_wrap">
//                       <div className="chat-tabs-wrap">
//                         <Tabs
//                           defaultActiveKey={tabSelect}
//                           activeKey={
//                             tabSelect ||
//                             JSON.parse(localStorage.getItem("tabName"))
//                           }
//                           id="chat-tabs"
//                           className="mb-3 tbs"
//                           onSelect={(tabName) => {
//                             localStorage.setItem(
//                               "tabName",
//                               JSON.stringify(tabName)
//                             );
//                             setTabSelect(tabName);
//                           }}
//                         >
//                           <Tab
//                             eventKey="internal"
//                             title="Internal Chat"
//                             defaultActiveKey="internal"
//                             className=" show"
//                           >
//                             <div className="tab-data active">
//                               <Row>
//                                 <Col md={9}>
//                                   <div
//                                     className="feed_dtl_msgs pp"
//                                     id="message-container-1"
//                                   >
//                                     <div className="externalText">
//                                       <h6 className="txt_light">
//                                         Welcome{" "}
//                                         <span className="txt_bld">
//                                           {fullName}
//                                         </span>
//                                         .
//                                       </h6>
//                                       <h6 className="txt_light">
//                                         Please select participants from the
//                                         list, and add them to your internal
//                                         chat.
//                                       </h6>
//                                       <h6 className="txt_light">
//                                         Once added, you can start chatting with
//                                         your team members. Use the text box
//                                         below to type or send voice notes. Good
//                                         luck
//                                       </h6>
//                                     </div>

//                                     {message?.map((curr) => (
//                                       <div
//                                         className="baat_cheet"
//                                         ref={chatBoxRef}
//                                       >
//                                         {curr?.type === "add" ? (
//                                           <p className="usrAddedTxt mb-4">
//                                             <span>
//                                               You added {curr?.addedMsg}
//                                             </span>
//                                           </p>
//                                         ) : (
//                                           <div className="crd" key={curr.id}>
//                                             <div className="img">
//                                               <img
//                                                 src={
//                                                   curr.user_info?.profile_image
//                                                 }
//                                                 alt="user"
//                                               />
//                                             </div>
//                                             <div className="postedcmnt_info">
//                                               <h5>
//                                                 {`${curr?.user_info?.first_name} ${curr?.user_info?.last_name}`}
//                                                 <span className="text-secondary time">
//                                                   {moment(
//                                                     curr?.createdAt
//                                                   ).format(`DD MMM YYYY`)}
//                                                   ,{" "}
//                                                   {moment(
//                                                     curr.createdAt
//                                                   ).format(`hh:mm A`)}
//                                                 </span>
//                                               </h5>
//                                               <Typography className="comment_text">
//                                                 {curr.type === "text" &&
//                                                   curr.message}
//                                               </Typography>

//                                               <div
//                                                 onClick={() => handleShow(curr)}
//                                                 className="exp"
//                                               >
//                                                 {curr.type === "image" && (
//                                                   <img
//                                                     src={curr.message}
//                                                     className="msgContent"
//                                                     alt="content"
//                                                   />
//                                                 )}
//                                               </div>

//                                               <div>
//                                                 {curr.type === "video" && (
//                                                   <video
//                                                     src={curr.message}
//                                                     className="msgContent"
//                                                     controls
//                                                     alt="video content"
//                                                     controlsList="nodownload"
//                                                   ></video>
//                                                 )}
//                                               </div>

//                                               <div>
//                                                 {curr.type === "audio" && (
//                                                   <audio
//                                                     src={curr.message}
//                                                     controls
//                                                     alt="audio content"
//                                                     controlsList="nodownload"
//                                                   ></audio>
//                                                 )}
//                                               </div>
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     ))}
//                                   </div>

//                                   <Form onSubmit={handleButtonClick}>
//                                     <div className="inpt typeMsg_inp mt-2">
//                                       <img
//                                         src={
//                                           profileData?.hasOwnProperty(
//                                             "admin_detail"
//                                           )
//                                             ? profileData?.admin_detail
//                                               ?.admin_profile
//                                             : profileData?.profile_image
//                                         }
//                                         alt=""
//                                       />
//                                       <InputGroup className="">
//                                         <Form.Control
//                                           placeholder="Type here..."
//                                           aria-describedby="basic-addon1"
//                                           value={msg1}
//                                           onChange={(e) => {
//                                             setMsg1(e.target.value);
//                                           }}
//                                         />
//                                       </InputGroup>
//                                       <div className="chatIn-options">
//                                         <div className="uplod-mda">
//                                           <input
//                                             type="file"
//                                             id="cht_add_img"
//                                             className="cht_file_inp"
//                                             onChange={handleChange}
//                                           />
//                                           <label
//                                             htmlFor="cht_add_img"
//                                             className="cht_fl_inp_lbl"
//                                           >
//                                             <MdAdd className="d_flex file_add_icn" />
//                                           </label>
//                                         </div>
//                                         <Button
//                                           ref={target}
//                                           onClick={() => setShow(!show)}
//                                         >
//                                           <BsMic className="chatMicIcn" />
//                                         </Button>
//                                         <span
//                                           className="chatIn-send"
//                                           onClick={handleButtonClick}
//                                         >
//                                           <BsArrowRight />
//                                         </span>
//                                       </div>
//                                       <div>
//                                         <Overlay
//                                           target={target.current}
//                                           show={show}
//                                           placement="top"
//                                           className=""
//                                         >
//                                           <Tooltip id="overlay-example">
//                                             <div className="recordingPopup">
//                                               <div className="d-flex justify-content-between align-items-center">
//                                                 <h5>Record Audio</h5>
//                                                 <div className="close-btn clickable" onClick={() => setShow(false)}>
//                                                   <svg
//                                                     width="13"
//                                                     height="13"
//                                                     viewBox="0 0 13 13"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                   >
//                                                     <path
//                                                       d="M1.34277 1L11.3165 12"
//                                                       stroke="black"
//                                                       stroke-width="2"
//                                                       stroke-linecap="round"
//                                                       stroke-linejoin="round"
//                                                     />
//                                                     <path
//                                                       d="M1.34277 12L11.3165 1"
//                                                       stroke="black"
//                                                       stroke-width="2"
//                                                       stroke-linecap="round"
//                                                       stroke-linejoin="round"
//                                                     />
//                                                   </svg>
//                                                 </div>
//                                               </div>
//                                               <div className="d-flex mt-3 justify-content-evenly">
//                                                 <Button
//                                                   className="rec_aud_btn"
//                                                   onClick={onStartRecording}
//                                                   disabled={isRecording}
//                                                 >
//                                                   {" "}
//                                                   <BsPlay
//                                                     fontSize={"20px"}
//                                                   />{" "}
//                                                   Start
//                                                 </Button>
//                                                 <Button
//                                                   className="rec_aud_btn"
//                                                   onClick={onStopRecording}
//                                                   disabled={!isRecording}
//                                                 >
//                                                   {" "}
//                                                   <BsPause
//                                                     fontSize={"20px"}
//                                                   />{" "}
//                                                   Stop
//                                                 </Button>
//                                               </div>
//                                               <div>
//                                                 <ReactMic
//                                                   record={isRecording}
//                                                   className="sound-wave w-100 my-2"
//                                                   onStop={onStopRecording}
//                                                 />
//                                               </div>
//                                               <div className="text-end">
//                                                 <button
//                                                   className="sendrecBtn"
//                                                   onClick={(e) => {
//                                                     handleButtonClick(e);
//                                                     setShow(!show);
//                                                   }}
//                                                 >
//                                                   Send
//                                                 </button>
//                                               </div>
//                                             </div>
//                                           </Tooltip>
//                                         </Overlay>
//                                       </div>
//                                     </div>
//                                   </Form>
//                                 </Col>

//                                 <Col md={3}>
//                                   <div className="tab_in_card">
//                                     <Link>
//                                       <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
//                                         <h4>Participants</h4>
//                                         {/* <div className="icon text-white ">
//                                           <AiOutlinePlus onClick={AddParticipents} />
//                                         </div> */}
//                                       </div>
//                                     </Link>

//                                     <div className="scrollHtPnts">
//                                       {userList?.map((curr) => {
//                                         return (
//                                           <div className="tab_in_card_items">
//                                             <div className="checkWrap">
//                                               <FormControlLabel
//                                                 className={`me-0 ${!selectedIds.includes(
//                                                   curr._id
//                                                 ) && "afterCheck"
//                                                   }`}
//                                                 checked={
//                                                   selectedIds.includes(
//                                                     curr._id
//                                                   ) ||
//                                                   message?.some(
//                                                     (item) =>
//                                                       `${curr?.first_name} ${curr?.last_name}` ==
//                                                       item?.addedMsg
//                                                   )
//                                                 }
//                                                 onChange={() =>
//                                                   handleCheckboxChange(curr._id)
//                                                 }
//                                                 control={
//                                                   <Checkbox defaultChecked />
//                                                 }
//                                                 disabled={message?.some(
//                                                   (item) =>
//                                                     `${curr?.first_name} ${curr?.last_name}` ==
//                                                     item?.addedMsg
//                                                 )}
//                                               />
//                                             </div>
//                                             <div
//                                               className="img"
//                                               onClick={() => {
//                                                 setSenderId(curr._id);
//                                                 setShow({
//                                                   content: false,
//                                                   task: false,
//                                                   presshop: false,
//                                                   internal: true,
//                                                 });
//                                               }}
//                                             >
//                                               <img src={usric} alt="user" />
//                                               <span>
//                                                 {" "}
//                                                 {curr.first_name +
//                                                   " " +
//                                                   curr.last_name}
//                                               </span>
//                                             </div>
//                                             {/* <div className="dots">
//                                                 <Link className="view_chat">View</Link>
//                                               </div> */}
//                                           </div>
//                                         );
//                                       })}
//                                     </div>

//                                     <button
//                                       className="addPrtBtn btn w-100"
//                                       onClick={AddParticipents}
//                                     >
//                                       Add
//                                     </button>
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </div>
//                           </Tab>

//                           <Tab eventKey="external" title="Hopper Chat">
//                             <a href="lorem"></a>
//                             <div className="tab-data active">
//                               <Row>
//                                 <Col md={12}>
//                                   <div className="feed_dtl_msgs extrnl dd">
//                                     <div className="externalText">
//                                       <h6 className="txt_light">
//                                         Welcome{" "}
//                                         <span className="txt_bld">
//                                           {fullName}
//                                         </span>
//                                         .
//                                       </h6>

//                                       <div className="crd chatting_itm sngl_cht d-flex align-items-start">
//                                         <div className="img">
//                                           <img
//                                             src={presshopchatic}
//                                             alt="User"
//                                             className="usr_img"
//                                           />
//                                         </div>
//                                         <div className="cht_txt postedcmnt_info">
//                                           <h5>
//                                             {"Presshop"}
//                                             <span className="text-secondary time">
//                                               {moment().format(
//                                                 // curr?.createdAt
//                                                 "h:mm A, D MMM YYYY"
//                                               )}
//                                             </span>
//                                           </h5>
//                                           <Typography className="comment_text">
//                                             Please click the 'Offer' button to
//                                             make an offer, or simply click 'Buy'
//                                             to purchase the content
//                                           </Typography>
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div
//                                       className="d-flex flex-column-reverse"
//                                       ref={chatBoxRef}
//                                     >
//                                       {messages
//                                         ?.filter((el) => el?.amount != "0")
//                                         ?.map((curr) => {
//                                           return curr?.message_type ===
//                                             "offer_started" ? (
//                                             <div className="crd chatting_itm sngl_cht d-flex align-items-start">
//                                               <div className="img">
//                                                 <img
//                                                   src={presshopchatic}
//                                                   alt="User"
//                                                   className="usr_img"
//                                                 />
//                                               </div>
//                                               <div className="cht_txt postedcmnt_info">
//                                                 <h5>
//                                                   {"Presshop"}
//                                                   <span className="text-secondary time">
//                                                     {moment(
//                                                       curr?.createdAt
//                                                     ).format(
//                                                       "h:mm A, D MMM YYYY"
//                                                     )}
//                                                   </span>
//                                                 </h5>
//                                                 <Typography className="comment_text">
//                                                   Enter your offer below
//                                                 </Typography>
//                                                 <form
//                                                   onSubmit={(e) => {
//                                                     e.preventDefault();
//                                                     NewExternalChatFun(
//                                                       "accept",
//                                                       offer_value,
//                                                       data?.original_ask_price,
//                                                       roomDetails
//                                                     );
//                                                   }}
//                                                   className="usr_upld_opts cont_opts"
//                                                 >
//                                                   <input
//                                                     className="cht_prc_inp text-center"
//                                                     disabled={
//                                                       messages.length !== 1 &&
//                                                       true
//                                                     }
//                                                     type="number"
//                                                     value={
//                                                       messages?.length <= 1
//                                                         ? offer_value
//                                                         : null
//                                                     }
//                                                     placeholder={
//                                                       messages?.length > 1
//                                                         ? `£${messages?.find(
//                                                           (el) =>
//                                                             el?.message_type ==
//                                                             "accept_mediaHouse_offer" ||
//                                                             el?.message_type ==
//                                                             "decline_mediaHouse_offer"
//                                                         )?.amount
//                                                         }`
//                                                         : "Enter price here ..."
//                                                     }
//                                                     onChange={(e) => {
//                                                       setOffer_value(
//                                                         e.target.value
//                                                       );
//                                                     }}
//                                                   />

//                                                   {
//                                                     <button
//                                                       className="theme_btn"
//                                                       disabled={
//                                                         messages.length !== 1 &&
//                                                         true
//                                                       }
//                                                       type="submit"
//                                                     >
//                                                       Submit
//                                                     </button>
//                                                   }
//                                                 </form>
//                                               </div>
//                                             </div>
//                                           ) : curr?.message_type ===
//                                             "accept_mediaHouse_offer" ? (
//                                             <>
//                                               <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
//                                                 <div className="img">
//                                                   <img
//                                                     src={
//                                                       data
//                                                         ? data?.hopper_id
//                                                           ?.avatar_id?.avatar
//                                                           ? process.env
//                                                             .REACT_APP_AVATAR_IMAGE +
//                                                           data?.hopper_id
//                                                             ?.avatar_id
//                                                             ?.avatar
//                                                           : null
//                                                         : fav?.content_id
//                                                           ?.hopper_id
//                                                           ?.avatar_id?.avatar
//                                                           ? process.env
//                                                             .REACT_APP_AVATAR_IMAGE +
//                                                           fav?.content_id
//                                                             ?.hopper_id
//                                                             ?.avatar_id?.avatar
//                                                           : null
//                                                     }
//                                                     alt="User"
//                                                     className="usr_img"
//                                                   />
//                                                 </div>
//                                                 <div className="cht_txt postedcmnt_info">
//                                                   <div className="d-flex align-items-center">
//                                                     <h5 className="usr_name mb-0">
//                                                       {
//                                                         data?.hopper_id
//                                                           ?.user_name
//                                                       }
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                   </div>
//                                                   <p className="mb-0 msg auto_press_msg">
//                                                     Has accepted your offer of{" "}
//                                                     <a className="link">
//                                                       £{curr?.amount}
//                                                     </a>{" "}
//                                                     to sell the content
//                                                   </p>
//                                                   <div className="usr_upld_opts">
//                                                     <button
//                                                       className={
//                                                         curr.paid_status ===
//                                                           true
//                                                           ? "sub_hdng_inn"
//                                                           : "theme_btn"
//                                                       }
//                                                       disabled={
//                                                         curr.paid_status ===
//                                                         true
//                                                       }
//                                                       onClick={() => {
//                                                         Payment(
//                                                           +curr?.amount,
//                                                           data?._id,
//                                                           false,
//                                                           0,
//                                                           roomDetails
//                                                         );
//                                                       }}
//                                                     >
//                                                       Buy
//                                                     </button>
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                               <div className="crd chatting_itm sngl_cht ">
//                                                 <div className="chat-box d-flex align-items-start msg-worries">
//                                                   <div className="img">
//                                                     <img
//                                                       src={userImage}
//                                                       alt="User"
//                                                       className="usr_img"
//                                                     />
//                                                   </div>
//                                                   <div className="cht_txt postedcmnt_info">
//                                                     <h5 className="mb-0">
//                                                       {username}
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                     <Typography className="comment_text">
//                                                       Has offered{" "}
//                                                       <a className="link">
//                                                         £{curr?.amount}
//                                                       </a>{" "}
//                                                       to buy the content
//                                                     </Typography>
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </>
//                                           ) : curr?.message_type ===
//                                             "decline_mediaHouse_offer" ? (
//                                             <>
//                                               <div className="crd chatting_itm sngl_cht user-data">
//                                                 <div className="chat-box d-flex align-items-start">
//                                                   <div className="img">
//                                                     <img
//                                                       src={presshopchatic}
//                                                       alt="User"
//                                                       className="usr_img"
//                                                     />
//                                                   </div>
//                                                   <div className="cht_txt postedcmnt_info">
//                                                     <h5>
//                                                       Presshop
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                     <Typography className="comment_text">
//                                                       Would you like to
//                                                       reconsider buying the
//                                                       content at{" "}
//                                                       <a className="link">
//                                                         £
//                                                         {
//                                                           data?.original_ask_price
//                                                         }
//                                                       </a>{" "}
//                                                     </Typography>
//                                                   </div>
//                                                 </div>
//                                                 <div className="usr_upld_opts user-btn d-flex align-items-center">
//                                                   <button
//                                                     className="theme_btn"
//                                                     onClick={() => {
//                                                       Payment(
//                                                         +data?.original_ask_price,
//                                                         data?._id,
//                                                         true,
//                                                         data?.original_ask_price,
//                                                         roomDetails
//                                                       );
//                                                     }}
//                                                   >
//                                                     Buy
//                                                   </button>
//                                                   <button
//                                                     className="theme_btn black-btn"
//                                                     onClick={() =>
//                                                       NewExternalChatFun(
//                                                         "no",
//                                                         curr?.amount,
//                                                         0,
//                                                         roomDetails
//                                                       )
//                                                     }
//                                                   >
//                                                     No
//                                                   </button>
//                                                 </div>
//                                               </div>

//                                               <div className="crd chatting_itm sngl_cht">
//                                                 <div className=" d-flex align-items-start msg-worries">
//                                                   <div className="img">
//                                                     <img
//                                                       src={
//                                                         data
//                                                           ? data?.hopper_id
//                                                             ?.avatar_id
//                                                             ?.avatar
//                                                             ? process.env
//                                                               .REACT_APP_AVATAR_IMAGE +
//                                                             data?.hopper_id
//                                                               ?.avatar_id
//                                                               ?.avatar
//                                                             : null
//                                                           : fav?.content_id
//                                                             ?.hopper_id
//                                                             ?.avatar_id
//                                                             ?.avatar
//                                                             ? process.env
//                                                               .REACT_APP_AVATAR_IMAGE +
//                                                             fav?.content_id
//                                                               ?.hopper_id
//                                                               ?.avatar_id
//                                                               ?.avatar
//                                                             : null
//                                                       }
//                                                       alt="User"
//                                                       className="usr_img"
//                                                     />
//                                                   </div>
//                                                   <div className="cht_txt postedcmnt_info">
//                                                     <div className="d-flex align-items-center msg-worries">
//                                                       <h5 className="usr_name">
//                                                         {
//                                                           data?.hopper_id
//                                                             ?.user_name
//                                                         }
//                                                         <span className="text-secondary time">
//                                                           {moment(
//                                                             curr?.createdAt
//                                                           ).format(
//                                                             "h:mm A, D MMM YYYY"
//                                                           )}
//                                                         </span>
//                                                       </h5>
//                                                     </div>
//                                                     <p className="mb-0 msg">
//                                                       Has rejected your offer of{" "}
//                                                       <a className="link">
//                                                         £{curr?.amount}
//                                                       </a>{" "}
//                                                       to sell the content
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               <div className="crd chatting_itm sngl_cht">
//                                                 <div className="d-flex align-items-center msg-worries">
//                                                   <div className="img">
//                                                     <img
//                                                       src={userImage}
//                                                       alt="User"
//                                                       className="usr_img"
//                                                     />
//                                                   </div>
//                                                   <div className="cht_txt postedcmnt_info">
//                                                     <h5>
//                                                       {username}
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                     <Typography className="comment_text">
//                                                       Has offered{" "}
//                                                       <a className="link">
//                                                         £{curr?.amount}
//                                                       </a>{" "}
//                                                       to buy the content
//                                                     </Typography>
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </>
//                                           ) : curr?.message_type ===
//                                             "reject_mediaHouse_offer" ? (
//                                             <>
//                                               <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
//                                                 <div className="img">
//                                                   <img
//                                                     src={presshopchatic}
//                                                     alt="User"
//                                                     className="usr_img"
//                                                   />
//                                                 </div>
//                                                 <div className="cht_txt postedcmnt_info">
//                                                   <div className="d-flex align-items-center msg-worries">
//                                                     <h5 className="usr_name mb-0">
//                                                       Presshop
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                   </div>
//                                                   <p className="mb-0 msg auto_press_msg">
//                                                     No worries! Check out our
//                                                     awesome selection of
//                                                     discounted content available
//                                                     for purchase
//                                                   </p>
//                                                   <div
//                                                     className="usr_upld_opts"
//                                                     onClick={() =>
//                                                       navigate(
//                                                         "/Uploaded-Content/Special"
//                                                       )
//                                                     }
//                                                   >
//                                                     <button className="theme_btn">
//                                                       Show me the Offers
//                                                     </button>
//                                                   </div>
//                                                   <p className="buy_btn_txt mb-0">
//                                                     Please refer to our{" "}
//                                                     <a className="link">
//                                                       terms and conditions
//                                                     </a>
//                                                     . If you have any questions,
//                                                     please{" "}
//                                                     <a className="link">
//                                                       contact
//                                                     </a>{" "}
//                                                     our helpful teams who are
//                                                     available 24x7 to assist
//                                                     you. Thank you.
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                             </>
//                                           ) : curr?.message_type ===
//                                             "PaymentIntent" ? (
//                                             <>
//                                               <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
//                                                 <div className="img">
//                                                   <img
//                                                     src={presshopchatic}
//                                                     alt="User"
//                                                     className="usr_img"
//                                                   />
//                                                 </div>
//                                                 <div className="cht_txt postedcmnt_info rating-update">
//                                                   <div className="d-flex align-items-center">
//                                                     <h5 className="usr_name mb-0">
//                                                       Presshop
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                   </div>
//                                                   <p className="mb-0 msg auto_press_msg">
//                                                     Please rate your experience
//                                                     with Presshop
//                                                   </p>
//                                                   <div className="usr_reviews">
//                                                     <Rating
//                                                       onClick={handleRating}
//                                                       value={rating}
//                                                       initialValue={
//                                                         +messages?.find(
//                                                           (el) =>
//                                                             el.message_type ==
//                                                             "rating_by_mediahouse"
//                                                         )?.rating || 0
//                                                       }
//                                                       disabled={
//                                                         messages?.find(
//                                                           (el) =>
//                                                             el.message_type ==
//                                                             "rating_by_mediahouse"
//                                                         )?.rating
//                                                       }
//                                                     />
//                                                     <p className="mb-0 msg auto_press_msg">
//                                                       Please select the key
//                                                       features you liked about
//                                                       our platform
//                                                     </p>
//                                                     <ul>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Experience"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Experience"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Experience"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Experience
//                                                       </li>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Easy to use"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Easy to use"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Easy to use"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Easy to use
//                                                       </li>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Connectivity with Hoppers"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Connectivity with Hoppers"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Connectivity with Hoppers"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Connectivity with
//                                                         Hoppers
//                                                       </li>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Pricing"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Pricing"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Pricing"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Pricing
//                                                       </li>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Secure payment"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Secure payment"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Secure payment"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Secure payment
//                                                       </li>
//                                                       <li
//                                                         onClick={() =>
//                                                           handleFeatures(
//                                                             "Support"
//                                                           )
//                                                         }
//                                                         className={
//                                                           messages
//                                                             ?.find(
//                                                               (el) =>
//                                                                 el?.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )
//                                                             ?.features?.includes(
//                                                               "Support"
//                                                             ) ||
//                                                             features.includes(
//                                                               "Support"
//                                                             )
//                                                             ? "selected clickable"
//                                                             : "clickable"
//                                                         }
//                                                       >
//                                                         Support
//                                                       </li>
//                                                     </ul>
//                                                     <div className="position-relative">
//                                                       <div className="right_text_svg">
//                                                         <svg
//                                                           width="22"
//                                                           height="21"
//                                                           viewBox="0 0 22 21"
//                                                           fill="none"
//                                                           xmlns="http://www.w3.org/2000/svg"
//                                                         >
//                                                           <g clip-path="url(#clip0_5392_68582)">
//                                                             <path
//                                                               d="M13.5472 5.87891H3.86719V6.71891H13.5472V5.87891Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                             <path
//                                                               d="M13.5472 8.40039H3.86719V9.24039H13.5472V8.40039Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                             <path
//                                                               d="M11.3472 10.9199H3.86719V11.7599H11.3472V10.9199Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                             <path
//                                                               d="M9.14719 13.4395H3.86719V14.2795H9.14719V13.4395Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                             <path
//                                                               d="M9.14719 15.9609H3.86719V16.8009H9.14719V15.9609Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                             <path
//                                                               d="M17.0677 7.80604V3.60604L13.7298 0.419922H0.347656V20.5799H17.0677V13.1938L21.6498 8.81992L18.8277 6.12604L17.0677 7.80604ZM16.6277 9.4138L18.2055 10.9199L12.9255 15.9599H11.3477V14.4538L16.6277 9.4138ZM13.9877 1.8538L15.5655 3.35992H13.9877V1.8538ZM16.1877 19.7399H1.22766V1.25992H13.1077V4.19992H16.1877V8.64604L10.4677 14.106V16.7999H13.2898L16.1877 14.0338V19.7399ZM18.8277 10.326L17.2498 8.81992L18.8277 7.3138L20.4055 8.81992L18.8277 10.326Z"
//                                                               fill="#9DA3A3"
//                                                             />
//                                                           </g>
//                                                           <defs>
//                                                             <clipPath id="clip0_5392_68582">
//                                                               <rect
//                                                                 width="22"
//                                                                 height="21"
//                                                                 fill="white"
//                                                               />
//                                                             </clipPath>
//                                                           </defs>
//                                                         </svg>
//                                                       </div>
//                                                       <Form.Group
//                                                         className="mb-3"
//                                                         controlId="exampleForm.ControlTextarea1"
//                                                       >
//                                                         <Form.Control
//                                                           placeholder="We hope you're enjoying your experience with Presshop. Please share your feedback with us. Your insights will help us enhance both your experience, and the quality of our service. Thank you"
//                                                           as="textarea"
//                                                           rows={3}
//                                                           onChange={(e) =>
//                                                             setReview(
//                                                               e.target.value
//                                                             )
//                                                           }
//                                                           value={
//                                                             messages?.find(
//                                                               (el) =>
//                                                                 el.message_type ==
//                                                                 "rating_by_mediahouse"
//                                                             )?.review || review
//                                                           }
//                                                         ></Form.Control>
//                                                       </Form.Group>
//                                                     </div>

//                                                     <button
//                                                       className="theme_btn"
//                                                       onClick={() =>
//                                                         RatingNReview(
//                                                           data?._id,
//                                                           true
//                                                         )
//                                                       }
//                                                       disabled={
//                                                         messages?.filter(
//                                                           (el) =>
//                                                             el.message_type ==
//                                                             "rating_by_mediahouse"
//                                                         )?.length != 0
//                                                       }
//                                                     >
//                                                       Submit
//                                                     </button>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
//                                                 <div className="img">
//                                                   <img
//                                                     src={presshopchatic}
//                                                     alt="User"
//                                                     className="usr_img"
//                                                   />
//                                                 </div>
//                                                 <div className="cht_txt postedcmnt_info">
//                                                   <div className="d-flex align-items-center">
//                                                     <h5 className="usr_name mb-0">
//                                                       Presshop
//                                                       <span className="text-secondary time">
//                                                         {moment(
//                                                           curr?.createdAt
//                                                         ).format(
//                                                           "h:mm A, D MMM YYYY"
//                                                         )}
//                                                       </span>
//                                                     </h5>
//                                                   </div>
//                                                   <p className="mb-0 msg auto_press_msg">
//                                                     Congrats, you’ve
//                                                     successfully purchased{" "}
//                                                     {data?.content?.length}{" "}
//                                                     content for{" "}
//                                                     <a className="link">
//                                                       £
//                                                       {+curr?.amount +
//                                                         +curr?.amount * 0.2}
//                                                     </a>
//                                                     . Please download the
//                                                     water-mark free, and high
//                                                     definition content, by
//                                                     clicking below
//                                                   </p>
//                                                   <div className="usr_upld_opts">
//                                                     <button
//                                                       className="theme_btn"
//                                                       onClick={() =>
//                                                         DownloadContent(
//                                                           data?._id
//                                                         )
//                                                       }
//                                                     >
//                                                       Download
//                                                     </button>
//                                                   </div>
//                                                   <p className="buy_btn_txt mb-0">
//                                                     Please refer to our{" "}
//                                                     <a className="link">
//                                                       licensing terms of usage
//                                                     </a>
//                                                     , and{" "}
//                                                     <a className="link">
//                                                       terms and conditions
//                                                     </a>
//                                                     . If you have any questions,
//                                                     please{" "}
//                                                     <a className="link">chat</a>{" "}
//                                                     or{" "}
//                                                     <a className="link">
//                                                       contact
//                                                     </a>{" "}
//                                                     our helpful teams who are
//                                                     available 24x7 to assist
//                                                     you. Thank you.
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                             </>
//                                           ) : curr?.message_type ==
//                                             "rating_by_mediahouse" ? (
//                                             <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start heart-icon">
//                                               <div className="img">
//                                                 <img
//                                                   src={presshopchatic}
//                                                   alt="User"
//                                                   className="usr_img"
//                                                 />
//                                               </div>
//                                               <div className="cht_txt postedcmnt_info">
//                                                 <div className="d-flex align-items-center">
//                                                   <h5 className="usr_name mb-0">
//                                                     Presshop
//                                                     <span className="text-secondary time">
//                                                       {moment(
//                                                         curr?.createdAt
//                                                       ).format(
//                                                         "h:mm A, D MMM YYYY"
//                                                       )}
//                                                     </span>
//                                                   </h5>
//                                                 </div>
//                                                 <p className="mb-0 msg auto_press_msg">
//                                                   Thank you for your valuable
//                                                   feedback. Your views matter a
//                                                   lot to us. Thank you very much
//                                                   for your business{" "}
//                                                   <img src={heart} />
//                                                 </p>
//                                               </div>
//                                             </div>
//                                           ) : (
//                                             ""
//                                           );
//                                         })}
//                                     </div>
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </div>
//                           </Tab>

//                           <Tab eventKey="presshop" title="Presshop Chat">
//                             <div className="tab-data active">
//                               <Row>
//                                 <Col md={9}>
//                                   <div className="feed_dtl_msgs presshopChatDetail dp">
//                                     <div className="externalText">
//                                       <h6 className="txt_light">
//                                         Welcome{" "}
//                                         <span className="txt_bld">
//                                           {fullName}
//                                         </span>
//                                         .
//                                       </h6>
//                                       <h6 className="txt_light">
//                                         Please select the Presshop team member
//                                         you wish to speak to from the
//                                         participants box on the right.{" "}
//                                       </h6>
//                                       <h6 className="txt_light">
//                                         Once selected, please use the text box
//                                         below to start chatting.{" "}
//                                       </h6>
//                                     </div>
//                                     {showChat.presshop ? (
//                                       <ChatCard
//                                         senderId={senderId && senderId}
//                                       />
//                                     ) : (
//                                       <ChatCard />
//                                     )}
//                                   </div>
//                                 </Col>
//                                 <Col md={3}>
//                                   <div className="tab_in_card">
//                                     <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
//                                       <h4>Participants</h4>
//                                     </div>

//                                     <div className="scrollHtPnts presshopChat">
//                                       {adminList &&
//                                         adminList
//                                           .filter((obj1) =>
//                                             admins.some(
//                                               (obj2) =>
//                                                 obj1._id == obj2.userId?.id
//                                             )
//                                           )
//                                           .map((curr) => {
//                                             return (
//                                               <div
//                                                 className="tab_in_card_items"
//                                                 onClick={() => {
//                                                   localStorage.setItem(
//                                                     "receiverId",
//                                                     JSON.stringify(curr._id)
//                                                   ) || "";
//                                                   localStorage.removeItem(
//                                                     "contentId"
//                                                   );
//                                                   if (
//                                                     admins?.some(
//                                                       (el) =>
//                                                         el?.userId?.id ===
//                                                         curr._id
//                                                     )
//                                                   ) {
//                                                     setSenderId(curr._id);
//                                                     setShowChat({
//                                                       content: false,
//                                                       task: false,
//                                                       presshop: true,
//                                                     });
//                                                   }
//                                                 }}
//                                               >
//                                                 <div className="checkWrap">
//                                                   <FormControlLabel
//                                                     className="afterCheck"
//                                                     // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
//                                                     control={<Checkbox />}
//                                                     checked={curr.checked}
//                                                     onChange={() =>
//                                                       handleChecked(curr)
//                                                     }
//                                                   />
//                                                 </div>
//                                                 <div className="img">
//                                                   <img
//                                                     src={
//                                                       process.env
//                                                         .REACT_APP_ADMIN_IMAGE +
//                                                       curr?.profile_image
//                                                     }
//                                                     alt="user"
//                                                   />
//                                                   <span
//                                                     className={
//                                                       admins?.some(
//                                                         (el) =>
//                                                           el?.userId?.id ===
//                                                           curr._id
//                                                       )
//                                                         ? "activeUsr"
//                                                         : "InactiveUsr"
//                                                     }
//                                                   >
//                                                     {curr?.name}
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                             );
//                                           })}
//                                       {admins.length === 0 &&
//                                         adminList
//                                           .filter(
//                                             (obj1) => obj1.role === "admin"
//                                           )
//                                           .map((curr) => {
//                                             return (
//                                               <div
//                                                 className="tab_in_card_items"
//                                                 onClick={() => {
//                                                   localStorage.setItem(
//                                                     "receiverId",
//                                                     JSON.stringify(curr._id)
//                                                   ) || "";
//                                                   localStorage.removeItem(
//                                                     "contentId"
//                                                   );
//                                                   setSenderId(curr._id);
//                                                   setShowChat({
//                                                     content: false,
//                                                     task: false,
//                                                     presshop: true,
//                                                   });
//                                                 }}
//                                               >
//                                                 <div className="checkWrap">
//                                                   <FormControlLabel
//                                                     className="afterCheck"
//                                                     // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
//                                                     control={<Checkbox />}
//                                                     checked={curr.checked}
//                                                     onChange={() =>
//                                                       handleChecked(curr)
//                                                     }
//                                                   />
//                                                 </div>
//                                                 <div className="img">
//                                                   <img
//                                                     src={
//                                                       process.env
//                                                         .REACT_APP_ADMIN_IMAGE +
//                                                       curr?.profile_image
//                                                     }
//                                                     alt="user"
//                                                   />
//                                                   <span className={"activeUsr"}>
//                                                     {curr?.name}
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                             );
//                                           })}
//                                     </div>
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </div>
//                           </Tab>
//                         </Tabs>
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>

//                 <div className="feedsContainer">
//                   <div className="feedContent_header">
//                     <h1>Related content</h1>
//                     <div className="d-flex align-items-center">
//                       {/* <div className="fltrs_prnt me-3 ht_sort">
//                         <Button
//                           className="sort_btn"
//                           onClick={() => {
//                             setOpenRecentActivity(true);
//                           }}
//                         >
//                           Sort
//                           <BsChevronDown />
//                         </Button>
//                         {openRecentActivity && (
//                           <RecentActivityDF
//                             closeRecentActivity={handleCloseRecentActivity}
//                             recentActivityValues={handleRecentActivityValue}
//                             active={relatedContentState}
//                             setActive={setRelatedContentState}
//                             handleCloseRecentActivity={() =>
//                               setOpenRecentActivity(false)
//                             }
//                           />
//                         )}
//                       </div> */}
//                       <Link
//                         to={`/related-content/tags/${data?.hopper_id?._id}/${data?.category_id?._id}`}
//                         className="next_link"
//                       >
//                         View all
//                         <BsArrowRight className="text-pink" />
//                       </Link>
//                     </div>
//                   </div>
//                   <Row className="">
//                     {content?.slice(0, 4).map((curr, index) => {
//                       const Audio = curr?.content?.filter(
//                         (curr) => curr?.media_type === "audio"
//                       );
//                       const Video = curr?.content?.filter(
//                         (curr) => curr?.media_type === "video"
//                       );
//                       const Image = curr?.content?.filter(
//                         (curr) => curr?.media_type === "image"
//                       );
//                       const Pdf = curr?.content?.filter(
//                         (curr) => curr?.media_type === "pdf"
//                       );
//                       const Doc = curr?.content?.filter(
//                         (curr) => curr?.media_type === "doc"
//                       );

//                       const imageCount = Image.length;
//                       const videoCount = Video.length;
//                       const audioCount = Audio.length;
//                       const pdfCount = Pdf.length;
//                       const docCount = Doc.length;
//                       return (
//                         <Col md={3}>
//                           <ContentFeedCard
//                             lnkto={`/Feeddetail/content/${curr._id}`}
//                             viewTransaction={"View details"}
//                             viewDetail={`/Feeddetail/content/${curr._id}`}
//                             allContent={curr?.content}
//                             basketValue={curr?.basket_status}
//                             basket={()=>{console.log("myData");
//                               // handleBasket(index,curr?._id)
//                             const  allContent=[...content];
//                             console.log("allccccc",allContent)
//                            const updatedCont=allContent.map((ele,indx)=>{
//                               if(index==indx){
//                                 return {...ele,basket_status:curr.basket_status=="true"?"false":"true"}
//                               }
//                               return ele
//                             })

//                             setRelatedContent(updatedCont)

//                             const content_id=curr?._id
//                             const  allContents=[...moreContent];
//                             const updatedConts=allContents.map((ele,indx)=>{
//                               if(content_id==ele._id){
//                                 return {...ele,basket_status:curr.basket_status=="true"?"false":"true"}
//                               }
//                               return ele
//                             })
//                             setMoreContent(updatedConts)
//                               if(content_id==data._id){
//                                 console.log("rearrangeDatta",data)
//                             setData({ ...data,
//                               basket_status: data?.basket_status=="true" ? "false":"true" });
//                             }

//                             }}

//                             // postcount={curr?.content?.length}
//                             feedImg={
//                               curr?.content[0]?.media_type === "video"
//                                 ? curr?.content[0]?.watermark ||
//                                 process.env.REACT_APP_CONTENT_MEDIA +
//                                 curr?.content[0]?.thumbnail
//                                 : curr?.content[0]?.media_type === "audio"
//                                   ? audioic
//                                   : curr?.content[0]?.watermark ||
//                                   process.env.REACT_APP_CONTENT_MEDIA +
//                                   curr?.content[0]?.media
//                             }
//                             // feedType={contentVideo}
//                             feedTag={
//                               curr?.sales_prefix
//                                 ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
//                                 : curr?.content_view_type == "mostpopular"
//                                   ? "Most Popular"
//                                   : curr?.content_view_type == "mostviewed"
//                                     ? "Most viewed"
//                                     : null
//                             }
//                             user_avatar={
//                               process.env.REACT_APP_AVATAR_IMAGE +
//                               curr?.hopper_id?.avatar_id?.avatar
//                             }
//                             author_Name={curr.hopper_id?.user_name}
//                             fvticns={
//                               curr?.favourite_status === "true"
//                                 ? favouritedic
//                                 : favic
//                             }
//                             content_id={curr?._id}
//                             bool_fav={
//                               curr?.favourite_status === "true"
//                                 ? "false"
//                                 : "true"
//                             }
//                             favourite={() =>
//                               favContentHandler(index, "related")
//                             }
//                             type_img={
//                               curr?.type === "shared" ? shared : exclusive
//                             }
//                             type_tag={curr.type}
//                             feedHead={curr.heading}
//                             feedTime={moment(curr?.createdAt).format("hh:mm A, DD MMM YYYY")}
//                             feedLocation={curr.location}
//                             contentPrice={formatAmountInMillion(
//                               curr?.ask_price
//                             )}
//                             feedTypeImg1={imageCount > 0 ? cameraic : null}
//                             postcount={imageCount > 0 ? imageCount : null}
//                             feedTypeImg2={videoCount > 0 ? videoic : null}
//                             postcount2={videoCount > 0 ? videoCount : null}
//                             feedTypeImg3={audioCount > 0 ? interviewic : null}
//                             postcount3={audioCount > 0 ? audioCount : null}
//                             feedTypeImg4={pdfCount > 0 ? docsic : null}
//                             postcount4={pdfCount > 0 ? pdfCount : null}
//                             feedTypeImg5={docCount > 0 ? docsic : null}
//                             postcount5={docCount > 0 ? docCount : null}
//                           />
//                         </Col>
//                       );
//                     })}
//                   </Row>
//                 </div>

//                 <div className="feedsContainer mb-0">
//                   <div className="feedContent_header">
//                     <h1>More content from {hopper?.user_name}</h1>
//                     <div className="d-flex align-items-center">
//                       {/* <div className="fltrs_prnt me-3 ht_sort">
//                         <Button
//                           className="sort_btn"
//                           onClick={() => {
//                             setOpenMoreContent(true);
//                           }}
//                         >
//                           Sort
//                           <BsChevronDown />
//                         </Button>
//                         {openMoreContent && (
//                           <RecentActivityDF
//                             closeRecentActivity={handleCloseRecentActivity}
//                             recentActivityValues={handleRecentActivityValue}
//                             active={moreContentState}
//                             setActive={setMoreContentState}
//                             handleCloseRecentActivity={() =>
//                               setOpenMoreContent(false)
//                             }
//                           />
//                         )}
//                       </div> */}
//                       <Link
//                         to={`/more-content/${hopper?._id}`}
//                         className="next_link"
//                       >
//                         View all
//                         <BsArrowRight className="text-pink" />
//                       </Link>
//                     </div>
//                   </div>
//                   <Row className="">
//                     {moreContent?.slice(0, 4)?.map((curr, index) => {
//                       const Audio = curr?.content?.filter(
//                         (curr) => curr?.media_type === "audio"
//                       );
//                       const Video = curr?.content?.filter(
//                         (curr) => curr?.media_type === "video"
//                       );
//                       const Image = curr?.content?.filter(
//                         (curr) => curr?.media_type === "image"
//                       );
//                       const Pdf = curr?.content?.filter(
//                         (curr) => curr?.media_type === "pdf"
//                       );
//                       const Doc = curr?.content?.filter(
//                         (curr) => curr?.media_type === "doc"
//                       );

//                       const imageCount = Image.length;
//                       const videoCount = Video.length;
//                       const audioCount = Audio.length;
//                       const pdfCount = Pdf.length;
//                       const docCount = Doc.length;
//                       return (
//                         <Col md={3}>
//                           <ContentFeedCard
//                             lnkto={`/Feeddetail/content/${curr._id}`}
//                             viewTransaction={"View details"}
//                             viewDetail={`/Feeddetail/content/${curr._id}`}
//                             feedImg={
//                               curr?.content[0]?.media_type === "video"
//                                 ? process.env.REACT_APP_CONTENT_MEDIA +
//                                 curr?.content[0]?.thumbnail
//                                 : curr?.content[0]?.media_type === "audio"
//                                   ? audioic
//                                   : curr?.content[0]?.watermark ||
//                                   process.env.REACT_APP_CONTENT_MEDIA +
//                                   curr?.content[0]?.media
//                             }
//                             feedType={contentVideo}
//                             feedTag={
//                               curr?.sales_prefix
//                                 ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
//                                 : curr?.content_view_type == "mostpopular"
//                                   ? "Most Popular"
//                                   : curr?.content_view_type == "mostviewed"
//                                     ? "Most viewed"
//                                     : null
//                             }
//                             user_avatar={
//                               process.env.REACT_APP_AVATAR_IMAGE +
//                               curr?.hopper_id?.avatar_id?.avatar || authorimg
//                             }

//                             // basketValue={curr?.basket_status}
//                             // basket={()=>{console.log("myData");handleBasket(index,curr?._id)}}
//                             allContent={curr?.content}
//                             basketValue={curr?.basket_status}
//                             basket={()=>{console.log("myData");
//                               // handleBasket(index,curr?._id)
//                             const  allContent=[...moreContent];
//                             const updatedCont=allContent.map((ele,indx)=>{
//                               if(index==indx){
//                                 return {...ele,basket_status:curr.basket_status=="true"?"false":"true"}
//                               }
//                               return ele
//                             })
//                             setMoreContent(updatedCont)

//                               const content_id=curr?._id
//                               const  allContents=[...content];
//                               console.log("allccccc",allContents)
//                              const updatedConts=allContents.map((ele,indx)=>{
//                                 if(content_id==ele._id){
//                                   return {...ele,basket_status:curr.basket_status=="true"?"false":"true"}
//                                 }
//                                 return ele
//                               })
//                               setRelatedContent(updatedConts)
//                             }}
//                             author_Name={curr.hopper_id?.user_name}
//                             type_img={
//                               curr?.type === "shared" ? shared : exclusive
//                             }
//                             type_tag={curr?.type}
//                             feedHead={curr.heading}
//                             // feedTime={moment(curr?.createdAt).format("hh:mm A, DD MMM YYYY")}
//                             feedTime={moment(curr?.createdAt).format("hh:mm A, DD MMM YYYY")}

//                             feedLocation={curr.location}
//                             contentPrice={formatAmountInMillion(curr.ask_price)}
//                             content_id={curr?._id}
//                             fvticns={
//                               curr?.favourite_status == "true"
//                                 ? favouritedic
//                                 : favic
//                             }
//                             bool_fav={
//                               curr.favourite_status === "true"
//                                 ? "false"
//                                 : "true"
//                             }
//                             favourite={() => favContentHandler(index, "more")}
//                             feedTypeImg1={imageCount > 0 ? cameraic : null}
//                             postcount={imageCount > 0 ? imageCount : null}
//                             feedTypeImg2={videoCount > 0 ? videoic : null}
//                             postcount2={videoCount > 0 ? videoCount : null}
//                             feedTypeImg3={audioCount > 0 ? interviewic : null}
//                             postcount3={audioCount > 0 ? audioCount : null}
//                             feedTypeImg4={pdfCount > 0 ? docsic : null}
//                             postcount4={pdfCount > 0 ? pdfCount : null}
//                             feedTypeImg5={docCount > 0 ? docsic : null}
//                             postcount5={docCount > 0 ? docCount : null}
//                           />
//                         </Col>
//                       );
//                     })}
//                   </Row>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//           <div className="mt-0">
//             <TopSearchesTipsCard />
//           </div>
//         </Container>
//       </div>
//       <DbFooter />
//       {/* Show Image in Chat */}
//       <Modal
//         show={show1}
//         onHide={handleClose}
//         aria-labelledby="contained-modal-title-hcenter profile_mdl"
//         className="modal_wrapper"
//         dialogClassName="my-modal adm_reg_mdl mdl_dsn"
//       >
//         <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
//           <Modal.Title className="modal-title profile_modal_ttl">
//             <p className="mb-0">Image Preview</p>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="show-grid modal-body border-0">
//           <Container>
//             <div>
//               <img className="mdlPrevImg" src={bigData} />
//             </div>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer className="border-0 mb-4">
//           <Button
//             className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
//             variant="primary"
//             type="submit"
//           >
//             <div className="link_white" onClick={handleClose}>
//               Close
//             </div>
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Show Image in Chat */}
//       <Modal
//         show={preview?.modalOpen}
//         onHide={handleClosePreview}
//         aria-labelledby="contained-modal-title-hcenter profile_mdl"
//         className="modal_wrapper"
//         dialogClassName="my-modal adm_reg_mdl mdl_dsn"
//       >
//         <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
//           <Modal.Title className="modal-title profile_modal_ttl">
//             <p className="mb-0">Image Preview</p>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="show-grid modal-body border-0">
//           <Container>
//             <div>
//               {preview?.type === "image" ? (
//                 <img className="mdlPrevImg" src={preview?.path} />
//               ) : preview?.type === "video" ? (
//                 <video
//                   src={preview?.path}
//                   className="msgContent"
//                   controls
//                 ></video>
//               ) : (
//                 ""
//               )}
//             </div>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer className="border-0 mb-4">
//           <Button
//             className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
//             variant="primary"
//             type="submit"
//           >
//             <div className="link_white" onClick={() => handleButtonClick()}>
//               Send
//             </div>
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Feeddetail;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Overlay from "react-bootstrap/Overlay";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Tooltip from "react-bootstrap/Tooltip";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsMic,
  BsPause,
  BsPlay,
} from "react-icons/bs";
import { MdAdd, MdOutlineWatchLater } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { ReactMic } from "react-mic-recorder";
import { Rating } from "react-simple-star-rating";
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import audioic from "../assets/images/audimg.svg";
import NoProfile from "../assets/images/blank-profile-picture.png";
import cameraic from "../assets/images/camera.svg";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import presshopchatic from "../assets/images/chat_logo.png";
import contentVideo from "../assets/images/contentVideo.svg";
import docsic from "../assets/images/docsic.svg";
import usric from "../assets/images/menu-icons/user.svg";
import exclusive from "../assets/images/exclusive.png";
import favouritedic from "../assets/images/favouritestar.svg";
import interviewic from "../assets/images/interview.svg";
import pdfic from "../assets/images/pdfic.svg";
import authorimg from "../assets/images/profile.webp";
import shared from "../assets/images/share.png";
import favic from "../assets/images/star.svg";
import videoic from "../assets/images/video.svg";
import ChatCard from "../component/ChatCard";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import { UserDetails } from "../component/Utils";
import ContentFeedCard from "../component/card/ContentFeedCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "../component/Loader";
import { useDarkMode } from "../context/DarkModeContext";
import {
  blobImageUrl,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
import socketServer from "../socket.config";
import { SlMagnifierAdd } from "react-icons/sl";
import ViewContent from "../component/ViewContent";
import heart from "../assets/images/heart.svg";
import { toast } from "react-toastify";

const Feeddetail = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [offer_value, setOffer_value] = useState("");
  const [room_details, setRoom_Details] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [fav, setFav] = useState();
  const [hopper, setHopper] = useState();
  const [hopperid, setHopperid] = useState();
  const [userList, setUserList] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [review, setReview] = useState("");
  const usernew = UserDetails;
  const [content, setRelatedContent] = useState([]);
  const [moreContent, setMoreContent] = useState([]);
  const [chatContentIds, setChatContentIds] = useState({
    room_id: "",
    sender_id: "",
  });
  const [contentId, setContentId] = useState(null);
  const [showChat, setShowChat] = useState({
    content: false,
    task: false,
    presshop: false,
    internal: false,
  });
  const [room_idForContent, setRoom_idForContent] = useState("");
  const [roomDetails, setRoomDetails] = useState();
  const [show, setShow] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const target = useRef(null);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [bigData, setBigData] = useState("");
  const handleShow = (curr) => {
    setBigData(curr?.message), setShow1(true);
  };
  const [preview, setPreview] = useState({
    type: "",
    path: "",
    modalOpen: false,
  });

  const handleClosePreview = () =>
    setPreview((pre) => ({ ...pre, modalOpen: false }));

  const [admins, setAdmins] = useState([]);
  const [tabSelect, setTabSelect] = useState("internal");
  const [openContent, setOpenContent] = useState(false);
  const [showContent, setShowContent] = useState({});
  const [imageSize, setImageSize] = useState({ height: 0, width: 0 });
  const [features, setFeatures] = useState([]);
  const chatBoxRefOffer = useRef(null);

  const handleFeatures = (val) => {
    if (features.includes(val)) {
      const data = features.filter((el) => el != val);
      setFeatures(data);
    } else {
      setFeatures([...features, val]);
    }
  };

  const { profileData, setCartCount } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const username = profileData?.full_name;

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [param.id]);

  const CreateRoom = async (id, idnew) => {
    try {
      const obj = {
        receiver_id: id,
        room_type: "MediahousetoAdmin",
        type: "external_content",
        content_id: param?.type === "favourite" ? idnew : param.id,
      };
      if (!id) {
        return;
      }
      const resp = await Post(`mediaHouse/createRoom`, obj);
      if (resp && resp.data && resp.data.details) {
        setRoom_Details(resp.data.details);
        setRoomDetails(resp.data.details);
        setRoom_idForContent(resp.data.details.room_id);
        localStorage.setItem("roomId2", resp.data.details.room_id || "");
        // JoinRoom(resp.data.details.room_id);
        const resp1 = await Post(`mediaHouse/getAllchat`, {
          room_id: resp.data.details.room_id,
        });
        if (resp1 && resp1.data && resp1.data.response) {
          setMessages(resp1.data.response);
        }
      } else {
        console.error("Incomplete response data:", resp);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const Start_Offer = async () => {
    setLoading(true);
    try {
      const obj = {
        room_id: roomDetails.room_id,
        content_id: roomDetails.content_id,
        sender_type: "Mediahouse",
        sender_id: roomDetails.sender_id,
        message_type: "offer_started",
        receiver_id: roomDetails.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      socketServer.emit("initialoffer", obj);
      socketServer.on("initialoffer", (obj) => {
        console.log("object --->socket io", obj);
        const tempMsg = obj;
        setMessages([...messages]);
        getMessages();
      });
      setLoading(false);
    } catch (error) {
      console.log("socket error ----->", error);
      // Handle errors
      setLoading(false);
    }
  };

  const Content_Offer = (offer_type) => {
    try {
      let obj = {
        room_id: room_details.room_id,
        content_id: room_details.content_id,
        sender_type: "Mediahouse",
        sender_id: room_details.sender_id,
        message_type: offer_type,
        receiver_id: room_details.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      if (offer_type === "Mediahouse_initial_offer") {
        obj.initial_offer_price = offer_value;
      }
      if (offer_type === "Mediahouse_final_offer") {
        obj.finaloffer_price = offer_value;
      }

      socketServer.emit("initialoffer", obj);
      setOffer_value("");
      getMessages();
    } catch (error) {
      // Handle errors
    }
  };

  const NewExternalChatFun = async (
    type,
    offer_amount,
    initial_offer_price = 0,
    room
  ) => {
    const obj = {
      image_id: contentId,
      offer_amount: offer_amount,
      room_id: room.room_id,
      sender_id: room.sender_id,
      receiver_id: room.receiver_id,
      type: type,
      initial_offer_price,
    };
    try {
      await Post("mediahouse/newChatFlow", obj);
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("Messages", messages)

  const Payment = async (
    amount,
    image_id,
    reconsider = false,
    reconsider_amount = 0,
    room_id
  ) => {
    try {
      setLoading(true);
      const obj1 = {
        customer_id: UserDetails.stripe_customer_id,
        type: "content",
        amount,
        image_id,
        reconsider,
        reconsider_amount,
        room_id: room_id?.room_id,
        offer: true,
        is_charity: data?.is_charity,
        description: data?.heading,
      };
      const obj2 = {
        type: "content",
        product_id: image_id,
        amount_paid: amount,
        commission: 0,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);
      obj1.application_fee = resp1?.data?.data;
      // obj1.stripe_account_id = resp1?.data?.stripe_account_id;
      obj1.stripe_account_id = data?.is_charity
        ? data?.stripe_account_id
        : resp1?.data?.stripe_account_id;

      const resp2 = await Post("mediahouse/createPayment", obj1);
      window.open(resp2.data.url, "_blank");
      if (resp2) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  useEffect(() => {
    window.addEventListener("focus", () => {
      ContentByID();
    });
    return () =>
      window.removeEventListener("focus", () => {
        ContentByID();
      });
  }, []);

  const DownloadContent = async (id) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=content`,
      "_blank"
    );
  };

  const RatingForMediahouse = () => {
    try {
      let obj = {
        room_id: room_details.room_id,
        content_id: room_details.content_id,
        sender_type: "Mediahouse",
        sender_id: room_details.sender_id,
        message_type: "rating_mediaHouse",
        receiver_id: room_details.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      getMessages();
      socket.emit("initialoffer", obj);
    } catch (error) {
      // console.log(error, "<-----errors for Start_Offer");
    }
  };

  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  const RatingNReview = (image_id, paid_status) => {
    const obj = {
      room_id: room_details.room_id,
      sender_type: "Mediahouse",
      receiver_id: room_details.receiver_id,
      sender_id: room_details.sender_id,
      rating: rating,
      review: review,
      type: "content",
      image_id: image_id,
      features: features,
      message_type: "rating_by_mediahouse",
      paid_status,
    };
    socketServer.emit("rating", obj);
    socketServer.on("rating", (data) => {
      // console.log("Rating", data)
      getMessages();
    });
  };

  const hopperFinalOffer = messages?.find(
    (item) => item.message_type === "Mediahouse_final_offer"
  );

  const hopperFinalOfferPrice = hopperFinalOffer
    ? hopperFinalOffer.finaloffer_price
    : "";

  const MediahouseFinal = messages?.find(
    (item) => item.message_type === "Mediahouse_final_counter"
  );

  const MediahouseFinalCounter = MediahouseFinal ? true : false;

  const MediahouseInitial = messages?.find(
    (item) => item.message_type === "Mediahouse_initial_offer"
  );

  const MediahouseInitialOffer = MediahouseInitial ? true : false;

  const Paymentt = messages?.find(
    (item) => item.message_type === "PaymentIntent"
  );

  const PaymentIntent = Paymentt ? Paymentt.paid_status : "";

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, {
        id: param.id,
      });
      setContentId(param.id);
      setData(resp.data.content);
      setShowContent(resp?.data?.content?.content[0]);

      if (resp?.data?.content?.content[0]?.media_type == "image") {
        const img = new Image();
        img.src = resp?.data?.content?.content[0]?.watermark;
        img.onload = function () {
          setImageSize({ height: img.height, width: img.width });
        };
      }

      setChatContentIds((pre) => ({
        ...pre,
        room_id: resp.data.room_id?.room_id,
        sender_id: JSON.parse(localStorage.getItem("user"))?._id,
      }));
      localStorage.setItem("roomId", resp.data.room_id?.room_id);
      localStorage.setItem("internal", resp.data.content._id);
      if (resp.data.content?.hopper_id?._id && resp.data.content?._id) {
        CreateRoom(resp.data.content?.hopper_id?._id, resp.data.content?._id);
      }
      setHopper(resp.data.content?.hopper_id);
      setHopperid(resp.data.content?.hopper_id?._id);
      const resp1 = await Post(`mediaHouse/MoreContent`, {
        hopper_id: resp.data.content?.hopper_id?._id,
        content_id: param?.id,
      });
      console.log("resp1.data.content", resp1.data.content);
      setMoreContent(resp1.data.content);
      const resp2 = await Post(`mediaHouse/relatedContent`, {
        tag_id: [resp.data.content.tag_ids[0]?._id],
        hopper_id: resp.data.content?.hopper_id?._id,
        category_id: resp.data.content.category_id?._id,
        content_id: resp.data.content._id,
      });
      console.log("resp2?.data?.content", resp2?.data?.content);
      setRelatedContent(resp2?.data?.content);
      localStorage.setItem(
        "tag_id",
        resp.data.content.tag_ids[0]?._id,
        "hopper_id",
        resp.data.content?.hopper_id?._id
      );
      setHopperid(resp.data.content?.hopper_id?._id);
      localStorage.setItem("hopperid", resp.data.content?.hopper_id?._id);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const Favourite = async (val) => {
    try {
      let obj = {
        favourite_status: val,
        content_id: data ? data._id : fav?.content_id?._id,
      };

      setData({ ...data, favourite_status: val });
      await Patch(`mediaHouse/add/to/favourites`, obj);
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    if (param.type === "content") {
      ContentByID();
    } else if (param.type === "favourite") {
      FavouriteByID();
    }
    GetUserList();
  }, [param?.id]);

  const Audio = data
    ? data.content.filter((item) => item.media_type === "audio")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "audio");
  const Video = data
    ? data.content.filter((item) => item.media_type === "video")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "video");
  const images = data
    ? data.content.filter((item) => item.media_type === "image")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "image");
  const Pdf = data
    ? data.content.filter((item) => item.media_type === "pdf")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "pdf");
  const Doc = data
    ? data.content.filter((item) => item.media_type === "doc")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "doc");

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const GetUserList = async () => {
    const resp = await Post(`mediaHouse/getMediahouseUser`);
    console.log("all user type --->12345");
    if (resp) {
      console.log("all user type --->45645656");
      setUserList(resp.data.response);
    }
    const resp1 = await Get(`mediaHouse/adminlist`);
    const newData = resp1?.data?.data?.map((el) => {
      return {
        ...el,
        checked: false,
      };
    });
    setAdminList(newData);
  };

  const handleChecked = (el) => {
    setAdminList((prev) => {
      const changedData = prev.map((item) => ({
        ...item,
        checked: item == el ? !item.checked : false,
      }));
      return changedData;
    });
  };

  // internal chat start
  const [mediaFile, setMediaFile] = useState({ path: "", type: "" });
  const [message, setMessage] = useState([]);
  const [msg1, setMsg1] = useState("");

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    // setIsRecording(false);
    try {
      if (!recordedBlob?.blob) return;
      const formData = new FormData();
      formData.append("path", "profileImg");
      formData.append("media", recordedBlob?.blob);
      const filePath = await Post("mediaHouse/uploadUserMedia", formData);
      if (filePath) {
        setMediaFile((prev) => ({
          ...prev,
          path: filePath?.data?.path,
          type: "audio",
        }));
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  useEffect(() => {
    ChatList();
  }, [chatContentIds, socketServer]);

  useEffect(() => {
    // Internal Chat and External Chat-
    if (tabSelect == "internal") {
      const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
      socketServer.emit("room join", { room_id: chatContentIds?.room_id });
      socketServer.on("internal group chat", (data) => {
        const newMessage = data;
        if (!newMessage?.createdAt) {
          setMessage((prevMessages) => [...prevMessages, newMessage]);
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        if (newMessage) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
      return () => {
        socketServer.emit("room leave", { room_id: chatContentIds?.room_id });
        socketServer.off("internal group chat");
      };
    } else if (tabSelect == "external") {
      socketServer.emit("room join", { room_id: room_idForContent });
      socketServer?.on("getAdmins", (data) => {
        setAdmins(data);
      });
      socketServer.on("initialoffer", (data) => {
        const newMessage = data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      socketServer.on("chat message", (data) => {
        // console.log("chat message", data)
        getMessages();
      });
      socketServer.on("buy", (data) => {
        // console.log("Buy", data)
        getMessages();
      });
      return () => {
        socketServer.emit("room leave", { room_id: room_idForContent });
        socketServer.off("initialoffer");
      };
    }
  }, [tabSelect, socketServer]);

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const AddParticipents = async () => {
    try {
      let obj = {
        type: "add",
        users: selectedIds,
        content_id: param.id,
        room_id: chatContentIds ? chatContentIds?.room_id : "",
      };
      // console.log("Obj ----->", obj)
      const resp = await Post("mediaHouse/internalGroupChatMH", obj);
      if (resp) {
        setSelectedIds([]);
        GetUserList();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: resp?.data?.data?.data?.room_id,
        }));
        socketServer.emit("room join", {
          room_id: resp?.data?.data?.data?.room_id,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, `<<<<<socketServer error`);
      // Handle errors
    }
  };
  const RemoveChatUser = async (ids) => {
    console.log("all chat user--->", ids);
    try {
      let obj = {
        type: "remove",
        users: [ids],
        content_id: param.id,
        room_id: chatContentIds ? chatContentIds?.room_id : "",
      };
      console.log("Obj ----->", obj);
      const resp = await Post("mediaHouse/deleteinternalGroupChatMH", obj);
      if (resp) {
        console.log("all content viewcheck 1235");

        setSelectedIds([]);
        GetUserList();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: localStorage.getItem("roomId"),
        }));
        ChatList();
        getDetailContent();
        // toast.success('Group chat initiated');
        socketInternal.emit("leave room", {
          room_id: JSON.parse(localStorage.getItem("roomId")),
        });
      }
    } catch (error) {
      console.log("all error --->", error);
    }
  };

  const handleChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file.type.startsWith("video/")) {
      setMediaFile((pre) => ({ ...pre, type: "video" }));
      setPreview((pre) => ({ ...pre, type: "video" }));
    } else if (file.type.startsWith("image/")) {
      setMediaFile((pre) => ({ ...pre, type: "image" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    } else if (file.type.startsWith("audio/")) {
      setMediaFile((pre) => ({ ...pre, type: "audio" }));
      setPreview((pre) => ({ ...pre, type: "audio" }));
    }
    const Formdata = new FormData();
    Formdata.append("path", "profileImg");
    Formdata.append("media", file);
    const filePath = await Post("mediaHouse/uploadUserMedia", Formdata);
    if (filePath) {
      setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({
        ...pre,
        path: filePath?.data?.path,
        modalOpen: true,
      }));
    }
    setLoading(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("check ---> ---> ");
    let messages = {
      sender_id: chatContentIds?.sender_id,
      room_id: chatContentIds?.room_id,
      message: mediaFile?.path ? mediaFile?.path : msg1,
      type: mediaFile?.type ? mediaFile?.type : "text",
      user_info: {
        profile_image: profileData?.hasOwnProperty("admin_detail")
          ? profileData?.admin_detail?.admin_profile
          : profileData?.profile_image,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
      },
    };

    // console.log("Send message", messages)
    socketServer.emit("internal group chat", messages);
    setMsg1("");
    setMediaFile({
      path: "",
      type: "",
    });
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  };

  const ChatList = async () => {
    try {
      if (chatContentIds?.room_id) {
        const resp = await Get(
          `mediaHouse/openChatsMH?room_id=${chatContentIds?.room_id}`
        );
        if (resp) {
          localStorage.setItem("contentId", JSON.stringify(param.id));
          localStorage.setItem("type", "content");
          localStorage.setItem("roomId", chatContentIds?.room_id || "");
          localStorage.removeItem("receiverId");
          localStorage.setItem("tabName", JSON.stringify("internal"));
          setMessage(resp?.data?.response?.data);
        }
      } else {
        // toast.error("Select participants first");
      }
    } catch (error) {
      // Handle errors
    }
  };

  // internal chat end

  // Detail of current User
  const user = profileData;
  const fullName = user?.first_name + " " + user?.last_name;

  console.log('localStorage.setItem("roomId")', chatContentIds);

  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  };

  const chatBoxRef = useRef(null);
  const chatBoxInternalRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef?.current) {
      const { scrollHeight, clientHeight, offsetHeight } = chatBoxRef?.current;
      let currentScrollTop = chatBoxRef?.current?.scrollTop;
      const scrollStep = 0;

      const scrollDown = () => {
        if (
          chatBoxRef.current &&
          currentScrollTop < scrollHeight - clientHeight
        ) {
          currentScrollTop += scrollStep;
          chatBoxRef.current.scrollTop = currentScrollTop;
          requestAnimationFrame(scrollDown);
        }
      };

      scrollDown();
    }
  };

  useEffect(() => {
    if (chatBoxInternalRef.current) {
      chatBoxInternalRef.current.scrollTop =
        chatBoxInternalRef.current.scrollHeight;
    }
    scrollToBottom();
  }, [message]);

  // Favourite content-
  const favContentHandler = (i, type) => {
    if (type == "related") {
      setRelatedContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] =
          allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent;
      });
    } else {
      setMoreContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] =
          allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent;
      });
    }
  };

  // recent activity
  const recentActivity = async () => {
    try {
      if (contentId) {
        await Post("mediaHouse/recentactivityformediahouse", {
          content_id: contentId,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    recentActivity();
  }, [contentId]);

  const getMessages = async () => {
    try {
      const resp1 = await Post(`mediaHouse/getAllchat`, {
        room_id: roomDetails?.room_id,
      });
      if (resp1) {
        setMessages(resp1?.data?.response);
        scrollToBottom();
      }
    } catch (error) {
      console.log("Error in get messages", error);
    }
  };

  const messagesEndRef = useRef(null);
  const [isShowBuyMessage, setIsShowBuyMessage] = useState(false);
  const [isShowOffer, setIsShowOffer] = useState(false);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollDown({ behavior: "smooth" });
    }
    if (
      (messages && messages[1]?.message_type == "accept_mediaHouse_offer") ||
      messages[1]?.message_type == "decline_mediaHouse_offer"
    ) {
      setTimeout(() => {
        setIsShowBuyMessage(true);
      }, 11000);
      setTimeout(() => {
        setIsShowOffer(true);
      }, 21000);
      // setIsShowOffer
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollDown({ behavior: "smooth" });
    }
  }, [messages, isShowBuyMessage, isShowOffer]);

  useEffect(() => {
    if (chatBoxRefOffer.current) {
      chatBoxRefOffer.current.scrollTop = chatBoxRefOffer.current.scrollHeight;
    }
  }, [messages, tabSelect, isShowBuyMessage, isShowOffer]);

  console.log("messages ----------->", messages);
  // console.log("isShowBuyMessage ----------->", isShowBuyMessage, isShowOffer);

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);

      console.log("count", res?.data?.data);
      setCartCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  // Add to basket-
  const AddToBasket = async (element) => {
    try {
      console.log("dataType", element);
      // return
      let obj = {};

      if (data.type == "task") {
        obj = {
          type: "uploaded_content",
          uploaded_content: element.content_id,
        };
      } else {
        obj = {
          type: element?.type == "task" ? "task" : "content",
          post_id: element._id,
          content: element?.content?.map((el) => {
            return {
              media_type: el?.media_type,
              media: el?.media,
              watermark: el?.watermark,
              content_id: el?._id,
            };
          }),
        };
      }
      const res = await Post(`mediaHouse/addToBasket`, { order: [obj] });
      if (res) {
        //  ContentByID();
        setData({
          ...data,
          basket_status: data?.basket_status == "true" ? "false" : "true",
        });

        getCountOfBasketItems();
      }
    } catch (error) {}
  };

  console.log("all internal messages ------>12345", message);
  console.log("all internal profile data ------>12345", profileData);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <Link onClick={() => window.history.back()}>
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                  </div>

                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="photo-resize">
                            <div className="post_icns_cstm_wrp">
                              {Audio && Audio.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Audio && Audio.length > 0 && (
                                    <span className="count">
                                      {Audio &&
                                        Audio.length > 0 &&
                                        Audio.length}
                                    </span>
                                  )}

                                  {Audio && Audio.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={interviewic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}

                              {Video && Video.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Video && Video.length > 0 && (
                                    <span className="count">
                                      {Video &&
                                        Video.length > 0 &&
                                        Video.length}
                                    </span>
                                  )}
                                  {Video && Video.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={videoic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}

                              {images && images.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {images && images.length > 0 && (
                                    <span className="count">
                                      {images &&
                                        images.length > 0 &&
                                        images.length}
                                    </span>
                                  )}

                                  {images && images.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={cameraic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}
                              {Pdf && Pdf.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Pdf && Pdf.length > 0 && (
                                    <span className="count">
                                      {Pdf && Pdf.length > 0 && Pdf.length}
                                    </span>
                                  )}

                                  {Pdf && Pdf.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={docsic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}

                              {Doc && Doc.length > 0 && (
                                <div className="post_itm_icns dtl_icns">
                                  {Doc && Doc.length > 0 && (
                                    <span className="count">
                                      {Doc && Doc.length > 0 && Doc.length}
                                    </span>
                                  )}

                                  {Doc && Doc.length > 0 && (
                                    <img
                                      className="feedMediaType iconBg"
                                      src={docsic}
                                      alt=""
                                    />
                                  )}
                                </div>
                              )}
                            </div>

                            <div
                              className="post_itm_icns right dtl_icns"
                              onClick={() =>
                                Favourite(
                                  data?.favourite_status === "true"
                                    ? "false"
                                    : "true"
                                )
                              }
                            >
                              {/* Favourite icon */}
                              <img
                                className="feedMediaType iconBg"
                                src={
                                  data?.favourite_status === "true"
                                    ? favouritedic
                                    : favic
                                }
                                alt={
                                  data?.favourite_status === "true"
                                    ? favouritedic
                                    : favic
                                }
                              />
                            </div>

                            <div
                              className="post_itm_icns right dtl_icns cart_icn"
                              onClick={(event) => {
                                event.stopPropagation();
                                AddToBasket(data);
                                // props.basket();
                              }}
                              // onClick={() => Favourite(data?.favourite_status === "true" ? "false" : "true")}
                            >
                              {/* Favourite icon */}
                              {/* <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg> */}

                              {data?.basket_status == "false" ? (
                                <svg
                                  width="31"
                                  height="30"
                                  viewBox="0 0 31 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                    stroke="white"
                                    stroke-width="1.96354"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="31"
                                  height="30"
                                  viewBox="0 0 31 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                    stroke="white"
                                    stroke-width="1.96354"
                                  />
                                  <path
                                    d="M9 8H27.5L25 18H12L9 8Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                            </div>

                            <div
                              className="post_itm_icns right dtl_icns magnifier-icn"
                              onClick={() => {
                                setOpenContent(!openContent);
                              }}
                            >
                              <div className="feedMediaType iconBg view-icon">
                                <SlMagnifierAdd />
                              </div>
                            </div>
                            <ViewContent
                              openContent={openContent}
                              setOpenContent={setOpenContent}
                              showContent={showContent}
                              imageSize={imageSize}
                            />

                            {/* Swiper container */}
                            <Swiper
                              spaceBetween={50}
                              slidesPerView={1}
                              modules={[Pagination]}
                              slidesPerGroupSkip={1}
                              focusableElements="pagination"
                              pagination={{ clickable: true }}
                              onSlideChange={(e) => {
                                setShowContent(data.content[e.activeIndex]);
                                if (
                                  data.content[e.activeIndex]?.media_type ==
                                  "image"
                                ) {
                                  const img = new Image();
                                  img.src =
                                    data.content[e.activeIndex]?.watermark;
                                  img.onload = function () {
                                    setImageSize({
                                      height: img.height,
                                      width: img.width,
                                    });
                                  };
                                }
                              }}
                              // onSwiper={(swiper) => console.log(swiper)}
                            >
                              {data
                                ? data.content.map((curr) => (
                                    <SwiperSlide key={curr._id}>
                                      <div
                                        className={`swiper-slide-content ${
                                          data?.before_discount_value
                                            ? "slide-offer"
                                            : ""
                                        }`}
                                      >
                                        {/* Media content based on type */}
                                        {curr?.media_type === "image" && (
                                          <img
                                            src={curr?.watermark}
                                            alt={`Image ${curr._id}`}
                                          />
                                        )}
                                        {curr?.media_type === "audio" && (
                                          <div>
                                            <img
                                              src={audioic}
                                              alt={`Audio ${curr._id}`}
                                              className="slider-img"
                                              onClick={toggleAudio}
                                            />
                                            <audio
                                              controls
                                              src={
                                                curr?.watermark ||
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                  curr?.media
                                              }
                                              type="audio/mpeg"
                                              className="slider-audio"
                                              ref={audioRef}
                                            />
                                          </div>
                                        )}
                                        {curr?.media_type === "video" && (
                                          <video
                                            controls
                                            className="slider-video"
                                            src={curr?.watermark}
                                            style={{
                                              height: "380px",
                                              width: "100%",
                                            }}
                                          />
                                        )}
                                        {curr?.media_type === "pdf" && (
                                          <embed
                                            src={`${
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                              curr?.media
                                            }`}
                                            type="application/pdf"
                                            width="100%"
                                            height="500"
                                          />
                                        )}
                                        {data?.before_discount_value ? (
                                          <span>{`${data?.sales_prefix} ${data?.discount_percent}% Off`}</span>
                                        ) : null}
                                      </div>
                                    </SwiperSlide>
                                  ))
                                : fav?.content_id?.content?.map((curr) => (
                                    <SwiperSlide key={curr._id}>
                                      <div className="swiper-slide-content">
                                        {/* Media content based on type */}
                                        {curr?.media_type === "image" && (
                                          <img
                                            src={
                                              curr?.watermark ||
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                                curr?.media
                                            }
                                            alt={`Image ${curr._id}`}
                                          />
                                        )}
                                        {curr?.media_type === "audio" && (
                                          <div>
                                            <img
                                              src={audioic}
                                              alt={`Audio ${curr._id}`}
                                              className="slider-img"
                                              onClick={toggleAudio}
                                            />
                                            <audio
                                              controls
                                              src={
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                curr?.media
                                              }
                                              type="audio/mpeg"
                                              className="slider-audio"
                                              ref={audioRef}
                                            />
                                          </div>
                                        )}
                                        {curr?.media_type === "video" && (
                                          <video
                                            controls
                                            className="slider-video"
                                            src={curr?.media}
                                          />
                                        )}
                                      </div>
                                    </SwiperSlide>
                                  ))}
                            </Swiper>
                          </div>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {data ? data?.heading : fav?.content_id?.heading}
                            </h1>

                            {/* <p className="feed_descrptn dtl_txt">
                              {data
                                ? data?.description
                                : fav?.content_id?.description}
                            </p> */}
                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={
                                data
                                  ? data?.description
                                  : fav?.content_id?.description
                              }
                            ></textarea>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info">
                        <CardContent className="card-content feedDetailInfo">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography className="txt_bld">
                                {" "}
                                Content info
                              </Typography>
                              {data?.favourite_status === "true" && (
                                <div className="favourite">
                                  <AiFillStar />
                                  <span>Favourited</span>
                                </div>
                              )}
                              {data?.favourite_status === "false" && (
                                <div className="favourite">
                                  <AiOutlineStar />
                                  <span>Favourite</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <hr /> */}
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      data
                                        ? data?.hopper_id?.avatar_id?.avatar
                                          ? process.env.REACT_APP_AVATAR_IMAGE +
                                            data?.hopper_id?.avatar_id?.avatar
                                          : null
                                        : fav?.content_id?.hopper_id?.avatar_id
                                            ?.avatar
                                        ? process.env.REACT_APP_AVATAR_IMAGE +
                                          fav?.content_id?.hopper_id?.avatar_id
                                            ?.avatar
                                        : null
                                    }
                                    alt=""
                                  />

                                  <span className="hpr_nme">
                                    {data
                                      ? data?.hopper_id?.user_name
                                      : fav?.content_id?.hopper_id?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />{" "}
                                    <div>
                                      {data
                                        ? data?.location
                                        : fav?.content_id?.location}
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <MdOutlineWatchLater />
                                    {data
                                      ? moment(data?.createdAt).format(
                                          "h:mm A, DD MMM YYYY"
                                        )
                                      : moment(
                                          fav?.content_id?.createdAt
                                        ).format("h:mm A, DD MMM YYYY")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content tags_wrp">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hashtags</span>
                                <div>
                                  <div className="item-in-right hashtag-wrap">
                                    {data
                                      ? data &&
                                        data?.tag_ids.map((tag) => {
                                          return (
                                            <span className="mr">
                                              #{tag.name}
                                            </span>
                                          );
                                        })
                                      : fav &&
                                        fav?.content_id?.tag_ids.map((tag) => {
                                          return (
                                            <span className="mr">
                                              #{tag.name}
                                            </span>
                                          );
                                        })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>
                                <div className="">
                                  <img
                                    src={
                                      data
                                        ? data?.category_id?.icon
                                        : fav?.content_id?.category_id?.icon
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {capitalizeFirstLetter(
                                      data
                                        ? data?.category_id?.name
                                        : fav?.content_id?.category_id?.name
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">License</span>
                                <div className="">
                                  <img
                                    src={
                                      data
                                        ? data?.type === "exclusive"
                                          ? exclusive
                                          : shared
                                        : fav?.content_id?.type === "exclusive"
                                        ? exclusive
                                        : shared
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {data
                                      ? capitalizeFirstLetter(data?.type)
                                      : capitalizeFirstLetter(
                                          fav?.content_id?.type
                                        )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot cont-info-actions d-flex gap-5 justify-content-between align-items-center">
                              {messages && messages.length === 0 ? (
                                <Button
                                    variant={
                                      data?.sales_prefix ? "" : "secondary"
                                    }
                                    onClick={() => {
                                      if (
                                        messages[0]?.message_type !==
                                        "offer_started"
                                      ) {
                                        setTabSelect("external");
                                        // Start_Offer();
                                        // setMessages((old) => [...old]);
                                      }
                                    }}
                                    className={
                                      data?.sales_prefix ? "greyBtn" : ""
                                    }
                                    // disabled={
                                    //   data?.sales_prefix ? true : loading
                                    // }
                                  >
                                    Offer
                                  </Button>
                              ) : messages?.length === 1 ? (
                                <Button
                                  onClick={() => {
                                    setTabSelect("external");
                                  }}
                                  className="greyBtn"
                                >
                                  Offer
                                </Button>
                              ) : (
                                <Button
                                  className="offeredPrice_btn bigBtn"
                                  onClick={() => {
                                    setTabSelect("external");
                                  }}
                                  // disabled={true}
                                >
                                  £
                                  {Number(
                                    messages?.find(
                                      (el) =>
                                        el.message_type ===
                                          "accept_mediaHouse_offer" ||
                                        el.message_type ===
                                          "decline_mediaHouse_offer"
                                    )?.amount || 0
                                  )?.toLocaleString("en-US", {
                                    maximumFractionDigits: 2,
                                  })}
                                </Button>
                              )}

                              {(data
                                ? !data?.purchased_mediahouse.find(
                                    (el) =>
                                      el ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )
                                : !fav?.content_id?.purchased_mediahouse.find(
                                    (el) =>
                                      el ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )) && (
                                <Link to={`/auto-invoice/${param.id}`}>
                                  {" "}
                                  <Button variant="primary">
                                    £
                                    {data
                                      ? data?.ask_price?.toLocaleString(
                                          "en-US",
                                          { maximumFractionDigits: 2 }
                                        ) || 0
                                      : fav?.content_id?.ask_price?.toLocaleString(
                                          "en-US",
                                          { maximumFractionDigits: 2 }
                                        ) || 0}
                                  </Button>
                                </Link>
                              )}
                              {(data
                                ? data?.purchased_mediahouse.find(
                                    (el) =>
                                      el ===
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )
                                : fav?.content_id?.purchased_mediahouse.find(
                                    (el) =>
                                      el ===
                                      JSON.parse(localStorage.getItem(user))
                                        ?._id
                                  )) && (
                                <Link className="w-100">
                                  {" "}
                                  <Button className="greyBtn">Paid</Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>

                    <Col md={12} className="feed_dtl_chat_wrap">
                      <div className="chat-tabs-wrap">
                        <Tabs
                          defaultActiveKey={tabSelect}
                          activeKey={
                            tabSelect ||
                            JSON.parse(localStorage.getItem("tabName"))
                          }
                          id="chat-tabs"
                          className="mb-3 tbs"
                          onSelect={(tabName) => {
                            localStorage.setItem(
                              "tabName",
                              JSON.stringify(tabName)
                            );
                            setTabSelect(tabName);
                          }}
                        >
                          <Tab
                            eventKey="internal"
                            title="Internal Chat"
                            defaultActiveKey="internal"
                            className=" show"
                          >
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  {/* <span class="loader"></span> */}
                                  <div
                                    className="feed_dtl_msgs pp"
                                    id="message-container-1"
                                  >
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select participants from the
                                        list, and add them to your internal
                                        chat.
                                      </h6>
                                      <h6 className="txt_light">
                                        Once added, you can start chatting with
                                        your team members. Use the text box
                                        below to type or send voice notes. Good
                                        luck
                                      </h6>
                                    </div>

                                    {message?.map((curr) => (
                                      <div
                                        className="baat_cheet"
                                        // ref={chatBoxRef}
                                        ref={chatBoxInternalRef}
                                        // chatBoxInternalRef
                                      >
                                        {curr?.type === "add" &&
                                        curr.user_id !== profileData._id ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              You added {curr?.addedMsg}
                                            </span>
                                          </p>
                                        ) : curr?.type == "remove" ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              You removed {curr?.addedMsg}
                                            </span>
                                          </p>
                                        ) : (
                                          curr?.user_info && (
                                            <div className="crd" key={curr.id}>
                                              {curr?.user_info && (
                                                <div className="img">
                                                  <img
                                                    src={
                                                      curr.user_info
                                                        ?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                </div>
                                              )}
                                              <div className="postedcmnt_info">
                                                {curr?.user_info && (
                                                  <h5>
                                                    {`${curr?.user_info?.first_name} ${curr?.user_info?.last_name}`}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "hh:mm A, DD MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                )}
                                                <Typography className="comment_text">
                                                  {curr.type === "text" &&
                                                    curr.message}
                                                </Typography>

                                                <div
                                                  onClick={() =>
                                                    handleShow(curr)
                                                  }
                                                  className="exp"
                                                >
                                                  {curr.type === "image" && (
                                                    <img
                                                      src={curr.message}
                                                      className="msgContent"
                                                      alt="content"
                                                    />
                                                  )}
                                                </div>

                                                <div>
                                                  {curr.type === "video" && (
                                                    <video
                                                      src={curr.message}
                                                      className="msgContent"
                                                      controls
                                                      alt="video content"
                                                      controlsList="nodownload"
                                                    ></video>
                                                  )}
                                                </div>

                                                <div>
                                                  {curr.type === "audio" ? (
                                                    <audio
                                                      src={curr.message}
                                                      controls
                                                      alt="audio content"
                                                      controlsList="nodownload"
                                                    ></audio>
                                                  ) : curr.type ===
                                                    "recording" ? (
                                                    <>
                                                      <audio
                                                        src={curr.message}
                                                        controls
                                                        alt="audio content"
                                                        controlsList="nodownload"
                                                      ></audio>
                                                    </>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  <Form onSubmit={handleButtonClick}>
                                    <div className="inpt typeMsg_inp mt-2">
                                      <img
                                        src={
                                          profileData?.hasOwnProperty(
                                            "admin_detail"
                                          )
                                            ? profileData?.admin_detail
                                                ?.admin_profile
                                            : profileData?.profile_image
                                        }
                                        alt=""
                                      />
                                      <InputGroup className="">
                                        <Form.Control
                                          placeholder="Type here..."
                                          aria-describedby="basic-addon1"
                                          value={msg1}
                                          onChange={(e) => {
                                            setMsg1(e.target.value);
                                          }}
                                        />
                                      </InputGroup>
                                      <div className="chatIn-options">
                                        <div className="uplod-mda">
                                          <input
                                            type="file"
                                            id="cht_add_img"
                                            className="cht_file_inp"
                                            onChange={handleChange}
                                          />
                                          <label
                                            htmlFor="cht_add_img"
                                            className="cht_fl_inp_lbl"
                                          >
                                            <MdAdd className="d_flex file_add_icn" />
                                          </label>
                                        </div>
                                        <Button
                                          ref={target}
                                          onClick={() =>
                                            setShowAudio(!showAudio)
                                          }
                                        >
                                          <BsMic className="chatMicIcn" />
                                        </Button>
                                        <span
                                          className="chatIn-send"
                                          onClick={handleButtonClick}
                                        >
                                          <BsArrowRight />
                                        </span>
                                      </div>
                                      <div>
                                        <Overlay
                                          target={target.current}
                                          show={showAudio}
                                          placement="top"
                                          className=""
                                        >
                                          <Tooltip id="overlay-example">
                                            <div className="recordingPopup">
                                              <div className="d-flex justify-content-between align-items-center">
                                                <h5>Record Audio</h5>
                                                <div
                                                  className="close-btn clickable"
                                                  onClick={() =>
                                                    setShowAudio(false)
                                                  }
                                                >
                                                  <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 13 13"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M1.34277 1L11.3165 12"
                                                      stroke="black"
                                                      stroke-width="2"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                    />
                                                    <path
                                                      d="M1.34277 12L11.3165 1"
                                                      stroke="black"
                                                      stroke-width="2"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                    />
                                                  </svg>
                                                </div>
                                              </div>
                                              <div className="d-flex mt-3 justify-content-evenly">
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={onStartRecording}
                                                  disabled={isRecording}
                                                >
                                                  {" "}
                                                  <BsPlay
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Start
                                                </Button>
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={() => {
                                                    setIsRecording(
                                                      (old) => !old
                                                    );
                                                  }}
                                                  // onClick={onStopRecording}
                                                  disabled={!isRecording}
                                                >
                                                  {" "}
                                                  <BsPause
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Stop
                                                </Button>
                                              </div>
                                              <div>
                                                <ReactMic
                                                  record={isRecording}
                                                  className="sound-wave w-100 my-2"
                                                  onStop={onStopRecording}
                                                />
                                              </div>
                                              <div className="text-end">
                                                <button
                                                  className="sendrecBtn"
                                                  onClick={(e) => {
                                                    handleButtonClick(e);
                                                    setShowAudio(!showAudio);
                                                  }}
                                                >
                                                  Send
                                                </button>
                                              </div>
                                            </div>
                                          </Tooltip>
                                        </Overlay>
                                      </div>
                                    </div>
                                  </Form>
                                </Col>

                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <Link>
                                      <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                        <h4>Participants</h4>
                                      </div>
                                    </Link>
                                    {/* 
                                    <div className="scrollHtPnts">
                                      {userList?.map((curr) => {
                                        return (
                                          <div className="tab_in_card_items">
                                            <div className="checkWrap">
                                              <FormControlLabel
                                                className={`me-0 ${
                                                  !selectedIds.includes(
                                                    curr._id
                                                  ) && "afterCheck"
                                                }`}
                                                checked={
                                                  selectedIds.includes(
                                                    curr._id
                                                  ) ||
                                                  message?.some(
                                                    (item) =>
                                                      `${curr?.first_name} ${curr?.last_name}` ==
                                                      item?.addedMsg
                                                  )
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange(curr._id)
                                                }
                                                control={
                                                  <Checkbox defaultChecked />
                                                }
                                                disabled={message?.some(
                                                  (item) =>
                                                    `${curr?.first_name} ${curr?.last_name}` ==
                                                    item?.addedMsg
                                                )}
                                              />
                                            </div>
                                            <div
                                              className="img"
                                              onClick={() => {
                                                setSenderId(curr._id);
                                                setShow({
                                                  content: false,
                                                  task: false,
                                                  presshop: false,
                                                  internal: true,
                                                });
                                              }}
                                            >
                                              <img src={usric} alt="user" />
                                              <span>
                                                {" "}
                                                {curr.first_name +
                                                  " " +
                                                  curr.last_name}
                                              </span>
                                            </div>
                                       
                                          </div>
                                        );
                                      })}
                                    </div> */}

                                    <div className="scrollHtPnts">
                                      {userList?.map((curr) => {
                                        console.log(
                                          "all user list data ------->12345676jfhgjf",
                                          curr
                                        );
                                        return (
                                          <div className="tab_in_card_items">
                                            <div className="checkWrap">
                                              <FormControlLabel
                                                className={`me-0 ${
                                                  !selectedIds.includes(
                                                    curr._id
                                                  ) && "afterCheck"
                                                }`}
                                                checked={
                                                  selectedIds.includes(
                                                    curr._id
                                                  ) ||
                                                  message?.some(
                                                    (item) =>
                                                      `${curr?.first_name} ${curr?.last_name}` ==
                                                        item?.addedMsg &&
                                                      item?.type == "add"
                                                  )
                                                }
                                                onChange={
                                                  (e) => {
                                                    if (e.target.checked) {
                                                      handleCheckboxChange(
                                                        curr._id
                                                      ); // Call add function when checked
                                                    } else {
                                                      RemoveChatUser(curr?._id);
                                                      // setRemoveUserId(curr?._id);
                                                    }
                                                  }
                                                  // handleCheckboxChange(curr._id)
                                                }
                                                control={
                                                  <Checkbox defaultChecked />
                                                }
                                                // disabled={message?.some(
                                                //   (item) =>
                                                //     `${curr?.first_name} ${curr?.last_name}` ==
                                                //     item?.addedMsg
                                                // )}
                                              />
                                            </div>
                                            <div
                                              className="img"
                                              onClick={() => {
                                                setSenderId(curr._id);
                                                setShow({
                                                  content: false,
                                                  task: false,
                                                  presshop: false,
                                                  internal: true,
                                                });
                                              }}
                                            >
                                              <img
                                                src={curr?.profile_image}
                                                alt="user"
                                              />
                                              <span> {curr?.full_name}</span>
                                            </div>
                                            {/* <div className="dots">
                                                <Link className="view_chat">View</Link>
                                              </div> */}
                                            {message?.some(
                                              (item) =>
                                                `${curr?.first_name} ${curr?.last_name}` ==
                                                  item?.addedMsg &&
                                                item?.type == "add"
                                              // ) ? (
                                              //   <button
                                              //     className="bg-secondary text-white rounded"
                                              //     onClick={() => {
                                              //       RemoveChatUser(curr?._id);
                                              //       console.log(
                                              //         "all data should print ---> "
                                              //       );
                                              //     }}
                                              //   >
                                              //     remove
                                              //   </button>
                                              // ) : (
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <button
                                      className="addPrtBtn btn w-100"
                                      onClick={AddParticipents}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="external" title="Hopper Chat">
                            <a href="lorem"></a>
                            <div className="tab-data active">
                              <Row>
                                <Col md={12}>
                                  <div
                                    ref={chatBoxRefOffer}
                                    className="feed_dtl_msgs extrnl dd"
                                  >
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>

                                      <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                                        <div className="img">
                                          <img
                                            src={presshopchatic}
                                            alt="User"
                                            className="usr_img"
                                          />
                                        </div>
                                        <div className="cht_txt postedcmnt_info">
                                          <h5>
                                            {"PressHop"}
                                            <span className="text-secondary time">
                                              {moment().format(
                                                // curr?.createdAt
                                                "h:mm A, D MMM YYYY"
                                              )}
                                            </span>
                                          </h5>
                                          { 
                                            data?.sales_prefix ? (
                                              <Typography className="comment_text">
                                                Thank you for your interest in this content! It's already been generously discounted, 
                                                so further negotiations are not possible at this time. However, if you have any questions 
                                                or need assistance, feel free to click on the PressHop Chat to connect with one of our 
                                                friendly team members - Cheers!
                                              </Typography>
                                            ):(
                                            <Typography className="comment_text">
                                              Please click the 'Offer' button to
                                              make an offer, or simply click 'Buy'
                                              to purchase the content
                                            </Typography>
                                            )
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex flex-column-reverse"
                                      // ref={chatBoxRef}
                                    >
                                      {messages
                                        ?.filter((el) => el?.amount != "0")
                                        ?.map((curr) => {
                                          return curr?.message_type ===
                                            "offer_started" ? (
                                            <div className="crd chatting_itm sngl_cht d-flex align-items-start">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <h5>
                                                  {"PressHop"}
                                                  <span className="text-secondary time">
                                                    {moment(curr?.createdAt)
                                                      .local()
                                                      .format(
                                                        "h:mm A, D MMM YYYY z"
                                                      )}
                                                  </span>
                                                </h5>
                                                <Typography className="comment_text">
                                                  Enter your offer below
                                                </Typography>
                                                <form
                                                  onSubmit={(e) => {
                                                    e.preventDefault();
                                                    NewExternalChatFun(
                                                      "accept",
                                                      offer_value,
                                                      data?.original_ask_price,
                                                      roomDetails
                                                    );
                                                  }}
                                                  className="usr_upld_opts cont_opts"
                                                >
                                                  <input
                                                    className="cht_prc_inp text-center"
                                                    autoComplete="off"
                                                    disabled={
                                                      messages.length !== 1 &&
                                                      true
                                                    }
                                                    type="number"
                                                    value={
                                                      messages?.length <= 1
                                                        ? offer_value
                                                        : null
                                                    }
                                                    placeholder={
                                                      messages?.length > 1
                                                        ? `£${
                                                            messages?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                  "accept_mediaHouse_offer" ||
                                                                el?.message_type ==
                                                                  "decline_mediaHouse_offer"
                                                            )?.amount
                                                          }`
                                                        : "Enter price here ..."
                                                    }
                                                    onChange={(e) => {
                                                      setOffer_value(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />

                                                  {
                                                    <button
                                                      className="theme_btn"
                                                      disabled={
                                                        messages.length !== 1 &&
                                                        true
                                                      }
                                                      type="submit"
                                                    >
                                                      Submit
                                                    </button>
                                                  }
                                                </form>
                                              </div>
                                            </div>
                                          ) : curr?.message_type ===
                                            "accept_mediaHouse_offer" ? (
                                            <>
                                              <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                                                {isShowBuyMessage ? (
                                                  <>
                                                    <div className="img">
                                                      <img
                                                        src={
                                                          data
                                                            ? data?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                              ? process.env
                                                                  .REACT_APP_AVATAR_IMAGE +
                                                                data?.hopper_id
                                                                  ?.avatar_id
                                                                  ?.avatar
                                                              : null
                                                            : fav?.content_id
                                                                ?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                            ? process.env
                                                                .REACT_APP_AVATAR_IMAGE +
                                                              fav?.content_id
                                                                ?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                            : null
                                                        }
                                                        alt="User"
                                                        className="usr_img"
                                                      />
                                                    </div>
                                                    <div className="cht_txt postedcmnt_info">
                                                      <div className="d-flex align-items-center">
                                                        <h5 className="usr_name mb-0">
                                                          {
                                                            data?.hopper_id
                                                              ?.user_name
                                                          }
                                                          <span className="text-secondary time">
                                                            {moment(
                                                              curr?.createdAt
                                                            ).format(
                                                              "h:mm A, D MMM YYYY"
                                                            )}
                                                          </span>
                                                        </h5>
                                                      </div>
                                                      <p className="mb-0 msg auto_press_msg">
                                                        Has accepted your offer
                                                        of{" "}
                                                        <a className="link">
                                                          £{curr?.amount}
                                                        </a>{" "}
                                                        to sell the content
                                                      </p>

                                                      <div className="usr_upld_opts">
                                                        <button
                                                          className={
                                                            curr.paid_status ===
                                                            true
                                                              ? "sub_hdng_inn"
                                                              : "theme_btn"
                                                          }
                                                          disabled={
                                                            curr.paid_status ===
                                                            true
                                                          }
                                                          onClick={() => {
                                                            Payment(
                                                              +curr?.amount,
                                                              data?._id,
                                                              false,
                                                              0,
                                                              roomDetails
                                                            );
                                                          }}
                                                        >
                                                          Buy
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <span class="loader"></span>
                                                )}
                                              </div>

                                              {/* <h1>hellofghfd</h1>
                                              <span class="loader"></span> */}

                                              <div className="crd chatting_itm sngl_cht ">
                                                <div className="chat-box d-flex align-items-start msg-worries">
                                                  <div className="img">
                                                    <img
                                                      src={userImage}
                                                      alt="User"
                                                      className="usr_img"
                                                    />
                                                  </div>
                                                  <div className="cht_txt postedcmnt_info">
                                                    <h5 className="mb-0">
                                                      {username}
                                                      <span className="text-secondary time">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </span>
                                                    </h5>
                                                    <Typography className="comment_text">
                                                      Has offered{" "}
                                                      <a className="link">
                                                        £{curr?.amount}
                                                      </a>{" "}
                                                      to buy the content
                                                    </Typography>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : curr?.message_type ===
                                            "decline_mediaHouse_offer" ? (
                                            <>
                                              {isShowOffer ? (
                                                <div className="crd chatting_itm sngl_cht user-data">
                                                  <div className="chat-box d-flex align-items-start">
                                                    <div className="img">
                                                      <img
                                                        src={presshopchatic}
                                                        alt="User"
                                                        className="usr_img"
                                                      />
                                                    </div>
                                                    <div className="cht_txt postedcmnt_info">
                                                      <h5>
                                                      PressHop
                                                        <span className="text-secondary time">
                                                          {moment(
                                                            curr?.createdAt
                                                          ).format(
                                                            "h:mm A, D MMM YYYY"
                                                          )}
                                                        </span>
                                                      </h5>
                                                      <Typography className="comment_text">
                                                        Would you like to
                                                        reconsider buying the
                                                        content at{" "}
                                                        <a className="link">
                                                          £
                                                          {
                                                            data?.original_ask_price
                                                          }
                                                        </a>{" "}
                                                      </Typography>
                                                    </div>
                                                  </div>
                                                  <div className="usr_upld_opts user-btn d-flex align-items-center">
                                                    <button
                                                      className="theme_btn"
                                                      onClick={() => {
                                                        Payment(
                                                          +data?.original_ask_price,
                                                          data?._id,
                                                          true,
                                                          data?.original_ask_price,
                                                          roomDetails
                                                        );
                                                      }}
                                                    >
                                                      Buy
                                                    </button>
                                                    <button
                                                      className="theme_btn black-btn"
                                                      onClick={() =>
                                                        NewExternalChatFun(
                                                          "no",
                                                          curr?.amount,
                                                          0,
                                                          roomDetails
                                                        )
                                                      }
                                                    >
                                                      No
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <span class="loader"></span>
                                              )}
                                              {/* bondoury */}

                                              <div className="crd chatting_itm sngl_cht">
                                                {isShowBuyMessage ? (
                                                  <div className=" d-flex align-items-start msg-worries">
                                                    <div className="img">
                                                      <img
                                                        src={
                                                          data
                                                            ? data?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                              ? process.env
                                                                  .REACT_APP_AVATAR_IMAGE +
                                                                data?.hopper_id
                                                                  ?.avatar_id
                                                                  ?.avatar
                                                              : null
                                                            : fav?.content_id
                                                                ?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                            ? process.env
                                                                .REACT_APP_AVATAR_IMAGE +
                                                              fav?.content_id
                                                                ?.hopper_id
                                                                ?.avatar_id
                                                                ?.avatar
                                                            : null
                                                        }
                                                        alt="User"
                                                        className="usr_img"
                                                      />
                                                    </div>
                                                    <div className="cht_txt postedcmnt_info">
                                                      <div className="d-flex align-items-center msg-worries">
                                                        <h5 className="usr_name">
                                                          {
                                                            data?.hopper_id
                                                              ?.user_name
                                                          }
                                                          <span className="text-secondary time">
                                                            {moment(
                                                              curr?.createdAt
                                                            ).format(
                                                              "h:mm A, D MMM YYYY"
                                                            )}
                                                          </span>
                                                        </h5>
                                                      </div>
                                                      <p className="mb-0 msg">
                                                        Has rejected your offer
                                                        of{" "}
                                                        <a className="link">
                                                          £{curr?.amount}
                                                        </a>{" "}
                                                        to sell the content
                                                      </p>
                                                    </div>
                                                  </div>
                                                ) : isShowBuyMessage ? (
                                                  <span class="loader"></span>
                                                ) : (
                                                  ""
                                                )}
                                              </div>

                                              <div className="crd chatting_itm sngl_cht">
                                                <div className="d-flex align-items-center msg-worries">
                                                  <div className="img">
                                                    <img
                                                      src={userImage}
                                                      alt="User"
                                                      className="usr_img"
                                                    />
                                                  </div>
                                                  <div className="cht_txt postedcmnt_info">
                                                    <h5>
                                                      {username}
                                                      <span className="text-secondary time">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </span>
                                                    </h5>
                                                    <Typography className="comment_text">
                                                      Has offered{" "}
                                                      <a className="link">
                                                        £{curr?.amount}
                                                      </a>{" "}
                                                      to buy the content
                                                    </Typography>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : curr?.message_type ===
                                            "reject_mediaHouse_offer" ? (
                                            <>
                                              <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                                                <div className="img">
                                                  <img
                                                    src={presshopchatic}
                                                    alt="User"
                                                    className="usr_img"
                                                  />
                                                </div>
                                                <div className="cht_txt postedcmnt_info">
                                                  <div className="d-flex align-items-center msg-worries">
                                                    <h5 className="usr_name mb-0">
                                                    PressHop
                                                      <span className="text-secondary time">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                  <p className="mb-0 msg auto_press_msg">
                                                    No worries! Check out our
                                                    awesome selection of
                                                    discounted content available
                                                    for purchase
                                                  </p>
                                                  <div
                                                    className="usr_upld_opts"
                                                    onClick={() =>
                                                      navigate(
                                                        "/Uploaded-Content/Special"
                                                      )
                                                    }
                                                  >
                                                    <button className="theme_btn">
                                                      Show me the Offers
                                                    </button>
                                                  </div>
                                                  <p className="buy_btn_txt mb-0">
                                                    Please refer to our{" "}
                                                    <a className="link">
                                                      terms and conditions
                                                    </a>
                                                    . If you have any questions,
                                                    please{" "}
                                                    <a className="link">
                                                      contact
                                                    </a>{" "}
                                                    our helpful teams who are
                                                    available 24x7 to assist
                                                    you. Thank you.
                                                  </p>
                                                </div>
                                              </div>
                                            </>
                                          ) : curr?.message_type ===
                                            "PaymentIntent" ? (
                                            <>
                                              <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                                                <div className="img">
                                                  <img
                                                    src={presshopchatic}
                                                    alt="User"
                                                    className="usr_img"
                                                  />
                                                </div>
                                                <div className="cht_txt postedcmnt_info rating-update">
                                                  <div className="d-flex align-items-center">
                                                    <h5 className="usr_name mb-0">
                                                    PressHop
                                                      <span className="text-secondary time">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                  <p className="mb-0 msg auto_press_msg">
                                                    Please rate your experience
                                                    with PressHop
                                                  </p>
                                                  <div className="usr_reviews">
                                                    <Rating
                                                      onClick={handleRating}
                                                      value={rating}
                                                      initialValue={
                                                        +messages?.find(
                                                          (el) =>
                                                            el.message_type ==
                                                            "rating_by_mediahouse"
                                                        )?.rating || 0
                                                      }
                                                      disabled={
                                                        messages?.find(
                                                          (el) =>
                                                            el.message_type ==
                                                            "rating_by_mediahouse"
                                                        )?.rating
                                                      }
                                                    />
                                                    <p className="mb-0 msg auto_press_msg">
                                                      Please select the key
                                                      features you liked about
                                                      our platform
                                                    </p>
                                                    <ul>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Experience"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Experience"
                                                            ) ||
                                                          features.includes(
                                                            "Experience"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Experience
                                                      </li>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Easy to use"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Easy to use"
                                                            ) ||
                                                          features.includes(
                                                            "Easy to use"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Easy to use
                                                      </li>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Connectivity with Hoppers"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Connectivity with Hoppers"
                                                            ) ||
                                                          features.includes(
                                                            "Connectivity with Hoppers"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Connectivity with
                                                        Hoppers
                                                      </li>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Pricing"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Pricing"
                                                            ) ||
                                                          features.includes(
                                                            "Pricing"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Pricing
                                                      </li>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Secure payment"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Secure payment"
                                                            ) ||
                                                          features.includes(
                                                            "Secure payment"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Secure payment
                                                      </li>
                                                      <li
                                                        onClick={() =>
                                                          handleFeatures(
                                                            "Support"
                                                          )
                                                        }
                                                        className={
                                                          messages
                                                            ?.find(
                                                              (el) =>
                                                                el?.message_type ==
                                                                "rating_by_mediahouse"
                                                            )
                                                            ?.features?.includes(
                                                              "Support"
                                                            ) ||
                                                          features.includes(
                                                            "Support"
                                                          )
                                                            ? "selected clickable"
                                                            : "clickable"
                                                        }
                                                      >
                                                        Support
                                                      </li>
                                                    </ul>
                                                    <div className="position-relative">
                                                      <div className="right_text_svg">
                                                        <svg
                                                          width="22"
                                                          height="21"
                                                          viewBox="0 0 22 21"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <g clip-path="url(#clip0_5392_68582)">
                                                            <path
                                                              d="M13.5472 5.87891H3.86719V6.71891H13.5472V5.87891Z"
                                                              fill="#9DA3A3"
                                                            />
                                                            <path
                                                              d="M13.5472 8.40039H3.86719V9.24039H13.5472V8.40039Z"
                                                              fill="#9DA3A3"
                                                            />
                                                            <path
                                                              d="M11.3472 10.9199H3.86719V11.7599H11.3472V10.9199Z"
                                                              fill="#9DA3A3"
                                                            />
                                                            <path
                                                              d="M9.14719 13.4395H3.86719V14.2795H9.14719V13.4395Z"
                                                              fill="#9DA3A3"
                                                            />
                                                            <path
                                                              d="M9.14719 15.9609H3.86719V16.8009H9.14719V15.9609Z"
                                                              fill="#9DA3A3"
                                                            />
                                                            <path
                                                              d="M17.0677 7.80604V3.60604L13.7298 0.419922H0.347656V20.5799H17.0677V13.1938L21.6498 8.81992L18.8277 6.12604L17.0677 7.80604ZM16.6277 9.4138L18.2055 10.9199L12.9255 15.9599H11.3477V14.4538L16.6277 9.4138ZM13.9877 1.8538L15.5655 3.35992H13.9877V1.8538ZM16.1877 19.7399H1.22766V1.25992H13.1077V4.19992H16.1877V8.64604L10.4677 14.106V16.7999H13.2898L16.1877 14.0338V19.7399ZM18.8277 10.326L17.2498 8.81992L18.8277 7.3138L20.4055 8.81992L18.8277 10.326Z"
                                                              fill="#9DA3A3"
                                                            />
                                                          </g>
                                                          <defs>
                                                            <clipPath id="clip0_5392_68582">
                                                              <rect
                                                                width="22"
                                                                height="21"
                                                                fill="white"
                                                              />
                                                            </clipPath>
                                                          </defs>
                                                        </svg>
                                                      </div>
                                                      <Form.Group
                                                        className="mb-3"
                                                        controlId="exampleForm.ControlTextarea1"
                                                      >
                                                        <Form.Control
                                                          placeholder="We hope you're enjoying your experience with PressHop. Please share your feedback with us. Your insights will help us enhance both your experience, and the quality of our service. Thank you"
                                                          as="textarea"
                                                          rows={3}
                                                          onChange={(e) =>
                                                            setReview(
                                                              e.target.value
                                                            )
                                                          }
                                                          value={
                                                            messages?.find(
                                                              (el) =>
                                                                el.message_type ==
                                                                "rating_by_mediahouse"
                                                            )?.review || review
                                                          }
                                                        ></Form.Control>
                                                      </Form.Group>
                                                    </div>

                                                    <button
                                                      className="theme_btn"
                                                      onClick={() =>
                                                        RatingNReview(
                                                          data?._id,
                                                          true
                                                        )
                                                      }
                                                      disabled={
                                                        messages?.filter(
                                                          (el) =>
                                                            el.message_type ==
                                                            "rating_by_mediahouse"
                                                        )?.length != 0
                                                      }
                                                    >
                                                      Submit
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start">
                                                <div className="img">
                                                  <img
                                                    src={presshopchatic}
                                                    alt="User"
                                                    className="usr_img"
                                                  />
                                                </div>
                                                <div className="cht_txt postedcmnt_info">
                                                  <div className="d-flex align-items-center">
                                                    <h5 className="usr_name mb-0">
                                                    PressHop
                                                      <span className="text-secondary time">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                  <p className="mb-0 msg auto_press_msg">
                                                    Congrats, you’ve
                                                    successfully purchased{" "}
                                                    {data?.content?.length}{" "}
                                                    content for{" "}
                                                    <a className="link">
                                                      £
                                                      {+curr?.amount +
                                                        +curr?.amount * 0.2}
                                                    </a>
                                                    . Please download the
                                                    water-mark free, and high
                                                    definition content, by
                                                    clicking below
                                                  </p>
                                                  <div className="usr_upld_opts">
                                                    <button
                                                      className="theme_btn"
                                                      onClick={() =>
                                                        DownloadContent(
                                                          data?._id
                                                        )
                                                      }
                                                    >
                                                      Download
                                                    </button>
                                                  </div>
                                                  <p className="buy_btn_txt mb-0">
                                                    Please refer to our{" "}
                                                    <a className="link">
                                                      licensing terms of usage
                                                    </a>
                                                    , and{" "}
                                                    <a className="link">
                                                      terms and conditions
                                                    </a>
                                                    . If you have any questions,
                                                    please{" "}
                                                    <a className="link">chat</a>{" "}
                                                    or{" "}
                                                    <a className="link">
                                                      contact
                                                    </a>{" "}
                                                    our helpful teams who are
                                                    available 24x7 to assist
                                                    you. Thank you.
                                                  </p>
                                                </div>
                                              </div>
                                            </>
                                          ) : curr?.message_type ==
                                            "rating_by_mediahouse" ? (
                                            <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start heart-icon">
                                              <div className="img">
                                                <img
                                                  src={presshopchatic}
                                                  alt="User"
                                                  className="usr_img"
                                                />
                                              </div>
                                              <div className="cht_txt postedcmnt_info">
                                                <div className="d-flex align-items-center">
                                                  <h5 className="usr_name mb-0">
                                                  PressHop
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt
                                                      ).format(
                                                        "h:mm A, D MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                </div>
                                                <p className="mb-0 msg auto_press_msg">
                                                  Thank you for your valuable
                                                  feedback. Your views matter a
                                                  lot to us. Thank you very much
                                                  for your business{" "}
                                                  <img src={heart} />
                                                </p>
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          );
                                        })}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="presshop" title="PressHop Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="feed_dtl_msgs presshopChatDetail dp">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select the PressHop team member
                                        you wish to speak to from the
                                        participants box on the right.{" "}
                                      </h6>
                                      <h6 className="txt_light">
                                        Once selected, please use the text box
                                        below to start chatting.{" "}
                                      </h6>
                                    </div>
                                    {showChat.presshop ? (
                                      <ChatCard
                                        senderId={senderId && senderId}
                                      />
                                    ) : (
                                      <ChatCard />
                                    )}
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                    </div>

                                    <div className="scrollHtPnts presshopChat">
                                      {adminList &&
                                        adminList
                                          .filter((obj1) =>
                                            admins.some(
                                              (obj2) =>
                                                obj1._id == obj2.userId?.id
                                            )
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  if (
                                                    admins?.some(
                                                      (el) =>
                                                        el?.userId?.id ===
                                                        curr._id
                                                    )
                                                  ) {
                                                    setSenderId(curr._id);
                                                    setShowChat({
                                                      content: false,
                                                      task: false,
                                                      presshop: true,
                                                    });
                                                  }
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span
                                                    className={
                                                      admins?.some(
                                                        (el) =>
                                                          el?.userId?.id ===
                                                          curr._id
                                                      )
                                                        ? "activeUsr"
                                                        : "InactiveUsr"
                                                    }
                                                  >
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      {admins.length === 0 &&
                                        adminList
                                          .filter(
                                            (obj1) => obj1.role === "admin"
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  setSenderId(curr._id);
                                                  setShowChat({
                                                    content: false,
                                                    task: false,
                                                    presshop: true,
                                                  });
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    // disabled={admins?.some((el) => el?.userId?.id !== curr._id)}
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span className={"activeUsr"}>
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Related content</h1>
                    <div className="d-flex align-items-center">
                      {/* <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenRecentActivity(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openRecentActivity && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                            active={relatedContentState}
                            setActive={setRelatedContentState}
                            handleCloseRecentActivity={() =>
                              setOpenRecentActivity(false)
                            }
                          />
                        )}
                      </div> */}
                      <Link
                        to={`/related-content/tags/${data?.hopper_id?._id}/${data?.category_id?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {content?.slice(0, 4).map((curr, index) => {
                      const Audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const Video = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      const Image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const Pdf = curr?.content?.filter(
                        (curr) => curr?.media_type === "pdf"
                      );
                      const Doc = curr?.content?.filter(
                        (curr) => curr?.media_type === "doc"
                      );

                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            allContent={curr?.content}
                            basketValue={curr?.basket_status}
                            basket={() => {
                              console.log("myData");
                              // handleBasket(index,curr?._id)
                              const allContent = [...content];
                              console.log("allccccc", allContent);
                              const updatedCont = allContent.map(
                                (ele, indx) => {
                                  if (index == indx) {
                                    return {
                                      ...ele,
                                      basket_status:
                                        curr.basket_status == "true"
                                          ? "false"
                                          : "true",
                                    };
                                  }
                                  return ele;
                                }
                              );

                              setRelatedContent(updatedCont);

                              const content_id = curr?._id;
                              const allContents = [...moreContent];
                              const updatedConts = allContents.map(
                                (ele, indx) => {
                                  if (content_id == ele._id) {
                                    return {
                                      ...ele,
                                      basket_status:
                                        curr.basket_status == "true"
                                          ? "false"
                                          : "true",
                                    };
                                  }
                                  return ele;
                                }
                              );
                              setMoreContent(updatedConts);
                              if (content_id == data._id) {
                                console.log("rearrangeDatta", data);
                                setData({
                                  ...data,
                                  basket_status:
                                    data?.basket_status == "true"
                                      ? "false"
                                      : "true",
                                });
                              }
                            }}
                            // postcount={curr?.content?.length}
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.thumbnail.startsWith(
                                    "https"
                                  )
                                  ? curr?.content[0]?.thumbnail
                                  : process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.content[0]?.thumbnail
                                : // ? curr?.content[0]?.watermark ||
                                //   process.env.REACT_APP_CONTENT_MEDIA +
                                //     curr?.content[0]?.thumbnail
                                curr?.content[0]?.media_type === "audio"
                                ? audioic
                                : curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.content[0]?.media
                            }
                            // feedType={contentVideo}
                            feedTag={
                              curr?.sales_prefix
                                ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
                                : curr?.content_view_type == "mostpopular"
                                ? "Most Popular"
                                : curr?.content_view_type == "mostviewed"
                                ? "Most viewed"
                                : null
                            }
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              curr?.hopper_id?.avatar_id?.avatar
                            }
                            author_Name={curr.hopper_id?.user_name}
                            fvticns={
                              curr?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            content_id={curr?._id}
                            bool_fav={
                              curr?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            favourite={() =>
                              favContentHandler(index, "related")
                            }
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr?.type}
                            feedHead={curr?.heading}
                            // feedTime={moment(curr?.createdAt).format("DD MMM YYYY")}
                            feedTime={moment(curr?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={curr?.location}
                            contentPrice={formatAmountInMillion(
                              curr?.ask_price
                            )}
                            feedTypeImg1={imageCount > 0 ? cameraic : null}
                            postcount={imageCount > 0 ? imageCount : null}
                            feedTypeImg2={videoCount > 0 ? videoic : null}
                            postcount2={videoCount > 0 ? videoCount : null}
                            feedTypeImg3={audioCount > 0 ? interviewic : null}
                            postcount3={audioCount > 0 ? audioCount : null}
                            feedTypeImg4={pdfCount > 0 ? docsic : null}
                            postcount4={pdfCount > 0 ? pdfCount : null}
                            feedTypeImg5={docCount > 0 ? docsic : null}
                            postcount5={docCount > 0 ? docCount : null}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className="feedsContainer mb-0">
                  <div className="feedContent_header">
                    <h1>More content from {hopper?.user_name}</h1>
                    <div className="d-flex align-items-center">
                      {/* <div className="fltrs_prnt me-3 ht_sort">
                        <Button
                          className="sort_btn"
                          onClick={() => {
                            setOpenMoreContent(true);
                          }}
                        >
                          Sort
                          <BsChevronDown />
                        </Button>
                        {openMoreContent && (
                          <RecentActivityDF
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                            active={moreContentState}
                            setActive={setMoreContentState}
                            handleCloseRecentActivity={() =>
                              setOpenMoreContent(false)
                            }
                          />
                        )}
                      </div> */}
                      <Link
                        to={`/more-content/${hopper?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {moreContent?.slice(0, 4)?.map((curr, index) => {
                      const Audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const Video = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      const Image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const Pdf = curr?.content?.filter(
                        (curr) => curr?.media_type === "pdf"
                      );
                      const Doc = curr?.content?.filter(
                        (curr) => curr?.media_type === "doc"
                      );

                      const imageCount = Image.length;
                      const videoCount = Video.length;
                      const audioCount = Audio.length;
                      const pdfCount = Pdf.length;
                      const docCount = Doc.length;
                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            lnkto={`/Feeddetail/content/${curr._id}`}
                            viewTransaction={"View details"}
                            viewDetail={`/Feeddetail/content/${curr._id}`}
                            feedImg={
                              curr?.content[0]?.media_type === "video"
                                ? curr?.content[0]?.thumbnail.startsWith(
                                    "https"
                                  )
                                  ? curr?.content[0]?.thumbnail
                                  : process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.content[0]?.thumbnail
                                : curr?.content[0]?.media_type === "audio"
                                ? audioic
                                : curr?.content[0]?.watermark ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                    curr?.content[0]?.media
                            }
                            feedType={contentVideo}
                            feedTag={
                              curr?.sales_prefix
                                ? `${curr?.sales_prefix} ${curr?.discount_percent}% Off`
                                : curr?.content_view_type == "mostpopular"
                                ? "Most Popular"
                                : curr?.content_view_type == "mostviewed"
                                ? "Most viewed"
                                : null
                            }
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                                curr?.hopper_id?.avatar_id?.avatar || authorimg
                            }
                            // basketValue={curr?.basket_status}
                            // basket={()=>{console.log("myData");handleBasket(index,curr?._id)}}
                            allContent={curr?.content}
                            basketValue={curr?.basket_status}
                            basket={() => {
                              console.log("myData");
                              // handleBasket(index,curr?._id)
                              const allContent = [...moreContent];
                              const updatedCont = allContent.map(
                                (ele, indx) => {
                                  if (index == indx) {
                                    return {
                                      ...ele,
                                      basket_status:
                                        curr.basket_status == "true"
                                          ? "false"
                                          : "true",
                                    };
                                  }
                                  return ele;
                                }
                              );
                              setMoreContent(updatedCont);

                              const content_id = curr?._id;
                              const allContents = [...content];
                              console.log("allccccc", allContents);
                              const updatedConts = allContents.map(
                                (ele, indx) => {
                                  if (content_id == ele._id) {
                                    return {
                                      ...ele,
                                      basket_status:
                                        curr.basket_status == "true"
                                          ? "false"
                                          : "true",
                                    };
                                  }
                                  return ele;
                                }
                              );
                              setRelatedContent(updatedConts);
                            }}
                            author_Name={curr.hopper_id?.user_name}
                            type_img={
                              curr?.type === "shared" ? shared : exclusive
                            }
                            type_tag={curr?.type}
                            feedHead={curr.heading}
                            feedTime={moment(curr?.createdAt).format(
                              "hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={curr.location}
                            contentPrice={formatAmountInMillion(curr.ask_price)}
                            content_id={curr?._id}
                            fvticns={
                              curr?.favourite_status == "true"
                                ? favouritedic
                                : favic
                            }
                            bool_fav={
                              curr.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            favourite={() => favContentHandler(index, "more")}
                            feedTypeImg1={imageCount > 0 ? cameraic : null}
                            postcount={imageCount > 0 ? imageCount : null}
                            feedTypeImg2={videoCount > 0 ? videoic : null}
                            postcount2={videoCount > 0 ? videoCount : null}
                            feedTypeImg3={audioCount > 0 ? interviewic : null}
                            postcount3={audioCount > 0 ? audioCount : null}
                            feedTypeImg4={pdfCount > 0 ? docsic : null}
                            postcount4={pdfCount > 0 ? pdfCount : null}
                            feedTypeImg5={docCount > 0 ? docsic : null}
                            postcount5={docCount > 0 ? docCount : null}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
      {/* Show Image in Chat */}
      <Modal
        show={show1}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              <img className="mdlPrevImg" src={bigData} />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={handleClose}>
              Close
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show Image in Chat */}
      <Modal
        show={preview?.modalOpen}
        onHide={handleClosePreview}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              {preview?.type === "image" ? (
                <img className="mdlPrevImg" src={preview?.path} />
              ) : preview?.type === "video" ? (
                <video
                  src={preview?.path}
                  className="msgContent"
                  controls
                ></video>
              ) : (
                ""
              )}
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={(e) => handleButtonClick(e)}>
              Send
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Feeddetail;
