import React from 'react'
import { MinimalLoginPage } from 'yggjs_rlogin'

export default function App() {
  const handleLogin = async ({ username, password }: { username: string; password: string }) => {
    // 模拟登录API调用
    console.log('登录信息:', { username, password })

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟登录成功
    alert(`✅ 登录成功！\n\n用户名: ${username}\n密码: ${password}\n\n欢迎使用系统！`)

    // 在实际应用中，这里应该：
    // 1. 保存token到localStorage或cookie
    // 2. 跳转到主页面
    // 3. 更新全局状态
    console.log('登录成功，准备跳转到主页面...')
  }

  return (
    <MinimalLoginPage
      title="Apple"
      onLogin={handleLogin}
      usernameLabel="用户名或邮箱"
      passwordLabel="密码"
      submitLabel="登录"
    />
  )
}
