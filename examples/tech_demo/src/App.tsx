import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// 页面组件
import HomePage from './pages/HomePage'
import BasicLoginNoCaptchaDemo from './pages/BasicLoginNoCaptchaDemo'
import BasicLoginWithCaptchaDemo from './pages/BasicLoginWithCaptchaDemo'
import MinimalLoginNoCaptchaDemo from './pages/MinimalLoginNoCaptchaDemo'
import MinimalLoginWithCaptchaDemo from './pages/MinimalLoginWithCaptchaDemo'
import GlassLoginNoCaptchaDemo from './pages/GlassLoginNoCaptchaDemo'
import GlassLoginWithCaptchaDemo from './pages/GlassLoginWithCaptchaDemo'
import NeumorphismLoginNoCaptchaDemo from './pages/NeumorphismLoginNoCaptchaDemo'
import NeumorphismLoginWithCaptchaDemo from './pages/NeumorphismLoginWithCaptchaDemo'
import DarkNeonLoginNoCaptchaDemo from './pages/DarkNeonLoginNoCaptchaDemo'
import DarkNeonLoginWithCaptchaDemo from './pages/DarkNeonLoginWithCaptchaDemo'
// 注册 Demos
import BasicRegisterNoCaptchaDemo from './pages/BasicRegisterNoCaptchaDemo'
import BasicRegisterWithCaptchaDemo from './pages/BasicRegisterWithCaptchaDemo'
import MinimalRegisterNoCaptchaDemo from './pages/MinimalRegisterNoCaptchaDemo'
import MinimalRegisterWithCaptchaDemo from './pages/MinimalRegisterWithCaptchaDemo'
import GlassRegisterNoCaptchaDemo from './pages/GlassRegisterNoCaptchaDemo'
import GlassRegisterWithCaptchaDemo from './pages/GlassRegisterWithCaptchaDemo'
import NeumorphismRegisterNoCaptchaDemo from './pages/NeumorphismRegisterNoCaptchaDemo'
import NeumorphismRegisterWithCaptchaDemo from './pages/NeumorphismRegisterWithCaptchaDemo'
import DarkNeonRegisterNoCaptchaDemo from './pages/DarkNeonRegisterNoCaptchaDemo'
import DarkNeonRegisterWithCaptchaDemo from './pages/DarkNeonRegisterWithCaptchaDemo'
import ComparisonPage from './pages/ComparisonPage'
import DocumentationPage from './pages/DocumentationPage'

// 布局组件
import Layout from './components/Layout'

// 页面过渡动画配置
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 20,
    scale: 0.98
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/basic"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicLoginNoCaptchaDemo />
            </motion.div>
          }
        />
          <Route
            path="/basic/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BasicLoginWithCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/minimal"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MinimalLoginNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/minimal/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MinimalLoginWithCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/glass"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <GlassLoginNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/glass/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <GlassLoginWithCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/neumorphism"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NeumorphismLoginNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/neumorphism/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NeumorphismLoginWithCaptchaDemo />
              </motion.div>
            }
          />

          {/* 暗黑霓虹登录页面路由 */}
          <Route
            path="/darkneon"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DarkNeonLoginNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/darkneon/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DarkNeonLoginWithCaptchaDemo />
              </motion.div>
            }
          />

          {/* 注册页面路由 */}
          <Route
            path="/basic/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BasicRegisterNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/basic/register/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <BasicRegisterWithCaptchaDemo />
              </motion.div>
            }
          />

          <Route
            path="/minimal/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MinimalRegisterNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/minimal/register/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MinimalRegisterWithCaptchaDemo />
              </motion.div>
            }
          />

          <Route
            path="/glass/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <GlassRegisterNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/glass/register/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <GlassRegisterWithCaptchaDemo />
              </motion.div>
            }
          />

          <Route
            path="/neumorphism/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NeumorphismRegisterNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/neumorphism/register/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NeumorphismRegisterWithCaptchaDemo />
              </motion.div>
            }
          />

          {/* 暗黑霓虹注册页面路由 */}
          <Route
            path="/darkneon/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DarkNeonRegisterNoCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/darkneon/register/captcha"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DarkNeonRegisterWithCaptchaDemo />
              </motion.div>
            }
          />
          <Route
            path="/comparison"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ComparisonPage />
              </motion.div>
            } 
          />
          <Route 
            path="/docs" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DocumentationPage />
              </motion.div>
            } 
          />
        </Routes>
    </AnimatePresence>
  )
}

export default App
