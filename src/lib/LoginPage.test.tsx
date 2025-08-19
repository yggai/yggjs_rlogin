import { render } from '@testing-library/react'
import React from 'react'
import { LoginPage } from './LoginPage'

it('渲染 LoginPage 并透传 onLogin', () => {
  const onLogin = vi.fn()
  const { container } = render(<LoginPage onLogin={onLogin} />)
  // 页面容器样式：最大 100vh / 100vw，overflow: hidden
  const page = container.querySelector('.yggjs-rlogin-page') as HTMLElement
  expect(getComputedStyle(page).maxHeight).toBe('100vh')
  expect(getComputedStyle(page).maxWidth).toBe('100vw')
  expect(getComputedStyle(page).overflow).toBe('hidden')
})

