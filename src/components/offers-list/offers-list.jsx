import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCardId: null,
    };
    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(id) {
    this.setState({activeCardId: id});
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
              onMouseOver={() => {
                this._setActiveCard(offer.id);
              }}
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
