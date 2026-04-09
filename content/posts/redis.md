---
title: redis基本命令
published: 2026-04-09
description: '熟悉redis'
image: 'C:\Users\19160\OneDrive\Desktop\CodeStudy\Mizuki-main-taskDemo\public\assets\desktop-banner\2.png'
tags: [题目]
category: '工具'
draft: false 
lang: 'zh-CN'
---

## 如何启动redis
在redis解压目录下启动cmd后，输入：redis-serve.exe redis.windows.conf，启动后不要关闭该窗口，同样步骤启动新cmd窗口。

## redis常用命令
### 1.打开客户端：
redis-cli
### 2.测试是否连通：
ping
### 3.查看redis信息：
info
### 4.退出客户端：
exit
### 5.关闭 Redis 服务：
shutdown

## 增删改查
### 1.存数据：
set 键名 值
### 2.取值：
get 键名
### 3.查看所有键：
keys *
### 4.删除键：
del 键名
### 5.清空当前库所有数据：
flushdb
### 6.清空所有库所有数据：
flushall
