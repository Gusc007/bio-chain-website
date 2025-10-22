# Bio-Chain 网站部署配置

## Netlify 部署配置

### 1. 创建 netlify.toml 配置文件
```toml
[build]
  publish = "."
  command = "echo 'Static site build complete'"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 2. 创建 Netlify 函数目录结构
```
netlify/
└── functions/
    └── contact.js
```

### 3. 环境变量配置
在 Netlify 控制台中设置：
- EMAIL_USER = tony.gu@bio-chain.cn
- EMAIL_PASS = Pactlt3215422
- TARGET_EMAIL = tony.gu@bio-chain.cn

### 4. 部署步骤
1. 将代码推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 配置环境变量
4. 部署网站

## Vercel 部署配置

### 1. 创建 vercel.json 配置文件
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/contact.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/contact",
      "dest": "/api/contact"
    }
  ]
}
```

### 2. 创建 API 目录结构
```
api/
└── contact.js
```

### 3. 环境变量配置
在 Vercel 控制台中设置：
- EMAIL_USER = tony.gu@bio-chain.cn
- EMAIL_PASS = Pactlt3215422
- TARGET_EMAIL = tony.gu@bio-chain.cn

## 快速部署选项

### 选项 1: Netlify (推荐)
- 支持静态网站 + Functions
- 免费额度充足
- 配置简单

### 选项 2: Vercel
- 支持 API Routes
- 自动部署
- 性能优秀

### 选项 3: GitHub Pages + 外部邮件服务
- 纯静态网站
- 使用第三方邮件服务
- 成本最低

## 测试链接

部署完成后，您将获得以下测试链接：

### 本地测试
- http://localhost:3000

### 生产环境测试
- Netlify: https://your-site-name.netlify.app
- Vercel: https://your-site-name.vercel.app
- GitHub Pages: https://your-username.github.io/repo-name

## 邮件功能测试

1. 访问网站
2. 填写联系表单
3. 检查 tony.gu@bio-chain.cn 邮箱
4. 检查客户邮箱确认邮件
