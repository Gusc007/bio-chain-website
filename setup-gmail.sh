#!/bin/bash

echo "🚀 Bio-Chain Gmail 真实邮件发送配置"
echo "======================================"
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

echo "📧 配置 Gmail 真实邮件发送"
echo ""
echo "请按照以下步骤操作："
echo "1. 登录 Gmail 账户"
echo "2. 访问 https://myaccount.google.com/"
echo "3. 点击'安全性' → '两步验证'"
echo "4. 启用两步验证"
echo "5. 在'应用密码'中生成新密码"
echo "6. 选择'邮件'和'其他（自定义名称）'"
echo "7. 输入'Bio-Chain Website'"
echo "8. 复制16位应用密码"
echo ""

read -p "Gmail 地址: " gmail_user
read -s -p "应用密码 (16位): " gmail_pass
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
echo "🧪 启动服务器进行测试..."
echo "访问: http://localhost:3000"
echo "填写联系表单进行测试"
echo "检查 cindy.zhang@bio-chain.cn 邮箱"
echo ""
echo "🎉 配置完成！现在可以发送真实邮件了！"

