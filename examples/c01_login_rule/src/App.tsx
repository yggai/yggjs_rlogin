import React from 'react'
import { LoginForm, usernameRule, passwordRule, required, minLen, customRule, isEmail } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

export default function App() {
  const rulesUsername = [required('请输入账号'), usernameRule('账号长度需为 3-36 个字符')]
  const rulesPassword = [required('请输入密码'), passwordRule('密码长度需为 6-36 个字符'), minLen(8, '至少 8 位')]

  const notEmail = customRule((v) => (isEmail(v) ? '账号不能是邮箱' : true))

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f5f7fb' }}>
      <LoginForm
        title="规则示例登录"
        usernameRules={[...rulesUsername, notEmail]}
        passwordRules={rulesPassword}
        onSubmit={async ({ username, password }) => {
          await new Promise((r) => setTimeout(r, 400))
          alert(`登录成功!\n用户名: ${username}\n密码: ${password}`)
        }}
      />
    </div>
  )
}

