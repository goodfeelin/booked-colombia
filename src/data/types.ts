// Domain types — mirror future Supabase tables. Source of truth in COP.
export type City = 'Medellín' | 'Bogotá' | 'Cartagena' | 'Cali' | 'Barranquilla' | 'Santa Marta';

export type LocationType =
  | 'Apartment' | 'House' | 'Penthouse' | 'Finca' | 'Pool' | 'Rooftop'
  | 'Kitchen' | 'Studio' | 'Garage' | 'Warehouse' | 'Restaurant' | 'Bar'
  | 'Office' | 'Colonial house' | 'Industrial loft' | 'Villa';

export type ProductionType =
  | 'Photography' | 'Film' | 'Music video' | 'Commercial' | 'Fashion editorial'
  | 'Social media content' | 'Podcast' | 'Product shoot' | 'Interview' | 'Event content';

export type Amenity =
  | 'Natural light' | 'Pool' | 'Rooftop' | 'Kitchen' | 'Parking' | 'Elevator'
  | 'Loading access' | 'High-speed Wi-Fi' | 'Makeup room' | 'Bathroom'
  | 'Air conditioning' | 'Security' | 'Power access' | 'Blackout capability' | 'Outdoor area';

export type Badge = 'Verified' | 'Instant Request' | 'Great Natural Light' | 'Music Video Friendly' | 'Host Favorite';

export interface Listing {
  id: string;
  title: string;
  city: City;
  neighborhood: string;
  type: LocationType;
  hourlyCop: number;
  halfDayCop: number;
  fullDayCop: number;
  cleaningFeeCop: number;
  minHours: number;
  maxCrew: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badges: Badge[];
  amenities: Amenity[];
  description: string;
  rules: string[];
  host: { name: string; avatar: string; verified: boolean; superhost: boolean };
  details: {
    naturalLight: 'Excellent' | 'Good' | 'Controlled';
    bestLightHours: string;
    noise: 'Quiet' | 'Moderate' | 'Lively';
    elevator: boolean;
    parking: string;
    powerOutlets: string;
    wifi: string;
    bathrooms: number;
    makeupArea: boolean;
    furnitureMovable: boolean;
    nightShoots: boolean;
    drone: boolean;
    pets: boolean;
    smoking: 'Not allowed' | 'Outdoor only';
    security: string;
  };
  productionTypes: ProductionType[];
  styleTags: string[];
}
