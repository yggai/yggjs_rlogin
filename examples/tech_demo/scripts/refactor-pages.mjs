import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd(), 'src', 'pages')

/** Ensure directory exists */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const moves = [
  // basic
  ['BasicLoginNoCaptchaDemo.tsx', 'basic/LoginNoCaptchaDemo.tsx'],
  ['BasicLoginWithCaptchaDemo.tsx', 'basic/LoginWithCaptchaDemo.tsx'],
  ['BasicRegisterNoCaptchaDemo.tsx', 'basic/RegisterNoCaptchaDemo.tsx'],
  ['BasicRegisterWithCaptchaDemo.tsx', 'basic/RegisterWithCaptchaDemo.tsx'],
  ['BasicLoginDemo.tsx', 'basic/LoginDemo.tsx'],
  // minimal
  ['MinimalLoginNoCaptchaDemo.tsx', 'minimal/LoginNoCaptchaDemo.tsx'],
  ['MinimalLoginWithCaptchaDemo.tsx', 'minimal/LoginWithCaptchaDemo.tsx'],
  ['MinimalRegisterNoCaptchaDemo.tsx', 'minimal/RegisterNoCaptchaDemo.tsx'],
  ['MinimalRegisterWithCaptchaDemo.tsx', 'minimal/RegisterWithCaptchaDemo.tsx'],
  ['MinimalLoginDemo.tsx', 'minimal/LoginDemo.tsx'],
  // glass
  ['GlassLoginNoCaptchaDemo.tsx', 'glass/LoginNoCaptchaDemo.tsx'],
  ['GlassLoginWithCaptchaDemo.tsx', 'glass/LoginWithCaptchaDemo.tsx'],
  ['GlassRegisterNoCaptchaDemo.tsx', 'glass/RegisterNoCaptchaDemo.tsx'],
  ['GlassRegisterWithCaptchaDemo.tsx', 'glass/RegisterWithCaptchaDemo.tsx'],
  ['GlassLoginDemo.tsx', 'glass/LoginDemo.tsx'],
  // neumorphism
  ['NeumorphismLoginNoCaptchaDemo.tsx', 'neumorphism/LoginNoCaptchaDemo.tsx'],
  ['NeumorphismLoginWithCaptchaDemo.tsx', 'neumorphism/LoginWithCaptchaDemo.tsx'],
  ['NeumorphismRegisterNoCaptchaDemo.tsx', 'neumorphism/RegisterNoCaptchaDemo.tsx'],
  ['NeumorphismRegisterWithCaptchaDemo.tsx', 'neumorphism/RegisterWithCaptchaDemo.tsx'],
  ['NeumorphismLoginDemo.tsx', 'neumorphism/LoginDemo.tsx'],
  // darkneon
  ['DarkNeonLoginNoCaptchaDemo.tsx', 'darkneon/LoginNoCaptchaDemo.tsx'],
  ['DarkNeonLoginWithCaptchaDemo.tsx', 'darkneon/LoginWithCaptchaDemo.tsx'],
  ['DarkNeonRegisterNoCaptchaDemo.tsx', 'darkneon/RegisterNoCaptchaDemo.tsx'],
  ['DarkNeonRegisterWithCaptchaDemo.tsx', 'darkneon/RegisterWithCaptchaDemo.tsx'],
  // gradient (clash)
  ['GradientClashLoginNoCaptchaDemo.tsx', 'gradient/LoginNoCaptchaDemo.tsx'],
  ['GradientClashLoginWithCaptchaDemo.tsx', 'gradient/LoginWithCaptchaDemo.tsx'],
  ['GradientClashRegisterNoCaptchaDemo.tsx', 'gradient/RegisterNoCaptchaDemo.tsx'],
  ['GradientClashRegisterWithCaptchaDemo.tsx', 'gradient/RegisterWithCaptchaDemo.tsx'],
  // illustration
  ['IllustrationLoginNoCaptchaDemo.tsx', 'illustration/LoginNoCaptchaDemo.tsx'],
  ['IllustrationLoginWithCaptchaDemo.tsx', 'illustration/LoginWithCaptchaDemo.tsx'],
  ['IllustrationRegisterNoCaptchaDemo.tsx', 'illustration/RegisterNoCaptchaDemo.tsx'],
  ['IllustrationRegisterWithCaptchaDemo.tsx', 'illustration/RegisterWithCaptchaDemo.tsx'],
]

for (const [from, to] of moves) {
  const fromPath = path.join(root, from)
  const toPath = path.join(root, to)
  const toDir = path.dirname(toPath)
  ensureDir(toDir)
  if (!fs.existsSync(fromPath)) {
    console.log(`[skip] not found: ${from}`)
    continue
  }
  fs.renameSync(fromPath, toPath)
  console.log(`[moved] ${from} -> ${to}`)
}

console.log('Done.')

