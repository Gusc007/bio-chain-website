#!/bin/bash

echo "🚀 Bio-Chain 邮件服务快速配置"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 已安装"

# 检查是否已存在 .env 文件
if [ -f ".env" ]; then
    echo "⚠️  发现已存在的 .env 文件"
    read -p "是否要覆盖现有配置？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 配置已取消"
        exit 0
    fi
fi

echo ""
echo "📧 请选择邮件服务提供商："
echo "1. Gmail (推荐)"
echo "2. Outlook/Hotmail"
echo "3. QQ邮箱"
echo "4. 163邮箱"
echo "5. 企业邮箱"
echo "6. 其他邮箱"
echo ""

read -p "请输入选项 (1-6): " choice

case $choice in
    1)
        echo ""
        echo "📧 Gmail 配置"
        echo "请确保您已："
        echo "1. 启用两步验证"
        echo "2. 生成应用专用密码"
        echo "3. 获取16位应用专用密码"
        echo ""
        read -p "请输入 Gmail 邮箱地址: " email
        read -p "请输入16位应用专用密码: " password
        service="Gmail"
        ;;
    2)
        echo ""
        echo "📧 Outlook/Hotmail 配置"
        read -p "请输入 Outlook 邮箱地址: " email
        read -p "请输入邮箱密码: " password
        service="Outlook"
        ;;
    3)
        echo ""
        echo "📧 QQ邮箱配置"
        echo "请确保您已："
        echo "1. 开启SMTP服务"
        echo "2. 获取授权码"
        echo ""
        read -p "请输入 QQ 邮箱地址: " email
        read -p "请输入授权码: " password
        service="QQ邮箱"
        ;;
    4)
        echo ""
        echo "📧 163邮箱配置"
        echo "请确保您已："
        echo "1. 开启SMTP服务"
        echo "2. 获取客户端授权密码"
        echo ""
        read -p "请输入 163 邮箱地址: " email
        read -p "请输入客户端授权密码: " password
        service="163邮箱"
        ;;
    5)
        echo ""
        echo "📧 企业邮箱配置"
        read -p "请输入企业邮箱地址: " email
        read -p "请输入邮箱密码: " password
        service="企业邮箱"
        ;;
    6)
        echo ""
        echo "📧 其他邮箱配置"
        read -p "请输入邮箱地址: " email
        read -p "请输入邮箱密码: " password
        service="其他邮箱"
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

# 创建 .env 文件
cat > .env << EOF
# Bio-Chain 邮件配置
# 配置时间: $(date)
# 邮件服务: $service

EMAIL_USER=$email
EMAIL_PASS=$password
PORT=3000
TARGET_EMAIL=tony.gu@bio-chain.cn

# 邮件服务状态
EMAIL_SERVICE_ENABLED=true
EMAIL_SERVICE_TYPE=$service
EOF

echo ""
echo "✅ .env 文件创建成功！"
echo "📧 邮件服务: $service"
echo "📮 发送邮箱: $email"
echo "🎯 目标邮箱: tony.gu@bio-chain.cn"
echo ""
echo "🚀 现在可以启动服务器测试邮件发送："
echo "   node server.js"
echo ""
echo "🧪 测试命令："
echo "   curl http://localhost:3000/api/health"
echo ""
echo "📧 测试邮件发送："
echo "   curl -X POST http://localhost:3000/api/contact \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"name\":\"测试\",\"email\":\"test@example.com\",\"phone\":\"13800138000\",\"service\":\"空运服务\",\"message\":\"测试消息\"}'"
echo ""
echo "🌐 访问网站："
echo "   http://localhost:3000"
echo ""
echo "🎉 配置完成！现在您的网站可以发送真实邮件了！"

