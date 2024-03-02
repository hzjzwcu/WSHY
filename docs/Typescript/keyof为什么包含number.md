## 为什么 keyof 在提取索引签名类型时结果包含number

```ts
interface Example {
    [key: string]: any;
}

type Keys = keyof Example; // Keys 的类型是 string | number
```

出现以上的情况，是因为js中对象的`key`在写入或读取时，`string`和`number`等同的，只是会做字符串转换，比如 `obj[1] = "one";`等同于`obj["1"] = "one";`，TypeScript 会考虑到 JavaScript 的这种行为。因此，`keyof` 一个带有字符串索引的类型会得到 `string | number` 类型。这是因为即使索引签名只指定了字符串，数字索引也能正常工作并被转换为字符串