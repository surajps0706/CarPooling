import React, { createContext, useContext, useState } from 'react';
import {
  Booking,
  BookingStatus,
  Customer,
  Vehicle,
  Address,
  Partner,
  ServiceItem,
  AddonItem,
  NotificationItem,
  BookingPhoto
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMERS,
  INITIAL_VEHICLES,
  INITIAL_ADDRESSES,
  INITIAL_PARTNERS,
  INITIAL_NOTIFICATIONS,
  SERVICE_ITEMS,
  MOCK_COUPONS
} from '../constants/mockData';

interface BookingContextType {
  bookings: Booking[];
  activeBooking: Booking | null;
  currentCustomer: Customer;
  vehicles: Vehicle[];
  activeVehicle: Vehicle;
  addresses: Address[];
  activeAddress: Address;
  partners: Partner[];
  activePartner: Partner;
  notifications: NotificationItem[];
  // Actions
  setActiveVehicle: (v: Vehicle) => void;
  setActiveAddress: (a: Address) => void;
  addVehicle: (v: Omit<Vehicle, 'id' | 'customerId'>) => void;
  addAddress: (a: Omit<Address, 'id' | 'customerId'>) => void;
  createBooking: (
    service: ServiceItem,
    addons: AddonItem[],
    scheduledDate: string,
    scheduledSlot: string,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod',
    couponCode?: string,
    specialInstructions?: string
  ) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus, note?: string) => void;
  addBookingPhoto: (bookingId: string, type: 'before' | 'after', photoUrl: string, angleLabel: any) => void;
  acceptPartnerJob: (bookingId: string) => void;
  declinePartnerJob: (bookingId: string, reason: string) => void;
  completeChecklistItem: (bookingId: string, item: string) => void;
  rateBooking: (bookingId: string, rating: number, review?: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [activeVehicle, setActiveVehicle] = useState<Vehicle>(INITIAL_VEHICLES[0]);
  const [activeAddress, setActiveAddress] = useState<Address>(INITIAL_ADDRESSES[0]);

  const currentCustomer = customers[0]; // Arjun Mehta
  const activePartner = partners[0]; // Rahul Verma

  // Active customer booking (first in-progress or confirmed booking)
  const activeBooking = bookings.find(
    (b) => b.customerId === currentCustomer.id && !['COMPLETED', 'CANCELLED_BY_CUSTOMER', 'REFUNDED'].includes(b.status)
  ) || null;

  const addVehicle = (vData: Omit<Vehicle, 'id' | 'customerId'>) => {
    const newVehicle: Vehicle = {
      ...vData,
      id: `VEH-${Date.now().toString().slice(-4)}`,
      customerId: currentCustomer.id
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setActiveVehicle(newVehicle);
  };

  const addAddress = (aData: Omit<Address, 'id' | 'customerId'>) => {
    const newAddr: Address = {
      ...aData,
      id: `ADDR-${Date.now().toString().slice(-4)}`,
      customerId: currentCustomer.id
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setActiveAddress(newAddr);
  };

  const createBooking = (
    service: ServiceItem,
    addons: AddonItem[],
    scheduledDate: string,
    scheduledSlot: string,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod',
    couponCode?: string,
    specialInstructions?: string
  ): Booking => {
    const basePrice = service.pricing[activeVehicle.type] || service.pricing.sedan;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    let subtotal = basePrice + addonsTotal;

    let discountAmount = 0;
    if (couponCode) {
      const cpn = MOCK_COUPONS.find((c) => c.code === couponCode.toUpperCase());
      if (cpn) {
        if (cpn.discountType === 'percentage') {
          discountAmount = Math.min((subtotal * cpn.discountValue) / 100, cpn.maxDiscountCap || 9999);
        } else {
          discountAmount = cpn.discountValue;
        }
      }
    } else if (currentCustomer.membershipTier === 'Gold') {
      discountAmount = Math.round(subtotal * 0.15); // 15% Gold member discount
    }

    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = Math.round(taxableAmount * 0.18);
    const totalAmount = taxableAmount + taxAmount;

    const newRefNumber = `ACP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: Booking = {
      id: newRefNumber,
      bookingRef: newRefNumber,
      customerId: currentCustomer.id,
      customerName: currentCustomer.fullName,
      customerPhone: currentCustomer.phone,
      customerAddress: activeAddress,
      vehicle: activeVehicle,
      service,
      addons,
      partnerId: activePartner.id,
      partner: activePartner,
      scheduledDate,
      scheduledSlot,
      status: 'CONFIRMED',
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      couponCode,
      paymentMethod,
      paymentStatus: 'paid',
      specialInstructions,
      photos: [],
      checklistCompleted: [],
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Push notification to customer
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: '🎉 Booking Confirmed!',
      body: `Your booking #${newBooking.bookingRef} is confirmed for ${scheduledDate} at ${scheduledSlot}.`,
      type: 'booking',
      timestamp: 'Just now',
      isRead: false,
      bookingId: newBooking.id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, _note?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const updated = { ...b, status };
          if (status === 'COMPLETED') {
            updated.completedAt = new Date().toISOString();
          }
          return updated;
        }
        return b;
      })
    );
  };

  const addBookingPhoto = (bookingId: string, type: 'before' | 'after', photoUrl: string, angleLabel: any) => {
    const newPhoto: BookingPhoto = {
      id: `PHT-${Date.now()}`,
      bookingId,
      type,
      angleLabel,
      photoUrl,
      uploadedAt: new Date().toISOString()
    };
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, photos: [...b.photos, newPhoto] };
        }
        return b;
      })
    );
  };

  const acceptPartnerJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'ACCEPTED');
  };

  const declinePartnerJob = (bookingId: string, _reason: string) => {
    updateBookingStatus(bookingId, 'PARTNER_DECLINED');
  };

  const completeChecklistItem = (bookingId: string, item: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          if (!b.checklistCompleted.includes(item)) {
            return { ...b, checklistCompleted: [...b.checklistCompleted, item] };
          }
        }
        return b;
      })
    );
  };

  const rateBooking = (bookingId: string, rating: number, review?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, customerRating: rating, customerReview: review };
        }
        return b;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const resetDemoData = () => {
    setBookings(INITIAL_BOOKINGS);
    setVehicles(INITIAL_VEHICLES);
    setAddresses(INITIAL_ADDRESSES);
    setPartners(INITIAL_PARTNERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveVehicle(INITIAL_VEHICLES[0]);
    setActiveAddress(INITIAL_ADDRESSES[0]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBooking,
        currentCustomer,
        vehicles,
        activeVehicle,
        addresses,
        activeAddress,
        partners,
        activePartner,
        notifications,
        setActiveVehicle,
        setActiveAddress,
        addVehicle,
        addAddress,
        createBooking,
        updateBookingStatus,
        addBookingPhoto,
        acceptPartnerJob,
        declinePartnerJob,
        completeChecklistItem,
        rateBooking,
        markNotificationRead,
        resetDemoData
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
