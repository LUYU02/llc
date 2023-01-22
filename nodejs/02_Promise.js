// 异步任务
function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  }, 1000)
}

// sum(123, 456, function(result) {
//     console.log(result)
// })
/*
    进程和线程
        - 进程（厂房）
            - 程序的运行的环境
        - 线程（工人）
            - 线程是实际进行运算的东西
 
    同步
        - 通常情况代码都是自上向下一行一行执行的
        - 前边的代码不执行后边的代码也不会执行
        - 同步的代码执行会出现阻塞的情况
        - 一行代码执行慢会影响到整个程序的执行
 
    解决同步问题：
        - java python
            - 通过多线程来解决
        - node.js
            - 通过异步方式来解决
 
    异步
        - 一段代码的执行不会影响到其他的程序
        - 异步的问题：
            异步的代码无法通过return来设置返回值
        - 特点：
            1.不会阻塞其他代码的执行
            2.需要通过回调函数来返回结果
        - 基于回调函数的异步带来的问题
            1. 代码的可读性差
            2. 可调试性差
        - 解决问题：
            - 需要一个东西，可以代替回调函数来给我们返回结果
            - Promise横空出世
                - Promise是一个可以用来存储数据的对象
                    Promise存储数据的方式比较特殊，
                    这种特殊方式使得Promise可以用来存储异步调用的数据
         
 
    - 现实生活
        1.点菜
        2.厨师做菜
        3.吃
*/

/* 
    Pronise解决异步中的回调函数
*/

// 构造函数创建Pronise
// 创建Promise时构造函数需要一个函数作为参数 创建回调函数的同时还会有两个参数
const promise = new Promise((resolve, reject) => {
  // resolve 执行正常时存储数据     resolve执行错误时存储数据
  // 通过函数向Promise中添加数据 好处就是可以添加异步调用的数据
  setTimeout(() => {
    // throw new Error("自己写的错误!")
    resolve("正确的小江")
    // reject("错误的小江")
  }, 1000)
  //   resolve("正确的小江")
  //   reject("错误的小江")
})
/* 
    读取Promise的数据
        可以通过Promise的实例方法then来读取Promise中储存的数据
        then需要两个回调函数作为参数 回调函数用来获取promise中的数据 
            通过resolve存储的数据，会调用第一个函数返回
                在第一个函数中编写处理数据的代码

            通过reject存储的数据或者出现异常时，会调用第二个函数返回
                在第二个函数中编写异常的代码 
*/
/* 
    Promise中维护两个隐藏的属性：
        PromiseResult
            用来储存数据
        PromiseState
            记录Promise的状态
                pending(进行中)
                fulfilled(完成) 通过resolve存储数据时
                rejcted(拒绝,出错) 出错或者通过reject存储数据时
            state只能修改一次,修改后永远不会变
        
        流程:
            当Promise创建时,PromiseState初始值为pending
                当通过resolve存储数据时 PromiseState 变为fulfilled（完成)
                    PromiseResult变为存储的数据
                 当通过reject存储数据时 PromiseState 变为rejcted（拒绝,出错了)
                    PromiseResult变为存储的数据 或异常对象
                    
            当通过then读取数据,相当于为Promise设置了回调函数
                如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据
                如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据

*/
promise.then(
  (result) => {
    console.log(result)
    console.log(promise)
  },
  (reason) => {
    console.log(reason)
    console.log(promise)
  }
)
/* 
    catch()用法和then类似，但是只需要一个回调函数作为参数
        catch()中的回调函数只会在Promise被拒绝时才调用
        catch()相当于 then(null, reason => {})
        catch()就是一个专门处理Promise异常的方法

    finally()
        无论是正常存储数据还是出现异常了，finally总会执行
        但是finally的回调函数中不会接收到数据
        finally()通常用来编写一些无论成功与否都要执行代码
*/
// 处理异常
promise.catch((reason) => {
  console.log("错误我才执行")
})
// 都会执行
promise.catch((reason) => {
  console.log("我总会执行")
})
