import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {OfferDetails} from "./offer-details";
import {AuthorizationStatus} from "../../reducer/user/user";

configure({
  adapter: new Adapter(),
});

describe(`OfferDetails`, () => {
  it(`triggers onLoad when mounted or updated`, () => {
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
    const onLoad = jest.fn();

    const offerDetails = shallow(
        <OfferDetails
          match={offer.id.toString()}
          city={`Amsterdam`}
          offer={offer}
          offersNearby={[]}
          currentOfferReviews={[]}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          reviewError={``}
          onReviewSubmit={() => null}
          onLoad={onLoad}
        />
    );

    expect(onLoad).toHaveBeenNthCalledWith(1, offer.id);

    const offer2 = Object.assign({}, offer, {id: 100});
    offerDetails.setProps({offer: offer2});
    expect(onLoad).toHaveBeenNthCalledWith(2, offer2.id);
  });
});

