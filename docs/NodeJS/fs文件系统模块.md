# fs文件系统模块

> 本例中 **Nodejs** 版本为 [17.6.0](https://nodejs.org/dist/v17.6.0/node-v17.6.0-x64.msi)，该模块主要用于访问文件系统并与文件系统进行交互，详细 API 可前往[官网文档](https://nodejs.org/api/fs.html)查询

## 一、调用方式

### 1.1 引用

`fs` 无需安装，是 `Node.js` 核心模块，可以通过简单地引用来使用它 `const fs = require('fs')` 

### 1.2 异步调用

`fs`的方法默认情况下都是异步的，如下所示：

```js
fs.rename('before.json', 'after.json', (err) => {
    if (err) {
        return console.error(err);
    }
});
```

### 1.3 同步调用

在方法后加入 `Sync` 即可同步调用，需要在最外围使用 `try/catch` 来捕获错误

```js
try {
    fs.renameSync('before.json', 'after.json');
} catch (err) {
    console.error(err);
}
```

## 二、常用 API 列举

| api          | 说明                                   | 示例                                           |
| ------------ | :------------------------------------- | ---------------------------------------------- |
| `readdir`    | 获取指定路径下的文件(夹)列表           | `const files = fs.readdirSync('D:\\Test')`     |
| `readFile`   | 获取指定文件的内容，默认返回 Buffer    | `const txt = fs.readFileSync('a.txt', 'utf8')` |
| `stat`       | 获取文件(夹)状态信息                   | `const stat = fs.statSync('a.zip')`            |
| `exists`     | 查询文件(夹)是否存在(**异步用法废弃**) | `const exist = fs.existsSync('a.zip')`         |
| `writeFile`  | 创建文件并写入数据，会覆盖同名文件     | `fs.writeFileSync('a.txt', '123')`             |
| `appendFile` | 将数据附加到文件中，不存在则创建       | `fs.appendFileSync('a.txt', '123')`            |
| `unlink`     | 删除文件                               | `fs.unlinkSync('a.zip')`                       |
| `rmdir`      | 删除文件夹，不管是否为空               | `fs.rmdirSync('a.zip', { recursive: true })`   |
| `rename`     | 重命名                                 | `fs.renameSync('a.zip', 'b.zip')`              |
| `copyFile`   | 复制文件                               | `fs.copyFileSync('a.txt', 'D:\\b.txt');`       |
| `cp`         | 复制文件夹                             |                                                |
