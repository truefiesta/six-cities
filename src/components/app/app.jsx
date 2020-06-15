import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onCardHeaderClick = () => {};

const App = (props) => {
  const {offersCount, offerTitles} = props;

  return (
    <Main
      offersCount={offersCount}
      offerTitles={offerTitles}
      onCardHeaderClick={onCardHeaderClick}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offerTitles: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
};

export default App;
