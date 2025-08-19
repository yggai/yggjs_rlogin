import { Link } from 'react-router-dom'
import { NeumorphismLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'
import './LoginPage.css'

export default function LoginPage() {
  const handleLogin = async (payload: { username: string; password: string }) => {
    console.log('登录信息:', payload)
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    alert(`登录成功！\n用户名: ${payload.username}\n密码: ${payload.password}`)
  }

  const customLogo = (
    <div className="custom-logo">
      <div className="logo-icon">YGG</div>
      <div className="logo-text">新拟态登录</div>
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
        <span className="page-type">基础版本</span>
        <span className="page-desc">不带验证码的登录页面</span>
      </div>

      {/* 登录页面 */}
      <NeumorphismLoginPage
        onLogin={handleLogin}
        logo={customLogo}
        usernameLabel="用户名或邮箱"
        passwordLabel="登录密码"
        submitLabel="立即登录"
        showCaptcha={false}
      />

      {/* 切换到验证码版本 */}
      <div className="switch-version">
        <Link to="/login-with-captcha" className="switch-link">
          <span>体验安全版本</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
