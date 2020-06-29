import React from "react";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details.jsx";

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
  reviews: [
    {
      id: `r000001`,
      text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      rating: 4.1,
      user: {
        name: `Max`,
      },
      date: `2019-04-24`,
    },
  ],
};

jest.mock(`../reviews-list/reviews-list.jsx`, () => () => {
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
          </div>
          <span className="reviews__user-name">
            Max
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `80%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
          </p>
          <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
        </div>
      </li>
    </ul>
  );
});

describe(`src/offers-details.jsx`, () => {
  describe(`when the offers is a non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <OfferDetails
            offer={offer}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
