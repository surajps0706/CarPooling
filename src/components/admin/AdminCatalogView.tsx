import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SERVICE_ITEMS } from '../../constants/mockData';

export const AdminCatalogView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#18181B]">Service Catalog Configuration</h1>
          <p className="text-xs text-[#6B7280]">Manage service tiers, duration limits, and vehicle-specific pricing.</p>
        </div>
        <Button size="sm">+ Add New Service</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICE_ITEMS.map((srv) => (
          <Card key={srv.id} className="p-4 space-y-3 bg-white">
            <div className="flex items-start gap-3">
              <img src={srv.heroImage} alt={srv.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#18181B]">{srv.name}</h3>
                  {srv.isPopular && <Badge variant="accent">Popular</Badge>}
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-2 mt-1">{srv.description}</p>
                <div className="text-xs font-semibold text-[#2457FF] mt-2">{srv.durationMinutes} mins duration</div>
              </div>
            </div>

            <div className="bg-[#F4F5F7] p-2.5 rounded-xl text-xs flex justify-between">
              <span>Hatchback: ₹{srv.pricing.hatchback}</span>
              <span>Sedan: ₹{srv.pricing.sedan}</span>
              <span>SUV: ₹{srv.pricing.suv}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
