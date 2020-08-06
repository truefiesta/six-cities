import * as React from "react";
import {Offer} from "../../types";
import OfferCard from "../offer-card/offer-card";

interface Props {
  offers: Offer[];
  cardType: string;
  onActiveCardChange: () => void;
}

export const OfferListStylesByCardType = {
  main: `cities__places-list tabs__content`,
  details: `near-places__list`,
  favorites: `favorites__places`,
};

const OffersList: React.FunctionComponent<Props> = (props: Props) => {
  const {offers, cardType, onActiveCardChange} = props;
  const listStyle = OfferListStylesByCardType[cardType];

  return (
    <div className={`${listStyle} places__list`}>
      {offers.map((offer) => {
        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={onActiveCardChange}
            onMouseOut={onActiveCardChange}
            cardType={cardType}
          />
        );
      })}
    </div>
  );
};

export default OffersList;
