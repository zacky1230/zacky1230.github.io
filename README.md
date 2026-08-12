# Zacky's Blog

这是 [www.zctech88.com](https://www.zctech88.com/) 的 Hexo 源码工程。

站点使用 Hexo 7.3.0、Icarus 6.1.1 和 Node.js 24.11。推送到 `master` 后，GitHub Actions 会构建 `public/` 并发布到 GitHub Pages。

## 第一次运行

推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node.js：

```bash
nvm install
nvm use
npm ci
```

## 写一篇新文章

```bash
npm run new -- "文章标题"
```

然后编辑 `source/_posts/文章标题.md`：

```yaml
---
title: 文章标题
date: 2026-08-12 16:00:00
updated: 2026-08-12 16:00:00
categories:
  - 技术
tags:
  - Hexo
---
```

`<!-- more -->` 之前的内容会显示为首页摘要。

## 本地预览和检查

```bash
npm run server
```

浏览器打开 <http://localhost:4000/>。发布前运行一次完整构建：

```bash
npm run check
```

生成结果位于 `public/`，该目录不会提交到 Git。

## 发布

第一次启用新流程时，在 GitHub 仓库执行一次：

1. 打开 **Settings → Pages**。
2. 将 **Build and deployment → Source** 改成 **GitHub Actions**。
3. 提交并推送源码：

```bash
git add .
git commit -m "Rebuild blog with Hexo 7"
git push origin master
```

之后每次推送 `master` 都会自动发布。也可以在 GitHub 的 **Actions → Deploy Hexo to GitHub Pages** 中手动运行。

自定义域名由 `source/CNAME` 保留，构建后会自动出现在站点根目录。

## 目录说明

- `source/_posts/`：文章源码。
- `source/about/`：关于页面。
- `_config.yml`：Hexo 站点和 URL 配置。
- `_config.icarus.yml`：主题、导航和侧栏配置。
- `.github/workflows/pages.yml`：自动发布流程。
- 仓库根目录原有的 HTML：旧发布产物，迁移完成前暂时保留，日常不要直接编辑。

旧文章是从历史静态页面恢复的，因此正文内部主要保留为 HTML，以尽量避免代码块、图片和锚点损坏。新文章可以直接使用标准 Markdown。
