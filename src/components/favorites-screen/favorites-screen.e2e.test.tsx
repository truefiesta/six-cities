import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {configure, mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {FavoritesScreen} from "./favorites-screen.jsx";

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    email: `bla@gmail.com`,
  },
});

const offers = [
  {
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
    isBookmarked: true,
    isPremium: true,
  },
  {
    id: 5,
    image: `img/apartment-01.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 180,
    rating: 5,
    city: {
      name: `Paris`,
      coordinates: [48.8647163943578, 2.359309666406199],
      zoom: 10,
    },
    coordinates: [48.8647163943578, 2.359309666406199],
    zoom: 12,
    name: `Nice, cozy, warm big bed apartment`,
    description:
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    bedrooms: 2,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `apartment`,
    host: {
      id: 2,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: true,
    },
    isBookmarked: true,
    isPremium: true,
  }
];

describe(`FavoritesScreen`, () => {
  it(`calls onBookmarkedOffersLoad on componentDidMount`, () => {
    const onBookmarkedOffersLoad = jest.fn();

    mount(
        <Provider store={store}>
          <Router>
            <FavoritesScreen
              offers={offers}
              cities={[offers[0].city.name, offers[1].city.name]}
              onBookmarkStatusChange={() => null}
              onBookmarkedOffersLoad={onBookmarkedOffersLoad}
            />
          </Router>
        </Provider>
    );

    expect(onBookmarkedOffersLoad).toHaveBeenCalledTimes(1);
  });
});
