import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="comprehensive-home">
      <div className="comprehensive-container">
        <header className="comprehensive-header">
          <h1 className="comprehensive-title">YggJS RLogin</h1>
          <p className="comprehensive-subtitle">React 登录页面组件库 - 综合演示</p>
        </header>

        <div className="comprehensive-content">
          <div className="intro-section">
            <h2>组件库介绍</h2>
            <p>YggJS RLogin 提供多种精美的登录页面组件，每种都有独特的设计风格和完整的功能支持。所有组件都支持验证码功能，可通过参数控制是否显示。</p>
          </div>

          <div className="components-grid">
            {/* 基础登录页面 */}
            <div className="component-section">
              <h3>LoginPage - 基础登录页面</h3>
              <p>经典的登录页面设计，简洁实用</p>
              <div className="demo-links">
                <Link to="/login-basic" className="demo-btn demo-btn--basic">
                  基础版本
                </Link>
                <Link to="/login-basic-captcha" className="demo-btn demo-btn--basic-captcha">
                  带验证码
                </Link>
              </div>
            </div>

            {/* 新拟态登录页面 */}
            <div className="component-section">
              <h3>NeumorphismLoginPage - 新拟态登录页面</h3>
              <p>新拟态设计风格，立体触感体验</p>
              <div className="demo-links">
                <Link to="/login-neumorphism" className="demo-btn demo-btn--neumorphism">
                  新拟态版本
                </Link>
                <Link to="/login-neumorphism-captcha" className="demo-btn demo-btn--neumorphism-captcha">
                  带验证码（开发中）
                </Link>
              </div>
            </div>

            {/* 其他组件 */}
            <div className="component-section">
              <h3>更多组件</h3>
              <p>MinimalLoginPage 和 GlassLoginPage 正在开发中...</p>
              <div className="demo-links">
                <div className="demo-btn demo-btn--disabled">
                  敬请期待
                </div>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2>核心特性</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <h4>多种设计风格</h4>
                <p>提供基础、极简、玻璃、新拟态四种不同的设计风格</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h4>验证码支持</h4>
                <p>所有组件都支持可选的验证码功能，提供额外安全保护</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>TypeScript</h4>
                <p>完整的 TypeScript 类型支持，提供更好的开发体验</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h4>响应式设计</h4>
                <p>完美适配各种屏幕尺寸，提供一致的用户体验</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛠️</div>
                <h4>高度可定制</h4>
                <p>支持自定义样式、验证规则和交互逻辑</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">♿</div>
                <h4>无障碍访问</h4>
                <p>遵循无障碍设计标准，支持键盘导航和屏幕阅读器</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="comprehensive-footer">
          <p>&copy; 2024 YggJS RLogin. 基于 MIT 许可证开源.</p>
        </footer>
      </div>
    </div>
  )
}
