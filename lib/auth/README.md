# Authentication Library

## Overview

The authentication library provides comprehensive authentication infrastructure for the SMIP application, implementing secure token management, API integration, and route protection.

## Security Features

### Secure Token Transmission

✅ **Requirement 6.2**: HTTPS enforcement for all API requests  
✅ **Requirement 6.3**: Proper Authorization Bearer header format  
✅ **Automatic Token Injection**: Tokens are automatically added to authenticated requests  

#### HTTPS Enforcement
- All API requests are validated to use HTTPS protocol
- Production builds enforce HTTPS requirement
- Development mode shows warnings for non-HTTPS usage

#### Authorization Headers
- Automatic `Authorization: Bearer <token>` header injection
- Separate endpoints for login/refresh (no auth required)
- Legacy manual token setting methods still supported

#### Usage Examples

```typescript
import { authHttpClient, createAuthenticatedClient } from '@/lib/auth'

// Automatic token injection for authenticated requests
const response = await authHttpClient.get('/api/protected-endpoint')

// Create custom authenticated client
const apiClient = createAuthenticatedClient({
  timeout: 15000,
  headers: { 'Custom-Header': 'value' }
})

// Login/refresh endpoints (no auth headers)
await authHttpClient.postWithoutAuth('/auth/login', credentials)
```

### Token Storage Security

✅ **Requirement 6.1**: Secure cookie storage with proper flags  
✅ **SameSite=Strict**: Prevents CSRF attacks  
✅ **Secure Flag**: Enforced on HTTPS connections  

#### Cookie Configuration
- `SameSite=Strict` for CSRF protection
- `Secure` flag when using HTTPS
- Automatic expiration based on JWT claims
- Production warnings for insecure configurations

## Route Guard Implementation

## Overview

The Route Guard component provides comprehensive route protection for the SMIP application, implementing the requirements from the authentication specification.

## Features

✅ **Requirement 3.1**: Redirects unauthenticated users to login page  
✅ **Requirement 3.2**: Allows authenticated users access to protected routes  
✅ **Requirement 3.4**: Redirects authenticated users away from auth pages to dashboard  
✅ **Requirement 3.5**: Handles network errors gracefully during token validation  

## Components

### `RouteGuard`
Main component for protecting routes based on authentication state.

```tsx
import { RouteGuard } from '@/lib/auth'

<RouteGuard 
  redirectTo="/login"           // Custom login page (optional)
  fallback={<LoadingSpinner />} // Custom loading component (optional)
>
  {children}
</RouteGuard>
```

### `withRouteGuard`
Higher-order component for protecting individual pages.

```tsx
import { withRouteGuard } from '@/lib/auth'

function MyProtectedPage() {
  return <div>Protected content</div>
}

export default withRouteGuard(MyProtectedPage)
```

### `useRouteGuard`
Hook for accessing route protection state in components.

```tsx
import { useRouteGuard } from '@/lib/auth'

function MyComponent() {
  const { 
    isAuthenticated, 
    isLoading, 
    shouldRedirectToLogin,
    shouldRedirectToDashboard 
  } = useRouteGuard()
  
  // Component logic
}
```

### `getReturnUrl`
Utility for extracting return URLs from query parameters.

```tsx
import { getReturnUrl } from '@/lib/auth'

function LoginPage({ searchParams }) {
  const returnUrl = getReturnUrl(new URLSearchParams(searchParams))
  // Use returnUrl after successful login
}
```

## Integration Examples

### Dashboard Layout Protection
```tsx
// app/(dashboard)/layout.tsx
import { RouteGuard } from '@/lib/auth'

export default function DashboardLayout({ children }) {
  return (
    <RouteGuard>
      <div className="dashboard-layout">
        <Sidebar />
        <main>{children}</main>
      </div>
    </RouteGuard>
  )
}
```

### Auth Layout (Reverse Protection)
```tsx
// app/(auth)/layout.tsx  
import { RouteGuard } from '@/lib/auth'

export default function AuthLayout({ children }) {
  return (
    <RouteGuard>
      <div className="auth-layout">
        {children}
      </div>
    </RouteGuard>
  )
}
```

## Behavior

### Authentication Flow
1. **Loading State**: Shows fallback component while checking authentication
2. **Unauthenticated + Protected Route**: Redirects to login with return URL
3. **Authenticated + Auth Page**: Redirects to dashboard
4. **Authenticated + Protected Route**: Allows access
5. **Unauthenticated + Auth Page**: Allows access

### Return URL Handling
- Protected routes store current path as return URL when redirecting to login
- Login page can use `getReturnUrl()` to redirect back after successful authentication
- Defaults to `/dashboard` if no return URL is provided

### Error Handling
- Network errors during token validation are handled gracefully
- Loading states prevent UI flashing during authentication checks
- Failed token refresh automatically redirects to login

## Testing

The Route Guard implementation supports the following test scenarios:

1. **Redirect Logic**: Verify correct redirects based on authentication state
2. **Loading States**: Ensure proper loading indicators during auth checks  
3. **Return URLs**: Test return URL preservation and restoration
4. **Error Handling**: Verify graceful handling of authentication errors
5. **State Management**: Test integration with Auth Context state changes

## Next Steps

1. **Task 9.2**: Integrate Route Guard into dashboard layout
2. **Task 9.1**: Update login page to use real authentication and return URLs
3. **Task 7.2**: Implement property-based tests for route protection logic