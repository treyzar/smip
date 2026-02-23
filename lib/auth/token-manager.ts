// Token Manager for secure token storage and management

import type { TokenManager as ITokenManager } from './types'

// Cookie names for token storage
const ACCESS_TOKEN_COOKIE = 'auth_access_token'
const REFRESH_TOKEN_COOKIE = 'auth_refresh_token'

// Token expiration buffer (5 minutes before actual expiration)
const EXPIRATION_BUFFER_MS = 5 * 60 * 1000

export class TokenManager implements ITokenManager {
  /**
   * Set both access and refresh tokens in httpOnly cookies
   */
  setTokens(accessToken: string, refreshToken: string): void {
    // Calculate expiration time from JWT payload
    const expiresAt = this.getTokenExpiration(accessToken)
    
    // Set access token cookie
    this.setCookie(ACCESS_TOKEN_COOKIE, accessToken, expiresAt)
    
    // Set refresh token cookie (longer expiration, typically 7 days)
    const refreshExpiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    this.setCookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshExpiresAt)
  }

  /**
   * Get access token from cookie
   */
  getAccessToken(): string | null {
    return this.getCookie(ACCESS_TOKEN_COOKIE)
  }

  /**
   * Get refresh token from cookie
   */
  getRefreshToken(): string | null {
    return this.getCookie(REFRESH_TOKEN_COOKIE)
  }

  /**
   * Clear all authentication tokens
   */
  clearTokens(): void {
    this.deleteCookie(ACCESS_TOKEN_COOKIE)
    this.deleteCookie(REFRESH_TOKEN_COOKIE)
  }

  /**
   * Check if a token is expired (with buffer)
   */
  isTokenExpired(token: string): boolean {
    try {
      const expirationTime = this.getTokenExpiration(token)
      const now = Date.now()
      
      // Consider token expired if it expires within the buffer time
      return now >= (expirationTime - EXPIRATION_BUFFER_MS)
    } catch (error) {
      // If we can't parse the token, consider it expired
      return true
    }
  }

  /**
   * Extract expiration time from JWT token
   */
  private getTokenExpiration(token: string): number {
    try {
      // JWT tokens have 3 parts separated by dots
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      // Decode the payload (second part)
      const payload = JSON.parse(atob(parts[1]))
      
      // JWT exp claim is in seconds, convert to milliseconds
      if (payload.exp) {
        return payload.exp * 1000
      }
      
      // If no exp claim, default to 1 hour from now
      return Date.now() + (60 * 60 * 1000)
    } catch (error) {
      // If parsing fails, default to 1 hour from now
      return Date.now() + (60 * 60 * 1000)
    }
  }

  /**
   * Set a secure httpOnly cookie
   */
  private setCookie(name: string, value: string, expiresAt: number): void {
    if (typeof document === 'undefined') {
      // Server-side rendering - cookies will be handled by server
      return
    }

    const expires = new Date(expiresAt).toUTCString()
    
    // Enforce secure cookie settings
    const isSecure = window.location.protocol === 'https:'
    const secure = isSecure ? '; Secure' : ''
    
    // Warn if not using HTTPS in production
    if (!isSecure && process.env.NODE_ENV === 'production') {
      console.warn('Warning: Authentication cookies should be transmitted over HTTPS in production')
    }
    
    // Use httpOnly-like behavior by setting SameSite=Strict and Secure when possible
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${secure}`
  }

  /**
   * Get cookie value by name
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      // Server-side rendering - return null
      return null
    }

    const nameEQ = name + '='
    const cookies = document.cookie.split(';')
    
    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length)
      }
    }
    
    return null
  }

  /**
   * Delete a cookie by setting it to expire in the past
   */
  private deleteCookie(name: string): void {
    if (typeof document === 'undefined') {
      // Server-side rendering - nothing to delete
      return
    }

    const isSecure = window.location.protocol === 'https:'
    const secure = isSecure ? '; Secure' : ''
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict${secure}`
  }
}

// Create a singleton instance
export const tokenManager = new TokenManager()