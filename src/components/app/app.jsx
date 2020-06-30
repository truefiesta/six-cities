import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";

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
    const {offersCount, offers} = this.props;
    const {clickedOffer} = this.state;

    if (clickedOffer) {
      return (
        <OfferDetails
          offers={offers}
          offer={clickedOffer}
          onOfferDetailsOpen={this._handleCardHeaderClick}
        />
      );
    }

    return (
      <Main
        offersCount={offersCount}
        offers={offers}
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
            <OfferDetails
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
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
