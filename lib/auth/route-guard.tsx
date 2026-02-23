'use client'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from './auth-context'
import type { RouteGuardProps } from './types'

/**
 * Route Guard component for protecting routes based on authentication state
 * 
 * Features:
 * - Redirects unauthenticated users to login page
 * - Redirects authenticated users away from auth pages to dashboard
 * - Handles loading states during authentication checks
 * - Supports custom fallback components and redirect paths
 * 
 * Usage Examples:
 * 
 * 1. Protect entire dashboard layout:
 * ```tsx
 * // app/(dashboard)/layout.tsx
 * import { RouteGuard } from '@/lib/auth'
 * 
 * export default function DashboardLayout({ children }) {
 *   return (
 *     <RouteGuard>
 *       <div className="dashboard-layout">
 *         {children}
 *       </div>
 *     </RouteGuard>
 *   )
 * }
 * ```
 * 
 * 2. Protect individual pages:
 * ```tsx
 * // app/protected-page/page.tsx
 * import { withRouteGuard } from '@/lib/auth'
 * 
 * function ProtectedPage() {
 *   return <div>Protected content</div>
 * }
 * 
 * export default withRouteGuard(ProtectedPage)
 * ```
 * 
 * 3. Custom redirect and fallback:
 * ```tsx
 * <RouteGuard 
 *   redirectTo="/custom-login" 
 *   fallback={<CustomLoader />}
 * >
 *   {children}
 * </RouteGuard>
 * ```
 */
export function RouteGuard({ 
  children, 
  fallback = <LoadingSpinner />, 
  redirectTo = '/login' 
}: RouteGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Define auth pages that authenticated users should be redirected away from
  const authPages = ['/login', '/register', '/forgot-password']
  const isAuthPage = authPages.includes(pathname)

  useEffect(() => {
    // Don't redirect while still loading authentication state
    if (isLoading) {
      console.log('RouteGuard: Still loading auth state...')
      return
    }

    console.log('RouteGuard: Auth state loaded', { isAuthenticated, isAuthPage, pathname })

    // If user is on an auth page but is already authenticated, redirect to dashboard
    if (isAuthPage && isAuthenticated) {
      console.log('RouteGuard: Authenticated user on auth page, redirecting to dashboard')
      router.replace('/dashboard')
      return
    }

    // If user is not on an auth page but is not authenticated, redirect to login
    if (!isAuthPage && !isAuthenticated) {
      console.log('RouteGuard: Unauthenticated user on protected page, redirecting to login')
      // Store the current path to redirect back after login
      const returnUrl = encodeURIComponent(pathname)
      router.replace(`${redirectTo}?returnUrl=${returnUrl}`)
      return
    }
  }, [isAuthenticated, isLoading, isAuthPage, pathname, router, redirectTo])

  // Show loading fallback while authentication state is being determined
  if (isLoading) {
    return <>{fallback}</>
  }

  // If on auth page and not authenticated, allow access
  if (isAuthPage && !isAuthenticated) {
    return <>{children}</>
  }

  // If not on auth page and authenticated, allow access
  if (!isAuthPage && isAuthenticated) {
    return <>{children}</>
  }

  // In all other cases, show loading (redirect is in progress)
  return <>{fallback}</>
}

/**
 * Default loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Проверка авторизации...</p>
      </div>
    </div>
  )
}

/**
 * Higher-order component for protecting individual pages
 * Usage: export default withRouteGuard(MyPage)
 */
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RouteGuardProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <RouteGuard {...options}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}

/**
 * Hook for checking authentication status in components
 * Provides additional utilities for route protection logic
 */
export function useRouteGuard() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const pathname = usePathname()
  
  const authPages = ['/login', '/register', '/forgot-password']
  const isAuthPage = authPages.includes(pathname)
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isAuthPage,
    shouldRedirectToLogin: !isAuthPage && !isAuthenticated && !isLoading,
    shouldRedirectToDashboard: isAuthPage && isAuthenticated && !isLoading
  }
}

/**
 * Utility function to extract return URL from query parameters
 * Used by login pages to redirect users back to their intended destination
 */
export function getReturnUrl(searchParams: URLSearchParams): string {
  const returnUrl = searchParams.get('returnUrl')
  if (returnUrl) {
    try {
      return decodeURIComponent(returnUrl)
    } catch {
      return '/dashboard'
    }
  }
  return '/dashboard'
}