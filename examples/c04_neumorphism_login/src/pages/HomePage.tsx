import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-title">新拟态登录页面示例</h1>
          <p className="home-subtitle">YggJS RLogin - 新拟态设计风格登录组件</p>
        </header>

        <div className="home-content">
          <div className="feature-section">
            <h2>设计特色</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>新拟态设计</h3>
                <p>采用现代新拟态设计风格，通过精心设计的阴影和高光效果创造立体视觉体验</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>安全验证</h3>
                <p>支持可选的验证码功能，提供额外的安全保护层</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>响应式设计</h3>
                <p>完美适配各种屏幕尺寸，提供一致的用户体验</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">♿</div>
                <h3>无障碍访问</h3>
                <p>遵循无障碍设计标准，支持键盘导航和屏幕阅读器</p>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h2>在线演示</h2>
            <p>体验不同配置的新拟态登录页面</p>
            
            <div className="demo-links">
              <Link to="/login" className="demo-link demo-link--primary">
                <div className="demo-link-icon">🚀</div>
                <div className="demo-link-content">
                  <h3>基础登录页面</h3>
                  <p>不带验证码的简洁登录体验</p>
                </div>
              </Link>

              <Link to="/login-with-captcha" className="demo-link demo-link--secondary">
                <div className="demo-link-icon">🛡️</div>
                <div className="demo-link-content">
                  <h3>安全登录页面</h3>
                  <p>带验证码的安全登录体验</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="tech-section">
            <h2>技术特点</h2>
            <div className="tech-list">
              <div className="tech-item">
                <span className="tech-label">框架支持</span>
                <span className="tech-value">React 18+ / TypeScript</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">样式方案</span>
                <span className="tech-value">CSS-in-JS / 模块化CSS</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">表单验证</span>
                <span className="tech-value">内置验证规则 / 自定义验证</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">验证码</span>
                <span className="tech-value">SVG生成 / 可配置样式</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="home-footer">
          <p>&copy; 2024 YggJS RLogin. 基于 MIT 许可证开源.</p>
        </footer>
      </div>
    </div>
  )
}
