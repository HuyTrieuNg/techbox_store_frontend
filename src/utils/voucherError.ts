/**
 * Voucher Error Handler
 * 
 * Xử lý các lỗi liên quan đến voucher validation
 */

import { VoucherError } from '@/types';

export const handleVoucherError = (error: VoucherError): string => {
  switch (error.errorType) {
    case 'VOUCHER_NOT_FOUND':
      return 'Mã voucher không tồn tại hoặc đã hết hạn!';
    
    case 'VOUCHER_EXPIRED':
      return 'Mã voucher đã hết hạn sử dụng!';
    
    case 'VOUCHER_LIMIT_EXCEEDED':
      return 'Mã voucher đã hết lượt sử dụng!';
    
    case 'VOUCHER_ALREADY_USED':
      return 'Bạn đã sử dụng mã voucher này rồi!';
    
    case 'ORDER_AMOUNT_TOO_LOW':
      return error.message; // Message từ server có thông tin số tiền cụ thể
    
    default:
      return 'Có lỗi xảy ra với mã voucher!';
  }
};

export const getVoucherErrorAction = (errorType: VoucherError['errorType']): {
  shouldClearInput: boolean;
  shouldSuggestOthers: boolean;
  shouldHighlightMin: boolean;
} => {
  switch (errorType) {
    case 'VOUCHER_NOT_FOUND':
    case 'VOUCHER_EXPIRED':
    case 'VOUCHER_LIMIT_EXCEEDED':
      return {
        shouldClearInput: true,
        shouldSuggestOthers: false,
        shouldHighlightMin: false,
      };
    
    case 'VOUCHER_ALREADY_USED':
      return {
        shouldClearInput: true,
        shouldSuggestOthers: true,
        shouldHighlightMin: false,
      };
    
    case 'ORDER_AMOUNT_TOO_LOW':
      return {
        shouldClearInput: false,
        shouldSuggestOthers: false,
        shouldHighlightMin: true,
      };
    
    default:
      return {
        shouldClearInput: false,
        shouldSuggestOthers: false,
        shouldHighlightMin: false,
      };
  }
};

export const isVoucherError = (error: unknown): error is { response: { data: VoucherError } } => {
  if (typeof error !== 'object' || error === null) return false;
  
  const err = error as { response?: { data?: VoucherError } };
  return (
    err.response?.data?.error === 'VOUCHER_VALIDATION_FAILED' &&
    typeof err.response?.data?.errorType === 'string'
  );
};
