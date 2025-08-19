import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  Home, 
  Layers, 
  Minimize2, 
  Droplets, 
  Circle,
  BarChart3,
  BookOpen,
  Github,
  Zap
} from 'lucide-react'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/basic', label: '基础登录', icon: Layers },
    { path: '/minimal', label: '极简登录', icon: Minimize2 },
    { path: '/glass', label: '玻璃登录', icon: Droplets },
    { path: '/neumorphism', label: '新拟态登录', icon: Circle },
  ]

  return (
    <div className="layout">
      {/* 导航栏 */}
      <motion.header 
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <Zap className="navbar__logo-icon" />
            <span className="navbar__logo-text">YggJS RLogin</span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="navbar__nav">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="navbar__link-indicator"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* GitHub链接 */}
          <a
            href="https://github.com/your-repo/yggjs-rlogin"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__github"
            title="GitHub"
          >
            <Github size={20} />
          </a>

          {/* 移动端菜单按钮 */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="切换菜单"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 移动端菜单 */}
        <motion.div
          className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="navbar__mobile-menu-content">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <a
              href="https://github.com/your-repo/yggjs-rlogin"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__mobile-link"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </motion.header>

      {/* 主内容区域 */}
      <main className="main-content">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__section">
              <h3 className="footer__title">YggJS RLogin</h3>
              <p className="footer__description">
                现代化、高性能的React登录注册组件库
              </p>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__subtitle">快速链接</h4>
              <div className="footer__links">
                <Link to="/docs" className="footer__link">文档</Link>
                <Link to="/comparison" className="footer__link">对比</Link>
                <a 
                  href="https://github.com/your-repo/yggjs-rlogin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  GitHub
                </a>
              </div>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__subtitle">组件风格</h4>
              <div className="footer__links">
                <Link to="/basic" className="footer__link">基础风格</Link>
                <Link to="/minimal" className="footer__link">极简风格</Link>
                <Link to="/glass" className="footer__link">玻璃风格</Link>
                <Link to="/neumorphism" className="footer__link">新拟态</Link>
              </div>
            </div>
          </div>
          
          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2024 YggJS RLogin. Built with ❤️ and React.
            </p>
          </div>
        </div>
      </footer>

      {/* 背景装饰 */}
      <div className="layout__bg-decoration">
        <div className="layout__bg-grid"></div>
        <div className="layout__bg-gradient"></div>
      </div>
    </div>
  )
}

export default Layout
