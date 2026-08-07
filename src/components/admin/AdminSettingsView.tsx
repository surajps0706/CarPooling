import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const AdminSettingsView: React.FC = () => {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-[#18181B]">System Settings & Configuration</h1>
        <p className="text-xs text-[#6B7280]">Global business settings, payment gateway keys, and dispatch policies.</p>
      </div>

      <Card className="p-5 space-y-4 bg-white">
        <h3 className="font-bold text-sm text-[#18181B]">Business Information</h3>
        <Input label="Business Name" defaultValue="AutoCare Pro Premium Detailing" />
        <Input label="Support Helpline Phone" defaultValue="+91 1800-288-6227" />
        <Input label="Support Email" defaultValue="support@autocare.pro" />
      </Card>

      <Card className="p-5 space-y-4 bg-white">
        <h3 className="font-bold text-sm text-[#18181B]">Auto-Dispatch Rules</h3>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded text-[#2457FF]" />
            <span>Auto-assign nearest partner based on GPS proximity (&lt; 5 km)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded text-[#2457FF]" />
            <span>Prioritize partners with rating &gt; 4.5 for Gold/Platinum members</span>
          </label>
        </div>
        <Button size="sm">Save Global Settings</Button>
      </Card>
    </div>
  );
};
