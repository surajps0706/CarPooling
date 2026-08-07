import React, { useState } from 'react';
import { Car, MapPin, ShieldCheck, Wallet, Share2, Phone, Mail, Plus } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';

export const CustomerProfileView: React.FC = () => {
  const {
    currentCustomer,
    vehicles,
    addresses,
    activeVehicle,
    setActiveVehicle,
    addVehicle,
    addAddress
  } = useBooking();

  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [regNo, setRegNo] = useState('');
  const [type, setType] = useState<any>('sedan');
  const [color, setColor] = useState('');

  const handleSaveVehicle = () => {
    if (!make || !model || !regNo) return;
    addVehicle({
      make,
      model,
      year: 2024,
      type,
      color: color || 'White',
      registrationNumber: regNo.toUpperCase(),
      isDefault: false
    });
    setIsAddVehicleOpen(false);
    setMake('');
    setModel('');
    setRegNo('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Customer Avatar & Header Card */}
      <Card className="p-4 bg-gradient-to-br from-[#18181B] to-[#27272A] text-white">
        <div className="flex items-center gap-4">
          <img
            src={currentCustomer.profilePhotoUrl}
            alt={currentCustomer.fullName}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#2457FF]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">{currentCustomer.fullName}</h3>
              <Badge variant="accent" size="sm">
                {currentCustomer.membershipTier || 'Gold'}
              </Badge>
            </div>
            <div className="text-xs text-[#A1A1AA] flex items-center gap-2 mt-1">
              <Phone className="w-3 h-3" /> {currentCustomer.phone}
            </div>
            <div className="text-xs text-[#A1A1AA] flex items-center gap-2">
              <Mail className="w-3 h-3" /> {currentCustomer.email}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#3F3F46] text-center">
          <div>
            <div className="text-[10px] uppercase text-[#A1A1AA]">Wallet Balance</div>
            <div className="text-base font-bold text-emerald-400">₹{currentCustomer.walletBalance}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#A1A1AA]">Total Bookings</div>
            <div className="text-base font-bold text-white">{currentCustomer.totalBookings} Services</div>
          </div>
        </div>
      </Card>

      {/* My Garage (Vehicle List) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
            My Garage ({vehicles.length})
          </h3>
          <button
            onClick={() => setIsAddVehicleOpen(true)}
            className="text-xs font-semibold text-[#2457FF] flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Vehicle
          </button>
        </div>

        <div className="space-y-2">
          {vehicles.map((v) => {
            const isActive = v.id === activeVehicle.id;

            return (
              <Card
                key={v.id}
                onClick={() => setActiveVehicle(v)}
                className={`p-3 cursor-pointer flex items-center justify-between transition-all ${
                  isActive ? 'border-[#2457FF] bg-[#EEF2FF]/40' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] flex items-center justify-center font-bold text-sm">
                    {v.type === 'sedan' ? '🚗' : v.type === 'suv' ? '🚙' : '🏍️'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18181B]">{v.make} {v.model}</div>
                    <div className="text-[11px] text-[#6B7280]">
                      {v.registrationNumber} • {v.color}
                    </div>
                  </div>
                </div>
                {isActive && <Badge variant="accent">Active</Badge>}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
          Saved Addresses ({addresses.length})
        </h3>
        <div className="space-y-2">
          {addresses.map((addr) => (
            <Card key={addr.id} className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2457FF]" />
                  {addr.label}
                </span>
                {addr.isDefault && <Badge variant="default" size="sm">Default</Badge>}
              </div>
              <p className="text-xs text-[#6B7280]">
                {addr.line1}, {addr.city} - {addr.pincode}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        title="Add New Vehicle to Garage"
      >
        <div className="space-y-3">
          <Input label="Make / Brand" placeholder="e.g. Honda" value={make} onChange={(e) => setMake(e.target.value)} />
          <Input label="Model" placeholder="e.g. City ZX" value={model} onChange={(e) => setModel(e.target.value)} />
          <Input label="License Plate Number" placeholder="e.g. KA01CQ5521" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase">Vehicle Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full h-11 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#18181B] px-3 focus:outline-none"
            >
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="suv">SUV / MUV</option>
              <option value="bike">Bike / Motorcycle</option>
            </select>
          </div>
          <Input label="Color" placeholder="e.g. Pearl White" value={color} onChange={(e) => setColor(e.target.value)} />
          <Button fullWidth size="lg" onClick={handleSaveVehicle}>
            Save Vehicle to Garage
          </Button>
        </div>
      </Modal>
    </div>
  );
};
