import { Link } from 'react-router-dom'
import { NeumorphismLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'
import './LoginPage.css'

export default function LoginWithCaptchaPage() {
  const handleLogin = async (payload: { username: string; password: string; captcha?: string }) => {
    console.log('登录信息:', payload)
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    alert(`登录成功！\n用户名: ${payload.username}\n密码: ${payload.password}\n验证码: ${payload.captcha}`)
  }

  const customLogo = (
    <div className="custom-logo">
      <div className="logo-icon">🛡️</div>
      <div className="logo-text">安全登录</div>
    </div>
  )

  return (
    <div className="login-page-wrapper">
      {/* 返回首页按钮 */}
      <Link to="/" className="back-home-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        返回首页
      </Link>

      {/* 页面标识 */}
      <div className="page-indicator">
        <span className="page-type">安全版本</span>
        <span className="page-desc">带验证码的安全登录页面</span>
      </div>

      {/* 登录页面 */}
      <NeumorphismLoginPage
        onLogin={handleLogin}
        logo={customLogo}
        usernameLabel="用户名或邮箱"
        passwordLabel="登录密码"
        submitLabel="安全登录"
        showCaptcha={true}
        captchaLabel="图形验证码"
        captchaConfig={{
          length: 4,
          width: 120,
          height: 40
        }}
      />

      {/* 切换到基础版本 */}
      <div className="switch-version">
        <Link to="/login" className="switch-link">
          <span>体验基础版本</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
