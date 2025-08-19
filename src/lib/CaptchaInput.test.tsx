import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CaptchaInput } from './CaptchaInput'

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

describe('CaptchaInput', () => {
  const mockOnChange = vi.fn()
  const mockOnValidate = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnValidate.mockClear()
  })

  it('renders with default props', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
      />
    )

    expect(screen.getByPlaceholderText('请输入验证码')).toBeInTheDocument()
    expect(screen.getByAltText('验证码图片')).toBeInTheDocument()
    expect(screen.getByLabelText('点击刷新验证码')).toBeInTheDocument()
  })

  it('renders with custom props', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        placeholder="输入验证码"
        aria-label="图形验证码"
        className="custom-class"
      />
    )
    
    expect(screen.getByPlaceholderText('输入验证码')).toBeInTheDocument()
    expect(screen.getByLabelText('图形验证码')).toBeInTheDocument()
    expect(document.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('handles input changes', async () => {
    const user = userEvent.setup()
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )

    const input = screen.getByPlaceholderText('请输入验证码')
    await user.type(input, 'ABC4')

    // userEvent.type 会为每个字符单独调用onChange
    expect(mockOnChange).toHaveBeenCalledWith('A')
    expect(mockOnChange).toHaveBeenCalledWith('B')
    expect(mockOnChange).toHaveBeenCalledWith('C')
    expect(mockOnChange).toHaveBeenCalledWith('4')
  })

  it('calls onValidate when input changes', async () => {
    const user = userEvent.setup()
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )

    const input = screen.getByPlaceholderText('请输入验证码')

    // 输入验证码
    await user.type(input, 'ABC4')

    // 验证onValidate被调用了
    expect(mockOnValidate).toHaveBeenCalled()

    // 验证最后一次调用包含了验证码文本
    const lastCall = mockOnValidate.mock.calls[mockOnValidate.mock.calls.length - 1]
    expect(lastCall[1]).toBe('ABC4') // 第二个参数应该是验证码文本
  })

  it('refreshes captcha when image is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CaptchaInput
        value="ABC4"
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )
    
    const image = screen.getByAltText('验证码图片')
    await user.click(image)
    
    // 应该清空输入
    expect(mockOnChange).toHaveBeenCalledWith('')
    // 应该通知验证状态
    expect(mockOnValidate).toHaveBeenCalledWith(false, 'ABC4')
  })



  it('handles keyboard navigation on image', async () => {
    const user = userEvent.setup()
    render(
      <CaptchaInput
        value="ABC4"
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )
    
    const image = screen.getByAltText('验证码图片')
    
    // Enter键刷新
    image.focus()
    await user.keyboard('{Enter}')
    expect(mockOnChange).toHaveBeenCalledWith('')
    
    mockOnChange.mockClear()
    
    // 空格键刷新
    await user.keyboard(' ')
    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('handles Enter key in input field', async () => {
    const user = userEvent.setup()
    render(
      <CaptchaInput
        value="ABC4"
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )

    const input = screen.getByPlaceholderText('请输入验证码')
    input.focus()
    await user.keyboard('{Enter}')

    // Enter键应该触发验证
    expect(mockOnValidate).toHaveBeenCalledWith(true, 'ABC4')
  })

  it('respects disabled state', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        disabled={true}
      />
    )

    const input = screen.getByPlaceholderText('请输入验证码')

    expect(input).toBeDisabled()
  })

  it('respects maxLength from config', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        config={{ length: 6 }}
      />
    )
    
    const input = screen.getByPlaceholderText('请输入验证码')
    expect(input).toHaveAttribute('maxLength', '6')
  })

  it('uses default maxLength when config.length is not provided', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
      />
    )
    
    const input = screen.getByPlaceholderText('请输入验证码')
    expect(input).toHaveAttribute('maxLength', '4')
  })

  it('has proper accessibility attributes', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        aria-label="图形验证码"
      />
    )

    const input = screen.getByLabelText('图形验证码')
    const image = screen.getByAltText('验证码图片')

    expect(input).toHaveAttribute('aria-label', '图形验证码')
    expect(input).toHaveAttribute('autoComplete', 'off')
    expect(input).toHaveAttribute('spellCheck', 'false')

    expect(image).toHaveAttribute('role', 'button')
    expect(image).toHaveAttribute('tabIndex', '0')
    expect(image).toHaveAttribute('aria-label', '点击刷新验证码')
  })

  it('calls onValidate on mount', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        onValidate={mockOnValidate}
      />
    )
    
    // 组件挂载时应该调用onValidate
    expect(mockOnValidate).toHaveBeenCalledWith(false, 'ABC4')
  })

  it('applies custom className', () => {
    render(
      <CaptchaInput
        value=""
        onChange={mockOnChange}
        className="custom-captcha"
      />
    )
    
    expect(document.querySelector('.yggjs-captcha-input.custom-captcha')).toBeInTheDocument()
  })
})
