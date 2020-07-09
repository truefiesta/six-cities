import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import {connect} from "react-redux";
import {getOffers} from "../../selectors.js";

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
            <OfferDetails
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
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

export {App};
export default connect(mapStateToProps, null)(App);
