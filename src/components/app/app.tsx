import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {AppRoute} from "../../const";
import history from "../../history";
import Main from "../main/main";
import OfferDetails from "../offer-details/offer-details";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import LoginScreen from "../login-screen/login-screen";
import PrivateRoute from "../private-route/private-route";
import ErrorBanner from "../error-banner/error-banner";

const App: React.FunctionComponent = () => {
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
