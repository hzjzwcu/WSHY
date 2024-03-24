# ES6及之后的新特性

## ES6

### `Array.of`

传递给Array函数的参数个数不一样，其功能也不一样。这常常让我感到困惑，可以使用 Array.of 来弥补 Array 的不足

```js
const array4 = Array.of(1, 2, 3) // [ 1, 2, 3 ]
```

### `Array.from`

将类数组转为真正的数组

```js
const domsNodeList = document.querySelectorAll('div')
const domsArray = Array.from(domsNodeList) // [ dom, dom, dom, ... ]
```

我们可以像“[].map”一样使用 Array.from 方法。

```js
const array = [ 1, 2, 3 ]
const array2 = Array.from(array, (num) => num * 2) // [2, 4, 6]
```

### `array.at`

往常我们需要以“`array.length-1`”作为下标来读取数组末尾元素，现在可以通过`at`实现

```js
const array = [ 1, 2, 3, 4, 5 ]
const lastEle = array.at(-1) // 5
const ele1 = array.at(0) // 1
```

### `array.flat`

flat() 方法创建一个新数组，其中所有子数组元素以递归方式连接到指定深度

```js
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
const flat1 = array.flat() // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ]
const flat2 = array.flat(2) // [ 1, 2, 3, [ 4, [ 5 ] ] ]
const flatAll = array.flat(Infinity) // [ 1, 2, 3, 4, 5 ]
```

## ES7

ES2016（ES7）中新增了如下特性👇

### `includes`

`includes()`方法用来判断一个数组或字符串中是否包含一个指定的值，如果包含返回`true`，否则返回`false`。

第一个参数是查找的值

第二个参数默认0，代表从第几位开始查找，支持负数

```js
let arr = [1, 2, 3, 4];
arr.includes(3);        // true
arr.includes(3, 2);     // true
arr.includes(3, 3);     // false
```

### `Operator`幂运算

幂运算符`**`，相当于`Math.pow()`

```js
5 ** 2 // 25
```

## ES8

### `Async functions`

异步函数，内部允许使用`await`关键字，返回值会被`promise`包裹

### `Object.values`

返回对象的可枚举属性的值组成的数组，对于`Object.keys`

```js
let obj = {a: 1, b: 2};
Object.values(obj);         // [1, 2]
```

### `Object.entries`

返回对象的可枚举属性键值对数组

```js
let obj = {a: 1, b: 2};
Object.entries(obj);        // [['a', 1], ['b', 2]]
```

### `Object.getOwnPropertyDescriptors`

返回对象自身的属性描述符，示例：

```js
let obj = {a: 1, b: 2};
Object.getOwnPropertyDescriptors(obj);   
```

返回值如下：

```json
{
    "a": {
        "value": 1,
        "writable": true,
        "enumerable": true,
        "configurable": true
    },
    "b": {
        "value": 2,
        "writable": true,
        "enumerable": true,
        "configurable": true
    }
}
```

### `Trailing commas` 尾后逗号

允许在最后一个属性后面添加逗号（不允许在剩余参数以及`json`后加尾逗号）

```js
// ✅ 
a = [1, 2,]
b = { a: 1, b: 2, }
c = (a, b,) => a + b
// ❌ 
d = (a, ...b,) => a + b
e = JSON.parse('{"a": 1,}')
```

### `padStart`

使用另一段字符串填充到当前字符串的开头，直到长度满足指定要求，第一个参数是指定长度，第二个参数是填充字符串，默认是空字符串

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(1);          // "abc"
```

### `padEnd`

同上，只是会填充到字符串末尾

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

https://mp.weixin.qq.com/s/GbSNPeDhllfsSP6y1LIdNg









































