import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import offers from "./mocks/offers.js";

const Settings = {
  OFFERS_COUNT: 312
};

// const offerTitles = [
//   `Beautiful & luxurious apartment at great location`,
//   `Wood and stone place`,
//   `Canal View Prinsengracht`,
//   `Nice, cozy, warm big bed apartment`,
//   `Wood and stone place`
// ];

ReactDOM.render(
    <App
      offersCount={Settings.OFFERS_COUNT}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
