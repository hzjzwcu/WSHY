# ES6及之后的新特性

## ES6（2015）

### `Array.of`

传递给Array函数的参数个数不一样，其功能也不一样。这常常让开发者感到困惑，可以使用 Array.of 来弥补 Array 的不足

```js
const array4 = Array.of(1, 2, 3) // [ 1, 2, 3 ]
```

### `Array.from`

将类数组转为真正的数组

```js
const domsNodeList = document.querySelectorAll('div')
const domsArray = Array.from(domsNodeList) // [ dom, dom, dom, ... ]
```

第二个参数和`map`遍历方法类似，可以处理每一个数组成员

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

`flat()` 方法创建一个新数组，其中所有子数组元素以递归方式连接到指定深度

```js
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
const flat1 = array.flat() // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ]
const flat2 = array.flat(2) // [ 1, 2, 3, [ 4, [ 5 ] ] ]
const flatAll = array.flat(Infinity) // [ 1, 2, 3, 4, 5 ]
```

## ES7（2016）

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

## ES8（2017）

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

## ES9（2018）

### `Async iterators` 

`Async iterator` 对象的 next() 方法返回一个 `Promise`，这个 `Promise` 的返回值可以被解析成 `{value, done}` 的格式，示例如下：

```js
const asyncIterator = () => {
  const array = [1, 2];
  return {
    next: function() {
      if(array.length) {
        return Promise.resolve({
          value: array.shift(),
          done: false
        });
      }
      return Promise.resolve({
        done: true
      });
    }
  }
}

let iterator = asyncIterator();

const test = async() => {
  await iterator.next().then(console.log);  // {value: 1, done: false}
  await iterator.next().then(console.log);  // {value: 2, done: false}
  await iterator.next().then(console.log);  // {done: true}
}

test();
```

### `for-await-of`

在循环中异步调用函数

```js
const promises = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
  new Promise((resolve) => resolve(3)),
];

const test = async() => {
  for await (const p of promises) {
    console.log('p', p);
  }
};

test();
```

### `rest`对象

```js
let test = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

let {a, b, ...rest} = test;

console.log(a);               // 1
console.log(b);               // 2
console.log(rest);            // {c: 3, d: 4}
```

```js
let test = {
  a: 1,
  b: 2
}
let result = {c: 3, ...test};
console.log(result);             // {c: 3, a: 1, b: 2}
```

### `Promise finally`

管是结果是`resolved`还是`rejected`，都会调用`finally`中的方法，`finally`中的回调函数不接受任何参数

```js
const promise = new Promise((resolve, reject) => {
  resolve('resolved');
  reject('rejectd');
})

promise.then((res) => {
  console.log(res);
}).finally(() => {
  console.log('finally')
});
```

## ES10（2019）

### `flat`

扁平化嵌套数组，可传入一个数字参数控制遍历的深度，默认深度为1

返回值是新数组，不更改原数组

```js
const arr = [1, 2, [[[[3, 4]]]]];

arr.flat();          // [1, 2, [[[3, 4]]]]
arr.flat(3);         // [1, 2, [3, 4]]
arr.flat(-1);        // [1, 2, [[[[3, 4]]]]]
arr.flat(Infinity);  // [1, 2, 3, 4]
```

- `flat()`会移除数组中的空项

```js
let arr = [1, 2, , , 3];
arr.flat();           // [1, 2, 3]
```

### `flatMap`

`flatMap()`方法可以在`map`遍历映射处理后进行`flat`操作，传入参数不再是深度值（默认为1）,而是一个回调函数，类似`Array.map`的使用方式

```js
let arr = ['My name', 'is', '', 'Lisa'];
let newArr1 = arr.flatMap(cur => cur.split(' '));
let newArr2 = arr.map(cur => cur.split(' '));
console.log(newArr1); // ["My", "name", "is", "", "Lisa"]
console.log(newArr2); // [["My", "name"], ["is"], [""], ["Lisa"]]
```

### `Object.fromEntries`

使用键值对数组创建一个对象

```js
let map = new Map([['a', 1], ['b', 2]]);
let mapToObj = Object.fromEntries(map);
console.log(mapToObj);  // {a: 1, b: 2}

let arr = [['a', 1], ['b', 2]];
let arrToObj = Object.fromEntries(arr);
console.log(arrToObj);   // {a: 1, b: 2}
```

### `trimStart/trimLeft`

删除字符串开头的空白字符

```js
str = '    a b cd  ';
str.trimStart();   // 'a b cd  '
str.trimLeft();    // 'a b cd  '
```

### `trimEnd/trimRight`

删除字符串末尾的空白字符

```js
str = '    a b cd  ';
str.trimEnd();   // 'a b cd  '
str.trimRight();    // 'a b cd  '
```

### `Symbol`描述

返回`Symbol`对象的可选描述的字符串

```js
Symbol('foo').description;      // 'foo'
Symbol().description;           // undefined
Symbol.for('foo').description;  // 'foo'
```

### `catch`捕获可选

允许`catch`省略掉错误捕获

```js
try {
} catch {
}
```

### `JSON.stringify` 增强

`JSON.stringify()` 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题，所以遇到 0xD800-0xDFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
JSON.stringify('😊'); // '"😊"'
```

###  `toString()` 增强

函数在调用`toString`方法时将会显示更多信息，比如空格和注释

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString());
// function foo() {
//     // es10新特性
//     console.log('imooc')
// }
```

## ES11（2020）

### `??` 合并运算

左侧值为 `null` 或者 `undefined` 时返回右侧值

```js
undefined ?? 'foo'  // 'foo'
null ?? 'foo'  // 'foo'
'foo' ?? 'bar' // 'foo'
0 ?? 1  // 0
'' ?? 'bar'  // ''
NaN ?? 1  // NaN
false ?? 'bar'  // false
```

### `||` 或运算

左侧值为假值时返回右侧值

```js
undefined || 'foo'  // 'foo'
null || 'foo'  // 'foo'
'foo' || 'bar' // 'foo'
0 || 1  // 1
'' || 'bar'  // 'bar'
NaN || 1  // 1
false || 'bar'  // 'bar'
```

> `&&、||、??`这三个运算符不可混用，否则会报错

### `?.` 可选链

读取属性时，对象如果是`null`或者`undefined`不会报错，返回值是`undefined`

```js
const num = user && user.address && user.address.getNum && user.address.getNum();
const num2 = user?.address?.getNum?.();
```

> 不允许用可选链语法给属性赋值 `a?.b=1`

### `globalThis`

以前获取全局对象是区分不同环境的，比如`web`下是`window`，`nodejs`环境下是`global`，严格模式也会有不同的表现，现在有了一个标准，就是`globalThis`对象，可以在全部环境下获取全局对象

### `BigInt`

新增的内置对象，可创建任意大的整数，这之前`number`类型的数字最大只能是`2^53-1`

#### `BigInt`

- 在整数后加`n`即可创建大数类型，例如`10n`

- 还可以调用函数创建，例如`BigInt(10)`

- `BigInt`不能使用`Math`对象计算

- 带小数的运算会向下取整

  ```js
  console.log(10/6)   // 1.6666666666666667
  console.log(10n/6n) // 1n
  ```

- `BigInt`与`Number`不严格相等，但宽松相等

  ```js
  console.log(10 === 10n)  // false
  console.log(10 == 10n)   // true
  ```

- `BigInt`与`Number`不能直接混用计算，必须转换格式，但转换会丢失精度，然而两者可以进行比较大小

  ```js
  console.log(10.1 > 10n)  // true
  console.log(10 > 10n)    // false
  ```























































