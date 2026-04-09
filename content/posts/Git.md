---
title: 上传文件到GitHub指定仓库
published: 2026-04-09
description: '文章描述'
image: '/assets/desktop-banner/5.jpeg'
tags: [自主学习]
category: 工具
draft: false
lang: 'zh-CN'
---


## 一、GitHub上已有这个文件的仓库
### 1.进入该文件目录，进入cmd
### 2.克隆 GitHub 仓库
git clone https://github.com/你的用户名/你的仓库名.git
### 3.查看状态
git status
### 4.把所有修改加入暂存
git add .
### 5.提交（必须写描述,""内必须有内容）
git commit -m "."
### 6.推送到 GitHub 指定仓库
git push

## 二、GitHub上还没有这个文件的仓库
### 1.进入该文件目录，进入cmd
### 2.初始化仓库（生成 .git 文件夹）
git init
### 3.替换为 GitHub 仓库地址
git remote add origin https://github.com/你的用户名/你的仓库名.git
### 4.验证远程地址
git remote -v
### 5.查看状态：
git status
### 6.把所有修改加入暂存：
git add .
### 7.提交（必须写描述,""内必须有内容）
git commit -m "."
### 8.推送到 GitHub 指定仓库
git push
