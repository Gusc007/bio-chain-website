require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 测试腾讯企业邮箱不同端口配置');
console.log('=====================================');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('邮箱地址:', emailUser);
console.log('密码:', emailPass ? '***已设置***' : '未设置');

// 测试不同的端口配置
const configs = [
    { port: 587, secure: false, name: '端口587 (STARTTLS)' },
    { port: 465, secure: true, name: '端口465 (SSL)' },
    { port: 25, secure: false, name: '端口25 (STARTTLS)' }
];

async function testConfig(config, index) {
    console.log(`\n📧 测试配置 ${index + 1}: ${config.name}`);
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.exmail.qq.com',
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
        console.log(`✅ 配置 ${index + 1} 连接成功！`);
        
        // 发送测试邮件
        const mailOptions = {
            from: emailUser,
            to: 'cindy.zhang@bio-chain.cn',
            subject: `腾讯企业邮箱测试 - ${config.name}`,
            html: `
                <h2>腾讯企业邮箱发送测试</h2>
                <p>配置: ${config.name}</p>
                <p>发送时间: ${new Date().toLocaleString()}</p>
            `
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ 邮件发送成功！ID: ${info.messageId}`);
        return true;
        
    } catch (error) {
        console.log(`❌ 配置 ${index + 1} 失败: ${error.message}`);
        return false;
    }
}

async function testAllConfigs() {
    for (let i = 0; i < configs.length; i++) {
        const success = await testConfig(configs[i], i);
        if (success) {
            console.log(`\n🎉 找到可用配置: ${configs[i].name}`);
            break;
        }
    }
}

testAllConfigs().catch(console.error);
