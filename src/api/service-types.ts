import { apiClient } from './client';

export interface ServiceType {
  id: number;
  nama: string;
  satuan: string;
  dimensi: string;
  formula_harga: string;
  total_prices?: number;
  is_active: number;
}

export interface ServiceAttribute {
  id: number;
  dimensi: string;
  nilai: string;
  label: string;
  urutan: number;
}

export interface LookupResult {
  harga: number;
  service_type_id: number;
  kombinasi: Record<string, string>;
}

export const serviceTypesApi = {
  list: async (): Promise<ServiceType[]> => {
    const res = await apiClient.get<ServiceType[]>('/service-types');
    return res.data;
  },

  attributes: async (): Promise<ServiceAttribute[]> => {
    const res = await apiClient.get<ServiceAttribute[]>('/service-attributes');
    return res.data;
  },

  lookup: async (
    serviceTypeId: number,
    kombinasi: Record<string, string>,
    qty = 1,
  ): Promise<LookupResult> => {
    const res = await apiClient.post<LookupResult>(
      `/service-types/${serviceTypeId}/lookup`,
      { kombinasi, qty },
    );
    return res.data;
  },
};
