import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends PureComponent {
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

  render() {
    const {offers, onOfferDetailsOpen} = this.props;

    return (
      <React.Fragment>
        {offers.map((offer) => {
          return (
            <OfferCard
              key={offer.id}
              offer={offer}
              onMouseOver={this._handleCardMouseOver}
              onOfferDetailsOpen={onOfferDetailsOpen}
            />
          );
        })};
      </React.Fragment>
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
};

export default OffersList;
