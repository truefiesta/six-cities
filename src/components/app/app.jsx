import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {offersCount, offerTitles} = props;

  return (
    <Main offersCount={offersCount} offerTitles={offerTitles}/>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offerTitles: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
};

export default App;
