export interface Photographer {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  location: string;
  imageUrl: string;
  portfolio: string[];
  isPromoted?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
