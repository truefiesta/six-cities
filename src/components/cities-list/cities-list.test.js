import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list.jsx";
import {CityName} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({});

const cities = Object.values(CityName);

describe(`src/CitiesList.jsx`, () => {
  describe(`when the city is chosen and offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <CitiesList
              city={CityName.AMSTERDAM}
              cities={cities}
              onCityClick={() => null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
