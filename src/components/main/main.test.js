import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import testMocks from "../../test-mocks/test-mocks.js";
import {CityName, SortTypes} from "../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const offers = testMocks;

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

jest.mock(``, () => () => {
  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>Paris</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>Cologne</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>Brussels</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item tabs__item--active">
          <span>Amsterdam</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>Hamburg</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#">
          <span>Dusseldorf</span>
        </a>
      </li>
    </ul>
  );
});

const cities = Object.values(CityName);
const cityOffers = offers.slice(0, 4);

const mockStore = configureStore([]);
const store = mockStore({});

describe(`src/Main.jsx`, () => {
  describe(`when the city is chosen and offers is non-empty array`, () => {
    it(`should render with data`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Main
              sortedCityOffers={cityOffers}
              cities={cities}
              city={CityName.AMSTERDAM}
              onOfferDetailsOpen={() => null}
              currentSortType={SortTypes.POPULAR}
              onActiveCardChange={() => null}
              onSortTypeChange={() => null}
              activeCard={null}
            />
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
