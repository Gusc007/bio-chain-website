# 📧 手动邮件设置指南

## 🎯 当前问题分析

所有邮箱都连接失败，主要原因是：
1. **QQ邮箱**: 需要授权码，不是登录密码
2. **163邮箱**: 需要开启SMTP服务
3. **企业邮箱**: 可能有安全限制

## 🔧 解决方案

### 方案1: 使用QQ邮箱（推荐）

#### 步骤1: 获取QQ邮箱授权码
1. 登录 https://mail.qq.com
2. 点击 **设置** → **账户**
3. 找到 **POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务**
4. 开启 **SMTP服务**
5. 点击 **生成授权码**
6. 按提示发送短信验证
7. 复制生成的16位授权码

#### 步骤2: 更新配置
```bash
# 编辑 .env 文件
EMAIL_USER=gusc00@qq.com
EMAIL_PASS=你的16位授权码
PORT=3000
```

### 方案2: 使用Gmail（最稳定）

#### 步骤1: 获取Gmail应用密码
1. 登录 https://myaccount.google.com/
2. 点击 **安全性** → **两步验证**
3. 启用两步验证
4. 在 **应用密码** 中生成新密码
5. 选择 **邮件** 和 **其他（自定义名称）**
6. 输入 "Bio-Chain Website"
7. 复制16位应用密码

#### 步骤2: 更新配置
```bash
# 编辑 .env 文件
EMAIL_USER=你的gmail@gmail.com
EMAIL_PASS=你的16位应用密码
PORT=3000
```

### 方案3: 使用Outlook（简单）

#### 步骤1: 使用Outlook邮箱
1. 注册或使用现有Outlook邮箱
2. 无需特殊设置

#### 步骤2: 更新配置
```bash
# 编辑 .env 文件
EMAIL_USER=你的邮箱@outlook.com
EMAIL_PASS=你的邮箱密码
PORT=3000
```

## 🚀 快速设置命令

### 使用QQ邮箱（需要授权码）
```bash
echo "# Bio-Chain 邮件配置
EMAIL_USER=gusc00@qq.com
EMAIL_PASS=你的16位授权码
PORT=3000" > .env
```

### 使用Gmail（需要应用密码）
```bash
echo "# Bio-Chain 邮件配置
EMAIL_USER=你的gmail@gmail.com
EMAIL_PASS=你的16位应用密码
PORT=3000" > .env
```

### 使用Outlook（直接使用密码）
```bash
echo "# Bio-Chain 邮件配置
EMAIL_USER=你的邮箱@outlook.com
EMAIL_PASS=你的邮箱密码
PORT=3000" > .env
```

## 🧪 测试配置

### 启动服务器
```bash
node server.js
```

### 测试邮件发送
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","email":"test@example.com","phone":"13800138000","service":"空运服务","message":"测试邮件发送"}'
```

### 访问网站测试
1. 打开 http://localhost:3000
2. 填写联系表单
3. 提交并查看结果

## 📋 当前状态

- ✅ **服务器代码**: 已配置支持多种邮箱
- ✅ **环境变量**: 已设置
- ❌ **SMTP连接**: 需要正确的授权码/密码
- ⚠️ **当前模式**: 模拟发送

## 🎯 推荐操作

1. **立即**: 选择QQ邮箱或Gmail
2. **获取授权码**: 按照上述步骤操作
3. **更新.env**: 使用正确的授权码
4. **测试**: 启动服务器并测试

---
**需要帮助？** 请告诉我您选择哪种邮箱，我可以提供更详细的设置步骤。




