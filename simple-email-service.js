#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// 模拟邮件发送服务
function sendEmail(emailData) {
    return new Promise((resolve) => {
        // 模拟邮件发送延迟
        setTimeout(() => {
            console.log('📧 邮件发送成功！');
            console.log('收件人: cindy.zhang@bio-chain.cn');
            console.log('发件人:', emailData.email);
            console.log('主题:', emailData.subject);
            console.log('内容:', emailData.message);
            console.log('时间:', new Date().toLocaleString());
            console.log('---');
            
            // 这里可以集成真实的邮件服务
            // 比如 SendGrid, Mailgun, 或者 SMTP
            resolve({
                success: true,
                messageId: 'sim_' + Date.now(),
                message: '邮件已发送到 cindy.zhang@bio-chain.cn'
            });
        }, 1000);
    });
}

// 联系表单提交接口
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        
        // 验证必填字段
        if (!name || !email || !phone || !service || !message) {
            return res.status(400).json({ 
                success: false, 
                message: '请填写所有字段' 
            });
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: '请输入有效的邮箱地址' 
            });
        }
        
        // 验证电话格式
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 7 || cleanPhone.length > 15) {
            return res.status(400).json({ 
                success: false, 
                message: '请输入有效的电话号码' 
            });
        }
        
        // 邮件内容
        const emailData = {
            to: 'cindy.zhang@bio-chain.cn',
            from: email,
            name: name,
            phone: phone,
            service: service,
            message: message,
            subject: `Bio-Chain 网站咨询 - ${service}服务`
        };
        
        // 发送邮件
        const result = await sendEmail(emailData);
        
        res.json({ 
            success: true, 
            message: '消息发送成功！我们会尽快回复您。',
            messageId: result.messageId
        });
        
    } catch (error) {
        console.error('邮件发送失败:', error);
        res.status(500).json({ 
            success: false, 
            message: '发送失败，请稍后重试或直接联系我们' 
        });
    }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Bio-Chain API 运行正常',
        emailService: '模拟邮件服务已启用'
    });
});

// 静态文件服务
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log('🚀 Bio-Chain 简化邮件服务启动');
    console.log(`📧 邮件服务: 模拟发送模式`);
    console.log(`🌐 服务器运行在端口 ${PORT}`);
    console.log(`🔗 访问地址: http://localhost:${PORT}`);
    console.log(`📬 邮件将发送到: cindy.zhang@bio-chain.cn`);
    console.log('');
    console.log('✅ 系统已准备就绪！');
});
















