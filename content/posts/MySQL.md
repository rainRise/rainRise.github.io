---
title: mysql基本命令
published: 2026-04-09
description: '熟悉mysql'
image: 'C:\Users\19160\OneDrive\Desktop\CodeStudy\Mizuki-main-taskDemo\public\assets\desktop-banner\3.png'
tags: [题目]
category: '工具'
draft: false 
lang: 'zh-CN'
---

## 如何启动MySQL
打开cmd，输入：mysql -uroot -p

## 数据库操作：
### 1.查看所有数据库：
show databases；
### 2.创建数据库：
create database 库名 default charset utf8mb4；
### 3.切换到指定数据库：
use 库名；
### 4.查看当前所在数据库：
select database()；
### 5.删除数据库：
drop database 库名；

## 数据增删改查：
### 1.插入数据：
insert into 表名 values();
### 2.查询数据：
select * from 表名 where ；
### 3.分页查询(limit 起始行，条数)：
select * from 表名 limit 0，10；
### 4.排序查询(asc升序,desc降序)：
select * from 表名 order by desc；
### 5.删除数据：
delete from 表名 where ；