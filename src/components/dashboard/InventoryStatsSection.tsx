'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Package, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { StatsCard } from './StatsCard';
import { LineChart } from '@/components/charts/LineChart';
import { EmptyChartState } from '@/components/charts/EmptyChartState';
import { InventoryStatsDTO, getInventoryStats } from '@/services/reportsService';
import Link from 'next/link';
import { Button } from '@/components/UI/button';

export function InventoryStatsSection() {
    const [stats, setStats] = useState<InventoryStatsDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getInventoryStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch inventory stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading inventory statistics...</div>;
    }

    if (!stats) {
        return <div className="text-center py-8 text-red-500">Failed to load inventory statistics</div>;
    }

    // Prepare data for stock movements chart
    const movementsData = stats.recentMovements.slice(0, 20).map(movement => ({
        date: new Date(movement.transactionDate).toLocaleDateString(),
        value: movement.type === 'IMPORT' ? movement.totalValue : -movement.totalValue,
        type: movement.type
    }));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Thống kê kho hàng</h2>
                {stats.lowStockVariations > 0 && (
                    <Link href="/admin/inventory/low-stock">
                        <Button variant="outline" className="gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            Tồn kho thấp ({stats.lowStockVariations})
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Tổng giá trị kho"
                    value={`${stats.totalInventoryValue.toLocaleString()} đ`}
                    icon={DollarSign}
                    description="Giá trị tồn kho hiện tại"
                />
                <StatsCard
                    title="Tổng biến thể"
                    value={stats.totalProductVariations.toLocaleString()}
                    icon={Package}
                    description="Biến thể sản phẩm"
                />
                <StatsCard
                    title="Nhập kho"
                    value={stats.totalStockImports.toLocaleString()}
                    icon={TrendingUp}
                    description="Tổng số lần nhập"
                />
                <StatsCard
                    title="Xuất kho"
                    value={stats.totalStockExports.toLocaleString()}
                    icon={TrendingDown}
                    description="Tổng số lần xuất"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Biến động kho gần đây</CardTitle>
                    <CardDescription>20 giao dịch nhập/xuất gần nhất</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.recentMovements && stats.recentMovements.length > 0 ? (
                        <LineChart
                            data={movementsData}
                            xKey="date"
                            yKey="value"
                            color="#06b6d4"
                            height={300}
                            yAxisLabel="Giá trị"
                            xAxisLabel="Ngày"
                        />
                    ) : (
                        <EmptyChartState message="Không có dữ liệu biến động kho" />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
