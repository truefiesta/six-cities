import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import {connect} from "react-redux";
import {getOffers} from "../../reducer/offers/selectors.js";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clickedOffer: null,
    };
    this._handleCardHeaderClick = this._handleCardHeaderClick.bind(this);
  }

  _handleCardHeaderClick(offer) {
    this.setState({clickedOffer: offer});
    this.props.onCurrentOfferChange(offer);
  }

  _renderApp() {
    const {clickedOffer} = this.state;

    if (clickedOffer) {
      return (
        <OfferDetails
          offer={clickedOffer}
          onOfferDetailsOpen={this._handleCardHeaderClick}
        />
      );
    }

    return (
      <Main
        onOfferDetailsOpen={this._handleCardHeaderClick}
      />
    );
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer-details">
            {offers && offers.length && (
              <OfferDetails
                offer={offers[0]}
                onOfferDetailsOpen={this._handleCardHeaderClick}
              />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  onCurrentOfferChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCurrentOfferChange(offer) {
    dispatch(OffersOperation.loadOfferReviews(offer.id));
    dispatch(OffersOperation.loadOffersNearby(offer.id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
