import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Map} from "./map.jsx";
import {offers} from "../../test-mocks/test-mocks.js";
import {CityName, MapClass} from "../../const.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const cityDetails = {
  name: `Amsterdam`,
  coordinates: [52.3909553943508, 4.85309666406198],
  zoom: 10,
};

describe(`src/Map.jsx`, () => {
  describe(`when offers is a non-empty array`, () => {
    it(`should render with markers`, () => {

      const div = global.document.createElement(`div`);
      global.document.body.appendChild(div);

      const tree = mount(
          <Map
            city={CityName.AMSTERDAM}
            offers={offers}
            activeCard={offers[0]}
            mapStyle={MapClass.MAP_MAIN}
            cityDetails={cityDetails}
          />,
          {attachTo: div}
      );

      expect(tree.getDOMNode()).toMatchSnapshot();
    });
  });
});
