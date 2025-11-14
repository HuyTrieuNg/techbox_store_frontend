import { api } from '../lib/axios';

const BASE_URL = '/brands';

interface Brand {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BrandCreateRequest {
  name: string;
  description?: string;
}

interface BrandUpdateRequest {
  name: string;
  description?: string;
}

const brandService = {
  async getAllBrands(): Promise<Brand[]> {
    return await api.get(`${BASE_URL}`);
  },

  async getBrandById(id: number): Promise<Brand> {
    return await api.get(`${BASE_URL}/${id}`);
  },

  async createBrand(brandData: BrandCreateRequest): Promise<Brand> {
    return await api.post(`${BASE_URL}`, brandData);
  },

  async updateBrand(id: number, brandData: BrandUpdateRequest): Promise<Brand> {
    return await api.put(`${BASE_URL}/${id}`, brandData);
  },

  async deleteBrand(id: number): Promise<void> {
    return await api.delete(`${BASE_URL}/${id}`);
  },

  async checkBrandNameExists(name: string): Promise<boolean> {
    return await api.get(`${BASE_URL}/exists`, {
      params: { name },
    });
  },
};

export default brandService;