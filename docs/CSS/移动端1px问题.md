# 移动端1px问题

在部分手机屏幕上1px会显得很粗，不像是真正的1px

这与DPR有关

解决办法

苹果可以使用0.5px

安卓可以使用边框图片，但不能自定义颜色，圆角也会比较模糊

border改用box-shadow实现

viewport设置scale值

```html
<meta name="viewport" content="initial-scale=1,minimum-scale=1,user-scalable=no">
```

可以根据dpr动态设置

```js
<script>
          var viewport = document.querySelector("meta[name=viewport]");
          //下面是根据设备像素设置viewport
          if (window.devicePixelRatio == 1) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
          }
          if (window.devicePixelRatio == 2) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
          }
          if (window.devicePixelRatio == 3) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
          }
          var docEl = document.documentElement;
          var fontsize = 32* (docEl.clientWidth / 750) + 'px';
          docEl.style.fontSize = fontsize;
      </script>
```

