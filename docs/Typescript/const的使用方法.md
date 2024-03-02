## const的使用方法

当推断一个对象的类型时，TypeScript 倾向于选择**更通用**的类型，比如下面示例

```ts
declare function getNames<T extends string[]>(args: T): T
const names = getNames(['a', 'b', 'c']) // string[]
```

如果需要推断更具体的类型，以前的做法是在每次传入参数时增加`as const`

```ts
declare function getNames<T extends string[]>(args: T): T
const names = getNames(['a', 'b', 'c'] as const) // ["a", "b", "c"]
```

而现在则是直接给泛型添加`const`，效果和上面一样

```ts
declare function getNames<const T extends string[]>(args: T): T
const names = getNames(['a', 'b', 'c']) // ["a", "b", "c"]
```

> 如果需要实现数组类型不可变，可以在`extends`后加入`readonly`

