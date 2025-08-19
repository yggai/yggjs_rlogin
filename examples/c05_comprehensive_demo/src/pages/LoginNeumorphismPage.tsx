import { Link } from 'react-router-dom'
import { NeumorphismLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

export default function LoginNeumorphismPage() {
  const handleLogin = async (payload: { username: string; password: string }) => {
    console.log('新拟态登录:', payload)
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    alert(`新拟态登录成功！\n用户名: ${payload.username}\n密码: ${payload.password}`)
  }

  const customLogo = (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
      margin: '0 auto'
    }}>
      YGG
    </div>
  )

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
          background: '#f0f0f0',
          borderRadius: '16px',
          textDecoration: 'none',
          color: '#555555',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)'
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
        background: '#f0f0f0',
        borderRadius: '16px',
        boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)',
        textAlign: 'right'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333333' }}>新拟态登录</div>
        <div style={{ fontSize: '12px', color: '#666666' }}>基础版本</div>
      </div>

      <NeumorphismLoginPage
        onLogin={handleLogin}
        logo={customLogo}
        title="新拟态登录"
        usernameLabel="用户名或邮箱"
        passwordLabel="登录密码"
        submitLabel="立即登录"
        showCaptcha={false}
      />

      {/* 切换到验证码版本 */}
      <Link 
        to="/login-neumorphism-captcha"
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
          background: '#f0f0f0',
          borderRadius: '20px',
          textDecoration: 'none',
          color: '#666666',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8)'
        }}
      >
        体验验证码版本 →
      </Link>
    </div>
  )
}
