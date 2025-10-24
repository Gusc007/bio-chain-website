const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // 设置 CORS 头
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // 处理 CORS 预检请求
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // 只允许 POST 请求
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, message: 'Method not allowed' })
        };
    }

    try {
        // 检查环境变量
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const targetEmail = process.env.TARGET_EMAIL;

        console.log('Environment variables:', {
            EMAIL_USER: emailUser ? 'SET' : 'NOT SET',
            EMAIL_PASS: emailPass ? 'SET' : 'NOT SET',
            TARGET_EMAIL: targetEmail ? 'SET' : 'NOT SET'
        });

        if (!emailUser || !emailPass || !targetEmail) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    message: 'Environment variables not configured properly',
                    debug: {
                        EMAIL_USER: emailUser ? 'SET' : 'NOT SET',
                        EMAIL_PASS: emailPass ? 'SET' : 'NOT SET',
                        TARGET_EMAIL: targetEmail ? 'SET' : 'NOT SET'
                    }
                })
            };
        }

        // 解析请求体
        const { name, email, phone, service, message } = JSON.parse(event.body);
        
        // 验证必填字段
        if (!name || !email || !phone || !service || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ success: false, message: '请填写所有字段' })
            };
        }

        // 创建邮件传输器
        console.log('Creating transporter with:', { user: emailUser, pass: emailPass ? 'SET' : 'NOT SET' });
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gusc090124@gmail.com', // 使用正确的 Gmail 邮箱
                pass: emailPass
            }
        });

        // 测试连接
        console.log('Testing transporter connection...');
        await transporter.verify();
        console.log('Transporter connection verified');

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
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: '消息发送成功！我们会尽快回复您。',
                messageId: info.messageId
            })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                message: '发送失败，请稍后重试或直接联系我们',
                error: error.message
            })
        };
    }
};
