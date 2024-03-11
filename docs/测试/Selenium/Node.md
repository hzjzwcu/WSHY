# Selenium（2）Node

## 1 环境搭建

-   项目依赖

    ```js
    npm install selenium-webdriver --save
    ```

-   浏览器依赖

    -   查看 chrome 浏览器版本并下载对应的[驱动程序](https://npm.taobao.org/mirrors/chromedriver/)
    -   解压后将其配置在环境变量中
    -   如果之前装过，需要先用 `where chromedriver` 查看路径并替换

-   尝试打开一个网页

    ```js
    const { Builder } = require('selenium-webdriver');
    const test = async () => {
        const driver = new Builder().forBrowser('chrome').build();
        await driver.get('http://www.baidu.com');
    };
    test();
    ```

## 2 基础用法

> 需要事先引入 By 对象， `const { By } = require('selenium-webdriver');`

### 2.1 定位元素

-   元素选择器

    | 描述         | 用法                                               | 备注                     |
    | ------------ | -------------------------------------------------- | ------------------------ |
    | 选择多个元素 | await driver.findElements(By......)                | 返回一个 WebElement 数组 |
    | css          | await driver.findElement(By.css('#s-top-left a'))  | 返回一个 WebElement      |
    | class        | await driver.findElement(By.className('mnav'))     |                          |
    | id           | await driver.findElement(By.id('kw'))              |                          |
    | name         | await driver.findElement(By.name('theme-color'))   |                          |
    | 完全匹配文本 | await driver.findElement(By.linkText('更多'))      | 只能对链接元素起作用     |
    | 部分匹配文本 | await driver.findElement(By.partialLinkText('多')) | 只能对链接元素起作用     |
    | 标签名       | await driver.findElement(By.tagName('div'))        | 性能差，不建议用         |
    | xpath        | await driver.findElement(By.xpath('//span[1]'))    |                          |

    > 建议使用 id 最优先，其次是**写的好**的 css 和 xpath 选择器，如果都不满足再考虑其他选择器

-   相对位置定位

    > **4.1.0**后才支持，需要事先引入方法 `const { locateWith } = require('selenium-webdriver')`

    -   above() 查找已知元素**上边**的某个元素

        ```js
        const dom1 = driver.findElement(By.partialLinkText('换'));
        const dom2 = await driver.findElement(locateWith(By.partialLinkText('更多')).above(dom1));
        ```

    -   below()查找已知元素**下边**的某个元素，用法同上

    -   toLeftOf()查找已知元素**左边**的某个元素，用法同上

    -   toRightOf()查找已知元素**右边**的某个元素，用法同上

    -   near() 查找已知元素**附近（约 50px）**的元素，用法同上

### 2.2 浏览器相关操作

#### 2.2.1 基础操作

| 描述                       | 用法                                                             | 备注                   |
| -------------------------- | ---------------------------------------------------------------- | ---------------------- |
| 打开网站                   | await driver.get('xxx')                                          |                        |
| 获取当前 URL               | await driver.getCurrentUrl()                                     |                        |
| 后退                       | await driver.navigate().back()                                   |                        |
| 前进                       | await driver.navigate().forward()                                |                        |
| 刷新                       | await driver.navigate().refresh()                                |                        |
| 获取标题                   | await driver.getTitle()                                          |                        |
| 获得当前窗口的窗口句柄     | await driver.getWindowHandle()                                   |                        |
| 获得该轮测试打开的全部句柄 | await driver.getAllWindowHandles()                               |                        |
| 打开并切换到新标签页       | await driver.switchTo().newWindow('tab')                         |                        |
| 打开并切换到新窗口         | await driver.switchTo().newWindow('window')                      |                        |
| 关闭标签页                 | await driver.close()                                             | 关闭后必须手动切换句柄 |
| 切回到指定句柄的标签页     | await driver.switchTo().window(originalWindow)                   |                        |
| 退出浏览器                 | await driver.quit()                                              |                        |
| 执行 js 脚本               | await driver.executeScript('return arguments[0].innerText', dom) | 以获取元素文本为例     |

#### 2.2.2 窗口位置操作

| 描述                   | 用法                                                               | 备注 |
| ---------------------- | ------------------------------------------------------------------ | ---- |
| 获取窗口大小           | await driver.manage().window().getRect()                           |      |
| 设置窗口大小           | await driver.manage().window().setRect({width: 1024, height: 768}) |      |
| 窗口左上角的坐标       | const {x, y} = await driver.manage().window().getRect()            |      |
| 将窗口移动到设定的位置 | await driver.manage().window().setRect({x: 0, y: 0})               |      |
| 最大化窗口             | await driver.manage().window().maximize()                          |      |
| 最小化窗口             | await driver.manage().window().minimize()                          |      |
| 全屏窗口               | await driver.manage().window().fullscreen()                        |      |

#### 2.2.3 截图

-   浏览器可视范围以 base64 编码返回

    ```js
    let encodedString = await driver.takeScreenshot();
    await fs.writeFileSync('./image.png', encodedString, 'base64');
    ```

-   捕获某元素截图，以 base64 编码返回（会先聚焦该元素，然后截图可视范围）

    ```js
    let ele = await driver.findElement(By.css('h1'));
    let encodedString = await ele.takeScreenshot(true);
    await fs.writeFileSync('./image.png', encodedString, 'base64');
    ```

-   将页面以 pdf 形式输出，使用该功能必须设置*无头模式*

    ```js
    const {Builder} = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    let opts = new chrome.Options();
    let fs = require('fs');
    (async function example() {
      let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts.headless())
        .build();
    await driver.get('https://www.selenium.dev');
    try {
      let base64 = await driver.printPage({pageRanges:["1-2"]});
      await fs.writeFileSync('./test.pdf', base64, 'base64');
    } catch (e) {
      console.log(e)
    }
    await driver.quit();
    ```
