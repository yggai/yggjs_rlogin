/** 复古像素主题：类型定义 */
import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

export interface RetroPixelLoginPageProps extends BaseLoginPageProps {
  palette?: 'green' | 'amber' | 'phosphor'
  crtIntensity?: 'soft' | 'medium' | 'strong'
  cursorBlink?: boolean
  fontFamily?: string
}

export interface RetroPixelRegisterPageProps extends BaseRegisterPageProps {
  palette?: 'green' | 'amber' | 'phosphor'
  crtIntensity?: 'soft' | 'medium' | 'strong'
  cursorBlink?: boolean
  fontFamily?: string
}

