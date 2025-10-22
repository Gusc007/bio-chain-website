#!/usr/bin/env node

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 测试QQ邮箱SMTP连接');
console.log('====================');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('邮箱地址:', emailUser);
console.log('密码:', emailPass ? '***已设置***' : '未设置');

// QQ邮箱SMTP配置
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // 使用STARTTLS
    auth: {
        user: emailUser,
        pass: emailPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

console.log('\n📧 测试SMTP连接...');

// 测试连接
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ SMTP连接失败:', error.message);
        console.log('\n🔧 QQ邮箱需要特殊设置:');
        console.log('1. 登录QQ邮箱网页版');
        console.log('2. 设置 → 账户 → 开启SMTP服务');
        console.log('3. 生成授权码（不是登录密码）');
        console.log('4. 使用授权码作为EMAIL_PASS');
    } else {
        console.log('✅ SMTP连接成功！');
        
        // 发送测试邮件
        console.log('\n📤 发送测试邮件...');
        const mailOptions = {
            from: emailUser,
            to: 'cindy.zhang@bio-chain.cn',
            subject: 'Bio-Chain QQ邮箱测试',
            html: `
                <h2>QQ邮箱发送测试</h2>
                <p>这是一封来自QQ邮箱的测试邮件。</p>
                <p>发送时间: ${new Date().toLocaleString()}</p>
                <p>如果收到此邮件，说明QQ邮箱配置成功！</p>
            `
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('❌ 邮件发送失败:', error.message);
            } else {
                console.log('✅ 测试邮件发送成功！');
                console.log('📧 邮件ID:', info.messageId);
                console.log('📬 邮件已发送到: cindy.zhang@bio-chain.cn');
            }
        });
    }
});




