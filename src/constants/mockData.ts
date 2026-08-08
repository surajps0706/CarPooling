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
  {
    id: 'CAT-01',
    name: 'Car Wash',
    slug: 'car-wash',
    iconName: 'Droplets',
    description: 'High-pressure exterior wash and foam shampoo services'
  },
  {
    id: 'CAT-02',
    name: 'Interior Cleaning',
    slug: 'interior-cleaning',
    iconName: 'Sparkles',
    description: 'Deep cabin vacuuming, fabric shampoo, and dashboard care'
  },
  {
    id: 'CAT-03',
    name: 'Detailing & Polish',
    slug: 'detailing-polish',
    iconName: 'Shield',
    description: 'Machine polishing, wax protection, and paint restoration'
  },
  {
    id: 'CAT-04',
    name: 'Ceramic Coating',
    slug: 'ceramic-coating',
    iconName: 'Gem',
    description: 'Nano ceramic spray & 9H multi-year paint protection'
  },
  {
    id: 'CAT-05',
    name: 'Bike Care',
    slug: 'bike-care',
    iconName: 'Bike',
    description: 'Specialized motorcycle wash, chain lube, and helmet sanitization'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'SRV-01',
    categoryId: 'CAT-01',
    name: 'Basic Exterior Wash',
    slug: 'basic-exterior-wash',
    description: 'High-pressure water rinse, pH-neutral foam wash, tire dressing, and microfiber hand dry.',
    durationMinutes: 30,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 199, sedan: 249, suv: 299, muv: 299, bike: 99, truck: 499 },
    memberPricing: { hatchback: 169, sedan: 209, suv: 249, muv: 249, bike: 79, truck: 419 },
    inclusions: [
      'High-pressure underbody & arch rinse',
      'pH-neutral snow foam shampoo application',
      'Dual-bucket hand wash with scratch-free mitts',
      'Tire cleaning & wet-look dressing',
      'Streak-free exterior glass cleaning'
    ],
    checklist: [
      'Perform initial paint inspection',
      'High pressure pre-rinse',
      'Apply foam cannon shampoo',
      'Microfiber body scrub',
      'Rinse & blow dry body panels',
      'Apply tire shine'
    ],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  {
    id: 'SRV-02',
    categoryId: 'CAT-01',
    name: 'Premium Foam Wash',
    slug: 'premium-foam-wash',
    description: 'Deep snow foam bath, wheel rim degreasing, glass hydrophobic spray, and compressed air blow dry.',
    durationMinutes: 45,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 349, sedan: 449, suv: 549, muv: 549, bike: 199, truck: 799 },
    memberPricing: { hatchback: 299, sedan: 379, suv: 459, muv: 459, bike: 169, truck: 679 },
    inclusions: [
      'Dense bio-degradable snow foam treatment',
      'Alloy wheel rim brake-dust degreasing',
      'Door jambs and boot seal cleaning',
      'Compressed air crevice blow drying',
      'Hydrophobic gloss spray wax finish'
    ],
    checklist: [
      'Check vehicle initial condition',
      'Foam cannon coverage',
      'Wheel & rim detail brush wash',
      'Microfiber hand dry',
      'Door seals & jambs wipe down',
      'Apply glossy quick detailer'
    ],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-03',
    categoryId: 'CAT-02',
    name: 'Full Interior Deep Cleaning',
    slug: 'full-interior-clean',
    description: 'High-powered cabin vacuuming, dashboard UV conditioning, door panel restoration, and seat fabric shampoo.',
    durationMinutes: 60,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 599, sedan: 699, suv: 849, muv: 849, bike: 299, truck: 1199 },
    memberPricing: { hatchback: 499, sedan: 589, suv: 719, muv: 719, bike: 249, truck: 999 },
    inclusions: [
      'Full cabin, floor mat & trunk deep vacuuming',
      'Dashboard & center console anti-static wipe',
      'Leather/fabric seat spot cleaning',
      'Interior mirror & glass streak-free polish',
      'Odor eliminator spray application'
    ],
    checklist: [
      'Remove floor mats & trunk items',
      'Deep vacuum seats, carpets & mats',
      'Wipe dashboard, vents & door panels',
      'Clean all interior glass',
      'Apply anti-UV dashboard conditioner'
    ],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-04',
    categoryId: 'CAT-03',
    name: 'Interior + Exterior Combo',
    slug: 'interior-exterior-combo',
    description: 'Complete end-to-end rejuvenation combining Premium Foam Wash with Full Interior Deep Cleaning.',
    durationMinutes: 90,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'muv'],
    pricing: { hatchback: 849, sedan: 999, suv: 1249, muv: 1249, bike: 399, truck: 1799 },
    memberPricing: { hatchback: 719, sedan: 849, suv: 1059, muv: 1059, bike: 339, truck: 1529 },
    inclusions: [
      'Premium foam wash & hydrophobic spray wax',
      'Deep vacuuming & dashboard UV protection',
      'Door jambs, boot, and alloy wheel detail',
      'Free cabin air freshener & tire gloss'
    ],
    checklist: [
      'Perform exterior foam wash & rinse',
      'Vacuum entire interior & boot',
      'Clean & condition dashboard',
      'Dress tires & external trims',
      'Final glass wipe & quality inspection'
    ],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-05',
    categoryId: 'CAT-04',
    name: '1-Year Ceramic Coating Spray',
    slug: 'ceramic-coating-1y',
    description: 'Professional grade nano-ceramic paint sealant protecting against UV rays, bird lime, chemical spots, and hydrophobic water marks.',
    durationMinutes: 180,
    vehicleTypes: ['hatchback', 'sedan', 'suv', 'bike'],
    pricing: { hatchback: 2499, sedan: 2999, suv: 3799, muv: 3799, bike: 1499, truck: 4999 },
    memberPricing: { hatchback: 2124, sedan: 2549, suv: 3229, muv: 3229, bike: 1274, truck: 4249 },
    inclusions: [
      'Decontamination wash & clay bar surface prep',
      'Single-stage machine swirl removal polish',
      '9H Ceramic spray layer curing application',
      '12 months gloss water-beading protection warranty'
    ],
    checklist: [
      'Clay bar decontamination',
      'Machine buffing minor paint swirls',
      'Isopropyl alcohol surface wipe',
      'Apply ceramic coating section by section',
      'Infrared lamp/air cure inspection'
    ],
    minPhotosBefore: 6,
    minPhotosAfter: 6,
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80',
    isPopular: false
  },
  // BIKE SERVICES SECTION
  {
    id: 'SRV-BK-01',
    categoryId: 'CAT-05',
    name: '🛢️ Engine Oil Change & Flush',
    slug: 'engine-oil-change',
    description: 'High-grade synthetic/semi-synthetic engine oil replacement with sludge flush and drain plug washer check.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 399, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 339, truck: 0 },
    inclusions: [
      'Full oil drain & engine flush treatment',
      'Fresh premium engine oil refill (4T 10W-30/10W-40)',
      'Oil filter inspection & cleaning',
      'Used oil eco-friendly disposal'
    ],
    checklist: ['Check oil level', 'Drain old oil', 'Flush engine', 'Refill fresh oil', 'Leak check'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-02',
    categoryId: 'CAT-05',
    name: '🔋 Battery Check & Terminal Polish',
    slug: 'battery-check',
    description: 'Digital voltage test, terminal corrosion removal, electrolyte level top-up, and charging health audit.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 169, truck: 0 },
    inclusions: [
      'Multimeter voltage load test',
      'Terminal post cleaning & anti-sulfation gel',
      'Fuse box & wiring relay check'
    ],
    checklist: ['Measure resting voltage', 'Clean terminals', 'Apply protective gel', 'Test starter crank amp'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-03',
    categoryId: 'CAT-05',
    name: '🧰 Clutch & Gear Service',
    slug: 'clutch-gear-service',
    description: 'Clutch cable free-play adjustment, friction plate health check, and smooth gear selector lever lubrication.',
    durationMinutes: 35,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 299, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    inclusions: [
      'Clutch cable tensioning & greasing',
      'Gear shift lever alignment',
      'Bite point calibration for seamless shifting'
    ],
    checklist: ['Inspect cable fraying', 'Adjust lever play', 'Lube pivot points', 'Road test gear engagement'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-04',
    categoryId: 'CAT-05',
    name: '🏍️ Engine Tuning & RPM Calibration',
    slug: 'engine-tuning',
    description: 'Air-fuel mixture optimization, idle RPM setup, throttle body cleaning, and engine response fine-tuning.',
    durationMinutes: 45,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 499, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 419, truck: 0 },
    inclusions: [
      'Carburetor / FI nozzle ultrasonic spray clean',
      'Tachometer idle RPM tuning',
      'Engine vacuum & compression check'
    ],
    checklist: ['Clean throttle body', 'Adjust idle screw', 'Check AFR sensor', 'Test acceleration pickup'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-05',
    categoryId: 'CAT-05',
    name: '🔩 Suspension & Telescopic Fork Check',
    slug: 'suspension-check',
    description: 'Front telescopic fork oil seal leak audit, rear shock absorber preload setting, and swingarm bush check.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 349, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 299, truck: 0 },
    inclusions: [
      'Fork stanchion scratch & oil leak test',
      'Rear shock dampening rebound check',
      'Triple tree steering head bearing adjustment'
    ],
    checklist: ['Inspect fork seals', 'Check rear shock dampening', 'Tighten steering cone nut'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-06',
    categoryId: 'CAT-05',
    name: '💡 Electrical System & Lighting Audit',
    slug: 'electrical-check',
    description: 'Complete headlight, tail light, indicator, horn, and ignition switch wiring health diagnostic.',
    durationMinutes: 25,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 209, truck: 0 },
    inclusions: [
      'Headlight beam focus check & LED/halogen audit',
      'Brake light switch sensor test',
      'Instrument cluster & speedo lighting verification'
    ],
    checklist: ['Test headlight high/low beam', 'Check indicators', 'Verify horn decibels', 'Inspect brake light'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-07',
    categoryId: 'CAT-05',
    name: '🌫️ Air Filter Cleaning & Service',
    slug: 'air-filter-cleaning',
    description: 'High-pressure air blowout for foam/paper filters, oil soaking for performance filters, and airbox sanitization.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 179, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    inclusions: [
      'Airbox removal & dust cleaning',
      'Compressed air filter mesh clearance',
      'Sealing gasket integrity check'
    ],
    checklist: ['Remove air filter', 'Clean airbox housing', 'Blowout dust particles', 'Reinstall & seal'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-08',
    categoryId: 'CAT-05',
    name: '🔥 Spark Plug Cleaning & Gap Service',
    slug: 'spark-plug-service',
    description: 'Carbon deposit removal, electrode wire brushing, feeder gauge gap calibration, and anti-seize thread treatment.',
    durationMinutes: 20,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 129, truck: 0 },
    inclusions: [
      'Spark plug extraction & electrode inspection',
      'Wire brush carbon removal',
      'Feeder gauge gap set to 0.7-0.8mm'
    ],
    checklist: ['Extract spark plug', 'Clean carbon deposits', 'Measure electrode gap', 'Reinstall plug cap'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-09',
    categoryId: 'CAT-05',
    name: '⛓️ Chain Cleaning & Heavy-Duty Lubrication',
    slug: 'chain-cleaning-lube',
    description: 'Kerosene/degreaser chain wash with 3-sided grunge brush, O-ring safe synthetic chain lube application, and slack adjustment.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    inclusions: [
      'Deep chain degreasing & grime removal',
      'High-viscosity PTFE non-fling chain lube coating',
      'Drive chain tension setting (25-30mm slack)'
    ],
    checklist: ['Degrease drive chain', 'Scrub with grunge brush', 'Adjust chain tensioners', 'Apply PTFE lube spray'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-10',
    categoryId: 'CAT-05',
    name: '🛞 Tyre Pressure & Brake Pad Care',
    slug: 'tyre-brake-care',
    description: 'Front & rear disc pad thickness measurement, drum shoe de-glazing, brake fluid reservoir top-up, and tread depth check.',
    durationMinutes: 30,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    inclusions: [
      'Disc rotor & brake caliper brake-cleaner spray wash',
      'Drum brake shoe sand-papering',
      'PSI inflation & tire valve cap check'
    ],
    checklist: ['Inspect brake pad mm', 'Clean brake caliper dust', 'Check brake fluid DOT rating', 'Inflate PSI'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-11',
    categoryId: 'CAT-05',
    name: '⚙️ Spare Parts & Hardware Fitment',
    slug: 'spare-parts-fitment',
    description: 'On-demand replacement of cables, mirrors, brake levers, footpegs, indicators, or bulbs with genuine OEM parts.',
    durationMinutes: 40,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 299, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    inclusions: [
      'Full chassis nut & bolt torque check',
      'Installation of requested OEM spare parts',
      'Lubrication of footpeg and stand pivots'
    ],
    checklist: ['Inspect worn hardware', 'Fit genuine replacement part', 'Torque bolts to spec', 'Test operation'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-12',
    categoryId: 'CAT-05',
    name: '🚚 Doorstep Bike Pickup & Drop',
    slug: 'doorstep-pickup-drop',
    description: 'Hassle-free safe transport of your motorcycle to nearest Wipeit certified service hub with real-time tracking.',
    durationMinutes: 60,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 199, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 149, truck: 0 },
    inclusions: [
      'Certified rider pickup at your doorstep',
      'Pre-transport photo condition log',
      'Safe delivery back to your doorstep upon completion'
    ],
    checklist: ['Log odometer reading', 'Perform 360 degree photo audit', 'Secure transport', 'Doorstep drop-off'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SRV-BK-13',
    categoryId: 'CAT-05',
    name: '✨ Super Bike Foam Wash, Polish & Detailing',
    slug: 'superbike-wash-polish',
    description: 'High-pressure foam wash, chrome polishing, matte paint detailer treatment, engine fin degreasing, and tire dress.',
    durationMinutes: 45,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 299, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 249, truck: 0 },
    inclusions: [
      'Dense pH-neutral snow foam wash',
      'Alloy rim & engine block degrease brush',
      'Hydrophobic wax body polish & matte conditioner',
      'Chain lube application included'
    ],
    checklist: ['Foam wash entire bike', 'Degrease engine fins & rims', 'Blow dry electricals', 'Apply liquid wax polish'],
    minPhotosBefore: 2,
    minPhotosAfter: 2,
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
    isPopular: true
  },
  {
    id: 'SRV-BK-14',
    categoryId: 'CAT-05',
    name: '💎 Bike 9H Nano Ceramic Coating',
    slug: 'bike-ceramic-coating',
    description: 'Ultimate 9H nano ceramic protection for fuel tank, mudguards, side panels, and alloy rims against scratches and UV fading.',
    durationMinutes: 90,
    vehicleTypes: ['bike'],
    pricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 999, truck: 0 },
    memberPricing: { hatchback: 0, sedan: 0, suv: 0, muv: 0, bike: 849, truck: 0 },
    inclusions: [
      'Clay bar tank decontamination & single-stage paint polish',
      'Dual layer 9H hydrophobic ceramic liquid application',
      'Silencers & alloy rim heat-resistant ceramic spray',
      '1-Year gloss & water-repellency warranty'
    ],
    checklist: ['Decontaminate paint', 'Machine polish tank & panels', 'Apply 9H ceramic coating', 'Cure under heat lamp'],
    minPhotosBefore: 4,
    minPhotosAfter: 4,
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80'
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
