# CSS帧动画step()

### 1 准备素材图片

- 以人物行走这一动作为例，将动作分为 11 帧，也就是存在 11 张图片
- 人物角色尺寸为 **200*200** 大小
- 水平拼接形成一张 **2200*200** 的图片
- 命名为 `man.png`，将其放置在项目的**静态资源目录**，令页面可以直接访问

### 2 显示第一帧图片

- 在 `html` 添加一个 `div` 标签，大小和人物角色相同

    ```html
    <div id="man"></div>
    ```

- 在 scss 中设置标签大小和背景

    ```css
    #man {
        width: 200px;
        height: 200px;
    }
    ```

- 将素材图片设置为标签背景，并通过 `background-position` 调整位置，例如第二帧图片是 `-200px 0`

    ```css
    #man {
        background-image: url('man.png');
        background-repeat: no-repeat;
        background-position: 0 0;
    }
    ```

### 3 定义动画

```css
@keyframes man_run {
    0% { background-position: 0 0  }
    100% { background-position: -2200px 0 }
}
```

### 4 使用动画

```css
#man {
    animation: man_run 2s steps(11, end) both infinite;
}
```

