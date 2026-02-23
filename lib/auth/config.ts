// API configuration for SMIP authentication

export interface ApiConfig {
  baseUrl: string
  endpoints: {
    auth: string
  }
  timeout: number
  retryAttempts: number
}

export const API_CONFIG: ApiConfig = {
  baseUrl: 'https://smip.site/api-v1',
  endpoints: {
    auth: '/auth'
  },
  timeout: 10000, // 10 seconds
  retryAttempts: 3
}

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}`,
  REFRESH: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}/refresh`,
  LOGOUT: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}/logout`
} as const

// HTTP headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
} as const

// Validation constraints
export const VALIDATION_CONSTRAINTS = {
  USERNAME_MAX_LENGTH: 50,
  PASSWORD_MAX_LENGTH: 255
} as const