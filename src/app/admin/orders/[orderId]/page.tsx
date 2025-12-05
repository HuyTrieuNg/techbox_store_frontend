"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/UI/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/UI/table';
import InvoicePdfDownload from '@/components/pdf/InvoicePdfDownload';
import { Badge } from '@/components/UI/badge';
import { OrderService } from '@/services/orderService';
import { OrderResponse } from '@/features/order';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const orderIdParam = params?.orderId as string | undefined;
  const orderId = orderIdParam ? Number(orderIdParam) : undefined;
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let mounted = true;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await OrderService.getOrderByIdForManagement(orderId);
        if (mounted) setOrder(data);
      } catch (err: any) {
        console.error('Failed to load order for management', err);
        if (mounted) setError(err?.message || 'Không thể tải đơn hàng');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrder();
    return () => { mounted = false; };
  }, [orderId]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-500">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-6 text-red-600 bg-red-50 m-6 rounded">{error}</div>;
  if (!order) return <div className="p-6 text-center">Không tìm thấy đơn hàng</div>;

  const status = String(order.status || '').toUpperCase();
  const isCompleted = ['DELIVERED'].includes(status);

  // ----------------------------------------------------------------------
  // TRƯỜNG HỢP 1: ĐƠN HÀNG CHƯA HOÀN THÀNH -> KHÔNG HIỆN HÓA ĐƠN
  // ----------------------------------------------------------------------
  if (!isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-md text-center py-10 px-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đơn hàng chưa hoàn tất</h2>
          <p className="text-gray-500 mb-6">
            Hóa đơn điện tử chỉ được tạo khi đơn hàng đã giao thành công hoặc đã thanh toán hoàn tất.
          </p>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Mã đơn hàng:</span>
              <span className="font-medium">#{order.orderCode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Tổng tiền:</span>
              <span className="font-medium text-blue-600">{order.finalAmount?.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Trạng thái hiện tại:</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                {order.status}
              </Badge>
            </div>
          </div>

          <button 
            className="text-sm text-blue-600 hover:underline"
            onClick={() => window.history.back()}
          >
            &larr; Quay lại danh sách
          </button>
        </Card>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // TRƯỜNG HỢP 2: ĐÃ HOÀN THÀNH -> HIỆN GIAO DIỆN HÓA ĐƠN (INVOICE)
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="text-green-600" /> Chi tiết hóa đơn
          </h1>
          <p className="text-sm text-gray-500 ml-8">Đơn hàng đã hoàn thành</p>
        </div>
        <div className="flex items-center gap-3">
            <InvoicePdfDownload id={order.id} type="order" />
        </div>
      </div>

      {/* Invoice Paper Layout */}
      <Card className="max-w-4xl mx-auto bg-white shadow-xl overflow-hidden border-none print:shadow-none">
        <CardContent className="p-0">
            {/* Header Invoice */}
            <div className="p-10 pb-8 bg-white border-b-2 border-slate-100">
                <div className="flex justify-between items-start">
                    <div className="w-1/2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">TB</div>
                            <div>
                                <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 leading-none">Techbox</h2>
                                <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">Store</span>
                            </div>
                        </div>
                        
                        <div className="text-[11px] text-gray-500 space-y-1.5 font-medium">
                            <p> 54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Đà Nẵng</p>
                            <p> 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                            <p> 268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
                            <p> 1900 1234 | techbox.com | support@techbox.com</p>
                        </div>
                    </div>

                    <div className="text-right w-1/2">
                        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2 opacity-90">Hóa đơn</h1>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-6">BẢN GỐC / ORIGINAL</p>
                        
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-end gap-4">
                                <span className="text-gray-400 font-medium">Mã số:</span>
                                <span className="font-mono font-bold text-slate-900">#{order.orderCode}</span>
                            </div>
                            <div className="flex justify-end gap-4">
                                <span className="text-gray-400 font-medium">Ngày lập:</span>
                                <span className="font-medium text-slate-900">{new Date().toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông tin khách hàng & Grid */}
            <div className="p-10">
                <div className="flex gap-12 mb-10">
                    <div className="flex-1">
                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 border-b pb-1">Khách hàng</h3>
                        <p className="font-bold text-slate-900 text-lg">{order.shippingName}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.shippingPhone}</p>
                        <p className="text-sm text-gray-600 mt-1 max-w-[250px]">{order.shippingAddress}</p>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 border-b pb-1">Thanh toán</h3>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Hình thức:</span>
                            <span className="font-medium">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Trạng thái:</span>
                            <span className="text-green-600 font-bold uppercase">{order.paymentStatus}</span>
                        </div>
                    </div>
                </div>

                {/* Bảng sản phẩm */}
                <div className="mb-8">
                    <Table>
                        <TableHeader>
                        <TableRow className="border-b-2 border-slate-800 hover:bg-white">
                            <TableHead className="text-slate-900 font-bold pl-0 uppercase text-xs">Sản phẩm</TableHead>
                            <TableHead className="text-right text-slate-900 font-bold uppercase text-xs">SL</TableHead>
                            <TableHead className="text-right text-slate-900 font-bold uppercase text-xs">Đơn giá</TableHead>
                            <TableHead className="text-right text-slate-900 font-bold pr-0 uppercase text-xs">Thành tiền</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {order.orderItems?.map((it) => (
                            <TableRow key={it.id} className="border-b border-gray-100 hover:bg-transparent">
                            <TableCell className="pl-0 py-4">
                                <p className="font-semibold text-slate-800">{it.productName}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{it.productVariationName || 'Tiêu chuẩn'}</p>
                            </TableCell>
                            <TableCell className="text-right py-4 align-top">{it.quantity}</TableCell>
                            <TableCell className="text-right py-4 align-top text-gray-600">{it.unitPrice?.toLocaleString('vi-VN')} ₫</TableCell>
                            <TableCell className="text-right pr-0 py-4 align-top font-medium text-slate-900">{it.totalAmount?.toLocaleString('vi-VN')} ₫</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Tổng tiền */}
                <div className="flex justify-end">
                    <div className="w-1/2 lg:w-5/12 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Tạm tính:</span>
                            <span>{order.totalAmount?.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        {order.discountAmount! > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Giảm giá:</span>
                                <span>-{order.discountAmount?.toLocaleString('vi-VN')} ₫</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Phí vận chuyển:</span>
                            <span>{order.shippingFee?.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-center">
                            <span className="font-bold text-slate-900">TỔNG THANH TOÁN</span>
                            <span className="font-black text-xl text-slate-900">{order.finalAmount?.toLocaleString('vi-VN')} ₫</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="bg-slate-50 p-6 text-center border-t text-xs text-gray-500 print:bg-white">
                Cảm ơn bạn đã mua sắm tại Techbox. Hóa đơn này có giá trị như biên lai thanh toán.
            </div>
        </CardContent>
      </Card>
    </div>
  );
}