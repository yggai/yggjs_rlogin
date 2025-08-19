import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NeumorphismLoginPage } from 'yggjs_rlogin'
import { ArrowLeft, Settings, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

const NeumorphismLoginDemo: React.FC = () => {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [showRememberMe, setShowRememberMe] = useState(true)
  const [isPreviewMode, setIsPreviewMode] = useState(true)

  const handleLogin = async (payload: any) => {
    console.log('登录数据:', payload)
    // 模拟登录过程
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('登录成功！')
  }

  const handleNavigateToRegister = () => {
    alert('跳转到注册页面')
  }

  return (
    <div className="demo-page">
      {/* 控制面板 */}
      <motion.div 
        className="demo-controls"
        initial={{ x: -300 }}
        animate={{ x: isPreviewMode ? -250 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button 
          className="demo-controls__toggle"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          title={isPreviewMode ? '显示控制面板' : '隐藏控制面板'}
        >
          {isPreviewMode ? <Settings size={20} /> : <EyeOff size={20} />}
        </button>
        
        <div className="demo-controls__content">
          <div className="demo-controls__header">
            <Link to="/" className="demo-controls__back">
              <ArrowLeft size={18} />
              <span>返回首页</span>
            </Link>
            <h2 className="demo-controls__title">新拟态风格</h2>
          </div>
          
          <div className="demo-controls__section">
            <h3 className="demo-controls__section-title">功能配置</h3>
            <div className="demo-controls__options">
              <label className="demo-option">
                <input
                  type="checkbox"
                  checked={showCaptcha}
                  onChange={(e) => setShowCaptcha(e.target.checked)}
                />
                <span>显示验证码</span>
              </label>
              <label className="demo-option">
                <input
                  type="checkbox"
                  checked={showRememberMe}
                  onChange={(e) => setShowRememberMe(e.target.checked)}
                />
                <span>显示记住我</span>
              </label>
            </div>
          </div>
          
          <div className="demo-controls__section">
            <h3 className="demo-controls__section-title">特点介绍</h3>
            <ul className="demo-controls__features">
              <li>柔和的内凹输入框效果</li>
              <li>低饱和度米白色背景</li>
              <li>微凸按钮设计</li>
              <li>实体触感的视觉效果</li>
              <li>支持多种阴影强度</li>
            </ul>
          </div>
          
          <div className="demo-controls__section">
            <h3 className="demo-controls__section-title">代码示例</h3>
            <pre className="demo-controls__code">
{`<NeumorphismLoginPage
  onLogin={handleLogin}
  showCaptcha={${showCaptcha}}
  showRememberMe={${showRememberMe}}
  title="登录"
  shadowIntensity="medium"
  borderRadius="medium"
/>`}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* 预览区域 */}
      <div className="demo-preview">
        <div className="demo-preview__container">
          <NeumorphismLoginPage
            onLogin={handleLogin}
            onNavigateToRegister={handleNavigateToRegister}
            showCaptcha={showCaptcha}
            showRememberMe={showRememberMe}
            title="YggJS"
            subtitle="新拟态风格登录"
            usernameLabel="用户名"
            passwordLabel="密码"
            captchaLabel="验证码"
            submitLabel="登录"
            rememberMeLabel="记住我"
            registerLinkText="没有账号？立即注册"
            shadowIntensity="medium"
            borderRadius="medium"
          />
        </div>
      </div>
    </div>
  )
}

export default NeumorphismLoginDemo
