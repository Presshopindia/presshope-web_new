import PropTypes from "prop-types";


const MediaCountIcon = ({ count, iconSrc, altText }) => {
  if (!count || count <= 0) return null;

  return (
    //   <div className="post_icns_cstm_wrp video-ico">

    //     <span className="count">{count}</span>
    //     <img className="feedMediaType iconBg" src={iconSrc} alt={altText} />
    //   </div>

    <div className="post_icns_cstm_wrp video-ico">
      <div className="post_itm_icns dtl_icns">
        <span className="count">
          {count}
        </span>
        <img
          className="feedMediaType iconBg"
          src={iconSrc}
          alt=""
        />
      </div>
    </div>
  );
};

MediaCountIcon.propTypes = {
  count: PropTypes.number.isRequired,
  iconSrc: PropTypes.string.isRequired, // Ensures iconSrc is a string and required
  altText: PropTypes.string.isRequired, // Ensures altText is a string and required
};

export default MediaCountIcon;
