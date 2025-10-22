# 🏢 Bio-Chain 企业邮箱配置指南

## 📧 企业邮箱配置步骤

### 1. 获取企业邮箱信息
请提供以下信息：
- **邮箱地址**: your-email@company.com
- **邮箱密码**: your-password
- **SMTP服务器**: 通常由IT部门提供
- **端口**: 通常是 587 或 465

### 2. 配置 .env 文件
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

### 3. 常见企业邮箱配置

#### 腾讯企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

#### 阿里云企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

#### 网易企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

#### 微软企业邮箱 (Office 365)
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

### 4. 高级配置（如果需要）

如果标准配置不工作，可能需要修改 `server.js` 中的邮件配置：

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.company.com',  // 企业SMTP服务器
    port: 587,                 // 端口
    secure: false,             // 是否使用SSL
    auth: {
        user: emailUser,
        pass: emailPass
    }
});
```

### 5. 测试配置

#### 启动服务器
```bash
node server.js
```

#### 测试发送
- **主网站**: http://localhost:3000
- **测试页面**: http://localhost:3000/test-email.html

### 6. 故障排除

#### 常见问题
1. **认证失败**: 检查邮箱地址和密码
2. **连接超时**: 检查网络连接和防火墙
3. **SSL错误**: 可能需要调整安全设置

#### 联系IT部门
如果遇到问题，请联系您的IT部门获取：
- SMTP服务器地址
- 端口号
- 安全设置
- 特殊认证要求

### 7. 安全提醒

- 确保邮箱密码安全
- 不要将密码提交到代码仓库
- 使用环境变量存储敏感信息

---

**配置完成后，邮件将发送到 cindy.zhang@bio-chain.cn！** 📧✨

