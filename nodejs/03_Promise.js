// Promise就是一个用来存储数据对象
// 但是由于Promise存取的方式的特殊，所以可以直接将异步调用的结果存储到Promise中
// 对Promise进行链式调用时
//  后边的方法（then和catch）读取的上一步的执行结果
//      如果上一步的执行结果不是当前想要的结果，则跳过当前的方法

/* 
    当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
*/
/* const promise = new Promise((resolve, reject) => {
  throw new Error("人为错误!")
  resolve("小江")
})
promise.then(
  (result) => {
    console.log(result)
  },
  (reason) => {
    console.log("出错了,快来看看!")
  }
) */

function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
      //   reject(a, b)
    })
  })
}
/* 
    promise中的
        then (return new Promise())
        catch
        - 这三个方法都会返回一个新的Promise,
            Promise中会存储回调函数的返回值
        finally
            - finally的返回值，不会存储到新的Promise中
*/
// sum(1, 2)
//   .then((result) => {
//     return result + 7
//   })
//   .catch((result) => {
//     if (result < 20) {
//       return 50
//     }
//   })
//   .then((result) => console.log(result))
/*   
    Promise 静态方法
        Promise.resolve() 创建一个立即执行的Promise
        Promise.reject() 创建一个立即执行的Promise
        Promise.all([...]) 同时返回多个Promise的执行结果
            其中有一个错误就全错
        Promise.allSettled() 同时返回多个Promise的执行结果
            不管错的还是对的 全返回
            {status: 'fulfilled', value: '错的小江'} 成功的
            {status: 'rejected', reason: '错的小江'} 错误的
        Promise.race() 返回一个执行最快的Promise (不考虑对错)
        Promise.any() 返回一个执行最快的Promise (全部错误就报错)
 */
// Promise.resolve("小江").then((r) => console.log(r))
// Promise.reject("错误").catch((r) => console.log(r))
//--------------------------------------------------------------
/* Promise.all([sum(1, 2), sum(11, 22), sum(111, 222)]).then((r) => {
  let sum1 = 0
  for (const k of r) {
    sum1 += k
  }
  console.log(sum1)
}) */
//--------------------------------------------------------------
/* Promise.allSettled([
  sum(1, 2),
  sum(11, 22),
  sum(111, 222),
  sum("错的", "小江"),
  Promise.reject("错的小江"),
]).then((r) => {
  console.log(r)
}) */
//--------------------------------------------------------------
/* Promise.race([
  //整个博尔特出来
  //   Promise.resolve("博尔特"),
  Promise.reject("奸细"),
  sum(1, 2),
  sum(11, 22),
  sum(111, 222),
])
  .then((r) => {
    console.log(r)
  })
  .catch((r) => {
    console.log("错误")
  }) */
//--------------------------------------------------------------

/* Promise.any([
  Promise.reject("奸细"),
  //   sum(1, 2),
  //   sum(11, 22),
  //   sum(111, 222),
])
  .then((r) => {
    console.log(r)
  })
  .catch((r) => {
    console.log("错误", r)
  }) */

// setTimeout(() => {
//   console.log(111111)
// })
Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(222222)
  })
})
setTimeout(() => {
  console.log(111111)
}, 2)
// console.log(222222)
