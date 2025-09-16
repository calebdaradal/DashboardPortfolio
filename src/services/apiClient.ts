import { RequestOptions, ApiResponse } from '@/types';
import toast from 'react-hot-toast';

export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    // Get token from localStorage or auth store
    return localStorage.getItem('auth_token');
  }

  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      const message = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new ApiError(message, response.status, data);
    }

    // For mock API, wrap response in ApiResponse format if not already
    if (data && typeof data === 'object' && !data.hasOwnProperty('success')) {
      return {
        data,
        success: true,
        message: 'Success'
      };
    }

    return data;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers: customHeaders,
      body,
      params,
      timeout = 10000
    } = options;

    const url = this.buildUrl(endpoint, params);
    const headers = this.getHeaders(customHeaders);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      let requestBody: string | FormData | undefined;
      
      if (body) {
        if (body instanceof FormData) {
          requestBody = body;
          // Remove Content-Type header for FormData to let browser set it with boundary
          delete headers['Content-Type'];
        } else if (typeof body === 'object') {
          requestBody = JSON.stringify(body);
        } else {
          requestBody = String(body);
        }
      }

      const response = await fetch(url, {
        method,
        headers,
        body: requestBody,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await this.handleResponse<T>(response);
      
      // Extract data from ApiResponse wrapper for mock API
      return (result as ApiResponse<T>).data || result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        this.handleApiError(error);
        throw error;
      }
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        const timeoutError = new ApiError('Request timeout', 408);
        this.handleApiError(timeoutError);
        throw timeoutError;
      }
      
      const networkError = new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
      this.handleApiError(networkError);
      throw networkError;
    }
  }

  private handleApiError(error: ApiError): void {
    // Log error for debugging
    console.error('API Error:', {
      message: error.message,
      status: error.status,
      data: error.data
    });

    // Handle specific status codes
    switch (error.status) {
      case 401:
        // Unauthorized - redirect to login
        localStorage.removeItem('auth_token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        break;
      case 403:
        toast.error("Access denied. You don't have permission to perform this action.");
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 408:
        toast.error('Request timeout. Please try again.');
        break;
      case 429:
        toast.error('Too many requests. Please slow down.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        if (error.status >= 400 && error.status < 500) {
          // Client errors - show the specific error message
          if (error.message !== 'Network error') {
            toast.error(error.message);
          }
        } else if (error.status >= 500) {
          // Server errors
          toast.error('Server error. Please try again later.');
        } else {
          // Network errors
          toast.error('Network error. Please check your connection.');
        }
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for testing or custom instances
export { ApiClient };
