# Proxy基础

`Proxy`是`es6`引入的机制，允许用户创建一个代理对象，用于拦截和定义对象的基本操作，主要是为了提供更灵活和可扩展的对象操作机制

## Getter和Setter使用示例

在引入`Proxy`前，开发者需要拦截对象操作通常会使用`getter`和`setter`

```js
let person = {
    _name: "John",
  
    get name() {
      console.log('Getting name');
      return this._name;
    },
  
    set name(value) {
      console.log('Setting name to ' + value);
      this._name = value;
    }
  };
  
  console.log(person.name); // 打印: Getting name 然后是 John
  
  person.name = 'Jane'; // 打印: Setting name to Jane
  
  console.log(person.name); // 打印: Getting name 然后是 Jane
```

- **局限于特定属性**：必须为对象的每个属性单独定义拦截，如果要处理大量属性或者动态属性时处理步骤会很繁琐
- **无法拦截某些操作**：只能用于拦截属性的读写，类似`delete`操作符或者`for in`这样的属性枚举无法拦截

## Proxy使用示例

```js
let target = {
    msg1: 'hello',
    msg2: 'world',
}

let handler = {
    get: function (target, prop, recriver) {
        return prop in target ? target[prop] : `Prop: ${prop} doesn't exist`;
    }
}

let proxy = new Proxy(target, handler);

console.log(proxy.msg1); // hello
console.log(proxy.msg3); // Prop: msg3 doesn't exist
```

