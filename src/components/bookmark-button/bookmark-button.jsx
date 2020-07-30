import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {OfferClassNamesForPageType} from "../../const.js";

const BookmarkButton = (props) => {
  const {onBookmarkStatusChange, cardStyle, isBookmarked, offerId} = props;
  const isDetailsPage = cardStyle.article === OfferClassNamesForPageType.details.article;
  const buttonStyle = isDetailsPage ? `property` : `place-card`;
  const activeBookmark = isBookmarked ? `${buttonStyle}__bookmark-button--active` : ``;
  const newBookmarkStatus = !isBookmarked;

  return (
    <button onClick={() => onBookmarkStatusChange(offerId, newBookmarkStatus)} className={`${buttonStyle}__bookmark-button ${activeBookmark} button`} type="button">
      <svg className="place-card__bookmark-icon" width={isDetailsPage ? `31` : `18`} height={isDetailsPage ? `33` : `19`}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? `In bookmarks` : `To bookmarks`}</span>
    </button>
  );
};

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  cardStyle: PropTypes.shape({
    article: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  onBookmarkStatusChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onBookmarkStatusChange(offerId, status) {
    dispatch(OffersOperation.changeOfferBookmarkStatus(offerId, status));
  }
});

export default connect(null, mapDispatchToProps)(BookmarkButton);
