# Koa+Mongodb项目初始化

## 安装依赖

`npm i koa koa-body koa-router mongoose -S`

## 模型文件 models/record.js

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordShema = new Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('record', recordShema);
```

## 数据库连接配置 models/db.js

```
const mongoose = require('mongoose');
const connectionStr = 'mongodb://localhost:27017/test';

module.exports = class DB {
    constructor() {
        mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log('数据库连接失败', err);
            } else {
                console.log('数据库连接成功');
            }
        });
    }
};

```



## 创建路由 router/index.js

```js
const Router = require('koa-router');
const router = new Router();
const Record = require('../models/record');
router.post('/api/addRecord', async (ctx) => {
    const newRecord = new Record({ name: 'test', price: '123123' });
    await newRecord.save();
    ctx.body = { code: 200, data: newRecord };
});
module.exports = router;
```

## 创建入口文件 index.js

```js
const Koa = require('koa');
const router = require('./router/index');
const koaBody = require('koa-body');
const mongoose = require('mongoose');

// 连接mongonDB
const connectionStr = 'mongodb://localhost:27017';
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('数据库连接失败', err);
    } else {
        console.log('数据库连接成功');
    }
});

// 创建实例和路由
const app = new Koa();
app.use(koaBody({ multipart: true }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('app listen: http://localhost:3000');
});
```

