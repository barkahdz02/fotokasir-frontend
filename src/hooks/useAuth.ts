import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import type { LoginRequest, LoginResponse } from '../types/api';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest): Promise<LoginResponse> => authApi.login(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/dashboard', { replace: true });
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return () => {
    clearAuth();
    navigate('/login', { replace: true });
  };
}
