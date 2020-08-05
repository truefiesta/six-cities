
import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator as FiltersActionCreator} from "../../reducer/filters/filters.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const CityLink = ({city, isActive = false, isTab = false, onCityClick}) => {
  const tabClass = isTab ? `tabs__item` : ``;
  const activeCityClass = isActive ? `tabs__item--active` : ``;

  return (
    <Link
      to={AppRoute.ROOT}
      onClick={() => {
        onCityClick(city);
      }}
      className={`locations__item-link ${tabClass} ${activeCityClass}`}
    >
      <span>{city}</span>
    </Link>
  );
};

CityLink.propTypes = {
  city: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isTab: PropTypes.bool,
  onCityClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(FiltersActionCreator.changeCity(city));
  }
});

export {CityLink};
export default connect(null, mapDispatchToProps)(CityLink);
