import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";

const onOfferDetailsOpen = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {offersCount, offers} = this.props;

    return (
      <Main
        offersCount={offersCount}
        offers={offers}
        onOfferDetailsOpen={onOfferDetailsOpen}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer-details">
            <OfferDetails />
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
