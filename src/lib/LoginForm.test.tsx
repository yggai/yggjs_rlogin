import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import React from 'react'
import { LoginForm } from './LoginForm'

const type = async (label: string, value: string) => {
  const input = screen.getByLabelText(label)
  await user.click(input)
  await user.clear(input)
  await user.type(input, value)
}

test('账号/密码长度校验与错误提示', async () => {
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} usernameLabel="账号" passwordLabel="密码" />)

  await user.click(screen.getByRole('button', { name: '登录' }))
  expect(onSubmit).not.toHaveBeenCalled()
  expect(screen.getByText('账号长度需为 3-36 个字符')).toBeInTheDocument()
  expect(screen.getByText('密码长度需为 6-36 个字符')).toBeInTheDocument()

  await type('账号', 'ab')
  await type('密码', '12345')
  await user.click(screen.getByRole('button', { name: '登录' }))
  expect(onSubmit).not.toHaveBeenCalled()

  await type('账号', 'abc')
  await type('密码', '123456')
  await user.click(screen.getByRole('button', { name: '登录' }))
  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test('密码显示/隐藏图标切换', async () => {
  render(<LoginForm usernameLabel="账号" passwordLabel="密码" />)
  const toggle = screen.getByRole('button', { name: /切换密码可见/ })
  const pwd = screen.getByLabelText('密码') as HTMLInputElement
  expect(pwd.type).toBe('password')
  await user.click(toggle)
  expect((screen.getByLabelText('密码') as HTMLInputElement).type).toBe('text')
  await user.click(toggle)
  expect((screen.getByLabelText('密码') as HTMLInputElement).type).toBe('password')
})

