## TypeScript 5有什么新特性

- 模板文本类型，例如

  ```ts
  type DynamicObject = { [key: string as `dynamic_${string}`]: string };
  ```

- 修复一些问题，比如enum中所有成员都会被认为是number类型

- 修饰器

- `const`修饰符，对泛型参数修饰。解决增加`as const`断言才能实现的类型推导

