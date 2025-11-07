# 解决 GitHub Pages Save 按钮灰色无法点击问题

## 问题原因

Save 按钮灰色是因为 GitHub 正在验证 DNS 配置（"DNS Check in Progress"），在验证通过之前按钮会保持禁用状态。

## 解决步骤

### 方法 1: 检查并修复 DNS 配置（推荐）

#### 1. 确认 DNS 记录配置正确

在域名管理界面，确保有以下记录：

**必须的 CNAME 记录**：
- **子域名**：`www`
- **解析类型**：`CNAME`（不是 A/AAAA）
- **DNS 指向**：`gusc007.github.io`
- **TTL**：600 或默认

**重要**：
- 如果存在 `www` 的 A/AAAA 记录，必须先删除
- 不能同时存在 A 和 CNAME 记录

#### 2. 验证 DNS 是否生效

使用以下方法检查：

**在线工具**：
- https://www.whatsmydns.net/#CNAME/www.bio-chain.cn
- https://dnschecker.org/#CNAME/www.bio-chain.cn

**命令行**：
```bash
# Windows
nslookup www.bio-chain.cn

# Mac/Linux
dig www.bio-chain.cn CNAME
# 或
nslookup -type=CNAME www.bio-chain.cn
```

**应该看到**：
```
www.bio-chain.cn → gusc007.github.io
```

#### 3. 等待 DNS 传播

- DNS 更改通常需要 5-30 分钟生效
- 某些情况下可能需要 24-48 小时
- 使用上面的工具检查全球 DNS 是否都已更新

### 方法 2: 移除并重新添加域名

如果 DNS 已正确配置但仍无法保存：

1. **先移除域名**：
   - 在 GitHub Pages 设置中点击 "Remove" 按钮
   - 确认移除

2. **等待几分钟**

3. **重新添加域名**：
   - 在 Custom domain 输入框中输入：`www.bio-chain.cn`
   - 等待 GitHub 重新验证 DNS

### 方法 3: 检查 CNAME 文件

确保仓库根目录有 CNAME 文件，内容为：
```
www.bio-chain.cn
```

如果不存在或内容不对：
```bash
git add CNAME
git commit -m "Update CNAME for custom domain"
git push origin main
```

### 方法 4: 使用 GitHub CLI 强制验证

如果网页界面一直无法保存，可以尝试使用 GitHub CLI：

```bash
# 安装 GitHub CLI（如果还没有）
# brew install gh  # Mac
# 或访问 https://cli.github.com

# 登录
gh auth login

# 检查 Pages 状态
gh api repos/Gusc007/bio-chain-website/pages
```

## 常见问题排查

### Q1: DNS 已配置但 Save 按钮仍灰色？

**检查清单**：
- [ ] DNS 记录类型是 CNAME（不是 A）
- [ ] DNS 指向是 `gusc007.github.io`（不是 IP 地址）
- [ ] 已删除所有 www 的 A/AAAA 记录
- [ ] DNS 已全球生效（使用在线工具检查）
- [ ] CNAME 文件已提交到 GitHub 仓库

### Q2: 等待多久？

- **最快**：5-10 分钟
- **通常**：30 分钟到 2 小时
- **最长**：24-48 小时（罕见）

### Q3: DNS 验证一直失败？

尝试：
1. 完全移除自定义域名
2. 等待 10 分钟
3. 重新添加域名
4. 或联系域名服务商确认 DNS 配置

### Q4: 可以先使用默认地址吗？

可以！在 DNS 配置完成前：
- 使用：https://gusc007.github.io/bio-chain-website
- 网站功能完全正常
- 等 DNS 配置好后再添加自定义域名

## 验证 DNS 配置的命令

```bash
# 检查 CNAME 记录
dig www.bio-chain.cn CNAME +short
# 应该输出：gusc007.github.io

# 检查所有记录
dig www.bio-chain.cn ANY

# 使用 nslookup
nslookup -type=CNAME www.bio-chain.cn
```

## 临时解决方案

如果急需使用网站，可以：

1. **暂时移除自定义域名**（点击 Remove）
2. **使用 GitHub Pages 默认地址**：
   - https://gusc007.github.io/bio-chain-website
3. **等 DNS 配置完成后**，再添加自定义域名

## 联系支持

如果以上方法都不行：
1. 检查 GitHub Pages 文档：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
2. 联系域名服务商技术支持
3. 在 GitHub Community 提问

