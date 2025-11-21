'use client';

import { CustomerStatsSection } from '@/components/dashboard/CustomerStatsSection';
import { ProductStatsSection } from '@/components/dashboard/ProductStatsSection';
import { InventoryStatsSection } from '@/components/dashboard/InventoryStatsSection';
import { OrderStatsSection } from '@/components/dashboard/OrderStatsSection';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="space-y-8">
        <OrderStatsSection />
        <CustomerStatsSection />
        <ProductStatsSection />
        <InventoryStatsSection />
      </div>
    </div>
  );
}

