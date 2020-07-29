import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OffersList = (props) => {
  const {offers, cardStyle, onActiveCardChange, onBookmarkStatusChange} = props;

  return (
    <div className={`${cardStyle.list} places__list`}>
      {offers.map((offer) => {
        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={onActiveCardChange}
            onMouseOut={onActiveCardChange}
            cardStyle={cardStyle}
            onBookmarkStatusChange={onBookmarkStatusChange}
          />
        );
      })};
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
      }).isRequired
  ).isRequired,
  cardStyle: PropTypes.shape({
    article: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
  }).isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
  onBookmarkStatusChange: PropTypes.func.isRequired,
};

export default OffersList;
