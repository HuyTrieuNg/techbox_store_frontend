'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { StatsCard } from './StatsCard';
import { AreaChart } from '@/components/common/manage/charts/AreaChart';
import { PieChart } from '@/components/common/manage/charts/PieChart';
import { EmptyChartState } from '@/components/common/manage/charts/EmptyChartState';
import { OrderStatsDTO, getOrderStats } from '@/services/reportsService';

export function OrderStatsSection() {
    const [stats, setStats] = useState<OrderStatsDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getOrderStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch order stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading order statistics...</div>;
    }

    if (!stats) {
        return <div className="text-center py-8 text-red-500">Failed to load order statistics</div>;
    }

    // Prepare data for charts
    const statusChartData = stats.ordersByStatus.map(status => ({
        name: status.status.replace('_', ' '),
        value: status.count
    }));

    const revenueChartData = stats.revenueTrends.slice(-12).map(trend => ({
        period: trend.period,
        revenue: trend.revenue,
        orders: trend.orderCount
    }));

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Thống kê đơn hàng</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Tổng đơn hàng"
                    value={stats.totalOrders.toLocaleString()}
                    icon={ShoppingCart}
                    description="Tất cả đơn hàng"
                />
                <StatsCard
                    title="Tổng doanh thu"
                    value={`${stats.totalRevenue.toLocaleString()} đ`}
                    icon={DollarSign}
                    description="Tổng doanh thu toàn thời gian"
                />
                <StatsCard
                    title="Giá trị TB đơn hàng"
                    value={`${stats.averageOrderValue.toLocaleString()} đ`}
                    icon={TrendingUp}
                    description="Trên mỗi đơn hàng"
                />
                <StatsCard
                    title="Đơn chờ xử lý"
                    value={stats.pendingOrders.toLocaleString()}
                    icon={Package}
                    description="Đang chờ xử lý"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Đơn hàng theo trạng thái</CardTitle>
                        <CardDescription>Phân bố đơn hàng theo trạng thái xử lý</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.ordersByStatus && stats.ordersByStatus.length > 0 ? (
                            <PieChart
                                data={statusChartData}
                                nameKey="name"
                                valueKey="value"
                                height={300}
                                innerRadius={60}
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu trạng thái đơn hàng" />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Xu hướng doanh thu</CardTitle>
                        <CardDescription>Doanh thu theo thời gian</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.revenueTrends && stats.revenueTrends.length > 0 ? (
                            <AreaChart
                                data={revenueChartData}
                                xKey="period"
                                yKey="revenue"
                                color="#10b981"
                                height={300}
                                yAxisLabel="Doanh thu"
                                xAxisLabel="Thời gian"
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu xu hướng doanh thu" />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
