import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {offers} from "../../test-mocks/test-mocks";
import {OfferCardType} from "../../const";
import OffersList from "./offers-list";

const cityOffers = offers.slice(0, 4);
const mockStore = configureStore([]);
const store = mockStore({});

describe(`OffersList snapshot`, () => {
  describe(`when the offers list is on main page`, () => {
    it(`should render with the correct class`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OffersList
                offers={cityOffers}
                cardType={OfferCardType.MAIN}
                onActiveCardChange={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the offers list is on details page`, () => {
    it(`should render with the correct class`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OffersList
                offers={cityOffers}
                cardType={OfferCardType.DETAILS}
                onActiveCardChange={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
