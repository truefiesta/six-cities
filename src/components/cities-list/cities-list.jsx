import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

const CitiesList = ({city, cities, onCityClick}) => {
  const sixCities = cities.slice(0, 6);

  return (
    <ul className="locations__list tabs__list">
      {sixCities.map((it) => {
        return (
          <li key={it} className="locations__item">
            <a
              onClick={(evt) => {
                evt.preventDefault();
                onCityClick(it);
              }}
              className={`locations__item-link tabs__item ${city === it ? `tabs__item--active` : `` }`}
              href="#"
            >
              <span>{it}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CitiesList};
export default connect(null, mapDispatchToProps)(CitiesList);

