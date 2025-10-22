#!/usr/bin/env node

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 测试替代邮件配置');
console.log('==================');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('EMAIL_USER:', emailUser);
console.log('EMAIL_PASS:', emailPass ? '***已设置***' : '未设置');

// 尝试不同的SMTP配置
const configs = [
    {
        name: '腾讯企业邮箱 (端口587)',
        host: 'smtp.exmail.qq.com',
        port: 587,
        secure: false
    },
    {
        name: '腾讯企业邮箱 (端口465)',
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true
    },
    {
        name: '腾讯企业邮箱 (端口25)',
        host: 'smtp.exmail.qq.com',
        port: 25,
        secure: false
    }
];

async function testConfig(config) {
    console.log(`\n📧 测试 ${config.name}...`);
    
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    try {
        await transporter.verify();
        console.log(`✅ ${config.name} 连接成功`);
        
        // 发送测试邮件
        const mailOptions = {
            from: emailUser,
            to: 'cindy.zhang@bio-chain.cn',
            subject: 'Bio-Chain 邮件配置测试',
            html: '<h2>邮件配置测试</h2><p>这是一封测试邮件，用于验证邮件发送功能是否正常工作。</p>'
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ 测试邮件发送成功: ${info.messageId}`);
        return true;
    } catch (error) {
        console.log(`❌ ${config.name} 失败: ${error.message}`);
        return false;
    }
}

async function testAllConfigs() {
    for (const config of configs) {
        const success = await testConfig(config);
        if (success) {
            console.log('\n🎉 找到可用的邮件配置！');
            return;
        }
    }
    console.log('\n❌ 所有配置都失败了，可能需要检查网络连接或邮箱设置');
}

testAllConfigs();

