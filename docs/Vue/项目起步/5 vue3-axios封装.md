# vue3-axios封装

## 安装依赖

安装本体依赖 `npm i axios -S`

报错提示用到了 `element-plus` 依赖作为报错提醒的工具，需要提前安装 `npm i element-plus -S `

## 封装实例

创建 `axios/index.ts`，只需要考虑单一职责，这块只封装 axios 实例，[参考文档](https://cdmana.com/2021/11/20211101103451743r.html)

### 引入依赖

```ts
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
```

### 定义报错处理方法

```ts
const errorHandle = (status: number) => {
    switch (status) {
        case 302: 
            ElMessage.error('接口重定向了！==>' + status);
            break;
        case 400:
            ElMessage.error('发出的请求有错误，服务器没有进行新建或修改数据的操作==>' + status);
            break;
        case 404:
            ElMessage.error('网络请求不存在==>' + status);
            break;
        case 406:
            ElMessage.error('请求的格式不可得==>' + status);
            break;
        case 408: 
            ElMessage.error(' 请求超时！==>' + status);
            break;
        case 410:
            ElMessage.error('请求的资源被永久删除，且不会再得到的==>' + status);
            break;
        case 422:
            ElMessage.error('当创建一个对象时，发生一个验证错误==>' + status);
            break;
        case 500:
            ElMessage.error('服务器发生错误，请检查服务器==>' + status);
            break;
        case 502:
            ElMessage.error('网关错误==>' + status);
            break;
        case 503:
            ElMessage.error('服务不可用，服务器暂时过载或维护==>' + status);
            break;
        case 504:
            ElMessage.error('网关超时==>' + status);
            break;
        default:
            ElMessage.error('发生未知错误==>' + status);
    }
};
```

### 移除重复请求

```ts
// 定义接口
interface PendingType {
    url?: string;
    method?: string;
    params: any;
    data: any;
    cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    pending.forEach((list: PendingType, index: number) => {
        const isEqualConfig = list.url === config.url && list.method === config.method;
        const isEqualParams = JSON.stringify(list.params) === JSON.stringify(config.params);
        const isEqualData = JSON.stringify(list.data) === JSON.stringify(config.data);
        if (isEqualConfig && isEqualParams && isEqualData) {
            list.cancel('操作太频繁，请稍后再试'); // 执行取消操作
            pending.splice(index, 1); // 从数组中移除记录
        }
    });
};
```

### 创建实例

```ts
const instance = axios.create({
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
    },
    timeout: 1000 * 30, // 超时时间
    baseURL: '/api', // 请求的 base 地址
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
});
```

### 请求拦截器

```ts
instance.interceptors.request.use(
    config => {
        removePending(config);
        config.cancelToken = new CancelToken((c) => {
            pending.push({
                url: config.url,
                method: config.method,
                params: config.params,
                data: config.data,
                cancel: c,
            });
        });
        return config;
    },
    error => {
        ElMessage.error(error.data.error.message);
        return Promise.reject(error.data.error.message);
    }
);
```

### 响应拦截器

```ts
instance.interceptors.response.use(
    (config) => {
        removePending(config.config);
        if (config.status === 200 || config.status === 204) {
            return Promise.resolve(config);
        } else {
            return Promise.reject(config);
        }
    },
    (error) => {
        const { response } = error;
        if (response) {
            errorHandle(response.status);
            const config = error.config; // 超时重新请求
            const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]; // 全局的请求次数,请求的间隙
            if (config && RETRY_COUNT) {
                config.__retryCount = config.__retryCount || 0; // 记录重试次数

                // 检查是否已经把重试的总数用完
                if (config.__retryCount >= RETRY_COUNT) {
                    return Promise.reject(response || { message: error.message });
                }

                // 指数后退重试
                config.__retryCount++; // 计数加1
                const backoff = new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, RETRY_DELAY || 1);
                });
                return backoff.then(() => {
                    return instance(config);
                });
            }
            return Promise.reject(response);
        } else {
            ElMessage.error('请求失败，请检查网络连接是否正常');
        }
    }
);
```

### 导出实例

```ts
export default instance;
```
