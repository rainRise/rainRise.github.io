=================================================================
项目根目录文件说明
=================================================================

📁 文件/目录                         说明
───────────────────────────────────────────────────────────────

📁 .astro/                          Astro 编译缓存目录（开发时自动生成）
📁 .github/                         GitHub 配置目录
   ├─ workflows/                    GitHub Actions 自动部署脚本
   ├─ ISSUE_TEMPLATE/              GitHub Issues 模板
   ├─ pull_request_template.md     PR 模板
   └─ dependabot.yml                依赖自动更新配置

📁 .vscode/                        VS Code 编辑器配置

📁 content/                        内容同步源目录（链接到 src/content）

📁 docs/                           项目文档目录

📁 myblog/                         Hugo 博客目录（备用/测试用）

📁 node_modules/                   Node.js 依赖包目录

📁 public/                         静态资源目录（图片、字体等）
   ├─ assets/                      资源文件（封面图、字体、光标等）
   ├─ favicon/                     网站图标
   ├─ pio/                        看板娘资源
   └─ scroll-protection.js        滚动保护脚本

📁 scripts/                        构建脚本目录
   ├─ sync-content.js              内容同步脚本
   ├─ update-anime.mjs             番剧数据更新脚本
   ├─ compress-fonts.js            字体压缩脚本

📁 src/                            源代码目录（主要开发目录）
   ├─ components/                  组件目录
   ├─ config.ts                    网站配置文件
   ├─ content/                     文章内容目录
   │   ├─ posts/                   博客文章（.md 文件）
   │   └─ spec/                    特殊页面（关于、友链等）
   ├─ layouts/                     页面布局
   ├─ pages/                       页面路由
   ├─ styles/                      样式文件
   └─ utils/                       工具函数

───────────────────────────────────────────────────────────────

📄 .env.example                    环境变量示例文件
📄 .gitattributes                   Git 属性配置
📄 .gitignore                      Git 忽略文件配置
📄 .npmrc                          npm/pnpm 配置
📄 .prettierignore                 Prettier 忽略配置
📄 .prettierrc.js                  Prettier 代码格式化配置
📄 _frontmatter.json               文章模板配置
📄 astro.config.mjs                Astro 主配置文件
📄 LICENSE                         项目许可证（ GPL-3.0）
📄 LICENSE.MIT                     许可证文件
📄 logo.png                        项目 Logo 图片
📄 package.json                    项目依赖配置
📄 pagefind.yml                    搜索配置
📄 pnpm-lock.yaml                  依赖锁定文件
📄 pnpm-workspace.yaml             pnpm 工作区配置
📄 postcss.config.mjs              PostCSS 配置
📄 README.md                       项目说明文档
📄 svelte.config.js                Svelte 配置
📄 tailwind.config.cjs             Tailwind CSS 配置
📄 tsconfig.json                   TypeScript 配置
📄 vercel.json                     Vercel 部署配置
📄 deploy.log                      部署日志

───────────────────────────────────────────────────────────────

📌 日常使用重点：
- 写文章 → src/content/posts/*.md
- 放图片 → public/assets/
- 改配置 → src/config.ts
- 推送发布 → git add . && git push
=================================================================