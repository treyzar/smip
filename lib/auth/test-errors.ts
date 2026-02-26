// Утилиты для тестирования различных типов ошибок
// Используйте только в режиме разработки!

import type { AuthError } from './types'

/**
 * Создать тестовую ошибку для проверки отображения
 * ВНИМАНИЕ: Использовать только для тестирования!
 */
export function createTestError(type: 'network' | 'timeout' | 'server' | 'unauthorized'): AuthError {
  switch (type) {
    case 'network':
      return {
        type: 'network',
        message: 'Не удается подключиться к серверу. Проверьте подключение к интернету и попробуйте снова.'
      }
    
    case 'timeout':
      return {
        type: 'network',
        message: 'Превышено время ожидания ответа от сервера. Проверьте подключение к интернету и попробуйте снова.'
      }
    
    case 'server':
      return {
        type: 'server',
        message: 'Внутренняя ошибка сервера. Попробуйте позже.'
      }
    
    case 'unauthorized':
      return {
        type: 'unauthorized',
        message: 'Неверное имя пользователя или пароль'
      }
    
    default:
      return {
        type: 'unknown',
        message: 'Произошла неожиданная ошибка'
      }
  }
}

/**
 * Имитировать сетевую ошибку (отсутствие интернета)
 */
export function simulateNetworkError(): Error {
  const error = new TypeError('Failed to fetch')
  return error
}

/**
 * Имитировать ошибку таймаута
 */
export function simulateTimeoutError(): Error {
  const error = new Error('Request timeout')
  error.name = 'AbortError'
  return error
}

/**
 * Имитировать HTTP ошибку
 */
export function simulateHttpError(status: number): Error {
  return new Error(`HTTP ${status}: ${getStatusText(status)}`)
}

function getStatusText(status: number): string {
  const statusTexts: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  }
  return statusTexts[status] || 'Unknown Error'
}

/**
 * Примеры использования в консоли браузера:
 * 
 * import { errorHandler } from '@/lib/auth/error-handler'
 * import { simulateNetworkError, simulateTimeoutError, simulateHttpError } from '@/lib/auth/test-errors'
 * 
 * // Тест сетевой ошибки
 * const networkError = errorHandler.handleAuthError(simulateNetworkError())
 * console.log(networkError)
 * 
 * // Тест таймаута
 * const timeoutError = errorHandler.handleAuthError(simulateTimeoutError())
 * console.log(timeoutError)
 * 
 * // Тест HTTP 401
 * const unauthorizedError = errorHandler.handleAuthError(simulateHttpError(401))
 * console.log(unauthorizedError)
 * 
 * // Тест HTTP 500
 * const serverError = errorHandler.handleAuthError(simulateHttpError(500))
 * console.log(serverError)
 */
