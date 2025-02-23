import { Button, Card, CardContent, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import Form from "react-bootstrap/Form";
import { BsArrowRight, BsMic, BsPause, BsPlay } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import inpimg from "../assets/images/profile.webp";
// import Button from 'react-bootstrap/Button';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// import {
//     addDoc,
//     getFirestore,
//     collection,
//     deleteDoc,
//     doc,
//     setDoc,
//     updateDoc,
//   } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import moment from "moment";
import { useEffect, useState, useRef } from "react";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import presshopchatic from "../assets/images/chat_logo.png";
import dltIcn from "../assets/images/dlt.svg";

import { auth, storage } from "../firebase";
import { Get, Patch, Post } from "../services/user.services";
import Loader from "./Loader";
import { useDarkMode } from "../context/DarkModeContext";
import { Container, Dropdown, Modal, Overlay } from "react-bootstrap";
import { ReactMic } from "react-mic-recorder";
import { useLocation } from "react-router-dom";
// import io from "socket.io-client";
function ChatCard(props) {
  const [roomId, setRoomId] = useState(null);
  const [msg, setMsg] = useState(
    localStorage.getItem("contact_us_message") || ""
  );
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ ChatCard ~ messages:", messages)

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomDetails, setRoomDetails] = useState();
  console.log("🚀 ~ ChatCard ~ roomDetails:", roomDetails)
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { profileData } = useDarkMode();
  const chatBoxRef = useRef(null);

  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const [preview, setPreview] = useState({
    type: "",
    path: "",
    modalOpen: false,
  });
  const handleShow = (curr) =>
    setPreview({
      type: "",
      path: "",
      modalOpen: true,
    });

  const handleClosePreview = () =>
    setPreview({
      type: "",
      path: "",
      modalOpen: false,
    });

  // Recording -
  const [show, setShow] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const target = React.useRef(null);

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    setIsRecording(false);
    try {
      const formData = new FormData();
      formData.append("path", "profileImg");
      formData.append("media", recordedBlob?.blob);
      setLoading(true);
      const filePath = await Post("mediaHouse/uploadUserMedia", formData);
      console.log("onstop recording -------> ------. >", filePath);
      if (filePath) {
        setPreview((prev) => ({
          ...prev,
          path: filePath?.data?.path,
          type: "audio",
        }));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error uploading audio:", error);
      setLoading(false);
    }
  };

  console.log("setPreview", preview);

  // Contact us message sent on page load -
  useEffect(() => {
    if (localStorage.getItem("contact_us_message")) {
      sendMessage(msg, "text");
    }
  }, [roomDetails]);

  const Profile = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const resp = await Get(`mediaHouse/getProfile`);
      setProfileImage(resp.data.profile.admin_detail.admin_profile);
      setName(resp.data.profile.full_name);
    } catch (error) {
      setLoading(false);
    }
  };

  const CreateRoom = async () => {
    setLoading(true);
    try {
      if (localStorage.getItem("internal")) {
        setShow(false);
        const obj = {
          receiver_id: props.senderId,
          room_type: "MediahousetoAdmin",
          type: "external_content_for_admin", // Old type was - (external_content) <-- This is for content wise room, but now there will be one chat for a user.
          content_id: localStorage.getItem("internal"),
        };

        const resp = await Post(`mediaHouse/createRoom`, obj);
        setRoomDetails(resp.data.details);
        setLoading(false);
      } else {
        setShow(false);
        const obj = {
          receiver_id: props.senderId,
          room_type: "MediahousetoAdmin",
        };
        const resp = await Post(`mediaHouse/createRoom`, obj);
        setRoomDetails(resp.data.details);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const storageRef = ref(getStorage(), "thumbnails", file.name);
          uploadBytes(storageRef, blob)
            .then(() => {
              getDownloadURL(storageRef).then((downloadURL) => {
                resolve(downloadURL);
              });
            })
            .catch((error) => {
              reject(error);
            });
        }, "image/jpeg");
      };
    });
  };

  const sendMessage = async (message, messageType, thumbnailURL = "") => {
    const { uid, email } = auth.currentUser || {};
    const messageRef = collection(
      getFirestore(),
      "Chat",
      roomDetails.room_id && roomDetails.room_id,
      "Messages"
    );

    const newDoc = {
      messageId: new Date(),
      date: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      senderId: roomDetails?.sender_id,
      senderName:
        roomDetails?.senderDetails?.first_name +
        " " +
        roomDetails?.senderDetails?.last_name,
      senderImage: userImage,
      receiverId: roomDetails?.receiver_id,
      receiverName: roomDetails?.receiverDetails?.name,
      receiverImage: roomDetails?.receiverDetails?.profile_image,
      roomId: roomDetails?.room_id,
      replyMessage: "Empty Comming Soon",
      messageType: messageType,
      message: message,
      videoThumbnail: "",
      uploadPercent: 0.0,
      readStatus: "unread",
      replyType: type,
      latitude: 0.0,
      longitude: 0.0,
      isReply: "",
      isLocal: 1,
      chat_with: "presshop and admin",
      // uid,
    };

    console.log("newDoc", newDoc);

    setMsg("");
    setPreview({});
    try {
      await addDoc(messageRef, {
        messageId: new Date(),
        date: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
        senderId: roomDetails?.sender_id,
        senderName:
          roomDetails?.senderDetails?.first_name +
          " " +
          roomDetails?.senderDetails?.last_name,
        senderImage: userImage,
        receiverId: roomDetails?.receiver_id,
        receiverName: roomDetails?.receiverDetails?.name,
        receiverImage: roomDetails?.receiverDetails?.profile_image,
        roomId: roomDetails?.room_id,
        replyMessage: "Empty Comming Soon",
        messageType: messageType,
        message: message,
        videoThumbnail: "",
        uploadPercent: 0.0,
        readStatus: "unread",
        replyType: type,
        latitude: 0.0,
        longitude: 0.0,
        isReply: "",
        isLocal: 1,
        // uid,
      });
      setFile(null);
      GetMessages();
      setLastMessage(
        message,
        messageType,
        thumbnailURL,
        roomDetails?.room_id,
        newDoc
      );

      if (localStorage.getItem("contact_us_message")) {
        localStorage.removeItem("contact_us_message");
      }
    } catch (error) {
      // setLoading(false)
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const GetMessages = () => {
    if (props?.roomDetails?.room_id) {
      const messageRef = collection(
        getFirestore(),
        "Chat",
        props?.roomDetails?.room_id && props?.roomDetails?.room_id,
        "Messages"
      );
      const q = query(messageRef, orderBy("date"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
        // scrollToBottom();
      });

      return unsubscribe;
    } else if (roomDetails?.room_id) {
      const messageRef = collection(
        getFirestore(),
        "Chat",
        roomDetails?.room_id && roomDetails?.room_id,
        "Messages"
      );

      const q = query(messageRef, orderBy("date"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
        // scrollToBottom();
      });

      return unsubscribe;
    }
  };

  const handleFileChange = async (event) => {
    setLoading(true);
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);

    // Uploading of files-
    const storageRef = ref(storage, `chat/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    if (file.type.startsWith("video/")) {
      setPreview((pre) => ({
        ...pre,
        type: "video",
        path: downloadURL,
        modalOpen: true,
      }));
    } else if (file.type.startsWith("image/")) {
      setPreview((pre) => ({
        ...pre,
        type: "image",
        path: downloadURL,
        modalOpen: true,
      }));
    } else if (file.type.startsWith("audio/")) {
      setPreview((pre) => ({
        ...pre,
        type: "audio",
        path: downloadURL,
        modalOpen: true,
      }));
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (file) {
      try {
        let messageType = "";
        let thumbnailURL = "";

        if (file.type.startsWith("image/")) {
          messageType = "image";
        } else if (file.type.startsWith("video/")) {
          messageType = "video";
          // Generate the thumbnail and get the data URL
          const thumbnailDataUrl = await generateVideoThumbnail(file);
          thumbnailURL = thumbnailDataUrl;
        } else if (file.type.startsWith("audio/")) {
          messageType = "audio";
        }
        sendMessage(preview?.path, messageType, thumbnailURL);

        // setOpenModal(false);
      } catch (error) {
      } finally {
        setFile(null);
      }
    } else if (preview?.path) {
      try {
        let messageType = "";
        let thumbnailURL = "";

        messageType = "audio";
        sendMessage(preview?.path, messageType, thumbnailURL);

        // setOpenModal(false);
      } catch (error) {
      } finally {
        setFile(null);
      }
    } else if (msg.trim() !== "") {
      sendMessage(msg, "text");
    }
  };
  const handleDeleteMessage = async (messageId) => {
    try {
      console.log("message id --->", messageId);
      const messageRef = doc(
        getFirestore(),
        "Chat",
        roomDetails?.room_id,
        "Messages",
        messageId
      );
      const res = await deleteDoc(messageRef);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.log("all error --->", error);
    }
  };

  const userId = React.useMemo(() => {
    const user = localStorage.getItem('user')
    console.log("🚀 ~ userId ~ user:", user)

    return user ? JSON.parse(user)?._id : null
  }, [])
  console.log("🚀 ~ userId ~ userId:", userId)

  const handleDeleteMessageFromMe = async (messageId) => {

    if (!userId) {
      console.log("user id not found")
      return;
    }
    try {
      console.log("message id --->", messageId);
      const messageRef = doc(
        getFirestore(),
        "Chat",
        roomDetails?.room_id,
        "Messages",
        messageId
      );

      // Get the message document
      const messageSnap = await getDoc(messageRef);
      console.log("🚀 ~ handleDeleteMessageFromMe ~ messageSnap:", messageSnap)

      if (!messageSnap.exists()) {
        console.log("Message does not exist");
        return;
      }

      const messageData = messageSnap.data();
      console.log("🚀 ~ handleDeleteMessageFromMe ~ messageData:", messageData)

      // Check if 'deletedBy' field exists
      if (messageData.deletedBy && messageData.deletedBy !== userId) {
        // If already deleted by another user, delete permanently
        await deleteDoc(messageRef);
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );
      } else {
        // Soft delete: Add the user ID to 'deletedBy' field
        await updateDoc(messageRef, { deletedBy: userId });


        // Update local state to mark as deleted
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === messageId ? { ...message, deletedBy: userId } : message
          )
        );
      }
    } catch (error) {
      console.log("all error --->", error);
    }
  };


  const setLastMessage = async (
    message,
    messageType,
    thumbnailURL = "",
    roomId,
    newDoc
  ) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, "Chat", roomId);
    const updatedFields = {
      message: message,
      messageType: messageType,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      // Get the current data of the document
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await updateDoc(docRef, updatedFields);
      } else {
        await setDoc(docRef, newDoc);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSendClick = async (event) => {
    event.preventDefault();
    if (roomDetails?.room_id) {
      handleSend();
    }
    const obj = {
      admin_id: props?.senderId,
      dateAndTime: new Date().toISOString(),
    };
    const chatDataUpdate = await Patch("mediaHouse/chatdatetime", obj);
  };

  useEffect(() => {
    GetMessages();
  }, [roomDetails?.room_id]);

  useEffect(() => {
    Profile();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    CreateRoom();
  }, [props.senderId]);

  const handleSendClickandStop = () => {
    // event.preventDefault();
    if (roomDetails?.room_id) {
      handleSend();
    }
  };

  useEffect(() => {
    handleSendClickandStop();
  }, [preview]);

  console.log("message --->  --->", messages);

  //for image preview

  const [showImage, setShowImage] = useState(false);

  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => setShowImage(true);

  return (
    <>
      {loading && <Loader />}
      <Card className="chatmain cht_ht">
        <CardContent className="chatting">
          <div className="chatting_header">
            <p className="mb-0">
              {/* Presshop chat */}
              PressHop Chat
            </p>
          </div>

          <div className="chat_msgs_scrl" ref={chatBoxRef}>
            {messages?.map((curr, index) => {
              if (curr.deletedBy === userId) {
                return;
              }
              return (
                <div className="chatting_itm d-flex align-items-start">
                  <div
                    className="chat-dlt"
                  // onClick={() => handleDeleteMessage(curr?.id)}
                  // onClick={() => handleDeleteMessageFromMe(curr?.id)}
                  >
                    {/* <img src={dltIcn} alt="" /> */}

                    <Dropdown className="dltMsgBtn">
                      {/* <Dropdown.Toggle variant="light" id="dropdown-basic" className="p-0 border-0"> */}
                      <Dropdown.Toggle
                        as="button" // Use button element to avoid Bootstrap-specific styles
                        className="p-0 border-0 bg-transparent"
                        bsPrefix="custom-toggle" // Custom class to remove Bootstrap styles
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleDeleteMessageFromMe(curr?.id)
                          }
                        >
                          Delete for Me
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleDeleteMessage(curr?.id)
                          }
                        >
                          Delete for Everyone
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <img src={curr.senderImage} alt="User" className="usr_img" />
                  <div className="postedcmnt_info">
                    <h5>
                      {curr.senderName}
                      <span className="text-secondary time">
                        {moment(curr.date)
                          .add(5.5, "hour")
                          .format("h:mm A, D MMM YYYY")}
                        {/* .format(`DD MMM YYYY`)}, {moment(curr.date).add(5.5, "hour").format(`hh:mm A`)} */}
                      </span>
                    </h5>
                    <Typography className="comment_text">
                      {curr?.messageType === "text" && curr?.message}
                    </Typography>
                    <div
                      onClick={() => {
                        setPreviewImage(curr?.message);
                        handleShowImage();
                      }}
                      className="exp"
                    >
                      {curr?.messageType === "image" && (
                        <img src={curr?.message} className="msgContent" />
                      )}
                    </div>
                    <div>
                      {curr?.messageType === "video" && (
                        <video
                          src={curr?.message}
                          className="msgContent"
                          controls
                          controlsList="nodownload"
                        ></video>
                      )}
                    </div>
                    <div>
                      {curr?.messageType == "recording" && (
                        <audio
                          src={curr?.message}
                          controls
                          controlsList="nodownload"
                        ></audio>
                      )}
                    </div>
                    <div>
                      {curr?.messageType == "audio" && (
                        <audio
                          src={curr?.message}
                          controls
                          controlsList="nodownload"
                        ></audio>
                      )}
                    </div>
                  </div>
                </div>
              );
              setPreview((pre) => ({ ...pre, modalOpen: true }));
            })}
          </div>
        </CardContent>

        <Form onSubmit={handleSendClick}>
          <div className="chatting_type position-relative">
            <img src={userImage} alt="" className="typing_img" />
            <input
              type="text"
              className="inp_msg"
              value={msg}
              placeholder="Type here…"
              onChange={(e) => {
                setMsg(e.target.value);
                setType("text");
              }}
            />
            <div className="chatIn-options">
              {/* <input type='file' id="cht_add_img_presshop" className="cht_file_inp" onChange={(e) => handleFileChange(e)} /> */}
              {/* <label htmlFor="cht_add_img_presshop" className="cht_fl_inp_lbl">
                                <MdAdd className="d_flex file_add_icn" />
                            </label> */}

              {/* New code  */}
              <div className="uplod-mda">
                <MdAdd />
                <input type="file" onChange={handleFileChange} />
              </div>

              <div>
                <Button ref={target} onClick={() => setShow(!show)}>
                  <BsMic className="chatMicIcn" />
                </Button>
                <Overlay
                  target={target.current}
                  show={show}
                  placement="top"
                  className=""
                >
                  <Tooltip id="overlay-example" className="react-mic-tooltip">
                    <div className="recordingPopup">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>Record audio</h5>
                        <div
                          className="close-btn"
                          onClick={() => setShow(false)}
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
                      <div className="d-flex mt-3 justify-content-evenly clickable">
                        <Button
                          className="rec_aud_btn"
                          onClick={onStartRecording}
                          disabled={isRecording}
                        >
                          {" "}
                          <BsPlay fontSize={"20px"} />
                          Start
                        </Button>
                        {/* <Button
                          className="rec_aud_btn"
                          onClick={onStopRecording}
                          disabled={!isRecording}
                        >
                          {" "}
                          <BsPause fontSize={"20px"} /> Stop
                        </Button> */}
                        <Button
                          className="rec_aud_btn"
                          // onClick={onStopRecording}
                          disabled={!isRecording}
                        >
                          {" "}
                          <BsPause fontSize={"20px"} /> Pause
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
                            onStopRecording(e);
                            setShow((old) => !old);
                          }}
                          disabled={!isRecording}
                        >
                          {" "}
                          {/* <BsPause fontSize={"20px"} /> */}
                          Send
                        </button>
                        {/* <button
                          className="sendrecBtn"
                          onClick={(e) => {
                            handleSendClick(e);
                            setShow((old) => !old);
                          }}
                        >
                          Send
                        </button> */}
                      </div>
                    </div>
                  </Tooltip>
                </Overlay>
              </div>
              <span className="chatIn-send" onClick={handleSendClick}>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </Form>
      </Card>

      <Modal
        show={preview?.modalOpen}
        onHide={() => handleClosePreview()}
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
            onClick={(e) => {
              handleSendClick(e);
              setPreview({
                type: "",
                path: "",
                modalOpen: false,
              });
            }}
          >
            <div className="link_white">Send</div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ///react  */}

      <>
        {/* <Button variant="primary" onClick={handleShowImage}>
          Launch demo modal
        </Button> */}

        <Modal show={showImage} onHide={handleCloseImage}>
          <Modal.Header closeButton>
            <Modal.Title>Image preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{ width: "250px", height: "250px" }}
              className="border border-primary rounded rounded"
            >
              <img
                style={{ width: "100%", heigth: "100%" }}
                src={previewImage}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseImage}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleCloseImage}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
export default React.memo(ChatCard);

//   due to clubbing  i write new method in chat card

// import { Button, Card, CardContent, Tooltip, Typography } from "@mui/material";
// import * as React from "react";
// import Form from "react-bootstrap/Form";
// import { BsArrowRight, BsMic, BsPause, BsPlay } from "react-icons/bs";
// import { MdAdd } from "react-icons/md";
// import inpimg from "../assets/images/profile.webp";
// // import Button from 'react-bootstrap/Button';
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getFirestore,
//   onSnapshot,
//   orderBy,
//   query,
//   setDoc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";

// // import {
// //     addDoc,
// //     getFirestore,
// //     collection,
// //     deleteDoc,
// //     doc,
// //     setDoc,
// //     updateDoc,
// //   } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// import moment from "moment";
// import { useEffect, useState, useRef } from "react";
// // import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
// import presshopchatic from "../assets/images/chat_logo.png";
// import dltIcn from "../assets/images/dlt.svg";

// import { auth, storage } from "../firebase";
// import { Get, Post } from "../services/user.services";
// import Loader from "./Loader";
// import { useDarkMode } from "../context/DarkModeContext";
// import { Container, Modal, Overlay } from "react-bootstrap";
// import { ReactMic } from "react-mic-recorder";
// import { useLocation } from "react-router-dom";
// // import io from "socket.io-client";
// function ChatCard(props) {
//   const [roomId, setRoomId] = useState(null);
//   const [msg, setMsg] = useState(
//     localStorage.getItem("contact_us_message") || ""
//   );
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState();
//   const [profileImage, setProfileImage] = useState();
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [roomDetails, setRoomDetails] = useState();
//   const [file, setFile] = useState(null);
//   const [type, setType] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   const { profileData } = useDarkMode();
//   const chatBoxRef = useRef(null);

//   const userImage = profileData?.hasOwnProperty("admin_detail")
//     ? profileData?.admin_detail?.admin_profile
//     : profileData?.profile_image;

//   const [preview, setPreview] = useState({
//     type: "",
//     path: "",
//     modalOpen: false,
//   });
//   const handleShow = (curr) =>
//     setPreview({
//       type: "",
//       path: "",
//       modalOpen: true,
//     });

//   const handleClosePreview = () =>
//     setPreview({
//       type: "",
//       path: "",
//       modalOpen: false,
//     });

//   // Recording -
//   const [show, setShow] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const target = React.useRef(null);

//   const onStartRecording = () => {
//     setIsRecording(true);
//   };

//   const onStopRecording = async (recordedBlob) => {
//     setIsRecording(false);
//     try {
//       const formData = new FormData();
//       formData.append("path", "profileImg");
//       formData.append("media", recordedBlob?.blob);
//       setLoading(true);
//       const filePath = await Post("mediaHouse/uploadUserMedia", formData);
//       console.log("onstop recording -------> ------. >", filePath);
//       if (filePath) {
//         setPreview((prev) => ({
//           ...prev,
//           path: filePath?.data?.path,
//           type: "audio",
//         }));
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error uploading audio:", error);
//       setLoading(false);
//     }
//   };

//   console.log("setPreview", preview);

//   // Contact us message sent on page load -
//   useEffect(() => {
//     if (localStorage.getItem("contact_us_message")) {
//       sendMessage(msg, "text");
//     }
//   }, [roomDetails]);

//   const Profile = async () => {
//     setLoading(true);
//     try {
//       setLoading(false);
//       const resp = await Get(`mediaHouse/getProfile`);
//       setProfileImage(resp.data.profile.admin_detail.admin_profile);
//       setName(resp.data.profile.full_name);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const CreateRoom = async () => {
//     setLoading(true);
//     try {
//       if (localStorage.getItem("internal")) {
//         setShow(false);
//         const obj = {
//           receiver_id: props.senderId,
//           room_type: "MediahousetoAdmin",
//           type: "external_content_for_admin", // Old type was - (external_content) <-- This is for content wise room, but now there will be one chat for a user.
//           content_id: localStorage.getItem("internal"),
//         };

//         const resp = await Post(`mediaHouse/createRoom`, obj);
//         setRoomDetails(resp.data.details);
//         setLoading(false);
//       } else {
//         setShow(false);
//         const obj = {
//           receiver_id: props.senderId,
//           room_type: "MediahousetoAdmin",
//         };
//         const resp = await Post(`mediaHouse/createRoom`, obj);
//         setRoomDetails(resp.data.details);
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const generateVideoThumbnail = (file) => {
//     return new Promise((resolve, reject) => {
//       const canvas = document.createElement("canvas");
//       const video = document.createElement("video");
//       video.autoplay = true;
//       video.muted = true;
//       video.src = URL.createObjectURL(file);
//       video.onloadeddata = () => {
//         let ctx = canvas.getContext("2d");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob((blob) => {
//           const storageRef = ref(getStorage(), "thumbnails", file.name);
//           uploadBytes(storageRef, blob)
//             .then(() => {
//               getDownloadURL(storageRef).then((downloadURL) => {
//                 resolve(downloadURL);
//               });
//             })
//             .catch((error) => {
//               reject(error);
//             });
//         }, "image/jpeg");
//       };
//     });
//   };

//   const sendMessage = async (message, messageType, thumbnailURL = "") => {
//     const { uid, email } = auth.currentUser || {};
//     const messageRef = collection(
//       getFirestore(),
//       "Chat",
//       roomDetails.room_id && roomDetails.room_id,
//       "Messages"
//     );

//     const newDoc = {
//       messageId: new Date(),
//       date: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
//       senderId: roomDetails?.sender_id,
//       senderName:
//         roomDetails?.senderDetails?.first_name +
//         " " +
//         roomDetails?.senderDetails?.last_name,
//       senderImage: userImage,
//       receiverId: roomDetails?.receiver_id,
//       receiverName: roomDetails?.receiverDetails?.name,
//       receiverImage: roomDetails?.receiverDetails?.profile_image,
//       roomId: roomDetails?.room_id,
//       replyMessage: "Empty Comming Soon",
//       messageType: messageType,
//       message: message,
//       videoThumbnail: "",
//       uploadPercent: 0.0,
//       readStatus: "unread",
//       replyType: type,
//       latitude: 0.0,
//       longitude: 0.0,
//       isReply: "",
//       isLocal: 1,
//       chat_with: "presshop and admin",
//       // uid,
//     };

//     console.log("newDoc", newDoc);

//     setMsg("");
//     setPreview({});
//     try {
//       await addDoc(messageRef, {
//         messageId: new Date(),
//         date: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
//         newdate: new Date(),
//         senderId: roomDetails?.sender_id,
//         senderName:
//           roomDetails?.senderDetails?.first_name +
//           " " +
//           roomDetails?.senderDetails?.last_name,
//         senderImage: userImage,
//         receiverId: roomDetails?.receiver_id,
//         receiverName: roomDetails?.receiverDetails?.name,
//         receiverImage: roomDetails?.receiverDetails?.profile_image,
//         roomId: roomDetails?.room_id,
//         replyMessage: "Empty Comming Soon",
//         messageType: messageType,
//         message: message,
//         videoThumbnail: "",
//         uploadPercent: 0.0,
//         readStatus: "unread",
//         replyType: type,
//         latitude: 0.0,
//         longitude: 0.0,
//         isReply: "",
//         isLocal: 1,
//         // uid,
//       });
//       setFile(null);
//       GetMessages();
//       setLastMessage(
//         message,
//         messageType,
//         thumbnailURL,
//         roomDetails?.room_id,
//         newDoc
//       );

//       if (localStorage.getItem("contact_us_message")) {
//         localStorage.removeItem("contact_us_message");
//       }
//     } catch (error) {
//       // setLoading(false)
//     }
//   };

//   const scrollToBottom = () => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   };

//   const GetMessages = () => {
//     if (props?.roomDetails?.room_id) {
//       const messageRef = collection(
//         getFirestore(),
//         "Chat",
//         props?.roomDetails?.room_id && props?.roomDetails?.room_id,
//         "Messages"
//       );
//       const q = query(messageRef, orderBy("date"));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const newMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(newMessages);
//         // scrollToBottom();
//       });

//       return unsubscribe;
//     } else if (roomDetails?.room_id) {
//       const messageRef = collection(
//         getFirestore(),
//         "Chat",
//         roomDetails?.room_id && roomDetails?.room_id,
//         "Messages"
//       );

//       const q = query(messageRef, orderBy("date"));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const newMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(newMessages);
//         // scrollToBottom();
//       });

//       return unsubscribe;
//     }
//   };

//   const handleFileChange = async (event) => {
//     setLoading(true);
//     event.preventDefault();
//     const file = event.target.files[0];
//     setFile(file);

//     // Uploading of files-
//     const storageRef = ref(storage, `chat/${file.name}`);
//     const snapshot = await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(snapshot.ref);

//     if (file.type.startsWith("video/")) {
//       setPreview((pre) => ({
//         ...pre,
//         type: "video",
//         path: downloadURL,
//         modalOpen: true,
//       }));
//     } else if (file.type.startsWith("image/")) {
//       setPreview((pre) => ({
//         ...pre,
//         type: "image",
//         path: downloadURL,
//         modalOpen: true,
//       }));
//     } else if (file.type.startsWith("audio/")) {
//       setPreview((pre) => ({
//         ...pre,
//         type: "audio",
//         path: downloadURL,
//         modalOpen: true,
//       }));
//     }
//     setLoading(false);
//   };

//   const handleSend = async () => {
//     if (file) {
//       try {
//         let messageType = "";
//         let thumbnailURL = "";

//         if (file.type.startsWith("image/")) {
//           messageType = "image";
//         } else if (file.type.startsWith("video/")) {
//           messageType = "video";
//           // Generate the thumbnail and get the data URL
//           const thumbnailDataUrl = await generateVideoThumbnail(file);
//           thumbnailURL = thumbnailDataUrl;
//         } else if (file.type.startsWith("audio/")) {
//           messageType = "audio";
//         }
//         sendMessage(preview?.path, messageType, thumbnailURL);

//         // setOpenModal(false);
//       } catch (error) {
//       } finally {
//         setFile(null);
//       }
//     } else if (preview?.path) {
//       try {
//         let messageType = "";
//         let thumbnailURL = "";

//         messageType = "audio";
//         sendMessage(preview?.path, messageType, thumbnailURL);

//         // setOpenModal(false);
//       } catch (error) {
//       } finally {
//         setFile(null);
//       }
//     } else if (msg.trim() !== "") {
//       sendMessage(msg, "text");
//     }
//   };
//   const handleDeleteMessage = async (messageId) => {
//     try {
//       console.log("message id --->", messageId);
//       const messageRef = doc(
//         getFirestore(),
//         "Chat",
//         roomDetails?.room_id,
//         "Messages",
//         messageId
//       );
//       const res = await deleteDoc(messageRef);
//       setMessages((prevMessages) =>
//         prevMessages.filter((message) => message.id !== messageId)
//       );
//     } catch (error) {
//       console.log("all error --->", error);
//     }
//   };

//   const setLastMessage = async (
//     message,
//     messageType,
//     thumbnailURL = "",
//     roomId,
//     newDoc
//   ) => {
//     const firestore = getFirestore();
//     const docRef = doc(firestore, "Chat", roomId);
//     const updatedFields = {
//       message: message,
//       messageType: messageType,
//       date: new Date().toISOString().slice(0, 19).replace("T", " "),
//     };

//     try {
//       // Get the current data of the document
//       const docSnapshot = await getDoc(docRef);
//       if (docSnapshot.exists()) {
//         await updateDoc(docRef, updatedFields);
//       } else {
//         await setDoc(docRef, newDoc);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleSendClick = (event) => {
//     event.preventDefault();
//     if (roomDetails?.room_id) {
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     GetMessages();
//   }, [roomDetails?.room_id]);

//   useEffect(() => {
//     Profile();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     CreateRoom();
//   }, [props.senderId]);

//   const handleSendClickandStop = () => {
//     // event.preventDefault();
//     if (roomDetails?.room_id) {
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     handleSendClickandStop();
//   }, [preview]);

//   console.log("message --->  --->", messages);

//   //for image preview

//   const [showImage, setShowImage] = useState(false);

//   const handleCloseImage = () => setShowImage(false);
//   const handleShowImage = () => setShowImage(true);
//   const sortMessagesByDate = (messages) => {
//     return messages.sort((a, b) => {
//       try {
//         // Function to convert various date formats to moment object
//         const toMoment = (dateValue) => {
//           if (!dateValue) return moment(0); // Invalid date

//           // Handle Firebase Timestamp
//           if (dateValue.seconds) {
//             return moment(dateValue.seconds * 1000).add(5.5, "hour");
//           }

//           // Handle regular date string
//           return moment(dateValue).add(5.5, "hour");
//         };

//         const timestampA = toMoment(a.date);
//         const timestampB = toMoment(b.date);

//         if (!timestampA.isValid() || !timestampB.isValid()) {
//           console.warn("Invalid timestamp found:", {
//             dateA: a.date,
//             dateB: b.date,
//             validA: timestampA.isValid(),
//             validB: timestampB.isValid(),
//           });
//           return 0;
//         }

//         returntimestampA.valueOf() - timestampB.valueOf();
//       } catch (error) {
//         console.warn("Error sorting timestamps:", error, {
//           dateA: a.date,
//           dateB: b.date,
//         });
//         return 0;
//       }
//     });
//   };
//   console.log("all message-rytrytry--> --->", sortMessagesByDate(messages));
//   return (
//     <>
//       {loading && <Loader />}
//       <Card className="chatmain cht_ht">
//         <CardContent className="chatting">
//           <div className="chatting_header">
//             <p className="mb-0">
//               {/* Presshop chat */}
//               Presshop Chat
//             </p>
//           </div>

//           <div className="chat_msgs_scrl" ref={chatBoxRef}>
//             {sortMessagesByDate(messages).map((curr, index) => {
//               return (
//                 <div className="chatting_itm d-flex align-items-start">
//                   <div
//                     className="chat-dlt"
//                     onClick={() => handleDeleteMessage(curr?.id)}
//                   >
//                     <img src={dltIcn} alt="" />
//                   </div>
//                   <img src={curr.senderImage} alt="User" className="usr_img" />
//                   <div className="postedcmnt_info">
//                     <h5>
//                       {curr.senderName}
//                       <span className="text-secondary time">
//                         {moment(curr.date)
//                           .add(5.5, "hour")
//                           .format("h:mm A, DD MMM YYYY")}
//                         {/* .format(`DD MMM YYYY`)}, {moment(curr.date).add(5.5, "hour").format(`hh:mm A`)} */}
//                       </span>
//                     </h5>
//                     <Typography className="comment_text">
//                       {curr?.messageType === "text" && curr?.message}
//                     </Typography>
//                     <div
//                       onClick={() => {
//                         setPreviewImage(curr?.message);
//                         handleShowImage();
//                       }}
//                       className="exp"
//                     >
//                       {curr?.messageType === "image" && (
//                         <img src={curr?.message} className="msgContent" />
//                       )}
//                     </div>
//                     <div>
//                       {curr?.messageType === "video" && (
//                         <video
//                           src={curr?.message}
//                           className="msgContent"
//                           controls
//                           controlsList="nodownload"
//                         ></video>
//                       )}
//                     </div>
//                     <div>
//                       {curr?.messageType == "recording" && (
//                         <audio
//                           src={curr?.message}
//                           controls
//                           controlsList="nodownload"
//                         ></audio>
//                       )}
//                     </div>
//                     <div>
//                       {curr?.messageType == "audio" && (
//                         <audio
//                           src={curr?.message}
//                           controls
//                           controlsList="nodownload"
//                         ></audio>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//               setPreview((pre) => ({ ...pre, modalOpen: true }));
//             })}
//           </div>
//         </CardContent>

//         <Form onSubmit={handleSendClick}>
//           <div className="chatting_type position-relative">
//             <img src={userImage} alt="" className="typing_img" />
//             <input
//               type="text"
//               className="inp_msg"
//               value={msg}
//               placeholder="Type here…"
//               onChange={(e) => {
//                 setMsg(e.target.value);
//                 setType("text");
//               }}
//             />
//             <div className="chatIn-options">
//               {/* <input type='file' id="cht_add_img_presshop" className="cht_file_inp" onChange={(e) => handleFileChange(e)} /> */}
//               {/* <label htmlFor="cht_add_img_presshop" className="cht_fl_inp_lbl">
//                                 <MdAdd className="d_flex file_add_icn" />
//                             </label> */}

//               {/* New code  */}
//               <div className="uplod-mda">
//                 <MdAdd />
//                 <input type="file" onChange={handleFileChange} />
//               </div>

//               <div>
//                 <Button ref={target} onClick={() => setShow(!show)}>
//                   <BsMic className="chatMicIcn" />
//                 </Button>
//                 <Overlay
//                   target={target.current}
//                   show={show}
//                   placement="top"
//                   className=""
//                 >
//                   <Tooltip id="overlay-example" className="react-mic-tooltip">
//                     <div className="recordingPopup">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h5>Record Audio</h5>
//                         <div
//                           className="close-btn"
//                           onClick={() => setShow(false)}
//                         >
//                           <svg
//                             width="13"
//                             height="13"
//                             viewBox="0 0 13 13"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M1.34277 1L11.3165 12"
//                               stroke="black"
//                               stroke-width="2"
//                               stroke-linecap="round"
//                               stroke-linejoin="round"
//                             />
//                             <path
//                               d="M1.34277 12L11.3165 1"
//                               stroke="black"
//                               stroke-width="2"
//                               stroke-linecap="round"
//                               stroke-linejoin="round"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                       <div className="d-flex mt-3 justify-content-evenly clickable">
//                         <Button
//                           className="rec_aud_btn"
//                           onClick={onStartRecording}
//                           disabled={isRecording}
//                         >
//                           {" "}
//                           <BsPlay fontSize={"20px"} /> Start
//                         </Button>
//                         {/* <Button
//                           className="rec_aud_btn"
//                           onClick={onStopRecording}
//                           disabled={!isRecording}
//                         >
//                           {" "}
//                           <BsPause fontSize={"20px"} /> Stop
//                         </Button> */}
//                         <Button
//                           className="rec_aud_btn"
//                           // onClick={onStopRecording}
//                           disabled={!isRecording}
//                         >
//                           {" "}
//                           <BsPause fontSize={"20px"} /> Pause
//                         </Button>
//                       </div>
//                       <div>
//                         <ReactMic
//                           record={isRecording}
//                           className="sound-wave w-100 my-2"
//                           onStop={onStopRecording}
//                         />
//                       </div>
//                       <div className="text-end">
//                         <Button
//                           className="rec_aud_btn"
//                           onClick={(e) => {
//                             onStopRecording(e);
//                             setShow((old) => !old);
//                           }}
//                           disabled={!isRecording}
//                         >
//                           {" "}
//                           <BsPause fontSize={"20px"} />
//                           send
//                         </Button>
//                         {/* <button
//                           className="sendrecBtn"
//                           onClick={(e) => {
//                             handleSendClick(e);
//                             setShow((old) => !old);
//                           }}
//                         >
//                           Send
//                         </button> */}
//                       </div>
//                     </div>
//                   </Tooltip>
//                 </Overlay>
//               </div>
//               <span className="chatIn-send" onClick={handleSendClick}>
//                 <BsArrowRight />
//               </span>
//             </div>
//           </div>
//         </Form>
//       </Card>

//       <Modal
//         show={preview?.modalOpen}
//         onHide={() => handleClosePreview()}
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
//             onClick={(e) => {
//               handleSendClick(e);
//               setPreview({
//                 type: "",
//                 path: "",
//                 modalOpen: false,
//               });
//             }}
//           >
//             <div className="link_white">Send</div>
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ///react  */}

//       <>
//         {/* <Button variant="primary" onClick={handleShowImage}>
//           Launch demo modal
//         </Button> */}

//         <Modal show={showImage} onHide={handleCloseImage}>
//           <Modal.Header closeButton>
//             <Modal.Title>Image preview</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div
//               style={{ width: "250px", height: "250px" }}
//               className="border border-primary rounded rounded"
//             >
//               <img
//                 style={{ width: "100%", heigth: "100%" }}
//                 src={previewImage}
//               />
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseImage}>
//               Close
//             </Button>
//             {/* <Button variant="primary" onClick={handleCloseImage}>
//               Save Changes
//             </Button> */}
//           </Modal.Footer>
//         </Modal>
//       </>
//     </>
//   );
// }
// export default React.memo(ChatCard);
