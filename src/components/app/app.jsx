import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import {connect} from "react-redux";
import {getOffers, getCity} from "../../selector.js";

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
  }

  _renderApp() {
    const {city, offers} = this.props;
    const {clickedOffer} = this.state;

    if (clickedOffer) {
      return (
        <OfferDetails
          city={city}
          offers={offers}
          offer={clickedOffer}
          onOfferDetailsOpen={this._handleCardHeaderClick}
        />
      );
    }

    return (
      <Main
        city={city}
        // offers={offers}
        onOfferDetailsOpen={this._handleCardHeaderClick}
      />
    );
  }

  render() {
    const {city, offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer-details">
            <OfferDetails
              city={city}
              offers={offers}
              offer={offers[0]}
              onOfferDetailsOpen={this._handleCardHeaderClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  city: getCity(state),
});

export {App};
export default connect(mapStateToProps, null)(App);
