import React, {Component} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };
    this._handleCardMouseOver = this._handleCardMouseOver.bind(this);
  }

  _handleCardMouseOver(offer) {
    this.setState({activeCard: offer});
  }

  shouldComponentUpdate(nextProps) {
    const currentOffers = this.props.offers;
    const newOffers = nextProps.offers;

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
    const {offers, onOfferDetailsOpen, cardStyle} = this.props;

    return (
      <div className={`${cardStyle.list} places__list`}>
        {offers.map((offer) => {
          return (
            <OfferCard
              key={offer.id}
              offer={offer}
              onMouseOver={this._handleCardMouseOver}
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
  offers: PropTypes.arrayOf(
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
};

export default OffersList;
