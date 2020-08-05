import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCities} from "../../reducer/offers/selectors.js";
import {getCity} from "../../reducer/filters/selectors.js";
import CityLink from "../city-link/city-link.jsx";

const CitiesList = ({city, cities}) => {
  if (!city) {
    return null;
  }

  const sixCities = cities.slice(0, 6);

  return (
    <ul className="locations__list tabs__list">
      {sixCities.map((it) => {
        return (
          <li key={it} className="locations__item">
            <CityLink
              city={it}
              isActive={city === it}
              isTab={true}
            />
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cities: getCities(state),
});

export {CitiesList};
export default connect(mapStateToProps)(CitiesList);
