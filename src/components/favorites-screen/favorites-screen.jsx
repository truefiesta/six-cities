import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from "../header/header.jsx";
import OfferCard from "../offer-card/offer-card.jsx";
import {AppRoute} from "../../const.js";
import {getBookmarkedOffers, getBookmarkedCitites} from "../../reducer/offers/selectors.js";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {Link} from "react-router-dom";
import {OfferCardTypes} from "../../const.js";
import CityLink from "../city-link/city-link.jsx";

class FavoritesScreen extends PureComponent {
  componentDidMount() {
    this.props.onBookmarkedOffersLoad();
  }

  render() {
    const {offers, cities, onBookmarkStatusChange} = this.props;
    const isEmpty = offers.length === 0;

    return (
      <div className={isEmpty ? `page page--favorites-empty` : `page`}>
        <Header/>
        <main className={isEmpty ? `page__main page__main--favorites page__main--favorites-empty` : `page__main page__main--favorites`}>
          <div className="page__favorites-container container">
            {isEmpty
              ? <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                </div>
              </section>
              : <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cities.map((city) => {
                    const cityOffers = offers.filter((offer) => offer.city.name === city);
                    return (
                      <li key={city} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <CityLink
                              city={city}
                            />
                          </div>
                        </div>
                        <div className="favorites__places">
                          {cityOffers.map((offer) => {
                            return (
                              <OfferCard
                                key={offer.id}
                                offer={offer}
                                cardType={OfferCardTypes.FAVORITES}
                                onMouseOver={() => null}
                                onMouseOut={() => null}
                                onBookmarkStatusChange={onBookmarkStatusChange}
                              />
                            );
                          })}
                        </div>
                      </li>);
                  })}
                </ul>
              </section>}
          </div>
        </main>
        <footer className="footer container">
          <Link
            className="footer__logo-link"
            to={AppRoute.ROOT}
          >
            <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    );
  }
}

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onBookmarkStatusChange: PropTypes.func.isRequired,
  onBookmarkedOffersLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getBookmarkedOffers(state),
  cities: getBookmarkedCitites(state),
});

const mapDispatchToProps = (dispatch) => ({
  onBookmarkStatusChange(offerId, status) {
    dispatch(OffersOperation.changeOfferBookmarkStatus(offerId, status));
  },
  onBookmarkedOffersLoad() {
    dispatch(OffersOperation.loadBookmarkedOffers());
  }
});

export {FavoritesScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
