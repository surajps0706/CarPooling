import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const AdminReportsView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#18181B]">Reports & Business Intelligence</h1>
        <p className="text-xs text-[#6B7280]">Export operational analytics, partner performance reports, and customer metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-2 bg-white">
          <h3 className="font-bold text-sm text-[#18181B]">Daily Operations Report</h3>
          <p className="text-xs text-[#6B7280]">Complete ledger of completed washes, average turn-around time, and slot utilization.</p>
          <Button size="sm" variant="outline">Download PDF Report</Button>
        </Card>

        <Card className="p-4 space-y-2 bg-white">
          <h3 className="font-bold text-sm text-[#18181B]">Partner Efficiency Report</h3>
          <p className="text-xs text-[#6B7280]">Detailed breakdown of punctuality scores, ratings, and payout balances per partner.</p>
          <Button size="sm" variant="outline">Download CSV Data</Button>
        </Card>
      </div>
    </div>
  );
};
