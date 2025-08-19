import { NeumorphismLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

function App() {
  const handleLogin = async (payload: { username: string; password: string }) => {
    console.log('登录信息:', payload)
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟登录成功
    alert(`登录成功！\n用户名: ${payload.username}\n密码: ${payload.password}`)
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
    <NeumorphismLoginPage
      onLogin={handleLogin}
      title="新拟态登录"
      logo={customLogo}
      usernameLabel="用户名或邮箱"
      passwordLabel="登录密码"
      submitLabel="立即登录"
    />
  )
}

export default App
