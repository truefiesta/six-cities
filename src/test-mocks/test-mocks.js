export const offers = [
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
    isBookmarked: false,
    isPremium: true,
  },
  {
    id: 2,
    image: `img/apartment-02.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 80,
    rating: 4.2,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.87309666406198],
    zoom: 12,
    name: `Wood and stone place`,
    description:
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    bedrooms: 2,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `room`,
    host: {
      id: 2,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: false,
    },
    isBookmarked: true,
    isPremium: false,
  },
  {
    id: 3,
    image: `img/apartment-03.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 132,
    rating: 4.3,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.87509666406198],
    zoom: 12,
    name: `Canal view Prinsengracht`,
    description:
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    bedrooms: 3,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `apartment`,
    host: {
      id: 4,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: false,
    },
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: 4,
    image: `img/apartment-01.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 180,
    rating: 5,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.95309666406198],
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
      id: 3,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: true,
    },
    isBookmarked: false,
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
    isBookmarked: false,
    isPremium: true,
  }
];

export const reviews = [
  {
    id: 1,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    rating: 4.1,
    user: {
      id: 1,
      name: `Max`,
      status: true,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-04-24`,
  },
  {
    id: 2,
    text: `Very good location ,lovely staff ,clean apartment, great beds.`,
    rating: 4.8,
    user: {
      id: 2,
      name: `Anthony`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-06-25`,
  },
  {
    id: 3,
    text: `Neighbours were noisy until the early hours.`,
    rating: 3.8,
    user: {
      id: 3,
      name: `Jerry`,
      status: true,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-05-12`,
  },
  {
    id: 4,
    text: `Excellent location. Apartment well laid out and very roomy.`,
    rating: 4.2,
    user: {
      id: 4,
      name: `Thomas`,
      status: true,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-06-12`,
  },
  {
    id: 5,
    text: `Location was fantastic, Amenities were good, views were good, would probably stay again. Nice large comfortable penthouse with outside areas to sit. Lounge was comfortable and kitchen had what was needed. Close to shops and supermarkets.`,
    rating: 5.0,
    user: {
      id: 5,
      name: `Larry`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-06-10`,
  },
  {
    id: 6,
    text: `Very spacious, clean and in a perfect location.`,
    rating: 4.9,
    user: {
      id: 6,
      name: `Kim`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-05-11`,
  },
  {
    id: 7,
    text: `Nice, but also the check in was very confusing....especially where the office is actually located......putting the notice on the door might work better than on the window where you’re not looking.`,
    rating: 4.6,
    user: {
      id: 7,
      name: `Holy`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-05-05`,
  },
  {
    id: 8,
    text: `The master bed room is spacious and there should be an additional chair and a desk. the last bed room closet need hangers.`,
    rating: 4.8,
    user: {
      id: 8,
      name: `Dylan`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-06-21`,
  },
  {
    id: 9,
    text: `There was nothing I didn't like, it was far better than what I expected!!`,
    rating: 5.0,
    user: {
      id: 9,
      name: `Bernadette`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-05-22`,
  },
  {
    id: 10,
    text: `Excellent location. Apartment well laid out and very roomy.`,
    rating: 4.2,
    user: {
      id: 10,
      name: `Tanya`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-04-11`,
  },
  {
    id: 11,
    text: `No major issues just minor ones of the TV was not a smart TV, so it could connect to our devices wireless and we had to use a cable to stream things from our laptop.`,
    rating: 4.4,
    user: {
      id: 11,
      name: `Caroline`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-03-10`,
  },
  {
    id: 12,
    text: `Very spacious, clean and in a perfect location.`,
    rating: 4.9,
    user: {
      id: 12,
      name: `Sandra`,
      status: false,
      avatar: `img/avatar-max.jpg`,
    },
    date: `2019-05-11`,
  },
];

export const offersNearby = [
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
    isBookmarked: false,
    isPremium: true,
  },
  {
    id: 2,
    image: `img/apartment-02.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 80,
    rating: 4.2,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.87309666406198],
    zoom: 12,
    name: `Wood and stone place`,
    description:
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    bedrooms: 2,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `room`,
    host: {
      id: 2,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: false,
    },
    isBookmarked: true,
    isPremium: false,
  },
  {
    id: 3,
    image: `img/apartment-03.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 132,
    rating: 4.3,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.87509666406198],
    zoom: 12,
    name: `Canal view Prinsengracht`,
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    bedrooms: 3,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `apartment`,
    host: {
      id: 4,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: false,
    },
    isBookmarked: false,
    isPremium: false,
  },
  {
    id: 4,
    image: `img/apartment-01.jpg`,
    photos: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    price: 180,
    rating: 5,
    city: {
      name: `Amsterdam`,
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 10,
    },
    coordinates: [52.369553943508, 4.95309666406198],
    zoom: 12,
    name: `Nice, cozy, warm big bed apartment`,
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
    ],
    bedrooms: 2,
    guests: 4,
    equipment: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
    type: `apartment`,
    host: {
      id: 3,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      status: true,
    },
    isBookmarked: false,
    isPremium: true,
  },
];
