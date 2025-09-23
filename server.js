const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// 邮件配置
const transporter = nodemailer.createTransporter({
    service: 'gmail', // 可以使用其他邮件服务
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

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
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'cindy.zhang@bio-chain.cn',
            subject: `Bio-Chain 网站咨询 - ${service}服务`,
            html: `
                <h2>Bio-Chain 网站咨询</h2>
                <p><strong>姓名:</strong> ${name}</p>
                <p><strong>邮箱:</strong> ${email}</p>
                <p><strong>电话:</strong> ${phone}</p>
                <p><strong>服务类型:</strong> ${service}</p>
                <p><strong>详细需求:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>此邮件来自 Bio-Chain 官方网站联系表单</small></p>
            `,
            replyTo: email
        };
        
        // 发送邮件
        await transporter.sendMail(mailOptions);
        
        // 发送确认邮件给客户
        const confirmMailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: '感谢您的咨询 - Bio-Chain',
            html: `
                <h2>感谢您的咨询</h2>
                <p>亲爱的 ${name}，</p>
                <p>感谢您对 Bio-Chain 专业生物制品及药品物流运输服务的关注！</p>
                <p>我们已收到您的咨询信息：</p>
                <ul>
                    <li><strong>服务类型:</strong> ${service}</li>
                    <li><strong>您的需求:</strong> ${message}</li>
                </ul>
                <p>我们的专业团队将在1-2个工作日内回复您，请保持电话畅通。</p>
                <p>如有紧急需求，请直接致电：+86 21 5049 8599</p>
                <hr>
                <p><strong>Bio-Chain 团队</strong><br>
                专业生物制品及药品物流运输<br>
                电话: +86 21 5049 8599<br>
                邮箱: cindy.zhang@bio-chain.cn</p>
            `
        };
        
        await transporter.sendMail(confirmMailOptions);
        
        res.json({ 
            success: true, 
            message: '消息发送成功！我们会尽快回复您。' 
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
    res.json({ status: 'OK', message: 'Bio-Chain API 运行正常' });
});

// 静态文件服务
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Bio-Chain 服务器运行在端口 ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
});
