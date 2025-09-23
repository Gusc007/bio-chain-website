# Bio-Chain 邮件发送功能设置指南

## 📧 功能说明

现在网站的联系表单可以真正发送邮件到 `cindy.zhang@bio-chain.cn` 邮箱了！

### 邮件发送流程
1. 用户填写联系表单
2. 系统发送邮件到 `cindy.zhang@bio-chain.cn`
3. 系统自动发送确认邮件给客户
4. 客户收到确认邮件

## 🛠️ 设置步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 配置邮件服务

#### 方法一：使用 Gmail（推荐）

1. **启用两步验证**
   - 登录 Gmail 账户
   - 进入 Google 账户设置
   - 启用两步验证

2. **生成应用密码**
   - 在 Google 账户设置中找到"应用密码"
   - 生成一个新的应用密码
   - 复制密码（16位字符）

3. **配置环境变量**
   ```bash
   # 复制配置文件
   cp env.example .env
   
   # 编辑 .env 文件
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   PORT=3000
   ```

#### 方法二：使用其他邮件服务

修改 `server.js` 中的邮件配置：

```javascript
const transporter = nodemailer.createTransporter({
    service: 'outlook', // 或其他服务
    auth: {
        user: 'your-email@outlook.com',
        pass: 'your-password'
    }
});
```

### 3. 启动服务器
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 4. 访问网站
- 本地访问: http://localhost:3000
- 联系表单: http://localhost:3000/#contact

## 📋 邮件内容

### 发送给 cindy.zhang@bio-chain.cn 的邮件
- 主题: "Bio-Chain 网站咨询 - [服务类型]"
- 包含: 客户姓名、邮箱、电话、服务类型、详细需求
- 回复地址: 客户邮箱

### 发送给客户的确认邮件
- 主题: "感谢您的咨询 - Bio-Chain"
- 包含: 感谢信息、服务确认、联系方式
- 发送地址: 客户邮箱

## 🔧 部署到生产环境

### 使用 Heroku
1. 创建 Heroku 应用
2. 设置环境变量
3. 部署代码

### 使用 Vercel
1. 连接 GitHub 仓库
2. 设置环境变量
3. 自动部署

### 使用自己的服务器
1. 安装 Node.js
2. 配置邮件服务
3. 使用 PM2 管理进程

## 🚨 注意事项

1. **邮件服务限制**
   - Gmail 每日发送限制：500封
   - 建议使用专业邮件服务（如 SendGrid）

2. **安全性**
   - 不要将邮件密码提交到代码仓库
   - 使用环境变量存储敏感信息

3. **测试**
   - 先在本地测试邮件发送功能
   - 确认邮件能正常到达目标邮箱

## 📞 技术支持

如果遇到问题，请检查：
1. 邮件服务配置是否正确
2. 网络连接是否正常
3. 服务器日志中的错误信息

## ✅ 验证清单

- [ ] 邮件服务配置完成
- [ ] 环境变量设置正确
- [ ] 服务器启动成功
- [ ] 联系表单可以提交
- [ ] 邮件发送到 cindy.zhang@bio-chain.cn
- [ ] 客户收到确认邮件
