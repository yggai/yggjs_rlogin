import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginBasicPage from './pages/LoginBasicPage'
import LoginBasicCaptchaPage from './pages/LoginBasicCaptchaPage'
import LoginNeumorphismPage from './pages/LoginNeumorphismPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 基础登录页面 */}
        <Route path="/login-basic" element={<LoginBasicPage />} />
        <Route path="/login-basic-captcha" element={<LoginBasicCaptchaPage />} />

        {/* 新拟态登录页面 */}
        <Route path="/login-neumorphism" element={<LoginNeumorphismPage />} />

        {/* 其他页面路由可以后续添加 */}
        <Route path="*" element={<div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>页面开发中...</h2>
          <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>返回首页</a>
        </div>} />
      </Routes>
    </Router>
  )
}

export default App
