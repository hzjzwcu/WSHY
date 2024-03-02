# Canvas 组件

canvas 需要设置初始样式和尺寸，这些与业务逻辑无关的操作我们统一封装到一个组件 `MCanvas.vue` 中

## 模板与样式

-   给定一个 canvas 标签

    ```vue
    <template>
        <canvas id="canvas" />
    </template>
    ```

-   设置标签样式

    > 此处不设置 `display: block` 的话全屏时会有滚动条

    ```css
    canvas {
        background-color: #000000;
        display: block;
    }
    ```

## script setup

-   定义 `props` 和 `emit`

    ```js
    const props = defineProps({
        globalCompositeOperation: {
            type: String,
            default: 'source-over',
        },
    });
    const emit = defineEmits(['inited', 'resize']);
    ```

-   定义响应式变量，保存 `cnavas` 的 **dom** 和 **context** ，以便在初始化后供父元素使用

    ```js
    import { onBeforeUnmount, onMounted, reactive } from 'vue';
    const canvas = reactive({
        dom: null,
        ctx: null,
    });
    ```

-   定义一个方法，在初始化和更改浏览器尺寸时设置 canvas 标签为全屏

    ```js
    const resize = () => {
        const { innerWidth: width, innerHeight: height } = window;
        canvas.dom.width = width;
        canvas.dom.height = height;
        emit('resize', { width, height });
    };
    ```

-   使用生命周期

    ```js
    onMounted(() => {
        canvas.dom = document.getElementById('canvas');
        canvas.ctx = canvas.dom.getContext('2d');
        canvas.ctx.globalCompositeOperation = props.globalCompositeOperation;
        window.onresize = resize;
        resize();
        emit('inited', canvas);
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('resize', resize);
    });
    ```

## 使用

```vue
<MCanvas @inited="onInited" @resize="onResize" globalCompositeOperation="source-over" />
```

