import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.jsx";
import Sort from "../sort/sort.jsx";
import withOpenFlag from "../../hocs/with-open-flag/with-open-flag.js";
import {OfferClassNamesForPageType} from "../../const.js";

import {connect} from "react-redux";
import {getCurrentSortType, getSortedCityOffers, getCity} from "../../selectors.js";
import {ActionCreator} from "../../reducer.js";

const SortWrapped = withOpenFlag(Sort);

const Cities = (props) => {
  const {city, currentSortType, sortedCityOffers, onSortTypeChange, onOfferDetailsOpen, onActiveCardChange} = props;
  const offersCount = sortedCityOffers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersCount} places to stay in {city}</b>
      <SortWrapped
        currentSortType={currentSortType}
        onSortTypeChange={onSortTypeChange}
      />
      <OffersList
        onOfferDetailsOpen={onOfferDetailsOpen}
        cardStyle={OfferClassNamesForPageType.main}
        onActiveCardChange={onActiveCardChange}
        sortedCityOffers={sortedCityOffers}
      />
    </section>
  );
};

Cities.propTypes = {
  city: PropTypes.string,
  currentSortType: PropTypes.string.isRequired,
  sortedCityOffers: PropTypes.array.isRequired,
  onOfferDetailsOpen: PropTypes.func.isRequired,
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
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onActiveCardChange(offer) {
    dispatch(ActionCreator.changeActiveCard(offer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
