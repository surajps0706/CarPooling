import {
  Customer,
  Vehicle,
  Address,
  Partner,
  ServiceCategory,
  ServiceItem,
  AddonItem,
  Booking,
  MembershipPlan,
  Coupon,
  NotificationItem
} from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1001',
    fullName: 'Arjun Mehta',
    phone: '+91 98765 43210',
    email: 'arjun.mehta@example.com',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    walletBalance: 150,
    referralCode: 'ARJUN150',
    membershipTier: 'Gold',
    membershipExpiresAt: '2026-09-15',
    totalBookings: 8,
    lifetimeSpend: 4850,
    joinedAt: '2025-11-10'
  },
  {
    id: 'CUST-1002',
    fullName: 'Priya Sharma',
    phone: '+91 91234 56789',
    email: 'priya.s@example.com',
    walletBalance: 50,
    referralCode: 'PRIYA50',
    membershipTier: 'Silver',
    membershipExpiresAt: '2026-08-30',
    totalBookings: 3,
    lifetimeSpend: 1849,
    joinedAt: '2026-01-14'
  },
  {
    id: 'CUST-1003',
    fullName: 'Rohit Kapoor',
    phone: '+91 87654 32100',
    email: 'rohit.k@example.com',
    walletBalance: 300,
    referralCode: 'ROHIT300',
    membershipTier: 'Platinum',
    membershipExpiresAt: '2027-02-01',
    totalBookings: 14,
    lifetimeSpend: 18999,
    joinedAt: '2025-06-20'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'VEH-01',
    customerId: 'CUST-1001',
    make: 'Honda',
    model: 'City ZX',
    year: 2023,
    type: 'sedan',
    color: 'Pearl White',
    registrationNumber: 'KA01CQ5521',
    isDefault: true
  },
  {
    id: 'VEH-02',
    customerId: 'CUST-1001',
    make: 'Hyundai',
    model: 'i20 N Line',
    year: 2024,
    type: 'hatchback',
    color: 'Thunder Blue',
    registrationNumber: 'KA03FZ7823',
    isDefault: false
  },
  {
    id: 'VEH-03',
    customerId: 'CUST-1003',
    make: 'Toyota',
    model: 'Fortuner Legender',
    year: 2024,
    type: 'suv',
    color: 'Attitude Black',
    registrationNumber: 'KA05AB1234',
    isDefault: true
  },
  {
    id: 'VEH-04',
    customerId: 'CUST-1001',
    make: 'Royal Enfield',
    model: 'Hunter 350',
    year: 2024,
    type: 'bike',
    color: 'Dapper Ash',
    registrationNumber: 'KA01BK2024',
    isDefault: false
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'ADDR-01',
    customerId: 'CUST-1001',
    label: 'Home',
    line1: '14B, Brigade Millennium Apartments',
    line2: 'JP Nagar 7th Phase',
    landmark: 'Near JP Nagar Metro Station',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560078',
    latitude: 12.892,
    longitude: 77.584,
    isDefault: true
  },
  {
    id: 'ADDR-02',
    customerId: 'CUST-1001',
    label: 'Work',
    line1: 'Prestige Tech Park, Building 3, 4th Floor',
    line2: 'Marathahalli Outer Ring Road',
    landmark: 'Opposite Cessna Business Park',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560103',
    latitude: 12.936,
    longitude: 77.694,
    isDefault: false
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'PRTNR-001',
    fullName: 'Rahul Verma',
    phone: '+91 94443 21111',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    totalRatings: 184,
    completionRate: 99.2,
    punctualityScore: 98.5,
    specialization: 'Premium Detailing & Polish Specialist',
    vehicleAssigned: 'Honda Activa 6G • KA03EQ1122',
    isAvailable: true,
    currentLatitude: 12.898,
    currentLongitude: 77.589,
    totalJobsToday: 4,
    earningsToday: 1850,
    branch: 'South Bangalore - Koramangala'
  },
  {
    id: 'PRTNR-002',
    fullName: 'Suresh Kumar',
    phone: '+91 95552 33333',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    totalRatings: 142,
    completionRate: 97.8,
    punctualityScore: 96.0,
    specialization: 'Two-Wheeler & General Wash Technician',
    vehicleAssigned: 'TVS XL100 • KA05EX4455',
    isAvailable: true,
    currentLatitude: 12.912,
    currentLongitude: 77.641,
    totalJobsToday: 5,
    earningsToday: 1240,
    branch: 'HSR Layout & BTM'
  },
  {
    id: 'PRTNR-003',
    fullName: 'Mahesh Naidu',
    phone: '+91 96661 55555',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    totalRatings: 210,
    completionRate: 98.9,
    punctualityScore: 99.0,
    specialization: 'Ceramic Coating & Paint Protection Specialist',
    vehicleAssigned: 'Mahindra Supro Van • KA53M9988',
    isAvailable: true,
    currentLatitude: 12.971,
    currentLongitude: 77.749,
    totalJobsToday: 2,
    earningsToday: 2990,
    branch: 'East Bangalore - Whitefield'
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // 🚗 CAR CATEGORIES (12)
  {
    id: 'CAT-CAR-01',
    name: 'Wash Only',
    slug: 'car-wash-only',
    iconName: 'Droplets',
    description: 'High-pressure exterior water rinse and foam shampoo wash',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-02',
    name: 'Cleaning',
    slug: 'car-cleaning',
    iconName: 'Sparkles',
    description: 'Exterior foam wash plus interior mat cleaning and vacuuming',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-03',
    name: 'Polishing',
    slug: 'car-polishing',
    iconName: 'Shield',
    description: 'Single stage body gloss polish and hydrophobic wax seal',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-04',
    name: 'Detailing',
    slug: 'car-detailing',
    iconName: 'Gem',
    description: 'Full body paint correction, scratch reduction and ceramic coating',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-05',
    name: 'Interior',
    slug: 'car-interior',
    iconName: 'Sparkles',
    description: 'Deep seat shampoo, roof lining steam clean and dashboard UV dressing',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-06',
    name: 'Engine Oil',
    slug: 'car-engine-oil',
    iconName: 'Wrench',
    description: 'Synthetic engine oil drain, flush, and filter replacement',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-07',
    name: 'AC Service',
    slug: 'car-ac-service',
    iconName: 'Zap',
    description: 'R134a/R1234yf gas top-up, AC filter clean & vent sanitization',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-08',
    name: 'General Service',
    slug: 'car-general-service',
    iconName: 'Wrench',
    description: 'Full 50-point safety checkup, fluids top-up & scanner diagnostics',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-09',
    name: 'Tyre & Brake',
    slug: 'car-tyre-brake',
    iconName: 'Shield',
    description: 'Brake pad thickness check, rotor de-glazing & tire pressure balance',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-10',
    name: 'Battery',
    slug: 'car-battery',
    iconName: 'Zap',
    description: 'Voltage load audit, terminal anti-corrosion spray & jumper service',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-11',
    name: 'Spare Parts',
    slug: 'car-spare-parts',
    iconName: 'Wrench',
    description: 'Genuine OEM wiper blade, bulb, and minor filter replacements',
    targetVehicle: 'car'
  },
  {
    id: 'CAT-CAR-12',
    name: 'Puncture',
    slug: 'car-puncture',
    iconName: 'Wrench',
    description: 'Doorstep Four Wheeler puncture repair & air leak emergency service',
    targetVehicle: 'car'
  },

  // 🏍️ BIKE CATEGORIES (11)
  {
    id: 'CAT-BK-01',
    name: 'Wash Only',
    slug: 'bike-wash-only',
    iconName: 'Droplets',
    description: 'High pressure snow foam wash & microfiber hand dry',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-02',
    name: 'Cleaning',
    slug: 'bike-cleaning',
    iconName: 'Sparkles',
    description: 'Deep engine bay degrease, wheel rim wash & body shampoo',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-03',
    name: 'Polishing',
    slug: 'bike-polishing',
    iconName: 'Shield',
    description: 'Quick tank & fairing liquid wax gloss polish',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-04',
    name: 'Detailing',
    slug: 'bike-detailing',
    iconName: 'Gem',
    description: 'Complete motorcycle ceramic shine, chrome polish & matte guard',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-05',
    name: 'Engine Oil',
    slug: 'bike-engine-oil',
    iconName: 'Wrench',
    description: '4T synthetic oil change, engine flush & oil strainer clean',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-06',
    name: 'Chain Service',
    slug: 'bike-chain-service',
    iconName: 'Shield',
    description: 'Chain grunge wash, tension adjustment & PTFE non-fling lube',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-07',
    name: 'General Service',
    slug: 'bike-general-service',
    iconName: 'Wrench',
    description: 'Comprehensive 30-point motorcycle health audit & cable adjustment',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-08',
    name: 'Tyre & Brake',
    slug: 'bike-tyre-brake',
    iconName: 'Shield',
    description: 'Front/rear disc pad check, drum shoe cleaning & PSI check',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-09',
    name: 'Battery',
    slug: 'bike-battery',
    iconName: 'Zap',
    description: 'Battery cranking voltage check, terminal polish & fuse test',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-10',
    name: 'Spare Parts',
    slug: 'bike-spare-parts',
    iconName: 'Wrench',
    description: 'Clutch/brake lever, accelerator cable & mirror replacement',
    targetVehicle: 'bike'
  },
  {
    id: 'CAT-BK-11',
    name: 'Puncture',
    slug: 'bike-puncture',
    iconName: 'Wrench',
    description: 'Doorstep Two Wheeler puncture repair & emergency air fix',
    targetVehicle: 'bike'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  // --- CAR SERVICES ---
  {
    id: 'SRV-CAR-01',
    categoryId: 'CAT-CAR-01',
    name: 'Basic Exterior Wash',
    slug: 'basic-exterior-wash',
    description: 'High-pressure water rinse, pH-neutral foam wash, tire dressing, and microfiber dry.',
    durationMinutes: 30,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 199, sedan: 249, suv: 299, muv: 299, bike: 0, truck: 499 },
    memberPricing: { hatchback: 169, sedan: 209, suv: 249, muv: 249, bike: 0, truck: 419 },
    inclusions: ['Underbody rinse', 'pH-neutral snow foam wash', 'Hand mitt dry', 'Tire dressing'],
    checklist: ['Pre-rinse body', 'Apply foam shampoo', 'Microfiber wash', 'Tire shine'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'SRV-CAR-02',
    categoryId: 'CAT-CAR-02',
    name: 'Foam Clean & Vacuum',
    slug: 'foam-clean-vacuum',
    description: 'Dense snow foam bath, wheel rim degreasing, and full cabin vacuuming.',
    durationMinutes: 45,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 349, sedan: 449, suv: 549, muv: 549, bike: 0, truck: 799 },
    memberPricing: { hatchback: 299, sedan: 379, suv: 459, muv: 459, bike: 0, truck: 679 },
    inclusions: ['Snow foam bath', 'Floor mat vacuum', 'Dashboard wipe', 'Alloy wheel cleaning'],
    checklist: ['Foam cannon soak', 'Vacuum seats and trunk', 'Clean glass windows'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-CAR-03',
    categoryId: 'CAT-CAR-03',
    name: 'Express Body Wax & Polish',
    slug: 'express-body-polish',
    description: 'Single-stage orbital machine polish with hydrophobic carnauba wax seal.',
    durationMinutes: 60,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 699, sedan: 799, suv: 999, muv: 999, bike: 0, truck: 1399 },
    memberPricing: { hatchback: 599, sedan: 679, suv: 849, muv: 849, bike: 0, truck: 1199 },
    inclusions: ['Single stage buffing', 'Carnauba liquid wax seal', 'Exterior chrome polish'],
    checklist: ['Decontaminate paint', 'Machine polish panels', 'Buff to high gloss'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-04',
    categoryId: 'CAT-CAR-04',
    name: 'Full Body Ceramic Detailing',
    slug: 'ceramic-detailing',
    description: 'Multi-stage paint swirl correction and 1-Year Nano Ceramic Protective Coating spray.',
    durationMinutes: 120,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 2499, sedan: 2999, suv: 3799, muv: 3799, bike: 0, truck: 4999 },
    memberPricing: { hatchback: 2124, sedan: 2549, suv: 3229, muv: 3229, bike: 0, truck: 4249 },
    inclusions: ['Clay bar prep', 'Swirl mark correction', 'Nano ceramic layer curing'],
    checklist: ['Clay bar rub', 'Machine dual action buffing', 'Apply ceramic coating'],
    minPhotosBefore: 6,
    minPhotosAfter: 6,
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-CAR-05',
    categoryId: 'CAT-CAR-05',
    name: 'Full Interior Spa & Deep Scrub',
    slug: 'interior-spa',
    description: 'Deep seat shampoo, dashboard UV restoration, roof lining sanitization & trunk vacuum.',
    durationMinutes: 90,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 599, sedan: 699, suv: 849, muv: 849, bike: 0, truck: 1199 },
    memberPricing: { hatchback: 499, sedan: 589, suv: 719, muv: 719, bike: 0, truck: 999 },
    inclusions: ['Upholstery steam shampoo', 'AC vent sanitization spray', 'Dashboard polish'],
    checklist: ['Extract carpet dirt', 'Sanitize upholstery', 'Apply anti-static polish'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-06',
    categoryId: 'CAT-CAR-06',
    name: 'Engine Oil & Filter Service',
    slug: 'car-engine-oil-change',
    description: 'Full synthetic 5W-30 / 5W-40 oil drain, engine flush treatment & fresh oil filter fitment.',
    durationMinutes: 45,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 1499, sedan: 1899, suv: 2299, muv: 2299, bike: 0, truck: 2999 },
    memberPricing: { hatchback: 1299, sedan: 1649, suv: 1999, muv: 1999, bike: 0, truck: 2599 },
    inclusions: ['Synthetic engine oil refill', 'New oil filter replacement', 'Sludge flush treatment'],
    checklist: ['Drain old oil', 'Replace filter', 'Fill fresh synthetic oil', 'Check dipstick'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-07',
    categoryId: 'CAT-CAR-07',
    name: 'AC Cooling & Gas Refill',
    slug: 'car-ac-service',
    description: 'AC gas pressure check, refrigerant top-up, cabin filter cleaning & duct sanitization.',
    durationMinutes: 40,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 799, sedan: 999, suv: 1199, muv: 1199, bike: 0, truck: 1599 },
    memberPricing: { hatchback: 699, sedan: 849, suv: 1019, muv: 1019, bike: 0, truck: 1359 },
    inclusions: ['R134a AC Gas top-up', 'Cabin air filter blower clean', 'Anti-bacterial foam vent clean'],
    checklist: ['Measure vent temp', 'Top up AC gas', 'Clean cabin filter', 'Test cooling efficiency'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-08',
    categoryId: 'CAT-CAR-08',
    name: 'Comprehensive 50-Point General Service',
    slug: 'car-general-service',
    description: 'Complete bumper-to-bumper diagnostic inspection, fluid top-up, spark plug check & road test.',
    durationMinutes: 90,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 1999, sedan: 2499, suv: 2999, muv: 2999, bike: 0, truck: 3999 },
    memberPricing: { hatchback: 1699, sedan: 2124, suv: 2549, muv: 2549, bike: 0, truck: 3399 },
    inclusions: ['OBD-II computer scan', 'Coolant & brake fluid top-up', 'Spark plug clearance check'],
    checklist: ['Scan error codes', 'Inspect belt & hoses', 'Top up all fluids', 'Perform road test'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-CAR-09',
    categoryId: 'CAT-CAR-09',
    name: 'Brake Pad & Tyre Care',
    slug: 'car-tyre-brake-service',
    description: 'Front & rear brake pad thickness check, caliper greasing, disc rust removal & tire rotation.',
    durationMinutes: 45,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 499, sedan: 599, suv: 749, muv: 749, bike: 0, truck: 999 },
    memberPricing: { hatchback: 419, sedan: 499, suv: 629, muv: 629, bike: 0, truck: 849 },
    inclusions: ['Brake pad mm measurement', 'Caliper pin lubrication', 'Tire tread depth & PSI balance'],
    checklist: ['Inspect brake lining', 'Clean brake dust', 'Check tire pressure'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-10',
    categoryId: 'CAT-CAR-10',
    name: 'Battery Health & Terminal Service',
    slug: 'car-battery-service',
    description: 'Digital battery load testing, terminal corrosion cleaning, gel application & alternator audit.',
    durationMinutes: 25,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 299, sedan: 349, suv: 399, muv: 399, bike: 0, truck: 499 },
    memberPricing: { hatchback: 249, sedan: 289, suv: 339, muv: 339, bike: 0, truck: 419 },
    inclusions: ['Voltage & cranking amp test', 'Terminal wire brush clean', 'Anti-sulfation gel coating'],
    checklist: ['Measure CCA', 'Clean terminals', 'Apply gel', 'Test alternator charging'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-11',
    categoryId: 'CAT-CAR-11',
    name: 'Doorstep Spare Replacement',
    slug: 'car-spare-parts-replacement',
    description: 'Fitment of OEM framing wiper blades, bulb replacements, and washer fluid concentrate top-up.',
    durationMinutes: 30,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 399, sedan: 449, suv: 499, muv: 499, bike: 0, truck: 599 },
    memberPricing: { hatchback: 339, sedan: 379, suv: 419, muv: 419, bike: 0, truck: 499 },
    inclusions: ['Wiper blade replacement labor', 'Bulb installation', 'Windshield washer fluid top-up'],
    checklist: ['Remove old blades', 'Install genuine wiper blades', 'Test spray jet'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-CAR-12',
    categoryId: 'CAT-CAR-12',
    name: 'Four Wheeler Puncture & Tyre Repair',
    slug: 'car-puncture-repair',
    description: 'On-demand doorstep repair for tubeless plug strip, tube patch, valve core replacement or wheel swap.',
    durationMinutes: 25,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 249, sedan: 299, suv: 349, muv: 349, bike: 0, truck: 449 },
    memberPricing: { hatchback: 199, sedan: 249, suv: 299, muv: 299, bike: 0, truck: 379 },
    inclusions: ['Tubeless puncture strip repair', 'Air pressure check & top-up', 'Valve leak inspection'],
    checklist: ['Locate puncture nail/hole', 'Apply rubber plug strip', 'Inflate to recommended PSI'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },

  // --- BIKE SERVICES ---
  {
    id: 'SRV-BK-01',
    categoryId: 'CAT-BK-01',
    name: 'Express Bike Snow Foam Wash',
    slug: 'bike-snow-foam-wash',
    description: 'High-pressure foam rinse, engine de-greasing, tire dressing and microfiber drying.',
    durationMinutes: 25,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 129, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 99, truck: 0 },
    inclusions: ['High pressure water pre-rinse', 'Dense snow foam bath', 'Tire wet shine dressing'],
    checklist: ['Rinse bike', 'Foam shampoo scrub', 'Dry body panels', 'Apply tire shine'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-02',
    categoryId: 'CAT-BK-02',
    name: 'Deep Bike Cleaning & Degreasing',
    slug: 'bike-deep-clean-degrease',
    description: 'Chassis grime removal, wheel spoke detailing, and engine head oil stain scrubbing.',
    durationMinutes: 35,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 159, truck: 0 },
    inclusions: ['Heavy-duty engine degreaser', 'Spoke wheel brush wash', 'Under-seat dust vacuuming'],
    checklist: ['Spray degreaser on engine', 'Brush wheel spokes', 'Pressure wash & dry'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-03',
    categoryId: 'CAT-BK-03',
    name: 'Quick Wax Gloss Polish',
    slug: 'bike-wax-polish',
    description: 'Liquid synthetic wax rub for fuel tank, side fairings and mirror housing.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 119, truck: 0 },
    inclusions: ['High-gloss liquid wax coating', 'Headlight lens clear polish', 'Black plastics dressing'],
    checklist: ['Clean surface dust', 'Apply wax polish', 'Buff with microfiber mitt'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-04',
    categoryId: 'CAT-BK-04',
    name: 'Motorcycle Ceramic Detailing',
    slug: 'bike-ceramic-detailing',
    description: 'Multi-stage paint correction, scratch reduction, chrome shining & 1-Year Ceramic spray sealant.',
    durationMinutes: 60,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 899, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 749, truck: 0 },
    inclusions: ['Clay bar tank prep', 'Machine swirl removal polish', 'Ceramic hydrophobic coat'],
    checklist: ['Clay decontamination', 'Machine buff tank & fairings', 'Apply ceramic layer'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-05',
    categoryId: 'CAT-BK-05',
    name: 'Engine Oil Change & Flush',
    slug: 'bike-engine-oil-change',
    description: '4T 10W-30 / 10W-40 synthetic engine oil replacement with sludge flush treatment.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 399, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 339, truck: 0 },
    inclusions: ['Full oil drain & engine flush', 'Fresh 4T premium engine oil refill', 'Strainer cleaning'],
    checklist: ['Check oil level', 'Drain old oil', 'Flush engine', 'Refill fresh oil'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-06',
    categoryId: 'CAT-BK-06',
    name: 'Chain Cleaning & PTFE Lube',
    slug: 'bike-chain-cleaning-lube',
    description: 'Degreasing wash with 3-sided grunge brush, slack adjustment & non-fling synthetic lube.',
    durationMinutes: 25,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    inclusions: ['Kerosene degreaser wash', 'Slack tension setting (25-30mm)', 'PTFE chain lube coating'],
    checklist: ['Degrease drive chain', 'Scrub with grunge brush', 'Adjust chain tensioners', 'Apply lube'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-07',
    categoryId: 'CAT-BK-07',
    name: '30-Point Bike General Service',
    slug: 'bike-general-service',
    description: 'Spark plug clean, air filter blowout, brake adjustment, clutch free-play & throttle lube.',
    durationMinutes: 45,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 499, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 419, truck: 0 },
    inclusions: ['Air filter cleaning', 'Spark plug gap calibration', 'Control cable oiling'],
    checklist: ['Clean air filter', 'Gap spark plug', 'Oil accelerator & clutch cables', 'Road test'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-08',
    categoryId: 'CAT-BK-08',
    name: 'Tyre PSI & Brake Shoe Care',
    slug: 'bike-tyre-brake-service',
    description: 'Disc pad thickness inspection, drum shoe sandpaper de-glazing & tire tread audit.',
    durationMinutes: 25,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 159, truck: 0 },
    inclusions: ['Brake cleaner spray wash', 'Drum shoe de-glazing', 'PSI inflation check'],
    checklist: ['Inspect brake lining', 'Sand drum shoes', 'Set tire pressure'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-09',
    categoryId: 'CAT-BK-09',
    name: 'Battery Check & Terminal Polish',
    slug: 'bike-battery-service',
    description: 'Digital voltage load test, terminal wire brushing, and electrolyte top-up.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 119, truck: 0 },
    inclusions: ['Load test voltage measure', 'Terminal post cleaning', 'Anti-sulfation gel coat'],
    checklist: ['Measure voltage', 'Clean terminals', 'Apply gel'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-10',
    categoryId: 'CAT-BK-10',
    name: 'Spare Parts & Cable Fitment',
    slug: 'bike-spare-parts-service',
    description: 'Fitting of clutch/brake cables, rear view mirrors, levers, footpegs or bulbs.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    inclusions: ['Cable routing & lubrication', 'Mirror alignment', 'Lever free-play adjustment'],
    checklist: ['Replace broken cable/part', 'Lubricate pivot points', 'Verify operation'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-11',
    categoryId: 'CAT-BK-11',
    name: 'Two Wheeler Puncture & Tyre Repair',
    slug: 'bike-puncture-repair',
    description: 'On-demand doorstep puncture strip plug, tube patch repair or air leak service.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 119, truck: 0 },
    inclusions: ['Tubeless strip repair / tube patch', 'High-pressure air inflation', 'Valve core check'],
    checklist: ['Locate puncture site', 'Apply strip or vulcanized patch', 'Inflate to correct PSI'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  }
];

export const ADDONS_CATALOG: AddonItem[] = [
  {
    id: 'ADD-01',
    name: 'Wet-Look Tyre Shine',
    description: 'High-gloss silicone dressing protecting rubber from cracking',
    price: 99,
    durationMinutes: 10,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv', 'bike'],
    iconName: 'Disc'
  },
  {
    id: 'ADD-02',
    name: 'Anti-Glare Dashboard Polish',
    description: 'UV-blocking matte finish conditioner for plastic trim',
    price: 149,
    durationMinutes: 10,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    iconName: 'Shield'
  },
  {
    id: 'ADD-03',
    name: 'Glass Hydrophobic Coating',
    description: 'Rain-repellent nano spray for front windshield',
    price: 299,
    durationMinutes: 15,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    iconName: 'Wind'
  },
  {
    id: 'ADD-04',
    name: 'Cabin Odor Neutralizer Spray',
    description: 'Bacterial-action eliminator removing smoke and damp smells',
    price: 199,
    durationMinutes: 15,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    iconName: 'Sparkles'
  },
  {
    id: 'ADD-05',
    name: 'Alloy Wheel Brake-Dust Deep Clean',
    description: 'Acid-free chemical breakdown of baked-on brake dust',
    price: 249,
    durationMinutes: 20,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    iconName: 'CircleDot'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'PLAN-01',
    name: 'Silver Club',
    tier: 'Silver',
    duration: 'Monthly',
    price: 599,
    freeWashePerMonth: 2,
    discountPercent: 10,
    addonDiscountPercent: 5,
    benefits: [
      '2 Free Basic Exterior Washes / month',
      '10% Discount on all detailing services',
      '5% Discount on add-on treatments',
      'Standard customer support'
    ]
  },
  {
    id: 'PLAN-02',
    name: 'Gold Executive',
    tier: 'Gold',
    duration: 'Monthly',
    price: 999,
    freeWashePerMonth: 4,
    discountPercent: 15,
    addonDiscountPercent: 10,
    isPopular: true,
    benefits: [
      '4 Free Basic Washes + 1 Free Foam Upgrade',
      '15% Discount on all detailing services',
      '10% Discount on add-on treatments',
      'Priority slot booking guarantee',
      'Dedicated partner allocation (4.5+ rating)'
    ]
  },
  {
    id: 'PLAN-03',
    name: 'Platinum Prestige',
    tier: 'Platinum',
    duration: 'Monthly',
    price: 1799,
    freeWashePerMonth: 8,
    discountPercent: 20,
    addonDiscountPercent: 15,
    benefits: [
      '8 Free Premium Washes / month',
      '20% Discount across entire catalog',
      '15% Discount on ceramic treatments',
      'Same-day emergency slot booking',
      'Multi-vehicle coverage (up to 4 cars)',
      'Free quarterly cabin odor elimination'
    ]
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'CPN-01',
    code: 'FIRSTWASH',
    title: 'Welcome to AutoCare Pro',
    description: 'Get 30% off your very first service booking',
    discountType: 'percentage',
    discountValue: 30,
    minOrderValue: 299,
    maxDiscountCap: 200,
    validUntil: '2026-12-31'
  },
  {
    id: 'CPN-02',
    code: 'WEEKEND25',
    title: 'Weekend Refresh Discount',
    description: '25% off all Premium Foam Wash bookings',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 400,
    maxDiscountCap: 150,
    validUntil: '2026-08-31'
  },
  {
    id: 'CPN-03',
    code: 'CERAMIC500',
    title: 'Flat ₹500 Ceramic Discount',
    description: 'Flat ₹500 off on 1-Year or 3-Year Ceramic Spray',
    discountType: 'flat',
    discountValue: 500,
    minOrderValue: 2000,
    validUntil: '2026-09-30'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ACP-20901',
    bookingRef: 'ACP-20901',
    customerId: 'CUST-1001',
    customerName: 'Arjun Mehta',
    customerPhone: '+91 98765 43210',
    customerAddress: INITIAL_ADDRESSES[0],
    vehicle: INITIAL_VEHICLES[0],
    service: SERVICE_ITEMS[1], // Premium Foam Wash
    addons: [ADDONS_CATALOG[0]], // Tyre shine
    partnerId: 'PRTNR-001',
    partner: INITIAL_PARTNERS[0],
    scheduledDate: '2026-08-07',
    scheduledSlot: '10:00 AM - 11:30 AM',
    status: 'IN_PROGRESS',
    subtotal: 548,
    discountAmount: 82,
    taxAmount: 83,
    totalAmount: 549,
    couponCode: 'GOLDAUG',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    specialInstructions: 'Please take extra care near front bumper scratch.',
    checklistCompleted: ['Perform initial paint inspection', 'Foam cannon coverage'],
    photos: [
      {
        id: 'PHT-101',
        bookingId: 'ACP-20901',
        type: 'before',
        angleLabel: 'front',
        photoUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
        uploadedAt: '2026-08-07T10:05:00Z'
      },
      {
        id: 'PHT-102',
        bookingId: 'ACP-20901',
        type: 'before',
        angleLabel: 'rear',
        photoUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
        uploadedAt: '2026-08-07T10:06:00Z'
      }
    ],
    createdAt: '2026-08-06T18:30:00Z'
  },
  {
    id: 'ACP-20902',
    bookingRef: 'ACP-20902',
    customerId: 'CUST-1002',
    customerName: 'Priya Sharma',
    customerPhone: '+91 91234 56789',
    customerAddress: {
      id: 'ADDR-03',
      customerId: 'CUST-1002',
      label: 'Home',
      line1: '302, Green Valley Residency',
      line2: 'HSR Layout Sector 2',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560102',
      latitude: 12.911,
      longitude: 77.639,
      isDefault: true
    },
    vehicle: {
      id: 'VEH-04',
      customerId: 'CUST-1002',
      make: 'Maruti',
      model: 'Swift ZXi',
      year: 2022,
      type: 'hatchback',
      color: 'Solid Red',
      registrationNumber: 'KA03FZ7823',
      isDefault: true
    },
    service: SERVICE_ITEMS[3], // Interior + Exterior Combo
    addons: [],
    partnerId: 'PRTNR-002',
    partner: INITIAL_PARTNERS[1],
    scheduledDate: '2026-08-06',
    scheduledSlot: '02:00 PM - 03:30 PM',
    status: 'COMPLETED',
    subtotal: 849,
    discountAmount: 85,
    taxAmount: 137,
    totalAmount: 901,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    customerRating: 5,
    customerReview: 'Rahul was professional, punctual, and the car looks absolutely spotless. Best detailing service!',
    photos: [],
    checklistCompleted: [],
    createdAt: '2026-08-05T14:20:00Z',
    completedAt: '2026-08-06T15:45:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: '🎉 Service Partner Rahul is On The Way',
    body: 'Rahul Verma has started navigation to your address. Estimated arrival: 12 minutes.',
    type: 'booking',
    timestamp: '10 mins ago',
    isRead: false,
    bookingId: 'ACP-20901'
  },
  {
    id: 'NOTIF-02',
    title: '🏷️ Exclusive Gold Bonus Credited',
    body: '₹150 monthly bonus wash credit has been added to your AutoCare Wallet.',
    type: 'offer',
    timestamp: '2 hours ago',
    isRead: true
  }
];
