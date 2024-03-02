# Vite 起步

[TOC]

## 1 Vite 的优点

### 1.1 服务启动时间

[webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/) 和 [Parcel](https://parceljs.org/) 等工具的出现推动了前端项目的模块化，但是在项目规模越来越大时，启动时间和热更新时间都变得很慢，Vite 在启动项目时，会将应用中的模块区分为 **依赖** 和 **源码** 两类，改进了开发服务器启动时间

-   **依赖** 使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://cn.vitejs.dev/guide/dep-pre-bundling.html)。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍

-   **源码** 通常是一些需要转换的文件（例如 vue 组件，jsx 等等），而且相比依赖，源码的修改频率会很高。当然也不是所有源码都要同时被加载（例如路由模块，我们期望的效果是只加载当前路由模块）

### 1.2 热重载稳定性

> **热重载（HMR）**是指在项目文件发生更改时不用重新构建完整的项目，而是只替换一个模块

前端现有的打包器之所以存在，是因为 JS 最初没有原生的模块化机制，虽然已经实现了热重载，但在实践中随着项目规模的变大也经常出现**更新速度下降**和**状态丢失**等问题。

浏览器开始原生支持 ES 模块后 Vite 应运而生，依赖浏览器原生功能可以更精确地实现热重载，无论项目规模大小如何，都能始终保持快速更新

Vite 同时利用 HTTP 头来加速整个页面的重新加载

-   **依赖** 根据 `304 Not Modified` 进行协商缓存

-   **源码** 通过 `Cache-Control: max-age=31536000,immutable` 进行强缓存

## 2 开始

### 2.1 新建项目

-   更新 npm 到 7.0 以上版本 ` npm install -g npm`

-   根据需要选择一个模板创建项目，以 vue 为例 `npm init vite@latest my-app -- --template vue`

-   模板名的可选值为：`vanilla`，`vanilla-ts`，`vue`，`vue-ts`，`react`，`react-ts`，`preact`，`preact-ts`，`lit`，`lit-ts`，`svelte`，`svelte-ts`

-   安装依赖 `npm i`

-   启动项目 `npm run dev`

### 2.1 启动项目

-   启动开发服务器 `npm run dev`
-   打包 `npm run dev`
-   预览生产环境（需要先打包） `npm run serve`

## 3 CSS Modules

任何以 `.module.css` 为后缀名的 CSS 文件都被认为是一个 [CSS modules 文件](https://github.com/css-modules/css-modules)。导入这样的文件会返回一个相应的模块对象：

```css
/* example.module.css */
.red {
    color: red;
}
```

```js
import classes from './example.module.css';
document.getElementById('foo').className = classes.red;
```

## 4 静态资源处理

-   导入一个静态资源会返回可用的 URL

    ```js
    import imgUrl from './img.png';
    document.getElementById('my-img').src = imgUrl;
    ```

-   也可以使用参数控制返回的类型

    -   返回 url

        ```js
        import assetAsURL from './asset.js?url';
        ```

    -   返回 raw 字符串

        ```js
        import assetAsString from './shader.glsl?raw';
        ```

## 5 Glob 导入

Vite 支持通配符形式导入模块

-   默认会使用懒加载的方式导入多个模块

    ```js
    // 项目中使用方式
    const modules = import.meta.glob('./dir/*.js');

    // vite 生成的代码
    const modules = {
        './dir/foo.js': () => import('./dir/foo.js'),
        './dir/bar.js': () => import('./dir/bar.js'),
    };
    ```

    访问模块也很方便

    ```js
    for (const path in modules) {
        modules[path]().then((mod) => {
            console.log(path, mod);
        });
    }
    ```

-   如果不想动态导入，而是想一次性直接引入所有，可以使用以下方式

    ```js
    // 项目中使用方式
    const modules = import.meta.globEager('./dir/*.js');

    // vite 生成的代码
    import * as __glob__0_0 from './dir/foo.js';
    import * as __glob__0_1 from './dir/bar.js';
    const modules = {
        './dir/foo.js': __glob__0_0,
        './dir/bar.js': __glob__0_1,
    };
    ```

    > 路径必须以 `./` 或者 `/` 开头
