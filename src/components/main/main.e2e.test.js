import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const Settings = {
  OFFERS_COUNT: 312
};

const offers = [
  {
    id: `offer-1`,
    image: `http://lorempixel.com/400/200/`,
    price: 120,
    rating: 80,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: true,
  },
  {
    id: `offer-2`,
    image: `http://lorempixel.com/400/200/`,
    price: 80,
    rating: 80,
    name: `Wood and stone place`,
    type: `Private room`,
    isBookmarked: true,
    isPremium: false,
  },
  {
    id: `offer-3`,
    image: `http://lorempixel.com/400/200/`,
    price: 132,
    rating: 80,
    name: `Canal view Prinsengracht`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: `offer-4`,
    image: `http://lorempixel.com/400/200/`,
    price: 180,
    rating: 100,
    name: `Nice, cozy, warm big bed apartment`,
    type: `Apartment`,
    isBookmarked: false,
    isPremium: true,
  }
];

// const offerTitles = [
//   `Beautiful & luxurious apartment at great location`,
//   `Wood and stone place`,
//   `Canal View Prinsengracht`,
//   `Nice, cozy, warm big bed apartment`,
//   `Wood and stone place`,
// ];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main cards`, () => {
  it(`Card header should be pressed`, () => {
    const onOfferDetailsOpen = jest.fn();

    const main = mount(
        <Main
          offersCount={Settings.OFFERS_COUNT}
          offers={offers}
          onOfferDetailsOpen={onOfferDetailsOpen}
        />
    );

    const cardsCount = offers.length;
    const cardHeaders = main.find(`h2.place-card__name a`);
    expect(cardHeaders).toHaveLength(cardsCount);

    cardHeaders.forEach((cardHeader) => {
      cardHeader.simulate(`click`);
    });

    expect(onOfferDetailsOpen.mock.calls.length).toBe(cardsCount);
  });
});
