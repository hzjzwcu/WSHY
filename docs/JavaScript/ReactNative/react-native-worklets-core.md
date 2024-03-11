# react-native-worklets-core

安装

```
npm i react-native-worklets-core
```

在你的 `babel.config.js` 中添加 babel 插件

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

Demo

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 定义一个 worklet 函数
const exampleWorklet = () => {
//   'worklet';
  // Worklet 函数体，可以执行一些计算任务
  console.log('Worklet is running');
};

const App = () => {
  // 在某个事件（如按钮点击）中调用 worklet 函数
  const handlePress = () => {
    exampleWorklet();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Run Worklet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
```

在这个示例中，`exampleWorklet` 函数被标记为一个 worklet，这通过在函数体的开始添加 `'worklet';` 实现。你可以在 React Native 组件中的事件处理函数（如按钮点击事件）中调用这个 worklet 函数。

请注意，这个示例仅用于演示如何定义和调用 worklet 函数，并没有实际在后台线程执行任何操作。在实际应用中，你可能需要根据具体需求编写更复杂的 worklet 函数，并结合其他库（如 `react-native-reanimated`）使用。

展示使用worklets前后的区别

为了展示 'worklet' 声明的作用，我们可以创建一个简单的 React Native 示例，其中包含一个按钮用于切换动画效果。这个示例将比较使用和不使用 'worklet' 声明时的性能差异。

请注意，为了运行此示例，你需要已经安装了 React Native 和 React Native Reanimated 库。

```tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const WorkletDemo = () => {
  const [useWorklet, setUseWorklet] = useState(true);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 1000 }),
    };
  }, [useWorklet]);

  const toggleOpacity = () => {
    opacity.value = opacity.value === 1 ? 0 : 1;
  };

  const toggleWorklet = () => {
    setUseWorklet(!useWorklet);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Toggle Opacity" onPress={toggleOpacity} />
      <Button title={`Switch to ${useWorklet ? 'Non-Worklet' : 'Worklet'}`} onPress={toggleWorklet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    marginBottom: 20,
  },
});

export default WorkletDemo;

```

在这个示例中，我们创建了一个名为 WorkletDemo 的组件，其中包含一个动画视图和两个按钮。第一个按钮用于切换视图的不透明度，第二个按钮用于在使用和不使用 'worklet' 声明之间切换。我们通过更改状态 useWorklet 并在 useAnimatedStyle 的依赖数组中使用它来模拟这个切换。实际上，这不会改变函数是否作为 worklet 运行，因为在运行时刻这已经确定，但它提供了一个模拟切换的方法，让我们可以通过刷新组件来查看不同模式的表现。

请注意，这个示例只是为了演示目的。在实际应用中，你不能通过简单地更改状态来在 worklet 和非 worklet 函数之间切换。worklet 函数的行为是在其定义时通过 'worklet' 声明确定的。

为了真正体验到使用和不使用 'worklet' 声明的性能差异，你可能需要在具有复杂动画或高性能需求的真实应用场景中进行测试。