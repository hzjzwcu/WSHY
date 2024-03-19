# ES6 技巧

## 数组

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











































