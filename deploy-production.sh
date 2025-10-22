#!/bin/bash

# Bio-Chain 生产环境部署脚本
# 支持邮件发送功能的完整部署

echo "🚀 Bio-Chain 生产环境部署"
echo "=========================="

# 检查必要文件
echo "📋 检查必要文件..."
if [ ! -f "server.js" ]; then
    echo "❌ 缺少 server.js 文件"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo "❌ 缺少 .env 文件"
    echo "请先运行: node configure-real-email.js"
    exit 1
fi

# 检查环境变量
echo "🔍 检查邮件配置..."
if grep -q "your-email@gmail.com" .env; then
    echo "❌ 邮件配置未完成"
    echo "请先运行: node configure-real-email.js"
    exit 1
fi

echo "✅ 邮件配置已就绪"

# 测试邮件功能
echo "🧪 测试邮件发送功能..."
if node test-email-send.js; then
    echo "✅ 邮件发送测试通过"
else
    echo "❌ 邮件发送测试失败"
    exit 1
fi

# 选择部署平台
echo ""
echo "请选择部署平台："
echo "1. Netlify (推荐 - 支持 Functions)"
echo "2. Vercel (支持 API Routes)"
echo "3. Heroku (支持 Node.js 后端)"
echo "4. 其他平台"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo "🌐 部署到 Netlify..."
        echo "请按照 PRODUCTION_EMAIL_SETUP.md 中的说明配置 Netlify Functions"
        ;;
    2)
        echo "🌐 部署到 Vercel..."
        echo "请按照 PRODUCTION_EMAIL_SETUP.md 中的说明配置 Vercel API Routes"
        ;;
    3)
        echo "🌐 部署到 Heroku..."
        echo "请按照 PRODUCTION_EMAIL_SETUP.md 中的说明配置 Heroku 环境变量"
        ;;
    4)
        echo "🌐 其他平台部署..."
        echo "请参考 PRODUCTION_EMAIL_SETUP.md 中的通用配置说明"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "📧 邮件配置信息："
echo "发送邮箱: $(grep EMAIL_USER .env | cut -d'=' -f2)"
echo "目标邮箱: cindy.zhang@bio-chain.cn"
echo ""

echo "🎉 部署准备完成！"
echo "请按照上述说明完成生产环境部署。"
echo ""
echo "📚 详细说明请参考："
echo "- PRODUCTION_EMAIL_SETUP.md"
echo "- README.md"
echo ""
echo "🧪 测试命令："
echo "- 本地测试: node test-email-send.js"
echo "- 启动服务器: node server.js"
echo "- 访问网站: http://localhost:3000"

