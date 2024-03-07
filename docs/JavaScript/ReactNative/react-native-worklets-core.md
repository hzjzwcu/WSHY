# react-native-worklets-core

## 安装

从 npm 安装库，文档参考[Github官网仓库](https://github.com/margelo/react-native-worklets-core/)

```
yarn add react-native-worklets-core
```

将 babel 插件添加到您的 `babel.config.js` 中

```js
module.exports = {
  plugins: [
    ["react-native-worklets-core/plugin"],
    // ...
  ],
  // ...
};
```

重新启动 Metro 并清除缓存：

```
yarn start --reset-cache
```

## 修改源码引用

`node_modules\react-native-worklets-core\src\index.ts`添加最后一行缺失的导出

```ts
import "./NativeWorklets";
export * from "./types";
export * from "./hooks/useSharedValue";
export * from "./hooks/useWorklet";
export * from "./hooks/useRunInJS";
```

`node_modules\react-native-worklets-core\src\hooks\useWorklet.ts`修改引用路径

```ts
import { DependencyList, useMemo } from "react";
import type { IWorkletContext } from "../../src/types";
```

`node_modules\react-native-worklets-core\lib\commonjs\index.js` 新增

```js
var _useRunInJS = require("./hooks/useRunInJS");
Object.keys(_useRunInJS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRunInJS[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRunInJS[key];
    }
  });
});
```

`node_modules\react-native-worklets-core\lib\module\index.js` 新增

```js
export * from "./hooks/useRunInJS";
```

`node_modules\react-native-worklets-core\lib\typescript\index.d.ts` 新增

```ts
export * from "./hooks/useRunInJS";
```

`lib\typescript\hooks\useWorklet.d.ts`修改

```ts
import type { IWorkletContext } from "../types";
```

## 使用方法

将可能引起阻塞的操作使用`useWorklet`包裹

```ts
const runInWorkLet9 = useWorklet('default', () => {
    'worklet';
    let result = 0;
    for (let i = 0; i < 1e9; i++) {
        result += i;
    }
}, []);
```

worklet的上下文和js不一样，js中定义的变量和方法无法直接调用，如有需要，就需要使用useRunInJS创建一个新方法，如果有依赖可以放在第二个参数中，一旦依赖项发生变化，方法也会更新

```ts
const [endTime, setEndTime] = useState<number>(Date.now());
const setNewEndTime = useRunInJS(() => {
    setEndTime(Date.now());
}, [endTime]);
```



## 实例Demo

```tsx
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useRunInJS, useWorklet } from "react-native-worklets-core";

const App = () => {
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [endTime, setEndTime] = useState<number>(Date.now());

    // 计算操作时长
    const [msg, setMsg] = useState('等待中...');
    useEffect(() => {
        setMsg(`操作完成，耗时：${(endTime - startTime) / 1000}秒`)
    }, [endTime])

    // 在worklet中运行js方法设置结束时间
    const setNewEndTime = useRunInJS(() => {
        setEndTime(Date.now());
    }, []);

    // js 阻塞方法
    const runInJs9 = () => {
        let result = 0;
        for (let i = 0; i < 1e9; i++) {
            result += i;
        }
        setNewEndTime();
    }

    // worklet 阻塞方法
    const runInWorkLet9 = useWorklet('default', () => {
        'worklet';
        let result = 0;
        for (let i = 0; i < 1e9; i++) {
            result += i;
        }
        setNewEndTime()
    }, []);

    const run9 = (type: 'js' | 'worklet') => {
        setStartTime(Date.now());
        if (type === 'js') {
            runInJs9()
        } else {
            runInWorkLet9()
            setMsg(`WorkLet执行中，请稍等，当前页面UI逻辑未阻塞，可随意操作...`)
        }
    }

    return (
        <View>
            <View style={styles.dividing} />
            <Text>该Demo用于展示worklet线程与js线程的差异</Text>
            <Text>当前使用循环来模拟耗时操作，循环次数越大需要处理的时间越长</Text>

            <View style={styles.dividing} />
            <Text style={{ marginBottom: 10 }}>遍历1e9，可以观察阻塞UI</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title="js" onPress={() => run9('js')} />
                <Button title="WorkLet" onPress={() => run9('worklet')} />
            </View>

            <View style={styles.dividing} />
            <Text style={{ marginBottom: 10 }}>{msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dividing: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
    },
    input: {
        width: '80%', // 输入框宽度
        padding: 10, // 内边距
        fontSize: 18, // 字体大小
        borderWidth: 2, // 边框宽度
        borderColor: '#007bff', // 边框颜色
        borderRadius: 5, // 边框圆角
        color: '#007bff', // 文本颜色
        marginBottom: 20, // 与下方文本的间距
    },
})

export default App;

```

