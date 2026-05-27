#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Bio-Chain 手动邮件设置');
console.log('========================');
console.log('');

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function setupEmail() {
    try {
        console.log('请选择邮箱类型：');
        console.log('1. QQ邮箱 (需要授权码)');
        console.log('2. Gmail (需要应用密码)');
        console.log('3. Outlook (直接使用密码)');
        console.log('4. 163邮箱 (需要开启SMTP)');
        console.log('');
        
        const choice = await askQuestion('请输入选择 (1-4): ');
        
        let emailUser, emailPass, instructions = '';
        
        switch(choice) {
            case '1':
                console.log('\n📧 QQ邮箱设置:');
                console.log('1. 登录 https://mail.qq.com');
                console.log('2. 设置 → 账户 → 开启SMTP服务');
                console.log('3. 生成授权码（16位）');
                console.log('');
                emailUser = await askQuestion('QQ邮箱地址: ');
                emailPass = await askQuestion('16位授权码: ');
                instructions = 'QQ邮箱配置完成！请确保已开启SMTP服务并使用授权码。';
                break;
                
            case '2':
                console.log('\n📧 Gmail设置:');
                console.log('1. 登录 https://myaccount.google.com/');
                console.log('2. 安全性 → 两步验证 → 启用');
                console.log('3. 应用密码 → 生成新密码');
                console.log('4. 选择"邮件"和"其他"');
                console.log('');
                emailUser = await askQuestion('Gmail地址: ');
                emailPass = await askQuestion('16位应用密码: ');
                instructions = 'Gmail配置完成！请确保已启用两步验证并使用应用密码。';
                break;
                
            case '3':
                console.log('\n📧 Outlook设置:');
                emailUser = await askQuestion('Outlook邮箱: ');
                emailPass = await askQuestion('邮箱密码: ');
                instructions = 'Outlook配置完成！';
                break;
                
            case '4':
                console.log('\n📧 163邮箱设置:');
                console.log('1. 登录 https://mail.163.com');
                console.log('2. 设置 → POP3/SMTP/IMAP');
                console.log('3. 开启SMTP服务');
                console.log('');
                emailUser = await askQuestion('163邮箱地址: ');
                emailPass = await askQuestion('邮箱密码: ');
                instructions = '163邮箱配置完成！请确保已开启SMTP服务。';
                break;
                
            default:
                console.log('❌ 无效选择');
                return;
        }
        
        // 创建 .env 文件
        const envContent = `# Bio-Chain 邮件配置
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
PORT=3000
`;
        
        fs.writeFileSync('.env', envContent);
        console.log('\n✅ .env 文件已更新');
        console.log(instructions);
        
        // 测试配置
        const test = await askQuestion('\n是否现在测试邮件发送？(y/n): ');
        if (test.toLowerCase() === 'y') {
            console.log('\n🧪 启动服务器进行测试...');
            console.log('访问: http://localhost:3000');
            console.log('填写联系表单进行测试');
            console.log('检查 cindy.zhang@bio-chain.cn 邮箱');
        }
        
        console.log('\n🎉 配置完成！');
        console.log('启动服务器: node server.js');
        console.log('访问网站: http://localhost:3000');
        console.log('邮件将发送到: cindy.zhang@bio-chain.cn');
        
    } catch (error) {
        console.error('❌ 配置失败:', error.message);
    } finally {
        rl.close();
    }
}

setupEmail();
















