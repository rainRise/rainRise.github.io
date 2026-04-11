---
title: Python基础
published: 2026-04-10
description: '文章描述'
image: '/assets/desktop-banner/6.jpg'
tags: [自主学习]
category: 语言
draft: false
lang: 'zh-CN'
---

### 1.使用''' ... '''指定多行字符串
'''第一行
第二行
第三行'''
### 2.Python的布尔值：True,False
### 3.标识符第一个字符必须是下划线或者字母，其余字符可以是下划线、字母、数字
### 4.python没有头文件，也不用声明变量
### 5.try-except：
```python
try:
  i=10
  print(60/(i-10))
except Exception as e:
  print(e)
finally:
  print("执行完成！")
```
### 6.列表名.sort()：升序排序  ； 列表名.reverse()：降序排序
### 7.for语句和enumerate函数同时遍历列表元素索引与值：
```python
list=['1', '2', '3', '4', '5', '6']
for index, value in enumerate(list):
  print("第%d个元素值是[%s]" %(index, value))
```
### 8.二维列表

