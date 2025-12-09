'use client';

import { useEffect, useState } from 'react';
import { Users, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { StatsCard } from './StatsCard';
import { LineChart } from '@/components/common/manage/charts/LineChart';
import { BarChart } from '@/components/common/manage/charts/BarChart';
import { EmptyChartState } from '@/components/common/manage/charts/EmptyChartState';
import { DateRangePicker } from './DateRangePicker';
import { CustomerStatsDTO, getCustomerStats, getCustomerGrowth, CustomerGrowthDTO } from '@/services/reportsService';
import { getStartOfMonth, getEndOfMonth, formatToISODateStart, formatToISODateEnd } from '@/utils/dateUtils';

export function CustomerStatsSection() {
    const [stats, setStats] = useState<CustomerStatsDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<string>(
        formatToISODateStart(getStartOfMonth())
    );
    const [endDate, setEndDate] = useState<string>(
        formatToISODateEnd(getEndOfMonth())
    );
    const [growthTrends, setGrowthTrends] = useState<CustomerGrowthDTO[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [customerData, growthData] = await Promise.all([
                    getCustomerStats(),
                    getCustomerGrowth(startDate, endDate, 'day')
                ]);
                setStats(customerData);
                setGrowthTrends(growthData);
            } catch (error) {
                console.error('Failed to fetch customer stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [startDate, endDate]);

    const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    if (loading) {
        return <div className="text-center py-8">Loading customer statistics...</div>;
    }

    if (!stats) {
        return <div className="text-center py-8 text-red-500">Failed to load customer statistics</div>;
    }

    // Prepare data for charts
    const growthChartData = (growthTrends && growthTrends.length > 0 
        ? growthTrends 
        : stats?.growthTrends || []
    ).slice(-12).map(trend => ({
        period: trend.period,
        customers: trend.newCustomers
    }));

    const topCustomersData = stats?.topCustomers.slice(0, 10).map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        spent: customer.totalSpent
    })) || [];

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold">Thống kê khách hàng</h2>
                <DateRangePicker 
                    onDateRangeChange={handleDateRangeChange}
                    defaultRange="month"
                    showPresets={true}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Tổng khách hàng"
                    value={stats.totalCustomers.toLocaleString()}
                    icon={Users}
                    description="Tất cả người dùng đã đăng ký"
                />
                <StatsCard
                    title="Mới hôm nay"
                    value={stats.newCustomersToday.toLocaleString()}
                    icon={UserPlus}
                    description="Đăng ký hôm nay"
                />
                <StatsCard
                    title="Mới tuần này"
                    value={stats.newCustomersThisWeek.toLocaleString()}
                    icon={Calendar}
                    description="7 ngày qua"
                />
                <StatsCard
                    title="Tốc độ tăng trưởng"
                    value={`${stats.growthRate.toFixed(1)}%`}
                    icon={TrendingUp}
                    description="So với tháng trước"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Tăng trưởng khách hàng</CardTitle>
                        <CardDescription>Khách hàng mới trong khoảng thời gian được chọn</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {growthChartData && growthChartData.length > 0 ? (
                            <LineChart
                                data={growthChartData}
                                xKey="period"
                                yKey="customers"
                                color="#3b82f6"
                                height={300}
                                yAxisLabel="Khách hàng"
                                xAxisLabel="Thời gian"
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu tăng trưởng khách hàng" />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Khách hàng tiêu biểu</CardTitle>
                        <CardDescription>Top 10 khách hàng theo tổng chi tiêu</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topCustomersData && topCustomersData.length > 0 ? (
                            <BarChart
                                data={topCustomersData}
                                xKey="name"
                                yKey="spent"
                                color="#8b5cf6"
                                height={300}
                                yAxisLabel="Chi tiêu"
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu khách hàng tiêu biểu" />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
