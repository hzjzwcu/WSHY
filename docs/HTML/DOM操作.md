# DOM操作

`DOM（文档对象模型）`操作是前端开发中常用的技术，用于动态地修改网页的内容、结构和样式。在DOM操作中，节点（Node）是一个核心概念，代表文档树中的一个单独的部分，比如元素节点（Element）、文本节点（Text）、属性节点（Attribute）等。下面我将详细列举和演示一些常见的DOM节点操作。

## 一、节点

### 1.1 创建

元素节点

```js
const div = document.createElement("div")
```

文本节点

```js
const txt = document.createTextNode("txtVal")
```

文档碎片（存储临时节点，可用于性能优化，将多个dom操作合并完成，一次性添加到页面）

```js
const fragment = document.createDocumentFragment()
```

> fragment本身并不会被插入到dom中

插入子节点

```js
var parentElement = document.getElementById('parentId');
parentElement.appendChild(newDiv);
```

指定兄弟节点前插入子节点

```js
var parentElement = document.getElementById('parentId');
parentElement.insertBefore(newDiv,childDiv);
```

### 1.2 查询

css选择器查询dom

```js
document.querySelector('.element')
document.querySelectorAll("p")
```

id选择器

```js
document.getElementById('id'); 
```

class选择器

```js
document.getElementsByClassName('className2'); 
```

标签选择器

```js
document.getElementsByTagName('div');
```

### 1.3 删除

```js
var delDom = parentDom.removeChild(dom1);
```

### 1.4 更新

替换子节点

```js
var replacedNode = parentElement.replaceChild(newDiv, oldNode);
```

## 二、类名

```js
ele.classList.add("newcloass");
ele.classList.remove("oldClass");
ele.classList.toggle("toggleClass"); // 切换
```

## 三、样式

```js
ele.style.color = 'red'
```

## 四、属性

```js
element.setAttribute("width",'200px');
var w = element.getAttribute("width");
element.removeAttribute("width");
```

### `e.getAttribute(propName)`

- **定义**: `getAttribute()`是一个方法，它接收一个字符串参数（属性名），并返回该属性的值（如果元素拥有该属性）。如果属性不存在，则返回`null`或`""`（空字符串）。

- **属性名大小写**: 在`getAttribute()`中，属性名不区分大小写。

- **用途**: 主要用于获取元素的标准HTML属性或者自定义属性的值。它总是返回一个字符串表示的属性值，或者当属性不存在时返回`null`。

- 示例

  :

  ```js
  var attributeValue = e.getAttribute('data-custom');
  ```

### `e.propName`

- **定义**: 使用点（`.`）语法（或者方括号`[]`语法）直接访问元素的属性。这里的`propName`是元素对象上的一个属性名。

- **属性名大小写**: 使用点（`.`）语法或方括号（`[]`）语法时，属性名是区分大小写的。

- **用途**: 主要用于访问元素对象的内置属性，如`id`、`className`、`value`等。对于HTML标准属性，它们往往映射到DOM对象的属性上，但并非总是一一对应。例如，HTML中的`class`属性在JavaScript中是`className`属性。此外，对于布尔型属性（如`checked`、`disabled`等），使用点语法访问会返回布尔值而不是字符串。

- 示例

  :

  ```js
  var idValue = e.id;  // 相当于 e.getAttribute('id')
  var classValue = e.className;  // 相当于 e.getAttribute('class')
  ```

### 区别

- `getAttribute()`是用于获取元素的任意属性的值，包括非标准的自定义属性，而点（`.`）语法通常用于访问元素的标准属性。
- `getAttribute()`返回的总是字符串（或`null`），即使属性的逻辑值是布尔型。而点（`.`）语法访问的布尔属性，如`checked`，将返回布尔值。
- 在HTML中定义的属性名对于`getAttribute()`不区分大小写，但在使用点（`.`）语法时，属性名是区分大小写的。

## 五、内容

文本内容

```js
ele.textContent = 'newVal';
var txt = ele.textContent;
ele.innerText = '新的文本内容';
var content = ele.innerText;
```

文本内容和子节点内容

```js
ele.innerHTML = '<span>新的HTML内容</span>';
var htmlContent = element.innerHTML;
```

`innerText` 考虑了CSS样式，例如当元素被CSS隐藏时，`innerText` 不会返回该元素的文本，`textContent` 则会返回节点及其后代的所有文本内容，不考虑CSS样式或元素是否被隐藏。这意味着 `innerText` 会触发**重排（reflow）**以考虑样式，可能导致性能问题，而 `textContent` 则不会。

`innerText` 是很多时候处理可见文本内容的不错选择，尤其是当你关心文档中文本的实际呈现方式时。但需要注意的是，在处理大量数据或对性能有较高要求的场景下，建议优先考虑使用 `textContent`，因为它的性能通常会更好。





