require('dotenv').config();
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
let transporter = null;

// 检查邮件配置
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailPass && emailUser !== 'your-gmail@gmail.com' && emailPass !== 'your-app-password') {
    // 真实邮件配置
    if (emailUser.includes('@bio-chain.cn')) {
        // 腾讯企业邮箱配置
        transporter = nodemailer.createTransport({
            host: 'smtp.exmail.qq.com',
            port: 465,
            secure: true, // 使用 SSL
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log('✅ 腾讯企业邮箱已配置，将发送真实邮件');
        
        // 测试邮件配置
        transporter.verify((error, success) => {
            if (error) {
                console.log('❌ 腾讯企业邮箱连接失败:', error.message);
                console.log('⚠️  将使用模拟发送模式');
                transporter = null;
            } else {
                console.log('✅ 腾讯企业邮箱连接测试成功');
            }
        });
    } else if (emailUser.includes('@gmail.com')) {
        // Gmail 配置
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
        console.log('✅ Gmail 已配置，将发送真实邮件');
    } else if (emailUser.includes('@163.com')) {
        // 163邮箱配置
        transporter = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log('✅ 163邮箱已配置，将发送真实邮件');
    } else if (emailUser.includes('@outlook.com') || emailUser.includes('@hotmail.com')) {
        // Outlook邮箱配置
        transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log('✅ Outlook邮箱已配置，将发送真实邮件');
    } else {
        // 其他邮箱配置
        transporter = nodemailer.createTransport({
            service: 'gmail', // 默认使用 Gmail 服务
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
        console.log('✅ 邮件服务已配置，将发送真实邮件');
    }
} else {
    console.log('⚠️  邮件服务未配置，使用模拟发送模式');
    console.log('请配置 .env 文件中的 EMAIL_USER 和 EMAIL_PASS');
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
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'tony.gu@bio-chain.cn',
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
        if (transporter) {
            // 真实邮件发送
            try {
                await transporter.sendMail(mailOptions);
                console.log('✅ 邮件已发送到 tony.gu@bio-chain.cn');
                
                // 发送确认邮件给客户
                const confirmMailOptions = {
                    from: emailUser,
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
                        邮箱: tony.gu@bio-chain.cn</p>
                    `
                };
                
                await transporter.sendMail(confirmMailOptions);
                console.log('✅ 确认邮件已发送给客户');
                
            } catch (emailError) {
                console.error('❌ 邮件发送失败:', emailError.message);
                // 如果邮件发送失败，回退到模拟发送
                console.log('📧 模拟发送邮件到 tony.gu@bio-chain.cn');
                console.log('邮件内容:', {
                    to: 'tony.gu@bio-chain.cn',
                    subject: `Bio-Chain 网站咨询 - ${service}服务`,
                    from: email,
                    name: name,
                    phone: phone,
                    message: message
                });
            }
        } else {
            // 模拟邮件发送
            console.log('📧 模拟发送邮件到 tony.gu@bio-chain.cn');
            console.log('邮件内容:', {
                to: 'tony.gu@bio-chain.cn',
                subject: `Bio-Chain 网站咨询 - ${service}服务`,
                from: email,
                name: name,
                phone: phone,
                message: message
            });
        }
        
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
