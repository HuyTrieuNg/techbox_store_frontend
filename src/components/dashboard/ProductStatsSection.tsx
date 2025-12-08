'use client';

import { useEffect, useState } from 'react';
import { Package, CheckCircle, FileText, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { StatsCard } from './StatsCard';
import { BarChart } from '@/components/common/manage/charts/BarChart';
import { EmptyChartState } from '@/components/common/manage/charts/EmptyChartState';
import { ProductStatsDTO, getProductStats } from '@/services/reportsService';

export function ProductStatsSection() {
    const [stats, setStats] = useState<ProductStatsDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getProductStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch product stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading product statistics...</div>;
    }

    if (!stats) {
        return <div className="text-center py-8 text-red-500">Failed to load product statistics</div>;
    }

    // Prepare data for charts
    const categoryChartData = stats.productsByCategory.map(cat => ({
        name: cat.categoryName,
        count: cat.productCount
    }));

    const topSellingData = stats.topSellingProducts.slice(0, 10).map(product => ({
        name: product.productName,
        sold: product.totalSold
    }));

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Thống kê sản phẩm</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Tổng sản phẩm"
                    value={stats.totalProducts.toLocaleString()}
                    icon={Package}
                    description="Tất cả sản phẩm"
                />
                <StatsCard
                    title="Đang hoạt động"
                    value={stats.activeProducts.toLocaleString()}
                    icon={CheckCircle}
                    description="Đã xuất bản"
                />
                <StatsCard
                    title="Bản nháp"
                    value={stats.draftProducts.toLocaleString()}
                    icon={FileText}
                    description="Chưa xuất bản"
                />
                <StatsCard
                    title="Đánh giá TB"
                    value={stats.averageProductRating.toFixed(1)}
                    icon={Star}
                    description="Đánh giá sản phẩm"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Sản phẩm theo danh mục gốc</CardTitle>
                        <CardDescription>Phân bố theo danh mục cha</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.productsByCategory && stats.productsByCategory.length > 0 ? (
                            <BarChart
                                data={categoryChartData}
                                xKey="name"
                                yKey="count"
                                color="#3b82f6"
                                height={300}
                                yAxisLabel="Số lượng"
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu danh mục" />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sản phẩm bán chạy</CardTitle>
                        <CardDescription>Theo số lượng đã bán</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.topSellingProducts && stats.topSellingProducts.length > 0 ? (
                            <BarChart
                                data={topSellingData}
                                xKey="name"
                                yKey="sold"
                                color="#f59e0b"
                                height={300}
                                yAxisLabel="Đã bán"
                            />
                        ) : (
                            <EmptyChartState message="Không có dữ liệu sản phẩm bán chạy" />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
