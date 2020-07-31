import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

export const OfferListStylesByCardType = {
  main: `cities__places-list tabs__content`,
  details: `near-places__list`,
  favorites: `favorites__places`,
};

const OffersList = (props) => {
  const {offers, cardType, onActiveCardChange} = props;
  const listStyle = OfferListStylesByCardType[cardType];

  return (
    <div className={`${listStyle} places__list`}>
      {offers.map((offer) => {
        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={onActiveCardChange}
            onMouseOut={onActiveCardChange}
            cardType={cardType}
          />
        );
      })}
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
  cardType: PropTypes.string.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
};

export default OffersList;
