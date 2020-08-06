export interface CityDetails {
  name: string
  coordinates: Array<number>;
  zoom: number;
}

export interface User {
  id: number;
  name: string;
  status: boolean;
  avatar: string;
}

export interface Offer {
  id: number;
  image: string;
  photos: Array<string>;
  price: number;
  rating: number;
  city: CityDetails;
  coordinates: Array<number>;
  zoom: number;
  name: string;
  description: string;
  bedrooms: number;
  guests: number;
  equipment: Array<string>;
  type: string;
  host: User;
  isBookmarked: boolean;
  isPremium: boolean;
}

export interface Review {
  id: number;
  text: string;
  rating: number;
  date: string;
  user: User;
}
