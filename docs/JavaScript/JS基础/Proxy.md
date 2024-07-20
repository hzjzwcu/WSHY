# Proxy

Proxy可用于拦截对象操作，比如访问和赋值，它提供了一种机制，可以在对象的基础操作上注入自定义行为，可用于数据验证、日志记录、性能追踪、创建不可变的安全对象等多种场景



## 术语

**target**

等待处理的**目标对象**（任何类型对象都可以，比如数组、函数、proxy）

**traps**

**捕获器**，函数类型，会在对象进行各种操作时触发

**handler**

包含`traps`的对象



## 捕获器（trap）

`handler` 对象包含有 `Proxy` 的各个捕获器（trap）

所有的捕捉器都是可选的。**如果没有定义某个捕捉器，那么就会保留源对象的默认行为**。以下是常用捕获器及参数说明：



### [`handler.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf) 

读取对象原型（即内部 `[[Prototype]]` 属性的值）时触发

**返回值**

 `null` 或者任意对象

**参数**

- `target`： 被拦截目标对象

**示例**

```js
const obj1 = { a: 1 };
const obj2 = Object.create(obj1);

const proxy = new Proxy(obj2, {
    getPrototypeOf(target){
        console.log("called");
        return Reflect.getPrototypeOf(target)
    }
})

// 以下五种读取原型的方法都可以触发 getPrototypeOf 监听
console.log(Object.getPrototypeOf(proxy) === obj1); // "called"; outputs true
console.log(Reflect.getPrototypeOf(proxy) === obj1); // "called"; outputs true
console.log(proxy.__proto__ === obj1); // "called"; outputs true
console.log(obj1.isPrototypeOf(proxy)); // "called"; outputs true
console.log(proxy instanceof Object); // "called"; outputs true
```



### [`handler.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf) 

修改对象原型（即内部 `[[Prototype]]` 属性的值）时触发

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象

- `prototype`：待设置的新原型或者 `null`

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    setPrototypeOf(target, prototype) {
        console.log('called');
        return Reflect.setPrototypeOf(target, prototype);
    }
};

const proxy = new Proxy(object1, handler);

Object.setPrototypeOf(proxy, { newproperty: 'new' }); // "called"; 
Reflect.setPrototypeOf(proxy, { newproperty: 'new' }); // "called"; 
```



### [`handler.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible) 

[`Object.isExtensible`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 方法（查询对象是否支持新增属性、修改原型等扩展操作）的捕捉器

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    isExtensible(target) {
        console.log('called');
        return Reflect.isExtensible(target);
    }
};

const proxy = new Proxy(object1, handler);

console.log(Object.isExtensible(proxy)); // "called"; outputs true
console.log(Reflect.isExtensible(proxy)); // "called"; outputs true
```



### [`handler.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions) 

[`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 方法（阻止对象新增属性、修改原型等扩展操作）的捕捉器，会影响原对象

**返回值**

`boolean`（`Object.preventExtensions`会返回原对象）

**参数**

- `target`： 被拦截目标对象

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    preventExtensions(target) {
        console.log('called');
        return Reflect.preventExtensions(target);
    }
};

const proxy = new Proxy(object1, handler);

console.log(Object.preventExtensions(proxy)); // "called"; outputs { name: 'Alice' }
console.log(Reflect.preventExtensions(proxy)); // "called"; outputs true
```



### [`handler.getOwnpropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnpropertyDescriptor) 

[`Object.getOwnpropertyDescriptor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnpropertyDescriptor) 方法（获取对象的某个属性描述符）的捕捉器

**返回值**

返回一个 object 或 `undefined`

**参数**

- `target`： 被拦截目标对象
- `property`： 待查询的属性名

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    getOwnpropertyDescriptor(target, property) {
        console.log('called');
        return Reflect.getOwnpropertyDescriptor(target, property);
    }
};

const proxy = new Proxy(object1, handler);

console.log(Object.getOwnpropertyDescriptor(proxy, 'name')); // "called"; outputs { value: 'Alice', writable: true, enumerable: true, configurable: true }
console.log(Reflect.getOwnpropertyDescriptor(proxy, 'name')); // "called"; outputs { value: 'Alice', writable: true, enumerable: true, configurable: true }
```



### [`handler.defineproperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineproperty) 

[`Object.defineproperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineproperty) 方法（使用属性描述符新增或修改对象属性）的捕捉器

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象
- `property`： 待修改或新增的属性名
- `descriptor`： 属性描述符

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    defineproperty(target, property, descriptor) {
        console.log('called');
        return Reflect.defineproperty(target, property, descriptor);
    }
};

const proxy = new Proxy(object1, handler);
const desc = { configurable: true, enumerable: true, value: 10 };

// 以下三种方式都可以触发捕获器，但是返回值不同
console.log(Object.defineproperty(proxy, 'num', desc)); // "called"; outputs { name: 'Alice', num: 10 }
console.log(Reflect.defineproperty(proxy, 'num', desc)); // "called"; outputs true
console.log(proxy.num = 10) // "called"; outputs 10
```



### [`handler.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has) 

[`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) （查询对象和原型上是否有属性）操作符的捕捉器

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象
- `property`： 待查询的属性名

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    has(target, property) {
        console.log('called');
        return Reflect.has(target, property);
    }
};

const proxy = new Proxy(object1, handler);

// 即便对象在原型上，也会被拦截
console.log("name" in proxy); // "called"; outputs true
console.log("name" in Object.create(proxy)); // "called"; outputs true
console.log(Reflect.has(proxy, "name")); // "called"; outputs true
with (proxy) { (name); } // "called";
```



### [`handler.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get) 

读取对象或原型链上的属性操作的捕获器

**返回值**

`any`

**参数**

- `target`： 被拦截目标对象
- `property`： 待查询的属性名
- `receiver`： 代理对象或继承了代理的对象

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    get(target, property, receiver) {
        console.log('called', receiver);
        return Reflect.get(target, property, receiver);
    }
};

const proxy = new Proxy(object1, handler);
const proxy2 = Object.create(proxy);

console.log(proxy.name); // "called proxy"; outputs Alice
console.log(Reflect.get(proxy, 'name')); // "called proxy"; outputs Alice
console.log(proxy2.name); // "called proxy2"; outputs Alice
```



### [`handler.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) 

设置对象属性值操作的捕获器

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象
- `property`： 待设置的属性名
- `value`： 新属性值
- `receiver`： 代理对象或继承了代理的对象

**示例**

```js
const object1 = { name: "Alice" };

const handler = {
    set(target, property, value, receiver) {
        console.log('called', receiver);
        return Reflect.set(target, property, value, receiver);
    }
};

const proxy = new Proxy(object1, handler);
const proxy2 = Object.create(proxy);

console.log(proxy.a = 'aa'); // "called proxy"; outputs aa
console.log(proxy2.b = 'bb'); // "called proxy2"; outputs aa
console.log(Reflect.set(proxy, 'c', 'cc')); // "called proxy"; outputs true
```



### [`handler.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty) 

设置对象属性值操作的捕获器

**返回值**

`boolean`

**参数**

- `target`： 被拦截目标对象
- `property`： 待删除的属性名

**示例**

```js
const object1 = { name: "Alice", a: '1', b: '2' };

const handler = {
    deleteProperty(target, property) {
        console.log('called');
        return Reflect.deleteProperty(target, property);
    }
};

const proxy = new Proxy(object1, handler);

console.log(delete proxy.a); // "called"; outputs true
console.log(Reflect.deleteProperty(proxy, 'b')); // "called"; outputs true
```



### [`handler.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys) 

获取对象**自有属性**操作的捕获器

**返回值**

返回一个可枚举对象

**参数**

- `target`： 被拦截目标对象

**示例**

```js
const object1 = { a: "1", [Symbol.for('b')]: '2', [Symbol('c')]: '3' };
Object.setPrototypeOf(object1, { d: '4' });

const handler = {
    ownKeys(target) {
        console.log('called');
        return Reflect.ownKeys(target);
    }
};

const proxy = new Proxy(object1, handler);

// 以下五种方式获取对象的自有属性时，都会触发捕获器
console.log(Object.keys(proxy)); // "called"; outputs [ 'a' ]
console.log(Object.getOwnPropertyNames(proxy)); // "called"; outputs [ 'a' ]
console.log(Object.getOwnPropertySymbols(proxy)); // "called"; outputs [ Symbol(b), Symbol(c) ]
console.log(Object.getOwnPropertyDescriptors(proxy)) // "called"; outputs { a: ..., [Symbol(b)]: ..., [Symbol(c)]: ... }
console.log(Reflect.ownKeys(proxy)); // "called"; outputs [ 'a', Symbol(b), Symbol(c) ]
```



### [`handler.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply) 

拦截函数的调用

**返回值**

`any`

**参数**

- `target`： 被拦截目标对象
- `thisArg`： 被调用时的上下文对象，this指向
- `argumentsList`： 被调用时的参数数组

**示例**

```js
const func = function () { };

const handler = {
    apply(target, thisArg, argumentsList) {
        console.log('called', target, thisArg, argumentsList);
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

let a = {
    name: 'Alice',
    proxy: new Proxy(func, handler)
}

console.log(a.proxy(1, 2, 3)); // "called func a [1,2,3]"; outputs undefined
```



### [`handler.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct) 

拦截 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符

**返回值**

`object`

**参数**

- `target`： 被拦截目标对象
- `argumentsList`： constructor 的参数列表
- `newTarget`： 被调用的构造函数

**示例**

```js
const func = function () { };

const handler = {
    construct(target, argumentsList, newTarget) {
        console.log('called', target, argumentsList, newTarget);
        return Reflect.construct(target, argumentsList, newTarget);
    }
};

const proxy = new Proxy(func, handler)

console.log(new proxy(1, 2, 3)); // "called func [ 1, 2, 3 ] func"; outputs func {}
console.log(Reflect.construct(proxy, [1, 2, 3])); // "called func [ 1, 2, 3 ] func"; outputs func {}
```
