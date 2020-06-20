import React from "react";
import PropTypes from "prop-types";

const PremiumTag = () => {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
};

const OfferCard = (props) => {
  const {offer, onOfferDetailsOpen, onMouseOver} = props;
  const {image, price, name, type, rating, isPremium} = offer;
  const premiumTag = isPremium ? <PremiumTag/> : ``;
  // const activeBookmark = isBookmarked ? `place-card__bookmark-button--active` : ``;

  return (
    <article
      onMouseOver={() => onMouseOver(offer)}
      className="cities__place-card place-card"
    >
      {premiumTag}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => null} className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            onClick={(evt) => {
              evt.preventDefault();
              onOfferDetailsOpen();
            }}
            href="#"
          >
            {name}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
  }).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onOfferDetailsOpen: PropTypes.func.isRequired,
};

export default OfferCard;
