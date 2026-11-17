# RSI Notes

从一次改进到下一轮研究：基于 B0–L5 自主权框架的中文研究博客。

计划公开地址：https://zta20040910.github.io/rsi-notes/

## 内容

- 首页：RSI 定义的符号化摘要、六层导航、三个重点判断。
- B0–L5：六篇层级导读与具体机制的分层依据。
- Naive、Recursive First Steps、Flint、Apex：四篇“成果—机制—理解与取舍”案例。
- 六条 insight 与统一来源页。
- Flint 原生折叠机制演示、深浅色主题、文章目录和响应式布局。

定义依据 arXiv:2609.11873v3；案例材料核验截至 2026-11-17。符号公式是对文字定义的自行抽象。作者报告、公开数字复核、个人分析和条件推测分别注明；未执行模型训练或性能复测。

## 本地开发

使用 Node.js 24（最低版本要求见 package.json）：

```sh
npm ci
npm run dev
npm run build
npm run verify
```

构建输出在 `dist/`。开发地址使用终端输出的网址，加项目路径 `/rsi-notes/`。

## 发布

GitHub Pages 使用 GitHub Actions。推送 `main` 后，`.github/workflows/deploy.yml` 执行锁定依赖安装、Astro 类型/构建检查和静态链接检查，再上传 Pages 产物。仓库 Pages 的构建源设置为 GitHub Actions。

修改仓库名时，同时更新 `astro.config.ts` 的 `base`、正文中的站内链接和检查脚本中的 `BASE`。

## 维护位置

- `src/content/posts/`：案例正文。
- `src/content/levels/`：层级正文。
- `src/content/pages/`：insight 与来源。
- `src/pages/index.astro`：首页。
- `src/styles/site.css`：视觉与响应式样式。
- `scripts/check_site.py`：生成页面、站内链接、锚点和资源检查。

## 模板来源

项目以 [AstroPaper](https://github.com/satnaing/astro-paper) 的源码快照（package version 7.2.0，2026-11-17 获取）为起点，进行研究专题改造，替换默认示例内容、路由和阅读界面，并精简依赖。保留上游 MIT 许可证 `LICENSE`。未包含本地作业邀请或未公开核验笔记。
