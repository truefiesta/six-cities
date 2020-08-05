import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getErrorMessage} from "../../reducer/error/selectors.js";

const errorStyle = {
  backgroundColor: `#e23939`,
  width: `100%`,
  padding: `5px`,
  color: `#fff`,
  textAlign: `center`,
  lineHeight: `15px`,
  fontSize: `15px`,
  boxShadow: `0px 2px 14px 0px rgba(0,0,0,0.34)`,
  position: `fixed`,
  zIndex: 1,
};

const ErrorBanner = ({errorMessage}) => {
  const isError = errorMessage !== ``;

  return (
    isError && <div style={errorStyle}>{errorMessage}</div>
  );
};

ErrorBanner.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: getErrorMessage(state),
});

export {ErrorBanner};
export default connect(mapStateToProps)(ErrorBanner);
