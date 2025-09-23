#!/bin/bash

echo "🚀 Bio-Chain Gmail 快速配置"
echo "=============================="
echo ""

# 检查是否已存在 .env 文件
if [ -f ".env" ]; then
    echo "⚠️  发现现有 .env 文件"
    read -p "是否覆盖？(y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "❌ 配置取消"
        exit 1
    fi
fi

echo "📧 请提供您的 Gmail 配置信息："
echo ""
echo "注意："
echo "1. 请先启用 Gmail 两步验证"
echo "2. 生成应用密码（16位字符）"
echo "3. 不要使用您的 Gmail 密码"
echo ""

read -p "Gmail 地址: " gmail_user
read -s -p "应用密码: " gmail_pass
echo ""

# 验证输入
if [ -z "$gmail_user" ] || [ -z "$gmail_pass" ]; then
    echo "❌ 邮箱地址和密码不能为空"
    exit 1
fi

# 创建 .env 文件
cat > .env << EOF
# Bio-Chain 邮件配置
EMAIL_USER=$gmail_user
EMAIL_PASS=$gmail_pass
PORT=3000
EOF

echo ""
echo "✅ .env 文件已创建"
echo ""
echo "🧪 测试配置..."
echo "启动服务器: node server.js"
echo "访问网站: http://localhost:3000"
echo "填写联系表单进行测试"
echo ""
echo "📧 邮件将发送到: cindy.zhang@bio-chain.cn"
echo "客户将收到确认邮件"
echo ""
echo "🎉 配置完成！"
