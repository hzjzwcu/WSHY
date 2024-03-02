# CSS动画

> 动画使元素逐**渐从一种样式变为另一种样式**就是CSS动画

### 1  `@keyframes` 定义规则

- 在 `@keyframes` 规则中指定了 CSS 样式，动画将在**特定时间**逐渐从当前样式更改为新样式，写法如下

    - 关键字 `"from"` 和 `"to"`，相当于 `0%` 和 `100%`

        ```css
        @keyframes example {
            from {
                background-color: red;
            }
            to {
                background-color: yellow;
            }
        }
        ```

    - 百分比

        ```css
        @keyframes example {
            0% {
                background-color: red;
            }
            50% {
                background-color: blue;
            }
            100% {
                background-color: yellow;
            }
        }
        ```

- 要使动画生效，必须将规则名**绑定到某个元素**，并且**设置动画播放时间**（因为默认是 0s）

    ```css
    div {
        width: 100px;
        height: 100px;
        animation-name: example;
        animation-duration: 1s;
    }
    ```

### 2  `animation-delay`  延时

- 正值时的效果是**延迟播放动画**，如下例中，动画会在1秒后开始播放

    ```css
    animation-delay: 1s;
    ```

- 负值时的效果是**跳过对应时间的动画**，如下例中，动画会直接跳过最开始的 1s 过程

    ```css
    animation-delay: -1s;
    ```

    > 该属性只会在**第一次**播放动画时生效

### 3 `animation-iteration-count` 运行次数

- 值是正整数数字时，会**播放对应次数**，下面例子会播放动画 3 次，默认为 1

    ```css
    animation-iteration-count: 3;
    ```

- 值是 **infinite** 时，会**循环播放**

    ```css
    animation-iteration-count: infinite;
    ```

### 4 `animation-direction` 运行方向

- `normal` - 动画正向播放（从 0% 向 100% 过渡）。**默认值**
- `reverse` - 动画以反向播放（从 100% 向 0% 过渡）
- `alternate` - 动画先正向，然后反向，交替播放动画
- `alternate-reverse` - 动画先反向，然后正向，交替播放动画

### 5 `animation-timing-function` 速度曲线

- `ease` - 开始结束慢，中间快（**默认** 相当于 （cubibezier(0.25,0.1,0.25,1)）

- `linear` - 匀速（等于 cubic-bezier(0,0,1,1)）

- `ease-in` - 逐渐加速（等于 cubic-bezier(0.42,0,1,1)）

- `ease-out` - 逐渐减速（等于 cubic-bezier(0,0,0.58,1)）

- `ease-in-out` - 开始结束慢，中间快（等于 cubic-bezier(0.42,0,0.58,1)）

- `cubic-bezier(n,n,n,n)` - 自定义贝塞尔函数曲线

- `step(n,start|end)`- 帧动画

    - 第一个参数 number 为指定的间隔数，即把动画分为n步阶段性展示
    - 第二个参数默认是 end ，设置最后一步的状态
        - 

    > `ease` 是匀加速到一半时就开始匀减速
    >
    >  `ease-in-out` 是开始就加大油门加速到很快的速度，然后保持该速度到快结束才急刹车

### 6 `animation-fill-mode` 动画运行前后的默认样式

- `none` - **默认值**。动画在执行前后不会对元素应用任何样式
- `forwards` - 动画结束后元素会保留结束样式
- `backwards` - 动画开始前，也就是 `delay` 期间会使用第一帧的样式
- `both` - 相当于同时设置了 `forwards` 和 `backwards` 

### 7 `animation-play-state` 动画暂停

- `paused`，动画已暂停

- `running` ，**默认值**，动画播放

### 8 `animation` 简写

- 总结动画相关的所有属性如下所示

    ```css
    animation-name: example; // 动画名称
    animation-duration: 5s; // 持续时间
    animation-timing-function: linear; // 速度曲线
    animation-delay: 2s; // 延时
    animation-iteration-count: infinite; // 运行次数
    animation-direction: alternate; // 运行方向
    animation-fill-mode: both; // 填充样式
    animation-play-state: paused; // 是否暂停
    ```

- 上面的属性可以将其简写

    ```css
    animation: example 5s linear 2s infinite alternate;
    ```

> 简写属性的值顺序不固定，但是要注意同样类型的值的顺序，比如 `duration` 和 `delay`











































