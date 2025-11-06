# GitHub Pages 部署指南

## 快速设置（推荐方法）

### 方法 1: 直接在 GitHub 设置中启用 Pages（最简单）

1. 访问：https://github.com/Gusc007/bio-chain-website/settings/pages
2. 在 "Source" 部分：
   - 选择 "Deploy from a branch"
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
3. 点击 "Save"
4. 等待几分钟，你的网站将在以下地址可用：
   - https://gusc007.github.io/bio-chain-website

### 方法 2: 使用 GitHub Actions（已配置）

如果使用方法 1 不工作，可以使用 GitHub Actions：

1. 确保 `.github/workflows/pages.yml` 文件已存在（已创建）
2. 在 GitHub 仓库设置中：
   - Settings > Pages
   - Source: 选择 "GitHub Actions"
3. 每次推送到 main 分支时，会自动部署

## 自定义域名（可选）

如果你有自己的域名（如 bio-chain.cn）：

1. 在仓库根目录创建 `CNAME` 文件（如果还没有）
2. 内容：`bio-chain.cn`
3. 在你的域名 DNS 设置中添加：
   - Type: CNAME
   - Name: @ 或 www
   - Value: gusc007.github.io

## 注意事项

- GitHub Pages 是免费的
- 支持静态网站（HTML/CSS/JavaScript）
- 不支持服务器端功能（如 Netlify Functions）
- 如果需要后端功能，考虑使用其他服务或使用 GitHub Actions

## 禁用 Netlify

1. 登录 Netlify：https://app.netlify.com
2. 找到你的网站
3. Site settings > General > Delete site（或停止自动发布）

## 本地测试

```bash
# 使用 Python
python3 -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

然后访问：http://localhost:8000

