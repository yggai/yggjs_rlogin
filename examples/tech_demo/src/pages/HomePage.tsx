import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Gamepad, Layers, Minimize2, Droplets, Circle, Shield, Sparkles, Cpu, Rocket } from 'lucide-react'
import './HomePage.css'

const navItems = [
  {
    group: '基础风格',
    items: [
      { label: '不带验证码登录', to: '/basic', icon: Layers },
      { label: '带验证码登录', to: '/basic/captcha', icon: Layers },
      { label: '不带验证码注册', to: '/basic/register', icon: Layers },
      { label: '带验证码注册', to: '/basic/register/captcha', icon: Layers },
    ]
  },
  {
    group: '极简风格',
    items: [
      { label: '不带验证码登录', to: '/minimal', icon: Minimize2 },
      { label: '带验证码登录', to: '/minimal/captcha', icon: Minimize2 },
      { label: '不带验证码注册', to: '/minimal/register', icon: Minimize2 },
      { label: '带验证码注册', to: '/minimal/register/captcha', icon: Minimize2 },
    ]
  },
  {
    group: '玻璃风格',
    items: [
      { label: '不带验证码登录', to: '/glass', icon: Droplets },
      { label: '带验证码登录', to: '/glass/captcha', icon: Droplets },
      { label: '不带验证码注册', to: '/glass/register', icon: Droplets },
      { label: '带验证码注册', to: '/glass/register/captcha', icon: Droplets },
    ]
  },
  {
    group: '新拟态风格',
    items: [
      { label: '不带验证码登录', to: '/neumorphism', icon: Circle },
      { label: '带验证码登录', to: '/neumorphism/captcha', icon: Circle },
      { label: '不带验证码注册', to: '/neumorphism/register', icon: Circle },
      { label: '带验证码注册', to: '/neumorphism/register/captcha', icon: Circle },
    ]
  },
  {
    group: '暗黑霓虹风格',
    items: [
      { label: '不带验证码登录', to: '/darkneon', icon: Sparkles },
      { label: '带验证码登录', to: '/darkneon/captcha', icon: Sparkles },
      { label: '不带验证码注册', to: '/darkneon/register', icon: Sparkles },
      { label: '带验证码注册', to: '/darkneon/register/captcha', icon: Sparkles },
    ]
  },
  {
    group: '其他页面',
    items: [
      { label: '对比展示', to: '/comparison', icon: Shield },
      { label: '文档（占位）', to: '/docs', icon: Gamepad },
    ]
  }
]

const HomePage: React.FC = () => {
  return (
    <div className="nav-home">
      {/* 背景装饰 */}
      <div className="nav-home__bg">
        <div className="nav-home__grid" />
        <div className="nav-home__glow" />
      </div>

      {/* 顶部区域 */}
      <header className="nav-home__header">
        <motion.h1
          className="nav-home__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={28} />
          <span>YggJS RLogin 导航</span>
        </motion.h1>
        <p className="nav-home__subtitle">
          科技风格的演示导航，点击任意条目开始体验
        </p>
      </header>

      {/* 导航列表 */}
      <main className="nav-home__main container">
        {navItems.map((group) => (
          <section key={group.group} className="nav-group">
            <h2 className="nav-group__title">
              <Cpu size={18} />
              <span>{group.group}</span>
            </h2>
            <div className="nav-list">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link to={item.to} key={item.label} className="nav-item">
                    <div className="nav-item__left">
                      <div className="nav-item__icon">
                        <Icon size={18} />
                      </div>
                      <div className="nav-item__label">{item.label}</div>
                    </div>
                    <ChevronRight size={18} className="nav-item__chevron" />
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </main>

      {/* 底部信息 */}
      <footer className="nav-home__footer">
        <div className="nav-home__footer-inner">
          <div className="nav-home__brand">
            <Rocket size={16} />
            <span>现代化登录组件库 · React + TypeScript</span>
          </div>
          <div className="nav-home__links">
            <a href="https://github.com/your-repo/yggjs-rlogin" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/docs">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
