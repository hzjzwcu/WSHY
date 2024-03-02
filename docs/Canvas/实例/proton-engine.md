# proton-engine

## 1 粒子引擎 proton-engine

[Proton](http://drawcall.github.io/Proton/) 是一个轻量级且功能强大的 Javascript **粒子动画库**。使用它可以轻松创建各种炫酷的粒子效果，下面做一个简单的**烟花样例**

## 2 准备工作

-   新建一个 Vue3 项目
-   安装粒子库依赖 `npm i proton-engine raf-manager`

## 3 封装一个 Canvas 组件

canvas 需要设置初始样式和尺寸，这些与业务逻辑无关的操作我们统一封装到一个组件 `MCanvas.vue` 中

### 3.1 模板与样式

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
        background: Black;
        display: block;
    }
    ```

### 3.2 script setup

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

## 烟花页面

### script setup

-   引入依赖和组件

    ```js
    import MCanvas from './MCanvas.vue';
    import Proton from 'proton-engine';
    import RAFManager from 'raf-manager';
    import { onBeforeUnmount, ref } from 'vue';
    ```

-   定义变量

    ```js
    const proton = ref(null);
    const renderer = ref(null);
    ```

-   定义烟花炸裂时的发射器函数

    ```js
    const createEmitter = (particle) => {
        const subemitter = new Proton.Emitter();
        subemitter.rate = new Proton.Rate(new Proton.Span(250, 300), 1);
        subemitter.addInitialize(new Proton.Mass(1));
        subemitter.addInitialize(new Proton.Radius(1, 2));
        subemitter.addInitialize(new Proton.Life(1, 3));
        subemitter.addInitialize(new Proton.V(new Proton.Span(2, 4), new Proton.Span(0, 360), 'polar'));

        subemitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.05));
        subemitter.addBehaviour(new Proton.Alpha(1, 0));
        subemitter.addBehaviour(new Proton.Gravity(3));

        const color = Math.random() > 0.3 ? Proton.MathUtil.randomColor() : 'random';
        subemitter.addBehaviour(new Proton.Color(color));

        subemitter.p.x = particle.p.x;
        subemitter.p.y = particle.p.y;
        subemitter.emit('once', true);
        proton.value.addEmitter(subemitter);
    };
    ```

-   定义更新函数

    ```js
    const renderProton = () => {
        proton.value.update();
    };
    ```

-   定义创建 Proton 实例和初始行为的函数

    ```js
    const createProton = (canvas) => {
        proton.value = new Proton();
        const emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(new Proton.Span(1, 3), 1); // 粒子运动速度

        // 发射烟花弹
        emitter.addInitialize(new Proton.Mass(10));
        emitter.addInitialize(new Proton.Radius(2, 4)); // 大小
        emitter.addInitialize(
            new Proton.P(new Proton.LineZone(10, canvas.dom.height, canvas.dom.width - 10, canvas.dom.height))
        );

        // 控制何时炸开
        emitter.addInitialize(new Proton.Life(1, 1.5));
        emitter.addInitialize(new Proton.V(new Proton.Span(4, 6), new Proton.Span(0, 0, true), 'polar'));

        // 烟花弹的颜色
        emitter.addBehaviour(new Proton.Gravity(1));
        emitter.addBehaviour(new Proton.Color('#ff0000', 'random'));
        emitter.emit();
        proton.value.addEmitter(emitter);

        // 设置拖影
        renderer.value = new Proton.CanvasRenderer(canvas.dom);
        renderer.value.onProtonUpdate = function () {
            canvas.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            canvas.ctx.fillRect(0, 0, canvas.dom.width, canvas.dom.height);
        };

        proton.value.addRenderer(renderer.value);
        proton.value.addEventListener(Proton.PARTICLE_DEAD, (particle) => {
            createEmitter(particle);
        });
    };
    ```

-   定义 canvas 的事件触发回调函数

    -   初始化时创建实例

        ```js
        const handleInited = (canvas) => {
            createProton(canvas);
            RAFManager.add(renderProton);
        };
        ```

    -   尺寸变化时重新渲染

        ```js
        const handleResize = ({ width, height }) => {
            renderer.value && renderer.value.resize(width, height);
        };
        ```

-   离开页面前移除实例

    ```js
    onBeforeUnmount(() => {
        RAFManager.remove(renderProton);
        proton.value.destroy();
    });
    ```

### 页面模版

```vue
<template>
    <m-canvas @inited="handleInited" @resize="handleResize" />
</template>
```
