import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer, ActionCreator} from "./reducer.js";
import offers from "./mocks/offers.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

store.dispatch(ActionCreator.changeCity(offers[0].city));
store.dispatch(ActionCreator.setAllOffers(offers));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
