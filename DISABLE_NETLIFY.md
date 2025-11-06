# 禁用 Netlify 部署指南

## 步骤 1: 在 Netlify 控制台断开连接

1. 登录 [Netlify 控制台](https://app.netlify.com)
2. 进入你的网站设置
3. 找到 "Site settings" > "Build & deploy" > "Continuous Deployment"
4. 点击 "Stop auto publishing" 或删除连接
5. （可选）如果需要完全删除网站，可以到 "General" > "Delete site"

## 步骤 2: 使用 GitHub Pages 替代（推荐）

### 方法 1: 直接在 GitHub 仓库设置中启用 Pages

1. 访问你的 GitHub 仓库：https://github.com/Gusc007/bio-chain-website
2. 进入 Settings > Pages
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支
5. 选择 "/ (root)" 文件夹
6. 点击 "Save"
7. 你的网站将在几分钟后部署到：https://gusc007.github.io/bio-chain-website

### 方法 2: 使用 GitHub Actions 自动部署

如果需要更高级的部署控制，可以使用 GitHub Actions。

## 步骤 3: 本地测试

网站文件已经在 Git 仓库中，你可以：

1. **本地预览**：使用简单的 HTTP 服务器
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # 或 Node.js
   npx http-server -p 8000
   ```

2. **访问**：http://localhost:8000

## 注意事项

- Netlify 配置文件（netlify.toml）已保留但不再使用
- Netlify Functions 已不再需要（如果使用 GitHub Pages）
- 所有代码仍通过 Git 管理，推送到 GitHub

