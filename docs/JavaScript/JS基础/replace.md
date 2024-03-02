# str.replace()

[TOC]

### 一、用法

`replace`方法用于在字符串中替换字符

- 语法 `string.replace(regexp/substr,replacement)`

- 参数描述

    | 参数            | 描述                                                   | 是否必填 |
    | --------------- | ------------------------------------------------------ | -------- |
    | `regexp/substr` | 规定替换模式的**正则对象**或者待替换的**子字符串文本** | 是       |
    | `replacement`   | 规定替换的文本或者生成替换文本的函数方法               | 是       |

- 返回值

    返回一个替换后的**新字符串**，不会改变原字符串

### 二、说明

- 默认只会替换第一次匹配到的子串，如果 `regexp` 对象具有全局标志 `g` ，那么会替换所有匹配的子串

- `replacement` 如果是函数，接受如下顺序的参数

    1. 匹配到的子串
    2. `regexp`中的`n`个**子表达式**匹配到的结果（可以为0）
    3. 匹配到的子串在原文本中的**索引**
    4. 原文本本身

- `replacement` 如果是字符串，可以使用一些特殊变量

    | 变量                  | 匹配模式                        |
    | --------------------- | ------------------------------- |
    | `$1`、`$2`、...、`$n` | `regexp`中的第`n`个**子表达式** |
    | $&                    | `regexp`匹配的子串              |
    | $`                    | 匹配子串左侧的文本              |
    | $'                    | 匹配子串右侧的文本              |
    | $$                    | 无特殊含义，单纯的$符号         |

### 三、示例

基础替换

```js
let str = 'Hello World Hello World';
let res = '';

res = str.replace('Hello', 'Hi');
console.log(res); // Hi World Hello World

res = str.replace(/Hello/g, 'Hi');
console.log(res); // Hi World Hi World

res = str.replace(/hEllo/gi, 'Hi');
console.log(res); // Hi World Hi World
```

`$`符号

```js
let str = 'left center right';
let res = '';

// $n：第n个子表达式
res = str.replace(/(left) (center) (right)/, '$3 $2 $1');
console.log(res); // right center left

// $&：匹配子串本身
res = str.replace(/\w+/g, '{$&}');
console.log(res); // {left} {center} {right}

// $`：匹配子串左侧
res = str.replace('center', '{$`}');
console.log(res); // left {left } right

// $'：匹配子串右侧
res = str.replace('center', "{$'}");
console.log(res); // left { right} right

// $$：无特殊含义，单纯的$符号
res = str.replace('center', '{$$}');
console.log(res); // left {$} right
```

进阶用法

- 双引号变单引号

    ```js
    let str = '"hello world" "hello world"';
    let res = str.replace(/"([^"]*)"/g, "'$1'");
    console.log(res); // 'hello world' 'hello world'
    ```

- 每个单词的首字母大写

    ```js
    
    ```

    

```js
let str = 'hello world';
let res = str.replace(/\w+/g, (word) => {
    return word[0].toUpperCase() + word.slice(1);
});
console.log(res); // Hello World

```



















