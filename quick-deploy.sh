#!/bin/bash

# Bio-Chain 快速部署脚本
# 支持 Netlify 和 Vercel 部署

echo "🚀 Bio-Chain 网站快速部署"
echo "=========================="

# 检查必要文件
echo "📋 检查必要文件..."
if [ ! -f "index.html" ]; then
    echo "❌ 缺少 index.html 文件"
    exit 1
fi

if [ ! -f "netlify/functions/contact.js" ]; then
    echo "❌ 缺少 Netlify 函数文件"
    exit 1
fi

if [ ! -f "api/contact.js" ]; then
    echo "❌ 缺少 Vercel API 文件"
    exit 1
fi

echo "✅ 所有必要文件已就绪"

# 检查 Git 状态
echo "🔍 检查 Git 状态..."
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Bio-Chain website with email functionality"
    echo "✅ Git 仓库已初始化"
else
    echo "📝 更新 Git 仓库..."
    git add .
    git commit -m "Update: Email address changed to tony.gu@bio-chain.cn"
    echo "✅ Git 仓库已更新"
fi

echo ""
echo "🌐 选择部署平台："
echo "1. Netlify (推荐 - 支持 Functions)"
echo "2. Vercel (支持 API Routes)"
echo "3. GitHub Pages (纯静态，无邮件功能)"
echo "4. 显示部署说明"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo "🌐 Netlify 部署说明："
        echo "1. 访问 https://netlify.com"
        echo "2. 使用 GitHub 账户登录"
        echo "3. 点击 'New site from Git'"
        echo "4. 选择您的 GitHub 仓库"
        echo "5. 配置环境变量："
        echo "   - EMAIL_USER = tony.gu@bio-chain.cn"
        echo "   - EMAIL_PASS = Pactlt3215422"
        echo "   - TARGET_EMAIL = tony.gu@bio-chain.cn"
        echo "6. 点击 'Deploy site'"
        echo ""
        echo "📧 邮件功能：✅ 支持"
        echo "🔗 测试链接：https://your-site-name.netlify.app"
        ;;
    2)
        echo "🌐 Vercel 部署说明："
        echo "1. 访问 https://vercel.com"
        echo "2. 使用 GitHub 账户登录"
        echo "3. 点击 'New Project'"
        echo "4. 选择您的 GitHub 仓库"
        echo "5. 配置环境变量："
        echo "   - EMAIL_USER = tony.gu@bio-chain.cn"
        echo "   - EMAIL_PASS = Pactlt3215422"
        echo "   - TARGET_EMAIL = tony.gu@bio-chain.cn"
        echo "6. 点击 'Deploy'"
        echo ""
        echo "📧 邮件功能：✅ 支持"
        echo "🔗 测试链接：https://your-site-name.vercel.app"
        ;;
    3)
        echo "🌐 GitHub Pages 部署说明："
        echo "1. 将代码推送到 GitHub 仓库"
        echo "2. 在仓库设置中启用 GitHub Pages"
        echo "3. 选择 'Deploy from a branch'"
        echo "4. 选择 'main' 分支"
        echo ""
        echo "⚠️  注意：GitHub Pages 不支持邮件发送功能"
        echo "📧 邮件功能：❌ 不支持"
        echo "🔗 测试链接：https://your-username.github.io/repo-name"
        ;;
    4)
        echo "📚 详细部署说明："
        echo ""
        echo "🔧 环境变量配置："
        echo "EMAIL_USER = tony.gu@bio-chain.cn"
        echo "EMAIL_PASS = Pactlt3215422"
        echo "TARGET_EMAIL = tony.gu@bio-chain.cn"
        echo ""
        echo "📧 邮件发送流程："
        echo "1. 客户填写联系表单"
        echo "2. 邮件发送到 tony.gu@bio-chain.cn"
        echo "3. 客户收到确认邮件"
        echo ""
        echo "🧪 测试步骤："
        echo "1. 访问部署的网站"
        echo "2. 填写联系表单"
        echo "3. 检查 tony.gu@bio-chain.cn 邮箱"
        echo "4. 检查客户邮箱确认邮件"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署准备完成！"
echo ""
echo "📞 联系信息："
echo "办公地址：上海市浦东新区航城七路785号A-412"
echo "联系电话：+86 21 5049 8599, +86 186 1652 9508"
echo "电子邮箱：tony.gu@bio-chain.cn"
echo ""
echo "📚 更多信息请参考："
echo "- DEPLOYMENT_CONFIG.md"
echo "- DEPLOYMENT_GUIDE.md"
echo "- PRODUCTION_EMAIL_SETUP.md"
