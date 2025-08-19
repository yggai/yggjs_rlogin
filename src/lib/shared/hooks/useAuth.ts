/**
 * 认证相关hook
 * 提供登录注册状态管理
 */

import { useState, useCallback } from 'react'
import type { LoginPayload, RegisterPayload } from '../types'

export interface UseAuthOptions {
  onLoginSuccess?: (payload: LoginPayload) => void
  onRegisterSuccess?: (payload: RegisterPayload) => void
  onError?: (error: string) => void
}

export interface UseAuthReturn {
  isLoading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  clearError: () => void
}

export function useAuth({
  onLoginSuccess,
  onRegisterSuccess,
  onError
}: UseAuthOptions = {}): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // 这里可以调用实际的登录API
      // const result = await loginAPI(payload)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onLoginSuccess) {
        onLoginSuccess(payload)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登录失败'
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }, [onLoginSuccess, onError])

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // 这里可以调用实际的注册API
      // const result = await registerAPI(payload)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onRegisterSuccess) {
        onRegisterSuccess(payload)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '注册失败'
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }, [onRegisterSuccess, onError])

  return {
    isLoading,
    error,
    login,
    register,
    clearError
  }
}
