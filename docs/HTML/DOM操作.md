# DOM操作

### innerHTML与innerText的作用于区别

- 作用：都可以获取或者设置元素的内容

- 区别：innerHTML可以解析内容中的html标签

- innerText不能解析内容中的html标签


### DOM 元素e的 e.getAttribute(propName)和 e.propName 有什么区别和联系

- e.getAttribute()返回值是源文件中设置的值，类型是[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)或者null（有的实现返回""）
- e.propName通常是在HTML文档中访问特定元素的**特性**（id，title等），浏览器解析元素后生成对应对象，这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用getAttribute进行访问
