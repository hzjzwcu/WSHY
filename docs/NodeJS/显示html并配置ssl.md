# 显示html并配置ssl,https

## node 配置 ssl 网站服务

```js
let express = require('express');
let http = require("http");
let https = require("https");
let fs = require("fs");
var path = require('path');
//https相关配置
const httpsOption = {
    key : fs.readFileSync("./30mi.key"),
    cert: fs.readFileSync("./30mi.pem")
}
let app = express();
//网站目录
app.use(express.static(path.join(__dirname, '../www/wwwroot/www.30mi.com')));
http.createServer(app).listen(80);
https.createServer(httpsOption, app).listen(443);
```

## 不配置ssl，单纯配置网站web服务

```js 
var express = require("express");
var app = express();
app.use(express.static("public")).listen(8080);
```

