import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// 页面组件
import HomePage from './pages/HomePage'
// Basic
import BasicLoginNoCaptchaDemo from './pages/basic/LoginNoCaptchaDemo'
import BasicLoginWithCaptchaDemo from './pages/basic/LoginWithCaptchaDemo'
import BasicRegisterNoCaptchaDemo from './pages/basic/RegisterNoCaptchaDemo'
import BasicRegisterWithCaptchaDemo from './pages/basic/RegisterWithCaptchaDemo'
// Minimal
import MinimalLoginNoCaptchaDemo from './pages/minimal/LoginNoCaptchaDemo'
import MinimalLoginWithCaptchaDemo from './pages/minimal/LoginWithCaptchaDemo'
import MinimalRegisterNoCaptchaDemo from './pages/minimal/RegisterNoCaptchaDemo'
import MinimalRegisterWithCaptchaDemo from './pages/minimal/RegisterWithCaptchaDemo'
// Glass
import GlassLoginNoCaptchaDemo from './pages/glass/LoginNoCaptchaDemo'
import GlassLoginWithCaptchaDemo from './pages/glass/LoginWithCaptchaDemo'
import GlassRegisterNoCaptchaDemo from './pages/glass/RegisterNoCaptchaDemo'
import GlassRegisterWithCaptchaDemo from './pages/glass/RegisterWithCaptchaDemo'
// Neumorphism
import NeumorphismLoginNoCaptchaDemo from './pages/neumorphism/LoginNoCaptchaDemo'
import NeumorphismLoginWithCaptchaDemo from './pages/neumorphism/LoginWithCaptchaDemo'
import NeumorphismRegisterNoCaptchaDemo from './pages/neumorphism/RegisterNoCaptchaDemo'
import NeumorphismRegisterWithCaptchaDemo from './pages/neumorphism/RegisterWithCaptchaDemo'
// DarkNeon
import DarkNeonLoginNoCaptchaDemo from './pages/darkneon/LoginNoCaptchaDemo'
import DarkNeonLoginWithCaptchaDemo from './pages/darkneon/LoginWithCaptchaDemo'
import DarkNeonRegisterNoCaptchaDemo from './pages/darkneon/RegisterNoCaptchaDemo'
import DarkNeonRegisterWithCaptchaDemo from './pages/darkneon/RegisterWithCaptchaDemo'
// Gradient Clash
import GradientClashLoginNoCaptchaDemo from './pages/gradient/LoginNoCaptchaDemo'
import GradientClashLoginWithCaptchaDemo from './pages/gradient/LoginWithCaptchaDemo'
import GradientClashRegisterNoCaptchaDemo from './pages/gradient/RegisterNoCaptchaDemo'
import GradientClashRegisterWithCaptchaDemo from './pages/gradient/RegisterWithCaptchaDemo'
// Illustration
import IllustrationLoginNoCaptchaDemo from './pages/illustration/LoginNoCaptchaDemo'
import IllustrationLoginWithCaptchaDemo from './pages/illustration/LoginWithCaptchaDemo'
import IllustrationRegisterNoCaptchaDemo from './pages/illustration/RegisterNoCaptchaDemo'
import IllustrationRegisterWithCaptchaDemo from './pages/illustration/RegisterWithCaptchaDemo'
// SplitBrand
import SplitBrandLoginNoCaptchaDemo from './pages/splitbrand/LoginNoCaptchaDemo'
import SplitBrandLoginWithCaptchaDemo from './pages/splitbrand/LoginWithCaptchaDemo'
import SplitBrandRegisterNoCaptchaDemo from './pages/splitbrand/RegisterNoCaptchaDemo'
import SplitBrandRegisterWithCaptchaDemo from './pages/splitbrand/RegisterWithCaptchaDemo'
// Frosted Modal
import FrostedLoginNoCaptchaDemo from './pages/frostedmodal/LoginNoCaptchaDemo'
import FrostedLoginWithCaptchaDemo from './pages/frostedmodal/LoginWithCaptchaDemo'
import FrostedRegisterNoCaptchaDemo from './pages/frostedmodal/RegisterNoCaptchaDemo'
import FrostedRegisterWithCaptchaDemo from './pages/frostedmodal/RegisterWithCaptchaDemo'

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

          {/* 插画故事登录页面路由 */}
          <Route path="/illustration" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><IllustrationLoginNoCaptchaDemo /></motion.div>} />
          <Route path="/illustration/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><IllustrationLoginWithCaptchaDemo /></motion.div>} />

          {/* 分屏品牌登录页面路由 */}
          <Route path="/splitbrand" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SplitBrandLoginNoCaptchaDemo /></motion.div>} />
          <Route path="/splitbrand/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SplitBrandLoginWithCaptchaDemo /></motion.div>} />

          {/* 毛玻璃弹窗登录页面路由 */}
          <Route path="/frosted" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><FrostedLoginNoCaptchaDemo /></motion.div>} />
          <Route path="/frosted/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><FrostedLoginWithCaptchaDemo /></motion.div>} />

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

          {/* 插画故事注册页面路由 */}
          <Route path="/illustration/register" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><IllustrationRegisterNoCaptchaDemo /></motion.div>} />
          <Route path="/illustration/register/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><IllustrationRegisterWithCaptchaDemo /></motion.div>} />

          {/* 分屏品牌注册页面路由 */}
          <Route path="/splitbrand/register" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SplitBrandRegisterNoCaptchaDemo /></motion.div>} />
          <Route path="/splitbrand/register/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SplitBrandRegisterWithCaptchaDemo /></motion.div>} />

          {/* 毛玻璃弹窗注册页面路由 */}
          <Route path="/frosted/register" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><FrostedRegisterNoCaptchaDemo /></motion.div>} />
          <Route path="/frosted/register/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><FrostedRegisterWithCaptchaDemo /></motion.div>} />

          {/* 渐变撞色登录页面路由 */}
          <Route path="/gradient" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><GradientClashLoginNoCaptchaDemo /></motion.div>} />
          <Route path="/gradient/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><GradientClashLoginWithCaptchaDemo /></motion.div>} />
          {/* 渐变撞色注册页面路由 */}
          <Route path="/gradient/register" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><GradientClashRegisterNoCaptchaDemo /></motion.div>} />
          <Route path="/gradient/register/captcha" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><GradientClashRegisterWithCaptchaDemo /></motion.div>} />

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
