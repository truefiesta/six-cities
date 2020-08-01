import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {BookmarkStyle} from "../../const.js";

const BookmarkButton = (props) => {
  const {onBookmarkStatusChange, isBookmarked, offerId, buttonStyle} = props;
  const isSmallButton = buttonStyle === BookmarkStyle.SMALL_BUTTON;
  const buttonClass = isSmallButton ? `place-card` : `property`;
  const activeBookmark = isBookmarked ? `${buttonClass}__bookmark-button--active` : ``;
  const newBookmarkStatus = !isBookmarked;
  const width = isSmallButton ? `18` : `31`;
  const height = isSmallButton ? `19` : `33`;
  const title = isBookmarked ? `In bookmarks` : `To bookmarks`;

  return (
    <button
      onClick={() => onBookmarkStatusChange(offerId, newBookmarkStatus)}
      className={`${buttonClass}__bookmark-button ${activeBookmark} button`}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{title}</span>
    </button>
  );
};

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  buttonStyle: PropTypes.string.isRequired,
  onBookmarkStatusChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onBookmarkStatusChange(offerId, status) {
    dispatch(OffersOperation.changeOfferBookmarkStatus(offerId, status));
  }
});

export {BookmarkButton};
export default connect(null, mapDispatchToProps)(BookmarkButton);
