import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {offers} from "../../test-mocks/test-mocks.js";
import {OfferCardType} from "../../const.js";
import OfferCard from "./offer-card.jsx";

const offer = offers[0];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`OfferCard`, () => {
  it(`triggers mouse over and mouse out callbacks`, () => {
    const onMouseOver = jest.fn();
    const onMouseOut = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          cardType={OfferCardType.MAIN}
          onBookmarkStatusChange={() => null}
        />
    );

    offerCard.simulate(`mouseover`);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver.mock.calls[0][0]).toMatchObject(offer);

    offerCard.simulate(`mouseout`);
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });
});
