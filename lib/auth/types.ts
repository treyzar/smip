// Authentication types for SMIP API integration

export interface User {
  username: string
  email?: string | null
  google_sheet_url?: string | null
  companyName?: string
}

export interface UpdateUserRequest {
  email?: string | null
  google_sheet_url?: string | null
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number // timestamp
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
  updateUser: (data: UpdateUserRequest) => Promise<void>
  clearError: () => void
}

export interface ValidationError {
  loc: string[]
  msg: string
  type: string
}

export interface ApiError {
  detail: ValidationError[]
}

export interface AuthError {
  type: 'network' | 'validation' | 'unauthorized' | 'server' | 'unknown'
  message: string
  field?: string // for field validation errors
}

// Route Guard types
export interface RouteGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

// Service interfaces
export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  refreshToken(): Promise<AuthResponse>
  logout(): Promise<void>
  updateUser(data: UpdateUserRequest): Promise<User>
}

export interface TokenManager {
  setTokens(accessToken: string, refreshToken: string): void
  getAccessToken(): string | null
  getRefreshToken(): string | null
  clearTokens(): void
  isTokenExpired(token: string): boolean
}

export interface ErrorHandler {
  handleAuthError(error: unknown): AuthError
  getErrorMessage(error: AuthError): string
  shouldRetry(error: AuthError): boolean
}