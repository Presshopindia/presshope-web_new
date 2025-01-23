import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlMagnifierAdd } from "react-icons/sl";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import audioic from "../assets/images/audimg.svg";

function ViewContent(props) {
    const handleClose = () => props.setOpenContent(false);

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

    return (
        <>
        {
            // Large Size-
            props?.imageSize?.height < props?.imageSize?.width ?
            <Modal className='full-preview large-view' backdrop="static" show={props.openContent} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div>
                        {(props?.imageSize?.height < props?.imageSize?.width && props?.showContent?.media_type === "image") && (
                            <img
                                src={props?.showContent?.watermark}
                                alt={`Image ${props?.showContent._id}`}
                                width="100%"
                            />
                        )}

                        {props?.showContent?.media_type === "audio" && (
                            <div>
                                <img
                                    src={audioic}
                                    alt={`Audio ${props?.showContent._id}`}
                                    style={{ height: "100%", width: "100%" }}
                                    onClick={toggleAudio}
                                />
                                <audio
                                    controls
                                    src={props?.showContent?.watermark || process.env.REACT_APP_CONTENT_MEDIA + props?.showContent?.media}
                                    type="audio/mpeg"
                                    className="view-slider-audio"
                                    ref={audioRef}
                                />
                            </div>
                        )}
                        {props?.showContent?.media_type === "video" && (
                            <video
                                controls
                                src={props?.showContent?.media}
                                style={{ height: "100%", width: "100%" }}
                            />
                        )}
                        {props?.showContent?.media_type === "pdf" && (
                            <embed
                                src={`${process.env.REACT_APP_CONTENT_MEDIA + props?.showContent?.media}`}
                                type="application/pdf"
                                width="100%"
                                height="500"
                            />
                        )}
                    </div>
                </Modal.Body>
            </Modal>
            : 
            // Small Size-
            <Modal className='full-preview mobile-view' backdrop="static" show={props.openContent} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div>
                        {/* Mobile size */}
                        {(props?.imageSize?.height > props?.imageSize?.width && props?.showContent?.media_type === "image") && (
                            <img
                                src={props?.showContent?.watermark}
                                alt={`Image ${props?.showContent._id}`}
                                width="100%"
                            />
                        )}

                        {/* Computer size */}
                        {(props?.imageSize?.height < props?.imageSize?.width && props?.showContent?.media_type === "image") && (
                            <img
                                src={props?.showContent?.watermark}
                                alt={`Image ${props?.showContent._id}`}
                                width="100%"
                            />
                        )}

                        {props?.showContent?.media_type === "audio" && (
                            <div>
                                <img
                                    src={audioic}
                                    alt={`Audio ${props?.showContent._id}`}
                                    style={{ height: "100%", width: "100%" }}
                                    onClick={toggleAudio}
                                />
                                <audio
                                    controls
                                    src={props?.showContent?.watermark || process.env.REACT_APP_CONTENT_MEDIA + props?.showContent?.media}
                                    type="audio/mpeg"
                                    className="view-slider-audio"
                                    ref={audioRef}
                                />
                            </div>
                        )}
                        {props?.showContent?.media_type === "video" && (
                            <video
                                controls
                                src={props?.showContent?.media}
                                style={{ height: "100%", width: "100%" }}
                            />
                        )}
                        {props?.showContent?.media_type === "pdf" && (
                            <embed
                                src={`${process.env.REACT_APP_CONTENT_MEDIA + props?.showContent?.media}`}
                                type="application/pdf"
                                width="100%"
                                height="500"
                            />
                        )}
                    </div>
                </Modal.Body>
            </Modal>

        }

        </>
    );
}

export default ViewContent;