import axios from 'axios';

/**
 * Axios instance configured for Laravel Sanctum SPA authentication.
 *
 * - baseURL: '/api' — proxied to Laravel via Vite dev server
 * - withCredentials: true — required for Sanctum cookie-based auth
 * - Accept: application/json — ensures Laravel returns JSON, not HTML
 *
 * Usage:
 *   import api from '@/lib/api';
 *   const { data } = await api.get('/books');
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Request interceptor: attach XSRF token from cookie (handled by Axios automatically
 * for same-origin requests when withCredentials is true).
 */
api.interceptors.request.use((config) => {
  // For file uploads, let the browser set Content-Type with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

/**
 * Response interceptor: handle common error scenarios.
 * - 401: Redirect to login (session expired)
 * - 403: Forbidden (insufficient role)
 * - 419: CSRF token mismatch (refresh needed)
 * - 422: Validation errors (let caller handle)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Session expired — redirect to login
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }

      if (status === 419) {
        // CSRF token expired — refresh and retry
        return getCsrfCookie().then(() => {
          return api.request(error.config);
        });
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Fetch the CSRF cookie from Laravel Sanctum.
 * Must be called before login/register requests.
 */
export async function getCsrfCookie(): Promise<void> {
  await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
}

export default api;
