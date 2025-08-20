import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BasicRegisterPage } from './lib/basic_login'
import { MinimalRegisterPage } from './lib/minimal_login'
import { GlassRegisterPage } from './lib/glass_login'
import { NeumorphismRegisterPage } from './lib/neumorphism_login'
import { DarkNeonRegisterPage } from './lib/dark_neon_login'
import { GradientClashRegisterPage } from './lib/gradient_clash_login'
import { IllustrationRegisterPage } from './lib/illustration_login'
import { SplitBrandRegisterPage } from './lib/split_brand_login'
import { FrostedModalRegisterPage } from './lib/frosted_modal_login'
import { RetroPixelRegisterPage } from './lib/retro_pixel_login'
import { ThreeDGlassRegisterPage } from './lib/threed_glass_login'

async function fillAndSubmit(fields: {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  captcha?: string
}) {
  const u = userEvent.setup()

  if (fields.username) await u.type(screen.getByPlaceholderText('用户名'), fields.username)
  if (fields.email !== undefined) await u.type(screen.getByPlaceholderText('邮箱'), fields.email)
  if (fields.password) await u.type(screen.getByPlaceholderText('密码'), fields.password)
  if (fields.confirmPassword) await u.type(screen.getByPlaceholderText('确认密码'), fields.confirmPassword)
  if (fields.captcha !== undefined) await u.type(screen.getByPlaceholderText('验证码'), fields.captcha)

  const checkbox = screen.queryByRole('checkbox')
  if (checkbox) await u.click(checkbox)

  await u.click(screen.getByRole('button', { name: /注册|注册中/i }))
}

function runSuite(name: string, Component: React.FC<any>) {
  describe(`${name} RegisterPage`, () => {
    it('renders and submits without captcha', async () => {
      const onRegister = vi.fn()
      render(
        <Component onRegister={onRegister} title="注册" />
      )

      await fillAndSubmit({
        username: 'user123',
        email: 'test@example.com',
        password: 'Aa123456!',
        confirmPassword: 'Aa123456!'
      })

      expect(onRegister).toHaveBeenCalledTimes(1)
      const payload = onRegister.mock.calls[0][0]
      expect(payload.username).toBe('user123')
      expect(payload.password).toBe('Aa123456!')
      expect(payload.confirmPassword).toBe('Aa123456!')
      if ('email' in payload) expect(payload.email).toBe('test@example.com')
      expect(payload.captcha).toBeUndefined()
    })

    it('renders with captcha and submits (rules disabled in test)', async () => {
      const onRegister = vi.fn()
      render(
        <Component 
          onRegister={onRegister} 
          title="注册" 
          showCaptcha 
          validationRules={{ captcha: [] }}
        />
      )

      expect(screen.getByPlaceholderText('验证码')).toBeInTheDocument()

      await fillAndSubmit({
        username: 'user123',
        email: 'test@example.com',
        password: 'Aa123456!',
        confirmPassword: 'Aa123456!',
        captcha: 'ABCD'
      })

      expect(onRegister).toHaveBeenCalledTimes(1)
      const payload = onRegister.mock.calls[0][0]
      expect(payload.captcha).toBeDefined()
    })
  })
}

runSuite('Basic', BasicRegisterPage)
runSuite('Minimal', MinimalRegisterPage)
runSuite('Glass', GlassRegisterPage)
runSuite('Neumorphism', NeumorphismRegisterPage)
runSuite('DarkNeon', DarkNeonRegisterPage)
runSuite('GradientClash', GradientClashRegisterPage)
runSuite('Illustration', IllustrationRegisterPage)
runSuite('SplitBrand', SplitBrandRegisterPage)
runSuite('FrostedModal', FrostedModalRegisterPage)
runSuite('RetroPixel', RetroPixelRegisterPage)
runSuite('ThreeDGlass', ThreeDGlassRegisterPage)

