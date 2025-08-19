import React from 'react'

export type LoginFormProps = {
  onSubmit?: (payload: { username: string; password: string }) => void | Promise<void>
  title?: string
  usernameLabel?: string
  passwordLabel?: string
  submitLabel?: string
  className?: string
  style?: React.CSSProperties
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  title = '登录',
  usernameLabel = '账号',
  passwordLabel = '密码',
  submitLabel = '登录',
  className,
  style,
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubmit) return
    try {
      setLoading(true)
      await onSubmit({ username, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={`yggjs-rlogin-form ${className ?? ''}`.trim()} style={style} onSubmit={handleSubmit}>
      {title && <div className="yggjs-rlogin-title">{title}</div>}
      <div className="yggjs-rlogin-field">
        <label className="yggjs-rlogin-label" htmlFor="yggjs-rlogin-username">
          {usernameLabel}
        </label>
        <input
          id="yggjs-rlogin-username"
          className="yggjs-rlogin-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={usernameLabel}
          autoComplete="username"
        />
      </div>
      <div className="yggjs-rlogin-field">
        <label className="yggjs-rlogin-label" htmlFor="yggjs-rlogin-password">
          {passwordLabel}
        </label>
        <input
          id="yggjs-rlogin-password"
          className="yggjs-rlogin-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={passwordLabel}
          autoComplete="current-password"
        />
      </div>
      <button className="yggjs-rlogin-button" type="submit" disabled={loading}>
        {loading ? '...' : submitLabel}
      </button>
    </form>
  )
}

