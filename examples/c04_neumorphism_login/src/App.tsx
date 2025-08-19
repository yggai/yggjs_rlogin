import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LoginWithCaptchaPage from './pages/LoginWithCaptchaPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-with-captcha" element={<LoginWithCaptchaPage />} />
      </Routes>
    </Router>
  )
}

export default App
