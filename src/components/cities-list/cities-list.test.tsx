import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName, SortType} from "../../const.js";
import {Provider} from "react-redux";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks.js";
import {NameSpace} from "../../reducer/name-space.js";
import {CitiesList} from "./cities-list.jsx";

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.FILTERS]: {
    city: CityName.AMSTERDAM,
    sortType: SortType.POPULAR,
    activeCard: null,
  },
  [NameSpace.OFFERS]: {
    offers,
    currentOfferReviews: reviews,
    currentOffersNearby: offersNearby,
  },
});

const cities = Object.values(CityName);

describe(`CitiesList snapshot`, () => {
  it(`should render with data`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <CitiesList
              city={CityName.AMSTERDAM}
              cities={cities}
              onCityClick={() => null}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
