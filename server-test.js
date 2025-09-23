const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// 联系表单提交接口
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        
        console.log('收到联系表单:', { name, email, phone, service, message });
        
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
        
        // 模拟邮件发送（实际项目中这里会发送真实邮件）
        console.log('模拟发送邮件到 cindy.zhang@bio-chain.cn');
        console.log('邮件内容:', {
            to: 'cindy.zhang@bio-chain.cn',
            subject: `Bio-Chain 网站咨询 - ${service}服务`,
            from: email,
            name: name,
            phone: phone,
            message: message
        });
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        res.json({ 
            success: true, 
            message: '消息发送成功！我们会尽快回复您。' 
        });
        
    } catch (error) {
        console.error('处理联系表单失败:', error);
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
    console.log(`API测试: http://localhost:${PORT}/api/health`);
});
