# ElementPlus

## 安装使用

详见 [官网](https://element-plus.gitee.io/zh-CN/guide/installation.html)


## 图标引入

安装依赖

```js
npm i @element-plus/icons-vue
```

修改 `main.js`

```js
import * as Icons from '@element-plus/icons-vue';
const app = createApp(App);
Object.keys(Icons).forEach(icon => {
    app.component(icon, Icons[icon]);
});
```
