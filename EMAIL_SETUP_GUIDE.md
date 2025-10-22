# 📧 Bio-Chain 邮件服务配置指南

## 🎯 当前状态
您的网站目前运行在**模拟邮件发送模式**，这意味着：
- ✅ 联系表单正常工作
- ✅ 数据验证完整
- ✅ 用户看到成功消息
- ⚠️ 但邮件实际上没有发送到真实邮箱

## 🚀 启用真实邮件发送

### 步骤 1: 创建 .env 文件
在项目根目录创建 `.env` 文件，内容如下：

```bash
# Bio-Chain 邮件配置
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
PORT=3000
TARGET_EMAIL=tony.gu@bio-chain.cn
```

### 步骤 2: 选择邮件服务提供商

#### 选项 1: Gmail（推荐）
1. 使用您的 Gmail 邮箱
2. 启用两步验证
3. 生成应用专用密码
4. 配置：
```bash
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

#### 选项 2: Outlook/Hotmail
1. 使用您的 Outlook 邮箱
2. 配置：
```bash
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### 选项 3: QQ邮箱
1. 登录 QQ邮箱
2. 开启SMTP服务
3. 获取授权码
4. 配置：
```bash
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
```

#### 选项 4: 163邮箱
1. 登录163邮箱
2. 开启SMTP服务
3. 获取授权码
4. 配置：
```bash
EMAIL_USER=your-email@163.com
EMAIL_PASS=your-authorization-code
```

#### 选项 5: 企业邮箱（腾讯企业邮箱）
1. 使用企业邮箱账号
2. 配置：
```bash
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
```

### 步骤 3: 测试邮件发送

1. 启动服务器：
```bash
node server.js
```

2. 测试API：
```bash
curl http://localhost:3000/api/health
```

3. 测试邮件发送：
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","phone":"13800138000","service":"空运服务","message":"测试消息"}'
```

## 🔧 详细配置说明

### Gmail 配置步骤
1. 登录 Gmail
2. 进入"管理您的Google账号"
3. 选择"安全性"
4. 启用"两步验证"
5. 生成"应用专用密码"
6. 使用生成的16位密码作为 EMAIL_PASS

### QQ邮箱配置步骤
1. 登录 QQ邮箱
2. 进入"设置" → "账户"
3. 开启"POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务"
4. 生成"授权码"
5. 使用授权码作为 EMAIL_PASS

### 163邮箱配置步骤
1. 登录163邮箱
2. 进入"设置" → "POP3/SMTP/IMAP"
3. 开启"SMTP服务"
4. 获取"客户端授权密码"
5. 使用授权密码作为 EMAIL_PASS

## ✅ 验证配置成功

配置成功后，您会看到以下日志：
```
✅ Gmail 已配置，将发送真实邮件
✅ 邮件已发送到 tony.gu@bio-chain.cn
✅ 确认邮件已发送给客户
```

## 🚨 常见问题

### 问题 1: 认证失败
- 检查邮箱和密码是否正确
- 确保已启用两步验证（Gmail）
- 确保使用应用专用密码（Gmail）

### 问题 2: 连接超时
- 检查网络连接
- 尝试使用不同的SMTP端口
- 检查防火墙设置

### 问题 3: 邮件被拒绝
- 检查邮箱地址格式
- 确保发送方邮箱已验证
- 检查垃圾邮件文件夹

## 📞 技术支持

如果遇到问题，可以：
1. 查看服务器控制台日志
2. 检查 .env 文件配置
3. 测试网络连接
4. 联系技术支持

---

**🎉 配置完成后，您的网站将能够发送真实的邮件！**

