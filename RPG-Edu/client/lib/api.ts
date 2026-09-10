/**
 * SKILLQUEST API CLIENT
 * ---------------------
 * This is the "Experience Layer's" bridge to the "Intelligence Layer" (Flask).
 *
 * INNOVATIVE DESIGN PATTERN:
 * 1. Type-Safe Generic Responses: Uses TypeScript generics to ensure the UI knows exactly what data it's receiving.
 * 2. Response Wrapper: Wraps all responses in a standardized { data, error } object to prevent app crashes on API failure.
 * 3. Interceptor Logic: Automatically injects JWT tokens from storage for authenticated requests.
 * 4. RPG-Themed Error Mapping: Maps HTTP error codes to "Adventurer" friendly messages.
 */

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to map HTTP errors to RPG-themed messages.
 * This transforms a boring "403 Forbidden" into a game-world narrative.
 */
const mapErrorToRPG = (status: number, message: string): string => {
  const errorMap: Record<number, string> = {
    400: "The quest requirements were not met. (Bad Request)",
    401: "Your Adventurer's Pass is missing or expired. (Unauthorized)",
    403: "This area is locked! You lack the required Skill Level. (Forbidden)",
    404: "The path you seek does not exist in this realm. (Not Found)",
    500: "A glitch in the AI Navigator! The realm is unstable. (Server Error)",
  };
  return errorMap[status] || `An unknown anomaly occurred: ${message}`;
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Interceptor: Inject JWT Token if it exists in localStorage
  const token = localStorage.getItem('sq_token');
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || response.statusText;
      throw new ApiError(response.status, mapErrorToRPG(response.status, message));
    }

    const data = await response.json();
    return { data, error: null, status: response.status };
  } catch (err) {
    if (err instanceof ApiError) {
      return { data: null, error: err.message, status: err.status };
    }
    return {
      data: null,
      error: "The connection to the realm was severed. (Network Error)",
      status: 0
    };
  }
}

/**
 * THE PUBLIC API CLIENT
 * Used by components to interact with the Flask backend.
 */
export const apiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return request<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return request<T>(endpoint, { method: 'DELETE' });
  },
};
