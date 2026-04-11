---
title: aidiary基础知识点
published: 2026-04-11
description: '熟悉框架'
image: '/assets/desktop-banner/6.jpg'
tags: [自主学习]
category: '知识点'
draft: false 
lang: 'zh-CN'
---

# - **前端**

# ***Figma***
### 基于浏览器的UI设计工具；多人实时编辑；直接分享链接

# ***Motion Spec***
### 文字描述或小动画,这个界面元素要怎么动、怎么出现、怎么消失。

# ***React***
### 通过组件化方式开发单页应用程序（SPA）

# ***TypeScript(TS)***
### 带类型系统、更安全、更智能、更适合大型项目的 JavaScript。给JS加上类型，减少错误，有类型错误当场报错

# ***Vite***
### 前端构建工具，创建React+TS项目

# ***Zustand/Redux***
### 状态管理库（保管前端自己的数据，即客户端状态）。提供集中式存储、更新机制、调试工具的专用库。（存储当前编辑的日记内容、用户信息）
- 状态：应用在特定时间点的数据快照（用户信息，UI状态，业务数据）
- 状态管理：集中管理应用状态

# ***React Query/SWR***
### 数据请求与缓存库（保管后端接口的数据，即服务端状态）：自动缓存+后台刷新+状态托管（获取数据列表、心情日历数据）

# ***Cypress***
### 前端自动化测试工具：模拟人操作网页

# ***富文本编辑器TipTap/Slate***
### 网页版简易word，可在输入框直接排版文字

# ***ECharts/FullCalendar***
### ECharts：可视化图表
### FullCalendar：日历组件库

# ***Framer Motion/Lottie***
### Framer Motion：给react组件添加动效
### Lattie：播放JSON动画（助手表情）

---
# - **后端**
# ***REST API***
### 让前端和后端用统一的方式增删改查。
### URL表示数据、对象，HTTP方法表示操作，JSON表示前后端交流的常用数据格式语言

# ***Node.js***
### 让JS可以运行在浏览器之外、可以直接在电脑/服务器上跑的工具

# ***NestJS/Fastify***
### -Fastify：高性能的Node.jsWeb框架
### -NestJS：企业级后端框架，底层可跑在Fastify上

# ***PostgreSQL***
### 比MySQL好用的数据库

# ***Redis***
### 内存数据库，可做缓存或队列
- 做缓存：把常用数据放内存，速度快
- 做队列：任务排队，慢慢处理

# ***JWT***
### 登录凭证：登录成功后，后端发送token给前端，之后前端每次请求接口都带着token，后端验证成功

---
# - **AI与向量库**
# ***embedding***
### 向量化，把一段文本转换为一组数字，便于比较相似度。

# ***Qdrant***
### 一个开源向量数据库，用于存储和检索向量embedding，常用于ai应用中相似性搜索。

# ***RAG***
### 检索增强生成。先检索相关日记，再把结果交给GPT生成答案。