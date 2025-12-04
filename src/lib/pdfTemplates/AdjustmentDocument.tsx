import React from 'react';
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import styles from './BaseStyles';
import path from 'path';

// Register fonts
const registerRoboto = () => {
  try {
    Font.register({
      family: 'Roboto',
      fonts: [
        { src: path.join(process.cwd(), 'public/fonts/Roboto-Regular.ttf') },
        { src: path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), fontWeight: 'bold' },
      ],
    });
  } catch (e) { console.warn('Failed to register fonts', e); }
};

export const AdjustmentDocument = ({ data }: { data: any }) => {
  registerRoboto();

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerContainer} fixed>
          <View>
            <Text style={styles.title}>{`Phiếu kiểm kho: ${data.documentCode}`}</Text>
            <Text style={styles.meta}>{`Lý do: ${data.checkName || ''}`}</Text>
            <Text style={styles.meta}>{`Người tạo: ${data.userName || 'N/A'}`}</Text>
            <Text style={styles.meta}>{`Ngày kiểm kho: ${new Date(data.adjustmentDate).toLocaleString('vi-VN')}`}</Text>
          </View>
          <View>
            <Text style={styles.meta}>{`Tạo lúc: ${new Date(data.createdAt).toLocaleString('vi-VN')}`}</Text>
            <Text style={styles.meta}>{`Tổng: ${data.totalItems ?? data.items?.length ?? 0} sản phẩm`}</Text>
          </View>
        </View>

        {/* Table header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.tableCellHeader}>STT</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.tableCellHeader}>Sản phẩm</Text>
            </View>
              <View style={[styles.tableColHeader, { flex: 3 }]}> <Text style={styles.tableCellHeader}>SKU / Biến thể</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tableCellHeader}>SL hệ thống</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tableCellHeader}>SL thực tế</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tableCellHeader}>Chênh lệch</Text>
            </View>
            <View style={[styles.tableColHeader, { flex: 1.5 }]}>
              <Text style={styles.tableCellHeader}>Giá vốn</Text>
            </View>
            <View style={[styles.tableColHeader, { flex: 2 }]}>
              <Text style={styles.tableCellHeader}>Chênh lệch giá trị</Text>
            </View>
          </View>

          {/* Table content */}
          {(data.items || []).map((it: any, idx: number) => (
            <View style={styles.tableRow} key={idx}>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.tableCell}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.tableCell}>{it.productName || ''}</Text>
              </View>
                <View style={[styles.tableCol, { flex: 3 }]}>
                  <Text style={styles.tableCell}>{`${it.sku || ''}${it.variationName ? ' - ' + it.variationName : ''}`}</Text>
                </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tableCell}>{it.systemQty ?? ''}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tableCell}>{it.realQty ?? ''}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tableCell}>{it.diffQty ?? ''}</Text>
              </View>
                <View style={[styles.tableCol, { flex: 1.5 }]}>
                  <Text style={styles.tableCell}>{it.costPrice != null ? `${it.costPrice.toLocaleString('vi-VN')}₫` : ''}</Text>
                </View>
                <View style={[styles.tableCol, { flex: 2 }]}>
                  <Text style={styles.tableCell}>{it.diffValue != null ? `${it.diffValue.toLocaleString('vi-VN')}₫` : ''}</Text>
                </View>
            </View>
          ))}
        </View>

        {/* signature */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureCol}>
            <Text>Người lập</Text>
            <Text>________________________</Text>
          </View>
          <View style={styles.signatureCol}>
            <Text>Người kiểm kho</Text>
            <Text>________________________</Text>
          </View>
          <View style={styles.signatureCol}>
            <Text>Người duyệt</Text>
            <Text>________________________</Text>
          </View>
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) => `Trang ${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default AdjustmentDocument;
