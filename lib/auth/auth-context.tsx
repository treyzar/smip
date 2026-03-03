'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from './auth-service'
import { tokenManager } from './token-manager'
import type {
  AuthState,
  AuthContextType,
  LoginCredentials,
  User,
  AuthError,
  UpdateUserRequest
} from './types'

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Action types for reducer
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_STATE' }

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for initialization
  error: null
}

// Auth reducer
// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  console.log('Auth Reducer: Action dispatched', action.type, 'payload' in action ? action.payload : 'no payload')

  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_USER':
      const newState = {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isLoading: false,
        error: null
      }
      console.log('Auth Reducer: New state after SET_USER', newState)
      return newState

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
        isLoading: false
      }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    case 'RESET_STATE':
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state
  }
}

// Auth Provider Props
interface AuthProviderProps {
  children: React.ReactNode
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const router = useRouter()

  // Initialize authentication state on app load
  const initializeAuth = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const accessToken = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()

      if (!accessToken || !refreshToken) {
        // No tokens found, user is not authenticated
        dispatch({ type: 'SET_USER', payload: null })
        return
      }

      // Check if access token is expired
      if (tokenManager.isTokenExpired(accessToken)) {
        // Try to refresh the token
        try {
          await authService.refreshToken()
          // If refresh succeeds, we'll extract user info from the new token
          const newAccessToken = tokenManager.getAccessToken()
          if (newAccessToken) {
            const user = extractUserFromToken(newAccessToken)
            dispatch({ type: 'SET_USER', payload: user })
          } else {
            dispatch({ type: 'SET_USER', payload: null })
          }
        } catch (error) {
          // Refresh failed, clear tokens and set as unauthenticated
          tokenManager.clearTokens()
          dispatch({ type: 'SET_USER', payload: null })
        }
      } else {
        // Access token is valid, extract user info
        const user = extractUserFromToken(accessToken)
        dispatch({ type: 'SET_USER', payload: user })
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize authentication' })
    }
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      console.log('Auth Context: Starting login process...')
      const response = await authService.login(credentials)
      console.log('Auth Context: Login API call successful')

      // Extract user info from access token
      const user = extractUserFromToken(response.access_token)
      console.log('Auth Context: User extracted from token:', user)

      dispatch({ type: 'SET_USER', payload: user })
      console.log('Auth Context: User state updated, isAuthenticated should be true')
    } catch (error) {
      console.error('Auth Context: Login failed:', error)
      // Extract error message from AuthError object
      const errorMessage = (error as AuthError)?.message || 'Login failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error // Re-throw so components can handle it
    }
  }, [])

  // Logout function
  const logout = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      // Clear tokens via authService (handles API call and token cleanup)
      await authService.logout()

      // Reset authentication state
      dispatch({ type: 'RESET_STATE' })

      // Navigate to home page
      router.push('/')
    } catch (error) {
      // Even if logout API call fails, we should clear local state and navigate
      console.error('Logout error:', error)
      dispatch({ type: 'RESET_STATE' })
      router.push('/')
    }
  }, [router])

  // Refresh authentication
  const refreshAuth = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await authService.refreshToken()

      // Extract user info from new access token
      const user = extractUserFromToken(response.access_token)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      // Refresh failed, clear tokens and set as unauthenticated
      tokenManager.clearTokens()
      dispatch({ type: 'SET_USER', payload: null })

      // Extract error message from AuthError object
      const errorMessage = (error as AuthError)?.message || 'Token refresh failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [])

  // Update user function
  const updateUser = useCallback(async (data: UpdateUserRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      const updatedUser = await authService.updateUser(data)

      dispatch({ type: 'SET_USER', payload: updatedUser })
    } catch (error) {
      const errorMessage = (error as AuthError)?.message || 'Update user failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error // Re-throw so components can handle it
    }
  }, [])

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    updateUser,
    clearError
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Helper function to extract user info from JWT token
// Helper function to extract user info from JWT token
function extractUserFromToken(token: string): User | null {
  try {
    console.log('Extracting user from token:', token.substring(0, 20) + '...')

    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.')
    if (parts.length !== 3) {
      console.error('Invalid JWT format: expected 3 parts, got', parts.length)
      return null
    }

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]))
    console.log('JWT payload:', payload)

    // Extract username from token payload
    // Check different possible locations for username
    let username = null

    // First check if there's a subject object
    if (payload.subject && typeof payload.subject === 'object') {
      username = payload.subject.username || payload.subject.email || payload.subject.name || payload.subject.id
    }

    // If not found in subject, check direct fields
    if (!username) {
      username = payload.username || payload.sub || payload.user || payload.email || payload.name
    }

    // If still not found, try to use the subject as string
    if (!username && payload.subject && typeof payload.subject === 'string') {
      username = payload.subject
    }

    if (!username) {
      console.error('No username found in token payload. Available fields:', Object.keys(payload))
      return null
    }

    const user = { username: String(username) }
    console.log('Extracted user:', user)
    return user
  } catch (error) {
    console.error('Error extracting user from token:', error)
    return null
  }
}

// Export the context for testing purposes
export { AuthContext }