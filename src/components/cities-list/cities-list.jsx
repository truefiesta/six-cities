import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import {getCities, getCity} from "../../selectors.js";

const CitiesList = ({city, cities, onCityClick}) => {
  const sixCities = cities.slice(0, 6);

  if (!city) {
    return null;
  }

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
  city: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
