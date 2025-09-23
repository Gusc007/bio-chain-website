# Bio-Chain 邮件发送配置指南

## 📧 配置真实邮件发送

要启用真正的邮件发送功能，需要配置邮件服务。以下是详细步骤：

### 方法一：使用 Gmail（推荐）

#### 1. 启用 Gmail 两步验证
1. 登录您的 Gmail 账户
2. 进入 [Google 账户设置](https://myaccount.google.com/)
3. 点击"安全性"
4. 启用"两步验证"

#### 2. 生成应用密码
1. 在 Google 账户设置中，找到"应用密码"
2. 选择"邮件"和"其他（自定义名称）"
3. 输入"Bio-Chain Website"
4. 点击"生成"
5. 复制生成的16位密码（例如：abcd efgh ijkl mnop）

#### 3. 配置环境变量
创建 `.env` 文件：
```bash
# 复制配置文件
cp env.example .env
```

编辑 `.env` 文件：
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=3000
```

### 方法二：使用其他邮件服务

#### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### QQ邮箱
```env
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
```

#### 企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
```

### 测试邮件发送

#### 1. 启动服务器
```bash
node server.js
```

#### 2. 测试API
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "phone": "1234567890",
    "service": "air",
    "message": "这是一条测试消息"
  }'
```

#### 3. 检查邮件
- 检查 `cindy.zhang@bio-chain.cn` 邮箱
- 检查客户邮箱是否收到确认邮件

### 部署到生产环境

#### 使用 Heroku
1. 安装 Heroku CLI
2. 创建应用：`heroku create bio-chain-website`
3. 设置环境变量：
   ```bash
   heroku config:set EMAIL_USER=your-gmail@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   ```
4. 部署：`git push heroku main`

#### 使用 Vercel
1. 连接 GitHub 仓库
2. 在 Vercel 设置中添加环境变量
3. 自动部署

#### 使用自己的服务器
1. 安装 Node.js 和 PM2
2. 配置环境变量
3. 使用 PM2 启动：`pm2 start server.js`

### 常见问题

#### 1. Gmail 发送失败
- 确保启用了两步验证
- 使用应用密码而不是账户密码
- 检查 Gmail 的发送限制

#### 2. 邮件被标记为垃圾邮件
- 配置 SPF 记录
- 使用专业的邮件服务（如 SendGrid）

#### 3. 发送限制
- Gmail 每日限制：500封
- 建议使用专业邮件服务

### 专业邮件服务推荐

#### SendGrid
- 免费额度：100封/天
- 专业功能：模板、统计、API
- 配置简单

#### Mailgun
- 免费额度：5,000封/月
- 强大的 API
- 详细的日志

#### Amazon SES
- 按使用量付费
- 高可靠性
- 适合大规模使用

## 🚀 快速开始

1. **配置 Gmail**（最简单）
   ```bash
   # 1. 启用两步验证
   # 2. 生成应用密码
   # 3. 创建 .env 文件
   echo "EMAIL_USER=your-gmail@gmail.com" > .env
   echo "EMAIL_PASS=your-app-password" >> .env
   echo "PORT=3000" >> .env
   
   # 4. 启动服务器
   node server.js
   ```

2. **测试发送**
   - 访问：http://localhost:3000
   - 填写联系表单
   - 检查邮箱

## ✅ 验证清单

- [ ] 邮件服务配置完成
- [ ] 环境变量设置正确
- [ ] 服务器启动成功
- [ ] 联系表单可以提交
- [ ] 邮件发送到 cindy.zhang@bio-chain.cn
- [ ] 客户收到确认邮件
- [ ] 邮件内容格式正确
