# type与interface

相同点

- 都可以描述一个对象或者函数
- 都可以用 `extends` 扩展

不同点

- `type` 类型别名可以用其它类型（联合类型、元组类型、基本类型（原始值）），`interface`不支持
- `interface` 可以多次定义，并被视为合并所有声明成员。`type` 不支持

- `type` 能使用`in`关键字生成映射类型，但`interface`不行
