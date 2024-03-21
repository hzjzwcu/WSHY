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
    // 其他插件...
  ],
  // 其他配置...
};

```

重启 Metro，并清除缓存：

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

worklet的上下文和js不一样，**js中定义或引入的变量和方法都不能直接调用**，如有需要，就需要使用`useRunInJS`创建一个新方法，如果有依赖可以放在第二个参数中，一旦依赖项发生变化，方法也会更新

```ts
const [endTime, setEndTime] = useState<number>(Date.now());
const setNewEndTime = useRunInJS(() => {
    setEndTime(Date.now());
}, [endTime]);
```

## 实例Demo

```tsx
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { useRunInJS, useSharedValue, useWorklet } from "react-native-worklets-core";

const App = () => {
    const [curTime, setCurTime] = useState<Number>(0); // 时间戳
    const runMsg = useSharedValue('等待中');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurTime(Math.floor(Date.now()))
        }, 500)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // js 阻塞方法
    const runInJs = () => {
        const start = Date.now();
        let result = 0;
        for (let i = 0; i < 1e8; i++) {
            result += i;
        }
        const end = Date.now();
        const msg = `js操作完成，运行时长：${(end - start) / 1000} 秒`;
        runMsg.value = msg;
    }

    // worklet 阻塞方法
    const runInWorkLet = useWorklet('default', () => {
        'worklet';
        runMsg.value = '执行中，请等待...';
        const start = Date.now();
        let result = 0;
        for (let i = 0; i < 1e8; i++) {
            result += i;
        }
        const end = Date.now();
        const msg = `worklet操作完成，运行时长：${(end - start) / 1000} 秒`;
        runMsg.value = msg;
    }, []);

    const run = (type: 'js' | 'worklet') => {
        if (type === 'js') {
            runInJs()
        } else {
            runInWorkLet()
        }
    }

    return (
        <View>
            <View style={styles.dividing} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>useRunInJS/useWorklet</Text>
            <Text>该Demo用于展示worklet线程与js线程的差异</Text>
            <Text>当前使用循环来模拟耗时操作，循环次数越大需要处理的时间越长</Text>

            <View style={styles.dividing} />
            <Text style={{ marginBottom: 10 }}>通过 useWorklet 创建线程，在两个线程分别遍历1e8次</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title="js" onPress={() => run('js')} />
                <Button title="WorkLet" onPress={() => run('worklet')} />
            </View>

            <View style={styles.dividing} />
            <Text>以下运行时长是通过 useSharedValue 展示，否则两个线程中不共享变量</Text>
            <Text>{runMsg.value}</Text>

            <View style={styles.dividing} />
            <Text style={{ marginBottom: 10 }}>UI被阻塞的时候，下面时间戳的更新会停止：</Text>
            <Text style={styles.time}>{curTime.toString()}</Text>
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
    time: {
        fontSize: 20
    }
})

export default App;

```

