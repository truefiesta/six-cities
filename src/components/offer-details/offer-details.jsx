import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {EstateType} from "../../const.js";
import {convertStarRatingToWidthPercent, capitalize} from "../../utils.js";
import Header from "../header/header.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import Map from "../map/map.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import {MapClass} from "../../const.js";
import {getOffersNearby, getCurrentOfferReviews, getReviewError, getOffer} from "../../reducer/offers/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getCity} from "../../reducer/filters/selectors.js";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {connect} from "react-redux";
import ReviewForm from "../review-form/review-form.jsx";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import {BookmarkStyle, OfferCardTypes} from "../../const.js";

const MAX_PHOTOS = 6;

class OfferDetails extends PureComponent {
  componentDidMount() {
    if (this.props.offer) {
      this.props.onLoad(this.props.offer.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.offer) {
      if (!prevProps.offer || prevProps.offer.id !== this.props.offer.id) {
        this.props.onLoad(this.props.offer.id);
      }
    }
  }

  render() {
    const {reviewError, city, offersNearby, currentOfferReviews, offer, authorizationStatus, onReviewSubmit} = this.props;
    if (!offer) {
      return null;
    }

    const {id, photos, name, description, type, rating, bedrooms, guests, price, equipment, host, isPremium, isBookmarked} = offer;
    const reviewsCount = currentOfferReviews.length;
    const premiumTag = isPremium
      ? (<div className="property__mark"><span>Premium</span></div>)
      : null;
    const bedroomsText = bedrooms > 1 ? `${bedrooms} Bedrooms` : `${bedrooms} Bedroom`;
    const guestsText = guests > 1 ? `Max ${guests} adults` : `Max ${guests} adult`;
    const nearbyOffersWithCurrentOffer = offersNearby.concat(offer);
    const isUserAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    return (
      <div className="page">
        <Header/>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {photos.slice(0, MAX_PHOTOS).map((photo) => {
                  return (
                    <div key={photo} className="property__image-wrapper">
                      <img className="property__image" src={photo} alt={name}/>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {premiumTag}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {name}
                  </h1>
                  <BookmarkButton
                    offerId={id}
                    isBookmarked={isBookmarked}
                    buttonStyle={BookmarkStyle.BIG_BUTTON}
                  />
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${convertStarRatingToWidthPercent(rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {capitalize(type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedroomsText}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {guestsText}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {equipment.map((item, i) => {
                      return (
                        <li key={`${i}-${item}`} className="property__inside-item">
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/${host.avatar}`} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
                  <ReviewsList
                    reviews={currentOfferReviews}
                  />
                  {isUserAuthorized && (
                    <ReviewForm
                      onSubmit={onReviewSubmit}
                      offerId={id}
                      reviewError={reviewError}
                    />
                  )}
                </section>
              </div>
            </div>
            <Map
              offers={nearbyOffersWithCurrentOffer}
              city={city}
              activeCard={offer}
              mapStyle={MapClass.MAP_DETAILS}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList
                offers={offersNearby}
                cardType={OfferCardTypes.DETAILS}
                onActiveCardChange={() => null}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

OfferDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }).isRequired,
  city: PropTypes.string.isRequired,
  offersNearby: PropTypes.array.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf([EstateType.APARTMENT, EstateType.ROOM, EstateType.HOTEL, EstateType.HOUSE]).isRequired,
    rating: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    equipment: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }).isRequired,
    isPremium: PropTypes.bool.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
  }),
  currentOfferReviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        date: PropTypes.string.isRequired,
      })
  ).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  reviewError: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  offer: getOffer(state, parseInt(ownProps.match.params.id, 10)),
  reviewError: getReviewError(state),
  authorizationStatus: getAuthorizationStatus(state),
  offersNearby: getOffersNearby(state),
  city: getCity(state),
  currentOfferReviews: getCurrentOfferReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewSubmit(review, offerId, onSuccess, onError) {
    dispatch(OffersOperation.addReview(review, offerId, onSuccess, onError));
  },
  onLoad(offerId) {
    dispatch(OffersOperation.loadOfferReviews(offerId));
    dispatch(OffersOperation.loadOffersNearby(offerId));
  }
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
