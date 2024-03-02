# Vue-router

## 1 配置路由

-   安装依赖 `npm install vue-router@4` 详情参考[官网文档](https://next.router.vuejs.org/zh/guide/)

-   创建路由配置 `src/router/routes.js`

    ```js
    // 1. 路由组件
    const MHome = () => import('../views/MHome.vue');
    const MDetail = () => import('../views/MDetail.vue');

    // 2. 定义路由
    const routes = [
        { path: '/', component: MHome },
        { path: '/MHome', component: MHome },
        { path: '/MDetail', component: MDetail },
    ];

    export default routes;
    ```

-   创建路由示例 `src/router/index.js`

    ```js
    import { createRouter, createWebHashHistory } from 'vue-router';
    import routes from './routes';

    const routerHistory = createWebHashHistory();
    const router = createRouter({
        history: routerHistory,
        routes: routes,
    });

    export default router;
    ```

    > `routerHistory` 可选三种设置，分别是：
    >
    > -   `createWebHashHistory` **hash 路由**
    > -   `createWebHistory` **history 路由**
    > -   `createMemoryHistory` **带缓存 history 路由**

## 2 注册路由

修改 `main.js` 文件，在其中注册路由

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.mount('#app');
```

## 3 使用路由

在 `App.vue` 中使用路由

```vue
<template>
    <router-link to="/">Go to Home</router-link>
    <router-link :to="{ path: '/about', query: { id: '111' } }"> Go To About </router-link>
    <router-view></router-view>
</template>
```

## 4 Vue Router 和 组合式 API

### 4.1 Router, Route

详见[官网](https://next.router.vuejs.org/zh/guide/advanced/composition-api.html)，因为我们在 `setup` 里面没有访问 `this`，所以我们不能再直接访问 `this.$router` 或 `this.$route`。作为替代，我们使用 `useRouter` 函数

```js
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        function pushWithQuery(query) {
            router.push({
                name: 'search',
                query: {
                    ...route.query,
                },
            });
        }
    },
};
```

### 4.2 导航守卫

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

export default {
    setup() {
        // 与 beforeRouteLeave 相同，无法访问 `this`
        onBeforeRouteLeave((to, from) => {
            const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
            // 取消导航并停留在同一页面上
            if (!answer) return false;
        });

        const userData = ref();

        // 与 beforeRouteLeave 相同，无法访问 `this`
        onBeforeRouteUpdate(async (to, from) => {
            //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
            if (to.params.id !== from.params.id) {
                userData.value = await fetchUser(to.params.id);
            }
        });
    },
};
```
