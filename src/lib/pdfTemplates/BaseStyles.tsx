import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 10,
    color: '#444',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    marginTop: 8,
  },
  tableRow: { flexDirection: 'row' },
  tableRow: { flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'nowrap', marginVertical: 2 },
  tableColHeader: { width: 'auto', padding: 6, backgroundColor: '#eee', borderRight: 1, borderColor: '#bfbfbf' },
  tableCol: { width: 'auto', padding: 6, borderRight: 1, borderColor: '#bfbfbf' },
  tableCellHeader: { fontSize: 10, fontWeight: 'bold' },
  tableCell: { fontSize: 10, paddingRight: 4, flexWrap: 'wrap' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 10 },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  signatureCol: { width: '30%', textAlign: 'center' },
});

export default styles;
