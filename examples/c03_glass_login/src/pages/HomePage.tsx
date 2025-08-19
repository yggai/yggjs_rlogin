import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="glass-home-page">
      <div className="glass-home-container">
        <header className="glass-home-header">
          <h1 className="glass-home-title">磨砂玻璃登录页面</h1>
          <p className="glass-home-subtitle">YggJS RLogin - 现代磨砂玻璃设计风格</p>
        </header>

        <div className="glass-home-content">
          <div className="glass-feature-section">
            <h2>设计特色</h2>
            <div className="glass-feature-grid">
              <div className="glass-feature-card">
                <div className="glass-feature-icon">✨</div>
                <h3>磨砂玻璃效果</h3>
                <p>采用现代磨砂玻璃设计，通过backdrop-filter创造半透明模糊效果</p>
              </div>
              <div className="glass-feature-card">
                <div className="glass-feature-icon">🌈</div>
                <h3>渐变背景</h3>
                <p>精美的渐变背景色彩，营造梦幻般的视觉体验</p>
              </div>
              <div className="glass-feature-card">
                <div className="glass-feature-icon">🔒</div>
                <h3>安全验证</h3>
                <p>支持可选的验证码功能，提供额外的安全保护</p>
              </div>
              <div className="glass-feature-card">
                <div className="glass-feature-icon">📱</div>
                <h3>响应式设计</h3>
                <p>完美适配各种设备，保持一致的用户体验</p>
              </div>
            </div>
          </div>

          <div className="glass-demo-section">
            <h2>在线演示</h2>
            <p>体验不同配置的磨砂玻璃登录页面</p>
            
            <div className="glass-demo-links">
              <Link to="/login" className="glass-demo-link glass-demo-link--primary">
                <div className="glass-demo-link-icon">🚀</div>
                <div className="glass-demo-link-content">
                  <h3>基础登录页面</h3>
                  <p>简洁优雅的磨砂玻璃登录体验</p>
                </div>
              </Link>

              <Link to="/login-with-captcha" className="glass-demo-link glass-demo-link--secondary">
                <div className="glass-demo-link-icon">🛡️</div>
                <div className="glass-demo-link-content">
                  <h3>安全登录页面</h3>
                  <p>带验证码的安全磨砂玻璃登录</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="glass-tech-section">
            <h2>技术特点</h2>
            <div className="glass-tech-list">
              <div className="glass-tech-item">
                <span className="glass-tech-label">视觉效果</span>
                <span className="glass-tech-value">backdrop-filter / 磨砂玻璃</span>
              </div>
              <div className="glass-tech-item">
                <span className="glass-tech-label">背景设计</span>
                <span className="glass-tech-value">CSS渐变 / 动态背景</span>
              </div>
              <div className="glass-tech-item">
                <span className="glass-tech-label">交互体验</span>
                <span className="glass-tech-value">平滑过渡 / 悬停效果</span>
              </div>
              <div className="glass-tech-item">
                <span className="glass-tech-label">兼容性</span>
                <span className="glass-tech-value">现代浏览器 / 渐进增强</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="glass-home-footer">
          <p>&copy; 2024 YggJS RLogin. 基于 MIT 许可证开源.</p>
        </footer>
      </div>
    </div>
  )
}
