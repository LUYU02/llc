/* 
    核心模块，是node中自带的模块，可以在node中直接使用
    window 是浏览器的宿主对象 node中是没有的
    global 是node中的全局对象，作用类似于window
    ES标准下，全局对象的标准名应该是globalThis


*/

// console.log(globalThis)
// console.log(global)
/* 
    process 
            - 表示当前的node进程
            - 通过该对象可以获取进程的信息，或者对进程做各种操作
            - 如何使用
                1. process是一个全局变量，可以直接使用
                2. 有哪些属性和方法：
                    process.exit()
                        - 结束当前进程，终止node
                    process.nextTick(callback[, …args])
                        - 将函数插入到 tick队列中
                        - tick队列中的代码，会在下一次事件循环之前执行
                            会在微任务队列和宏任务队列中任务之前执行
                     
                调用栈
                tick队列    Commonjs标准下
                微任务队列  ES标准下
                宏任务队列
*/
/* 
    console.log(11111)
    process.exit() //结束这行代码以下的代码 直接结束
    console.log(22222)
    console.log(33333) 
*/
/*     
    setTimeout(() => console.log(1)) //宏任务
    queueMicrotask(() => {
    console.log(2) //微任务
    })
    process.nextTick(() => {
    console.log(3) //tick队列
    })
    console.log(4) //调用栈
*/

/* 
    path
        - 表示的路径
        - 通过path可以用来获取各种路径
        - 要使用path，需要先对其进行引入
        - 方法：
            path.resolve([…paths]) 
                - 用来生成一个绝对路径
                    相对路径：./xxx  ../xxx  xxx
                    绝对路径：
                        - 在计算机本地
                            c:\xxx
                            /User/xxxx
                        - 在网络中
                            http://www.xxxxx/...
                            https://www.xxx/...
 
                    - 如果直接调用resolve，则返回当前的工作目录
 
                        C:\Program Files\nodejs\node.exe .\03_包管理器\01_path.js
                        c:\Users\lilichao\Desktop\Node-Course
 
                        node .\01_path.js
                        C:\Users\lilichao\Desktop\Node-Course\03_包管理器
                        - 注意，我们通过不同的方式执行代码时，它的工作目录是有可能发生变化的
 
                - 如果将一个相对路径作为参数，
                    则resolve会自动将其转换为绝对路径
                    此时根据工作目录的不同，它所产生的绝对路径也不同
 
                - 一般会将一个绝对路径作为第一个参数，
                    一个相对路径作为第二个参数
                    这样它会自动计算出最终的路径
*/
// const path = require("node:path")
const path = require("path")

// console.log(path)
console.log(path.resolve())
console.log(path.resolve("./LUYU.js"))
// console.log(__dirname)
// console.log(__filename)
console.log(path.resolve(__dirname, "./LUYU.js"))

/* 
    fs （File System）
        - fs用来帮助node来操作磁盘中的文件
        - 文件操作也就是所谓的I/O，input output
        - 使用fs模块，同样需要引入
*/

/* 
    Promise 版本的fs方法
*/
/* 
    const fs = require("fs/promises")
    fs
    .readFile(path.resolve(__dirname, "./luyu.txt"))
    .then((buffer) => {
        console.log(buffer.toString())
    })
    .catch((e) => {
        console.log("出错啦:", e)
    })(
    //------------------------------------------
    async () => {
        try {
        const buffer = await fs.readFile(path.resolve(__dirname, "./luyu.txt"))
        console.log(buffer.toString())
        } catch (e) {
        console.log(`出错了:${e}`)
        }
    }
    )() 
*/
// const fs = require("fs") //以下方法不好 但要知道
/* 
    readFileSync() 同步的读取文件的方法，会阻塞后边代码的执行
    当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
    Buffer是一个临时用来存储数据的缓冲区
    const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
    console.log(buf.toString())
*/
/* 
    //同步方法读取文件
    const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
    console.log(buf.toString())
    //异步方法读取文件

    const luyu = fs.readFileSync(path.resolve(__dirname, "./luyu.txt"))
    fs.readFile(path.join(__dirname, "./luyu.txt"), (err, buffer) => {
    if (err) {
        console.log(`出错了:${err}`)
    } else {
        console.log(buffer.toString())
    }
    }) 
*/

const fs = require("fs/promises")

/* 
    fs.appendFile() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录
        mkdir可以接受一个 配置对象作为第二个参数
            recursive 默认值为false
                设置true以后,会自动创建不存在的上一级目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.rename() 重命名 (剪切)
    fs.copyFile() 复制文件 (复制)
*/
// fs.appendFile(path.join(__dirname, "luyu.txt"), "小江真厉害").then((r) => {
//   console.log("添加成功", r)
// })

/* fs.readFile(path.join(__dirname, "./luyu.txt"))
  .then((r) => {
    return fs.appendFile(
      path.resolve(__dirname, "./123.txt"),
      r,
      console.log(r) //r是上一层读取的数据
    )
  })
  .then(() => {
    console.log("操作结束")
  }) */

/* fs.mkdir(path.join(__dirname, "./LUYU1"), { recursive: true })
  .then((r) => {
    console.log("创建成功")
  })
  .catch((err) => {
    console.log("创建失败", err)
  }) */

/* 
    fs.rmdir(path.join(__dirname, "./LUYU"), { recursive: true })
    .then((r) => {
        console.log("删除成功")
    })
    .catch((err) => {
        console.log("删除失败")
    }) 
*/
/* fs.rename(
  path.resolve(__dirname, "./luyu.txt"),
  path.resolve(__dirname, "./luyu2.txt")
)
  .then((r) => {
    console.log("重命名成功")
  })
  .catch((err) => {
    console.log("重命名失败")
  }) */

/* fs.copyFile(
  path.resolve(__dirname, "./luyu2.txt"),
  path.resolve(__dirname, "./luyu12.txt")
)
  .then((r) => {
    console.log("复制成功")
  })
  .catch((err) => {
    console.log("复制失败")
  }) */

/* fs.rm(path.resolve(__dirname, "./luyu12.txt"))
  .then((r) => {
    console.log("删除成功")
  })
  .catch((err) => {
    console.log("删除失败")
  }) */
