#!/usr/bin/env node

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 测试邮件配置');
console.log('================');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('EMAIL_USER:', emailUser);
console.log('EMAIL_PASS:', emailPass ? '***已设置***' : '未设置');

if (emailUser && emailPass && emailUser !== 'your-gmail@gmail.com' && emailPass !== 'your-app-password') {
    console.log('✅ 环境变量配置正确');
    
    let transporter;
    
    if (emailUser.includes('@bio-chain.cn')) {
        console.log('📧 配置腾讯企业邮箱...');
        transporter = nodemailer.createTransport({
            host: 'smtp.exmail.qq.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
    } else {
        console.log('📧 配置其他邮箱...');
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
    }
    
    // 测试连接
    transporter.verify((error, success) => {
        if (error) {
            console.log('❌ 邮件服务器连接失败:', error.message);
        } else {
            console.log('✅ 邮件服务器连接成功');
            
            // 发送测试邮件
            const mailOptions = {
                from: emailUser,
                to: 'cindy.zhang@bio-chain.cn',
                subject: 'Bio-Chain 邮件配置测试',
                html: '<h2>邮件配置测试</h2><p>这是一封测试邮件，用于验证邮件发送功能是否正常工作。</p>'
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('❌ 邮件发送失败:', error.message);
                } else {
                    console.log('✅ 测试邮件发送成功:', info.messageId);
                    console.log('📧 邮件已发送到: cindy.zhang@bio-chain.cn');
                }
            });
        }
    });
} else {
    console.log('❌ 邮件配置不正确');
    console.log('请检查 .env 文件中的 EMAIL_USER 和 EMAIL_PASS');
}
