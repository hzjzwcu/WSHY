# webPack

## 常用配置

- 入口entry
- 输出output
- loader处理器
- plugin插件

## loader与plugin的区别

webpack只能识别js，其他语言需要一个翻译器，loader就是这样一个解释器的角色

plugin则是为了扩展webpack的功能，在运行时会广播很多事件，plugin可以监听事件，来处理和改变输出结果

## 常用loader

postcss-loader给css添加兼容性语法前缀

file-loader和url-loader可以将图片转为base64编码

## 常用插件

html-webpack-plugin 生产html模板

clean-webpack-plugin 清理输出



