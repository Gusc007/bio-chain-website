# GitHub Pages 自定义域名 DNS 配置指南

## 当前状态

- 网站地址：http://www.bio-chain.cn/
- 自定义域名：www.bio-chain.cn
- 状态：DNS Check in Progress（DNS 验证进行中）
- Save 按钮禁用：因为 DNS 验证未完成

## 问题原因

GitHub Pages 的 Save 按钮在 DNS 验证完成之前是禁用的。需要正确配置 DNS 记录后，GitHub 验证通过才能保存。

## 解决步骤

### 1. 确保 CNAME 文件已提交到 GitHub

CNAME 文件应该包含：`www.bio-chain.cn`

如果未提交，运行：
```bash
git add CNAME
git commit -m "Add CNAME for custom domain"
git push origin main
```

### 2. 配置 DNS 记录

在你的域名服务商（如阿里云、腾讯云、GoDaddy 等）的 DNS 管理中添加以下记录：

#### 选项 A: 使用 CNAME 记录（推荐）

- **类型**：CNAME
- **主机记录**：www
- **记录值**：gusc007.github.io
- **TTL**：600（或默认）

#### 选项 B: 使用 A 记录（如果支持裸域名）

如果也想支持 `bio-chain.cn`（不带 www），添加：

- **类型**：A
- **主机记录**：@
- **记录值**：185.199.108.153（GitHub Pages IP）
- **记录值**：185.199.109.153
- **记录值**：185.199.110.153
- **记录值**：185.199.111.153

### 3. 等待 DNS 传播

- DNS 更改通常需要 5 分钟到 48 小时生效
- 可以使用工具检查 DNS 是否生效：
  - https://www.whatsmydns.net/#CNAME/www.bio-chain.cn
  - 或使用命令行：`nslookup www.bio-chain.cn`

### 4. 验证 DNS 配置

DNS 正确配置后，应该解析到：
```
www.bio-chain.cn → gusc007.github.io
```

### 5. 在 GitHub Pages 中保存

DNS 验证通过后：
1. 刷新 GitHub Pages 设置页面
2. "DNS Check in Progress" 应该变成绿色勾 ✓
3. Save 按钮会变为可点击状态
4. 点击 Save 保存

## 常见问题

### Q: Save 按钮一直禁用怎么办？

1. 检查 DNS 记录是否正确配置
2. 等待 DNS 传播（可能需要更长时间）
3. 尝试先 Remove 域名，然后重新添加
4. 检查 CNAME 文件是否在仓库根目录

### Q: DNS 验证失败？

1. 确认 CNAME 记录指向：`gusc007.github.io`
2. 确认记录类型是 CNAME（不是 A 记录）
3. 等待 DNS 传播完成
4. 清除浏览器缓存后重试

### Q: 支持不带 www 的域名吗？

需要同时配置：
- www.bio-chain.cn（CNAME → gusc007.github.io）
- bio-chain.cn（A 记录 → GitHub IP 地址）

## 临时解决方案

如果暂时无法配置 DNS，可以：

1. 先移除自定义域名（点击 Remove）
2. 使用 GitHub Pages 默认地址：https://gusc007.github.io/bio-chain-website
3. 等 DNS 配置完成后，再添加自定义域名

## 检查 DNS 配置的命令

```bash
# 检查 CNAME 记录
dig www.bio-chain.cn CNAME

# 或使用 nslookup
nslookup www.bio-chain.cn

# 应该看到指向 gusc007.github.io
```

