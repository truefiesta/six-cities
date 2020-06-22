import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";

const offer = {
  id: `offer-1`,
  image: `http://lorempixel.com/400/200/`,
  photos: [
    {
      src: `img/room.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/apartment-01.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/apartment-02.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/apartment-03.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/studio-01.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/apartment-01.jpg`,
      alt: `Photo studio`,
    },
    {
      src: `img/room.jpg`,
      alt: `Photo studio`,
    },
  ],
  price: 120,
  rating: 4.1,
  name: `Beautiful & luxurious apartment at great location`,
  description: [
    `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
  ],
  bedrooms: 3,
  guests: 4,
  equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
  type: `apartment`,
  host: {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    status: `super`,
  },
  isBookmarked: false,
  isPremium: true,
};

describe(`src/offer-card.jsx`, () => {
  describe(`when the offer contains data`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <OfferCard
            offer={offer}
            onMouseOver={() => null}
            onOfferDetailsOpen={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
