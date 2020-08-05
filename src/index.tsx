import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer/reducer.js";
import {Operation as OffersOperation} from "./reducer/offers/offers.js";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import thunk from "redux-thunk";
import {createApi} from "./api.js";
import history from "./history.js";
import {AppRoute} from "./const.js";
import {ActionCreator as ErrorActionCreator} from "./reducer/error/error.js";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.changeAuthStatus(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.LOGIN);
};

const onError = (err) => {
  store.dispatch(ErrorActionCreator.setError(err));
  setTimeout(() => store.dispatch(ErrorActionCreator.setError(``)), 5000);
};

const api = createApi(onUnauthorized, onError);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(OffersOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
