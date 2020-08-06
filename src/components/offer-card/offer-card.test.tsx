import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {OfferCardType} from "../../const";
import OfferCard from "./offer-card";

const offer = {
  id: 1,
  image: `img/room.jpg`,
  photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
  price: 120,
  rating: 4.1,
  city: {
    name: `Amsterdam`,
    coordinates: [52.3909553943508, 4.85309666406198],
    zoom: 10,
  },
  coordinates: [52.3909553943508, 4.85939666406198],
  zoom: 12,
  name: `Beautiful & luxurious apartment at great location`,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
  bedrooms: 3,
  guests: 4,
  equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
  type: `apartment`,
  host: {
    id: 1,
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    status: true,
  },
  isBookmarked: false,
  isPremium: true,
};

const mockStore = configureStore([]);
const store = mockStore({});

describe(`OfferCard snapshot`, () => {
  describe(`when offer is rendered on the main page`, () => {
    it(`should render with correct class`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OfferCard
                offer={offer}
                cardType={OfferCardType.MAIN}
                onMouseOver={() => null}
                onMouseOut={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when offer is rendered on the details page`, () => {
    it(`should render with correct class`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OfferCard
                offer={offer}
                cardType={OfferCardType.DETAILS}
                onMouseOver={() => null}
                onMouseOut={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when offer is rendered on the favorites page`, () => {
    it(`should render with correct class`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <OfferCard
                offer={offer}
                cardType={OfferCardType.FAVORITES}
                onMouseOver={() => null}
                onMouseOut={() => null}
              />
            </Router>
          </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
