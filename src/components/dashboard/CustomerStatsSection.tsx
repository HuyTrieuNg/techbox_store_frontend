'use client';

import { useEffect, useState } from 'react';
import { Users, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { StatsCard } from './StatsCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { EmptyChartState } from '@/components/charts/EmptyChartState';
import { CustomerStatsDTO, getCustomerStats } from '@/services/reportsService';

export function CustomerStatsSection() {
    const [stats, setStats] = useState<CustomerStatsDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getCustomerStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch customer stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading customer statistics...</div>;
    }

    if (!stats) {
        return <div className="text-center py-8 text-red-500">Failed to load customer statistics</div>;
    }

    // Prepare data for charts
    const growthChartData = stats.growthTrends.slice(-12).map(trend => ({
        period: trend.period,
        customers: trend.newCustomers
    }));

    const topCustomersData = stats.topCustomers.slice(0, 10).map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        spent: customer.totalSpent
    }));

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Thống kê khách hàng</h2>

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
                        <CardDescription>Khách hàng mới theo thời gian</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.growthTrends && stats.growthTrends.length > 0 ? (
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
                        <CardDescription>Theo tổng chi tiêu</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.topCustomers && stats.topCustomers.length > 0 ? (
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
