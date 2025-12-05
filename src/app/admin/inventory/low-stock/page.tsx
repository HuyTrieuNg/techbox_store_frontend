'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Package, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/UI/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/UI/select';
import { Badge } from '@/components/UI/badge';
import {
    PagedLowStockProductDTO,
    InventoryConfigDTO,
    getLowStockProductsPaged,
    getInventoryConfig,
} from '@/services/reportsService';
import { useToast } from '@/hooks/use-toast';

export default function LowStockPage() {
    const [data, setData] = useState<PagedLowStockProductDTO | null>(null);
    const [config, setConfig] = useState<InventoryConfigDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [editingThreshold, setEditingThreshold] = useState(false);
    const [newThreshold, setNewThreshold] = useState<number | ''>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const configData = await getInventoryConfig();
                setConfig(configData);
                setNewThreshold(configData.minStockThreshold);
            } catch (error) {
                console.error('Failed to fetch config:', error);
            }
        };
        fetchConfig();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!config) return;

            setLoading(true);
            try {
                const result = await getLowStockProductsPaged(
                    config.minStockThreshold,
                    page,
                    pageSize
                );
                setData(result);
            } catch (error) {
                console.error('Failed to fetch low stock products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [config, page, pageSize]);

    const filteredProducts = data?.content.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variationSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.variationName || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const getStockStatus = (current: number, threshold: number) => {
        const percentage = (current / threshold) * 100;
        if (percentage <= 25) return { label: 'Nguy cấp', variant: 'destructive' as const };
        if (percentage <= 50) return { label: 'Rất thấp', variant: 'destructive' as const };
        if (percentage <= 75) return { label: 'Thấp', variant: 'secondary' as const };
        return { label: 'Cảnh báo', variant: 'outline' as const };
    };

    if (!config) {
        return <div className="container mx-auto p-6">Đang tải cấu hình...</div>;
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        Sản phẩm tồn kho thấp
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Các sản phẩm có số lượng tồn kho dưới {config.minStockThreshold}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Biến thể sản phẩm</CardTitle>
                            <CardDescription>
                                {data?.totalElements || 0} biến thể cần chú ý
                            </CardDescription>
                        </div>
                            <div className="flex items-center gap-4">
                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Tìm theo tên hoặc SKU..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                                <Select
                                value={pageSize.toString()}
                                onValueChange={(value) => {
                                    setPageSize(parseInt(value));
                                    setPage(0);
                                }}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10 / trang</SelectItem>
                                    <SelectItem value="20">20 / trang</SelectItem>
                                    <SelectItem value="50">50 / trang</SelectItem>
                                    <SelectItem value="100">100 / trang</SelectItem>
                                </SelectContent>
                                </Select>
                                {/* Threshold control */}
                                <div className="flex items-center gap-2">
                                    {!editingThreshold ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Ngưỡng: </span>
                                            <span className="font-medium">{config?.minStockThreshold}</span>
                                            <Button size="sm" variant="ghost" onClick={() => setEditingThreshold(true)}>
                                                Sửa
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min={0}
                                                value={typeof newThreshold === 'number' ? newThreshold : ''}
                                                onChange={(e) => setNewThreshold(Number(e.target.value))}
                                                className="w-24 px-2 py-1 border rounded"
                                            />
                                            <Button size="sm" variant="outline" onClick={async () => {
                                                setIsUpdating(true);
                                                if (typeof newThreshold !== 'number' || newThreshold < 0) {
                                                    toast({ title: 'Giá trị không hợp lệ', description: 'Ngưỡng phải là số >= 0', variant: 'destructive' });
                                                    setIsUpdating(false);
                                                    return;
                                                }
                                                try {
                                                    // Only update UI: set config locally, do not call backend
                                                    setConfig((prev) => ({ ...(prev ?? {}), minStockThreshold: newThreshold } as InventoryConfigDTO));
                                                    setEditingThreshold(false);
                                                    setPage(0);
                                                    toast({ title: 'Cập nhật ngưỡng (local)', description: 'Ngưỡng chỉ cập nhật ở front-end cho lần lọc hiện tại.' });
                                                } catch (error) {
                                                    console.error('Failed to update config', error);
                                                    const message = (error as any)?.message || 'Không thể cập nhật ngưỡng.';
                                                    toast({ title: 'Cập nhật thất bại', description: message, variant: 'destructive' });
                                                }
                                                setIsUpdating(false);
                                            }}>Lưu</Button>
                                            <Button size="sm" variant="outline" onClick={() => { setEditingThreshold(false); setNewThreshold(config?.minStockThreshold ?? ''); }} disabled={isUpdating}>Hủy</Button>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">Đang tải...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Không tìm thấy sản phẩm tồn kho thấp</p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sản phẩm</TableHead>
                                        <TableHead>Tên biến thể</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead className="text-right">Tồn kho hiện tại</TableHead>
                                        <TableHead className="text-right">Ngưỡng</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.map((product) => {
                                        const status = getStockStatus(product.currentStock, product.threshold);
                                        return (
                                            <TableRow key={product.variationId}>
                                                <TableCell className="font-medium">
                                                    {product.productName}
                                                    <div className="text-sm text-muted-foreground">
                                                        SPU: {product.spu}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {product.variationName || '—'}
                                                </TableCell>
                                                <TableCell className="font-mono text-sm">
                                                    {product.variationSku}
                                                </TableCell>
                                                <TableCell className="text-right font-bold">
                                                    <span className={product.currentStock === 0 ? 'text-red-500' : ''}>
                                                        {product.currentStock}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">
                                                    {product.threshold}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={status.variant}>{status.label}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Hiển thị {page * pageSize + 1} đến {Math.min((page + 1) * pageSize, data?.totalElements || 0)} trong số {data?.totalElements || 0} kết quả
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.max(0, p - 1))}
                                        disabled={page === 0}
                                    >
                                        Trước
                                    </Button>
                                    <div className="text-sm">
                                        Trang {page + 1} / {data?.totalPages || 1}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={data?.last}
                                    >
                                        Sau
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
