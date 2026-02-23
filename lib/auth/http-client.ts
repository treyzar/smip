// HTTP client for authentication API requests

import { API_CONFIG, DEFAULT_HEADERS } from './config'

export interface HttpClientOptions {
  timeout?: number
  headers?: Record<string, string>
  retryAttempts?: number
}

export interface HttpResponse<T = any> {
  data: T
  status: number
  statusText: string
}

export class HttpClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private timeout: number
  private retryAttempts: number
  private tokenManager: any // Will be injected to avoid circular dependency

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = API_CONFIG.baseUrl
    this.defaultHeaders = { ...DEFAULT_HEADERS, ...options.headers }
    this.timeout = options.timeout ?? API_CONFIG.timeout
    this.retryAttempts = options.retryAttempts ?? API_CONFIG.retryAttempts
    
    // Ensure HTTPS is used for all requests
    this.validateSecureConnection()
  }

  /**
   * Validate that the base URL uses HTTPS for secure communication
   */
  private validateSecureConnection(): void {
    if (!this.baseUrl.startsWith('https://')) {
      console.warn('Warning: API requests should use HTTPS for secure communication')
      // In production, you might want to throw an error instead
      if (process.env.NODE_ENV === 'production') {
        throw new Error('HTTPS is required for API communication in production')
      }
    }
  }

  /**
   * Set token manager for automatic token injection
   */
  setTokenManager(tokenManager: any): void {
    this.tokenManager = tokenManager
  }

  /**
   * Get authorization headers with current access token
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {}
    
    if (this.tokenManager) {
      const accessToken = this.tokenManager.getAccessToken()
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }
    
    return headers
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    attempt = 1,
    skipAuth = false
  ): Promise<HttpResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      // Prepare headers with automatic token injection (unless skipped)
      const authHeaders = skipAuth ? {} : this.getAuthHeaders()
      const requestHeaders = {
        ...this.defaultHeaders,
        ...authHeaders,
        ...options.headers
      }

      const response = await fetch(url, {
        ...options,
        headers: requestHeaders,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        data,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      // Retry logic for network errors
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        await this.delay(1000 * attempt) // Exponential backoff
        return this.makeRequest<T>(url, options, attempt + 1, skipAuth)
      }
      
      throw error
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof Error) {
      // Retry on network errors but not on HTTP errors
      return error.name === 'AbortError' || 
             error.message.includes('fetch') ||
             error.message.includes('network')
    }
    return false
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async get<T>(url: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, {
      ...options,
      method: 'GET'
    })
  }

  async post<T>(
    url: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * POST request without automatic token injection (for login/refresh endpoints)
   */
  async postWithoutAuth<T>(
    url: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    }, 1, true) // skipAuth = true
  }

  async put<T>(
    url: string, 
    data?: any, 
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(url: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, {
      ...options,
      method: 'DELETE'
    })
  }

  // Set authorization header for authenticated requests (legacy method)
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  // Remove authorization header (legacy method)
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization']
  }
}

// Create a singleton instance for the auth API
export const authHttpClient = new HttpClient()

// Initialize token manager injection (will be set up in index.ts)
export function initializeHttpClient(tokenManager: any): void {
  authHttpClient.setTokenManager(tokenManager)
}

/**
 * Create an authenticated HTTP client instance for API requests
 * This client will automatically include authorization headers
 */
export function createAuthenticatedClient(options: HttpClientOptions = {}): HttpClient {
  const client = new HttpClient(options)
  // The token manager will be injected automatically via the singleton pattern
  return client
}