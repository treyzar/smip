// Auth Service for SMIP API integration

import { authHttpClient } from './http-client'
import { tokenManager } from './token-manager'
import { errorHandler } from './error-handler'
import { API_ENDPOINTS, VALIDATION_CONSTRAINTS } from './config'
import type { 
  AuthService as IAuthService, 
  LoginCredentials, 
  AuthResponse, 
  AuthError,
  ValidationError,
  ApiError 
} from './types'

export class AuthService implements IAuthService {
  /**
   * Authenticate user with username and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate input data
    this.validateCredentials(credentials)

    try {
      // Use postWithoutAuth for login to avoid circular token dependency
      const response = await authHttpClient.postWithoutAuth<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        credentials
      )

      // Store tokens securely
      tokenManager.setTokens(response.data.access_token, response.data.refresh_token)

      return response.data
    } catch (error) {
      throw errorHandler.handleAuthError(error)
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = tokenManager.getRefreshToken()
    
    if (!refreshToken) {
      throw errorHandler.handleAuthError(new Error('No refresh token available'))
    }

    try {
      // Use postWithoutAuth for refresh to avoid circular token dependency
      const response = await authHttpClient.postWithoutAuth<AuthResponse>(
        API_ENDPOINTS.REFRESH,
        { refresh_token: refreshToken }
      )

      // Update stored tokens
      tokenManager.setTokens(response.data.access_token, response.data.refresh_token)

      return response.data
    } catch (error) {
      // If refresh fails, clear all tokens
      tokenManager.clearTokens()
      throw errorHandler.handleAuthError(error)
    }
  }

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    const accessToken = tokenManager.getAccessToken()
    
    try {
      // Attempt to notify server about logout
      if (accessToken) {
        authHttpClient.setAuthToken(accessToken)
        await authHttpClient.post(API_ENDPOINTS.LOGOUT)
      }
    } catch (error) {
      // Ignore logout API errors - we still want to clear local tokens
      console.warn('Logout API call failed:', error)
    } finally {
      // Always clear tokens locally
      tokenManager.clearTokens()
      authHttpClient.clearAuthToken()
    }
  }

  /**
   * Validate login credentials
   */
  private validateCredentials(credentials: LoginCredentials): void {
    const errors: ValidationError[] = []

    // Validate username
    if (!credentials.username) {
      errors.push({
        loc: ['username'],
        msg: 'Username is required',
        type: 'value_error.missing'
      })
    } else if (credentials.username.length > VALIDATION_CONSTRAINTS.USERNAME_MAX_LENGTH) {
      errors.push({
        loc: ['username'],
        msg: `Username must not exceed ${VALIDATION_CONSTRAINTS.USERNAME_MAX_LENGTH} characters`,
        type: 'value_error.too_long'
      })
    }

    // Validate password
    if (!credentials.password) {
      errors.push({
        loc: ['password'],
        msg: 'Password is required',
        type: 'value_error.missing'
      })
    } else if (credentials.password.length > VALIDATION_CONSTRAINTS.PASSWORD_MAX_LENGTH) {
      errors.push({
        loc: ['password'],
        msg: `Password must not exceed ${VALIDATION_CONSTRAINTS.PASSWORD_MAX_LENGTH} characters`,
        type: 'value_error.too_long'
      })
    }

    if (errors.length > 0) {
      const apiError: ApiError = { detail: errors }
      throw errorHandler.handleAuthError(apiError)
    }
  }
}

// Create a singleton instance
export const authService = new AuthService()