# ArkTS语法

ArkTS围绕应用开发在[TypeScript](https://www.typescriptlang.org/)（简称TS）生态基础上做了进一步扩展，继承了TS的所有特性，是TS的超集

# 基本语法概述

在初步了解了ArkTS语言之后，我们以一个具体的示例来说明ArkTS的基本组成。如下图所示，当开发者点击按钮时，文本内容从“Hello World”变为“Hello ArkUI”。

本示例中，ArkTS的基本组成如下所示。

```ts
// 装饰器
@Entry
@Component
struct Index { //自定义组件
  @State myText: string = 'World'; // 属性装饰器

  build() { // UI描述
    Column() { // 系统组件
      Text(`Hello ${this.myText}`)
        .fontSize(50)
      Divider()
      Button('Click me')
        .onClick(() => { // 事件爱你方法
          this.myText = 'ArkUI'
        })
        .height(50)
        .width(100)
        .margin({ top: 20 })
    }
  }
}
```

- 装饰器： 用于装饰类、结构、方法以及变量，并赋予其特殊的含义。如上述示例中@Entry、@Component和@State都是装饰器，[@Component](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3#section1430055924816)表示自定义组件，[@Entry](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3#section1430055924816)表示该自定义组件为入口组件，[@State](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-state-0000001474017162-V3)表示组件中的状态变量，状态变量变化会触发UI刷新。
- [UI描述](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-declarative-ui-description-0000001524416537-V3)：以声明式的方式来描述UI的结构，例如build()方法中的代码块。
- [自定义组件](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-create-custom-components-0000001473537046-V3)：可复用的UI单元，可组合其他组件，如上述被@Component装饰的struct Hello。
- 系统组件：ArkUI框架中默认内置的基础和容器组件，可直接被开发者调用，比如示例中的Column、Text、Divider、Button。
- 属性方法：组件可以通过链式调用配置多项属性，如fontSize()、width()、height()、backgroundColor()等。
- 事件方法：组件可以通过链式调用设置多个事件的响应逻辑，如跟随在Button后面的onClick()。
- 系统组件、属性方法、事件方法具体使用可参考[基于ArkTS的声明式开发范式](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-components-summary-0000001478181369-V3)。

除此之外，ArkTS扩展了多种语法范式来使开发更加便捷：

- [@Builder](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-builder-0000001524176981-V3)/[@BuilderParam](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-builderparam-0000001524416541-V3)：特殊的封装UI描述的方法，细粒度的封装和复用UI描述。
- [@Extend](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-extend-0000001473696678-V3)/[@Styles](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-style-0000001473856690-V3)：扩展内置组件和封装属性样式，更灵活地组合内置组件。
- [stateStyles](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-statestyles-0000001482592098-V3)：多态样式，可以依据组件的内部状态的不同，设置不同样式。