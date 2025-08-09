# 部署指南

## 🌐 在线预览地址
部署完成后，您可以通过以下地址访问：
https://irawill.github.io/emotion-chat-assistant

## 📋 部署前准备

1. **启用 GitHub Pages**
   - 访问仓库设置：https://github.com/irawill/emotion-chat-assistant/settings/pages
   - 在 "Source" 部分选择 "Deploy from a branch"
   - 选择 "gh-pages" 分支（如果没有，先执行下面的部署步骤）
   - 选择 "/ (root)" 文件夹
   - 点击 "Save"

## 🚀 部署步骤

### 方法一：通过 GitHub Actions 自动部署（推荐）

1. 项目已配置 GitHub Actions，每次推送到 main 分支会自动部署
2. 查看部署状态：https://github.com/irawill/emotion-chat-assistant/actions

### 方法二：本地手动部署

1. **克隆仓库并安装依赖**
```bash
git clone https://github.com/irawill/emotion-chat-assistant.git
cd emotion-chat-assistant
npm install
```

2. **构建并部署到 GitHub Pages**
```bash
npm run deploy
```

这个命令会：
- 构建生产版本
- 创建 gh-pages 分支
- 推送构建文件到 gh-pages 分支
- GitHub Pages 会自动从 gh-pages 分支提供服务

## 🔧 故障排除

### 如果部署后页面显示404

1. 确保 GitHub Pages 已启用
2. 检查 Settings > Pages 中的设置
3. 等待几分钟让 GitHub Pages 生效（首次部署可能需要10分钟）

### 如果样式或路由有问题

1. 确保 package.json 中的 homepage 字段正确
2. 清除浏览器缓存
3. 使用无痕模式访问

## 📝 更新部署

每次更新代码后：
- 如果使用 GitHub Actions：推送到 main 分支即可自动部署
- 如果手动部署：运行 `npm run deploy`

## 🔗 相关链接

- 在线预览：https://irawill.github.io/emotion-chat-assistant
- 仓库主页：https://github.com/irawill/emotion-chat-assistant
- Actions 状态：https://github.com/irawill/emotion-chat-assistant/actions
- Pages 设置：https://github.com/irawill/emotion-chat-assistant/settings/pages