export type VehicleType = 'hatchback' | 'sedan' | 'suv' | 'muv' | 'bike' | 'truck';

export type UserRole = 'customer' | 'technician' | 'team_lead' | 'branch_manager' | 'admin' | 'super_admin';

export type BookingStatus =
  | 'DRAFT'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_FAILED'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'PARTNER_DECLINED'
  | 'ACCEPTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'QUALITY_CHECK'
  | 'COMPLETED'
  | 'CANCELLED_BY_CUSTOMER'
  | 'CANCELLED_BY_ADMIN'
  | 'CANCELLED_BY_SYSTEM'
  | 'REFUND_REQUESTED'
  | 'REFUND_APPROVED'
  | 'REFUNDED'
  | 'ARCHIVED';

export type MembershipTier = 'Silver' | 'Gold' | 'Platinum';
export type MembershipBillingCycle = 'Monthly' | 'Quarterly' | 'Annual';

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  profilePhotoUrl?: string;
  walletBalance: number;
  referralCode: string;
  membershipTier?: MembershipTier;
  membershipExpiresAt?: string;
  totalBookings: number;
  lifetimeSpend: number;
  joinedAt: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  color: string;
  registrationNumber: string;
  isDefault: boolean;
}

export interface Address {
  id: string;
  customerId: string;
  label: 'Home' | 'Work' | 'Other';
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface Partner {
  id: string;
  fullName: string;
  phone: string;
  profilePhotoUrl: string;
  rating: number;
  totalRatings: number;
  completionRate: number;
  punctualityScore: number;
  specialization: string;
  vehicleAssigned: string; // e.g. "Honda Activa • KA03EQ1122"
  isAvailable: boolean;
  currentLatitude?: number;
  currentLongitude?: number;
  totalJobsToday: number;
  earningsToday: number;
  branch: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  targetVehicle?: 'car' | 'bike' | 'both';
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  vehicleTypes: VehicleType[];
  pricing: Record<VehicleType, number>;
  memberPricing?: Record<VehicleType, number>;
  inclusions: string[];
  checklist: string[];
  minPhotosBefore: number;
  minPhotosAfter: number;
  heroImage: string;
  isPopular?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  vehicleTypes: VehicleType[];
  iconName: string;
}

export interface BookingPhoto {
  id: string;
  bookingId: string;
  type: 'before' | 'after';
  angleLabel: 'front' | 'rear' | 'left' | 'right' | 'interior' | 'other';
  photoUrl: string;
  uploadedAt: string;
}

export interface BookingStatusLog {
  id: string;
  bookingId: string;
  previousStatus: BookingStatus;
  newStatus: BookingStatus;
  changedBy: string;
  note?: string;
  timestamp: string;
}

export type TyreType = 'tubeless' | 'tube_type' | 'run_flat';

export type PunctureProblemType =
  | 'puncture'
  | 'air_leak'
  | 'valve_problem'
  | 'tyre_removal'
  | 'tyre_replacement';

export interface PunctureDetails {
  vehicleCategory: 'car' | 'bike';
  tyreType: TyreType;
  problem: PunctureProblemType;
  locationType: 'current' | 'map' | 'address';
  locationAddress: string;
  photoUrl?: string;
  isEmergency: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: Address;
  vehicle: Vehicle;
  service: ServiceItem;
  addons: AddonItem[];
  partnerId?: string;
  partner?: Partner;
  scheduledDate: string;
  scheduledSlot: string;
  status: BookingStatus;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  specialInstructions?: string;
  photos: BookingPhoto[];
  checklistCompleted: string[];
  customerRating?: number;
  customerReview?: string;
  createdAt: string;
  completedAt?: string;
  punctureDetails?: PunctureDetails;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: MembershipTier;
  duration: MembershipBillingCycle;
  price: number;
  freeWashePerMonth: number;
  discountPercent: number;
  addonDiscountPercent: number;
  benefits: string[];
  isPopular?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscountCap?: number;
  validUntil: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingRef: string;
  customerName: string;
  customerAddress: string;
  partnerName: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  discount: number;
  cgst: number;
  sgst: number;
  total: number;
  paymentMethod: string;
  paidAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'booking' | 'payment' | 'offer' | 'system';
  timestamp: string;
  isRead: boolean;
  bookingId?: string;
}
