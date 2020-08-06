import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {offers} from "../../test-mocks/test-mocks";
import {OfferCardType} from "../../const";
import OfferCard from "./offer-card";

const offer = offers[0];

configure({
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
        />
    );

    offerCard.simulate(`mouseover`);

    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver.mock.calls[0][0]).toMatchObject(offer);

    offerCard.simulate(`mouseout`);
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });
});
