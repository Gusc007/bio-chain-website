# 🚀 Bio-Chain 邮件发送快速配置

## 📧 立即配置真实邮件发送

### 方法一：手动编辑配置文件

1. **复制配置示例**
   ```bash
   cp email-config-example.env .env
   ```

2. **编辑 .env 文件**
   ```bash
   nano .env
   # 或者使用其他编辑器
   ```

3. **填入您的邮箱信息**
   ```env
   EMAIL_USER=your-real-email@gmail.com
   EMAIL_PASS=your-password-or-app-password
   PORT=3000
   ```

### 方法二：使用 Gmail（推荐）

#### 1. 启用 Gmail 两步验证
- 访问：https://myaccount.google.com/
- 点击"安全性" → "两步验证"
- 按照提示启用

#### 2. 生成应用密码
- 在"应用密码"中生成新密码
- 选择"邮件"和"其他（自定义名称）"
- 输入"Bio-Chain Website"
- 复制16位应用密码

#### 3. 配置 .env 文件
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=3000
```

### 方法三：使用其他邮箱服务

#### QQ邮箱
```env
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
PORT=3000
```

#### Outlook
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
PORT=3000
```

#### 企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

## 🧪 测试邮件发送

### 1. 启动服务器
```bash
node server.js
```

### 2. 测试发送
- **主网站**: http://localhost:3000
- **测试页面**: http://localhost:3000/test-email.html
- **API测试**: http://localhost:3000/api/health

### 3. 验证邮件
- 检查 `cindy.zhang@bio-chain.cn` 邮箱
- 检查客户邮箱是否收到确认邮件

## ⚠️ 重要提醒

1. **Gmail 用户**：必须使用应用密码，不能使用账户密码
2. **QQ邮箱用户**：需要开启 SMTP 服务并获取授权码
3. **企业邮箱**：可能需要特殊配置，请联系 IT 部门

## 🎯 快速开始

1. **选择邮箱服务**
2. **配置 .env 文件**
3. **启动服务器**
4. **测试发送**
5. **验证邮件**

---

**配置完成后，邮件将真正发送到 cindy.zhang@bio-chain.cn！** 📧✨

