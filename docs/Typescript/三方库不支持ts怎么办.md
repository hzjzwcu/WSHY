## 如果某个库没有支持ts类型该怎么办

- 有一个名为 Definitely Typed 的社区维护项目，可以先运行 `npm install --save-dev @types/xxxx(替换为包名)`来查看是否已有支持
- 自己声明`.d.ts`文件来支持该库
- 依赖ts的自动类型推断
- any