# 利用 sass 函数转 px 为 rem

1.  安装依赖 `npm i node-sass sass-loader`

2.  动态计算并更改页面基础 px

    - 定义函数

    ```js
    // designWidth 和 designPX 指的是设计图的宽度和基本 px ，一般为 1928 和 10
    resize(designWidth,designPX){
        // 当前浏览器的可见宽度
        let htmlWidth=window.innerWidth
        // 获取 dom 元素
        let htmlDom = document.getelementsbytagname('html')[0]
        // 根据设计图宽度和基础 Px 等比计算出现在的基础 px
        htmlDom.style.fontSize = ( htmlWidth * designPX ) / designWidth + 'px'
        // 当屏幕尺寸改变时重新计算
        window.addeventlistener('resize', ()=> {
            let htmlWidth = window.innerWidth
            htmlDom.style.fontSize = ( htmlWidth * designPX ) / designWidth + 'px'
        })
    }
    ```

    - 放入页面生命周期

      - vue 的 App.vue

      ```js
      created(){
        this.resize(1920,10)
      }
      ```

      - react 的 app.js

      ```js
      componentDidMount(){
        this.resize(1920,10)
      }
      ```

3.  将 px 转为 rem

    - 定义 sass 函数

    ```sass
    $basesize: 10;
    @function torem($px)
        @return $px/$basesize + rem
    ```

    - `@import(...)` 在其他页面引入，然后 `toRem($px)` 即可

    - vue 项目可以在配置文件中定义如下代码来全局引入

    ```js
    module.exports = {
      css: {
        loaderOptions: {
          sass: {
            data: `@import "..."`,
          },
        },
      },
    };
    ```
