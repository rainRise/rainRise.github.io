---
title: React 基础知识点
published: 2026-04-24
description: '熟悉框架'
image: '/assets/desktop-banner/9.png'
tags: [自主学习]
category: '知识点'
draft: false 
lang: 'zh-CN'
---



# React 教程项目 - 新手学习日志

## 1) 项目整体思路（先看全局）

这个项目是一个 **React + Vite** 的入门 TodoList 示例，核心目标是让初学者理解：

1. React 组件如何拆分（`App`、`NewTodoForm`、`TodoList`、`TodoItem`）。
2. React 状态如何流动（父组件持有状态，子组件通过 props 调用父组件函数）。
3. 数据如何持久化（`localStorage` + `useEffect`）。
4. 样式如何组织（`styles.css` 统一管理）。
5. 工程化如何启动（`package.json` 脚本 + `vite.config.js` + `index.html` 入口）。

## 2) 按文件夹总结知识点

### `src/`

* 作用：放业务代码（组件、样式、入口）。
* 知识点：
  * 函数组件与 JSX。
  * `useState` 状态管理。
  * `useEffect` 处理副作用。
  * props 传值与事件回调上抛。
  * 列表渲染、受控组件、条件渲染。

### `public/`

* 作用：放静态资源（构建时原样拷贝）。
* 知识点：
  * 静态文件路径与浏览器直接访问。
  * SVG 作为图标资源的用法。

### `node_modules/`

* 作用：依赖安装目录（自动生成，通常不手改）。
* 知识点：
  * npm 包管理机制。
  * `dependencies` 与 `devDependencies` 区别。

## 3) 逐行代码注释（按文件）


### 文件：`index.html`

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React tutorial</title>
      </head>
      <body>
        <!-- React 挂载点：React 会把组件树渲染到这个节点。main.jsx就是在这个div上创建了React根节点 -->
        <div id="root"></div>
        <!-- React是一种单页应用，Single Page Application (SPA) -->
        <!-- 所以这一页html就是所谓的单页，所有你在React组件里写的内容实际上被添加到了这个html中 -->
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>

* * *

### 文件：`src/main.jsx`

    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    
    // 在html的root div上注册React根
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />//自闭合标签写法
      </React.StrictMode>
    )
    

* * *

### 文件：`src/App.jsx`

    import { useEffect, useState } from "react";
    import "./styles.css";
    
    // 引入其他组件
    import NewTodoForm from "./NewTodoForm";
    import TodoList from "./TodoList";
    
    //默认导出函数组件：定义一个可被其他文件直接导入使用的组件。
    export default function App() {
      // useState 用于在函数组件中添加状态
      // 它返回一个数组，其中包含当前状态的值和一个用于更新状态的函数
      // 通常，数组的第一个元素是当前状态的值，第二个元素是更新该状态的函数
      // 语法：const [state, setState] = useState(初始值或初始化回调)
      // 这种语法叫作解构，是一个JavaScript概念
      const [todos, setTodos] = useState(() => {
        // localStorage可以在浏览器的 F12 -> 应用 -> 本地存储空间 找到
        // 是一种键值对，利用键来索引值，比如这个例子中键是ITEM，值是localValue
        // 常用的方法为setItem(key, value)，getItem(key)和removeItem(key)
        const localValue = localStorage.getItem("ITEM");
    
        if (!localValue) return [];
        return JSON.parse(localValue); // JSON 反序列化：把字符串还原成 JavaScript 对象/数组,从stringify中解出来。
      });
    
      // useEffect 用于处理副作用，比如数据获取、监听、手动修改DOM等
      // 它接收一个函数作为参数，这个函数会在组件渲染之后执行
      // 在这个函数内，你可以执行任何副作用相关的操作
      // 语法：useEffect(() => {}, [依赖项数组])
      useEffect(() => {
        localStorage.setItem("ITEM", JSON.stringify(todos)); // 转为string好存入
      }, [todos]);
    
      // 这个方法用来添加Todo
      // 虽然声明在父组件中，但其实是在子组件NewTodoForm中被调用的
      // 因为调用的时候传入了title，所以好像我们从NewTodoForm中获得了title一样
      function addTodos(title) {
        setTodos((current) => [...current, { id: crypto.randomUUID(), title, completed: false }]);
      }
    
      // 用来更新给定id的Todo的完成状态为completed
      function toggleTodo(id, completed) {
        // 用setState的回调形式来更新，current是当前todos的值，记住它可是个数组
        setTodos((current) =>
          // 所以我们先对这个数组来进行遍历，每个todo是current中的每一项
          current.map((todo) => {
            // 如果遍历的过程中找到了我们所选的那个id，就更新它
            // 也就是返回更新后的值，...是传播运算符
            if (todo.id === id) return { ...todo, completed };
    
            // 不是我们选的那个todo就不管它
            return todo;
          })
        );
      }
    
      // 用来删除给定id的Todo
      function deleteTodo(id) {
        // 用setState的回调形式来更新，current是当前todos的值，记住它可是个数组
        // 利用filter来遍历，给定的条件是我们保留什么
        // 保留不是我们所选的todos，就意味着删除我们所选的todo
        setTodos((current) => current.filter((todo) => todo.id !== id));
      }
    
      return (
        // 这些内容叫JSX，是一种很类似html的东西但不是html
        // 语法也和html有许多不一样的地方，组件允许我们自定义，每个组件都是一个function
        // 所有JSX在返回的时候都要保证只有一个根，使用<></>来确保
        // <></>其实是<React.Fragment></React.Fragment>的简写
        <>
          <NewTodoForm addTodos={addTodos} />
    
          <h1 className="header">Todo List</h1>
    
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          //jsx标签属性不能加逗号
        </>
      );
    }
    
    
* * *

### 文件：`src/NewTodoForm.jsx`

    import { useState } from "react";
    
    // 参数其实是以一个叫props的对象传进来的，JavaScript对象指的是键值对
    export default function NewTodoForm({ addTodos }) {
      const [newItem, setNewItem] = useState("");
    
      function handleSubmit(e) {
        e.preventDefault(); // 防止form提交的默认行为（即刷新页面）
        if (newItem === "") return; // 防止用户提交空待办
    
        // 这个函数是在父组件App中注册的，但是在子组件中被调用了
        // 传入子组件的newItem，就好像在父组件中获得了它，并且可以对其进行操作
        addTodos(newItem);
    
        setNewItem(""); // 每次提交完都清空input
      }
    
      return (
        <form onSubmit={handleSubmit} className="new-item-form">
          <div className="form-row">
            <label htmlFor="item">New Item</label>
            {/*
             * input的值永远都是value字段的值，onChange可以监听用户输入事件
             * 用户的输入被监听后，利用setState更新input的value就实现了页面的交互
             * 又把更新后的值（state）留在了本组件中，以用来提交
             */}
            <input type="text" id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          </div>
    
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      );
    }
    
    
    

* * *

### 文件：`src/TodoItem.jsx`

    import React from "react";
    
    结构todo的所有字段，传入是用{...todo}的形式
    export default function TodoItem({ id, title, completed, toggleTodo, deleteTodo }) {
      return (
        <li>
          <label>
            {/* 参考NewTodoForm组件中的讲解 */}
            <input type="checkbox" checked={completed} onChange={(e) => toggleTodo(id, e.target.checked)} /> {title}
          </label>
          <button onClick={() => deleteTodo(id)} className="btn btn-danger">
            Delete
          </button>
        </li>
      );
    }
    
    
    
    

* * *

### 文件：`src/TodoList.jsx`

    import TodoItem from "./TodoItem";
    
    export default function TodoList({ todos, toggleTodo, deleteTodo }) {
      return (
        <>
          {todos.length === 0 && <div>No todos</div>}
    
          <ul className="list">
            {todos.map((todo) => (
              // 因为传入的props是一个对象（键值对），同名又可以合并键值
              // 所以{...todo}就等同于将整个todo对象作为props对象传入
              // 在TodoItem中就可以顺理成章地解构出todo的所有字段
              <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            ))}
          </ul>
        </>
      );
    }
    
    
    

## 4) 你可以重点复习的 React 关键词

* 组件化
* props
* state
* useState
* useEffect
* 受控组件
* 条件渲染
* 列表渲染
* 单向数据流
* 状态上移