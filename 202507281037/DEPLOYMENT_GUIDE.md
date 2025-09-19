# 网站发布指南

## 概述
本指南将帮助你将HTML网站发布到自定义域名的网站上。

## 方法一：GitHub Pages（推荐）

### 1. 创建GitHub仓库
1. 访问 [GitHub.com](https://github.com) 并登录
2. 点击右上角的 "+" 号，选择 "New repository"
3. 输入仓库名称（例如：`bio-chain-website`）
4. 选择 "Public"（GitHub Pages免费版需要公开仓库）
5. 点击 "Create repository"

### 2. 推送代码到GitHub
```bash
# 添加远程仓库（替换YOUR_USERNAME和REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分，选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

### 4. 配置自定义域名
1. 在GitHub Pages设置页面，找到 "Custom domain" 部分
2. 输入你的域名（例如：`www.yourdomain.com`）
3. 点击 "Save"
4. 勾选 "Enforce HTTPS"（推荐）

### 5. 域名DNS配置
在你的域名注册商处配置DNS记录：

**A记录：**
```
类型: A
名称: @
值: 185.199.108.153
值: 185.199.109.153
值: 185.199.110.153
值: 185.199.111.153
```

**CNAME记录：**
```
类型: CNAME
名称: www
值: YOUR_USERNAME.github.io
```

## 方法二：Netlify

### 1. 注册Netlify账户
1. 访问 [Netlify.com](https://netlify.com)
2. 使用GitHub账户登录

### 2. 部署网站
1. 点击 "New site from Git"
2. 选择 "GitHub"
3. 选择你的仓库
4. 配置部署设置：
   - Build command: 留空（静态网站）
   - Publish directory: `/`（根目录）
5. 点击 "Deploy site"

### 3. 配置自定义域名
1. 在站点设置中找到 "Domain management"
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示配置DNS记录

## 方法三：Vercel

### 1. 注册Vercel账户
1. 访问 [Vercel.com](https://vercel.com)
2. 使用GitHub账户登录

### 2. 导入项目
1. 点击 "New Project"
2. 选择你的GitHub仓库
3. 配置项目设置（通常可以保持默认）
4. 点击 "Deploy"

### 3. 配置自定义域名
1. 在项目设置中找到 "Domains"
2. 添加你的自定义域名
3. 配置DNS记录

## DNS配置详解

### 常见域名注册商DNS配置

**阿里云：**
1. 登录阿里云控制台
2. 进入域名管理
3. 点击域名右侧的"解析"
4. 添加记录

**腾讯云：**
1. 登录腾讯云控制台
2. 进入域名管理
3. 点击"解析"
4. 添加记录

**GoDaddy：**
1. 登录GoDaddy账户
2. 进入域名管理
3. 点击"DNS"
4. 添加记录

## 验证部署

### 1. 检查网站是否正常访问
- 访问你的自定义域名
- 检查所有页面是否正常加载
- 测试所有功能是否正常

### 2. 检查HTTPS
- 确保网站支持HTTPS
- 检查SSL证书是否有效

### 3. 性能测试
- 使用Google PageSpeed Insights测试性能
- 检查移动端适配

## 常见问题解决

### 1. 域名解析不生效
- 等待DNS传播（通常需要几分钟到48小时）
- 检查DNS记录是否正确
- 使用在线DNS检查工具验证

### 2. HTTPS证书问题
- 确保在托管平台启用了HTTPS
- 检查是否有混合内容警告

### 3. 网站无法访问
- 检查托管平台的状态页面
- 验证代码是否正确部署
- 检查域名是否过期

## 维护和更新

### 1. 更新网站内容
```bash
# 修改文件后
git add .
git commit -m "Update website content"
git push origin main
```

### 2. 监控网站状态
- 定期检查网站可用性
- 监控性能指标
- 备份重要数据

## 推荐工具

### 1. 域名检查工具
- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://www.whatsmydns.net)

### 2. 性能测试工具
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)

### 3. 网站监控
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)

## 安全建议

1. **启用HTTPS**：确保网站使用SSL证书
2. **定期更新**：保持代码和依赖项更新
3. **备份数据**：定期备份网站文件
4. **监控访问**：关注异常访问模式
5. **使用强密码**：保护托管平台账户

---

**注意：** 本指南基于当前最佳实践编写，具体步骤可能因平台更新而略有不同。建议参考各平台的官方文档获取最新信息。 