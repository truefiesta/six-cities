import * as React from "react";
import {Link} from "react-router-dom";
import {convertStarRatingToWidthPercent, capitalize} from "../../utils";
import {BookmarkStyle, OfferCardType} from "../../const";
import BookmarkButton from "../bookmark-button/bookmark-button";
import {Offer} from "../../types";

interface Props {
  offer: Offer;
  cardType: string;
  onMouseOver: (offer: Offer) => void;
  onMouseOut: () => void;
}

export const CardStylesByCardType = {
  [OfferCardType.MAIN]: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    info: ``,
    imageWidth: 260,
    imageHeight: 200,
  },
  [OfferCardType.DETAILS]: {
    article: `near-places__card`,
    image: `near-places__image-wrapper`,
    info: ``,
    imageWidth: 260,
    imageHeight: 200,
  },
  [OfferCardType.FAVORITES]: {
    article: `favorites__card `,
    image: `favorites__image-wrapper`,
    info: `favorites__card-info`,
    imageWidth: 150,
    imageHeight: 110,
  },
};

const OfferCard: React.FunctionComponent<Props> = (props: Props) => {
  const {offer, onMouseOver, cardType, onMouseOut} = props;
  const cardStyle = CardStylesByCardType[cardType];
  const {id, image, price, name, type, rating, isPremium, isBookmarked} = offer;
  const premiumTag = isPremium
    ? (<div className="place-card__mark"><span>Premium</span></div>)
    : null;

  return (
    <article
      onMouseOver={() => onMouseOver(offer)}
      onMouseOut={() => onMouseOut()}
      className={`${cardStyle.article} place-card`}
      id={`offer-${id}`}
    >
      {premiumTag}
      <div className={`${cardStyle.image} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={image} width={cardStyle.imageWidth} height={cardStyle.imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={`${cardStyle.info} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            offerId={id}
            isBookmarked={isBookmarked}
            buttonStyle={BookmarkStyle.SMALL_BUTTON}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${convertStarRatingToWidthPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {name}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

export default OfferCard;
