# 📧 Bio-Chain SMTP 设置完整指南

## 🎯 当前状态
- ✅ **服务器运行正常** (端口 3000)
- ✅ **API 接口正常**
- ✅ **联系表单功能正常**
- ⚠️ **邮件发送模式**: 需要确认

## 📋 SMTP 配置步骤

### 1. 腾讯企业邮箱配置

#### 基本设置
```env
# .env 文件内容
EMAIL_USER=tony.gu@bio-chain.cn
EMAIL_PASS=Pactlt3215422
PORT=3000
```

#### SMTP 服务器信息
- **服务器**: smtp.exmail.qq.com
- **端口**: 587 (推荐) 或 465
- **加密**: STARTTLS (端口587) 或 SSL (端口465)
- **认证**: 需要邮箱地址和密码

### 2. 其他邮箱服务配置

#### Gmail 配置
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

**Gmail 设置步骤**:
1. 启用两步验证
2. 生成应用密码
3. 使用应用密码而不是账户密码

#### Outlook 配置
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

**Outlook SMTP 设置**:
- 服务器: smtp-mail.outlook.com
- 端口: 587
- 加密: STARTTLS

### 3. 验证配置

#### 检查 .env 文件
```bash
cat .env
```

#### 重启服务器
```bash
# 停止服务器
pkill -f "node server.js"

# 启动服务器
node server.js
```

#### 测试邮件发送
```bash
# 测试联系表单
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","email":"test@example.com","phone":"13800138000","service":"空运服务","message":"测试消息"}'
```

### 4. 故障排除

#### 常见问题及解决方案

**问题 1: 认证失败**
```
错误: Invalid login: 535 Error: authentication failed
```
**解决方案**:
- 检查邮箱地址和密码是否正确
- 确认邮箱账户状态正常
- 检查是否需要特殊授权码

**问题 2: 连接超时**
```
错误: Connection timeout
```
**解决方案**:
- 检查网络连接
- 尝试不同端口 (587 或 465)
- 检查防火墙设置

**问题 3: SSL/TLS 错误**
```
错误: SSL/TLS connection failed
```
**解决方案**:
- 尝试使用 STARTTLS (端口 587)
- 检查证书设置
- 添加 `tls: { rejectUnauthorized: false }`

#### 测试不同配置
```bash
# 测试端口 587
node test-email-config.js

# 测试端口 465
# 修改配置后重新测试
```

### 5. 生产环境部署

#### Netlify Functions
```javascript
// netlify/functions/send-email.js
exports.handler = async (event, context) => {
  // 邮件发送逻辑
};
```

#### Vercel API Routes
```javascript
// pages/api/contact.js
export default async function handler(req, res) {
  // 邮件发送逻辑
}
```

#### Heroku
```bash
# 设置环境变量
heroku config:set EMAIL_USER=your-email@domain.com
heroku config:set EMAIL_PASS=your-password
```

### 6. 安全建议

#### 环境变量安全
- ✅ 使用 .env 文件存储敏感信息
- ✅ 不要将 .env 文件提交到代码仓库
- ✅ 在生产环境使用环境变量

#### 密码安全
- ✅ 使用强密码
- ✅ 定期更换密码
- ✅ 使用应用密码 (Gmail)

### 7. 监控和日志

#### 查看服务器日志
```bash
# 查看实时日志
tail -f server.log

# 或者直接查看控制台输出
node server.js
```

#### 邮件发送状态
- ✅ 成功: 邮件已发送到 cindy.zhang@bio-chain.cn
- ❌ 失败: 检查日志中的错误信息
- ⚠️ 模拟: 邮件内容显示在控制台

## 🚀 快速开始

### 立即测试
1. **启动服务器**: `node server.js`
2. **访问网站**: http://localhost:3000
3. **填写联系表单**: 测试邮件发送
4. **检查结果**: 查看控制台输出或邮箱

### 生产部署
1. **配置环境变量**: 在生产环境设置 EMAIL_USER 和 EMAIL_PASS
2. **选择部署平台**: Netlify, Vercel, Heroku 等
3. **测试功能**: 确保邮件发送正常
4. **监控运行**: 定期检查邮件发送状态

---
**需要帮助？** 如果遇到问题，请检查服务器日志或联系技术支持。

