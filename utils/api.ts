import { API_BASE_URL } from '../constants/api';

type HttpMethod = 'GET' | 'POST';

export type ApiUser = { id: number; firstName: string; lastName: string; email: string; createdAt?: string };
export type ApiProduct = { id: number; name: string; description: string; createdAt?: string };

async function request<T>(path: string, method: HttpMethod = 'GET', body?: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data?.error || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  // Auth
  signUp: (payload: { firstName: string; lastName: string; email: string }) =>
    request<ApiUser>('/auth/signup', 'POST', payload),
  listUsers: () => request<ApiUser[]>('/auth/users', 'GET'),

  // Products
  createProduct: (payload: { name: string; description: string }) =>
    request<ApiProduct>('/products', 'POST', payload),
  listProducts: () => request<ApiProduct[]>('/products', 'GET'),
};


