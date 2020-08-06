import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName, SortType} from "../../const";
import {Provider} from "react-redux";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import {CitiesList} from "./cities-list";

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

const cities: string[] = Object.values(CityName);

describe(`CitiesList snapshot`, () => {
  it(`should render with data`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <CitiesList
              city={CityName.AMSTERDAM}
              cities={cities}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
