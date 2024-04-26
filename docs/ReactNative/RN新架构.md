# RN新架构

RN是一个跨平台解决方案，允许开发者使用`React`（和`JavaScript`）创建原生移动端应用，其中有四个核心部分：

- **`React`**：开发者**使用React编写的书面代码**，包括React组件、函数逻辑以及JS代码等
- **`JavaScript`**：RN框架将React组件和逻辑转换成JavaScript语句，以便运行时环境能够理解和执行
- **`Bridge`**：JS代码和Native代码之间会通过一组元素进行通信交互。通信通常是异步`JSON`消息，这组元素起到桥梁的作用，因此被称为`Bridge`
- **`Native`**：Native代码指的是在移动设备上运行的**原生代码**，例如`Android`上的**Java**或**Kotlin**代码以及`IOS`上的**Objective-C**或**Swift**代码，Native代码可以访问设备的原生功能，能执行更高性能的任务

![react native diagram](https://res.cloudinary.com/formidablelabs/image/upload/f_auto,q_auto/v1675121564/dotcom/uploads-old-diagram-full)

JS代码和Native代码的环境是隔离的，只能通过`Bridge`组件传输异步的JSON信息，这些信息被发送到Native代码后无法保证一定有响应，是有局限性的，所以RN团队对这四个核心部分逐一改进，组成了新架构

## 一、React&CodeGen

具体来说，第一部分改进了以下几个方面：

1. **新的React特性**：引入了**并发模式**和**同步事件回调**等新特性，提高了应用的性能和响应性。
2. **Suspense和Hooks**：`Suspense`优化异步数据的加载，`Hooks`使代码更加简洁和可维护。
3. **静态类型检查器和CodeGen**：新架构强调了静态类型检查器（如`Flow`或`TypeScript`）的重要性，并引入了一个名为`CodeGen`的工具，用于自动生成JS和本地代码之间的接口文件。

![React Native overview with Codegen](https://res.cloudinary.com/formidablelabs/image/upload/f_auto,q_auto/v1675121564/dotcom/uploads-new-1)

## 二、JSI&JSC

在旧架构中，`JSC（JavaScriptCore）`引擎被直接用于解释 JavaScript 代码。但这样做的缺点是，通信效率差，JS和Native之间是隔离的，

新架构中引入了一个名为`JavaScript Interface (JSI)`的新模块，将JS代码与JSC引擎分离，这样做的优点如下：

1. 易于更新引擎：可以更容易地将 JSC 替换为其他引擎或较新版本的 JSC
2. **`直接JS调用C++的方法`**：这是新架构的核心功能，JSI可以让JS持有对C++主机对象的引用，并调用它们的方法，这意味着JS与Native的通信将更加高效

- 易于更新引擎：
- 





















