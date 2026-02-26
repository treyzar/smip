// Error Handler for authentication system
// Centralizes error handling logic with user-friendly messages and retry logic

import type { 
  ErrorHandler as IErrorHandler, 
  AuthError, 
  ValidationError, 
  ApiError 
} from './types'

export class ErrorHandler implements IErrorHandler {
  /**
   * Handle and transform any error into standardized AuthError format
   */
  handleAuthError(error: unknown): AuthError {
    // Timeout errors (check first as they're most specific)
    if (this.isTimeoutError(error)) {
      return this.createAuthError('network', 'Превышено время ожидания ответа от сервера. Проверьте подключение к интернету и попробуйте снова.')
    }

    // Network/connection errors (no internet, DNS failure, etc.)
    if (this.isNetworkError(error)) {
      return this.createAuthError('network', 'Не удается подключиться к серверу. Проверьте подключение к интернету и попробуйте снова.')
    }

    // HTTP status errors
    if (this.isHttpError(error)) {
      return this.handleHttpError(error as Error)
    }

    // API validation errors (structured response)
    if (this.isApiValidationError(error)) {
      return this.handleValidationError(error)
    }

    // Generic JavaScript errors
    if (error instanceof Error) {
      return this.createAuthError('unknown', 'Произошла неожиданная ошибка')
    }

    // Fallback for unknown error types
    return this.createAuthError('unknown', 'Произошла неожиданная ошибка')
  }

  /**
   * Get user-friendly error message for display
   */
  getErrorMessage(error: AuthError): string {
    switch (error.type) {
      case 'network':
        return error.message || 'Проблемы с подключением к серверу. Проверьте подключение к интернету.'
      
      case 'validation':
        return error.field 
          ? `${this.getFieldDisplayName(error.field)}: ${error.message}`
          : error.message || 'Проверьте правильность введенных данных'
      
      case 'unauthorized':
        // Security: Generic message that doesn't reveal which credential was incorrect
        return 'Неверные учетные данные. Проверьте введенную информацию и попробуйте снова.'
      
      case 'server':
        // Include retry guidance for server errors
        return error.message || 'Что-то пошло не так. Пожалуйста, попробуйте снова через несколько минут.'
      
      case 'unknown':
      default:
        return error.message || 'Произошла неожиданная ошибка'
    }
  }

  /**
   * Determine if error should trigger a retry attempt
   */
  shouldRetry(error: AuthError): boolean {
    switch (error.type) {
      case 'network':
        return true // Network issues are often temporary
      
      case 'server':
        return true // Server errors (5xx) might be temporary
      
      case 'validation':
      case 'unauthorized':
        return false // Client errors should not be retried
      
      case 'unknown':
        return false // Unknown errors are risky to retry
      
      default:
        return false
    }
  }

  /**
   * Create a standardized AuthError object
   */
  private createAuthError(
    type: AuthError['type'], 
    message: string, 
    field?: string
  ): AuthError {
    return { type, message, field }
  }

  /**
   * Check if error is a network/connection error
   */
  private isNetworkError(error: unknown): boolean {
    if (error instanceof TypeError) {
      const message = error.message.toLowerCase()
      return message.includes('fetch') || 
             message.includes('network') || 
             message.includes('connection') ||
             message.includes('failed to fetch')
    }
    
    if (error instanceof Error) {
      const message = error.message.toLowerCase()
      return message.includes('network request failed') ||
             message.includes('connection refused') ||
             message.includes('dns') ||
             message.includes('enotfound') ||
             message.includes('econnrefused') ||
             message.includes('offline')
    }
    
    // Check if browser is offline
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return true
    }
    
    return false
  }

  /**
   * Check if error is a timeout error
   */
  private isTimeoutError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase()
      return error.name === 'AbortError' || 
             message.includes('timeout') ||
             message.includes('timed out') ||
             message.includes('time out')
    }
    return false
  }

  /**
   * Check if error is an HTTP status error
   */
  private isHttpError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('HTTP') && /HTTP \d+/.test(error.message)
    }
    return false
  }

  /**
   * Handle HTTP status errors
   */
  private handleHttpError(error: Error): AuthError {
    const statusMatch = error.message.match(/HTTP (\d+)/)
    const status = statusMatch ? parseInt(statusMatch[1]) : 0

    switch (status) {
      case 400:
        return this.createAuthError('validation', 'Неверный формат запроса')
      
      case 401:
        // Security: Generic message that doesn't reveal which credential was incorrect
        return this.createAuthError('unauthorized', 'Неверные учетные данные. Проверьте введенную информацию и попробуйте снова.')
      
      case 403:
        // Security: Generic message for forbidden access
        return this.createAuthError('unauthorized', 'Неверные учетные данные. Проверьте введенную информацию и попробуйте снова.')
      
      case 422:
        return this.createAuthError('validation', 'Ошибка валидации данных')
      
      case 429:
        return this.createAuthError('server', 'Слишком много попыток. Пожалуйста, попробуйте снова через несколько минут.')
      
      case 500:
        return this.createAuthError('server', 'Внутренняя ошибка сервера. Пожалуйста, попробуйте снова через несколько минут.')
      
      case 502:
        return this.createAuthError('server', 'Сервер временно недоступен. Пожалуйста, попробуйте снова через несколько минут.')
      
      case 503:
        return this.createAuthError('server', 'Сервис временно недоступен. Пожалуйста, попробуйте снова через несколько минут.')
      
      case 504:
        return this.createAuthError('server', 'Превышено время ожидания сервера. Пожалуйста, попробуйте снова через несколько минут.')
      
      default:
        if (status >= 500) {
          return this.createAuthError('server', 'Ошибка сервера. Пожалуйста, попробуйте снова через несколько минут.')
        } else if (status >= 400) {
          return this.createAuthError('validation', 'Ошибка в запросе')
        } else {
          return this.createAuthError('unknown', 'Неожиданный ответ сервера')
        }
    }
  }

  /**
   * Check if error is an API validation error with structured response
   */
  private isApiValidationError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'detail' in error &&
      Array.isArray((error as any).detail) &&
      (error as any).detail.length > 0 &&
      this.isValidationError((error as any).detail[0])
    )
  }

  /**
   * Check if object is a validation error
   */
  private isValidationError(obj: unknown): obj is ValidationError {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'loc' in obj &&
      'msg' in obj &&
      'type' in obj &&
      Array.isArray((obj as any).loc)
    )
  }

  /**
   * Handle API validation errors
   */
  private handleValidationError(error: ApiError): AuthError {
    const firstError = error.detail[0]
    const field = firstError.loc.length > 0 ? firstError.loc[0] : undefined
    
    // Map common validation messages to user-friendly Russian
    const message = this.translateValidationMessage(firstError.msg, firstError.type)
    
    return this.createAuthError('validation', message, field)
  }

  /**
   * Translate validation messages to user-friendly Russian
   */
  private translateValidationMessage(msg: string, type: string): string {
    const lowerMsg = msg.toLowerCase()
    
    // Common validation patterns
    if (lowerMsg.includes('required') || lowerMsg.includes('missing')) {
      return 'Поле обязательно для заполнения'
    }
    
    if (lowerMsg.includes('too long') || lowerMsg.includes('max length')) {
      return 'Значение слишком длинное'
    }
    
    if (lowerMsg.includes('too short') || lowerMsg.includes('min length')) {
      return 'Значение слишком короткое'
    }
    
    if (lowerMsg.includes('invalid') || type.includes('value_error')) {
      return 'Неверное значение'
    }
    
    if (lowerMsg.includes('format') || lowerMsg.includes('pattern')) {
      return 'Неверный формат'
    }
    
    // Return original message if no translation found
    return msg
  }

  /**
   * Get display name for field names
   */
  private getFieldDisplayName(field: string): string {
    const fieldNames: Record<string, string> = {
      'username': 'Имя пользователя',
      'password': 'Пароль',
      'email': 'Email',
      'refresh_token': 'Токен обновления',
      'access_token': 'Токен доступа'
    }
    
    return fieldNames[field] || field
  }
}

// Create a singleton instance
export const errorHandler = new ErrorHandler()