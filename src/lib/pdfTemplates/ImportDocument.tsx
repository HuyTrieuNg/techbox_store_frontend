import React from 'react';
import { Document, Page, Text, View, Font, Image } from '@react-pdf/renderer';
import styles from './BaseStyles';
import TechboxHeader from './TechboxHeader';
import path from 'path';

const registerRoboto = () => {
  try {
    const isBrowser = typeof window !== 'undefined';
    const fonts = isBrowser
      ? [
          { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' as const },
          { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' as const },
        ]
      : [
          { src: path.join(process.cwd(), 'public/fonts/Roboto-Regular.ttf'), fontWeight: 'normal' as const },
          { src: path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), fontWeight: 'bold' as const },
        ];
    Font.register({ family: 'Roboto', fonts });
  } catch (e) { console.warn('Failed to register fonts', e); }
};

export const ImportDocument = ({ data, qrImage }: { data: any, qrImage?: string }) => {
  registerRoboto();
  const items = data.items || [];
  const numItemTypes = items.length;
  const sumQuantities = items.reduce((t: number, it: any) => t + (it.quantity ?? 0), 0);
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <TechboxHeader />
        <View style={styles.headerContainer} fixed>
          <View>
            <Text style={styles.title}>{`Phiếu nhập: ${data.documentCode}`}</Text>
            <Text style={styles.meta}>{`Nhà cung cấp: ${data.supplierName || ''}`}</Text>
            <Text style={styles.meta}>{`Người tạo: ${data.userName || 'N/A'}`}</Text>
            <Text style={styles.meta}>{`Ngày nhập: ${new Date(data.importDate).toLocaleString('vi-VN')}`}</Text>
          </View>
          <View>
            <Text style={styles.meta}>{`Tạo lúc: ${new Date(data.createdAt).toLocaleString('vi-VN')}`}</Text>
            <Text style={styles.meta}>{`Số loại mặt hàng: ${numItemTypes}`}</Text>
            <Text style={styles.meta}>{`Tổng số sản phẩm: ${sumQuantities} sản phẩm`}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, { flex: 0.5 }]}><Text style={styles.tableCellHeader}>STT</Text></View>
            <View style={[styles.tableColHeader, { flex: 3 }]}><Text style={styles.tableCellHeader}>Sản phẩm</Text></View>
            <View style={[styles.tableColHeader, { flex: 3 }]}><Text style={styles.tableCellHeader}>SKU / Biến thể</Text></View>
            <View style={[styles.tableColHeader, { flex: 1 }]}><Text style={styles.tableCellHeader}>Số lượng</Text></View>
            <View style={[styles.tableColHeader, { flex: 1.5 }]}><Text style={styles.tableCellHeader}>Giá nhập</Text></View>
            <View style={[styles.tableColHeader, { flex: 1.5 }]}><Text style={styles.tableCellHeader}>Thành tiền</Text></View>
          </View>
          {(data.items || []).map((it: any, idx: number) => (
            <View style={styles.tableRow} key={idx}>
              <View style={[styles.tableCol, { flex: 0.5 }]}><Text style={styles.tableCell}>{idx + 1}</Text></View>
              <View style={[styles.tableCol, { flex: 3 }]}><Text style={styles.tableCell}>{it.productName}</Text></View>
              <View style={[styles.tableCol, { flex: 3 }]}><Text style={styles.tableCell}>{`${it.sku || ''}${it.variationName ? ' - ' + it.variationName : ''}`}</Text></View>
              <View style={[styles.tableCol, { flex: 1 }]}><Text style={styles.tableCell}>{it.quantity}</Text></View>
              <View style={[styles.tableCol, { flex: 1.5 }]}><Text style={styles.tableCell}>{it.costPrice != null ? `${it.costPrice.toLocaleString('vi-VN')}₫` : ''}</Text></View>
              <View style={[styles.tableCol, { flex: 1.5 }]}><Text style={styles.tableCell}>{it.totalValue != null ? `${it.totalValue.toLocaleString('vi-VN')}₫` : ''}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureCol}><Text>Người lập</Text><Text>________________________</Text></View>
          <View style={styles.signatureCol}><Text>Người kiểm</Text><Text>________________________</Text></View>
          <View style={styles.signatureCol}><Text>Người duyệt</Text><Text>________________________</Text></View>
        </View>
        {qrImage && (
          <View style={{ position: 'absolute', right: 40, bottom: 80 }}>
            <Image src={qrImage} style={{ width: 82, height: 82 }} />
          </View>
        )}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => `Trang ${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default ImportDocument;
