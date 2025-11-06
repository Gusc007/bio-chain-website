# 禁用 Vercel 自动部署指南

## 方法 1: 在 Vercel 控制台锁定自动发布（推荐）

1. 访问 Vercel 控制台：https://vercel.com/dashboard
2. 找到你的项目（bespoke-maamoul-f80e4e）
3. 进入项目设置
4. 点击 "Project configuration" 按钮
5. 在设置中找到：
   - **Settings** > **Git** > 找到 "Lock to stop auto publishing" 选项
   - 或者 **Settings** > **Deployment** > 关闭 "Auto-publishing"
6. 启用锁定

## 方法 2: 删除 Vercel 项目

如果完全不需要 Vercel：

1. 访问 Vercel 控制台
2. 进入项目设置
3. Settings > General > Delete Project
4. 确认删除

## 方法 3: 断开 GitHub 连接

1. 在项目设置中
2. Settings > Git
3. 断开 GitHub 仓库连接
4. 这样就不会自动部署了

## 注意事项

- 已禁用 `vercel.json` 配置文件（重命名为 `vercel.json.disabled`）
- 代码仍通过 Git 管理
- 如果需要，可以随时重新启用

## 替代方案

如果只需要静态网站托管，建议使用：
- **GitHub Pages**（已配置，免费）
- 访问：https://github.com/Gusc007/bio-chain-website/settings/pages

