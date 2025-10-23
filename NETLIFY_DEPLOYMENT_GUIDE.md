# 🚀 Bio-Chain 网站 Netlify 部署指南

## 📋 部署准备

### ✅ 已完成的工作
- ✅ 代码已推送到 GitHub: https://github.com/Gusc007/bio-chain-website.git
- ✅ Netlify 函数已配置: `netlify/functions/contact.js`
- ✅ 配置文件已准备: `netlify.toml`
- ✅ 环境变量已设置: EMAIL_USER, EMAIL_PASS, TARGET_EMAIL

## 🌐 Netlify 部署步骤

### 1. 访问 Netlify
- 打开 https://netlify.com
- 使用 GitHub 账户登录

### 2. 创建新站点
1. 点击 **"New site from Git"**
2. 选择 **"GitHub"**
3. 选择仓库: **Gusc007/bio-chain-website**
4. 点击 **"Deploy site"**

### 3. 配置环境变量
在站点部署后，需要配置环境变量：

1. 进入站点设置: **Site settings**
2. 找到 **"Environment variables"**
3. 添加以下变量：

```
EMAIL_USER = tony.gu@bio-chain.cn
EMAIL_PASS = Pactlt3215422
TARGET_EMAIL = tony.gu@bio-chain.cn
```

### 4. 重新部署
配置环境变量后，点击 **"Trigger deploy"** → **"Deploy site"**

## 🔗 部署后的链接

### 默认链接
- **Netlify 默认域名**: `https://your-site-name.netlify.app`

### 自定义域名配置
1. 在 **"Domain management"** 中添加自定义域名
2. 配置 DNS 记录指向 Netlify
3. 启用 HTTPS

## 📧 邮件功能测试

### 测试步骤
1. 访问部署的网站
2. 填写联系表单
3. 检查 `tony.gu@bio-chain.cn` 邮箱
4. 检查客户邮箱确认邮件

### 邮件发送流程
- **客户提交表单** → Netlify Function
- **发送主邮件** → `tony.gu@bio-chain.cn`
- **发送确认邮件** → 客户邮箱
- **返回成功响应** → 显示成功消息

## 🔧 故障排除

### 常见问题
1. **邮件发送失败**
   - 检查环境变量是否正确配置
   - 查看 Netlify 函数日志
   - 验证腾讯企业邮箱配置

2. **函数部署失败**
   - 检查 `netlify/functions/contact.js` 文件
   - 查看构建日志
   - 确认 Node.js 版本

3. **环境变量问题**
   - 确保变量名称正确
   - 检查变量值是否包含特殊字符
   - 重新部署站点

## 📊 监控和维护

### 日志查看
- **Netlify 控制台** → **Functions** → **View logs**
- **实时监控** → **Functions** → **Real-time logs**

### 性能监控
- **Analytics** → 查看访问统计
- **Functions** → 查看执行次数和错误率

## 🎯 部署完成后的操作

1. **测试邮件功能**
2. **配置自定义域名**（可选）
3. **设置监控和告警**
4. **定期检查邮件发送状态**

## 📞 技术支持

如果遇到问题：
1. 查看 Netlify 官方文档
2. 检查 GitHub Issues
3. 联系技术支持

---

**🎉 部署完成后，您的 Bio-Chain 网站将支持完整的邮件发送功能！**

**联系信息**：
- 办公地址：上海市浦东新区航城七路785号A-412
- 联系电话：+86 21 5049 8599, +86 186 1652 9508
- 电子邮箱：tony.gu@bio-chain.cn
