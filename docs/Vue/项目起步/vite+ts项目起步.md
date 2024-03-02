安装依赖

```
npm init vite@latest my-vue-app -- --template vue-ts
npm i element-plus -D
npm i vue-router@latest -D
npm i @types/node -D
npm i axios -D
npm i pinia -D
npm i pinia-plugin-persist -D
```

引入element

```
import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import element from 'element-plus'
import 'element-plus/dist/index.css'  // 不引入会导致ui样式不正常

createApp(App).use(element).mount('#app')
```

