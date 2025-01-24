import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import dayjs from "dayjs";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import { toast } from "react-toastify";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "../component/Loader";
import MarkPin from "../component/MarkPin";
import { Slide } from "react-toastify";
import { successToasterFun } from "../component/commonFunction";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const AddBroadcastTask = (props) => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const searchBoxRefStreet = useRef(null);
  const Local_ID = localStorage.getItem("id");
  const [end_date, setEnd_date] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [categories, setCategories] = useState([]);
  const minTime = dayjs()
    .set("hour", new Date().getHours())
    .set("minute", new Date().getMinutes() + 30);
  const [loading, setLoading] = useState(false);

  const [street_address, setstreet_address] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selectedTime, setSelectedTime] = useState("");
  const [timeError, setTimeError] = useState(null);

  // const handleTimeChange = (time) => {
  //   setTimeError(null);
  //   const selected = moment(time.$d);
  //   const nowPlus30 = moment().add(30, 'minute');

  //   if (selected.isBefore(nowPlus30)) {
  //     setTimeError('Please select a time at least 30 minutes from now');
  //   } else {
  //     setSelectedTime(time);
  //     setEnd_time(selected.format('HH:mm'));
  //   }
  // };

  const handleTimeChange = (time) => {
    setTimeError(null); // Reset error initially
    const selected = moment(time.$d);
    const nowPlus30 = moment().add(30, "minute"); // Current time + 30 mins

    // Check if selected time is before now + 30 minutes when today is selected

    if (
      end_date === moment().format("YYYY-MM-DD") &&
      selected.isBefore(nowPlus30)
    ) {
      setTimeError("Please select a time at least 30 minutes from now");
    } else {
      setSelectedTime(time);
      setEnd_time(selected.format("HH:mm"));
    }
  };

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const [details, setDetails] = useState({
    apartment: "",
    mediahouse_id: Local_ID,
    deadline_date: "",
    task_description: "",
    any_spcl_req: "",
    location: "",
    address_location: {
      coordinates: [0, 0],
    },
    need_photos: false,
    photo_price: "",
    need_videos: false,
    videos_price: "",
    need_interview: false,
    interview_price: "",
    category_id: "option1",
    heading: "",
  });

  const [show, setShow] = useState(props.isOpen);
  const [value, setValue] = React.useState(dayjs(new Date()));

  // const [markerPosition, setMarkerPosition] = useState(null);

  // const handleMapClick = (event) => {
  //   // console.log(event, `<-----what is here`)
  //   const lat = event.latLng.lat();
  //   const lng = event.latLng.lng();

  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ location: { lat, lng } }, (place, status) => {
  //     if (status === "OK") {
  //       setDetails((prev) => ({
  //         ...prev,
  //         location: place[0].formatted_address,
  //       }));
  //       setDetails((prev) => ({
  //         ...prev,
  //         address_location: {
  //           coordinates: [
  //             place[0].geometry.location.lat(),
  //             place[0].geometry.location.lng(),
  //           ],
  //         },
  //       }));
  //     } else {
  //       // console.log(`Geocoder failed due to: ${status}`);
  //     }
  //   });
  //   setMarkerPosition({ lat, lng });
  // };

  // const handleMarkerDragEnd = (event) => {
  //   const lat = event.latLng.lat();
  //   const lng = event.latLng.lng();

  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ location: { lat, lng } }, (place, status) => {
  //     if (status === "OK") {
  //       setDetails((prev) => ({
  //         ...prev,
  //         location: place[0].formatted_address,
  //       }));
  //       setDetails((prev) => ({
  //         ...prev,
  //         address_location: {
  //           coordinates: [
  //             place[0].geometry.location.lat(),
  //             place[0].geometry.location.lng(),
  //           ],
  //         },
  //       }));
  //     } else {
  //       // console.log(`Geocoder failed due to: ${status}`);
  //     }
  //   });

  //   setMarkerPosition({ lat, lng });
  // };

  const handleClose = () => {
    setShow(false);
    props.show();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleStreetChange = (e) => {
    setstreet_address(e.target.value);
  };

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  // const handlePopupClose = () => {
  //   setShowPopup(false);
  // };

  const onMapLoadStreet = (map) => {
    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRefStreet.current
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const loc = places[0].formatted_address;

      setstreet_address(loc);

      setDetails((prev) => ({
        ...prev,
        location: places[0].formatted_address,
        address_location: {
          coordinates: [
            places[0].geometry.location.lat(),
            places[0].geometry.location.lng(),
          ],
        },
      }));
    });
  };

  const [error, setError] = useState({
    apartment: "",
  });

  function isWithin24Hours(dateString) {
    // Convert the input string to a Date object
    const givenDate = new Date(dateString);

    // Get current date/time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(now - givenDate);

    // Convert 24 hours to milliseconds (24 * 60 * 60 * 1000)
    const hours24 = 24 * 60 * 60 * 1000;

    // Return true if difference is less than 24 hours
    return diffInMs < hours24;
  }

  // Example usage:
  // Will return true or false

  // const PostTask = async (e) => {
  //   e.preventDefault();
  //   try {
  //     details.deadline_date = new Date(`${end_date}T${end_time}`);
  //     console.log("check 123 ---->1", end_date, end_time, selectedTime.$d);
  //     const date = new Date(selectedTime.$d);
  //     console.log(
  //       "deadline date ----> --->",
  //       new Date(`${end_date}T${end_time}`)
  //     );
  //     // Option 1: Use toLocaleTimeString (easiest)
  //     const time = date.toLocaleTimeString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     });
  //     console.log("Time:", time);

  //     const inputDateTimeStr = end_date + " " + time;
  //     console.log(isWithin24Hours(inputDateTimeStr));
  //     if (isWithin24Hours(inputDateTimeStr)) {
  //       toast.error(
  //         "Scheduling a task?Please allow 24 hours for proper planning and execution. Thank you"
  //       );
  //       return;
  //     }
  //     // if (end_date === moment().format('YYYY-MM-DD') && selected.isBefore(nowPlus30)) {
  //     //   console.log("check 123 ---->2")
  //     //   setTimeError('Please select a time at least 30 minutes from now');
  //     //   return
  //     // }
  //     // console.log("check 123 ---->3")

  //     if (
  //       !details.need_interview &&
  //       !details.need_videos &&
  //       !details.need_photos
  //     ) {
  //       toast.error("Select Atleast One Task");
  //     } else if (details.category_id === "option1") {
  //       toast.error("Select Category");
  //     } else if (end_date === "") {
  //       console.log("check 123 ---->4");

  //       toast.error("Select Date");
  //     } else if (end_time === "") {
  //       console.log("check 123 ---->5");

  //       toast.error("Select Time");
  //     } else if (details.location === "") {
  //       toast.error("Select Location");
  //     } else if (details.apartment == "") {
  //       return setError({ ...error, apartment: "Required" });
  //     } else if (timeError) {
  //       return successToasterFun(timeError);
  //     } else {
  //       console.log("success login");
  //       setLoading(true);
  //       details.hopper_photo_price = details?.photo_price
  //         ? details.photo_price
  //         : "";
  //       details.hopper_videos_price = details?.videos_price
  //         ? details.videos_price
  //         : "";
  //       details.hopper_interview_price = details?.interview_price
  //         ? details.interview_price
  //         : "";

  //       let broadCasted_task = details;

  //       broadCasted_task.photo_price = details?.photo_price
  //         ? details.photo_price * (80 / 100)
  //         : "";
  //       broadCasted_task.videos_price = details?.videos_price
  //         ? details.videos_price * (80 / 100)
  //         : "";
  //       broadCasted_task.interview_price = details?.interview_price
  //         ? details.interview_price * (80 / 100)
  //         : "";

  //       console.log("all details abot task ----> --->", broadCasted_task);
  //       const resp = await Post("mediaHouse/createTask", broadCasted_task);
  //       if (resp) {
  //         handleClose();
  //         successToasterFun("Your task is successfully broadcasted. Cheers");
  //         props.show();
  //         setLoading(false);
  //         setDetails({
  //           mediahouse_id: Local_ID,
  //           deadline_date: "",
  //           task_description: "",
  //           any_spcl_req: "",
  //           location: "",
  //           latitude: "",
  //           longitude: "",
  //           need_photos: false,
  //           photo_price: "",
  //           need_videos: false,
  //           videos_price: "",
  //           need_interview: false,
  //           interview_price: "",
  //           category_id: "option1",
  //           heading: "",
  //         });
  //         setEnd_date("");
  //         setEnd_time("");
  //         setTimeError(null);
  //       }
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error, "error.message");
  //   }
  // };
  const PostTask = async (e) => {
    e.preventDefault();
    try {
      // Set deadline date and validate inputs
      details.deadline_date = new Date(`${end_date}T${end_time}`);
      console.log("check 123 ---->1", end_date, end_time, selectedTime.$d);

      const date = new Date(selectedTime.$d);
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const inputDateTimeStr = end_date + " " + time;
      console.log(isWithin24Hours(inputDateTimeStr));

      if (isWithin24Hours(inputDateTimeStr)) {
        toast.error(
          "Scheduling a task? Please allow 24 hours for proper planning and execution. Thank you"
        );
        return;
      }

      // Validation checks
      if (
        !details.need_interview &&
        !details.need_videos &&
        !details.need_photos
      ) {
        toast.error("Select Atleast One Task");
      } else if (details.category_id === "option1") {
        toast.error("Select Category");
      } else if (end_date === "") {
        toast.error("Select Date");
      } else if (end_time === "") {
        toast.error("Select Time");
      } else if (details.location === "") {
        toast.error("Select Location");
      } else if (details.apartment === "") {
        setError({ ...error, apartment: "Required" });
      } else if (timeError) {
        successToasterFun(timeError);
      } else {
        console.log("success login");
        setLoading(true);

        // Start with broadCasted_task as a copy of details
        let broadCasted_task = { ...details };

        // Assign properties to broadCasted_task
        broadCasted_task.hopper_photo_price = details?.photo_price || "";
        broadCasted_task.hopper_videos_price = details?.videos_price || "";
        broadCasted_task.hopper_interview_price =
          details?.interview_price || "";

        // Perform calculations
        broadCasted_task.photo_price = details?.photo_price
          ? details.photo_price * (80 / 100)
          : "";
        broadCasted_task.videos_price = details?.videos_price
          ? details.videos_price * (80 / 100)
          : "";
        broadCasted_task.interview_price = details?.interview_price
          ? details.interview_price * (80 / 100)
          : "";

        console.log("all details about task ---->", broadCasted_task);

        // Post the task
        const resp = await Post("mediaHouse/createTask", broadCasted_task);
        if (resp) {
          handleClose();
          successToasterFun("Your task is successfully broadcasted. Cheers");
          props.show();
          setLoading(false);

          // Reset state
          setDetails({
            mediahouse_id: Local_ID,
            deadline_date: "",
            task_description: "",
            any_spcl_req: "",
            location: "",
            latitude: "",
            longitude: "",
            need_photos: false,
            photo_price: "",
            need_videos: false,
            videos_price: "",
            need_interview: false,
            interview_price: "",
            category_id: "option1",
            heading: "",
          });
          setEnd_date("");
          setEnd_time("");
          setTimeError(null);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error.message");
    }
  };

  const Categories = async () => {
    const resp = await Get(`mediaHouse/getCategoryType?type=content`);
    // console.log(resp, ",------resp");
    setCategories(resp.data.data);
  };

  useEffect(() => {
    Categories();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Modal
        className="broadcastTaskModal"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Broadcast task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={PostTask} className="add_tsk_frm">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 timeDate_field">
                  <Form.Label>Choose date</Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      className="tsk_time_inp"
                      inputFormat="DD/MM/YYYY"
                      // value={value}
                      // minDate={new Date()}
                      minDate={dayjs().add(1, "day")}
                      value={end_date}
                      onChange={(e) => {
                        if (e !== null) {
                          setEnd_date(moment(e.$d).format("YYYY-MM-DD"));
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} error={false} />
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 timeDate_field">
                  <Form.Label>Deadline</Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <TimePicker
                      className="tsk_time_inp"
                      value={selectedTime}
                      onChange={(e) => {
                        if (e !== null) {
                          setEnd_time(moment(e.$d).format("HH:mm"));
                          handleTimeChange(e);
                        }
                      }}
                      ampm={true}
                      minTime={
                        end_date === moment(new Date()).format("YYYY-MM-DD") &&
                        minTime
                      }
                      // disabled={!end_date}
                      // renderInput={(params) => (
                      //   <TextField
                      //     {...params}
                      //     error={false}
                      //     placeholder="HH:MM"
                      //     readonly
                      //   />
                      // )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={false}
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "HH:MM", // Override the placeholder
                            readOnly: true, // Ensure the input is read-only
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Headline</Form.Label>
                  <div className="placeholder_icons">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.58901 0.693055L14.6514 2.94108C16.11 3.5846 16.11 4.64855 14.6514 5.29206L9.58901 7.54009C9.01414 7.79749 8.07031 7.79749 7.49543 7.54009L2.43309 5.29206C0.974451 4.64855 0.974451 3.5846 2.43309 2.94108L7.49543 0.693055C8.07031 0.435648 9.01414 0.435648 9.58901 0.693055Z"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 7.62598C1 8.34672 1.54056 9.179 2.20123 9.47073L8.02722 12.062C8.47339 12.2593 8.97962 12.2593 9.41721 12.062L15.2432 9.47073C15.9039 9.179 16.4444 8.34672 16.4444 7.62598"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 11.916C1 12.714 1.47191 13.4347 2.20123 13.7608L8.02722 16.352C8.47339 16.5493 8.97962 16.5493 9.41721 16.352L15.2432 13.7608C15.9725 13.4347 16.4444 12.714 16.4444 11.916"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <Form.Control
                      as="textarea"
                      required
                      name="heading"
                      value={details.heading}
                      onChange={handleChange}
                      placeholder="Please enter headline"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Describe the task</Form.Label>
                  <div className="placeholder_icons">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.58901 0.693055L14.6514 2.94108C16.11 3.5846 16.11 4.64855 14.6514 5.29206L9.58901 7.54009C9.01414 7.79749 8.07031 7.79749 7.49543 7.54009L2.43309 5.29206C0.974451 4.64855 0.974451 3.5846 2.43309 2.94108L7.49543 0.693055C8.07031 0.435648 9.01414 0.435648 9.58901 0.693055Z"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 7.62598C1 8.34672 1.54056 9.179 2.20123 9.47073L8.02722 12.062C8.47339 12.2593 8.97962 12.2593 9.41721 12.062L15.2432 9.47073C15.9039 9.179 16.4444 8.34672 16.4444 7.62598"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 11.916C1 12.714 1.47191 13.4347 2.20123 13.7608L8.02722 16.352C8.47339 16.5493 8.97962 16.5493 9.41721 16.352L15.2432 13.7608C15.9725 13.4347 16.4444 12.714 16.4444 11.916"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <Form.Control
                      as="textarea"
                      value={details.task_description}
                      required
                      rows={5}
                      name="task_description"
                      onChange={handleChange}
                      placeholder="Please describe the task in details e.g. Pictures and videos needed of the chief guest and other models at the London fashion show"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Special requirements if any</Form.Label>
                  <div className="placeholder_icons">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.58901 0.693055L14.6514 2.94108C16.11 3.5846 16.11 4.64855 14.6514 5.29206L9.58901 7.54009C9.01414 7.79749 8.07031 7.79749 7.49543 7.54009L2.43309 5.29206C0.974451 4.64855 0.974451 3.5846 2.43309 2.94108L7.49543 0.693055C8.07031 0.435648 9.01414 0.435648 9.58901 0.693055Z"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 7.62598C1 8.34672 1.54056 9.179 2.20123 9.47073L8.02722 12.062C8.47339 12.2593 8.97962 12.2593 9.41721 12.062L15.2432 9.47073C15.9039 9.179 16.4444 8.34672 16.4444 7.62598"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 11.916C1 12.714 1.47191 13.4347 2.20123 13.7608L8.02722 16.352C8.47339 16.5493 8.97962 16.5493 9.41721 16.352L15.2432 13.7608C15.9725 13.4347 16.4444 12.714 16.4444 11.916"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <Form.Control
                      as="textarea"
                      name="any_spcl_req"
                      value={details.any_spcl_req}
                      onChange={handleChange}
                      placeholder="Please use flash while taking photos, or ask these following questions during the interview, etc"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 form-group">
                  <Form.Label>Enter Location</Form.Label>
                  <div className="placeholder_icons">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.42053 6.86679C4.42053 5.44012 5.58053 4.29346 7.00053 4.29346C8.42053 4.29346 9.58053 5.44679 9.58053 6.87346C9.58053 8.30012 8.42053 9.44679 7.00053 9.44679C5.58053 9.44679 4.42053 8.29346 4.42053 6.86679ZM5.42053 6.87346C5.42053 7.74679 6.1272 8.45346 7.00053 8.45346C7.87387 8.45346 8.58053 7.74679 8.58053 6.87346C8.58053 6.00012 7.8672 5.29346 7.00053 5.29346C6.13387 5.29346 5.42053 6.00012 5.42053 6.87346Z"
                        fill="#7D8D8B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.24642 14.0602C2.27975 12.1668 0.106418 9.14683 0.926418 5.5535C1.66642 2.2935 4.51308 0.833496 6.99975 0.833496C6.99975 0.833496 6.99975 0.833496 7.00642 0.833496C9.49308 0.833496 12.3398 2.2935 13.0798 5.56016C13.8931 9.1535 11.7198 12.1668 9.75308 14.0602C8.97975 14.8002 7.98642 15.1735 6.99975 15.1735C6.01308 15.1735 5.01975 14.8002 4.24642 14.0602ZM1.90642 5.7735C1.18642 8.9135 3.15975 11.6202 4.94642 13.3335C6.09975 14.4468 7.90642 14.4468 9.05975 13.3335C10.8398 11.6202 12.8131 8.9135 12.1064 5.7735C11.4398 2.86683 8.93975 1.8335 6.99975 1.8335C5.05975 1.8335 2.56642 2.86683 1.90642 5.7735Z"
                        fill="#7D8D8B"
                      />
                    </svg>
                    <input
                      placeholder="Enter Apartment number/Building name "
                      className="tsk_loc_inp form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setError({ ...error, apartment: "" });
                      }}
                      name="apartment"
                      value={details.apartment}
                    />
                    {error.apartment ? (
                      <span
                        style={{ color: "red" }}
                        className="eml_txt_dngr error_message"
                      >
                        {error.apartment}
                      </span>
                    ) : null}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 form-group">
                  <Form.Label style={{ visibility: "hidden" }}>.</Form.Label>
                  <div className="placeholder_icons">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.42053 6.86679C4.42053 5.44012 5.58053 4.29346 7.00053 4.29346C8.42053 4.29346 9.58053 5.44679 9.58053 6.87346C9.58053 8.30012 8.42053 9.44679 7.00053 9.44679C5.58053 9.44679 4.42053 8.29346 4.42053 6.86679ZM5.42053 6.87346C5.42053 7.74679 6.1272 8.45346 7.00053 8.45346C7.87387 8.45346 8.58053 7.74679 8.58053 6.87346C8.58053 6.00012 7.8672 5.29346 7.00053 5.29346C6.13387 5.29346 5.42053 6.00012 5.42053 6.87346Z"
                        fill="#7D8D8B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.24642 14.0602C2.27975 12.1668 0.106418 9.14683 0.926418 5.5535C1.66642 2.2935 4.51308 0.833496 6.99975 0.833496C6.99975 0.833496 6.99975 0.833496 7.00642 0.833496C9.49308 0.833496 12.3398 2.2935 13.0798 5.56016C13.8931 9.1535 11.7198 12.1668 9.75308 14.0602C8.97975 14.8002 7.98642 15.1735 6.99975 15.1735C6.01308 15.1735 5.01975 14.8002 4.24642 14.0602ZM1.90642 5.7735C1.18642 8.9135 3.15975 11.6202 4.94642 13.3335C6.09975 14.4468 7.90642 14.4468 9.05975 13.3335C10.8398 11.6202 12.8131 8.9135 12.1064 5.7735C11.4398 2.86683 8.93975 1.8335 6.99975 1.8335C5.05975 1.8335 2.56642 2.86683 1.90642 5.7735Z"
                        fill="#7D8D8B"
                      />
                    </svg>
                    <input
                      placeholder="Enter Postcode"
                      name="street_address"
                      className="tsk_loc_inp form-control"
                      type="textarea"
                      value={street_address}
                      onChange={handleStreetChange}
                      onFocus={handlePopupOpen}
                      onClick={handlePopupOpen}
                      ref={searchBoxRefStreet}
                    />
                    {showPopup && (
                      <div className="map-popup">
                        <GoogleMap onLoad={onMapLoadStreet}></GoogleMap>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Select
                    className="tsk_cont_type"
                    value={
                      details.category_id ? details.category_id : "option1"
                    }
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option disabled value={"option1"}>
                      Choose category
                    </option>
                    {categories &&
                      categories.map((value, index) => {
                        return (
                          <option value={value._id}>
                            {capitalizeFirstLetter(value.name)}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="ps-4">
                <Form.Group className="mb-4 taskMedia_type">
                  <FormControlLabel
                    control={<Checkbox />}
                    name="need_photos"
                    checked={details.need_photos}
                    onChange={handleCheck}
                    label="Photos"
                  />
                  <Form.Control
                    className="tsk_cnt_price"
                    type="number"
                    disabled={!details.need_photos}
                    required={details.need_photos}
                    value={details.hopper_photo_price || details.photo_price}
                    placeholder="£ 000"
                    name="photo_price"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-4 taskMedia_type">
                  <FormControlLabel
                    control={<Checkbox />}
                    name="need_interview"
                    checked={details.need_interview}
                    onChange={handleCheck}
                    label="Interview"
                  />
                  <Form.Control
                    className="tsk_cnt_price"
                    type="number"
                    placeholder="£ 000"
                    value={
                      details.hopper_interview_price || details.interview_price
                    }
                    required={details.need_interview}
                    disabled={!details.need_interview}
                    name="interview_price"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-4 taskMedia_type">
                  <FormControlLabel
                    control={<Checkbox />}
                    name="need_videos"
                    checked={details.need_videos}
                    onChange={handleCheck}
                    label="Videos"
                  />
                  <Form.Control
                    className="tsk_cnt_price"
                    type="number"
                    placeholder="£ 000"
                    value={
                      details?.hopper_videos_price || details?.videos_price
                    }
                    required={details.need_videos}
                    name="videos_price"
                    disabled={!details.need_videos}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className="mb-4 d-flex justify-content-between align-items-center check-box"
              controlId="formBasicCheckbox"
            >
              <span className="selectionHint_text">
                Choose if you want a picture, interview or video to be taken by
                our Hoppers, and enter the respective price offered. You can
                also choose all three options
              </span>
            </Form.Group>
            <div className="text-center">
              {/* <Link to="/SignupSuccess"> */}
              <Button
                variant=""
                type="submit"
                className={`theme-btn custom-ab mb-0 ${
                  loading ? "post_task" : ""
                }`}
                disabled={loading}
              >
                Post task
              </Button>
              {/* </Link> */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddBroadcastTask;
