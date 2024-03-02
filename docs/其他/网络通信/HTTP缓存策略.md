# HTTP缓存策略原理



> 缓存的原理是在客户端**首次请求**后保存一份请求资源的**响应副本**存储在客户端中，当用户再次发起相同的请求后，如果判断缓存命中则**拦截请求**，将之前缓存的响应副本返回给用户，从而避免重新向服务器发起资源请求

## 前言

缓存的技术种类有很多，比如**代理缓存**，**浏览器缓存**，**网关缓存**，**负载均衡器**及**内容分发网络**等，大致可以分为两类，**共享缓存**和**私有缓存**。

**共享缓存**指的是缓存内容可以被**多个用户**使用，如公司内部架设的Web代理，**私有缓存**是只能由**单个用户**使用的缓存，如Cookie等浏览器缓存。

**HTTP缓存**是前端开发中最常接触的缓存机制之一，他又可细分为**强制缓存**与**协商缓存**，二者最大的区别在于判断缓存命中时浏览器是否需要向服务器进行询问。

强缓存不会去询问，协商缓存则需要询问服务器。

## 一、新建项目

-   新建一个页面 `index.html`，在其中使用图片资源

-   新建一个文件 `index.js`

    ```js
    const Koa = require('koa');
    const fs = require('fs');
    const path = require('path');
    const mimes = {
        css: 'text/css',
        less: 'text/css',
        gif: 'image/gif',
        html: 'text/html',
        ico: 'image/x-icon',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        js: 'text/javascript',
        json: 'application/json',
        pdf: 'application/pdf',
        png: 'image/png',
        svg: 'image/svg+xml',
        swf: 'application/x-shockwave-flash',
        tiff: 'image/tiff',
        txt: 'text/plain',
        wav: 'audio/x-wav',
        wma: 'audio/x-ms-wma',
        wmv: 'video/x-ms-wmv',
        xml: 'text/xml',
    };

    // 获取文件的类型
    function parseMime(url) {
        // path.extname获取路径中文件的后缀名
        let extName = path.extname(url);
        extName = extName ? extName.slice(1) : 'unknown';
        return mimes[extName];
    }

    // 将文件转成传输所需格式
    const parseStatic = (dir) => {
        return new Promise((resolve) => {
            resolve(fs.readFileSync(dir), 'binary');
        });
    };

    const app = new Koa();

    app.use(async (ctx) => {
        const url = ctx.request.url;
        if (url === '/') {
            // 访问根路径返回index.html
            ctx.set('Content-Type', 'text/html');
            ctx.body = await parseStatic('./index.html');
        } else {
            const filePath = path.resolve(__dirname, `.${url}`);
            // 设置类型
            ctx.set('Content-Type', parseMime(url));
            // 设置传输
            ctx.body = await parseStatic(filePath);
        }
    });

    app.listen(8000, () => {
        console.log('服务已启动：http://localhost:8000');
    });
    ```

-   启动本地服务 `node index.js`

## 二、强缓存

### 2.1 什么是强缓存

-   **强缓存**是在一段时间内重复请求某资源时会走**本地缓存**，由以下参数的**其中一个**决定**资源过期时间**

    -   `Expires`（出现于 HTTP1.0）
    -   `Cache-Control`（出现于 HTTP1.1，优先级高）

-   缓存**参数**应当设置**在服务端**资源处理逻辑中，代码位置如下所示

    ```js
    // 设置类型
    ctx.set('Content-Type', parseMime(url));
    // 此处设置缓存参数
    ...
    // 设置传输
    ctx.body = await parseStatic(filePath);
    ```

-   缓存资源的请求状态码是 `200 OK (from memory cache)`

-   缓存资源的请求**不经过服务器**

### 2.2 Expires

`Expires` 的值是**绝对过期时间**，**单位毫秒**，下述代码效果是首次请求的 30 秒内走本地缓存

```js
const time = new Date(Date.now() + 30000).toUTCString();
ctx.set('Expires', time);
```

### 2.3 Cache-Control

`Cache-Control`的值是**相对过期时间**，**单位是秒**，下述代码效果是首次请求的 30 秒内走本地缓存

```js
ctx.set('Cache-Control', 'max-age=30');
```

## 三、协商缓存

### 3.1 什么是协商缓存

-   **协商缓存**需要判断是否**命中缓存**，由以下参数的**其中一对**决定缓存策略
    -   `Last-Modified，If-Modified-Since`
    -   `Etag，If-None-Match`（优先级高）
-   缓存资源的请求状态码是 `304 Not Modified`
-   缓存资源的请求**经过服务器**判断后才会走本地缓存

### 3.2 Last-Modified，If-Modified-Since

-   第一次请求资源时**服务端**会把资源的**最后修改时间**作为**响应头**中`Last-Modified`的值，浏览器会**自动保存在本地**

-   **浏览器**在下次请求时会将保存的值**自动**附在`If-Modified-Since`参数中，**服务端**拿到这个值跟资源的最后修改时间进行**比对**

-   比对结果**相同**则说明此资源没修改过，那就是**命中缓存**，那就**返回 304**

-   比对结果**不同**则说明此资源修改过了，则**未命中缓存**，则**返回资源**

-   示例代码如下所示

    ```js
    // 获取文件信息
    const getFileStat = (path) => {
        return new Promise((resolve) => {
            fs.stat(path, (_, stat) => {
                resolve(stat);
            });
        });
    };
    
    app.use(async (ctx) => {
        const url = ctx.request.url;
        if (url === '/') {
            // 访问根路径返回index.html
            ctx.set('Content-Type', 'text/html');
            ctx.body = await parseStatic('./index.html');
        } else {
            const filePath = path.resolve(__dirname, `.${url}`);
            const ifModifiedSince = ctx.request.header['if-modified-since'];
            const fileStat = await getFileStat(filePath);
            ctx.set('Content-Type', parseMime(url));
            // 比对时间，mtime为文件最后修改时间
            if (ifModifiedSince === fileStat.mtime.toGMTString()) {
                ctx.status = 304;
            } else {
                ctx.set('Last-Modified', fileStat.mtime.toGMTString());
                ctx.body = await parseStatic(filePath);
            }
        }
    });
    ```

### 3.3 Etag，If-None-Match

-   判断是否命中的流程与 `Last-Modified，If-Modified-Since` 是一样的，只是对比的值变为资源 **hash**

-   示例代码如下所示

    ```js
    const crypto = require('crypto');
    
    app.use(async (ctx) => {
        const url = ctx.request.url;
        if (url === '/') {
            // 访问根路径返回index.html
            ctx.set('Content-Type', 'text/html');
            ctx.body = await parseStatic('./index.html');
        } else {
            const filePath = path.resolve(__dirname, `.${url}`);
            const fileBuffer = await parseStatic(filePath);
            const ifNoneMatch = ctx.request.header['if-none-match'];
            // 生产内容hash值
            const hash = crypto.createHash('md5');
            hash.update(fileBuffer);
            const etag = `"${hash.digest('hex')}"`;
            ctx.set('Content-Type', parseMime(url));
            // 对比hash值
            if (ifNoneMatch === etag) {
                ctx.status = 304;
            } else {
                ctx.set('etag', etag);
                ctx.body = fileBuffer;
            }
        }
    });
    ```

## 四、禁用缓存

-   浏览器临时禁用

    有时出于调试目的，或者设置的缓存时间过久，想**提前取消缓存**，可以在浏览器的 `Network` 中勾选 `Disable cache` ，**刷新**后再**取消勾选**即可

-   服务端响应头参数 `Cache-Control` 控制

    | Cache-Control 值 | 说明                                                               |
    | ---------------- | ------------------------------------------------------------------ |
    | `no-cache`       | 跳过强缓存（**默认值**，不需要手动配置，是**协商缓存的前置条件**） |
    | `no-store`       | 禁止所有缓存                                                       |
    | `public`         | 可以被所有用户缓存，包括终端用户和 CDN 等中间件代理服务器          |
    | `private`        | 只允许终端用户的浏览器缓存，不允许其他中间代理服务器缓存           |
