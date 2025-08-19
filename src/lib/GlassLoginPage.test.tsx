import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { GlassLoginPage } from './GlassLoginPage'

describe('GlassLoginPage', () => {
  it('渲染磨砂玻璃登录页面并透传 onLogin', () => {
    const onLogin = vi.fn()
    const { container } = render(<GlassLoginPage onLogin={onLogin} />)
    
    // 检查页面容器存在
    const page = container.querySelector('.yggjs-glass-login-page') as HTMLElement
    expect(page).toBeInTheDocument()
    
    // 检查页面容器的CSS类名（样式通过CSS文件应用）
    expect(page).toHaveClass('yggjs-glass-login-page')
    
    // 检查基本结构
    expect(container.querySelector('.yggjs-glass-login-container')).toBeInTheDocument()
    expect(container.querySelector('.yggjs-glass-login-card')).toBeInTheDocument()
    expect(container.querySelector('.yggjs-glass-login-form')).toBeInTheDocument()
  })

  it('显示默认标题和输入框', () => {
    const onLogin = vi.fn()
    render(<GlassLoginPage onLogin={onLogin} />)
    
    // 检查默认标题（使用更具体的选择器）
    expect(screen.getByRole('heading', { name: '登录' })).toBeInTheDocument()
    
    // 检查输入框
    expect(screen.getByPlaceholderText('用户名')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument()
    
    // 检查登录按钮
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument()
  })

  it('支持自定义标题和标签', () => {
    const onLogin = vi.fn()
    render(
      <GlassLoginPage
        onLogin={onLogin}
        title="磨砂玻璃登录"
        usernameLabel="账号"
        passwordLabel="登录密码"
        submitLabel="立即登录"
      />
    )
    
    expect(screen.getByText('磨砂玻璃登录')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('账号')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('登录密码')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '立即登录' })).toBeInTheDocument()
  })

  it('密码可见性切换功能', async () => {
    const onLogin = vi.fn()
    render(<GlassLoginPage onLogin={onLogin} />)
    
    const passwordInput = screen.getByPlaceholderText('密码') as HTMLInputElement
    const eyeButton = screen.getByLabelText('显示密码')
    
    // 初始状态应该是密码类型
    expect(passwordInput.type).toBe('password')
    
    // 点击眼睛按钮切换可见性
    fireEvent.click(eyeButton)
    expect(passwordInput.type).toBe('text')
    
    // 再次点击切换回密码类型
    fireEvent.click(eyeButton)
    expect(passwordInput.type).toBe('password')
  })

  it('表单提交和校验', async () => {
    const onLogin = vi.fn().mockResolvedValue(undefined)
    render(<GlassLoginPage onLogin={onLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    // 输入有效数据
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    // 提交表单
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      })
    })
  })

  it('显示校验错误信息', async () => {
    const onLogin = vi.fn()
    render(<GlassLoginPage onLogin={onLogin} />)
    
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    // 不输入任何内容直接提交
    fireEvent.click(submitButton)
    
    // 应该显示校验错误
    await waitFor(() => {
      expect(screen.getByText('用户名长度需为 3-36 个字符')).toBeInTheDocument()
      expect(screen.getByText('密码长度需为 6-36 个字符')).toBeInTheDocument()
    })
    
    // onLogin 不应该被调用
    expect(onLogin).not.toHaveBeenCalled()
  })

  it('支持自定义logo', () => {
    const onLogin = vi.fn()
    const customLogo = <div data-testid="custom-logo">Custom Logo</div>
    
    render(<GlassLoginPage onLogin={onLogin} logo={customLogo} />)
    
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('加载状态显示', async () => {
    const onLogin = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<GlassLoginPage onLogin={onLogin} />)

    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })

    // 输入有效数据
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    // 提交表单
    fireEvent.click(submitButton)

    // 应该显示加载状态
    await waitFor(() => {
      expect(screen.getByText('登录中...')).toBeInTheDocument()
    })
    expect(submitButton).toBeDisabled()

    // 等待加载完成
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument()
      expect(submitButton).not.toBeDisabled()
    })
  })
})
