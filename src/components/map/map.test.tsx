import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {offers} from "../../test-mocks/test-mocks";
import {CityName, MapType} from "../../const";
import {Map} from "./map";

configure({
  adapter: new Adapter(),
});

const cityDetails = {
  name: `Amsterdam`,
  coordinates: [52.3909553943508, 4.85309666406198],
  zoom: 10,
};

describe(`Map snapshot`, () => {
  describe(`map is on the main page`, () => {
    it(`should render with a correct class`, () => {
      const div = global.document.createElement(`div`);
      global.document.body.appendChild(div);

      const tree = mount(
          <Map
            city={CityName.AMSTERDAM}
            offers={offers}
            activeCard={offers[0]}
            mapType={MapType.MAIN}
            cityDetails={cityDetails}
          />,
          {attachTo: div}
      );

      expect(tree.getDOMNode()).toMatchSnapshot();
    });
  });

  describe(`map is on the offer details page`, () => {
    it(`should render with a correct class`, () => {
      const div = global.document.createElement(`div`);
      global.document.body.appendChild(div);

      const tree = mount(
          <Map
            city={CityName.AMSTERDAM}
            offers={offers}
            activeCard={offers[0]}
            mapType={MapType.DETAILS}
            cityDetails={cityDetails}
          />,
          {attachTo: div}
      );

      expect(tree.getDOMNode()).toMatchSnapshot();
    });
  });
});
