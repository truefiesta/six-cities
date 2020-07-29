import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import LoginScreen from "../login-screen/login-screen.jsx";
import {AppRoute} from "../../const.js";

class App extends PureComponent {
  render() {

    return (
      <Router>
        <Switch>
          <Route exact path={AppRoute.ROOT} component={Main}/>
          <Route path={AppRoute.LOGIN} component={LoginScreen}/>
          <Route path={AppRoute.ROOM} component={OfferDetails}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
