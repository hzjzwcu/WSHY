# this

> 当一个函数被调用时，会创建一个活动记录（有时候也称为**执行上下文**）。其中包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this` 就是上下文中的一个属性，在函数**被调用时**，会被绑定在函数作用域中

## 一、关于 this

### 1.1 为什么要使用 this

首先来看一段代码，我们的某些功能会要求在函数中**传入上下文对象**

```js
var Tom = { name: 'Tom' };
var Jerry = { name: 'Jerry' };
function identify(context) {
    console.log(context.name.toUpperCase());
}
identify(Tom); // TOM
identify(Jerry); // JERRY
```

如果使用 `this` 的话这段代码可以修改为

```js
var Tom = { name: 'Tom' };
var Jerry = { name: 'Jerry' };
function identify() {
    console.log(this.name.toUpperCase());
}
identify.call(Tom); // TOM
identify.call(Jerry); // JERRY
```

可以看到，`this` 提供了一种更优雅的方式来**隐式传递**一个对象引用，易于复用，而显式传递上下文对象会在代码规模变大后显得越来越混乱

### 1.2 关于指向的误区

#### 函数对象本身？

我们从字面意义上理解指向时通常会觉得 `this` 指向自身，也就是函数对象，这是一个误区，例如下面这段代码：

```js
function count(i) {
    console.log(i);
    this.num++; // 预期结果是每调用一次就增加 1
}
count.num = 0;
for (let i = 0; i < 3; i++) {
    count(i); // 三次分别输出 0 1 2
}
console.log(count.num); // 0
```

查看上述代码可知，通过`this`修改函数本身的属性是做不到的，所以**`this`并非指向函数对象本身**。

#### 函数作用域？

另一种常见的误解是`this`指向函数作用域，例如下面的代码：

```js
function foo() {
    var a = 2;
    this.bar(); // TypeError: this.bar is not a function
}
function bar() {
    console.log(this.a);
}
foo(); // undefined
```

这段代码存在两处错误：

- 误以为 `foo` 内部的 `this` 指向 `foo` 所在的作用域，因此视试图通过 `this` 查找函数 `bar` 

- 误以为 `bar` 内部的 `this` 指向调用时的作用域，因此试图通过 `this` 查找变量 `a` 

> 每当你想要把 `this` 和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。

## 二、绑定规则

### 2.1 默认绑定

在全局作用域下进行正常的函数调用时，函数 `this` 指向全局对象

```js
function foo() {
    console.log(this === window); // true；Node 环境中是 global
}
foo();
```

> 严格模式下全局对象为 `undefiend`

### 2.2 隐式绑定

#### 对象属性调用

如果使用上下文对象的属性来间接引用函数，`this`会被绑定到这个上下文对象上

```js
function foo() {
    console.log(this === obj); // true
}
var obj = { foo: foo };
obj.foo();
```

链式调用中只有最后一层的对象会影响`this`

```js
function foo() {
    console.log(this === obj2); // true
}
var obj2 = { foo: foo };
var obj1 = { obj2: obj2 };
obj1.obj2.foo();
```

#### 回调函数

如果将函数本身作为回调函数传入，则`this`指向全局对象

```js
function foo() {
    console.log(this);
}
function doFun(fn) {
    fn();
}
var obj = { foo: foo };
doFun(obj.foo); // window
```

`setTimeout` 与上述代码中的 `doFun` 结构类似，最后结果相同

> 参数传递是一种隐性赋值，如果我们将对象内部属性方法赋值给一个变量，然后调用变量，也会是默认绑定的效果

### 2.3 显式绑定

绝大多数函数都可以通过`call`、`apply`、`bind`显式地绑定`this`指向，他们的第一个参数就是`this`

```js
function foo() {
    console.log(this);
}
var obj = {};
var bar = foo.bind(obj);
bar(); // obj
foo.call(obj); // obj
foo.apply(obj); // obj
```

如果传入一个基本类型的变量，会将对象转换为它的对象形式（也叫装箱）后再绑定`this`

```js
function foo() {
    console.log(this);
}
foo.call('str'); // new String('str')
foo.call(123); // new Number(123)
```

还有一些函数也可以显式地指定上下文，比如 `foreach`

```js
function foo(el) {
    console.log(el, this.id);
}
var obj = {
    id: 'awesome',
};
// 调用 foo(..) 时把 this 绑定到 obj
[1, 2, 3].forEach(foo, obj); // 1 awesome 2 awesome 3 awesome
```

> 显式绑定  `null`/`undefined` 时会用默认绑定规则，但这样会**污染全局作用域**，更安全的做法时始终传入一个对象，即使这一段代码中的逻辑并不关心`this`指向

### 2.4 new 绑定

使用 `new` 来调用 `foo(..)` 时，我们会构造一个新的实例对象并把它绑定到 `foo(..)` 调用中的 `this` 上。

```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2
```

### 2.5 优先级

显式绑定 > 隐式绑定

```js
function foo() {
    console.log(this);
}
var obj1 = { a: 1, foo };
var obj2 = { a: 2, foo };
obj1.foo.call(obj2); // obj2
```

new 绑定 > 隐式绑定

```js
function foo() {
    console.log(this);
}
var obj1 = { a: 1, foo };
new obj1.foo(); // 实例对象,而不是 obj1
```

new 绑定 > 显式绑定

```js
function foo() {
    console.log(this);
}
var obj1 = { a: 1, foo };
var obj2 = { a: 2, foo };
var bar = obj1.foo.bind(obj2);
bar(); // obj2
new bar(); // 实例对象
```

> `new obj1.foo.call(obj2)` 的写法是不允许出现的，所以对比的时候只能用 `bind` 示例

结论：**new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

## 三、箭头函数

箭头函数不使用任何绑定规则，而是由定义箭头函数的位置（外层函数或者全局作用域）决定：

```js
function foo() {
    return () => {
        console.log(this);
    };
}
var obj1 = { a: 1 };
var obj2 = { a: 2 };

var bar = foo.call(obj1);
bar(); // { a: 1 }
bar.call(obj2); // { a: 1 }
```

上述示例中，`bar` 这个箭头函数外部的 `this` 是由外部函数`foo` 决定，`foo` 首次被调用时其 `this` 被固定为 `obj1`，之后 `foo` 的 `this` 仍旧可以修改，但**箭头函数的 this 一旦确定就无法修改。
