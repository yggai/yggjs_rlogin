import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Construction } from 'lucide-react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

const GlassLoginDemo: React.FC = () => {
  return (
    <div className="demo-page">
      <div className="demo-preview">
        <motion.div 
          className="demo-preview__container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="coming-soon">
            <Construction size={64} className="coming-soon__icon" />
            <h2 className="coming-soon__title">玻璃风格演示</h2>
            <p className="coming-soon__description">
              玻璃风格登录页面正在开发中，敬请期待！
            </p>
            <Link to="/" className="btn btn--primary">
              <ArrowLeft size={18} />
              <span>返回首页</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GlassLoginDemo
