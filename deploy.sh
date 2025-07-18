#!/bin/bash

# 网站部署脚本
# 使用方法: ./deploy.sh "提交信息"

echo "🚀 开始部署网站..."

# 检查是否有提交信息
if [ -z "$1" ]; then
    echo "❌ 请提供提交信息"
    echo "使用方法: ./deploy.sh \"提交信息\""
    exit 1
fi

# 检查Git状态
if ! git status --porcelain | grep -q .; then
    echo "✅ 没有需要提交的更改"
    exit 0
fi

# 添加所有文件
echo "📁 添加文件到Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "$1"

# 推送到远程仓库
echo "📤 推送到远程仓库..."
if git push origin main; then
    echo "✅ 部署成功！"
    echo "🌐 你的网站将在几分钟内更新"
    echo ""
    echo "📋 下一步："
    echo "1. 检查GitHub Pages设置"
    echo "2. 配置自定义域名（如果需要）"
    echo "3. 验证网站是否正常访问"
else
    echo "❌ 推送失败，请检查网络连接和GitHub设置"
    exit 1
fi 