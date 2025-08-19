import React from 'react'
import { GlassLoginPage } from 'yggjs_rlogin'

export default function App() {
  const handleLogin = async ({ username, password }: { username: string; password: string }) => {
    // 模拟登录API调用
    console.log('登录信息:', { username, password })
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // 模拟登录成功
    alert(`🌟 登录成功！\n\n用户名: ${username}\n密码: ${password}\n\n欢迎进入磨砂玻璃世界！`)
    
    // 在实际应用中，这里应该：
    // 1. 保存token到localStorage或cookie
    // 2. 跳转到主页面
    // 3. 更新全局状态
    console.log('登录成功，准备跳转到主页面...')
  }

  // 自定义Logo组件
  const CustomLogo = () => (
    <div style={{ 
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.95)',
      fontSize: '32px',
      fontWeight: '700',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      letterSpacing: '-1px'
    }}>
      ✨ Glass UI
    </div>
  )

  return (
    <GlassLoginPage
      logo={<CustomLogo />}
      onLogin={handleLogin}
      usernameLabel="用户名或邮箱"
      passwordLabel="密码"
      submitLabel="登录"
    />
  )
}
