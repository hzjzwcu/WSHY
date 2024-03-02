# requestAnimationFrame

> **`window.requestAnimationFrame()`** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

## 1 用途与优势

`requestAnimationFrame` （以下简称 `rAF`）用于解决 js 中无限循环的 canvas 动画，此类需求也可以用 `setInterval` 实现，但是存在以下的区别

-   `rAF` 会把**每一帧**中的所有**DOM 操作集中**起来，在**一次**重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧
-   在**隐藏或不可见**的元素中，`rAF` 将不会进行重绘或回流，这当然就意味着更少的的 cpu，gpu 和内存使用量
-   在大多数浏览器里，当`rAF` 运行在后台标签页或者隐藏的 `iframe` 里时，`rAF` 会被暂停调用以提升性能和电池寿命

## 2 如何停止运行

与 `setTimepout` 类似，`rAF` 会返回一个 id，使用 `cancelAnimationFrame(id)` 的方式即可停止

## 3 示例

-   跨浏览器设置 `rAF`

    ```js
    const w = window;
    const requestAnimationFrame =
        w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        w.mozRequestAnimationFrame;
    ```

-   定义渲染函数

    > **注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`rAF`**
    >
    > render 函数会被传入[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)指示当前被 `rAF` 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为 1ms(1000μs)

    ```js
    const render = function () {
        // 做一些操作
        // ...
        requestAnimationFrame(render);
    };
    ```

-   初次调用

    ```js
    onMounted(async () => {
        render();
    });
    ```
