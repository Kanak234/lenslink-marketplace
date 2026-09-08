import { Photographer, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'wedding', name: 'Wedding', icon: 'Camera' },
  { id: 'portrait', name: 'Portrait', icon: 'User' },
  { id: 'event', name: 'Events', icon: 'Calendar' },
  { id: 'product', name: 'Product', icon: 'Package' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'real-estate', name: 'Real Estate', icon: 'Home' },
];

export const PHOTOGRAPHERS: Photographer[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    specialty: ['Wedding', 'Portrait'],
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 150,
    location: 'Brooklyn, NY',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400',
    portfolio: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400',
    ],
    isPromoted: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    specialty: ['Product', 'Fashion'],
    rating: 4.8,
    reviewCount: 95,
    pricePerHour: 200,
    location: 'Manhattan, NY',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    portfolio: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
    ],
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    specialty: ['Events', 'Real Estate'],
    rating: 4.7,
    reviewCount: 210,
    pricePerHour: 120,
    location: 'Queens, NY',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    portfolio: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
    ],
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    specialty: ['Wedding', 'Fashion'],
    rating: 5.0,
    reviewCount: 45,
    pricePerHour: 250,
    location: 'Jersey City, NJ',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    portfolio: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400',
    ],
  },
];
