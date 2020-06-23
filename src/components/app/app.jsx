import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onOfferDetailsOpen = () => {};

const App = (props) => {
  const {offersCount, offers} = props;

  return (
    <Main
      offersCount={offersCount}
      offers={offers}
      onOfferDetailsOpen={onOfferDetailsOpen}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
