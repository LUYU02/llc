/* 
    https://node.dev/en/ node.js文档

    通过async可以快速创建异步函数
        异步函数的返回值会自动封装到一个Promise中返回

    在sysnc声明的异步函数中可以使用await关键字来调用函数
*/
/*
  // 异步函数
  function fu() {
    return Promise.resolve("小江")
  }
  fu().then((r) => console.log(r)) 

  两个等价-------------------

  async function fn2() {
    return 20
  }
  fn2().then((r) => console.log(r)) 
*/

//--------------------------------------

/* 
  function sum(a, b) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        // resolve(a + b)
        reject(a + b)
      })
    })
  }

  async function fn3() {
    // 当我们通过await去调用异步函数时，它会暂停代码的运行
    // 知道异步代码执行有结果时，才会将结果返回
    // 注意 await只能用于 async声明的异步函数中，或es模块的顶级作用域中
    // await只是阻塞内部的代码,外部不会影响
    // 通过await调用异步代码时，需要通过try-catch来处理异常
    try {
      let result = await sum(123, 456)
      console.log(result)
    } catch (e) {
      console.log("出错了!", e)
    }
  }

  fn3()
  console.log("我输出了")
*/

//--------------------------------------

// 执行顺序 1234
/* 
  async function fn4() {
    console.log(1)
    console.log(2)
    console.log(3)
  }
  fn4()

  等价

  function fn5() {
    return new Promise((resolve) => {
      console.log(1)
      console.log(2)
      console.log(3)
      resolve()
    })
  } 
*/

//--------------------------------------

/*  //1243
 async function fn4() {
    console.log(1)
    await console.log(2)
    console.log(3)
  }
  fn4()

  等价

  function fn5() {
    return new Promise((resolve) => {
      console.log(1)
      console.log(2)
      resolve()
    }).then((r) => console.log(3))
  }
  console.log(4)
*/

;(async () => {
  await console.log("小江")
})()
