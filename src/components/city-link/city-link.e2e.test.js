import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CityName} from "../../const.js";
import {CityLink} from "./city-link.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`CityLink`, () => {
  it(`calls onCityClick on click`, () => {
    const onCityClick = jest.fn();
    const city = CityName.AMSTERDAM;

    const cityLink = shallow(
        <CityLink
          city={city}
          isActive={false}
          isTab={false}
          onCityClick={onCityClick}
        />
    );

    const link = cityLink.find(`.locations__item-link`);
    expect(link).toHaveLength(1);

    link.simulate(`click`);
    expect(onCityClick).toHaveBeenCalledWith(city);
  });
});
