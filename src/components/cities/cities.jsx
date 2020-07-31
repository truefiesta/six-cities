import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.jsx";
import Sort from "../sort/sort.jsx";
import {OfferCardTypes} from "../../const.js";
import {connect} from "react-redux";
import {getCurrentSortType, getSortedCityOffers, getCity} from "../../reducer/filters/selectors.js";
import {ActionCreator as FiltersActionCreator} from "../../reducer/filters/filters.js";

const Cities = (props) => {
  const {city, currentSortType, sortedCityOffers, onSortTypeChange, onActiveCardChange} = props;
  const offersCount = sortedCityOffers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersCount} places to stay in {city}</b>
      <Sort
        currentSortType={currentSortType}
        onSortTypeChange={onSortTypeChange}
      />
      <OffersList
        cardType={OfferCardTypes.MAIN}
        onActiveCardChange={onActiveCardChange}
        offers={sortedCityOffers}
      />
    </section>
  );
};

Cities.propTypes = {
  city: PropTypes.string.isRequired,
  currentSortType: PropTypes.number.isRequired,
  sortedCityOffers: PropTypes.array.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  currentSortType: getCurrentSortType(state),
  sortedCityOffers: getSortedCityOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(sortType) {
    dispatch(FiltersActionCreator.changeSortType(sortType));
  },
  onActiveCardChange(offer) {
    dispatch(FiltersActionCreator.changeActiveCard(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
