import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {CityName} from "../../const.js";
import {CityLink} from "./city-link.jsx";

configure({
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
