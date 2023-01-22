/* 
    早期的网页中，是没有一个实质的模块规范的
        我们实现模块化的方式，就是最原始的通过script标签来引入多个js文件
        问题：
            1. 无法选择要引入模块的哪些内容
            2. 在复杂的模块场景下非常容易出错
            ......
        于是，我们就继续在js中引入一个模块化的解决方案
 
    在node中，默认支持的模块化规范叫做CommonJS，
        在CommonJS中，一个js文件就是一个模块
 
    CommonJS规范
        - 引入模块
            - 使用require("模块的路径")函数来引入模块
            - 引入自定义模块时
                - 模块名要以./ 或 ../开头 
                - 扩展名可以省略
                    - 在CommonJS中，如果省略的js文件的扩展名
                        node，会自动为文件补全扩展名
                            ./m1.js 如果没有js 它会寻找 ./m1.json
                            js --> json --> node（特殊）
            - 引入核心模块时
                - 直接写核心模块的名字即可
                - 也可以在核心模块前添加 node:
*/
// const mkh = require("./07_模块化被导入")
// const http = require("http")
// const fs = require("fs")
// const path = require("path")

// console.log(http)
// console.log(fs)
// console.log(path)

// console.log(mkh)
// console.log(mkh.a)
// mkh.b()
// console.log(mkh.c.length)
// console.log(__filename, __dirname)

// console.log(module)

/* 
    默认情况下，node中的模块化标准是CommonJS
        要想使用ES的模块化，可以采用以下两种方案
            1.使用mjs作为扩展名
            2.修改package.json将模块化规范设置为ES模块  
                当我们设置 "type":"module" 当前项目下所有的js文件都默认ES module


    导入ES模块 不能省略扩展名
    通过as指定别名
    通过ES模块化,导入的内容都是常量
    可以跟对象
    默认导出 一个模块只有一个默认导出 export default (跟值)
    ES模块都是运行在严格模式下的

*/
// import { a as z1, b, c, d } from "./ES的模块化.mjs"
// console.log(z1)
// console.log(b)
// console.log(c)
// d()

//开发避免用 * 号 会全部引入
// import * as ES from "./ES的模块化.mjs"
// console.log(ES.a)

//默认导出 一个模块只有一个默认导出
import sum, { a, c } from "./07_ES的模块化.mjs"
console.log(sum)
console.log(a)
console.log(c)
c.name = null
console.log(c)

const zz = { name: null }
console.log(zz)
zz.name = 1
console.log(zz)
