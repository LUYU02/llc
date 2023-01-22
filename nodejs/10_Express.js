// 引入express
const express = require("express")
// 获取服务器的实例(对象)
const app = express()

/* 
    如果希望服务器可以正常访问，则需要为服务器设置路由
        路由可以根据不同的请求方式和请求地址来处理用户的请求

        app.METHOD(...)
        METHOD 可以是 get 或post ...
*/
// 路由---------------------------------------
/* app.get("/", (req, res) => {
  //req 读取用户的请求信息 res 返回用户响应
  console.log(req.url)
  console.log("我是get")
  console.log(res)
})
app.post("/", () => {
  console.log("我是post")
}) */

// 中间件---------------------------------------
app.use("/", (req, res, next) => {
  console.log("111")
  next()
})
app.use("/", (req, res, next) => {
  console.log("222")
  next()
})
app.use("/", (req, res) => {
  console.log("333")
  res.send("333")
})
// 启动服务器
app.listen(80, () => {
  console.log("http://127.0.0.1")
})
