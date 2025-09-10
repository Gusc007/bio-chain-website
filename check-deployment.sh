#!/bin/bash

echo "🔍 Bio-Chain网站部署检查工具"
echo "=================================="
echo ""

# 检查本地文件
echo "📁 检查本地文件："
echo "• 首页: $(ls -la index.html | awk '{print $5}') bytes"
echo "• 隐私政策: $(ls -la privacy-policy.html | awk '{print $5}') bytes"
echo "• 服务条款: $(ls -la terms-of-service.html | awk '{print $5}') bytes"
echo "• Cookie政策: $(ls -la cookie-policy.html | awk '{print $5}') bytes"
echo "• 法律声明: $(ls -la legal-notice.html | awk '{print $5}') bytes"
echo "• 免责声明: $(ls -la disclaimer.html | awk '{print $5}') bytes"
echo "• 投诉建议: $(ls -la complaint-suggestion.html | awk '{print $5}') bytes"
echo ""

# 检查Git状态
echo "📋 检查Git状态："
echo "• 当前分支: $(git branch --show-current)"
echo "• 最新提交: $(git log -1 --oneline)"
echo "• 远程仓库: $(git remote get-url origin)"
echo ""

# 检查GitHub Pages状态
echo "🌐 检查GitHub Pages状态："
echo "• 仓库地址: https://github.com/Gusc007/bio-chain-website"
echo "• 设置页面: https://github.com/Gusc007/bio-chain-website/settings/pages"
echo "• 预期URL: https://gusc007.github.io/bio-chain-website/"
echo "• 自定义域名: www.bio-chain.cn"
echo ""

# 测试网站可访问性
echo "🔗 测试网站可访问性："
echo -n "• GitHub Pages: "
if curl -s -o /dev/null -w "%{http_code}" "https://gusc007.github.io/bio-chain-website/" | grep -q "200"; then
    echo "✅ 可访问"
else
    echo "❌ 不可访问 (可能正在部署中)"
fi

echo -n "• 自定义域名: "
if curl -s -o /dev/null -w "%{http_code}" "https://www.bio-chain.cn" | grep -q "200"; then
    echo "✅ 可访问"
else
    echo "❌ 不可访问 (DNS可能未配置或正在传播)"
fi

echo ""
echo "📋 配置检查清单："
echo "□ 1. 访问 https://github.com/Gusc007/bio-chain-website/settings/pages"
echo "□ 2. Source 设置为 'Deploy from a branch'"
echo "□ 3. Branch 选择 'main'"
echo "□ 4. Folder 选择 '/ (root)'"
echo "□ 5. Custom domain 设置为 'www.bio-chain.cn'"
echo "□ 6. 勾选 'Enforce HTTPS'"
echo "□ 7. 点击 'Save'"
echo "□ 8. 等待部署完成（绿色勾号）"
echo ""

echo "⏰ 部署时间："
echo "• GitHub Pages: 通常需要2-10分钟"
echo "• DNS传播: 可能需要几分钟到几小时"
echo "• 自定义域名: 需要等待DNS配置生效"
echo ""

echo "🔧 故障排除："
echo "• 如果GitHub Pages显示404，检查Source设置"
echo "• 如果自定义域名不工作，检查DNS配置"
echo "• 如果HTTPS不工作，等待证书自动生成"
echo "• 如果页面内容不更新，清除浏览器缓存"
echo ""

echo "✅ 配置完成后，所有法律条款链接都应该可以正常访问！"
