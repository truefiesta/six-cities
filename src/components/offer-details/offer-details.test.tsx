import * as React from "react";
import * as renderer from "react-test-renderer";
import {OfferDetails} from "./offer-details";
import {CityName, SortType} from "../../const";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers, reviews, offersNearby} from "../../test-mocks/test-mocks";
import {NameSpace} from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {BrowserRouter as Router} from "react-router-dom";

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

jest.mock(`../map/map.jsx`, () => () => {
  return (
    <div id="map"></div>
  );
});

describe(`OffersDetails snapshot`, () => {
  it(`should render with data`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OfferDetails
              offer={offer}
              match={{params: {id: `1`}, isExact: true, path: ``, url: ``}}
              currentOfferReviews={reviews}
              offersNearby={offersNearby}
              onLoad={() => null}
              reviewError={``}
              city={CityName.AMSTERDAM}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              onReviewSubmit={() => null}
              onBookmarkStatusChange={() => null}
            />
          </Router>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
