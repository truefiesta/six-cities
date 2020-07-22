import React from "react";
import renderer from "react-test-renderer";
import Cities from "./cities.jsx";
import testMocks from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const cityOffers = testMocks.slice(0, 4);

const mockStore = configureStore([]);
const store = mockStore({
  city: CityName.AMSTERDAM,
  offers: cityOffers,
  sortType: SortTypes.POPULAR,
  activeCard: null,
});

describe(`Cities`, () => {
  describe(`when the offers is not empty array`, () => {
    it(`should render with correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Cities
              onOfferDetailsOpen={() => null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
