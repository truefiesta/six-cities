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
  price: 120,
  rating: 80,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  isBookmarked: false,
  isPremium: true,
};

describe(`OfferCard`, () => {
  it(`Handler gets offer id on mouse over`, () => {
    const onOfferDetailsOpen = () => null;
    const onMouseOver = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          onMouseOver={onMouseOver}
          onOfferDetailsOpen={onOfferDetailsOpen}
        />
    );

    offerCard.simulate(`mouseover`);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver.mock.calls[0][0]).toMatchObject(offer);
  });
});

