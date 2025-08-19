import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { NeumorphismLoginPage } from './NeumorphismLoginPage'

// Mock captcha utilities
vi.mock('./captcha', () => ({
  createCaptchaData: vi.fn(() => ({
    text: 'ABC4',
    imageUrl: 'data:image/svg+xml;base64,test'
  })),
  validateCaptcha: vi.fn((input: string, expected: string) =>
    input.toUpperCase().trim() === expected.toUpperCase().trim()
  )
}))

describe('NeumorphismLoginPage', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    mockOnLogin.mockClear()
  })

  it('renders with default props', () => {
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)

    expect(screen.getByRole('heading', { name: '登录' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('用户名')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument()
  })

  it('renders with custom props', () => {
    render(
      <NeumorphismLoginPage
        onLogin={mockOnLogin}
        title="自定义登录"
        usernameLabel="邮箱"
        passwordLabel="密码"
        submitLabel="立即登录"
      />
    )
    
    expect(screen.getByText('自定义登录')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('邮箱')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '立即登录' })).toBeInTheDocument()
  })

  it('renders with logo as string', () => {
    render(
      <NeumorphismLoginPage
        onLogin={mockOnLogin}
        logo="https://example.com/logo.png"
      />
    )
    
    const logoImg = screen.getByAltText('Logo')
    expect(logoImg).toBeInTheDocument()
    expect(logoImg).toHaveAttribute('src', 'https://example.com/logo.png')
  })

  it('renders with logo as React node', () => {
    const CustomLogo = () => <div data-testid="custom-logo">Custom Logo</div>
    render(
      <NeumorphismLoginPage
        onLogin={mockOnLogin}
        logo={<CustomLogo />}
      />
    )
    
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
  })

  it('handles input changes', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    
    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('testpass')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const passwordInput = screen.getByPlaceholderText('密码')
    const eyeButton = screen.getByLabelText('显示密码')
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await user.click(eyeButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('隐藏密码')).toBeInTheDocument()
    
    await user.click(eyeButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('显示密码')).toBeInTheDocument()
  })

  it('validates username and shows error', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    await user.type(usernameInput, 'ab') // Too short
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('用户名长度需为 3-36 个字符')).toBeInTheDocument()
    })
    
    expect(mockOnLogin).not.toHaveBeenCalled()
  })

  it('validates password and shows error', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    await user.type(usernameInput, 'validuser')
    await user.type(passwordInput, '12345') // Too short
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('密码长度需为 6-36 个字符')).toBeInTheDocument()
    })
    
    expect(mockOnLogin).not.toHaveBeenCalled()
  })

  it('calls onLogin with valid credentials', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    await user.type(usernameInput, 'validuser')
    await user.type(passwordInput, 'validpass')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        username: 'validuser',
        password: 'validpass'
      })
    })
  })

  it('shows loading state during login', async () => {
    const user = userEvent.setup()
    const slowOnLogin = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<NeumorphismLoginPage onLogin={slowOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })
    
    await user.type(usernameInput, 'validuser')
    await user.type(passwordInput, 'validpass')
    await user.click(submitButton)
    
    expect(screen.getByText('登录中...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument()
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('handles form submission with Enter key', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    
    await user.type(usernameInput, 'validuser')
    await user.type(passwordInput, 'validpass')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        username: 'validuser',
        password: 'validpass'
      })
    })
  })

  it('uses custom validation rules', async () => {
    const user = userEvent.setup()
    const customUsernameRule = {
      validator: (value: string) => value.length >= 5 ? true : '用户名至少需要5个字符'
    }

    render(
      <NeumorphismLoginPage
        onLogin={mockOnLogin}
        usernameRules={[customUsernameRule]}
      />
    )

    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const submitButton = screen.getByRole('button', { name: '登录' })

    await user.type(usernameInput, 'test') // 4 characters
    await user.type(passwordInput, 'validpassword') // Valid password
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('用户名至少需要5个字符')).toBeInTheDocument()
    })

    expect(mockOnLogin).not.toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('用户名')
    const passwordInput = screen.getByPlaceholderText('密码')
    const eyeButton = screen.getByLabelText('显示密码')
    
    expect(usernameInput).toHaveAttribute('aria-label', '用户名')
    expect(usernameInput).toHaveAttribute('autoComplete', 'username')
    expect(passwordInput).toHaveAttribute('aria-label', '密码')
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password')
    expect(eyeButton).toHaveAttribute('aria-label', '显示密码')
  })

  it('displays error messages with proper role', async () => {
    const user = userEvent.setup()
    render(<NeumorphismLoginPage onLogin={mockOnLogin} />)

    const submitButton = screen.getByRole('button', { name: '登录' })
    await user.click(submitButton)

    await waitFor(() => {
      const errorMessages = screen.getAllByRole('alert')
      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })

  describe('with captcha enabled', () => {
    it('renders captcha input when showCaptcha is true', () => {
      render(
        <NeumorphismLoginPage
          onLogin={mockOnLogin}
          showCaptcha={true}
        />
      )

      expect(screen.getByPlaceholderText('验证码')).toBeInTheDocument()
      expect(screen.getByAltText('验证码图片')).toBeInTheDocument()
      expect(screen.getByLabelText('点击刷新验证码')).toBeInTheDocument()
    })

    it('does not render captcha input when showCaptcha is false', () => {
      render(
        <NeumorphismLoginPage
          onLogin={mockOnLogin}
          showCaptcha={false}
        />
      )

      expect(screen.queryByPlaceholderText('验证码')).not.toBeInTheDocument()
      expect(screen.queryByAltText('验证码图片')).not.toBeInTheDocument()
    })

    it('validates captcha and shows error', async () => {
      const user = userEvent.setup()
      render(
        <NeumorphismLoginPage
          onLogin={mockOnLogin}
          showCaptcha={true}
        />
      )

      const usernameInput = screen.getByPlaceholderText('用户名')
      const passwordInput = screen.getByPlaceholderText('密码')
      const captchaInput = screen.getByPlaceholderText('验证码')
      const submitButton = screen.getByRole('button', { name: '登录' })

      await user.type(usernameInput, 'validuser')
      await user.type(passwordInput, 'validpass')
      await user.type(captchaInput, 'WRONG') // Wrong captcha
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('验证码不正确')).toBeInTheDocument()
      })

      expect(mockOnLogin).not.toHaveBeenCalled()
    })

    it('calls onLogin with captcha when validation passes', async () => {
      const user = userEvent.setup()
      render(
        <NeumorphismLoginPage
          onLogin={mockOnLogin}
          showCaptcha={true}
        />
      )

      const usernameInput = screen.getByPlaceholderText('用户名')
      const passwordInput = screen.getByPlaceholderText('密码')
      const captchaInput = screen.getByPlaceholderText('验证码')
      const submitButton = screen.getByRole('button', { name: '登录' })

      await user.type(usernameInput, 'validuser')
      await user.type(passwordInput, 'validpass')
      await user.type(captchaInput, 'ABC4') // Correct captcha
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalledWith({
          username: 'validuser',
          password: 'validpass',
          captcha: 'ABC4'
        })
      })
    })

    it('uses custom captcha label', () => {
      render(
        <NeumorphismLoginPage
          onLogin={mockOnLogin}
          showCaptcha={true}
          captchaLabel="图形验证码"
        />
      )

      expect(screen.getByPlaceholderText('图形验证码')).toBeInTheDocument()
      expect(screen.getByLabelText('图形验证码')).toBeInTheDocument()
    })
  })
})
