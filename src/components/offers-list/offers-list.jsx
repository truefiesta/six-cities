import React, {Component} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends Component {
  shouldComponentUpdate(nextProps) {
    const currentOffers = this.props.sortedCityOffers;
    const newOffers = nextProps.sortedCityOffers;

    for (const currentOfferItem of currentOffers) {
      for (const newOfferItem of newOffers) {
        if (currentOfferItem.id !== newOfferItem.id) {
          return true;
        }
      }
    }

    return false;
  }

  render() {
    const {sortedCityOffers, onOfferDetailsOpen, cardStyle, onActiveCardChange} = this.props;
    return (
      <div className={`${cardStyle.list} places__list`}>
        {sortedCityOffers.map((offer) => {
          return (
            <OfferCard
              key={offer.id}
              offer={offer}
              onMouseOver={onActiveCardChange}
              onMouseOut={onActiveCardChange}
              onOfferDetailsOpen={onOfferDetailsOpen}
              cardStyle={cardStyle}
            />
          );
        })};
      </div>
    );
  }
}

OffersList.propTypes = {
  sortedCityOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
      }).isRequired
  ).isRequired,
  onOfferDetailsOpen: PropTypes.func.isRequired,
  cardStyle: PropTypes.shape({
    article: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
  }).isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
};

export default OffersList;
