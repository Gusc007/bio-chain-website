const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 CORS 预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

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

        // 邮件配置
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const targetEmail = process.env.TARGET_EMAIL || 'tony.gu@bio-chain.cn';

        if (!emailUser || !emailPass) {
            return res.status(500).json({ 
                success: false, 
                message: '邮件服务配置错误' 
            });
        }

        // 创建邮件传输器
        let transporter;
        
        if (emailUser.includes('@bio-chain.cn')) {
            // 腾讯企业邮箱配置
            transporter = nodemailer.createTransporter({
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
        } else if (emailUser.includes('@gmail.com')) {
            // Gmail 配置
            transporter = nodemailer.createTransporter({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass
                }
            });
        } else {
            // 其他邮箱配置
            transporter = nodemailer.createTransporter({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass
                }
            });
        }

        // 邮件内容
        const mailOptions = {
            from: emailUser,
            to: targetEmail,
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
        
        res.status(200).json({ 
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
}
