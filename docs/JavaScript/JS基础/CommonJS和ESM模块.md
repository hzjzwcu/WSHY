# CommonJS和ESM模块

## 前言

- `CommonJS` 模块输出的是一个值的**浅拷贝**，`ESM`输出的是值的**引用**。
- `CommonJS` 模块是**运行**时加载，`ESM`是**编译**时输出接口。

## CommonJS

### 特性

`CommonJS`的模块解析发生在 **执行阶段**，因为 `require` 和 `module` 本质上就是个函数或者对象，只有在 **执行阶段** 运行时，这些函数或者对象才会被实例化。因此被称为 `运行时加载`。

> CommonJS 并不是 ECMAScript 标准的一部分，所以 **类似 `module` 和 `require` 并不是 JS 的关键字，仅仅是对象或者函数而已**

```js
// a.js
let val = 1;

const setVal = (newVal) => {
  val = newVal
}

module.exports = {
  val,
  setVal 
}

// b.js
const { val, setVal } = require('./a.js')

console.log(val);

setVal(101);

console.log(val);
```

运行 `b.js`，输出结果为：

```js
1
1
```

以上代码可以简写为

```js
const myModule = {
  exports: {}
}

let val = 1;

const setVal = (newVal) => {
  val = newVal
}

myModule.exports = {
  val,
  setVal
}

const { val: useVal, setVal: useSetVal } = myModule.exports

console.log(useVal);

useSetVal(101)

console.log(useVal);
```

因为`CommonJS`导出的值都是对原值的**浅拷贝**，所以简单类型的值导出后再修改是无法影响原值的，如果上述例子换成对象，那导出的就是一个对象的引用，修改新对象的属性也会影响原对象

### 加载缓存

 `CommonJS` 模块相互引用时，没有产生类似死锁的问题。关键在 `Module._load` 函数里，具体源代码在这里。`Module._load` 函数主要做了下面这些事情：

1. 检查缓存，如果缓存存在且已经加载，直接返回缓存，不做下面的处理
2. 如果缓存不存在，新建一个 Module 实例
3. 将这个 Module 实例放到缓存中
4. 通过这个 Module 实例来加载文件
5. 返回这个 Module 实例的 exports

当 `app.js` 加载 `a.js` 时，Module 会检查缓存中有没有 `a.js`，发现没有，于是 new 一个 `a.js` 模块，并将这个模块放到缓存中，再去加载 `a.js` 文件本身。

在加载 `a.js` 文件时，Module 发现第一行是加载 `b.js`，它会检查缓存中有没有 `b.js`，发现没有，于是 new 一个 `b.js` 模块，并将这个模块放到缓存中，再去加载 `b.js` 文件本身。

在加载 `b.js` 文件时，Module 发现第一行是加载 `a.js`，它会检查缓存中有没有 `a.js`，发现存在，于是 `require` 函数返回了缓存中的 `a.js`。

但是其实这个时候 `a.js` 根本还没有执行完，还没走到 `module.exports` 那一步，所以 `b.js` 中 `require('./a.js')` 返回的只是一个默认的空对象。所以最终会报 `setA is not a function` 的异常。

将 **放到缓存中** 与 **加载文件** 的执行顺序互换，这样写会死锁，最终导致 JS 报栈溢出异常。

## ES Module

### 特性

ESM模块解析是发生在 **编译阶段**，所以在编译阶段，`import` 模块中引入的值就指向了 `export` 中导出的值。

例如，根据 ES6 规范，`import` 只能在模块顶层声明，下面的写法会直接报语法错误，不会有 log 打印，因为它压根就没有进入 **执行阶段**：

```js
console.log('hello world');

if (true) {
  import { resolve } from'path';
}

// out:
//   import { resolve } from 'path';
//          ^
// SyntaxError: Unexpected token '{'
```

这里要特别强调，**与CommonJS 不同，ESM 中 `import` 的不是对象， `export` 的也不是对象**。例如，下面的写法会提示语法错误：

```js
// 语法错误！这不是解构！！！
import { a: myA } from './a.mjs'

// 语法错误！
export {
  a: "a"
}
```

`import` 和 `export` 的用法很像导入一个对象或者导出一个对象，但这和对象完全没有关系。他们的用法是 ECMAScript 语言层面的设计的，并且“恰巧”的对象的使用类似。

### 加载缓存

在讲解ESM 的加载细节之前，我们要了解 ESM 中也存在 **变量提升** 和 **函数提升** ，意识到这一点非常重要。

拿前面 `demos/02` 中提到的循环引用举例子，将其改造为 ESM 版的循环引用，查看 `demos/04`，代码的入口为 `app.js`：

```js
import'./a.mjs';
```

看看 `./a.mjs` 的代码：

```js
import { b, setB } from'./b.mjs';

console.log('running a.mjs');

console.log('b val', b);

console.log('setB to bb');

setB('bb')

let a = 'a';

constsetA = (newA) => {
  a = newA;
}

export {
  a,
  setA
}
```

再看看 `./b.mjs` 的代码：

```js
import { a, setA } from'./a.mjs';

console.log('running b.mjs');

console.log('a val', a);

console.log('setA to aa');

setA('aa')

let b = 'b';

constsetB = (newB) => {
  b = newB;
}

export {
  b,
  setB
}
```

可以看到 `./a.mjs` 和 `./b.mjs` 在文件的开头都相互引用了对方。

执行 `node app.mjs` 查看运行结果：

```js
running b.mjs
file:///Users/xxx/Desktop/esm_commonjs/demos/04/b.mjs:5
console.log('a val', a);
                     ^

ReferenceError: Cannot access 'a' before initialization
    at file:///Users/xxx/Desktop/esm_commonjs/demos/04/b.mjs:5:22
```

我们会发现一个 `ReferenceError` 的异常报错，提示不能在初始化之前使用变量。这是因为我们使用了 `let` 定义变量，使用了 `const` 定义函数，导致无法做变量和函数提升。

如果声明的时候使用`var`，执行 `node app.mjs` 的结果会是：

```
running b.mjs
a val undefined
setA to aa
running a.mjs
b val b
setB to bb
```

可以发现这样修改后可以正常执行，没有出现异常报错。

写到这里我们可以详细谈谈 ESM 的加载细节了，它其实和前面提到的 CommonJS 的 `Module._load` 函数做的事情有些类似：

1. 检查缓存，如果缓存存在且已经加载，则直接从缓存模块中提取相应的值，不做下面的处理
2. 如果缓存不存在，新建一个 Module 实例
3. 将这个 Module 实例放到缓存中
4. 通过这个 Module 实例来加载文件
5. 加载文件后到**全局执行上下文**时，会有创建阶段和执行阶段，在创建阶段做函数和变量提升，接着执行代码。
6. 返回这个 Module 实例的 exports

当 `app.mjs` 加载 `a.mjs` 时，Module 会检查缓存中有没有 `a.mjs`，发现没有，于是 new 一个 `a.mjs` 模块，并将这个模块放到缓存中，再去加载 `a.mjs` 文件本身。

在加载 `a.mjs` 文件时，在 **创建阶段** 会为全局上下文中的函数 `setA` 和 变量 `a` 分配内存空间，并初始化变量 `a` 为 `undefined`。在执行阶段，发现第一行是加载 `b.mjs`，它会检查缓存中有没有 `b.mjs`，发现没有，于是 new 一个 `b.mjs` 模块，并将这个模块放到缓存中，再去加载 `b.mjs` 文件本身。

在加载 `b.mjs` 文件时，在 **创建阶段** 会为全局上下文中的函数 `setB` 和 变量 `b` 分配内存空间，并初始化变量 `b` 为 `undefined`。在执行阶段,发现第一行是加载 `a.mjs`，它会检查缓存中有没有 `a.mjs`，发现存在，于是 `import` 返回了缓存中 `a.mjs` 导出的相应的值。

虽然这个时候 `a.mjs` 根本还没有执行过，但是它的 **创建阶段** 已经完成了，即在内存中也已经存在了 `setA` 函数和值为 `undefined` 的变量 `a`。所以这时候在 `b.mjs` 里可以正常打印 `a` 并使用 `setA` 函数而没有异常抛错。

## 异同点

### this 指向

- `CommJS`中的`this`指向源码
- `ESM`中的`this`指向 `undefined`

### 模块变量

- `CommonJS`中模块会使用函数封装，并指定一些常见变量，比如 `__filename`、`__dirname`
- `ESM`中无法直接使用这些变量

### 缓存

这一点两种模块方案一致，都会缓存模块，模块加载一次后会缓存起来，后续再次加载会用缓存里的模块。