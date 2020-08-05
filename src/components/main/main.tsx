import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedCityOffers} from "../../reducer/filters/selectors.js";
import {MapType} from "../../const.js";
import Header from "../header/header.jsx";
import Map from "../map/map.jsx";
import NoOffers from "../no-offers/no-offers.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Cities from "../cities/cities.jsx";

const Main = ({sortedCityOffers}) => {
  const isNoOffers = sortedCityOffers.length === 0 ? true : false;

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${isNoOffers ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          {isNoOffers
            ? <NoOffers/>
            : <div className="cities__places-container container">
              <Cities/>
              <div className="cities__right-section">
                <Map
                  mapType={MapType.MAIN}
                  offers={sortedCityOffers}
                />
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  sortedCityOffers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  sortedCityOffers: getSortedCityOffers(state),
});

export {Main};
export default connect(mapStateToProps, null)(Main);
