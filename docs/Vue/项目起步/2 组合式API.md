# 组合式 API

## 1 options API 示例

官网链接中有一段[基础示例](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)的伪代码，只做展示用，为了方便一步一步调试，这里先将其补充完整

> 要注意的话 vue3 的项目与 vue2 相比，即使同为 options 写法，也有变动，本例中的变动如下
>
> -   父子组件传参时**语法糖的写法**从 `searchQuery.sync` 变为 `v-model:searchQuery` 的形式
> -   **template** 标签中**不再要求必须只能有一个根节点**
> -   **emits** 需要通过选项定义发出的事件

-   **APP.vue**

    ```vue
    <template>
        <input id="user1" v-model="user" type="radio" value="user1" />
        <label for="user1">user1</label>
        <input id="user2" v-model="user" type="radio" value="user2" />
        <label for="user2">user2</label>
        <m-repositories :user="user" />
    </template>
    <script>
    import MRepositories from './views/MRepositories.vue';
    export default {
        components: { MRepositories },
        data() {
            return { user: 'user1' };
        },
    };
    </script>
    ```

-   **MRepositories.vue**

    ```vue
    <template>
        <repositories-list :repositories="repositories"></repositories-list
        ><repositories-search
            v-model:searchQuery="searchQuery"
            :repositories-matching-search-query="repositoriesMatchingSearchQuery"
        ></repositories-search>
        <repositories-filters
            :filtered-repositories="filteredRepositories"
            @update-filters="updateFilters"
        ></repositories-filters>
    </template>
    <script>
    import RepositoriesFilters from './RepositoriesFilters.vue';
    import RepositoriesList from './RepositoriesList.vue';
    import RepositoriesSearch from './RepositoriesSearch.vue';
    export default {
        components: { RepositoriesList, RepositoriesFilters, RepositoriesSearch },
        props: {
            user: { type: String, required: true },
        },
        data() {
            return {
                filters: {},
                searchQuery: '',
                repositories: [],
            };
        },
        computed: {
            filteredRepositories() {
                return this.repositories.filter((item) => {
                    return Object.keys(this.filters).every((key) => item[key] === this.filters[key]);
                });
            },
            repositoriesMatchingSearchQuery() {
                return this.repositories.filter((item) => {
                    return item.label.includes(this.searchQuery);
                });
            },
        },
        watch: { user: 'getUserRepositories' },
        mounted() {
            this.getUserRepositories();
        },
        methods: {
            getUserRepositories() {
                const list = [];
                for (let i = 1; i <= 10; i++) {
                    list.push({
                        id: i,
                        user: this.user,
                        label: `item${i}`,
                        type: `c${Math.round(Math.random()) + 1}`, // 随机1或2
                        area: `a${Math.round(Math.random()) + 1}`,
                    });
                }
                this.repositories = list;
            },
            updateFilters(objData) {
                this.filters = objData;
            },
        },
    };
    </script>
    ```

-   **RepositoriesList.vue**

    ```vue
    <template>
        <h2>列表</h2>
        <ul>
            <li v-for="item in repositories" :key="item.id">{{ item }}</li>
            <li v-show="!repositories.length">暂无数据</li>
        </ul>
    </template>
    <script>
    export default {
        props: {
            repositories: {
                type: Array,
                required: true,
            },
        },
    };
    </script>
    ```

-   **RepositoriesFilters.vue**

    ```vue
    <template>
        <h2>筛选</h2>
        <form action="http://localhost:3001" @submit.prevent="updateFilters">
            <div class="filters">
                <div class="type">
                    <span>种类 </span>
                    <input id="ca" type="radio" value="" name="type" checked />
                    <label for="ca">all</label>
                    <input id="c1" type="radio" value="c1" name="type" />
                    <label for="c1">c1</label>
                    <input id="c2" type="radio" value="c2" name="type" />
                    <label for="c2">c2</label>
                </div>
                <div>
                    <span>区间 </span>
                    <input id="aa" type="radio" value="" name="area" checked />
                    <label for="aa">all</label>
                    <input id="a1" type="radio" value="a1" name="area" />
                    <label for="a1">a1</label>
                    <input id="a2" type="radio" value="a2" name="area" />
                    <label for="a2">a2</label>
                </div>
            </div>
            <input type="submit" />
        </form>
        <ul>
            <li v-for="item in filteredRepositories" :key="item.id">{{ item }}</li>
            <li v-show="!filteredRepositories.length">暂无数据</li>
        </ul>
    </template>
    <script>
    export default {
        props: {
            filteredRepositories: {
                type: Array,
                required: true,
            },
        },
        emits: ['update-filters'],
        methods: {
            updateFilters(el) {
                const formData = new FormData(el.target);
                const objData = {};
                formData.forEach((value, key) => {
                    if (value) {
                        objData[key] = value;
                    }
                });
                this.$emit('update-filters', objData);
            },
        },
    };
    </script>
    ```

-   **RepositoriesSearch.vue**

    ```vue
    <template>
        <h2>搜索关键字</h2>
        <input
            type="text"
            placeholder="搜索关键字"
            :value="searchQuery"
            name="searchQuery"
            @change="onSearchQueryChange"
        />
        <ul>
            <li v-for="item in repositoriesMatchingSearchQuery" :key="item.id">{{ item }}</li>
            <li v-show="!repositoriesMatchingSearchQuery.length">暂无数据</li>
        </ul>
    </template>
    <script>
    export default {
        props: {
            searchQuery: {
                type: String,
                default: '',
            },
            repositoriesMatchingSearchQuery: {
                type: Array,
                required: true,
            },
        },
        emits: ['update:searchQuery'],
        methods: {
            onSearchQueryChange(el) {
                this.$emit('update:searchQuery', el.target.value);
            },
        },
    };
    </script>
    ```

## 2 使用组合式 API

大多数逻辑都在 `MRepositories.vue` 中，我们首先针对这个组件进行改造，将 **setup** 添加到组件中

### 2.1 data

-   将数据从 **data** 转移到 **setup** 中，**setup**是一个函数，最终返回的值会绑定到 **this** 上

    ```js
    export default {
        setup() {
            const filters = {};
            const searchQuery = '';
            const repositories = [];
            return { filters, searchQuery, repositories };
        },
    };
    ```

-   此时通过调试可知 **this.repositories** 在 `mounted` 阶段已经更新，但是界面上却显示为空，这是

    因为 setup 中的变量目前还不是响应式的，需要使用 `ref` 函数将其转化，详细可查阅[响应式文档](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#%E5%A3%B0%E6%98%8E%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81)

    ```js
    import { ref } from 'vue';
    export default {
        setup() {
            const filters = ref({});
            const searchQuery = ref('');
            const repositories = ref([]);
            return { filters, searchQuery, repositories };
        },
    };
    ```

### 2.2 props

**setup** 中无法访问到 **this** ，如果需要用到 **props** 就需要在参数中获取

> 注意此时我们做的**不是转移** props ，只是在 setup 中获取

```js
setup(props) {
    const { user } = props;
},
```

此时如果装有 eslint 则会有警告提示：

```
Getting a value from the `props` in root scope of `setup()` will cause the value to lose reactivity
```

这是因为解构出来的变量会丢失响应性，需要使用 `toRefs` 函数辅助，具体见[文档](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#%E5%93%8D%E5%BA%94%E5%BC%8F%E7%8A%B6%E6%80%81%E8%A7%A3%E6%9E%84)

```js
import { toRefs } from 'vue';
export default {
    setup(props) {
        const { user } = toRefs(props);
    },
};
```

### 2.3 methods

将 **methods** 中的内容转移到 **setup** 中

> 要注意的是 **setup** 中无法访问到 **this** ，因此方法中的两处使用 **this** 的地方都要更改，另外使用 **ref** 处理过的变量都必须用 `.value` 的形式访问和更改，但在 **setup** 返回时会[自动浅解包](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#ref-%E8%A7%A3%E5%8C%85)内部值

```js
export default {
    setup(props) {
        const { user } = toRefs(props);
        const filters = ref({});
        const searchQuery = ref('');
        const repositories = ref([]);

        const getUserRepositories = () => {
            const list = [];
            for (let i = 1; i <= 10; i++) {
                list.push({
                    id: i,
                    user: user,
                    label: `item${i}`,
                    type: `c${Math.round(Math.random()) + 1}`, // 随机1或2
                    area: `a${Math.round(Math.random()) + 1}`,
                });
            }
            repositories.value = list;
        };
        const updateFilters = (objData) => {
            filters.value = objData;
        };

        return { filters, searchQuery, repositories, getUserRepositories, updateFilters };
    },
};
```

### 2.4 生命周期

**组合式 API** 上的生命周期钩子与**选项式 API** 的名称相同，但前缀为 `on` ：即 `mounted` 看起来会 像 `onMounted`

```js
import { onMounted } from 'vue';
export default {
    setup(props) {
        onMounted(getUserRepositories);
    },
};
```

### 2.5 watch

和生命周期一样，我们从 **vue** 中导入函数执行操作，`watch` 函数接收三个参数

-   待监听的变量（**非名称字符串**）
-   回调函数
-   可选配置项

```js
import { watch } from 'vue';
export default {
    setup(props) {
        watch(user, getUserRepositories);
    },
};
```

### 2.6 computed

与 `watch` 类似，`computed` 函数接收一个函数作为参数，输出的是一个**响应式引用**，也就是说我们访问时也需要使用 `.value`，要注意更改原函数中 **this** 指向更改到 **ref** 变量

```js
import { computed } from 'vue';
export default {
    setup(props) {
        const repositoriesMatchingSearchQuery = computed(() => {
            return repositories.value.filter((item) => {
                return item.label.includes(searchQuery.value);
            });
        });

        const filteredRepositories = computed(() => {
            return repositories.value.filter((item) => {
                return Object.keys(filters.value).every((key) => item[key] === filters.value[key]);
            });
        });

        return {
            repositoriesMatchingSearchQuery,
            filteredRepositories,
        };
    },
};
```

## 3 组合式函数

一味地把所有逻辑都放到 setup 中会使它变得非常臃肿，需要发挥他的特长，将分类好的逻辑提取到一个独立的**组合式函数**中。

### 3.1 逻辑分类

上述例子中可以分为三个逻辑点

```js
setup(props) {
    const { user } = toRefs(props);

    // 1 列表显示
    const repositories = ref([]);
    const getUserRepositories = () => {...};
    onMounted(getUserRepositories);
    watch(user, getUserRepositories);

    // 2 搜索关键字
    const searchQuery = ref('');
    const repositoriesMatchingSearchQuery = computed(() => {...});

    // 3 筛选
    const filters = ref({});
    const updateFilters = (objData) => {...};
    const filteredRepositories = computed(() => {...});

    return {...};
},
```

> 参数 `user` 在多个逻辑中用到，因此应当在上一级定义好，使用参数形式传入

### 3.2 定义组合式函数

针对上述三个逻辑分类，创建对应的组合式函数，要注意用到的变量如果是其他逻辑创建的，就需要使用参数传入

-   列表显示 `src\composables\useUserRepositories.js`

    ```js
    import { ref, onMounted, watch } from 'vue';
    export default function useUserRepositories(user) {
        const repositories = ref([]);
        const getUserRepositories = () => {
            const list = [];
            for (let i = 1; i <= 10; i++) {
                list.push({
                    id: i,
                    user: user,
                    label: `item${i}`,
                    type: `c${Math.round(Math.random()) + 1}`, // 随机1或2
                    area: `a${Math.round(Math.random()) + 1}`,
                });
            }
            repositories.value = list;
        };

        onMounted(getUserRepositories);
        watch(user, getUserRepositories);

        return {
            repositories,
            getUserRepositories,
        };
    }
    ```

-   搜索关键字 `src\composables\useRepositoryNameSearch.js`

    ```js
    import { ref, computed } from 'vue';
    export default function useRepositoryNameSearch(repositories) {
        const searchQuery = ref('');
        const repositoriesMatchingSearchQuery = computed(() => {
            return repositories.value.filter((item) => {
                return item.label.includes(searchQuery.value);
            });
        });

        return {
            searchQuery,
            repositoriesMatchingSearchQuery,
        };
    }
    ```

-   筛选 `src\composables\useFilteredRepositories.js`

    ```js
    import { ref, computed } from 'vue';
    export default function useFilteredRepositories(repositories) {
        const filters = ref({});
        const updateFilters = (objData) => {
            filters.value = objData;
        };
        const filteredRepositories = computed(() => {
            return repositories.value.filter((item) => {
                return Object.keys(filters.value).every((key) => item[key] === filters.value[key]);
            });
        });

        return {
            filters,
            updateFilters,
            filteredRepositories,
        };
    }
    ```

### 3.3 使用

**MRepositories.vue** 中变成了

```js
import useUserRepositories from '../composables/useUserRepositories';
import useRepositoryNameSearch from '../composables/useRepositoryNameSearch';
import useFilteredRepositories from '../composables/useFilteredRepositories';

import { toRefs } from 'vue';

export default {
    components: { RepositoriesList, RepositoriesFilters, RepositoriesSearch },
    props: {
        user: { type: String, required: true },
    },
    setup(props) {
        const { user } = toRefs(props);

        // 1 列表显示
        const { repositories, getUserRepositories } = useUserRepositories(user);

        // 2 搜索关键字
        const { searchQuery, repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories);

        // 3 筛选
        const { filters, updateFilters, filteredRepositories } = useFilteredRepositories(repositories);

        return {
            repositories,
            getUserRepositories,
            searchQuery,
            repositoriesMatchingSearchQuery,
            filters,
            updateFilters,
            filteredRepositories,
        };
    },
};
```
