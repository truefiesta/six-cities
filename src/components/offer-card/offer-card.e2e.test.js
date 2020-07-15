import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const cardStyle = {
  main: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`,
    list: `cities__places-list tabs__content`,
  },
};

describe(`OfferCard`, () => {
  it(`Handler gets offer id on mouse over`, () => {
    const onOfferDetailsOpen = () => null;
    const onMouseOver = jest.fn();
    const onMouseOut = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onOfferDetailsOpen={onOfferDetailsOpen}
          cardStyle={cardStyle.main}
        />
    );

    offerCard.simulate(`mouseover`);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver.mock.calls[0][0]).toMatchObject(offer);

    offerCard.simulate(`mouseout`);
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });
});

