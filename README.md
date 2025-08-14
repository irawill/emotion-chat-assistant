# 情感对话助手 (Emotion Chat Assistant)

基于 **Vite + React + TypeScript** 开发的智能情感对话助手应用，能够识别用户情绪并提供相应的情感支持和对话反馈。现已支持 OpenAI API 集成！

![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-5.14.20-007FFF?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

## ⚡ 为什么选择 Vite？

- **极速的冷启动** - 基于原生 ES 模块，启动速度极快
- **即时的热更新** - 基于 HMR 实现毫秒级更新
- **真正的按需编译** - 只编译正在使用的代码
- **优化的构建** - 基于 Rollup 的生产构建优化

## ✨ 功能特点

### 🎯 核心功能
- **情绪识别** - 自动分析用户输入文本的情绪状态
- **智能回复** - 根据识别的情绪提供相应的回复
- **实时对话** - 流畅的聊天界面和实时响应
- **情绪可视化** - 显示当前对话的情绪状态
- **🆕 OpenAI API 集成** - 支持接入自定义 API 端点，获得更智能的对话体验

### 🔑 API 功能
- **自定义 API Key 管理** - 用户可以设置自己的 OpenAI API Key
- **双模式切换** - 支持本地模式和 API 模式自由切换
- **对话历史保持** - API 模式下保持完整的对话上下文
- **安全存储** - API Key 安全地存储在浏览器本地存储中

### 🎨 界面特性
- 现代化的 Material Design 设计
- 响应式布局，支持多种设备
- 优雅的动画效果
- 流畅的用户体验
- API 状态实时显示

### 🤖 支持的情绪类型
- 😊 **开心** (Happy)
- 😢 **难过** (Sad)  
- 🎉 **兴奋** (Excited)
- 🤔 **思考** (Thoughtful)
- ❤️ **关怀** (Caring)
- 😐 **中性** (Neutral)

## 🚀 快速开始

### 前置要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/irawill/emotion-chat-assistant.git
cd emotion-chat-assistant
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

4. **访问应用**
浏览器将自动打开 [http://localhost:3000](http://localhost:3000)

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

构建完成后，生产文件将在 `dist` 目录中。

### 本地预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 🔌 API 配置使用

### 设置 API Key

1. 点击应用顶部的设置图标（⚙️）
2. 在弹出的对话框中输入你的 OpenAI API Key
3. 点击"保存"按钮
4. API Key 将被安全地保存在浏览器本地存储中

### 切换对话模式

- **本地模式**：使用内置的简单响应逻辑，无需 API Key
- **API 模式**：通过配置的 API 端点获得智能对话响应

设置 API Key 后，可以通过顶部的开关在两种模式之间切换。

### API 端点说明

应用默认使用以下 API 端点：
```
https://my-first-workers.jichengme.workers.dev/chat
```

请求格式：
```json
{
  "messages": [
    { "role": "user", "content": "你好，来一段流式输出" }
  ],
  "stream": false
}
```

## 📁 项目结构

```
emotion-chat-assistant/
├── public/                 # 静态资源文件
│   └── vite.svg           # Vite 图标
├── src/                   # 源代码
│   ├── components/        # React 组件
│   │   ├── ChatInterface.tsx    # 主聊天界面
│   │   ├── MessageList.tsx      # 消息列表
│   │   ├── MessageInput.tsx     # 消息输入框
│   │   └── ApiKeySettings.tsx   # API Key 设置组件
│   ├── context/          # React Context
│   │   └── ChatContext.tsx      # 聊天状态管理
│   ├── services/         # 服务层
│   │   └── api.ts              # API 请求服务
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/            # 工具函数
│   │   └── emotionAnalysis.ts   # 情绪分析工具
│   ├── App.tsx           # 应用主组件
│   ├── main.tsx          # 应用入口 (Vite)
│   ├── index.css         # 全局样式
│   └── vite-env.d.ts     # Vite 类型声明
├── index.html            # HTML 入口文件
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── tsconfig.node.json    # Node TypeScript 配置
├── vite.config.ts        # Vite 配置
├── .eslintrc.cjs         # ESLint 配置
└── README.md            # 项目说明
```

## 🔧 技术栈

- **构建工具**: Vite 5.0.8
- **前端框架**: React 18.2.0
- **编程语言**: TypeScript 5.2.2
- **UI 组件库**: Material-UI (MUI) 5.14.20
- **样式方案**: Emotion (CSS-in-JS)
- **状态管理**: React Context API + useReducer
- **代码规范**: ESLint + TypeScript ESLint
- **API 集成**: Fetch API + 自定义服务层

## 📊 Vite 配置说明

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],           // React 插件支持
  base: '/emotion-chat-assistant/', // GitHub Pages 部署路径
  server: {
    port: 3000,                // 开发服务器端口
    open: true                 // 自动打开浏览器
  },
  build: {
    outDir: 'dist',           // 构建输出目录
    sourcemap: true           // 生成 source map
  }
})
```

## 📈 性能优势

使用 Vite 相比传统构建工具的优势：

| 特性 | Vite | Create React App |
|-----|------|-----------------|
| 冷启动 | < 1秒 | 10-20秒 |
| 热更新 | 即时 | 2-5秒 |
| 构建速度 | 快 | 较慢 |
| 按需编译 | ✅ | ❌ |
| Tree Shaking | ✅ | ✅ |
| 代码分割 | ✅ | ✅ |

## 🚢 部署

### GitHub Pages 部署

1. **构建并部署**
```bash
npm run deploy
```

2. **配置 GitHub Pages**
- 访问仓库设置：Settings > Pages
- Source 选择：Deploy from a branch
- Branch 选择：gh-pages
- 文件夹选择：/ (root)

3. **访问应用**
- https://irawill.github.io/emotion-chat-assistant

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 运行 ESLint 检查
npm run lint

# 部署到 GitHub Pages
npm run deploy
```

## 🚧 开发计划

- [x] 集成 OpenAI API 支持
- [x] 添加 API Key 管理功能
- [x] 实现本地/API 模式切换
- [ ] 添加流式输出支持
- [ ] 添加语音输入/输出功能
- [ ] 实现用户账户系统
- [ ] 添加对话历史保存功能
- [ ] 支持多语言
- [ ] 添加深色模式
- [ ] PWA 支持
- [ ] 添加更多情绪类型
- [ ] 实现情绪趋势分析

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 组件使用函数式组件 + Hooks
- 提交前运行 `npm run lint`

## 📝 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 作者

- **irawill** - [GitHub](https://github.com/irawill)

## 🙏 致谢

- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Material-UI](https://mui.com/) - React UI 组件库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

## 📧 联系方式

如有问题或建议，欢迎提交 [Issue](https://github.com/irawill/emotion-chat-assistant/issues)

---

⭐ 如果这个项目对你有帮助，请给一个星标支持！

🚀 使用 Vite 构建，享受极速开发体验！