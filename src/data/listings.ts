import type { Listing, Amenity, LocationType, ProductionType, City } from './types';
import poblado from '@/assets/loc-poblado.jpg';
import cartagena from '@/assets/loc-cartagena.jpg';
import bogotaLoft from '@/assets/loc-bogota-loft.jpg';
import laureles from '@/assets/loc-laureles.jpg';
import rooftop from '@/assets/loc-rooftop.jpg';
import finca from '@/assets/loc-finca.jpg';

export const CITIES: City[] = ['Medellín', 'Bogotá', 'Cartagena', 'Cali', 'Barranquilla', 'Santa Marta'];
export const LAUNCH_CITIES: City[] = ['Medellín', 'Bogotá', 'Cartagena'];

export const LOCATION_TYPES: LocationType[] = [
  'Apartment','House','Penthouse','Finca','Pool','Rooftop','Kitchen','Studio',
  'Garage','Warehouse','Restaurant','Bar','Office','Colonial house','Industrial loft','Villa',
];

export const PRODUCTION_TYPES: ProductionType[] = [
  'Photography','Film','Music video','Commercial','Fashion editorial',
  'Social media content','Podcast','Product shoot','Interview','Event content',
];

export const AMENITIES: Amenity[] = [
  'Natural light','Pool','Rooftop','Kitchen','Parking','Elevator','Loading access',
  'High-speed Wi-Fi','Makeup room','Bathroom','Air conditioning','Security',
  'Power access','Blackout capability','Outdoor area',
];

const baseHost = (name: string, superhost = false) => ({
  name, avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(name)}`, verified: true, superhost,
});

export const LISTINGS: Listing[] = [
  {
    id: 'poblado-glass-penthouse',
    title: 'El Poblado Glass Penthouse',
    city: 'Medellín', neighborhood: 'El Poblado', type: 'Penthouse',
    hourlyCop: 320000, halfDayCop: 1200000, fullDayCop: 2100000, cleaningFeeCop: 80000,
    minHours: 3, maxCrew: 15, rating: 4.95, reviewCount: 84,
    image: poblado, gallery: [poblado, rooftop, finca],
    badges: ['Verified', 'Great Natural Light', 'Host Favorite'],
    amenities: ['Natural light','Rooftop','Kitchen','Parking','Elevator','High-speed Wi-Fi','Bathroom','Air conditioning','Power access','Outdoor area'],
    description: 'Modern luxury penthouse with floor-to-ceiling windows opening over the Aburrá Valley. Mid-century furniture, brass accents, cobalt velvet sofas, and golden hour light from 4–6pm.',
    rules: ['No smoking indoors','Move furniture with host approval','Quiet hours after 10pm','No confetti or open flames'],
    host: baseHost('Mariana Restrepo', true),
    details: {
      naturalLight: 'Excellent', bestLightHours: '8–11am, 4–6pm', noise: 'Quiet', elevator: true,
      parking: '4 covered spots + valet', powerOutlets: '20A circuits, 30+ outlets', wifi: '500 Mbps fiber',
      bathrooms: 3, makeupArea: true, furnitureMovable: true, nightShoots: true, drone: true, pets: false,
      smoking: 'Outdoor only', security: '24/7 concierge + biometric access',
    },
    productionTypes: ['Photography','Fashion editorial','Commercial','Social media content','Music video'],
    styleTags: ['Luxury','Modern','Skyline','Golden hour'],
  },
  {
    id: 'cartagena-colonial-villa',
    title: 'Cartagena Colonial Courtyard Villa',
    city: 'Cartagena', neighborhood: 'Centro Histórico', type: 'Colonial house',
    hourlyCop: 480000, halfDayCop: 1800000, fullDayCop: 3200000, cleaningFeeCop: 120000,
    minHours: 4, maxCrew: 25, rating: 4.98, reviewCount: 132,
    image: cartagena, gallery: [cartagena, finca, poblado],
    badges: ['Verified', 'Host Favorite', 'Instant Request'],
    amenities: ['Pool','Natural light','Kitchen','Bathroom','Outdoor area','Power access','High-speed Wi-Fi','Security'],
    description: 'A bougainvillea-draped colonial inside the walled city. Saffron yellow walls, blue-tile pool, hand-painted Talavera floors. The patio shoots like a postcard from any angle.',
    rules: ['No drone over neighbors','Heritage walls — no adhesive','Respect siesta hours','No late-night amplified music'],
    host: baseHost('Andrés Movilla', true),
    details: {
      naturalLight: 'Excellent', bestLightHours: '7–10am, 3–6pm', noise: 'Lively', elevator: false,
      parking: '2 nearby lots, loading by horse-cart corridor', powerOutlets: '15A, 18 outlets',
      wifi: '300 Mbps', bathrooms: 4, makeupArea: true, furnitureMovable: true,
      nightShoots: true, drone: false, pets: true, smoking: 'Outdoor only',
      security: 'Caretaker on-site',
    },
    productionTypes: ['Fashion editorial','Photography','Commercial','Music video','Film'],
    styleTags: ['Colonial','Tropical','Colorful','Heritage'],
  },
  {
    id: 'bogota-brutalist-loft',
    title: 'Bogotá Brutalist Loft Studio',
    city: 'Bogotá', neighborhood: 'Chapinero Alto', type: 'Industrial loft',
    hourlyCop: 260000, halfDayCop: 980000, fullDayCop: 1750000, cleaningFeeCop: 70000,
    minHours: 3, maxCrew: 12, rating: 4.88, reviewCount: 56,
    image: bogotaLoft, gallery: [bogotaLoft, poblado, rooftop],
    badges: ['Great Natural Light', 'Music Video Friendly'],
    amenities: ['Natural light','Power access','Blackout capability','Bathroom','High-speed Wi-Fi','Loading access','Makeup room'],
    description: 'Raw concrete loft with 6m ceilings and industrial windows facing east. Built for fashion, editorial, and moody product photography. Cyc wall available on request.',
    rules: ['No marks on concrete','Use furniture sliders','Soft-soled shoes only on cyc'],
    host: baseHost('Felipe Quintero'),
    details: {
      naturalLight: 'Good', bestLightHours: '9am–1pm', noise: 'Moderate', elevator: true,
      parking: 'Street + 1 loading bay', powerOutlets: '30A + 110V/220V', wifi: '600 Mbps',
      bathrooms: 2, makeupArea: true, furnitureMovable: true, nightShoots: true, drone: false,
      pets: false, smoking: 'Not allowed', security: 'Building access control',
    },
    productionTypes: ['Fashion editorial','Photography','Music video','Product shoot','Commercial'],
    styleTags: ['Brutalist','Industrial','Editorial','Concrete'],
  },
  {
    id: 'laureles-retro-kitchen',
    title: 'Laureles Retro Kitchen House',
    city: 'Medellín', neighborhood: 'Laureles', type: 'Kitchen',
    hourlyCop: 180000, halfDayCop: 680000, fullDayCop: 1200000, cleaningFeeCop: 50000,
    minHours: 2, maxCrew: 8, rating: 4.92, reviewCount: 71,
    image: laureles, gallery: [laureles, poblado, cartagena],
    badges: ['Verified','Instant Request'],
    amenities: ['Kitchen','Natural light','Bathroom','High-speed Wi-Fi','Power access','Air conditioning'],
    description: 'A quirky mid-century home with a mint-green kitchen, terrazzo floors and a tiled backsplash that pops on camera. Perfect for food, lifestyle and social content.',
    rules: ['No greasy fryers without extractor','Replace any consumed pantry items','Pets by request'],
    host: baseHost('Daniela Ochoa'),
    details: {
      naturalLight: 'Good', bestLightHours: '10am–2pm', noise: 'Quiet', elevator: false,
      parking: 'Street parking', powerOutlets: '15A, 12 outlets', wifi: '200 Mbps',
      bathrooms: 2, makeupArea: false, furnitureMovable: true, nightShoots: false, drone: false,
      pets: true, smoking: 'Not allowed', security: 'Neighborhood watch',
    },
    productionTypes: ['Social media content','Product shoot','Photography','Commercial','Podcast'],
    styleTags: ['Retro','Colorful','Quirky','Warm'],
  },
  {
    id: 'rooftop-neon-terrace',
    title: 'Rooftop Neon Terrace',
    city: 'Bogotá', neighborhood: 'Zona T', type: 'Rooftop',
    hourlyCop: 300000, halfDayCop: 1100000, fullDayCop: 1950000, cleaningFeeCop: 90000,
    minHours: 3, maxCrew: 30, rating: 4.86, reviewCount: 49,
    image: rooftop, gallery: [rooftop, bogotaLoft, poblado],
    badges: ['Music Video Friendly','Instant Request'],
    amenities: ['Rooftop','Outdoor area','Power access','Bathroom','High-speed Wi-Fi','Security'],
    description: 'Glass-edge terrace with built-in cobalt and pink neon, infinity pool and 360° city views. Built for music videos and night shoots.',
    rules: ['No glass near pool','Music permit required after midnight','No fireworks'],
    host: baseHost('Camilo Vargas', true),
    details: {
      naturalLight: 'Controlled', bestLightHours: 'Blue hour 6–7pm', noise: 'Lively', elevator: true,
      parking: 'Building valet', powerOutlets: 'Distributed 220V outlets', wifi: '400 Mbps',
      bathrooms: 2, makeupArea: true, furnitureMovable: true, nightShoots: true, drone: true,
      pets: false, smoking: 'Outdoor only', security: 'Private guard during shoot',
    },
    productionTypes: ['Music video','Event content','Commercial','Fashion editorial','Social media content'],
    styleTags: ['Neon','Night','Cinematic','Skyline'],
  },
  {
    id: 'tropical-finca-pool',
    title: 'Tropical Finca Pool Escape',
    city: 'Medellín', neighborhood: 'San Jerónimo (Antioquia)', type: 'Finca',
    hourlyCop: 420000, halfDayCop: 1600000, fullDayCop: 2800000, cleaningFeeCop: 150000,
    minHours: 4, maxCrew: 35, rating: 4.97, reviewCount: 102,
    image: finca, gallery: [finca, cartagena, poblado],
    badges: ['Verified','Host Favorite','Great Natural Light'],
    amenities: ['Pool','Outdoor area','Natural light','Kitchen','Bathroom','Parking','Power access','Air conditioning'],
    description: 'Tropical finca 45 min from Medellín with infinity pool, palm-shaded loungers and lush mountain backdrop. Built for full-day campaigns.',
    rules: ['Crews of 35+ require host walkthrough','No drone over neighboring fincas','Respect rural night silence'],
    host: baseHost('Sofía Henao', true),
    details: {
      naturalLight: 'Excellent', bestLightHours: 'All day, peak 8–11am & 4–6pm', noise: 'Quiet', elevator: false,
      parking: '15+ vehicles + truck access', powerOutlets: 'Generator backup', wifi: '150 Mbps Starlink',
      bathrooms: 5, makeupArea: true, furnitureMovable: true, nightShoots: true, drone: true,
      pets: true, smoking: 'Outdoor only', security: 'Caretaker + gated entrance',
    },
    productionTypes: ['Commercial','Fashion editorial','Music video','Film','Photography'],
    styleTags: ['Tropical','Lush','Resort','Open-air'],
  },
];

export const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
