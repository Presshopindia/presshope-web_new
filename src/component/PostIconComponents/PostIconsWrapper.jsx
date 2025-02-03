import interviewic from "../../assets/images/interview.svg";
import videoic from "../../assets/images/video.svg"
import cameraic from "../../assets/images/camera.svg";
import docsic from "../../assets/images/docsic.svg";
import MediaCountIcon from "./MediaCountIcon";

const PostIconsWrapper = ({ audio, video, images, Pdf, Doc }) => {
  return (
    // <div className="post_icns_cstm_wrp">
    <div className="tableContentTypeIcons">
      <MediaCountIcon count={audio} iconSrc={interviewic} altText="Audio Icon" />
      <MediaCountIcon count={video} iconSrc={videoic} altText="Video Icon" />
      <MediaCountIcon count={images} iconSrc={cameraic} altText="Image Icon" />
      <MediaCountIcon count={Pdf} iconSrc={docsic} altText="PDF Icon" />
      <MediaCountIcon count={Doc} iconSrc={docsic} altText="Document Icon" />
    </div>
  );
};

export default PostIconsWrapper;
