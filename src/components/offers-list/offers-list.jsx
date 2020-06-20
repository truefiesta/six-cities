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
  offers: PropTypes.array.isRequired,
  onOfferDetailsOpen: PropTypes.func.isRequired,
};

export default OffersList;
