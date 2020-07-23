const createOffer = (hotel) => {
  return {
    id: hotel.id,
    image: hotel.preview_image,
    photos: hotel.images,
    price: hotel.price,
    rating: hotel.rating,
    city: {
      name: hotel.city.name,
      coordinates: [hotel.city.location.latitude, hotel.city.location.longitude],
      zoom: hotel.city.location.zoom,
    },
    coordinates: [hotel.location.latitude, hotel.location.longitude],
    zoom: hotel.location.zoom,
    name: hotel.title,
    description: hotel.description,
    bedrooms: hotel.bedrooms,
    guests: hotel.max_adults,
    equipment: hotel.goods,
    type: hotel.type,
    host: {
      id: hotel.host.id,
      avatar: hotel.host.avatar_url,
      name: hotel.host.name,
      status: hotel.host.is_pro,
    },
    isBookmarked: hotel.is_favorite,
    isPremium: hotel.is_premium,
  };
};

const createReview = (comment) => {
  return {
    id: comment.id,
    text: comment.comment,
    rating: comment.rating,
    user: {
      id: comment.user.id,
      name: comment.user.name,
      status: comment.user.status,
      avatar: comment.user.avatar_url,
    },
    date: comment.date,
  };
};

export {createOffer, createReview};
