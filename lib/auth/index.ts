// Authentication infrastructure exports

export * from './types'
export * from './config'
export * from './http-client'

// Export Token Manager class (not the interface from types)
export { TokenManager, tokenManager } from './token-manager'

// Export Auth Service class (not the interface from types)
export { AuthService, authService } from './auth-service'

// Export Error Handler class (not the interface from types)
export { ErrorHandler, errorHandler } from './error-handler'

// Export Auth Context components
export { AuthProvider, useAuth, AuthContext } from './auth-context'

// Export Route Guard components
export { RouteGuard, withRouteGuard, useRouteGuard, getReturnUrl } from './route-guard'

// Re-export commonly used items for convenience
export { authHttpClient, initializeHttpClient, createAuthenticatedClient } from './http-client'
export { API_ENDPOINTS, VALIDATION_CONSTRAINTS } from './config'

// Initialize HTTP client with token manager for automatic token injection
import { initializeHttpClient } from './http-client'
import { tokenManager } from './token-manager'

// Set up automatic token injection
initializeHttpClient(tokenManager)