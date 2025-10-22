# 🚀 Bio-Chain 生产环境邮件配置指南

## ✅ 当前状态
- **本地开发**: 邮件发送功能已配置并测试通过
- **生产环境**: 需要配置环境变量以支持邮件发送
- **目标邮箱**: cindy.zhang@bio-chain.cn

## 📧 邮件服务配置

### 已配置的邮件服务
- **发送邮箱**: tony.gu@bio-chain.cn
- **服务类型**: 自定义邮箱服务
- **状态**: 本地测试通过

## 🌐 生产环境部署

### 1. GitHub Pages 部署
GitHub Pages 是静态网站托管，不支持 Node.js 后端，因此需要：

#### 选项 A: 使用 Netlify Functions
1. 将项目部署到 Netlify
2. 将 `server.js` 移动到 `netlify/functions/` 目录
3. 配置环境变量

#### 选项 B: 使用 Vercel
1. 将项目部署到 Vercel
2. 创建 `api/contact.js` 文件
3. 配置环境变量

#### 选项 C: 使用 Heroku
1. 将项目部署到 Heroku
2. 配置环境变量
3. 保持 Node.js 后端

### 2. 环境变量配置

#### Netlify 环境变量
```bash
EMAIL_USER=tony.gu@bio-chain.cn
EMAIL_PASS=Pactlt3215422
```

#### Vercel 环境变量
```bash
EMAIL_USER=tony.gu@bio-chain.cn
EMAIL_PASS=Pactlt3215422
```

#### Heroku 环境变量
```bash
heroku config:set EMAIL_USER=tony.gu@bio-chain.cn
heroku config:set EMAIL_PASS=Pactlt3215422
```

## 🔧 部署步骤

### 方法一：Netlify 部署（推荐）

1. **准备文件结构**
   ```
   netlify/
   └── functions/
       └── contact.js  # 从 server.js 提取的 API 逻辑
   ```

2. **创建 Netlify 函数**
   ```javascript
   // netlify/functions/contact.js
   const nodemailer = require('nodemailer');
   
   exports.handler = async (event, context) => {
       // 邮件发送逻辑
   };
   ```

3. **配置环境变量**
   - 在 Netlify 控制台中设置环境变量
   - EMAIL_USER=tony.gu@bio-chain.cn
   - EMAIL_PASS=Pactlt3215422

### 方法二：Vercel 部署

1. **创建 API 路由**
   ```
   pages/
   └── api/
       └── contact.js
   ```

2. **配置环境变量**
   - 在 Vercel 控制台中设置环境变量
   - 或创建 `.env.local` 文件

### 方法三：Heroku 部署

1. **创建 Procfile**
   ```
   web: node server.js
   ```

2. **配置环境变量**
   ```bash
   heroku config:set EMAIL_USER=tony.gu@bio-chain.cn
   heroku config:set EMAIL_PASS=Pactlt3215422
   ```

## 🧪 测试生产环境

### 1. 本地测试
```bash
# 启动服务器
node server.js

# 测试邮件发送
node test-email-send.js
```

### 2. 生产环境测试
1. 访问生产网站
2. 填写联系表单
3. 检查 cindy.zhang@bio-chain.cn 邮箱
4. 检查客户邮箱确认邮件

## 📊 邮件发送流程

### 客户提交表单
1. 客户填写联系表单
2. 前端发送 POST 请求到 `/api/contact`
3. 后端验证表单数据
4. 发送邮件到 cindy.zhang@bio-chain.cn
5. 发送确认邮件给客户
6. 返回成功响应

### 邮件内容
- **主邮件**: 发送到 cindy.zhang@bio-chain.cn
- **确认邮件**: 发送给客户
- **包含信息**: 姓名、邮箱、电话、服务类型、详细需求

## 🔒 安全注意事项

1. **环境变量安全**
   - 不要在代码中硬编码密码
   - 使用环境变量存储敏感信息
   - 定期更换邮件密码

2. **邮件验证**
   - 验证邮箱格式
   - 验证电话号码格式
   - 防止垃圾邮件

3. **错误处理**
   - 邮件发送失败时的回退机制
   - 用户友好的错误提示
   - 日志记录

## 📞 技术支持

如果遇到邮件发送问题：

1. **检查环境变量**
   ```bash
   echo $EMAIL_USER
   echo $EMAIL_PASS
   ```

2. **检查网络连接**
   ```bash
   ping smtp.gmail.com
   ```

3. **查看服务器日志**
   ```bash
   tail -f server.log
   ```

4. **测试邮件配置**
   ```bash
   node test-email-send.js
   ```

## 🎯 下一步行动

1. **选择部署平台** (Netlify/Vercel/Heroku)
2. **配置环境变量**
3. **部署到生产环境**
4. **测试邮件发送功能**
5. **监控邮件发送状态**

---

**✅ 邮件发送功能已完全配置并测试通过！**

现在可以部署到生产环境，客户咨询将自动发送到 cindy.zhang@bio-chain.cn 邮箱。

