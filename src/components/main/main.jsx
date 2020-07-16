import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.jsx";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import {OfferClassNamesForPageType} from "../../const.js";
import {connect} from "react-redux";
import {getCurrentSortType, getSortedCityOffers, getCities, getCity, getActiveOffer} from "../../selectors.js";
import Sort from "../sort/sort.jsx";
import {ActionCreator} from "../../reducer.js";
import withOpenFlag from "../../hocs/with-open-flag/with-open-flag.js";

const SortWrapped = withOpenFlag(Sort);

const Main = (props) => {
  const {city, cities, sortedCityOffers, onOfferDetailsOpen, currentSortType, onSortTypeChange, onActiveCardChange, activeCard} = props;

  if (!city) {
    return null;
  }

  const offersCount = sortedCityOffers.length;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              city={city}
              cities={cities}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <SortWrapped
                currentSortType={currentSortType}
                onSortTypeChange={onSortTypeChange}
              />
              <OffersList
                offers={sortedCityOffers}
                onOfferDetailsOpen={onOfferDetailsOpen}
                onActiveCardChange={onActiveCardChange}
                cardStyle={OfferClassNamesForPageType.main}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={sortedCityOffers}
                  city={city}
                  activeCard={activeCard}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  city: PropTypes.string,
  cities: PropTypes.array.isRequired,
  currentSortType: PropTypes.string.isRequired,
  sortedCityOffers: PropTypes.array.isRequired,
  onOfferDetailsOpen: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cities: getCities(state),
  currentSortType: getCurrentSortType(state),
  sortedCityOffers: getSortedCityOffers(state),
  activeCard: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onActiveCardChange(offer) {
    dispatch(ActionCreator.changeActiveCard(offer));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
