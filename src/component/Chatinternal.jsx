import * as React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsMic, BsPause, BsPlay } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { ReactMic } from "react-mic-recorder";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import { useDarkMode } from "../context/DarkModeContext";
import socketServer from "../socket.config";

function Chatinternal(props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState([]);

  const [mediaFile, setMediaFile] = useState({ path: "", type: "" });

  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [bigData, setBigData] = useState("");
  const handleShow = (curr) => {
    setBigData(curr?.message), setShow1(true);
  };
  const handleClosePreview = () =>
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  const [preview, setPreview] = useState({
    type: "",
    path: "",
    modalOpen: false,
  });

  const { profileData } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    setIsRecording(false);
    try {
      if (recordedBlob?.blob) {
        const formData = new FormData();
        formData.append("path", "profileImg");
        formData.append("media", recordedBlob?.blob);
        const filePath = await Post("mediaHouse/uploadUserMedia", formData);

        console.log(
          "audio data related to this ---> ---->",
          filePath?.data?.path
        );
        if (filePath) {
          setMediaFile((prev) => ({
            ...prev,
            path: filePath?.data?.path,
            type: "audio",
          }));
        }
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("video/")) {
      // console.log("video")
      setMediaFile((pre) => ({ ...pre, type: "video" }));
      setPreview((pre) => ({ ...pre, type: "video" }));
    } else if (file.type.startsWith("image/")) {
      // console.log("image")
      setMediaFile((pre) => ({ ...pre, type: "image" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    } else if (file.type.startsWith("audio/")) {
      setMediaFile((pre) => ({ ...pre, type: "audio" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    }
    const Formdata = new FormData();
    Formdata.append("path", "profileImg");
    Formdata.append("media", file);
    const filePath = await Post("mediaHouse/uploadUserMedia", Formdata);
    if (filePath) {
      setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, modalOpen: true }));
    }
  };

  const chatBoxRef = React.useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef?.current?.scrollHeight;
    }
  };

  useEffect(() => {
    const messageContainer = document.getElementById("message-container-1");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer?.scrollHeight;
    }
    socketServer.emit("room join", { room_id: props?.room_id });
    socketServer.on("internal group chat", (data) => {
      const newMessage = data;
      if (!newMessage?.createdAt) {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
        messageContainer.scrollTop = messageContainer?.scrollHeight;
      }
    });
    return () => {
      socketServer.emit("room leave", { room_id: props?.room_id });
      socketServer.off("internal group chat");
    };
  }, [socketServer, props?.room_id, props.remove_user_id]);

  // chat messages list
  const handleButtonClick = (e) => {
    e.preventDefault();
    let messages = {
      sender_id: profileData?._id,
      room_id: props?.room_id,
      message: mediaFile?.path ? mediaFile?.path : msg,
      type: mediaFile?.type ? mediaFile?.type : "text",
      user_info: {
        profile_image: profileData?.hasOwnProperty("admin_detail")
          ? profileData?.admin_detail?.admin_profile
          : profileData?.profile_image,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
      },
    };
    console.log("chedck 2  ---->  --->", messages);
    socketServer.on("connect", () => {
      console.log("Socket connected successfully!");
    });

    socketServer.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socketServer.emit("internal group chat", messages);
    console.log("chedck 3  ---->  --->");

    setMsg("");
    setMediaFile({
      path: "",
      type: "",
    });
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  };
  const ChatList = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openChatsMH?room_id=${props?.room_id}`
      );
      if (resp) {
        setMessage(resp?.data?.response?.data);
        // scrollToBottom();
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    ChatList();
  }, [props?.room_id, props?.remove_user_id]);

  useEffect(() => {
    scrollToBottom();
  }, [message, props?.remove_user_id]);

  useEffect(() => {
    if (props?.remove_user_id) {
      ChatList();
    }
    if (props?.add_chat_user) {
      ChatList();
    }
  }, [props?.remove_user_id, props?.add_chat_user]);

  console.log("all internal 2343453message -----> ------>", message);

  return (
    <>
      {/* {console.log(mediaFile, `<<<<<<media file`)} */}
      {/* <div className="d-flex flex-row gap_20">
           
            </div> */}
      <Card className="chatmain cht_ht">
        <CardContent className="chatting">
          <div className="chatting_header">
            <p className="mb-0">Internal Chat</p>
          </div>
          <div
            className="chat_msgs_scrl"
            ref={chatBoxRef}
            id="message-container-1"
          >
            {message?.map((curr) => {
              return (
                <div className="baat_cheet" key={curr?._id}>
                  {curr?.type === "add" && curr.user_id !== profileData._id ? (
                    <p className="usrAddedTxt mb-4">
                      <span>
                        {
                          profileData?._id === curr?.sender_id?._id ? `You added ${curr?.addedMsg}` : `You have been added by ${curr?.sender_id?.full_name}`
                        }
                      </span>
                    </p>
                  ) : curr?.type == "remove" ? (
                    <p className="usrAddedTxt mb-4">
                      <span>
                        {
                          profileData?._id === curr?.sender_id?._id ? `You removed ${curr?.addedMsg}` : `You have been removed by ${curr?.sender_id?.full_name}`
                        }
                      </span>
                    </p>
                  ) : curr?.user_info && (
                    <div className="chatting_itm d-flex align-items-start">
                      <img
                        src={
                          curr.user_info
                            ? curr?.user_info?.profile_image
                            : curr?.sender_id?.profile_image
                        }
                        alt="User"
                        className="usr_img"
                      />
                      <div className="postedcmnt_info">
                        {curr?.user_info && (
                          <h5>
                            {`${curr?.user_info?.first_name} ${curr?.user_info?.last_name}`}
                            <span className="text-secondary time">
                              {moment(curr?.createdAt || curr?.chatDate).format(
                                "h:mm A, D MMM YYYY"
                              )}
                            </span>
                          </h5>
                        )}
                        <Typography className="comment_text">
                          {curr?.type === "text" && curr?.message}
                        </Typography>
                        <div onClick={() => handleShow(curr)} className="exp">
                          {curr?.type === "image" && (
                            <img src={curr?.message} className="msgContent" />
                          )}
                        </div>
                        <div>
                          {curr?.type === "video" && (
                            <video
                              src={curr?.message}
                              className="msgContent"
                              controls
                              controlsList="nodownload"
                            ></video>
                          )}
                        </div>
                        <div>
                          {curr?.type === "audio" && curr?.message && (
                            <audio
                              src={curr?.message}
                              controls
                              controlsList="nodownload"
                            >
                              Your browser does not support the audio element.
                            </audio>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <Form onSubmit={handleButtonClick}>
          <div className="chatting_type position-relative">
            <img src={userImage} alt="" className="typing_img" />
            <input
              type="text"
              className="inp_msg"
              value={msg}
              placeholder="Type here..."
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />

            <div className="chatIn-options">
              <div className="uplod-mda">
                <MdAdd />
                <input type="file" onChange={handleChange} />
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
                  <Tooltip id="overlay-example">
                    <div className="recordingPopup">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>Record audio</h5>
                        <div
                          className="close-btn clickable"
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
                      <div className="d-flex mt-3 justify-content-evenly">
                        <Button
                          className="rec_aud_btn"
                          onClick={onStartRecording}
                          disabled={isRecording}
                        >
                          {" "}
                          <BsPlay fontSize={"20px"} /> Start
                        </Button>
                        <Button
                          className="rec_aud_btn"
                          onClick={onStopRecording}
                          disabled={!isRecording}
                        >
                          {" "}
                          <BsPause fontSize={"20px"} /> Stop
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
                            setShow(!show);
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </Tooltip>
                </Overlay>
              </div>

              <span className="chatIn-send" onClick={handleButtonClick}>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </Form>
      </Card>

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
            <div className="link_white" onClick={handleButtonClick}>
              Send
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default React.memo(Chatinternal);
