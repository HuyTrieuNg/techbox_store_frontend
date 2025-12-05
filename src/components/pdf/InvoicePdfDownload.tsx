"use client";
import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import ExportDocument from '@/lib/pdfTemplates/ExportDocument';
import OrderDocument from '@/lib/pdfTemplates/OrderDocument';
import ImportDocument from '@/lib/pdfTemplates/ImportDocument';
import AdjustmentDocument from '@/lib/pdfTemplates/AdjustmentDocument';
import { stockExportService } from '@/services/stockExportService';
import { stockImportService } from '@/services/stockImportService';
import { stockAdjustmentService } from '@/services/stockAdjustmentService';
import { OrderService } from '@/services/orderService';
import { Button } from '@/components/UI/button';

type DocType = 'order' | 'export' | 'import' | 'adjustment';

interface Props { id: number; type: DocType }

export const InvoicePdfDownload: React.FC<Props> = ({ id, type }) => {
  const [loading, setLoading] = useState(false);

  const onDownload = async () => {
    setLoading(true);
    try {
      let data: any;
      if (type === 'order') data = await OrderService.getOrderByIdForManagement(id);
      else if (type === 'export') data = await stockExportService.getStockExportById(id);
      else if (type === 'import') data = await stockImportService.getStockImportById(id);
      else if (type === 'adjustment') data = await stockAdjustmentService.getAdjustmentById(id);

      if (!data) throw new Error('Không tìm thấy dữ liệu để tạo PDF');
      const frontendBase = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      // Link QR to inventory pages for inventory types; orders keep order detail route
      const verificationUrl = type === 'order'
        ? `${frontendBase}/orders/${id}`
        : `${frontendBase}/admin/inventory/${type}/${id}`;
      const qr = await QRCode.toDataURL(verificationUrl);

      let doc: any;
      if (type === 'export') doc = <ExportDocument data={data} qrImage={qr} />;
      else if (type === 'import') doc = <ImportDocument data={data} qrImage={qr} />;
      else if (type === 'adjustment') doc = <AdjustmentDocument data={data} qrImage={qr} />;
      else doc = (<OrderDocument data={data} qrImage={qr} />); // fallback: use OrderDocument for orders

      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = type === 'order' ? `order-${data?.orderCode || id}.pdf` : `${type}-${data?.documentCode || id}.pdf`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={onDownload} disabled={loading} className="flex items-center gap-2">
      {loading ? 'Đang tạo PDF...' : 'Tải PDF'}
    </Button>
  );
};

export default InvoicePdfDownload;
