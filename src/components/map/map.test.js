import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Map from "./map.jsx";

const offers = [
  {
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
    city: `Amsterdam`,
    coordinates: [52.3909553943508, 4.85309666406198],
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
  },
  {
    id: `offer-2`,
    image: `http://lorempixel.com/400/200/`,
    photos: [
      {
        src: `img/apartment-03.jpg`,
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
        src: `img/room.jpg`,
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
    price: 80,
    rating: 4.2,
    city: `Amsterdam`,
    coordinates: [52.369553943508, 4.85309666406198],
    name: `Wood and stone place`,
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    bedrooms: 2,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `room`,
    host: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: `super`,
    },
    isBookmarked: true,
    isPremium: false,
  },
  {
    id: `offer-3`,
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
    price: 132,
    rating: 4.3,
    city: `Amsterdam`,
    coordinates: [52.3909553943508, 4.929309666406198],
    name: `Canal view Prinsengracht`,
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
    isPremium: false,
  },
  {
    id: `offer-4`,
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
    price: 180,
    rating: 5,
    city: `Amsterdam`,
    coordinates: [52.3809553943508, 4.939309666406198],
    name: `Nice, cozy, warm big bed apartment`,
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    bedrooms: 2,
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
  }
];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`src/Map.jsx`, () => {
  describe(`when offers is a non-empty array`, () => {
    it(`should render with markers`, () => {

      const div = global.document.createElement(`div`);
      global.document.body.appendChild(div);

      const tree = mount(
          <Map
            offers={offers}
          />,
          {attachTo: div}
      );

      expect(tree.getDOMNode()).toMatchSnapshot();
    });
  });
});
