import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import FavoritesScreen from "../favorites-screen/favorites-screen.jsx";
import LoginScreen from "../login-screen/login-screen.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import ErrorBanner from "../error-banner/error-banner.jsx";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

const App = () => {
  return (
    <Router history={history}>
      <ErrorBanner/>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={Main}/>
        <Route path={AppRoute.LOGIN} component={LoginScreen}/>
        <Route path={AppRoute.ROOM} component={OfferDetails}/>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITE}
          render={() => {
            return (
              <FavoritesScreen/>
            );
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
