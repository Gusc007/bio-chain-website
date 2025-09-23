# 🚀 Bio-Chain 邮件发送快速配置

## ✅ 当前状态
- **服务器**: 运行正常 (http://localhost:3000)
- **API**: 正常工作
- **邮件发送**: 模拟模式（需要配置真实邮件服务）

## 📧 启用真实邮件发送

### 方法一：使用 Gmail（推荐）

#### 1. 启用 Gmail 两步验证
1. 登录 Gmail 账户
2. 访问 [Google 账户设置](https://myaccount.google.com/)
3. 点击"安全性" → "两步验证"
4. 按照提示启用

#### 2. 生成应用密码
1. 在 Google 账户设置中，找到"应用密码"
2. 选择"邮件"和"其他（自定义名称）"
3. 输入"Bio-Chain Website"
4. 点击"生成"
5. 复制16位密码（例如：`abcd efgh ijkl mnop`）

#### 3. 配置邮件服务
编辑 `.env` 文件：
```bash
# 编辑 .env 文件
EMAIL_USER=your-real-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=3000
```

### 方法二：使用其他邮件服务

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

## 🧪 测试邮件发送

### 1. 测试链接
- **主网站**: http://localhost:3000
- **测试页面**: http://localhost:3000/test-email.html
- **API测试**: http://localhost:3000/api/health

### 2. 测试步骤
1. 配置 `.env` 文件
2. 重启服务器：`node server.js`
3. 访问测试页面
4. 填写表单并提交
5. 检查 `cindy.zhang@bio-chain.cn` 邮箱

### 3. API 测试
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "phone": "1234567890",
    "service": "air",
    "message": "测试邮件发送"
  }'
```

## 🔧 故障排除

### 1. 邮件发送失败
- 检查 Gmail 两步验证是否启用
- 确认使用的是应用密码，不是账户密码
- 检查网络连接

### 2. 端口占用
```bash
# 杀死占用端口的进程
lsof -ti:3000 | xargs kill -9
```

### 3. 配置错误
- 确保 `.env` 文件格式正确
- 重启服务器使配置生效

## 📊 邮件发送流程

### 真实邮件发送
1. 客户填写联系表单
2. 系统发送邮件到 `cindy.zhang@bio-chain.cn`
3. 系统发送确认邮件给客户
4. 双方都收到邮件

### 模拟发送
1. 客户填写联系表单
2. 系统在控制台显示邮件内容
3. 客户看到成功提示
4. 实际邮件未发送

## 🎯 下一步

1. **配置真实邮件服务**
2. **测试邮件发送功能**
3. **部署到生产环境**
4. **监控邮件发送状态**

## 📞 技术支持

如果遇到问题：
1. 检查服务器日志
2. 验证邮件配置
3. 测试网络连接
4. 查看错误信息

---

**注意**: 当前为模拟发送模式，需要配置真实邮件服务才能发送到 `cindy.zhang@bio-chain.cn`
