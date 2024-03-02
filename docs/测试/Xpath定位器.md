# RobotFramework-SeleniumLibrary 定位器

### 一、常用定位器

- id 定位器 - `id=kw1 `

- css 定位器 - `css=input#su`

- js中用法为

    ```js
    function getXpathDoms(xpath) {
        let result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        let doms = [];
        while (true) {
            let tmpDom = result.iterateNext();
            if (tmpDom) {
                doms.push(tmpDom);
            } else {
                break;
            }
        }
        return doms;
    }
    ```

    

### 二、Xpath 定位器（默认可以不填 `xpath=`）

| 用途说明             | 示例                                             | 备注 |
| -------------------- | ------------------------------------------------ | ---- |
| 绝对路径             | /html/body/div[1]/div[4]/span[1]/input           |      |
| 相对路径（可跨级）   | //input                                          |      |
| 属性选择             | //input[@type='text']                            |      |
| 完全匹配节点文本     | //span[text()="内容"]                            |      |
| 模糊匹配节点文本     | //a[contains(text(), '内容')]                    |      |
| 模糊匹配 class       | //span[contains(@class, 'c1')]                   |      |
| 同时查找两个属性     | //input[@id=’kw1’ or @name=’wd’]                 |      |
| 相对下一个选择器     | //span[text()="登录"]/following::div             |      |
| 相对上一个同级选择器 | //span[text()="登录"]/preceding-sibling::span[1] |      |
| 选择第二个匹配项     | (//div[text()="文本"])[2]                        |      |
