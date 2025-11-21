/**
 * Supplier Service
 * API calls for supplier management
 */

import axios from '@/lib/axios';
import {
  Supplier,
  SupplierCreateRequest,
  SupplierUpdateRequest,
  SupplierPageResponse,
  SupplierParams
} from '@/features/supplier';

// Get suppliers with pagination
export const getSuppliers = async (params: SupplierParams = {}): Promise<SupplierPageResponse> => {
  const response = await axios.get('/suppliers', { params });
  return response;
};

// Get supplier by ID
export const getSupplierById = async (supplierId: number): Promise<Supplier> => {
  const response = await axios.get(`/suppliers/${supplierId}`);
  return response;
};

// Create supplier
export const createSupplier = async (supplierData: SupplierCreateRequest): Promise<Supplier> => {
  const response = await axios.post('/suppliers', supplierData);
  return response;
};

// Update supplier
export const updateSupplier = async (supplierId: number, supplierData: SupplierUpdateRequest): Promise<Supplier> => {
  const response = await axios.put(`/suppliers/${supplierId}`, supplierData);
  return response;
};

// Delete supplier (soft delete)
export const deleteSupplier = async (supplierId: number): Promise<void> => {
  await axios.delete(`/suppliers/${supplierId}`);
};

// Restore supplier
export const restoreSupplier = async (supplierId: number): Promise<Supplier> => {
  const response = await axios.post(`/suppliers/${supplierId}/restore`);
  return response;
};