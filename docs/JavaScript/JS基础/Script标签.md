# Script 标签

## 标签属性

### `src`（来源）

- **作用**：指定脚本文件的 URL。当设置了 `src` 属性时，`<script>` 标签内部的 JavaScript 代码将被忽略。
- **示例**：`<script src="script.js"></script>`

### `type`（类型）

- **作用**：指定脚本的 MIME 类型。浏览器默认将视为 JavaScript
- **示例**：`<script type="text/javascript"></script>`
- **注意**：在使用模块化 JavaScript 时，可以将此属性设置为 `"module"`，这将对脚本进行特殊处理，如允许使用 `import` 和 `export` 语句。

### `async`（异步）

- **作用**：表明脚本将异步加载，这意味着脚本的加载和执行将不会阻塞 HTML 的解析，从而提高页面加载性能。每个加载完成后脚本会立刻执行，不保证多个异步脚本的执行顺序。适用于那些不依赖其他脚本且其他脚本也不依赖于它的情况。
- **示例**：`<script async src="script.js"></script>`

### `defer`（延迟）

- **作用**：表明脚本将异步加载，但会等待文档完全解析和显示之后延迟执行。`defer` 属性仅对具有 `src` 属性的外部脚本有效，且这些脚本将保持它们在文档中出现的顺序执行。
- **示例**：`<script defer src="script.js"></script>`

### `integrity`（完整性）

- **作用**：允许浏览器验证外部脚本的完整性，确保脚本未被篡改。若接收到的资源签名与指定签名不匹配，则页面报错，脚本不执行。该属性确保 CDN 不提供恶意内容。
- **示例**：`<script integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6Q5hS2U4TcXJWVX3pCJI=" src="script.js"></script>`

### `crossorigin`（跨源）

- **作用**：配置与脚本相关的跨源请求。比如要加载CDN之类的跨域脚本时会使用到。使用 `crossorigin` 后，请求资源时会携带Origin属性，要求服务器进行 CORS 校验。
- **值**：
  - `"anonymous"`：
    - 跨源请求将会发生，但不会发送用户凭据（如 `cookies` 或 `HTTP 认证信息`）
    - 如果请求的资源不需要凭证，或者服务器配置了适当的 CORS 头（`Access-Control-Allow-Origin`），那么浏览器将允许加载并使用这些资源
    - 如果 CORS 请求失败，浏览器将阻止资源的加载
  - ``"use-credentials"`
    - 此时跨源请求会包含用户凭据
    - 服务器需要设置 `Access-Control-Allow-Origin` 头（不能为 `*`），还需要配置 `Access-Control-Allow-Credentials` 头为 `true`，以表明凭证是被允许的
    - 如果任何一个条件不满足，浏览器将阻止资源的加载
  - 不设置：
    - 如果不设置 `crossorigin`，浏览器将按照**同源策略**进行资源加载
- **示例**：`<script crossorigin="anonymous" src="script.js"></script>`

> 如果没有设置 `crossorigin` 属性，跨源 `<script>` 请求默认不会发送凭证，且如果脚本引发了错误，这些错误详情不会被暴露给 `window.onerror` 回调函数，为了安全考虑，你只会得到一个 "脚本错误" 的消息而不是具体的错误详情。
>
> 通过适当配置 `crossorigin` 属性和服务器上的 CORS 设置，可以确保资源按预期安全加载，同时还能在发生错误时获取足够的调试信息。这对于使用 CDN 加载资源和构建包含多个不同来源资源的复杂应用尤为重要。

### `charset`（字符集）

- **作用**：指定脚本的字符编码。尽管大多数现代网页都使用 UTF-8 编码，此属性可用于明确指定脚本使用的字符集。
- **示例**：`<script charset="UTF-8"></script>`
- **注意**：此属性在现代 Web 开发中不常用，因为字符集通常在 HTTP 头部或文档的 `<meta>` 标签中指定。

### `language`（语言）

- **作用**：用于指定脚本编写的语言（如 JavaScript）。现不推荐使用，因为 `type` 属性足够指定脚本类型。
- **注意**：此属性已被废弃，不应再使用。

## 使用方法

1. 直接在网页中嵌入 JavaScript 代码：

   ```html
   <script>
       function sayHi() {
           console.log("Hi!");
       }
   </script>
   ```

   嵌入的代码将按顺序解释。在上述示例中，解释的是一个函数定义，该函数将被保存在解释器环境中。

2. 包含外部 JavaScript 文件：

   通过 `src` 属性指向外部 JavaScript 文件的 URL，如：

   ```html
   <script src="example.js"></script>
   ```

   解释外部 JavaScript 文件时，页面处理会阻塞（包括下载文件的时间）。

## 动态加载脚本

可以通过 JavaScript 的原生 DOM API 动态添加 `script` 元素来加载指定的脚本。只需创建一个 `script` 元素并将其添加到 DOM 即可：

```javascript
let script = document.createElement('script');
script.src = 'example.js';
document.head.appendChild(script);
```

默认情况下，以这种方式创建的 `<script>` 元素会异步加载。为统一动态脚本的加载行为，可将其明确设置为同步加载：

```javascript
let script = document.createElement('script');
script.src = 'example.js';
script.async = false;
document.head.appendChild(script);
```

为使预加载器知晓这些动态请求的脚本文件，可以在文档头部显式声明：

```html
<link rel="preload" href="example.js">
```