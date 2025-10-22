# 📧 Bio-Chain 真实邮件发送配置

## ⚠️ 当前状态
- **邮件发送**: 模拟模式（显示成功，但未发送真实邮件）
- **目标邮箱**: cindy.zhang@bio-chain.cn
- **需要配置**: 真实邮件服务

## 🚀 快速配置（推荐使用 Gmail）

### 方法一：使用配置脚本
```bash
# 运行 Gmail 配置脚本
./setup-gmail.sh
```

### 方法二：使用交互式配置
```bash
# 运行交互式配置向导
node configure-real-email.js
```

### 方法三：手动配置

#### 1. 启用 Gmail 两步验证
1. 登录 Gmail 账户
2. 访问 [Google 账户设置](https://myaccount.google.com/)
3. 点击"安全性" → "两步验证"
4. 按照提示启用两步验证

#### 2. 生成应用密码
1. 在 Google 账户设置中，找到"应用密码"
2. 选择"邮件"和"其他（自定义名称）"
3. 输入"Bio-Chain Website"
4. 点击"生成"
5. 复制生成的16位密码（例如：`abcd efgh ijkl mnop`）

#### 3. 配置环境变量
创建 `.env` 文件：
```env
EMAIL_USER=your-real-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=3000
```

## 🧪 测试真实邮件发送

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

## 📊 邮件发送流程

### 模拟发送（当前）
1. 客户填写联系表单 ✅
2. 系统显示成功提示 ✅
3. 控制台显示邮件内容 ✅
4. 实际邮件未发送 ❌

### 真实发送（配置后）
1. 客户填写联系表单 ✅
2. 系统发送邮件到 cindy.zhang@bio-chain.cn ✅
3. 系统发送确认邮件给客户 ✅
4. 双方都收到真实邮件 ✅

## 🔧 其他邮件服务

### QQ邮箱
```env
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
PORT=3000
```

### Outlook
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
PORT=3000
```

### 企业邮箱
```env
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-password
PORT=3000
```

## ⚠️ 重要提醒

1. **不要使用 Gmail 账户密码**，必须使用应用密码
2. **确保启用两步验证**，否则无法生成应用密码
3. **检查垃圾邮件文件夹**，确认邮件是否被过滤
4. **Gmail 有发送限制**：每日最多500封邮件

## 🎯 配置步骤总结

1. **启用 Gmail 两步验证**
2. **生成应用密码**
3. **配置 .env 文件**
4. **启动服务器**
5. **测试邮件发送**
6. **验证邮件到达**

## 📞 技术支持

如果遇到问题：
1. 检查 Gmail 两步验证是否启用
2. 确认使用的是应用密码
3. 检查网络连接
4. 查看服务器日志

---

**现在就开始配置真实邮件发送吧！** 🚀

