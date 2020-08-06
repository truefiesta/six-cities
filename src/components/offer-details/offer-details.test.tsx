import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {CityName, SortType} from "../../const";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {OfferDetails} from "./offer-details";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.FILTERS]: {
    city: CityName.AMSTERDAM,
    sortType: SortType.POPULAR,
    activeCard: null,
  },
  [NameSpace.OFFERS]: {
    reviewError: ``,
    offers,
    currentOfferReviews: reviews,
    currentOffersNearby: offersNearby,
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    email: ``,
  }
});

const offer = offers[0];

jest.mock(`../map/map`);

describe(`OffersDetails snapshot`, () => {
  it(`should render with data`, () => {
    const tree = renderer.create(
        <Router>
          <Provider store={store}>
            <OfferDetails
              offer={offer}
              match={`1`}
              currentOfferReviews={reviews}
              offersNearby={offersNearby}
              onLoad={() => null}
              reviewError={``}
              city={CityName.AMSTERDAM}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              onReviewSubmit={() => null}
            />
          </Provider>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
