import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api/reports';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => reportsApi.dashboard(),
    staleTime: 60 * 1000, // 1 menit
  });
}
