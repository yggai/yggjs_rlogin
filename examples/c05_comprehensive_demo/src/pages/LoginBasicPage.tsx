import { Link } from 'react-router-dom'
import { LoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

export default function LoginBasicPage() {
  const handleLogin = async (payload: { username: string; password: string }) => {
    console.log('基础登录:', payload)
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    alert(`基础登录成功！\n用户名: ${payload.username}\n密码: ${payload.password}`)
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* 返回首页按钮 */}
      <Link 
        to="/" 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: '#ffffff',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#333333',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0'
        }}
      >
        ← 返回首页
      </Link>

      {/* 页面标识 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '16px 20px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        textAlign: 'right'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333333' }}>基础登录页面</div>
        <div style={{ fontSize: '12px', color: '#666666' }}>不带验证码</div>
      </div>

      <LoginPage
        onLogin={handleLogin}
        title="基础登录"
        showCaptcha={false}
      />

      {/* 切换到验证码版本 */}
      <Link 
        to="/login-basic-captcha"
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: '#ffffff',
          borderRadius: '20px',
          textDecoration: 'none',
          color: '#666666',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0'
        }}
      >
        体验验证码版本 →
      </Link>
    </div>
  )
}
