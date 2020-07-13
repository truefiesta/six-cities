import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import {connect} from "react-redux";
import {getOffers} from "../../selectors.js";
import {ActionCreator} from "../../reducer.js";
import mockOffers from "../../mocks/offers.js";

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

  componentDidMount() {
    this.props.onLoad(mockOffers[0].city, mockOffers);
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
  onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad(city, offers) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.setAllOffers(offers));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
