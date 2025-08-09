# 情感对话助手 (Emotion Chat Assistant)

一个基于 React 和 TypeScript 开发的智能情感对话助手应用，能够识别用户情绪并提供相应的情感支持和对话反馈。

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blue)
![Material-UI](https://img.shields.io/badge/MUI-5.14.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 功能特点

### 🎯 核心功能
- **情绪识别** - 自动分析用户输入文本的情绪状态
- **智能回复** - 根据识别的情绪提供相应的回复
- **实时对话** - 流畅的聊天界面和实时响应
- **情绪可视化** - 显示当前对话的情绪状态

### 🎨 界面特性
- 现代化的 Material Design 设计
- 响应式布局，支持多种设备
- 优雅的动画效果
- 深色/浅色主题切换（计划中）

### 🤖 情绪类型
- 😊 **开心** (Happy)
- 😢 **难过** (Sad)  
- 🎉 **兴奋** (Excited)
- 🤔 **思考** (Thoughtful)
- ❤️ **关怀** (Caring)
- 😐 **中性** (Neutral)

## 🚀 快速开始

### 前置要求
- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

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
npm start
# 或
yarn start
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

构建完成后，生产文件将在 `build` 目录中。

## 📁 项目结构

```
emotion-chat-assistant/
├── public/                 # 静态资源文件
│   ├── index.html         # HTML 模板
│   └── manifest.json      # PWA 配置
├── src/                   # 源代码
│   ├── components/        # React 组件
│   │   ├── ChatInterface.tsx    # 主聊天界面
│   │   ├── MessageList.tsx      # 消息列表
│   │   └── MessageInput.tsx     # 消息输入框
│   ├── context/          # React Context
│   │   └── ChatContext.tsx      # 聊天状态管理
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/            # 工具函数
│   │   └── emotionAnalysis.ts   # 情绪分析工具
│   ├── App.tsx           # 应用主组件
│   ├── index.tsx         # 应用入口
│   └── index.css         # 全局样式
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
└── README.md            # 项目说明
```

## 🔧 技术栈

- **前端框架**: React 18.2.0
- **编程语言**: TypeScript 5.1.6
- **UI 组件库**: Material-UI (MUI) 5.14.0
- **样式方案**: Emotion (CSS-in-JS)
- **状态管理**: React Context API + useReducer
- **构建工具**: Create React App 5.0.1

## 📊 功能实现

### 情绪分析算法
应用使用基于关键词匹配的情绪分析算法：
1. 扫描用户输入的文本
2. 匹配预定义的情绪关键词
3. 计算各情绪类型的得分
4. 返回最高得分的情绪类型

### 对话管理
- 使用 React Context 管理全局对话状态
- 支持消息历史记录
- 实时更新对话界面
- 模拟打字效果

## 🚧 开发计划

- [ ] 集成真实的 AI API (如 OpenAI)
- [ ] 添加语音输入/输出功能
- [ ] 实现用户账户系统
- [ ] 添加对话历史保存功能
- [ ] 支持多语言
- [ ] 添加深色模式
- [ ] 实现更精确的情绪分析算法
- [ ] 添加表情符号选择器
- [ ] 支持发送图片和文件

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 作者

- **irawill** - [GitHub](https://github.com/irawill)

## 🙏 致谢

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- 所有贡献者和支持者

## 📧 联系方式

如有问题或建议，欢迎提交 [Issue](https://github.com/irawill/emotion-chat-assistant/issues) 或联系作者。

---

⭐ 如果这个项目对你有帮助，请给一个星标支持！