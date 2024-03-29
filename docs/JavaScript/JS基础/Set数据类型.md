# Set数据类型

## 集合运算操作

JavaScript 的 `Set` 对象自从 ES6 引入以来，主要用于确保列表中没有重复的元素。然而，随着即将推出的 7 种内置 `Set` 方法，我们可能会发现自己更频繁地使用它们。

**并不是所有浏览器都支持以下的操作**，如果想立即使用需要使用`polyfills`，引入代码如下：

```js
 import 'core-js/actual/set/index.js'
```

### 并集 **`union`** 

`A ∪ B`  将多个集合的元素组合在一起

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3, 4]);
const s3 = new Set([3, 4, 5]);
console.log(s1.union(s2).union(s3));  // Set(5) {1, 2, 3, 4, 5}
```

### 交集 **`intersection`** 

`A ∩ B` 同时属于多个集合中的元素组成的集合

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3, 4]);
const s3 = new Set([3, 4, 5]);
console.log(s1.intersection(s2).intersection(s3));  // Set(1) {3}
```

### 差集 `difference`

`A \ B` 属于第一个集合但不属于第二个集合的元素的集合

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3, 4]);
const s3 = new Set([3, 4, 5]);
console.log(s1.difference(s2).difference(s3));  // Set(1) {1}
```

### 对称差集 `symmetricDifference`

`A △ B` 或 `A ⊖ B` 两个集合中不共有的元素，具体来说，两个集合 A 和 B 的对称差集包含了仅属于 A 或仅属于 B 的元素，但不包含同时属于 A 和 B 的元素
$$
A△B=(A∖B)∪(B∖A)
$$

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3, 4]);
const s3 = new Set([3, 4, 5]);
console.log(s1.symmetricDifference(s2).symmetricDifference(s3));  // Set(3) {1, 3, 5}
```

### 子集检测 `isSubsetOf`

`A ⊆ B`  检测前者是否是后者的子集

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3]);
console.log(s2.isSubsetOf(s1));  // true
```

### 父集检测 `isSupersetOf`

`A ⊇ B`  检测前者是否是后者的父集

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([2, 3]);
console.log(s1.isSupersetOf(s2));  // true
```

### 不相交检测 `isDisjointFrom`

`A ∩ B = ∅`  确定两个集合是否是不相交，即没有共同的元素

```js
const s1 = new Set([1, 2, 3]);
const s2 = new Set([4]);
console.log(s1.isDisjointFrom(s2));  // true
```

















