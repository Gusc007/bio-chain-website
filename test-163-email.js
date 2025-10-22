const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 测试163邮箱配置...\n');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log(`📧 邮箱地址: ${emailUser}`);
console.log(`🔑 密码长度: ${emailPass ? emailPass.length : 0} 位`);

// 测试不同的163邮箱配置
const configs = [
    {
        name: '配置1: SMTP 465端口 (SSL)',
        config: {
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
        }
    },
    {
        name: '配置2: SMTP 587端口 (STARTTLS)',
        config: {
            host: 'smtp.163.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    },
    {
        name: '配置3: SMTP 25端口',
        config: {
            host: 'smtp.163.com',
            port: 25,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    }
];

async function testConfig(config, index) {
    console.log(`\n🔧 测试 ${config.name}...`);
    
    try {
        const transporter = nodemailer.createTransport(config.config);
        
        // 验证连接
        const verifyResult = await transporter.verify();
        console.log(`✅ ${config.name} - 连接成功`);
        
        // 发送测试邮件
        const mailOptions = {
            from: emailUser,
            to: 'tony.gu@bio-chain.cn',
            subject: `163邮箱测试 - ${config.name}`,
            text: `这是来自 ${config.name} 的测试邮件。\n\n配置详情:\n- 主机: ${config.config.host}\n- 端口: ${config.config.port}\n- 安全: ${config.config.secure ? 'SSL' : 'STARTTLS'}\n\n测试时间: ${new Date().toLocaleString()}`
        };
        
        const sendResult = await transporter.sendMail(mailOptions);
        console.log(`✅ ${config.name} - 邮件发送成功`);
        console.log(`📧 邮件ID: ${sendResult.messageId}`);
        
        return true;
        
    } catch (error) {
        console.log(`❌ ${config.name} - 失败: ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('🚀 开始测试163邮箱配置...\n');
    
    let successCount = 0;
    
    for (let i = 0; i < configs.length; i++) {
        const success = await testConfig(configs[i], i);
        if (success) {
            successCount++;
            console.log(`\n🎉 找到可用配置: ${configs[i].name}`);
            break; // 找到可用配置就停止测试
        }
    }
    
    console.log(`\n📊 测试结果: ${successCount}/${configs.length} 个配置可用`);
    
    if (successCount === 0) {
        console.log('\n❌ 所有配置都失败了。可能的原因:');
        console.log('1. 邮箱地址或密码错误');
        console.log('2. 需要使用授权码而不是密码');
        console.log('3. 163邮箱SMTP服务未开启');
        console.log('4. 网络连接问题');
        console.log('\n💡 建议:');
        console.log('1. 检查163邮箱是否开启了SMTP服务');
        console.log('2. 获取客户端授权密码');
        console.log('3. 尝试使用其他邮箱服务（如Gmail）');
    }
}

runTests().catch(console.error);