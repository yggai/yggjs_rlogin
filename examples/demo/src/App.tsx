import React from 'react'
import { LoginForm } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

export default function App() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f5f7fb' }}>
      <LoginForm
        title="示例登录"
        onSubmit={async ({ username, password }) => {
          await new Promise((r) => setTimeout(r, 600))
          alert(`用户名: ${username}\n密码: ${password}`)
        }}
      />
    </div>
  )
}

