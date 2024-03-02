# ES6特性

let,const 块级作用域，禁止重复声明，不能提前访问 

解构赋值 [a,b] = [1,2]

模版字符串 ``

扩展符号rest ...

箭头函数 this是定义时候的对象，不能当作构造函数，不能作为generateor函数

对象新增方法Object.keys .values .entries

Symbol 作为对象属性时，不会被遍历到，需要用 Reflect.ownkeys拿到

Set和Map数据对象

Promise

for of 主要用于数组，比起forEach可以用return break跳出循环

for in 主要用于对象

Generator 

async await 

class 不存在变量提升 类中的方法都会被继承，除非加上 static 标识 class内部没有静态，但可以用Foo.a 的方式声明静态属性

class的继承必须在constructor中调用super

module export import commonjs是值的赋值，modlue是值的引用，html中引用时需要将script标签的type设置为module

