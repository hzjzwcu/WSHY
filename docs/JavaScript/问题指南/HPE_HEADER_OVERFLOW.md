# HPE_HEADER_OVERFLOW

## 1 场景分析

在调用IAM鉴权请求时，发现获取token的接口一直报错

> Proxy error: Could not proxy request xxx from xxx to xxx (HPE_HEADER_OVERFLOW).

该错误虽然是proxy报错，但实际报错原因要看最后的 **HPE_HEADER_OVERFLOW** 也就是返回体的 headers 过大，所以需要设置的是头部大小限制

## 2 Vue-Cli本地开发设置

后端可以直接设置 `max-http-header-size `属性，但是前端开发时，服务是通过webpack启动的，所以要查看vue.config.js。但通过查阅官网文档，可以发现并没有相关的设置暴露出来，因此需要在更改Node指令，从而在环境中设置属性

- 安装跨环境依赖 `npm i cross-env -g `
- 更改脚本 `"serve": "cross-env NODE_OPTIONS='--max-http-header-size=16000' vue-cli-service serve"`

> max-http-header-size 可根据需要设置大小，但不可过大，否则会占用过多内存

## 3 Nginx设置

在http中加入以下配置

```
proxy_buffer_size 128k;
proxy_buffers 32 32k;
proxy_busy_buffers_size 128k;
client_header_buffer_size 64k;
large_client_header_buffers 64 128k;
client_body_buffer_size 20m;
client_max_body_size 64m; 
```

## 4 Node 设置

与Vue-cli的配置类似，因为Vue-cli底层也是通过Node实现的

- 启动项目时携带参数  `node --max-http-header-size 16000 index.js `
- pm2方式启动 `pm2 start test.js --node-args="--max-http-header-size=16000" `
