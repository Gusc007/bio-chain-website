#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Bio-Chain 真实邮件发送配置向导');
console.log('=====================================');
console.log('');

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function configureEmail() {
    try {
        console.log('📧 配置真实邮件发送到 cindy.zhang@bio-chain.cn');
        console.log('');
        console.log('请选择邮件服务：');
        console.log('1. Gmail (推荐)');
        console.log('2. Outlook/Hotmail');
        console.log('3. QQ邮箱');
        console.log('4. 其他邮箱');
        console.log('');
        
        const service = await askQuestion('请输入选择 (1-4): ');
        
        let emailUser, emailPass, instructions = '';
        
        switch(service) {
            case '1':
                console.log('\n📧 配置 Gmail:');
                console.log('步骤：');
                console.log('1. 登录 Gmail 账户');
                console.log('2. 访问 https://myaccount.google.com/');
                console.log('3. 点击"安全性" → "两步验证"');
                console.log('4. 启用两步验证');
                console.log('5. 在"应用密码"中生成新密码');
                console.log('6. 选择"邮件"和"其他（自定义名称）"');
                console.log('7. 输入"Bio-Chain Website"');
                console.log('8. 复制16位应用密码');
                console.log('');
                
                emailUser = await askQuestion('Gmail 地址: ');
                emailPass = await askQuestion('应用密码 (16位): ');
                instructions = 'Gmail 配置完成！请确保已启用两步验证并使用应用密码。';
                break;
                
            case '2':
                console.log('\n📧 配置 Outlook:');
                emailUser = await askQuestion('Outlook 邮箱: ');
                emailPass = await askQuestion('邮箱密码: ');
                instructions = 'Outlook 配置完成！';
                break;
                
            case '3':
                console.log('\n📧 配置 QQ邮箱:');
                console.log('请先开启 SMTP 服务并获取授权码');
                emailUser = await askQuestion('QQ邮箱: ');
                emailPass = await askQuestion('授权码: ');
                instructions = 'QQ邮箱配置完成！请确保已开启 SMTP 服务。';
                break;
                
            case '4':
                console.log('\n📧 配置其他邮箱:');
                emailUser = await askQuestion('邮箱地址: ');
                emailPass = await askQuestion('邮箱密码: ');
                instructions = '自定义邮箱配置完成！';
                break;
                
            default:
                console.log('❌ 无效选择，使用默认配置');
                emailUser = 'your-email@gmail.com';
                emailPass = 'your-password';
                instructions = '请手动编辑 .env 文件配置邮件服务。';
        }
        
        // 创建 .env 文件
        const envContent = `# Bio-Chain 邮件配置
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
PORT=3000
`;
        
        fs.writeFileSync('.env', envContent);
        console.log('\n✅ .env 文件已创建');
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

configureEmail();

