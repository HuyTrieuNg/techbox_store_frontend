import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './BaseStyles';

const TechboxHeader: React.FC = () => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Techbox Store</Text>
      <Text style={{ fontSize: 10, color: '#444' }}>Số 54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, Đà Nẵng</Text>
      <Text style={{ fontSize: 10, color: '#444' }}>Số 1 Đại Cồ Việt, quận Hai Bà Trưng, Hà Nội</Text>
      <Text style={{ fontSize: 10, color: '#444' }}>268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh</Text>
      <Text style={{ fontSize: 10, color: '#444' }}>email: techboxstore@techbox.com</Text>
    </View>
  );
};

export default TechboxHeader;
