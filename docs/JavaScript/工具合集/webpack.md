# webpack-基础

### 1. 文档

- 官网： [https://webpack.js.org/](https://webpack.js.org/)

![webpack打包流程](http://qn.30mi.com/markdown/webpack/1.png)

> Webpack 是一个打包模块化 js 的工具，它会从入口模块出发，识别出源码中的模块化导入语句，递归地找到入口文件的所有依赖，将入口和其所有的依赖打包到一个单独的文件中，是工程化，自动化思想在前端开发中的体现。

### 2. 安装

#### 2.1 环境准备

**nodeJs**官网下载最新稳定版 https://nodejs.org/en/

#### 2.2 安装 webpack

- 全局安装 `不推荐`

```js
### 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
### 检查版本
webpack -v
### 卸载
npm uninstall webpack webpack-cli -g
```

> 全局安装 webpack 会将项目中的 webpack 锁定在指定版本，不同项目中 webpack 依赖版本不同的话就会造成冲突，导致构建失败

- 项目安装 `推荐`

```js
### 安装最新的版本 稳定版本推荐4.43.0
npm i -D webpack@<version>
### 安装webpack V4+版本时，需要额外安装webpack-cli 稳定版本推荐3.3.12
npm i -D webpack-cli@<version>
```

- 检查安装

```js
### 如果是项目安装会提示 command not found ，因为默认在全局环境中查找
webpack -v
### npx帮助我们在项⽬中的node_modules⾥查找webpack，没有则会安装
npx webpack -v
### 到当前的node_modules模块⾥指定webpack
./node_modules/.bin/webpack -v
```

### 3. 启动 webpack 执行构建

#### 3.1 webpack 默认配置

- webpack 默认支持`js`和`json`模块
- 支持`CommonJS` `Es moudule` `AMD`等模块类型
- webpack4 支持**零配置**使用，但是很弱，建议自己配置

#### 3.2 准备执行构建

- 根目录新建`src`文件夹
- `src`文件夹下新建文件`index.js`、`index.json`、`other.js`

```js
### index.js
const json = require("./index.json");//CommonJS
import { add } from "./other.js";//Es module
console.log(json, add(2, 3));
### index.json
{
 "name": "JOSN"
}
### other.js
export function add(n1, n2) {
 return n1 + n2;
}
```

#### 3.3 执行构建

```js
# npx⽅式
npx webpack
# npm script
npm run test
```

## 4 打包公共库
# 打包公共库

### library

如果我们打包的目的是生成一个供别人使用过的库，那么可以通过`output.library`来指定库的名称

```js
module.exports = {
    output: {
        library: 'myLib', // 名称支持占位符和普通字符串
    },
};
```

### libraryTarget

确定库名称后，可以使用`output.libraryTarget`来指定打包出来的规范，可选值为var、assign、this、window、global、commonjs、commonjs2、commonjs-module、amd、umd、umd2、jsonp

```js
// webpack.config.js
module.exports = {
    output: {
        library: 'libName', // 名称支持占位符和普通字符串
        libraryTarget: 'var', // 默认var
    },
};

// 可选值：var、assign、this、window、global、commonjs、commonjs2、commonjs-module、amd、umd、umd2、jsonp

// var - output
var myLib = (function(module) {})({
    './src/idnex.js': function(module, exports) {},
});

// assign - output
myLib = (function(module) {})({
    './src/idnex.js': function(module, exports) {},
});

// this - output
this['myLib'] = (function(module) {})({
    './src/idnex.js': function(module, exports) {},
});

// global - output  如果是web环境，则回挂载在window上
global['myLib'] = (function(module) {})({
    './src/idnex.js': function(module, exports) {},
});

// commonjs - output
exports['myLib'] = (function(module) {})({
    './src/idnex.js': function(module, exports) {},
});

// amd - output
define('myLib', [], function() {
    return (function(module) {})({
        './src/idnex.js': function(module, exports) {},
    });
});

// umd - output 不是上述的单一规范，而是通用的，用户使用的时候可选多种规范，比较推荐
!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports.addNumber = t())
        : (e.addNumber = t());
})(self, function() {
    return (() => {
        // ...
    })();
});
```

### externals

### target

项目中我们可能开发的不仅是web端，也可能是Node应用，或者electron这类跨平台桌面应用，这时候就可以通过target来指定宿主环境

```js
module.exports = {
    target: 'web' // 默认web，可以省略
};
```

### 打包未压缩版与压缩版

1. 首先需要打包两次，因此在entry中定义两次

   ```js
   module.exports = {
     entry: {
       "add-number": "./src/index.js",
       "add-number.min": "./src/index.js",
     },
     mode: "none", // 由于一个文件压缩，一个不压缩，所以关闭默认的压缩模式。否则会报warning
   }
   ```

2. 安装压缩插件，以便之后指定压缩一个文件

   ```
   npm install terser-webpack-plugin@4.2.0 -D
   ```

3. 配置压缩

   ```js
   const TerserPlugin = require("terser-webpack-plugin");
   
   module.exports = {
     optimization: {
       minimize: true, // 是否开启压缩
       minimizer: [
         new TerserPlugin({ test: /\.min\.js/ }),
       ],
     },
   };
   ```

### 发布流程

1. `npm login` 登录npm账号

2. 如果npm源是淘宝的话可能会无法登录，建议换回npm源

    `npm config set registry https://registry.npmjs.org`

3. `npm publish`

4. 更新的时候要更改version版本号

5. 在npmjs.com查询是否可以查询得到发布的包

