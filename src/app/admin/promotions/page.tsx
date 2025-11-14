"use client";

import { useState } from 'react';
import { FiCalendar, FiTag, FiGift } from 'react-icons/fi';
import CampaignsTab from './components/CampaignsTab';
import PromotionsTab from './components/PromotionsTab';
import VouchersTab from './components/VouchersTab';

type Tab = 'campaigns' | 'promotions' | 'vouchers';

/**
 * Admin Promotions Management Page
 * 
 * Quản lý tất cả các khuyến mãi với 3 tabs:
 * - Campaigns: Chiến dịch khuyến mãi
 * - Promotions: Khuyến mãi sản phẩm
 * - Vouchers: Phiếu giảm giá
 */
export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('campaigns');

  const tabs = [
    {
      key: 'campaigns' as Tab,
      label: 'Chiến dịch',
      icon: FiCalendar,
      description: 'Quản lý các chiến dịch khuyến mãi',
    },
    {
      key: 'promotions' as Tab,
      label: 'Khuyến mãi sản phẩm',
      icon: FiTag,
      description: 'Khuyến mãi theo sản phẩm',
    },
    {
      key: 'vouchers' as Tab,
      label: 'Mã giảm giá',
      icon: FiGift,
      description: 'Quản lý voucher codes',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Khuyến mãi</h1>
        <p className="text-gray-600 mt-2">
          Quản lý chiến dịch, khuyến mãi sản phẩm và mã giảm giá
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-6 py-4
                    border-b-2 font-medium text-sm transition-colors
                    ${isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'promotions' && <PromotionsTab />}
          {activeTab === 'vouchers' && <VouchersTab />}
        </div>
      </div>
    </div>
  );
}
