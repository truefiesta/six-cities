import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card.jsx";
import {offers} from "../../test-mocks/test-mocks.js";

const offer = offers[0];

Enzyme.configure({
  adapter: new Adapter(),
});

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

