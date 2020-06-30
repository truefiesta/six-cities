import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Map from "./map.jsx";
import testMocks from "../../test-mocks/test-mocks.js";

const offers = testMocks;

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
