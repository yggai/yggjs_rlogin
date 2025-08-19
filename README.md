## yggjs_rlogin — React 登录页面组件库

一个专为 React 登录页面开发打造的轻量组件库。提供即插即用的登录表单组件，内置基础样式，支持 TypeScript。

- 作者：源滚滚
- 包管理器：pnpm
- 许可协议：PolyForm Noncommercial License 1.0.0（非商业免费，商业需授权）

### 功能特性
- 开箱即用的 LoginForm 组件
- 受控/非受控混合：内部管理输入状态，可通过回调获取提交数据
- 轻样式：默认样式可直接使用，也可覆盖定制
- TypeScript 类型定义
- ESM/CJS 双构建，友好支持 Vite、Next.js 等

### 安装
- 推荐使用公司镜像：
  pnpm install --registry=https://registry.npmmirror.com

- 安装依赖（项目使用 React 18+ 或 19）
  pnpm add yggjs_rlogin react react-dom

### 快速开始
1) 引入组件与样式

```tsx
import { LoginForm } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

export default function Page() {
  return (
    <LoginForm
      title="登录"
      onSubmit={async ({ username, password }) => {
        // 调用你的登录接口
        console.log(username, password)
      }}
    />
  )
}
```

2) 可选：自定义文案与类名

```tsx
<LoginForm
  title="系统登录"
  usernameLabel="账号"
  passwordLabel="密码"
  submitLabel="登录"
  className="my-login"
/>
```

### API
LoginForm props：
- onSubmit?: (payload: { username: string; password: string }) => void | Promise<void>
- title?: string — 标题（默认：登录）
- usernameLabel?: string — 账号标签（默认：账号）
- passwordLabel?: string — 密码标签（默认：密码）
- submitLabel?: string — 提交按钮文案（默认：登录）
- className?: string — 根元素附加类名
- style?: React.CSSProperties — 根元素行内样式

### 样式与主题
- 默认样式类前缀：yggjs-rlogin-
  - yggjs-rlogin-form
  - yggjs-rlogin-title
  - yggjs-rlogin-field
  - yggjs-rlogin-label
  - yggjs-rlogin-input
  - yggjs-rlogin-button
- 你可以在自己的项目里覆盖这些类名的样式，或不引入默认样式，完全自定义 UI。

### 开发与构建
本仓库使用 pnpm、TypeScript、tsup。

- 安装依赖：
  pnpm install --registry=https://registry.npmmirror.com

- 本地开发（监听构建）：
  pnpm run dev

- 构建产物（dist/）：
  pnpm run build

- 类型检查：
  pnpm run typecheck

- 代码风格/校验（可选，如已安装 eslint/prettier）：
  pnpm run lint

### 贡献与沟通
- 本项目为个人研究项目：不接受代码合并（Pull Request）
- 欢迎提交 Issue 反馈问题、建议与需求
- 商业使用请联系作者获得书面授权：1156956636@qq.com

### 许可
- 协议：PolyForm Noncommercial License 1.0.0（非商业免费，商业需授权）
- 详见仓库根目录 LICENSE 文件

### 路线图（Roadmap）
- [ ] 增加验证码/图形验证码插槽
- [ ] 密码可见/不可见切换
- [ ] 错误提示与提交中状态占位
- [ ] 国际化文案（i18n）
- [ ] 更多主题示例
