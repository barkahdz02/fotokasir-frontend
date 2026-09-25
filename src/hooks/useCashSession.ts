import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cashSessionsApi } from '../api/cash-sessions';
import type { OpenSessionDto, CloseSessionDto } from '../api/cash-sessions';

export function useActiveSession() {
  return useQuery({
    queryKey: ['cash-session', 'active'],
    queryFn: () => cashSessionsApi.active(),
    staleTime: 30 * 1000,
  });
}

export function useOpenSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: OpenSessionDto) => cashSessionsApi.open(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cash-session'] });
    },
  });
}

export function useCloseSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CloseSessionDto) => cashSessionsApi.close(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cash-session'] });
    },
  });
}
